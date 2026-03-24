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

export const GEMINI_MODULE_1_STEPS_PT = [
  textStep(
    "Gemini - O Assistente de IA do Google",
    "Bem-vindo de volta! Nesta lição, você vai conhecer o Gemini — o assistente de inteligência artificial do Google — entender como ele pensa, o que o diferencia de outras IAs e como usá-lo de forma estratégica no seu dia a dia.\n\nO Gemini é o modelo de inteligência artificial desenvolvido pelo Google. Ele foi criado para ser nativo do ecossistema Google — o que significa que se integra de forma natural com Gmail, Google Docs, Google Drive, YouTube e muito mais. É um assistente multimodal, capaz de processar texto, imagens, áudio e vídeo."
  ),
  textStep(
    "Os Modelos do Gemini",
    "Assim como outros assistentes de IA, o Gemini possui diferentes versões — cada uma com um perfil de desempenho e uso ideal."
  ),
  fillStep(
    "Preencha a lacuna — Identifique o modelo certo!",
    "Identifique o modelo certo para cada necessidade.",
    '"Preciso de um modelo para ___. Qual versão do Gemini é mais indicada: o ___ para tarefas do dia a dia, o ___ para análises mais profundas ou o ___ para tarefas rápidas e leves?"',
    ["analisar um relatório financeiro complexo", "Gemini 2.0", "Gemini 1.5 Pro", "Gemini Flash"],
    ["analisar um relatório financeiro complexo", "Gemini 2.0", "Gemini 1.5 Pro", "Gemini Flash"],
    "Conhecer a versão certa economiza tempo e otimiza a qualidade das respostas."
  ),
  textStep(
    "Gemini e o Ecossistema Google",
    "Uma das maiores vantagens do Gemini é a integração direta com as ferramentas que você já usa — Gmail, Google Docs, Google Drive, Google Agenda e YouTube. Isso cria um fluxo de trabalho muito mais fluido."
  ),
  fillStep(
    "Preencha a lacuna — Use o Gemini no seu ecossistema!",
    "Use o Gemini a favor da sua rotina no Google Workspace.",
    '"Tenho um ___ salvo no Google Drive. Quero que o Gemini ___ o documento, ___ os pontos principais e me sugira ___ para a reunião de amanhã que já está na minha ___."',
    ["relatório de projeto", "acesse", "resuma", "pautas", "Google Agenda"],
    ["relatório de projeto", "acesse", "resuma", "pautas", "Google Agenda"],
    "Integrar o Drive e a Agenda elimina a necessidade de ficar baixando anexos e checando abas diferentes."
  ),
  textStep(
    "Acesso à Web em Tempo Real",
    "Diferente de modelos com data de corte de conhecimento, o Gemini tem acesso nativo à web — o que significa que ele pode buscar informações atualizadas, tendências recentes e notícias do momento diretamente na conversa."
  ),
  fillStep(
    "Preencha a lacuna — Use a busca em tempo real!",
    "Formule um prompt que aproveita a web.",
    '"Pesquise as ___ mais recentes sobre ___ e me apresente um resumo com os ___ principais acontecimentos, as ___ identificadas e como isso pode ___ o meu negócio de ___."',
    ["notícias e tendências", "inteligência artificial no setor de educação", "5", "tendências emergentes", "impactar", "cursos online"],
    ["notícias e tendências", "inteligência artificial no setor de educação", "5", "tendências emergentes", "impactar", "cursos online"],
    "Usar o número de pontos ou formato de resumo obriga a IA a ser direta e organizada."
  ),
  textStep(
    "Imagens e Vídeos",
    "O Gemini é nativo multimodal — ele não apenas lê texto, mas também analisa imagens, interpreta gráficos, descreve fotos e até processa conteúdo de vídeos do YouTube."
  ),
  fillStep(
    "Preencha a lacuna — Mande imagens para o Gemini!",
    "Analise um concorrente com facilidade.",
    '"Aqui está uma ___ do meu concorrente. Analise e me diga: quais ___ visuais ele está usando, qual é o ___ da marca transmitido, quais ___ estão em destaque e o que eu poderia ___ na minha própria comunicação visual."',
    ["imagem de campanha publicitária", "elementos", "posicionamento", "mensagens", "adaptar"],
    ["imagem de campanha publicitária", "elementos", "posicionamento", "mensagens", "adaptar"],
    "Ler screenshots poupa dezenas de prompts de contexto e tira o melhor uso da visão da IA."
  ),
  textStep(
    "Gemini no Gmail",
    "Dentro do Gmail, o Gemini pode redigir, resumir e responder e-mails diretamente na plataforma — sem precisar sair para outra ferramenta."
  ),
  fillStep(
    "Preencha a lacuna — Use o Gemini no Gmail!",
    "Ganhe tempo com a caixa de entrada.",
    '"Resuma os ___ e-mails não lidos da minha caixa de entrada sobre ___. Para cada um, me diga: quem ___, qual é o ___ principal e se precisa de ___ urgente da minha parte."',
    ["últimos 10", "projetos em andamento", "enviou", "assunto", "resposta"],
    ["últimos 10", "projetos em andamento", "enviou", "assunto", "resposta"],
    "Em vez de olhar email por email, crie uma visão de cima e priorize."
  ),
  textStep(
    "Gemini no Google Docs",
    "Com o Gemini integrado ao Google Docs, você pode gerar conteúdo, revisar textos, sugerir melhorias e reformatar documentos sem sair da página."
  ),
  fillStep(
    "Preencha a lacuna — Use o Gemini no Docs!",
    "Deixe a escrita mais inteligente no Docs.",
    '"Estou escrevendo um ___ no Google Docs. Peça ao Gemini para ___ o texto atual, ___ trechos confusos, ajustar o ___ para mais formal e adicionar uma ___ executiva no início do documento."',
    ["relatório de resultados trimestrais", "revisar", "reescrever", "tom", "introdução"],
    ["relatório de resultados trimestrais", "revisar", "reescrever", "tom", "introdução"],
    "Trabalhar no ecossistema significa usar os comandos ao lado do texto e não em janelas separadas."
  ),
  textStep(
    "Gemini para Código",
    "O Gemini é uma ferramenta poderosa para quem trabalha com código — ele escreve, revisa, explica e corrige scripts em diversas linguagens de programação."
  ),
  fillStep(
    "Preencha a lacuna — Programando!",
    "Como depurar um bug.",
    '"Aqui está meu código em ___: [cole o código]. Identifique o ___, explique por que está ___ e reescreva a função corrigida com ___ explicando cada alteração feita."',
    ["Python", "erro", "quebrando", "comentários"],
    ["Python", "erro", "quebrando", "comentários"],
    "Ele pode explicar o erro antes de entregar a resposta pronta."
  ),
  textStep(
    "Múltiplas Ferramentas",
    "Cada assistente de IA tem seus pontos fortes. Entender quando usar cada um é o que separa um usuário médio de um usuário estratégico."
  ),
  fillStep(
    "Preencha a lacuna — Escolha a IA certa!",
    "Cada uma possui seu superpoder.",
    '"Para ___ com informações atualizadas da web, uso o ___. Para ___ profunda e raciocínio em documentos longos, uso o ___. Para ___ dentro do ecossistema Microsoft, uso o ___."',
    ["pesquisas", "Gemini", "análise", "Claude", "automação e produtividade", "Copilot"],
    ["pesquisas", "Gemini", "análise", "Claude", "automação e produtividade", "Copilot"],
    "Entender as deficiências e forças de cada IA cria o usuário moderno impecável."
  ),
  quizStep(
    "Conjunto de ferramentas",
    "Qual afirmação descreve melhor a estratégia de uso de múltiplos assistentes de IA?",
    [
      "Escolher apenas um assistente e usá-lo para absolutamente tudo",
      "Testar todos ao mesmo tempo na mesma tarefa sempre",
      "Conhecer o ponto forte de cada assistente e escolher o mais adequado para cada tipo de tarefa — usando-os de forma complementar",
      "O assistente mais caro é sempre o melhor para qualquer situação"
    ],
    2,
    "Nenhum modelo e excelente em absolutamente tudo."
  ),
  textStep(
    "Boas Práticas",
    "Para extrair o melhor do modelo, é importante adotar boas práticas na criação de seus comandos."
  ),
  fillStep(
    "Preencha a lacuna — Use de forma segura!",
    "Práticas para garantir qualidade.",
    '"Sempre que usar o Gemini para pesquisas, peça para ___ as fontes consultadas. Para tarefas criativas, forneça ___ claros de tom e objetivo. Para análises, cole o ___ diretamente na conversa ou acesse pelo ___ para garantir que ele leia o documento completo."',
    ["citar", "parâmetros", "conteúdo", "Google Drive"],
    ["citar", "parâmetros", "conteúdo", "Google Drive"],
    "O Gemini pode trazer referências perfeitamente válidas ou não, então certifique-se pedindo a fonte."
  ),
  textStep(
    "Conclusão",
    "O Gemini é um assistente poderoso — especialmente para quem já vive dentro do ecossistema Google. Acesso à web em tempo real, integração nativa com Gmail, Docs e Drive, processamento multimodal de texto, imagem e vídeo. Tudo isso em um único assistente.\n\nConhecer as forças do Gemini, do Claude e dos demais assistentes disponíveis é o que permite montar um fluxo de trabalho verdadeiramente inteligente — usando cada ferramenta no momento certo, para a tarefa certa.\n\nA inteligência está em saber escolher."
  )
] as const;

