# Auditoria de Banco Educly

Data base da auditoria: 24/03/2026  
Projeto auditado: `dqlcxpbfemhzzetwaxsa`  
Escopo deste documento: linha de base da auditoria unica de seguranca, performance, backup e controle de acesso do banco. Os proximos itens do checklist serao adicionados neste mesmo arquivo.

## Item 1/20 - Row Level Security (RLS) ativado em todas as tabelas que contem dados de usuario

Status: concluido.

### Objetivo

Garantir que toda tabela com dados de usuario, acesso, progresso, sessao, pagamento ou identificacao pessoal tenha `ROW LEVEL SECURITY` habilitado e com politicas compativeis com o acesso esperado.

### Metodologia usada em 24/03/2026

- Revisao das migrations em `supabase/migrations/`
- Revisao do schema tipado em `src/integrations/supabase/types.ts`
- Confirmacao de existencia real de tabelas via REST com `service_role`
- Checagem de comportamento anonimo basico via publishable key

Observacao importante: neste workspace nao havia conexao SQL administrativa pronta para consultar diretamente `pg_class.relrowsecurity` no ambiente remoto. Por isso, a validacao foi feita por evidencia de codigo versionado + existencia real das tabelas expostas pelo projeto atual.

### Tabelas de usuario identificadas neste item

`profiles`, `chat_messages`, `personalized_plans`, `billing_event_logs`, `billing_access_audit_log`, `premium_whitelist`, `certificates`, `paddle_customer`, `pending_thank_you_emails`, `password_reset_attempts`, `newsletter_subscriptions`, `ai_hub_usage`, `freelancer_module_progress`, `ai_trail_module_progress`, `api_rate_limits`, `user_access_tokens`, `user_certificates`, `user_challenge_progress`, `user_day_progress`, `user_freelancer_medals`, `user_lesson_attempts`, `user_level_rewards`, `user_levels`, `user_onboarding`, `user_premium_access`, `user_product_access`, `user_progress`, `user_roles`, `user_sessions`, `user_step_progress`, `user_streaks`, `user_xp_mission_claims`.

### O que estava OK

- As tabelas de usuario versionadas nas migrations principais ja tinham `ENABLE ROW LEVEL SECURITY` explicito.
- Entre as tabelas criticas revisadas, estavam com RLS versionado: `profiles`, `user_progress`, `user_step_progress`, `user_premium_access`, `user_product_access`, `chat_messages`, `billing_event_logs`, `certificates`, `newsletter_subscriptions`, `password_reset_attempts` e `paddle_customer`.
- Testes anonimos basicos via REST confirmaram bloqueio de leitura publica em tabelas sensiveis revisadas, com retorno vazio em `profiles` e `user_sessions`.

### O que foi encontrado fora do padrao

- `public.user_roles` existe no ambiente atual e no schema tipado da aplicacao, mas o repositorio nao continha uma migration explicita com `ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY`.
- `public.user_sessions` tambem existe no ambiente atual e no schema tipado, mas o repositorio nao continha uma migration explicita com `ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY`.
- Isso caracteriza drift de versionamento: o ambiente possui tabelas reais que nao estavam completamente representadas no historico do repositorio para este controle especifico.

### O que foi corrigido

- Foi criada a migration `supabase/migrations/20260324114500_enforce_rls_on_user_roles_and_sessions.sql`.
- Essa migration:
  - versiona explicitamente o `ENABLE ROW LEVEL SECURITY` em `public.user_roles`
  - versiona explicitamente o `ENABLE ROW LEVEL SECURITY` em `public.user_sessions`
  - recria `public.has_role(uuid, app_role)` no historico do projeto
  - garante as policies minimas de leitura para `user_roles` e `user_sessions` caso elas nao existam
- Na validacao posterior, foi criada tambem a migration `supabase/migrations/20260324121000_fix_has_role_for_rls_evaluation.sql`.
- Esse ajuste final:
  - permite que a avaliacao de policy em `user_roles` funcione tambem para requests anonimos
  - faz `public.has_role(...)` retornar `false` para chamadas anonimas e para consultas sobre qualquer usuario diferente do proprio caller
  - evita erro `permission denied for function has_role` sem abrir consulta de papel de outros usuarios

### O que ficou pendente

- Resolver em item proprio o drift de schema: a criacao original de `user_roles`, `user_sessions` e `has_role(...)` nao esta versionada de forma rastreavel no repositorio atual.
- Revisar `api_rate_limits` em item de politicas, porque embora tenha RLS habilitado, existe policy muito permissiva e isso precisa ser tratado separadamente.
- Confirmacao manual opcional no SQL Editor ou Dashboard do Supabase do flag de RLS para fins de evidencia adicional de auditoria.

### Validacao operacional apos a primeira migration

- `profiles` com chave publica: `200` e `[]`
- `user_sessions` com chave publica: `200` e `[]`
- `user_roles` com chave publica: `401 permission denied for function has_role`
- `rpc/is_admin` com sessao autenticada de admin: `true`
- `user_roles` com sessao autenticada de admin: leitura permitida
- `user_sessions` com sessao autenticada de admin: leitura permitida

