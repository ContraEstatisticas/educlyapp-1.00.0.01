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

export const CLAUDE_MODULE_2_STEPS_PT = [
  textStep(
    "Aprendendo Qualquer Coisa com o Claude",
    "Bem-vindo de volta. Nesta licao, voce vai descobrir como transformar o Claude em seu professor particular, parceiro de estudos e guia de aprendizado para qualquer assunto, em qualquer nivel e no seu proprio ritmo."
  ),
  textStep(
    "O Claude como Parceiro de Aprendizado",
    "Aprender com o Claude e diferente de fazer uma pesquisa no Google. Em vez de receber uma lista de links, voce tem uma conversa, e cada resposta pode ser adaptada ao seu nivel, ao seu contexto e ao seu objetivo. Quanto melhor voce descreve quem voce e como aluno, mais poderoso ele se torna como professor."
  ),
  textStep(
    "Aprendendo um Assunto do Zero",
    "O segredo para aprender algo novo com o Claude esta em estabelecer seu ponto de partida, seu nivel atual, seu objetivo e sua forma de aprender antes de fazer a primeira pergunta. Um prompt bem construido informa o nivel do aluno, pede exemplos acessiveis e solicita um caminho de continuidade."
  ),
  fillStep(
    "Preencha a lacuna - Crie seu prompt de inicio de aprendizado!",
    "Monte um prompt forte para comecar a aprender um assunto do zero.",
    '"Voce e um professor especialista em ___. Quero aprender ___ do zero. Meu nivel atual e ___. Comece pelo conceito mais ___, use ___ do cotidiano e ao final me diga quais sao os proximos ___ que devo estudar."',
    ["historia", "a Segunda Guerra Mundial", "basico", "fundamental", "exemplos", "topicos"],
    [
      "historia",
      "a Segunda Guerra Mundial",
      "basico",
      "fundamental",
      "exemplos",
      "topicos",
      "ignorar",
      "teorias abstratas"
    ],
    "Definir professor, assunto, nivel, profundidade, tipo de exemplo e continuidade deixa o aprendizado muito mais guiado e util."
  ),
  textStep(
    "Criando um Plano de Estudos Personalizado",
    "Estudar sem estrutura e uma das principais causas de desistencia. O Claude pode montar um plano completo baseado no seu objetivo, tempo disponivel e nivel atual, e ainda ajustar conforme voce avanca. Depois, voce pode voltar e pedir para aprofundar cada etapa."
  ),
  fillStep(
    "Preencha a lacuna - Monte seu plano de estudos!",
    "Monte um pedido de plano de estudos claro e progressivo.",
    '"Crie um plano de estudos para eu aprender ___ em ___. Tenho ___ disponiveis por dia. Meu nivel atual e ___. Organize em ___ progressivas, do basico ao avancado, com os principais topicos de cada etapa e uma sugestao de como ___ o que aprendi."',
    ["programacao em Python", "2 meses", "45 minutos", "iniciante absoluto", "semanas", "praticar"],
    [
      "programacao em Python",
      "2 meses",
      "45 minutos",
      "iniciante absoluto",
      "semanas",
      "praticar",
      "resumir pouco",
      "nao revisar"
    ],
    "Quando voce informa tempo, prazo, nivel e formato de progressao, o Claude pode estruturar um plano realista e executavel."
  ),
  textStep(
    "Explicacoes com Analogias e Exemplos",
    "Conceitos dificeis ficam mais simples quando conectados a algo que voce ja conhece. O Claude e especialmente bom em criar analogias personalizadas, desde que voce diga qual e o seu universo de referencia. Em vez de pedir uma definicao tecnica, peca uma analogia com algo do dia a dia."
  ),
  textStep(
    "Testando o que Voce Aprendeu",
    "Aprender e uma coisa. Saber se realmente entendeu e outra. O Claude pode criar quizzes, exercicios e desafios personalizados para testar e consolidar o seu conhecimento. Quando errar uma questao, nao reinicie tudo: peca para explicar aquele conceito de outra forma."
  ),
  fillStep(
    "Preencha a lacuna - Crie seu exercicio de fixacao!",
    "Monte um pedido de exercicios para consolidar o conteudo estudado.",
    '"Acabei de estudar ___ com voce. Agora crie ___ perguntas para testar meu entendimento: ___ faceis, ___ medias e ___ dificeis. Apos eu responder, corrija e ___ o conceito por tras de cada resposta errada."',
    ["os tipos de governo", "9", "3", "3", "3", "explique"],
    [
      "os tipos de governo",
      "9",
      "3",
      "3",
      "3",
      "explique",
      "ignore",
      "recomece"
    ],
    "Separar os niveis de dificuldade e pedir explicacao dos erros transforma o exercicio em diagnostico e aprendizado ao mesmo tempo."
  ),
  textStep(
    "Aprendendo com Perguntas - O Metodo Socratico",
    "Em vez de receber respostas prontas, voce pode pedir ao Claude para te guiar com perguntas, desenvolvendo seu proprio raciocinio antes de receber a resposta. Essa tecnica gera um aprendizado mais profundo e duradouro porque voce constroi o raciocinio ativamente."
  ),
  fillStep(
    "Preencha a lacuna - Ative o modo socratico!",
    "Monte um prompt para aprender raciocinando junto com o Claude.",
    '"Quero entender ___ de forma profunda. Em vez de me explicar diretamente, use o ___: faca perguntas que me levem a ___ as respostas por mim mesmo. Se eu errar, de uma ___ sem entregar a resposta. So explique diretamente se eu ___ apos 3 tentativas."',
    ["como funciona a economia de mercado", "metodo socratico", "descobrir", "dica", "nao conseguir"],
    [
      "como funciona a economia de mercado",
      "metodo socratico",
      "descobrir",
      "dica",
      "nao conseguir",
      "copiar",
      "resposta pronta"
    ],
    "O modo socratico ajuda o Claude a puxar seu raciocinio em vez de apenas despejar a resposta final."
  ),
  textStep(
    "Revisando Antes de uma Prova ou Apresentacao",
    "O Claude pode criar resumos inteligentes, mapas de conceitos e revisoes rapidas, organizando tudo que voce precisa saber no menor espaco possivel."
  ),
  quizStep(
    "Melhor prompt de revisao",
    "Qual prompt gera a melhor revisao para uma prova?",
    [
      "\"Resuma esse assunto\"",
      "\"Me fale os pontos principais\"",
      "\"Crie uma revisao sobre [tema] com os 10 conceitos mais importantes, uma frase que resume cada um e um exemplo pratico. Organize do mais basico ao mais avancado e destaque os 3 que mais costumam aparecer em provas\"",
      "\"Fale sobre o tema de forma curta\""
    ],
    2,
    "O melhor prompt define quantidade, estrutura, nivel de organizacao e foco estrategico no que costuma cair mais."
  ),
  textStep(
    "Aprendendo Idiomas com o Claude",
    "Para quem quer aprender um novo idioma, o Claude funciona como professor de gramatica, parceiro de conversacao e corretor ao mesmo tempo."
  ),
  fillStep(
    "Preencha a lacuna - Inicie sua sessao de idiomas!",
    "Monte um prompt para praticar idioma com correcao e contexto.",
    '"Vamos praticar ___. Responda ___ durante toda a conversa. Se eu cometer erros de ___ ou ___, me corrija com gentileza, explique o erro e mostre a forma ___. Comece me fazendo uma pergunta sobre ___."',
    ["espanhol", "apenas em espanhol", "gramatica", "vocabulario", "correta", "meus planos para o fim de semana"],
    [
      "espanhol",
      "apenas em espanhol",
      "gramatica",
      "vocabulario",
      "correta",
      "meus planos para o fim de semana",
      "portugues tecnico",
      "ignorar erros"
    ],
    "Esse tipo de prompt transforma a conversa em pratica real com correcao imediata e contexto natural."
  ),
  textStep(
    "Aprofundando um Assunto que Voce Ja Conhece",
    "O Claude nao serve apenas para iniciantes. Se voce ja tem conhecimento em uma area, ele pode ir alem da superficie, debater com voce, apresentar perspectivas diferentes e desafiar suas ideias. Ao informar seu nivel atual, o Claude ajusta vocabulario, exemplos e profundidade."
  ),
  fillStep(
    "Preencha a lacuna - Va alem do basico!",
    "Monte um prompt para aprofundar um tema que voce ja domina em parte.",
    '"Ja tenho conhecimento ___ em ___. Quero aprofundar meu entendimento. Apresente ___ perspectivas menos conhecidas sobre esse tema, questione ___ que eu possa ter e me indique os conceitos mais ___ para quem quer ir do intermediario ao avancado."',
    ["intermediario", "filosofia estoica", "3", "crencas comuns", "relevantes"],
    [
      "intermediario",
      "filosofia estoica",
      "3",
      "crencas comuns",
      "relevantes",
      "superficial",
      "frases prontas"
    ],
    "Quando voce informa que ja nao esta no nivel basico, o Claude pode parar de repetir fundamentos e comecar a aprofundar de verdade."
  ),
  textStep(
    "Conclusao",
    "Com o Claude, voce tem acesso a um parceiro de aprendizado que adapta a explicacao ao seu nivel, cria planos de estudo, gera quizzes, usa analogias personalizadas, pratica idiomas com voce e aprofunda qualquer assunto sob demanda. O Claude acelera o caminho, mas a pratica deliberada e a revisao constante ainda dependem de voce.\n\nLicao concluida."
  ),
] as const;