export const GEMINI_MODULE_1_STEPS_EN = [
  textStep(
    "Gemini - Google's AI Assistant",
    "Welcome back! In this lesson, you will discover Gemini — Google’s artificial intelligence assistant — understand how it thinks, what sets it apart from other AIs, and how to use it strategically in your daily routine.\n\nGemini is the artificial intelligence model developed by Google. It was designed to be native to the Google ecosystem — meaning it integrates naturally with Gmail, Google Docs, Google Drive, YouTube, and much more. It's a multimodal assistant capable of processing text, images, audio, and video."
  ),
  textStep(
    "Gemini Models",
    "Like other AI assistants, Gemini has different versions — each with a specific performance profile and ideal use case."
  ),
  fillStep(
    "Fill in the blank — Pick the right model!",
    "Identify the right model for each need.",
    '"I need a model to ___. Which version of Gemini is the most suitable: ___ for daily tasks, ___ for deep analysis, or ___ for quick and lightweight tasks?"',
    ["analyze a complex financial report", "Gemini 2.0", "Gemini 1.5 Pro", "Gemini Flash"],
    ["analyze a complex financial report", "Gemini 2.0", "Gemini 1.5 Pro", "Gemini Flash"],
    "Knowing the right version saves time and optimizes the quality of the output."
  ),
  textStep(
    "Gemini and the Google Ecosystem",
    "One of the biggest advantages of Gemini is its direct integration with tools you already use — Gmail, Google Docs, Google Drive, Google Calendar, and YouTube. This creates a much more fluid workflow."
  ),
  fillStep(
    "Fill in the blank — Use Gemini in your ecosystem!",
    "Use Gemini to benefit your daily routine in Google Workspace.",
    '"I have a ___ saved in Google Drive. I want Gemini to ___ the document, ___ its key points, and suggest ___ for tomorrow\'s meeting which is already on my ___."',
    ["project report", "access", "summarize", "agenda items", "Google Calendar"],
    ["project report", "access", "summarize", "agenda items", "Google Calendar"],
    "Integrating Drive and Calendar eliminates the need to constantly download attachments or check different tabs."
  ),
  textStep(
    "Real-time Web Access",
    "Unlike models with a knowledge cutoff date, Gemini has native web access — meaning it can search for up-to-date information, recent trends, and breaking news directly within the chat."
  ),
  fillStep(
    "Fill in the blank — Use real-time search!",
    "Draft a prompt taking advantage of the web.",
    '"Search for the latest ___ on ___ and give me a summary of the ___ main events, the ___ identified, and how this could ___ my ___ business."',
    ["news and trends", "artificial intelligence in education", "5", "emerging trends", "impact", "online courses"],
    ["news and trends", "artificial intelligence in education", "5", "emerging trends", "impact", "online courses"],
    "Adding constraints like numbers or formats forces the AI to reply directly and cleanly."
  ),
  textStep(
    "Images and Videos",
    "Gemini is natively multimodal — it doesn't just read text; it can also analyze images, interpret charts, describe photos, and even process content from YouTube videos."
  ),
  fillStep(
    "Fill in the blank — Send images to Gemini!",
    "Analyze a competitor with ease.",
    '"Here is an ___ from my competitor. Analyze it and tell me: what visual ___ are used, what brand ___ is conveyed, what ___ are highlighted, and what I could ___ in my own visual communication."',
    ["ad campaign image", "elements", "positioning", "messages", "adapt"],
    ["ad campaign image", "elements", "positioning", "messages", "adapt"],
    "Reading screenshots skips the need to write massive context prompts, leveraging AI vision instead."
  ),
  textStep(
    "Gemini in Gmail",
    "Inside Gmail, Gemini can draft, summarize, and reply to emails directly in the platform — without having to switch to another tab or tool."
  ),
  fillStep(
    "Fill in the blank — Use Gemini in Gmail!",
    "Save time going through your inbox.",
    '"Summarize the ___ unread emails in my inbox regarding ___. For each, tell me: who ___, what the main ___ is, and if there is any urgent ___ needed on my part."',
    ["last 10", "ongoing projects", "sent it", "subject", "response"],
    ["last 10", "ongoing projects", "sent it", "subject", "response"],
    "Instead of reading thread by thread, create a macro view and prioritize."
  ),
  textStep(
    "Gemini in Google Docs",
    "With Gemini integrated into Google Docs, you can generate content, review texts, suggest improvements, and reformat docs without once leaving the page."
  ),
  fillStep(
    "Fill in the blank — Use Gemini in Docs!",
    "Write smarter inside Docs.",
    '"I am writing a ___ in Google Docs. Ask Gemini to ___ the current text, ___ confusing sections, adjust the ___ to be more formal, and add an executive ___ at the top of the document."',
    ["quarterly earnings report", "review", "rewrite", "tone", "summary"],
    ["quarterly earnings report", "review", "rewrite", "tone", "summary"],
    "Working right in the ecosystem means using commands beside your text instead of toggling interfaces."
  ),
  textStep(
    "Gemini for Code",
    "Gemini is a powerful tool for those working with code — it writes, reviews, explains, and fixes scripts across a multitude of programming languages."
  ),
  fillStep(
    "Fill in the blank — Coding!",
    "How to debug an issue.",
    '"Here is my code in ___: [paste code]. Identify the ___, explain why it is ___ and rewrite the fixed function with ___ explaining each alteration made."',
    ["Python", "error", "breaking", "comments"],
    ["Python", "error", "breaking", "comments"],
    "It can explain the mistake to you before just handing over the final product."
  ),
  textStep(
    "Multiple Tools",
    "Each AI assistant has its strong points. Grasping when to use which is what separates average users from strategic ones."
  ),
  fillStep(
    "Fill in the blank — Choose the right AI!",
    "Each has its own superpower.",
    '"For ___ with up-to-date web info, I use ___. For deep ___ and reasoning in lengthy files, I use ___. For ___ inside the Microsoft ecosystem, I use ___."',
    ["searches", "Gemini", "analysis", "Claude", "automation and productivity", "Copilot"],
    ["searches", "Gemini", "analysis", "Claude", "automation and productivity", "Copilot"],
    "Understanding the blind spots and heavy lifters in each creates modern digital fluency."
  ),
  quizStep(
    "The tool belt",
    "Which statement best describes the strategy of using multiple AI assistants?",
    [
      "Pick just one and use it for absolutely everything",
      "Consult all of them at once for the identical task every time",
      "Learn the strong suit of each assistant and use the best one for every task — combining them as a toolkit",
      "The most expensive assistant is always the best for any situation"
    ],
    2,
    "No single model excels in fundamentally every vertical natively."
  ),
  textStep(
    "Best Practices",
    "To squeeze the best performance from the model, it is vital to apply some basic best practices to your commands."
  ),
  fillStep(
    "Fill in the blank — Use it safely!",
    "Practices ensuring output quality.",
    '"Whenever running a Gemini search, ask it to ___ consulted sources. For creative tasks, provide clear ___ around objective and tone. For analysis, paste the direct ___ or attach the ___ so it reads the entire thing."',
    ["cite", "parameters", "content", "Google Drive file"],
    ["cite", "parameters", "content", "Google Drive file"],
    "Gemini can pull perfect sources or hallucinate answers, so verify by asking for links."
  ),
  textStep(
    "Conclusion",
    "Gemini is a formidable assistant — especially for users living inside Google's ecosystem. Real-time web access, native integration with Gmail, Docs, and Drive, and multimodal processing for text, imaging, and video. All bundled into one package.\n\nLearning the strengths of Gemini, Claude, and other models is how you forge a truly intelligent workflow — wielding each tool at the exact right moment for the exact right problem.\n\nIntelligence lies in knowing how to choose."
  )
] as const;

