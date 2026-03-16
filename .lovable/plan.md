

## Problema

A edge function `send-password-reset/index.ts` ainda usa o template antigo (fundo claro `#f6f9fc`, botão laranja, design light). Ela não foi atualizada junto com `send-welcome-email` e `resend-magic-link`.

## Plano

Atualizar `send-password-reset/index.ts` com:

1. **Novo template dark theme** — mesmo design system dos outros emails (fundo `#07080f`, card `#0f1120`, botão gradiente azul/indigo, logo Educly com ícone 🎓)
2. **Remover aviso de "expira em 24 horas"** — substituir por texto neutro tipo "Use o botão abaixo para redefinir sua senha"
3. **Atualizar todas as 7 traduções** — remover `warning` com texto de expiração

### Arquivo modificado

| Arquivo | Ação |
|---|---|
| `supabase/functions/send-password-reset/index.ts` | Substituir `getEmailTemplate` pelo dark theme + atualizar traduções |