export const CLAUDE_MODULE_2_STEPS_EN = [
  textStep(
    "Learning Anything with Claude",
    "Welcome back. In this lesson, you will discover how to turn Claude into your private teacher, study partner, and learning guide for any subject, at any level, and at your own pace."
  ),
  textStep(
    "Claude as a Learning Partner",
    "Learning with Claude is different from running a Google search. Instead of receiving a list of links, you have a conversation, and each answer can be adapted to your level, your context, and your goal. The better you describe who you are as a learner, the more powerful Claude becomes as a teacher."
  ),
  textStep(
    "Learning a Subject from Zero",
    "The secret to learning something new with Claude is to define your starting point, your current level, your goal, and your way of learning before you ask the first question. A well-built prompt informs the learner's level, asks for accessible examples, and requests a path for continuity."
  ),
  fillStep(
    "Fill in the blank - Create your learning kickoff prompt!",
    "Build a strong prompt to start learning a subject from zero.",
    '"You are an expert teacher in ___. I want to learn ___ from zero. My current level is ___. Start with the most ___ concept, use everyday ___, and at the end tell me which next ___ I should study."',
    ["history", "World War II", "basic", "fundamental", "examples", "topics"],
    ["history", "World War II", "basic", "fundamental", "examples", "topics", "ignore", "abstract theories"],
    "Defining teacher, subject, level, depth, example style, and continuity makes the learning process much more guided and effective."
  ),
  textStep(
    "Creating a Personalized Study Plan",
    "Studying without structure is one of the main causes of giving up. Claude can build a complete plan based on your goal, available time, and current level, and it can adjust as you progress. Then you can return and ask it to deepen each step."
  ),
  fillStep(
    "Fill in the blank - Build your study plan!",
    "Create a clear and progressive study-plan request.",
    '"Create a study plan for me to learn ___ in ___. I have ___ available per day. My current level is ___. Organize it into progressive ___, from basic to advanced, with the main topics of each stage and a suggestion for how to ___ what I learned."',
    ["Python programming", "2 months", "45 minutes", "absolute beginner", "weeks", "practice"],
    ["Python programming", "2 months", "45 minutes", "absolute beginner", "weeks", "practice", "summarize less", "skip review"],
    "When you provide time, deadline, level, and progression format, Claude can structure a realistic and useful plan."
  ),
  textStep(
    "Explanations with Analogies and Examples",
    "Difficult concepts become simpler when they connect to something you already know. Claude is especially good at building personalized analogies, as long as you say what your reference universe is. Instead of asking for a technical definition, ask for an analogy with something from daily life."
  ),
  textStep(
    "Testing What You Learned",
    "Learning is one thing. Knowing whether you truly understood is another. Claude can create quizzes, exercises, and personalized challenges to test and reinforce your knowledge. When you miss a question, do not restart everything. Ask Claude to explain that concept in a different way."
  ),
  fillStep(
    "Fill in the blank - Create your reinforcement exercise!",
    "Build a request for exercises that consolidate the content you studied.",
    '"I just studied ___ with you. Now create ___ questions to test my understanding: ___ easy, ___ medium, and ___ hard. After I answer, correct me and ___ the concept behind each wrong answer."',
    ["types of government", "9", "3", "3", "3", "explain"],
    ["types of government", "9", "3", "3", "3", "explain", "ignore", "restart"],
    "Separating difficulty levels and asking for explanations of mistakes turns the exercise into both diagnosis and learning."
  ),
  textStep(
    "Learning Through Questions - The Socratic Method",
    "Instead of receiving ready-made answers, you can ask Claude to guide you with questions, developing your own reasoning before you get the answer. This technique creates deeper and longer-lasting learning because you build the reasoning actively."
  ),
  fillStep(
    "Fill in the blank - Turn on Socratic mode!",
    "Build a prompt to learn by reasoning together with Claude.",
    '"I want to understand ___ in depth. Instead of explaining it directly, use the ___: ask questions that lead me to ___ the answers by myself. If I make a mistake, give me a ___ without revealing the answer. Only explain directly if I ___ after 3 attempts."',
    ["how market economy works", "Socratic method", "discover", "hint", "cannot do it"],
    ["how market economy works", "Socratic method", "discover", "hint", "cannot do it", "copy", "ready answer"],
    "Socratic mode helps Claude pull your reasoning forward instead of simply dropping the final answer on you."
  ),
  textStep(
    "Reviewing Before a Test or Presentation",
    "Claude can create smart summaries, concept maps, and quick reviews, organizing everything you need to know in the smallest space possible."
  ),
  quizStep(
    "Best review prompt",
    "Which prompt generates the best review for a test?",
    [
      "\"Summarize this subject\"",
      "\"Tell me the main points\"",
      "\"Create a review about [topic] with the 10 most important concepts, one sentence that summarizes each one, and one practical example. Organize it from the most basic to the most advanced and highlight the 3 that appear most often in tests\"",
      "\"Talk about the topic briefly\""
    ],
    2,
    "The best prompt defines quantity, structure, level of organization, and strategic focus on what matters most."
  ),
  textStep(
    "Learning Languages with Claude",
    "For anyone who wants to learn a new language, Claude can act as a grammar teacher, conversation partner, and corrector at the same time."
  ),
  fillStep(
    "Fill in the blank - Start your language session!",
    "Build a prompt for language practice with correction and context.",
    '"Let\'s practice ___. Reply ___ during the whole conversation. If I make mistakes in ___ or ___, correct me gently, explain the mistake, and show me the ___ form. Start by asking me a question about ___."',
    ["Spanish", "only in Spanish", "grammar", "vocabulary", "correct", "my weekend plans"],
    ["Spanish", "only in Spanish", "grammar", "vocabulary", "correct", "my weekend plans", "technical Portuguese", "ignore mistakes"],
    "This kind of prompt turns the conversation into real practice with immediate correction and natural context."
  ),
  textStep(
    "Going Deeper into a Subject You Already Know",
    "Claude is not only for beginners. If you already know a subject, it can go beyond the surface, debate with you, present different perspectives, and challenge your ideas. When you inform your current level, Claude adjusts vocabulary, examples, and depth."
  ),
  fillStep(
    "Fill in the blank - Go beyond the basics!",
    "Build a prompt to deepen a topic you already partly know.",
    '"I already have ___ knowledge in ___. I want to deepen my understanding. Present ___ lesser-known perspectives on this topic, question any ___ I may have, and point me to the most ___ concepts for someone who wants to move from intermediate to advanced."',
    ["intermediate", "Stoic philosophy", "3", "common beliefs", "relevant"],
    ["intermediate", "Stoic philosophy", "3", "common beliefs", "relevant", "superficial", "stock phrases"],
    "When you make it clear that you are no longer at the basic level, Claude can stop repeating foundations and start deepening the conversation for real."
  ),
  textStep(
    "Conclusion",
    "With Claude, you have access to a learning partner that adapts explanations to your level, builds study plans, generates quizzes, uses personalized analogies, practices languages with you, and deepens any subject on demand. Claude speeds up the path, but deliberate practice and constant review still depend on you.\n\nLesson complete."
  ),
] as const;

