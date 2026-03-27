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

export const GROK_MODULE_6_STEPS_PT = [
  textStep(
    "Usando o Grok como Fonte de Criatividade",
    "Bem-vindo. Nesta licao, voce vai aprender como usar o Grok como uma ferramenta poderosa de criatividade. O Grok pode ajudar a gerar ideias, explorar conceitos novos, destravar bloqueios criativos e desenvolver projetos inovadores, funcionando como um parceiro de brainstorming que nunca fica sem sugestoes."
  ),
  textStep(
    "Por que Usar IA para Criatividade e um Superpoder",
    "Todo processo criativo passa por momentos de bloqueio ou falta de inspiracao. O Grok consegue gerar multiplas ideias rapidamente e explorar perspectivas que talvez voce nao tivesse considerado sozinho, sem substituir sua criatividade, mas ampliando-a."
  ),
  quizStep(
    "IA e criatividade",
    "Por que usar IA como o Grok pode ajudar na criatividade?",
    [
      "Porque ele pode gerar multiplas ideias rapidamente e explorar diferentes perspectivas que talvez voce nao tivesse considerado.",
      "Porque IA substitui completamente a criatividade humana.",
      "Porque ideias geradas por IA sempre sao originais e perfeitas.",
      "Porque criatividade so pode vir da mente humana."
    ],
    0,
    "O valor do Grok esta em expandir opcoes, provocar novos angulos e acelerar exploracao criativa, nao em substituir a autoria humana."
  ),
  textStep(
    "Gerando Ideias Criativas",
    "Uma das formas mais simples de usar o Grok e pedir ideias iniciais. Quanto mais ideias voce coloca na mesa, maiores sao as chances de encontrar algo realmente forte."
  ),
  fillStep(
    "Preencha a lacuna - Gere ideias!",
    "Monte um prompt simples para brainstorming criativo.",
    "\"Gere ___ ideias criativas para ___ que sejam diferentes do comum.\"",
    ["10", "um projeto digital"],
    ["10", "um projeto digital", "1", "um resumo tecnico"],
    "Volume ajuda a criatividade. Um bom pedido abre espaco para explorar varias direcoes antes de escolher a melhor."
  ),
  textStep(
    "Explorando Perspectivas Diferentes",
    "O Grok tambem pode ajudar a enxergar um problema por angulos diferentes. Isso e especialmente util quando voce esta imerso demais no proprio projeto e perde visao de conjunto."
  ),
  fillStep(
    "Preencha a lacuna - Explore perspectivas!",
    "Monte um prompt para analisar um tema por pontos de vista diferentes.",
    "\"Explique ___ sob tres perspectivas diferentes: ___, ___ e ___.\"",
    ["um produto digital", "empreendedor", "usuario", "investidor"],
    ["um produto digital", "empreendedor", "usuario", "investidor", "palpite", "achismo"],
    "Olhar para o mesmo tema com lentes diferentes revela oportunidades, riscos e ajustes que passariam despercebidos."
  ),
  textStep(
    "Criando Conceitos Originais",
    "Outra estrategia forte e pedir ao Grok para combinar ideias distintas. Muitas inovacoes surgem exatamente da combinacao inteligente de conceitos ja existentes."
  ),
  fillStep(
    "Preencha a lacuna - Combine conceitos!",
    "Monte um prompt para criar um conceito novo a partir de duas areas.",
    "\"Crie um conceito de projeto que combine ___ com ___ para criar algo inovador.\"",
    ["inteligencia artificial", "educacao"],
    ["inteligencia artificial", "educacao", "rotina", "improviso"],
    "Combinar areas diferentes e uma das formas mais praticas de gerar ideias originais sem partir do zero."
  ),
  textStep(
    "Superando o Bloqueio Criativo",
    "O Grok pode ajudar muito quando voce nao sabe por onde comecar. Nesses momentos, pequenas direcoes iniciais ja sao suficientes para tirar uma ideia do lugar."
  ),
  fillStep(
    "Preencha a lacuna - Quebre o bloqueio!",
    "Monte um prompt curto para destravar um projeto.",
    "\"Me de ___ formas diferentes de comecar um projeto sobre ___.\"",
    ["5", "inteligencia artificial"],
    ["5", "inteligencia artificial", "1", "qualquer assunto"],
    "Para sair do bloqueio, o importante nao e buscar perfeicao imediata, mas ganhar movimento com algumas boas opcoes iniciais."
  ),
  textStep(
    "Criando Historias e Narrativas",
    "Narrativas sao valiosas para marketing, videos e conteudo. Uma boa historia comunica emocao, contexto e significado com muito mais impacto do que uma explicacao fria."
  ),
  fillStep(
    "Preencha a lacuna - Crie uma narrativa!",
    "Monte um pedido para gerar uma historia curta com estrutura clara.",
    "\"Crie uma historia curta sobre ___ com comeco, desenvolvimento e um final ___.\"",
    ["tecnologia do futuro", "surpreendente"],
    ["tecnologia do futuro", "surpreendente", "confuso", "inacabado"],
    "Quando voce pede estrutura e tom do encerramento, o Grok consegue entregar narrativas mais memoraveis e uteis."
  ),
  textStep(
    "Transformando Ideias em Projetos",
    "Depois de gerar ideias, o passo seguinte e estrutura-las. Sem estrutura, ate uma ideia muito boa continua abstrata demais para sair do papel."
  ),
  fillStep(
    "Preencha a lacuna - Estruture o projeto!",
    "Monte um prompt para transformar uma ideia em algo executavel.",
    "\"Transforme esta ideia em um ___ com objetivo, publico-alvo e ___ principais.\"",
    ["projeto", "funcionalidades"],
    ["projeto", "funcionalidades", "rascunho solto", "detalhes aleatorios"],
    "Estruturar uma ideia em objetivo, publico e funcionalidades ajuda a converter criatividade em algo concreto."
  ),
  textStep(
    "Refinando Ideias Criativas",
    "Uma ideia inicial quase sempre pode melhorar. O erro mais comum e aceitar a primeira resposta sem testar variacoes, ajustes e combinacoes mais fortes."
  ),
  quizStep(
    "Erro mais comum na criatividade com IA",
    "Qual e o erro mais comum ao usar IA para criatividade?",
    [
      "Gerar muitas ideias.",
      "Testar diferentes abordagens.",
      "Aceitar a primeira ideia sem explorar outras possibilidades.",
      "Pedir variacoes."
    ],
    2,
    "Criatividade com IA funciona melhor como processo iterativo. A primeira ideia costuma ser apenas um ponto de partida."
  ),
  textStep(
    "Conclusao",
    "Usar o Grok como fonte de criatividade permite explorar ideias de forma rapida e dinamica. Brainstorming, novas perspectivas, combinacoes de conceitos e refinamento ajudam a expandir sua capacidade criativa.\n\nA IA nao substitui a criatividade humana. Ela amplifica sua capacidade de criar. Explore ideias. Combine conceitos. Crie sem limites.\n\nLicao concluida."
  ),
] as const;

