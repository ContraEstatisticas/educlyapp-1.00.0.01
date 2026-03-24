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

export const GEMINI_MODULE_3_STEPS_PT = [
  textStep(
    "Gemini Pesquisando na Internet em Tempo Real",
    "Bem-vindo de volta! Nesta lição, você vai aprender a usar uma das capacidades mais exclusivas do Gemini — o acesso nativo à internet em tempo real. Enquanto outros assistentes trabalham com um conhecimento fixo até uma data de corte, o Gemini pode buscar informações atualizadas agora, neste momento.\n\nPor que o Acesso à Internet Muda Tudo?\nA maioria dos assistentes de IA responde com base no que aprendeu até uma determinada data. O Gemini vai além — ele acessa a web em tempo real, trazendo notícias, dados, tendências e informações que surgiram hoje, esta semana ou este mês."
  ),
  textStep(
    "Pesquisando Informações Atuais",
    "A primeira aplicação mais direta é pesquisar o que está acontecendo agora — notícias, atualizações de mercado, lançamentos, mudanças de legislação e muito mais."
  ),
  fillStep(
    "Faça sua primeira pesquisa em tempo real!",
    "Colete fatos verídicos diretamente das fontes mais quentes.",
    "\"Pesquise as [___] mais recentes sobre [___]. Me apresente um resumo com os [___] acontecimentos, as [___] mais relevantes e [___] as fontes consultadas para que eu possa verificar.\"",
    ["notícias e atualizações", "mudanças na legislação trabalhista brasileira", "5 principais", "informações", "cite"],
    ["notícias e atualizações", "mudanças na legislação trabalhista brasileira", "5 principais", "informações", "cite"],
    "Sempre force o bot a listar fontes para que você evite cair em qualquer alucinação."
  ),
  textStep(
    "Pesquisando Tendências de Mercado",
    "Para negócios e profissionais, o Gemini é uma ferramenta poderosa para monitorar o que está crescendo, o que está perdendo força e para onde o mercado está se movendo."
  ),
  fillStep(
    "Monitore seu mercado!",
    "Entenda os movimentos silenciosos antes mesmo de se tornarem o padrão da indústria.",
    "\"Pesquise as principais [___] do mercado de [___] em [___]. Para cada tendência, explique: o que é, por que está [___], quais [___] estão liderando esse movimento e como uma empresa de [___] pode se posicionar.\"",
    ["tendências", "tecnologia educacional", "2025", "crescendo", "empresas ou países", "pequeno porte"],
    ["tendências", "tecnologia educacional", "2025", "crescendo", "empresas ou países", "pequeno porte"],
    "Adaptar achados macro para o contexto exato da sua empresa torna as respostas plenamente estratégicas."
  ),
  quizStep(
    "Análise de Tendência",
    "Qual prompt gera uma análise de tendências mais estratégica?",
    [
      "\"Quais são as tendências de mercado?\"",
      "\"Me fale sobre o futuro do meu setor\"",
      "\"Pesquise as 5 principais tendências do setor de [área] para 2025, ordene por relevância, explique o impacto de cada uma e sugira como uma empresa pode aproveitar cada tendência nos próximos 6 meses\"",
      "\"O que está acontecendo no mercado?\""
    ],
    2,
    "Quanto mais quantitativo e guiado a aplicação prática for o comando, mais alto será o valor estratégico obtido."
  ),
  textStep(
    "Pesquisando Concorrentes",
    "O Gemini pode montar um panorama completo da concorrência — o que estão fazendo, como estão se comunicando, quais são seus diferenciais e onde estão as oportunidades que eles ainda não exploraram."
  ),
  fillStep(
    "Analise sua concorrência!",
    "Realize auditorias rápidas sobre seus oponentes no mercado.",
    "\"Pesquise sobre [___], uma empresa do setor de [___]. Me traga: seu [___] de mercado atual, as principais [___] que ela usa, os [___] mais comentados pelos clientes e as [___] que aparecem nas avaliações online.\"",
    ["[nome do concorrente]", "e-commerce de moda", "posicionamento", "estratégias de comunicação", "pontos fortes", "fraquezas"],
    ["[nome do concorrente]", "e-commerce de moda", "posicionamento", "estratégias de comunicação", "pontos fortes", "fraquezas"],
    "Ler comentários dispersos da concorrência pela web inteira consome dias; o Gemini faz isso em segundos."
  ),
  quizStep(
    "Os Limites do Espião Digital",
    "O que o Gemini consegue fazer ao pesquisar um concorrente na internet?",
    [
      "Acessar dados internos e financeiros confidenciais da empresa",
      "Criar relatórios com garantia de 100% de precisão sobre qualquer empresa",
      "Compilar informações públicas disponíveis — site, redes sociais, avaliações, notícias e posicionamento — e organizá-las em uma análise estruturada",
      "O Gemini não consegue pesquisar informações sobre empresas específicas"
    ],
    2,
    "O poder está em sua capacidade de agregar dados que já são abertos mas que estariam esparsos dificultando o mapeamento rápido."
  ),
  textStep(
    "Pesquisando para Embasar Decisões",
    "Antes de tomar uma decisão importante — lançar um produto, entrar em um novo mercado, contratar uma ferramenta — o Gemini pode reunir os dados que você precisa para decidir com mais segurança."
  ),
  fillStep(
    "Pesquise antes de decidir!",
    "Evite prejuízos levantando a probabilidade de falha primeiro.",
    "\"Preciso decidir se vale a pena [___]. Pesquise e me traga: dados sobre o [___] atual desse mercado, os [___] de quem já tentou, os [___] envolvidos e qualquer [___] recente que possa influenciar essa decisão.\"",
    ["abrir um negócio de alimentação saudável na minha cidade", "tamanho e crescimento", "casos de sucesso e fracasso", "principais riscos", "estudo ou pesquisa"],
    ["abrir um negócio de alimentação saudável na minha cidade", "tamanho e crescimento", "casos de sucesso e fracasso", "principais riscos", "estudo ou pesquisa"],
    "Toda tomada de risco requer fundamentos. Deixe a parte mecânica de achar artigos sob o comando da IA."
  ),
  textStep(
    "Pesquisando Preços e Comparando Produtos",
    "O Gemini consegue rastrear preços, comparar características de produtos e serviços e montar comparativos que ajudam em decisões de compra ou contratação."
  ),
  fillStep(
    "Compare antes de comprar!",
    "Tabelas organizam perfeitamente escolhas difíceis.",
    "\"Pesquise e compare as [___] opções de [___] disponíveis no mercado brasileiro atualmente. Para cada uma: [___] mensal, principais [___], [___] e para qual [___] de empresa ela é mais indicada. Apresente em formato de tabela.\"",
    ["principais", "ferramentas de gestão de projetos", "preço", "funcionalidades", "limitações", "tamanho"],
    ["principais", "ferramentas de gestão de projetos", "preço", "funcionalidades", "limitações", "tamanho"],
    "Pedir o comparativo num formato de tabela é a técnica essencial para simplificar escolhas gerenciais."
  ),
  textStep(
    "Pesquisando Notícias e Monitorando Temas",
    "Para quem precisa se manter atualizado sobre um tema específico, o Gemini funciona como um monitor de notícias inteligente — reunindo o que está sendo publicado e sintetizando o que é relevante."
  ),
  fillStep(
    "Monitore seu tema!",
    "Mantenha um radar sem esforço ativo constante.",
    "\"Pesquise tudo que foi publicado sobre [___] nos [___]. Me traga: as [___] mais relevantes, os [___] que estão gerando mais debate e qualquer [___] ou [___] que tenha surgido sobre esse tema recentemente.\"",
    ["inteligência artificial na medicina", "últimos 30 dias", "notícias", "assuntos", "descoberta científica", "polêmica"],
    ["inteligência artificial na medicina", "últimos 30 dias", "notícias", "assuntos", "descoberta científica", "polêmica"],
    "Ativar filtros delimitando prazos de publicação impede o algoritmo de resgatar histórias vencidas do ano passado."
  ),
  quizStep(
    "Desvendando o Falso Onisciente",
    "Qual é a limitação que você deve considerar ao usar o Gemini para pesquisas na internet?",
    [
      "O Gemini só acessa sites em inglês",
      "Pesquisas no Gemini demoram muito mais do que buscas no Google",
      "Mesmo com acesso à web, o Gemini pode não encontrar conteúdos restritos, dados internos ou páginas que exigem login — e as informações encontradas devem sempre ser verificadas nas fontes originais",
      "O Gemini não consegue pesquisar mais de um tema ao mesmo tempo"
    ],
    2,
    "Muros de pagamento, bases criptografadas e restrições continuam protegidas independentemente do uso da inteligência."
  ),
  textStep(
    "Pesquisando com Contexto Pessoal",
    "A grande diferença do Gemini em relação a uma busca comum é a possibilidade de combinar a pesquisa na web com o seu contexto pessoal — tornando os resultados muito mais relevantes e acionáveis."
  ),
  fillStep(
    "Personalize sua pesquisa!",
    "Alimente a IA para focar no seu momento exato.",
    "\"Meu negócio é [___] e estou enfrentando o seguinte desafio: [___]. Pesquise na internet estratégias e casos reais de empresas que [___] esse mesmo desafio, filtre os que são [___] para uma empresa do meu [___] e me sugira os [___] mais viáveis para começar.\"",
    ["uma escola de idiomas com 3 unidades", "aumentar a retenção de alunos", "superaram", "aplicáveis", "porte e setor", "3 caminhos"],
    ["uma escola de idiomas com 3 unidades", "aumentar a retenção de alunos", "superaram", "aplicáveis", "porte e setor", "3 caminhos"],
    "Fornecer um contexto seu converte uma busca simples parecida à de qualquer pessoa num projeto de consultoria supernicho."
  ),
  textStep(
    "Boas Práticas ao Pesquisar com o Gemini",
    "Ditar as regras é importante para refinar seu pesquisador virtual de estimação."
  ),
  textStep(
    "Conclusão",
    "O acesso à internet em tempo real transforma o Gemini em muito mais do que um assistente de texto — ele se torna um pesquisador inteligente que encontra, filtra, interpreta e organiza informações de acordo com o seu contexto e objetivo. Tendências, concorrentes, notícias, comparativos, dados de mercado — tudo disponível em uma única conversa.\n\nA diferença entre uma busca comum e uma pesquisa com o Gemini está na profundidade da análise. O Google encontra. O Gemini entende.\n\nPesquise com mais inteligência. Decida com mais clareza."
  )
] as const;

