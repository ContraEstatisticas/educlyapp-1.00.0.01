

## Diagnóstico: margorieolmedo@gmail.com

**Status no banco: tudo OK.**
- Conta criada em 4 de março, email confirmado
- `is_premium = true`, produto `base` ativo
- Billing event `PURCHASE_COMPLETE` processado com sucesso

**O problema não é técnico — é de UX no fluxo de re-acesso.**

Quando a usuária clica no link do email de compra novamente, ela vai para `/cadastro?email=margorieolmedo@gmail.com`. A página atual:
1. Verifica se a compra existe (sim) → mostra formulário de cadastro
2. Ela preenche e submete → `purchased-signup` retorna `ALREADY_EXISTS`
3. Só **depois do erro** a tela muda para "Você já tem uma conta"

A usuária interpreta isso como "erro" e "conta não criada".

## Solução: Detectar conta existente ANTES de mostrar o formulário

No `useEffect` de `checkStatus` em `SignupFromEmail.tsx`, após verificar que a compra existe, chamar o edge function `purchased-signup` com um check ou tentar fazer login para detectar se a conta já existe. Como não temos uma RPC pública para verificar se um email tem conta (por segurança), a melhor abordagem é:

**Tentar um "dry check" via `supabase.auth.signInWithPassword` com senha vazia** — não, isso é ruim.

**Melhor abordagem**: Chamar `purchased-signup` proativamente não é possível sem senha. A solução mais limpa é:

1. Na `checkStatus`, após confirmar que a compra existe, tentar `supabase.auth.signInWithOtp({ email, shouldCreateUser: false })` — se retorna erro "User not found", a conta não existe (mostrar formulário). Se não dá erro, a conta já existe.

**Porém, isso dispara um email OTP desnecessário.** Alternativa melhor:

2. Criar uma RPC `check_user_exists_by_email` (security definer) que retorna boolean se o email existe em `auth.users`. Chamar essa RPC no `checkStatus` e, se a conta já existir, ir direto para a tela "Você já tem uma conta" sem mostrar o formulário.

### Mudanças

**1. Nova RPC `check_user_exists_by_email`** (migration SQL):
```sql
CREATE OR REPLACE FUNCTION public.check_user_exists_by_email(p_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE LOWER(email) = LOWER(p_email)
  );
END;
$$;
```

**2. Atualizar `SignupFromEmail.tsx`**:
No `checkStatus`, após confirmar que a compra existe, chamar `check_user_exists_by_email`. Se retornar `true`, setar `hasAccount = true` imediatamente (sem mostrar formulário).

```typescript
// After confirming purchase exists
const { data: userExists } = await supabase.rpc("check_user_exists_by_email", { p_email: emailParam });
if (userExists) {
  setHasAccount(true);
  setCheckingAccount(false);
  return;
}
```

### Resultado
- Usuária que já tem conta verá **imediatamente** a tela "Você já tem uma conta" com botão para login
- Sem formulário de cadastro → sem confusão → sem "erro"

### Ação imediata para essa usuária
Enquanto isso, a resposta para ela é: **ir para `/auth` e fazer login com email e senha**. A conta dela está ativa e funcionando.