### Validacao operacional final apos a segunda migration

- `profiles` com chave publica: `200` e `[]`
- `user_roles` com chave publica: `200` e `[]`
- `user_sessions` com chave publica: `200` e `[]`
- `rpc/is_admin` com sessao autenticada de admin: `true`
- `user_roles` com sessao autenticada de admin: leitura permitida
- `user_sessions` com sessao autenticada de admin: leitura permitida

Leitura final da validacao: o comportamento esperado de RLS foi confirmado para o escopo auditado neste item. Requests publicos nao conseguem ler dados dessas tabelas e o acesso administrativo continua funcional.

### Evidencias

- `src/integrations/supabase/types.ts` contem `user_roles` e `user_sessions`
- `supabase/migrations/20260212132615_9b421ad5-4a62-4d08-8bae-39b1d54c27cd.sql` contem policies para `user_sessions`
- `supabase/migrations/20260119151954_86a7079e-6bf5-4014-a2b4-5f5eb6162467.sql` contem policies para `user_roles`
- `supabase/migrations/20260324114500_enforce_rls_on_user_roles_and_sessions.sql` fecha a lacuna de versionamento encontrada neste item
- `supabase/migrations/20260324121000_fix_has_role_for_rls_evaluation.sql` fecha a ressalva operacional encontrada na validacao pos-migration

## Item 2/20 - Nenhuma tabela exposta publicamente sem politica de acesso definida

Status: concluido.

### Objetivo

Garantir que nenhuma tabela exposta pelo schema publico da API fique sem politica de acesso explicita, evitando comportamento implcito ou dependente de configuracao manual fora do historico de migrations.

### Metodologia usada em 24/03/2026

- Cruzamento entre `src/integrations/supabase/types.ts` e `supabase/migrations/`
- Validacao direta via REST com chave publica, sessao autenticada de admin e `service_role`
- Confirmacao de uso real dessas tabelas em `src/` e `supabase/functions/`

### O que estava OK

- As tabelas publicas de conteudo e progresso principais ja tinham policies versionadas no repositorio, por exemplo: `profiles`, `chat_messages`, `user_progress`, `user_step_progress`, `newsletter_subscriptions`, `billing_event_logs`, `paddle_customer`, `challenge_day_translations`.
- O ambiente atual nao retornou dados sensiveis para chave publica nas tabelas suspeitas revisadas.

### O que foi encontrado fora do padrao

- O schema tipado atual expõe tabelas publicas sem policy versionada nas migrations do repositrio: `email_logs`, `error_logs`, `user_bugs`, `webhook_logs`, `password_reset_attempts`, `user_access_tokens`.
- Essas tabelas respondem pela API REST publica do projeto, portanto entram no escopo direto deste item.
- `email_logs` e `user_bugs` demonstraram drift de versionamento no ambiente:
  - com chave publica retornam `200 []`
  - com sessao admin retornam dados
  - isso indica que existe controle de acesso em producao, mas ele nao esta representado no historico do repositorio
- `user_access_tokens` e `password_reset_attempts` tambem estao expostas na API publica e retornam `200 []` para chave publica, mas o repositrio nao tinha policy explicita para essas tabelas, apenas RLS ou configuracao parcial.
- `user_bugs` estava com comportamento inconsistente para o proprio app:
  - leitura admin funciona
  - insercao via front com chave publica e com sessao autenticada falha por RLS
  - o codigo do front tenta inserir nessa tabela em `src/App.tsx` e `src/utils/logger.ts`

### O que foi corrigido

- Foi criada a migration `supabase/migrations/20260324132000_version_policies_for_publicly_exposed_tables.sql`.
- Essa migration:
  - versiona explicitamente o `ENABLE ROW LEVEL SECURITY` para `email_logs`, `error_logs`, `user_bugs`, `webhook_logs`, `password_reset_attempts` e `user_access_tokens`
  - cria policy explicita de leitura admin para `email_logs`
  - cria policy explicita de leitura admin para `error_logs`
  - cria policy explicita de leitura admin para `webhook_logs`
  - cria policy explicita de leitura admin para `user_bugs`
  - cria policy explicita de insert para `user_bugs` por `anon` e `authenticated`, alinhando a tabela ao logger atual do front
  - cria policy explicita de bloqueio direto para `password_reset_attempts`
  - cria policy explicita de bloqueio direto para `user_access_tokens`

### O que ficou pendente

- Resolver em item proprio o problema estrutural de drift de schema, porque parte do controle atual existe no ambiente mas nao estava historicamente versionado.
- Se a equipe quiser manter captura de bugs antes do login, vale abrir follow-up especifico para `user_bugs`: na validacao atual o insert autenticado funciona, mas o insert anonimo ainda retorna violacao de RLS.

### Validacao operacional final apos a migration

