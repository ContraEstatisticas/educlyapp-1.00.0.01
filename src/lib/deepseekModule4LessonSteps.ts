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
  textStep(
    "Entendendo o que Pode ser Automatizado",
    "Antes de criar qualquer automação, o primeiro passo é identificar quais tarefas do seu dia a dia são repetitivas, previsíveis e consomem tempo sem agregar valor criativo. O DeepSeek ajuda a mapear essas oportunidades."
  ),
  fillStep(
    "Mapeie suas automações!",
    "Preencha a lacuna para identificar oportunidades de automatização.",
    '"Aqui está uma descrição das minhas ___ diárias: [descreva]. Analise e identifique quais tarefas são ___ e poderiam ser ___, estime o ___ economizado por semana em cada uma e ordene por ___ de implementação."',
    ["tarefas", "repetitivas e previsíveis", "automatizadas", "tempo", "facilidade"],
    ["tarefas", "repetitivas e previsíveis", "automatizadas", "tempo", "facilidade", "complejidade", "custo", "importância"],
    "Mapear tarefas repetitivas é o primeiro passo para uma rotina mais estratégica."
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
  textStep(
    "Automatizando E-mails e Comunicações",
    "Uma das automações mais impactantes para produtividade é a gestão inteligente de e-mails: triagem, respostas automáticas, notificações e encaminhamentos baseados em regras."
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
    "Além de web e APIs, o DeepSeek cria scripts para automatizar tarefas directas no seu computador — renomear arquivos em lote, converter formatos, comprimir imagens e muito mais."
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
    "Documenter é garantir que seu 'eu do futuro' e sua equipe consigam manter o sistema funcionando."
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
  textStep(
    "Automating Emails and Communications",
    "One of the most impactful automations for productivity is intelligent email management: screening, automatic replies, notifications, and rule-based forwarding."
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
  textStep(
    "Automating with Make and Zapier — No-Code",
    "For those who don\'t want to write code, tools like Make and Zapier allow creating visual automations. DeepSeek helps plan flows, identify triggers, and configure each step correctly."
  ),
  fillStep(
    "Plan your flow in Make!",
    "Fill in the gap to design a no-code automation.",
    '"I want to create an automation in ___ that works like this: when ___, automatically ___ and then ___. Describe step-by-step how to configure this flow, which ___ to use, the ___ of each stage, and where ___ might occur."',
    ["Make", "a new lead fills my contact form", "add to CRM with complete data", "send a welcome email sequence", "modules", "configuration parameters", "common errors"],
    ["Make", "a new lead fills my contact form", "add to CRM with complete data", "send a welcome email sequence", "modules", "configuration parameters", "common errors", "scripts", "seconds"],
    "Visually configurable tools are powerful accelerators for business automation."
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
      "Always check the site\'s terms of use, respect the robots.txt file, don\'t overload servers with excessive requests, and use collected data ethically and legally",
      "Web scraping is only allowed for government sites"
    ],
    2,
    "Respecting site rules ensures your automation is legitimate and doesn\'t cause technical issues."
  ),
  textStep(
    "Automating Computer Tasks with Python",
    "Beyond web and APIs, DeepSeek creates scripts to automate direct tasks on your computer — batch renaming files, converting formats, compressing images, and much more."
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
  textStep(
    "Documenting Your Automations with DeepSeek",
    "An undocumented automation is a problem waiting to happen. DeepSeek creates clear and complete documentation for each script — essential for maintenance and for sharing with the team."
  ),
  fillStep(
    "Document your automation!",
    "Fill in the gap to ensure your automation\'s longevity.",
    '"Here is my script: [paste code]. Create a complete ___ that includes: what the script ___, what are the required ___, step-by-step how to ___, possible ___ and how to fix them, and how to ___ the script for new needs. Write for someone who ___ about programming."',
    ["documentation", "does", "prerequisites", "configure and run", "common errors", "adapt", "knows nothing"],
    ["documentation", "does", "prerequisites", "configure and run", "common errors", "adapt", "knows nothing", "knows", "loves"],
    "Documenting ensures that your \'future self\' and your team can keep the system running."
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
  textStep(
    "Entendiendo lo que se Puede Automatizar",
    "Antes de crear cualquier automatización, el primer paso es identificar qué tareas de tu día a día son repetitivas, previsibles y consumen tiempo sin agregar valor creativo. DeepSeek ayuda a mapear estas oportunidades."
  ),
  fillStep(
    "¡Mapea tus automatizaciones!",
    "Completa el espacio para identificar oportunidades de automatización.",
    '"Aquí hay una descripción de mis ___ diarias: [describe]. Analiza e identifica qué tareas son ___ e podrían ser ___, estima el ___ ahorrado por semana en cada una y ordena por ___ de implementación."',
    ["tareas", "repetitivas y previsibles", "automatizadas", "tiempo", "facilidad"],
    ["tareas", "repetitivas y previsibles", "automatizadas", "tiempo", "facilidad", "complejidad", "costo", "importancia"],
    "Mapear tareas repetitivas é o primeiro passo para uma rotina mais estratégica."
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
  textStep(
    "Automatizando Correos Electrónicos y Comunicaciones",
    "Una de las automatizaciones más impactantes para la productividad es la gestión inteligente de correos electrónicos: clasificación, respuestas automáticas, notificaciones y reenvíos basados en reglas."
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
  textStep(
    "Automatizando con APIs",
    "Las APIs son puentes entre sistemas. Con DeepSeek, aprendes a conectar diferentes herramientas — haciendo que los datos fluyan automáticamente entre plataformas sin intervención manual."
  ),
  fillStep(
    "¡Conecta herramientas con APIs!",
    "Completa el espacio para crear flujos integrados entre plataformas.",
    '"Escribe un script que use la API de ___ para ___ automáticamente cuando ___. Los datos deben estar ___ y enviarse a ___. Incluye ___ de errores para cuando la API no responda y ___ de cada acción ejecutada."',
    ["Notion", "crear una nueva tarea", "se complete un formulario de Google Forms", "formateados correctamente", "la base de datos do projeto correspondiente", "manejo", "registros"],
    ["Notion", "crear uma nova tarefa", "se complete um formulário do Google Forms", "formatados corretamente", "la base de datos do projeto correspondiente", "manejo", "registros", "borrar", "alerta"],
    "Conectar herramientas vía API hace que tu ecosistema digital funcione como un solo sistema."
  ),
  textStep(
    "Automatizando con Make y Zapier — Sin Código",
    "Para quienes no quieren escribir código, herramientas como Make y Zapier permiten crear automatizaciones visuales. DeepSeek ayuda a planificar los flujos, identificar los disparadores y configurar cada etapa correctamente."
  ),
  fillStep(
    "¡Planifica tu flujo en Make!",
    "Completa el espacio para diseñar una automatización no-code.",
    '"Quiero crear una automatización en ___ que funcione así: cuando ___, automáticamente ___ y luego ___. Describe paso a paso cómo configurar este flujo, qué ___ usar, los ___ de cada etapa y dónde pueden ocurrir ___."',
    ["Make", "un nuevo lead complete mi formulario de contacto", "agrega al CRM con los datos completos", "envía una secuencia de correos de bienvenida", "módulos", "parâmetros de configuración", "errores comunes"],
    ["Make", "un novo lead no formulário", "a criação automática de proposta personalizada", "o CRM com todos os dados", "a equipe comercial via WhatsApp", "módulos", "parâmetros de configuração", "segurança", "erros"],
    "Las herramientas configurables visualmente son aceleradores potentes para las automatizaciones de negocios."
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
  textStep(
    "Depurando y Mejorando Automatizaciones Existentes",
    "Cuando una automatización presenta errores o puede mejorarse, DeepSeek analiza el código existente, identifica los problemas y sugiere versiones optimizadas."
  ),
  fillStep(
    "¡Depura tu automatización!",
    "Completa el espacio para corregir problemas en scripts.",
    '"Aquí está mi script actual: [pegar código]. Presenta el siguiente problema: ___. Analiza el código, identifica la ___ del error, explica por qué se está ___ en lenguaje sencillo, corrige y presenta también ___ de rendimiento que pueden hacer que el script sea ___ e más eficiente."',
    ["el script se cuelga cuando el archivo está vacío", "causa raíz", "rompiendo", "3 mejoras", "más rápido"],
    ["el script se cuelga quando o arquivo está vazio", "causa raíz", "rompiendo", "3 melhorias", "mais rápido", "lento", "parado", "bugs"],
    "Aprender de los errores del código es el camino más rápido hacia automatizaciones resilientes."
  ),
  textStep(
    "Construyendo un Sistema de Automatizaciones Integradas",
    "El nivel más avanzado es crear un ecosistema de automatizaciones que se comunican entre sí — donde el resultado de una automatización dispara la siguiente, creando flujos completamente autónomos."
  ),
  fillStep(
    "¡Construye tu ecosistema!",
    "Completa el espacio para planificar automatizaciones integradas.",
    '"Quiero construir un sistema de automatizaciones integradas para ___. El flujo debe ser: ___ dispara ___ que alimenta ___ que notifica ___. Planifica la ___ completa, las herramientas necesarias en cada etapa y los ___ para garantizar que el sistema no se rompa si falla una etapa."',
    ["mi proceso de ventas", "un nuevo lead en el formulario", "la creación automática de una propuesta personalizada", "el CRM con todos os dados", "al equipo comercial vía WhatsApp", "arquitectura", "mecanismos de contingencia"],
    ["mi proceso de ventas", "un novo lead no formulário", "a criação automática de proposta personalizada", "o CRM com todos os dados", "a equipe comercial via WhatsApp", "arquitectura", "mecanismos de contingência", "éxito", "seguridad"],
    "Los ecosistemas integrados transforman procesos aislados en una verdadera máquina de productividad."
  ),
  textStep(
    "Documentando tus Automatizaciones con DeepSeek",
    "Una automatización sin documentación es un problema esperando a suceder. DeepSeek crea una documentación clara e completa para cada script — esencial para el mantenimiento y para compartir con el equipo."
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
  textStep(
    "Comprendre ce qui Peut Être Automatisé",
    "Avant de créer une automatisation, la première étape est d'identifier quelles tâches de votre quotidien sont répétitives, prévisibles et chronophages sans apporter de valeur créative. DeepSeek vous aide à cartographier ces opportunités."
  ),
  fillStep(
    "Cartographiez vos automatisations !",
    "Complétez le vide pour identifier les opportunités d'automatisation.",
    '"Voici une description de mes ___ quotidiennes : [décrivez]. Analysez et identifiez quelles tâches sont ___ et pourraient être ___, estimez le ___ économisé par semaine pour chacune et organisez-les par ___ de mise en œuvre."',
    ["tâches", "répétitives et prévisibles", "automatisées", "temps", "facilité"],
    ["tâches", "répétitives et prévisibles", "automatisées", "temps", "facilidade", "complexité", "coût", "importance"],
    "Cartographier les tâches répétitives est la première étape vers une routine plus stratégique."
  ),
  textStep(
    "Automatiser avec Python — Les Bases",
    "Python est le langage le plus utilisé pour les automatisations du quotidien. Avec DeepSeek, vous décrivez ce que vous voulez automatiser et vous recevez le script complet, commenté et prêt à l'exécution."
  ),
  fillStep(
    "Créez votre premier script!",
    "Complétez le vide pour structurer un script d'organisation de fichiers.",
    '"Écrivez un script en Python que ___ automatiquement tous les fichiers du dossier ___ par ___, crée des ___ avec le nom de chaque catégorie et déplace chaque fichier vers le ___ correspondant. Ajoutez des ___ expliquant chaque partie du code."',
    ["organise", "Téléchargements", "type d'extension", "sous-dossiers", "dossier", "commentaires"],
    ["organise", "Téléchargements", "type d'extension", "sous-dossiers", "dossier", "commentaires", "fonctions", "logs", "erreurs"],
    "Des scripts simples comme celui-ci peuvent faire gagner des minutes précieuses chaque jour."
  ),
  textStep(
    "Automatiser les E-mails et les Communications",
    "L'une des automatisations les plus impactantes pour la productivité est la gestion intelligente des e-mails : tri, réponses automatiques, notifications et transferts basés sur des règles."
  ),
  textStep(
    "Automatiser les Rapports et les Tableaux",
    "Générer des rapports manuellement chaque semaine est l'une des tâches les plus chronophages. DeepSeek crée des scripts qui collectent les données, calculent les indicateurs et génèrent des rapports formatés automatiquement."
  ),
  fillStep(
    "Automatisez vos rapports !",
    "Complétez le vide pour générer des documents automatiques.",
    '"Créez un script qui lit les données du tableau ___, calcule automatiquement les ___ principaux, génère un rapport en ___ avec des graphiques et des tableaux formatés et l\'___ par e-mail aux ___ tous les ___ automatiquement."',
    ["ventas_mensuales.xlsx", "indicateurs et KPIs", "PDF", "envie", "los gerentes do equipo", "segundas pela manhã"],
    ["ventas_mensuales.xlsx", "indicateurs et KPIs", "PDF", "envie", "los gerentes do equipo", "segundas pela manhã", "SMS", "tarde", "CSV"],
    "Transformer automatiquement des données brutes en intelligence formatée libère du temps pour la stratégie."
  ),
  textStep(
    "Automatiser avec des APIs",
    "Les APIs sont des ponts entre les systèmes. Avec DeepSeek, vous apprenez à connecter différents outils — permettant aux données de circuler automatiquement entre les plateformes sans intervention manuelle."
  ),
  fillStep(
    "Connectez vos outils avec des APIs !",
    "Complétez le vide pour créer des flux intégrés entre plateformes.",
    '"Écrivez un script qui utilise l\'API de ___ pour ___ automatiquement quand ___. Les données doivent être ___ et envoyées vers ___. Incluez une ___ des erreurs pour les cas où l\'API ne répond pas et des ___ pour chaque action exécutée."',
    ["Notion", "créer uma nova tarefa", "um formulário do Google Forms for preenchido", "formatadas corretamente", "a base de dados do projeto correspondente", "gestão", "logs"],
    ["Notion", "créer uma nova tarefa", "um formulário do Google Forms for preenchido", "formatadas corretamente", "a base de dados do projeto correspondente", "gestão", "logs", "supprimer", "alerte"],
    "Connecter des outils via API fait que votre écosystème numérique travaille comme un système unique."
  ),
  textStep(
    "Automatiser avec Make et Zapier — Sans Code",
    "Pour ceux qui ne veulent pas écrire de code, des outils comme Make et Zapier permettent de créer des automatisations visuelles. DeepSeek aide à planifier les flux, à identifier les déclencheurs et à configurer chaque étape correctement."
  ),
  fillStep(
    "Planifiez votre flux dans Make !",
    "Complétez le vide pour concevoir une automatisation no-code.",
    '"Je veux créer une automatisation dans ___ qui fonctionne ainsi : quand ___, automatiquement ___ et après ___. Décrivez étape par étape comment configurer ce flux, quels ___ utiliser, les ___ de chaque étape et où des ___ peuvent survenir."',
    ["Make", "um novo lead no formulário", "a criação automática de proposta personalizada", "o CRM com todos os dados", "a equipe comercial via WhatsApp", "módulos", "paramètres de configuration", "erreurs courantes"],
    ["Make", "um novo lead no formulário", "a criação automática de proposta personalizada", "o CRM com todos os dados", "a equipe comercial via WhatsApp", "módulos", "paramètres de configuration", "erreurs courantes", "scripts", "secondes"],
    "Les outils configurables visuellement sont des accélérateurs puissants pour les automatisations métier."
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
  textStep(
    "Déboguer et Améliorer des Automatisations Existantes",
    "Lorsqu'une automatisation présente des erreurs ou peut être améliorée, DeepSeek analyse le code existant, identifies les problèmes et suggère des versions optimisées."
  ),
  fillStep(
    "Déboguez votre automatisation !",
    "Complétez le vide pour corriger des problèmes dans les scripts.",
    '"Voici mon script actuel : [collez le code]. Il présente le problème suivant : ___. Analysez le code, identifiez la ___ de l\'erreur, expliquez pourquoi il ___ en langage simple, corrigez-le et présentez également ___ d\'amélioration de la performance qui peuvent rendre le script ___ et plus efficace."',
    ["le script se bloque quand le fichier est vide", "cause racine", "échoue", "3 pistes", "plus rapide"],
    ["le script se bloque quando o arquivo está vazio", "causa racine", "échoue", "3 melhorias", "mais rápido", "lent", "arrêté", "bugs"],
    "Apprendre des erreurs de code est le chemin le plus rapide vers des automatisations résilientes."
  ),
  textStep(
    "Construire un Système d'Automatisations Intégrées",
    "Le niveau le plus avancé consiste à créer un écosystème d'automatisations qui communiquent entre elles — où le résultat d'une automatisation déclenche la suivante, créant des flux complètement autonomes."
  ),
  fillStep(
    "Construisez votre écosystème !",
    "Complétez le vide pour planifier des automatisations intégrées.",
    '"Je veux construire un système d\'automatisations intégrées pour ___. Le flux doit être : ___ déclenche ___ qui alimente ___ qui notifie ___. Planifiez l\'___ complète, les outils nécessaires à chaque étape et les ___ pour garantir que le système ne s\'arrête pas si une étape échoue."',
    ["mon processo de venda", "un nouveau lead dans le formulaire", "la création automatique d'une proposition personnalisée", "o CRM com todos os dados", "l'équipe commerciale via WhatsApp", "architecture", "mécanismes de contingence"],
    ["mon processo de venda", "um novo lead no formulário", "a criação automática de proposta personalizada", "o CRM com todos os dados", "a equipe comercial via WhatsApp", "architecture", "mécanismos de contingência", "succès", "sécurité"],
    "Les écosystèmes intégrés transforment des processus isolés en une véritable machine de productivité."
  ),
  textStep(
    "Documenter vos Automatisations avec DeepSeek",
    "Une automatisation sans documentation est un problème en attente. DeepSeek crée une documentation claire et complète pour chaque script — essentielle pour la maintenance et pour le partage avec l'équipe."
  ),
  textStep(
    "Conclusion",
    "Avec DeepSeek, les automatisations ne sont plus le territoire exclusif des développeurs expérimentés. Scripts Python pour organiser des fichiers et collecter des données, intégrations via API, flux dans Make et Zapier, rapports automatiques, tri d'e-mails et écosystèmes complets d'automatisation — tout est accessible à quiconque sait décrire ce qu'il veut automatiser.\n\nLe temps que vous investissez à créer une automatisation aujourd'hui est récupéré des centaines de fois dans les semaines et mois suivants. Chaque tâche répétitive éliminée est un espace créé pour le travail qui compte vraiment.\n\nAutomatisez le prévisible. Libérez votre temps pour ce que vous seul pouvez faire.\n\nLeçon terminée ✓"
  ),
];
