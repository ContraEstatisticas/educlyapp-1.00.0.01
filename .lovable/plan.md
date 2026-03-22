

## Plano: Corrigir Links de Acesso Permanente (Magic Login)

### Diagnóstico

Os tokens permanentes existem no banco e estão corretos. O problema é que **certos clientes de email** (Hotmail, Outlook, Gmail em alguns casos) estão interpretando o HTML do botão CTA incorretamente, anexando o atributo `style` do `<a>` à URL do `href`.

**Prova nos logs:**
```
token recebido: a5108a5e-96aa-4c0e-9a30-2f9f6cb1398f" style="display:block;text-align:center;background:linear-gradient(135deg,
token no banco:  a5108a5e-96aa-4c0e-9a30-2f9f6cb1398f  ← correto
```

### Correções (2 camadas de proteção)

**1. Edge Function `magic-login` — sanitizar token (defesa imediata)**
- Extrair apenas o UUID do valor recebido via regex (`/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i`)
- Se não encontrar UUID válido, retornar erro
- Isso corrige TODOS os links já enviados que estão quebrados

**2. Templates de email — tornar href mais robusto (prevenção futura)**
- Em `send-welcome-email` e `resend-magic-link`: envolver a URL com espaços ou usar encoding HTML para as aspas
- Usar técnica comprovada para email: colocar o `<a>` com `href` em uma linha separada do `style`, sem inline style no mesmo elemento, ou usar `<!--[if mso]>` wrappers
- Alternativa mais simples e eficaz: usar `style` em um `<td>` pai ao invés de no próprio `<a>`, deixando o `<a>` apenas com `href` e `color/text-decoration`

### Resumo técnico

| Arquivo | Mudança |
|---------|---------|
| `supabase/functions/magic-login/index.ts` | Regex para extrair UUID limpo do token |
| `supabase/functions/send-welcome-email/index.ts` | Separar estilo do botão CTA do `<a href>` |
| `supabase/functions/resend-magic-link/index.ts` | Mesma correção de template do CTA |

### Impacto
- Links já enviados passarão a funcionar (fix no magic-login)
- Novos emails não terão mais o problema (fix nos templates)

