

## Diagnóstico

O usuário `pf.contraestatistica@gmail.com` (id: `0a50c8c3-6a3d-40f6-9acf-302fd1c45678`) **criou a conta com sucesso**, mas o campo `email_confirmed_at` está `null`. O Supabase tem confirmação de email habilitada, então:

1. O signup cria o user, mas **não confirma o email**
2. O código em `SignupFromEmail.tsx` tenta fazer `signInWithPassword` logo após o signup
3. O Supabase rejeita com `email_not_confirmed` (status 400)
4. O usuário ficou preso -- tentou se cadastrar de novo e bateu no rate limit (429)

**Problema de fundo:** O fluxo de signup pós-compra (`/cadastro`) assume que o usuário será auto-logado após signup, mas o Supabase exige confirmação de email primeiro.

## Solução

Criar uma edge function (ou adicionar lógica a uma existente) que, após o signup via `/cadastro`, confirme automaticamente o email do usuário usando o `service_role_key`. Isso faz sentido porque o email já foi verificado pelo provedor de pagamento (Paddle).

### 1. Criar edge function `confirm-signup-email`

Uma edge function simples que recebe o `user_id` e usa o Supabase Admin API para setar `email_confirmed_at`:

```typescript
// supabase/functions/confirm-signup-email/index.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const { user_id } = await req.json();
  
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
  
  await supabaseAdmin.auth.admin.updateUserById(user_id, {
    email_confirm: true
  });
  
  return new Response(JSON.stringify({ confirmed: true }));
});
```

### 2. Atualizar `SignupFromEmail.tsx`

Após o `signUp` retornar sucesso, chamar a edge function para confirmar o email antes de tentar `signInWithPassword`:

```typescript
// Após o signUp com sucesso e antes do signInWithPassword:
await supabase.functions.invoke("confirm-signup-email", {
  body: { user_id: data.user.id }
});
```

### 3. Fix imediato para o usuário atual

Executar SQL para confirmar o email do usuário que está travado:

```sql
-- Via Supabase Dashboard SQL Editor
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE id = '0a50c8c3-6a3d-40f6-9acf-302fd1c45678';
```

### Segurança

A edge function deve validar que o `user_id` corresponde a um usuário que realmente acabou de fazer signup (ex: criado nos últimos 5 minutos) e que tem uma compra associada em `billing_event_logs`, para evitar que qualquer pessoa confirme emails arbitrários.

### Impacto

- Resolve o problema para todos os futuros signups via `/cadastro`
- Não afeta o fluxo de signup normal (sem compra)
- O fix SQL resolve o caso imediato do usuário travado

