

## Diagnóstico confirmado em produção (dados reais)

Testei as URLs em produção agora:

| URL | Resultado real |
|---|---|
| `educly.app/reset-cache` | Serve a **página de AUTH** (login), não o reset-cache.html |
| `educly.app/reset-cache.html` | Serve a **página de AUTH** (login), não o reset-cache.html |
| `educly.app/cache` | **404** |
| `educly.app/cache.html` | Serve a **página de AUTH** |

**Por que**: O SW atual tem `reset-cache.html` no precache manifest (`globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"]`). Isso faz o Workbox cachear o `reset-cache.html`, mas o NavigationRoute intercepta navegações e serve `index.html` (mesmo com denylist, usuários com SW antigo não têm denylist). Resultado: todas as rotas caem no React Router → redireciona para auth.

**Sobre o pedido de reset universal**: Usuários com SW antigo estão presos num ciclo — precisam do novo código para resetar, mas o SW antigo impede de receber o novo código.

## Solução: "nuclear option" em 3 camadas

### Camada 1: Script inline no `index.html` (reset universal)

Adicionar um `<script>` inline **antes** do React carregar que:
1. Verifica uma versão `FORCE_RESET_V` no localStorage
2. Se diferente → desregistra todos SWs, limpa Cache Storage, limpa localStorage/sessionStorage, recarrega
3. Funciona porque `skipWaiting: true` + `clientsClaim: true` faz o novo SW servir o novo `index.html` assim que o browser checar atualizações

Isso é a "bomba nuclear" — todo usuário que abrir o app (mesmo com SW antigo) vai receber o novo index.html na próxima checagem de SW (que acontece a cada navegação e a cada 10 min), e o script inline executa o reset antes do React.

**Incrementar o `FORCE_RESET_V` a cada vez que quiser forçar reset universal.**

### Camada 2: Excluir arquivos de reset do SW

Em `vite.config.ts`, adicionar `globIgnores` para que `reset-cache.html` e `cache.html` **nunca** sejam cacheados pelo SW:

```
globIgnores: ['**/reset-cache.html', '**/cache.html']
```

Isso garante que essas páginas sempre venham do servidor, nunca do cache do SW.

### Camada 3: Manter proteções existentes

- `navigateFallbackDenylist` continua protegendo as rotas
- Rotas SPA `/cache`, `/reset-cache`, `/reset-cache.html` continuam como fallback
- Guard no 404 continua redirecionando variantes

## Arquivos alterados

| Arquivo | Alteração |
|---|---|
| `index.html` | Adicionar script inline de force-reset antes do `<script type="module" src="/src/main.tsx">` |
| `vite.config.ts` | Adicionar `globIgnores: ['**/reset-cache.html', '**/cache.html']` no bloco workbox |

## Como usar no futuro

Para forçar reset universal de todos os usuários: abra `index.html`, incremente o número em `FORCE_RESET_V` (ex: de `'1'` para `'2'`), publique. Todos os usuários ativos terão cache resetado na próxima vez que abrirem o app.

