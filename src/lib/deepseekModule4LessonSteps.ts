import { textStep, quizStep, fillStep } from "./deepseekModule1LessonSteps";

export const DEEPSEEK_MODULE_4_STEPS_PT = [
  textStep(
    "DeepSeek para Automações — Trabalhando de Forma Mais Inteligente",
    "Bem-vindo de volta! Nesta lição, você vai descobrir como usar o DeepSeek para criar automações poderosas — gerando scripts, integrando ferramentas, eliminando tarefas repetitivas e construindo fluxos de trabalho inteligentes que economizam horas do seu dia."
  ),
  textStep(
    "O DeepSeek como Motor de Automação",
    "Automação não é mais um privilégio de desenvolvedores experientes. Com o DeepSeek, qualquer pessoa consegue criar scripts, configurar integrações e automatizar processos — descrevendo em português o que quer automatizar e recebendo o código pronto para usar."
  ),
  quizStep(
    "Poder da Automação",
    "Por que o DeepSeek é uma ferramenta poderosa para automações?",
    [
      "Ele escreve, explica e depura scripts completos em múltiplas linguagens — tornando automações acessíveis para qualquer pessoa independentemente do nível técnico",
      "O DeepSeek executa as automações diretamente nos seus sistemas sem nenhuma configuração",
      "Funciona apenas para automações em Python",
      "Automações geradas pelo DeepSeek só funcionam em ambientes corporativos"
    ],
    0,
    "A capacidade de gerar código funcional a partir de descrições em linguagem natural democratiza a automação."
  ),
  textStep(
    "Entendendo o que Pode ser Automatizado",
    "Antes de criar qualquer automação, o primeiro passo é identificar quais tarefas do seu dia a dia são repetitivas, previsíveis e consomem tempo sem agregar valor criativo. O DeepSeek ajuda a mapear essas oportunidades."
  ),
  fillStep(
    "Mapeie suas automações!",
    "Preencha a lacuna para identificar oportunidades de automação.",
    '"Aqui está uma descrição das minhas ___ diárias: [descreva]. Analise e identifique quais tarefas são ___ e poderiam ser ___, estime o ___ economizado por semana em cada uma e ordene por ___ de implementação."',
    ["tarefas", "repetitivas e previsíveis", "automatizadas", "tempo", "facilidade"],
    ["tarefas", "repetitivas e previsíveis", "automatizadas", "tempo", "facilidade", "complexidade", "custo", "importância"],
    "Mapear tarefas repetitivas é o primeiro passo para uma rotina mais estratégica."
  ),
  quizStep(
    "Critério de Automação",
    "Qual é o critério mais importante para identificar uma boa oportunidade de automação?",
    [
      "A tarefa precisa ser extremamente complexa para justificar automação",
      "Só vale automatizar tarefas que levam mais de 8 horas por semana",
      "A tarefa deve ser repetitiva, seguir um padrão previsível e consumir tempo que poderia ser dedicado a atividades de maior valor criativo ou estratégico",
      "Automação só faz sentido para equipes grandes com orçamento elevado"
    ],
    2,
    "Focar no que é repetitivo e padronizado garante o maior retorno sobre o tempo investido."
  ),
  textStep(
    "Automatizando com Python — O Básico",
    "Python é a linguagem mais usada para automações do dia a dia. Com o DeepSeek, você descreve o que quer automatizar e recebe o script completo, comentado e pronto para executar."
  ),
  fillStep(
    "Crie seu primeiro script!",
    "Preencha a lacuna para estruturar um script de organização de arquivos.",
    '"Escreva um script em Python que ___ automaticamente todos os arquivos da pasta ___ por ___, crie ___ com o nome de cada categoria e mova cada arquivo para a ___ correspondente. Adicione ___ explicando cada parte do código."',
    ["organize", "Downloads", "tipo de extensão", "subpastas", "pasta", "comentários"],
    ["organize", "Downloads", "tipo de extensão", "subpastas", "pasta", "comentários", "funções", "logs", "erros"],
    "Scripts simples como este podem economizar minutos preciosos todos os dias."
  ),
  quizStep(
    "Segurança e Revisão",
    "O que você deve fazer após receber um script do DeepSeek?",
    [
      "Executar imediatamente em produção sem revisar",
      "Ignorar os comentários e usar apenas o código",
      "Ler os comentários explicativos, entender o que cada parte faz, testar em um ambiente seguro com dados de exemplo e só então aplicar nos seus arquivos reais",
      "Scripts gerados pelo DeepSeek nunca precisam de ajustes"
    ],
    2,
    "Testar e entender o código é fundamental para garantir que a automação funcione como esperado sem riscos."
  ),
  textStep(
    "Automatizando E-mails e Comunicações",
    "Uma das automações mais impactantes para produtividade é a gestão inteligente de e-mails: triagem, respostas automáticas, notificações e encaminhamentos baseados em regras."
  ),
  fillStep(
    "Automatize seus e-mails!",
    "Preencha a lacuna para configurar a gestão automática de mensagens.",
    '"Escreva um script que ___ minha caixa de entrada e automaticamente: ___ e-mails com palavras-chave ___ para uma pasta prioritária, ___ uma resposta automática para e-mails de ___ e gere um ___ diário com os e-mails que precisam de ação. Use a biblioteca ___ do Python."',
    ["monitore", "mova", "urgente e importante", "envie", "solicitações de orçamento", "resumo", "IMAP"],
    ["monitore", "mova", "urgente e importante", "envie", "solicitações de orçamento", "resumo", "IMAP", "SMTP", "JSON"],
    "Filtrar e priorizar comunicações automaticamente reduz drasticamente o ruído e o estresse."
  ),
  quizStep(
    "Vantagem na Comunicação",
    "Qual é a principal vantagem de automatizar a triagem de e-mails com o DeepSeek?",
    [
      "O script lê e responde todos os e-mails sem nenhuma supervisão humana",
      "Para eliminar completamente o uso do e-mail no dia a dia",
      "Você garante que nenhum e-mail importante seja perdido em meio ao volume, reduz o tempo gasto em triagem manual e mantém foco nas mensagens que realmente exigem sua atenção",
      "Automação de e-mail só funciona com Gmail"
    ],
    2,
    "Manter o foco no que importa enquanto a IA lida com o volume é o segredo da produtividade."
  ),
  textStep(
    "Automatizando Relatórios e Planilhas",
    "Gerar relatórios manualmente toda semana é uma das tarefas mais consumidoras de tempo. O DeepSeek cria scripts que coletam dados, calculam métricas e geram relatórios formatados automaticamente."
  ),
  fillStep(
    "Automatize seus relatórios!",
    "Preencha a lacuna para gerar documentos automáticos.",
    '"Crie um script que leia os dados da planilha ___, calcule automaticamente as ___ principais, gere um relatório em ___ com gráficos e tabelas formatadas e o ___ por e-mail para ___ toda ___ automaticamente."',
    ["vendas_mensais.xlsx", "métricas e KPIs", "PDF", "envie", "os gestores da equipe", "segunda-feira de manhã"],
    ["vendas_mensais.xlsx", "métricas e KPIs", "PDF", "envie", "os gestores da equipe", "segunda-feira de manhã", "SMS", "tarde", "CSV"],
    "Transformar dados brutos em inteligência formatada de forma automática libera tempo para a estratégia."
  ),
  quizStep(
    "Valor do Relatório Automático",
    "Por que automatizar a geração de relatórios é estratégico para negócios?",
    [
      "Porque relatórios automáticos são sempre mais precisos que os manuais",
      "Para eliminar a necessidade de análise humana dos dados",
      "Porque libera o tempo da equipe de tarefas mecânicas de coleta e formatação — permitindo focar na interpretação dos dados e nas decisões estratégicas que realmente importam",
      "Automação de relatórios só funciona para empresas com sistemas de BI"
    ],
    2,
    "O valor está na decisão tomada a partir do dado, não no trabalho braçal de gerá-lo."
  ),
  textStep(
    "Automatizando com APIs",
    "APIs são pontes entre sistemas. Com o DeepSeek, você aprende a conectar ferramentas diferentes — fazendo com que dados fluam automaticamente entre plataformas sem intervenção manual."
  ),
  fillStep(
    "Conecte ferramentas com APIs!",
    "Preencha a lacuna para criar fluxos integrados entre plataformas.",
    '"Escreva um script que use a API do ___ para ___ automaticamente quando ___. Os dados devem ser ___ e enviados para ___. Inclua ___ de erros para quando a API não responder e ___ de cada ação executada."',
    ["Notion", "criar uma nova tarefa", "um formulário do Google Forms for preenchido", "formatados corretamente", "o banco de dados do projeto correspondente", "tratamento", "log"],
    ["Notion", "criar uma nova tarefa", "um formulário do Google Forms for preenchido", "formatados corretamente", "o banco de dados do projeto correspondente", "tratamento", "log", "apagar", "alerta"],
    "Conectar ferramentas via API faz com que seu ecossistema digital trabalhe como um único sistema."
  ),
  quizStep(
    "Conceito de API",
    "O que é uma API e por que ela é fundamental para automações?",
    [
      "Uma API é um tipo de planilha avançada para armazenar dados",
      "APIs só funcionam para desenvolvedores com anos de experiência",
      "Uma API é uma interface que permite que dois sistemas se comuniquem e troquem dados automaticamente — sendo a base de praticamente toda automação que conecta ferramentas diferentes",
      "APIs só existem em ferramentas pagas e corporativas"
    ],
    2,
    "As APIs são as engrenagens que permitem que a internet e as ferramentas modernas funcionem juntas."
  ),
  textStep(
    "Automatizando com Make e Zapier — Sem Código",
    "Para quem não quer escrever código, ferramentas como Make e Zapier permitem criar automações visuais. O DeepSeek ajuda a planejar os fluxos, identificar os gatilhos e configurar cada etapa corretamente."
  ),
  fillStep(
    "Planeje seu fluxo no Make!",
    "Preencha a lacuna para desenhar uma automação no-code.",
    '"Quero criar uma automação no ___ que funcione assim: quando ___, automaticamente ___ e depois ___. Descreva passo a passo como configurar esse fluxo, quais ___ usar, os ___ de cada etapa e onde podem ocorrer ___."',
    ["Make", "um novo lead preencher meu formulário de contato", "adicione ao CRM com os dados completos", "envie uma sequência de e-mails de boas-vindas", "módulos", "parâmetros de configuração", "erros comuns"],
    ["Make", "um novo lead preencher meu formulário de contato", "adicione ao CRM com os dados completos", "envie uma sequência de e-mails de boas-vindas", "módulos", "parâmetros de configuração", "erros comuns", "scripts", "segundos"],
    "Ferramentas visualmente configuráveis são aceleradores poderosos para automações de negócio."
  ),
  quizStep(
    "No-Code vs Código",
    "Quando faz mais sentido usar Make ou Zapier em vez de scripts Python?",
    [
      "Quando você quer automações mais rápidas e eficientes",
      "Make e Zapier sempre geram resultados superiores ao Python",
      "Quando você precisa conectar ferramentas populares sem escrever código — ideal para automações de negócio como CRM, e-mail marketing e gestão de tarefas que já possuem integrações nativas",
      "Make e Zapier só funcionam para equipes de marketing"
    ],
    2,
    "Use a ferramenta que oferece o menor atrito para o resultado desejado."
  ),
  textStep(
    "Automatizando a Coleta de Dados — Web Scraping",
    "Web scraping é a técnica de coletar dados automaticamente de sites. O DeepSeek escreve scripts de scraping completos para monitorar preços, coletar informações de concorrentes e reunir dados de mercado."
  ),
  fillStep(
    "Colete dados automaticamente!",
    "Preencha a lacuna para automatizar o monitoramento de mercado.",
    '"Escreva um script de web scraping em Python usando ___ que monitore o site ___ e colete automaticamente: ___, ___ e ___. Salve os dados em uma planilha ___ atualizada diariamente e envie um ___ quando houver ___ nos dados coletados."',
    ["BeautifulSoup", "do meu principal concorrente", "preços dos produtos", "novos lançamentos", "avaliações dos clientes", "Excel", "alerta por e-mail", "mudanças significativas"],
    ["BeautifulSoup", "do meu principal concorrente", "preços dos produtos", "novos lançamentos", "avaliações dos clientes", "Excel", "alerta por e-mail", "mudanças significativas", "alerta", "JSON"],
    "Manter-se informado sobre o mercado automaticamente é uma vantagem competitiva massiva."
  ),
  quizStep(
    "Ética no Scraping",
    "Qual cuidado ético e legal deve ser tomado ao usar web scraping?",
    [
      "Web scraping é sempre ilegal e nunca deve ser usado",
      "Qualquer site pode ser coletado sem restrições",
      "Sempre verificar os termos de uso do site, respeitar o arquivo robots.txt, não sobrecarregar os servidores com requisições excessivas e usar os dados coletados de forma ética e legal",
      "Web scraping só é permitido para sites governamentais"
    ],
    2,
    "Respeitar as regras do site garante que sua automação seja legítima e não cause problemas técnicos."
  ),
  textStep(
    "Automatizando Tarefas no Computador com Python",
    "Além de web e APIs, o DeepSeek cria scripts para automatizar tarefas diretas no seu computador — renomear arquivos em lote, converter formatos, comprimir imagens e muito mais."
  ),
  fillStep(
    "Automatize tarefas locais!",
    "Preencha a lacuna para processamento automático de arquivos locais.",
    '"Escreva um script Python que monitore a pasta ___ e automaticamente: ___ todas as imagens para ___ mantendo a qualidade, ___ um prefixo com a ___ atual no nome de cada arquivo e mova os arquivos processados para a pasta ___. Execute a cada ___ minutos."',
    ["Imagens_Brutas", "comprima", "no máximo 500KB", "adicione", "data", "Processados", "30"],
    ["Imagens_Brutas", "comprima", "no máximo 500KB", "adicione", "data", "Processados", "30", "hoje", "zip"],
    "Automações locais eliminam o 'trabalho de formiga' de lidar com arquivos individuais."
  ),
  quizStep(
    "Valor dos Scripts Locais",
    "Por que automatizar tarefas repetitivas no computador com scripts locais é valioso?",
    [
      "Porque scripts locais são mais seguros do que automações online",
      "Para eliminar completamente o uso manual do computador",
      "Porque tarefas como renomear centenas de arquivos, converter formatos ou organizar pastas consomem minutos repetidos toda semana — e um script faz tudo isso em segundos, sem erros",
      "Scripts locais só funcionam em computadores com Windows"
    ],
    2,
    "Recuperar tempo gasto em manutenção básica de arquivos é o ganho mais rápido da automação."
  ),
  textStep(
    "Depurando e Melhorando Automações Existentes",
    "Quando uma automação apresenta erros ou pode ser melhorada, o DeepSeek analisa o código existente, identifica os problemas e sugere versões otimizadas."
  ),
  fillStep(
    "Depure sua automação!",
    "Preencha a lacuna para corrigir problemas em scripts.",
    '"Aqui está meu script atual: [cole o código]. Ele está apresentando o seguinte problema: ___. Analise o código, identifique a ___ do erro, explique por que está ___ em linguagem simples, corrija e apresente também ___ de performance que podem tornar o script ___ e mais eficiente."',
    ["o script trava quando o arquivo está vazio", "causa raiz", "quebrando", "3 melhorias", "mais rápido"],
    ["o script trava quando o arquivo está vazio", "causa raiz", "quebrando", "3 melhorias", "mais rápido", "lento", "parado", "bugs"],
    "Aprender com os erros do código é o caminho mais rápido para automações resilientes."
  ),
  quizStep(
    "Apresentando Erros",
    "Qual é a melhor abordagem ao apresentar um erro de script para o DeepSeek?",
    [
      "Apenas dizer 'meu código não funciona' sem mais detalhes",
      "Pedir para o DeepSeek reescrever o script inteiro do zero",
      "Mostrar o código completo, descrever o erro exato que aparece, explicar em qual situação ele ocorre e pedir tanto a correção quanto a explicação do problema — para aprender e evitar o mesmo erro no futuro",
      "Erros em scripts sempre indicam que a automação é impossível"
    ],
    2,
    "Contexto completo permite que a IA resolva o problema com precisão cirúrgica."
  ),
  textStep(
    "Construindo um Sistema de Automações Integradas",
    "O nível mais avançado é criar um ecossistema de automações que se comunicam entre si — onde o resultado de uma automação dispara a próxima, criando fluxos completamente autônomos."
  ),
  fillStep(
    "Construa seu ecossistema!",
    "Preencha a lacuna para planejar automações integradas.",
    '"Quero construir um sistema de automações integradas para ___. O fluxo deve ser: ___ dispara ___ que alimenta ___ que notifica ___. Planeje a ___ completa, as ferramentas necessárias em cada etapa e os ___ para garantir que o sistema não quebre se uma etapa falhar."',
    ["meu processo de vendas", "um novo lead no formulário", "a criação automática de proposta personalizada", "o CRM com todos os dados", "a equipe comercial via WhatsApp", "arquitetura", "mecanismos de contingência"],
    ["meu processo de vendas", "um novo lead no formulário", "a criação automática de proposta personalizada", "o CRM com todos os dados", "a equipe comercial via WhatsApp", "arquitetura", "mecanismos de contingência", "sucesso", "segurança"],
    "Ecossistemas integrados transformam processos isolados em uma verdadeira máquina de produtividade."
  ),
  quizStep(
    "Ecossistema de Automação",
    "O que caracteriza um ecossistema de automações bem construído?",
    [
      "O máximo de automações possível conectadas entre si",
      "Automações que funcionam sem nenhuma supervisão humana para sempre",
      "Fluxos integrados com pontos de controle humanos nos momentos críticos, mecanismos de tratamento de erros e logs de cada ação — garantindo que o sistema seja confiável e auditável",
      "Ecossistemas de automação só funcionam para empresas de tecnologia"
    ],
    2,
    "Confiabilidade e transparência são mais importantes que a automação total."
  ),
  textStep(
    "Documentando suas Automações com o DeepSeek",
    "Uma automação sem documentação é um problema esperando para acontecer. O DeepSeek cria documentação clara e completa para cada script — essencial para manutenção e para compartilhar com a equipe."
  ),
  fillStep(
    "Documente sua automação!",
    "Preencha a lacuna para garantir a longevidade da sua automação.",
    '"Aqui está meu script: [cole o código]. Crie uma ___ completa que inclua: o que o script ___, quais são os ___ necessários, passo a passo de como ___, possíveis ___ e como resolvê-los e como ___ o script para novas necessidades. Escreva para alguém que ___ de programação."',
    ["documentação", "faz", "pré-requisitos", "configurar e executar", "erros comuns", "adaptar", "não sabe nada"],
    ["documentação", "faz", "pré-requisitos", "configurar e executar", "erros comuns", "adaptar", "não sabe nada", "conhece", "ama"],
    "Documentar é garantir que seu 'eu do futuro' e sua equipe consigam manter o sistema funcionando."
  ),
  quizStep(
    "Importância da Documentação",
    "Por que documentar automações é tão importante quanto criá-las?",
    [
      "Documentação é apenas uma formalidade burocrática sem valor prático",
      "Quem criou a automação nunca vai precisar de documentação",
      "Porque sem documentação qualquer mudança na equipe ou no sistema pode tornar a automação inutilizável — e uma boa documentação permite que qualquer pessoa configure, use e adapte o script sem depender do criador original",
      "Documentação só é necessária para scripts com mais de 100 linhas de código"
    ],
    2,
    "Conhecimento registrado é poder de manutenção e escala."
  ),
  textStep(
    "Conclusão",
    "Com o DeepSeek, automações deixaram de ser território exclusivo de desenvolvedores experientes. Scripts Python para organizar arquivos e coletar dados, integrações via API, fluxos no Make e Zapier, relatórios automáticos, triagem de e-mails e ecossistemas completos de automação — tudo acessível a qualquer pessoa que saiba descrever o que quer automatizar.\n\nO tempo que você investe criando uma automação hoje é recuperado centenas de vezes nas semanas e meses seguintes. Cada tarefa repetitiva eliminada é espaço criado para o trabalho que realmente importa.\n\nAutomatize o previsível. Libere o seu tempo para o que só você pode fazer.\n\nLição concluída ✓"
  ),
];

