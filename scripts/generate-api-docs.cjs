const fs = require("fs");
const path = require("path");

const projectId = "dqlcxpbfemhzzetwaxsa";
const productionBaseUrl = `https://${projectId}.supabase.co/functions/v1`;
const localBaseUrl = "http://127.0.0.1:54321/functions/v1";

const outputDir = path.join(__dirname, "..", "public", "api-docs");
const outputPath = path.join(outputDir, "openapi.json");
const outputPathPt = path.join(outputDir, "openapi.pt-BR.json");

const schemaRef = (name) => ({ $ref: `#/components/schemas/${name}` });
const responseRef = (name) => ({ $ref: `#/components/responses/${name}` });

const jsonContent = (schema, example) => ({
  "application/json": {
    schema,
    ...(example ? { example } : {}),
  },
});

const jsonRequestBody = (schema, example, description) => ({
  required: true,
  ...(description ? { description } : {}),
  content: jsonContent(schema, example),
});

const sseContent = {
  "text/event-stream": {
    schema: {
      type: "string",
      description:
        "Server-Sent Events stream compatible with OpenAI-style chat completion deltas.",
    },
  },
};

const streamResponse = (description) => ({
  description,
  content: sseContent,
});

const streamOrJsonResponse = (description, schema, example) => ({
  description,
  content: {
    ...sseContent,
    "application/json": {
      schema,
      ...(example ? { example } : {}),
    },
  },
});

const genericSuccessSchema = {
  type: "object",
  additionalProperties: true,
};

