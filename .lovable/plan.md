

## Adicionar informação de suporte nos emails de acesso

### Problema
Os emails de boas-vindas (`send-welcome-email`) e reenvio de acesso (`resend-magic-link`) têm apenas um pequeno link "Ajuda" no rodapé que aponta para `mailto:contact@educly.app`, mas não é visível o suficiente. O usuario não percebe que pode pedir suporte.

### Solução
Adicionar uma seção de suporte visível **acima do rodapé** em ambos os emails, com o texto traduzido nos 7 idiomas, mostrando claramente o email de contato.

### Mudanças

**1. `supabase/functions/send-welcome-email/index.ts`**
- Adicionar nova chave de tradução `supportText` em todos os 7 idiomas (ex: "Precisa de ajuda? Entre em contato: contact@educly.app")
- Inserir bloco HTML de suporte entre o CTA e o footer, com ícone de envelope e o email clicável em roxo

**2. `supabase/functions/resend-magic-link/index.ts`**
- Mesma adição: chave `supportText` nos 7 idiomas + bloco HTML de suporte antes do footer

### Visual do bloco
```text
┌─────────────────────────────────────┐
│  📩 Precisa de ajuda?               │
│  contact@educly.app                 │
└─────────────────────────────────────┘
```

Texto em fundo cinza claro (`#f9fafb`), email em roxo (`#7c3aed`), sublinhado e clicável.

### Deploy
Ambas as Edge Functions precisam ser re-deployed após a alteração.

