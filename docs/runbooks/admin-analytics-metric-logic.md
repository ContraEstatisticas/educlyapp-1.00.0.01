# Logica das metricas do Admin Analytics

Data de criacao: 25/03/2026
Projeto auditado: `Educly`

Objetivo: documentar a logica de cada dado exibido em `/admin/analytics`, com a fonte tecnica de cada numero e os cuidados de interpretacao para o time.

## Escopo

- Este documento cobre os cards KPI, os graficos, as tabelas, o bloco `Filtro de dados` e o bloco `Metricas Manuais`.
- Este documento nao cobre `Email Lookup`, `Reenviar acesso`, `Criacao manual de conta`, `Liberar acesso`, `Bulk Import`, `Revogar acesso` e `Enviar Boas-vindas (Lote)`, porque esses blocos sao ferramentas operacionais e nao contadores analiticos.
- Fonte principal do dashboard: `supabase/functions/admin-analytics-dashboard/index.ts`.
- Fonte dos cards KPI: `src/components/admin/KPICards.tsx`.
- Fonte dos graficos e tabelas: `src/components/admin/*.tsx`.
- Fonte das metricas manuais: `src/components/admin/ManualMetricsForm.tsx`.

## Regras globais

- Timezone oficial do painel: `America/Sao_Paulo` com offset `-03:00`.
- Quando o dashboard fala em "hoje", "ultimos 7 dias" ou "semana atual", o calculo usa essa timezone.
- A "semana atual" comeca no domingo `00:00` da timezone administrativa.
- No codigo atual, "usuario" significa linha em `public.profiles`, nao necessariamente linha em `auth.users`.
- No codigo atual, "atividade" significa linha em `public.user_day_progress` com `completed = true`.
- No codigo atual, "produto ativo" no dashboard significa linha em `public.user_product_access` com `is_active = true`.
- O snapshot principal do dashboard atualiza automaticamente a cada `5` minutos via React Query.
- O bloco `Filtro de dados` atualiza quando a data muda ou quando o admin usa o botao `Atualizar`.
- O bloco `Metricas Manuais` nao e calculado automaticamente. Ele salva o que o admin digita na tabela `public.admin_manual_metrics`.

## Cards KPI

## Usuarios

### Total de Usuarios

- Onde aparece: secao `Usuarios`.
- Fonte: contagem de linhas em `public.profiles`.
- Logica: `COUNT(*)` de `profiles`.
- Complementos exibidos no card:
- `+X nos ultimos 7 dias`: contas criadas entre o inicio do dia de `6` dias atras e o inicio de amanha.
- `+Y na semana atual`: contas criadas desde o domingo da semana atual ate o inicio de amanha.
- Observacao: o total e baseado em `profiles`, nao em `auth.users`.

### Novos Hoje

- Onde aparece: secao `Usuarios`.
- Fonte: `public.profiles.created_at`.
- Logica: conta perfis com `created_at` entre o inicio de hoje e o inicio de amanha na timezone administrativa.

### Sem Atividade

- Onde aparece: secao `Usuarios`.
- Fonte: `public.profiles` e `public.user_day_progress`.
- Logica: `totalUsers - usuariosComPeloMenosUmCompleted`.
- Regra de atividade: o usuario entra como "com atividade" se tiver ao menos uma linha em `user_day_progress` com `completed = true`.
- Observacao: o nome do card fala em "Sem Atividade", mas o calculo real nao olha `user_streaks`. Ele olha somente se existe algum `completed = true` em `user_day_progress`.

### Taxa de Ativacao

- Onde aparece: secao `Usuarios`.
- Fonte: `public.profiles` e `public.user_day_progress`.
- Logica: `(usuariosComPeloMenosUmCompleted / totalUsers) * 100`.
- Regra de atividade: mesma regra do card `Sem Atividade`.

## Engajamento

### Streak Medio

- Onde aparece: secao `Engajamento`.
- Fonte: `public.user_streaks`.
- Logica:
- carrega todos os registros de `user_streaks`
- zera o `current_streak` de quem tem `last_activity_date` anterior a ontem
- tira a media apenas dos usuarios cujo `current_streak` final ficou maior que `0`
- Observacao importante: o tooltip da UI fala "usuarios ativos nos ultimos 7 dias", mas o calculo real do codigo preserva streak apenas quando `last_activity_date >= ontem`.

