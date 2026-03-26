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

export const GROK_MODULE_1_STEPS_PT = [
  textStep(
    "Trabalhando com o Grok para Pesquisa, Automacao e Criacao de Conteudo",
    "Bem-vindo. Nesta licao, voce vai aprender como usar o Grok para pesquisa avancada, geracao de conteudo, analise de informacoes e automacao de tarefas. O Grok foi pensado para entender contexto em profundidade e lidar com informacoes em tempo real, permitindo resultados mais rapidos e inteligentes."
  ),
  textStep(
    "Por que Usar o Grok e um Superpoder",
    "Buscar informacoes manualmente leva tempo. O Grok consegue analisar varias fontes rapidamente, entender contexto e gerar respostas estruturadas, economizando horas de pesquisa manual."
  ),
  quizStep(
    "Pesquisa mais eficiente",
    "Por que usar o Grok pode ser mais eficiente do que pesquisar manualmente?",
    [
      "Porque o Grok consegue analisar multiplas fontes rapidamente, entender contexto e gerar respostas estruturadas.",
      "Porque o Grok substitui completamente qualquer tipo de pesquisa humana.",
      "Porque o Grok so funciona para perguntas simples.",
      "Porque o Grok apenas copia resultados de busca sem interpretacao."
    ],
    0,
    "O diferencial esta em acelerar a leitura, a sintese e a organizacao da informacao, sem depender de voce abrir manualmente dezenas de fontes."
  ),
  textStep(
    "Criando Prompts Claros para o Grok",
    "Assim como acontece com qualquer IA avancada, a qualidade da resposta depende da clareza do pedido. Quando voce informa contexto, objetivo e formato esperado, o Grok entende melhor o que precisa entregar."
  ),
  fillStep(
    "Preencha a lacuna - Escreva um bom prompt!",
    "Monte um pedido claro para obter respostas mais uteis.",
    "\"Para obter melhores resultados no Grok: descreva o ___ que deseja resolver, forneca ___ relevantes sobre o tema, especifique o ___ de resposta que deseja e indique se precisa de ___ ou exemplos praticos.\"",
    ["problema", "contexto", "formato", "passos"],
    ["problema", "contexto", "formato", "passos", "achismo", "respostas vagas", "improviso"],
    "Prompts claros reduzem ambiguidade e aumentam muito a chance de o Grok responder com foco e utilidade."
  ),
  textStep(
    "Usando o Grok para Pesquisa Inteligente",
    "Uma das maiores vantagens do Grok e pesquisar e sintetizar informacoes rapidamente. Em vez de apenas mostrar links, ele organiza os achados e ajuda voce a chegar mais rapido ao que importa."
  ),
  fillStep(
    "Preencha a lacuna - Pesquise com o Grok!",
    "Monte um prompt de pesquisa com foco em sintese util.",
    "\"Pesquise sobre ___ e gere um resumo com os pontos principais, incluindo ___, tendencias atuais e possiveis ___ para empresas ou criadores de conteudo.\"",
    ["inteligencia artificial", "aplicacoes praticas", "oportunidades"],
    ["inteligencia artificial", "aplicacoes praticas", "oportunidades", "rumores", "generalidades", "desvios"],
    "Um bom prompt de pesquisa pede tema, recorte util e impacto pratico, para o Grok organizar melhor os achados."
  ),
  textStep(
    "Usando o Grok para Criar Conteudo",
    "O Grok tambem pode gerar artigos, posts, roteiros e ideias criativas. Ele acelera a primeira versao e ajuda a estruturar o conteudo, mas a revisao final continua sendo sua."
  ),
  fillStep(
    "Preencha a lacuna - Crie conteudo!",
    "Monte um prompt simples para criar um texto com estrutura clara.",
    "\"Crie um ___ sobre ___ com uma introducao forte, tres pontos principais e um ___ que incentive o leitor a agir.\"",
    ["artigo", "produtividade com IA", "call to action"],
    ["artigo", "produtividade com IA", "call to action", "titulo vazio", "sem direcao", "desfecho aleatorio"],
    "Quando voce pede formato, tema, estrutura e fechamento, o Grok sai do generico e produz algo muito mais aproveitavel."
  ),
  textStep(
    "Analisando Informacoes com o Grok",
    "Alem de criar conteudo, o Grok pode analisar dados e informacoes mais complexas. Ele ajuda a identificar padroes, possiveis problemas e caminhos de melhoria com muito mais rapidez."
  ),
  fillStep(
    "Preencha a lacuna - Analise com IA!",
    "Monte um pedido para receber analise e recomendacoes.",
    "\"Analise este ___ e identifique os ___ principais, possiveis ___ e sugestoes de ___ para melhorar os resultados.\"",
    ["conjunto de dados", "padroes", "problemas", "estrategias"],
    ["conjunto de dados", "padroes", "problemas", "estrategias", "achismos", "palpites", "desculpas"],
    "Esse tipo de estrutura faz o Grok organizar a analise em leitura, diagnostico e acao."
  ),
  textStep(
    "Usando o Grok para Ideias de Negocio",
    "O Grok tambem pode ajudar a gerar ideias de produtos, startups e projetos. Ele abre varias possibilidades rapidamente, mas validar a oportunidade no mercado continua sendo uma etapa sua."
  ),
  fillStep(
    "Preencha a lacuna - Gere ideias!",
    "Monte um prompt para brainstorm de negocios.",
    "\"Gere ___ ideias de negocios usando ___ que possam ser iniciadas com baixo investimento e tenham potencial de ___.\"",
    ["10", "inteligencia artificial", "crescimento"],
    ["10", "inteligencia artificial", "crescimento", "1", "papelada", "estagnacao"],
    "Quando voce define quantidade, tecnologia e criterio de potencial, o brainstorming fica muito mais util e focado."
  ),
  textStep(
    "Refinando Respostas do Grok",
    "Uma das melhores formas de usar o Grok e em ciclos: gerar, revisar e melhorar. A primeira resposta quase nunca e a versao final; o refinamento e o que aproxima a resposta do seu objetivo real."
  ),
  fillStep(
    "Preencha a lacuna - Refine o resultado!",
    "Ajuste uma resposta para deixa-la mais forte e organizada.",
    "\"Melhore esta resposta tornando-a mais ___, adicionando ___ praticos e organizando em ___ claros.\"",
    ["clara", "exemplos", "topicos"],
    ["clara", "exemplos", "topicos", "vaga", "ruidos", "blocos confusos"],
    "Refinar clareza, exemplos e organizacao transforma uma boa resposta em algo muito mais facil de aplicar."
  ),
  textStep(
    "Usando o Grok para Automacao de Tarefas",
    "O Grok tambem pode ajudar a estruturar processos e fluxos de trabalho. Em vez de deixar uma tarefa repetitiva solta, ele ajuda voce a transforma-la em um processo claro, replicavel e mais facil de automatizar."
  ),
  fillStep(
    "Preencha a lacuna - Automatize processos!",
    "Monte um pedido para organizar um fluxo repetitivo.",
    "\"Crie um ___ passo a passo para automatizar ___ usando ferramentas digitais e inteligencia artificial.\"",
    ["processo", "tarefas repetitivas"],
    ["processo", "tarefas repetitivas", "atalho improvisado", "tarefas aleatorias"],
    "Quando voce pede um processo passo a passo, o Grok ajuda a tirar a tarefa do caos e transformar em rotina operacional."
  ),
  textStep(
    "Boas Praticas ao Usar o Grok",
    "O erro mais comum ao usar IA e fazer perguntas vagas, sem contexto suficiente. Quanto mais contexto e intencao voce colocar no pedido, mais especifica e util tende a ser a resposta."
  ),
  quizStep(
    "Erro mais comum",
    "Qual e o erro mais comum ao usar IA como o Grok?",
    [
      "Fazer perguntas muito especificas.",
      "Pedir respostas estruturadas.",
      "Fazer perguntas vagas sem contexto suficiente.",
      "Revisar as respostas geradas."
    ],
    2,
    "Perguntas vagas produzem respostas vagas. O contexto e o que ajuda o Grok a entender o que importa para voce."
  ),
  textStep(
    "Conclusao",
    "Usar o Grok de forma estrategica transforma a maneira como voce pesquisa, cria conteudo e analisa informacoes. Prompts claros, pesquisa inteligente, geracao de conteudo, analise de dados e automacao de processos permitem produzir mais em menos tempo.\n\nO segredo nao e apenas usar IA. E saber fazer as perguntas certas. Use contexto. Refine respostas. Construa com inteligencia.\n\nLicao concluida."
  ),
] as const;
export const GROK_MODULE_1_STEPS_EN = [
  textStep(
    "Working with Grok for Research, Automation, and Content Creation",
    "Welcome. In this lesson, you will learn how to use Grok for advanced research, content generation, information analysis, and task automation. Grok is built to understand context deeply and work with real-time information, helping you get faster and smarter results."
  ),
  textStep(
    "Why Using Grok Is a Superpower",
    "Searching manually takes time. Grok can analyze multiple sources quickly, understand context, and generate structured answers, saving hours of manual research."
  ),
  quizStep(
    "More efficient research",
    "Why can using Grok be more efficient than researching manually?",
    [
      "Because Grok can analyze multiple sources quickly, understand context, and generate structured answers.",
      "Because Grok completely replaces all human research.",
      "Because Grok only works for simple questions.",
      "Because Grok only copies search results without interpretation."
    ],
    0,
    "Its strength is speeding up reading, synthesis, and organization so you do not need to manually inspect dozens of sources."
  ),
  textStep(
    "Creating Clear Prompts for Grok",
    "As with any advanced AI, the quality of the answer depends on how clear your request is. When you give context, goal, and expected format, Grok can respond with much more focus."
  ),
  fillStep(
    "Fill in the blank - Write a strong prompt!",
    "Build a clear request for better answers.",
    "\"To get better results in Grok: describe the ___ you want to solve, provide relevant ___ about the topic, specify the ___ of response you want, and indicate whether you need ___ or practical examples.\"",
    ["problem", "context", "format", "steps"],
    ["problem", "context", "format", "steps", "guesswork", "vague replies", "improvisation"],
    "Clear prompts reduce ambiguity and make it much easier for Grok to deliver something useful."
  ),
  textStep(
    "Using Grok for Smart Research",
    "One of Grok's biggest advantages is researching and synthesizing information quickly. Instead of only listing links, it helps you organize findings and move faster toward what matters."
  ),
  fillStep(
    "Fill in the blank - Research with Grok!",
    "Build a research prompt focused on useful synthesis.",
    "\"Research ___ and generate a summary with the main points, including ___, current trends, and possible ___ for companies or content creators.\"",
    ["artificial intelligence", "practical applications", "opportunities"],
    ["artificial intelligence", "practical applications", "opportunities", "rumors", "generalities", "detours"],
    "A strong research prompt defines the topic, the practical angle, and the kind of impact you want Grok to surface."
  ),
  textStep(
    "Using Grok to Create Content",
    "Grok can also generate articles, posts, scripts, and creative ideas. It speeds up the first draft and helps structure the material, but the final review should always be yours."
  ),
  fillStep(
    "Fill in the blank - Create content!",
    "Build a simple prompt for structured writing.",
    "\"Create an ___ about ___ with a strong introduction, three main points, and a ___ that encourages the reader to act.\"",
    ["article", "productivity with AI", "call to action"],
    ["article", "productivity with AI", "call to action", "empty title", "no direction", "random ending"],
    "When you ask for format, theme, structure, and closing, Grok moves far beyond generic text."
  ),
  textStep(
    "Analyzing Information with Grok",
    "Besides creating content, Grok can analyze more complex information. It helps identify patterns, possible issues, and improvement paths much faster than a manual pass."
  ),
  fillStep(
    "Fill in the blank - Analyze with AI!",
    "Build a request for analysis and recommendations.",
    "\"Analyze this ___ and identify the main ___, possible ___, and suggestions for ___ to improve the results.\"",
    ["dataset", "patterns", "problems", "strategies"],
    ["dataset", "patterns", "problems", "strategies", "guesses", "hunches", "excuses"],
    "This structure pushes Grok to organize its answer into reading, diagnosis, and action."
  ),
  textStep(
    "Using Grok for Business Ideas",
    "Grok can also help generate ideas for products, startups, and projects. It opens many possibilities quickly, but validating market demand is still your responsibility."
  ),
  fillStep(
    "Fill in the blank - Generate ideas!",
    "Build a prompt for business brainstorming.",
    "\"Generate ___ business ideas using ___ that can be started with low investment and have ___ potential.\"",
    ["10", "artificial intelligence", "growth"],
    ["10", "artificial intelligence", "growth", "1", "paperwork", "stagnation"],
    "When you define quantity, technology, and the growth filter, the brainstorming becomes much more useful."
  ),
  textStep(
    "Refining Grok's Answers",
    "One of the best ways to use Grok is in cycles: generate, review, and improve. The first answer is almost never the final version, and refinement is what brings the result closer to your real goal."
  ),
  fillStep(
    "Fill in the blank - Refine the result!",
    "Strengthen an answer by making it easier to use.",
    "\"Improve this response by making it more ___, adding practical ___, and organizing it into clear ___.\"",
    ["clear", "examples", "topics"],
    ["clear", "examples", "topics", "vague", "noise", "messy blocks"],
    "Refining clarity, examples, and structure turns a decent answer into something much more actionable."
  ),
  textStep(
    "Using Grok for Task Automation",
    "Grok can also help structure processes and workflows. Instead of leaving repetitive work scattered, it helps you turn it into a clear and repeatable process."
  ),
  fillStep(
    "Fill in the blank - Automate processes!",
    "Build a request for a repeatable workflow.",
    "\"Create a step-by-step ___ to automate ___ using digital tools and artificial intelligence.\"",
    ["process", "repetitive tasks"],
    ["process", "repetitive tasks", "improvised shortcut", "random tasks"],
    "When you ask for a step-by-step process, Grok helps transform repetition into a real operating routine."
  ),
  textStep(
    "Best Practices When Using Grok",
    "The most common mistake with AI is asking vague questions without enough context. The more context and intention you add, the more specific and useful the answer becomes."
  ),
  quizStep(
    "Most common mistake",
    "What is the most common mistake when using AI like Grok?",
    [
      "Asking very specific questions.",
      "Requesting structured answers.",
      "Asking vague questions without enough context.",
      "Reviewing the answers that were generated."
    ],
    2,
    "Vague questions lead to vague answers. Context is what tells Grok what really matters to you."
  ),
  textStep(
    "Conclusion",
    "Using Grok strategically changes the way you research, create content, and analyze information. Clear prompts, smart research, content generation, data analysis, and process automation help you produce more in less time.\n\nThe secret is not just using AI. It is asking the right questions. Use context. Refine answers. Build with intelligence.\n\nLesson complete."
  ),
] as const;
export const GROK_MODULE_1_STEPS_ES = [
  textStep(
    "Trabajando con Grok para Investigacion, Automatizacion y Creacion de Contenido",
    "Bienvenido. En esta leccion vas a aprender a usar Grok para investigacion avanzada, generacion de contenido, analisis de informacion y automatizacion de tareas. Grok fue pensado para comprender contexto en profundidad y trabajar con informacion en tiempo real, ayudandote a conseguir resultados mas rapidos e inteligentes."
  ),
  textStep(
    "Por que usar Grok es un superpoder",
    "Buscar informacion manualmente toma tiempo. Grok puede analizar multiples fuentes rapidamente, entender el contexto y generar respuestas estructuradas, ahorrando horas de investigacion manual."
  ),
  quizStep(
    "Investigacion mas eficiente",
    "Por que usar Grok puede ser mas eficiente que investigar manualmente?",
    [
      "Porque Grok puede analizar multiples fuentes rapidamente, entender el contexto y generar respuestas estructuradas.",
      "Porque Grok sustituye por completo cualquier investigacion humana.",
      "Porque Grok solo funciona para preguntas simples.",
      "Porque Grok solo copia resultados de busqueda sin interpretarlos."
    ],
    0,
    "Su ventaja esta en acelerar la lectura, la sintesis y la organizacion de la informacion sin obligarte a revisar decenas de fuentes una por una."
  ),
  textStep(
    "Creando prompts claros para Grok",
    "Como con cualquier IA avanzada, la calidad de la respuesta depende de la claridad del pedido. Cuando das contexto, objetivo y formato esperado, Grok entiende mucho mejor lo que necesitas."
  ),
  fillStep(
    "Completa el espacio - Escribe un buen prompt!",
    "Construye una peticion clara para obtener mejores respuestas.",
    "\"Para obtener mejores resultados con Grok: describe el ___ que quieres resolver, aporta ___ relevantes sobre el tema, especifica el ___ de respuesta que deseas e indica si necesitas ___ o ejemplos practicos.\"",
    ["problema", "contexto", "formato", "pasos"],
    ["problema", "contexto", "formato", "pasos", "suposiciones", "respuestas vagas", "improvisacion"],
    "Los prompts claros reducen la ambiguedad y ayudan a Grok a responder con mucho mas foco."
  ),
  textStep(
    "Usando Grok para investigacion inteligente",
    "Una de las mayores ventajas de Grok es investigar y sintetizar informacion rapidamente. En lugar de limitarse a mostrar enlaces, ayuda a organizar hallazgos y llegar antes a lo que importa."
  ),
  fillStep(
    "Completa el espacio - Investiga con Grok!",
    "Construye un prompt de investigacion enfocado en una sintesis util.",
    "\"Investiga sobre ___ y genera un resumen con los puntos principales, incluyendo ___, tendencias actuales y posibles ___ para empresas o creadores de contenido.\"",
    ["inteligencia artificial", "aplicaciones practicas", "oportunidades"],
    ["inteligencia artificial", "aplicaciones practicas", "oportunidades", "rumores", "generalidades", "desvios"],
    "Un buen prompt de investigacion define el tema, el enfoque util y el impacto practico que quieres encontrar."
  ),
  textStep(
    "Usando Grok para crear contenido",
    "Grok tambien puede generar articulos, posts, guiones e ideas creativas. Acelera la primera version y ayuda a estructurar el contenido, pero la revision final sigue siendo tuya."
  ),
  fillStep(
    "Completa el espacio - Crea contenido!",
    "Construye un prompt simple para escribir con estructura.",
    "\"Crea un ___ sobre ___ con una introduccion fuerte, tres puntos principales y un ___ que motive al lector a actuar.\"",
    ["articulo", "productividad con IA", "call to action"],
    ["articulo", "productividad con IA", "call to action", "titulo vacio", "sin direccion", "final aleatorio"],
    "Cuando defines formato, tema, estructura y cierre, Grok entrega algo mucho mas aprovechable."
  ),
  textStep(
    "Analizando informacion con Grok",
    "Ademas de crear contenido, Grok puede analizar informacion mas compleja. Ayuda a identificar patrones, posibles problemas y caminos de mejora mucho mas rapido que un analisis manual."
  ),
  fillStep(
    "Completa el espacio - Analiza con IA!",
    "Construye una peticion para recibir analisis y recomendaciones.",
    "\"Analiza este ___ e identifica los ___ principales, posibles ___ y sugerencias de ___ para mejorar los resultados.\"",
    ["conjunto de datos", "patrones", "problemas", "estrategias"],
    ["conjunto de datos", "patrones", "problemas", "estrategias", "suposiciones", "corazonadas", "excusas"],
    "Esta estructura ayuda a Grok a organizar la respuesta en lectura, diagnostico y accion."
  ),
  textStep(
    "Usando Grok para ideas de negocio",
    "Grok tambien puede ayudarte a generar ideas de productos, startups y proyectos. Abre muchas posibilidades rapidamente, pero validar la oportunidad en el mercado sigue siendo responsabilidad tuya."
  ),
  fillStep(
    "Completa el espacio - Genera ideas!",
    "Construye un prompt para brainstorming de negocios.",
    "\"Genera ___ ideas de negocio usando ___ que puedan iniciarse con baja inversion y tengan potencial de ___.\"",
    ["10", "inteligencia artificial", "crecimiento"],
    ["10", "inteligencia artificial", "crecimiento", "1", "tramites", "estancamiento"],
    "Cuando defines cantidad, tecnologia y criterio de potencial, el brainstorming gana foco y utilidad."
  ),
  textStep(
    "Refinando las respuestas de Grok",
    "Una de las mejores formas de usar Grok es en ciclos: generar, revisar y mejorar. La primera respuesta casi nunca es la version final; el refinamiento es lo que la acerca a tu objetivo real."
  ),
  fillStep(
    "Completa el espacio - Refina el resultado!",
    "Fortalece una respuesta para que sea mas facil de aplicar.",
    "\"Mejora esta respuesta haciendola mas ___, agregando ___ practicos y organizandola en ___ claros.\"",
    ["clara", "ejemplos", "temas"],
    ["clara", "ejemplos", "temas", "vaga", "ruido", "bloques confusos"],
    "Refinar claridad, ejemplos y organizacion convierte una respuesta aceptable en algo mucho mas accionable."
  ),
  textStep(
    "Usando Grok para automatizar tareas",
    "Grok tambien puede ayudar a estructurar procesos y flujos de trabajo. En lugar de dejar tareas repetitivas dispersas, te ayuda a convertirlas en un proceso claro y repetible."
  ),
  fillStep(
    "Completa el espacio - Automatiza procesos!",
    "Construye una peticion para un flujo repetible.",
    "\"Crea un ___ paso a paso para automatizar ___ usando herramientas digitales e inteligencia artificial.\"",
    ["proceso", "tareas repetitivas"],
    ["proceso", "tareas repetitivas", "atajo improvisado", "tareas aleatorias"],
    "Cuando pides un proceso paso a paso, Grok ayuda a convertir la repeticion en una rutina operativa real."
  ),
  textStep(
    "Buenas practicas al usar Grok",
    "El error mas comun al usar IA es hacer preguntas vagas, sin contexto suficiente. Cuanto mas contexto e intencion pongas en el pedido, mas especifica y util sera la respuesta."
  ),
  quizStep(
    "Error mas comun",
    "Cual es el error mas comun al usar IA como Grok?",
    [
      "Hacer preguntas demasiado especificas.",
      "Pedir respuestas estructuradas.",
      "Hacer preguntas vagas sin suficiente contexto.",
      "Revisar las respuestas generadas."
    ],
    2,
    "Las preguntas vagas producen respuestas vagas. El contexto es lo que le muestra a Grok que es importante para ti."
  ),
  textStep(
    "Conclusion",
    "Usar Grok de forma estrategica transforma la manera en que investigas, creas contenido y analizas informacion. Prompts claros, investigacion inteligente, generacion de contenido, analisis de datos y automatizacion de procesos te permiten producir mas en menos tiempo.\n\nEl secreto no es solo usar IA. Es saber hacer las preguntas correctas. Usa contexto. Refina respuestas. Construye con inteligencia.\n\nLeccion concluida."
  ),
] as const;
export const GROK_MODULE_1_STEPS_FR = [
  textStep(
    "Travailler avec Grok pour la Recherche, l'Automatisation et la Creation de Contenu",
    "Bienvenue. Dans cette lecon, vous allez apprendre a utiliser Grok pour la recherche avancee, la generation de contenu, l'analyse d'informations et l'automatisation de taches. Grok est pense pour comprendre le contexte en profondeur et travailler avec des informations en temps reel, ce qui permet d'obtenir des resultats plus rapides et plus intelligents."
  ),
  textStep(
    "Pourquoi utiliser Grok est un superpouvoir",
    "Chercher des informations manuellement prend du temps. Grok peut analyser plusieurs sources rapidement, comprendre le contexte et generer des reponses structurees, ce qui fait gagner des heures de recherche manuelle."
  ),
  quizStep(
    "Recherche plus efficace",
    "Pourquoi utiliser Grok peut-il etre plus efficace qu'une recherche manuelle ?",
    [
      "Parce que Grok peut analyser plusieurs sources rapidement, comprendre le contexte et generer des reponses structurees.",
      "Parce que Grok remplace completement toute recherche humaine.",
      "Parce que Grok ne fonctionne que pour des questions simples.",
      "Parce que Grok copie seulement des resultats de recherche sans interpretation."
    ],
    0,
    "Sa force est d'accelerer la lecture, la synthese et l'organisation des informations sans vous forcer a ouvrir manuellement des dizaines de sources."
  ),
  textStep(
    "Creer des prompts clairs pour Grok",
    "Comme pour toute IA avancee, la qualite de la reponse depend de la clarte de votre demande. Quand vous donnez du contexte, un objectif et un format attendu, Grok comprend beaucoup mieux ce qu'il doit produire."
  ),
  fillStep(
    "Completez le vide - Ecrivez un bon prompt !",
    "Construisez une demande claire pour obtenir de meilleures reponses.",
    "\"Pour obtenir de meilleurs resultats avec Grok : decrivez le ___ que vous voulez resoudre, fournissez du ___ pertinent sur le sujet, precisez le ___ de reponse souhaite et indiquez si vous avez besoin de ___ ou d'exemples pratiques.\"",
    ["probleme", "contexte", "format", "etapes"],
    ["probleme", "contexte", "format", "etapes", "improvisation", "reponses vagues", "intuition"],
    "Les prompts clairs reduisent l'ambiguite et aident Grok a produire une reponse beaucoup plus utile."
  ),
  textStep(
    "Utiliser Grok pour une recherche intelligente",
    "L'un des plus grands avantages de Grok est sa capacite a rechercher et synthetiser des informations rapidement. Au lieu d'afficher seulement des liens, il aide a organiser les trouvailles et a aller plus vite vers l'essentiel."
  ),
  fillStep(
    "Completez le vide - Faites une recherche avec Grok !",
    "Construisez un prompt de recherche oriente vers une synthese utile.",
    "\"Faites une recherche sur ___ et genere un resume avec les points principaux, y compris les ___, les tendances actuelles et les possibles ___ pour les entreprises ou les createurs de contenu.\"",
    ["intelligence artificielle", "applications pratiques", "opportunites"],
    ["intelligence artificielle", "applications pratiques", "opportunites", "rumeurs", "generalites", "detours"],
    "Un bon prompt de recherche definit le theme, l'angle utile et l'impact pratique que vous voulez faire ressortir."
  ),
  textStep(
    "Utiliser Grok pour creer du contenu",
    "Grok peut aussi generer des articles, des posts, des scripts et des idees creatives. Il accelere la premiere version et aide a structurer le contenu, mais la revision finale doit toujours venir de vous."
  ),
  fillStep(
    "Completez le vide - Creez du contenu !",
    "Construisez un prompt simple pour ecrire avec structure.",
    "\"Creez un ___ sur ___ avec une introduction forte, trois points principaux et un ___ qui encourage le lecteur a agir.\"",
    ["article", "productivite avec l'IA", "call to action"],
    ["article", "productivite avec l'IA", "call to action", "titre vide", "sans direction", "fin aleatoire"],
    "Quand vous demandez le format, le theme, la structure et la conclusion, Grok produit un resultat beaucoup plus exploitable."
  ),
  textStep(
    "Analyser des informations avec Grok",
    "En plus de creer du contenu, Grok peut analyser des informations plus complexes. Il aide a identifier des tendances, des problemes possibles et des pistes d'amelioration beaucoup plus vite qu'une analyse manuelle."
  ),
  fillStep(
    "Completez le vide - Analysez avec l'IA !",
    "Construisez une demande pour recevoir analyse et recommandations.",
    "\"Analysez cet ___ et identifiez les principaux ___, les possibles ___ et les suggestions de ___ pour ameliorer les resultats.\"",
    ["ensemble de donnees", "motifs", "problemes", "strategies"],
    ["ensemble de donnees", "motifs", "problemes", "strategies", "suppositions", "excuses", "impressions"],
    "Cette structure aide Grok a organiser la reponse entre lecture, diagnostic et action."
  ),
  textStep(
    "Utiliser Grok pour des idees de business",
    "Grok peut aussi aider a generer des idees de produits, de startups et de projets. Il ouvre beaucoup de possibilites rapidement, mais la validation du marche reste votre responsabilite."
  ),
  fillStep(
    "Completez le vide - Generez des idees !",
    "Construisez un prompt de brainstorming business.",
    "\"Genere ___ idees de business utilisant ___ qui puissent etre lancees avec peu d'investissement et aient un potentiel de ___.\"",
    ["10", "l'intelligence artificielle", "croissance"],
    ["10", "l'intelligence artificielle", "croissance", "1", "paperasse", "stagnation"],
    "Quand vous definissez la quantite, la technologie et le filtre de potentiel, le brainstorming devient beaucoup plus utile."
  ),
  textStep(
    "Affiner les reponses de Grok",
    "L'une des meilleures facons d'utiliser Grok est de travailler en cycles : generer, revoir et ameliorer. La premiere reponse n'est presque jamais la version finale ; c'est l'affinage qui rapproche le resultat de votre vrai objectif."
  ),
  fillStep(
    "Completez le vide - Affinez le resultat !",
    "Renforcez une reponse pour la rendre plus facile a utiliser.",
    "\"Ameliore cette reponse en la rendant plus ___, en ajoutant des ___ pratiques et en l'organisant en ___ clairs.\"",
    ["claire", "exemples", "themes"],
    ["claire", "exemples", "themes", "vague", "bruit", "blocs confus"],
    "Affiner la clarte, les exemples et la structure transforme une reponse correcte en quelque chose de beaucoup plus actionnable."
  ),
  textStep(
    "Utiliser Grok pour automatiser des taches",
    "Grok peut aussi aider a structurer des processus et des flux de travail. Au lieu de laisser les taches repetitives dans le flou, il aide a les transformer en processus clairs et repetables."
  ),
  fillStep(
    "Completez le vide - Automatisez des processus !",
    "Construisez une demande pour un flux repetable.",
    "\"Creez un ___ etape par etape pour automatiser des ___ en utilisant des outils numeriques et l'intelligence artificielle.\"",
    ["processus", "taches repetitives"],
    ["processus", "taches repetitives", "raccourci improvise", "taches aleatoires"],
    "Quand vous demandez un processus etape par etape, Grok aide a transformer la repetition en routine operationnelle."
  ),
  textStep(
    "Bonnes pratiques avec Grok",
    "L'erreur la plus frequente avec l'IA est de poser des questions vagues, sans assez de contexte. Plus vous ajoutez de contexte et d'intention, plus la reponse devient precise et utile."
  ),
  quizStep(
    "Erreur la plus courante",
    "Quelle est l'erreur la plus courante quand on utilise une IA comme Grok ?",
    [
      "Poser des questions tres specifiques.",
      "Demander des reponses structurees.",
      "Poser des questions vagues sans assez de contexte.",
      "Revoir les reponses generees."
    ],
    2,
    "Des questions vagues produisent des reponses vagues. Le contexte est ce qui montre a Grok ce qui compte vraiment pour vous."
  ),
  textStep(
    "Conclusion",
    "Utiliser Grok de facon strategique transforme la maniere dont vous recherchez, creez du contenu et analysez des informations. Des prompts clairs, une recherche intelligente, la generation de contenu, l'analyse de donnees et l'automatisation de processus permettent de produire plus en moins de temps.\n\nLe secret n'est pas seulement d'utiliser l'IA. C'est de savoir poser les bonnes questions. Utilisez le contexte. Affinez les reponses. Construisez avec intelligence.\n\nLecon terminee."
  ),
] as const;
