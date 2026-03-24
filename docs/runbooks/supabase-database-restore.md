# Runbook - Restore do banco Supabase em caso de incidente

Data de criacao: 24/03/2026

Objetivo: documentar o procedimento operacional para restaurar o banco do Educly em caso de incidente, com o menor risco possivel e com uma trilha minima de validacao.

## Quando usar este runbook

Use este procedimento quando houver:

- exclusao acidental de dados
- corrupcao logica relevante
- falha operacional que exija retorno a um backup anterior
- necessidade de validar backup por restore em ambiente separado

## Decisao rapida

Use `Restore to new project` quando:

- for teste de restore
- for investigacao
- for necessario validar dados antes de mexer em producao
- for preciso comparar ambiente atual x ambiente restaurado

Use restore sobre o projeto atual apenas quando:

- houver incidente real em producao
- houver aprovacao operacional para downtime
- o ponto de restauracao tiver sido validado

## Alertas importantes

- O Supabase informa que o projeto fica inacessivel durante a restauracao. Planeje downtime antes de restaurar sobre o projeto atual.
- Os backups diarios do banco nao incluem os objetos armazenados no Storage API; apenas os metadados ficam no banco.
- Se houver custom roles no Postgres, as senhas dessas roles nao sao preservadas nos daily backups e precisam ser redefinidas apos o restore.
- Se o projeto usar subscriptions ou replication slots adicionais, eles devem ser recriados apos a restauracao. O slot do Realtime e tratado automaticamente pelo Supabase.

## Responsaveis minimos

- Responsavel tecnico pela execucao do restore
- Responsavel de produto/operacao para aprovar downtime, quando aplicavel
- Pessoa responsavel por registrar evidencias e horario de inicio/fim

## Checklist pre-restore

1. Confirmar o tipo de incidente e o impacto.
2. Definir se o restore sera:
   - para novo projeto
   - sobre o projeto atual
3. Escolher o backup ou ponto no tempo correto.
4. Registrar antes da acao:
   - data e hora
   - projeto afetado
   - motivo do restore
   - backup escolhido
   - responsavel pela execucao
5. Se for restore em producao:
   - comunicar downtime
   - suspender operacoes manuais de escrita, se possivel
   - pausar automacoes externas que possam reescrever dados durante a janela

## Procedimento A - Restore para novo projeto

1. Abrir o Supabase Dashboard do projeto de origem.
2. Ir em `Database > Backups`.
3. Abrir a aba `Restore to new project`, quando disponivel.
4. Selecionar o backup desejado.
5. Criar um projeto temporario de homologacao/analise a partir desse restore.
6. Aguardar a conclusao do processo.
7. No projeto restaurado, executar validacoes minimas:
   - existencia das tabelas principais
   - contagem basica de registros em `profiles`, `user_progress`, `billing_event_logs`, `email_logs`
   - RLS ativo nas tabelas sensiveis auditadas
   - login com usuario de teste
   - leitura de pelo menos um fluxo critico do app
8. Registrar o resultado.
9. Se o objetivo for apenas teste, encerrar e remover o projeto temporario ao final.

## Procedimento B - Restore sobre o projeto atual

1. Abrir o Supabase Dashboard do projeto afetado.
2. Ir em `Database > Backups` ou `Point in time`, conforme o tipo de backup disponivel.
3. Escolher o backup ou horario de restore adequado.
4. Confirmar novamente que:
   - o ponto escolhido e anterior ao incidente
   - o impacto de perda de dados entre o incidente e o backup foi aceito
5. Registrar o horario de inicio do restore.
6. Confirmar a acao no Dashboard.
7. Aguardar a conclusao do restore.
8. Se houver custom roles, redefinir as senhas necessarias.
9. Se houver subscriptions ou replication slots adicionais, recriar o que for necessario.
10. Executar o checklist pos-restore antes de reabrir o trafego normal.

## Checklist pos-restore

1. Confirmar que o projeto voltou a responder.
2. Confirmar contagem basica e integridade das tabelas criticas:
   - `profiles`
   - `user_progress`
   - `billing_event_logs`
   - `email_logs`
   - `user_sessions`
3. Confirmar que o RLS permanece ativo nas tabelas sensiveis auditadas.
4. Validar um login real de teste.
5. Validar pelo menos:
   - uma leitura de trilha
   - uma leitura de historico/pagamento
   - uma tela administrativa critica, se aplicavel
6. Verificar se servicos externos dependentes voltaram a operar:
   - automacoes
   - webhooks
   - jobs
7. Registrar horario de fim, resultado e pendencias residuais.

## Evidencias minimas a guardar

- screenshot do backup/ponto selecionado
- screenshot de conclusao do restore
- horario de inicio e fim
- nome do responsavel
- checks executados
- resultado final

## Registro padrao para a auditoria

Use este bloco ao concluir um restore de teste ou restore real:

```md
Data do restore:
Tipo:
Projeto de origem:
Projeto de destino:
Backup/ponto utilizado:
Responsavel:
Inicio:
Fim:
Validacoes executadas:
Resultado:
Pendencias:
```

## Fontes oficiais

- Supabase Database Backups: https://supabase.com/docs/guides/platform/backups
