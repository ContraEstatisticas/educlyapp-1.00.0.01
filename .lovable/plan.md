

## Problema

A preview está quebrada (imagem de erro no lugar do site) porque existem **2 erros de build TypeScript** nos edge functions:

```
TS7006: Parameter 'user' implicitly has an 'any' type.
  → supabase/functions/pending-signup/index.ts:41
  → supabase/functions/purchased-signup/index.ts:41
```

A linha problemática em ambos os arquivos é:
```typescript
const foundUser = users.find((user) => normalizeEmail(user.email) === email);
```

O parâmetro `user` precisa de uma anotação de tipo explícita.

## Solução

Adicionar tipo `any` explícito ao parâmetro `user` nas duas funções:

**Arquivo 1:** `supabase/functions/pending-signup/index.ts` (linha 41)
```typescript
const foundUser = users.find((user: any) => normalizeEmail(user.email) === email);
```

**Arquivo 2:** `supabase/functions/purchased-signup/index.ts` (linha 41)
```typescript
const foundUser = users.find((user: any) => normalizeEmail(user.email) === email);
```

Duas mudanças de 1 linha cada. O preview deve voltar a funcionar imediatamente após a correção.

