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
  quizStep(
    "Nativo Multimodal",
    "O que significa dizer que o Gemini é nativo multimodal?",
    [
      "Ele foi desenvolvido para processar texto, imagem, áudio e vídeo de forma integrada desde sua concepção",
      "Ele apenas traduz imagens em texto antes de processá-las",
      "Multimodal significa que ele funciona em múltiplos dispositivos",
      "Ele processa cada tipo de entrada em sessões separadas"
    ],
    0,
    "Sendo nativo multimodal, o Gemini usa um único modelo base para raciocinar sobre visuais e palavras ao mesmo tempo."
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
  quizStep(
    "Misturando os Sentidos da IA",
    "Por que combinar texto e imagem no mesmo prompt melhora a qualidade da resposta?",
    [
      "Porque o Gemini responde mais rápido com mais de um tipo de entrada",
      "Para deixar o prompt mais longo e completo",
      "Porque o contexto visual e o contexto textual se complementam, permitindo ao Gemini fazer uma análise mais precisa e completa",
      "Não faz diferença combinar entradas diferentes"
    ],
    2,
    "Dar referências visuais poupa centenas de palavras que você teria que usar apenas descrevendo a imagem."
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
  quizStep(
    "O Olho Crítico do Gemini",
    "Qual das opções abaixo é um uso eficaz do Gemini com entrada de imagem?",
    [
      "Pedir ao Gemini para editar a imagem diretamente",
      "Usar apenas para imagens de alta resolução",
      "Enviar o print de um erro no sistema e pedir ao Gemini para identificar o problema e sugerir a solução",
      "O Gemini só analisa imagens de texto, não fotografias"
    ],
    2,
    "A análise de erro visual é um dos maiores ganhos de tempo no troubleshooting técnico."
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
  quizStep(
    "O Poder da Leitura Visual",
    "Por que o Gemini é especialmente útil para analisar documentos com gráficos e tabelas?",
    [
      "Porque ele converte todos os gráficos em planilhas automaticamente",
      "Apenas documentos criados no Google Docs são processados corretamente",
      "Porque ele lê tanto os elementos visuais quanto o texto do documento de forma integrada, gerando uma análise completa sem perder dados visuais",
      "O Gemini ignora gráficos e processa apenas o texto dos documentos"
    ],
    2,
    "Modelos antigos ficavam cegos diante dos gráficos de PDF; o Gemini enxerga cada linha de tendência visual."
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
  quizStep(
    "Economizando Tempo",
    "O que o Gemini consegue fazer com um vídeo do YouTube?",
    [
      "Fazer download do vídeo em MP4",
      "Editar e cortar partes do vídeo automaticamente",
      "Analisar o conteúdo falado e visual, resumir os pontos principais e responder perguntas específicas sobre o que foi apresentado",
      "O Gemini só processa vídeos enviados diretamente, não links do YouTube"
    ],
    2,
    "Extrair informação central é ideal para estudar cases em menor tempo."
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
  quizStep(
    "Secretário IA",
    "Qual é o fluxo mais eficiente para transformar uma reunião gravada em ata usando o Gemini?",
    [
      "Ouvir a reunião inteira e escrever a ata manualmente",
      "Pedir ao Gemini para participar da reunião em tempo real",
      "Enviar o arquivo de áudio diretamente para o Gemini e pedir uma ata estruturada com decisões, responsáveis e prazos",
      "Transcrever o áudio em outro software e depois copiar o texto para o Gemini"
    ],
    2,
    "Sendo unificado, o Gemini evita pontes com aplicativos de transcrição externos."
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
  quizStep(
    "Fusão Multimodal",
    "Qual é a principal vantagem de combinar múltiplas entradas em um único prompt?",
    [
      "O Gemini responde mais rápido com mais arquivos",
      "Prompts com muitos arquivos sempre geram respostas mais longas",
      "O Gemini consegue cruzar informações de diferentes fontes e formatos, gerando uma análise mais completa e contextualizada do que seria possível com apenas um tipo de entrada",
      "Combinar entradas só funciona na versão paga do Gemini"
    ],
    2,
    "A justaposição de tabelas, imagens e notas gera um cenário em 360 graus que melhora profundamente a resposta."
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
  quizStep(
    "Erros Comuns",
    "Qual erro deve ser evitado ao usar entradas multimodais com o Gemini?",
    [
      "Enviar imagens junto com texto explicativo",
      "Pedir ao Gemini para descrever o que vê antes de analisar",
      "Enviar arquivos sem nenhuma instrução e esperar que o Gemini saiba exatamente o que fazer com eles",
      "Combinar dois tipos de entrada no mesmo prompt"
    ],
    2,
    "Enviar um arquivo vazio de intenção e o atalho mais rápido para obter respostas clichês e vazias de sentido."
  ),
  textStep(
    "Multimodalidade na Prática — Casos de Uso Reais",
    "Imagine analisar toda uma rede de franquias comparando dashboards e fotos panorâmicas do salão sem abrir três abas. Estes são alguns dos usos avançados do Google."
  ),
  quizStep(
    "Avaliação de Casos de Uso",
    "Qual dos cenários abaixo representa o uso mais estratégico da multimodalidade do Gemini?",
    [
      "Enviar uma foto e pedir para descrever as cores",
      "Usar apenas texto mesmo tendo imagens disponíveis",
      "Enviar o print de um dashboard, o PDF do relatório mensal e uma pergunta em texto pedindo uma análise integrada dos dados — recebendo uma resposta que cruza todas as fontes",
      "Processar cada arquivo em conversas separadas e comparar os resultados manualmente"
    ],
    2,
    "O tempo que se leva para correlacionar diferentes dados visualmente é exatamente a capacidade do Gemini na multimodalidade."
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
  quizStep(
    "Native Multimodal",
    "What does it mean to say that Gemini is natively multimodal?",
    [
      "It was designed to process text, image, audio, and video in an integrated way right from its inception",
      "It only translates images into text before processing them",
      "Multimodal means it works across multiple hardware devices",
      "It processes each type of input in separate browser sessions"
    ],
    0,
    "Being natively multimodal, Gemini uses a single core model to reason about visuals and words simultaneously, avoiding data loss in translation."
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
  quizStep(
    "Fusing AI Senses",
    "Why does combining text and image in the same prompt improve output quality?",
    [
      "Because Gemini responds faster when receiving multiple inputs",
      "To artificially increase the length and complexity of the prompt",
      "Because visual context and textual guidance complement each other, allowing Gemini to deliver a significantly more precise and holistic analysis",
      "Combining inputs actually makes no difference whatsoever"
    ],
    2,
    "Adding visuals saves you from typing out hundreds of words describing what you're seeing."
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
  quizStep(
    "Gemini's Critical Eye",
    "Which of the following is an effective use of Gemini with image input?",
    [
      "Asking Gemini to directly edit the image pixels",
      "Using it only exclusively for ultra high-res imaging",
      "Uploading a screenshot of a system error and having Gemini identify the problem while suggesting the fix",
      "Gemini only looks for text within images, ignoring photo elements"
    ],
    2,
    "Visual error tracking is a massive time-saver for technical troubleshooting."
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
  quizStep(
    "The Power of Visual Reading",
    "Why is Gemini particularly useful for scanning documents containing charts and tables?",
    [
      "Because it auto-converts all charts into downloadable spreadsheets",
      "It only accurately processes files bred directly inside Google Docs",
      "It natively reads both visual components and written paragraphs simultaneously, forming a thorough analysis without dropping visual data",
      "Gemini fully ignores charts and strips the document to plain text only"
    ],
    2,
    "Older models turned completely blind in the face of PDF charts; Gemini literally sees every trend line plotted."
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
  quizStep(
    "Sparing Time",
    "What is something Gemini successfully achieves with a YouTube video link?",
    [
      "Downloading the content locally to MP4 formats",
      "Slicing and auto-editing clip sequences",
      "Analyzing auditory and visual flow, distilling main ideas, and answering directed queries about the content portrayed",
      "Refusing YouTube links and demanding direct MP4 uploads"
    ],
    2,
    "Skimming hours of seminars for exactly what you need offers immense practical value."
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
  quizStep(
    "AI Secretary",
    "What represents the tightest flow to convert a recorded townhall into proper meeting minutes via Gemini?",
    [
      "Auditioning the full length track alone and penning notes as it plays",
      "Trying to ask Gemini to hijack the live meet instance as an attendee",
      "Dropping the audio directly into Gemini and demanding a structured agenda of actions, decisions, and deadlines",
      "Forcing a transcription over external software followed by pasting giant text walls into the prompt"
    ],
    2,
    "Because it acts as a unified layer, Gemini eradicates the need for third-party transcription tools."
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
  quizStep(
    "Multimodal Fusion",
    "What is the ultimate breakthrough in fusing several media types inside one prompt?",
    [
      "It causes Gemini to compute the output with markedly faster load speeds",
      "Flooding multiple inputs artificially balloons the output token count",
      "Gemini cross-pollinates signals across drastically different domains, orchestrating a fully contextual checkup that single-format workflows could never accomplish",
      "It unlocks hidden premium tiers of the model temporarily"
    ],
    2,
    "Piling data from multiple formats (charts and subjective opinions) builds an airtight perimeter around complex tasks."
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
  quizStep(
    "Common Pitfalls",
    "What severe misstep should be completely avoided when exploiting Gemini’s multimodal arrays?",
    [
      "Including descriptive context alongside images",
      "Ordering Gemini to recount visual elements before deducing their meaning",
      "Shoving blankly attached files and banking on Gemini figuring out your hidden intentions autonomously",
      "Injecting two distinct media formats together"
    ],
    2,
    "A file void of directives is a surefire avenue towards shallow, cliché, and essentially useless inferences."
  ),
  textStep(
    "Multimodality in Practice — Verifiable Use Cases",
    "Try visualizing assessing an entire retail branch purely by crossmatching financial ledgers against store layout snapshots without leaving the chat. That's modern AI capability."
  ),
  quizStep(
    "Evaluating Use Cases",
    "Among the options below, which portrays the most strategic orchestration of Gemini's multimodality?",
    [
      "Sending a wallpaper to have it name the dominant shades of color",
      "Maneuvering strictly with text descriptions despite having original photos accessible",
      "Dropping a dashboard screenshot, supplying the monthly PDF ledger, and typing a query meant to triangulate performance metrics — triggering a harmonized multi-source evaluation",
      "Processing each singular file in isolated chat sessions and attempting to manually map the disjointed outputs"
    ],
    2,
    "The raw hours saved by not having to manually correlate and synthesize different visual datasets represent Gemini’s zenith value proposition."
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
  quizStep(
    "Nativo Multimodal",
    "¿Qué significa decir que Gemini es nativamente multimodal?",
    [
      "Fue desarrollado para procesar texto, imagen, audio y video de forma integrada desde su concepción",
      "Solo traduce imágenes a texto antes de procesarlas",
      "Multimodal significa que funciona en múltiples dispositivos a la vez",
      "Procesa cada tipo de entrada en sesiones separadas"
    ],
    0,
    "Al ser nativo multimodal, Gemini usa un único modelo base para razonar sobre imágenes y palabras al mismo tiempo, evitando pérdida de datos en la traducción."
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
  quizStep(
    "Mezclando los Sentidos de la IA",
    "¿Por qué combinar texto e imagen en el mismo prompt mejora la calidad de la respuesta?",
    [
      "Porque Gemini responde más rápido con más de un tipo de entrada",
      "Para hacer el prompt artificialmente más largo",
      "Porque el contexto visual y el contexto textual se complementan, permitiendo a Gemini hacer un análisis más preciso y completo",
      "No hace ninguna diferencia combinar diferentes entradas"
    ],
    2,
    "Dar referencias visuales ahorra decenas de palabras que tendrías que usar simplemente para describir la imagen."
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
  quizStep(
    "El Ojo Crítico de Gemini",
    "¿Cuál de las siguientes es una forma efectiva de usar Gemini con imágenes?",
    [
      "Pedirle a Gemini que edite los colores de la foto",
      "Usarlo solo para archivos fotográficos en 4K",
      "Enviar la captura de un error en el sistema y pedirle a Gemini identificar el problema y sugerir la solución",
      "Gemini solo busca palabras en una foto e ignora todo lo demás"
    ],
    2,
    "El análisis visual de errores es uno de los mayores atajos en el troubleshooting técnico."
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
  quizStep(
    "El Poder de la Lectura Visual",
    "¿Por qué Gemini es especialmente útil para analizar documentos con gráficos y tablas?",
    [
      "Porque convierte todos los gráficos a hojas de cálculo automáticamente",
      "Solo los PDFs creados en Google Docs son válidos",
      "Porque lee tanto los elementos visuales como el texto de forma integrada, generando un análisis completo sin perder datos visuales",
      "Gemini ignora los gráficos al encontrar un PDF"
    ],
    2,
    "Los modelos anteriores se volvían ciegos ante los gráficos de un PDF; Gemini interpreta literalmente cada línea de tendencia que se le muestra."
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
  quizStep(
    "Ahorrando Tiempo",
    "¿Qué puede hacer Gemini eficazmente con un video de YouTube?",
    [
      "Descargarlo para verlo sin conexión",
      "Editar e insertar recortes visuales solos",
      "Analizar el flujo auditivo y visual, resumir las ideas principales y contestar a consultas puntuales de lo que se expuso",
      "No acepta enlaces de video, solo archivos subidos directamente"
    ],
    2,
    "Extraer información central en minutos es ideal para estudiar casos largos en menos tiempo."
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
  quizStep(
    "Secretario IA",
    "¿Cuál es el flujo de trabajo más óptimo al usar un audio en Gemini?",
    [
      "Oír la grabación y transcribirla manualmente en la caja de texto",
      "Tratar de meter al asistente a la junta con micrófono falso",
      "Subir el audio directo y pedirle un esquema formal ordenando acuerdos y tareas resultantes",
      "Gemini no comprende formatos audibles"
    ],
    2,
    "Generar la estructura con plazos aporta acciones inmediatas a una mera charla."
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
  quizStep(
    "Fusión Multimodal",
    "¿Cuál es la gran ventaja de solapar medios múltiples con Gemini?",
    [
      "El bot procesa algoritmos artificialmente más veloces",
      "Cargar archivos sube permanentemente el abanico de respuestas absurdas",
      "Gemini cruza variables heterogéneas armando un escrutinio hipercontextual e indivisible que no toleraría separar los recursos",
      "Multimodalidad bloquea temporalmente los límites de la lectura"
    ],
    2,
    "La superposición de PDF, capturas y notas crea una vista en 360 grados de alto rendimiento."
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
  quizStep(
    "Errores Comunes",
    "A nivel multimodal, ¿qué desliz frecuente entierra las capacidades analíticas de Gemini?",
    [
      "Complementar capturas de errores con texto previo de código",
      "Pedir al modelo que liste los detalles visuales de una foto cruda primero",
      "Tirar un paquete inmenso de archivos mudo confiando en que por magia Gemini intente dar un resumen adivinatorio que funcione",
      "No hay errores letales mezclando canales"
    ],
    2,
    "Si mandas contenido vacío de perspectiva humana obtendrás conclusiones fofas e inútiles."
  ),
  textStep(
    "Multimodalidad en la Práctica",
    "Imagina el nivel gerencial cruzando contabilidad cruda, vistas esquemáticas o videos tutoriales enteros asimilados e interpretados a voluntad a la velocidad de la luz."
  ),
  quizStep(
    "Evaluación de Casos Prácticos",
    "¿Cuál caso evidencia la destreza estratégica de emplear Gemini en formato completo?",
    [
      "Colocar hojas coloridas pidiendo discernir sus pantones",
      "Trabajar solo a pluma obviando las evidencias adjuntas",
      "Proveer una impresión general del dashboard en captura, la memoria corporativa en PDF y lanzar preguntas incisivas que intersecten todo el panorama adjunto",
      "Poner el recurso y aislar un prompt"
    ],
    2,
    "El ahorro exponencial del esfuerzo cruzando datos aislados sin intervención humana reafirma la excelencia multimodal."
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
  quizStep(
    "Natif Multimodal",
    "Que signifie l'affirmation selon laquelle Gemini est nativement multimodal ?",
    [
      "Il a été spécifiquement codé pour traiter le texte, l'image, l'audio et la vidéo d'une seule traite dès sa fondation",
      "Il traduit bêtement les images en texte avant de les examiner",
      "Multimodal équivaut au fait qu'il s'ouvre sur différents écrans simultanément",
      "Il isole chaque fichier soumis pour l'analyser dans sa propre fenêtre séparée"
    ],
    0,
    "En tant que produit purement multimodal, Gemini mobilise son architecture principale pour raisonner sur l'image et vos propos simultanément, sans détériorer les données par de la traduction forcée."
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
  quizStep(
    "Fusionner les Sens Extra-Sensoriels de l'IA",
    "En quoi conjuguer image et texte affine-t-il considérablement l'expertise délivrée ?",
    [
      "Tout simplement car Gemini tourne plus vite s'il est noyé sous des tonnes d'instructions",
      "Cela a pour but unique d'allonger le message",
      "Parce que le contexte graphique et les conditions textuelles se comblent mutuellement, permettant de soulever une analyse pointue qu'il est impossible de générer autrement",
      "Associer les champs d'entrée n'apporte strictement rien de substantiel"
    ],
    2,
    "Livrer des échantillons graphiques épargne des milliers de mots utilisés pour tout dépeindre à la place de l'outil."
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
  quizStep(
    "L'Œil Linceul de Gemini",
    "Lequel de ces cas représente un déploiement judicieux de Gemini face à des images ?",
    [
      "Le forcer à modifier l'image et l'exporter sur Photoshop",
      "Traiter obstinément des tirages ultra haute résolution qui pèsent trop lourd",
      "Mettre en pièce jointe l'arrêt d'un écran bogué et lui en réclamer sur le champ le diagnostic et le remède",
      "C'est un leurre ; il ne repère que le lettrage au sein des visuels"
    ],
    2,
    "Inspecter les pannes informatiques à coups de captures d'écran propulse le dépannage technique dans la stratosphère de l'instantanéité."
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
  quizStep(
    "S'affranchir de la Lecture Imbuvable",
    "Sous quel angle l'assistant Gemini distance-t-il l’écrasante majorité de ses pairs quant aux PDF comptables ?",
    [
      "Il remet systématiquement à plat tout le fichier en format tableur indépendant",
      "Seuls les travaux émis via l'outil officiel Google Docs passent entre les mailles du filet d'interprétation",
      "Il lie spontanément la consistance des tableaux chiffrés aux déclarations de texte pour tisser son argumentation globale ininterrompue",
      "Les graphiques passent tous à la trappe dans ses synthèses logicielles"
    ],
    2,
    "Les algorithmes ancêtres s’embrouillaient. Gemini voit véritablement à travers chaque infographie figurant sur les feuillets."
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
  quizStep(
    "Faire Gagner le Temps",
    "Comment Gemini transforme-t-il particulièrement le lien de la toile via sa fenêtre ?",
    [
      "Il permet notamment sa capture rapide sur des logiciels externes",
      "Il monte à la chaîne de courts passages chocs prêts à servir",
      "Il pèse chaque seconde audio-visuelle pour en sortir la moelle épinière argumentaire face à votre cahier des charges textuel",
      "C'est une hérésie : les vidéos en ligne le bloquent"
    ],
    2,
    "Pouvoir repérer la séquence critique évite l’interminable torture du rembobinage et de la retranscription fastidieuse."
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
  quizStep(
    "Le Greffier Électronique",
    "Quelle méthodologie assure la conception magistrale de notes de réunions grâce au processeur de Gemini ?",
    [
      "Traiter à la volée une cassette dictaphone personnelle alors que le robot rédige en retrait lent",
      "Tirer profit d'applications satellites en retranscrivant à côté puis copier coller des blocs indigestes",
      "Le gaver prestement de l'audio lourd et exiger en retour des conclusions parachevées, segmentées en termes clairs de responsabilités et d'actions directes",
      "Gemini refuse tout système sonore par pur respect du protocole interne"
    ],
    2,
    "La fin de l'abonnement à de multiples traducteurs payants d'audiovisuel signe un atout fort au service des budgets."
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
  quizStep(
    "Le Bouquet Multimodal",
    "Quel bénéfice net extirpe-t-on radicalement en juxtaposant un tel patchwork de fichiers dans une simple soumission textuelle continue ?",
    [
      "On obtient un bonus d'accélération d'horloge serveurs temporairement",
      "Faire saturer les compteurs pour qu'il décharge aléatoirement plus de lignes d'observations sans intérêt",
      "Provoquer une analyse dialectique monumentale couplant les informations issues de natures de rédactions disparates sous des angles impossibles à déduire via l'information textuelle stricte",
      "C'est un mythe impossible même chez Google."
    ],
    2,
    "Corréler de multiples horizons d'entrée assure des bilans à couverture exhaustive qui protègent la stratégie de points morts impardonnables."
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
  quizStep(
    "Les Grandes Illusions",
    "Quel manquement crucial anéantit fréquemment les prétentions d'une utilisation fine des atouts multimodaux de Gemini ?",
    [
      "Fournir systématiquement un manuel ou des mots d'accompagnements à son image",
      "Demander une analyse textuelle préparatoire du paysage qu'il a devant lui",
      "Jeter les fichiers un à un dans la conversation en considérant que l'intelligence se passera volontiers du motif de traitement, s'enlisant dans le devinage puéril",
      "Absolument aucun. Mettre différentes sources bloque automatiquement la boîte."
    ],
    2,
    "Sans cadre pragmatique dicté de la main de l'homme, il reste un automate très efficace qui va taper partout sans jamais toucher sa cible exacte."
  ),
  textStep(
    "Pragmatique de la Complexité en Situations Réelles",
    "Mettez en scène une inspection de centaines de sites magasins via des rapports PDF juxtaposés sur les photographies d'architecture tirées de la vraie vie ; et ce d'un unique cliquetis et au sein de la page d'un navigateur conventionnel."
  ),
  quizStep(
    "Évaluons un Cas Difficile",
    "Exposez un dispositif de déploiement digne d'un fin manipulateur de ces technologies, mis en adéquation parfaite de fonctionnement multimodal Gemini :",
    [
      "Proposer qu'il liste le nom des teints dominant une peinture abstraite contemporaine.",
      "S'échiner tout du long sur le seul domaine textuel alors qu'on dispose sous le coude d'éléments infographiques lourds",
      "Balancez un cliché globalisant un tableau de bord des opérations, adossé de fait sur un livret stratégique corporatif PDF afin de le lancer dans la traque de correspondances complexes que pourrait dissimuler telle masse de chiffres.",
      "Adresser toutes ces preuves de façon fractionnée sur plein de sujets séparés de la messagerie pour l'entraver et comparer tout en externe avec des feuilles physiques."
    ],
    2,
    "Faire de Gemini l'opérateur sur lequel pèse l'obligation d'abattage quantitatif et comparatif est fondamental."
  ),
  textStep(
    "Terminus",
    "Le traitement multimodal constitue aujourd'hui la marche du changement et de l'affirmation hégémonique des modèles comme Gemini. C'est se désaxer complètement de la pure mécanique d'ingestion textuelle pour basculer en perception des environnements ; fusionner, lier la source du film à la documentation mathématique, et ce à même le chat unifié.\n\nS'y frotter permet à chacun des acteurs d'échapper au marasme du temps incompressible des retranscriptions aveugles. Il demeure votre plus proche et silencieux partenaire.\n\nObservez plus loin. Connectez vos données. Gagnez sur les processus."
  )
] as const;