- `email_logs` com chave publica: `200` e `[]`
- `error_logs` com chave publica: `200` e `[]`
- `user_bugs` com chave publica para leitura: `200` e `[]`
- `webhook_logs` com chave publica: `200` e `[]`
- `password_reset_attempts` com chave publica: `200` e `[]`
- `user_access_tokens` com chave publica: `200` e `[]`
- `challenge_day_translations` continua publica por desenho e com policy explicita: retorna dados normalmente
- `rpc/is_admin` com sessao autenticada de admin: `true`
- `email_logs` com sessao admin: leitura permitida
- `user_bugs` com sessao admin: leitura permitida
- `error_logs` com sessao admin: leitura permitida
- `webhook_logs` com sessao admin: leitura permitida
- `password_reset_attempts` com sessao autenticada de admin: `200` e `[]`
- `user_access_tokens` com sessao autenticada de admin: `200` e `[]`
- `user_bugs` com insert autenticado: `201` e insert permitido
- `user_bugs` com insert anonimo: `401` por RLS

Leitura final da validacao: o requisito deste item foi atendido. As tabelas expostas auditadas agora possuem politica explicita versionada no repositorio e nao expõem leitura publica indevida. A unica ressalva observada foi funcional, nao de exposicao: o logger anonimo de `user_bugs` ainda nao insere sem sessao.

### Evidencias

- `src/integrations/supabase/types.ts` expõe as tabelas `email_logs`, `error_logs`, `user_bugs`, `webhook_logs`, `password_reset_attempts` e `user_access_tokens`
- `src/App.tsx` e `src/utils/logger.ts` tentam inserir em `user_bugs`
- `src/pages/AdminEmails.tsx` consulta `email_logs` com sessao autenticada
- `supabase/functions/track-email-open/index.ts` atualiza `email_logs` via `service_role`
- `supabase/migrations/20260324132000_version_policies_for_publicly_exposed_tables.sql` fecha a lacuna de policy explicita para as tabelas auditadas neste item

## Item 3/20 - Chaves de API do Supabase separadas por ambiente (producao, desenvolvimento)

Status: Stand-by. Atualmente não faz sentido criar um supabase so para o ambiente de desenvolvimento pois dobraria o trabalho de cada alteração que fizermos e aumentaria os custos com banco e desenvolvimento pois teriamos que manter dois bancos de dados.
## Item 4/20 - Service role key nunca exposta no front-end ou em variaveis publicas

Status: concluido no escopo de frontend/variaveis publicas, com pendencia operacional de rotacao da chave exposta historicamente.

### Faz sentido?

Sim. Este item faz total sentido para o Educly.

A chave `service_role` tem privilegios administrativos sobre o projeto e nao pode aparecer em frontend, `import.meta.env`, variaveis publicas de build nem em scripts versionados com valor real.

### Objetivo

Garantir que a `service_role key` do Supabase nunca seja entregue ao navegador nem exposta em configuracoes publicas do app.

### Metodologia usada em 24/03/2026

- Revisao do frontend em `src/`
- Busca por variaveis publicas (`VITE_*`, `NEXT_PUBLIC_*`, `PUBLIC_*`)
- Busca por chaves reais hardcoded no repositorio
- Revisao de scripts auxiliares que acessam Supabase com privilegio administrativo

### O que estava OK

- Nao foi encontrado uso de `service_role` no frontend.
- Nao foi encontrado `VITE_SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_*SERVICE_ROLE*`, `PUBLIC_*SERVICE_ROLE*` nem `import.meta.env` carregando `service_role`.
- O cliente do app em `src/integrations/supabase/client.ts` usa somente a chave anon/publicavel do Supabase.
- O uso de `SUPABASE_SERVICE_ROLE_KEY` dentro das edge functions permanece no lado servidor, o que e esperado.

### O que foi encontrado fora do padrao

- A chave real `service_role` estava hardcoded em `send-bugfix-notification.ps1`.
- O mesmo script tambem continha `RESEND_API_KEY` hardcoded.
- Isso nao caracterizava exposicao no front-end, mas caracterizava exposicao grave de segredo no repositorio.

### O que foi corrigido

- `send-bugfix-notification.ps1` deixou de conter a `service_role key` real.
- O script agora exige variaveis de ambiente em tempo de execucao:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `RESEND_API_KEY`
- Foi confirmado que a chave `service_role` nao esta em variaveis publicas do app no repositrio atual.

### O que ficou pendente

- Rotacionar imediatamente a `SUPABASE_SERVICE_ROLE_KEY` real do projeto, porque ela ficou exposta historicamente no repositorio.
- Rotacionar tambem a `RESEND_API_KEY` exposta no mesmo script.
- Revisar historico de git e qualquer log externo ou backup de script, porque a remocao do arquivo atual nao elimina exposicoes passadas.

### Evidencias

- `send-bugfix-notification.ps1` foi saneado para usar variaveis de ambiente
- Nao foram encontrados usos de `service_role` em variaveis publicas de frontend no repositrio atual

## Item 5/20 - Senhas e dados sensiveis armazenados com hash, nunca em texto puro