export const CLAUDE_MODULE_2_STEPS_ES = [
  textStep(
    "Aprendiendo Cualquier Cosa con Claude",
    "Bienvenido de nuevo. En esta leccion descubriras como convertir a Claude en tu profesor particular, companero de estudio y guia de aprendizaje para cualquier tema, en cualquier nivel y a tu propio ritmo."
  ),
  textStep(
    "Claude como Companero de Aprendizaje",
    "Aprender con Claude es distinto a hacer una busqueda en Google. En lugar de recibir una lista de enlaces, tienes una conversacion, y cada respuesta puede adaptarse a tu nivel, tu contexto y tu objetivo. Cuanto mejor describas quien eres como estudiante, mas poderoso se vuelve Claude como profesor."
  ),
  textStep(
    "Aprender un Tema desde Cero",
    "El secreto para aprender algo nuevo con Claude esta en definir tu punto de partida, tu nivel actual, tu objetivo y tu forma de aprender antes de hacer la primera pregunta. Un prompt bien construido informa el nivel del alumno, pide ejemplos accesibles y solicita un camino de continuidad."
  ),
  fillStep(
    "Completa el espacio - Crea tu prompt de inicio de aprendizaje!",
    "Construye un prompt fuerte para empezar a aprender un tema desde cero.",
    '"Eres un profesor experto en ___. Quiero aprender ___ desde cero. Mi nivel actual es ___. Empieza por el concepto mas ___, usa ___ de la vida cotidiana y al final dime cuales son los proximos ___ que debo estudiar."',
    ["historia", "la Segunda Guerra Mundial", "basico", "fundamental", "ejemplos", "temas"],
    ["historia", "la Segunda Guerra Mundial", "basico", "fundamental", "ejemplos", "temas", "ignorar", "teorias abstractas"],
    "Definir profesor, tema, nivel, profundidad, tipo de ejemplo y continuidad hace que el aprendizaje sea mucho mas guiado y eficaz."
  ),
  textStep(
    "Creando un Plan de Estudios Personalizado",
    "Estudiar sin estructura es una de las principales causas de abandono. Claude puede construir un plan completo basado en tu objetivo, tiempo disponible y nivel actual, y puede ajustarlo a medida que avanzas. Luego puedes volver y pedirle que profundice cada etapa."
  ),
  fillStep(
    "Completa el espacio - Arma tu plan de estudio!",
    "Crea una solicitud clara y progresiva de plan de estudio.",
    '"Crea un plan de estudio para que yo aprenda ___ en ___. Tengo ___ disponibles por dia. Mi nivel actual es ___. Organiza todo en ___ progresivas, de lo basico a lo avanzado, con los temas principales de cada etapa y una sugerencia sobre como ___ lo que aprendi."',
    ["programacion en Python", "2 meses", "45 minutos", "principiante absoluto", "semanas", "practicar"],
    ["programacion en Python", "2 meses", "45 minutos", "principiante absoluto", "semanas", "practicar", "resumir menos", "no revisar"],
    "Cuando informas tiempo, plazo, nivel y formato de progresion, Claude puede estructurar un plan realista y util."
  ),
  textStep(
    "Explicaciones con Analogias y Ejemplos",
    "Los conceptos dificiles se vuelven mas simples cuando se conectan con algo que ya conoces. Claude es especialmente bueno creando analogias personalizadas, siempre que le digas cual es tu universo de referencia. En vez de pedir una definicion tecnica, pide una analogia con algo de la vida diaria."
  ),
  textStep(
    "Probando lo que Aprendiste",
    "Aprender es una cosa. Saber si realmente entendiste es otra. Claude puede crear quizzes, ejercicios y desafios personalizados para probar y consolidar tu conocimiento. Cuando te equivoques en una pregunta, no reinicies todo. Pidele a Claude que explique ese concepto de otra forma."
  ),
  fillStep(
    "Completa el espacio - Crea tu ejercicio de fijacion!",
    "Construye una solicitud de ejercicios para consolidar el contenido estudiado.",
    '"Acabo de estudiar ___ contigo. Ahora crea ___ preguntas para evaluar mi entendimiento: ___ faciles, ___ medias y ___ dificiles. Despues de que responda, corrigeme y ___ el concepto detras de cada respuesta incorrecta."',
    ["los tipos de gobierno", "9", "3", "3", "3", "explica"],
    ["los tipos de gobierno", "9", "3", "3", "3", "explica", "ignora", "reinicia"],
    "Separar niveles de dificultad y pedir explicaciones de los errores convierte el ejercicio en diagnostico y aprendizaje a la vez."
  ),
  textStep(
    "Aprender con Preguntas - El Metodo Socratico",
    "En lugar de recibir respuestas listas, puedes pedirle a Claude que te guie con preguntas, desarrollando tu propio razonamiento antes de recibir la respuesta. Esta tecnica produce un aprendizaje mas profundo y duradero porque construyes el razonamiento de manera activa."
  ),
  fillStep(
    "Completa el espacio - Activa el modo socratico!",
    "Construye un prompt para aprender razonando junto a Claude.",
    '"Quiero entender ___ de forma profunda. En lugar de explicarmelo directamente, usa el ___: haz preguntas que me lleven a ___ las respuestas por mi mismo. Si me equivoco, dame una ___ sin revelar la respuesta. Solo explica directamente si yo ___ despues de 3 intentos."',
    ["como funciona la economia de mercado", "metodo socratico", "descubrir", "pista", "no logro hacerlo"],
    ["como funciona la economia de mercado", "metodo socratico", "descubrir", "pista", "no logro hacerlo", "copiar", "respuesta lista"],
    "El modo socratico ayuda a Claude a impulsar tu razonamiento en lugar de soltar simplemente la respuesta final."
  ),
  textStep(
    "Repasando Antes de una Prueba o Presentacion",
    "Claude puede crear resmenes inteligentes, mapas de conceptos y repasos rapidos, organizando todo lo que necesitas saber en el menor espacio posible."
  ),
  quizStep(
    "Mejor prompt de repaso",
    "Que prompt genera el mejor repaso para una prueba?",
    [
      "\"Resume este tema\"",
      "\"Dime los puntos principales\"",
      "\"Crea un repaso sobre [tema] con los 10 conceptos mas importantes, una frase que resuma cada uno y un ejemplo practico. Organiza todo de lo mas basico a lo mas avanzado y destaca los 3 que mas suelen aparecer en examenes\"",
      "\"Habla del tema de forma breve\""
    ],
    2,
    "El mejor prompt define cantidad, estructura, nivel de organizacion y foco estrategico en lo que mas importa."
  ),
  textStep(
    "Aprendiendo Idiomas con Claude",
    "Para quien quiere aprender un idioma nuevo, Claude puede actuar como profesor de gramatica, companero de conversacion y corrector al mismo tiempo."
  ),
  fillStep(
    "Completa el espacio - Inicia tu sesion de idiomas!",
    "Construye un prompt para practicar idioma con correccion y contexto.",
    '"Vamos a practicar ___. Responde ___ durante toda la conversacion. Si cometo errores de ___ o ___, corrigeme con amabilidad, explica el error y muestrame la forma ___. Empieza haciendome una pregunta sobre ___."',
    ["espanol", "solo en espanol", "gramatica", "vocabulario", "correcta", "mis planes para el fin de semana"],
    ["espanol", "solo en espanol", "gramatica", "vocabulario", "correcta", "mis planes para el fin de semana", "portugues tecnico", "ignorar errores"],
    "Este tipo de prompt convierte la conversacion en practica real con correccion inmediata y contexto natural."
  ),
  textStep(
    "Profundizando en un Tema que Ya Conoces",
    "Claude no es solo para principiantes. Si ya conoces un area, puede ir mas alla de la superficie, debatir contigo, presentar perspectivas distintas y desafiar tus ideas. Cuando informas tu nivel actual, Claude ajusta vocabulario, ejemplos y profundidad."
  ),
  fillStep(
    "Completa el espacio - Ve mas alla de lo basico!",
    "Construye un prompt para profundizar un tema que ya conoces en parte.",
    '"Ya tengo conocimientos ___ en ___. Quiero profundizar mi entendimiento. Presenta ___ perspectivas menos conocidas sobre este tema, cuestiona las ___ que pueda tener e indicame los conceptos mas ___ para quien quiere pasar de intermedio a avanzado."',
    ["intermedios", "filosofia estoica", "3", "creencias comunes", "relevantes"],
    ["intermedios", "filosofia estoica", "3", "creencias comunes", "relevantes", "superficiales", "frases hechas"],
    "Cuando dejas claro que ya no estas en el nivel basico, Claude puede dejar de repetir fundamentos y empezar a profundizar de verdad."
  ),
  textStep(
    "Conclusion",
    "Con Claude, tienes acceso a un companero de aprendizaje que adapta las explicaciones a tu nivel, construye planes de estudio, genera quizzes, usa analogias personalizadas, practica idiomas contigo y profundiza cualquier tema bajo demanda. Claude acelera el camino, pero la practica deliberada y la revision constante siguen dependiendo de ti.\n\nLeccion completada."
  ),
] as const;

