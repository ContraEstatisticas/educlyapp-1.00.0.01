const textStep = (title: string, content: string, promptBox?: string) => ({
  type: "text" as const,
  title,
  content,
  ...(promptBox ? { promptBox } : {}),
});

const quizStep = (
  title: string,
  question: string,
  options: string[],
  correctIndex: number,
  explanation: string,
) => ({
  type: "quiz" as const,
  title,
  question,
  options,
  correctIndex,
  explanation,
});

const fillStep = (
  title: string,
  instruction: string,
  sentence: string,
  answers: string[],
  options: string[],
  explanation: string,
) => ({
  type: "fill_blanks" as const,
  title,
  instruction,
  sentence,
  answers,
  options,
  explanation,
});

export const CLAUDE_MODULE_7_STEPS_PT = [
  textStep(
    "Claude com Outras Ferramentas - Expandindo suas Possibilidades",
    "Bem-vindo de volta! Nesta licao, voce vai descobrir como o Claude pode trabalhar junto com outras ferramentas do seu dia a dia para aumentar produtividade, automatizar etapas e criar fluxos de trabalho mais inteligentes."
  ),
  textStep(
    "Claude Nao Trabalha Sozinho",
    "O Claude ja e poderoso por si so, mas quando combinado com outras ferramentas ele vira o centro de um sistema completo de trabalho inteligente. Planilhas, documentos, gerenciadores de tarefas, ferramentas de design e muito mais podem se beneficiar do raciocinio e da organizacao que ele oferece."
  ),
  quizStep(
    "Por que integrar ferramentas",
    "Por que combinar o Claude com outras ferramentas potencializa os resultados?",
    [
      "Porque cada ferramenta tem um ponto forte, e o Claude conecta, organiza e processa o que cada uma produz.",
      "Porque o Claude funciona melhor quando e substituido por outras ferramentas.",
      "Porque integrar ferramentas torna o processo mais lento e complicado.",
      "Porque o Claude so funciona bem de forma isolada."
    ],
    0,
    "O maior ganho esta em usar o Claude como centro de raciocinio enquanto outras ferramentas executam partes especificas do trabalho."
  ),
  textStep(
    "Claude com Google Docs e Word",
    "Um fluxo muito comum e usar o Claude para escrever, estruturar e revisar conteudo, depois levar o resultado para o Google Docs ou Word para formatacao final, colaboracao e compartilhamento."
  ),
  fillStep(
    "Preencha a lacuna - Estruture para Docs!",
    "Monte um prompt para criar um texto pronto para copiar em um editor de documentos.",
    "\"Escreva um conteudo completo sobre ___ com ___ bem definidas e ___ organizada para que eu possa copiar diretamente para o Google Docs.\"",
    ["tema", "secoes", "formatacao"],
    [
      "tema",
      "secoes",
      "formatacao",
      "piadas",
      "improvisos",
      "desorganizacao"
    ],
    "Quando voce pede estrutura e organizacao desde o inicio, o trabalho no Docs ou Word fica muito mais rapido."
  ),
  quizStep(
    "Claude e Google Docs",
    "Qual e a melhor forma de usar o Claude em conjunto com o Google Docs?",
    [
      "Escrever tudo no Google Docs e depois pedir ao Claude para ler.",
      "Usar o Claude apenas para corrigir erros de portugues.",
      "Usar o Claude para estruturar e redigir o conteudo e o Google Docs para formatar, colaborar e compartilhar o resultado final.",
      "Substituir completamente o Google Docs pelo Claude."
    ],
    2,
    "O Claude ajuda mais na criacao e estruturacao; o editor continua forte em formatacao, colaboracao e distribuicao."
  ),
  textStep(
    "Claude com Planilhas - Google Sheets e Excel",
    "O Claude nao acessa planilhas diretamente, mas voce pode colar os dados na conversa e pedir analises, formulas, interpretacoes e sugestoes. Isso acelera muito a leitura de numeros e padroes."
  ),
  fillStep(
    "Preencha a lacuna - Analise dados da planilha!",
    "Monte um prompt para extrair tendencia, alertas e formula.",
    "\"Aqui estao os dados da minha planilha: [cole os dados]. Analise e me diga qual e ___, quais numeros ___ e me de a formula para calcular ___.\"",
    [
      "a principal tendencia",
      "merecem atencao",
      "objetivo"
    ],
    [
      "a principal tendencia",
      "merecem atencao",
      "objetivo",
      "uma historia aleatoria",
      "podem ser ignorados",
      "nada"
    ],
    "Esse tipo de pedido transforma uma tabela crua em leitura pratica e acao."
  ),
  quizStep(
    "Claude com numeros",
    "O que o Claude consegue fazer com dados de planilhas?",
    [
      "Editar a planilha diretamente.",
      "Criar graficos automaticamente.",
      "Analisar dados, identificar padroes e sugerir formulas.",
      "Nao consegue trabalhar com numeros."
    ],
    2,
    "Mesmo sem editar a planilha por voce, o Claude pode interpretar os dados e ajudar com logica, formulas e tendencias."
  ),
  textStep(
    "Claude com Ferramentas de Gestao de Tarefas",
    "Notion, Trello e Asana funcionam melhor quando voce chega com um projeto minimamente pensado. O Claude ajuda a estruturar etapas, subtarefas, prazos e prioridades antes mesmo de abrir a ferramenta."
  ),
  fillStep(
    "Preencha a lacuna - Estruture seu projeto!",
    "Monte um prompt para preparar um projeto antes de levar para o gestor de tarefas.",
    "\"Crie a estrutura de um projeto para ___, com ___, ___, ___ e ___.\"",
    [
      "objetivo",
      "etapas principais",
      "subtarefas",
      "prazos",
      "prioridades"
    ],
    [
      "objetivo",
      "etapas principais",
      "subtarefas",
      "prazos",
      "prioridades",
      "caos",
      "aleatoriedade",
      "nenhum plano"
    ],
    "Chegar com a estrutura pronta evita comecar do zero e melhora muito a execucao dentro da ferramenta."
  ),
  quizStep(
    "Vantagem do planejamento previo",
    "Qual e a vantagem dessa abordagem?",
    [
      "Evitar usar ferramentas de gestao.",
      "Substituir essas ferramentas.",
      "Chegar na ferramenta com tudo estruturado, sem comecar do zero.",
      "Ferramentas funcionam melhor sem planejamento."
    ],
    2,
    "O Claude prepara o raciocinio e a organizacao; a ferramenta de gestao entra para acompanhar execucao e colaboracao."
  ),
  textStep(
    "Claude com Ferramentas de Apresentacao",
    "PowerPoint, Google Slides e Canva ficam mais faceis quando o Claude organiza a narrativa da apresentacao, define a sequencia e sugere o que falar em cada etapa."
  ),
  fillStep(
    "Preencha a lacuna - Monte sua apresentacao!",
    "Crie um prompt para estruturar slides com clareza.",
    "\"Crie uma apresentacao sobre ___ com ___ slides. Para cada slide, inclua ___, ___ e ___.\"",
    [
      "tema",
      "numero",
      "titulo",
      "pontos principais",
      "o que devo falar"
    ],
    [
      "tema",
      "numero",
      "titulo",
      "pontos principais",
      "o que devo falar",
      "desordem",
      "silencio"
    ],
    "Esse formato transforma o Claude em um planejador de apresentacoes, deixando a montagem visual para a ferramenta."
  ),
  quizStep(
    "O que ele nao faz direto",
    "O que o Claude nao faz diretamente em ferramentas de apresentacao?",
    [
      "Estruturar o conteudo.",
      "Sugerir a sequencia.",
      "Inserir automaticamente no PowerPoint ou Slides.",
      "Criar logica de apresentacao."
    ],
    2,
    "O Claude monta o raciocinio e o conteudo, mas a insercao automatica na ferramenta nao acontece por padrao."
  ),
  textStep(
    "Claude com Ferramentas de E-mail",
    "No Gmail ou Outlook, o Claude ajuda a redigir mensagens com tom adequado, clareza e objetivo definidos. Isso vale tanto para emails formais quanto para respostas curtas do dia a dia."
  ),
  fillStep(
    "Preencha a lacuna - Redija o e-mail!",
    "Monte um prompt para escrever mensagens com objetivo e tom claros.",
    "\"Escreva um e-mail para ___, com tom ___ e objetivo ___. Seja claro e direto.\"",
    ["situacao", "tom", "objetivo"],
    [
      "situacao",
      "tom",
      "objetivo",
      "confusao",
      "vago",
      "nenhum foco"
    ],
    "Definir situacao, tom e objetivo ajuda o Claude a escrever emails mais uteis e mais proximos do que voce realmente precisa enviar."
  ),
  quizStep(
    "Uso pratico no dia a dia",
    "Qual e a melhor forma de usar o Claude com ferramentas de e-mail no dia a dia?",
    [
      "Deixar o Claude enviar automaticamente.",
      "Usar apenas para e-mails longos.",
      "Usar para escrever e ajustar o tom antes de enviar.",
      "Funciona apenas para e-mails formais."
    ],
    2,
    "O melhor uso esta em ganhar velocidade e ajustar a mensagem antes do envio final por voce."
  ),
  textStep(
    "Claude com Ferramentas de Design - Canva e Figma",
    "O Claude nao cria o design final dentro do Canva ou do Figma, mas pode montar todo o briefing: textos, estrutura, hierarquia visual e sugestoes de elementos. Isso reduz muito a paralisia da tela em branco."
  ),
  fillStep(
    "Preencha a lacuna - Monte o briefing do design!",
    "Crie um prompt para entrar na ferramenta com direcao clara.",
    "\"Crie um briefing para um design sobre ___, incluindo ___, ___ e ___.\"",
    [
      "tema",
      "textos",
      "estrutura visual",
      "sugestoes de elementos"
    ],
    [
      "tema",
      "textos",
      "estrutura visual",
      "sugestoes de elementos",
      "confusao",
      "achismos",
      "vazio"
    ],
    "Com um briefing claro, voce entra no Canva ou Figma ja sabendo o que montar e em que ordem pensar."
  ),
  quizStep(
    "Direcao antes da ferramenta",
    "Por que isso melhora o resultado?",
    [
      "Porque o Claude cria o design automaticamente.",
      "Para evitar usar ferramentas de design.",
      "Porque voce entra na ferramenta com direcao clara.",
      "So funciona para designers."
    ],
    2,
    "A principal vantagem e reduzir indecisao e ganhar clareza antes da execucao visual."
  ),
  textStep(
    "Claude com Ferramentas de Transcricao e Audio",
    "Depois de transcrever uma reuniao, aula ou conversa, o Claude pode transformar esse material em decisao, resumo e lista de proximos passos. Isso encurta muito o tempo entre ouvir algo e agir."
  ),
  fillStep(
    "Preencha a lacuna - Transforme transcricao em acao!",
    "Monte um prompt para extrair o que importa de uma transcricao.",
    "\"Aqui esta a transcricao: [cole]. Extraia ___, ___ e ___ com responsaveis.\"",
    [
      "decisoes",
      "pontos importantes",
      "proximos passos"
    ],
    [
      "decisoes",
      "pontos importantes",
      "proximos passos",
      "frases bonitas",
      "comentarios irrelevantes",
      "ruido"
    ],
    "Esse fluxo transforma uma conversa longa em uma lista objetiva de acompanhamento."
  ),
  quizStep(
    "Fluxo mais eficiente",
    "Qual e o fluxo mais eficiente com ferramentas de transcricao e audio?",
    [
      "Escrever tudo manualmente.",
      "Pedir para o Claude participar da reuniao.",
      "Transcrever e depois analisar com o Claude.",
      "Resumir de memoria."
    ],
    2,
    "Separar captura e analise torna o processo mais confiavel e mais rapido."
  ),
  textStep(
    "Montando Seu Ecossistema de Ferramentas",
    "O Claude funciona como um cerebro central, enquanto as outras ferramentas executam. Quando voce entende o papel de cada uma, monta um fluxo mais inteligente e evita desperdicio de energia em tarefas repetitivas."
  ),
  fillStep(
    "Preencha a lacuna - Monte seu ecossistema!",
    "Peca uma sugestao de fluxo usando Claude com outras ferramentas.",
    "\"Quero montar um fluxo de trabalho com Claude e ___. Me sugira como integrar no meu ___.\"",
    ["ferramentas", "dia a dia"],
    [
      "ferramentas",
      "dia a dia",
      "nada",
      "caos"
    ],
    "Quando voce pede integracao pratica no cotidiano, o Claude ajuda a desenhar um sistema utilizavel, nao apenas uma ideia abstrata."
  ),
  quizStep(
    "Papel do Claude no ecossistema",
    "Qual afirmacao descreve melhor o papel do Claude nesse ecossistema?",
    [
      "Substitui todas as ferramentas.",
      "So deve ser usado em ultimo caso.",
      "Atua como centro de raciocinio e criacao.",
      "Funciona melhor isolado."
    ],
    2,
    "O Claude gera raciocinio, estrutura e direcao; as outras ferramentas entram para executar e operacionalizar."
  ),
  textStep(
    "Conclusao",
    "O Claude sozinho ja e poderoso. Combinado com as ferramentas certas, ele se torna o centro de um sistema de trabalho completo, em que voce pensa menos no como e mais no que quer alcancar. Documentos, planilhas, apresentacoes, e-mails e design fluem melhor quando ele esta no meio do processo.\n\nLicao concluida."
  ),
] as const;