const ptTranslations = {
  "Educly Edge Functions API": "API de Edge Functions da Educly",
  "Swagger/OpenAPI documentation for Educly serverless APIs.":
    "Documentação Swagger/OpenAPI das APIs serverless da Educly.",
  "This project exposes its API surface primarily through Supabase Edge Functions under `/functions/v1/*`.\n\nDocumented from the current source code on March 19, 2026. Source of truth: `supabase/functions/*/index.ts`.\n\nImportant: some routes are clearly intended for internal service-to-service usage but currently do not enforce transport-level auth inside the function handler. These cases are flagged in each operation description so the docs stay honest to the implementation.":
    "Este projeto expõe sua superfície principal de API por meio de Supabase Edge Functions em `/functions/v1/*`.\n\nDocumentado a partir do código-fonte atual em 19 de março de 2026. Fonte da verdade: `supabase/functions/*/index.ts`.\n\nImportante: algumas rotas são claramente voltadas para uso interno service-to-service, mas hoje ainda não aplicam autenticação forte no próprio handler. Esses casos foram sinalizados em cada operação para que a documentação continue fiel ao código.",
  "Production Supabase Edge Functions": "Edge Functions do Supabase em produção",
  "Local Supabase CLI": "Supabase CLI local",
  "Public Auth": "Autenticação Pública",
  "Public-facing signup, password recovery and access-link routes.":
    "Rotas públicas de cadastro, recuperação de senha e links de acesso.",
  "User Chat": "Chat do Usuário",
  "Authenticated chat and assistant endpoints used by students.":
    "Endpoints autenticados de chat e assistentes usados pelos alunos.",
  "User Features": "Funcionalidades do Usuário",
  "Authenticated user endpoints outside chat, such as certificates and targeted lifecycle emails.":
    "Endpoints autenticados do usuário fora do chat, como certificados e e-mails de jornada.",
  Admin: "Admin",
  "Admin-only operational endpoints guarded by an authenticated admin JWT.":
    "Endpoints operacionais exclusivos de admin, protegidos por JWT autenticado de admin.",
  "Email / Messaging": "E-mail / Mensageria",
  "Transactional or batch email orchestration endpoints.":
    "Endpoints de orquestração de e-mails transacionais ou em lote.",
  Webhooks: "Webhooks",
  "Incoming payment and CRM webhook receivers.":
    "Recebedores de webhooks de pagamento e CRM.",
  Operations: "Operações",
  "Cron, retry, diagnostics and maintenance endpoints.":
    "Endpoints de cron, retry, diagnóstico e manutenção.",
  "Authenticated Supabase user session JWT.":
    "JWT de sessão autenticada do usuário Supabase.",
  "Authenticated Supabase user JWT for an admin account.":
    "JWT autenticado do Supabase para uma conta admin.",
  "Diagnostic token that must match `DEBUG_TOKEN`.":
    "Token de diagnóstico que precisa coincidir com `DEBUG_TOKEN`.",
  "Bearer token that must match `PADDLE_API_KEY`.":
    "Bearer token que precisa coincidir com `PADDLE_API_KEY`.",
  "Alternative Paddle verification header. Must validate against `PADDLE_WEBHOOK_SECRET`.":
    "Header alternativo de verificação do Paddle. Precisa validar contra `PADDLE_WEBHOOK_SECRET`.",
  "Hotmart/Primer webhook header matched against `HOTMART_HOTTOK`.":
    "Header de webhook Hotmart/Primer validado contra `HOTMART_HOTTOK`.",
  "Funnelfox HMAC-SHA256 signature matched against `FUNNELFOX_WEBHOOK_TOKEN`.":
    "Assinatura HMAC-SHA256 do Funnelfox validada contra `FUNNELFOX_WEBHOOK_TOKEN`.",
  "Cron or internal bearer token. Used by `retry-failed-webhooks` with `CRON_SECRET` or service role.":
    "Bearer token de cron ou interno. Usado por `retry-failed-webhooks` com `CRON_SECRET` ou service role.",
  "Invalid request payload or parameters.":
    "Payload ou parâmetros inválidos.",
  "Missing or invalid authentication.":
    "Autenticação ausente ou inválida.",
  "Authenticated, but not allowed to use this route.":
    "Autenticado, mas sem permissão para usar esta rota.",
  "Requested resource was not found.":
    "O recurso solicitado não foi encontrado.",
  "Rate limit reached.": "Limite de taxa atingido.",
  "Unexpected server-side failure.": "Falha inesperada no servidor.",
  "HTTP method not supported by this endpoint.":
    "Método HTTP não suportado por este endpoint.",
  "Server-Sent Events stream compatible with OpenAI-style chat completion deltas.":
    "Stream de Server-Sent Events compatível com deltas de chat completion no estilo OpenAI.",
  "IETF language tag or short language code.":
    "Tag de idioma IETF ou código curto de idioma.",
  "Short language code.": "Código curto de idioma.",
  "Browser or app locale, for example `pt-BR` or `en`.":
    "Locale do navegador ou do app, por exemplo `pt-BR` ou `en`.",
  "Optional. Present in the handler interface, but the function currently derives the actual email locale from profile/user metadata.":
    "Opcional. Existe na interface do handler, mas hoje a função deriva o locale real do e-mail a partir do perfil/metadados do usuário.",
  "Expected format: DD/MM/YYYY": "Formato esperado: DD/MM/AAAA",
  "Alternative to bearer auth. Must match `CRON_SECRET`.":
    "Alternativa à autenticação via bearer. Precisa coincidir com `CRON_SECRET`.",
  "Grant product access to a user manually":
    "Conceder acesso de produto manualmente a um usuário",
  "Admin-only route used to manually grant one or more product entitlements and premium access to a user.\n\nSource: `supabase/functions/admin-grant-access/index.ts`.":
    "Rota exclusiva de admin usada para conceder manualmente um ou mais produtos e acesso premium a um usuário.\n\nFonte: `supabase/functions/admin-grant-access/index.ts`.",
  "Access granted successfully.": "Acesso concedido com sucesso.",
  "Revoke selected products from a user":
    "Revogar produtos selecionados de um usuário",
  "Admin-only route that revokes active product access rows and recalculates premium status.\n\nSource: `supabase/functions/admin-revoke-access/index.ts`.":
    "Rota exclusiva de admin que revoga registros ativos de acesso a produtos e recalcula o status premium.\n\nFonte: `supabase/functions/admin-revoke-access/index.ts`.",
  "Revocation completed.": "Revogação concluída.",
  "AI Hub chat with multiple assistant personas":
    "Chat do AI Hub com múltiplas personas de assistente",
  "Authenticated student chat endpoint for the AI Hub. Streams text responses for most personas and returns JSON when `aiType=nanobanana` triggers image generation.\n\nSource: `supabase/functions/assistentes-chat/index.ts`.":
    "Endpoint autenticado de chat do aluno para o AI Hub. Faz streaming de respostas em texto para a maioria das personas e retorna JSON quando `aiType=nanobanana` aciona geração de imagem.\n\nFonte: `supabase/functions/assistentes-chat/index.ts`.",
  "SSE stream for text personas, or JSON creative payload for `nanobanana`.":
    "Stream SSE para personas de texto, ou payload JSON criativo para `nanobanana`.",
  "Create or reconcile an account and return permanent access token":
    "Criar ou reconciliar uma conta e retornar token de acesso permanente",
  "Creates a new user or reconciles an existing one, processes pending billing events and returns a permanent access token from `user_access_tokens`.\n\nWarning: the current handler does not enforce auth inside the function and should be treated as internal service-to-service only.\n\nSource: `supabase/functions/auto-create-account/index.ts`.":
    "Cria um novo usuário ou reconcilia um existente, processa eventos de cobrança pendentes e retorna um token de acesso permanente de `user_access_tokens`.\n\nAviso: o handler atual não impõe autenticação dentro da função e deve ser tratado como uso interno service-to-service.\n\nFonte: `supabase/functions/auto-create-account/index.ts`.",
  "Account created or reconciled.": "Conta criada ou reconciliada.",
  "Bulk import billing grants from CSV-style product strings":
    "Importar concessões de cobrança em lote a partir de strings de produto estilo CSV",
  "Admin-only route that queues or immediately processes grant events for up to 50 entries per call.\n\nSource: `supabase/functions/bulk-grant-access/index.ts`.":
    "Rota exclusiva de admin que enfileira ou processa imediatamente eventos de concessão para até 50 entradas por chamada.\n\nFonte: `supabase/functions/bulk-grant-access/index.ts`.",
  "Batch import summary.": "Resumo da importação em lote.",
  "Expire premium and product access via database RPC":
    "Expirar acesso premium e de produtos via RPC do banco",
  "Operational route that calls `check_and_expire_access` and returns counts/details.\n\nIntended for cron/manual maintenance. Current code allows invocation without strict auth; recommended usage is internal only, optionally with `x-cron-job: true`.\n\nSource: `supabase/functions/check-access-expiration/index.ts`.":
    "Rota operacional que chama `check_and_expire_access` e retorna contagens/detalhes.\n\nPensada para cron/manutenção manual. O código atual permite invocação sem autenticação rígida; o uso recomendado é apenas interno, opcionalmente com `x-cron-job: true`.\n\nFonte: `supabase/functions/check-access-expiration/index.ts`.",
  "Optional hint used by the handler to identify cron execution.":
    "Sinal opcional usado pelo handler para identificar execução via cron.",
  "Expiration summary.": "Resumo da expiração.",
  "Auto-confirm a recently created purchased account":
    "Auto-confirmar uma conta comprada criada recentemente",
  "Confirms a user's email when the account was created recently and a purchase exists for that email.\n\nWarning: the current handler does not enforce transport auth and should only be used internally.\n\nSource: `supabase/functions/confirm-signup-email/index.ts`.":
    "Confirma o e-mail de um usuário quando a conta foi criada recentemente e existe uma compra para esse e-mail.\n\nAviso: o handler atual não impõe autenticação de transporte e deve ser usado apenas internamente.\n\nFonte: `supabase/functions/confirm-signup-email/index.ts`.",
  "Email confirmed.": "E-mail confirmado.",
  "Inspect billing state for a single email":
    "Inspecionar o estado de cobrança de um único e-mail",
  "Diagnostic endpoint used to inspect recent billing events, product access and premium status for an email.\n\nSource: `supabase/functions/debug-billing/index.ts`.":
    "Endpoint de diagnóstico usado para inspecionar eventos recentes de cobrança, acessos a produtos e status premium de um e-mail.\n\nFonte: `supabase/functions/debug-billing/index.ts`.",
  "Billing inspection payload.": "Payload de inspeção de cobrança.",
  "Generate and store a course certificate PNG":
    "Gerar e armazenar um certificado de curso em PNG",
  "Authenticated student endpoint that renders a PNG certificate, uploads it to Supabase Storage and stores a certificate row in the database.\n\nSource: `supabase/functions/generate-certificate/index.ts`.":
    "Endpoint autenticado do aluno que renderiza um certificado PNG, envia para o Supabase Storage e grava um registro de certificado no banco.\n\nFonte: `supabase/functions/generate-certificate/index.ts`.",
  "Certificate generated and stored.": "Certificado gerado e armazenado.",
  "Premium student EDI/academy chat":
    "Chat premium do aluno com EDI/academia",
  "Authenticated premium chat endpoint used inside the academy experience. Validates premium access and streams model output.\n\nSource: `supabase/functions/iacademy-chat/index.ts`.":
    "Endpoint autenticado de chat premium usado dentro da experiência da academia. Valida acesso premium e faz streaming da saída do modelo.\n\nFonte: `supabase/functions/iacademy-chat/index.ts`.",
  "OpenAI-style SSE stream.": "Stream SSE no estilo OpenAI.",
  "Public landing-page support chat":
    "Chat público de suporte da landing page",
  "Public chat endpoint used on the marketing/landing surface. May answer with keyword-based quick replies or stream model output.\n\nSource: `supabase/functions/landing-support-chat/index.ts`.":
    "Endpoint público de chat usado na superfície de marketing/landing. Pode responder com quick replies baseadas em palavras-chave ou fazer streaming da saída do modelo.\n\nFonte: `supabase/functions/landing-support-chat/index.ts`.",
  "SSE stream or synthetic SSE fallback response.":
    "Stream SSE ou resposta fallback sintética em SSE.",
  "Resolve permanent token into a fresh Supabase magic link":
    "Resolver token permanente em um novo magic link do Supabase",
  "Accepts a permanent access token via query string and returns a fresh `action_link` generated through Supabase Auth.\n\nSource: `supabase/functions/magic-login/index.ts`.":
    "Aceita um token de acesso permanente via query string e retorna um novo `action_link` gerado pelo Supabase Auth.\n\nFonte: `supabase/functions/magic-login/index.ts`.",
  "Same contract as the GET variant, but reads the token from JSON body.\n\nSource: `supabase/functions/magic-login/index.ts`.":
    "Mesmo contrato da variante GET, mas lendo o token do corpo JSON.\n\nFonte: `supabase/functions/magic-login/index.ts`.",
  "Fresh action link.": "Novo action link.",
  "Create an account for a pending user":
    "Criar uma conta para um usuário pendente",
  "Creates a user without requiring purchase existence, but returns conflict if the user already exists. Used for pending-access onboarding flows.\n\nSource: `supabase/functions/pending-signup/index.ts`.":
    "Cria um usuário sem exigir existência prévia de compra, mas retorna conflito se o usuário já existir. Usado em fluxos de onboarding com acesso pendente.\n\nFonte: `supabase/functions/pending-signup/index.ts`.",
  "User created.": "Usuário criado.",
  "User already registered.": "Usuário já cadastrado.",
  "Create an account only when a purchase already exists":
    "Criar uma conta apenas quando já existe uma compra",
  "Creates a user only if `check_purchase_exists` succeeds for the email. Returns `403 NO_PURCHASE` when no qualifying purchase exists.\n\nSource: `supabase/functions/purchased-signup/index.ts`.":
    "Cria um usuário apenas se `check_purchase_exists` retornar sucesso para o e-mail. Retorna `403 NO_PURCHASE` quando não existe compra elegível.\n\nFonte: `supabase/functions/purchased-signup/index.ts`.",
  "No purchase found for this email.": "Nenhuma compra encontrada para este e-mail.",
  "User already exists.": "Usuário já existe.",
  "Send a new permanent-access magic link email":
    "Enviar um novo e-mail com magic link de acesso permanente",
  "Looks up the user by email, reuses or creates a permanent access token and sends a new email through Resend.\n\nSource: `supabase/functions/resend-magic-link/index.ts`.":
    "Procura o usuário por e-mail, reutiliza ou cria um token de acesso permanente e envia um novo e-mail via Resend.\n\nFonte: `supabase/functions/resend-magic-link/index.ts`.",
  "Magic-link email sent.": "E-mail com magic link enviado.",
  "Per-email rate limit reached.": "Limite por e-mail atingido.",
  "Send password reset email": "Enviar e-mail de redefinição de senha",
  "Generates a Supabase recovery link and sends a localized email via Resend. The handler intentionally returns `200 { success: true }` even when the user is missing or an internal error occurs, to avoid account enumeration.\n\nSource: `supabase/functions/send-password-reset/index.ts`.":
    "Gera um link de recuperação do Supabase e envia um e-mail localizado via Resend. O handler retorna intencionalmente `200 { success: true }` mesmo quando o usuário não existe ou ocorre um erro interno, para evitar enumeração de contas.\n\nFonte: `supabase/functions/send-password-reset/index.ts`.",
  "Always returns success-shaped response.":
    "Sempre retorna uma resposta no formato de sucesso.",
  "Trigger day-5 upsell email for the authenticated user":
    "Disparar e-mail de upsell do dia 5 para o usuário autenticado",
  "Authenticated user route that decides whether to email the current student about AI Hub or Freelancer upsell after day 5.\n\nSource: `supabase/functions/send-upsell-day5/index.ts`.":
    "Rota autenticada do usuário que decide se deve enviar ao aluno atual um e-mail de upsell de AI Hub ou Freelancer após o dia 5.\n\nFonte: `supabase/functions/send-upsell-day5/index.ts`.",
  "Email sent or skipped with reason.": "E-mail enviado ou ignorado com motivo.",
  "Receive Paddle billing and customer webhooks":
    "Receber webhooks de cobrança e cliente do Paddle",
  "Processes Paddle events, resolves customer email, logs billing actions, reconciles entitlements and triggers post-purchase account/email flows.\n\nAuthentication is accepted either through `Authorization: Bearer <PADDLE_API_KEY>` or `paddle-signature` verified against `PADDLE_WEBHOOK_SECRET`.\n\nSource: `supabase/functions/paddle-webhook/index.ts`.":
    "Processa eventos do Paddle, resolve o e-mail do cliente, registra ações de cobrança, reconcilia permissões e aciona fluxos pós-compra de conta/e-mail.\n\nA autenticação é aceita via `Authorization: Bearer <PADDLE_API_KEY>` ou `paddle-signature` validado contra `PADDLE_WEBHOOK_SECRET`.\n\nFonte: `supabase/functions/paddle-webhook/index.ts`.",
  "Raw Paddle webhook payload. Event shape varies by `event_type` and is passed through mostly intact.":
    "Payload bruto do webhook do Paddle. O formato do evento varia conforme `event_type` e é repassado quase intacto.",
  "Webhook accepted, ignored, deduplicated or processed successfully.":
    "Webhook aceito, ignorado, deduplicado ou processado com sucesso.",
  "Receive Hotmart / Primer / FunnelFox purchase webhooks":
    "Receber webhooks de compra Hotmart / Primer / FunnelFox",
  "Receives purchase events, logs billing actions, reconciles entitlements, and orchestrates welcome or magic-link delivery.\n\nAuthentication is accepted either through `x-hotmart-hottok` or `ff-webhook-signature`.\n\nSource: `supabase/functions/primer-webhook/index.ts`.":
    "Recebe eventos de compra, registra ações de cobrança, reconcilia permissões e orquestra o envio de welcome ou magic link.\n\nA autenticação é aceita via `x-hotmart-hottok` ou `ff-webhook-signature`.\n\nFonte: `supabase/functions/primer-webhook/index.ts`.",
  "Raw Hotmart/FunnelFox payload. Event shape varies by provider.":
    "Payload bruto do Hotmart/FunnelFox. O formato do evento varia por provedor.",
  "Webhook accepted or intentionally ignored.":
    "Webhook aceito ou intencionalmente ignorado.",
  "Resend onboarding emails to recent USER_NOT_FOUND billing records":
    "Reenviar e-mails de onboarding para registros recentes de cobrança USER_NOT_FOUND",
  "Internal batch route protected by a shared secret in the request body. Rebuilds welcome emails for recent `USER_NOT_FOUND` events.\n\nSource: `supabase/functions/resend-pending-emails/index.ts`.":
    "Rota interna em lote protegida por segredo compartilhado no corpo da requisição. Reconstrói e-mails de welcome para eventos recentes `USER_NOT_FOUND`.\n\nFonte: `supabase/functions/resend-pending-emails/index.ts`.",
  "Batch resend summary.": "Resumo do reenvio em lote.",
  "Retry failed webhook deliveries": "Reprocessar entregas de webhook com falha",
  "Cron/internal route that replays failed webhook payloads against the original target edge function. Auth is accepted either as `Authorization: Bearer <CRON_SECRET|service_role>` or as body `{ secret }`.\n\nSource: `supabase/functions/retry-failed-webhooks/index.ts`.":
    "Rota interna/de cron que reexecuta payloads de webhook com falha contra a edge function original. A autenticação é aceita via `Authorization: Bearer <CRON_SECRET|service_role>` ou pelo corpo `{ secret }`.\n\nFonte: `supabase/functions/retry-failed-webhooks/index.ts`.",
  "Retry cycle summary.": "Resumo do ciclo de retry.",
  "Send a bulk welcome-style email blast to users":
    "Enviar disparo em lote de e-mail estilo welcome para usuários",
  "Internal route protected by a body secret. Iterates over users (optionally filtered by `targetEmails`) and sends a transactional HTML email through Resend.\n\nSource: `supabase/functions/send-bulk-emails/index.ts`.":
    "Rota interna protegida por segredo no corpo. Itera sobre usuários (opcionalmente filtrados por `targetEmails`) e envia um e-mail transacional em HTML via Resend.\n\nFonte: `supabase/functions/send-bulk-emails/index.ts`.",
  "Bulk send summary.": "Resumo do envio em lote.",
  "Send a one-off incident resolution notification to premium users":
    "Enviar uma notificação pontual de resolução de incidente para usuários premium",
  "Operational route used to notify a fixed window of premium users about a resolved incident.\n\nWarning: current implementation does not enforce auth inside the function and should be treated as internal-only.\n\nSource: `supabase/functions/send-incident-notification/index.ts`.":
    "Rota operacional usada para notificar uma janela fixa de usuários premium sobre um incidente resolvido.\n\nAviso: a implementação atual não impõe autenticação dentro da função e deve ser tratada como uso exclusivamente interno.\n\nFonte: `supabase/functions/send-incident-notification/index.ts`.",
  "Notification batch summary.": "Resumo do lote de notificação.",
  "Process queued pending thank-you / welcome emails":
    "Processar e-mails pendentes de thank-you / welcome",
  "Cron/internal batch route that groups `pending_thank_you_emails` by email, creates/reconciles accounts when possible, and dispatches welcome or magic-link emails.\n\nWarning: current implementation does not enforce auth inside the function and should be treated as internal-only.\n\nSource: `supabase/functions/send-pending-thanks/index.ts`.":
    "Rota interna/de cron em lote que agrupa `pending_thank_you_emails` por e-mail, cria/reconcilia contas quando possível e dispara e-mails de welcome ou magic link.\n\nAviso: a implementação atual não impõe autenticação dentro da função e deve ser tratada como uso exclusivamente interno.\n\nFonte: `supabase/functions/send-pending-thanks/index.ts`.",
  "Batch processing summary.": "Resumo do processamento em lote.",
  "Admin-triggered batch for pending welcome emails":
    "Lote disparado por admin para e-mails pendentes de welcome",
  "Admin-only route that scans pending billing events, creates/reconciles accounts and sends welcome or magic-link emails in controlled batches.\n\nSource: `supabase/functions/send-pending-welcome-batch/index.ts`.":
    "Rota exclusiva de admin que analisa eventos pendentes de cobrança, cria/reconcilia contas e envia e-mails de welcome ou magic link em lotes controlados.\n\nFonte: `supabase/functions/send-pending-welcome-batch/index.ts`.",
  "Batch summary.": "Resumo do lote.",
  "Admin-triggered signup invite emails":
    "E-mails de convite de cadastro disparados por admin",
  "Admin-only route that sends signup invitation emails to a list of addresses and tracks opens through `track-email-open`.\n\nSource: `supabase/functions/send-signup-invite/index.ts`.":
    "Rota exclusiva de admin que envia e-mails de convite de cadastro para uma lista de endereços e rastreia aberturas por `track-email-open`.\n\nFonte: `supabase/functions/send-signup-invite/index.ts`.",
  "Invite batch summary.": "Resumo do lote de convites.",
  "Send welcome or magic-link email":
    "Enviar e-mail de welcome ou magic link",
  "Transactional email route used by purchase/signup workflows. Supports legacy CTA email, new-account magic-link email, and existing-account magic-link email.\n\nWarning: the current handler does not enforce auth inside the function and should be treated as internal service-to-service only.\n\nSource: `supabase/functions/send-welcome-email/index.ts`.":
    "Rota de e-mail transacional usada por fluxos de compra/cadastro. Suporta e-mail legado com CTA, e-mail de magic link para conta nova e e-mail de magic link para conta existente.\n\nAviso: o handler atual não impõe autenticação dentro da função e deve ser tratado como uso interno service-to-service.\n\nFonte: `supabase/functions/send-welcome-email/index.ts`.",
  "Email sent or deduplicated.": "E-mail enviado ou deduplicado.",
  "Track email open via 1x1 pixel":
    "Rastrear abertura de e-mail via pixel 1x1",
  "Returns a transparent GIF and updates `email_logs.opened_at` when `id` is present.\n\nSource: `supabase/functions/track-email-open/index.ts`.":
    "Retorna um GIF transparente e atualiza `email_logs.opened_at` quando `id` está presente.\n\nFonte: `supabase/functions/track-email-open/index.ts`.",
  "Email log identifier. If omitted or invalid, the route still returns the pixel.":
    "Identificador do log de e-mail. Se ausente ou inválido, a rota ainda retorna o pixel.",
  "Transparent 1x1 GIF pixel.": "Pixel GIF transparente 1x1.",
};