export const GROK_MODULE_6_STEPS_EN = [
  textStep(
    "Using Grok as a Source of Creativity",
    "Welcome. In this lesson, you will learn how to use Grok as a powerful creativity tool. Grok can help generate ideas, explore new concepts, unblock creative stalls, and develop innovative projects, acting like a brainstorming partner that never runs out of suggestions."
  ),
  textStep(
    "Why Using AI for Creativity Is a Superpower",
    "Every creative process goes through moments of blockage or lack of inspiration. Grok can generate multiple ideas quickly and explore perspectives you might not have considered on your own, without replacing your creativity, but expanding it."
  ),
  quizStep(
    "AI and creativity",
    "Why can using AI like Grok help with creativity?",
    [
      "Because it can generate multiple ideas quickly and explore different perspectives you may not have considered.",
      "Because AI completely replaces human creativity.",
      "Because AI-generated ideas are always original and perfect.",
      "Because creativity can only come from the human mind."
    ],
    0,
    "Grok's value is in expanding options, provoking new angles, and accelerating creative exploration, not replacing human authorship."
  ),
  textStep(
    "Generating Creative Ideas",
    "One of the simplest ways to use Grok is to ask for starting ideas. The more ideas you put on the table, the higher the chance of finding something truly strong."
  ),
  fillStep(
    "Fill in the blank - Generate ideas!",
    "Build a simple prompt for creative brainstorming.",
    "\"Generate ___ creative ideas for ___ that are different from the usual.\"",
    ["10", "a digital project"],
    ["10", "a digital project", "1", "a technical summary"],
    "Volume helps creativity. A strong request opens room to explore several directions before choosing the best one."
  ),
  textStep(
    "Exploring Different Perspectives",
    "Grok can also help you see the same problem from different angles. That is especially useful when you are too immersed in your own project and lose broader perspective."
  ),
  fillStep(
    "Fill in the blank - Explore perspectives!",
    "Build a prompt to analyze a topic through different viewpoints.",
    "\"Explain ___ from three different perspectives: ___, ___, and ___.\"",
    ["a digital product", "entrepreneur", "user", "investor"],
    ["a digital product", "entrepreneur", "user", "investor", "guesswork", "random opinion"],
    "Looking at the same topic through different lenses reveals opportunities, risks, and improvements that would otherwise stay hidden."
  ),
  textStep(
    "Creating Original Concepts",
    "Another strong strategy is to ask Grok to combine distinct ideas. Many innovations emerge from the intelligent combination of concepts that already exist."
  ),
  fillStep(
    "Fill in the blank - Combine concepts!",
    "Build a prompt to create a new concept from two fields.",
    "\"Create a project concept that combines ___ with ___ to create something innovative.\"",
    ["artificial intelligence", "education"],
    ["artificial intelligence", "education", "routine", "improvisation"],
    "Combining different fields is one of the most practical ways to generate original ideas without starting from nothing."
  ),
  textStep(
    "Overcoming Creative Block",
    "Grok can help a lot when you do not know where to start. In those moments, a few initial directions are often enough to get a project moving again."
  ),
  fillStep(
    "Fill in the blank - Break the block!",
    "Build a short prompt to unblock a project.",
    "\"Give me ___ different ways to start a project about ___.\"",
    ["5", "artificial intelligence"],
    ["5", "artificial intelligence", "1", "any topic"],
    "To get past a block, the key is not immediate perfection, but movement through a few strong starting options."
  ),
  textStep(
    "Creating Stories and Narratives",
    "Narratives are valuable for marketing, videos, and content. A good story communicates emotion, context, and meaning with much more impact than a cold explanation."
  ),
  fillStep(
    "Fill in the blank - Create a narrative!",
    "Build a request for a short story with clear structure.",
    "\"Create a short story about ___ with a beginning, development, and a ___ ending.\"",
    ["future technology", "surprising"],
    ["future technology", "surprising", "confusing", "unfinished"],
    "When you ask for structure and the tone of the ending, Grok can produce narratives that are more memorable and useful."
  ),
  textStep(
    "Turning Ideas into Projects",
    "After generating ideas, the next step is structuring them. Without structure, even a very good idea stays too abstract to become real."
  ),
  fillStep(
    "Fill in the blank - Structure the project!",
    "Build a prompt to turn an idea into something more executable.",
    "\"Turn this idea into a ___ with a goal, target audience, and main ___.\"",
    ["project", "features"],
    ["project", "features", "loose draft", "random details"],
    "Structuring an idea into goal, audience, and features helps convert creativity into something concrete."
  ),
  textStep(
    "Refining Creative Ideas",
    "An initial idea can almost always improve. The most common mistake is accepting the first answer without testing stronger variations, adjustments, and combinations."
  ),
  quizStep(
    "Most common creativity mistake with AI",
    "What is the most common mistake when using AI for creativity?",
    [
      "Generating many ideas.",
      "Testing different approaches.",
      "Accepting the first idea without exploring other possibilities.",
      "Requesting variations."
    ],
    2,
    "Creativity with AI works best as an iterative process. The first idea is usually only a starting point."
  ),
  textStep(
    "Conclusion",
    "Using Grok as a source of creativity lets you explore ideas quickly and dynamically. Brainstorming, new perspectives, concept combinations, and refinement all help expand your creative capacity.\n\nAI does not replace human creativity. It amplifies your ability to create. Explore ideas. Combine concepts. Create without limits.\n\nLesson completed."
  ),
] as const;

