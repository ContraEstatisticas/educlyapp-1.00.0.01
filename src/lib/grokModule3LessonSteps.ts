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

export const GROK_MODULE_3_STEPS_PT = [
  textStep(
    "Usando o Grok para Marketing",
    "Bem-vindo. Nesta licao, voce vai aprender como usar o Grok para marketing digital. O Grok pode ajudar a criar anuncios, gerar ideias de campanhas, analisar mercado, produzir copies persuasivas e encontrar oportunidades de crescimento com muito mais rapidez."
  ),
  textStep(
    "Por que Usar IA no Marketing e um Superpoder",
    "Criar campanhas de marketing normalmente exige pesquisa, testes e muita producao de conteudo. Com IA, voce consegue gerar ideias, analisar tendencias e produzir materiais rapidamente, permitindo testar mais em menos tempo."
  ),
  quizStep(
    "IA e estrategia de marketing",
    "Por que usar IA como o Grok pode melhorar estrategias de marketing?",
    [
      "Porque ele consegue gerar ideias, analisar tendencias e criar conteudos de marketing rapidamente, permitindo testar mais campanhas em menos tempo.",
      "Porque IA substitui completamente profissionais de marketing.",
      "Porque campanhas geradas por IA sempre vendem mais.",
      "Porque IA funciona apenas para empresas grandes."
    ],
    0,
    "A grande vantagem esta em aumentar velocidade de pesquisa, criacao e iteracao, nao em eliminar a estrategia humana."
  ),
  textStep(
    "Criando Copies de Anuncios com o Grok",
    "Uma das aplicacoes mais poderosas do Grok e gerar textos persuasivos para anuncios. Voce pode testar varias versoes rapidamente ate descobrir qual mensagem funciona melhor."
  ),
  fillStep(
    "Preencha a lacuna - Crie uma copy!",
    "Monte um prompt para gerar uma copy de anuncio objetiva e persuasiva.",
    "\"Crie uma copy de anuncio para ___ destacando o principal ___, incluindo um gancho forte no inicio e um ___ claro no final.\"",
    ["curso de inteligencia artificial", "beneficio", "call to action"],
    ["curso de inteligencia artificial", "beneficio", "call to action", "produto aleatorio", "detalhe irrelevante", "final confuso"],
    "Quando voce define oferta, beneficio central e fechamento, o Grok consegue criar anuncios muito mais direcionados."
  ),
  textStep(
    "Criando Ideias de Campanhas de Marketing",
    "O Grok tambem pode gerar conceitos completos de campanha. Testar abordagens diferentes ajuda voce a descobrir mais rapido quais angulos e formatos tem mais chance de converter."
  ),
  fillStep(
    "Preencha a lacuna - Gere campanhas!",
    "Monte um pedido para brainstorm de campanhas.",
    "\"Gere ___ ideias de campanhas de marketing para promover ___ usando estrategias de ___.\"",
    ["5", "um curso de IA", "redes sociais"],
    ["5", "um curso de IA", "redes sociais", "1", "qualquer coisa", "achismo"],
    "Quando voce define quantidade, oferta e canal, o Grok gera ideias mais uteis para teste real."
  ),
  textStep(
    "Criando Conteudo para Redes Sociais",
    "O Grok pode gerar posts prontos para redes sociais, ajudando voce a manter consistencia e velocidade sem travar na pagina em branco."
  ),
  fillStep(
    "Preencha a lacuna - Crie um post!",
    "Monte um prompt para um post com estrutura simples e engajadora.",
    "\"Crie um post para ___ sobre ___, com um gancho no inicio, conteudo util e um ___ incentivando comentarios.\"",
    ["Instagram", "inteligencia artificial", "call to action"],
    ["Instagram", "inteligencia artificial", "call to action", "blog aleatorio", "tema vago", "fim neutro"],
    "Um bom prompt para redes sociais combina plataforma, tema e uma acao clara para gerar engajamento."
  ),
  textStep(
    "Criando Roteiros para Videos de Marketing",
    "Videos curtos sao uma das ferramentas mais fortes do marketing digital. O Grok pode estruturar um roteiro rapidamente com gancho, beneficio e fechamento para conversao."
  ),
  fillStep(
    "Preencha a lacuna - Crie um roteiro!",
    "Monte um prompt para um video curto de marketing.",
    "\"Crie um roteiro curto para um video de ___ segundos promovendo ___, com um gancho forte, explicacao do beneficio e um ___ no final.\"",
    ["30", "curso de IA", "call to action"],
    ["30", "curso de IA", "call to action", "5", "tema solto", "encerramento vazio"],
    "Definir duracao, oferta e CTA ajuda o Grok a entregar um roteiro mais enxuto e mais usavel."
  ),
  textStep(
    "Analisando o Publico-Alvo com o Grok",
    "Entender o publico e essencial para qualquer estrategia de marketing. O Grok pode ajudar a mapear dores, desejos e barreiras rapidamente para voce ajustar melhor a comunicacao."
  ),
  fillStep(
    "Preencha a lacuna - Analise o publico!",
    "Monte um prompt para mapear dores e desafios do publico.",
    "\"Analise o publico interessado em ___ e descreva suas principais ___, desejos e possiveis ___ que esse publico enfrenta.\"",
    ["inteligencia artificial", "dores", "problemas"],
    ["inteligencia artificial", "dores", "problemas", "vontades vagas", "ruidos", "detalhes soltos"],
    "Quando voce pede dores, desejos e problemas, o Grok ajuda a transformar publico abstrato em perfil mais acionavel."
  ),
  textStep(
    "Criando Funis de Marketing",
    "O Grok tambem pode ajudar a estruturar funis de vendas. Um bom funil acompanha a jornada do cliente antes da compra e organiza melhor a comunicacao em cada etapa."
  ),
  fillStep(
    "Preencha a lacuna - Estruture um funil!",
    "Monte um prompt para um funil de marketing simples.",
    "\"Crie um funil de marketing para vender ___ com etapas de ___, consideracao e conversao.\"",
    ["curso de IA", "atracao"],
    ["curso de IA", "atracao", "confusao", "improviso"],
    "Quando o funil e dividido em etapas, fica mais facil pensar em conteudo e oferta para cada momento da jornada."
  ),
  textStep(
    "Gerando Ideias de Conteudo Viral",
    "Outra estrategia poderosa e pedir ao Grok ideias virais para redes sociais. Quanto mais ideias voce testa, maior a chance de encontrar formatos que performam melhor."
  ),
  fillStep(
    "Preencha a lacuna - Gere ideias!",
    "Monte um prompt para brainstorm de conteudos virais.",
    "\"Gere ___ ideias de conteudos virais sobre ___ que poderiam performar bem em redes sociais.\"",
    ["10", "inteligencia artificial"],
    ["10", "inteligencia artificial", "1", "tema generico"],
    "Volume e consistencia aumentam as chances de encontrar ideias com alto potencial de alcance."
  ),
  textStep(
    "Boas Praticas ao Usar o Grok para Marketing",
    "O erro mais comum ao usar IA no marketing e gerar algo uma vez e parar ali. IA funciona muito melhor como ferramenta de iteracao: quanto mais voce testa e refina, melhores ficam os resultados."
  ),
  quizStep(
    "Erro mais comum no marketing com IA",
    "Qual e o erro mais comum ao usar IA para marketing?",
    [
      "Criar muitas variacoes de anuncios.",
      "Testar diferentes campanhas.",
      "Usar IA apenas uma vez sem testar ou otimizar os resultados.",
      "Pedir sugestoes de estrategia."
    ],
    2,
    "O verdadeiro ganho vem da iteracao. Gerar, testar, medir e ajustar e o que faz a IA render mais no marketing."
  ),
  textStep(
    "Conclusao",
    "Usar o Grok para marketing permite criar campanhas, conteudo e estrategias com muito mais velocidade. Copies de anuncios, ideias de campanhas, posts, roteiros de video e analise de publico ajudam a aumentar alcance e conversoes.\n\nO segredo nao e apenas usar IA. E testar ideias rapidamente e melhorar com base nos resultados. Teste campanhas. Refine estrategias. Cresca com inteligencia.\n\nLicao concluida."
  ),
] as const;
export const GROK_MODULE_3_STEPS_EN = [
  textStep(
    "Using Grok for Marketing",
    "Welcome. In this lesson, you will learn how to use Grok for digital marketing. Grok can help create ads, generate campaign ideas, analyze markets, write persuasive copy, and uncover growth opportunities much faster."
  ),
  textStep(
    "Why Using AI in Marketing Is a Superpower",
    "Marketing campaigns usually require research, testing, and a lot of content production. With AI, you can generate ideas, analyze trends, and create materials quickly, which lets you test more in less time."
  ),
  quizStep(
    "AI and marketing strategy",
    "Why can using AI like Grok improve marketing strategies?",
    [
      "Because it can generate ideas, analyze trends, and create marketing content quickly, allowing more campaigns to be tested in less time.",
      "Because AI completely replaces marketing professionals.",
      "Because AI-generated campaigns always sell more.",
      "Because AI only works for large companies."
    ],
    0,
    "The real advantage is faster research, creation, and iteration, not replacing human marketing judgment."
  ),
  textStep(
    "Creating Ad Copy with Grok",
    "One of Grok's strongest uses is generating persuasive text for ads. You can create many versions quickly and test which angle performs better."
  ),
  fillStep(
    "Fill in the blank - Create copy!",
    "Build a prompt for direct, persuasive ad copy.",
    "\"Create ad copy for ___ highlighting the main ___, including a strong hook at the beginning and a clear ___ at the end.\"",
    ["artificial intelligence course", "benefit", "call to action"],
    ["artificial intelligence course", "benefit", "call to action", "random product", "irrelevant detail", "confusing ending"],
    "When you define the offer, key benefit, and closing action, Grok can generate much sharper ad copy."
  ),
  textStep(
    "Generating Marketing Campaign Ideas",
    "Grok can also generate full campaign concepts. Testing different angles helps you discover faster which messages and formats are more likely to convert."
  ),
  fillStep(
    "Fill in the blank - Generate campaigns!",
    "Build a request for campaign brainstorming.",
    "\"Generate ___ marketing campaign ideas to promote ___ using ___ strategies.\"",
    ["5", "an AI course", "social media"],
    ["5", "an AI course", "social media", "1", "anything", "guesswork"],
    "When you define the number, offer, and channel, Grok produces campaign ideas that are easier to test in reality."
  ),
  textStep(
    "Creating Social Media Content",
    "Grok can generate ready-to-use social posts, helping you keep consistency and speed without getting stuck on the blank page."
  ),
  fillStep(
    "Fill in the blank - Create a post!",
    "Build a prompt for a simple, engaging social post.",
    "\"Create a post for ___ about ___, with a hook at the beginning, useful content, and a ___ encouraging comments.\"",
    ["Instagram", "artificial intelligence", "call to action"],
    ["Instagram", "artificial intelligence", "call to action", "random blog", "vague theme", "flat ending"],
    "A good social prompt combines platform, topic, and a clear action that encourages engagement."
  ),
  textStep(
    "Creating Scripts for Marketing Videos",
    "Short videos are one of the strongest tools in digital marketing. Grok can quickly structure a script with a hook, a benefit explanation, and a conversion-focused ending."
  ),
  fillStep(
    "Fill in the blank - Create a script!",
    "Build a prompt for a short marketing video.",
    "\"Create a short script for a ___ second video promoting ___, with a strong hook, a benefit explanation, and a ___ at the end.\"",
    ["30", "an AI course", "call to action"],
    ["30", "an AI course", "call to action", "5", "loose topic", "empty ending"],
    "Defining length, offer, and CTA helps Grok deliver a tighter and more usable script."
  ),
  textStep(
    "Analyzing the Target Audience with Grok",
    "Understanding the audience is essential in any marketing strategy. Grok can help map pains, desires, and barriers quickly so your messaging becomes more precise."
  ),
  fillStep(
    "Fill in the blank - Analyze the audience!",
    "Build a prompt to map pains and challenges.",
    "\"Analyze the audience interested in ___ and describe their main ___, desires, and possible ___ this audience faces.\"",
    ["artificial intelligence", "pain points", "problems"],
    ["artificial intelligence", "pain points", "problems", "vague wishes", "noise", "loose details"],
    "When you ask for pain points, desires, and problems, Grok helps turn an abstract audience into something actionable."
  ),
  textStep(
    "Creating Marketing Funnels",
    "Grok can also help structure sales funnels. A good funnel follows the customer journey before the purchase and organizes communication across each stage."
  ),
  fillStep(
    "Fill in the blank - Structure a funnel!",
    "Build a prompt for a simple marketing funnel.",
    "\"Create a marketing funnel to sell ___ with stages for ___, consideration, and conversion.\"",
    ["an AI course", "attraction"],
    ["an AI course", "attraction", "confusion", "improvisation"],
    "When the funnel is broken into stages, it becomes easier to design content and offers for each point in the journey."
  ),
  textStep(
    "Generating Viral Content Ideas",
    "Another powerful tactic is to ask Grok for viral content ideas for social platforms. The more ideas you test, the higher the chance of finding formats that truly perform."
  ),
  fillStep(
    "Fill in the blank - Generate ideas!",
    "Build a prompt for viral-content brainstorming.",
    "\"Generate ___ viral content ideas about ___ that could perform well on social media.\"",
    ["10", "artificial intelligence"],
    ["10", "artificial intelligence", "1", "generic theme"],
    "Volume and consistency increase the odds of finding ideas with strong reach potential."
  ),
  textStep(
    "Best Practices When Using Grok for Marketing",
    "The most common mistake with AI in marketing is generating something once and stopping there. AI works much better as an iteration tool: the more you test and refine, the better the output becomes."
  ),
  quizStep(
    "Most common marketing mistake with AI",
    "What is the most common mistake when using AI for marketing?",
    [
      "Creating many ad variations.",
      "Testing different campaigns.",
      "Using AI only once without testing or optimizing the results.",
      "Asking for strategic suggestions."
    ],
    2,
    "The biggest gain comes from iteration. Generate, test, measure, and adjust."
  ),
  textStep(
    "Conclusion",
    "Using Grok for marketing helps you create campaigns, content, and strategies much faster. Ad copy, campaign ideas, social posts, video scripts, and audience analysis all help improve reach and conversions.\n\nThe secret is not just using AI. It is testing ideas quickly and improving based on the results. Test campaigns. Refine strategies. Grow intelligently.\n\nLesson complete."
  ),
] as const;
export const GROK_MODULE_3_STEPS_ES = [
  textStep(
    "Usando Grok para Marketing",
    "Bienvenido. En esta leccion vas a aprender a usar Grok para marketing digital. Grok puede ayudarte a crear anuncios, generar ideas de campanas, analizar mercado, escribir copies persuasivas y encontrar oportunidades de crecimiento con mucha mas rapidez."
  ),
  textStep(
    "Por que usar IA en marketing es un superpoder",
    "Crear campanas de marketing normalmente exige investigacion, pruebas y mucha produccion de contenido. Con IA, puedes generar ideas, analizar tendencias y crear materiales rapidamente, lo que permite probar mas en menos tiempo."
  ),
  quizStep(
    "IA y estrategia de marketing",
    "Por que usar IA como Grok puede mejorar estrategias de marketing?",
    [
      "Porque puede generar ideas, analizar tendencias y crear contenidos de marketing rapidamente, permitiendo probar mas campanas en menos tiempo.",
      "Porque la IA sustituye por completo a los profesionales de marketing.",
      "Porque las campanas generadas por IA siempre venden mas.",
      "Porque la IA solo funciona para empresas grandes."
    ],
    0,
    "La ventaja real esta en acelerar investigacion, creacion e iteracion, no en reemplazar la estrategia humana."
  ),
  textStep(
    "Creando copies de anuncios con Grok",
    "Una de las aplicaciones mas fuertes de Grok es generar textos persuasivos para anuncios. Puedes crear varias versiones rapidamente y probar cual funciona mejor."
  ),
  fillStep(
    "Completa el espacio - Crea una copy!",
    "Construye un prompt para una copy de anuncio directa y persuasiva.",
    "\"Crea una copy de anuncio para ___ destacando el principal ___, incluyendo un gancho fuerte al inicio y un ___ claro al final.\"",
    ["curso de inteligencia artificial", "beneficio", "call to action"],
    ["curso de inteligencia artificial", "beneficio", "call to action", "producto aleatorio", "detalle irrelevante", "final confuso"],
    "Cuando defines oferta, beneficio principal y cierre, Grok puede generar anuncios mucho mas enfocados."
  ),
  textStep(
    "Creando ideas de campanas de marketing",
    "Grok tambien puede generar conceptos completos de campana. Probar distintos enfoques ayuda a descubrir mas rapido que mensajes y formatos pueden convertir mejor."
  ),
  fillStep(
    "Completa el espacio - Genera campanas!",
    "Construye una peticion para brainstorming de campanas.",
    "\"Genera ___ ideas de campanas de marketing para promover ___ usando estrategias de ___.\"",
    ["5", "un curso de IA", "redes sociales"],
    ["5", "un curso de IA", "redes sociales", "1", "cualquier cosa", "suposicion"],
    "Cuando defines cantidad, oferta y canal, Grok genera ideas mucho mas utiles para pruebas reales."
  ),
  textStep(
    "Creando contenido para redes sociales",
    "Grok puede generar posts listos para redes sociales, ayudandote a mantener consistencia y velocidad sin quedarte bloqueado frente a la pagina en blanco."
  ),
  fillStep(
    "Completa el espacio - Crea un post!",
    "Construye un prompt para un post simple y atractivo.",
    "\"Crea un post para ___ sobre ___, con un gancho al inicio, contenido util y un ___ que incentive comentarios.\"",
    ["Instagram", "inteligencia artificial", "call to action"],
    ["Instagram", "inteligencia artificial", "call to action", "blog aleatorio", "tema vago", "final plano"],
    "Un buen prompt para redes combina plataforma, tema y una accion clara para generar interaccion."
  ),
  textStep(
    "Creando guiones para videos de marketing",
    "Los videos cortos son una de las herramientas mas fuertes del marketing digital. Grok puede estructurar rapidamente un guion con gancho, beneficio y cierre orientado a conversion."
  ),
  fillStep(
    "Completa el espacio - Crea un guion!",
    "Construye un prompt para un video corto de marketing.",
    "\"Crea un guion corto para un video de ___ segundos promocionando ___, con un gancho fuerte, explicacion del beneficio y un ___ al final.\"",
    ["30", "curso de IA", "call to action"],
    ["30", "curso de IA", "call to action", "5", "tema suelto", "cierre vacio"],
    "Definir duracion, oferta y CTA ayuda a Grok a entregar un guion mas util y mas directo."
  ),
  textStep(
    "Analizando el publico objetivo con Grok",
    "Entender el publico es esencial en cualquier estrategia de marketing. Grok puede ayudarte a mapear dolores, deseos y barreras rapidamente para ajustar mejor el mensaje."
  ),
  fillStep(
    "Completa el espacio - Analiza el publico!",
    "Construye un prompt para mapear dolores y desafios.",
    "\"Analiza el publico interesado en ___ y describe sus principales ___, deseos y posibles ___ que ese publico enfrenta.\"",
    ["inteligencia artificial", "dolores", "problemas"],
    ["inteligencia artificial", "dolores", "problemas", "deseos vagos", "ruido", "detalles sueltos"],
    "Cuando pides dolores, deseos y problemas, Grok ayuda a convertir un publico abstracto en algo mucho mas accionable."
  ),
  textStep(
    "Creando embudos de marketing",
    "Grok tambien puede ayudar a estructurar embudos de venta. Un buen embudo acompana el recorrido del cliente antes de la compra y organiza mejor la comunicacion en cada etapa."
  ),
  fillStep(
    "Completa el espacio - Estructura un embudo!",
    "Construye un prompt para un embudo de marketing simple.",
    "\"Crea un embudo de marketing para vender ___ con etapas de ___, consideracion y conversion.\"",
    ["curso de IA", "atraccion"],
    ["curso de IA", "atraccion", "confusion", "improvisacion"],
    "Cuando el embudo se divide en etapas, se vuelve mas facil pensar que contenido y que oferta usar en cada punto."
  ),
  textStep(
    "Generando ideas de contenido viral",
    "Otra estrategia poderosa es pedir a Grok ideas virales para redes sociales. Cuantas mas ideas pruebes, mayores son las posibilidades de encontrar formatos que funcionen muy bien."
  ),
  fillStep(
    "Completa el espacio - Genera ideas!",
    "Construye un prompt para brainstorming de contenido viral.",
    "\"Genera ___ ideas de contenidos virales sobre ___ que podrian funcionar bien en redes sociales.\"",
    ["10", "inteligencia artificial"],
    ["10", "inteligencia artificial", "1", "tema generico"],
    "Volumen y consistencia aumentan las probabilidades de encontrar ideas con potencial real de alcance."
  ),
  textStep(
    "Buenas practicas al usar Grok para marketing",
    "El error mas comun al usar IA en marketing es generar algo una sola vez y detenerse ahi. La IA funciona mucho mejor como herramienta de iteracion: cuanto mas pruebas y refinamientos haces, mejores son los resultados."
  ),
  quizStep(
    "Error mas comun del marketing con IA",
    "Cual es el error mas comun al usar IA para marketing?",
    [
      "Crear muchas variaciones de anuncios.",
      "Probar campanas diferentes.",
      "Usar IA solo una vez sin probar ni optimizar los resultados.",
      "Pedir sugerencias de estrategia."
    ],
    2,
    "La mayor ventaja aparece con la iteracion. Generar, probar, medir y ajustar."
  ),
  textStep(
    "Conclusion",
    "Usar Grok para marketing permite crear campanas, contenido y estrategias con mucha mas velocidad. Copies de anuncios, ideas de campanas, posts, guiones de video y analisis de publico ayudan a mejorar alcance y conversiones.\n\nEl secreto no es solo usar IA. Es probar ideas rapidamente y mejorar con base en resultados. Prueba campanas. Refina estrategias. Crece con inteligencia.\n\nLeccion concluida."
  ),
] as const;
export const GROK_MODULE_3_STEPS_FR = [
  textStep(
    "Utiliser Grok pour le Marketing",
    "Bienvenue. Dans cette lecon, vous allez apprendre a utiliser Grok pour le marketing digital. Grok peut aider a creer des annonces, generer des idees de campagnes, analyser le marche, ecrire des textes persuasifs et trouver des opportunites de croissance beaucoup plus vite."
  ),
  textStep(
    "Pourquoi utiliser l'IA en marketing est un superpouvoir",
    "Construire des campagnes marketing demande souvent de la recherche, des tests et beaucoup de production de contenu. Avec l'IA, vous pouvez generer des idees, analyser des tendances et produire rapidement, ce qui permet de tester davantage en moins de temps."
  ),
  quizStep(
    "IA et strategie marketing",
    "Pourquoi utiliser une IA comme Grok peut-il ameliorer les strategies marketing ?",
    [
      "Parce qu'elle peut generer des idees, analyser des tendances et creer rapidement des contenus marketing, ce qui permet de tester plus de campagnes en moins de temps.",
      "Parce que l'IA remplace completement les professionnels du marketing.",
      "Parce que les campagnes generees par IA vendent toujours plus.",
      "Parce que l'IA ne fonctionne que pour les grandes entreprises."
    ],
    0,
    "Le vrai gain est dans la vitesse de recherche, de creation et d'iteration, pas dans le remplacement total de la strategie humaine."
  ),
  textStep(
    "Creer des copies d'annonces avec Grok",
    "L'un des usages les plus puissants de Grok est la creation de textes persuasifs pour les annonces. Vous pouvez generer plusieurs versions rapidement et tester celle qui fonctionne le mieux."
  ),
  fillStep(
    "Completez le vide - Creez une copy !",
    "Construisez un prompt pour une annonce claire et persuasive.",
    "\"Cree une copy d'annonce pour ___ en mettant en avant le principal ___, avec un hook fort au debut et un ___ clair a la fin.\"",
    ["cours d'intelligence artificielle", "benefice", "call to action"],
    ["cours d'intelligence artificielle", "benefice", "call to action", "produit aleatoire", "detail inutile", "fin confuse"],
    "Quand vous definissez l'offre, le benefice central et la fermeture, Grok produit des annonces beaucoup plus precises."
  ),
  textStep(
    "Creer des idees de campagnes marketing",
    "Grok peut aussi generer des concepts complets de campagne. Tester plusieurs approches aide a trouver plus vite quels angles et quels formats convertissent le mieux."
  ),
  fillStep(
    "Completez le vide - Generez des campagnes !",
    "Construisez une demande de brainstorming pour des campagnes.",
    "\"Genere ___ idees de campagnes marketing pour promouvoir ___ en utilisant des strategies de ___.\"",
    ["5", "un cours d'IA", "reseaux sociaux"],
    ["5", "un cours d'IA", "reseaux sociaux", "1", "n'importe quoi", "intuition"],
    "Quand vous fixez la quantite, l'offre et le canal, Grok propose des idees beaucoup plus utiles pour des tests reels."
  ),
  textStep(
    "Creer du contenu pour les reseaux sociaux",
    "Grok peut generer des posts prets a l'emploi pour les reseaux sociaux, ce qui aide a garder de la regularite et de la vitesse sans rester bloque devant la page blanche."
  ),
  fillStep(
    "Completez le vide - Creez un post !",
    "Construisez un prompt pour un post simple et engageant.",
    "\"Cree un post pour ___ sur ___, avec un hook au debut, un contenu utile et un ___ encourageant les commentaires.\"",
    ["Instagram", "l'intelligence artificielle", "call to action"],
    ["Instagram", "l'intelligence artificielle", "call to action", "blog aleatoire", "theme flou", "fin plate"],
    "Un bon prompt social combine plateforme, sujet et action claire pour stimuler l'engagement."
  ),
  textStep(
    "Creer des scripts pour des videos marketing",
    "Les videos courtes sont l'un des outils les plus puissants du marketing digital. Grok peut structurer rapidement un script avec un hook, un benefice et une conclusion orientee conversion."
  ),
  fillStep(
    "Completez le vide - Creez un script !",
    "Construisez un prompt pour une courte video marketing.",
    "\"Cree un script court pour une video de ___ secondes promouvant ___, avec un hook fort, une explication du benefice et un ___ a la fin.\"",
    ["30", "un cours d'IA", "call to action"],
    ["30", "un cours d'IA", "call to action", "5", "theme libre", "fin vide"],
    "Definir la duree, l'offre et le CTA aide Grok a produire un script plus serré et plus utilisable."
  ),
  textStep(
    "Analyser le public cible avec Grok",
    "Comprendre le public est essentiel dans toute strategie marketing. Grok peut aider a cartographier douleurs, desir et objections rapidement pour rendre le message plus precis."
  ),
  fillStep(
    "Completez le vide - Analysez le public !",
    "Construisez un prompt pour cartographier douleurs et obstacles.",
    "\"Analyse le public interesse par ___ et decris ses principales ___, ses desirs et les possibles ___ auxquels ce public fait face.\"",
    ["l'intelligence artificielle", "douleurs", "problemes"],
    ["l'intelligence artificielle", "douleurs", "problemes", "envies floues", "bruit", "details disperses"],
    "Quand vous demandez douleurs, desirs et problemes, Grok aide a transformer un public abstrait en profil plus actionnable."
  ),
  textStep(
    "Creer des tunnels marketing",
    "Grok peut aussi aider a structurer des funnels de vente. Un bon funnel accompagne le client tout au long de son parcours avant l'achat et organise mieux la communication a chaque etape."
  ),
  fillStep(
    "Completez le vide - Structurez un funnel !",
    "Construisez un prompt pour un funnel marketing simple.",
    "\"Cree un funnel marketing pour vendre ___ avec des etapes d'___, de consideration et de conversion.\"",
    ["un cours d'IA", "attraction"],
    ["un cours d'IA", "attraction", "confusion", "improvisation"],
    "Quand le funnel est pense par etapes, il devient plus facile de definir le contenu et l'offre adaptes a chaque moment."
  ),
  textStep(
    "Generer des idees de contenu viral",
    "Une autre strategie puissante consiste a demander a Grok des idees virales pour les reseaux sociaux. Plus vous testez d'idees, plus vous avez de chances d'en trouver qui performent vraiment."
  ),
  fillStep(
    "Completez le vide - Generez des idees !",
    "Construisez un prompt pour brainstormer des contenus viraux.",
    "\"Genere ___ idees de contenus viraux sur ___ qui pourraient bien fonctionner sur les reseaux sociaux.\"",
    ["10", "l'intelligence artificielle"],
    ["10", "l'intelligence artificielle", "1", "theme generique"],
    "Le volume et la constance augmentent les chances de trouver des idees avec un vrai potentiel de portee."
  ),
  textStep(
    "Bonnes pratiques avec Grok pour le marketing",
    "L'erreur la plus courante avec l'IA en marketing est de generer une seule fois puis de s'arreter. L'IA fonctionne beaucoup mieux comme outil d'iteration : plus vous testez et affinez, meilleurs sont les resultats."
  ),
  quizStep(
    "Erreur marketing la plus courante avec l'IA",
    "Quelle est l'erreur la plus courante quand on utilise l'IA pour le marketing ?",
    [
      "Creer beaucoup de variations d'annonces.",
      "Tester plusieurs campagnes.",
      "Utiliser l'IA une seule fois sans tester ni optimiser les resultats.",
      "Demander des suggestions de strategie."
    ],
    2,
    "Le plus grand gain vient de l'iteration. Generer, tester, mesurer et ajuster."
  ),
  textStep(
    "Conclusion",
    "Utiliser Grok pour le marketing permet de creer campagnes, contenus et strategies beaucoup plus vite. Copies d'annonces, idees de campagnes, posts, scripts video et analyse du public aident a augmenter portee et conversions.\n\nLe secret n'est pas seulement d'utiliser l'IA. C'est de tester vite des idees et de les ameliorer selon les resultats. Testez des campagnes. Affinez les strategies. Faites grandir avec intelligence.\n\nLecon terminee."
  ),
] as const;
