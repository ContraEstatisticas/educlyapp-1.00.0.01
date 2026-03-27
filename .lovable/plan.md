

Tem razão — não precisa remover. O `useEffect` no `PaddleLanding.tsx` serve como fallback caso o script do `index.html` não carregue. Não causa conflito porque já tem o guard `if (document.querySelector('script[src*="paddle.com"]')) return;`.

## Plano revisado

Apenas **1 alteração**: inserir os 2 scripts do Paddle no `<head>` do `index.html`, antes do `</head>`. Nada mais muda.

```html
<script src="https://cdn.paddle.com/paddle/v2/paddle.js"></script>
<script type="text/javascript">
  Paddle.Initialize({ 
    token: 'live_7d525879d9abfb6c4a7b0055777'
  });
</script>
```

| Arquivo | Ação |
|---------|------|
| `index.html` | Inserir os 2 scripts antes do `</head>` |

Nenhum outro arquivo alterado.

