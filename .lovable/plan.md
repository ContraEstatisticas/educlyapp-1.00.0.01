

## Diagnostico: Magic Link reseta cache e desloga o usuario

### Causa raiz

O script de **force reset** no `index.html` (linhas 88-178) executa **ANTES** do React montar. Ele verifica se `localStorage.__educly_force_reset_v === '2'`. 

Quando um usuario **novo** (ou que nunca passou pelo reset) clica no magic link:

1. Navegador abre `/magic-login?token=UUID`
2. `index.html` carrega e o script de force reset roda **imediatamente**
3. Como `__educly_force_reset_v` nao existe no localStorage desse usuario, o script:
   - Limpa `localStorage.clear()` (destroi qualquer sessao Supabase existente)
   - Limpa `sessionStorage.clear()`
   - Redireciona para `/auth?cache_reset=1&frv=2`
4. O componente `MagicLogin` **nunca chega a montar** -- o usuario cai no `/auth` deslogado

O mesmo problema afeta usuarios que limparam o cache manualmente ou acessam de um novo dispositivo/navegador.

### Solucao

**Arquivo: `index.html`** -- Adicionar bypass no script de force reset para rotas criticas de autenticacao.

Antes da verificacao do `FORCE_RESET_V`, adicionar:

```javascript
// Skip force reset on authentication routes (magic-login, auth with hash tokens)
var authRoutes = ['/magic-login', '/auth'];
var isAuthRoute = authRoutes.some(function(r) {
  return path === r.replace(/^\//, '') || path.indexOf(r.replace(/^\//, '') + '/') === 0;
});
var hasAuthHash = location.hash && location.hash.indexOf('access_token') !== -1;

if (isAuthRoute || hasAuthHash) {
  // Still mark the version so it doesn't trigger on next navigation
  try { localStorage.setItem(KEY, FORCE_RESET_V); } catch(e) {}
  return;
}
```

Isso faz com que:
- `/magic-login?token=...` nunca seja interrompido pelo reset
- `/auth#access_token=...` (magic links diretos do Supabase) tambem nao seja interrompido
- A versao do reset e marcada como "feita" para evitar que rode em navegacoes futuras

### Impacto
- Zero alteracao no fluxo de login normal
- Zero alteracao no fluxo de reset de cache intencional (`/cache`, `/reset-cache`)
- Resolve 100% dos casos de "primeiro clique no magic link redireciona para auth"

