# Runbook - Revisao de acesso ao painel do Supabase em producao

Data de criacao: 24/03/2026

Objetivo: revisar quem possui acesso ao painel do Supabase em producao e confirmar o principio do menor privilegio.

## Quando executar

- durante auditorias de seguranca
- antes de fases de escala
- apos mudancas de equipe
- apos encerramento de contrato com terceiros
- pelo menos a cada trimestre

## Regra principal

Somente pessoas que realmente precisam operar o projeto de producao devem manter acesso ao painel do Supabase.

Sempre que possivel:

- preferir acesso com escopo de projeto, nao da organizacao inteira
- preferir o menor papel compativel com a funcao
- remover acessos temporarios apos o uso

Observacoes importantes da documentacao oficial do Supabase:

- papeis com escopo apenas de projeto so estao disponiveis nos planos `Team` e `Enterprise`
- o papel `Read-Only` nao deve ser tratado como acesso inocuo, porque ainda pode visualizar certos recursos sensiveis do projeto, incluindo secrets em alguns contextos do Dashboard

## O que revisar

1. Membros da organizacao no Supabase.
2. Membros com acesso ao projeto de producao.
3. Papel de cada membro:
   - `Owner`
   - `Administrator`
   - `Developer`
   - `Read-Only`, quando disponivel no plano
4. Se o acesso e:
   - organizacional
   - restrito ao projeto de producao
5. Justificativa de negocio para cada acesso.
6. Data da ultima revisao.

## Checklist operacional

1. Abrir as configuracoes de membros da organizacao no Supabase.
2. Listar todos os membros com nome, e-mail e papel.
3. Identificar quais acessos sao de escopo organizacional e quais sao de escopo apenas de projeto.
4. Marcar os membros com acesso ao projeto de producao.
5. Para cada membro, registrar:
   - nome
   - e-mail
   - papel atual
   - escopo do acesso
   - precisa mesmo de acesso a producao? (`sim` ou `nao`)
   - justificativa
6. Remover ou rebaixar:
   - ex-colaboradores
   - terceiros sem uso atual
   - contas duplicadas
   - acessos organizacionais que poderiam ser apenas de projeto
   - `Owner` ou `Administrator` sem necessidade real
   - acessos `Read-Only` dados por conveniencia, sem necessidade operacional clara
7. Confirmar que nao existem contas compartilhadas.
8. Confirmar que os responsaveis criticos mantem acesso suficiente para incidente e restore.
9. Registrar a revisao nesta auditoria.

## Criterios para considerar o item OK

O item pode ser considerado OK quando houver evidencia de que:

- todos os membros com acesso ao painel foram revisados
- cada acesso possui justificativa
- nao existem acessos obsoletos
- o escopo de acesso esta no menor nivel possivel
- a producao nao esta visivel para pessoas sem necessidade operacional real

## Template de registro

```md
Data da revisao:
Projeto:
Responsavel:

| Nome | E-mail | Papel | Escopo | Precisa de acesso? | Justificativa | Acao |
| --- | --- | --- | --- | --- | --- | --- |
|     |        |       |        |                    |               |      |
```

## Fontes oficiais

- Supabase Access Control: https://supabase.com/docs/guides/platform/access-control
- Supabase Shared Responsibility Model: https://supabase.com/docs/guides/deployment/shared-responsibility-model