### Maior Streak

- Onde aparece: secao `Engajamento`.
- Fonte: `public.user_streaks.longest_streak`.
- Logica: maior valor de `longest_streak` em toda a tabela.

### Ativos (7 dias)

- Onde aparece: secao `Engajamento`.
- Fonte: `public.user_day_progress.completed_at`.
- Logica: total de `user_id` distintos com `completed = true` e `completed_at` dentro da janela dos ultimos `7` dias, incluindo hoje.
- Retencao exibida abaixo do numero: `(activeUsers / totalUsers) * 100`.

### Tempo 1o Login

- Onde aparece: secao `Engajamento`.
- Fonte do numero: RPC `get_avg_first_session_minutes()`.
- Logica do numero: media, em minutos, do primeiro uso ativo registrado para contas novas.
- Acao adicional do card: ao clicar, o painel exporta um CSV via RPC `admin_export_first_session_details()`.
- Campos do CSV: `nome`, `email`, `inicio`, `ultimo_sinal`, `minutos_ativos`.
- Observacao: o card mostra uma media agregada, mas o clique baixa o detalhamento por usuario.

### Dias Completados

- Onde aparece: secao `Engajamento`.
- Fonte: `public.user_day_progress`.
- Logica: total de linhas com `completed = true`.
- Observacao importante: a descricao visual fala em "total de licoes concluidas", mas o calculo real soma registros em `user_day_progress`. Se o modelo mudar, esse numero pode representar dias concluidos e nao licoes individuais.

## Financeiro

### Usuarios Premium

- Onde aparece: secao `Financeiro`.
- Fonte: `public.user_premium_access`.
- Logica atual: contagem de linhas com `plan_type IN ('premium', 'base')`.
- Observacao importante: o codigo atual nao usa `COUNT(DISTINCT user_id)`. Se a tabela tiver mais de uma linha por usuario, o numero pode inflar.

### Renovacoes Hoje

- Onde aparece: secao `Financeiro`.
- Fonte: `public.billing_event_logs`.
- Logica base:
- considera apenas eventos de pagamento do dia atual
- ignora eventos vindos de importacao manual com `_webhook_source = manual_csv_import`
- Funnelfox: conta renovacao quando `subscription.iteration > 1`
- Hotmart: conta renovacao quando `purchase.recurrence_number > 1`
- Hotmart sem `recurrence_number`: infere renovacao se o mesmo email tiver pagamento Hotmart anterior nos ultimos `365` dias
- Deduplicacao: usa uma chave por assinatura, transacao ou email para nao contar o mesmo evento duas vezes
- Resultado final: tamanho do conjunto deduplicado de renovacoes do dia.

### Pagamentos

- Onde aparece: secao `Financeiro`.
- Fonte: `public.billing_event_logs`.
- Logica: conta todos os eventos historicos cujo `event_type` contenha `SETTLED`, `APPROVED` ou `COMPLETE`.
- Observacao: o card conta eventos, nao compradores unicos.

## Produtos

### Base

- Onde aparece: secao `Produtos`.
- Fonte: `public.user_product_access`.
- Logica: `COUNT(DISTINCT user_id)` entre linhas com `is_active = true` e `product_type = 'base'`.

### Freelancer

- Onde aparece: secao `Produtos`.
- Fonte: `public.user_product_access`.
- Logica: `COUNT(DISTINCT user_id)` entre linhas com `is_active = true` e `product_type = 'freelancer'`.

### AI Hub

- Onde aparece: secao `Produtos`.
- Fonte: `public.user_product_access`.
- Logica: `COUNT(DISTINCT user_id)` entre linhas com `is_active = true` e `product_type = 'ai_hub'`.

### Observacao sobre produtos

- No codigo atual, o edge function so verifica `is_active = true`.
- No codigo atual, o edge function nao valida `revoked_at` nem `expires_at` para esses cards e para o grafico de distribuicao.

## Problemas

### Reembolsos

- Onde aparece: secao `Problemas`.
- Fonte: `public.billing_event_logs`.
- Logica: conta eventos cujo `event_type` contenha `refund` dentro do periodo selecionado no filtro de dias.
- Periodos disponiveis na UI: `1`, `2`, `3`, `4`, `5`, `6`, `7`, `30`, `60` e `90` dias.

### Chargebacks