Status: sem alteracoes implementadas por decisao do time. Item considerado atendido no escopo estrito de senhas de usuario.

### Faz sentido?

Sim. Este item faz sentido como validacao de que o produto nao armazena senha de usuario em texto puro.

Depois da revisao, a leitura final do time foi manter este checklist com foco estrito em senha de usuario, sem ampliar para uma frente separada de hardening de tokens auxiliares e registros tecnicos.

### Objetivo

Garantir que senhas de usuario nao estejam armazenadas em texto puro no banco.

### Metodologia usada em 24/03/2026

- Revisao das migrations e do schema tipado em `src/integrations/supabase/types.ts`
- Busca por colunas e fluxos com `password`
- Revisao dos fluxos de autenticacao e criacao de conta

### O que estava OK

- As senhas principais de usuarios ficam sob Supabase Auth, que faz hashing internamente. Nao foi encontrada nenhuma tabela publica do app armazenando senha de usuario em texto puro.
- O campo `generated_password` do fluxo de criacao de conta e transitado apenas em memoria/resposta/e-mail; ele nao e persistido em tabela publica do app.
- Nao foi encontrada tabela publica do app com coluna dedicada a senha persistida em texto puro.

### O que foi avaliado e nao entrou como correcao deste item

- Durante a analise surgiram oportunidades de hardening em tokens auxiliares e registros tecnicos, como `user_access_tokens` e `password_reset_attempts`.
- O time decidiu nao tratar esses pontos dentro deste checklist, porque eles nao representam senha de usuario armazenada em texto puro e abririam uma frente maior de refactor de login e rate limit.

### O que foi corrigido

- Nenhuma alteracao de codigo, schema ou migration foi mantida para este item.

### O que ficou pendente

- Nenhuma pendencia obrigatoria para fechar este item no criterio estrito de senha em texto puro.

### Evidencias

- O fluxo de autenticacao principal usa Supabase Auth para senhas de usuario
- Nao foi encontrada tabela publica do app dedicada a persistir senha de usuario em texto puro
- Decisao registrada do time: nao ampliar este item para hardening adicional de tokens auxiliares

## Item 6/20 - Auditoria de quais usuarios e servicos tem acesso direto ao banco

Status: auditado no repositorio, com achados criticos e pendencias operacionais. Ainda nao deve ser marcado como concluido.

### Objetivo

Mapear quais usuarios, funcoes, scripts, automacoes e integracoes conseguem acessar o banco diretamente, com qual credencial, e em que camada esse acesso ocorre.

### Metodologia usada em 24/03/2026

- Revisao do cliente web em `src/integrations/supabase/client.ts`
- Revisao de `supabase/config.toml`
- Busca no repositorio por `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ACCESS_TOKEN`, `is_admin`, `auth.admin` e `createClient`
- Revisao das edge functions que operam com `service_role`
- Revisao de scripts e automacoes operacionais ligados ao banco
- Revisao das migrations para entender o padrao de `auth.uid()`, `is_admin()` e `SECURITY DEFINER`

Observacao importante: esta auditoria identifica os caminhos de acesso versionados no repositorio, mas nao confirma quais pessoas da equipe possuem acesso hoje no painel do Supabase, na organizacao do Github ou nos secrets reais dos ambientes. Essa confirmacao depende de checagem operacional fora do codigo.

### Mapa de acesso direto identificado

- Usuarios finais do app acessam o banco pelo navegador usando apenas a chave publishable/anon do projeto em `src/integrations/supabase/client.ts`. Esse acesso depende de RLS, policies e RPCs liberadas ao papel `anon` ou `authenticated`.
- Usuarios administrativos do app acessam dados sensiveis por sessao autenticada e verificacao de `is_admin()`, tanto no front quanto em edge functions administrativas como `admin-grant-access`, `admin-revoke-access`, `bulk-grant-access`, `send-signup-invite`, `send-pending-welcome-batch` e `resend-dashboard`.
- Servicos internos privilegiados acessam o banco com `SUPABASE_SERVICE_ROLE_KEY`. A busca no repositorio encontrou 28 edge functions com esse nivel de acesso, cobrindo login, billing, chat, e-mail, webhooks e automacoes internas.
- Automacoes operacionais tambem possuem acesso direto: o workflow `.github/workflows/db_backup.yml` usa `SUPABASE_ACCESS_TOKEN` para gerar dump do banco, e o script `send-bugfix-notification.ps1` usa `SUPABASE_SERVICE_ROLE_KEY` em tempo de execucao para ler Auth e `profiles`.
- Integracoes externas com efeito direto sobre o banco existem via secrets dedicados, por exemplo `paddle-webhook`, `primer-webhook`, `retry-failed-webhooks`, `send-bulk-emails`, `resend-pending-emails` e `debug-billing`.

### O que estava OK