export const DEEPSEEK_MODULE_4_STEPS_EN = [
  textStep(
    "DeepSeek for Automation — Working Smarter",
    "Welcome back! In this lesson, you will discover how to use DeepSeek to create powerful automations — generating scripts, integrating tools, eliminating repetitive tasks, and building intelligent workflows that save hours of your day."
  ),
  textStep(
    "DeepSeek as an Automation Engine",
    "Automation is no longer a privilege of experienced developers. With DeepSeek, anyone can create scripts, configure integrations, and automate processes — describing what you want to automate and receiving the code ready to use."
  ),
  quizStep(
    "Automation Power",
    "Why is DeepSeek a powerful tool for automation?",
    [
      "It writes, explains, and debugs complete scripts in multiple languages — making automation accessible to anyone regardless of technical level",
      "DeepSeek executes automations directly on your systems without any configuration",
      "It works only for Python automation",
      "Automations generated by DeepSeek only work in corporate environments"
    ],
    0,
    "The ability to generate functional code from natural language descriptions democratizes automation."
  ),
  textStep(
    "Understanding What Can Be Automated",
    "Before creating any automation, the first step is to identify which daily tasks are repetitive, predictable, and consume time without adding creative value. DeepSeek helps map these opportunities."
  ),
  fillStep(
    "Map your automations!",
    "Fill in the gap to identify automation opportunities.",
    '"Here is a description of my daily ___: [describe]. Analyze and identify which tasks are ___ and could be ___, estimate the ___ saved per week on each one, and order by ___ of implementation."',
    ["tasks", "repetitive and predictable", "automated", "time", "ease"],
    ["tasks", "repetitive and predictable", "automated", "time", "ease", "complexity", "cost", "importance"],
    "Mapping repetitive tasks is the first step toward a more strategic routine."
  ),
  quizStep(
    "Automation Criteria",
    "What is the most important criterion for identifying a good automation opportunity?",
    [
      "The task needs to be extremely complex to justify automation",
      "It's only worth automating tasks that take more than 8 hours per week",
      "The task must be repetitive, follow a predictable pattern, and consume time that could be dedicated to higher-value creative or strategic activities",
      "Automation only makes sense for large teams with high budgets"
    ],
    2,
    "Focusing on what is repetitive and standardized ensures the greatest return on invested time."
  ),
  textStep(
    "Automating with Python — The Basics",
    "Python is the most used language for daily automations. With DeepSeek, you describe what you want to automate and receive the complete script, commented and ready to execute."
  ),
  fillStep(
    "Create your first script!",
    "Fill in the gap to structure a file organization script.",
    '"Write a Python script that automatically ___ all files in the ___ folder by ___, create ___ with the name of each category, and move each file to the corresponding ___. Add ___ explaining each part of the code."',
    ["organizes", "Downloads", "extension type", "subfolders", "folder", "comments"],
    ["organizes", "Downloads", "extension type", "subfolders", "folder", "comments", "functions", "logs", "errors"],
    "Simple scripts like this can save precious minutes every day."
  ),
  quizStep(
    "Security and Review",
    "What should you do after receiving a script from DeepSeek?",
    [
      "Execute immediately in production without review",
      "Ignore explanatory comments and use only the code",
      "Read explanatory comments, understand what each part does, test in a safe environment with example data, and only then apply it to your real files",
      "Scripts generated by DeepSeek never need adjustments"
    ],
    2,
    "Testing and understanding the code is fundamental to ensuring the automation works as expected without risks."
  ),
  textStep(
    "Automating Emails and Communications",
    "One of the most impactful automations for productivity is intelligent email management: screening, automatic replies, notifications, and rule-based forwarding."
  ),
  fillStep(
    "Automate your emails!",
    "Fill in the gap to set up automatic message management.",
    '"Write a script that ___ my inbox and automatically: ___ emails with ___ keywords to a priority folder, ___ an automatic reply to ___ emails, and generate a daily ___ with emails that need action. Use Python\'s ___ library."',
    ["monitors", "moves", "urgent and important", "send", "quote requests", "summary", "IMAP"],
    ["monitors", "moves", "urgent and important", "send", "quote requests", "summary", "IMAP", "SMTP", "JSON"],
    "Automatically filtering and prioritizing communications drastically reduces noise and stress."
  ),
  quizStep(
    "Advantage in Communication",
    "What is the main advantage of automating email screening with DeepSeek?",
    [
      "The script reads and replies to all emails without any human supervision",
      "To completely eliminate email use in daily life",
      "You ensure that no important email is lost in the volume, reduce time spent on manual screening, and maintain focus on messages that actually require your attention",
      "Email automation only works with Gmail"
    ],
    2,
    "Maintaining focus on what matters while AI handles the volume is the secret to productivity."
  ),
  textStep(
    "Automating Reports and Spreadsheets",
    "Generating reports manually every week is one of the most time-consuming tasks. DeepSeek creates scripts that collect data, calculate metrics, and generate formatted reports automatically."
  ),
  fillStep(
    "Automate your reports!",
    "Fill in the gap to generate automatic documents.",
    '"Create a script that reads data from the ___ spreadsheet, automatically calculates the main ___, generates a report in ___ with formatted charts and tables, and ___ it by email to ___ every ___ automatically."',
    ["monthly_sales.xlsx", "metrics and KPIs", "PDF", "sends", "team managers", "Monday morning"],
    ["monthly_sales.xlsx", "metrics and KPIs", "PDF", "sends", "team managers", "Monday morning", "SMS", "afternoon", "CSV"],
    "Automatically transforming raw data into formatted intelligence frees up time for strategy."
  ),
  quizStep(
    "Value of Automated Reports",
    "Why is automating report generation strategic for businesses?",
    [
      "Because automatic reports are always more accurate than manual ones",
      "To eliminate the need for human data analysis",
      "Because it frees up team time from mechanical collection and formatting tasks — allowing focus on data interpretation and strategic decisions that truly matter",
      "Report automation only works for companies with BI systems"
    ],
    2,
    "The value is in the decision made from the data, not in the manual labor of generating it."
  ),
  textStep(
    "Automating with APIs",
    "APIs are bridges between systems. With DeepSeek, you learn to connect different tools — making data flow automatically between platforms without manual intervention."
  ),
  fillStep(
    "Connect tools with APIs!",
    "Fill in the gap to create integrated flows between platforms.",
    '"Write a script that uses the ___ API to automatically ___ when ___. Data should be ___ and sent to ___. Include error ___ for when the API doesn\'t respond and ___ of each executed action."',
    ["Notion", "create a new task", "a Google Form is filled", "properly formatted", "the corresponding project database", "handling", "logs"],
    ["Notion", "create a new task", "a Google Form is filled", "properly formatted", "the corresponding project database", "handling", "logs", "delete", "alert"],
    "Connecting tools via API makes your digital ecosystem work as a single system."
  ),
  quizStep(
    "API Concept",
    "What is an API and why is it fundamental for automation?",
    [
      "An API is a type of advanced spreadsheet to store data",
      "APIs only work for developers with years of experience",
      "An API is an interface that allows two systems to communicate and exchange data automatically — being the basis of almost every automation that connects different tools",
      "APIs only exist in paid and corporate tools"
    ],
    2,
    "APIs are the gears that allow the internet and modern tools to work together."
  ),
  textStep(
    "Automating with Make and Zapier — No-Code",
    "For those who don't want to write code, tools like Make and Zapier allow creating visual automations. DeepSeek helps plan flows, identify triggers, and configure each step correctly."
  ),
  fillStep(
    "Plan your flow in Make!",
    "Fill in the gap to design a no-code automation.",
    '"I want to create an automation in ___ that works like this: when ___, automatically ___ and then ___. Describe step-by-step how to configure this flow, which ___ to use, the ___ of each stage, and where ___ might occur."',
    ["Make", "a new lead fills my contact form", "add to CRM with complete data", "send a welcome email sequence", "modules", "configuration parameters", "common errors"],
    ["Make", "a new lead fills my contact form", "add to CRM with complete data", "send a welcome email sequence", "modules", "configuration parameters", "common errors", "scripts", "seconds"],
    "Visually configurable tools are powerful accelerators for business automation."
  ),
  quizStep(
    "No-Code vs Code",
    "When does it make more sense to use Make or Zapier instead of Python scripts?",
    [
      "When you want faster and more efficient automation",
      "Make and Zapier always generate superior results than Python",
      "When you need to connect popular tools without writing code — ideal for business automation like CRM, email marketing, and task management that already have native integrations",
      "Make and Zapier only work for marketing teams"
    ],
    2,
    "Use the tool that offers the least friction for the desired result."
  ),
  textStep(
    "Automating Data Collection — Web Scraping",
    "Web scraping is the technique of automatically collecting data from websites. DeepSeek writes complete scraping scripts to monitor prices, collect competitor information, and gather market data."
  ),
  fillStep(
    "Collect data automatically!",
    "Fill in the gap to automate market monitoring.",
    '"Write a Python web scraping script using ___ that monitors the ___ website and automatically collects: ___, ___ and ___. Save the data in an ___ spreadsheet updated daily and send an ___ when there are ___ in the collected data."',
    ["BeautifulSoup", "my main competitor", "product prices", "new launches", "customer reviews", "Excel", "email alert", "significant changes"],
    ["BeautifulSoup", "my main competitor", "product prices", "new launches", "customer reviews", "Excel", "email alert", "significant changes", "alert", "JSON"],
    "Staying informed about the market automatically is a massive competitive advantage."
  ),
  quizStep(
    "Scraping Ethics",
    "What ethical and legal care should be taken when using web scraping?",
    [
      "Web scraping is always illegal and should never be used",
      "Any site can be collected without restrictions",
      "Always check the site's terms of use, respect the robots.txt file, don't overload servers with excessive requests, and use collected data ethically and legally",
      "Web scraping is only allowed for government sites"
    ],
    2,
    "Respecting site rules ensures your automation is legitimate and doesn't cause technical issues."
  ),
  textStep(
    "Automating Computer Tasks with Python",
    "Beyond web and APIs, DeepSeek creates scripts to automate direct tasks on your computer — batch renaming files, converting formats, compressing images, and much more."
  ),
  fillStep(
    "Automate local tasks!",
    "Fill in the gap for automatic local file processing.",
    '"Write a Python script that monitors the ___ folder and automatically: ___ all images to ___ while maintaining quality, ___ a prefix with the current ___ to each file name, and move processed files to the ___ folder. Run every ___ minutes."',
    ["Raw_Images", "compress", "maximum 500KB", "add", "date", "Processed", "30"],
    ["Raw_Images", "compress", "maximum 500KB", "add", "date", "Processed", "30", "today", "zip"],
    "Local automations eliminate the 'grunt work' of dealing with individual files."
  ),
  quizStep(
    "Value of Local Scripts",
    "Why is automating repetitive computer tasks with local scripts valuable?",
    [
      "Because local scripts are more secure than online automation",
      "To completely eliminate manual computer use",
      "Because tasks like renaming hundreds of files, converting formats, or organizing folders consume repeated minutes every week — and a script does all this in seconds, without errors",
      "Local scripts only work on Windows computers"
    ],
    2,
    "Reclaiming time spent on basic file maintenance is the fastest gain from automation."
  ),
  textStep(
    "Debugging and Improving Existing Automations",
    "When an automation presents errors or can be improved, DeepSeek analyzes existing code, identifies problems, and suggests optimized versions."
  ),
  fillStep(
    "Debug your automation!",
    "Fill in the gap to fix script issues.",
    '"Here is my current script: [paste code]. It is showing the following problem: ___. Analyze the code, identify the ___ of the error, explain why it\'s ___ in simple language, fix it, and also present ___ performance improvements that can make the script ___ and more efficient."',
    ["the script hangs when file is empty", "root cause", "breaking", "3", "faster"],
    ["the script hangs when file is empty", "root cause", "breaking", "3", "faster", "slower", "stopped", "bugs"],
    "Learning from code errors is the fastest path to resilient automation."
  ),
  quizStep(
    "Reporting Errors",
    "What is the best approach when reporting a script error to DeepSeek?",
    [
      "Just saying 'my code doesn't work' without more details",
      "Asking DeepSeek to rewrite the whole script from scratch",
      "Showing the full code, describing the exact error that appears, explaining the situation it occurs in, and asking for both the fix and the problem explanation — to learn and avoid the same error in the future",
      "Errors in scripts always indicate that automation is impossible"
    ],
    2,
    "Full context allows the AI to solve the problem with surgical precision."
  ),
  textStep(
    "Building an Integrated Automation System",
    "The most advanced level is creating an ecosystem of automations that communicate with each other — where the result of one automation triggers the next, creating fully autonomous flows."
  ),
  fillStep(
    "Build your ecosystem!",
    "Fill in the gap to plan integrated automations.",
    '"I want to build an integrated automation system for ___. The flow should be: ___ triggers ___ which feeds ___ which notifies ___. Plan the complete ___, required tools at each stage, and ___ to ensure the system doesn\'t break if one stage fails."',
    ["my sales process", "a new lead in form", "automatic custom proposal creation", "CRM with all data", "sales team via WhatsApp", "architecture", "contingency mechanisms"],
    ["my sales process", "a new lead in form", "automatic custom proposal creation", "CRM with all data", "sales team via WhatsApp", "architecture", "contingency mechanisms", "success", "security"],
    "Integrated ecosystems transform isolated processes into a true productivity machine."
  ),
  quizStep(
    "Automation Ecosystem",
    "What characterizes a well-built automation ecosystem?",
    [
      "As many automations as possible connected to each other",
      "Automations that work without any human supervision forever",
      "Integrated flows with human control points at critical moments, error handling mechanisms, and logs of each action — ensuring the system is reliable and auditable",
      "Automation ecosystems only work for tech companies"
    ],
    2,
    "Reliability and transparency are more important than total automation."
  ),
  textStep(
    "Documenting Your Automations with DeepSeek",
    "An undocumented automation is a problem waiting to happen. DeepSeek creates clear and complete documentation for each script — essential for maintenance and for sharing with the team."
  ),
  fillStep(
    "Document your automation!",
    "Fill in the gap to ensure your automation's longevity.",
    '"Here is my script: [paste code]. Create a complete ___ that includes: what the script ___, what are the required ___, step-by-step how to ___, possible ___ and how to fix them, and how to ___ the script for new needs. Write for someone who ___ about programming."',
    ["documentation", "does", "prerequisites", "configure and run", "common errors", "adapt", "knows nothing"],
    ["documentation", "does", "prerequisites", "configure and run", "common errors", "adapt", "knows nothing", "knows", "loves"],
    "Documenting ensures that your 'future self' and your team can keep the system running."
  ),
  quizStep(
    "Importance of Documentation",
    "Why is documenting automation as important as creating it?",
    [
      "Documentation is just a bureaucratic formality without practical value",
      "Whoever created the automation will never need documentation",
      "Because without documentation any change in the team or system can make the automation unusable — and good documentation allows anyone to configure, use, and adapt the script without depending on the original creator",
      "Documentation is only needed for scripts with more than 100 lines of code"
    ],
    2,
    "Recorded knowledge is the power to maintain and scale."
  ),
  textStep(
    "Conclusion",
    "With DeepSeek, automation is no longer the exclusive territory of experienced developers. Python scripts to organize files and collect data, API integrations, flows in Make and Zapier, automatic reports, email screening, and complete automation ecosystems — everything accessible to anyone who knows how to describe what they want to automate.\n\nThe time you invest creating an automation today is recovered hundreds of times in the following weeks and months. Every repetitive task eliminated is space created for the work that truly matters.\n\nAutomate the predictable. Free your time for what only you can do.\n\nLesson completed ✓"
  ),
];