export const GEMINI_MODULE_1_STEPS_ES = [
  textStep(
    "Gemini - El Asistente de IA de Google",
    "¡Bienvenido de nuevo! En esta lección, conocerás a Gemini — el asistente de inteligencia artificial de Google — entenderás cómo piensa, qué lo diferencia de otras IAs y cómo usarlo estratégicamente en tu día a día.\n\nGemini es el modelo de inteligencia artificial desarrollado por Google. Fue creado para ser nativo del ecosistema Google — lo que significa que se integra de forma natural con Gmail, Google Docs, Google Drive, YouTube y mucho más. Es un asistente multimodal, capaz de procesar texto, imágenes, audio y video."
  ),
  textStep(
    "Los Modelos de Gemini",
    "Al igual que otros asistentes de IA, Gemini posee diferentes versiones — cada una con un perfil de rendimiento y uso ideal."
  ),
  fillStep(
    "Llena el espacio — ¡Identifica el modelo correcto!",
    "Identifica el modelo adecuado para cada necesidad.",
    '"Necesito un modelo para ___. ¿Qué versión de Gemini es más indicada: el ___ para tareas del día a día, el ___ para análisis más profundos o el ___ para tareas rápidas y ligeras?"',
    ["analizar un informe financiero complejo", "Gemini 2.0", "Gemini 1.5 Pro", "Gemini Flash"],
    ["analizar un informe financiero complejo", "Gemini 2.0", "Gemini 1.5 Pro", "Gemini Flash"],
    "Conocer la versión correcta ahorra tiempo y optimiza la calidad de las respuestas."
  ),
  textStep(
    "Gemini y el Ecosistema Google",
    "Una de las mayores ventajas de Gemini es la integración directa con las herramientas que ya usas — Gmail, Google Docs, Google Drive, Google Calendar y YouTube. Esto crea un flujo de trabajo mucho más fluido."
  ),
  fillStep(
    "Llena el espacio — ¡Usa Gemini en tu ecosistema!",
    "Usa Gemini a favor de tu rutina en Google Workspace.",
    '"Tengo un ___ guardado en Google Drive. Quiero que Gemini ___ el documento, ___ los puntos principales y me sugiera ___ para la reunión de mañana que ya está en mi ___."',
    ["informe de proyecto", "acceda", "resuma", "puntos", "Google Calendar"],
    ["informe de proyecto", "acceda", "resuma", "puntos", "Google Calendar"],
    "Integrar Drive y Calendar elimina la necesidad de descargar archivos adjuntos y revisar diferentes pestañas."
  ),
  textStep(
    "Acceso a la Web en Tiempo Real",
    "A diferencia de modelos con fecha de corte de conocimiento, Gemini tiene acceso nativo a la web — lo que significa que puede buscar información actualizada, tendencias recientes y noticias del momento directamente en la conversación."
  ),
  fillStep(
    "Llena el espacio — ¡Usa la búsqueda en tiempo real!",
    "Formula un prompt que aproveche la web.",
    '"Busca las ___ más recientes sobre ___ y preséntame un resumen con los ___ acontecimientos principales, las ___ identificadas y cómo esto puede ___ mi negocio de ___."',
    ["noticias y tendencias", "inteligencia artificial en el sector educativo", "5", "tendencias emergentes", "impactar", "cursos online"],
    ["noticias y tendencias", "inteligencia artificial en el sector educativo", "5", "tendencias emergentes", "impactar", "cursos online"],
    "Usar el número de puntos o formato de resumen obliga a la IA a ser directa y organizada."
  ),
  textStep(
    "Imágenes y Videos",
    "Gemini es nativo multimodal — no solo lee texto, sino que también analiza imágenes, interpreta gráficos, describe fotos e incluso procesa contenido de videos de YouTube."
  ),
  fillStep(
    "Llena el espacio — ¡Envía imágenes a Gemini!",
    "Analiza a un competidor con facilidad.",
    '"Aquí hay una ___ de mi competidor. Analízala y dime: qué ___ visuales está usando, cuál es el ___ de la marca transmitido, qué ___ destacan y qué podría ___ en mi propia comunicación visual."',
    ["imagen de campaña publicitaria", "elementos", "posicionamiento", "mensajes", "adaptar"],
    ["imagen de campaña publicitaria", "elementos", "posicionamiento", "mensajes", "adaptar"],
    "Hacer que lea capturas de pantalla ahorra decenas de prompts de contexto y saca el mejor provecho de la visión de la IA."
  ),
  textStep(
    "Gemini en Gmail",
    "Dentro de Gmail, Gemini puede redactar, resumir y responder correos directamente en la plataforma — sin necesidad de salir a otra herramienta."
  ),
  fillStep(
    "Llena el espacio — ¡Usa Gemini en Gmail!",
    "Gana tiempo con tu bandeja de entrada.",
    '"Resume los ___ correos no leídos de mi bandeja de entrada sobre ___. Para cada uno, dime: quién ___, cuál es el ___ principal y si se necesita una ___ urgente por mi parte."',
    ["últimos 10", "proyectos en curso", "lo envió", "asunto", "respuesta"],
    ["últimos 10", "proyectos en curso", "lo envió", "asunto", "respuesta"],
    "En vez de mirar correo por correo, obtén una visión general y prioriza."
  ),
  textStep(
    "Gemini en Google Docs",
    "Con Gemini integrado a Google Docs, puedes generar contenido, revisar textos, sugerir mejoras y reformatear documentos sin salir de la página."
  ),
  fillStep(
    "Llena el espacio — ¡Usa Gemini en Docs!",
    "Escribe de forma más inteligente en Docs.",
    '"Estoy escribiendo un ___ en Google Docs. Pídele a Gemini que ___ el texto actual, ___ los tramos confusos, ajuste el ___ para que sea más formal y añada un ___ ejecutivo al principio del documento."',
    ["informe de resultados trimestrales", "revise", "reescriba", "tono", "resumen"],
    ["informe de resultados trimestrales", "revise", "reescriba", "tono", "resumen"],
    "Trabajar en el ecosistema significa usar los comandos al lado del texto y no en ventanas separadas."
  ),
  textStep(
    "Gemini para Programar",
    "Gemini es una herramienta poderosa para quienes trabajan con código — escribe, revisa, explica y corrige scripts en diversos lenguajes de programación."
  ),
  fillStep(
    "Llena el espacio — ¡Programando!",
    "Cómo depurar un error.",
    '"Aquí está mi código en ___: [pega el código]. Identifica el ___, explica por qué está ___ y reescribe la función corregida con ___ que expliquen cada cambio realizado."',
    ["Python", "error", "fallando", "comentarios"],
    ["Python", "error", "fallando", "comentarios"],
    "Puede explicarte el error antes de entregarte la respuesta lista."
  ),
  textStep(
    "Múltiples Herramientas",
    "Cada asistente de IA tiene sus fortalezas. Entender cuándo usar cada uno es lo que separa a un usuario promedio de uno estratégico."
  ),
  fillStep(
    "Llena el espacio — ¡Elige la IA correcta!",
    "Cada una posee su superpoder.",
    '"Para ___ con información actualizada de la web, uso ___. Para ___ profunda y razonamiento en documentos largos, uso ___. Para ___ dentro del ecosistema Microsoft, uso ___."',
    ["búsquedas", "Gemini", "análisis", "Claude", "automatización y productividad", "Copilot"],
    ["búsquedas", "Gemini", "análisis", "Claude", "automatización y productividad", "Copilot"],
    "Entender las deficiencias y fuerzas de cada IA te convierte en un usuario digital impecable."
  ),
  quizStep(
    "Conjunto de herramientas",
    "¿Qué afirmación describe mejor la estrategia de uso de múltiples asistentes de IA?",
    [
      "Elegir solo un asistente y usarlo absolutamente para todo",
      "Probar todos al mismo tiempo en la misma tarea siempre",
      "Conocer el punto fuerte de cada asistente y elegir el más adecuado para cada tipo de tarea — usándolos de forma complementaria",
      "El asistente más caro siempre es el mejor para cualquier situación"
    ],
    2,
    "Ningún modelo es excelente en todo de manera nativa."
  ),
  textStep(
    "Buenas Prácticas",
    "Para extraer lo mejor del modelo, es importante adoptar buenas prácticas en la creación de tus instrucciones."
  ),
  fillStep(
    "Llena el espacio — ¡Úsalo de forma segura!",
    "Prácticas para asegurar la calidad.",
    '"Siempre que uses Gemini para búsquedas, pídele que ___ las fuentes consultadas. Para tareas creativas, proporciona ___ claros de tono y objetivo. Para análisis, pega el ___ directamente en la conversación o adjunta el archivo desde ___ para que lea el documento completo."',
    ["cite", "parámetros", "contenido", "Google Drive"],
    ["cite", "parámetros", "contenido", "Google Drive"],
    "Gemini puede traer referencias perfectamente válidas o alucinar, así que asegúrate pidiendo la fuente."
  ),
  textStep(
    "Conclusión",
    "Gemini es un asistente formidable — especialmente para quienes ya habitan en el ecosistema de Google. Acceso a la web en tiempo real, integración nativa con Gmail, Docs y Drive, y procesamiento multimodal para texto, imágenes y video. Todo en un único asistente.\n\nExperimentar con las fortalezas de Gemini, Claude y otros modelos te permite forjar un flujo de trabajo verdaderamente inteligente — blandiendo la herramienta correcta en el momento exacto.\n\nLa inteligencia reside en saber elegir."
  )
] as const;