- O cliente publico do front nao usa `service_role`. O acesso normal do usuario continua limitado ao publishable key e ao conjunto de policies/RPCs liberadas pelo banco.
- As rotas administrativas principais revisadas exigem credencial de usuario e checam `is_admin()` antes de escalar para `service_role`, o que cria separacao razoavel entre usuario comum e operacao administrativa.
- O padrao de acesso de usuario final nas migrations continua predominantemente baseado em `auth.uid() = user_id`, com uso de `SECURITY DEFINER` apenas em funcoes especificas.
- O acesso privilegiado mais forte ficou concentrado no servidor, em edge functions, workflow de backup e script operacional, nao no navegador.

### O que foi encontrado fora do padrao

- Nao existe no repositorio um inventario operacional fechado dizendo quais pessoas, maquinas ou integracoes detem hoje acesso administrativo ao projeto Supabase, aos secrets do Github Actions e aos artefatos de backup. Para este item, isso e uma lacuna real de governanca.
- `supabase/config.toml` esta com `verify_jwt = false` inclusive em funcoes administrativas como `bulk-grant-access`, `send-signup-invite` e `admin-revoke-access`. Nessas rotas ainda existe validacao no codigo, mas a barreira de JWT nao esta sendo aplicada na camada da plataforma.
- Existem funcoes publicas com `verify_jwt = false` que usam `service_role` e executam operacoes diretas em Auth ou no banco sem autenticacao forte por JWT de usuario. Os casos mais sensiveis revisados foram `auto-create-account`, `resend-magic-link`, `magic-login`, `pending-signup` e `confirm-signup-email`.
- O workflow de backup concede capacidade de dump completo do banco a qualquer contexto que consiga usar `SUPABASE_ACCESS_TOKEN`, disparar o workflow e baixar o artifact gerado no Github.
- O projeto ja possui um numero alto de consumidores de `service_role` espalhados por funcoes diferentes, sem uma matriz versionada de dono, finalidade, segredo exigido e criticidade.

### O que foi corrigido

- Nenhuma alteracao de codigo, schema ou configuracao foi aplicada neste item.
- A leitura deste item e de inventario e risco. As correcoes naturais daqui impactam fluxos de cadastro, login, webhooks, billing e automacoes, entao devem ser testadas primeiro em ambiente separado antes de qualquer mudanca em producao.

### O que ficou pendente

- Confirmar no painel do Supabase quais usuarios humanos tem acesso ao projeto, qual nivel de permissao cada um possui e se existe algum token operacional antigo ainda ativo.
- Confirmar no Github quem pode ler ou alterar `SUPABASE_ACCESS_TOKEN`, disparar o workflow de backup, acessar os artifacts e administrar secrets do repositorio.
- Criar uma matriz formal dos acessos privilegiados encontrados neste item: servico, arquivo, segredo usado, finalidade, dono, ambiente e risco.
- Revisar em staging se as funcoes `auto-create-account`, `resend-magic-link`, `magic-login`, `pending-signup` e `confirm-signup-email` precisam de autenticacao adicional por JWT, secret compartilhado, assinatura HMAC ou outra camada de validacao.
- Revisar em staging se `bulk-grant-access`, `send-signup-invite` e `admin-revoke-access` podem voltar a usar `verify_jwt = true`, reduzindo dependencia de validacao manual no codigo.

### Leitura final da auditoria

O item mostrou que o Educly ja separa razoavelmente o acesso de usuario comum do acesso administrativo, mas ainda nao possui inventario operacional completo de quem pode entrar no banco por caminhos privilegiados. O principal risco tecnico atual nao esta no front e sim em funcoes server-side com `service_role` e `verify_jwt = false`, que precisam de revisao controlada antes da escala.

### Evidencias

- `src/integrations/supabase/client.ts` usa apenas a chave publishable/anon no navegador
- `src/components/AdminGuard.tsx` usa `rpc('is_admin')` para proteger telas administrativas
- `supabase/functions/admin-grant-access/index.ts` valida admin e depois usa `service_role`
- `supabase/functions/admin-revoke-access/index.ts` valida usuario/admin e depois usa `service_role`
- `supabase/functions/bulk-grant-access/index.ts` valida admin e depois usa `service_role`
- `supabase/functions/send-signup-invite/index.ts` valida admin e depois usa `service_role`
- `supabase/functions/send-pending-welcome-batch/index.ts` valida admin e depois usa `service_role`
- `supabase/functions/resend-dashboard/index.ts` valida admin antes de expor dados do Resend
- `supabase/functions/auto-create-account/index.ts` usa `service_role` com `verify_jwt = false`
- `supabase/functions/resend-magic-link/index.ts` usa `service_role` com `verify_jwt = false`
- `supabase/functions/magic-login/index.ts` usa `service_role` com `verify_jwt = false`
- `supabase/functions/pending-signup/index.ts` usa `service_role` com `verify_jwt = false`
- `supabase/functions/confirm-signup-email/index.ts` usa `service_role` com `verify_jwt = false`
- `supabase/functions/paddle-webhook/index.ts` usa secrets externos e `service_role`
- `supabase/functions/primer-webhook/index.ts` usa assinatura/secret externo e `service_role`
- `supabase/functions/retry-failed-webhooks/index.ts` aceita `CRON_SECRET` ou `service_role`
- `supabase/functions/send-bulk-emails/index.ts` usa `BULK_EMAIL_SECRET` e `service_role`
- `supabase/functions/resend-pending-emails/index.ts` usa `BULK_EMAIL_SECRET` e `service_role`
- `supabase/functions/debug-billing/index.ts` usa `DEBUG_TOKEN` e `service_role`
- `send-bugfix-notification.ps1` usa `SUPABASE_SERVICE_ROLE_KEY` em tempo de execucao
- `.github/workflows/db_backup.yml` usa `SUPABASE_ACCESS_TOKEN` para dump do banco
- `supabase/config.toml` registra quais funcoes estao com `verify_jwt = false`