function localizeStrings(value, translations) {
  if (typeof value === "string") {
    return translations[value] || value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => localizeStrings(item, translations));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entryValue]) => [
        key,
        localizeStrings(entryValue, translations),
      ]),
    );
  }

  return value;
}

const spec = {
  openapi: "3.1.0",
  info: {
    title: "Educly Edge Functions API",
    version: "2026-03-19",
    summary: "Swagger/OpenAPI documentation for Educly serverless APIs.",
    description:
      "This project exposes its API surface primarily through Supabase Edge Functions under `/functions/v1/*`.\n\n" +
      "Documented from the current source code on March 19, 2026. Source of truth: `supabase/functions/*/index.ts`.\n\n" +
      "Important: some routes are clearly intended for internal service-to-service usage but currently do not enforce transport-level auth inside the function handler. These cases are flagged in each operation description so the docs stay honest to the implementation.",
  },
  servers: [
    {
      url: productionBaseUrl,
      description: "Production Supabase Edge Functions",
    },
    {
      url: localBaseUrl,
      description: "Local Supabase CLI",
    },
  ],
  tags: [
    {
      name: "Public Auth",
      description: "Public-facing signup, password recovery and access-link routes.",
    },
    {
      name: "User Chat",
      description: "Authenticated chat and assistant endpoints used by students.",
    },
    {
      name: "User Features",
      description: "Authenticated user endpoints outside chat, such as certificates and targeted lifecycle emails.",
    },
    {
      name: "Admin",
      description: "Admin-only operational endpoints guarded by an authenticated admin JWT.",
    },
    {
      name: "Email / Messaging",
      description: "Transactional or batch email orchestration endpoints.",
    },
    {
      name: "Webhooks",
      description: "Incoming payment and CRM webhook receivers.",
    },
    {
      name: "Operations",
      description: "Cron, retry, diagnostics and maintenance endpoints.",
    },
  ],
  components: {
    securitySchemes: {
      userBearer: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Authenticated Supabase user session JWT.",
      },
      adminBearer: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Authenticated Supabase user JWT for an admin account.",
      },
      debugToken: {
        type: "apiKey",
        in: "header",
        name: "x-debug-token",
        description: "Diagnostic token that must match `DEBUG_TOKEN`.",
      },
      paddleBearer: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "token",
        description: "Bearer token that must match `PADDLE_API_KEY`.",
      },
      paddleSignature: {
        type: "apiKey",
        in: "header",
        name: "paddle-signature",
        description:
          "Alternative Paddle verification header. Must validate against `PADDLE_WEBHOOK_SECRET`.",
      },
      hotmartHottok: {
        type: "apiKey",
        in: "header",
        name: "x-hotmart-hottok",
        description: "Hotmart/Primer webhook header matched against `HOTMART_HOTTOK`.",
      },
      funnelFoxSignature: {
        type: "apiKey",
        in: "header",
        name: "ff-webhook-signature",
        description:
          "Funnelfox HMAC-SHA256 signature matched against `FUNNELFOX_WEBHOOK_TOKEN`.",
      },
      cronBearer: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "token",
        description:
          "Cron or internal bearer token. Used by `retry-failed-webhooks` with `CRON_SECRET` or service role.",
      },
    },
    responses: {
      BadRequest: {
        description: "Invalid request payload or parameters.",
        content: jsonContent(schemaRef("ErrorResponse")),
      },
      Unauthorized: {
        description: "Missing or invalid authentication.",
        content: jsonContent(schemaRef("ErrorResponse")),
      },
      Forbidden: {
        description: "Authenticated, but not allowed to use this route.",
        content: jsonContent(schemaRef("ErrorResponse")),
      },
      NotFound: {
        description: "Requested resource was not found.",
        content: jsonContent(schemaRef("ErrorResponse")),
      },
      TooManyRequests: {
        description: "Rate limit reached.",
        content: jsonContent(schemaRef("ErrorResponse")),
      },
      InternalError: {
        description: "Unexpected server-side failure.",
        content: jsonContent(schemaRef("ErrorResponse")),
      },
      MethodNotAllowed: {
        description: "HTTP method not supported by this endpoint.",
        content: jsonContent(schemaRef("ErrorResponse")),
      },
    },
    schemas: {
      ErrorResponse: {
        type: "object",
        properties: {
          error: { type: "string" },
          code: { type: ["string", "null"] },
          retry_after: { type: ["integer", "null"] },
        },
        required: ["error"],
        additionalProperties: true,
      },
      LooseObject: {
        type: "object",
        additionalProperties: true,
      },
      Message: {
        type: "object",
        properties: {
          role: {
            type: "string",
            enum: ["user", "assistant"],
          },
          content: {
            type: "string",
            minLength: 1,
            maxLength: 10000,
          },
        },
        required: ["role", "content"],
        additionalProperties: false,
      },
      AssistentesChatRequest: {
        type: "object",
        properties: {
          messages: {
            type: "array",
            minItems: 1,
            maxItems: 50,
            items: schemaRef("Message"),
          },
          aiType: {
            type: "string",
            enum: ["chatgpt", "gemini", "claude", "grok", "nanobanana", "edi"],
            default: "chatgpt",
          },
          language: {
            type: "string",
            description: "IETF language tag or short language code.",
            examples: ["pt", "en", "es"],
          },
        },
        required: ["messages"],
        additionalProperties: false,
      },
      IacademyChatRequest: {
        type: "object",
        properties: {
          messages: {
            type: "array",
            minItems: 1,
            maxItems: 50,
            items: schemaRef("Message"),
          },
          aiToolContext: {
            type: "string",
            maxLength: 200,
          },
          language: {
            type: "string",
            description: "Short language code.",
            examples: ["pt", "en", "es"],
          },
        },
        required: ["messages"],
        additionalProperties: false,
      },
      LandingSupportChatRequest: {
        type: "object",
        properties: {
          messages: {
            type: "array",
            minItems: 1,
            maxItems: 30,
            items: {
              type: "object",
              properties: {
                role: {
                  type: "string",
                  enum: ["user", "assistant"],
                },
                content: {
                  type: "string",
                  minLength: 1,
                  maxLength: 5000,
                },
              },
              required: ["role", "content"],
              additionalProperties: false,
            },
          },
          locale: {
            type: "string",
            description: "Browser or app locale, for example `pt-BR` or `en`.",
          },
        },
        required: ["messages"],
        additionalProperties: false,
      },
      CreativeAssistantResponse: {
        type: "object",
        properties: {
          type: { type: "string", enum: ["creative"] },
          text: { type: "string" },
          imageUrl: { type: ["string", "null"] },
          error: { type: ["string", "null"] },
        },
        required: ["type", "text"],
        additionalProperties: false,
      },
      MagicLoginRequest: {
        type: "object",
        properties: {
          token: { type: "string" },
        },
        required: ["token"],
        additionalProperties: false,
      },
      MagicLoginResponse: {
        type: "object",
        properties: {
          action_link: {
            type: "string",
            format: "uri",
          },
        },
        required: ["action_link"],
        additionalProperties: false,
      },
      EmailOnlyRequest: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
          },
        },
        required: ["email"],
        additionalProperties: false,
      },
      PasswordResetRequest: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
          },
          language: {
            type: "string",
            description:
              "Optional. Present in the handler interface, but the function currently derives the actual email locale from profile/user metadata.",
          },
        },
        required: ["email"],
        additionalProperties: false,
      },
      AutoCreateAccountRequest: {
        type: "object",
        properties: {
          email: { type: "string", format: "email" },
          buyer_name: { type: "string" },
          language: { type: "string", examples: ["es", "pt", "en"] },
        },
        required: ["email"],
        additionalProperties: false,
      },
      AutoCreateAccountResponse: {
        type: "object",
        properties: {
          user_id: { type: "string" },
          access_token: { type: ["string", "null"] },
          generated_password: { type: ["string", "null"] },
          account_created: { type: "boolean" },
          already_existed: { type: "boolean" },
          error: { type: ["string", "null"] },
        },
        additionalProperties: false,
      },
      SignupRequest: {
        type: "object",
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 1 },
          full_name: { type: "string", minLength: 1 },
          preferred_language: { type: "string", examples: ["en", "pt", "es"] },
        },
        required: ["email", "password", "full_name"],
        additionalProperties: false,
      },
      SignupResponse: {
        type: "object",
        properties: {
          user_id: { type: "string" },
          error: { type: ["string", "null"] },
          code: { type: ["string", "null"] },
        },
        additionalProperties: false,
      },
      ConfirmSignupEmailRequest: {
        type: "object",
        properties: {
          user_id: {
            type: "string",
            format: "uuid",
          },
        },
        required: ["user_id"],
        additionalProperties: false,
      },
      AdminGrantAccessRequest: {
        type: "object",
        properties: {
          email: { type: "string", format: "email" },
          products: {
            type: "array",
            minItems: 1,
            items: {
              type: "string",
              enum: ["base", "freelancer", "ai_hub", "combo_freelancer_ai"],
            },
          },
          duration_days: { type: "integer", minimum: 1 },
          language: { type: "string" },
        },
        required: ["email", "products"],
        additionalProperties: false,
      },
      AdminGrantAccessResponse: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          user_id: { type: "string" },
          granted_products: {
            type: "array",
            items: { type: "string" },
          },
          expires_at: { type: ["string", "null"], format: "date-time" },
          welcome_email_scheduled: { type: "boolean" },
          welcome_email_language: { type: "string" },
          welcome_email_skipped_reason: { type: ["string", "null"] },
        },
        required: ["success"],
        additionalProperties: false,
      },
      AdminRevokeAccessRequest: {
        type: "object",
        properties: {
          email: { type: "string", format: "email" },
          products: {
            type: "array",
            minItems: 1,
            items: { type: "string" },
          },
        },
        required: ["email", "products"],
        additionalProperties: false,
      },
      BulkGrantAccessRequest: {
        type: "object",
        properties: {
          entries: {
            type: "array",
            minItems: 1,
            items: {
              type: "object",
              properties: {
                email: { type: "string", format: "email" },
                products_string: { type: "string" },
              },
              required: ["email", "products_string"],
              additionalProperties: false,
            },
          },
        },
        required: ["entries"],
        additionalProperties: false,
      },
      SendSignupInviteRequest: {
        type: "object",
        properties: {
          emails: {
            type: "array",
            minItems: 1,
            items: { type: "string", format: "email" },
          },
          language: { type: "string" },
        },
        required: ["emails"],
        additionalProperties: false,
      },
      SendWelcomeEmailRequest: {
        type: "object",
        properties: {
          email: { type: "string", format: "email" },
          userName: { type: "string" },
          language: { type: "string" },
          mode: {
            type: "string",
            enum: ["legacy", "magic_link", "magic_link_existing"],
            default: "legacy",
          },
          access_token: { type: ["string", "null"] },
          generated_password: { type: ["string", "null"] },
        },
        required: ["email", "userName"],
        additionalProperties: false,
      },
      GenerateCertificateRequest: {
        type: "object",
        properties: {
          nome: { type: "string" },
          formacao: { type: "string" },
          nivel: { type: "string" },
          horas: { type: "number", minimum: 1 },
          descricao: { type: "string" },
          cidade: { type: "string" },
          data: {
            type: "string",
            description: "Expected format: DD/MM/YYYY",
            examples: ["16/02/2026"],
          },
          contribuicao: { type: "string" },
          nomeResponsavel: { type: "string" },
        },
        required: ["nome", "formacao", "nivel", "horas", "cidade", "data"],
        additionalProperties: false,
      },
      GenerateCertificateResponse: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          url: { type: "string", format: "uri" },
          fileName: { type: "string" },
          error: { type: ["string", "null"] },
        },
        required: ["success"],
        additionalProperties: false,
      },
      BulkEmailRequest: {
        type: "object",
        properties: {
          secret: { type: "string" },
          targetEmails: {
            type: "array",
            items: { type: "string", format: "email" },
          },
        },
        required: ["secret"],
        additionalProperties: false,
      },
      RetryFailedWebhooksRequest: {
        type: "object",
        properties: {
          secret: {
            type: "string",
            description: "Alternative to bearer auth. Must match `CRON_SECRET`.",
          },
        },
        additionalProperties: false,
      },
      CheckAccessExpirationResponse: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
          expired_premium_count: { type: "integer" },
          expired_product_count: { type: "integer" },
          expired_events_count: { type: "integer" },
          details: {
            type: "object",
            additionalProperties: true,
          },
          timestamp: { type: "string", format: "date-time" },
          error: { type: ["string", "null"] },
        },
        required: ["success"],
        additionalProperties: false,
      },
    },
  },
  paths: {},
};

