# Runbook - Compartilhamento seguro de credenciais do banco

Data de criacao: 24/03/2026

Objetivo: definir como credenciais sensiveis do banco e do Supabase podem ser entregues entre pessoas da equipe sem uso de canais inseguros.

## Regra principal

Credenciais de banco, tokens administrativos, service role keys, access tokens, JWT secrets, senhas e connection strings nunca devem ser compartilhados por:

- WhatsApp
- e-mail comum sem criptografia
- chat pessoal
- documento publico
- comentario em pull request
- issue
- print de tela

## Canais permitidos

Use apenas um destes caminhos:

- secret manager da plataforma de deploy
- GitHub Secrets ou variavel de ambiente protegida, quando o segredo for para automacao
- gerenciador de senhas corporativo com compartilhamento auditavel
- cofres corporativos com controle de acesso e revogacao

## Regras de uso

1. Compartilhe o menor numero de credenciais possivel.
2. Prefira conceder acesso direto ao sistema em vez de enviar o segredo bruto.
3. Quando precisar compartilhar um segredo:
   - defina quem recebe
   - defina por quanto tempo
   - registre o motivo
4. Nunca envie o valor completo do segredo em texto puro por mensagem.
5. Nunca misture o segredo e a instrução de uso no mesmo canal inseguro.
6. Se uma credencial tiver sido enviada por WhatsApp ou e-mail comum:
   - considerar comprometida
   - rotacionar imediatamente
   - registrar o incidente

## Fluxo recomendado

1. Confirmar se a pessoa realmente precisa do acesso.
2. Preferir adicionar a pessoa no sistema com o menor privilegio possivel.
3. Se for inevitavel entregar um segredo:
   - armazenar no canal seguro aprovado pela equipe
   - compartilhar acesso ao segredo, nao o texto em si
4. Confirmar recebimento.
5. Remover o acesso temporario quando nao for mais necessario.

## Escopo minimo deste controle

Este controle se aplica a:

- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_DB_URL`
- `postgresql://...`
- `JWT_SECRET`
- secrets de webhook
- credenciais de backup
- segredos de automacao que permitam ler ou modificar o banco

## Resposta a incidente

Se houver suspeita de compartilhamento inseguro:

1. Identificar qual credencial foi exposta.
2. Listar onde ela foi enviada.
3. Revogar ou rotacionar a credencial.
4. Atualizar os sistemas dependentes.
5. Registrar a data, o impacto e a acao corretiva.

## Evidencia minima para auditoria

- politica publicada no repositorio
- confirmacao da equipe de que WhatsApp e e-mail comum nao sao canais aprovados para secrets
- registro de rotacao quando houver excecao ou incidente