export const GEMINI_MODULE_3_STEPS_EN = [
  textStep(
    "Gemini Researching the Internet in Real-Time",
    "Welcome back! In this lesson, you will learn to harness one of Gemini's most exclusive capabilities — its native, real-time access to the internet. While other assistants rely on a frozen set of knowledge cut off at an arbitrary past date, Gemini actively fetches the latest information available today, right at this moment.\n\nWhy Does Internet Access Change Everything?\nMost AI assistants answer based exclusively on historical training. Gemini eclipses this standard — it seamlessly accesses the live web, instantly bringing up news, analytics, trends, and facts bubbling up today, this week, or this month."
  ),
  textStep(
    "Researching Current Events",
    "The first and most direct application lies in investigating exactly what is happening globally right now — breaking news, market updates, cutting-edge launches, legislative shifts, and much more."
  ),
  fillStep(
    "Conduct your first real-time query!",
    "Extract actionable facts straight from the live feeds.",
    "\"Research the most recent [___] covering [___]. Provide me with a cohesive digest containing the [___] events, the most relevant [___], and precisely [___] the sources you consulted so I may verify them.\"",
    ["news and updates", "changes in Brazilian labor laws", "top 5", "information points", "cite"],
    ["news and updates", "changes in Brazilian labor laws", "top 5", "information points", "cite"],
    "Enforcing that the bot explicitly lists URLs acts as your prime safeguard against AI-generated hallucinations."
  ),
  textStep(
    "Investigating Market Trends",
    "For businesses and career professionals, Gemini doubles as an elite monitor scanning for what's booming, what's deflating, and precisely where market currents are inevitably heading."
  ),
  fillStep(
    "Monitor your industry environment!",
    "Catch silent market drifts before they become standard practices.",
    "\"Research the dominating [___] within the [___] arena for [___]. For each trend, elaborate: what it entails, exactly why it is currently [___], which [___] are spearheading this shift, and how a [___] enterprise should position itself to capture this value.\"",
    ["trends", "educational technology", "2025", "growing", "companies or countries", "small-sized"],
    ["trends", "educational technology", "2025", "growing", "companies or countries", "small-sized"],
    "Translating vast macro trends down to your company's micro realities upgrades simple research into high-tier strategic roadmaps."
  ),
  quizStep(
    "Trend Analysis Accuracy",
    "Which exact phrasing yields the most actionable and strategic trend overview?",
    [
      "\"What are the latest market trends currently?\"",
      "\"Tell me all about the overall future of my industry space.\"",
      "\"Research the top 5 emerging trends inside the [industry] vertical for 2025, sort them by true relevance, decode their business impact, and stipulate how our firm can leverage each within the next 6 months.\"",
      "\"What exactly is going on out there in the business market?\""
    ],
    2,
    "Dictating rigid quantitative metrics and enforcing practical milestones exponentially raises the strategic worth of the return."
  ),
  textStep(
    "Researching your Competitors",
    "Gemini easily constructs devastatingly comprehensive competitive landscapes — scrutinizing what rivals launch, their marketing verbiage, their unique selling propositions, and exposing neglected voids they failed to exploit."
  ),
  fillStep(
    "Audit your competition blindly!",
    "Run exceptionally rapid intelligence checks against market rivals.",
    "\"Conduct a deep web search covering [___], an enterprise in the [___] market. Extract and summarize: their ongoing market [___], the prevailing [___] they exhibit, the most common [___] celebrated by their user base, and the critical [___] heavily repeated across their public reviews.\"",
    ["[competitor's name]", "fashion e-commerce", "positioning", "communication strategies", "strengths", "weaknesses"],
    ["[competitor's name]", "fashion e-commerce", "positioning", "communication strategies", "strengths", "weaknesses"],
    "Sifting individually through scattered forum threads globally demands weeks; Gemini runs this sweep in negligible seconds."
  ),
  quizStep(
    "Boundaries of your Digital Spy",
    "What precisely can Gemini achieve when ordered to dig into a competing firm via the open web?",
    [
      "It flawlessly hacks and accesses classified internal financial ledgers",
      "It guarantees 100% infallible legal reports concerning whatever firm exists",
      "It scrapes widely available public data — domain copy, social threads, user ratings, press releases — structuring it all into a high-level landscape analysis",
      "Gemini is hard-coded against researching actual operating enterprises blindly"
    ],
    2,
    "The sheer dominance relies on aggregating fragmented data chunks scattered around the web that otherwise escape manual mapping."
  ),
  textStep(
    "Researching to Anchor Core Decisions",
    "Prior to committing to heavy decisions — launching a product division, entering foreign territories, acquiring expensive tools — Gemini groups all empirical data needed to shield your move."
  ),
  fillStep(
    "Research prior to committing!",
    "Immunize yourself from massive losses by running probability stress-tests via the bot.",
    "\"I need to decide whether it's truly viable to [___]. Search the web and deliver: solid data depicting the actual [___] of this niche, documented [___] of those who attempted this earlier, the central [___] inherently involved, and any recent [___] that radically impacts such a move.\"",
    ["open a healthy food business in my city", "size and growth", "cases of success and failure", "main risks", "study or research"],
    ["open a healthy food business in my city", "size and growth", "cases of success and failure", "main risks", "study or research"],
    "Assuming massive risk mandates proper groundwork. Assign the mechanical grind of collating relevant studies entirely to the AI."
  ),
  textStep(
    "Comparing Products & Crunching Prices",
    "Gemini possesses the reach to track pricing ladders, contrast dense product features, and output neat comparison matrices that alleviate purchasing friction severely."
  ),
  fillStep(
    "Compare radically before buying!",
    "Nothing organizes chaotic choices better than structured data arrays.",
    "\"Research and contrast the [___] viable options for [___] currently active in the Brazilian market. For each singular platform, stipulate: monthly [___], defining [___], glaring [___], and dictate exactly the [___] of enterprise that platform targets. Output all this cleanly within a table format.\"",
    ["main", "project management tools", "price", "functionalities", "limitations", "size"],
    ["main", "project management tools", "price", "functionalities", "limitations", "size"],
    "Forcing analytical comparisons to render inside a Markdown-style table remains the master key to effortlessly digesting market offerings."
  ),
  textStep(
    "Tracking News and Monitoring Deep Concepts",
    "For executives and specialists mandated to hover over specific industry shifts, Gemini operates as a tireless news anchor — trawling freshly minted publications and extracting solely what matters."
  ),
  fillStep(
    "Monitor your domain relentlessly!",
    "Keep your radar spinning without lifting a finger.",
    "\"Search the entire web for everything published regarding [___] strictly within the [___]. Compile and output: the most deeply relevant [___], specific [___] igniting widespread debates online, and essentially any vital [___] or shocking [___] uncovered in this time block.\"",
    ["artificial intelligence in medicine", "last 30 days", "news", "topics", "scientific discovery", "controversy"],
    ["artificial intelligence in medicine", "last 30 days", "news", "topics", "scientific discovery", "controversy"],
    "Mandating strict timeline boundaries forcefully prevents algorithms from scraping stale, obsolete storylines from legacy archives."
  ),
  quizStep(
    "Dismantling Omniscience",
    "What is an intrinsic limitation that you absolutely must account for when deploying Gemini into the wild web?",
    [
      "Gemini is utterly handicapped natively outside English language queries",
      "Active Gemini scraping takes drastically longer than standard Google browsing",
      "Even granted live access, Gemini still bounces off paywalls, encrypted internal datasets, or gated communities — maintaining that critical facts demand your independent verification",
      "The software simply crashes when asked to process two dissimilar trending subjects concurrently"
    ],
    2,
    "Impenetrable paywalls and secured private cloud networks naturally remain shielded from public AI indexing protocols completely."
  ),
  textStep(
    "Augmenting Search Through Personal Contexts",
    "The gargantuan leap Gemini holds over mundane search bars stems directly from injecting hyper-specific personal scenarios into the query — mutating generic global answers into fiercely applicable directives."
  ),
  fillStep(
    "Hyper-personalize your hunt!",
    "Feed the AI specific nuances of your exact struggle.",
    "\"My enterprise operates as a [___] and I am battling the immediate challenge to [___]. Comb the internet for documented strategies detailing real agencies that successfully [___] this precise hurdle, filter strictly those completely [___] to my scale and [___], and pitch me the 3 most viable [___] to execute tomorrow.\"",
    ["language school with 3 branches", "increase student retention rates", "overcame", "applicable", "size and sector", "3 paths"],
    ["language school with 3 branches", "increase student retention rates", "overcame", "applicable", "size and sector", "3 paths"],
    "Pumping personal constraints directly into the command flips a standard web query into an elite, bespoke corporate consultancy review."
  ),
  textStep(
    "Best Practices When Hunting with Gemini",
    "Dictating rigid operational boundaries guarantees your virtual subordinate won't stray off mission."
  ),
  textStep(
    "Conclusion",
    "Activating native real-time internet radically transmutes Gemini from a simple text manipulator into a formidable cyber-analyst functioning to retrieve, filter, comprehend, and assemble intelligence strictly aligned with your goals. Surging trends, aggressive competitors, breaking news, dense tables, live datasets — commanded within an unbroken stream.\n\nThe profound disparity between standard searches and Gemini audits lies strictly within analytical depth. Google finds. Gemini grasps.\n\nQuery sharper. Dominate faster."
  )
] as const;

