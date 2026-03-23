

## Reestruturar HTML dos emails de acesso

### Mudancas de layout (ambos os emails)

**1. Logo real no lugar do emoji**
- Substituir o quadrado com emoji 🎓 por uma tag `<img>` apontando para `https://educly.app/images/corujaLogo.svg`
- Manter o texto "educly." ao lado

**2. Nova ordem das secoes (send-welcome-email)**

```text
┌─────────────────────────────────────┐
│  [LOGO IMG] educly.                 │
│                                     │
│  Sua conta está pronta.             │
│  (subtitle)                         │
├─────────────────────────────────────┤
│  LOGUE DIRETAMENTE AQUI             │
│  ┌─────────────────────────────┐    │
│  │      Acessar →              │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  OU LOGUE USANDO SEUS DADOS        │
│                                     │
│  USUARIO: user@email.com            │
│  SENHA: abc123                      │
│                                     │
│  (nota sobre alterar senha)         │
│                                     │
│  Link: https://educly.app/auth      │
├─────────────────────────────────────┤
│  📩 Precisa de ajuda?               │
│  contact@educly.app                 │
├─────────────────────────────────────┤
│  © 2025 Educly    Ajuda · Privacid. │
└─────────────────────────────────────┘
```

**3. Nova ordem das secoes (resend-magic-link)**
- Mesmo layout, mas sem senha (so email do usuario + link manual)

**4. Novas chaves de traducao (7 idiomas)**
- `directLogin`: "Logue diretamente aqui" / "Sign in directly here" / etc.
- `manualLogin`: "Ou logue usando seus dados" / "Or sign in with your credentials" / etc.

### Arquivos a modificar
- `supabase/functions/send-welcome-email/index.ts`
- `supabase/functions/resend-magic-link/index.ts`

Ambas precisam de redeploy apos a alteracao.