## Item 7/20 - Performance

Status: auditado no repositorio, com gargalos concretos identificados e pendencias de medicao operacional. Ainda nao deve ser marcado como concluido.

### Objetivo

Avaliar se o banco e as consultas principais do Educly estao preparados para crescer sem degradar login, billing, dashboard admin, trilhas e automacoes.

### Metodologia usada em 24/03/2026

- Revisao das consultas do app em `src/`
- Revisao das edge functions em `supabase/functions/`
- Cruzamento entre filtros usados em runtime e indices versionados nas migrations
- Revisao das tabelas de maior uso operacional: `billing_event_logs`, `email_logs`, `pending_thank_you_emails`, `webhook_failure_logs`, `password_reset_attempts`, `user_access_tokens`, `chat_messages`, `ai_hub_usage` e tabelas de acesso do usuario

Observacao importante: sem acesso direto ao ambiente remoto, esta auditoria nao conseguiu rodar `EXPLAIN ANALYZE`, verificar uso real de indices, medir tempo de execucao ou confirmar dados de `pg_stat_statements`. Portanto, este item fecha a linha de base tecnica no repositorio, mas nao substitui medicao real em staging/producao.

### O que estava OK

- O projeto ja tem varios indices relevantes versionados para rotas sensiveis do produto e das automacoes.
- `password_reset_attempts` possui indice em `(email, created_at)`, alinhado ao rate limit de reset de senha.
- `pending_thank_you_emails` possui indices parciais para fila pendente por `send_after` e `email`, alinhados ao job de envio.
- `webhook_failure_logs` possui indices para `status`, `next_retry_at`, `webhook_source` e `event_id`, alinhados ao processo de retry.
- `user_access_tokens` possui unicidade para `user_id` e `token`, alinhada aos fluxos de magic link e login por token.
- `chat_messages`, `user_sessions`, `ai_hub_usage`, `user_progress`, `user_step_progress` e outras tabelas centrais do produto ja contam com PKs, uniques ou indices voltados a consultas por usuario.
- A migration base do projeto ja registra a extensao `pg_stat_statements`, o que e positivo para observabilidade de query quando confirmada no ambiente.

### O que foi encontrado fora do padrao

- Existe um gargalo estrutural em varias edge functions que procuram usuario por e-mail varrendo o Supabase Auth com `auth.admin.listUsers` paginado em lotes de 1000. Isso aparece em `auto-create-account`, `resend-magic-link`, `pending-signup`, `purchased-signup`, `admin-grant-access`, `bulk-grant-access`, `admin-revoke-access`, `paddle-webhook`, `primer-webhook`, `send-bulk-emails` e outras rotas. Com a base crescendo, esse padrao escala de forma linear com o numero total de usuarios.
- `billing_event_logs` tem indices basicos versionados, mas as consultas mais importantes do fluxo usam formatos que nao estao cobertos de forma ideal pelos indices atuais:
  - varias funcoes e RPCs usam `LOWER(email) = LOWER(...)`, enquanto o indice versionado e simples em `email`
  - o `paddle-webhook` checa duplicidade com `payload @> {"event_id": ...}` via `.contains("payload", ...)`, mas nao foi encontrado indice GIN versionado para `payload`
  - dashboards admin fazem filtros textuais por `event_type` com `ILIKE '%chargeback%'`, `ILIKE '%refund%'` e similares, que tendem a degradar com volume
- `email_logs` e hoje uma tabela operacional importante para painel admin, dedupe de envio, tracking de abertura e fluxo de suporte, mas sua criacao e seus indices nao estao versionados no repositorio atual. Isso impede auditar cobertura de indice com seguranca.
- O painel admin faz varias leituras pesadas e agregacoes no lado cliente sobre `billing_event_logs` e `email_logs`, por exemplo:
  - `BillingEventsChart` carrega ate 5000 linhas para contar tipos no browser
  - `AdminEmails` dispara varias contagens separadas sobre `email_logs`
  - `KPICards` e `CancellationsTable` usam filtros textuais amplos em `billing_event_logs`
- Mesmo onde existem indices simples, algumas consultas podem estar pedindo combinacoes mais especificas do que os indices atuais cobrem bem, principalmente em `billing_event_logs` e `user_product_access`.

### O que foi corrigido