spec.paths["/admin-grant-access"] = {
  post: {
    tags: ["Admin"],
    summary: "Grant product access to a user manually",
    description:
      "Admin-only route used to manually grant one or more product entitlements and premium access to a user.\n\nSource: `supabase/functions/admin-grant-access/index.ts`.",
    operationId: "adminGrantAccess",
    security: [{ adminBearer: [] }],
    requestBody: jsonRequestBody(schemaRef("AdminGrantAccessRequest"), {
      email: "student@example.com",
      products: ["base", "freelancer"],
      duration_days: 30,
      language: "es",
    }),
    responses: {
      "200": {
        description: "Access granted successfully.",
        content: jsonContent(schemaRef("AdminGrantAccessResponse"), {
          success: true,
          user_id: "2dbf6152-2467-41af-9e01-d09ea8c442f6",
          granted_products: ["base", "freelancer"],
          expires_at: "2026-04-18T12:00:00.000Z",
          welcome_email_scheduled: true,
          welcome_email_language: "es",
          welcome_email_skipped_reason: null,
        }),
      },
      "401": responseRef("Unauthorized"),
      "403": responseRef("Forbidden"),
      "404": responseRef("NotFound"),
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/admin-revoke-access"] = {
  post: {
    tags: ["Admin"],
    summary: "Revoke selected products from a user",
    description:
      "Admin-only route that revokes active product access rows and recalculates premium status.\n\nSource: `supabase/functions/admin-revoke-access/index.ts`.",
    operationId: "adminRevokeAccess",
    security: [{ adminBearer: [] }],
    requestBody: jsonRequestBody(schemaRef("AdminRevokeAccessRequest"), {
      email: "student@example.com",
      products: ["freelancer"],
    }),
    responses: {
      "200": {
        description: "Revocation completed.",
        content: jsonContent(genericSuccessSchema, {
          success: true,
          revoked_count: 1,
          is_premium_after: false,
        }),
      },
      "400": responseRef("BadRequest"),
      "401": responseRef("Unauthorized"),
      "403": responseRef("Forbidden"),
      "404": responseRef("NotFound"),
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/assistentes-chat"] = {
  post: {
    tags: ["User Chat"],
    summary: "AI Hub chat with multiple assistant personas",
    description:
      "Authenticated student chat endpoint for the AI Hub. Streams text responses for most personas and returns JSON when `aiType=nanobanana` triggers image generation.\n\nSource: `supabase/functions/assistentes-chat/index.ts`.",
    operationId: "assistentesChat",
    security: [{ userBearer: [] }],
    requestBody: jsonRequestBody(schemaRef("AssistentesChatRequest"), {
      messages: [{ role: "user", content: "Explique o que é prompt engineering." }],
      aiType: "chatgpt",
      language: "pt",
    }),
    responses: {
      "200": streamOrJsonResponse(
        "SSE stream for text personas, or JSON creative payload for `nanobanana`.",
        schemaRef("CreativeAssistantResponse"),
        {
          type: "creative",
          text: "Vou criar uma imagem futurista inspirada no seu pedido.",
          imageUrl: "https://example.com/generated.png",
        },
      ),
      "400": responseRef("BadRequest"),
      "401": responseRef("Unauthorized"),
      "429": responseRef("TooManyRequests"),
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/auto-create-account"] = {
  post: {
    tags: ["Public Auth"],
    summary: "Create or reconcile an account and return permanent access token",
    description:
      "Creates a new user or reconciles an existing one, processes pending billing events and returns a permanent access token from `user_access_tokens`.\n\nWarning: the current handler does not enforce auth inside the function and should be treated as internal service-to-service only.\n\nSource: `supabase/functions/auto-create-account/index.ts`.",
    operationId: "autoCreateAccount",
    "x-internal": true,
    requestBody: jsonRequestBody(schemaRef("AutoCreateAccountRequest"), {
      email: "student@example.com",
      buyer_name: "Maria",
      language: "es",
    }),
    responses: {
      "200": {
        description: "Account created or reconciled.",
        content: jsonContent(schemaRef("AutoCreateAccountResponse"), {
          user_id: "9c17d613-13b2-4eb0-9888-5175098d9e90",
          access_token: "1fb05610-3fef-49d8-b4ec-e1d62aaf97ff",
          generated_password: "Abcd1234!xYz",
          account_created: true,
          already_existed: false,
        }),
      },
      "400": responseRef("BadRequest"),
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/bulk-grant-access"] = {
  post: {
    tags: ["Admin"],
    summary: "Bulk import billing grants from CSV-style product strings",
    description:
      "Admin-only route that queues or immediately processes grant events for up to 50 entries per call.\n\nSource: `supabase/functions/bulk-grant-access/index.ts`.",
    operationId: "bulkGrantAccess",
    security: [{ adminBearer: [] }],
    requestBody: jsonRequestBody(schemaRef("BulkGrantAccessRequest"), {
      entries: [
        {
          email: "student1@example.com",
          products_string: "Educly, Educly Premium",
        },
        {
          email: "student2@example.com",
          products_string: "Combo Educly Premium + AI Pack",
        },
      ],
    }),
    responses: {
      "200": {
        description: "Batch import summary.",
        content: jsonContent(genericSuccessSchema, {
          success: true,
          batch_size: 2,
          events_inserted: 3,
          users_processed_immediately: 1,
          users_pending_signup: 1,
          skipped_duplicate: 0,
        }),
      },
      "400": responseRef("BadRequest"),
      "401": responseRef("Unauthorized"),
      "403": responseRef("Forbidden"),
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/check-access-expiration"] = {
  post: {
    tags: ["Operations"],
    summary: "Expire premium and product access via database RPC",
    description:
      "Operational route that calls `check_and_expire_access` and returns counts/details.\n\nIntended for cron/manual maintenance. Current code allows invocation without strict auth; recommended usage is internal only, optionally with `x-cron-job: true`.\n\nSource: `supabase/functions/check-access-expiration/index.ts`.",
    operationId: "checkAccessExpiration",
    "x-internal": true,
    parameters: [
      {
        name: "x-cron-job",
        in: "header",
        required: false,
        schema: { type: "string", enum: ["true"] },
        description: "Optional hint used by the handler to identify cron execution.",
      },
    ],
    responses: {
      "200": {
        description: "Expiration summary.",
        content: jsonContent(schemaRef("CheckAccessExpirationResponse"), {
          success: true,
          message: "Access expiration check completed",
          expired_premium_count: 3,
          expired_product_count: 5,
          expired_events_count: 2,
          details: {
            expired_users: [],
            expired_events: [],
          },
          timestamp: "2026-03-19T18:00:00.000Z",
        }),
      },
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/confirm-signup-email"] = {
  post: {
    tags: ["Public Auth"],
    summary: "Auto-confirm a recently created purchased account",
    description:
      "Confirms a user's email when the account was created recently and a purchase exists for that email.\n\nWarning: the current handler does not enforce transport auth and should only be used internally.\n\nSource: `supabase/functions/confirm-signup-email/index.ts`.",
    operationId: "confirmSignupEmail",
    "x-internal": true,
    requestBody: jsonRequestBody(schemaRef("ConfirmSignupEmailRequest"), {
      user_id: "265c4b00-a8c9-472f-82f9-3f7ff1751403",
    }),
    responses: {
      "200": {
        description: "Email confirmed.",
        content: jsonContent(genericSuccessSchema, {
          confirmed: true,
        }),
      },
      "400": responseRef("BadRequest"),
      "403": responseRef("Forbidden"),
      "404": responseRef("NotFound"),
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/debug-billing"] = {
  get: {
    tags: ["Operations"],
    summary: "Inspect billing state for a single email",
    description:
      "Diagnostic endpoint used to inspect recent billing events, product access and premium status for an email.\n\nSource: `supabase/functions/debug-billing/index.ts`.",
    operationId: "debugBilling",
    security: [{ debugToken: [] }],
    parameters: [
      {
        name: "email",
        in: "query",
        required: true,
        schema: { type: "string", format: "email" },
      },
      {
        name: "limit",
        in: "query",
        required: false,
        schema: { type: "integer", minimum: 1, maximum: 200, default: 50 },
      },
    ],
    responses: {
      "200": {
        description: "Billing inspection payload.",
        content: jsonContent(schemaRef("LooseObject"), {
          email: "student@example.com",
          user_id: "4fa03fb4-9df6-4f62-9d9b-a5a441e64eb1",
          events: [],
          product_access: [],
          premium_access: null,
        }),
      },
      "400": responseRef("BadRequest"),
      "401": responseRef("Unauthorized"),
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/generate-certificate"] = {
  post: {
    tags: ["User Features"],
    summary: "Generate and store a course certificate PNG",
    description:
      "Authenticated student endpoint that renders a PNG certificate, uploads it to Supabase Storage and stores a certificate row in the database.\n\nSource: `supabase/functions/generate-certificate/index.ts`.",
    operationId: "generateCertificate",
    security: [{ userBearer: [] }],
    requestBody: jsonRequestBody(schemaRef("GenerateCertificateRequest"), {
      nome: "Maria Silva",
      formacao: "Inteligência Artificial",
      nivel: "júnior",
      horas: 20,
      cidade: "São Paulo",
      data: "16/02/2026",
      contribuicao: "em projetos reais de IA generativa",
      nomeResponsavel: "Prof. João Silva",
    }),
    responses: {
      "200": {
        description: "Certificate generated and stored.",
        content: jsonContent(schemaRef("GenerateCertificateResponse"), {
          success: true,
          url: "https://example.supabase.co/storage/v1/object/public/certificates/certificate_123.png",
          fileName: "certificate_userid_1742400000000.png",
        }),
      },
      "400": responseRef("BadRequest"),
      "401": responseRef("Unauthorized"),
    },
  },
};

spec.paths["/iacademy-chat"] = {
  post: {
    tags: ["User Chat"],
    summary: "Premium student EDI/academy chat",
    description:
      "Authenticated premium chat endpoint used inside the academy experience. Validates premium access and streams model output.\n\nSource: `supabase/functions/iacademy-chat/index.ts`.",
    operationId: "iacademyChat",
    security: [{ userBearer: [] }],
    requestBody: jsonRequestBody(schemaRef("IacademyChatRequest"), {
      messages: [{ role: "user", content: "Quais ferramentas de IA eu devo aprender primeiro?" }],
      aiToolContext: "Midjourney módulo 1",
      language: "pt",
    }),
    responses: {
      "200": streamResponse("OpenAI-style SSE stream."),
      "400": responseRef("BadRequest"),
      "401": responseRef("Unauthorized"),
      "403": responseRef("Forbidden"),
      "429": responseRef("TooManyRequests"),
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/landing-support-chat"] = {
  post: {
    tags: ["User Chat"],
    summary: "Public landing-page support chat",
    description:
      "Public chat endpoint used on the marketing/landing surface. May answer with keyword-based quick replies or stream model output.\n\nSource: `supabase/functions/landing-support-chat/index.ts`.",
    operationId: "landingSupportChat",
    requestBody: jsonRequestBody(schemaRef("LandingSupportChatRequest"), {
      messages: [{ role: "user", content: "Quais ferramentas de IA a Educly ensina?" }],
      locale: "pt-BR",
    }),
    responses: {
      "200": streamResponse("SSE stream or synthetic SSE fallback response."),
      "400": responseRef("BadRequest"),
      "429": responseRef("TooManyRequests"),
    },
  },
};

spec.paths["/magic-login"] = {
  get: {
    tags: ["Public Auth"],
    summary: "Resolve permanent token into a fresh Supabase magic link",
    description:
      "Accepts a permanent access token via query string and returns a fresh `action_link` generated through Supabase Auth.\n\nSource: `supabase/functions/magic-login/index.ts`.",
    operationId: "magicLoginGet",
    parameters: [
      {
        name: "token",
        in: "query",
        required: true,
        schema: { type: "string" },
      },
    ],
    responses: {
      "200": {
        description: "Fresh action link.",
        content: jsonContent(schemaRef("MagicLoginResponse"), {
          action_link: "https://dqlcxpbfemhzzetwaxsa.supabase.co/auth/v1/verify?token=...",
        }),
      },
      "400": responseRef("BadRequest"),
      "404": responseRef("NotFound"),
      "429": responseRef("TooManyRequests"),
      "500": responseRef("InternalError"),
    },
  },
  post: {
    tags: ["Public Auth"],
    summary: "Resolve permanent token into a fresh Supabase magic link",
    description:
      "Same contract as the GET variant, but reads the token from JSON body.\n\nSource: `supabase/functions/magic-login/index.ts`.",
    operationId: "magicLoginPost",
    requestBody: jsonRequestBody(schemaRef("MagicLoginRequest"), {
      token: "1fb05610-3fef-49d8-b4ec-e1d62aaf97ff",
    }),
    responses: {
      "200": {
        description: "Fresh action link.",
        content: jsonContent(schemaRef("MagicLoginResponse"), {
          action_link: "https://dqlcxpbfemhzzetwaxsa.supabase.co/auth/v1/verify?token=...",
        }),
      },
      "400": responseRef("BadRequest"),
      "404": responseRef("NotFound"),
      "429": responseRef("TooManyRequests"),
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/pending-signup"] = {
  post: {
    tags: ["Public Auth"],
    summary: "Create an account for a pending user",
    description:
      "Creates a user without requiring purchase existence, but returns conflict if the user already exists. Used for pending-access onboarding flows.\n\nSource: `supabase/functions/pending-signup/index.ts`.",
    operationId: "pendingSignup",
    requestBody: jsonRequestBody(schemaRef("SignupRequest"), {
      email: "student@example.com",
      password: "StrongPass123!",
      full_name: "Maria Silva",
      preferred_language: "pt",
    }),
    responses: {
      "200": {
        description: "User created.",
        content: jsonContent(schemaRef("SignupResponse"), {
          user_id: "f91d7910-7c1b-4230-8d5e-c2b79cfece3d",
        }),
      },
      "400": responseRef("BadRequest"),
      "409": {
        description: "User already registered.",
        content: jsonContent(schemaRef("SignupResponse"), {
          error: "User already registered",
          code: "ALREADY_EXISTS",
        }),
      },
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/purchased-signup"] = {
  post: {
    tags: ["Public Auth"],
    summary: "Create an account only when a purchase already exists",
    description:
      "Creates a user only if `check_purchase_exists` succeeds for the email. Returns `403 NO_PURCHASE` when no qualifying purchase exists.\n\nSource: `supabase/functions/purchased-signup/index.ts`.",
    operationId: "purchasedSignup",
    requestBody: jsonRequestBody(schemaRef("SignupRequest"), {
      email: "student@example.com",
      password: "StrongPass123!",
      full_name: "Maria Silva",
      preferred_language: "pt",
    }),
    responses: {
      "200": {
        description: "User created.",
        content: jsonContent(schemaRef("SignupResponse"), {
          user_id: "f91d7910-7c1b-4230-8d5e-c2b79cfece3d",
        }),
      },
      "400": responseRef("BadRequest"),
      "403": {
        description: "No purchase found for this email.",
        content: jsonContent(schemaRef("SignupResponse"), {
          error: "No purchase found for this email",
          code: "NO_PURCHASE",
        }),
      },
      "409": {
        description: "User already exists.",
        content: jsonContent(schemaRef("SignupResponse"), {
          error: "User already registered",
          code: "ALREADY_EXISTS",
        }),
      },
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/resend-magic-link"] = {
  post: {
    tags: ["Public Auth"],
    summary: "Send a new permanent-access magic link email",
    description:
      "Looks up the user by email, reuses or creates a permanent access token and sends a new email through Resend.\n\nSource: `supabase/functions/resend-magic-link/index.ts`.",
    operationId: "resendMagicLink",
    requestBody: jsonRequestBody(schemaRef("EmailOnlyRequest"), {
      email: "student@example.com",
    }),
    responses: {
      "200": {
        description: "Magic-link email sent.",
        content: jsonContent(genericSuccessSchema, {
          success: true,
        }),
      },
      "400": responseRef("BadRequest"),
      "404": responseRef("NotFound"),
      "429": {
        description: "Per-email rate limit reached.",
        content: jsonContent(schemaRef("ErrorResponse"), {
          error: "rate_limited",
          retry_after: 60,
        }),
      },
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/send-password-reset"] = {
  post: {
    tags: ["Public Auth"],
    summary: "Send password reset email",
    description:
      "Generates a Supabase recovery link and sends a localized email via Resend. The handler intentionally returns `200 { success: true }` even when the user is missing or an internal error occurs, to avoid account enumeration.\n\nSource: `supabase/functions/send-password-reset/index.ts`.",
    operationId: "sendPasswordReset",
    requestBody: jsonRequestBody(schemaRef("PasswordResetRequest"), {
      email: "student@example.com",
    }),
    responses: {
      "200": {
        description: "Always returns success-shaped response.",
        content: jsonContent(genericSuccessSchema, {
          success: true,
        }),
      },
      "400": responseRef("BadRequest"),
    },
  },
};

spec.paths["/send-upsell-day5"] = {
  post: {
    tags: ["User Features"],
    summary: "Trigger day-5 upsell email for the authenticated user",
    description:
      "Authenticated user route that decides whether to email the current student about AI Hub or Freelancer upsell after day 5.\n\nSource: `supabase/functions/send-upsell-day5/index.ts`.",
    operationId: "sendUpsellDay5",
    security: [{ userBearer: [] }],
    responses: {
      "200": {
        description: "Email sent or skipped with reason.",
        content: jsonContent(schemaRef("LooseObject"), {
          success: true,
          sent: true,
          target: "ai_hub",
        }),
      },
      "401": responseRef("Unauthorized"),
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/paddle-webhook"] = {
  post: {
    tags: ["Webhooks"],
    summary: "Receive Paddle billing and customer webhooks",
    description:
      "Processes Paddle events, resolves customer email, logs billing actions, reconciles entitlements and triggers post-purchase account/email flows.\n\nAuthentication is accepted either through `Authorization: Bearer <PADDLE_API_KEY>` or `paddle-signature` verified against `PADDLE_WEBHOOK_SECRET`.\n\nSource: `supabase/functions/paddle-webhook/index.ts`.",
    operationId: "paddleWebhook",
    security: [{ paddleBearer: [] }, { paddleSignature: [] }],
    requestBody: {
      required: true,
      content: jsonContent(
        {
          type: "object",
          description:
            "Raw Paddle webhook payload. Event shape varies by `event_type` and is passed through mostly intact.",
          additionalProperties: true,
        },
        {
          event_type: "transaction.completed",
          event_id: "evt_123",
          data: {
            customer_id: "ctm_123",
            items: [{ price: { product_id: "prod_123" } }],
          },
        },
      ),
    },
    responses: {
      "200": {
        description: "Webhook accepted, ignored, deduplicated or processed successfully.",
        content: jsonContent(schemaRef("LooseObject"), {
          success: true,
          event: "PURCHASE_COMPLETE",
          customer_id: "ctm_123",
        }),
      },
      "400": responseRef("BadRequest"),
      "401": responseRef("Unauthorized"),
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/primer-webhook"] = {
  post: {
    tags: ["Webhooks"],
    summary: "Receive Hotmart / Primer / FunnelFox purchase webhooks",
    description:
      "Receives purchase events, logs billing actions, reconciles entitlements, and orchestrates welcome or magic-link delivery.\n\nAuthentication is accepted either through `x-hotmart-hottok` or `ff-webhook-signature`.\n\nSource: `supabase/functions/primer-webhook/index.ts`.",
    operationId: "primerWebhook",
    security: [{ hotmartHottok: [] }, { funnelFoxSignature: [] }],
    requestBody: {
      required: true,
      content: jsonContent(
        {
          type: "object",
          description:
            "Raw Hotmart/FunnelFox payload. Event shape varies by provider.",
          additionalProperties: true,
        },
        {
          event_type: "PURCHASE_APPROVED",
          data: {
            buyer: {
              email: "student@example.com",
              name: "Maria Silva",
            },
            product: {
              id: "prod_123",
            },
          },
        },
      ),
    },
    responses: {
      "200": {
        description: "Webhook accepted or intentionally ignored.",
        content: jsonContent(schemaRef("LooseObject"), {
          success: true,
          magic_link: true,
        }),
      },
      "401": responseRef("Unauthorized"),
      "405": responseRef("MethodNotAllowed"),
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/resend-pending-emails"] = {
  post: {
    tags: ["Email / Messaging"],
    summary: "Resend onboarding emails to recent USER_NOT_FOUND billing records",
    description:
      "Internal batch route protected by a shared secret in the request body. Rebuilds welcome emails for recent `USER_NOT_FOUND` events.\n\nSource: `supabase/functions/resend-pending-emails/index.ts`.",
    operationId: "resendPendingEmails",
    "x-internal": true,
    requestBody: jsonRequestBody(schemaRef("BulkEmailRequest"), {
      secret: "BULK_EMAIL_SECRET",
      targetEmails: ["student@example.com"],
    }),
    responses: {
      "200": {
        description: "Batch resend summary.",
        content: jsonContent(schemaRef("LooseObject"), {
          totalEmails: 1,
          emailsSent: 1,
          emailsFailed: 0,
          results: [{ email: "student@example.com", success: true, language: "pt" }],
        }),
      },
      "401": responseRef("Unauthorized"),
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/retry-failed-webhooks"] = {
  post: {
    tags: ["Operations"],
    summary: "Retry failed webhook deliveries",
    description:
      "Cron/internal route that replays failed webhook payloads against the original target edge function. Auth is accepted either as `Authorization: Bearer <CRON_SECRET|service_role>` or as body `{ secret }`.\n\nSource: `supabase/functions/retry-failed-webhooks/index.ts`.",
    operationId: "retryFailedWebhooks",
    "x-internal": true,
    security: [{ cronBearer: [] }],
    requestBody: jsonRequestBody(schemaRef("RetryFailedWebhooksRequest"), {
      secret: "CRON_SECRET",
    }),
    responses: {
      "200": {
        description: "Retry cycle summary.",
        content: jsonContent(schemaRef("LooseObject"), {
          success: true,
          processed: 3,
          succeeded: 2,
          retryScheduled: 1,
          exhausted: 0,
          results: [],
        }),
      },
      "401": responseRef("Unauthorized"),
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/send-bulk-emails"] = {
  post: {
    tags: ["Email / Messaging"],
    summary: "Send a bulk welcome-style email blast to users",
    description:
      "Internal route protected by a body secret. Iterates over users (optionally filtered by `targetEmails`) and sends a transactional HTML email through Resend.\n\nSource: `supabase/functions/send-bulk-emails/index.ts`.",
    operationId: "sendBulkEmails",
    "x-internal": true,
    requestBody: jsonRequestBody(schemaRef("BulkEmailRequest"), {
      secret: "BULK_EMAIL_SECRET",
      targetEmails: ["student@example.com"],
    }),
    responses: {
      "200": {
        description: "Bulk send summary.",
        content: jsonContent(schemaRef("LooseObject"), {
          totalUsers: 1,
          emailsSent: 1,
          emailsFailed: 0,
          results: [{ email: "student@example.com", success: true }],
        }),
      },
      "401": responseRef("Unauthorized"),
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/send-incident-notification"] = {
  post: {
    tags: ["Email / Messaging"],
    summary: "Send a one-off incident resolution notification to premium users",
    description:
      "Operational route used to notify a fixed window of premium users about a resolved incident.\n\nWarning: current implementation does not enforce auth inside the function and should be treated as internal-only.\n\nSource: `supabase/functions/send-incident-notification/index.ts`.",
    operationId: "sendIncidentNotification",
    "x-internal": true,
    responses: {
      "200": {
        description: "Notification batch summary.",
        content: jsonContent(schemaRef("LooseObject"), {
          success: true,
          sent: 10,
          total_eligible: 12,
          results: [],
        }),
      },
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/send-pending-thanks"] = {
  post: {
    tags: ["Email / Messaging"],
    summary: "Process queued pending thank-you / welcome emails",
    description:
      "Cron/internal batch route that groups `pending_thank_you_emails` by email, creates/reconciles accounts when possible, and dispatches welcome or magic-link emails.\n\nWarning: current implementation does not enforce auth inside the function and should be treated as internal-only.\n\nSource: `supabase/functions/send-pending-thanks/index.ts`.",
    operationId: "sendPendingThanks",
    "x-internal": true,
    responses: {
      "200": {
        description: "Batch processing summary.",
        content: jsonContent(schemaRef("LooseObject"), {
          processed: 2,
          results: [
            { email: "student@example.com", products: 1, status: "sent_magic_link" },
          ],
        }),
      },
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/send-pending-welcome-batch"] = {
  post: {
    tags: ["Email / Messaging"],
    summary: "Admin-triggered batch for pending welcome emails",
    description:
      "Admin-only route that scans pending billing events, creates/reconciles accounts and sends welcome or magic-link emails in controlled batches.\n\nSource: `supabase/functions/send-pending-welcome-batch/index.ts`.",
    operationId: "sendPendingWelcomeBatch",
    security: [{ adminBearer: [] }],
    responses: {
      "200": {
        description: "Batch summary.",
        content: jsonContent(schemaRef("LooseObject"), {
          sent: 3,
          failed: 0,
          remaining: 5,
          results: [],
        }),
      },
      "401": responseRef("Unauthorized"),
      "403": responseRef("Forbidden"),
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/send-signup-invite"] = {
  post: {
    tags: ["Admin"],
    summary: "Admin-triggered signup invite emails",
    description:
      "Admin-only route that sends signup invitation emails to a list of addresses and tracks opens through `track-email-open`.\n\nSource: `supabase/functions/send-signup-invite/index.ts`.",
    operationId: "sendSignupInvite",
    security: [{ adminBearer: [] }],
    requestBody: jsonRequestBody(schemaRef("SendSignupInviteRequest"), {
      emails: ["student@example.com", "student2@example.com"],
      language: "es",
    }),
    responses: {
      "200": {
        description: "Invite batch summary.",
        content: jsonContent(schemaRef("LooseObject"), {
          sent: 2,
          skipped: 0,
          errors: [],
          total: 2,
        }),
      },
      "400": responseRef("BadRequest"),
      "401": responseRef("Unauthorized"),
      "403": responseRef("Forbidden"),
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/send-welcome-email"] = {
  post: {
    tags: ["Email / Messaging"],
    summary: "Send welcome or magic-link email",
    description:
      "Transactional email route used by purchase/signup workflows. Supports legacy CTA email, new-account magic-link email, and existing-account magic-link email.\n\nWarning: the current handler does not enforce auth inside the function and should be treated as internal service-to-service only.\n\nSource: `supabase/functions/send-welcome-email/index.ts`.",
    operationId: "sendWelcomeEmail",
    "x-internal": true,
    requestBody: jsonRequestBody(schemaRef("SendWelcomeEmailRequest"), {
      email: "student@example.com",
      userName: "Maria",
      language: "pt",
      mode: "magic_link",
      access_token: "1fb05610-3fef-49d8-b4ec-e1d62aaf97ff",
      generated_password: "Abcd1234!xYz",
    }),
    responses: {
      "200": {
        description: "Email sent or deduplicated.",
        content: jsonContent(schemaRef("LooseObject"), {
          success: true,
          skipped: false,
        }),
      },
      "400": responseRef("BadRequest"),
      "500": responseRef("InternalError"),
    },
  },
};

spec.paths["/track-email-open"] = {
  get: {
    tags: ["Email / Messaging"],
    summary: "Track email open via 1x1 pixel",
    description:
      "Returns a transparent GIF and updates `email_logs.opened_at` when `id` is present.\n\nSource: `supabase/functions/track-email-open/index.ts`.",
    operationId: "trackEmailOpen",
    parameters: [
      {
        name: "id",
        in: "query",
        required: false,
        schema: {
          type: "string",
          format: "uuid",
        },
        description:
          "Email log identifier. If omitted or invalid, the route still returns the pixel.",
      },
    ],
    responses: {
      "200": {
        description: "Transparent 1x1 GIF pixel.",
        content: {
          "image/gif": {
            schema: {
              type: "string",
              format: "binary",
            },
          },
        },
      },
    },
  },
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(spec, null, 2) + "\n", "utf8");
fs.writeFileSync(
  outputPathPt,
  JSON.stringify(localizeStrings(spec, ptTranslations), null, 2) + "\n",
  "utf8",
);

console.log(`OpenAPI document written to ${outputPath}`);
console.log(`OpenAPI document written to ${outputPathPt}`);
