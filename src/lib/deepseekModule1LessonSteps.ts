export const textStep = (title: string, content: string, promptBox?: string) => ({
  type: "text" as const,
  title,
  content,
  ...(promptBox ? { promptBox } : {}),
});

export const quizStep = (
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

export const fillStep = (
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

export const DEEPSEEK_MODULE_1_STEPS_PT = [
  textStep(
    "O que é o DeepSeek?",
    "O DeepSeek é um modelo de linguagem de grande escala desenvolvido pela empresa chinesa DeepSeek AI. Lançado no início de 2025, ele surpreendeu o mundo tech ao entregar performance comparável aos melhores modelos do mercado com um custo de desenvolvimento drasticamente menor. Em poucos dias após o lançamento, tornou-se o aplicativo mais baixado do mundo."
  ),
  quizStep(
    "O Fenômeno DeepSeek",
    "O que tornou o DeepSeek um fenômeno global em 2025?",
    [
      "Entregou performance comparável aos modelos mais avançados do mercado com um custo de desenvolvimento significativamente menor — desafiando a ideia de que IA de ponta exige bilhões em infraestrutura",
      "Foi o primeiro assistente de IA criado fora dos Estados Unidos",
      "É o único modelo capaz de processar texto e imagens simultaneamente",
      "Ficou famoso por ser o assistente mais caro do mercado"
    ],
    0,
    "O DeepSeek provou que é possível desenvolver IA de alta performance sem os investimentos bilionários que se acreditava serem necessários."
  ),
  textStep(
    "Os Modelos do DeepSeek",
    "O DeepSeek possui diferentes versões, cada uma com um perfil de uso ideal.\n\n**DeepSeek R1** — modelo focado em raciocínio profundo. Ideal para problemas complexos, análises matemáticas, lógica e tarefas que exigem pensamento estruturado passo a passo.\n\n**DeepSeek V3** — modelo de uso geral e alta performance. Equilibra velocidade e qualidade para tarefas do dia a dia como escrita, resumo, código e análise.\n\n**DeepSeek Coder** — versão especializada em programação. Otimizado para escrever, revisar e depurar código em múltiplas linguagens."
  ),
  quizStep(
    "DeepSeek R1",
    "Para qual tipo de tarefa o DeepSeek R1 é mais indicado?",
    [
      "Respostas rápidas e pontuais que não exigem raciocínio profundo",
      "Geração de imagens e conteúdo visual",
      "Problemas complexos que exigem raciocínio estruturado passo a passo — como análises, matemática, lógica e tomada de decisão fundamentada",
      "O R1 é a versão mais simples e indicada para tarefas básicas"
    ],
    2,
    "O R1 foi projetado especificamente para tarefas que exigem raciocínio profundo e pensamento estruturado, mostrando cada etapa do processo."
  ),
  textStep(
    "O Raciocínio em Voz Alta do DeepSeek R1",
    "Uma das características mais marcantes do DeepSeek R1 é a capacidade de mostrar seu raciocínio antes de entregar a resposta final — um processo chamado de Chain of Thought visível. Você acompanha cada passo do pensamento do modelo, o que aumenta a transparência e a confiança no resultado."
  ),
  fillStep(
    "Ative o Raciocínio Visível!",
    "Complete o prompt para ativar o raciocínio passo a passo do DeepSeek R1.",
    '"Preciso resolver o seguinte problema: ___. Antes de responder, ___ seu raciocínio passo a passo, identificando as ___ envolvidas, as possíveis ___ e a lógica por trás de cada ___ antes de chegar à conclusão final."',
    ["como precificar meu serviço de consultoria", "mostre", "variáveis", "abordagens", "decisão"],
    ["como precificar meu serviço de consultoria", "mostre", "variáveis", "abordagens", "decisão", "esconda", "respostas", "conclusões"],
    "Ao pedir que o modelo mostre cada etapa do raciocínio, você transforma a IA em um parceiro de pensamento."
  ),

  textStep(
    "DeepSeek para Análise e Resolução de Problemas",
    "O DeepSeek R1 brilha em tarefas analíticas. Ele consegue decompor problemas complexos, considerar múltiplas variáveis e apresentar conclusões fundamentadas com clareza."
  ),

  quizStep(
    "Capacidade Analítica",
    "Qual prompt aproveita melhor a capacidade analítica do DeepSeek R1?",
    [
      "\"O que você acha desse problema?\"",
      "\"Me dê uma solução rápida para isso\"",
      "\"Analise esse problema considerando causas raiz, variáveis envolvidas, consequências de cada caminho possível e recomende a melhor solução com raciocínio detalhado\"",
      "\"Resolva isso de forma simples e direta\""
    ],
    2,
    "Prompts com estrutura analítica clara aproveitam o motor de raciocínio profundo do R1."
  ),
  textStep(
    "DeepSeek para Programação e Código",
    "O DeepSeek Coder é uma das ferramentas mais poderosas do mercado para desenvolvedores. Ele escreve, revisa, explica e depura código com precisão e clareza — em dezenas de linguagens de programação."
  ),
  fillStep(
    "Use o DeepSeek para Código!",
    "Complete o prompt para depurar código com o DeepSeek Coder.",
    '"Aqui está meu código em ___: [cole o código]. Identifique o ___, explique por que está ___ em linguagem simples, corrija e reescreva a versão ___ com ___ explicando cada mudança feita."',
    ["Python", "erro", "quebrando", "corrigida", "comentários no código"],
    ["Python", "erro", "quebrando", "corrigida", "comentários no código", "JavaScript", "acerto", "funcionando"],
    "Pedir explicações junto com a correção transforma o debug em aprendizado contínuo."
  ),

  textStep(
    "DeepSeek para Escrita e Produção de Conteúdo",
    "O DeepSeek V3 é altamente eficaz para tarefas de escrita — artigos, relatórios, resumos, e-mails e muito mais. Ele mantém coerência ao longo de textos longos e adapta o tom ao contexto."
  ),

  quizStep(
    "A Importância do Público-Alvo",
    "Por que fornecer o público-alvo ao pedir um texto ao DeepSeek melhora o resultado?",
    [
      "Porque o DeepSeek muda seu banco de dados com base no público informado",
      "Para deixar o texto mais longo automaticamente",
      "Porque o modelo ajusta vocabulário, exemplos, nível de profundidade e tom de acordo com quem vai ler — entregando um texto muito mais alinhado com a realidade do leitor",
      "Não faz diferença informar o público ao pedir um texto"
    ],
    2,
    "O público-alvo é uma das variáveis mais poderosas para moldar a saída do modelo."
  ),
  textStep(
    "DeepSeek para Matemática e Raciocínio Lógico",
    "Uma das áreas onde o DeepSeek R1 mais se destaca é em matemática e lógica. Ele resolve problemas complexos passo a passo, mostrando cada etapa do cálculo e explicando o raciocínio por trás."
  ),

  quizStep(
    "Vantagem das Etapas",
    "Qual é a vantagem de pedir ao DeepSeek para mostrar cada etapa de um cálculo?",
    [
      "Para deixar a resposta mais longa",
      "Porque o DeepSeek só entrega respostas corretas quando mostra as etapas",
      "Porque você consegue acompanhar o raciocínio, identificar onde pode ter ocorrido um erro e aprender o processo — não apenas receber o resultado final",
      "Mostrar as etapas torna o processo mais lento sem benefício educacional"
    ],
    2,
    "A decomposição do raciocínio transforma o DeepSeek em um tutor que ensina o processo."
  ),
  textStep(
    "DeepSeek para Pesquisa e Síntese de Informações",
    "O DeepSeek é extremamente eficaz para sintetizar informações complexas — transformando grandes volumes de texto em resumos claros, comparativos e análises estruturadas."
  ),

  quizStep(
    "Síntese de Documentos",
    "O que o DeepSeek faz de diferente ao sintetizar documentos longos?",
    [
      "Ele resume apenas os primeiros parágrafos do documento",
      "Cria um novo documento em formato diferente automaticamente",
      "Processa o documento inteiro, identifica as informações mais relevantes e reorganiza em uma estrutura clara e acionável — sem perder dados críticos ao longo do texto",
      "O DeepSeek só sintetiza documentos de até 5 páginas"
    ],
    2,
    "O DeepSeek processa o documento completo e reorganiza as informações por relevância."
  ),
  textStep(
    "DeepSeek e Privacidade — O que Você Precisa Saber",
    "Por ser um modelo de origem chinesa, o DeepSeek levanta questões importantes sobre privacidade de dados que todo usuário precisa conhecer antes de usar."
  ),
  quizStep(
    "Privacidade no DeepSeek",
    "O que você deve considerar sobre privacidade ao usar o DeepSeek?",
    [
      "O DeepSeek tem as mesmas políticas de privacidade de todos os assistentes americanos",
      "Dados compartilhados com o DeepSeek são automaticamente protegidos por leis europeias",
      "Por ser uma empresa chinesa, o DeepSeek está sujeito às leis de dados da China — por isso evite compartilhar informações confidenciais, dados pessoais sensíveis ou propriedade intelectual crítica",
      "Privacidade não é uma preocupação relevante ao usar assistentes de IA"
    ],
    2,
    "Conhecer a jurisdição e as políticas de dados de cada ferramenta é essencial para proteger informações sensíveis."
  ),

  textStep(
    "DeepSeek vs Outros Assistentes — Quando Usar Cada Um",
    "Cada assistente tem seus pontos fortes. Entender quando usar o DeepSeek e quando recorrer ao Claude, Gemini ou ChatGPT é o que separa um usuário estratégico de um usuário casual."
  ),

  quizStep(
    "Estratégia Multi-Assistentes",
    "Qual afirmação descreve melhor a estratégia de usar múltiplos assistentes de IA?",
    [
      "Escolher apenas um assistente e usá-lo para absolutamente tudo",
      "O assistente mais famoso é sempre o melhor para qualquer tarefa",
      "Conhecer o ponto forte de cada modelo e escolher o mais adequado para cada tipo de tarefa — usando-os de forma complementar para maximizar a qualidade dos resultados",
      "Usar todos os assistentes ao mesmo tempo para qualquer pergunta"
    ],
    2,
    "A combinação estratégica de assistentes diferentes gera resultados superiores."
  ),
  textStep(
    "Boas Práticas com o DeepSeek",
    "Para tirar o máximo do DeepSeek, use o modelo certo para cada tipo de tarefa. O R1 para análise e lógica, o V3 para conteúdo geral e o Coder para programação. Proteja seus dados sensíveis e trate toda resposta como um ponto de partida que você deve revisar."
  ),

  textStep(
    "Conclusão",
    "O DeepSeek chegou para ficar — e mudou a conversa sobre o que é possível em inteligência artificial. Com o R1 para raciocínio profundo, o V3 para uso geral e o Coder para programação, ele oferece um conjunto de ferramentas poderosas para profissionais, estudantes e criadores.\n\nEntender seus pontos fortes, suas limitações e como combiná-lo com outros assistentes é o que vai colocar você à frente da maioria dos usuários — que ainda não sabem qual ferramenta usar para cada situação.\n\nUse com estratégia. Use com consciência. E use sempre no lugar certo.\n\nLição concluída ✓"
  ),
] as const;

// Re-export PT as fallback for other locales (translations can be added later)
export const DEEPSEEK_MODULE_1_STEPS_EN = [
  textStep(
    "What is DeepSeek?",
    "DeepSeek is a large-scale language model developed by the Chinese company DeepSeek AI. Released in early 2025, it surprised the tech world by delivering performance comparable to the market's best models at a drastically lower development cost. Within days of its launch, it became the most downloaded app in the world."
  ),
  quizStep(
    "The DeepSeek Phenomenon",
    "What made DeepSeek a global phenomenon in 2025?",
    [
      "It delivered performance comparable to the most advanced models on the market with a significantly lower development cost — challenging the idea that top-tier AI requires billions in infrastructure",
      "It was the first AI assistant created outside the United States",
      "It is the only model capable of processing text and images simultaneously",
      "It became famous for being the most expensive assistant on the market"
    ],
    0,
    "DeepSeek proved that it's possible to develop high-performance AI without the multi-billion dollar investments previously thought necessary."
  ),
  textStep(
    "DeepSeek Models",
    "DeepSeek has different versions, each with an ideal use profile.\n\n**DeepSeek R1** — model focused on deep reasoning. Ideal for complex problems, mathematical analysis, logic, and tasks that require step-by-step structured thinking.\n\n**DeepSeek V3** — high-performance general-purpose model. Balances speed and quality for daily tasks like writing, summarizing, coding, and analysis.\n\n**DeepSeek Coder** — specialized version for programming. Optimized for writing, reviewing, and debugging code in multiple languages."
  ),
  quizStep(
    "DeepSeek R1",
    "For which type of task is DeepSeek R1 most suitable?",
    [
      "Quick and specific answers that don't require deep reasoning",
      "Image and visual content generation",
      "Complex problems that require step-by-step structured reasoning — such as analysis, math, logic, and grounded decision-making",
      "R1 is the simplest version and recommended for basic tasks"
    ],
    2,
    "R1 was specifically designed for tasks requiring deep reasoning and structured thinking, showing every step of the process."
  ),
  textStep(
    "DeepSeek R1's Thinking Aloud",
    "One of the most striking features of DeepSeek R1 is its ability to show its reasoning before delivering the final answer — a process called visible Chain of Thought. You follow every step of the model's thinking, which increases transparency and trust in the result."
  ),
  fillStep(
    "Activate Visible Reasoning!",
    "Complete the prompt to activate DeepSeek R1's step-by-step reasoning.",
    '"I need to solve the following problem: ___. Before answering, ___ your step-by-step reasoning, identifying the ___ involved, the possible ___ and the logic behind each ___ before reaching the final conclusion."',
    ["how to price my consulting service", "show", "variables", "approaches", "decision"],
    ["how to price my consulting service", "show", "variables", "approaches", "decision", "hide", "answers", "conclusions"],
    "By asking the model to show every reasoning stage, you turn AI into a thinking partner."
  ),

  textStep(
    "DeepSeek for Analysis and Problem Solving",
    "DeepSeek R1 shines in analytical tasks. It can decompose complex problems, consider multiple variables, and present grounded conclusions clearly."
  ),

  quizStep(
    "Analytical Capability",
    "Which prompt best leverages DeepSeek R1's analytical capability?",
    [
      "\"What do you think of this problem?\"",
      "\"Give me a quick solution for this\"",
      "\"Analyze this problem considering root causes, variables involved, consequences of each possible path, and recommend the best solution with detailed reasoning\"",
      "\"Solve this simply and directly\""
    ],
    2,
    "Prompts with a clear analytical structure take full advantage of the R1 deep reasoning engine."
  ),
  textStep(
    "DeepSeek for Programming and Code",
    "DeepSeek Coder is one of the most powerful tools on the market for developers. It writes, reviews, explains, and debugs code with precision and clarity — in dozens of programming languages."
  ),
  fillStep(
    "Use DeepSeek for Code!",
    "Complete the prompt to debug code with DeepSeek Coder.",
    '"Here is my code in ___: [paste the code]. Identify the ___, explain why it is ___ in simple language, fix and rewrite the ___ version with ___ explaining each change made."',
    ["Python", "error", "breaking", "corrected", "code comments"],
    ["Python", "error", "breaking", "corrected", "code comments", "JavaScript", "success", "working"],
    "Asking for explanations alongside the fix turns debugging into continuous learning."
  ),

  textStep(
    "DeepSeek for Writing and Content Production",
    "DeepSeek V3 is highly effective for writing tasks — articles, reports, summaries, emails, and much more. It maintains coherence throughout long texts and adapts the tone to the context."
  ),

  quizStep(
    "The Importance of Target Audience",
    "Why does providing the target audience when asking DeepSeek for a text improve the result?",
    [
      "Because DeepSeek changes its database based on the provided audience",
      "To automatically make the text longer",
      "Because the model adjusts vocabulary, examples, depth level, and tone according to who will read it — delivering a text much better aligned with the reader's reality",
      "It makes no difference to inform the audience when asking for a text"
    ],
    2,
    "Target audience is one of the most powerful variables for shaping the model output."
  ),
  textStep(
    "DeepSeek for Mathematics and Logical Reasoning",
    "One area where DeepSeek R1 stands out most is in mathematics and logic. It solves complex problems step by step, showing each calculation stage and explaining the reasoning behind it."
  ),

  quizStep(
    "Advantage of Stages",
    "What is the advantage of asking DeepSeek to show every stage of a calculation?",
    [
      "To make the answer longer",
      "Because DeepSeek only delivers correct answers when it shows stages",
      "Because you can follow the reasoning, identify where an error might have occurred, and learn the process — not just receive the final result",
      "Showing stages makes the process slower with no educational benefit"
    ],
    2,
    "Reasoning decomposition turns DeepSeek into a tutor that teaches the process."
  ),
  textStep(
    "DeepSeek for Research and Information Synthesis",
    "DeepSeek is extremely effective at synthesizing complex information — transforming large volumes of text into clear summaries, comparisons, and structured analysis."
  ),

  quizStep(
    "Document Synthesis",
    "What does DeepSeek do differently when synthesizing long documents?",
    [
      "It summarizes only the first paragraphs of the document",
      "It automatically creates a new document in a different format",
      "It processes the entire document, identifies the most relevant information, and reorganizes it into a clear and actionable structure — without losing critical data throughout the text",
      "DeepSeek only synthesizes documents up to 5 pages long"
    ],
    2,
    "DeepSeek processes the full document and reorganizes information by relevance."
  ),
  textStep(
    "DeepSeek and Privacy — What You Need to Know",
    "Since it is a model of Chinese origin, DeepSeek raises important data privacy questions that every user needs to know before using."
  ),
  quizStep(
    "Privacy in DeepSeek",
    "What should you consider regarding privacy when using DeepSeek?",
    [
      "DeepSeek has the same privacy policies as all US assistants",
      "Data shared with DeepSeek is automatically protected by European laws",
      "As a Chinese company, DeepSeek is subject to China's data laws — so avoid sharing confidential information, sensitive personal data, or critical intellectual property",
      "Privacy is not a relevant concern when using AI assistants"
    ],
    2,
    "Knowing the jurisdiction and data policies of each tool is essential to protect sensitive information."
  ),

  textStep(
    "DeepSeek vs Other Assistants — When to Use Each",
    "Every assistant has its strengths. Understanding when to use DeepSeek and when to use Claude, Gemini, or ChatGPT is what separates a strategic user from a casual one."
  ),

  quizStep(
    "Multi-Assistant Strategy",
    "Which statement best describes the strategy of using multiple AI assistants?",
    [
      "Choose just one assistant and use it for absolutely everything",
      "The most famous assistant is always the best for any task",
      "Know the strong point of each model and choose the most suitable one for each type of task — using them complementarily to maximize result quality",
      "Use all assistants at the same time for any question"
    ],
    2,
    "The strategic combination of different assistants generates superior results."
  ),
  textStep(
    "Best Practices with DeepSeek",
    "To get the most out of DeepSeek, use the right model for each type of task. R1 for analysis and logic, V3 for general content, and Coder for programming. Protect your sensitive data and treat every response as a starting point that you should review."
  ),

  textStep(
    "Conclusion",
    "DeepSeek is here to stay — and it changed the conversation about what's possible in artificial intelligence. With R1 for deep reasoning, V3 for general use, and Coder for programming, it offers a powerful set of tools for professionals, students, and creators.\n\nUnderstanding its strengths, limitations, and how to combine it with other assistants is what will put you ahead of most users — who still don't know which tool to use for each situation.\n\nUse it strategically. Use it consciously. And always use it in the right place.\n\nLesson complete ✓"
  ),
];
export const DEEPSEEK_MODULE_1_STEPS_ES = [
  textStep(
    "¿Qué es DeepSeek?",
    "DeepSeek es un modelo de lenguaje de gran escala desarrollado por la empresa china DeepSeek AI. Lanzado a principios de 2025, sorprendió al mundo tecnológico al ofrecer un rendimiento comparable a los mejores modelos del mercado con un costo de desarrollo drásticamente menor. Pocos días después de su lanzamiento, se convirtió en la aplicación más descargada del mundo."
  ),
  quizStep(
    "El Fenómeno DeepSeek",
    "¿Qué convirtió a DeepSeek en un fenómeno global en 2025?",
    [
      "Ofreció un rendimiento comparable a los modelos más avanzados del mercado con un costo de desarrollo significativamente menor — desafiando la idea de que la IA de vanguardia exige miles de millones en infraestructura",
      "Fue el primer asistente de IA creado fuera de los Estados Unidos",
      "Es el único modelo capaz de procesar texto e imágenes simultáneamente",
      "Se hizo famoso por ser el asistente más caro del mercado"
    ],
    0,
    "DeepSeek demostró que es posible desarrollar una IA de alto rendimiento sin las inversiones multimillonarias que se creían necesarias."
  ),
  textStep(
    "Los Modelos de DeepSeek",
    "DeepSeek tiene diferentes versiones, cada una con un perfil de uso ideal.\n\n**DeepSeek R1** — modelo centrado en el razonamiento profundo. Ideal para problemas complejos, análisis matemáticos, lógica y tareas que requieren un pensamiento estructurado paso a paso.\n\n**DeepSeek V3** — modelo de propósito general y alto rendimiento. Equilibra velocidad y calidad para tareas cotidianas como escritura, resumen, código y análisis.\n\n**DeepSeek Coder** — versión especializada en programación. Optimizado para escribir, revisar y depurar código en múltiples lenguajes."
  ),
  quizStep(
    "DeepSeek R1",
    "¿Para qué tipo de tarea es más adecuado DeepSeek R1?",
    [
      "Respuestas rápidas y específicas que no requieren un razonamiento profundo",
      "Generación de imágenes y contenido visual",
      "Problemas complejos que requieren un razonamiento estructurado paso a paso — como análisis, matemáticas, lógica y toma de decisiones fundamentadas",
      "R1 es la versión más sencilla y recomendada para tareas básicas"
    ],
    2,
    "El R1 fue diseñado específicamente para tareas que requieren razonamiento profundo y pensamiento estructurado, mostrando cada etapa del proceso."
  ),
  textStep(
    "El Razonamiento en Voz Alta de DeepSeek R1",
    "Una de las características más llamativas de DeepSeek R1 es su capacidad para mostrar su razonamiento antes de entregar la respuesta final — un proceso llamado Chain of Thought (Cadena de Pensamiento) visible. Sigues cada paso del pensamiento del modelo, lo que aumenta la transparencia y la confianza en el resultado."
  ),
  fillStep(
    "¡Activa el Razonamiento Visible!",
    "Completa el prompt para activar el razonamiento paso a paso de DeepSeek R1.",
    '"Necesito resolver el siguiente problema: ___. Antes de responder, ___ tu razonamiento paso a paso, identificando las ___ involucradas, las posibles ___ y la lógica detrás de cada ___ antes de llegar a la conclusión final."',
    ["cómo poner precio a mi servicio de consultoría", "muestra", "variables", "enfoques", "decisión"],
    ["cómo poner precio a mi servicio de consultoría", "muestra", "variables", "enfoques", "decisión", "oculta", "respuestas", "conclusiones"],
    "Al pedir que el modelo muestre cada etapa del razonamiento, transformas la IA en un socio de pensamiento."
  ),

  textStep(
    "DeepSeek para Análisis y Resolución de Problemas",
    "DeepSeek R1 destaca en tareas analíticas. Puede descomponer problemas complejos, considerar múltiples variables y presentar conclusiones fundamentadas con claridad."
  ),

  quizStep(
    "Capacidad Analítica",
    "¿Qué prompt aprovecha mejor la capacidad analítica de DeepSeek R1?",
    [
      "\"¿Qué opinas de este problema?\"",
      "\"Dame una solución rápida para esto\"",
      "\"Analiza este problema considerando causas raíz, variables involucradas, consecuencias de cada camino posible y recomienda la mejor solución con razonamiento detallado\"",
      "\"Resuelve esto de forma sencilla y directa\""
    ],
    2,
    "Los prompts con una estructura analítica clara aprovechan el motor de razonamiento profundo del R1."
  ),
  textStep(
    "DeepSeek para Programación y Código",
    "DeepSeek Coder es una de las herramientas más potentes del mercado para desarrolladores. Escribe, revisa, explica y depura código con precisión y claridad — en docenas de lenguajes de programación."
  ),
  fillStep(
    "¡Usa DeepSeek para Código!",
    "Completa el prompt para depurar código con DeepSeek Coder.",
    '"Aquí está mi código en ___: [pega el código]. Identifica el ___, explica por qué está ___ en lenguaje sencillo, corrige y reescribe la versión ___ con ___ que expliquen cada cambio realizado."',
    ["Python", "error", "fallando", "corregida", "comentarios en el código"],
    ["Python", "error", "fallando", "corregida", "comentarios en el código", "JavaScript", "acierto", "funcionando"],
    "Pedir explicaciones junto con la corrección transforma la depuración en un aprendizaje continuo."
  ),

  textStep(
    "DeepSeek para Escritura y Producción de Contenido",
    "DeepSeek V3 es altamente eficaz para tareas de escritura — artículos, informes, resúmenes, correos electrónicos y mucho más. Mantiene la coherencia a lo largo de textos largos y adapta el tono al contexto."
  ),

  quizStep(
    "La Importancia del Público Objetivo",
    "¿Por qué proporcionar el público objetivo al pedir un texto a DeepSeek mejora el resultado?",
    [
      "Porque DeepSeek cambia su base de datos en función del público informado",
      "Para alargar automáticamente el texto",
      "Porque el modelo ajusta el vocabulario, los ejemplos, el nivel de profundidad y el tono en función de quién vaya a leerlo — entregando un texto mucho más alinguado con la realidad del lector",
      "No hay diferencia en informar al público al pedir un texto"
    ],
    2,
    "El público objetivo es una de las variables más potentes para dar forma a la salida del modelo."
  ),
  textStep(
    "DeepSeek para Matemáticas y Razonamiento Lógico",
    "Una de las áreas donde más destaca DeepSeek R1 es en matemáticas y lógica. Resuelve problemas complejos paso a paso, mostrando cada etapa del cálculo y explicando el razonamiento detrás de él."
  ),
  quizStep(
    "Ventaja de las Etapas",
    "¿Cuál es la ventaja de pedir a DeepSeek que muestre cada etapa de un cálculo?",
    [
      "Para que la respuesta sea más larga",
      "Porque DeepSeek solo entrega respuestas correctas cuando muestra las etapas",
      "Porque puedes seguir el razonamiento, identificar dónde puede haber ocurrido un error y aprender el proceso — no solo recibir el resultado final",
      "Mostrar las etapas hace que el proceso sea más lento sin beneficio educativo"
    ],
    2,
    "La descomposición del razonamiento convierte a DeepSeek en un tutor que enseña el proceso."
  ),
  textStep(
    "DeepSeek para Investigación y Síntesis de Información",
    "DeepSeek es extremadamente eficaz para sintetizar información compleja — transformando grandes volúmenes de texto en resúmenes claros, comparativas y análisis estructurados."
  ),
  quizStep(
    "Síntesis de Documentos",
    "¿Qué hace DeepSeek de forma diferente al sintetizar documentos largos?",
    [
      "Resume solo los primeros párrafos del documento",
      "Crea automáticamente un nuevo documento en un formato diferente",
      "Procesa todo el documento, identifica la información más relevante y la reorganiza en una estructura clara y accionable — sin perder datos críticos a lo largo del texto",
      "DeepSeek solo sintetiza documentos de hasta 5 páginas"
    ],
    2,
    "DeepSeek procesa el documento completo y reorganiza la información por relevancia."
  ),
  textStep(
    "DeepSeek y Privacidad — Lo que necesitas saber",
    "Al ser un modelo de origen chino, DeepSeek plantea importantes cuestiones de privacidad de datos que todo usuario debe conocer antes de utilizarlo."
  ),
  quizStep(
    "Privacidad en DeepSeek",
    "¿Qué debes tener en cuenta sobre la privacidad al utilizar DeepSeek?",
    [
      "DeepSeek tiene las mismas políticas de privacidad que todos los asistentes estadounidenses",
      "Los datos compartidos con DeepSeek están protegidos automáticamente por las leyes europeas",
      "Al ser una empresa china, DeepSeek está sujeta a las leyes de datos de China — por tanto, evita compartir información confidencial, datos personales sensibles o propiedad intelectual crítica",
      "La privacidad no es una preocupación relevante cuando se utilizan asistentes de IA"
    ],
    2,
    "Conocer la jurisdicción y las políticas de datos de cada herramienta es esencial para proteger la información sensible."
  ),

  textStep(
    "DeepSeek vs Otros Asistentes — Cuándo usar cada uno",
    "Cada asistente tiene sus puntos fuertes. Entender cuándo usar DeepSeek y cuándo recurrir a Claude, Gemini o ChatGPT es lo que separa a un usuario estratégico de uno casual."
  ),

  quizStep(
    "Estrategia Multiasistente",
    "¿Qué afirmación describe mejor la estrategia de utilizar varios asistentes de IA?",
    [
      "Elegir un solo asistente y utilizarlo absolutamente para todo",
      "El asistente más famoso siempre es el mejor para cualquier tarea",
      "Conocer el punto fuerte de cada modelo y elegir el más adecuado para cada tipo de tarea — utilizándolos de forma complementaria para maximizar la calidad de los resultados",
      "Utilizar todos los asistentes al mismo tiempo para cualquier pregunta"
    ],
    2,
    "La combinación estratégica de distintos asistentes genera resultados superiores."
  ),
  textStep(
    "Buenas prácticas con DeepSeek",
    "Para sacar el máximo partido a DeepSeek, utiliza el modelo adecuado para cada tipo de tarea. El R1 para análisis y lógica, el V3 para contenidos generales y el Coder para programación. Protege tus datos sensibles y trata cada respuesta como un punto de partida que debes revisar."
  ),

  textStep(
    "Conclusión",
    "DeepSeek ha llegado para quedarse — y ha cambiado la conversación sobre lo que es posible en la inteligencia artificial. Con el R1 para el razonamiento profundo, el V3 para el uso general y el Coder para la programación, ofrece un conjunto de potentes herramientas para profesionales, estudiantes y creadores.\n\nComprender sus puntos fuertes, sus limitaciones y cómo combinarlo con otros asistentes es lo que te situará por delante de la mayoría de los usuarios — que aún no saben qué herramienta utilizar para cada situación.\n\nÚsalo con estrategia. Úsalo con conciencia. Y úsalo siempre en el lugar adecuado.\n\nLección completada ✓"
  ),
];
export const DEEPSEEK_MODULE_1_STEPS_FR = [
  textStep(
    "Qu'est-ce que DeepSeek ?",
    "DeepSeek est un modèle de langage à grande échelle développé par l'entreprise chinoise DeepSeek AI. Lancé début 2025, il a surpris le monde de la tech en offrant des performances comparables aux meilleurs modèles du marché avec un coût de développement considérablement réduit. Quelques jours après son lancement, il est devenu l'application la plus téléchargée au monde."
  ),
  quizStep(
    "Le Phénomène DeepSeek",
    "Qu'est-ce qui a fait de DeepSeek un phénomène mondial en 2025 ?",
    [
      "Il a offert des performances comparables aux modèles les plus avancés du marché avec un coût de développement nettement inférieur — remettant en cause l'idée que l'IA de pointe nécessite des milliards en infrastructure",
      "C'était le premier assistant IA créé en dehors des États-Unis",
      "C'est le seul modèle capable de traiter simultanément du texte et des images",
      "Il est devenu célèbre pour être l'assistant le plus cher du marché"
    ],
    0,
    "DeepSeek a prouvé qu'il était possible de développer une IA de haute performance sans les investissements de plusieurs milliards de dollars que l'on croyait nécessaires."
  ),
  textStep(
    "Les Modèles DeepSeek",
    "DeepSeek dispose de différentes versions, chacune ayant un profil d'utilisation idéal.\n\n**DeepSeek R1** — modèle axé sur le raisonnement profond. Idéal pour les problèmes complexes, les analyses mathématiques, la logique et les tâches nécessitant une réflexion structurée étape par étape.\n\n**DeepSeek V3** — modèle polyvalent haute performance. Équilibre vitesse et qualité pour les tâches quotidiennes telles que l'écriture, les résumés, le code et l'analyse.\n\n**DeepSeek Coder** — version spécialisée pour la programmation. Optimisé pour écrire, réviser et déboguer du code dans de multiples langages."
  ),
  quizStep(
    "DeepSeek R1",
    "Pour quel type de tâche DeepSeek R1 est-il le plus adapté ?",
    [
      "Des réponses rapides et ponctuelles qui ne nécessitent pas de raisonnement approfondi",
      "Génération d'images et de contenus visuels",
      "Des problèmes complexes qui exigent un raisonnement structuré étape par étape — comme les analyses, les mathématiques, la logique et la prise de décision argumentée",
      "Le R1 est la version la plus simple et recommandée pour les tâches de base"
    ],
    2,
    "Le R1 a été conçu spécifiquement pour les tâches nécessitant un raisonnement profond et une pensée structurée, montrant chaque étape du processus."
  ),
  textStep(
    "Le Raisonnement à Voix Haute de DeepSeek R1",
    "L'une des caractéristiques plus marquantes de DeepSeek R1 est sa capacité à montrer son raisonnement avant de livrer la réponse finale — un processus appelé Chain of Thought (Chaîne de Pensée) visible. Vous suivez chaque étape de la réflexion du modèle, ce qui accroît la transparence et la confiance dans le résultat."
  ),
  fillStep(
    "Activez le Raisonnement Visible !",
    "Complétez le prompt pour activer le raisonnement étape par étape de DeepSeek R1.",
    '"Je dois résoudre le problème suivant : ___. Avant de répondre, ___ votre raisonnement étape par étape, en identifiant les ___ impliquées, les ___ possibles et la logique derrière chaque ___ avant de parvenir à la conclusion finale."',
    ["comment tarifer mon service de conseil", "montrez", "variables", "approches", "décision"],
    ["comment tarifer mon service de conseil", "montrez", "variables", "approches", "décision", "cachez", "réponses", "conclusions"],
    "En demandant au modèle de montrer chaque étape de son raisonnement, vous transformez l'IA en partenaire de réflexion."
  ),

  textStep(
    "DeepSeek pour l'Analyse et la Résolution de Problèmes",
    "DeepSeek R1 brille dans les tâches analytiques. Il peut décomposer des problèmes complexes, prendre en compte de multiples variables et présenter des conclusions argumentées avec clarté."
  ),

  quizStep(
    "Capacité Analytique",
    "Quel prompt exploite au mieux la capacité analytique de DeepSeek R1 ?",
    [
      "\"Que penses-tu de ce problème ?\"",
      "\"Donne-moi une solution rapide à ça\"",
      "\"Analyse ce problème en considérant les causes racines, les variables impliquées, les conséquences de chaque voie possible et recommande la meilleure solution avec un raisonnement détaillé\"",
      "\"Résous ça de manière simple et directe\""
    ],
    2,
    "Les prompts avec une structure analytique claire tirent pleinement parti du moteur de raisonnement profond du R1."
  ),
  textStep(
    "DeepSeek pour la Programmation et le Code",
    "DeepSeek Coder est l'un des outils les plus puissants du marché pour les développeurs. Il écrit, révise, explique et débogue du code avec précision et clarté — dans des dizaines de langages de programmation."
  ),
  fillStep(
    "Utilisez DeepSeek pour le Code !",
    "Complétez le prompt pour déboguer du code avec DeepSeek Coder.",
    '"Voici mon code en ___ : [coller le code]. Identifiez l\'___, expliquez pourquoi il ___ en langage simple, corrigez et réécrivez la version ___ avec des ___ expliquant chaque modification effectuée."',
    ["Python", "erreur", "plante", "corrigée", "commentaires dans le code"],
    ["Python", "erreur", "plante", "corrigée", "commentaires dans le code", "JavaScript", "réussite", "fonctionne"],
    "Demander des explications en même temps que la correction transforme le débogage en un apprentissage continu."
  ),

  textStep(
    "DeepSeek pour l'Écriture et la Production de Contenu",
    "DeepSeek V3 est très efficace pour les tâches d'écriture — articles, rapports, résumés, e-mails et bien plus encore. Il maintient la cohérence tout au long de textes longs et adapte le ton au contexte."
  ),

  quizStep(
    "L'Importance du Public Cible",
    "Pourquoi fournir le public cible lors de la demande d'un texte à DeepSeek améliore-t-il le résultat ?",
    [
      "Parce que DeepSeek modifie sa base de données en fonction du public informé",
      "Pour rendre automatiquement le texte plus long",
      "Parce que le modèle ajuste le vocabulaire, les exemples, le niveau de profondeur et le ton en fonction de la personne qui va lire — livrant un texte bien plus en phase avec la réalité du lecteur",
      "Cela ne change rien de préciser le public lors d'une demande de texte"
    ],
    2,
    "Le public cible est l'une des variables les plus puissantes pour façonner la réponse du modèle."
  ),
  textStep(
    "DeepSeek pour les Mathématiques et le Raisonnement Logique",
    "L'un des domaines où DeepSeek R1 se distingue le plus est celui des mathématiques et de la logique. Il résout des problèmes complexes étape par étape, en montrant chaque phase du calcul et en expliquant le raisonnement sous-jacent."
  ),

  quizStep(
    "Avantage des Étapes",
    "Quel est l'avantage de demander à DeepSeek de montrer chaque étape d'un calcul ?",
    [
      "Pour rendre la réponse plus longue",
      "Parce que DeepSeek ne livre de réponses correctes que lorsqu'il montre les étapes",
      "Parce que vous pouvez suivre le raisonnement, identifier où une erreur a pu se produire et apprendre le processus — pas seulement recevoir le résultat final",
      "Montrer les étapes rend le processus plus lent sans bénéfice éducatif"
    ],
    2,
    "La décomposition du raisonnement transforme DeepSeek en un tuteur qui enseigne le processus."
  ),
  textStep(
    "DeepSeek pour la Recherche et la Synthèse d'Informations",
    "DeepSeek est extrêmement efficace pour synthétiser des informations complexes — transformant de gros volumes de textes en résumés clairs, en comparatifs et en analyses structurées."
  ),

  quizStep(
    "Synthèse de Documents",
    "Qu'est-ce que DeepSeek fait différemment lors de la synthèse de documents longs ?",
    [
      "Il ne résume que les premiers paragraphes du document",
      "Il crée automatiquement un nouveau document en un format différent",
      "Il traite l'intégralité du document, identifie les informations les plus pertinentes et les réorganise selon une structure claire et exploitable — sans perdre de données critiques au fil du texte",
      "DeepSeek ne synthétise que des documents de 5 pages maximum"
    ],
    2,
    "DeepSeek traite le document complet et réorganise les informations par pertinence."
  ),
  textStep(
    "DeepSeek et Confidentialité — Ce que Vous Devez Savoir",
    "En raison de son origine chinoise, DeepSeek soulève d'importantes questions sur la confidentialité des données que tout utilisateur doit connaître avant de l'utiliser."
  ),
  quizStep(
    "Confidentialité chez DeepSeek",
    "Que devez-vous prendre en compte en matière de confidentialité lorsque vous utilisez DeepSeek ?",
    [
      "DeepSeek a les mêmes politiques de confidentialité que tous les assistants américains",
      "Les données partagées avec DeepSeek sont automatiquement protégées par les lois européennes",
      "En tant qu'entreprise chinoise, DeepSeek est soumis aux lois chinoises sur les données — évitez donc de partager des informations confidentielles, des données personnelles sensibles ou de la propriété intellectuelle critique",
      "La confidentialité n'est pas une préoccupation pertinente lors de l'utilisation d'assistants IA"
    ],
    2,
    "Connaître la juridiction et les politiques de données de chaque outil est essentiel pour protéger les informations sensibles."
  ),
  textStep(
    "DeepSeek vs Autres Assistants — Quand Utiliser Chacun",
    "Chaque assistant a ses points forts. Comprendre quand utiliser DeepSeek et quand se tourner vers Claude, Gemini ou ChatGPT est ce qui sépare un utilisateur stratégique d'un utilisateur occasionnel."
  ),
  quizStep(
    "Stratégie Multi-Assistant",
    "Quelle affirmation décrit le mieux la stratégie d'utilisation de plusieurs assistants IA ?",
    [
      "Choisir un seul assistant et l'utiliser pour absolument tout",
      "L'assistant le plus célèbre est toujours le meilleur pour n'importe quelle tâche",
      "Connaître le point fort de chaque modèle et choisir le plus approprié pour chaque type de tâche — en les utilisant de manière complémentaire pour maximiser la qualité des résultats",
      "Utiliser tous les assistants en même temps pour n'importe quelle question"
    ],
    2,
    "La combinaison stratégique de différents assistants génère des résultats supérieurs."
  ),
  textStep(
    "Bonnes Pratiques avec DeepSeek",
    "Pour tirer le meilleur parti de DeepSeek, utilisez le bon modèle pour chaque type de tâche. Le R1 pour l'analyse et la logique, le V3 pour le contenu général et le Coder pour la programmation. Protégez vos données sensibles et traitez chaque réponse comme un point de départ que vous devez réviser."
  ),

  textStep(
    "Conclusion",
    "DeepSeek est là pour durer — et a changé la donne sur ce qui est possible en intelligence artificielle. Avec le R1 pour le raisonnement profond, le V3 pour l'usage général et le Coder pour la programmation, il offre un ensemble d'outils puissants pour les professionnels, les étudiants et les créateurs.\n\nComprendre ses points forts, ses limites et comment le combiner avec d'autres assistants est ce qui vous placera devant la majorité des utilisateurs — qui ne savent toujours pas quel outil utiliser pour chaque situation.\n\nUtilisez-le stratégiquement. Utilisez-le consciemment. Et utilisez-le toujours au bon endroit.\n\nLeçon terminée ✓"
  ),
];
