

## Plano: Gerar DOCX do Relatório de Incidente

### Resumo

Gerar um documento DOCX profissional explicando o incidente de progresso apagado, deixando claro que o problema afetou apenas usuários que executaram o script `reset_progress.sql` via navegador (cache/force-reset), e não todos os usuários da plataforma.

### Conteúdo do documento

1. **Capa** - Título "Relatório de Incidente - Progresso Apagado Indevidamente", data, projeto Educly
2. **Resumo executivo** - Visão geral do incidente: script de reset sem filtro por usuário causou perda de progresso para quem o executou via navegador
3. **Causa raiz** - O arquivo `reset_progress.sql` continha DELETEs em massa nas tabelas `user_day_progress`, `user_step_progress` e `user_lesson_attempts` sem cláusula `WHERE user_id = ...`, apagando dados de todos os participantes do desafio "Iniciante IA". O script era acionado via páginas de cache/reset no navegador (`/cache.html`, `/reset-cache.html`), afetando apenas quem acessou essas páginas - não foi um evento global
4. **Impacto** - Dias completados, XP acumulado e tentativas de quiz foram removidos. Escopo limitado a usuários que acionaram o reset pelo navegador
5. **Caso reportado** - Usuário `jrmf3314@gmail.com` perdeu dias 1-7 e dia 9, além do XP correspondente (~100 XP)
6. **Ações corretivas** - Queries SQL de restauração executadas (INSERT dos dias + UPDATE do XP de 65 para 165)
7. **Medidas preventivas** - Remoção do `reset_progress.sql` do repositório; correção no `index.html` para proteger rotas de autenticação
8. **Recomendações** - Verificar outros usuários potencialmente afetados; nunca incluir scripts de reset destrutivos sem filtro de usuário

### Implementação técnica

- Criar script Node.js usando `docx` (docx-js) para gerar o DOCX com estilo profissional Educly
- Cores e fontes consistentes com documentos anteriores do projeto (Calibri/Georgia, azul accent #1F4E79)
- Salvar em `/mnt/documents/relatorio-incidente-progresso-apagado.docx`
- Validar o documento gerado
- Converter para imagem para QA visual

