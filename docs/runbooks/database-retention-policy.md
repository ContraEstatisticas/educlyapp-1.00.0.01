# Politica - Retencao e arquivamento de tabelas de crescimento rapido

Data de criacao: 24/03/2026

Objetivo: definir uma linha de base para retencao, purge e arquivamento das tabelas append-only e operacionais do Educly, reduzindo crescimento descontrolado e mantendo o minimo necessario para operacao, suporte e auditoria.

## Regra geral

- Nenhuma rotina destrutiva deve ser aplicada diretamente em producao sem validacao previa em ambiente separado ou em janela controlada.
- Tabelas de fila e rate limit devem privilegiar purge curto.
- Tabelas operacionais de auditoria e billing devem privilegiar retencao maior e, quando necessario, arquivamento antes de exclusao.
- Se houver exigencia legal, fiscal ou contratual superior ao prazo abaixo, prevalece a exigencia do negocio.

## Politica base por tabela

| Tabela | Categoria | Retencao online recomendada | Acao apos janela | Observacao |
| --- | --- | --- | --- | --- |
| `billing_event_logs` | billing / auditoria operacional | `12 meses` | arquivar ou exportar; excluir acima de `24 meses` se permitido | manter historico suficiente para suporte, reconciliacao e analise |
| `email_logs` | operacao de e-mail | `180 dias` | arquivar ou excluir apos `180 dias` | manter metadados recentes para suporte e entregabilidade |
| `chat_messages` | conteudo conversacional | `180 dias` | arquivar ou excluir conforme politica de produto | ja ha limitacao de leitura no app; retenção longa deve ser deliberada |
| `pending_thank_you_emails` | fila | `30 dias` apos `sent = true` | excluir | filas concluidas nao devem ficar crescendo indefinidamente |
| `webhook_failure_logs` | fila / incidente | manter pendentes ate resolucao; resolvidos por `90 dias` | excluir resolvidos antigos | pendentes e retrying permanecem ate resolucao |
| `password_reset_attempts` | rate limit / seguranca | `30 dias` | excluir | suficiente para protecao operacional e investigacao curta |
| `landing_chat_rate_limits` | rate limit efemero | `7 dias` | excluir | tabela deve ser tratada como altamente descartavel |
| `paddle_geral` | log bruto de webhook | `180 dias` | arquivar ou excluir conforme necessidade de billing | e um log bruto, nao deve crescer sem limite |
| `user_sessions` | sessao / observabilidade | `90 dias` | excluir ou agregar antes | manter apenas janela util para analise de uso e suporte |
| `user_bugs` | erro reportado pelo app | `180 dias` | arquivar ou excluir | bugs antigos resolvidos nao precisam ficar online para sempre |
| `error_logs` | erro operacional | `90 dias` | arquivar ou excluir | excecoes antigas devem sair da base transacional |

## Regras adicionais

### Fila

- tabelas de fila devem remover itens concluidos
- itens pendentes ou com retry em andamento nao devem ser apagados

### Billing e auditoria

- eventos de billing nao devem ser apagados sem avaliar suporte, chargeback, reconciliacao e obrigacoes do negocio
- quando possivel, prefira exportar/arquivar antes de excluir

### Conteudo de usuario

- qualquer exclusao de `chat_messages` deve respeitar a experiencia prometida ao usuario
- se o produto depender de historico mais longo, ajustar a janela antes de automatizar purge

## Ordem recomendada de implementacao futura

1. `landing_chat_rate_limits`
2. `password_reset_attempts`
3. `pending_thank_you_emails`
4. `webhook_failure_logs` resolvidos
5. `user_sessions`
6. `error_logs`
7. `user_bugs`
8. `email_logs`
9. `chat_messages`
10. `paddle_geral`
11. `billing_event_logs`

## Guardrails para implementacao

Antes de criar qualquer job de purge/arquivamento:

1. validar a query em staging
2. executar com `LIMIT` e amostra inicial quando fizer sentido
3. registrar a janela aplicada
4. guardar backup/export quando a tabela tiver valor historico
5. monitorar erros e volume removido

## Registro minimo por rotina

```md
Tabela:
Janela aplicada:
Tipo de acao:
Ambiente validado:
Responsavel:
Data de inicio:
Resultado:
Observacoes:
```
