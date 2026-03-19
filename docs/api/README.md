# Educly API Docs

As APIs deste projeto ficam, principalmente, nas Edge Functions do Supabase em `supabase/functions/`.

## Arquivos

- `scripts/generate-api-docs.cjs`: gera a especificação OpenAPI.
- `public/api-docs/openapi.json`: spec gerada em inglês.
- `public/api-docs/openapi.pt-BR.json`: spec gerada em português.
- `public/api-docs/index.html`: Swagger UI estática.

## Como regenerar

```bash
npm run docs:api
```

## Como visualizar

- Em desenvolvimento/build local: abra `public/api-docs/index.html` via servidor estático.
- Depois do build do Vite: acesse `/api-docs/index.html`.
- Na UI, use o seletor de idioma para alternar entre `English` e `Português`.

## Observação importante

Algumas funções estão documentadas como `internal` porque, embora façam parte da superfície de API, elas foram desenhadas para uso service-to-service, webhook ou cron. A documentação tenta refletir o código atual com honestidade, inclusive quando a função não aplica autenticação forte dentro do próprio handler.