export const DEEPSEEK_MODULE_4_STEPS_ES = [
  textStep(
    "DeepSeek para Automatizaciones — Trabajando de Forma Más Inteligente",
    "¡Bienvenido de nuevo! En esta lección, descubrirás cómo usar DeepSeek para crear automatizaciones poderosas — generando scripts, integrando herramientas, eliminando tareas repetitivas y construyendo flujos de trabajo inteligentes que ahorran horas de tu día."
  ),
  textStep(
    "DeepSeek como Motor de Automatización",
    "La automatización ya no es un privilegio de desarrolladores experimentados. Con DeepSeek, cualquier persona puede crear scripts, configurar integraciones y automatizar procesos — describiendo en español lo que quiere automatizar y recibiendo el código listo para usar."
  ),
  quizStep(
    "Poder de la Automatización",
    "¿Por qué DeepSeek es una herramienta poderosa para las automatizaciones?",
    [
      "Escribe, explica y depura scripts completos en múltiples lenguajes — haciendo que las automatizaciones sean accesibles para cualquier persona, independientemente de su nivel técnico",
      "DeepSeek ejecuta las automatizaciones directamente en tus sistemas sin ninguna configuración",
      "Funciona solo para automatizaciones en Python",
      "Las automatizaciones generadas por DeepSeek solo funcionan en entornos corporativos"
    ],
    0,
    "La capacidad de generar código funcional a partir de descripciones en lenguaje natural democratiza la automatización."
  ),
  textStep(
    "Entendiendo lo que se Puede Automatizar",
    "Antes de crear cualquier automatización, el primer paso es identificar qué tareas de tu día a día son repetitivas, previsibles y consumen tiempo sin agregar valor creativo. DeepSeek ayuda a mapear estas oportunidades."
  ),
  fillStep(
    "¡Mapea tus automatizaciones!",
    "Completa el espacio para identificar oportunidades de automatización.",
    '"Aquí hay una descripción de mis ___ diarias: [describe]. Analiza e identifica qué tareas son ___ y podrían ser ___, estima el ___ ahorrado por semana en cada una y ordena por ___ de implementación."',
    ["tareas", "repetitivas y previsibles", "automatizadas", "tiempo", "facilidad"],
    ["tareas", "repetitivas y previsibles", "automatizadas", "tiempo", "facilidad", "complejidad", "costo", "importancia"],
    "Mapear tareas repetitivas es el primer paso hacia una rutina más estratégica."
  ),
  quizStep(
    "Criterio de Automatización",
    "¿Cuál es el criterio más importante para identificar una buena oportunidad de automatización?",
    [
      "La tarea debe ser extremadamente compleja para justificar la automatización",
      "Solo vale la pena automatizar tareas que toman más de 8 horas por semana",
      "La tarea debe ser repetitiva, seguir un patrón previsible y consumir tiempo que podría dedicarse a actividades de mayor valor creativo o estratégico",
      "La automatización solo tiene sentido para equipos grandes con presupuestos elevados"
    ],
    2,
    "Centrarse en lo repetitivo y estandarizado garantiza el mayor retorno sobre el tiempo invertido."
  ),
  textStep(
    "Automatizando con Python — Lo Básico",
    "Python es el lenguaje más utilizado para las automatizaciones del día a día. Con DeepSeek, describes lo que quieres automatizar y recibes el script completo, comentado y listo para ejecutar."
  ),
  fillStep(
    "¡Crea tu primer script!",
    "Completa el espacio para estructurar un script de organización de archivos.",
    '"Escribe un script en Python que ___ automáticamente todos los archivos de la carpeta ___ por ___, cree ___ con el nombre de cada categoría y mueva cada archivo a la ___ correspondiente. Añade ___ explicando cada parte del código."',
    ["organice", "Descargas", "tipo de extensión", "subcarpetas", "carpeta", "comentarios"],
    ["organice", "Descargas", "tipo de extensión", "subcarpetas", "carpeta", "comentarios", "funciones", "logs", "errores"],
    "Scripts simples como este pueden ahorrar minutos valiosos todos los días."
  ),
  quizStep(
    "Seguridad y Revisión",
    "¿Qué debes hacer después de recibir un script de DeepSeek?",
    [
      "Ejecutar inmediatamente en producción sin revisar",
      "Ignorar los comentarios explicativos y usar solo el código",
      "Leer los comentarios explicativos, entender qué hace cada parte, probar en un entorno seguro con datos de ejemplo y solo entonces aplicar en tus archivos reales",
      "Los scripts generados por DeepSeek nunca necesitan ajustes"
    ],
    2,
    "Probar y entender el código es fundamental para garantizar que la automatización funcione como se espera sin riesgos."
  ),
  textStep(
    "Automatizando Correos Electrónicos y Comunicaciones",
    "Una de las automatizaciones más impactantes para la productividad es la gestión inteligente de correos electrónicos: clasificación, respuestas automáticas, notificaciones y reenvíos basados en reglas."
  ),
  fillStep(
    "¡Automatiza tus correos!",
    "Completa el espacio para configurar la gestión automática de mensajes.",
    '"Escribe un script que ___ mi bandeja de entrada y automáticamente: ___ correos con palabras clave ___ a una carpeta prioritaria, ___ una respuesta automática para correos de ___ y genere un ___ diario con los correos que necesitan acción. Usa la biblioteca ___ de Python."',
    ["monitoree", "mueva", "urgente e importante", "envíe", "solicitudes de presupuesto", "resumen", "IMAP"],
    ["monitoree", "mueva", "urgente e importante", "envíe", "solicitudes de presupuesto", "resumen", "IMAP", "SMTP", "JSON"],
    "Filtrar y priorizar las comunicaciones automáticamente reduce drásticamente el ruido y el estrés."
  ),
  quizStep(
    "Ventaja en la Comunicación",
    "¿Cuál es la principal ventaja de automatizar la clasificación de correos con DeepSeek?",
    [
      "El script lee y responde todos los correos sin ninguna supervisión humana",
      "Para eliminar completamente el uso del correo en el día a día",
      "Garantizas que no se pierda ningún correo importante entre el volumen, reduces el tiempo dedicado a la clasificación manual y mantienes el enfoque en los mensajes que realmente requieren tu atención",
      "La automatización de correo solo funciona con Gmail"
    ],
    2,
    "Mantener el enfoque en lo que importa mientras la IA gestiona el volumen es el secreto de la productividad."
  ),
  textStep(
    "Automatizando Informes y Hojas de Cálculo",
    "Generar informes manualmente cada semana es una de las tareas que más tiempo consume. DeepSeek crea scripts que recopilan datos, calculan métricas y generan informes formateados automáticamente."
  ),
  fillStep(
    "¡Automatiza tus informes!",
    "Completa el espacio para generar documentos automáticos.",
    '"Crea un script que lea los datos de la hoja de cálculo ___, calcule automáticamente las ___ principales, genere un informe en ___ con gráficos y tablas formateadas y lo ___ por correo electrónico a ___ cada ___ automáticamente."',
    ["ventas_mensuales.xlsx", "métricas y KPIs", "PDF", "envíe", "los gerentes del equipo", "lunes por la mañana"],
    ["ventas_mensuales.xlsx", "métricas y KPIs", "PDF", "envíe", "los gerentes del equipo", "lunes por la mañana", "SMS", "tarde", "CSV"],
    "Transformar datos brutos en inteligencia formateada de forma automática libera tiempo para la estrategia."
  ),
  quizStep(
    "Valor del Informe Automático",
    "¿Por qué la automatización de la generación de informes es estratégica para los negocios?",
    [
      "Porque los informes automáticos siempre son más precisos que los manuales",
      "Para eliminar la necesidad del análisis humano de los datos",
      "Porque libera el tiempo del equipo de tareas mecánicas de recolección y formato, permitiendo centrarse en la interpretación de los datos y en las decisiones estratégicas que realmente importan",
      "La automatización de informes solo funciona para empresas con sistemas de BI"
    ],
    2,
    "El valor reside en la decisión tomada a partir del dato, no en el trabajo manual de generarlo."
  ),
  textStep(
    "Automatizando con APIs",
    "Las APIs son puentes entre sistemas. Con DeepSeek, aprendes a conectar diferentes herramientas — haciendo que los datos fluyan automáticamente entre plataformas sin intervención manual."
  ),
  fillStep(
    "¡Conecta herramientas con APIs!",
    "Completa el espacio para crear flujos integrados entre plataformas.",
    '"Escribe un script que use la API de ___ para ___ automáticamente cuando ___. Los datos deben estar ___ y enviarse a ___. Incluye ___ de errores para cuando la API no responda y ___ de cada acción ejecutada."',
    ["Notion", "crear una nueva tarea", "se complete un formulario de Google Forms", "formateados correctamente", "la base de datos del proyecto correspondiente", "manejo", "registros"],
    ["Notion", "crear una nueva tarefa", "se complete un formulario de Google Forms", "formateados correctamente", "la base de datos del proyecto correspondiente", "manejo", "registros", "borrar", "alerta"],
    "Conectar herramientas vía API hace que tu ecosistema digital funcione como un solo sistema."
  ),
  quizStep(
    "Concepto de API",
    "¿Qué es una API y por qué es fundamental para las automatizaciones?",
    [
      "Una API es un tipo de hoja de cálculo avanzada para almacenar datos",
      "Las APIs solo funcionan para desarrolladores con años de experiencia",
      "Una API es una interfaz que permite que dos sistemas se comuniquen y e intercambien datos automáticamente — siendo la base de prácticamente toda automatización que conecta herramientas diferentes",
      "Las APIs solo existen en herramientas de pago y corporativas"
    ],
    2,
    "Las APIs son los engranajes que permiten que internet y las herramientas modernas funcionen juntas."
  ),
  textStep(
    "Automatizando con Make y Zapier — Sin Código",
    "Para quienes no quieren escribir código, herramientas como Make y Zapier permiten crear automatizaciones visuales. DeepSeek ayuda a planificar los flujos, identificar los disparadores y configurar cada etapa correctamente."
  ),
  fillStep(
    "¡Planifica tu flujo en Make!",
    "Completa el espacio para diseñar una automatización no-code.",
    '"Quiero crear una automatización en ___ que funcione así: cuando ___, automáticamente ___ y luego ___. Describe paso a paso cómo configurar este flujo, qué ___ usar, los ___ de cada etapa y dónde pueden ocurrir ___."',
    ["Make", "un nuevo lead complete mi formulario de contacto", "agrega al CRM con los datos completos", "envía una secuencia de correos de bienvenida", "módulos", "parámetros de configuración", "errores comunes"],
    ["Make", "un nuevo lead complete mi formulario de contacto", "agrega al CRM con los datos completos", "envía una secuencia de correos de bienvenida", "módulos", "parâmetros de configuración", "errores comunes", "scripts", "segundos"],
    "Las herramientas configurables visualmente son aceleradores potentes para las automatizaciones de negocios."
  ),
  quizStep(
    "No-Code vs Código",
    "¿Cuándo tiene más sentido usar Make o Zapier en lugar de scripts de Python?",
    [
      "Cuando quieres automatizaciones más rápidas y eficientes",
      "Make y Zapier siempre generan resultados superiores a Python",
      "Cuando necesitas conectar herramientas populares sin escribir código — ideal para automatizaciones de negocios como CRM, marketing por correo y gestión de tareas que ya poseen integraciones nativas",
      "Make y Zapier solo funcionan para equipos de marketing"
    ],
    2,
    "Usa la herramienta que ofrezca la menor fricción para el resultado deseado."
  ),
  textStep(
    "Automatizando la Recolección de Datos — Web Scraping",
    "El web scraping es la técnica de recolectar datos automáticamente de sitios web. DeepSeek escribe scripts de scraping completos para monitorear precios, recolectar información de competidores y reunir datos de mercado."
  ),
  fillStep(
    "¡Recolecta datos automáticamente!",
    "Completa el espacio para automatizar el monitoreo de mercado.",
    '"Escribe un script de web scraping en Python usando ___ que monitoree el sitio ___ y recolecte automáticamente: ___, ___ y ___. Guarda los datos en una hoja de cálculo ___ actualizada diariamente y envía un ___ cuando haya ___ en los datos recolectados."',
    ["BeautifulSoup", "de mi principal competidor", "precios de productos", "nuevos lanzamientos", "opiniones de clientes", "Excel", "alerta por correo", "cambios significativos"],
    ["BeautifulSoup", "de mi principal competidor", "precios de productos", "nuevos lanzamientos", "opiniones de clientes", "Excel", "alerta por correo", "cambios significativos", "alerta", "JSON"],
    "Mantenerse informado sobre el mercado automáticamente es una ventaja competitiva masiva."
  ),
  quizStep(
    "Ética en el Scraping",
    "¿Qué cuidado ético y legal se debe tener al usar web scraping?",
    [
      "El web scraping siempre es ilegal y nunca debe usarse",
      "Cualquier sitio puede recolectarse sin restricciones",
      "Verificar siempre los términos de uso del sitio, respetar el archivo robots.txt, no sobrecargar los servidores con peticiones excesivas y usar los datos recolectados de forma ética y legal",
      "El web scraping solo está permitido para sitios gubernamentales"
    ],
    2,
    "Respetar las reglas del sitio garantiza que tu automatización sea legítima y no cause problemas técnicos."
  ),
  textStep(
    "Automatizando Tareas en la Computadora con Python",
    "Además de la web y las APIs, DeepSeek crea scripts para automatizar tareas directas en tu computadora — renombrar archivos por lotes, convertir formatos, comprimir imágenes y mucho más."
  ),
  fillStep(
    "¡Automatiza tareas locales!",
    "Completa el espacio para el procesamiento automático de archivos locales.",
    '"Escribe un script de Python que monitoree la carpeta ___ y automáticamente: ___ todas las imágenes a ___ manteniendo la calidad, ___ un prefijo con la ___ actual en el nombre de cada archivo y mueva los archivos procesados a la carpeta ___. Ejecuta cada ___ minutos."',
    ["Imágenes_Brutas", "comprima", "máximo 500KB", "añada", "fecha", "Procesados", "30"],
    ["Imágenes_Brutas", "comprima", "máximo 500KB", "añada", "fecha", "Procesados", "30", "hoy", "zip"],
    "Las automatizaciones locales eliminan el 'trabajo de hormiga' de lidiar con archivos individuales."
  ),
  quizStep(
    "Valor de los Scripts Locales",
    "¿Por qué es valioso automatizar tareas repetitivas en la computadora con scripts locales?",
    [
      "Porque los scripts locales son más seguros que las automatizaciones en línea",
      "Para eliminar completamente el uso manual de la computadora",
      "Porque tareas como renombrar cientos de archivos, convertir formatos u organizar carpetas consumen minutos repetidos cada semana — y un script hace todo eso en segundos, sin errores",
      "Los scripts locales solo funcionan en computadoras con Windows"
    ],
    2,
    "Recuperar el tiempo dedicado al mantenimiento básico de archivos es la ganancia más rápida de la automatización."
  ),
  textStep(
    "Depurando y Mejorando Automatizaciones Existentes",
    "Cuando una automatización presenta errores o puede mejorarse, DeepSeek analiza el código existente, identifica los problemas y sugiere versiones optimizadas."
  ),
  fillStep(
    "¡Depura tu automatización!",
    "Completa el espacio para corregir problemas en scripts.",
    '"Aquí está mi script actual: [pegar código]. Presenta el siguiente problema: ___. Analiza el código, identifica la ___ del error, explica por qué se está ___ en lenguaje sencillo, corrige y presenta también ___ de rendimiento que pueden hacer que el script sea ___ y más eficiente."',
    ["el script se cuelga cuando el archivo está vacío", "causa raíz", "rompiendo", "3 mejoras", "más rápido"],
    ["el script se cuelga cuando el archivo está vacío", "causa raíz", "rompiendo", "3 mejoras", "más rápido", "lento", "parado", "bugs"],
    "Aprender de los errores del código es el camino más rápido hacia automatizaciones resilientes."
  ),
  quizStep(
    "Presentando Errores",
    "¿Cuál es el mejor enfoque al presentar un error de script a DeepSeek?",
    [
      "Solo decir 'mi código no funciona' sin más detalles",
      "Pedir a DeepSeek que reescriba todo el script desde cero",
      "Mostrar el código completo, describir el error exacto que aparece, explicar la situación en la que ocurre y pedir tanto la corrección como la explicación del problema — para aprender y evitar el mismo error en el futuro",
      "Los errores en los scripts siempre indican que la automatización es imposible"
    ],
    2,
    "El contexto completo permite que la IA resuelva el problema con precisión quirúrgica."
  ),
  textStep(
    "Construyendo un Sistema de Automatizaciones Integradas",
    "El nivel más avanzado es crear un ecosistema de automatizaciones que se comunican entre sí — donde el resultado de una automatización dispara la siguiente, creando flujos completamente autónomos."
  ),
  fillStep(
    "¡Construye tu ecosistema!",
    "Completa el espacio para planificar automatizaciones integradas.",
    '"Quiero construir un sistema de automatizaciones integradas para ___. El flujo debe ser: ___ dispara ___ que alimenta ___ que notifica ___. Planifica la ___ completa, las herramientas necesarias en cada etapa y los ___ para garantizar que el sistema no se rompa si falla una etapa."',
    ["mi proceso de ventas", "un nuevo lead en el formulario", "la creación automática de una propuesta personalizada", "el CRM con todos los datos", "al equipo comercial vía WhatsApp", "arquitectura", "mecanismos de contingencia"],
    ["mi proceso de ventas", "un nuevo lead en el formulario", "la creación automática de una propuesta personalizada", "el CRM con todos los datos", "al equipo comercial vía WhatsApp", "arquitectura", "mecanismos de contingência", "éxito", "seguridad"],
    "Los ecosistemas integrados transforman procesos aislados en una verdadera máquina de productividad."
  ),
  quizStep(
    "Ecosistema de Automatización",
    "¿Qué caracteriza a un ecosistema de automatizaciones bien construido?",
    [
      "El máximo de automatizaciones posible conectadas entre sí",
      "Automatizaciones que funcionan sin ninguna supervisión humana para siempre",
      "Flujos integrados con puntos de control humanos en los momentos críticos, mecanismos de manejo de errores y registros de cada acción — garantizando que el sistema sea confiable y auditable",
      "Los ecosistemas de automatización solo funcionan para empresas de tecnología"
    ],
    2,
    "La confiabilidad y la transparencia son más importantes que la automatización total."
  ),
  textStep(
    "Documentando tus Automatizaciones con DeepSeek",
    "Una automatización sin documentación es un problema esperando a suceder. DeepSeek crea una documentación clara y completa para cada script — esencial para el mantenimiento y para compartir con el equipo."
  ),
  fillStep(
    "¡Documenta tu automatización!",
    "Completa el espacio para garantizar la longevidad de tu automatización.",
    '"Aquí está mi script: [pegar código]. Crea una ___ completa que incluya: qué ___ el script, cuáles son los ___ necesarios, paso a paso sobre cómo ___, posibles ___ y cómo resolverlos, y cómo ___ el script para nuevas necesidades. Escribe para alguien que ___ de programación."',
    ["documentación", "hace", "requisitos previos", "configurar y ejecutar", "errores comunes", "adaptar", "no sabe nada"],
    ["documentación", "hace", "requisitos previos", "configurar y ejecutar", "errores comunes", "adaptar", "no sabe nada", "conoce", "ama"],
    "Documentar es garantizar que tu 'yo del futuro' y tu equipo puedan mantener el sistema en funcionamiento."
  ),
  quizStep(
    "Importancia de la Documentación",
    "¿Por qué documentar las automatizaciones es tan importante como crearlas?",
    [
      "La documentación es solo una formalidad burocrática sin valor práctico",
      "Quien creó la automatización nunca necesitará documentación",
      "Porque sin documentación cualquier cambio en el equipo o en el sistema puede hacer que la automatización sea inutilizable — y una buena documentación permite que cualquier persona configure, use y adapte el script sin depender del creador original",
      "La documentación solo es necesaria para scripts con más de 100 líneas de código"
    ],
    2,
    "El conocimiento registrado es el poder de mantener y escalar."
  ),
  textStep(
    "Conclusión",
    "Con DeepSeek, las automatizaciones dejaron de ser territorio exclusivo de desarrolladores experimentados. Scripts de Python para organizar archivos y recolectar datos, integraciones vía API, flujos en Make y Zapier, informes automáticos, clasificación de correos y ecosistemas completos de automatización — todo accesible para cualquier persona que sepa describir lo que quiere automatizar.\n\nEl tiempo que inviertes creando una automatización hoy se recupera cientos de veces en las semanas y meses siguientes. Cada tarea repetitiva eliminada es espacio creado para el trabajo que realmente importa.\n\nAutomatiza lo previsible. Libera tu tiempo para lo que solo tú puedes hacer.\n\nLección completada ✓"
  ),
];