export const CLAUDE_MODULE_7_STEPS_EN = [
  textStep(
    "Claude with Other Tools - Expanding What You Can Do",
    "Welcome back! In this lesson, you will discover how Claude can work together with other tools you already use to increase productivity, automate steps, and build smarter workflows."
  ),
  textStep(
    "Claude Does Not Work Alone",
    "Claude is already powerful on its own, but when combined with other tools it becomes the center of a complete intelligent work system. Spreadsheets, documents, task managers, design tools, and more can all benefit from Claude's reasoning and organization."
  ),
  quizStep(
    "Why combine tools",
    "Why does combining Claude with other tools improve the results?",
    [
      "Because each tool has its own strength, and Claude connects, organizes, and processes what each one produces.",
      "Because Claude works best when replaced by other tools.",
      "Because integrating tools makes the process slower and more complicated.",
      "Because Claude only works well in isolation."
    ],
    0,
    "The real gain comes from using Claude as a reasoning hub while other tools handle specialized execution."
  ),
  textStep(
    "Claude with Google Docs and Word",
    "A common workflow is to use Claude to write, structure, and revise content, then move the result into Google Docs or Word for final formatting, collaboration, and sharing."
  ),
  fillStep(
    "Fill in the blank - Structure for Docs!",
    "Build a prompt for content that is ready to paste into a document editor.",
    "\"Write a complete piece of content about ___ with well-defined ___ and organized ___ so I can copy it directly into Google Docs.\"",
    ["topic", "sections", "formatting"],
    [
      "topic",
      "sections",
      "formatting",
      "jokes",
      "improvisation",
      "disorder"
    ],
    "When you ask for structure and organization from the start, the work inside Docs or Word becomes much faster."
  ),
  quizStep(
    "Claude and Google Docs",
    "What is the best way to use Claude together with Google Docs?",
    [
      "Write everything in Google Docs and only then ask Claude to read it.",
      "Use Claude only to fix grammar mistakes.",
      "Use Claude to structure and draft the content, and use Google Docs to format, collaborate on, and share the final result.",
      "Completely replace Google Docs with Claude."
    ],
    2,
    "Claude is strongest in creation and structuring; the editor remains strong for formatting, collaboration, and distribution."
  ),
  textStep(
    "Claude with Spreadsheets - Google Sheets and Excel",
    "Claude does not access spreadsheets directly, but you can paste the data into the conversation and ask for analysis, formulas, interpretations, and suggestions. That makes it much easier to understand numbers and patterns."
  ),
  fillStep(
    "Fill in the blank - Analyze spreadsheet data!",
    "Build a prompt to extract a trend, warnings, and a formula.",
    "\"Here is the data from my spreadsheet: [paste the data]. Analyze it and tell me what ___ is, which numbers ___, and give me the formula to calculate ___.\"",
    [
      "the main trend",
      "deserve attention",
      "goal"
    ],
    [
      "the main trend",
      "deserve attention",
      "goal",
      "a random story",
      "can be ignored",
      "nothing"
    ],
    "This kind of request turns a raw table into a practical reading and a useful next step."
  ),
  quizStep(
    "Claude with numbers",
    "What can Claude do with spreadsheet data?",
    [
      "Edit the spreadsheet directly.",
      "Create charts automatically.",
      "Analyze data, identify patterns, and suggest formulas.",
      "It cannot work with numbers."
    ],
    2,
    "Even without editing the sheet for you, Claude can interpret the data and help with formulas, logic, and trends."
  ),
  textStep(
    "Claude with Task Management Tools",
    "Notion, Trello, and Asana work better when you arrive with a project already thought through. Claude helps structure main stages, subtasks, deadlines, and priorities before you even open the tool."
  ),
  fillStep(
    "Fill in the blank - Structure your project!",
    "Build a prompt to prepare a project before moving it into a task manager.",
    "\"Create the structure of a project for ___, with ___, ___, ___, and ___.\"",
    [
      "goal",
      "main stages",
      "subtasks",
      "deadlines",
      "priorities"
    ],
    [
      "goal",
      "main stages",
      "subtasks",
      "deadlines",
      "priorities",
      "chaos",
      "randomness",
      "no plan"
    ],
    "Arriving with the structure ready keeps you from starting from zero and improves execution inside the tool."
  ),
  quizStep(
    "Benefit of planning first",
    "What is the advantage of this approach?",
    [
      "Avoiding task management tools.",
      "Replacing those tools.",
      "Getting into the tool with everything structured instead of starting from zero.",
      "Tools work better without planning."
    ],
    2,
    "Claude prepares the reasoning and structure; the task tool takes over for execution tracking and collaboration."
  ),
  textStep(
    "Claude with Presentation Tools",
    "PowerPoint, Google Slides, and Canva become easier when Claude organizes the presentation logic, defines the sequence, and suggests what to say in each part."
  ),
  fillStep(
    "Fill in the blank - Build your presentation!",
    "Create a prompt to structure slides clearly.",
    "\"Create a presentation about ___ with ___ slides. For each slide, include ___, ___, and ___.\"",
    [
      "topic",
      "number",
      "title",
      "main points",
      "what I should say"
    ],
    [
      "topic",
      "number",
      "title",
      "main points",
      "what I should say",
      "disorder",
      "silence"
    ],
    "This turns Claude into a presentation planner while the visual assembly stays in the presentation tool."
  ),
  quizStep(
    "What it does not do directly",
    "What does Claude not do directly in presentation tools?",
    [
      "Structure the content.",
      "Suggest the sequence.",
      "Automatically insert it into PowerPoint or Slides.",
      "Create presentation logic."
    ],
    2,
    "Claude can build the reasoning and content, but automatic insertion into the tool does not happen by default."
  ),
  textStep(
    "Claude with Email Tools",
    "In Gmail or Outlook, Claude helps you draft messages with the right tone, clear structure, and a defined objective. That is useful for both formal emails and shorter everyday replies."
  ),
  fillStep(
    "Fill in the blank - Draft the email!",
    "Build a prompt for messages with a clear goal and tone.",
    "\"Write an email for ___, with a ___ tone and the objective of ___. Be clear and direct.\"",
    ["situation", "tone", "goal"],
    [
      "situation",
      "tone",
      "goal",
      "confusion",
      "vague",
      "no focus"
    ],
    "Defining the situation, tone, and objective helps Claude write emails that are much closer to what you actually need to send."
  ),
  quizStep(
    "Practical daily use",
    "What is the best day-to-day way to use Claude with email tools?",
    [
      "Let Claude send the email automatically.",
      "Use it only for long emails.",
      "Use it to write and adjust the tone before sending.",
      "It only works for formal emails."
    ],
    2,
    "The best use is to gain speed and improve the message before you send it yourself."
  ),
  textStep(
    "Claude with Design Tools - Canva and Figma",
    "Claude does not build the final design inside Canva or Figma, but it can create the full briefing: texts, structure, visual hierarchy, and suggested elements. That greatly reduces blank-page paralysis."
  ),
  fillStep(
    "Fill in the blank - Build the design brief!",
    "Create a prompt so you enter the design tool with clear direction.",
    "\"Create a design brief about ___, including ___, ___, and ___.\"",
    [
      "topic",
      "texts",
      "visual structure",
      "element suggestions"
    ],
    [
      "topic",
      "texts",
      "visual structure",
      "element suggestions",
      "confusion",
      "guesswork",
      "emptiness"
    ],
    "With a clear brief, you enter Canva or Figma already knowing what to build and how to think through it."
  ),
  quizStep(
    "Direction before execution",
    "Why does this improve the result?",
    [
      "Because Claude creates the design automatically.",
      "To avoid using design tools.",
      "Because you enter the tool with clear direction.",
      "It only works for designers."
    ],
    2,
    "The main benefit is reducing indecision and gaining clarity before visual execution starts."
  ),
  textStep(
    "Claude with Transcription and Audio Tools",
    "After transcribing a meeting, class, or conversation, Claude can turn that material into decisions, summaries, and next steps. That shortens the distance between hearing something and acting on it."
  ),
  fillStep(
    "Fill in the blank - Turn transcription into action!",
    "Build a prompt to extract what matters from a transcript.",
    "\"Here is the transcript: [paste it]. Extract ___, ___, and ___ with owners.\"",
    [
      "decisions",
      "important points",
      "next steps"
    ],
    [
      "decisions",
      "important points",
      "next steps",
      "beautiful phrases",
      "irrelevant comments",
      "noise"
    ],
    "This workflow turns a long conversation into a concrete follow-up list."
  ),
  quizStep(
    "Most efficient workflow",
    "What is the most efficient workflow with transcription and audio tools?",
    [
      "Write everything manually.",
      "Ask Claude to join the meeting.",
      "Transcribe first and analyze afterward with Claude.",
      "Summarize from memory."
    ],
    2,
    "Separating capture from analysis makes the process both faster and more reliable."
  ),
  textStep(
    "Building Your Tool Ecosystem",
    "Claude works like a central brain while the other tools execute. When you understand the role of each one, you build a smarter flow and waste less energy on repetitive work."
  ),
  fillStep(
    "Fill in the blank - Build your ecosystem!",
    "Ask for a workflow suggestion that uses Claude with other tools.",
    "\"I want to build a workflow with Claude and ___. Suggest how to integrate them into my ___.\"",
    ["tools", "daily routine"],
    [
      "tools",
      "daily routine",
      "nothing",
      "chaos"
    ],
    "When you ask for practical daily integration, Claude helps you design a usable system instead of just an abstract idea."
  ),
  quizStep(
    "Claude's role in the ecosystem",
    "Which statement best describes Claude's role in this ecosystem?",
    [
      "It replaces all tools.",
      "It should only be used as a last resort.",
      "It acts as a center of reasoning and creation.",
      "It works best in isolation."
    ],
    2,
    "Claude generates reasoning, structure, and direction; the other tools handle execution and operations."
  ),
  textStep(
    "Conclusion",
    "Claude alone is already powerful. Combined with the right tools, it becomes the center of a complete work system in which you think less about how and more about what you want to achieve. Documents, spreadsheets, presentations, emails, and design all flow better when Claude sits in the middle of the process.\n\nLesson complete."
  ),
] as const;

