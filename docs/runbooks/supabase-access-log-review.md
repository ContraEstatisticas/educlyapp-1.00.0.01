# Runbook - Revisao de logs de acesso ao banco no Supabase

Data de criacao: 24/03/2026

Objetivo: revisar os logs disponiveis no Supabase para identificar sinais de acesso nao autorizado, abuso de credenciais ou tentativas de contorno de controle de acesso.

## Quando executar

- durante auditorias de seguranca
- apos incidente de acesso
- apos rotacao de credenciais
- apos mudanca relevante de RLS, JWT ou edge functions
- pelo menos mensalmente em producao

## Fontes de log que devem ser revisadas

### Sempre disponiveis no projeto

- `Authentication > Audit Logs`
- `Logs Explorer`
- `Functions`:
  - `Invocations`
  - `Logs`

### Fontes principais no Logs Explorer

- `auth_logs`
- `edge_logs`
- `function_edge_logs`
- `function_logs`
- `postgres_logs`

### Quando disponivel no plano

- `Platform Audit Logs`

Observacao: `Platform Audit Logs` sao recurso de `Team` e `Enterprise`. Em organizacoes `Pro`, a revisao deve se apoiar nos logs do projeto, nos auth audit logs e no logs explorer.

## O que procurar

### Indicadores tecnicos suspeitos

- muitos `401` ou `403` em sequencia
- mensagens contendo:
  - `Unauthorized`
  - `Forbidden`
  - `permission denied`
  - `invalid secret`
  - `invalid authorization`
  - `JWT`
  - `signature`
- picos de tentativas em edge functions administrativas
- tentativas repetidas de password reset ou magic link fora do padrao
- consultas ou erros envolvendo tabelas sensiveis sem motivo aparente
- uso inesperado de endpoints administrativos
- trafego vindo de IPs ou geografias incomuns

### Areas mais sensiveis para o Educly

- funcoes administrativas:
  - `admin-grant-access`
  - `admin-revoke-access`
  - `bulk-grant-access`
  - `send-signup-invite`
- funcoes publicas com maior risco operacional:
  - `auto-create-account`
  - `resend-magic-link`
  - `magic-login`
  - `pending-signup`
  - `confirm-signup-email`
- webhooks:
  - `paddle-webhook`
  - `primer-webhook`
  - `retry-failed-webhooks`
- segredos e automacoes:
  - tentativas com `invalid secret`
  - requests incomuns para jobs protegidos

## Procedimento minimo

1. Abrir `Authentication > Audit Logs`.
2. Revisar o periodo minimo dos ultimos `7` dias.
3. Procurar:
   - picos de `login`
   - muitos `user_recovery_requested`
   - `token_refreshed` em volume anormal
   - eventos de auth fora do horario esperado
4. Abrir `Logs Explorer`.
5. Revisar pelo menos estas fontes:
   - `edge_logs`
   - `function_edge_logs`
   - `function_logs`
   - `postgres_logs`
6. Filtrar por termos suspeitos:
   - `Unauthorized`
   - `Forbidden`
   - `permission denied`
   - `invalid secret`
   - `invalid authorization`
7. Revisar requests para funcoes administrativas e sensiveis.
8. Se houver plano com `Platform Audit Logs`, revisar tambem:
   - alteracoes de configuracao
   - convites de membros
   - mudancas em edge functions
   - rotacao de secrets e settings
9. Registrar o resultado da revisao nesta auditoria.

## Resultado esperado

Marcar como:

- `OK` quando os logs foram revisados e nao houve sinal relevante de acesso nao autorizado
- `Pendencia` quando a revisao ainda nao foi feita
- `Incidente` quando houver evidencias de acesso suspeito ou de tentativa maliciosa

## Template de registro

```md
Data da revisao:
Periodo revisado:
Responsavel:
Fontes consultadas:
Principais filtros:
Achados:
Conclusao:
Acoes tomadas:
```

## Fontes oficiais

- Supabase Auth Audit Logs: https://supabase.com/docs/guides/auth/audit-logs
- Supabase Logs Explorer: https://supabase.com/docs/guides/telemetry/logs
- Supabase Platform Audit Logs: https://supabase.com/docs/guides/security/platform-audit-logs
