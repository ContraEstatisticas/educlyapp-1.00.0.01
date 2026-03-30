

## Diagnóstico do erro de build

O erro que impede a publicação está em `supabase/functions/assistentes-chat/index.ts`, linha 1056:

```
TS2345: Argument of type 'SupabaseClient<any, "public", ...>' is not assignable to 
parameter of type 'SupabaseClient<unknown, { PostgrestVersion: string; }, never, ...>'
```

### Causa

Na linha 128, a função `getAiHubLimitInfo` define o tipo do parâmetro `supabase` como `ReturnType<typeof createClient>`. Porém, quando `createClient` é chamado com argumentos reais (linha 986), o TypeScript infere um tipo genérico diferente do `ReturnType<typeof createClient>` (que representa a chamada sem argumentos). Isso causa incompatibilidade de tipos.

### Solução

Alterar a tipagem do parâmetro na linha 128 de `ReturnType<typeof createClient>` para `any`:

| Arquivo | Linha | Alteração |
|---------|-------|-----------|
| `supabase/functions/assistentes-chat/index.ts` | 128 | `supabase: ReturnType<typeof createClient>` → `supabase: any` |

Essa abordagem já é usada em outras partes do projeto (conforme a memória técnica: usar cast para `any` para evitar falhas de compilação com tipos do Supabase).

Nenhum outro arquivo precisa ser alterado. Nenhuma lógica muda — apenas a anotação de tipo.

