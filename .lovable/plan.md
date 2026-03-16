
Objetivo: tornar o reset de cache acessível de forma consistente (sem 404) para coortes diferentes de usuários (SW novo, SW antigo, PWA, navegador comum), e explicar por que hoje alguns conseguem e outros não.

1) Causa raiz (por que alguns funcionam e outros não)
- Coorte A (funciona): já recebeu bundle/SW mais novo, então `/reset-cache` e fallbacks existem.
- Coorte B (falha/404): ainda está com bundle antigo em cache; nesse bundle, a rota/fallback de reset pode não existir ou cair no 404 sem auto-recuperação.
- O script universal atual em `index.html` é não determinístico:
  - dispara limpeza assíncrona sem aguardar;
  - grava a “versão concluída” cedo demais;
  - em erro, também marca como concluído.
  Resultado: parte dos usuários “acha” que resetou, mas não resetou de fato, e não tenta de novo.
- O `sw.js` publicado ainda contém `reset-cache.html`/`cache.html` no precache, então os caminhos de reset continuam sujeitos a comportamento inconsistente entre versões de SW.

2) Plano de implementação (correção definitiva)
- Camada A — Endpoint de reset redundante e sem dependência de SPA:
  - Transformar `public/cache.html` em página de limpeza completa (sem redirecionar para `/reset-cache.html`).
  - Manter `public/reset-cache.html` também completa.
  - Criar `public/reset-cache/index.html` e `public/cache/index.html` com mesma lógica (cobrir `/reset-cache/` e `/cache/`).
- Camada B — SW blindado para nunca “engolir” reset:
  - Endurecer `globIgnores` para padrões de raiz e pasta.
  - Adicionar `manifestTransforms` removendo explicitamente qualquer entrada de reset/cache do precache final.
  - Manter e ampliar `navigateFallbackDenylist` para todas as variações (`/reset-cache`, `/reset-cache/`, `/reset-cache.html`, `/cache`, `/cache/`, `/cache.html`).
- Camada C — Force reset universal confiável no `index.html`:
  - Subir `FORCE_RESET_V` (ex.: `2`).
  - Reescrever fluxo para async determinístico com `Promise.allSettled` (unregister SW + limpar caches).
  - Só marcar versão após limpeza concluída.
  - Se falhar, não marcar versão (para reexecutar no próximo load).
  - Em vez de `reload` na mesma URL, redirecionar para `/auth?cache_reset=1&frv=2`.
  - Adicionar gatilho por query (`/?force_reset=1`) e por path de reset para executar mesmo se versão já estiver marcada.
- Camada D — Recuperação quando cair em 404:
  - Ajustar `NotFound` para redirecionar para `/cache.html?from=404` com padrões mais robustos (incluindo variações com barra, encoding e typos comuns).

3) Detalhes técnicos (seção técnica)
```text
Cliente abre /reset-cache
  -> Se SW novo: denylist + endpoint estático => limpa cache
  -> Se SW antigo/bundle antigo: pode cair em 404
        -> NotFound detecta padrão de reset
        -> redireciona para /cache.html
              -> página estática limpa SW/caches/storage
              -> vai para /auth?cache_reset=1
Fallback universal adicional:
  /?force_reset=1 (não depende de rota /reset-cache)
```
- URL canônica de suporte após deploy: `https://educly.app/cache.html`
- URL de emergência adicional: `https://educly.app/?force_reset=1`

4) Validação pós-deploy (obrigatória)
- Confirmar em `https://educly.app/sw.js` que NÃO há `reset-cache.html`, `cache.html`, `reset-cache/index.html`, `cache/index.html` no precache.
- Testar: `/reset-cache`, `/reset-cache/`, `/reset-cache.html`, `/cache`, `/cache/`, `/cache.html`, `/?force_reset=1`.
- Matriz: Chrome normal, anônimo, PWA instalada.
- Critério de sucesso: nenhuma URL termina em 404; todas convergem para limpeza + `/auth?cache_reset=1`.

5) Resultado esperado
- O motivo da inconsistência atual é eliminado (coortes antigas + marcação prematura de reset + precache indevido).
- O reset passa a funcionar mesmo em cenários de atualização parcial.
- Suporte ganha um link único e confiável para destravar usuários.
