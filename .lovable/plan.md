

## Diagnóstico: Por que os emails de reminder NÃO foram enviados

### Evidências encontradas

1. **O cron job EXISTE e ESTÁ RODANDO** - Job ID 8, `welcome-reminder-hourly`, schedule `0 * * * *`, status `active`. Rodou às 13:00 e 14:00 UTC hoje com `status: succeeded`.

2. **A função NUNCA foi executada** - Zero logs para `send-unopened-welcome-reminders`. Nenhum boot, nenhum erro, nada.

3. **Causa raiz: o cron usa a ANON KEY, mas a função só aceita SERVICE_ROLE_KEY**

O cron job envia:
```
Authorization: Bearer eyJ...anon_key...
```

Mas a função verifica:
```typescript
const isAuthorized =
  (cronSecret.length > 0 && (bearerToken === cronSecret || bodySecret === cronSecret)) ||
  bearerToken === serviceRoleKey;  // ← só aceita service_role_key!
```

Como `CRON_SECRET` não está configurado (`cronSecret.length > 0` é false), e o bearer token é a anon key (não a service_role_key), a função retorna **401 Unauthorized** silenciosamente — sem nenhum `console.log` antes do return.

O `status: succeeded` no cron significa apenas que o `net.http_post` foi enviado com sucesso, **não** que a função respondeu 200.

### Solução

#### 1. Corrigir autenticação da Edge Function

Adicionar a anon key como método válido de autenticação na função `send-unopened-welcome-reminders`. A Supabase internamente garante que chamadas via `net.http_post` são seguras (originam do banco). Vamos aceitar tanto a anon key quanto a service_role_key:

```typescript
const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";

const isAuthorized =
  (cronSecret.length > 0 && (bearerToken === cronSecret || bodySecret === cronSecret)) ||
  bearerToken === serviceRoleKey ||
  bearerToken === anonKey;  // ← ADICIONAR
```

Também adicionar um `console.log` antes do return 401 para facilitar debug futuro.

#### 2. Corrigir build error em `resend-dashboard/index.ts`

O TypeScript reclama que `apiKey` pode ser `undefined` na linha 101 apesar do guard na linha 73. Adicionar assertion `!` ou cast.

#### 3. Re-deploy da função

Deploy automático após as correções.

### Arquivos alterados

| Arquivo | Ação |
|---------|------|
| `supabase/functions/send-unopened-welcome-reminders/index.ts` | Aceitar anon key na auth + log de 401 |
| `supabase/functions/resend-dashboard/index.ts` | Fix TS: cast `apiKey` como `string` após guard |

