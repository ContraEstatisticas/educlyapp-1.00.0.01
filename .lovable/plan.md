

## Problema

A correção anterior do fallback via Paddle API foi gravada no arquivo **errado**:
- `supabase/functions/paddle-webhook/paddle-webhook/index.ts` (712 linhas, com o fix) -- **NÃO é deployado**
- `supabase/functions/paddle-webhook/index.ts` (657 linhas, sem o fix) -- **É o que roda em produção**

O arquivo deployado ainda tem o `return 409` nas linhas 511-516:
```typescript
if (!email) {
  console.warn(`[paddle-webhook] Customer ${customerId} not found yet. Requesting retry.`);
  return new Response(
    JSON.stringify({ error: "Customer not synced yet, retry later", customer_id: customerId }),
    { status: 409, headers: corsHeaders },
  );
}
```

Confirmado nos logs: `Customer ctm_01kkm6dac58azygmqh87nj4a4k not found yet. Requesting retry.` → 409 retornado.

## Solução

Aplicar o fallback inteligente diretamente no arquivo correto (`supabase/functions/paddle-webhook/index.ts`), substituindo o bloco 409 (linhas 510-517) por:

1. **Fallback Paddle API**: Chamar `GET https://api.paddle.com/customers/{customer_id}` usando `PADDLE_API_KEY`
2. Se obtiver email → upsert em `paddle_customer` + continuar processamento normal
3. Se falhar → salvar evento como `CUSTOMER_PENDING` em `billing_event_logs` + retornar 200

Também adicionar reconciliação de eventos `CUSTOMER_PENDING` no handler de `customer.created` (linhas 401-458), para processar eventos pendentes quando o customer finalmente chegar.

Depois, **deletar** o arquivo duplicado `supabase/functions/paddle-webhook/paddle-webhook/index.ts`.

### Mudanças no `supabase/functions/paddle-webhook/index.ts`:

**1. Adicionar função `fetchCustomerFromPaddleAPI`** (após as funções helper existentes, ~linha 107):
```typescript
async function fetchCustomerFromPaddleAPI(customerId: string): Promise<{email: string; name: string|null; locale: string|null} | null> {
  const apiKey = Deno.env.get("PADDLE_API_KEY")?.trim();
  if (!apiKey) return null;
  try {
    const resp = await fetch(`https://api.paddle.com/customers/${customerId}`, {
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" }
    });
    if (!resp.ok) { await resp.text(); return null; }
    const json = await resp.json();
    const email = json?.data?.email;
    if (!email) return null;
    return { email, name: json.data.name ?? null, locale: json.data.locale ?? null };
  } catch { return null; }
}
```

**2. Substituir o bloco 409** (linhas 510-517) por fallback:
- Tentar `fetchCustomerFromPaddleAPI(customerId)`
- Se obtiver email → upsert `paddle_customer` + usar esse email
- Se não → inserir em `billing_event_logs` com status `CUSTOMER_PENDING` + retornar 200

**3. No handler de `customer.created`** (antes do return na linha 456): buscar e reprocessar eventos `CUSTOMER_PENDING` para o email recém-cadastrado.

**4. Deletar** `supabase/functions/paddle-webhook/paddle-webhook/index.ts`.