- Onde aparece: secao `Problemas`.
- Fonte: `public.billing_event_logs`.
- Logica: contagem historica de eventos cujo `event_type` contenha `chargeback`.
- Observacao: o KPI nao inclui `dispute`, mas a tabela de cancelamentos inclui.

## Graficos

### Crescimento de Usuarios (30 dias)

- Onde aparece: primeiro bloco de graficos.
- Fonte: `public.profiles.created_at`.
- Logica:
- monta uma serie com os ultimos `30` dias na timezone administrativa
- conta quantos perfis foram criados em cada dia
- calcula tambem um acumulado chamado `total`
- Observacao: o grafico desenha a serie `novos`. O `total` fica disponivel no payload, mas nao e a linha exibida.

### Distribuicao de Produtos

- Onde aparece: primeiro bloco de graficos.
- Fonte: `public.user_product_access`.
- Logica: mesma base dos cards `Base`, `Freelancer` e `AI Hub`.
- Regra: usuarios unicos por `product_type` com `is_active = true`.
- Categorias exibidas: `Base`, `Freelancer` e `AI Hub`.

### Eventos de Billing

- Onde aparece: primeiro bloco de graficos.
- Fonte: `public.billing_event_logs`.
- Logica: agrupa a base historica nas categorias abaixo.
- `Pagamentos`: `event_type` contem `SETTLED`, `APPROVED` ou `COMPLETE`.
- `Trials`: `event_type` contem `TRIAL`.
- `Chargebacks`: `event_type` contem `CHARGEBACK`.
- `Reembolsos`: `event_type` contem `REFUND`.
- `Concessoes`: `event_type` e exatamente `GRANTED`.
- Observacao: categorias com valor `0` sao removidas do grafico.

### LTV - Retencao por Mes

- Onde aparece: primeiro bloco de graficos.
- Fonte: `public.billing_event_logs`.
- Logica:
- considera eventos cujo `event_type` contenha `SETTLED`, `APPROVED`, `COMPLETE`, `RENEWING` ou `RECOVERING`
- normaliza por email
- tenta descobrir a recorrencia pela `subscription.iteration` da Funnelfox ou `purchase.recurrence_number` da Hotmart
- considera apenas iteracoes `>= 2`
- conta usuarios unicos por iteracao
- Rotulo final:
- `Mes 1` corresponde a `iteration = 2`
- `Mes 2` corresponde a `iteration = 3`
- e assim por diante
- Observacao: o grafico comeca na primeira renovacao. A compra inicial nao entra.

### Distribuicao de Streaks

- Onde aparece: primeiro bloco de graficos.
- Fonte: `public.user_streaks`.
- Logica:
- reaproveita a mesma regra de `processedStreaks` usada no dashboard
- se `last_activity_date < ontem`, o `current_streak` cai para `0`
- depois distribui os usuarios nos buckets abaixo
- Buckets:
- `0 dias`
- `1-3 dias`
- `4-7 dias`
- `8-14 dias`
- `15+ dias`

## Tabelas e blocos

### Eventos de Billing

- Onde aparece: aba `Billing Logs`.
- Fonte: `public.billing_event_logs`.
- Logica: ultimos `30` registros, ordenados por `created_at DESC`.
- Colunas principais:
- `Data`: `created_at`
- `Email`: `email`
- `Fonte`: `_webhook_source` no payload, quando existir
- `Evento`: `event_type`, com badge por categoria
- `Produto`: inferido de `_extraction_info.product_id` quando existir
- `Status`: combinacao de `status` e `processed`
- Observacao: a descricao do bloco informa que ele atualiza a cada `5` minutos, alinhado ao refresh do dashboard.

### Cancelamentos & Chargebacks

- Onde aparece: aba `Cancelamentos`.
- Fonte: `public.billing_event_logs`.
- Logica: ultimos `20` registros cujo `event_type` contenha `chargeback`, `refund`, `cancel` ou `dispute`, ordenados por `created_at DESC`.
- Colunas:
- `Data`
- `Email`
- `Tipo`
- `Status`

### Top Streaks

- Onde aparece: aba `Top Streaks`.
- Fonte: `public.user_streaks` enriquecida com `public.profiles`.
- Logica:
- pega ate `100` linhas de `user_streaks`
- filtra `last_activity_date >= ontem`
- ordena por `current_streak DESC`
- busca o `full_name` correspondente em `profiles`
- A tabela mostra por padrao os primeiros `10` e permite carregar mais em lotes de `10`.

