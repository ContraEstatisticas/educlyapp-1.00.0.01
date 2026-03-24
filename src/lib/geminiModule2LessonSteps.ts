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

export const GEMINI_MODULE_2_STEPS_PT = [
  textStep(
    "Gemini — Entendendo as Entradas Multimodais",
    "Bem-vindo de volta! Nesta lição, você vai mergulhar em uma das capacidades mais poderosas do Gemini — o processamento multimodal. Isso significa que o Gemini não lê apenas texto. Ele vê imagens, ouve áudio, interpreta vídeos e analisa documentos visuais. Tudo na mesma conversa.\n\nO que é Multimodalidade?\nMultimodalidade é a capacidade de processar e combinar diferentes tipos de entrada — texto, imagem, áudio, vídeo e documentos — em uma única conversa. O Gemini foi construído desde o início para ser nativo multimodal, o que significa que ele não trata cada tipo de entrada de forma separada, mas sim de forma integrada."
  ),
  textStep(
    "Entrada de Texto — A Base de Tudo",
    "O texto continua sendo a forma mais comum de interagir com o Gemini. Mas com o Gemini, o texto pode ser combinado com qualquer outro tipo de entrada para criar prompts muito mais ricos e precisos."
  ),
  fillStep(
    "Combine texto com contexto!",
    "Combine entradas variadas para obter melhores análises.",
    "\"Analise o [___] que estou enviando junto com esta mensagem. Com base no [___] e nos [___] apresentados, me diga quais são as [___] mais relevantes e o que elas indicam sobre o [___] do negócio.\"",
    ["gráfico de desempenho", "visual", "dados", "tendências", "momento atual"],
    ["gráfico de desempenho", "visual", "dados", "tendências", "momento atual"],
    "Fornecer referências cruzadas enriquece incrivelmente as análises feitas pela Inteligência Artificial."
  ),
  textStep(
    "Entrada de Imagem — O Gemini Enxerga",
    "Você pode enviar qualquer imagem para o Gemini e pedir análises, descrições, interpretações e comparações. Fotos, gráficos, prints de tela, diagramas, produtos — tudo pode ser analisado."
  ),
  fillStep(
    "Analise uma imagem!",
    "Ensine o Gemini a olhar como um observador.",
    "\"Aqui está uma [___] do produto do meu concorrente. Analise e me diga: quais são os [___] visuais de destaque, que [___] o design transmite, quais [___] estão sendo comunicados e o que eu poderia [___] na minha própria linha de produtos.\"",
    ["foto", "elementos", "emoções", "diferenciais", "aprender e aplicar"],
    ["foto", "elementos", "emoções", "diferenciais", "aprender e aplicar"],
    "Dar foco aos elementos emocionais da foto traz camadas ricas na interpretação do material."
  ),
  textStep(
    "Entrada de Documentos Visuais — PDFs e Apresentações",
    "O Gemini consegue processar PDFs, apresentações e documentos com elementos visuais — tabelas, gráficos, infográficos — extraindo informações e fazendo análises que vão além do texto simples."
  ),
  fillStep(
    "Processe seu documento visual!",
    "Extraia dados cruciais usando o leitor unificado.",
    "\"Aqui está o [___] da empresa com [___] páginas. Analise os [___] e [___] presentes no documento, extraia os [___] mais importantes e me diga quais [___] merecem atenção imediata da gestão.\"",
    ["relatório anual", "45", "gráficos", "tabelas", "indicadores", "números"],
    ["relatório anual", "45", "gráficos", "tabelas", "indicadores", "números"],
    "O entendimento multimodal não ignora gráficos dentro das páginas, cruzando-os com o texto perfeitamente."
  ),
  textStep(
    "Entrada de Vídeo — Assistindo e Analisando",
    "O Gemini consegue processar vídeos — especialmente do YouTube — analisando o conteúdo falado, os elementos visuais e a estrutura geral. Uma das capacidades mais únicas entre os assistentes de IA disponíveis hoje."
  ),
  fillStep(
    "Analise um vídeo!",
    "Poupe horas transcrevendo e assistindo palestras longas.",
    "\"Aqui está o [___] de uma palestra sobre [___]. Assista e me entregue: os [___] principais abordados, as [___] mais citadas pelo apresentador, os momentos de maior [___] e um resumo de no máximo [___] linhas.\"",
    ["link", "liderança e gestão de equipes", "tópicos", "estatísticas e dados", "impacto", "10"],
    ["link", "liderança e gestão de equipes", "tópicos", "estatísticas e dados", "impacto", "10"],
    "Você pode fazer isso com eventos ou tutoriais longos para não perder tempo pulando capítulos."
  ),
  textStep(
    "Entrada de Áudio — Ouvindo e Interpretando",
    "O Gemini consegue processar arquivos de áudio — transcrever, resumir e interpretar o conteúdo de gravações, podcasts e reuniões."
  ),
  fillStep(
    "Processe seu áudio!",
    "Automatize atas e memorandos.",
    "\"Aqui está a [___] da reunião de hoje. Transcreva o conteúdo, identifique os [___] de cada participante, liste as [___] tomadas e os [___] com responsável e prazo definido. Formate como uma [___] profissional.\"",
    ["gravação", "pontos levantados", "decisões", "próximos passos", "ata"],
    ["gravação", "pontos levantados", "decisões", "próximos passos", "ata"],
    "Gerar a estrutura completa com prazos dá aplicabilidade imediata a uma simples conversa oral."
  ),
  textStep(
    "Combinando Múltiplas Entradas no Mesmo Prompt",
    "O poder real do Gemini aparece quando você combina diferentes tipos de entrada no mesmo prompt. Texto mais imagem mais documento — tudo processado de forma integrada."
  ),
  fillStep(
    "Combine entradas diferentes!",
    "Tudo de uma vez por um mesmo objetivo.",
    "\"Estou enviando [___]: a [___] da campanha atual, o [___] com os resultados e minhas [___] em texto sobre o que não está funcionando. Com base em tudo isso, me diga qual é o [___] central da campanha e sugira [___] ações concretas para melhorar os resultados.\"",
    ["3 arquivos", "imagem do criativo", "relatório em PDF", "anotações", "problema", "3"],
    ["3 arquivos", "imagem do criativo", "relatório em PDF", "anotações", "problema", "3"],
    "Essas referências contextuais são valiosas porque reúnem design, lógica quantitativa e o seu próprio julgamento humano."
  ),
  textStep(
    "Boas Práticas com Entradas Multimodais",
    "Entregar os arquivos certos é metado do trabalho. A outra metade é o Prompt bem montado. Descubra os macetes."
  ),
  fillStep(
    "Use multimodalidade com estratégia!",
    "Delimite o terreno para o assistente.",
    "\"Ao enviar uma imagem, sempre [___] o que você quer que o Gemini [___] nela. Ao enviar um vídeo longo, especifique se quer o [___] completo ou apenas os [___] mais importantes. Para documentos com muitos dados visuais, peça ao Gemini para [___] antes de analisar.\"",
    ["explique", "observe ou analise", "resumo", "momentos", "descrever o que vê"],
    ["explique", "observe ou analise", "resumo", "momentos", "descrever o que vê"],
    "Reduzir ambiguidades garante que o Gemini use as horas que você poupou focando nas coisas certas."
  ),
  textStep(
    "Multimodalidade na Prática — Casos de Uso Reais",
    "Imagine analisar toda uma rede de franquias comparando dashboards e fotos panorâmicas do salão sem abrir três abas. Estes são alguns dos usos avançados do Google."
  ),
  textStep(
    "Conclusão",
    "A multimodalidade é o que torna o Gemini único. A capacidade de ver, ouvir, ler e interpretar diferentes tipos de informação na mesma conversa abre possibilidades que nenhuma ferramenta de texto puro consegue alcançar. Imagens, vídeos, áudios, documentos visuais — tudo pode ser processado, cruzado e transformado em insights acionáveis.\n\nQuanto mais você explora as combinações possíveis de entrada, mais poderoso o Gemini se torna. O limite não está na ferramenta — está na sua capacidade de fazer as perguntas certas.\n\nVeja mais. Analise mais. Decida melhor."
  )
] as const;