export const CLAUDE_MODULE_2_STEPS_FR = [
  textStep(
    "Apprendre N'importe Quoi avec Claude",
    "Bienvenue de retour. Dans cette lecon, vous allez decouvrir comment transformer Claude en professeur particulier, partenaire d'etude et guide d'apprentissage pour n'importe quel sujet, a n'importe quel niveau et a votre propre rythme."
  ),
  textStep(
    "Claude comme Partenaire d'Apprentissage",
    "Apprendre avec Claude est different d'une recherche Google. Au lieu de recevoir une liste de liens, vous avez une conversation, et chaque reponse peut etre adaptee a votre niveau, votre contexte et votre objectif. Plus vous decrivez clairement qui vous etes comme apprenant, plus Claude devient puissant comme professeur."
  ),
  textStep(
    "Apprendre un Sujet a Partir de Zero",
    "Le secret pour apprendre quelque chose de nouveau avec Claude est de definir votre point de depart, votre niveau actuel, votre objectif et votre facon d'apprendre avant de poser la premiere question. Un prompt bien construit indique le niveau de l'apprenant, demande des exemples accessibles et sollicite une suite logique."
  ),
  fillStep(
    "Remplissez le vide - Creez votre prompt de depart !",
    "Construisez un prompt solide pour commencer a apprendre un sujet depuis zero.",
    '"Vous etes un professeur expert en ___. Je veux apprendre ___ a partir de zero. Mon niveau actuel est ___. Commencez par le concept le plus ___, utilisez des ___ du quotidien et dites-moi a la fin quels sont les prochains ___ que je dois etudier."',
    ["histoire", "la Seconde Guerre mondiale", "basique", "fondamental", "exemples", "themes"],
    ["histoire", "la Seconde Guerre mondiale", "basique", "fondamental", "exemples", "themes", "ignorer", "theories abstraites"],
    "Definir le professeur, le sujet, le niveau, la profondeur, le type d'exemple et la suite rend l'apprentissage beaucoup plus guide et efficace."
  ),
  textStep(
    "Creer un Plan d'Etude Personnalise",
    "Etudier sans structure est l'une des principales causes d'abandon. Claude peut construire un plan complet base sur votre objectif, votre temps disponible et votre niveau actuel, puis l'ajuster a mesure que vous avancez. Ensuite, vous pouvez revenir et lui demander d'approfondir chaque etape."
  ),
  fillStep(
    "Remplissez le vide - Construisez votre plan d'etude !",
    "Creez une demande claire et progressive de plan d'etude.",
    '"Cree un plan d\'etude pour que j\'apprenne ___ en ___. J\'ai ___ disponibles par jour. Mon niveau actuel est ___. Organise cela en ___ progressives, du niveau de base au niveau avance, avec les principaux themes de chaque etape et une suggestion de la facon de ___ ce que j\'ai appris."',
    ["la programmation Python", "2 mois", "45 minutes", "debutant absolu", "semaines", "pratiquer"],
    ["la programmation Python", "2 mois", "45 minutes", "debutant absolu", "semaines", "pratiquer", "resumer moins", "ne pas revoir"],
    "Quand vous indiquez le temps, l'echeance, le niveau et le format de progression, Claude peut structurer un plan realiste et utile."
  ),
  textStep(
    "Explications avec Analogies et Exemples",
    "Les concepts difficiles deviennent plus simples quand ils sont relies a quelque chose que vous connaissez deja. Claude est particulierement bon pour creer des analogies personnalisees, a condition que vous precisiez votre univers de reference. Au lieu de demander une definition technique, demandez une analogie avec quelque chose du quotidien."
  ),
  textStep(
    "Tester ce que Vous Avez Appris",
    "Apprendre est une chose. Savoir si vous avez vraiment compris en est une autre. Claude peut creer des quiz, des exercices et des defis personnalises pour tester et consolider vos connaissances. Quand vous vous trompez a une question, ne recommencez pas tout. Demandez a Claude d'expliquer ce concept d'une autre facon."
  ),
  fillStep(
    "Remplissez le vide - Creez votre exercice de consolidation !",
    "Construisez une demande d'exercices pour consolider le contenu etudie.",
    '"Je viens d\'etudier ___ avec vous. Creez maintenant ___ questions pour tester ma comprehension : ___ faciles, ___ moyennes et ___ difficiles. Apres mes reponses, corrigez-moi et ___ le concept derriere chaque mauvaise reponse."',
    ["les types de gouvernement", "9", "3", "3", "3", "expliquez"],
    ["les types de gouvernement", "9", "3", "3", "3", "expliquez", "ignorez", "redemarrez"],
    "Separer les niveaux de difficulte et demander une explication des erreurs transforme l'exercice en diagnostic et en apprentissage a la fois."
  ),
  textStep(
    "Apprendre par les Questions - La Methode Socratique",
    "Au lieu de recevoir des reponses toutes faites, vous pouvez demander a Claude de vous guider par des questions, afin de developper votre propre raisonnement avant d'obtenir la reponse. Cette technique produit un apprentissage plus profond et plus durable, car vous construisez activement le raisonnement."
  ),
  fillStep(
    "Remplissez le vide - Activez le mode socratique !",
    "Construisez un prompt pour apprendre en raisonnant avec Claude.",
    '"Je veux comprendre ___ en profondeur. Au lieu de me l\'expliquer directement, utilisez la ___ : posez des questions qui m\'ameneront a ___ les reponses par moi-meme. Si je me trompe, donnez-moi un ___ sans reveler la reponse. N\'expliquez directement que si je ___ apres 3 tentatives."',
    ["le fonctionnement de l'economie de marche", "methode socratique", "decouvrir", "indice", "n'y arrive pas"],
    ["le fonctionnement de l'economie de marche", "methode socratique", "decouvrir", "indice", "n'y arrive pas", "copier", "reponse toute prete"],
    "Le mode socratique aide Claude a tirer votre raisonnement vers l'avant au lieu de simplement livrer la reponse finale."
  ),
  textStep(
    "Reviser Avant un Examen ou une Presentation",
    "Claude peut creer des resumes intelligents, des cartes de concepts et des revisions rapides, en organisant tout ce que vous devez savoir dans le minimum d'espace possible."
  ),
  quizStep(
    "Meilleur prompt de revision",
    "Quel prompt genere la meilleure revision pour un examen ?",
    [
      "\"Resume ce sujet\"",
      "\"Dis-moi les points principaux\"",
      "\"Cree une revision sur [theme] avec les 10 concepts les plus importants, une phrase qui resume chacun et un exemple pratique. Organise le tout du plus basique au plus avance et mets en evidence les 3 qui tombent le plus souvent aux examens\"",
      "\"Parle du sujet de facon breve\""
    ],
    2,
    "Le meilleur prompt definit la quantite, la structure, le niveau d'organisation et le focus strategique sur ce qui compte le plus."
  ),
  textStep(
    "Apprendre des Langues avec Claude",
    "Pour toute personne qui veut apprendre une nouvelle langue, Claude peut jouer en meme temps le role de professeur de grammaire, partenaire de conversation et correcteur."
  ),
  fillStep(
    "Remplissez le vide - Lancez votre session de langue !",
    "Construisez un prompt pour pratiquer une langue avec correction et contexte.",
    '"Pratiquons ___. Repondez ___ pendant toute la conversation. Si je fais des erreurs de ___ ou de ___, corrigez-moi gentiment, expliquez l\'erreur et montrez-moi la forme ___. Commencez par me poser une question sur ___."',
    ["l'espagnol", "uniquement en espagnol", "grammaire", "vocabulaire", "correcte", "mes projets pour le week-end"],
    ["l'espagnol", "uniquement en espagnol", "grammaire", "vocabulaire", "correcte", "mes projets pour le week-end", "portugais technique", "ignorer les erreurs"],
    "Ce type de prompt transforme la conversation en pratique reelle avec correction immediate et contexte naturel."
  ),
  textStep(
    "Approfondir un Sujet que Vous Connaissez Deja",
    "Claude n'est pas reserve aux debutants. Si vous connaissez deja un domaine, il peut aller au-dela de la surface, debattre avec vous, presenter des perspectives differentes et challenger vos idees. Quand vous indiquez votre niveau actuel, Claude ajuste le vocabulaire, les exemples et la profondeur."
  ),
  fillStep(
    "Remplissez le vide - Allez au-dela des bases !",
    "Construisez un prompt pour approfondir un sujet que vous connaissez deja en partie.",
    '"J\'ai deja un niveau ___ en ___. Je veux approfondir ma comprehension. Presentez ___ perspectives moins connues sur ce sujet, questionnez les ___ que je peux avoir et indiquez-moi les concepts les plus ___ pour quelqu\'un qui veut passer de l\'intermediaire a l\'avance."',
    ["intermediaire", "la philosophie stoicienne", "3", "croyances communes", "pertinents"],
    ["intermediaire", "la philosophie stoicienne", "3", "croyances communes", "pertinents", "superficiel", "phrases toutes faites"],
    "Quand vous montrez clairement que vous n'etes plus au niveau de base, Claude peut cesser de repeter les fondations et commencer a approfondir reellement."
  ),
  textStep(
    "Conclusion",
    "Avec Claude, vous avez acces a un partenaire d'apprentissage qui adapte les explications a votre niveau, construit des plans d'etude, genere des quiz, utilise des analogies personnalisees, pratique les langues avec vous et approfondit n'importe quel sujet a la demande. Claude accelere le chemin, mais la pratique deliberee et la revision constante dependent toujours de vous.\n\nLecon terminee."
  ),
] as const;
