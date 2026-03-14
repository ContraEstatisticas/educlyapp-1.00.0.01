

## Diagnóstico Completo: Mistura entre Base e Premium

### Problemas encontrados

**1. `check_premium_access()` (função SQL)** retorna `true` para QUALQUER produto ativo, incluindo `base`. Ou seja, um usuário base é tratado como "premium".

**2. `process_pending_billing_events()` (função SQL)** marca `is_premium = true` na tabela `user_premium_access` para TODAS as compras, incluindo `base`. Semanticamente errado.

**3. `PremiumGuard` protege TODAS as rotas** (`/dashboard`, `/chat`, `/assistentes`, `/freelancer`, etc.) usando `check_premium_access`. Como essa função retorna `true` para base, o guard funciona "por acidente" para usuários base. Mas o conceito está errado.

**4. Chat.tsx** usa `usePremiumAccess` internamente para mostrar `ChatPremiumGate` (paywall). Usuários base passam essa verificação porque `check_premium_access` retorna `true` para eles.

**5. Rotas `/assistentes` e `/freelancer`** têm `ProductGuard` interno (correto), mas dependem do `PremiumGuard` externo que usa o conceito errado.

### O que está certo
- `ProductGuard` em `/freelancer` (exige `freelancer`)
- `ProductGuard` em `/assistentes` (exige `ai_hub`)
- `useProductAccess` hook (verifica produto específico)

---

## Plano de Correção

### 1. Renomear conceito: PremiumGuard → AuthGuard (qualquer produto pago)

Alterar `check_premium_access()` no banco para `check_any_product_access()` -- ou simplesmente corrigir a lógica para ser explícita:
- Retorna `true` se o usuário tem **qualquer** produto ativo (base, freelancer, ai_hub) OU está na whitelist
- NÃO depende mais de `is_premium` na tabela `user_premium_access`

Na prática, a função SQL continua funcionando igual (qualquer produto = acesso), mas o nome e a semântica ficam corretos.

### 2. Corrigir `process_pending_billing_events()`

- Para compras `base`: **NÃO** setar `is_premium = true`. Apenas inserir em `user_product_access` com `product_type = 'base'`
- Para compras `freelancer`, `ai_hub`, `combo`: setar `is_premium = true`
- Manter o insert em `user_premium_access` mas com `is_premium = false` para base (para ter o registro)

### 3. Corrigir `is_premium` dos usuários base existentes

Migração SQL para corrigir usuários que são base-only mas estão com `is_premium = true`:

```sql
UPDATE user_premium_access upa
SET is_premium = false, plan_updated_at = NOW()
WHERE upa.is_premium = true
  AND NOT EXISTS (
    SELECT 1 FROM user_product_access up
    WHERE up.user_id = upa.user_id
      AND up.is_active = true
      AND up.product_type IN ('freelancer', 'ai_hub')
  )
  AND NOT EXISTS (
    SELECT 1 FROM premium_whitelist pw
    WHERE LOWER(pw.email) = (SELECT LOWER(email) FROM auth.users WHERE id = upa.user_id)
  );
```

### 4. Chat.tsx: Proteger com ProductGuard

O chat EDI deve exigir acesso `freelancer` ou `ai_hub` (não base). Adicionar `ProductGuard` ou verificar `useProductAccess` ao invés de `usePremiumAccess`.

### 5. Frontend: Manter PremiumGuard mas corrigir semântica

O `PremiumGuard` continua usando `check_premium_access` (que agora verifica qualquer produto). Ele é o guard de "tem algum produto pago". O `ProductGuard` é o guard de "tem produto específico".

---

## Arquivos a alterar

| Arquivo/Recurso | Alteração |
|---|---|
| Migração SQL | Recriar `check_premium_access` (mesma lógica, sem depender de `is_premium` para base) |
| Migração SQL | Recriar `process_pending_billing_events` (não setar `is_premium=true` para base) |
| Migração SQL | Corrigir `is_premium` dos usuários base existentes |
| `src/pages/Chat.tsx` | Trocar `usePremiumAccess` por `useProductAccess` para gate correto |
| `src/components/chat/ChatPremiumGate.tsx` | Ajustar para aceitar productType |

---

## SQL para consultar os 4 tiers

Execute no SQL Editor do Supabase para ver a situação atual:

```sql
SELECT
  u.email,
  u.created_at AS conta_criada,
  COALESCE(upa.is_premium, false) AS is_premium_flag,
  (SELECT string_agg(DISTINCT up.product_type, ', ' ORDER BY up.product_type)
   FROM user_product_access up
   WHERE up.user_id = u.id AND up.is_active = true) AS produtos_ativos,
  CASE
    WHEN EXISTS (SELECT 1 FROM user_product_access up WHERE up.user_id = u.id AND up.is_active = true AND up.product_type = 'freelancer')
     AND EXISTS (SELECT 1 FROM user_product_access up WHERE up.user_id = u.id AND up.is_active = true AND up.product_type = 'ai_hub')
    THEN 'COMBO'
    WHEN EXISTS (SELECT 1 FROM user_product_access up WHERE up.user_id = u.id AND up.is_active = true AND up.product_type = 'freelancer')
    THEN 'PREMIUM (Freelancer)'
    WHEN EXISTS (SELECT 1 FROM user_product_access up WHERE up.user_id = u.id AND up.is_active = true AND up.product_type = 'ai_hub')
    THEN 'AI PACK'
    WHEN EXISTS (SELECT 1 FROM user_product_access up WHERE up.user_id = u.id AND up.is_active = true AND up.product_type = 'base')
    THEN 'BASE'
    WHEN EXISTS (SELECT 1 FROM premium_whitelist pw WHERE LOWER(pw.email) = LOWER(u.email))
    THEN 'WHITELIST'
    ELSE 'SEM ACESSO'
  END AS tier,
  CASE
    WHEN COALESCE(upa.is_premium, false) = true
     AND NOT EXISTS (SELECT 1 FROM user_product_access up WHERE up.user_id = u.id AND up.is_active = true AND up.product_type IN ('freelancer', 'ai_hub'))
     AND NOT EXISTS (SELECT 1 FROM premium_whitelist pw WHERE LOWER(pw.email) = LOWER(u.email))
    THEN 'BASE COM is_premium=true (ERRADO)'
    ELSE 'OK'
  END AS inconsistencia
FROM auth.users u
LEFT JOIN user_premium_access upa ON upa.user_id = u.id
WHERE EXISTS (SELECT 1 FROM user_product_access up WHERE up.user_id = u.id AND up.is_active = true)
   OR COALESCE(upa.is_premium, false) = true
   OR EXISTS (SELECT 1 FROM premium_whitelist pw WHERE LOWER(pw.email) = LOWER(u.email))
ORDER BY tier, u.email;
```

Isso retorna cada usuário com: email, flag is_premium atual, produtos ativos, tier calculado (BASE / PREMIUM / AI PACK / COMBO / WHITELIST / SEM ACESSO), e uma coluna de inconsistência que destaca quem está com `is_premium=true` sendo apenas base.