export const CLAUDE_MODULE_7_STEPS_ES = [
  textStep(
    "Claude con Otras Herramientas - Expandiendo sus Posibilidades",
    "Bienvenido de vuelta. En esta leccion descubriras como Claude puede trabajar junto con otras herramientas de tu dia a dia para aumentar la productividad, automatizar pasos y crear flujos de trabajo mas inteligentes."
  ),
  textStep(
    "Claude No Trabaja Solo",
    "Claude ya es potente por si solo, pero cuando se combina con otras herramientas se convierte en el centro de un sistema completo de trabajo inteligente. Hojas de calculo, documentos, gestores de tareas, herramientas de diseno y mas pueden aprovechar su capacidad de razonamiento y organizacion."
  ),
  quizStep(
    "Por que combinar herramientas",
    "Por que combinar Claude con otras herramientas mejora los resultados?",
    [
      "Porque cada herramienta tiene un punto fuerte y Claude conecta, organiza y procesa lo que cada una produce.",
      "Porque Claude funciona mejor cuando es sustituido por otras herramientas.",
      "Porque integrar herramientas vuelve el proceso mas lento y complicado.",
      "Porque Claude solo funciona bien de forma aislada."
    ],
    0,
    "La mayor ganancia aparece cuando Claude funciona como centro de razonamiento mientras las otras herramientas ejecutan partes especificas del flujo."
  ),
  textStep(
    "Claude con Google Docs y Word",
    "Un flujo muy comun es usar Claude para escribir, estructurar y revisar contenido, y luego llevar el resultado a Google Docs o Word para la formateacion final, colaboracion y comparticion."
  ),
  fillStep(
    "Completa el espacio - Estructura para Docs!",
    "Construye un prompt para generar un texto listo para pegar en un editor de documentos.",
    "\"Escribe un contenido completo sobre ___ con ___ bien definidas y ___ organizada para que pueda copiarlo directamente a Google Docs.\"",
    ["tema", "secciones", "formateacion"],
    [
      "tema",
      "secciones",
      "formateacion",
      "bromas",
      "improvisacion",
      "desorden"
    ],
    "Cuando pides estructura y organizacion desde el inicio, el trabajo posterior en Docs o Word se vuelve mucho mas rapido."
  ),
  quizStep(
    "Claude y Google Docs",
    "Cual es la mejor forma de usar Claude junto con Google Docs?",
    [
      "Escribir todo en Google Docs y despues pedirle a Claude que lo lea.",
      "Usar Claude solo para corregir errores de ortografia.",
      "Usar Claude para estructurar y redactar el contenido y usar Google Docs para formatear, colaborar y compartir el resultado final.",
      "Sustituir completamente Google Docs por Claude."
    ],
    2,
    "Claude aporta mas en la creacion y la estructura; el editor sigue siendo fuerte para formato, colaboracion y distribucion."
  ),
  textStep(
    "Claude con Hojas de Calculo - Google Sheets y Excel",
    "Claude no accede directamente a las hojas de calculo, pero puedes pegar los datos en la conversacion y pedir analisis, formulas, interpretaciones y sugerencias. Eso agiliza mucho la lectura de numeros y patrones."
  ),
  fillStep(
    "Completa el espacio - Analiza datos de la hoja!",
    "Construye un prompt para extraer tendencia, alertas y formula.",
    "\"Aqui estan los datos de mi hoja de calculo: [pega los datos]. Analizalos y dime cual es ___, que numeros ___ y dame la formula para calcular ___.\"",
    [
      "la principal tendencia",
      "merecen atencion",
      "objetivo"
    ],
    [
      "la principal tendencia",
      "merecen atencion",
      "objetivo",
      "una historia aleatoria",
      "pueden ignorarse",
      "nada"
    ],
    "Este tipo de pedido convierte una tabla cruda en una lectura practica y una accion clara."
  ),
  quizStep(
    "Claude con numeros",
    "Que puede hacer Claude con datos de hojas de calculo?",
    [
      "Editar la hoja directamente.",
      "Crear graficos automaticamente.",
      "Analizar datos, identificar patrones y sugerir formulas.",
      "No puede trabajar con numeros."
    ],
    2,
    "Aunque no edita la hoja por ti, Claude puede interpretar los datos y ayudarte con formulas, logica y tendencias."
  ),
  textStep(
    "Claude con Herramientas de Gestion de Tareas",
    "Notion, Trello y Asana funcionan mejor cuando llegas con el proyecto pensado. Claude ayuda a estructurar etapas, subtareas, plazos y prioridades antes incluso de abrir la herramienta."
  ),
  fillStep(
    "Completa el espacio - Estructura tu proyecto!",
    "Construye un prompt para preparar un proyecto antes de llevarlo al gestor de tareas.",
    "\"Crea la estructura de un proyecto para ___, con ___, ___, ___ y ___.\"",
    [
      "objetivo",
      "etapas principales",
      "subtareas",
      "plazos",
      "prioridades"
    ],
    [
      "objetivo",
      "etapas principales",
      "subtareas",
      "plazos",
      "prioridades",
      "caos",
      "azar",
      "ningun plan"
    ],
    "Llegar con una estructura lista evita empezar desde cero y mejora mucho la ejecucion dentro de la herramienta."
  ),
  quizStep(
    "Ventaja de planificar antes",
    "Cual es la ventaja de este enfoque?",
    [
      "Evitar usar herramientas de gestion.",
      "Sustituir esas herramientas.",
      "Llegar a la herramienta con todo estructurado, sin empezar desde cero.",
      "Las herramientas funcionan mejor sin planificacion."
    ],
    2,
    "Claude prepara el razonamiento y la organizacion; la herramienta de gestion entra para seguimiento y colaboracion."
  ),
  textStep(
    "Claude con Herramientas de Presentacion",
    "PowerPoint, Google Slides y Canva se vuelven mas faciles cuando Claude organiza la logica de la presentacion, define la secuencia y sugiere que decir en cada parte."
  ),
  fillStep(
    "Completa el espacio - Monta tu presentacion!",
    "Crea un prompt para estructurar slides con claridad.",
    "\"Crea una presentacion sobre ___ con ___ slides. Para cada slide, incluye ___, ___ y ___.\"",
    [
      "tema",
      "numero",
      "titulo",
      "puntos principales",
      "lo que debo decir"
    ],
    [
      "tema",
      "numero",
      "titulo",
      "puntos principales",
      "lo que debo decir",
      "desorden",
      "silencio"
    ],
    "Este formato convierte a Claude en un planificador de presentaciones mientras la construccion visual queda en la herramienta."
  ),
  quizStep(
    "Lo que no hace directamente",
    "Que es lo que Claude no hace directamente en herramientas de presentacion?",
    [
      "Estructurar el contenido.",
      "Sugerir la secuencia.",
      "Insertarlo automaticamente en PowerPoint o Slides.",
      "Crear la logica de la presentacion."
    ],
    2,
    "Claude puede construir la secuencia y el contenido, pero la insercion automatica en la herramienta no ocurre por defecto."
  ),
  textStep(
    "Claude con Herramientas de Correo",
    "En Gmail u Outlook, Claude ayuda a redactar mensajes con el tono correcto, una estructura clara y un objetivo definido. Eso sirve tanto para correos formales como para respuestas mas breves del dia a dia."
  ),
  fillStep(
    "Completa el espacio - Redacta el correo!",
    "Construye un prompt para escribir mensajes con tono y objetivo claros.",
    "\"Escribe un correo para ___, con tono ___ y objetivo ___. Se claro y directo.\"",
    ["situacion", "tono", "objetivo"],
    [
      "situacion",
      "tono",
      "objetivo",
      "confusion",
      "vago",
      "sin foco"
    ],
    "Definir situacion, tono y objetivo ayuda a Claude a escribir correos mucho mas utiles y mas cercanos a lo que realmente necesitas enviar."
  ),
  quizStep(
    "Uso diario practico",
    "Cual es la mejor forma de usar Claude con herramientas de correo en el dia a dia?",
    [
      "Dejar que Claude envie el correo automaticamente.",
      "Usarlo solo para correos largos.",
      "Usarlo para escribir y ajustar el tono antes de enviar.",
      "Solo funciona para correos formales."
    ],
    2,
    "La mejor forma de uso es ganar velocidad y mejorar el mensaje antes de enviarlo tu mismo."
  ),
  textStep(
    "Claude con Herramientas de Diseno - Canva y Figma",
    "Claude no crea el diseno final dentro de Canva o Figma, pero puede montar todo el briefing: textos, estructura, jerarquia visual y sugerencias de elementos. Eso reduce mucho la paralisis de la pantalla en blanco."
  ),
  fillStep(
    "Completa el espacio - Crea el briefing del diseno!",
    "Haz un prompt para entrar en la herramienta con direccion clara.",
    "\"Crea un briefing para un diseno sobre ___, incluyendo ___, ___ y ___.\"",
    [
      "tema",
      "textos",
      "estructura visual",
      "sugerencias de elementos"
    ],
    [
      "tema",
      "textos",
      "estructura visual",
      "sugerencias de elementos",
      "confusion",
      "suposiciones",
      "vacio"
    ],
    "Con un briefing claro, entras a Canva o Figma sabiendo que construir y en que orden pensar."
  ),
  quizStep(
    "Direccion antes de ejecutar",
    "Por que esto mejora el resultado?",
    [
      "Porque Claude crea el diseno automaticamente.",
      "Para evitar usar herramientas de diseno.",
      "Porque entras en la herramienta con direccion clara.",
      "Solo funciona para diseniadores."
    ],
    2,
    "La ventaja principal es reducir la indecision y ganar claridad antes de empezar la parte visual."
  ),
  textStep(
    "Claude con Herramientas de Transcripcion y Audio",
    "Despues de transcribir una reunion, clase o conversacion, Claude puede convertir ese material en decisiones, resumenes y proximos pasos. Eso acorta mucho la distancia entre escuchar algo y actuar."
  ),
  fillStep(
    "Completa el espacio - Convierte la transcripcion en accion!",
    "Construye un prompt para extraer lo importante de una transcripcion.",
    "\"Aqui esta la transcripcion: [pega]. Extrae ___, ___ y ___ con responsables.\"",
    [
      "decisiones",
      "puntos importantes",
      "proximos pasos"
    ],
    [
      "decisiones",
      "puntos importantes",
      "proximos pasos",
      "frases bonitas",
      "comentarios irrelevantes",
      "ruido"
    ],
    "Este flujo transforma una conversacion larga en una lista concreta de seguimiento."
  ),
  quizStep(
    "Flujo mas eficiente",
    "Cual es el flujo mas eficiente con herramientas de transcripcion y audio?",
    [
      "Escribir todo manualmente.",
      "Pedirle a Claude que participe en la reunion.",
      "Transcribir primero y analizar despues con Claude.",
      "Resumir de memoria."
    ],
    2,
    "Separar captura y analisis hace el proceso mas rapido y mas confiable."
  ),
  textStep(
    "Montando tu Ecosistema de Herramientas",
    "Claude funciona como un cerebro central, mientras las otras herramientas ejecutan. Cuando entiendes el papel de cada una, construyes un flujo mas inteligente y desperdicias menos energia en trabajo repetitivo."
  ),
  fillStep(
    "Completa el espacio - Monta tu ecosistema!",
    "Pide una sugerencia de flujo usando Claude con otras herramientas.",
    "\"Quiero montar un flujo de trabajo con Claude y ___. Sugiereme como integrarlos en mi ___.\"",
    ["herramientas", "dia a dia"],
    [
      "herramientas",
      "dia a dia",
      "nada",
      "caos"
    ],
    "Cuando pides integracion practica en tu rutina, Claude ayuda a dibujar un sistema utilizable, no solo una idea abstracta."
  ),
  quizStep(
    "Papel de Claude en el ecosistema",
    "Que afirmacion describe mejor el papel de Claude en este ecosistema?",
    [
      "Sustituye todas las herramientas.",
      "Solo debe usarse como ultimo recurso.",
      "Actua como centro de razonamiento y creacion.",
      "Funciona mejor aislado."
    ],
    2,
    "Claude genera razonamiento, estructura y direccion; las otras herramientas ejecutan y operacionalizan."
  ),
  textStep(
    "Conclusion",
    "Claude por si solo ya es potente. Combinado con las herramientas adecuadas, se vuelve el centro de un sistema de trabajo completo en el que piensas menos en el como y mas en lo que quieres lograr. Documentos, hojas de calculo, presentaciones, correos y diseno fluyen mejor cuando Claude esta en medio del proceso.\n\nLeccion completada."
  ),
] as const;

