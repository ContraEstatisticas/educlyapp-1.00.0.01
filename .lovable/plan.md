

## Plano: Criar conta + magic link manual para compradores antigos

### Problema
Compradores antigos que nunca receberam email de cadastro precisam ser atendidos manualmente. Hoje o admin precisa de vários passos separados.

### Solução
Criar um novo componente **"Criar Conta Manual"** no admin que, ao inserir um email:
1. Chama `auto-create-account` (que já faz tudo: cria conta se não existe, processa billing pendente, gera token permanente)
2. Depois chama `resend-magic-link` para enviar o email com o link de acesso
3. Mostra o resultado (conta criada ou já existente, link enviado)

### Componente: `src/components/admin/ManualAccountCreator.tsx`
- Campo de email + seletor de idioma (es/pt/en/fr) + nome opcional
- Botão "Criar e Enviar Acesso"
- Ao clicar:
  - POST para `auto-create-account` com `{ email, buyer_name, language }`
  - Se sucesso, POST para `resend-magic-link` com `{ email }`
  - Exibe resultado: conta criada/já existente, link enviado, token gerado
- Design consistente com os outros cards do admin (gradiente, ícones)

### Integração: `src/pages/AdminAnalytics.tsx`
- Adicionar o componente na grid do topo, junto com EmailLookup e ResendAccessLink (grid 3 colunas)

### Nenhuma mudança em edge functions
As funções `auto-create-account` e `resend-magic-link` já existem e fazem exatamente o necessário.

| Arquivo | Ação |
|---|---|
| `src/components/admin/ManualAccountCreator.tsx` | Novo componente |
| `src/pages/AdminAnalytics.tsx` | Adicionar na grid do topo |