### Usuarios Premium

- Onde aparece: aba `Premium`.
- Fonte principal: `public.user_premium_access`.
- Enriquecimento:
- nome via `public.profiles`
- produtos via `public.user_product_access` com `is_active = true`
- Logica:
- busca os `20` registros mais recentes de `user_premium_access` com `is_premium = true`
- ordena por `purchased_at DESC`
- monta as colunas `Nome`, `Produtos` e `Desde`
- Observacao importante: no codigo atual a tabela usa as linhas mais recentes de acesso premium. Se houver historico multiplo por usuario, um mesmo usuario pode reaparecer.

### Filtro de dados

- Onde aparece: aba `Filtro de dados`.
- Fonte: `public.profiles` e `public.billing_event_logs`.
- Parametro principal: `Data inicial`.
- Janela analisada: de `startISO` ate o momento atual.

#### Contas criadas

- Fonte: `public.profiles`.
- Logica: conta perfis com `created_at >= startISO`.

#### Usuarios com acesso

- Fonte: `public.billing_event_logs`.
- Logica atual: conta eventos de compra com `event_type IN ('PURCHASE_COMPLETE', 'SETTLED', 'settled')` e `created_at >= startISO`.
- Observacao importante: apesar do rotulo falar em "Usuarios com acesso", o numero atual representa total de eventos de compra dentro do periodo, nao usuarios unicos.

#### Compras com cadastro

- Fonte: `public.billing_event_logs`.
- Logica: mesmos eventos de compra acima, mas somente quando `user_id IS NOT NULL`.

#### Compras sem cadastro

- Fonte: `public.billing_event_logs`.
- Logica: mesmos eventos de compra acima, mas somente quando `status = 'USER_NOT_FOUND'`.

#### Ultimos com cadastro

- Fonte: `public.billing_event_logs`.
- Logica: ultimos `50` eventos de compra desde `startISO` com `user_id IS NOT NULL`, ordenados por `created_at DESC`.
- Campos exibidos: `email` e `created_at`.

#### Ultimos sem cadastro

- Fonte: `public.billing_event_logs`.
- Logica: ultimos `50` eventos de compra desde `startISO` com `status = 'USER_NOT_FOUND'`, ordenados por `created_at DESC`.
- Campos exibidos: `email` e `created_at`.

### Metricas Manuais

- Onde aparece: bloco final da pagina.
- Fonte: `public.admin_manual_metrics`.
- Logica de persistencia:
- uma linha por dia, controlada por `metric_date`
- o form faz `upsert` com conflito em `metric_date`
- `created_by` recebe o usuario autenticado que salvou
- `updated_at` recebe o timestamp do salvamento
- Campos manuais:
- `nps_score`
- `emails_sent`
- `emails_opened`
- `emails_clicked`
- `support_tickets_opened`
- `support_tickets_resolved`
- `notes`
- Historico exibido:
- ultimas `30` linhas, ordenadas por `metric_date DESC`
- Observacao: esses dados nao sao derivados do edge function `admin-analytics-dashboard`. Sao digitados manualmente pela operacao.

## Divergencias e cuidados de interpretacao

- `Streak Medio`: o tooltip fala em ultimos `7` dias, mas o calculo real usa `last_activity_date >= ontem`.
- `Dias Completados`: a descricao visual fala em "licoes concluidas", mas a consulta soma linhas de `user_day_progress completed = true`.
- `Usuarios Premium` no KPI: o codigo atual conta linhas em `user_premium_access`, nao `DISTINCT user_id`.
- `Usuarios com acesso` na aba `Filtro de dados`: o rotulo sugere usuarios, mas o numero atual e total de eventos de compra.
- Produtos: cards, grafico e tabela premium usam `is_active = true`; o codigo atual nao filtra `revoked_at` nem `expires_at`.

## Como manter este documento atualizado

- Sempre que houver mudanca em `supabase/functions/admin-analytics-dashboard/index.ts`, revisar este arquivo.
- Sempre que um card, grafico ou tabela mudar de rotulo na UI, conferir se a definicao aqui continua coerente.
- Se a regra do numero mudar, atualizar primeiro o `.md` e depois regenerar o `.docx`.
