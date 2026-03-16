

## Plano: Incluir senha gerada no email do "Criar Conta Manual"

### Problema
O `ManualAccountCreator` chama `resend-magic-link` para enviar o email, mas essa função **não inclui a senha gerada**. A função `send-welcome-email` é a que envia o email completo com credenciais (email + senha), mas não está sendo usada.

### Solução
Alterar o `ManualAccountCreator` para:
- **Conta nova** (`account_created = true`): chamar `send-welcome-email` com `generated_password`, `access_token`, `mode: 'magic_link'` — que envia o email bonito com credenciais completas
- **Conta existente** (`already_existed = true`): continuar chamando `resend-magic-link` (que só envia o link de acesso, sem senha)

### Alteração: `src/components/admin/ManualAccountCreator.tsx`

Substituir o Step 2 (linhas 48-54) para usar lógica condicional:

```
// Step 2: Send email
if (createData.account_created && createData.generated_password) {
  // New account → send-welcome-email (includes password)
  await fetch(`${base}/functions/v1/send-welcome-email`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email: email.trim(),
      userName: name.trim() || "Aluno",
      language,
      mode: "magic_link",
      access_token: createData.access_token,
      generated_password: createData.generated_password,
    }),
  });
} else {
  // Existing account → resend-magic-link (just the link)
  await fetch(`${base}/functions/v1/resend-magic-link`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email: email.trim() }),
  });
}
```

| Arquivo | Ação |
|---|---|
| `src/components/admin/ManualAccountCreator.tsx` | Alterar Step 2 para usar `send-welcome-email` em contas novas |

