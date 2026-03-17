

## Plano: Revogar freelancer + Ferramenta de revogação + Botões admin

### 1. Revogar acesso freelancer do alejoegasm@gmail.com (SQL imediato)

Apenas o freelancer será desativado. Base permanece ativo.

```sql
UPDATE user_product_access SET is_active = false, revoked_at = NOW()
WHERE user_id = (SELECT id FROM auth.users WHERE LOWER(email) = 'alejoegasm@gmail.com')
AND product_type = 'freelancer';

UPDATE user_premium_access SET is_premium = false, plan_updated_at = NOW()
WHERE user_id = (SELECT id FROM auth.users WHERE LOWER(email) = 'alejoegasm@gmail.com');
```

### 2. Novo componente: `RevokeAccess` no admin

**`src/components/admin/RevokeAccess.tsx`**
- Campo de email → botão "Buscar" → chama `admin_lookup_email` RPC
- Mostra produtos ativos do usuário com checkboxes
- Botão "Revogar Selecionados" → chama edge function `admin-revoke-access`

**`supabase/functions/admin-revoke-access/index.ts`**
- Recebe `{ email, products: string[] }` (ex: `["freelancer"]`)
- Valida admin via token + `is_admin()`
- Com service_role: desativa produtos selecionados em `user_product_access`
- Se não restar nenhum produto ativo não-base → `is_premium = false`
- Registra `MANUAL_REVOKE` no `billing_event_logs`

**Integração:** Nova tab "🚫 Revogar" no TabsList do AdminAnalytics (8 tabs total)

### 3. Botões admin na Dashboard

**`src/components/DashboardHeader.tsx`** (ou componente de header existente)
- Verificar se user é admin via `is_admin()` RPC
- Se admin: mostrar 2 botões (Shield → `/admin/analytics`, Mail → `/admin/emails`)
- Só visível para admins, posicionado no header

| Arquivo | Ação |
|---|---|
| SQL (insert tool) | Revogar freelancer do alejoegasm |
| `src/components/admin/RevokeAccess.tsx` | Novo componente |
| `supabase/functions/admin-revoke-access/index.ts` | Nova edge function |
| `src/pages/AdminAnalytics.tsx` | Adicionar tab Revogar |
| Header da Dashboard | Botões admin condicionais |