export const GEMINI_MODULE_3_STEPS_ES = [
  textStep(
    "Gemini Investigando en Internet en Tiempo Real",
    "¡Bienvenido de vuelta! En esta lección, aprenderás a usar una de las capacidades más exclusivas de Gemini: su acceso nativo a internet en tiempo real. Mientras que otros asistentes operan con un conjunto de conocimientos congelados en una fecha arbitraria pasada, Gemini recopila activamente la información más reciente disponible hoy mismo, justo en este instante.\n\n¿Por Qué el Acceso a Internet Cambia Todo?\nLa mayoría de los asistentes de IA responden basándose exclusivamente en su entrenamiento histórico. Gemini eclipsa este estándar: accede sin problemas a la web en vivo, trayendo instantáneamente noticias, análisis, tendencias y hechos que están surgiendo hoy, esta semana o este mes."
  ),
  textStep(
    "Investigando a la Velocidad de Hoy",
    "La primera y más directa aplicación reside en investigar con precisión lo que ocurre globalmente en este momento — noticias de última hora, actualizaciones del mercado, lanzamientos, cambios legislativos y mucho más."
  ),
  fillStep(
    "¡Realiza tu primera consulta en tiempo real!",
    "Extrae hechos que guíen tus decisiones directamente desde las redes de información.",
    "\"Investiga sobre las [___] más recientes que traten los [___]. Entrégame un resumen cohesivo que contenga los [___], el [___] más pertinente a mis labores y lista explícitamente cuáles fueron las [___].\"",
    ["noticias y actualizaciones", "cambios en las leyes laborales brasileñas", "5 eventos principales", "punto de información", "fuentes consultadas"],
    ["noticias y actualizaciones", "cambios en las leyes laborales brasileñas", "5 eventos principales", "punto de información", "fuentes consultadas"],
    "Exigirle al bot que enumere las URLs actuales es tu salvaguarda principal frente a las especulaciones generadas por la IA."
  ),
  textStep(
    "Analizando las Tendencias de Mercado",
    "Para profesionales corporativos y emprendedores, Gemini opera como un rastreador estratégico para ubicar de forma anticipada nuevas oportunidades y descartar tácticas que pierden terreno rápidamente."
  ),
  fillStep(
    "¡Monitorea tu entorno de negocio!",
    "Detecta las corrientes subterráneas del mercado antes de que se vuelvan estándares populares.",
    "\"Examina cómo evolucionan las [___] de la vertical de [___] durante el [___]. Para cada dinámica, detalla qué es, por qué se percibe que está [___], las [___] punteras impulsando su avance, y evalúa cómo una [___] debería capitalizar dicha información.\"",
    ["tendencias", "tecnología educativa", "2025", "creciendo", "empresas o países", "empresa pequeña"],
    ["tendencias", "tecnología educativa", "2025", "creciendo", "empresas o países", "empresa pequeña"],
    "Adaptar el ruido del mercado global hacia tus debilidades y capacidades locales vuelve valiosa la síntesis en vivo."
  ),
  quizStep(
    "Precisión en las Tendencias",
    "¿Cuál estructura verbal produce los diagnósticos del mercado más eficaces y explotables?",
    [
      "\"Dime algo sobre todas las innovaciones del presente.\"",
      "\"Bríndame luz respecto a mi sector, cuéntame sobre su desenvolvimiento general.\"",
      "\"Investiga el top 5 de directrices del mercado en el sector de [industria] para 2025, clasifícalas por impacto, define sus proyecciones de retorno y plantea 3 ejes prácticos para mi agencia en el próximo cuatrimestre.\"",
      "\"Se muy rápido diciéndome qué anda de moda ahí afuera en los negocios.\""
    ],
    2,
    "Imponer pautas rígidas y exigir entregables de carácter gerencial incrementan drásticamente el peso táctico."
  ),
  textStep(
    "Investigando a la Competencia",
    "Gemini se levanta como la herramienta analítica de espionaje definitiva, rastreando los puntos flacos de la competencia con facilidad, evaluando su nivel publicitario, mapeando las críticas negativas crónicas e identificando carencias de mercado en las cuales insertar tu propuesta."
  ),
  fillStep(
    "¡Focaliza la carencia ajena!",
    "Ejecuta comprobaciones de inteligencia aplastantemente más rápidas.",
    "\"Haz una inmersión profunda que cubra a [___], la marca del rubro [___]. Necesito estructurado: cómo dictan su [___] principal, cuáles [___] ejecutan día a día, y cruzar estas virtudes o [___] directas con las [___] escritas por sus clientes reales en los portales.\"",
    ["el nombre exacto de la competencia", "e-commerce de moda", "posicionamiento", "estrategias de comunicación", "fortalezas", "debilidades"],
    ["el nombre exacto de la competencia", "e-commerce de moda", "posicionamiento", "estrategias de comunicación", "fortalezas", "debilidades"],
    "Sintetizar individualmente años de retroalimentación suelta por foros anónimos puede durar meses completos; Gemini asimila los trozos instantáneamente."
  ),
  quizStep(
    "Barreras del Rastreador Comercial",
    "¿Con qué facultad cuenta exactamente Gemini cuando audita corporativamente la web?",
    [
      "Despliega una intromisión severa en cuentas en la nube privada que exponen los flujos de tesorería y patentes",
      "La validación ciega e irrevocable garantizada notarialmente del 100% de la facturación de cada sucursal que explora",
      "Escarificar recursos dispersos públicos — como copy digital, portales, críticas o gacetillas de relaciones públicas — consolidando ese rastro invisible de polvo digital bajo la forma de esquemas analíticos listos",
      "Él carece terminantemente en absoluto del alcance hacia toda operación del ámbito comercial real"
    ],
    2,
    "El valor máximo yace en tomar montañas de opiniones desparramadas e incongruentes publicadas para moldear el cuadro entero de debilidades de la competencia."
  ),
  textStep(
    "Reflexionando con Investigaciones Exhaustivas",
    "Saltar audazmente sobre cualquier iniciativa radical — abrir un nuevo vector empresarial, invertir pesadamente, descartar tecnología fundamental — implica acorazar tus dudas detrás de métricas probadas. La IA compila el muro."
  ),
  fillStep(
    "Investiga el riesgo por anticipado",
    "Inmuniza tu presupuesto testeando masivamente en paralelo experiencias probadas.",
    "\"Quiero decidir si vale la inversión de vida el [___]. Realiza una prospección intensa devolviéndome detalles crudos: el factor tangible real del [___], mapear puntillosamente los [___], la anatomía precisa de la mortandad de [___], e incluir el factor que aportaría cualquier [___] oficial que incida sobre esto.\"",
    ["abrir un negocio de comida sana en mi ciudad", "tamaño y crecimiento", "casos de éxito y fracaso", "riesgos primarios", "estudio de mercado"],
    ["abrir un negocio de comida sana en mi ciudad", "tamaño y crecimiento", "casos de éxito y fracaso", "riesgos primarios", "estudio de mercado"],
    "Incluso con resúmenes ágiles, externalizar a favor de una máquina exploradora anula un sinfín incalculable de callejones ciegos bibliográficos."
  ),
  textStep(
    "Cruzar Cuadros de Rendimiento Económico Real",
    "Gemini opera excepcionalmente escalando listas y contraponiendo de inmediato el catálogo brutal de las tarifas, entregándote esquemas comparativos."
  ),
  fillStep(
    "Cribaje financiero",
    "Un cuadro tabulado bien perfilado es invencible a la hora frenar el caos de compras.",
    "\"Compara exhaustivamente el abanico de [___] correspondientes a las [___] que puedan despacharse en mi locación geográfica. Para aislar tu investigación pon peso al [___] base, destapa sus [___], localiza el punto ciego de sus [___], e insiere a ciegas una casilla sobre cuál [___] corresponde a mi perfil operativo corporativo. Devuélvemelo visualizado a modo de gráfica tabular.\"",
    ["principales", "herramientas de gestión de proyectos", "precio", "funcionalidades robustas", "limitaciones técnicas", "tamaño empresarial ideal"],
    ["principales", "herramientas de gestión de proyectos", "precio", "funcionalidades robustas", "limitaciones técnicas", "tamaño empresarial ideal"],
    "Forzar el formato por tabla es de uso obligatorio, facilitando brutalmente la lectura en cualquier consejo."
  ),
  textStep(
    "Persecución Táctica Constante en la Red",
    "Para altos mandos abrumados que reclaman actualizar sus nichos bajo la presión inagotable de su rubro vertiginoso, la rutina se hace indispensable asumiendo que este ente lo criba todo de la madrugada al anochecer."
  ),
  fillStep(
    "Control absoluto de dominio local",
    "Poderío total del tiempo a favor del flujo de actualidad perenne.",
    "\"Acopia una búsqueda sobre el cúmulo absoluto dictado publicamente acerca de [___] durante los acotados [___]. Traza la línea directriz en la caja para agrupar únicamente dictados sobre [___], hurgando en [___] específicos con carga de [___] contundente para las instituciones médicas y aísla fuertemente el foco de [___] ética que está candente y reventando foros hoy en día.\"",
    ["inteligencia artificial en medicina", "últimos 30 días", "novedades fidedignas", "asuntos", "descubrimientos", "polémica"],
    ["inteligencia artificial en medicina", "últimos 30 días", "novedades fidedignas", "asuntos", "descubrimientos", "polémica"],
    "Imponiendo la trampa temporal como filtro obligatorio para su radar anulas la perniciosa costumbre del software a engullir legados de efemérides empolvadas y fútiles de hace 5 trimestres."
  ),
  quizStep(
    "Demoliendo la Pantalla de Omnipresencia",
    "A la hora de la cruda verdad, y ante un uso ininterrumpido abarcando ecosistemas ajenos, ¿qué muro de colisión no rebasará la IA jamás por ti de forma ética hoy día?",
    [
      "Su incapacidad radical para asimilar de antemano sintaxis complejas al mandar un texto foráneo alejado",
      "Que aglutinar todo el incesante pantano cibernético requerirá infinitas y lánguidas pausas letárgicas",
      "Incluso corriendo en vivo de manera impecable, se estrella ciegamente al chocar de frente con bóvedas encriptadas corporativas ocultas, páginas premium amuralladas e hipervínculos confidenciales y de uso reservado exclusivo",
      "Resulta virtualmente impracticable exigirle que procese con coherencia o decencia una pareja de líneas noticiosas dispares"
    ],
    2,
    "La barrera del peaje es invencible. Los santuarios monetizados de investigación celosos protegen severamente todo registro documental íntimo, eludiendo la penetración masiva de la asimilación del IA por muy refinado sea."
  ),
  textStep(
    "El Plus Definitivo del Moldeado Hiper-Personal",
    "Ese salto intergaláctico, distanciando para la eternidad el buscador que tienes de las vetustas lupas de los noventas yace sencillamente en derramar explícitamente y al rojo vivo tus contratiempos, fricciones personales más íntimas y dolorosísimas variables comerciales a la caja negra — amarrando soluciones ultra singulares en el acto a manos ensangrentadas y cansadas."
  ),
  fillStep(
    "Sastrería Operacional Pura",
    "Trata a tu máquina cual psiquiatra ejecutivo impasible.",
    "\"Yo regento por entero un panorama inestable como el de [___] que al día de hoy se debate ahogado por sostener y mitigar este flagelo recurrente para mi nicho: necesito urgentemente [___] sostenidas. Tráeme el rescate tangible por la vía de diseccionar metódicamente firmas análogas reales en las entrañas de la web comercial, en un rango calcado a mi escala natural que milagrosamente e irrefutablemente [___] satisfactoriamente lo antes expuesto, cerciórate en el cielo de que resulten innegablemente [___] en base a mi asolado [___] comercial empírico con lo del capital, y corónalo dándome explícitamente la llave con apenas los selectos [___] estratégicos con los que despuntar agresivamente mis próximos madrugones.\"",
    ["escuela de idiomas con 3 unidades pequeñas", "incrementar las permanencias mensuales", "superaron las incidencias", "tácticas aplicables aquí y ahora", "tamaño", "3 caminos directos"],
    ["escuela de idiomas con 3 unidades pequeñas", "incrementar las permanencias mensuales", "superaron las incidencias", "tácticas aplicables aquí y ahora", "tamaño", "3 caminos directos"],
    "El inyectar minuciosamente veneno, fallas, ambiciones o métricas desesperadas es catapultar por los aires de internet un bólido implacablemente programado para obsequiar exclusivas consultas privadas personalizadas corporativas en una mera pantalla plana reluciente de destellos blancos."
  ),
  textStep(
    "El Mandato Gerencial Firme del Nuevo Operario Global del Mundo del Entorno Virtual",
    "Delinear fronteras en los dominios del robot exige a nivel imperativo restringir drásticamente cada resquicio a la libertad que este posea, ahondando un control sin merma."
  ),
  textStep(
    "Resoluciones Inalienables de Cierre en Marcha Frontal y Decisivo",
    "Encender y detonar las reservas informacionales del tiempo en plena carrera metamorfosea de pronto lo que percibías ingenuamente como a un modesto conversador en el espía más implacable, cernidor maestro aserrado capaz de empaparse, depurar meticulosamente de polvo a polvo impenitente, tragar insumos del conocimiento, digerir a fondo y amoldar todo arsenal dispersado milimétricamente sujeto por la rienda irrompible delineando cada uno del resto de tus metas de guerra del mundo físico.\n\nLa colosal y contundente distancia respecto al buscador convencional frente al dominio que confiesas al someter la maquinaria del Gemini mora incólume estrictamente acorazada desde todo análisis por calados y estratos infernales en profundidad analítica sin freno de tiempo y lugar imaginados anteriormente alguna vez.\n\nEscudriña agresivamente las sombras, impera inteligentemente al máximo en segundos abismales."
  )
] as const;
export const GEMINI_MODULE_3_STEPS_FR = [
  textStep(
    "Gemini : Piloter la Recherche Virtuelle en Temps Réel",
    "Bon retour parmi nous ! Cette leçon aborde l'atout sans doute le plus ravageur de Gemini : l'interrogation intégrée du Web en direct. Tandis que l'écrasante majorité des I.A. restent figées dans un apprentissage daté, Gemini aspire les données du présent et s'enrichit des courants de l'instant T.\n\nEn Quoi le Net Change-t-il la Donne ?\nLes autres se contentent de répéter l'histoire. Gemini balaie l'horizon immédiat, ramenant les dernières nouvelles, cours boursiers, et législations parues à la minute même."
  ),
  textStep(
    "Récolter l'Actualité Vive",
    "L'adoption la plus évidente consiste à s'enquérir des faits de l'heure — soubresauts des marchés, alertes sanitaires, revirements juridiques et annonces de feu."
  ),
  fillStep(
    "Votre Baptême du Temps Réel !",
    "Bénéficiez instantanément d'une revue de presse magistrale.",
    "\"Exécute une investigation visant les [___] tournant autour des [___]. Rends-moi une restitution compacte contenant les [___], le [___] capital qui me concerne, et dresse sans faute la liste des [___].\"",
    ["actualités brûlantes", "réformes du droit du travail français", "5 événements phares", "détail décisif", "sources consultées"],
    ["actualités brûlantes", "réformes du droit du travail français", "5 événements phares", "détail décisif", "sources consultées"],
    "Bloquer l'I.A. en l'obligeant à sourcer son récit érige un mur infranchissable contre le fléau des fausses informations générées."
  ),
  textStep(
    "Capter les Vents Nouveaux du Marché",
    "Entre les mains de stratèges, Gemini opère en tant que radar impérial, dénichant les secteurs qui bouillonnent et ceux qui agonisent lentement sous le radar."
  ),
  fillStep(
    "Devenez l'Œil du Cyclone !",
    "Ressentez le tempo de l'industrie pour réagir avant les mastodontes lents.",
    "\"Pénètre les coulisses des [___] qui balaient le pôle de [___] courant [___]. À propos de chaque axe, définis ses fondations, pourquoi il se retrouve [___] de façon foudroyante, les [___] instigatrices du séisme, et postule comment une [___] a le devoir de s'y greffer sur le champ.\"",
    ["tendances", "technologies de l'enseignement", "2025", "en pleine effervescence", "multinationales", "PME"],
    ["tendances", "technologies de l'enseignement", "2025", "en pleine effervescence", "multinationales", "PME"],
    "Croiser une macro-tendance mondiale à l'échelle de votre petite cellule entrepreneuriale produit des pépites d'or stratégiques."
  ),
  quizStep(
    "Calibrage Sélectif",
    "Laquelle de ces injonctions arrache le maximum d'effets de levier à votre demande ?",
    [
      "\"Liste les modes du futur en te basant sur rien de précis.\"",
      "\"Résume simplement ce qu'il se passe dehors avec mon commerce.\"",
      "\"Dresse une liste hiérarchisée des 5 mutations sectorielles maîtresses en 2025 de la sphère de la [logistique], mets en évidence leur brutalité économique et formule la parade que notre firme doit déployer dans les 100 jours.\"",
      "\"Quel vent souffle en Bourse en ce moment de ton point de vue ?\""
    ],
    2,
    "La fermeté quasi martiale de votre demande et la délimitation chiffrée forcent le générateur à extraire la moelle du sujet."
  ),
  textStep(
    "Opération d'Espionnage Concurrentiel",
    "Gemini est l'outil dévastateur de prospection aveugle. Il vous dessine le plan complet des faiblesses adverses, de leur ton de communication et du fossé entre leurs promesses et la grogne bien réelle de leurs clients en ligne."
  ),
  fillStep(
    "Passez la Concurrence au Rayon X !",
    "Asséchez leurs secrets de polichinelle au grand jour.",
    "\"Amorce un filet de chalutage massif sur le Web concernant [___], grand rival du secteur [___]. Extirpe pour moi : son manifeste de [___], le réseau de [___] qu'il finance, son catalogue de [___] acclamées et les [___] les plus flagrantes lues sur ses revues en ligne.\"",
    ["[votre compétiteur direct]", "la mode en ligne", "positionnement", "stratégies d'acquisition", "forces", "vulnérabilités"],
    ["[votre compétiteur direct]", "la mode en ligne", "positionnement", "stratégies d'acquisition", "forces", "vulnérabilités"],
    "Plutôt que d'attendre vos retours de salons, agréger l'océan d'avis client s'accomplit en quelques secondes inestimables."
  ),
  quizStep(
    "Les Bornes de la Subversion Numérique",
    "Que se permet véritablement l'outil lorsqu'on le braque contre le logo concurrentiel d'en face ?",
    [
      "Le piratage des carnets d'adresses clients et des secrets de R&D jalousement verrouillés dans le cloud.",
      "Générer par divinisation une note financière indubitable de leur trésorerie cachée.",
      "Passer au crible les traces du domaine public (réseaux, articles, vitrines e-commerce et témoignages clients éparpillés) en consolidant le tout sur un document implacable et limpide.",
      "Le système bloque net et interdit formellement de faire des requêtes impliquant autrui."
    ],
    2,
    "L'essence cruelle de l'Intelligence Web consiste à lier les myriades de critiques indépendantes pour dessiner la tare générale que la marque cherchait à taire."
  ),
  textStep(
    "Prévenir le Pire par l'Extraction de Faits",
    "Investir massivement nécessite des assises. Avant de sauter, l'IA compile les cicatrices des autres pour consolider l'édifice de vos futurs exploits ou alerter d'une ruine programmée."
  ),
  fillStep(
    "Le Sceau de l'Validation !",
    "Demandez à la toile de valider vos hypothèses périlleuses.",
    "\"La décision de [___] me taraude amèrement. Plonge en ligne et retourne-moi : la véritable estimation de [___] inhérent, un tableau des [___] analogues et des désastres retentissants similaires, les colossaux [___], sans éluder n'importe quelle [___] parue le mois dernier capable de foudroyer le marché.\"",
    ["lancer une chaîne de fast-food vegan locale", "croissance et d'espace", "succès fulgurants", "risques majeurs", "législation"],
    ["lancer une chaîne de fast-food vegan locale", "croissance et d'espace", "succès fulgurants", "risques majeurs", "législation"],
    "Avoir recourt aux sondes du Web épargne au stratège les tâtonnements coûteux."
  ),
  textStep(
    "Filtrage Budgétaire et Achat Comparé",
    "Le radar s'avère intraitable lors des séances d'achats : l'orchestre compile instantanément les colonnes budgétaires et les plans d'abonnements adverses dans des cadres stricts et faciles à avaler."
  ),
  fillStep(
    "Ordonnancement Tarifaire",
    "Rangez le fouillis commercial par tableurs visuels nets.",
    "\"Examine et confronte cruellement les [___] systèmes de [___] actifs sous nos latitudes. Expose méthodiquement pour chacune d'elles : la grille de [___], les robustes [___], ses fâcheuses [___] chroniques, et précise sa cible en termes de [___]. Renvoie l'intégralité du calcul encapsulé exclusivement dans un tableau final.\"",
    ["quatre", "suivi de management en SaaS", "prix net mensuel", "fonctions phares de compétition", "contraintes", "dimension d'entreprise"],
    ["quatre", "suivi de management en SaaS", "prix net mensuel", "fonctions phares de compétition", "contraintes", "dimension d'entreprise"],
    "Mettre les plaquettes tarifaires côte à côte désamorce la magie des discours marketing au profit de la stricte vérité marchande."
  ),
  textStep(
    "Vigie Technologique et Sectorielle Inébranlable",
    "En cas de mutations éclair ou de gestion de réputation de crise, l'exigence de veille d'une I.A. compense l'impossibilité de surveiller tous les réseaux par soi-même jour et nuit."
  ),
  fillStep(
    "Radar Perpétuel",
    "Gérez la panique médiatique ou l'essor académique d'un seul geste.",
    "\"Scanne méticuleusement la toile pour traquer les retombées inhérentes au sujet de [___] durant les stricts [___]. Délie la brume ambiante et sers-moi : les ultimes [___] brûlantes parues, les [___] déclenchant les batailles sur les forums d'experts et dévoile s'il subsiste l'ombre d'une éventuelle [___] récente non réglée.\"",
    ["l'I.A. dans le cadre pharmaceutique", "derniers 30 jours calendaires", "avancées", "enjeux", "polémique"],
    ["l'I.A. dans le cadre pharmaceutique", "derniers 30 jours calendaires", "avancées", "enjeux", "polémique"],
    "Réduire la voilure temporelle à de courtes fenêtres extirpe le risque d'intoxication de données venant de dossiers refermés appartenant au passé révolu."
  ),
  quizStep(
    "Frontières Brutes",
    "Où s'arrête indéniablement la magie et le foudroyant pouvoir de l'investiture Gemini à l'épreuve des serveurs de la réalité tangible ?",
    [
      "Face aux requêtes demandant une grammaire non nord-américaine ou ne maîtrisant qu'un anglais rudimentaire.",
      "Dans le goulot d'étranglement qui rend son travail virtuellement trop long comparé à la lecture d'un quotidien papier le matin.",
      "Devant la muraille impénétrable des articles privés payants, des firewalls des intranets corporatifs cryptés et des bastions documentés où votre carte bancaire fait barrière absolue.",
      "L'incapacité viscérale de rapprocher conceptuellement plus de deux paragraphes en simultané."
    ],
    2,
    "Le mur du capitalisme protège jalousement le savoir monétisé. Toute barrière nécessitant une interface utilisateur réelle avec des codes reste le trou noir que la machine ne scannera point."
  ),
  textStep(
    "L'Aboutissement par le Filtrage Intra-Personnel",
    "L'accomplissement retentissant au sein d'une économie d'abondance d'informations : l'opportunité de lier la globalité infinie du savoir mondial à la souffrance étouffée de votre bureau modeste, par la grâce de détails ultra-personnels exposés de votre main à l'attention de la matrice."
  ),
  fillStep(
    "Asservir la Globalité",
    "Confrontez la masse à votre singularité.",
    "\"Mon affaire n'est rien d'autre qu'une fragile [___], en proie depuis un trimestre à un mal chronique consistant à [___]. Chalute le réseau mondial dans le but ultime d'isoler de sang froid des modèles d'entreprises consœurs qui miraculeusement [___] avec brio au même type de drame structurel affectant le système. Retire toute fiction littéraire pour ne retenir que des process immédiatement [___] et fais ressortir pour l'aube d'un jour nouveau les seules [___] armes viables pour déclencher ma riposte salvatrice de survie face au néant.\"",
    ["école de danse urbaine modeste", "perdre des abonnés dès février", "ont remédié", "transposables dans une TPE", "trois"],
    ["école de danse urbaine modeste", "perdre des abonnés dès février", "ont remédié", "transposables dans une TPE", "trois"],
    "La profondeur d'immersion personnalisée garantit que le remède prodigué épouse l'échelle réelle de votre enjeu évitant les envolées de budgets illusoires destinés aux méga-corporations."
  ),
  textStep(
    "Préceptes du Général Virtuel au Cœur des Réseaux Bruts Mondiaux",
    "Mener les régiments de calculs neuronaux à la moisson extérieure sans risquer la débâcle de sens impose le déploiement implacable d'un commandement stricte et ordonné refusant le libre arbitre abstrait ou aléatoire."
  ),
  textStep(
    "Conclusion Irrévocable et Mise en Route Définitive",
    "Affranchir Gemini des carcans du passé cloîtré dans sa mémoire d'entraînement transmute irrévocablement ce simple serviteur textuel sous une aura de limier chercheur invincible en ligne directe, acharné devant les monceaux de gravats digitaux et capable, aux ordres, de tamiser, décrypter et bâtir les rapports foudroyants en se fondant fidèlement aux axes complexes personnels du chef d'orchestre lui l'ayant commandé par un simple bout par texte ou fragment vocal articulé sans heurt.\n\nCe fossé terrifiant et incommensurable de performance le relève formellement des traditionnelles interfaces de recherche d'hier de fond en comble. Google fouille inlassablement sans fond dans les caves ; l'I.A. Gemini domine, conceptualise les faits et trace le futur.\n\nCommandez férocement. Visez de façon irréprochable et gagnez à tous niveaux en un clin d'œil perpétuel."
  )
] as const;
