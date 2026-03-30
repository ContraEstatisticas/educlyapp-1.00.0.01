

## Situação atual

O script do Paddle **já está inserido** no `index.html` (linhas 83-88):

```html
<script src="https://cdn.paddle.com/paddle/v2/paddle.js"></script>
<script type="text/javascript">
  Paddle.Initialize({ 
    token: 'live_7d525879d9abfb6c4a7b0055777'
  });
</script>
```

E o `PaddleLanding.tsx` também tem um fallback dinâmico que injeta o mesmo script.

## Por que o Paddle não reconhece

O `index.html` tem um script de **limpeza de cache automática** (linhas 99-200). Quando qualquer visitante novo (incluindo o crawler do Paddle) acessa `/paddle`:

1. O crawler não tem a flag `__educly_force_reset_v` no localStorage
2. A rota `/paddle` **não está** na lista de exceções (linha 124: `['magic-login', 'auth']`)
3. O script redireciona o crawler para `/auth?cache_reset=1` **antes** do Paddle.js carregar
4. Resultado: "Popup form did not render"

## Plano

**1 alteração, 1 arquivo, 1 palavra adicionada.**

No `index.html`, linha 124, adicionar `'paddle'` na lista de rotas que NÃO são redirecionadas:

```js
// ANTES
var authRoutes = ['magic-login', 'auth'];

// DEPOIS
var authRoutes = ['magic-login', 'auth', 'paddle'];
```

Isso faz o script de cache ignorar quem está em `/paddle`, permitindo que o Paddle.js carregue normalmente.

**Nenhum outro arquivo é tocado. Nenhuma outra mudança.**

## Verificação pós-alteração

Após a alteração, verificar que:
- `index.html` linha 124 tem `'paddle'` na lista
- Nenhuma outra linha do `index.html` foi modificada
- `PaddleLanding.tsx` continua idêntico
- `LandingHero.tsx` continua idêntico
- `App.tsx` continua idêntico
- `PricingSection.tsx` continua idêntico
- Nenhum outro arquivo do projeto foi alterado

