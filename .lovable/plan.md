

## Plano: Corrigir Race Condition no Login via Magic Link

### Diagnóstico

O problema é uma **race condition** no `Auth.tsx`. Quando o magic link redireciona o usuario para `/auth#access_token=...`, o Supabase SDK precisa processar o hash fragment assincronamente para estabelecer a sessao. Porém, **nao existe um loading state** enquanto isso acontece - a pagina renderiza o formulario de login imediatamente.

O que acontece na primeira tentativa:
1. `/magic-login` gera action_link com sucesso (confirmado nos logs)
2. Redireciona para Supabase verify → Supabase redireciona para `/auth#access_token=...`
3. Auth.tsx carrega e renderiza o formulario de login **antes** do SDK processar o hash
4. O SDK tenta processar o hash, mas a pagina ja esta no estado "login form"
5. Em alguns casos, o `onAuthStateChange(SIGNED_IN)` dispara e funciona. Em outros, o processamento falha silenciosamente.

Na segunda tentativa funciona porque o usuario clica no link de novo, o magic-login gera um novo OTP, e desta vez o timing e favoravel.

A memoria do projeto menciona que deveria existir um "Processing access loading state with 10-second timeout" - mas esse codigo **nao existe** no Auth.tsx atual. Foi perdido em algum commit.

### Correcao

**`src/pages/Auth.tsx`** - Adicionar deteccao de `access_token` no hash:

1. Novo state: `isProcessingMagicLink`
2. No useEffect de hash detection (linhas 87-116), **antes** de verificar erros, detectar se o hash contem `access_token`
3. Se sim: setar `isProcessingMagicLink = true` e mostrar um loading spinner ("Processando seu acesso...")
4. Timeout de 10 segundos: se o `onAuthStateChange(SIGNED_IN)` nao disparar, tentar `getSession()` manualmente como fallback
5. Se ainda falhar apos timeout: mostrar a UI de "link expirado" com opcao de reenvio
6. Quando `isProcessingMagicLink = true`, renderizar loading state em vez do formulario de login

### Resumo tecnico

| Local | Mudanca |
|-------|---------|
| `Auth.tsx` - state | Adicionar `isProcessingMagicLink` |
| `Auth.tsx` - hash useEffect | Detectar `access_token` no hash, setar loading |
| `Auth.tsx` - onAuthStateChange | Limpar `isProcessingMagicLink` quando SIGNED_IN |
| `Auth.tsx` - render | Mostrar spinner quando processando magic link |
| `Auth.tsx` - timeout | Fallback com `getSession()` apos 10s |

Nenhuma mudanca em edge functions - o problema e 100% no frontend.

