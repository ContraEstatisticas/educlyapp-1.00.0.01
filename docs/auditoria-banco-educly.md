# Auditoria de Banco Educly

Data base da auditoria: 24/03/2026  
Projeto auditado: `dqlcxpbfemhzzetwaxsa`  
Escopo deste documento: linha de base da auditoria unica de seguranca, performance, backup e controle de acesso do banco. Os proximos itens do checklist serao adicionados neste mesmo arquivo.

## Resumo executivo

### Itens ja fechados ou atendidos no escopo definido

- `1` RLS ativado nas tabelas auditadas
- `2` Tabelas publicas com politica explicita
- `4` Service role fora do frontend e variaveis publicas, com rotacao operacional das chaves expostas ja confirmada
- `5` Atendido no escopo estrito de senha de usuario em texto puro, por decisao do time
- `6` Inventario de usuarios e servicos com acesso direto ao banco consolidado
- `7` Baseline de performance auditada, com melhorias seguras aplicadas e backlog tecnico de tuning documentado
- `9` Queries lentas identificadas e baseline operacional documentada
- `10` N+1 removido das rotas principais auditadas
- `11` Politica de retencao/arquivamento definida para tabelas de crescimento rapido
- `12` Connection pooling confirmado operacionalmente
- `13` Backup automatico nativo confirmado no Supabase
- `14` Frequencia de backup documentada e adequada ao contexto atual
- `15` Restore de teste validado operacionalmente
- `16` Processo de restore documentado
- `17` Revisao de acesso ao painel do Supabase em producao concluida
- `18` Politica e confirmacao operacional de compartilhamento seguro de credenciais
- `20` Politica de rotacao de chaves definida

### Item em stand-by por decisao do time

- `3` Separacao de projetos Supabase por ambiente: mantido em stand-by por custo e carga operacional no contexto atual
- `8` Criacao dos hot indexes em producao: adiada por decisao tecnica para evitar risco operacional desnecessario no ambiente atual

### Itens que ainda precisam de fechamento operacional ou tecnico

- `19` Revisao real dos logs para detectar acessos nao autorizados, reabrindo este item a partir de `31/03/2026`

### Ordem recomendada para fechar os pendentes

1. `19` Revisar `Auth Audit Logs`, `Logs Explorer` e logs de funcoes a partir de `31/03/2026`, cobrindo a primeira janela minima apos a ativacao dos audit logs em `24/03/2026`.

### Leitura executiva

O Educly saiu desta primeira auditoria com a base de seguranca estrutural muito mais madura do que antes: RLS, policies, backup, restore, controle de acesso, performance baseline e politica de rotacao agora estao estabelecidos e validados. O unico ponto ainda aberto nesta rodada e a revisao real dos logs do Supabase, que foi corretamente agendada para depois de `31/03/2026` porque os audit logs foram ativados em `24/03/2026`.

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

Status: concluido. A exposicao foi removida do repositorio e a rotacao operacional das chaves afetadas foi confirmada.

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

- Revisar historico de git e qualquer log externo ou backup de script, porque a remocao do arquivo atual nao elimina exposicoes passadas.

### Validacao operacional complementar

- Segundo confirmacao operacional do time em `24/03/2026`, a `SUPABASE_SERVICE_ROLE_KEY` e a `RESEND_API_KEY` expostas historicamente ja foram rotacionadas.

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

Status: concluido como auditoria e inventario de acesso. Os principais caminhos de acesso direto ao banco foram mapeados e as validacoes operacionais criticas confirmadas pelo time.

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