export const CLAUDE_MODULE_7_STEPS_FR = [
  textStep(
    "Claude avec d'Autres Outils - Etendre ses Possibilites",
    "Bon retour. Dans cette lecon, vous allez decouvrir comment Claude peut travailler avec les autres outils de votre quotidien pour augmenter la productivite, automatiser certaines etapes et construire des flux de travail plus intelligents."
  ),
  textStep(
    "Claude ne Travaille pas Seul",
    "Claude est deja puissant a lui seul, mais lorsqu'il est combine a d'autres outils il devient le centre d'un systeme complet de travail intelligent. Tableurs, documents, gestionnaires de taches, outils de design et bien plus encore peuvent profiter de son raisonnement et de son organisation."
  ),
  quizStep(
    "Pourquoi combiner les outils",
    "Pourquoi le fait de combiner Claude avec d'autres outils ameliore-t-il les resultats ?",
    [
      "Parce que chaque outil a son point fort et que Claude connecte, organise et traite ce que chacun produit.",
      "Parce que Claude fonctionne mieux lorsqu'il est remplace par d'autres outils.",
      "Parce que l'integration des outils rend le processus plus lent et plus complique.",
      "Parce que Claude ne fonctionne bien qu'en isolement."
    ],
    0,
    "Le vrai gain vient du fait d'utiliser Claude comme centre de raisonnement pendant que les autres outils executent des taches specialisees."
  ),
  textStep(
    "Claude avec Google Docs et Word",
    "Un flux tres courant consiste a utiliser Claude pour ecrire, structurer et reviser un contenu, puis a transferer le resultat dans Google Docs ou Word pour la mise en forme finale, la collaboration et le partage."
  ),
  fillStep(
    "Remplissez le vide - Structurez pour Docs !",
    "Construisez un prompt pour generer un texte pret a etre colle dans un editeur de documents.",
    "\"Ecris un contenu complet sur ___ avec des ___ bien definies et une ___ organisee afin que je puisse le copier directement dans Google Docs.\"",
    ["theme", "sections", "mise en forme"],
    [
      "theme",
      "sections",
      "mise en forme",
      "blagues",
      "improvisation",
      "desordre"
    ],
    "Quand vous demandez de la structure et de l'organisation des le depart, le travail dans Docs ou Word devient beaucoup plus rapide."
  ),
  quizStep(
    "Claude et Google Docs",
    "Quelle est la meilleure facon d'utiliser Claude avec Google Docs ?",
    [
      "Tout ecrire dans Google Docs puis demander a Claude de lire le tout.",
      "Utiliser Claude uniquement pour corriger les fautes.",
      "Utiliser Claude pour structurer et rediger le contenu, puis Google Docs pour mettre en forme, collaborer et partager le resultat final.",
      "Remplacer completement Google Docs par Claude."
    ],
    2,
    "Claude est tres fort pour la creation et la structure; l'editeur reste fort pour la mise en forme, la collaboration et la diffusion."
  ),
  textStep(
    "Claude avec les Tableurs - Google Sheets et Excel",
    "Claude n'accede pas directement aux tableurs, mais vous pouvez coller les donnees dans la conversation et demander des analyses, des formules, des interpretations et des suggestions. Cela accelere beaucoup la lecture des chiffres et des tendances."
  ),
  fillStep(
    "Remplissez le vide - Analysez les donnees du tableur !",
    "Construisez un prompt pour extraire tendance, alertes et formule.",
    "\"Voici les donnees de mon tableur : [collez les donnees]. Analyse-les et dis-moi quelle est ___, quels nombres ___ et donne-moi la formule pour calculer ___.\"",
    [
      "la tendance principale",
      "meritent de l'attention",
      "objectif"
    ],
    [
      "la tendance principale",
      "meritent de l'attention",
      "objectif",
      "une histoire aleatoire",
      "peuvent etre ignores",
      "rien"
    ],
    "Ce type de demande transforme un tableau brut en lecture pratique et en action claire."
  ),
  quizStep(
    "Claude avec les chiffres",
    "Que peut faire Claude avec des donnees de tableur ?",
    [
      "Modifier directement le tableur.",
      "Creer automatiquement des graphiques.",
      "Analyser les donnees, identifier des motifs et suggerer des formules.",
      "Il ne peut pas travailler avec des nombres."
    ],
    2,
    "Meme sans modifier le fichier pour vous, Claude peut interpreter les donnees et aider avec la logique, les formules et les tendances."
  ),
  textStep(
    "Claude avec les Outils de Gestion de Taches",
    "Notion, Trello et Asana fonctionnent mieux quand vous arrivez avec un projet deja pense. Claude aide a structurer les etapes, les sous-taches, les delais et les priorites avant meme d'ouvrir l'outil."
  ),
  fillStep(
    "Remplissez le vide - Structurez votre projet !",
    "Construisez un prompt pour preparer un projet avant de le transferer dans un gestionnaire de taches.",
    "\"Cree la structure d'un projet pour ___, avec ___, ___, ___ et ___.\"",
    [
      "objectif",
      "etapes principales",
      "sous-taches",
      "delais",
      "priorites"
    ],
    [
      "objectif",
      "etapes principales",
      "sous-taches",
      "delais",
      "priorites",
      "chaos",
      "hasard",
      "aucun plan"
    ],
    "Arriver avec une structure prete vous evite de partir de zero et ameliore nettement l'execution dans l'outil."
  ),
  quizStep(
    "Avantage de planifier d'abord",
    "Quel est l'avantage de cette approche ?",
    [
      "Eviter d'utiliser les outils de gestion.",
      "Remplacer ces outils.",
      "Arriver dans l'outil avec tout deja structure, sans partir de zero.",
      "Les outils fonctionnent mieux sans planification."
    ],
    2,
    "Claude prepare le raisonnement et l'organisation; l'outil de gestion sert ensuite au suivi et a la collaboration."
  ),
  textStep(
    "Claude avec les Outils de Presentation",
    "PowerPoint, Google Slides et Canva deviennent plus simples lorsque Claude organise la logique de la presentation, definit l'ordre et suggere ce qu'il faut dire a chaque etape."
  ),
  fillStep(
    "Remplissez le vide - Construisez votre presentation !",
    "Creez un prompt pour structurer des slides clairement.",
    "\"Cree une presentation sur ___ avec ___ slides. Pour chaque slide, inclus ___, ___ et ___.\"",
    [
      "theme",
      "nombre",
      "titre",
      "points principaux",
      "ce que je dois dire"
    ],
    [
      "theme",
      "nombre",
      "titre",
      "points principaux",
      "ce que je dois dire",
      "desordre",
      "silence"
    ],
    "Ce format transforme Claude en planificateur de presentation, tandis que l'assemblage visuel reste dans l'outil."
  ),
  quizStep(
    "Ce qu'il ne fait pas directement",
    "Que ne fait pas Claude directement dans les outils de presentation ?",
    [
      "Structurer le contenu.",
      "Suggere l'ordre.",
      "Inserer automatiquement le contenu dans PowerPoint ou Slides.",
      "Creer la logique de presentation."
    ],
    2,
    "Claude peut construire la logique et le contenu, mais l'insertion automatique dans l'outil n'arrive pas par defaut."
  ),
  textStep(
    "Claude avec les Outils d'E-mail",
    "Dans Gmail ou Outlook, Claude aide a rediger des messages avec le bon ton, une structure claire et un objectif bien defini. Cela fonctionne aussi bien pour des e-mails formels que pour des reponses courtes du quotidien."
  ),
  fillStep(
    "Remplissez le vide - Redigez l'e-mail !",
    "Construisez un prompt pour ecrire des messages avec ton et objectif clairs.",
    "\"Ecris un e-mail pour ___, avec un ton ___ et l'objectif ___. Sois clair et direct.\"",
    ["situation", "ton", "objectif"],
    [
      "situation",
      "ton",
      "objectif",
      "confusion",
      "vague",
      "sans focus"
    ],
    "Definir la situation, le ton et l'objectif aide Claude a ecrire des e-mails beaucoup plus utiles et plus proches de ce que vous devez vraiment envoyer."
  ),
  quizStep(
    "Usage quotidien pratique",
    "Quelle est la meilleure facon d'utiliser Claude avec les outils d'e-mail au quotidien ?",
    [
      "Laisser Claude envoyer l'e-mail automatiquement.",
      "L'utiliser seulement pour les e-mails longs.",
      "L'utiliser pour ecrire et ajuster le ton avant l'envoi.",
      "Cela fonctionne uniquement pour les e-mails formels."
    ],
    2,
    "La meilleure utilisation consiste a gagner du temps et a ameliorer le message avant de l'envoyer vous-meme."
  ),
  textStep(
    "Claude avec les Outils de Design - Canva et Figma",
    "Claude ne cree pas le design final dans Canva ou Figma, mais il peut preparer tout le briefing : textes, structure, hierarchie visuelle et suggestions d'elements. Cela reduit fortement la paralysie de la page blanche."
  ),
  fillStep(
    "Remplissez le vide - Creez le brief design !",
    "Creez un prompt pour entrer dans l'outil avec une direction claire.",
    "\"Cree un briefing pour un design sur ___, incluant ___, ___ et ___.\"",
    [
      "theme",
      "textes",
      "structure visuelle",
      "suggestions d'elements"
    ],
    [
      "theme",
      "textes",
      "structure visuelle",
      "suggestions d'elements",
      "confusion",
      "approximations",
      "vide"
    ],
    "Avec un brief clair, vous entrez dans Canva ou Figma en sachant deja quoi construire et dans quel ordre reflechir."
  ),
  quizStep(
    "Direction avant l'execution",
    "Pourquoi cela ameliore-t-il le resultat ?",
    [
      "Parce que Claude cree automatiquement le design.",
      "Pour eviter d'utiliser les outils de design.",
      "Parce que vous entrez dans l'outil avec une direction claire.",
      "Cela ne fonctionne que pour les designers."
    ],
    2,
    "L'avantage principal est de reduire l'indecision et de gagner en clarte avant l'execution visuelle."
  ),
  textStep(
    "Claude avec les Outils de Transcription et d'Audio",
    "Apres la transcription d'une reunion, d'un cours ou d'une conversation, Claude peut transformer ce contenu en decisions, resumes et prochaines actions. Cela reduit fortement la distance entre entendre quelque chose et agir."
  ),
  fillStep(
    "Remplissez le vide - Transformez la transcription en action !",
    "Construisez un prompt pour extraire l'essentiel d'une transcription.",
    "\"Voici la transcription : [collez-la]. Extrais ___, ___ et ___ avec les responsables.\"",
    [
      "decisions",
      "points importants",
      "prochaines etapes"
    ],
    [
      "decisions",
      "points importants",
      "prochaines etapes",
      "belles phrases",
      "commentaires irrelevants",
      "bruit"
    ],
    "Ce flux transforme une longue conversation en liste concrete de suivi."
  ),
  quizStep(
    "Flux le plus efficace",
    "Quel est le flux le plus efficace avec les outils de transcription et d'audio ?",
    [
      "Tout ecrire manuellement.",
      "Demander a Claude de participer a la reunion.",
      "Transcrire d'abord puis analyser ensuite avec Claude.",
      "Resumer de memoire."
    ],
    2,
    "Le fait de separer la capture et l'analyse rend le processus plus rapide et plus fiable."
  ),
  textStep(
    "Construire votre Ecosysteme d'Outils",
    "Claude agit comme un cerveau central pendant que les autres outils executent. Quand vous comprenez le role de chacun, vous creez un flux plus intelligent et vous depensez moins d'energie sur des taches repetitives."
  ),
  fillStep(
    "Remplissez le vide - Construisez votre ecosysteme !",
    "Demandez une suggestion de flux utilisant Claude avec d'autres outils.",
    "\"Je veux construire un flux de travail avec Claude et ___. Suggere-moi comment les integrer dans mon ___.\"",
    ["outils", "quotidien"],
    [
      "outils",
      "quotidien",
      "rien",
      "chaos"
    ],
    "Quand vous demandez une integration pratique dans la routine, Claude vous aide a dessiner un systeme utilisable, pas seulement une idee abstraite."
  ),
  quizStep(
    "Le role de Claude dans l'ecosysteme",
    "Quelle affirmation decrit le mieux le role de Claude dans cet ecosysteme ?",
    [
      "Il remplace tous les outils.",
      "Il ne doit etre utilise qu'en dernier recours.",
      "Il agit comme centre de raisonnement et de creation.",
      "Il fonctionne mieux en isolement."
    ],
    2,
    "Claude genere le raisonnement, la structure et la direction; les autres outils executent et operationnalisent."
  ),
  textStep(
    "Conclusion",
    "Claude seul est deja puissant. Combine aux bons outils, il devient le centre d'un systeme de travail complet dans lequel vous pensez moins au comment et davantage a ce que vous voulez atteindre. Documents, tableurs, presentations, e-mails et design circulent mieux quand Claude se trouve au milieu du processus.\n\nLecon terminee."
  ),
] as const;
