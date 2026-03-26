
Diagnóstico confirmado (com dados reais do banco):

1) O problema NÃO é mais o cron  
- Job `welcome-reminder-hourly` está ativo e rodando de hora em hora (`cron.job` id 8).

2) A causa raiz atual é de resolução de idioma, não de envio  
- Nos reminders recentes, `email_logs.metadata.language` está `en` mesmo para usuários com `profiles.preferred_language = es/fr`.
- Exemplo real: reminders com `preferred_language: es/fr` foram enviados com `reminder_lang: en`.

3) Por que isso acontece no código atual  
- Em `send-unopened-welcome-reminders`, o idioma é definido antes do envio assim:
  - tenta `profiles.preferred_language` usando `welcomeEmails.user_id`
  - se não achar, cai para `metadata.language`
  - se não existir, cai para `en`
- Só que muitos registros históricos de `email_logs` (welcome/magic_link) vieram sem `user_id` e sem `metadata.language`.
- Resultado: fallback em massa para inglês.

Evidência forte:
- Últimos 14 dias de `welcome/magic_link`:  
  - `total: 2396`  
  - `missing_user_id: 2109`  
  - `missing_language_meta: 2230`  
- Ou seja, o fluxo atual depende de campos que historicamente estão ausentes.

Plano de correção imediata:

1) Blindar o idioma no ponto final de envio (`send-welcome-email`)  
Arquivo: `supabase/functions/send-welcome-email/index.ts`

Implementar regra para `mode === "magic_link_reminder"`:
- Resolver `userId` (já existe no código via `resolveUserId`).
- Buscar `profiles.preferred_language` desse `userId`.
- Se existir, sobrescrever o idioma final do email com esse valor (normalizado).
- Só usar `body.language` como fallback quando `preferred_language` não existir.

Por que aqui:
- É o último ponto antes de montar subject/template.
- Garante idioma correto mesmo quando o evento de origem (`email_logs` antigo) vier incompleto.
- Cobre tanto o cron automático quanto execuções manuais que chamam `send-welcome-email`.

2) Ajustar `send-unopened-welcome-reminders` para rastreabilidade (opcional, mas recomendado)  
Arquivo: `supabase/functions/send-unopened-welcome-reminders/index.ts`

- Incluir no `metadata` enviado ao `send-welcome-email` um campo de diagnóstico:
  - `language_source`: `profile` | `welcome_metadata` | `fallback_en`
- Isso facilita auditoria sem depender de logs verbosos.

3) Validação pós-correção (imediata, após próxima execução)
- Verificar reminders novos em `email_logs`:
  - `metadata.language` deve bater com `split_part(profiles.preferred_language, '-', 1)`.
- Conferir especificamente usuários com `preferred_language in ('es','fr','pt','de','it','ru')` para garantir que deixaram de sair como `en`.

4) (Recomendação curta de robustez operacional)
- O cron HTTP usa timeout padrão curto (5s) e este fluxo pode passar disso em lotes.
- Ajustar timeout do `net.http_post` do job hourly para evitar timeouts falsos no monitoramento.

Escopo de arquivos:
- `supabase/functions/send-welcome-email/index.ts` (correção principal)
- `supabase/functions/send-unopened-welcome-reminders/index.ts` (telemetria de origem de idioma, recomendado)

Sem migração de banco necessária.
