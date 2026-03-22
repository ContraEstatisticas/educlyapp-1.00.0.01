

## Plano: Senhas simples + link copiavel nos emails

### 1. Simplificar gerador de senha (`auto-create-account`)

Alterar `generateSecurePassword()` para gerar apenas numeros + uma letra no final (x ou k):

```
Antes: "kB7$mN3&xP9#fQ2%" (16 chars, simbolos)
Depois: "483927561x" (9 digitos + 1 letra)
```

Logica: 9 digitos aleatorios + escolha aleatoria entre "x" e "k" no final.

### 2. Adicionar link copiavel nos emails

Em ambos os templates (`send-welcome-email` e `resend-magic-link`), adicionar abaixo do botao CTA um texto com o link visivel que o usuario pode copiar e colar:

```
Ou copie e cole este link no navegador:
https://educly.app/magic-login?token=UUID
```

Estilizado discretamente (font-size pequeno, cor cinza, link sublinhado).

Adicionar traducao `copyLink` nos 7 idiomas de ambas as funcoes.

### Arquivos modificados

| Arquivo | Mudanca |
|---------|---------|
| `supabase/functions/auto-create-account/index.ts` | `generateSecurePassword()` → numeros + x/k |
| `supabase/functions/send-welcome-email/index.ts` | Traducao `copyLink` + bloco HTML com link visivel |
| `supabase/functions/resend-magic-link/index.ts` | Traducao `copyLink` + bloco HTML com link visivel |

Tudo o mais permanece igual: senha continua sendo enviada no email de boas-vindas, botao CTA continua funcionando.