export const GEMINI_MODULE_2_STEPS_EN = [
  textStep(
    "Gemini — Understanding Multimodal Inputs",
    "Welcome back! In this lesson, you will dive into one of Gemini's most powerful capabilities — multimodal processing. This means Gemini doesn't just read text. It sees images, hears audio, interprets videos, and analyzes visual documents. All in the same conversation.\n\nWhat is Multimodality?\nMultimodality is the ability to process and combine different types of input — text, image, audio, video, and documents — in a single interaction. Gemini was built from the ground up to be natively multimodal, meaning it doesn't treat each input type separately, but rather integrates them completely."
  ),
  textStep(
    "Text Input — The Foundation",
    "Text remains the most common way to interact with Gemini. But with Gemini, text can be combined with any other type of input to create far richer and more precise commands."
  ),
  fillStep(
    "Combine text with context!",
    "Integrate diverse inputs for robust analysis.",
    "\"Analyze the [___] I am attaching with this message. Based on the [___] and the presented [___], tell me what the most relevant [___] are and what they signify about the business's [___].\"",
    ["performance chart", "visuals", "data", "trends", "current status"],
    ["performance chart", "visuals", "data", "trends", "current status"],
    "Providing multimodal cross-references immensely enriches AI analysis."
  ),
  textStep(
    "Image Input — Gemini Sees",
    "You can feed any image into Gemini and ask for breakdowns, descriptions, interpretations, or comparisons. Photos, graphs, screenshots, diagrams, product shots — everything is analyzable."
  ),
  fillStep(
    "Analyze an image!",
    "Train Gemini to look closely as an observer.",
    "\"Here is a [___] of my competitor's product. Analyze it and tell me: what visual [___] stand out, what [___] the design attempts to convey, which [___] are highlighted, and what I could [___] strictly for my own product line.\"",
    ["photo", "elements", "emotions", "differentiators", "learn and apply"],
    ["photo", "elements", "emotions", "differentiators", "learn and apply"],
    "Focusing on the emotional and subjective metrics brings rich layers into the review process."
  ),
  textStep(
    "Visual Documents — PDFs and Presentations",
    "Gemini handles PDFs, slidedecks, and documents with visual components — tables, graphs, infographics — extracting insights that go leagues beyond plain text."
  ),
  fillStep(
    "Process your visual document!",
    "Extract crucial metrics via the unified reader.",
    "\"Here is the company’s [___] boasting [___] pages. Analyze the [___] and [___] scattered throughout, pull out the most vital [___], and highlight which [___] demand the management team's immediate attention.\"",
    ["annual report", "45", "graphs", "tables", "indicators", "figures"],
    ["annual report", "45", "graphs", "tables", "indicators", "figures"],
    "Multimodal understanding correctly parses charts alongside their surrounding text paragraphs seamlessly."
  ),
  textStep(
    "Video Input — Watching and Reporting",
    "Gemini possesses the ability to ingest videos — especially YouTube links — dissecting spoken content, visual cues, and overarching structures. This constitutes a unique milestone amongst current AI paradigms."
  ),
  fillStep(
    "Analyze a video!",
    "Save endless hours trying to transcribe or watch mammoth keynotes.",
    "\"Here is the [___] to a keynote focused on [___]. Watch it and return: the main [___] covered, the most cited [___] brought up by the speaker, moments of highest [___], and a brief abstract of at most [___] lines.\"",
    ["link", "team leadership and management", "topics", "statistics and data", "impact", "10"],
    ["link", "team leadership and management", "topics", "statistics and data", "impact", "10"],
    "Deploying this on extended seminars dramatically cuts the timeline to spot relevance."
  ),
  textStep(
    "Audio Input — Listening and Distilling",
    "Gemini successfully processes raw audio files, providing swift transcriptions, precise summaries, and contextual evaluations of podcasts, memos, and board meetings."
  ),
  fillStep(
    "Process your audio!",
    "Automate meeting minutes flawlessly.",
    "\"Here is the [___] of today's meeting. Transcribe the log, pinpoint the specific [___] championed by each participant, list the [___] taken, and draft the [___] complete with owners and deadlines. Format everything as a professional [___].\"",
    ["recording", "points raised", "decisions", "next steps", "minute"],
    ["recording", "points raised", "decisions", "next steps", "minute"],
    "Creating an instantly accountable architecture around raw chatter secures project tracking."
  ),
  textStep(
    "Combining Multiple Inputs Simultaneously",
    "Gemini’s undisputed trump card is stacking differing input modes in one unified prompt. Text accompanying a screenshot supplementing a PDF."
  ),
  fillStep(
    "Combine diverse formats!",
    "All at once aimed at a singular goal.",
    "\"I am providing [___]: the [___] for the newest campaign, the [___] spelling out the revenue, and my own [___] complaining about our stagnating conversion. Review everything, locate the central [___] dragging the campaign down, and prescribe [___] actionable fixes.\"",
    ["3 files", "creative image", "PDF report", "text notes", "problem", "3"],
    ["3 files", "creative image", "PDF report", "text notes", "problem", "3"],
    "This holistic bridging unites qualitative design, cold numeric truth, and your intuition seamlessly."
  ),
  textStep(
    "Best Practices When Using Multimodal Intakes",
    "Handing over the files is only half the battle. Prompt framing does the actual heavy lifting. Master these shortcuts."
  ),
  fillStep(
    "Utilize multimodality strategically!",
    "Box in your AI’s focus effectively.",
    "\"Whenever attaching an image, precisely [___] what you expect Gemini to [___] within the frame. Given a long video, stipulate whether you want a full [___] or solely the peak [___]. Regarding visually heavy decks, tell Gemini to first [___] before rendering a verdict.\"",
    ["explain", "observe or analyze", "summary", "moments", "describe what it sees"],
    ["explain", "observe or analyze", "summary", "moments", "describe what it sees"],
    "Narrowing ambiguities dictates how effectively Gemini allocates its reasoning engine."
  ),
  textStep(
    "Multimodality in Practice — Verifiable Use Cases",
    "Try visualizing assessing an entire retail branch purely by crossmatching financial ledgers against store layout snapshots without leaving the chat. That's modern AI capability."
  ),
  textStep(
    "Conclusion",
    "Multimodality forms the vanguard of Gemini’s singularity. Empowering a model to observe, listen, scan, and interpret varying streams of data in a unified session smashes through the glass ceilings of text-only bots. Pictures, lectures, audio memos, dense reports — parsed, cross-examined, and morphed into highly actionable directives.\n\nThe broader you paint your input canvas, the sharper Gemini gets. The friction point doesn't sit with the software ceiling — it relies on you asking the optimal questions.\n\nObserve deeper. Aggregate better. Decide faster."
  )
] as const;

