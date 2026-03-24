# Politica - Rotacao de chaves e credenciais do Supabase

Data de criacao: 24/03/2026

Objetivo: definir quando e como rotacionar chaves, tokens e segredos ligados ao Supabase e aos fluxos que acessam o banco do Educly.

## Escopo desta politica

Esta politica cobre, no minimo:

- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_DB_URL`
- chaves `anon` e `publishable`
- `JWT secret` legado ou `JWT Signing Keys`
- secrets de edge functions
- segredos de webhook com impacto no banco
- credenciais de backup e automacoes que leem ou escrevem no banco

## Regra principal

Toda credencial com poder de ler, alterar ou administrar o banco deve possuir politica de rotacao definida antes de um incidente.

## Gatilhos obrigatorios de rotacao

Rotacionar imediatamente quando houver:

- vazamento confirmado em repositorio, print, chat, WhatsApp, e-mail ou log
- suspeita razoavel de comprometimento
- saida de colaborador com acesso ao segredo
- encerramento de contrato com terceiro que teve acesso
- uso indevido detectado nos logs
- perda de controle sobre o canal onde o segredo estava armazenado

Rotacionar tambem quando houver:

- mudanca de responsabilidade operacional
- migracao de ambiente
- revisao periodica planejada pela equipe

## Prioridade de resposta

- Critica:
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `SUPABASE_ACCESS_TOKEN`
  - `JWT secret` / `JWT Signing Keys`
  - qualquer segredo que permita admin, restore, dump ou bypass de RLS
- Alta:
  - secrets de webhook com efeito de escrita
  - segredos de jobs e automacoes
- Media:
  - chaves publicas/publishable expostas fora do contexto esperado

## Prazos alvo

- vazamento confirmado de credencial critica: iniciar rotacao no mesmo dia
- suspeita forte de comprometimento: iniciar rotacao em ate `24h`
- desligamento/offboarding com acesso privilegiado: concluir revisao e rotacao necessaria em ate `24h`
- rotacao preventiva planejada: conforme calendario interno da equipe

## Diretrizes especificas para o Supabase

- Se o projeto ainda usa `service_role` legado baseado em JWT, a direcao preferencial e migrar para `secret key` nova do painel de API Keys.
- Se houver necessidade de rotacionar o `JWT secret` legado ou `JWT Signing Keys`, tratar isso como mudanca de alto impacto porque pode afetar:
  - validacao de JWT fora do Supabase
  - edge functions com verificacao de JWT
  - integracoes que dependam do segredo antigo
- Ao rotacionar uma chave, corrigir primeiro a causa raiz do vazamento antes de revogar a credencial antiga.

## Procedimento padrao de rotacao

1. Identificar exatamente qual credencial foi exposta.
2. Mapear todos os lugares onde ela e usada:
   - Supabase Dashboard
   - GitHub Secrets
   - plataforma de deploy
   - edge functions
   - scripts locais
   - automacoes e webhooks
3. Corrigir a causa raiz do vazamento.
4. Criar a nova credencial no canal oficial.
5. Atualizar os ambientes e integracoes dependentes.
6. Validar os fluxos criticos.
7. Revogar ou deletar a credencial antiga.
8. Registrar:
   - data
   - motivo
   - responsavel
   - impacto
   - systems atualizados
   - validacoes executadas

## Fluxos criticos que devem ser validados apos rotacao

- login e refresh de sessao
- edge functions administrativas
- cadastro e magic link
- billing e webhooks
- backups
- jobs internos

## Diretrizes por tipo de chave

### `SUPABASE_SERVICE_ROLE_KEY`

- tratar como credencial critica maxima
- se houve exposicao historica, a rotacao e obrigatoria
- preferir migracao para `secret key` moderna quando possivel

### `SUPABASE_ACCESS_TOKEN`

- revogar e substituir quando houver suspeita de vazamento
- revisar quem pode usar tokens de conta no GitHub Actions e em scripts operacionais

### `JWT secret` legado / `JWT Signing Keys`

- executar apenas com checklist de impacto
- validar componentes que verificam JWT fora do Supabase
- se houver rotacao de chave de assinatura, concluir tambem a revogacao da chave anterior quando seguro

### Chaves publicas (`anon` / `publishable`)

- sao menos sensiveis, mas ainda exigem revisao se estiverem sendo usadas fora do contexto esperado
- se houver migracao de chave, atualizar frontend, mobile, scripts publicos e documentacao

## Registro minimo por evento de rotacao

```md
Data:
Credencial:
Motivo da rotacao:
Gravidade:
Responsavel:
Origem do risco:
Sistemas atualizados:
Validacoes executadas:
Data de revogacao da credencial antiga:
Observacoes:
```

## Aplicacao imediata no Educly

Com base nesta auditoria, deve ser tratada como prioridade a rotacao de:

- `SUPABASE_SERVICE_ROLE_KEY` exposta historicamente em script versionado
- `RESEND_API_KEY` exposta historicamente no mesmo contexto

## Fontes oficiais

- Supabase API Keys: https://supabase.com/docs/guides/api/api-keys
- Supabase JWT Signing Keys: https://supabase.com/docs/guides/auth/signing-keys
- Supabase troubleshooting sobre rotacao de anon, service e JWT: https://supabase.com/docs/guides/troubleshooting/rotating-anon-service-and-jwt-secrets-1Jq6yd
