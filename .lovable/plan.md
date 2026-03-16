
Objetivo: eliminar definitivamente os 404 no fluxo de limpeza de cache em `https://educly.app/reset-cache` para todos os perfis (Chrome normal, PWA, usuários com SW antigo e links alternativos como `/cache`) em um único deploy.

1) Diagnóstico confirmado no código atual
- A rota React `/reset-cache` existe (`src/App.tsx`).
- A rota `/cache` não existe (gera 404 direto).
- O SW atual intercepta navegação SPA via `navigateFallback` + `navigateFallbackAllowlist` amplo (`vite.config.ts`), então coortes com SW antigo podem continuar recebendo bundle antigo e cair em 404 mesmo após deploy.
- Hoje não existe endpoint estático “fora do React Router” para reset emergencial em `public/`.

2) Ação única (deploy único, multicamada)
- Criar utilitário estático de reset:
  - `public/reset-cache.html` (página standalone com JS inline que:
    1) preserva chaves de tutorial,
    2) faz `unregister` de todos os SW,
    3) limpa `caches`, `localStorage`, `sessionStorage`,
    4) restaura chaves preservadas,
    5) redireciona com `location.replace('/auth?cache_reset=1')`).
- Criar alias estático:
  - `public/cache.html` com mesmo comportamento (ou redirect imediato para `/reset-cache.html`).
- Blindar SW para nunca interceptar essas rotas:
  - em `vite.config.ts` adicionar `navigateFallbackDenylist` cobrindo:
    - `/reset-cache`
    - `/reset-cache/`
    - `/reset-cache.html`
    - `/cache`
    - `/cache/`
    - `/cache.html`
- Blindar SPA para variações/typos:
  - em `src/App.tsx` adicionar aliases explícitos:
    - `/cache` -> `<ResetCache />`
    - `/reset-cache.html` -> `<ResetCache />` (fallback se cair no router)
- Auto-recuperação no 404:
  - em `src/pages/NotFound.tsx`, se `pathname` contiver padrões de cache/reset (ex.: `cache`, `reset-cache`, `resetcache`), fazer `window.location.replace('/reset-cache.html?from=404')` antes de renderizar 404.

3) Detalhes técnicos (importante)
- Por que isso resolve “a fundo”:
  - `reset-cache.html` não depende do React Router nem do bundle da SPA.
  - `navigateFallbackDenylist` impede que SW atual/futuro “engula” a rota de reset.
  - alias `/cache` elimina erro humano de URL.
  - guard no 404 cobre links malformados e variações.
- Estratégia de compatibilidade:
  - mantém rota React atual (`/reset-cache`) para fluxo interno.
  - adiciona canal estático resiliente para suporte/CRM.
- URL canônica para comunicação externa após deploy:
  - `https://educly.app/reset-cache.html` (mais robusta contra variações de roteamento SPA).

4) Validação obrigatória pós-deploy (mesma ação)
- Testar matrix:
  - Chrome logado/deslogado
  - Chrome com PWA instalada
  - aba normal e anônima
  - URLs: `/reset-cache`, `/reset-cache.html`, `/cache`, `/cache.html`
- Critério de sucesso:
  - nenhuma dessas URLs deve terminar em 404;
  - todas devem executar limpeza e cair em `/auth?cache_reset=1`.
- Verificação técnica:
  - confirmar em DevTools Application que SW antigo foi removido após execução;
  - confirmar cache storage vazio (exceto o que for recriado depois do reload).

5) Entregável final da ação
- Um único deploy com essas 5 alterações (HTML estático + aliases + denylist SW + rescue no 404 + validação matrix), removendo dependência de “sorte” de versão de SW e padronizando o comportamento para todos os usuários.