export const GEMINI_MODULE_2_STEPS_ES = [
  textStep(
    "Gemini — Entendiendo las Entradas Multimodales",
    "¡Bienvenido de vuelta! En esta lección, te sumergirás en una de las capacidades más poderosas de Gemini — el procesamiento multimodal. Esto significa que Gemini no solo lee texto. También ve imágenes, escucha audio, interpreta videos y analiza documentos visuales. Todo en la misma conversación.\n\n¿Qué es la Multimodalidad?\nLa multimodalidad es la capacidad de procesar y combinar diferentes tipos de entrada — texto, imagen, audio, video y documentos — en una sola interacción. Gemini fue construido desde cero para ser nativo multimodal, lo que significa que no trata cada tipo de entrada por separado, sino de forma totalmente integrada."
  ),
  textStep(
    "Entrada de Texto — La Base de Todo",
    "El texto sigue siendo la forma más común de interactuar con Gemini. Pero con Gemini, el texto se puede combinar con cualquier otro tipo de entrada para crear prompts mucho más ricos y precisos."
  ),
  fillStep(
    "¡Combina texto con contexto!",
    "Combina entradas variadas para obtener mejores análisis.",
    "\"Analiza el [___] que envío junto con este mensaje. Con base en el [___] y en los [___] presentados, dime cuáles son las [___] más relevantes y qué indican sobre el [___] del negocio.\"",
    ["gráfico de rendimiento", "visual", "datos", "tendencias", "momento actual"],
    ["gráfico de rendimiento", "visual", "datos", "tendencias", "momento actual"],
    "Proporcionar referencias cruzadas enriquece increíblemente los análisis hechos por la IA."
  ),
  textStep(
    "Entrada de Imagen — Gemini Ve",
    "Puedes enviar cualquier imagen a Gemini y pedirle análisis, descripciones, interpretaciones y comparaciones. Fotos, gráficos, capturas de pantalla, diagramas, productos — todo puede ser analizado."
  ),
  fillStep(
    "¡Analiza una imagen!",
    "Enséñale a Gemini a observar de cerca.",
    "\"Aquí hay una [___] del producto de mi competidor. Analízala y dime: cuáles [___] visuales destacan, qué [___] transmite el diseño, qué [___] se están comunicando y qué podría [___] en mi propia línea de productos.\"",
    ["foto", "elementos", "emociones", "diferenciadores", "aprender y aplicar"],
    ["foto", "elementos", "emociones", "diferenciadores", "aprender y aplicar"],
    "Enfocarse en los elementos visuales emocionales añade capas de profundidad a la revisión."
  ),
  textStep(
    "Documentos Visuales — PDFs y Presentaciones",
    "Gemini puede procesar PDFs, presentaciones y documentos con elementos visuales — tablas, gráficos, infografías — extrayendo información y haciendo análisis que superan con creces el simple texto."
  ),
  fillStep(
    "¡Procesa tu documento visual!",
    "Extrae datos cruciales usando el lector unificado.",
    "\"Aquí tienes el [___] de la empresa con [___] páginas. Analiza los [___] y [___] presentes en él, extrae los [___] más importantes y dime qué [___] merecen atención gerencial prioritaria.\"",
    ["informe anual", "45", "gráficos", "tablas", "indicadores", "números"],
    ["informe anual", "45", "gráficos", "tablas", "indicadores", "números"],
    "La IA procesa perfectamente los gráficos insertados junto con los párrafos de texto que los acompañan."
  ),
  textStep(
    "Entrada de Video — Viendo y Resumiendo",
    "Gemini tiene la capacidad de procesar videos — especialmente enlaces de YouTube — analizando el contenido hablado, las pistas visuales y la estructura general."
  ),
  fillStep(
    "¡Analiza un video!",
    "Ahorra tiempo valioso sin escuchar horas seguidas.",
    "\"Aquí tienes el [___] de una conferencia sobre [___]. Míralo y entrégame: los [___] principales abordados, las [___] más citadas, los momentos de mayor [___] y un resumen de hasta [___] líneas.\"",
    ["enlace", "liderazgo y gestión de equipos", "temas", "estadísticas y datos", "impacto", "10"],
    ["enlace", "liderazgo y gestión de equipos", "temas", "estadísticas y datos", "impacto", "10"],
    "Hacer esto con simposios o conferencias gigantes reduce enormemente el tiempo de investigación."
  ),
  textStep(
    "Entrada de Audio — Escuchando e Interpretando",
    "Gemini consigue procesar audios en bruto — transcribir, resumir e interpretar el contenido conversacional de memorandos, podcasts o reuniones laborales."
  ),
  fillStep(
    "¡Procesa tu audio!",
    "Automatiza tus actas al instante.",
    "\"Aquí está la [___] de la reunión de hoy. Transcribe el contenido, identifica los [___] de cada participante, lista las [___] tomadas y formula los [___] con responsables y fechas límite. Todo tipo [___].\"",
    ["grabación", "puntos planteados", "decisiones", "próximos pasos", "acta"],
    ["grabación", "puntos planteados", "decisiones", "próximos pasos", "acta"],
    "Al unificar el audio con esquemas concretos de texto, transformas la charla en responsabilidad pura."
  ),
  textStep(
    "Combinando Múltiples Entradas en el Mismo Prompt",
    "El poder real de Gemini brilla cuando combinas diferentes tipos de información en una sola orden. Un texto liderando a un PDF y sumando una imagen gráfica."
  ),
  fillStep(
    "¡Combina entradas diferentes!",
    "Todo al mismo tiempo y guiado por ti.",
    "\"Te envío [___]: la [___] de la campaña, el [___] de los resultados y mis [___] señalando el problema. Toma todo esto, destraba el [___] de conversión y sugiéreme [___] soluciones.\"",
    ["3 archivos", "imagen del anuncio", "informe en PDF", "anotaciones", "problema", "3"],
    ["3 archivos", "imagen del anuncio", "informe en PDF", "anotaciones", "problema", "3"],
    "Hilar datos diversos bajo un pensamiento global es la definición de inteligencia integral."
  ),
  textStep(
    "Buenas Prácticas con Entradas Multimodales",
    "Aportarle los archivos correctos al chatbot es solo la mitad de la victoria; el enmarque preciso corona el resultado."
  ),
  fillStep(
    "¡Usa multimodalidad con estrategia!",
    "Perfila qué esperar del bot.",
    "\"Si inserto material gráfico, antes [___] exactamente qué le pido que [___] allí. En un audio largo, puntualizo si reclamo un [___] general o aislar [___] críticos. De haber gran densidad gráfica, exijo que se moleste en [___].\"",
    ["explico", "observe o analice", "resumen", "momentos", "describir lo que ve"],
    ["explico", "observe o analice", "resumen", "momentos", "describir lo que ve"],
    "Despejar la ambigüedad redirige el poder computacional a extraer conclusiones firmes."
  ),
  textStep(
    "Multimodalidad en la Práctica",
    "Imagina el nivel gerencial cruzando contabilidad cruda, vistas esquemáticas o videos tutoriales enteros asimilados e interpretados a voluntad a la velocidad de la luz."
  ),
  textStep(
    "Conclusión",
    "El multimodalismo lidera el avance definitivo de la nueva IA, y es innegable que Gemini toma la delantera integrándolo orgánicamente. Conceder poder a un modelo de ver, inspeccionar, sondear audios y transcribir charlas funde de golpe toda la fricción natural en nuestras labores.\n\nTodo este bagaje incrementa la utilidad siempre y cuando tengas un enfoque nítido.\n\nMira más a fondo. Enlaza información dispersa. Resuelve como los líderes del mercado."
  )
] as const;
export const GEMINI_MODULE_2_STEPS_FR = [
  textStep(
    "Gemini — Comprendre les Entrées Multimodales",
    "Bon retour ! Dans cette leçon, vous allez plonger dans l'une des capacités les plus surprenantes de Gemini — le traitement multimodal. Cela signifie que Gemini ne lit pas seulement du texte. Il voit des images, écoute des bandes audio, interprète des vidéos et analyse des documents visuels entiers. Tout cela dans un même échange.\n\nQu'est-ce que la Multimodalité ?\nLa multimodalité est la capacité de traiter et combiner différents types de données — texte, image, audio, vidéo, documents — en une seule conversation continue. Gemini a été conçu à sa racine pour être nativement multimodal : il n'aborde pas chaque type de fichier séparément, mais les incorpore intégralement."
  ),
  textStep(
    "L'Entrée Textuelle — Le Socle de l'IA",
    "Le texte demeure le mode d'interaction premier avec Gemini. Cependant, l'écrit prend tout son sens quand on le marie aux différents types de fichiers pour formuler des requêtes extrêmement concrètes et précises."
  ),
  fillStep(
    "Mêlez texte et contexte visuel !",
    "Conjuguez des entrées distinctes pour hisser vos résultats.",
    "\"Analyse le [___] que je t'envoie avec ma requête. En te basant sur le [___] et les [___] apparents, indique-moi quelles sont les [___] majeures et ce que cela implique pour le [___] de l'entreprise.\"",
    ["graphique de performance", "visuel", "données", "tendances", "moment actuel"],
    ["graphique de performance", "visuel", "données", "tendances", "moment actuel"],
    "Insérer des documents annexes transcende le simple jeu de la devinette algorithmique."
  ),
  textStep(
    "L'Entrée d'Image — L’Œil de Gemini",
    "Toute capture d'écran, croquis, ou cliché trouve son sens face à Gemini pour forcir une observation, décrire un système, ou dégager une comparaison nette et rapide."
  ),
  fillStep(
    "Faites parler la photographie !",
    "Donnez une direction claire de l'observation attendue.",
    "\"Voici une [___] d'un produit concurrent. Examine-la attentivement et dis-moi : quels [___] graphiques priment, quelles [___] ce design suggère, les [___] qui sautent aux yeux, et en quoi je pourrais [___] ces atouts pour mes propres campagnes.\"",
    ["photo", "éléments", "émotions", "différentiels", "apprendre et appliquer"],
    ["photo", "éléments", "émotions", "différentiels", "apprendre et appliquer"],
    "Solliciter le ressenti et les émotions tirés d'un visuel met à l'épreuve l'acuité analytique avancée du système."
  ),
  textStep(
    "Documents Visuels — Gérer vos PDF et vos Présentations",
    "Les tableurs enfouis dans des rapports PDF n'ont aucun secret pour Gemini qui repère, scrute, et évalue l'intégrité des tableaux en y rattachant l'explication textuelle du même feuillet."
  ),
  fillStep(
    "Faites digérer votre paperasse !",
    "Sortez les chiffres clefs en confiant le balayage au lecteur centralisé.",
    "\"Voici le [___] des actionnaires comptant [___] pages. Dissèque les [___] et les [___] éparpillés dans ce fascicule, ramène-moi les [___] capitaux, et spécifie quels [___] réclament la riposte managériale urgente.\"",
    ["rapport annuel", "45", "graphiques", "tableaux", "indicateurs", "chiffres"],
    ["rapport annuel", "45", "graphiques", "tableaux", "indicateurs", "chiffres"],
    "La force multimodale associe naturellement chaque pic d'un graphique à sa légende."
  ),
  textStep(
    "L'Entrée Vidéo — Analyser du contenu audiovisuel",
    "Gemini ingère le streaming de manière impressionnante, singularité suprême des outils de cette lignée : envoyer un simple Hyperlien YouTube suffit pour en recevoir la philosophie décortiquée dans la foulée."
  ),
  fillStep(
    "Le grand saut vidéo !",
    "Contournez le chronophage visionnage sans intérêt ciblé.",
    "\"Ci-joint le [___] d'un sommet traitant de la [___]. Visionne ce contenu magistral, remonte-moi : les [___] prépondérants, les [___] lancées avec fracas par l'intervenant, les instants d'extrême [___], et un condensé strict de [___] lignes.\"",
    ["lien", "gestion et direction d'équipes", "sujets", "statistiques et données", "impact", "10"],
    ["lien", "gestion et direction d'équipes", "sujets", "statistiques et données", "impact", "10"],
    "Dégainer ce type de requêtes face à de volumineuses Masterclass sauve des semaines entières de labeur d'analyse."
  ),
  textStep(
    "L'Entrée Sonore — Comprendre l'Audio Brute",
    "Traiter la voix à nu est l'autre spécificité marquante : l'instrument prend un mémo dicté en vocalisation et dore la pilule en vous rétrocédant le discours parfaitement hiérarchisé à tous points de vue."
  ),
  fillStep(
    "Écoute et Synthèse",
    "Oubliez la tâche éreintante de la secrétaire d'hier.",
    "\"Examine du début à la fin la [___] de la commission de la matinée. Reproduis la feuille de route intégrale en insistant sur les [___] posés par chacun, établis la liste des [___] incontestables, et précise clairement les [___] accompagnés de leur référent. Restitue le tout en [___] formelle.\"",
    ["vocalisation", "points soulevés", "décisions", "prochaines étapes", "charte"],
    ["vocalisation", "points soulevés", "décisions", "prochaines étapes", "charte"],
    "Mettre l'audio au service du pragmatisme convertit de vagues échanges en livrables d'entreprise irréprochables."
  ),
  textStep(
    "Combinaison de Données Multi-Canal dans le Même Fil",
    "La pleine majesté du monstre Gemini éclate véritablement quand toutes ces natures d'inputs gravitent de concert. Fusionnez la vue et le son sous les directives claires de mille mots écrits de votre ressort."
  ),
  fillStep(
    "Mariez vos données !",
    "Converger l'arsenal sous le même prisme stratégique.",
    "\"Je mets en pièces jointes les [___] : d'abord l'[___] affichant le design incriminé, ensuite le [___] des retombées mercantiles, sans omettre de consulter mes profondes [___] désabusées. Regarde ça fixement et annonce-moi quel [___] paralyse l'enjeu, et lance-moi illico [___] directives de corrections pour tout assainir.\"",
    ["3 documents", "image visuelle", "rapport en PDF", "annotations textuelles", "défaut majeur", "3"],
    ["3 documents", "image visuelle", "rapport en PDF", "annotations textuelles", "défaut majeur", "3"],
    "C’est par le biais de la fusion d'éléments de formes divergentes (visuelles d'un côté, froides et mathématiques de l'autre) qu'opère la magie du calcul neuronal de pointe."
  ),
  textStep(
    "Le Guide des Bonnes Manières en Terrain Multimodal",
    "Fournir des pépites sans l'encadrement qui rassure les algorithmes risque de causer quelques dommages d'ordre contextuel. Affutez la précision tactique."
  ),
  fillStep(
    "Dompter le dragon !",
    "Ne laissez plus l'I.A. dans le tâtonnement vague quant au décryptage réclamé.",
    "\"Chaque envoi visuel doit l'avertir des éléments spécifiques à [___] dans ce cadre. Lorsqu'on s'essaie à transférer un film imposant, il faut souligner la primauté d'un strict [___] ou seulement la décortication d'un enchaînement de [___] distincts. Pour des PDF inondés d'infographies de gestion, on peut requérir qu'il [___] les diagrammes au lieu d'avancer une thèse hasardeuse sur la base de quelques termes génériques.\"",
    ["scruter à la loupe", "triage", "blocs de données", "détaille scrupuleusement"],
    ["scruter à la loupe", "triage", "blocs de données", "détaille scrupuleusement"],
    "Fixer explicitement aux algorithmes des contours de réflexion limite considérablement les hors-sujets égarants."
  ),
  textStep(
    "Pragmatique de la Complexité en Situations Réelles",
    "Mettez en scène une inspection de centaines de sites magasins via des rapports PDF juxtaposés sur les photographies d'architecture tirées de la vraie vie ; et ce d'un unique cliquetis et au sein de la page d'un navigateur conventionnel."
  ),
  textStep(
    "Terminus",
    "Le traitement multimodal constitue aujourd'hui la marche du changement et de l'affirmation hégémonique des modèles comme Gemini. C'est se désaxer complètement de la pure mécanique d'ingestion textuelle pour basculer en perception des environnements ; fusionner, lier la source du film à la documentation mathématique, et ce à même le chat unifié.\n\nS'y frotter permet à chacun des acteurs d'échapper au marasme du temps incompressible des retranscriptions aveugles. Il demeure votre plus proche et silencieux partenaire.\n\nObservez plus loin. Connectez vos données. Gagnez sur les processus."
  )
] as const;