export const GROK_MODULE_6_STEPS_ES = [
  textStep(
    "Usando Grok como Fuente de Creatividad",
    "Bienvenido. En esta leccion aprenderas a usar Grok como una herramienta poderosa de creatividad. Grok puede ayudarte a generar ideas, explorar conceptos nuevos, desbloquear bloqueos creativos y desarrollar proyectos innovadores, funcionando como un companero de brainstorming que nunca se queda sin sugerencias."
  ),
  textStep(
    "Por que Usar IA para la Creatividad es un Superpoder",
    "Todo proceso creativo pasa por momentos de bloqueo o falta de inspiracion. Grok puede generar multiples ideas rapidamente y explorar perspectivas que quizas no habias considerado por tu cuenta, sin sustituir tu creatividad, sino ampliandola."
  ),
  quizStep(
    "IA y creatividad",
    "Por que usar IA como Grok puede ayudar en la creatividad?",
    [
      "Porque puede generar multiples ideas rapidamente y explorar diferentes perspectivas que quizas no habias considerado.",
      "Porque la IA sustituye completamente la creatividad humana.",
      "Porque las ideas generadas por IA siempre son originales y perfectas.",
      "Porque la creatividad solo puede venir de la mente humana."
    ],
    0,
    "El valor de Grok esta en ampliar opciones, provocar nuevos angulos y acelerar la exploracion creativa, no en sustituir la autoria humana."
  ),
  textStep(
    "Generando Ideas Creativas",
    "Una de las formas mas simples de usar Grok es pedir ideas iniciales. Cuantas mas ideas pones sobre la mesa, mayores son las posibilidades de encontrar algo realmente fuerte."
  ),
  fillStep(
    "Completa el espacio - Genera ideas!",
    "Construye un prompt simple para brainstorming creativo.",
    "\"Genera ___ ideas creativas para ___ que sean diferentes de lo comun.\"",
    ["10", "un proyecto digital"],
    ["10", "un proyecto digital", "1", "un resumen tecnico"],
    "El volumen ayuda a la creatividad. Un buen pedido abre espacio para explorar varias direcciones antes de elegir la mejor."
  ),
  textStep(
    "Explorando Perspectivas Diferentes",
    "Grok tambien puede ayudarte a ver un mismo problema desde angulos distintos. Eso es especialmente util cuando estas demasiado inmerso en tu propio proyecto y pierdes perspectiva."
  ),
  fillStep(
    "Completa el espacio - Explora perspectivas!",
    "Construye un prompt para analizar un tema desde distintos puntos de vista.",
    "\"Explica ___ desde tres perspectivas diferentes: ___, ___ y ___.\"",
    ["un producto digital", "emprendedor", "usuario", "inversor"],
    ["un producto digital", "emprendedor", "usuario", "inversor", "suposicion", "ocurrencia"],
    "Mirar el mismo tema con lentes distintas revela oportunidades, riesgos y mejoras que de otro modo pasarian desapercibidos."
  ),
  textStep(
    "Creando Conceptos Originales",
    "Otra estrategia fuerte es pedirle a Grok que combine ideas distintas. Muchas innovaciones nacen justamente de la combinacion inteligente de conceptos que ya existen."
  ),
  fillStep(
    "Completa el espacio - Combina conceptos!",
    "Construye un prompt para crear un concepto nuevo a partir de dos areas.",
    "\"Crea un concepto de proyecto que combine ___ con ___ para crear algo innovador.\"",
    ["inteligencia artificial", "educacion"],
    ["inteligencia artificial", "educacion", "rutina", "improvisacion"],
    "Combinar areas distintas es una de las maneras mas practicas de generar ideas originales sin empezar desde cero."
  ),
  textStep(
    "Superando el Bloqueo Creativo",
    "Grok puede ayudar mucho cuando no sabes por donde empezar. En esos momentos, unas pocas direcciones iniciales ya son suficientes para poner un proyecto en movimiento."
  ),
  fillStep(
    "Completa el espacio - Rompe el bloqueo!",
    "Construye un prompt corto para destrabar un proyecto.",
    "\"Dame ___ formas diferentes de empezar un proyecto sobre ___.\"",
    ["5", "inteligencia artificial"],
    ["5", "inteligencia artificial", "1", "cualquier tema"],
    "Para salir del bloqueo, la clave no es la perfeccion inmediata, sino recuperar movimiento con algunas buenas opciones iniciales."
  ),
  textStep(
    "Creando Historias y Narrativas",
    "Las narrativas son valiosas para marketing, videos y contenido. Una buena historia comunica emocion, contexto y significado con mucho mas impacto que una explicacion fria."
  ),
  fillStep(
    "Completa el espacio - Crea una narrativa!",
    "Construye una solicitud para generar una historia corta con estructura clara.",
    "\"Crea una historia corta sobre ___ con inicio, desarrollo y un final ___.\"",
    ["tecnologia del futuro", "sorprendente"],
    ["tecnologia del futuro", "sorprendente", "confuso", "incompleto"],
    "Cuando pides estructura y el tono del cierre, Grok puede entregar narrativas mas memorables y utiles."
  ),
  textStep(
    "Transformando Ideas en Proyectos",
    "Despues de generar ideas, el siguiente paso es estructurarlas. Sin estructura, incluso una idea muy buena sigue siendo demasiado abstracta para hacerse realidad."
  ),
  fillStep(
    "Completa el espacio - Estructura el proyecto!",
    "Construye un prompt para convertir una idea en algo mas ejecutable.",
    "\"Transforma esta idea en un ___ con objetivo, publico objetivo y ___ principales.\"",
    ["proyecto", "funcionalidades"],
    ["proyecto", "funcionalidades", "borrador suelto", "detalles aleatorios"],
    "Estructurar una idea en objetivo, publico y funcionalidades ayuda a convertir creatividad en algo concreto."
  ),
  textStep(
    "Refinando Ideas Creativas",
    "Una idea inicial casi siempre puede mejorar. El error mas comun es aceptar la primera respuesta sin probar variaciones, ajustes y combinaciones mas potentes."
  ),
  quizStep(
    "Error mas comun en creatividad con IA",
    "Cual es el error mas comun al usar IA para creatividad?",
    [
      "Generar muchas ideas.",
      "Probar diferentes enfoques.",
      "Aceptar la primera idea sin explorar otras posibilidades.",
      "Pedir variaciones."
    ],
    2,
    "La creatividad con IA funciona mejor como un proceso iterativo. La primera idea suele ser solo un punto de partida."
  ),
  textStep(
    "Conclusion",
    "Usar Grok como fuente de creatividad te permite explorar ideas de forma rapida y dinamica. El brainstorming, las nuevas perspectivas, las combinaciones de conceptos y el refinamiento ayudan a expandir tu capacidad creativa.\n\nLa IA no sustituye la creatividad humana. Amplifica tu capacidad de crear. Explora ideas. Combina conceptos. Crea sin limites.\n\nLeccion completada."
  ),
] as const;