export const DEEPSEEK_MODULE_4_STEPS_FR = [
  textStep(
    "DeepSeek pour les Automatisations — Travailler Plus Intelligemment",
    "Bienvenue de retour ! Dans cette leçon, vous découvrirez comment utiliser DeepSeek pour créer des automatisations puissantes — en générant des scripts, en intégrant des outils, en éliminant les tâches répétitives et en construisant des flux de travail intelligents qui vous feront gagner des heures chaque jour."
  ),
  textStep(
    "DeepSeek comme Moteur d'Automatisation",
    "L'automatisation n'est plus le privilège des développeurs expérimentés. Avec DeepSeek, n'importe qui peut créer des scripts, configurer des intégrations et automatiser des processus — en décrivant en français ce qu'il souhaite automatiser et en recevant le code prêt à l'emploi."
  ),
  quizStep(
    "Pouvoir de l'Automatisation",
    "Pourquoi DeepSeek est-il un outil puissant pour les automatisations ?",
    [
      "Il écrit, explique et débogue des scripts complets dans de multiples langages — rendant les automatisations accessibles à tous, quel que soit le niveau technique",
      "DeepSeek exécute les automatisations directement sur vos systèmes sans aucune configuration",
      "Il fonctionne uniquement pour les automatisations en Python",
      "Les automatisations générées par DeepSeek ne fonctionnent que dans des environnements d'entreprise"
    ],
    0,
    "La capacité de générer du code fonctionnel à partir de descriptions en langage naturel démocratise l'automatisation."
  ),
  textStep(
    "Comprendre ce qui Peut Être Automatisé",
    "Avant de créer une automatisation, la première étape est d'identifier quelles tâches de votre quotidien sont répétitives, prévisibles et chronophages sans apporter de valeur créative. DeepSeek vous aide à cartographier ces opportunités."
  ),
  fillStep(
    "Cartographiez vos automatisations !",
    "Complétez le vide pour identifier les opportunités d'automatisation.",
    '"Voici une description de mes ___ quotidiennes : [décrivez]. Analysez et identifiez quelles tâches sont ___ et pourraient être ___, estimez le ___ économisé par semaine pour chacune et organisez-les par ___ de mise en œuvre."',
    ["tâches", "répétitives et prévisibles", "automatisées", "temps", "facilité"],
    ["tâches", "répétitives et prévisibles", "automatisées", "temps", "facilité", "complexité", "coût", "importance"],
    "Cartographier les tâches répétitives est la première étape vers une routine plus stratégique."
  ),
  quizStep(
    "Critère d'Automatisation",
    "Quel est le critère le plus important pour identifier une bonne opportunité d'automatisation ?",
    [
      "La tâche doit être extrêmement complexe pour justifier l'automatisation",
      "Il ne vaut la peine d'automatiser que les tâches qui prennent plus de 8 heures par semaine",
      "La tâche doit être répétitive, suivre un modèle prévisible et consommer du temps qui pourrait être consacré à des activités à plus haute valeur créative ou stratégique",
      "L'automatisation n'a de sens que pour les grandes équipes disposant d'un budget élevé"
    ],
    2,
    "Se concentrer sur ce qui est répétitif et standardisé garantit le meilleur retour sur le temps investi."
  ),
  textStep(
    "Automatiser avec Python — Les Bases",
    "Python est le langage le plus utilisé pour les automatisations du quotidien. Avec DeepSeek, vous décrivez ce que vous voulez automatiser et vous recevez le script complet, commenté et prêt à l'exécution."
  ),
  fillStep(
    "Créez votre premier script !",
    "Complétez le vide pour structurer un script d'organisation de fichiers.",
    '"Écrivez un script en Python que ___ automatiquement tous les fichiers du dossier ___ par ___, crée des ___ avec le nom de chaque catégorie et déplace chaque fichier vers le ___ correspondant. Ajoutez des ___ expliquant chaque partie du code."',
    ["organise", "Téléchargements", "type d'extension", "sous-dossiers", "dossier", "commentaires"],
    ["organise", "Téléchargements", "type d'extension", "sous-dossiers", "dossier", "commentaires", "fonctions", "logs", "erreurs"],
    "Des scripts simples comme celui-ci peuvent faire gagner des minutes précieuses chaque jour."
  ),
  quizStep(
    "Sécurité et Révision",
    "Que devez-vous faire après avoir reçu un script de DeepSeek ?",
    [
      "L'exécuter immédiatement en production sans révision",
      "Ignorer les commentaires explicatifs et n'utiliser que le code",
      "Lire les commentaires explicatifs, comprendre ce que fait chaque partie, tester dans un environnement sûr avec des données d'exemple et seulement ensuite l'appliquer à vos fichiers réels",
      "Les scripts générés par DeepSeek n'ont jamais besoin d'ajustements"
    ],
    2,
    "Tester et comprendre le code est fondamental pour s'assurer que l'automatisation fonctionne comme prévu sans risque."
  ),
  textStep(
    "Automatiser les E-mails et les Communications",
    "L'une des automatisations les plus impactantes pour la productivité est la gestion intelligente des e-mails : tri, réponses automatiques, notifications et transferts basés sur des règles."
  ),
  fillStep(
    "Automatisez vos e-mails !",
    "Complétez le vide pour configurer la gestion automatique des messages.",
    '"Écrivez un script qui ___ ma boîte de réception et automatiquement : ___ les e-mails avec les mots-clés ___ vers un dossier prioritaire, ___ une réponse automatique pour les e-mails de ___ et génère un ___ quotidien avec les e-mails nécessitant une action. Utilisez la bibliothèque ___ de Python."',
    ["surveille", "déplace", "urgent et important", "envoie", "demandes de devis", "résumé", "IMAP"],
    ["surveille", "déplace", "urgent et important", "envoie", "demandes de devis", "résumé", "IMAP", "SMTP", "JSON"],
    "Filtrer et prioriser les communications automatiquement réduit considérablement le bruit et le stress."
  ),
  quizStep(
    "Avantage dans la Communication",
    "Quel est le principal avantage d'automatiser le tri des e-mails avec DeepSeek ?",
    [
      "Le script lit et répond à tous les e-mails sans aucune supervision humaine",
      "Pour éliminer complètement l'utilisation de l'e-mail au quotidien",
      "Vous garantissez qu'aucun e-mail important n'est perdu dans le volume, réduisez le temps passé au tri manuel et restez concentré sur les messages qui nécessitent réellement votre attention",
      "L'automatisation des e-mails ne fonctionne qu'avec Gmail"
    ],
    2,
    "Rester concentré on ce qui compte pendant que l'IA gère le volume est le secret de la productivité."
  ),
  textStep(
    "Automatiser les Rapports et les Tableaux",
    "Générer des rapports manuellement chaque semaine est l'une des tâches les plus chronophages. DeepSeek crée des scripts qui collectent les données, calculent les indicateurs et génèrent des rapports formatés automatiquement."
  ),
  fillStep(
    "Automatisez vos rapports !",
    "Complétez le vide pour générer des documents automatiques.",
    '"Créez un script qui lit les données du tableau ___, calcule automatiquement les ___ principaux, génère un rapport en ___ avec des graphiques et des tableaux formatés et l\'___ par e-mail aux ___ tous les ___ automatiquement."',
    ["ventas_mensuales.xlsx", "indicateurs et KPIs", "PDF", "envoie", "gestionnaires de l'équipe", "lundis matin"],
    ["ventas_mensuales.xlsx", "indicateurs et KPIs", "PDF", "envoie", "gestionnaires de l'équipe", "lundis matin", "SMS", "après-midi", "CSV"],
    "Transformer automatiquement des données brutes en intelligence formatée libère du temps pour la stratégie."
  ),
  quizStep(
    "Valeur du Rapport Automatique",
    "Pourquoi l'automatisation de la génération de rapports est-elle stratégique pour les entreprises ?",
    [
      "Parce que les rapports automatiques sont toujours plus précis que les rapports manuels",
      "Pour éliminer le besoin d'analyse humaine des données",
      "Parce qu'elle libère le temps de l'équipe des tâches mécaniques de collecte et de formatage — permettant de se concentrer sur l'interprétation des données et les décisions stratégiques qui comptent vraiment",
      "L'automatisation des rapports ne fonctionne que pour les entreprises disposant de systèmes BI"
    ],
    2,
    "La valeur réside dans la décision prise à partir de la donnée, pas dans le travail manuel pour la générer."
  ),
  textStep(
    "Automatiser avec des APIs",
    "Les APIs sont des ponts entre les systèmes. Avec DeepSeek, vous apprenez à connecter différents outils — permettant aux données de circuler automatiquement entre les plateformes sans intervention manuelle."
  ),
  fillStep(
    "Connectez vos outils avec des APIs !",
    "Complétez le vide pour créer des flux intégrés entre plateformes.",
    '"Écrivez un script qui utilise l\'API de ___ pour ___ automatiquement quand ___. Les données doivent être ___ et envoyées vers ___. Incluez une ___ des erreurs pour les cas où l\'API ne répond pas et des ___ pour chaque action exécutée."',
    ["Notion", "créer une nouvelle tâche", "un formulaire Google Forms est rempli", "formatées correctement", "la base de données du projet correspondant", "gestion", "logs"],
    ["Notion", "créer uma nouvelle tâche", "un formulaire Google Forms est rempli", "formatées correctement", "la base de données du projet correspondant", "gestion", "logs", "supprimer", "alerte"],
    "Connecter des outils via API fait que votre écosystème numérique travaille comme un système unique."
  ),
  quizStep(
    "Concept d'API",
    "Qu'est-ce qu'une API et pourquoi est-elle fondamentale pour les automatisations ?",
    [
      "Une API est un type de tableau avancé pour stocker des données",
      "Les APIs ne fonctionnent que pour les développeurs ayant des années d'expérience",
      "Une API est une interface que permet à deux systèmes de communiquer et d'échanger des données automatiquement — constituant la base de presque toute automatisation connectant différents outils",
      "Les APIs n'existent que dans les outils payants et d'entreprise"
    ],
    2,
    "Les APIs sont les rouages qui permettent à l'internet et aux outils modernes de fonctionner ensemble."
  ),
  textStep(
    "Automatiser avec Make et Zapier — Sans Code",
    "Pour ceux qui ne veulent pas écrire de code, des outils comme Make et Zapier permettent de créer des automatisations visuelles. DeepSeek aide à planifier les flux, à identifier les déclencheurs et à configurer chaque étape correctement."
  ),
  fillStep(
    "Planifiez votre flux dans Make !",
    "Complétez le vide pour concevoir une automatisation no-code.",
    '"Je veux créer une automatisation dans ___ qui fonctionne ainsi : quand ___, automatiquement ___ et après ___. Décrivez étape par étape comment configurer ce flux, quels ___ utiliser, les ___ de chaque étape et où des ___ peuvent survenir."',
    ["Make", "un nouveau lead remplit mon formulaire de contact", "ajoutez-le au CRM avec les données complètes", "envoyez une séquence d'e-mails de bienvenue", "modules", "paramètres de configuration", "erreurs courantes"],
    ["Make", "un nouveau lead remplit mon formulaire de contact", "ajoutez-le au CRM avec les données complètes", "envoyez une séquence d'e-mails de bienvenue", "modules", "paramètres de configuration", "erreurs courantes", "scripts", "secondes"],
    "Les outils configurables visuellement sont des accélérateurs puissants pour les automatisations métier."
  ),
  quizStep(
    "No-Code vs Code",
    "Quand est-il plus judicieux d'utiliser Make ou Zapier plutôt que des scripts Python ?",
    [
      "Quand vous voulez des automatisations plus rapides et plus efficaces",
      "Make et Zapier génèrent toujours des résultats supérieurs à Python",
      "Quand vous avez besoin de connecter des outils populaires sans écrire de code — idéal pour les automatisations métier comme le CRM, l'e-mail marketing et la gestion de tâches qui possèdent déjà des intégrations natives",
      "Make et Zapier ne fonctionnent que pour les équipes marketing"
    ],
    2,
    "Utilisez l'outil qui offre le moins de friction pour le résultat souhaité."
  ),
  textStep(
    "Automatiser la Collecte de Données — Web Scraping",
    "Le web scraping est la technique permettant de collecter automatiquement des données sur des sites web. DeepSeek écrit des scripts de scraping complets pour surveiller les prix, collecter des informations sur les concurrents et réunir des données de marché."
  ),
  fillStep(
    "Collectez des données automatiquement !",
    "Complétez le vide pour automatiser la veille de marché.",
    '"Écrivez un script de web scraping en Python utilisant ___ qui surveille le site ___ et collecte automatiquement : ___, ___ et ___. Enregistrez les données dans un tableau ___ mis à jour quotidiennement et envoyez une ___ lorsqu\'il y a des ___ dans les données collectées."',
    ["BeautifulSoup", "de mon principal concurrent", "prix des produits", "nouveaux lancements", "avis clients", "Excel", "alerte par e-mail", "changements significatifs"],
    ["BeautifulSoup", "de mon principal concurrent", "prix des produits", "nouveaux lancements", "avis clients", "Excel", "alerte par e-mail", "changements significatifs", "alerte", "JSON"],
    "Rester informé automatiquement sur le marché est un avantage concurrentiel massif."
  ),
  quizStep(
    "Éthique du Scraping",
    "Quelle précaution éthique et légale doit être prise lors de l'utilisation du web scraping ?",
    [
      "Le web scraping est toujours illégal et ne doit jamais être utilisé",
      "N'importe quel site peut être collecté sans restriction",
      "Toujours vérifier les conditions d'utilisation du site, respecter le fichier robots.txt, ne pas surcharger les serveurs avec des requêtes excessives et utiliser les données collectées de manière éthique et légale",
      "Le web scraping n'est autorisé que pour les sites gouvernementaux"
    ],
    2,
    "Respecter les règles du site garantit que votre automatisation est légitime et ne cause pas de problèmes techniques."
  ),
  textStep(
    "Automatiser des Tâches sur Ordinateur avec Python",
    "En plus du web et des APIs, DeepSeek crée des scripts pour automatiser des tâches directes sur votre ordinateur — renommage de fichiers par lots, conversion de formats, compression d'images et bien plus encore."
  ),
  fillStep(
    "Automatisez les tâches locales !",
    "Complétez le vide pour le traitement automatique de fichiers locaux.",
    '"Écrivez un script Python qui surveille le dossier ___ et automatiquement : ___ toutes les images à ___ en conservant la qualité, ___ un préfixe avec la ___ actuelle dans le nom de chaque fichier et déplace les fichiers traités vers le dossier ___. Exécutez toutes les ___ minutes."',
    ["Images_Brutes", "compresse", "au maximum 500 Ko", "ajoute", "date", "Traités", "30"],
    ["Images_Brutes", "compresse", "au maximum 500 Ko", "ajoute", "date", "Traités", "30", "aujourd'hui", "zip"],
    "Les automatisations locales éliminent le 'travail de fourmi' lié à la gestion de fichiers individuels."
  ),
  quizStep(
    "Valeur des Scripts Locaux",
    "Pourquoi l'automatisation des tâches répétitives sur ordinateur avec des scripts locaux est-elle précieuse ?",
    [
      "Parce que les scripts locaux sont plus sûrs que les automatisations en ligne",
      "Pour éliminer complètement l'utilisation manuelle de l'ordinateur",
      "Parce que des tâches comme renommer des centaines de fichiers, convertir des formats ou organiser des dossiers consomment des minutes de manière répétée chaque semaine — et un script fait tout cela en quelques secondes, sans erreur",
      "Les scripts locaux ne fonctionnent que sur des ordinateurs sous Windows"
    ],
    2,
    "Récupérer du temps passé sur la maintenance de base des fichiers est le gain le plus rapide de l'automatisation."
  ),
  textStep(
    "Déboguer et Améliorer des Automatisations Existantes",
    "Lorsqu'une automatisation présente des erreurs ou peut être améliorée, DeepSeek analyse le code existant, identifie les problèmes et suggère des versions optimisées."
  ),
  fillStep(
    "Déboguez votre automatisation !",
    "Complétez le vide pour corriger des problèmes dans les scripts.",
    '"Voici mon script actuel : [collez le code]. Il présente le problème suivant : ___. Analysez le code, identifiez la ___ de l\'erreur, expliquez pourquoi il ___ en langage simple, corrigez-le et présentez également ___ d\'amélioration de la performance qui peuvent rendre le script ___ et plus efficace."',
    ["le script se bloque quand le fichier est vide", "cause racine", "échoue", "3 pistes", "plus rapide"],
    ["le script se bloque quand le fichier est vide", "cause racine", "échoue", "3 pistes", "plus rapide", "lent", "arrêté", "bugs"],
    "Apprendre des erreurs de code est le chemin le plus rapide vers des automatisations résilientes."
  ),
  quizStep(
    "Présenter des Erreurs",
    "Quelle est la meilleure approche pour présenter une erreur de script à DeepSeek ?",
    [
      "Dire simplement 'mon code ne fonctionne pas' sans plus de détails",
      "Demander à DeepSeek de réécrire tout le script à partir de zéro",
      "Montrer le code complet, décrire l'erreur exacte qui apparaît, expliquer dans quelle situation elle survient et demander à la fois la correction et l'explication du problème — pour apprendre et éviter la même erreur à l'avenir",
      "Les erreurs dans les scripts indiquent toujours que l'automatisation est impossible"
    ],
    2,
    "Un contexte complet permet à l'IA de résoudre le problème avec une précision chirurgicale."
  ),
  textStep(
    "Construire un Système d'Automatisations Intégrées",
    "Le niveau le plus avancé consiste à créer un écosystème d'automatisations qui communiquent entre elles — où le résultat d'une automatisation déclenche la suivante, créant des flux complètement autonomes."
  ),
  fillStep(
    "Construisez votre écosystème !",
    "Complétez le vide pour planifier des automatisations intégrées.",
    '"Je veux construire un système d\'automatisations intégrées pour ___. Le flux doit être : ___ déclenche ___ qui alimente ___ qui notifie ___. Planifiez l\'___ complète, les outils nécessaires à chaque étape et les ___ pour garantir que le système ne s\'arrête pas si une étape échoue."',
    ["mon processus de vente", "un nouveau lead dans le formulaire", "la création automatique d'une proposition personnalisée", "le CRM avec toutes les données", "l'équipe commerciale via WhatsApp", "architecture", "mécanismes de contingence"],
    ["mon processo de venda", "um novo lead no formulário", "a criação automática de proposta personalizada", "o CRM com todos os dados", "a equipe comercial via WhatsApp", "architecture", "mécanismos de contingência", "succès", "sécurité"],
    "Les écosystèmes intégrés transforment des processus isolés en une véritable machine de productivité."
  ),
  quizStep(
    "Écosystème d'Automatisation",
    "Qu'est-ce qui caractérise un écosystème d'automatisations bien construit ?",
    [
      "Le maximum d'automatisations possible connectées entre elles",
      "Des automatisations qui fonctionnent sans aucune supervision humaine pour toujours",
      "Des flux intégrés avec des points de contrôle humains aux moments critiques, des mécanismes de gestion d'erreurs et des journaux de chaque action — garantissant que le système est fiable et auditable",
      "Les écosystèmes d'automatisation ne fonctionnent que pour les entreprises technologiques"
    ],
    2,
    "La fiabilité et la transparence sont plus importantes que l'automatisation totale."
  ),
  textStep(
    "Documenter vos Automatisations avec DeepSeek",
    "Une automatisation sans documentation est un problème en attente. DeepSeek crée une documentation claire et complète pour chaque script — essentielle pour la maintenance et pour le partage avec l'équipe."
  ),
  fillStep(
    "Documentez votre automatisation !",
    "Complétez le vide pour garantir la longévité de votre automatisation.",
    '"Voici mon script : [collez le code]. Créez une ___ complète incluant : ce que le script ___, quels sont les ___ nécessaires, le pas à pas pour ___, les ___ possibles et comment les résoudre, et comment ___ le script pour de nouveaux besoins. Écrivez pour quelqu\'un qui ___ en programmation."',
    ["documentation", "fait", "prérequis", "configurer et exécuter", "erreurs courantes", "adapter", "n'y connaît rien"],
    ["documentation", "fait", "prérequis", "configurer et exécuter", "erreurs courantes", "adapter", "n'y connaît rien", "connaît", "aime"],
    "Documenter, c'est s'assurer que votre 'moi futur' et votre équipe puissent maintenir le système en marche."
  ),
  quizStep(
    "Importance de la Documentation",
    "Pourquoi documenter les automatisations est-il aussi important que de les créer ?",
    [
      "La documentation n'est qu'une formalité bureaucratique sans valeur pratique",
      "Celui qui a créé l'automatisation n'aura jamais besoin de documentation",
      "Parce que sans documentation, n'importe quel changement dans l'équipe ou le système peut rendre l'automatisation inutilisable — et une bonne documentation permet à quiconque de configurer, utiliser et adapter le script sans dépendre du créateur original",
      "La documentation n'est nécessaire que pour les scripts de plus de 100 lignes de code"
    ],
    2,
    "La connaissance enregistrée est le pouvoir de maintenance et d'échelle."
  ),
  textStep(
    "Conclusion",
    "Avec DeepSeek, les automatisations ne sont plus le territoire exclusif des développeurs expérimentés. Scripts Python pour organiser des fichiers et collecter des données, intégrations via API, flux dans Make et Zapier, rapports automatiques, tri d'e-mails et écosystèmes complets d'automatisation — tout est accessible à quiconque sait décrire ce qu'il veut automatiser.\n\nLe temps que vous investissez à créer une automatisation aujourd'hui est récupéré des centaines de fois dans les semaines et mois suivants. Chaque tâche répétitive éliminée est un espace créé pour le travail qui compte vraiment.\n\nAutomatisez le prévisible. Libérez votre temps pour ce que vous seul pouvez faire.\n\nLeçon terminée ✓"
  ),
];



