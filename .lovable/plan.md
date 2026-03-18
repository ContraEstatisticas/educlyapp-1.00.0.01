

## Plano: Alterar Trial de 7 para 30 dias

### Contexto

O trial de 7 dias aparece em dois locais no sistema. Nenhum dos webhooks (Paddle, primer) define `expires_at` — eles concedem acesso indefinido. O problema está em:

1. **`ManualAccessGrant.tsx`** — A UI de liberação manual lista "7 dias" como primeira opção de duração. O valor padrão do `useState` já é `"30"`, mas a opção de 7 dias continua disponível e pode ser selecionada por engano.

2. **Função `check_and_expire_access` no banco** — A seção 2 desta função marca eventos de billing `USER_NOT_FOUND` como `expired_no_signup` após 7 dias. Isso contradiz a política já decidida (conforme memória do projeto) de permitir resgate indefinido.

### Alterações

**1. `src/components/admin/ManualAccessGrant.tsx`**
- Manter a opção de "7 dias" na lista (para quando vocês voltarem a usar), mas **não remover**.
- Nenhuma mudança necessária aqui — o default já é `"30"`.

**2. Migração SQL — `check_and_expire_access`**
- Alterar a seção 2 da função para usar `INTERVAL '30 days'` em vez de `INTERVAL '7 days'` na expiração de eventos `USER_NOT_FOUND`.
- A mensagem de erro será atualizada para `'Auto-expired: user did not register within 30 days'`.

### Resumo técnico

| Local | Antes | Depois |
|-------|-------|--------|
| `check_and_expire_access` — expiração de `USER_NOT_FOUND` | 7 days | 30 days |
| `ManualAccessGrant` default | já é 30 | sem mudança |

Uma única migração SQL para recriar a função `check_and_expire_access` com o intervalo atualizado.

