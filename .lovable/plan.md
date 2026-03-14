

## Plano: Reconciliar pendentes + Enviar email de convite para quem não tem conta

### Duas ações necessárias

**1. Reconciliar os ~363 usuários com conta mas sem acesso**

O `reconcile_pending_events()` tem `LIMIT 50`. Precisa rodar múltiplas vezes. Vou adicionar ao painel admin um botão **"Reconciliar Pendentes"** que:
- Chama `reconcile_pending_events()` via RPC em loop
- Para quando retorna `processed = 0` (nenhum restante)
- Mostra progresso: quantos processados por rodada e total acumulado
- Delay de 2s entre cada chamada para não sobrecarregar

**2. Enviar email de convite para os ~958 emails sem conta**

Criar uma Edge Function **`send-signup-invite`** que:
- Recebe lista de emails (batch de 50) via POST autenticado como admin
- Para cada email, envia um email convidando a criar conta no app
- Usa Resend (já configurado) com template multilíngue (espanhol como padrão, já que o público é hispano)
- Registra em `email_logs` com `email_type = 'signup_invite'` para dedup
- Pula emails que já receberam o convite

O email terá:
- Assunto: "🎓 Tu acceso a Educly te espera"
- Corpo: informando que o acesso está liberado, basta criar conta
- CTA: link para `https://educly.app/cadastro?email={email}`

**3. UI no painel admin**

Adicionar na aba "📦 Bulk Import" do `BulkGrantAccess.tsx`:
- Botão **"Reconciliar Pendentes"** — processa os que têm conta
- Botão **"Enviar Convites"** — dispara emails para quem não tem conta, consultando `billing_event_logs` com `status = 'pending'` e sem `auth.users`

### Arquivos

| Arquivo | Ação |
|---|---|
| `supabase/functions/send-signup-invite/index.ts` | Criar — Edge Function de convite |
| `src/components/admin/BulkGrantAccess.tsx` | Adicionar botões de reconciliar e enviar convites |
| `supabase/config.toml` | Registrar nova função |