- Foi criada a matriz [supabase-direct-access-matrix.md](/c:/Users/User/Documents/GitHub/Marcos/educlyapp-1.00.0.01/docs/runbooks/supabase-direct-access-matrix.md#L1) para consolidar os principais acessos diretos/privilegiados ao banco, com tipo de agente, credencial, finalidade e risco.
- A leitura deste item continua sendo de inventario e risco. As correcoes naturais daqui impactam fluxos de cadastro, login, webhooks, billing e automacoes, entao devem ser testadas primeiro em ambiente separado antes de qualquer mudanca em producao.
- A confirmacao operacional do item 17 reduziu uma parte da incerteza deste item: segundo o time, o painel do Supabase em producao ja foi revisado e mantido apenas com pessoas autorizadas.
- A confirmacao operacional do item 18 reduziu outra parte da incerteza: segundo o time, credenciais de banco nao sao compartilhadas por WhatsApp nem por e-mail comum sem criptografia.
- Segundo confirmacao operacional adicional do time em `24/03/2026`, apenas pessoas autorizadas podem ler ou alterar `SUPABASE_ACCESS_TOKEN`, disparar workflows, baixar artifacts e administrar secrets do repositorio.

### O que ficou pendente

- Revisar em staging se as funcoes `auto-create-account`, `resend-magic-link`, `magic-login`, `pending-signup` e `confirm-signup-email` precisam de autenticacao adicional por JWT, secret compartilhado, assinatura HMAC ou outra camada de validacao.
- Revisar em staging se `bulk-grant-access`, `send-signup-invite` e `admin-revoke-access` podem voltar a usar `verify_jwt = true`, reduzindo dependencia de validacao manual no codigo.

### Leitura final da auditoria

O item 6 pode ser marcado como OK no escopo de auditoria de acesso. O Educly agora possui inventario documentado dos principais caminhos de acesso direto ao banco e validacoes operacionais sobre painel de producao, secrets e workflow do repositorio. Os riscos tecnicos remanescentes em functions com `service_role` e `verify_jwt = false` continuam relevantes, mas devem ser tratados como hardening de arquitetura e nao como ausencia de auditoria de acesso.

### Evidencias

- Matriz criada em [supabase-direct-access-matrix.md](/c:/Users/User/Documents/GitHub/Marcos/educlyapp-1.00.0.01/docs/runbooks/supabase-direct-access-matrix.md#L1)
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

Status: concluido no escopo desta auditoria, com melhorias seguras aplicadas no codigo e backlog tecnico documentado para tuning mais invasivo no banco.

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

- A rota `/plan` deixou de fazer fan-out por trilha e passou a carregar `ai_tools`, `trail_phases` e `user_progress` em lote, eliminando um padrao de custo `1 + 2N` em `src/pages/Plan.tsx`.
- O hub de assistentes passou a limitar a leitura de `chat_messages` aos `100` registros persistidos mais recentes por contexto em `src/pages/Assistentes.tsx`, reduzindo leitura historica desnecessaria.
- A tela de cobranca do usuario passou a paginar `billing_event_logs` em `20` eventos por pagina e a ler somente as colunas necessarias em `src/pages/Billing.tsx`.
- O helper administrativo de contagem de produtos deixou de varrer `user_product_access` no cliente e passou a usar a RPC `get_admin_product_counts()` em `src/lib/adminProductCounts.ts`.
- Foi preparada a migration `supabase/migrations/20260324183000_item7_performance_indexes.sql` com indices de baseline para `billing_event_logs`, `user_product_access`, `user_premium_access` e `email_logs`.
- Foi preparado tambem o roteiro `docs/sql/item7-performance-check.sql` para medicao no ambiente e o script `docs/sql/item7-performance-prod-safe.sql` para execucao mais segura fora do SQL Editor.

### O que ficou pendente

- O pacote de indices preparado para o banco nao foi aplicado em producao nesta auditoria.
- Motivo: por decisao tecnica do time, o ganho esperado neste momento nao justificava abrir janela com risco operacional de lock temporario em escrita ou variacao de plano no ambiente atual.
- Isso nao representa quebra funcional do sistema; permanece como backlog tecnico de tuning para uma proxima janela controlada.
- Continua pendente como melhoria estrutural futura reduzir o uso de `auth.admin.listUsers` como mecanismo de busca por e-mail nas edge functions.
- Continua pendente, se a equipe decidir retomar o tuning, medir com `pg_stat_statements` e validar no ambiente real:
  - uso dos indices
  - tamanho das tabelas quentes
  - autovacuum e analyze
  - impacto das consultas de `billing_event_logs` e dashboards administrativos

### Leitura final da auditoria

Para o escopo desta primeira auditoria, o item 7 pode ser considerado atendido. A base de performance foi revisada, os gargalos principais foram identificados e as melhorias seguras de codigo que reduzem carga real no banco foram aplicadas. O tuning mais invasivo no banco ficou conscientemente adiado por decisao tecnica, sem evidencia de quebra funcional atual; isso permanece como backlog de otimizacao para uma janela futura.

### Evidencias

- `supabase/migrations/20260114174206_remix_migration_from_pg_dump.sql` registra `pg_stat_statements` e varios indices base
- `supabase/migrations/20260318170500_admin_product_counts_rpc.sql` cria a RPC `get_admin_product_counts()`
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
- `src/pages/Plan.tsx` passou a carregar progresso de trilhas em lote
- `src/pages/Assistentes.tsx` passou a limitar a leitura de historico persistido
- `src/pages/Billing.tsx` passou a paginar o historico de cobranca do usuario
- `src/lib/adminProductCounts.ts` passou a usar a RPC `get_admin_product_counts()`
- `supabase/migrations/20260324183000_item7_performance_indexes.sql` prepara os indices de baseline deste item
- `docs/sql/item7-performance-prod-safe.sql` prepara a execucao mais segura em producao
- `docs/sql/item7-performance-check.sql` prepara a validacao operacional deste item

## Item 8/20 - Indices criados nas colunas mais consultadas (`user_id`, `email`, `status`, `created_at`)

Status: nao implementado em producao por decisao tecnica. A melhoria foi preparada no repositorio, mas a aplicacao foi adiada para evitar risco operacional desnecessario no ambiente atual.

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

- Se a equipe decidir retomar esta melhoria no futuro:
  - aplicar primeiro em staging a migration `supabase/migrations/20260324190000_item8_hot_column_indexes.sql`
  - em producao, escolher entre:
    - a migration transaction-safe no SQL Editor
    - ou o script `docs/sql/item8-hot-index-prod-safe.sql` via conexao direta, usando `CREATE INDEX CONCURRENTLY`
  - rodar `docs/sql/item8-hot-index-check.sql` no SQL Editor para validar os indices
- Encaminhar em item proprio a parte mais estrutural de performance que nao se resolve so com indice, como as buscas lineares em `auth.admin.listUsers`.

### Decisao tecnica registrada

- A equipe optou por nao aplicar estes indices em producao neste momento.
- Motivo: evitar risco operacional de lock em escrita ou degradacao temporaria durante a criacao dos indices, sem necessidade imediata que justifique essa janela.
- Leitura desta decisao:
  - nao foi identificada quebra funcional do sistema causada pela ausencia desses indices
  - a nao aplicacao mantem uma oportunidade de otimizacao em aberto
  - isso deve ser tratado como melhoria de performance adiada, nao como incidente ou falha funcional atual

### Leitura final da auditoria

No escopo estrito deste checklist, a maior lacuna estava em `billing_event_logs` e na falta de versionamento da indexacao de `email_logs`. A correcao tecnica foi preparada no repositorio, mas a equipe decidiu nao aplicar em producao neste momento para evitar risco operacional desnecessario. Essa decisao nao caracteriza quebra funcional do sistema atual; ela apenas mantem a otimização como backlog tecnico.

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

## Item 9/20 - Queries lentas identificadas pelo Supabase Query Performance Advisor

Status: concluido no escopo desta auditoria. As queries lentas foram identificadas, registradas e ligadas aos hotspots reais do ambiente.

### Faz sentido?

Sim. Este item faz total sentido para o Educly.

O `Query Performance` e o `Performance Advisor` do Supabase trabalham sobre telemetria real do projeto. Eles mostram queries de maior custo/frequencia e podem sugerir indices para as consultas observadas no ambiente.

### Objetivo

Confirmar se o Supabase ja esta sinalizando queries lentas ou candidatas a melhoria no projeto e registrar esse resultado como linha de base da auditoria.

### Metodologia usada em 24/03/2026

- Revisao do repositorio para mapear consultas com maior chance de aparecerem no advisor
- Revisao da documentacao oficial do Supabase sobre `Performance Advisor`, `Query Performance` e `Index Advisor`
- Preparacao de um SQL auxiliar para snapshot via `pg_stat_statements`, como evidencia complementar

Observacao importante: este item depende do painel do Supabase e do trafego real do projeto. O repositorio sozinho nao mostra quais queries foram efetivamente identificadas pelo advisor no ambiente atual.

### O que estava OK

- Nao foi encontrado no repositorio nenhum indicio de desativacao deliberada das ferramentas de observabilidade de query do projeto.
- A migration base do banco ja registra `pg_stat_statements`, o que e compativel com a analise de performance e diagnostico posterior.

### O que foi encontrado fora do padrao

- O snapshot operacional trouxe queries lentas reais no ambiente, inclusive com impacto alto concentrado em `billing_event_logs`.
- Principais achados do snapshot analisado em 24/03/2026:
  - query de dedupe em `billing_event_logs` usando `payload @> ...` por `service_role`: `3871` calls, media de `830 ms`, total de `3214038 ms`
  - query de listagem `billing_event_logs ORDER BY created_at DESC`: `1175` calls, media de `477 ms`, total de `560498 ms`
  - query de leitura `billing_event_logs(email, event_type, payload)` sem filtro mais seletivo: `1236` calls, media de `307 ms`, total de `380639 ms`
  - query de `billing_event_logs` por `processed = false` e `status = ANY(...)`: `1159` calls, media de `169 ms`, total de `196718 ms`
  - execucao de `process_pending_billing_events(...)`: media entre `101 ms` e `188 ms`, dependendo do papel
  - execucao de `check_purchase_exists(...)`: `3555` calls, media de `139 ms`
  - query em `profiles` por `created_at >= ... ORDER BY created_at ASC`: `1240` calls, media de `268 ms`
  - query em `user_product_access` com `is_active = true`: `2253` calls, media de `94 ms`
- A query mais pesada em tempo total foi `realtime.list_changes(...)`, mas ela roda como `supabase_admin` e pertence ao mecanismo interno de Realtime do Supabase. Ela entra no snapshot, mas nao deve ser tratada como gargalo funcional direto do app.
- O campo `index_advisor_result` veio `null` nas linhas fornecidas. Isso indica que esse snapshot nao trouxe uma recomendacao explicita do Index Advisor embutida nessas consultas, mas nao invalida o achado de lentidao observado na propria telemetria.

### O que foi corrigido

- No banco, nenhuma alteracao foi executada ainda neste item; ficaram preparadas migrations e scripts para aplicacao segura.
- Foi preparado o roteiro `docs/sql/item9-query-performance-snapshot.sql` para gerar uma evidencia complementar via `pg_stat_statements`, caso a equipe queira anexar o top de queries junto do resultado do advisor.
- Foi preparada a migration `supabase/migrations/20260324193000_item9_slow_query_exact_indexes.sql` com indices alinhados exatamente aos formatos de consulta lentos observados no snapshot.
- Foi preparado o script `docs/sql/item9-slow-query-prod-safe.sql` para execucao mais segura em producao com `CREATE INDEX CONCURRENTLY`.
- Foi preparado o script `docs/sql/item9-slow-query-check.sql` para validar esses indices no ambiente.
- No codigo, o helper de admin em `src/lib/adminProductCounts.ts` deixou de paginar a tabela inteira de `user_product_access` no cliente e passou a usar a RPC `get_admin_product_counts()`, reduzindo carga desnecessaria no painel.

### O que ficou pendente

- Se a equipe decidir retomar tuning de performance no futuro, o pacote tecnico ja esta preparado nas migrations e scripts dos itens 7, 8 e 9.
- Como os itens 7 e 8 nao foram aplicados em producao nesta auditoria por decisao tecnica, a revalidacao comparativa das slow queries ficou adiada para uma janela futura de tuning.
- Os principais hotspots a revisitar quando essa janela existir continuam sendo:
  - dedupe por `payload @> event_id` em `billing_event_logs`
  - listagens ordenadas por `created_at` em `billing_event_logs`
  - filtros por `status` e pendencia em `billing_event_logs`
  - consultas por `profiles.created_at`
  - consultas por `user_product_access.is_active`

### Leitura final da auditoria

Este item pode ser marcado como concluido no escopo do checklist. As queries lentas foram efetivamente identificadas no ambiente e registradas com evidencias suficientes para auditoria, com concentracao clara em `billing_event_logs` e consultas operacionais associadas.

Leitura pratica: o item 9 pedia identificar e registrar as slow queries do ambiente, e isso foi atendido. A eventual eliminacao desses gargalos continua como backlog tecnico de tuning, nao como requisito em aberto deste checklist.

### Evidencias

- `supabase/migrations/20260114174206_remix_migration_from_pg_dump.sql` registra `pg_stat_statements`
- `src/pages/AdminEmails.tsx` concentra multiplas consultas sobre `email_logs`
- `src/components/admin/BillingEventsChart.tsx` carrega volume alto de `billing_event_logs` para agregacao no cliente
- `src/components/admin/KPICards.tsx` e `src/components/admin/CancellationsTable.tsx` usam filtros textuais amplos em `billing_event_logs`
- `docs/sql/item9-query-performance-snapshot.sql` prepara a evidencia complementar deste item
- Snapshot operacional recebido em 24/03/2026 com top queries por tempo total, incluindo consultas lentas em `billing_event_logs`, `profiles`, `user_product_access`, `process_pending_billing_events(...)` e `check_purchase_exists(...)`
- `supabase/migrations/20260324193000_item9_slow_query_exact_indexes.sql` corrige os formatos de indice que faltavam para `LOWER(RTRIM(email, '.'))` e `profiles.created_at`
- `docs/sql/item9-slow-query-prod-safe.sql` prepara a execucao mais segura em producao
- `docs/sql/item9-slow-query-check.sql` prepara a validacao operacional desse pacote
- `src/lib/adminProductCounts.ts` passou a usar a RPC `get_admin_product_counts()` em vez de varrer `user_product_access` no cliente

## Item 10/20 - Sem N+1 queries nas principais rotas do app (trilhas, XP, hub de IA)

Status: corrigido no repositorio e validado localmente com build. No escopo das rotas principais auditadas, o item pode ser marcado como OK.

### Objetivo

Garantir que as telas centrais do produto nao disparem consultas em cascata por item renderizado, evitando degradacao de tempo de carregamento e multiplicacao desnecessaria de requests com o crescimento da base.

### Metodologia usada em 24/03/2026

- Revisao das rotas principais ligadas a trilhas, XP e hub de IA em `src/pages/`
- Revisao dos hooks de apoio que carregam progresso de trilha
- Busca direcionada por consultas do Supabase dentro de `map`, `for`, `forEach` e `Promise.all` sobre colecoes dinamicas
- Separacao entre:
  - fan-out fixo e controlado, que nao caracteriza N+1
  - fan-out proporcional ao numero de itens, que caracteriza N+1

### O que estava OK

- `src/pages/Assistentes.tsx` usa um `Promise.all` fixo para carregar uso do dia, produtos e nivel do usuario, e carrega o historico com uma unica consulta por assistente ativo. Nao foi encontrado loop disparando query por mensagem ou por card.
- `src/components/dashboard/DailyMissionsModal.tsx` usa um `Promise.all` fixo para calcular status de XP e missoes. Ha varias queries, mas elas sao constantes e nao crescem com a quantidade de cards renderizados.
- `src/pages/Challenge.tsx` faz um conjunto fixo de queries para desafio, dias, progresso, traducoes e dias concluidos. Nao foi encontrado carregamento por dia individual.
- `src/pages/Freelancer.tsx` carrega o progresso do usuario com uma consulta unica em `freelancer_module_progress`.
- `src/hooks/useTrailProgress.ts` carrega uma trilha individual com consultas fixas para `trail_phases` e `user_progress`, sem query por fase.
- `src/hooks/useAiTrailProgress.ts` e `src/lib/aiTrailProgress.ts` carregam progresso da trilha de IA com leitura unica em `ai_trail_module_progress` por `slug`.

### O que foi encontrado fora do padrao

- `src/pages/Plan.tsx` possui um N+1 real.
- A rota primeiro busca todas as ferramentas em `ai_tools` e depois executa `tools.map(async (tool) => ...)`.
- Dentro desse loop, para cada ferramenta ela faz:
  - uma query em `trail_phases`
  - uma query em `user_progress`
- Na pratica, o custo total vira `1 + (2 x numero_de_ferramentas)`.
- Exemplo pratico:
  - com `15` ferramentas, essa tela pode disparar `31` queries
  - com `30` ferramentas, essa tela pode disparar `61` queries
- Esse padrao ja e suficiente para reprovar o checklist, mesmo com outras rotas principais revisadas estando em situacao aceitavel.

### O que foi corrigido

- `src/pages/Plan.tsx` foi refatorado para remover o fan-out por ferramenta.
- Antes:
  - a rota fazia `1` query para `ai_tools`
  - depois `2` queries por ferramenta (`trail_phases` e `user_progress`)
- Agora:
  - a rota faz `1` leitura de `ai_tools`
  - `1` leitura em lote de `trail_phases`
  - `1` leitura em lote de `user_progress`
  - a agregacao final de `totalPhases` e `completedPhases` acontece em memoria, sem query por item
- O custo deixou de crescer com o numero de trilhas e passou a ser constante no bootstrap da pagina.

### O que ficou pendente

- Fazer uma checagem manual no navegador para confirmar a queda no numero de requests da rota `/plan`.
- Revalidar este item junto de um teste manual das rotas:
  - `/plan`
  - `/assistentes`
  - `/desafio/:slug`
  - `/freelancer`

### Leitura final da auditoria

O item 10 estava reprovado por um N+1 concentrado na pagina `Plan`, mas a correcao foi aplicada no codigo. Considerando as rotas principais revisadas nesta auditoria, nao ha mais N+1 evidente no repositorio para trilhas, XP e hub de IA. O fechamento operacional restante e apenas um smoke test de navegacao.

### Evidencias

- `src/pages/Plan.tsx` foi refatorado para trocar o loop com query por leituras em lote de `ai_tools`, `trail_phases` e `user_progress`
- `src/components/dashboard/DailyMissionsModal.tsx` usa `Promise.all` fixo para status de XP
- `src/pages/Assistentes.tsx` usa `Promise.all` fixo para bootstrap do hub de IA e uma unica query de historico por assistente
- `src/pages/Challenge.tsx` usa queries fixas para desafio, dias, traducoes e progresso
- `src/pages/Freelancer.tsx` usa consulta unica em `freelancer_module_progress`
- `src/hooks/useTrailProgress.ts` usa consultas fixas para uma trilha individual
- `src/hooks/useAiTrailProgress.ts` e `src/lib/aiTrailProgress.ts` usam leitura unica por `slug` em `ai_trail_module_progress`

## Item 11/20 - Tabelas com crescimento rapido avaliadas para paginacao ou arquivamento

Status: concluido no escopo de avaliacao e governanca. As leituras mais visiveis do app foram paginadas/limitadas e a politica formal de retencao/arquivamento foi definida no repositorio.

### Objetivo

Garantir que tabelas com crescimento rapido nao fiquem sendo lidas sem limite nas telas do app e que as tabelas puramente operacionais tenham estrategia clara de retencao, cleanup ou arquivamento.

### Metodologia usada em 24/03/2026

- Revisao das tabelas com perfil de crescimento rapido no schema e nas funcoes:
  - `billing_event_logs`
  - `email_logs`
  - `chat_messages`
  - `pending_thank_you_emails`
  - `webhook_failure_logs`
  - `password_reset_attempts`
  - `landing_chat_rate_limits`
  - `paddle_geral`
  - `user_sessions`
  - `user_bugs`
  - `error_logs`
- Revisao das telas administrativas e do produto para identificar leituras sem `limit`, sem cursor ou sem paginacao
- Revisao de jobs e filas para verificar processamento em lote
- Revisao de migrations para procurar cleanup, expiracao ou cron

### O que estava OK

- `email_logs` ja tinha limite de leitura no painel admin, com carga dos ultimos `500` registros e paginacao/cursor no fluxo do `resend-dashboard`.
- `billing_event_logs` ja tinha leituras capadas em partes importantes do admin:
  - `BillingLogsTable` mostra apenas os ultimos `30`
  - `AdminAnalytics` usa amostras recentes com `limit(50)` nas listas
  - `BillingEventsChart` esta capado em `5000`, o que ainda e alto, mas ja evita leitura infinita
- `pending_thank_you_emails` funciona como fila e ja e processada em lote, com indices de fila e batches limitados.
- `webhook_failure_logs` tambem funciona como fila operacional e o retry processa no maximo `10` registros por ciclo.
- `api_rate_limits` ao menos possui funcao de cleanup (`cleanup_expired_rate_limits()`), o que mostra uma direcao correta para tabelas efemeras.

### O que foi encontrado fora do padrao

- `chat_messages` ainda tinha uma leitura sem limite na tela do hub de IA (`/assistentes`), o que tende a piorar conforme o historico do usuario cresce.
- `billing_event_logs` ainda tinha leitura sem paginacao na tela de cobranca do usuario (`/settings/billing`), puxando todo o historico do usuario de uma vez.
- Nao foi encontrada politica versionada de arquivamento, purge ou retencao para tabelas append-only de crescimento rapido, especialmente:
  - `billing_event_logs`
  - `email_logs`
  - `chat_messages`
  - `paddle_geral`
  - `user_bugs`
  - `error_logs`
  - `password_reset_attempts`
  - `landing_chat_rate_limits`
  - `webhook_failure_logs`
  - `pending_thank_you_emails` apos envio
  - `user_sessions`
- `landing_chat_rate_limits` tem indice de cleanup, mas nao foi encontrado job versionado que de fato apague registros antigos.
- `password_reset_attempts` e uma tabela de rate limit sensivel a volume e tambem nao tem cleanup versionado.
- `paddle_geral` e um arquivo bruto de eventos de webhook por natureza append-only, mas hoje nao tem janela de retencao documentada.

### O que foi corrigido

- `src/pages/Assistentes.tsx` deixou de carregar historico ilimitado de `chat_messages` e passou a limitar a leitura aos `100` registros mais recentes do assistente ativo, mantendo a ordenacao final no cliente.
- `src/pages/Billing.tsx` deixou de carregar todo o `billing_event_logs` do usuario e passou a usar paginacao por pagina, com tamanho fixo de `20` eventos e controles de navegacao.
- Foi criada a politica [database-retention-policy.md](/c:/Users/User/Documents/GitHub/Marcos/educlyapp-1.00.0.01/docs/runbooks/database-retention-policy.md#L1) com janela base de retencao, purge ou arquivamento para:
  - `billing_event_logs`
  - `email_logs`
  - `chat_messages`
  - `pending_thank_you_emails`
  - `webhook_failure_logs`
  - `password_reset_attempts`
  - `landing_chat_rate_limits`
  - `paddle_geral`
  - `user_sessions`
  - `user_bugs`
  - `error_logs`

### O que ficou pendente

- Implementar em rodada futura os jobs de purge/arquivamento conforme a politica definida.
- Itens que devem voltar em rodada futura de scripts:
  - purge de `password_reset_attempts`
  - purge de `landing_chat_rate_limits`
  - purge ou arquivamento de `webhook_failure_logs` resolvidos
  - purge de `pending_thank_you_emails` enviados
  - retencao de `chat_messages`
  - retencao/arquivamento de `billing_event_logs`, `email_logs`, `paddle_geral`, `user_bugs`, `error_logs` e `user_sessions`
- Confirmar com produto/operacao por quanto tempo cada tabela precisa ficar online antes de arquivar ou apagar.
- Rodar smoke test manual em:
  - `/assistentes`
  - `/settings/billing`

### Leitura final da auditoria

O item 11 pode ser marcado como OK no escopo do checklist. As tabelas de crescimento rapido foram avaliadas, as leituras mais visiveis do app receberam melhoria de paginacao/limitacao e a politica formal de retencao/arquivamento foi registrada. A automacao futura de purge continua como backlog operacional, mas a ausencia de avaliacao e de baseline de retencao, que era a lacuna principal deste item, foi resolvida.

### Evidencias

- `src/pages/Assistentes.tsx` agora limita historico de `chat_messages` em `100`
- `src/pages/Billing.tsx` agora pagina `billing_event_logs` do usuario com tamanho de pagina `20`
- `src/pages/AdminEmails.tsx` ja limitava `email_logs` a `500` registros e possui paginacao no fluxo de `resend-dashboard`
- `src/components/admin/BillingLogsTable.tsx` ja limitava `billing_event_logs` a `30`
- `src/components/admin/BillingEventsChart.tsx` ja limitava a leitura de `billing_event_logs` a `5000`
- `supabase/functions/send-pending-welcome-batch/index.ts` processa fila com `limit(200)` e batch de `15`
- `supabase/functions/retry-failed-webhooks/index.ts` processa `webhook_failure_logs` com `limit(10)`
- `supabase/migrations/20260214113802_cd6d98c6-81c1-4d99-8155-4d14629a9734.sql` cria a fila `pending_thank_you_emails` com indices de fila
- `supabase/migrations/20260312133000_create_global_api_rate_limits.sql` cria `cleanup_expired_rate_limits()`
- `supabase/migrations/20260127190143_2d6dd3bf-a10e-4335-8876-b47617284a45.sql` cria `landing_chat_rate_limits` com indice de cleanup, mas sem job versionado de limpeza
- Politica criada em [database-retention-policy.md](/c:/Users/User/Documents/GitHub/Marcos/educlyapp-1.00.0.01/docs/runbooks/database-retention-policy.md#L1)

## Item 12/20 - Connection pooling configurado corretamente para o plano atual do Supabase

Status: concluido. No escopo do app e das edge functions, o repositorio ja estava saudavel, e a confirmacao operacional do time indicou que o setup de connection pooling no ambiente esta em ordem.

### Objetivo

Garantir que o Educly nao esteja usando strings de conexao Postgres inadequadas para o tipo de runtime atual e que a configuracao de pooling do projeto esteja coerente com o plano/computacao ativos no Supabase.

### Metodologia usada em 24/03/2026

- Busca por clientes Postgres diretos, ORMs e strings de conexao no repositorio
- Revisao do cliente web e das edge functions
- Revisao do workflow de backup
- Cruzamento com a documentacao oficial do Supabase sobre metodos de conexao e gestao de pool

### O que estava OK

- O app web usa `@supabase/supabase-js` via `SUPABASE_URL` e chave publishable, ou seja, trafega pela camada HTTP do Supabase e nao abre conexoes Postgres diretas no frontend.
- As edge functions revisadas tambem usam `createClient(...)` do Supabase e nao clientes Postgres low-level como `pg`, `postgres.js`, Prisma ou Drizzle.
- Nao foram encontrados no repositorio:
  - `DATABASE_URL`
  - `DIRECT_URL`
  - `postgres://` ou `postgresql://`
  - `pooler.supabase.com`
  - dependencia `pg`
  - Prisma, Drizzle, Kysely, Slonik ou outro cliente wire-level
- O workflow de backup usa `supabase link` + `supabase db dump --linked`, sem connection string hardcoded no repositrio.

### O que foi encontrado fora do padrao

- O repositorio nao permite confirmar qual e o plano atual do projeto no Supabase nem qual pool size esta configurado hoje no Dashboard.
- Tambem nao da para provar pelo codigo se existe alguma integracao externa, fora do repositorio, usando:
  - conexao direta
  - Supavisor session mode
  - Supavisor transaction mode
  - dedicated pooler
- Por isso, o item esta tecnicamente OK no codigo, mas ainda precisa de uma confirmacao operacional no ambiente.

### O que foi corrigido

- Nenhuma alteracao de codigo foi necessaria neste item.
- A conclusao da auditoria para o repositorio foi registrada: o app nao depende de configuracao manual de connection pooling no codigo-fonte atual.
- Segundo confirmacao operacional do time em `24/03/2026`, o ambiente de producao esta com o connection pooling em ordem para o plano atual.

### O que ficou pendente

- Confirmar que qualquer runtime externo fora do repositorio siga a escolha recomendada pelo Supabase:
  - conexao direta para backend persistente, migracoes, `pg_dump` e ferramentas administrativas
  - Supavisor session mode para backend persistente quando precisar de IPv4
  - Supavisor transaction mode para workloads serverless e tarefas curtas
- Se existir algum worker externo ou ferramenta de BI fora deste repo, registrar qual string ele usa e se ela bate com o caso de uso.

### Leitura final da auditoria

O item 12 pode ser marcado como OK. No escopo do repositrio do Educly, o projeto ja estava saudavel porque usa a camada oficial do Supabase e nao abre conexoes Postgres diretas no app. Com a confirmacao operacional do time de que o connection pooling do ambiente esta em ordem, o checklist fica atendido.

### Evidencias

- `src/integrations/supabase/client.ts` usa `createClient` do `@supabase/supabase-js`
- `package.json` possui `@supabase/supabase-js` e nao possui `pg` ou ORM de conexao direta
- `supabase/functions/*` usam `createClient(...)` do Supabase nas funcoes revisadas
- `.github/workflows/db_backup.yml` usa `supabase link` + `supabase db dump --linked`
- Fonte oficial: https://supabase.com/docs/guides/database/connecting-to-postgres
- Fonte oficial: https://supabase.com/docs/guides/database/connection-management
- Fonte oficial: https://supabase.com/docs/reference/cli/supabase-db-dump

## Item 13/20 - Backup automatico do Supabase confirmado como ativo e funcionando

Status: concluido para este checklist. Os backups nativos do Supabase foram confirmados no Dashboard como ativos e funcionando, com snapshots fisicos diarios e opcao de restore. O workflow versionado no GitHub continua sendo apenas um snapshot complementar de schema.

### Objetivo

Confirmar que o Educly possui backup automatico ativo, com evidencias de execucao real e utilidade pratica em caso de incidente.

### Metodologia usada em 24/03/2026

- Revisao do workflow `.github/workflows/db_backup.yml`
- Verificacao publica do historico de execucoes no GitHub Actions
- Cruzamento com a documentacao oficial do Supabase sobre backups e sobre o fluxo recomendado de `db dump`

### O que estava OK

- Existe automacao de backup versionada no repositorio e configurada para:
  - execucao diaria por `cron`
  - execucao manual por `workflow_dispatch`
- A execucao publica mais recente encontrada no GitHub Actions estava com:
  - status `Success`
  - disparo em `24/03/2026`
  - duracao aproximada de `1m49s`
  - artifact gerado com retencao de `30` dias
- Isso comprova que existe pelo menos uma rotina automatica rodando hoje, fora da maquina do desenvolvedor.
- No Supabase Dashboard, em `Database > Backups > Scheduled backups`, foram visualizados backups fisicos nativos (`PHYSICAL`) com opcao de `Restore`, incluindo execucoes nos dias:
  - `17/03/2026 10:55:17 (+0000)`
  - `18/03/2026 10:55:09 (+0000)`
  - `19/03/2026 10:54:26 (+0000)`
  - `20/03/2026 10:53:52 (+0000)`
  - `21/03/2026 10:55:26 (+0000)`
  - `22/03/2026 10:54:11 (+0000)`
  - `23/03/2026 10:53:47 (+0000)`
  - `24/03/2026 10:55:19 (+0000)`
- Essa evidencia operacional fecha a parte principal do checklist: o backup automatico do Supabase esta ativo e gerando restauracoes disponiveis.

### O que foi encontrado fora do padrao

- O workflow estava nomeado como backup completo, mas o comando versionado era apenas:
  - `supabase db dump --linked -f database_backup.sql`
- Pela documentacao oficial do Supabase para automacao de backup, schema, roles e data sao dumpados separadamente. Portanto, a leitura mais segura e que o comando acima representa apenas o dump de schema, nao um backup logico completo com dados.
- O tamanho do artifact publico observado (`16.5 KB`) e compativel com snapshot pequeno de schema e nao com base de producao com milhares de usuarios.
- Nao foi encontrada evidencia versionada de restore de teste. Esse ponto fica para o checklist especifico de restore/validacao.
- O workflow atual roda em um repositorio publico; por seguranca, nao e recomendavel tratar artifact publico como destino de backup completo com dados sensiveis.

### O que foi corrigido

- O workflow `.github/workflows/db_backup.yml` foi ajustado para nao induzir falsa seguranca:
  - nome do workflow alterado para `Automatic Database Schema Backup`
  - nome do arquivo gerado alterado para `database_schema_backup.sql`
  - nome do artifact alterado para `db-schema-backup-<run_id>`
- Com isso, o repositorio passa a refletir corretamente que a automacao atual e um snapshot logico de schema, util para referencia tecnica, mas nao suficiente como backup completo de recuperacao.

### O que ficou pendente

- Definir a estrategia oficial de backup externo:
  - manter apenas snapshot de schema no GitHub Actions, como hoje
  - ou enviar backup logico completo para destino privado e seguro fora de repositorio publico
- Executar restore de teste em ambiente separado no item especifico de validacao de backup.

### Leitura final da auditoria

O item 13 pode ser marcado como OK. O projeto possui backups nativos do Supabase ativos e funcionando, com snapshots fisicos diarios visiveis no Dashboard e opcao de restauracao disponivel. O workflow do GitHub fica registrado apenas como mecanismo complementar de snapshot de schema. O restore de teste continua importante, mas pertence ao checklist especifico de validacao de backup.

### Evidencias

- `.github/workflows/db_backup.yml` possui `schedule` diario e `workflow_dispatch`
- Execucao publica observada: `Automatic Database Backup #24`, `Status Success`, `Triggered via schedule March 24, 2026`, artifact `16.5 KB`
- Evidencia operacional no Supabase Dashboard: backups `PHYSICAL` diarios entre `17/03/2026` e `24/03/2026`, todos com acao `Restore` disponivel
- Correcao aplicada no repositorio: workflow renomeado para deixar explicito que o artifact atual e de schema
- Fonte oficial: https://supabase.com/docs/guides/platform/backups
- Fonte oficial: https://supabase.com/docs/guides/deployment/ci/backups

## Item 14/20 - Frequencia de backup documentada e adequada ao volume de dados

Status: concluido. Ja estava OK do ponto de vista operacional; faltava apenas registrar a evidencia na documentacao da auditoria.

### Objetivo

Garantir que a periodicidade dos backups esteja explicitamente registrada e que a cadencia seja compativel com o volume e a criticidade dos dados do Educly.

### Metodologia usada em 24/03/2026

- Revisao do historico de backups nativos no Supabase Dashboard
- Revisao do workflow complementar de schema no GitHub Actions
- Analise do contexto operacional informado para o produto:
  - cerca de `3.000` usuarios
  - dados sensiveis de acesso
  - dados de pagamento
  - progresso de trilhas e consumo educacional

### O que estava OK

- A frequencia dos backups nativos do Supabase esta claramente identificavel no ambiente como diaria.
- O historico visivel no Dashboard mostrou execucoes consecutivas em:
  - `17/03/2026`
  - `18/03/2026`
  - `19/03/2026`
  - `20/03/2026`
  - `21/03/2026`
  - `22/03/2026`
  - `23/03/2026`
  - `24/03/2026`
- Todos esses registros aparecem como backup `PHYSICAL`, com acao de `Restore` disponivel.
- O repositorio tambem possui rotina complementar diaria de snapshot de schema no GitHub Actions.
- Para o porte atual do Educly e para o volume indicado nesta auditoria, a cadencia diaria de backup nativo pode ser considerada adequada como baseline operacional.

### O que foi encontrado fora do padrao

- A frequencia estava comprovada no ambiente, mas ainda nao estava formalmente registrada neste documento como linha de base da auditoria.
- O workflow do GitHub nao deve ser confundido com backup completo de dados; ele permanece apenas como snapshot complementar de schema.

### O que foi corrigido

- A frequencia oficial de backup foi documentada nesta auditoria como:
  - backup nativo do Supabase: diario
  - snapshot complementar de schema via GitHub Actions: diario
- Com isso, o item passa a ter baseline registrada para comparacoes futuras.

### O que ficou pendente

- Reavaliar a frequencia se houver mudanca relevante de escala, criticidade ou exigencia de RPO.
- No item especifico de restore, validar na pratica se a janela de recuperacao esperada pelo negocio bate com o que o ambiente entrega.
- Se o produto passar a exigir perda maxima proxima de zero entre backups diarios, validar e registrar o uso efetivo de PITR como controle complementar.

### Leitura final da auditoria

O item 14 pode ser marcado como OK. A frequencia de backup do ambiente esta documentada e, no contexto atual do Educly, a cadencia diaria dos backups fisicos nativos do Supabase e adequada como linha de base operacional. A necessidade de janelas mais agressivas de recuperacao deve ser tratada como evolucao de maturidade, nao como falha deste checklist.

### Evidencias

- Supabase Dashboard `Database > Backups > Scheduled backups` com snapshots `PHYSICAL` diarios entre `17/03/2026` e `24/03/2026`
- `.github/workflows/db_backup.yml` com `schedule` diario e `workflow_dispatch`
- Fonte oficial: https://supabase.com/docs/guides/platform/backups

## Item 15/20 - Pelo menos um restore de teste realizado para confirmar que o backup funciona de verdade

Status: concluido. Segundo confirmacao operacional do time, um restore de teste foi executado e validado com sucesso em ambiente separado.

### Objetivo

Confirmar na pratica que o backup nao apenas existe, mas pode ser restaurado com sucesso e produz um ambiente utilizavel.

### Metodologia usada em 24/03/2026

- Revisao do repositorio em busca de:
  - runbook de restore
  - log de restore
  - evidencia versionada de ambiente restaurado
  - validacoes pos-restore
- Cruzamento com as evidencias operacionais dos itens 13 e 14
- Revisao da documentacao oficial do Supabase sobre restauracao

### O que estava OK

- Os backups nativos do Supabase ja foram confirmados no Dashboard como ativos, diarios e com opcao de `Restore`.
- O Dashboard do Supabase mostra caminho de restauracao disponivel.
- O produto tambem possui snapshot complementar diario de schema no GitHub Actions, util como apoio tecnico.

### O que foi encontrado fora do padrao

- Nao foi encontrada evidencia de que um restore de teste ja tenha sido executado.
- Nao existe no repositorio um procedimento formalizado com:
  - data do teste
  - backup escolhido
  - ambiente de destino
  - validacoes executadas
  - resultado final do restore
- Restaurar diretamente sobre producao nao e a abordagem recomendada para este checklist, porque a propria documentacao do Supabase informa que o projeto fica inacessivel durante a restauracao.

### O que foi corrigido

- Este item passou a ter um procedimento minimo documentado de validacao, para execucao segura em ambiente separado.
- Segundo confirmacao operacional do time em `24/03/2026`, esse procedimento ja foi validado na pratica por meio de restore de teste bem-sucedido.

### O que ficou pendente

- Registrar em futuras recorrencias, quando possivel, mais detalhes operacionais do teste:
  - data e hora
  - backup utilizado
  - ambiente de destino
  - duracao aproximada
  - checks validados
  - conclusao

### Procedimento recomendado para fechar este item

1. No Supabase Dashboard, abrir `Database > Backups`.
2. Usar a opcao `Restore to new project`, evitando restore in-place em producao.
3. Selecionar um backup recente, por exemplo o snapshot fisico de `24/03/2026 10:55:19 (+0000)`.
4. Restaurar para um projeto temporario de homologacao.
5. No projeto restaurado, validar pelo menos:
   - existencia das tabelas principais
   - RLS ativo nas tabelas sensiveis auditadas
   - contagem basica de registros em tabelas criticas como `profiles`, `billing_event_logs`, `user_progress`, `email_logs`
   - acesso do app/staging com uma conta de teste
   - funcionamento de pelo menos um fluxo critico de leitura
6. Registrar evidencias por screenshot ou anotacao:
   - projeto restaurado criado
   - horario de inicio e fim
   - checks executados
   - resultado
7. Encerrar e remover o projeto temporario, se nao houver necessidade de mantelo.

### Leitura final da auditoria

O item 15 pode ser marcado como OK. O Educly ja comprovou nao apenas que possui backups ativos, mas tambem que um restore de teste foi executado e validado com sucesso em ambiente separado. Isso fecha a prova operacional principal de confiabilidade do backup.

### Evidencias

- Confirmacao operacional do time em `24/03/2026` de que o restore de teste foi executado e validado com sucesso
- Itens 13 e 14 confirmam backups nativos `PHYSICAL` ativos no Supabase Dashboard
- Fonte oficial: https://supabase.com/docs/guides/platform/backups

## Item 16/20 - Processo documentado de como restaurar o banco em caso de incidente

Status: concluido. O processo de restore foi formalizado em um runbook dedicado no repositorio.

### Objetivo

Garantir que, em caso de incidente, a equipe tenha um procedimento documentado, claro e repetivel para restaurar o banco com o menor risco operacional possivel.

### Metodologia usada em 24/03/2026

- Revisao dos itens 13, 14 e 15 da auditoria
- Cruzamento com a documentacao oficial do Supabase sobre restore
- Formalizacao do processo em documento operacional separado

### O que estava OK

- Ja havia evidencia de que o Supabase oferece fluxo de `Restore` no Dashboard.
- Ja havia evidencia de backups `PHYSICAL` diarios ativos no ambiente.
- A equipe ja tinha contexto minimo para restore, mas esse conhecimento ainda nao estava consolidado em um runbook unico.

### O que foi encontrado fora do padrao

- O repositorio ainda nao tinha um documento operacional unico dizendo como restaurar o banco em caso de incidente.
- O procedimento estava fragmentado entre conhecimento de ferramenta, prints do painel e observacoes da auditoria.

### O que foi corrigido

- Foi criado o runbook [supabase-database-restore.md](/c:/Users/User/Documents/GitHub/Marcos/educlyapp-1.00.0.01/docs/runbooks/supabase-database-restore.md#L1) com:
  - quando usar restore para novo projeto
  - quando considerar restore sobre o projeto atual
  - alertas operacionais importantes
  - checklist pre-restore
  - procedimento de restore
  - checklist pos-restore
  - evidencias minimas a guardar
  - template de registro para a auditoria

### O que ficou pendente

- Validar esse runbook na pratica no item 15, executando um restore de teste real.
- Atualizar o proprio runbook com o aprendizado do primeiro restore executado.

### Leitura final da auditoria

O item 16 pode ser marcado como OK. O Educly agora possui um processo documentado de restore no repositorio, separado da auditoria e pronto para uso operacional. O que continua pendente e a execucao pratica desse processo, que pertence ao item 15.

### Evidencias

- Runbook criado em [supabase-database-restore.md](/c:/Users/User/Documents/GitHub/Marcos/educlyapp-1.00.0.01/docs/runbooks/supabase-database-restore.md#L1)
- Fonte oficial: https://supabase.com/docs/guides/platform/backups

## Item 17/20 - Apenas pessoas que precisam tem acesso ao painel do Supabase em producao

Status: concluido. Segundo confirmacao operacional do time, o acesso ao painel do Supabase em producao foi revisado e apenas pessoas autorizadas permanecem ativas.

### Objetivo

Garantir que o painel do Supabase em producao siga o principio do menor privilegio, deixando acesso apenas para quem realmente precisa operar o ambiente.

### Metodologia usada em 24/03/2026

- Revisao do repositorio em busca de:
  - inventario de membros
  - processo de revisao de acessos
  - trilha de aprovacao para acesso ao painel
- Cruzamento com os achados do item 6 sobre acessos diretos e secrets privilegiados
- Revisao da documentacao oficial do Supabase sobre controle de acesso

### O que estava OK

- O repositorio ja mostrava uma separacao razoavel entre acesso administrativo de app e acesso de usuario comum no banco.
- A auditoria ja identificou claramente que o risco principal nao esta no frontend, mas em quem consegue operar o projeto, os secrets e o painel do Supabase.
- A equipe agora possui um runbook dedicado para revisar acessos de producao.

### O que foi encontrado fora do padrao

- Nao existe no repositorio um inventario atualizado dizendo quem sao as pessoas com acesso ao painel do Supabase em producao.
- Nao existe evidencia versionada de revisao periodica de acessos.
- Nao existe registro versionado de justificativa de negocio por membro com acesso.
- Pela documentacao oficial do Supabase, papeis com escopo apenas de projeto sao recurso de planos `Team` e `Enterprise`. Pela captura anterior do painel, a organizacao aparece como `PRO`; portanto, ha indicio de que o controle granular por projeto pode ser mais limitado no ambiente atual.
- A mesma documentacao alerta que o papel `Read-Only` nao deve ser tratado como acesso inocuo, porque ainda pode visualizar recursos sensiveis em certos contextos do Dashboard. Isso aumenta a importancia de revisar todos os membros, nao apenas `Owner` e `Administrator`.

### O que foi corrigido

- Foi criado o runbook [supabase-production-access-review.md](/c:/Users/User/Documents/GitHub/Marcos/educlyapp-1.00.0.01/docs/runbooks/supabase-production-access-review.md#L1) para padronizar a revisao de acessos do painel de producao.
- O runbook inclui:
  - criterio de menor privilegio
  - checklist de revisao de membros
  - template de registro por nome, e-mail, papel, escopo, justificativa e acao
  - criterio objetivo para marcar este item como OK
- Segundo confirmacao operacional do time em `24/03/2026`, a revisao real dos acessos ao painel de producao foi executada e o resultado foi:
  - somente pessoas autorizadas permanecem com acesso
  - nao foram identificados acessos humanos indevidos ativos

### O que ficou pendente

- Manter a revisao periodica desse acesso como rotina operacional, usando o runbook criado.

### Leitura final da auditoria

O item 17 pode ser marcado como OK. O Educly agora tem processo documentado de revisao de acesso e, segundo confirmacao operacional do time, o painel do Supabase em producao foi revisado e mantido apenas com pessoas autorizadas.

### Evidencias

- Item 6 da auditoria ja havia identificado ausencia de inventario operacional de acessos privilegiados
- Runbook criado em [supabase-production-access-review.md](/c:/Users/User/Documents/GitHub/Marcos/educlyapp-1.00.0.01/docs/runbooks/supabase-production-access-review.md#L1)
- Fonte oficial: https://supabase.com/docs/guides/platform/access-control
- Fonte oficial: https://supabase.com/docs/guides/deployment/shared-responsibility-model

## Item 18/20 - Nenhuma credencial de banco compartilhada via WhatsApp ou email sem criptografia

Status: concluido. A politica foi versionada no repositorio e o time confirmou operacionalmente que credenciais de banco nao sao compartilhadas por WhatsApp nem por e-mail comum sem criptografia.

### Objetivo

Garantir que credenciais sensiveis do banco nao sejam transmitidas por canais inseguros e sem trilha de controle.

### Metodologia usada em 24/03/2026

- Revisao do repositorio em busca de:
  - politica de compartilhamento de secrets
  - orientacao formal sobre canais permitidos
  - sinais de segredo exposto em arquivo versionado
- Cruzamento com os achados dos itens 4, 6 e 17

### O que estava OK

- No estado atual do repositorio, nao foram encontrados segredos do banco em variaveis publicas de frontend.
- O item 4 ja havia removido uma exposicao historica de `SUPABASE_SERVICE_ROLE_KEY` em script versionado.
- Os principais secrets operacionais encontrados no repositorio aparecem como variaveis de ambiente ou GitHub Secrets, nao como instrucoes de compartilhamento via mensageria.

### O que foi encontrado fora do padrao

- Nao existe no repositorio evidencia auditavel de que a equipe proibiu formalmente WhatsApp e e-mail comum como canais para compartilhar credenciais de banco.
- Nao existe runbook versionado definindo quais canais sao permitidos para segredos sensiveis.
- O historico de exposicao de `service_role` em arquivo versionado mostra que o manuseio de segredo ja falhou pelo menos uma vez, o que aumenta a necessidade de controle operacional explicito.
- Este item nao pode ser marcado como OK apenas pelo codigo, porque compartilhamento por WhatsApp ou e-mail acontece fora do repositorio.

### O que foi corrigido

- Foi criado o runbook [secure-credential-sharing.md](/c:/Users/User/Documents/GitHub/Marcos/educlyapp-1.00.0.01/docs/runbooks/secure-credential-sharing.md#L1) com:
  - canais proibidos
  - canais permitidos
  - regra de menor compartilhamento
  - fluxo recomendado
  - resposta a incidente
  - escopo minimo de credenciais cobertas
- Segundo confirmacao operacional do time em `24/03/2026`:
  - WhatsApp nao e canal aprovado para credenciais de banco
  - e-mail comum sem criptografia nao e canal aprovado para credenciais de banco
  - o time afirmou seguir canais seguros para esse tipo de segredo

### O que ficou pendente

- Verificar se houve compartilhamento passado de:
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `SUPABASE_ACCESS_TOKEN`
  - connection strings
  - tokens administrativos
- Se houver historico de envio inseguro, rotacionar as credenciais afetadas e registrar isso na auditoria.

### Leitura final da auditoria

O item 18 pode ser marcado como OK. O Educly agora possui politica versionada de compartilhamento seguro de credenciais e, segundo confirmacao operacional do time, nao utiliza WhatsApp nem e-mail comum sem criptografia para distribuir credenciais de banco. Qualquer apuracao sobre historico inseguro fica como follow-up de governanca, nao como bloqueio deste checklist.

### Evidencias

- Item 4 registrou exposicao historica de `SUPABASE_SERVICE_ROLE_KEY` em script versionado
- Runbook criado em [secure-credential-sharing.md](/c:/Users/User/Documents/GitHub/Marcos/educlyapp-1.00.0.01/docs/runbooks/secure-credential-sharing.md#L1)

## Item 19/20 - Logs de acesso ao banco revisados para identificar acessos nao autorizados

Status: agendado para revalidacao operacional a partir de `31/03/2026`. Em `24/03/2026`, o time confirmou a ativacao dos audit logs; por isso a revisao foi postergada para aguardar uma janela minima real de coleta.

### Objetivo

Garantir que a equipe revise periodicamente os logs relevantes do Supabase para identificar tentativas de acesso indevido, abuso de credenciais ou uso anormal de funcoes sensiveis.

### Metodologia usada em 24/03/2026

- Revisao do repositorio em busca de:
  - evidencias de revisao de logs
  - runbook de analise de logs
  - registros de incidentes ou de acessos suspeitos
- Cruzamento com os achados dos itens 6, 17 e 18
- Revisao da documentacao oficial do Supabase sobre `Auth Audit Logs`, `Logs Explorer` e `Platform Audit Logs`

### O que estava OK

- O Supabase oferece fontes reais para esse controle, inclusive:
  - `Authentication > Audit Logs`
  - `Logs Explorer`
  - logs de edge functions
  - `postgres_logs`
- O projeto ja possui varios pontos onde acessos negados ou suspeitos geram mensagens como `Unauthorized`, `Forbidden`, `permission denied` e `invalid secret`, o que ajuda a auditoria de tentativas indevidas.
- A documentacao oficial do Supabase informa que os `Auth Audit Logs` registram eventos como login, password reset, refresh de token, logout e outros eventos de autenticacao.

### O que foi encontrado fora do padrao

- Nao existe no repositorio evidencia de que alguem ja revisou os logs do ambiente com foco em acesso nao autorizado.
- Nao existia um procedimento documentado dizendo quais fontes de log olhar e quais sinais investigar.
- Pela captura anterior do painel, a organizacao parece estar no plano `PRO`. Pela documentacao oficial, `Platform Audit Logs` sao disponiveis apenas em `Team` e `Enterprise`, entao esse controle provavelmente depende principalmente de:
  - `Auth Audit Logs`
  - `Logs Explorer`
  - logs de funcoes
- Sem revisao operacional dos logs, este item nao pode ser marcado como OK.

### O que foi corrigido

- Foi criado o runbook [supabase-access-log-review.md](/c:/Users/User/Documents/GitHub/Marcos/educlyapp-1.00.0.01/docs/runbooks/supabase-access-log-review.md#L1) com:
  - fontes de log a revisar
  - indicadores suspeitos
  - funcoes mais sensiveis do Educly
  - procedimento minimo de revisao
  - template de registro para a auditoria
- Segundo confirmacao operacional do time em `24/03/2026`, os audit logs foram ativados para ampliar a rastreabilidade futura deste controle.

### O que ficou pendente

- Reabrir este item nao antes de `31/03/2026`.
- Na reabertura, revisar no Supabase pelo menos:
  - `Authentication > Audit Logs`
  - `Logs Explorer`
  - logs de `Functions`
- Filtrar o periodo minimo de `24/03/2026` ate `31/03/2026`, ou janela maior se a equipe preferir.
- Procurar sinais como:
  - picos de `401` e `403`
  - `Unauthorized`
  - `Forbidden`
  - `permission denied`
  - `invalid secret`
  - tentativas repetidas em funcoes administrativas ou de login
- Registrar o resultado da revisao nesta auditoria.

### Criterio objetivo para marcar como OK

Este item so pode ser marcado como OK quando houver evidencia operacional de que os logs relevantes do ambiente foram revisados e nao apresentaram acesso nao autorizado sem tratamento.

### Leitura final da auditoria

O item 19 ainda nao esta concluido, mas tambem nao deve ser tratado como atrasado nesta data-base da auditoria. A postergacao foi deliberada e correta: como os audit logs foram ativados em `24/03/2026`, a revisao operacional deve acontecer a partir de `31/03/2026`, quando ja existir janela minima suficiente para analise.

### Evidencias

- Runbook criado em [supabase-access-log-review.md](/c:/Users/User/Documents/GitHub/Marcos/educlyapp-1.00.0.01/docs/runbooks/supabase-access-log-review.md#L1)
- Fonte oficial: https://supabase.com/docs/guides/auth/audit-logs
- Fonte oficial: https://supabase.com/docs/guides/telemetry/logs
- Fonte oficial: https://supabase.com/docs/guides/security/platform-audit-logs

## Item 20/20 - Politica definida para rotacao de chaves em caso de vazamento

Status: concluido. A politica de rotacao foi formalizada no repositorio e ligada aos achados reais desta auditoria.

### Objetivo

Garantir que o Educly tenha um procedimento claro para responder a vazamento ou suspeita de comprometimento de chaves e segredos ligados ao banco.

### Metodologia usada em 24/03/2026

- Cruzamento com os achados dos itens 4, 6, 17, 18 e 19
- Revisao dos segredos mais sensiveis encontrados no repositorio
- Formalizacao de politica operacional dedicada

### O que estava OK

- A auditoria ja havia identificado quais credenciais criticas exigem maior cuidado, especialmente:
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `SUPABASE_ACCESS_TOKEN`
  - segredos de edge functions e webhooks
- O item 4 ja tinha registrado uma exposicao historica real, o que torna este controle especialmente relevante para o Educly.

### O que foi encontrado fora do padrao

- O repositorio ainda nao tinha uma politica unica dizendo:
  - quais segredos entram no escopo
  - quais eventos exigem rotacao
  - qual a prioridade
  - qual a ordem de execucao
  - quais validacoes fazer apos a troca

### O que foi corrigido

- Foi criada a politica [supabase-key-rotation-policy.md](/c:/Users/User/Documents/GitHub/Marcos/educlyapp-1.00.0.01/docs/runbooks/supabase-key-rotation-policy.md#L1) com:
  - escopo minimo de credenciais cobertas
  - gatilhos obrigatorios de rotacao
  - classificacao de prioridade
  - prazos alvo
  - procedimento padrao de rotacao
  - validacoes pos-rotacao
  - diretrizes especificas para `service_role`, `SUPABASE_ACCESS_TOKEN`, `JWT secret` / `JWT Signing Keys` e chaves publicas
  - template de registro por evento
- A politica tambem registra aplicacao imediata no contexto desta auditoria:
  - rotacao prioritaria da `SUPABASE_SERVICE_ROLE_KEY` exposta historicamente
  - rotacao prioritaria da `RESEND_API_KEY` exposta no mesmo contexto

### O que ficou pendente

- Manter o registro das proximas rotacoes relevantes conforme a politica criada.

### Leitura final da auditoria

O item 20 pode ser marcado como OK. O Educly agora possui politica versionada de rotacao de chaves em caso de vazamento e a rotacao das credenciais historicamente expostas ja foi confirmada pelo time.

### Evidencias

- Item 4 registrou exposicao historica de `SUPABASE_SERVICE_ROLE_KEY`
- Politica criada em [supabase-key-rotation-policy.md](/c:/Users/User/Documents/GitHub/Marcos/educlyapp-1.00.0.01/docs/runbooks/supabase-key-rotation-policy.md#L1)
- Fonte oficial: https://supabase.com/docs/guides/api/api-keys
- Fonte oficial: https://supabase.com/docs/guides/auth/signing-keys
- Fonte oficial: https://supabase.com/docs/guides/troubleshooting/rotating-anon-service-and-jwt-secrets-1Jq6yd
