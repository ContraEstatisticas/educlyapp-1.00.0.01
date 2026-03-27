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

export const GROK_MODULE_4_STEPS_PT = [
  textStep(
    "Usando o Grok para Automacao",
    "Bem-vindo. Nesta licao, voce vai aprender como usar o Grok para criar automacoes, estruturar processos e otimizar tarefas repetitivas. Com o Grok, voce transforma atividades manuais em fluxos mais inteligentes, economizando tempo e aumentando produtividade."
  ),
  textStep(
    "Por que Automacao com IA e um Superpoder",
    "Muitas tarefas digitais sao repetitivas: responder mensagens, organizar dados, criar relatorios ou publicar conteudo. A IA ajuda a identificar essas repeticoes e a estruturar processos sem exigir programacao avancada."
  ),
  quizStep(
    "IA e automacao",
    "Por que usar IA para automacao pode ser mais eficiente?",
    [
      "Porque a IA ajuda a estruturar processos e identificar tarefas repetitivas que podem ser automatizadas.",
      "Porque automacao elimina completamente a necessidade de trabalho humano.",
      "Porque automacao so funciona em empresas grandes.",
      "Porque automacao so e possivel com programacao avancada."
    ],
    0,
    "O maior ganho esta em mapear e organizar tarefas repetitivas de forma clara, nao em prometer eliminacao total do trabalho humano."
  ),
  textStep(
    "Identificando Tarefas que Podem Ser Automatizadas",
    "O primeiro passo da automacao e identificar processos repetitivos. O Grok ajuda a enxergar quais tarefas geram desgaste manual e onde existe maior potencial de ganho de tempo."
  ),
  fillStep(
    "Preencha a lacuna - Identifique tarefas!",
    "Monte um prompt para mapear tarefas automatizaveis.",
    "\"Analise meu fluxo de trabalho e identifique tarefas ___ que podem ser ___ usando ferramentas digitais.\"",
    ["repetitivas", "automatizadas"],
    ["repetitivas", "automatizadas", "esporadicas", "ignoradas"],
    "A automacao comeca pela identificacao clara do que se repete com frequencia e consome tempo sem necessidade."
  ),
  textStep(
    "Criando Fluxos de Automacao",
    "Depois de identificar as tarefas, voce pode estruturar um fluxo automatizado. Quando o processo esta claro, fica muito mais facil transformar uma rotina manual em sistema."
  ),
  fillStep(
    "Preencha a lacuna - Crie um fluxo!",
    "Monte um prompt para organizar um fluxo simples de automacao.",
    "\"Crie um fluxo de automacao para ___ com as seguintes etapas: coleta de ___, processamento das informacoes e envio do ___.\"",
    ["responder leads", "dados", "resultado"],
    ["responder leads", "dados", "resultado", "improviso", "ruido", "atraso"],
    "Um bom fluxo descreve entrada, processamento e saida. Sem isso, a automacao vira bagunca."
  ),
  textStep(
    "Automatizando Respostas e Atendimento",
    "Uma das aplicacoes mais comuns da automacao e responder mensagens automaticamente. Isso acelera respostas para perguntas frequentes e libera tempo para atendimentos mais complexos."
  ),
  fillStep(
    "Preencha a lacuna - Automatize respostas!",
    "Monte um pedido para automatizar atendimento basico.",
    "\"Crie um sistema automatizado para responder ___ de clientes com base nas perguntas mais ___.\"",
    ["mensagens", "frequentes"],
    ["mensagens", "frequentes", "silencios", "aleatorias"],
    "Automacoes de atendimento funcionam melhor quando cobrem padroes recorrentes e deixam casos complexos para humanos."
  ),
  textStep(
    "Automatizando a Criacao de Conteudo",
    "Automacao tambem pode ajudar a gerar conteudo com regularidade. Isso reduz dependencia de inspiracao diaria e ajuda a manter constancia na estrategia."
  ),
  fillStep(
    "Preencha a lacuna - Automatize conteudo!",
    "Monte um pedido para um processo recorrente de conteudo.",
    "\"Crie um processo automatizado para gerar ___ semanais sobre ___ para redes sociais.\"",
    ["posts", "inteligencia artificial"],
    ["posts", "inteligencia artificial", "rascunhos vazios", "assuntos aleatorios"],
    "Quando voce define formato, frequencia e tema, o Grok consegue estruturar um processo de conteudo muito mais usavel."
  ),
  textStep(
    "Automatizando a Analise de Dados",
    "O Grok tambem pode ajudar a interpretar dados automaticamente. Isso acelera a geracao de insights e reduz o tempo gasto esperando relatorios manuais."
  ),
  fillStep(
    "Preencha a lacuna - Analise dados!",
    "Monte um prompt para gerar analise automatizada.",
    "\"Crie um processo para analisar ___ de vendas e gerar um ___ com insights importantes.\"",
    ["dados", "relatorio"],
    ["dados", "relatorio", "palpites", "texto solto"],
    "Automatizar analise significa transformar dados em leitura util com mais velocidade e menos esforco manual."
  ),
  textStep(
    "Criando Integracoes Entre Ferramentas",
    "Muitas automacoes funcionam conectando diferentes ferramentas. Quando sistemas conversam entre si, voce reduz retrabalho e elimina tarefas de copiar e colar."
  ),
  fillStep(
    "Preencha a lacuna - Integre sistemas!",
    "Monte um pedido simples para integrar ferramentas.",
    "\"Crie um fluxo que conecte ___ com ___ para automatizar o envio de informacoes.\"",
    ["formularios", "planilhas"],
    ["formularios", "planilhas", "anotacoes soltas", "memoria"],
    "Integrar ferramentas e uma das maneiras mais praticas de transformar operacoes manuais em fluxo continuo."
  ),
  textStep(
    "Refinando Processos Automatizados",
    "Depois de criar uma automacao, e importante melhorar o processo. Quase nenhuma automacao sai perfeita na primeira versao, e os ajustes reduzem erros e aumentam eficiencia."
  ),
  fillStep(
    "Preencha a lacuna - Refine o processo!",
    "Monte um prompt para otimizar uma automacao existente.",
    "\"Analise este processo automatizado e sugira melhorias para torna-lo mais ___ e ___.\"",
    ["eficiente", "rapido"],
    ["eficiente", "rapido", "complexo", "instavel"],
    "Refinar automacoes ajuda a reduzir friccao, aumentar velocidade e melhorar confiabilidade."
  ),
  textStep(
    "Boas Praticas ao Usar o Grok para Automacao",
    "O erro mais comum ao criar automacoes e tentar automatizar processos complexos sem estruturá-los primeiro. O caminho mais seguro e comecar simples, testar e expandir aos poucos."
  ),
  quizStep(
    "Erro mais comum em automacao",
    "Qual e o erro mais comum ao criar automacoes?",
    [
      "Automatizar tarefas simples.",
      "Testar processos antes de usar.",
      "Tentar automatizar processos complexos sem estrutura-los primeiro.",
      "Criar fluxos claros."
    ],
    2,
    "Automacao sem estrutura so acelera confusao. O processo precisa estar claro antes de ser automatizado."
  ),
  textStep(
    "Conclusao",
    "Usar o Grok para automacao permite transformar tarefas repetitivas em processos mais inteligentes. Identificacao de tarefas, criacao de fluxos, atendimento automatico, conteudo recorrente, analise de dados e integracoes ajudam a economizar tempo e aumentar produtividade.\n\nO segredo da automacao nao e apenas usar ferramentas. E estruturar processos claros que possam funcionar automaticamente. Identifique tarefas. Crie sistemas. Automatize com inteligencia.\n\nLicao concluida."
  ),
] as const;
export const GROK_MODULE_4_STEPS_EN = [
  textStep(
    "Using Grok for Automation",
    "Welcome. In this lesson, you will learn how to use Grok to create automations, structure processes, and optimize repetitive tasks. With Grok, you can turn manual activities into smarter flows, saving time and increasing productivity."
  ),
  textStep(
    "Why Automation with AI Is a Superpower",
    "Many digital tasks are repetitive: replying to messages, organizing data, creating reports, or posting content. AI helps identify those repetitions and structure processes without requiring advanced programming."
  ),
  quizStep(
    "AI and automation",
    "Why can using AI for automation be more efficient?",
    [
      "Because AI helps structure processes and identify repetitive tasks that can be automated.",
      "Because automation completely removes the need for human work.",
      "Because automation only works in large companies.",
      "Because automation is only possible with advanced programming."
    ],
    0,
    "The main gain comes from mapping and organizing repetitive work clearly, not from unrealistic promises of removing all human effort."
  ),
  textStep(
    "Identifying Tasks That Can Be Automated",
    "The first step in automation is identifying repetitive processes. Grok helps reveal which activities create manual drag and where the biggest time savings may exist."
  ),
  fillStep(
    "Fill in the blank - Identify tasks!",
    "Build a prompt to map automatable work.",
    "\"Analyze my workflow and identify ___ tasks that can be ___ using digital tools.\"",
    ["repetitive", "automated"],
    ["repetitive", "automated", "sporadic", "ignored"],
    "Automation starts with clearly identifying what repeats often and consumes time unnecessarily."
  ),
  textStep(
    "Creating Automation Flows",
    "Once you identify the tasks, you can structure an automation flow. When the process is clear, it becomes much easier to turn manual work into a system."
  ),
  fillStep(
    "Fill in the blank - Create a flow!",
    "Build a prompt for a simple automation flow.",
    "\"Create an automation flow for ___ with these steps: collecting ___, processing the information, and sending the ___.\"",
    ["replying to leads", "data", "result"],
    ["replying to leads", "data", "result", "improvisation", "noise", "delay"],
    "A strong flow describes input, processing, and output. Without that, automation becomes messy."
  ),
  textStep(
    "Automating Responses and Support",
    "One of the most common automation uses is responding to messages automatically. This speeds up common replies and frees time for more complex human interactions."
  ),
  fillStep(
    "Fill in the blank - Automate responses!",
    "Build a request for basic support automation.",
    "\"Create an automated system to answer customer ___ based on the most ___ questions.\"",
    ["messages", "frequent"],
    ["messages", "frequent", "silences", "random"],
    "Support automations work best when they cover recurring patterns and leave complex cases for people."
  ),
  textStep(
    "Automating Content Creation",
    "Automation can also help generate content regularly. This reduces dependence on daily inspiration and makes consistency easier."
  ),
  fillStep(
    "Fill in the blank - Automate content!",
    "Build a request for a recurring content process.",
    "\"Create an automated process to generate weekly ___ about ___ for social media.\"",
    ["posts", "artificial intelligence"],
    ["posts", "artificial intelligence", "empty drafts", "random topics"],
    "When you define format, frequency, and theme, Grok can structure a much more useful content workflow."
  ),
  textStep(
    "Automating Data Analysis",
    "Grok can also help interpret data automatically. That speeds up insight generation and reduces dependence on slow manual reporting."
  ),
  fillStep(
    "Fill in the blank - Analyze data!",
    "Build a prompt for automated analysis.",
    "\"Create a process to analyze sales ___ and generate a ___ with important insights.\"",
    ["data", "report"],
    ["data", "report", "guesses", "loose text"],
    "Automating analysis means turning raw data into useful reading faster and with less manual effort."
  ),
  textStep(
    "Creating Integrations Between Tools",
    "Many automations work by connecting different tools. When systems talk to each other, you reduce rework and remove manual copy-paste operations."
  ),
  fillStep(
    "Fill in the blank - Integrate systems!",
    "Build a simple request to connect tools.",
    "\"Create a flow connecting ___ with ___ to automate information delivery.\"",
    ["forms", "spreadsheets"],
    ["forms", "spreadsheets", "loose notes", "memory"],
    "Integrating tools is one of the most practical ways to turn manual operations into continuous flow."
  ),
  textStep(
    "Refining Automated Processes",
    "After creating an automation, it is important to improve the process. Almost no automation is perfect on the first version, and refinement reduces errors while increasing efficiency."
  ),
  fillStep(
    "Fill in the blank - Refine the process!",
    "Build a prompt to optimize an existing automation.",
    "\"Analyze this automated process and suggest improvements to make it more ___ and ___.\"",
    ["efficient", "fast"],
    ["efficient", "fast", "complex", "unstable"],
    "Refining automations helps reduce friction, increase speed, and improve reliability."
  ),
  textStep(
    "Best Practices When Using Grok for Automation",
    "The most common mistake in automation is trying to automate complex processes before structuring them. The safest path is to start simple, test, and expand gradually."
  ),
  quizStep(
    "Most common automation mistake",
    "What is the most common mistake when creating automations?",
    [
      "Automating simple tasks.",
      "Testing processes before using them.",
      "Trying to automate complex processes before structuring them first.",
      "Creating clear flows."
    ],
    2,
    "Automation without structure only speeds up confusion. The process must be clear before it is automated."
  ),
  textStep(
    "Conclusion",
    "Using Grok for automation helps turn repetitive tasks into smarter systems. Task identification, flow design, automated replies, recurring content, data analysis, and integrations all help save time and boost productivity.\n\nThe secret of automation is not only using tools. It is structuring clear processes that can run automatically. Identify tasks. Build systems. Automate intelligently.\n\nLesson complete."
  ),
] as const;
export const GROK_MODULE_4_STEPS_ES = [
  textStep(
    "Usando Grok para Automatizacion",
    "Bienvenido. En esta leccion vas a aprender a usar Grok para crear automatizaciones, estructurar procesos y optimizar tareas repetitivas. Con Grok, puedes transformar actividades manuales en flujos mas inteligentes, ahorrando tiempo y aumentando productividad."
  ),
  textStep(
    "Por que la automatizacion con IA es un superpoder",
    "Muchas tareas digitales son repetitivas: responder mensajes, organizar datos, crear informes o publicar contenido. La IA ayuda a identificar esas repeticiones y estructurar procesos sin exigir programacion avanzada."
  ),
  quizStep(
    "IA y automatizacion",
    "Por que usar IA para automatizacion puede ser mas eficiente?",
    [
      "Porque la IA ayuda a estructurar procesos e identificar tareas repetitivas que pueden automatizarse.",
      "Porque la automatizacion elimina completamente la necesidad de trabajo humano.",
      "Porque la automatizacion solo funciona en empresas grandes.",
      "Porque la automatizacion solo es posible con programacion avanzada."
    ],
    0,
    "La mayor ganancia esta en mapear y organizar el trabajo repetitivo con claridad, no en prometer eliminar todo esfuerzo humano."
  ),
  textStep(
    "Identificando tareas que pueden automatizarse",
    "El primer paso de la automatizacion es identificar procesos repetitivos. Grok ayuda a detectar que actividades consumen tiempo manual y donde hay mas potencial de ahorro."
  ),
  fillStep(
    "Completa el espacio - Identifica tareas!",
    "Construye un prompt para mapear trabajo automatizable.",
    "\"Analiza mi flujo de trabajo e identifica tareas ___ que puedan ser ___ usando herramientas digitales.\"",
    ["repetitivas", "automatizadas"],
    ["repetitivas", "automatizadas", "esporadicas", "ignoradas"],
    "La automatizacion empieza por identificar con claridad aquello que se repite y consume tiempo sin necesidad."
  ),
  textStep(
    "Creando flujos de automatizacion",
    "Una vez identificadas las tareas, puedes estructurar un flujo automatizado. Cuando el proceso esta claro, resulta mucho mas facil convertir trabajo manual en sistema."
  ),
  fillStep(
    "Completa el espacio - Crea un flujo!",
    "Construye un prompt para un flujo de automatizacion simple.",
    "\"Crea un flujo de automatizacion para ___ con estas etapas: recoleccion de ___, procesamiento de la informacion y envio del ___.\"",
    ["responder leads", "datos", "resultado"],
    ["responder leads", "datos", "resultado", "improvisacion", "ruido", "retraso"],
    "Un buen flujo describe entrada, procesamiento y salida. Sin eso, la automatizacion se vuelve caotica."
  ),
  textStep(
    "Automatizando respuestas y atencion",
    "Una de las aplicaciones mas comunes de la automatizacion es responder mensajes automaticamente. Eso agiliza respuestas frecuentes y libera tiempo para interacciones humanas mas complejas."
  ),
  fillStep(
    "Completa el espacio - Automatiza respuestas!",
    "Construye una peticion para automatizar atencion basica.",
    "\"Crea un sistema automatizado para responder ___ de clientes con base en las preguntas mas ___.\"",
    ["mensajes", "frecuentes"],
    ["mensajes", "frecuentes", "silencios", "aleatorias"],
    "Las automatizaciones de atencion funcionan mejor cuando cubren patrones repetidos y dejan los casos complejos para personas."
  ),
  textStep(
    "Automatizando la creacion de contenido",
    "La automatizacion tambien puede ayudar a generar contenido con regularidad. Esto reduce la dependencia de la inspiracion diaria y facilita la consistencia."
  ),
  fillStep(
    "Completa el espacio - Automatiza contenido!",
    "Construye una peticion para un proceso recurrente de contenido.",
    "\"Crea un proceso automatizado para generar ___ semanales sobre ___ para redes sociales.\"",
    ["posts", "inteligencia artificial"],
    ["posts", "inteligencia artificial", "borradores vacios", "temas aleatorios"],
    "Cuando defines formato, frecuencia y tema, Grok puede estructurar un flujo de contenido mucho mas util."
  ),
  textStep(
    "Automatizando el analisis de datos",
    "Grok tambien puede ayudar a interpretar datos automaticamente. Eso acelera la generacion de insights y reduce la dependencia de informes manuales lentos."
  ),
  fillStep(
    "Completa el espacio - Analiza datos!",
    "Construye un prompt para analisis automatizado.",
    "\"Crea un proceso para analizar ___ de ventas y generar un ___ con insights importantes.\"",
    ["datos", "informe"],
    ["datos", "informe", "suposiciones", "texto suelto"],
    "Automatizar el analisis significa convertir datos en lectura util con mas rapidez y menos esfuerzo manual."
  ),
  textStep(
    "Creando integraciones entre herramientas",
    "Muchas automatizaciones funcionan conectando diferentes herramientas. Cuando los sistemas conversan, reduces retrabajo y eliminas tareas de copiar y pegar."
  ),
  fillStep(
    "Completa el espacio - Integra sistemas!",
    "Construye una peticion simple para conectar herramientas.",
    "\"Crea un flujo que conecte ___ con ___ para automatizar el envio de informacion.\"",
    ["formularios", "planillas"],
    ["formularios", "planillas", "notas sueltas", "memoria"],
    "Integrar herramientas es una de las formas mas practicas de convertir operaciones manuales en flujo continuo."
  ),
  textStep(
    "Refinando procesos automatizados",
    "Despues de crear una automatizacion, es importante mejorar el proceso. Casi ninguna automatizacion sale perfecta en la primera version, y el refinamiento reduce errores y aumenta eficiencia."
  ),
  fillStep(
    "Completa el espacio - Refina el proceso!",
    "Construye un prompt para optimizar una automatizacion existente.",
    "\"Analiza este proceso automatizado y sugiere mejoras para hacerlo mas ___ y ___.\"",
    ["eficiente", "rapido"],
    ["eficiente", "rapido", "complejo", "inestable"],
    "Refinar automatizaciones ayuda a reducir friccion, aumentar velocidad y mejorar confiabilidad."
  ),
  textStep(
    "Buenas practicas al usar Grok para automatizacion",
    "El error mas comun al crear automatizaciones es intentar automatizar procesos complejos antes de estructurarlos. El camino mas seguro es empezar simple, probar y ampliar poco a poco."
  ),
  quizStep(
    "Error mas comun en automatizacion",
    "Cual es el error mas comun al crear automatizaciones?",
    [
      "Automatizar tareas simples.",
      "Probar procesos antes de usarlos.",
      "Intentar automatizar procesos complejos sin estructurarlos primero.",
      "Crear flujos claros."
    ],
    2,
    "La automatizacion sin estructura solo acelera la confusion. El proceso debe estar claro antes de automatizarse."
  ),
  textStep(
    "Conclusion",
    "Usar Grok para automatizacion permite convertir tareas repetitivas en sistemas mas inteligentes. Identificacion de tareas, diseno de flujos, respuestas automaticas, contenido recurrente, analisis de datos e integraciones ayudan a ahorrar tiempo y aumentar productividad.\n\nEl secreto de la automatizacion no es solo usar herramientas. Es estructurar procesos claros que puedan funcionar automaticamente. Identifica tareas. Crea sistemas. Automatiza con inteligencia.\n\nLeccion concluida."
  ),
] as const;
export const GROK_MODULE_4_STEPS_FR = [
  textStep(
    "Utiliser Grok pour l'Automatisation",
    "Bienvenue. Dans cette lecon, vous allez apprendre a utiliser Grok pour creer des automatisations, structurer des processus et optimiser des taches repetitives. Avec Grok, vous pouvez transformer des activites manuelles en flux plus intelligents, gagner du temps et augmenter la productivite."
  ),
  textStep(
    "Pourquoi l'automatisation avec l'IA est un superpouvoir",
    "Beaucoup de taches numeriques sont repetitives : repondre a des messages, organiser des donnees, creer des rapports ou publier du contenu. L'IA aide a identifier ces repetitions et a structurer des processus sans exiger de programmation avancee."
  ),
  quizStep(
    "IA et automatisation",
    "Pourquoi utiliser l'IA pour l'automatisation peut-il etre plus efficace ?",
    [
      "Parce que l'IA aide a structurer les processus et a identifier les taches repetitives qui peuvent etre automatisees.",
      "Parce que l'automatisation supprime totalement le besoin de travail humain.",
      "Parce que l'automatisation ne fonctionne que dans les grandes entreprises.",
      "Parce que l'automatisation n'est possible qu'avec de la programmation avancee."
    ],
    0,
    "Le principal gain vient du fait de cartographier et organiser clairement le travail repetitif, pas de promettre la disparition totale de l'effort humain."
  ),
  textStep(
    "Identifier les taches qui peuvent etre automatisees",
    "La premiere etape de l'automatisation consiste a identifier les processus repetitifs. Grok aide a voir quelles activites ralentissent le travail manuel et ou se trouvent les plus grands gains de temps."
  ),
  fillStep(
    "Completez le vide - Identifiez les taches !",
    "Construisez un prompt pour reperer le travail automatisable.",
    "\"Analyse mon flux de travail et identifie les taches ___ qui peuvent etre ___ a l'aide d'outils numeriques.\"",
    ["repetitives", "automatisees"],
    ["repetitives", "automatisees", "sporadiques", "ignorees"],
    "L'automatisation commence par l'identification claire de ce qui se repete souvent et consomme du temps inutilement."
  ),
  textStep(
    "Creer des flux d'automatisation",
    "Une fois les taches identifiees, vous pouvez structurer un flux automatise. Quand le processus est clair, il devient beaucoup plus simple de transformer un travail manuel en systeme."
  ),
  fillStep(
    "Completez le vide - Creez un flux !",
    "Construisez un prompt pour un flux simple d'automatisation.",
    "\"Cree un flux d'automatisation pour ___ avec les etapes suivantes : collecte des ___, traitement des informations et envoi du ___.\"",
    ["repondre aux leads", "donnees", "resultat"],
    ["repondre aux leads", "donnees", "resultat", "improvisation", "bruit", "retard"],
    "Un bon flux decrit l'entree, le traitement et la sortie. Sans cela, l'automatisation devient confuse."
  ),
  textStep(
    "Automatiser les reponses et le support",
    "L'un des usages les plus courants de l'automatisation est la reponse automatique aux messages. Cela accelere les reponses frequentes et libere du temps pour les interactions humaines plus complexes."
  ),
  fillStep(
    "Completez le vide - Automatisez les reponses !",
    "Construisez une demande pour automatiser un support basique.",
    "\"Cree un systeme automatise pour repondre aux ___ des clients sur la base des questions les plus ___.\"",
    ["messages", "frequentes"],
    ["messages", "frequentes", "silences", "aleatoires"],
    "Les automatisations de support fonctionnent mieux quand elles couvrent des motifs recurrents et laissent les cas complexes aux humains."
  ),
  textStep(
    "Automatiser la creation de contenu",
    "L'automatisation peut aussi aider a produire du contenu regulierement. Cela reduit la dependance a l'inspiration quotidienne et facilite la constance."
  ),
  fillStep(
    "Completez le vide - Automatisez le contenu !",
    "Construisez une demande pour un processus recurrent de contenu.",
    "\"Cree un processus automatise pour generer des ___ hebdomadaires sur ___ pour les reseaux sociaux.\"",
    ["posts", "l'intelligence artificielle"],
    ["posts", "l'intelligence artificielle", "brouillons vides", "themes aleatoires"],
    "Quand vous definissez le format, la frequence et le theme, Grok peut structurer un flux de contenu bien plus utile."
  ),
  textStep(
    "Automatiser l'analyse de donnees",
    "Grok peut aussi aider a interpreter des donnees automatiquement. Cela accelere la generation d'insights et reduit la dependance aux rapports manuels lents."
  ),
  fillStep(
    "Completez le vide - Analysez les donnees !",
    "Construisez un prompt pour une analyse automatisee.",
    "\"Cree un processus pour analyser des ___ de ventes et generer un ___ avec des insights importants.\"",
    ["donnees", "rapport"],
    ["donnees", "rapport", "suppositions", "texte disperse"],
    "Automatiser l'analyse signifie transformer des donnees en lecture utile plus rapidement et avec moins d'effort manuel."
  ),
  textStep(
    "Creer des integrations entre outils",
    "Beaucoup d'automatisations fonctionnent en connectant differents outils. Quand les systemes communiquent entre eux, vous reduisez le retravail et eliminez le copier-coller manuel."
  ),
  fillStep(
    "Completez le vide - Integrez les systemes !",
    "Construisez une demande simple pour connecter des outils.",
    "\"Cree un flux qui connecte ___ avec ___ pour automatiser l'envoi d'informations.\"",
    ["formulaires", "tableurs"],
    ["formulaires", "tableurs", "notes dispersees", "memoire"],
    "L'integration d'outils est l'une des facons les plus pratiques de transformer des operations manuelles en flux continu."
  ),
  textStep(
    "Affiner les processus automatises",
    "Apres avoir cree une automatisation, il est important d'ameliorer le processus. Presque aucune automatisation n'est parfaite dans sa premiere version, et l'affinage reduit les erreurs tout en augmentant l'efficacite."
  ),
  fillStep(
    "Completez le vide - Affinez le processus !",
    "Construisez un prompt pour optimiser une automatisation existante.",
    "\"Analyse ce processus automatise et suggere des ameliorations pour le rendre plus ___ et plus ___.\"",
    ["efficace", "rapide"],
    ["efficace", "rapide", "complexe", "instable"],
    "Affiner les automatisations aide a reduire les frictions, gagner en vitesse et ameliorer la fiabilite."
  ),
  textStep(
    "Bonnes pratiques avec Grok pour l'automatisation",
    "L'erreur la plus courante en automatisation est d'essayer d'automatiser des processus complexes avant de les structurer. Le chemin le plus sur consiste a commencer simple, tester puis etendre progressivement."
  ),
  quizStep(
    "Erreur d'automatisation la plus courante",
    "Quelle est l'erreur la plus courante quand on cree des automatisations ?",
    [
      "Automatiser des taches simples.",
      "Tester les processus avant de les utiliser.",
      "Essayer d'automatiser des processus complexes sans les structurer d'abord.",
      "Creer des flux clairs."
    ],
    2,
    "Une automatisation sans structure ne fait qu'accelerer la confusion. Le processus doit etre clair avant d'etre automatise."
  ),
  textStep(
    "Conclusion",
    "Utiliser Grok pour l'automatisation permet de transformer des taches repetitives en systemes plus intelligents. Identification des taches, conception de flux, reponses automatiques, contenu recurrent, analyse de donnees et integrations aident tous a gagner du temps et a augmenter la productivite.\n\nLe secret de l'automatisation n'est pas seulement d'utiliser des outils. C'est de structurer des processus clairs qui peuvent fonctionner automatiquement. Identifiez les taches. Construisez des systemes. Automatisez avec intelligence.\n\nLecon terminee."
  ),
] as const;