export const GEMINI_MODULE_1_STEPS_FR = [
  textStep(
    "Gemini - L'Assistant IA de Google",
    "Bon retour ! Dans cette leçon, vous allez découvrir Gemini — l'assistant d'intelligence artificielle de Google — comprendre comment il pense, ce qui le différencie des autres IA, et comment l'utiliser stratégiquement au quotidien.\n\nGemini est le modèle d'intelligence artificielle développé par Google. Il a été conçu pour être natif de l'écosystème Google — ce qui signifie qu'il s'intègre naturellement avec Gmail, Google Docs, Google Drive, YouTube et bien plus encore. C'est un assistant multimodal, capable de traiter du texte, des images, de l'audio et de la vidéo."
  ),
  textStep(
    "Les Modèles Gemini",
    "Tout comme les autres assistants IA, Gemini propose différentes versions — chacune avec un profil de performance et un cas d'usage idéal."
  ),
  fillStep(
    "Remplissez l'espace — Identifiez le bon modèle !",
    "Identifiez le bon modèle pour chaque besoin.",
    '"J\'ai besoin d\'un modèle pour ___. Quelle version de Gemini est la plus indiquée : le ___ pour les tâches du quotidien, le ___ pour des analyses plus approfondies ou le ___ pour des tâches rapides et légères ?"',
    ["analyser un rapport financier complexe", "Gemini 2.0", "Gemini 1.5 Pro", "Gemini Flash"],
    ["analyser un rapport financier complexe", "Gemini 2.0", "Gemini 1.5 Pro", "Gemini Flash"],
    "Connaître la bonne version fait gagner du temps et optimise la qualité des réponses."
  ),
  textStep(
    "Gemini et l'Écosystème Google",
    "L'un des plus grands atouts de Gemini est son intégration directe avec les outils que vous utilisez déjà — Gmail, Google Docs, Google Drive, Google Agenda et YouTube. Cela crée un flux de travail beaucoup plus fluide."
  ),
  fillStep(
    "Remplissez l'espace — Utilisez Gemini dans votre écosystème !",
    "Utilisez Gemini au profit de votre routine Google Workspace.",
    '"J\'ai un ___ enregistré dans Google Drive. Je veux que Gemini ___ le document, ___ les points principaux et me suggère des ___ pour la réunion de demain qui est déjà dans mon ___."',
    ["rapport de projet", "accède", "résume", "points", "Google Agenda"],
    ["rapport de projet", "accède", "résume", "points", "Google Agenda"],
    "L'intégration avec Drive et Agenda évite d'avoir à télécharger des pièces jointes et à naviguer entre différents onglets."
  ),
  textStep(
    "Accès au Web en Temps Réel",
    "Contrairement aux modèles ayant une date limite de connaissances, Gemini a un accès web natif — ce qui signifie qu'il peut rechercher des informations actualisées, des tendances récentes et les actualités du moment directement au sein de la conversation."
  ),
  fillStep(
    "Remplissez l'espace — Utilisez la recherche en temps réel !",
    "Formulez un prompt qui tire parti d'internet.",
    '"Recherche les ___ les plus récentes sur ___ et donne-moi un résumé avec les ___ événements principaux, les ___ identifiées et comment cela pourrait ___ mon activité de ___."',
    ["actualités et tendances", "l'intelligence artificielle dans l'éducation", "5", "tendances émergentes", "impacter", "cours en ligne"],
    ["actualités et tendances", "l'intelligence artificielle dans l'éducation", "5", "tendances émergentes", "impacter", "cours en ligne"],
    "Ajouter une contrainte chiffrée ou un format de résumé oblige l'IA à être structurée et directe."
  ),
  textStep(
    "Images et Vidéos",
    "Gemini est nativement multimodal — il ne lit pas seulement le texte, il analyse l'image, interprète un graphique, décrit une photo et traite le contenu d'une vidéo YouTube."
  ),
  fillStep(
    "Remplissez l'espace — Envoyez des images à Gemini !",
    "Analysez un concurrent avec aisance.",
    '"Voici une ___ de mon concurrent. Analyse-la et dis-moi : quels ___ visuels il utilise, quel est le ___ de la marque transmis, quels ___ se démarquent et ce que je pourrais ___ dans ma propre communication visuelle."',
    ["image de campagne publicitaire", "éléments", "positionnement", "messages", "adapter"],
    ["image de campagne publicitaire", "éléments", "positionnement", "messages", "adapter"],
    "Lui faire lire des captures d'écran vous épargne la rédaction de très longs prompts descriptifs et sublime l'atout vision de l'IA."
  ),
  textStep(
    "Gemini dans Gmail",
    "Au sein de Gmail, Gemini permet de rédiger, de résumer et de répondre aux courriels directement dans la plateforme — sans jamais quitter la page."
  ),
  fillStep(
    "Remplissez l'espace — Utilisez Gemini dans Gmail !",
    "Gagnez du temps avec votre boîte de réception.",
    '"Résume les ___ e-mails non lus de ma boîte de réception concernant ___. Pour chacun, dis-moi : qui ___, quel est le ___ principal et si cela appelle une ___ urgente de ma part."',
    ["10 derniers", "les projets en cours", "l'a envoyé", "sujet", "réponse"],
    ["10 derniers", "les projets en cours", "l'a envoyé", "sujet", "réponse"],
    "Au lieu de traiter chaque e-mail un par un, obtenez une vue aérienne pour prioriser."
  ),
  textStep(
    "Gemini dans Google Docs",
    "Avec Gemini intégré à Google Docs, vous pouvez générer du contenu, corriger des textes, suggérer des améliorations et reformater vos documents sans jamais quitter la fenêtre."
  ),
  fillStep(
    "Remplissez l'espace — Utilisez Gemini dans Docs !",
    "Soyez plus intelligent au moment de rédiger.",
    '"J\'écris actuellement un ___ dans Google Docs. Demande à Gemini de ___ le texte, de ___ les passages flous, d\'ajuster le ___ afin qu\'il soit plus formel, et d\'ajouter un ___ exécutif tout en haut du document."',
    ["rapport trimestriel de résultats", "réviser", "réécrire", "ton", "résumé"],
    ["rapport trimestriel de résultats", "réviser", "réécrire", "ton", "résumé"],
    "Travailler au cœur de l'écosystème signifie invoquer la commande juste à côté de ce que vous écrivez, et non pas d'ouvrir une énième fenêtre."
  ),
  textStep(
    "Gemini et le Code",
    "Gemini est un outil surpuissant pour ceux qui manipulent du code — il rédige, passe en revue, explique et rectifie des scripts informatiques dans une flopée de langages."
  ),
  fillStep(
    "Remplissez l'espace — Place au développement !",
    "Comment déboguer un incident.",
    '"Voici mon code écrit en ___ : [coller le code]. Identifie l\'___, explique-moi pourquoi cela ___, puis donne-moi le fragment corrigé incluant des ___ illustrant les modifications."',
    ["Python", "erreur", "plante", "commentaires"],
    ["Python", "erreur", "plante", "commentaires"],
    "L'IA a le don de vous expliciter l'erreur plutôt que de juste de livrer le pansement fini."
  ),
  textStep(
    "Multiples Assistances",
    "Chaque IA détient de véritables points forts. Saisir quand utiliser tel assistant plutôt qu'un autre fait la différence entre un usager lambda et un cerveau de stratégie productive."
  ),
  fillStep(
    "Remplissez l'espace — Choisissez la bonne IA !",
    "A chacun son super pouvoir.",
    '"Pour les ___ aux infos immédiates issues de la toile, j\'utilise ___. Pour faire de l\'___ de longue haleine dans le texte, j\'appelle ___. Pour toute ___ dans Microsoft, je mobilise ___."',
    ["recherches", "Gemini", "analyse", "Claude", "automatisation et productivité", "Copilot"],
    ["recherches", "Gemini", "analyse", "Claude", "automatisation et productivité", "Copilot"],
    "Comprendre les forces et les faiblesses inhérentes à chaque bot vous élève au statut d’expert du numérique pur."
  ),
  quizStep(
    "La boîte à outils",
    "Laquelle de ces affirmations met le plus en lumière la tactique gagnante face à l'abondance d'IA ?",
    [
      "Miser sa vie sur un assistant unique sans se relire",
      "Les bombarder de la même consigne en simultané juste par acquit de conscience",
      "Connaître l'avantage indéniable de chacun, puis articuler le tout sous un processus global de renforcement complémentaire",
      "Prendre celui qui coûte paradoxalement une blinde pour chaque petite sollicitation"
    ],
    2,
    "Il n'existe foncièrement aucune intelligence artificielle pure dominatrice sur tous les tableaux."
  ),
  textStep(
    "Bonnes Pratiques",
    "Pour extraire le meilleur de l'IA, veuillez adopter de saines pratiques de rédaction afin de peaufiner les résultats."
  ),
  fillStep(
    "Remplissez l'espace — Utiliser Gemini en toute fiabilité !",
    "Adopter les gestes barrières de la qualité.",
    '"Chaque fois que vous enrôlez Gemini aux recherches, priez-le de ___ ses passages d\'emprunt. Sur les requêtes dites créatives, imposez-lui des ___ stricts ou de ton ciblé. Quant au volet d\'analyses pointues, incorporez directement le ___ au cœur des fils d\'échange ou indexez un objet du ___ pour sceller de part en part cette relecture complète."',
    ["citer", "paramètres", "contenu", "Google Drive"],
    ["citer", "paramètres", "contenu", "Google Drive"],
    "Il lui arrive de puiser des références impeccables... à moins de plonger de lui-même dans les limbes de l'hallucination. Une référence explicite coupe ce risque."
  ),
  textStep(
    "Conclusion",
    "Gemini s'impose comme un formidale soutien de tous les jours — notamment chez quiconque baigne littéralement l'espace Google. Naviguer du temps réel à travers un net réactif, fondre la communication entre Gmail, l'art du document Sheets ou Docs et centraliser sur le multimodal l'écho de milliers des visuels.\n\nAssocier les attributs de Gemini en regard de son pendant Claude – ou tant d'autres outils d'assistance numériques : c'est sceller par la même l'union pragmatique et le vrai écosystème intelligent. Exploitez chacune d'entre elles à l'instant idéal, devant la problématique adéquate.\n\nLa clairvoyance ultime ? Savoir piocher juste."
  )
] as const;
