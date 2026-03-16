

## Plano: Reenvio de Magic Link no Admin + ThankYou sem cadastro

### 1. Adicionar "Reenviar Acesso" no painel admin

Criar um novo componente `ResendAccessLink` em `src/components/admin/ResendAccessLink.tsx`:
- Campo de email + botão "Reenviar"
- Ao clicar, chama a edge function `resend-magic-link` (já existe e não requer auth)
- Mostra feedback de sucesso/erro via toast
- Design consistente com `ManualAccessGrant` (card com ícone, input + botão)

Adicionar uma nova aba no `AdminAnalytics.tsx` (ou colocar ao lado do EmailLookup no topo) para fácil acesso.

### 2. Transformar ThankYou em tela de confirmação (sem cadastro)

Modificar `src/pages/ThankYou.tsx`:
- Remover todo o formulário de cadastro (nome, email, senha, confirm)
- Remover imports desnecessários (`createPendingAccount`, `createPurchasedAccount`, `Lock`, `Eye`, `EyeOff`, etc.)
- Remover states de formulário e lógica de `handleSignup`/`performSignup`
- No lugar do formulário, exibir uma mensagem: **"Seu acesso foi enviado para o e-mail:"** seguido do email extraído do `?email=` da URL
- Manter o design visual (confetti, robôs, background, benefits)
- Se não houver `?email=` na URL, mostrar mensagem genérica "Verifique seu e-mail"

### Arquivos modificados

| Arquivo | Ação |
|---|---|
| `src/components/admin/ResendAccessLink.tsx` | Novo componente |
| `src/pages/AdminAnalytics.tsx` | Adicionar aba/componente ResendAccessLink |
| `src/pages/ThankYou.tsx` | Remover formulário, mostrar "acesso enviado para {email}" |