export const GROK_MODULE_6_STEPS_FR = [
  textStep(
    "Utiliser Grok comme Source de Creativite",
    "Bienvenue. Dans cette lecon, vous allez apprendre a utiliser Grok comme un puissant outil de creativite. Grok peut vous aider a generer des idees, explorer de nouveaux concepts, debloquer des blocages creatifs et developper des projets innovants, en agissant comme un partenaire de brainstorming qui ne manque jamais de suggestions."
  ),
  textStep(
    "Pourquoi Utiliser l'IA pour la Creativite est un Superpouvoir",
    "Tout processus creatif traverse des moments de blocage ou de manque d'inspiration. Grok peut generer rapidement plusieurs idees et explorer des perspectives que vous n'auriez peut-etre pas envisagees seul, sans remplacer votre creativite, mais en l'amplifiant."
  ),
  quizStep(
    "IA et creativite",
    "Pourquoi utiliser une IA comme Grok peut-il aider la creativite ?",
    [
      "Parce qu'elle peut generer rapidement plusieurs idees et explorer differentes perspectives que vous n'auriez peut-etre pas envisagees.",
      "Parce que l'IA remplace completement la creativite humaine.",
      "Parce que les idees generees par l'IA sont toujours originales et parfaites.",
      "Parce que la creativite ne peut venir que de l'esprit humain."
    ],
    0,
    "La valeur de Grok est d'elargir les options, de provoquer de nouveaux angles et d'accelerer l'exploration creative, pas de remplacer l'auteur humain."
  ),
  textStep(
    "Generer des Idees Creatives",
    "L'une des facons les plus simples d'utiliser Grok est de lui demander des idees de depart. Plus vous mettez d'idees sur la table, plus vous avez de chances de trouver quelque chose de vraiment fort."
  ),
  fillStep(
    "Completez le blanc - Generez des idees !",
    "Construisez un prompt simple pour un brainstorming creatif.",
    "\"Genere ___ idees creatives pour ___ qui soient differentes de l'ordinaire.\"",
    ["10", "un projet digital"],
    ["10", "un projet digital", "1", "un resume technique"],
    "Le volume aide la creativite. Une bonne demande ouvre de nombreuses directions avant de choisir la meilleure."
  ),
  textStep(
    "Explorer des Perspectives Differentes",
    "Grok peut aussi vous aider a voir un meme probleme sous differents angles. C'est particulierement utile lorsque vous etes trop immerge dans votre propre projet et que vous perdez de vue l'ensemble."
  ),
  fillStep(
    "Completez le blanc - Explorez des perspectives !",
    "Construisez un prompt pour analyser un sujet selon differents points de vue.",
    "\"Explique ___ sous trois perspectives differentes : ___, ___ et ___.\"",
    ["un produit digital", "entrepreneur", "utilisateur", "investisseur"],
    ["un produit digital", "entrepreneur", "utilisateur", "investisseur", "supposition", "intuition"],
    "Regarder un meme sujet avec plusieurs lunettes revele des opportunites, des risques et des ajustements qui resteraient sinon caches."
  ),
  textStep(
    "Creer des Concepts Originaux",
    "Une autre strategie forte consiste a demander a Grok de combiner des idees distinctes. De nombreuses innovations naissent justement de la combinaison intelligente de concepts deja existants."
  ),
  fillStep(
    "Completez le blanc - Combinez des concepts !",
    "Construisez un prompt pour creer un nouveau concept a partir de deux domaines.",
    "\"Cree un concept de projet qui combine ___ avec ___ pour creer quelque chose d'innovant.\"",
    ["intelligence artificielle", "education"],
    ["intelligence artificielle", "education", "routine", "improvisation"],
    "Combiner des domaines differents est l'une des facons les plus pratiques de generer des idees originales sans repartir de zero."
  ),
  textStep(
    "Surmonter le Blocage Creatif",
    "Grok peut beaucoup aider lorsque vous ne savez pas par ou commencer. Dans ces moments, quelques directions initiales suffisent souvent a remettre le projet en mouvement."
  ),
  fillStep(
    "Completez le blanc - Debloquez la situation !",
    "Construisez un prompt court pour sortir d'un blocage.",
    "\"Donne-moi ___ facons differentes de commencer un projet sur ___.\"",
    ["5", "l'intelligence artificielle"],
    ["5", "l'intelligence artificielle", "1", "n'importe quel sujet"],
    "Pour sortir d'un blocage, il ne faut pas viser la perfection immediate, mais retrouver du mouvement grace a quelques bonnes pistes."
  ),
  textStep(
    "Creer des Histoires et des Narrations",
    "Les narrations sont precieuses pour le marketing, les videos et le contenu. Une bonne histoire transmet emotion, contexte et sens avec bien plus d'impact qu'une explication froide."
  ),
  fillStep(
    "Completez le blanc - Creez une narration !",
    "Construisez une demande pour generer une courte histoire avec une structure claire.",
    "\"Cree une courte histoire sur ___ avec un debut, un developpement et une fin ___.\"",
    ["la technologie du futur", "surprenante"],
    ["la technologie du futur", "surprenante", "confuse", "inachevee"],
    "Quand vous demandez une structure et le ton de la fin, Grok peut livrer des narrations plus memorables et plus utiles."
  ),
  textStep(
    "Transformer des Idees en Projets",
    "Apres avoir genere des idees, l'etape suivante consiste a les structurer. Sans structure, meme une tres bonne idee reste trop abstraite pour devenir reelle."
  ),
  fillStep(
    "Completez le blanc - Structurez le projet !",
    "Construisez un prompt pour transformer une idee en quelque chose de plus executable.",
    "\"Transforme cette idee en un ___ avec un objectif, un public cible et des ___ principales.\"",
    ["projet", "fonctionnalites"],
    ["projet", "fonctionnalites", "brouillon flou", "details aleatoires"],
    "Structurer une idee en objectif, public et fonctionnalites aide a transformer la creativite en quelque chose de concret."
  ),
  textStep(
    "Affiner des Idees Creatives",
    "Une idee initiale peut presque toujours etre amelioree. L'erreur la plus courante est d'accepter la premiere reponse sans tester des variations, des ajustements et des combinaisons plus fortes."
  ),
  quizStep(
    "Erreur la plus frequente en creativite avec l'IA",
    "Quelle est l'erreur la plus courante quand on utilise l'IA pour la creativite ?",
    [
      "Generer beaucoup d'idees.",
      "Tester differentes approches.",
      "Accepter la premiere idee sans explorer d'autres possibilites.",
      "Demander des variations."
    ],
    2,
    "La creativite avec l'IA fonctionne mieux comme processus iteratif. La premiere idee n'est generalement qu'un point de depart."
  ),
  textStep(
    "Conclusion",
    "Utiliser Grok comme source de creativite permet d'explorer des idees de facon rapide et dynamique. Le brainstorming, les nouvelles perspectives, les combinaisons de concepts et l'affinage aident a elargir votre capacite creative.\n\nL'IA ne remplace pas la creativite humaine. Elle amplifie votre capacite a creer. Explorez des idees. Combinez des concepts. Creez sans limites.\n\nLecon terminee."
  ),
] as const;