- Foi preparada a migration `supabase/migrations/20260324183000_item7_performance_indexes.sql` com indices de baixo risco para os gargalos mais claros encontrados na auditoria.
- Essa migration adiciona:
  - indices de apoio para `billing_event_logs` em busca por e-mail normalizado, dedupe em `payload`, filtro textual por `event_type` e leitura de pendentes
  - indices para `user_product_access` nas combinacoes mais usadas por usuario e por produto ativo
  - indice parcial para `user_premium_access` ativo
  - indices guardados por existencia para `email_logs`, cobrindo dedupe, filtros por status/data e busca textual por e-mail
- Foi preparado tambem o roteiro de validacao `docs/sql/item7-performance-check.sql` para execucao no SQL Editor do Supabase apos aplicar a migration.

### O que ficou pendente

- Aplicar primeiro em staging e depois em producao a migration `supabase/migrations/20260324183000_item7_performance_indexes.sql`.
- Rodar no SQL Editor o roteiro `docs/sql/item7-performance-check.sql` e guardar o resultado como evidencia da auditoria.
- Medir no ambiente real as consultas mais caras com `pg_stat_statements`, cardinalidade e tamanho das tabelas.
- Reduzir o uso de `auth.admin.listUsers` como mecanismo de busca por e-mail. Esse continua sendo o maior gargalo estrutural de escalabilidade encontrado no item.
- Revisar em staging a estrategia de indice para `billing_event_logs`, com especial atencao a:
  - busca por e-mail normalizado
  - consultas por `processed` + `event_type` + tempo
  - dedupe por `event_id` hoje guardado dentro de `payload`
- Revisar em staging o custo dos dashboards administrativos e migrar contagens/agregacoes mais pesadas para RPCs ou consultas agregadas no servidor, evitando leitura massiva e processamento no navegador.
- Confirmar no Supabase o uso real de indices, possivel bloat, autovacuum e tempo medio das queries mais frequentes antes de marcar este item como fechado.

### Leitura final da auditoria

O Educly ja possui uma base razoavel de indices para varias tabelas criticas, mas ainda nao esta pronto para ser chamado de "auditado e fechado" em performance. O maior risco antes da escala esta em tres frentes: busca linear de usuarios no Auth, consultas de billing com forma pouco amigavel a indice e carga administrativa puxando muito dado para o cliente.

### Evidencias

- `supabase/migrations/20260114174206_remix_migration_from_pg_dump.sql` registra `pg_stat_statements` e varios indices base
- `supabase/migrations/20260116173039_f174f26e-076d-4324-becf-a49639726de2.sql` cria `billing_event_logs` e indices basicos por `email`, `processed` e `event_type`
- `supabase/migrations/20260116181949_7c3d7ea3-b9d7-4b70-9334-a040804c947f.sql` usa `LOWER(email)` em `process_pending_billing_events`
- `supabase/migrations/20260214113802_cd6d98c6-81c1-4d99-8155-4d14629a9734.sql` cria indices da fila `pending_thank_you_emails`
- `supabase/migrations/20260312130000_create_webhook_failure_logs.sql` cria indices da fila de retry de webhooks
- `supabase/migrations/20260320173100_add_password_reset_rate_limiting.sql` cria indice de rate limit em `password_reset_attempts`
- `supabase/migrations/20260316165853_de9eaf83-510b-4822-93ab-a23d87d5131b.sql` cria `user_access_tokens` com unicidade e indice por token
- `supabase/migrations/20260319170000_assistants_hub_chat_persistence.sql` cria indice composto para `chat_messages`
- `supabase/migrations/20260318152000_harden_session_tracking.sql` cria indices de `user_sessions`
- `supabase/functions/auto-create-account/index.ts`, `supabase/functions/resend-magic-link/index.ts`, `supabase/functions/pending-signup/index.ts`, `supabase/functions/purchased-signup/index.ts`, `supabase/functions/admin-grant-access/index.ts` e `supabase/functions/bulk-grant-access/index.ts` fazem busca paginada em `auth.admin.listUsers`
- `supabase/functions/paddle-webhook/index.ts` faz dedupe via `.contains("payload", { event_id: ... })` em `billing_event_logs`
- `src/pages/AdminEmails.tsx` faz varias contagens e filtros em `email_logs`
- `src/components/admin/BillingEventsChart.tsx` carrega ate 5000 eventos para agregacao no browser
- `src/components/admin/KPICards.tsx` e `src/components/admin/CancellationsTable.tsx` fazem filtros textuais amplos em `billing_event_logs`
- `supabase/migrations/20260324183000_item7_performance_indexes.sql` prepara os indices de baseline deste item
- `docs/sql/item7-performance-check.sql` prepara a validacao operacional deste item

## Item 8/20 - Indices criados nas colunas mais consultadas (`user_id`, `email`, `status`, `created_at`)

Status: corrigido no repositorio, pendente execucao da migration e validacao no ambiente.

### Objetivo

