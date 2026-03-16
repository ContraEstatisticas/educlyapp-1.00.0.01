

## Diagnóstico: Por que `/reset-cache` retorna 404 para alguns usuários

### Causa raiz encontrada

No `vite.config.ts`, a configuração do Workbox (Service Worker da PWA) **não tem `navigateFallback`**:

```text
workbox config atual:
  ✅ skipWaiting: true
  ✅ clientsClaim: true
  ✅ globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"]
  ❌ navigateFallback: AUSENTE
  ❌ navigateFallbackAllowlist: AUSENTE
```

**O que acontece sem `navigateFallback`:**

1. Usuário com PWA instalada (modo standalone) acessa `/reset-cache`
2. O Service Worker intercepta a requisição de navegação
3. Como `/reset-cache` não é um arquivo estático no precache manifest, o SW deixa ir para a rede
4. Se o SW antigo (de um build anterior que não tinha a rota `/reset-cache`) está ativo, ou se há problema de rede/latência, a resposta pode falhar
5. Sem fallback configurado, o usuário vê 404

**Por que funciona para a maioria:**
- Quem acessa pelo navegador normal (não PWA) recebe o SPA fallback do hosting da Lovable (que serve `index.html` para todas as rotas)
- Quem tem SW atualizado e boa conexão também funciona porque o network request retorna `index.html` do servidor

**Quem vê 404:**
- Usuários em modo PWA standalone com SW antigo ou conexão instável
- O irônico: a página feita para limpar cache é bloqueada pelo próprio cache

### Correção

**Arquivo: `vite.config.ts`** — adicionar ao bloco `workbox`:

```
navigateFallback: '/index.html'
navigateFallbackAllowlist: [/^\/(?!api|supabase)/]
```

Isso instrui o Service Worker a servir `index.html` para qualquer navegação que não seja API, garantindo que todas as rotas SPA (incluindo `/reset-cache`) funcionem mesmo offline ou com SW desatualizado.

Alteração mínima, 2 linhas, resolve o problema para 100% dos usuários.

