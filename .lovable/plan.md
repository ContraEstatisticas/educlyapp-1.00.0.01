

## Plano: Redesign dos emails — tema claro e limpo

Baseado no print de referencia (fundo branco, labels em laranja, texto escuro, layout limpo e espaçado).

### Design novo

- **Fundo**: branco (`#ffffff`) em vez do dark `#07080f`
- **Card**: fundo branco com borda cinza clara (`#e5e7eb`), sem gradientes
- **Titulos/textos**: preto/cinza escuro (`#111827`, `#374151`)
- **Labels** (Usuário, Senha, etc): laranja (`#f97316`) como no print
- **Botão CTA**: fundo escuro (`#1f2937`) com texto branco, bordas arredondadas — como o "Acessar" do print
- **Link copiavel**: abaixo do botão, texto discreto apontando para `https://educly.app/auth`
- **Logo**: manter `educly.` com ponto laranja
- **Separadores**: linha cinza clara (`#e5e7eb`) em vez de `rgba(255,255,255,0.07)`
- **Footer**: cinza claro, links em roxo (`#7c3aed`)

### Estrutura do email (welcome)

```text
┌─────────────────────────────────┐
│  🎓 educly.                    │
│                                 │
│  Sua conta está pronta.         │
│  (subtitulo cinza)              │
├─────────────────────────────────┤
│  Seus dados de acesso.          │
│                                 │
│  Usuário:          (laranja)    │
│  email@exemplo.com              │
│                                 │
│  Senha:            (laranja)    │
│  483927561x                     │
│                                 │
│  Acesse através do botão abaixo │
│                                 │
│  ┌─────────────────────┐        │
│  │     Acessar →       │        │
│  └─────────────────────┘        │
│                                 │
│  Ou acesse: educly.app/auth     │
├─────────────────────────────────┤
│  © 2025 Educly · Ajuda · Priv.  │
└─────────────────────────────────┘
```

### Arquivos modificados

| Arquivo | Mudanca |
|---------|---------|
| `supabase/functions/send-welcome-email/index.ts` | Template HTML completo → tema claro, labels laranja, botão escuro |
| `supabase/functions/resend-magic-link/index.ts` | Mesmo redesign tema claro (sem bloco de senha) |

### Traducoes

Adicionar chave `accessBelow` nos 7 idiomas:
- pt: "Acesse através do botão abaixo"
- en: "Access through the button below"
- es/fr/de/it/ru: equivalentes

Atualizar `copyLink` para apontar a `educly.app/auth`. Manter botão CTA com magic link inalterado.

Nenhuma mudanca de logica — apenas o HTML/CSS dos templates.