Garantir que as colunas mais consultadas pelo app e pelas automacoes do banco tenham indices compativeis com os filtros e ordenacoes realmente usados em producao, especialmente `user_id`, `email`, `status` e `created_at`.

### Metodologia usada em 24/03/2026

- Revisao das consultas em `src/` e `supabase/functions/`
- Revisao das tabelas com essas colunas no schema tipado
- Cruzamento com os indices versionados nas migrations
- Foco nas tabelas que efetivamente aparecem nas leituras operacionais do produto, billing e admin

### O que estava OK

- Varias tabelas de usuario ja tinham cobertura de `user_id` por PK, unique ou indice composto, por exemplo `personalized_plans`, `user_progress`, `user_step_progress`, `user_lesson_attempts`, `user_sessions`, `chat_messages`, `ai_hub_usage`, `user_access_tokens`, `user_product_access` e `user_premium_access`.
- `billing_event_logs` ja tinha indice versionado para `email`.
- `password_reset_attempts` ja tinha indice versionado em `(email, created_at)`.
- `pending_thank_you_emails` ja tinha indice parcial por `email`.
- `webhook_failure_logs` ja tinha indices por `status`, `next_retry_at` e `(webhook_source, created_at)`.
- `newsletter_subscriptions` e `paddle_customer` ja tinham indices ligados a e-mail.

### O que foi encontrado fora do padrao

- `billing_event_logs` nao tinha indice versionado para o historico do usuario em `user_id + created_at`, embora esse padrao seja usado na tela de cobranca do usuario.
- `billing_event_logs` tambem nao tinha indice versionado especifico para filtros por `status + created_at`, usados no monitoramento admin e em consultas operacionais.
- `billing_event_logs` nao tinha indice simples versionado para listagem global por `created_at DESC`, usada no painel admin.
- `email_logs` e muito consultada por `recipient_email`, `status` e `created_at`, mas sua estrategia de indices nao estava versionada no repositorio atual.
- A busca textual por e-mail em `email_logs` com `ILIKE` ficava sem cobertura explicita no historico versionado.

### O que foi corrigido

- Foi criada a migration `supabase/migrations/20260324190000_item8_hot_column_indexes.sql`.
- Essa migration adiciona:
  - `idx_bel_user_id_created_at` em `billing_event_logs`
  - `idx_bel_status_created_at` em `billing_event_logs`
  - `idx_bel_created_at_desc` em `billing_event_logs`
  - indices guardados por existencia para `email_logs` em `recipient_email`, `status` e `created_at`
  - indice trigram para busca textual por `recipient_email` em `email_logs`
- Foi criado tambem o roteiro `docs/sql/item8-hot-index-check.sql` para validacao rapida no SQL Editor.

### O que ficou pendente

- Aplicar a migration `supabase/migrations/20260324190000_item8_hot_column_indexes.sql` em staging.
- Em producao, preferir o script manual `docs/sql/item8-hot-index-prod-safe.sql`, que usa `CREATE INDEX CONCURRENTLY` para reduzir risco de lock em escrita.
- Rodar `docs/sql/item8-hot-index-check.sql` no SQL Editor e guardar o resultado como evidencia do checklist.
- Confirmar no ambiente se `email_logs` existe com os nomes de coluna esperados, para que os indices guardados sejam de fato criados.
- Encaminhar em item proprio a parte mais estrutural de performance que nao se resolve so com indice, como as buscas lineares em `auth.admin.listUsers`.

### Leitura final da auditoria

No escopo estrito deste checklist, a maior lacuna estava em `billing_event_logs` e na falta de versionamento da indexacao de `email_logs`. A correcao ja esta preparada no repositorio e este item pode ser fechado depois da execucao da migration e da checagem dos indices no ambiente.

### Evidencias

- `src/pages/Billing.tsx` consulta `billing_event_logs` por `user_id` e ordena por `created_at`
- `src/components/admin/BillingLogsTable.tsx` consulta `billing_event_logs` por `status` e usa `created_at` para analise de pendencias
- `src/pages/AdminEmails.tsx` consulta `email_logs` com filtros por `status`, `created_at` e busca por e-mail
- `supabase/migrations/20260116173039_f174f26e-076d-4324-becf-a49639726de2.sql` ja possuia indice versionado de `billing_event_logs(email)`
- `supabase/migrations/20260320173100_add_password_reset_rate_limiting.sql` ja possuia indice versionado de `(email, created_at)` em `password_reset_attempts`
- `supabase/migrations/20260214113802_cd6d98c6-81c1-4d99-8155-4d14629a9734.sql` ja possuia indice por `email` em `pending_thank_you_emails`
- `supabase/migrations/20260312130000_create_webhook_failure_logs.sql` ja possuia indice por `status` e `(webhook_source, created_at)` em `webhook_failure_logs`
- `supabase/migrations/20260324190000_item8_hot_column_indexes.sql` fecha a lacuna principal deste item
- `docs/sql/item8-hot-index-prod-safe.sql` prepara a execucao mais segura em producao
- `docs/sql/item8-hot-index-check.sql` prepara a validacao operacional deste item
