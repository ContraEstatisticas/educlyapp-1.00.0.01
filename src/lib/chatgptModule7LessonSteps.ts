import {
  AiTrailFillBlanksLessonStep,
  AiTrailQuizLessonStep,
  AiTrailTextLessonStep,
} from "./aiTrailContent";

const textStep = (
  title: string,
  content: string,
  promptBox?: string,
): AiTrailTextLessonStep => ({
  type: "text",
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
): AiTrailQuizLessonStep => ({
  type: "quiz",
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
): AiTrailFillBlanksLessonStep => ({
  type: "fill_blanks",
  title,
  instruction,
  sentence,
  answers,
  options,
  explanation,
});

export const CHATGPT_MODULE_7_STEPS_PT = [
  textStep(
    "Análise de Documentos e Contratos",
    "Bem-vindo de volta! Nesta lição, você vai descobrir como o ChatGPT pode se tornar um aliado poderoso na leitura, interpretação e análise de documentos complexos — contratos, relatórios, propostas comerciais e muito mais. Tudo isso economizando horas do seu tempo sem substituir um profissional especializado."
  ),
  textStep(
    "Por que Usar IA?",
    "Ler documentos longos e densos é uma das tarefas mais demoradas do dia a dia profissional. O ChatGPT consegue resumir, identificar pontos críticos, comparar cláusulas e traduzir o 'juridiquês' para uma linguagem acessível em poucos segundos."
  ),
  quizStep(
    "A Vantagem da IA na Leitura",
    "Por que usar o ChatGPT para analisar documentos é vantajoso?",
    [
      "Substitui completamente a necessidade de um advogado ou especialista",
      "Garante que o documento está juridicamente correto",
      "Economiza tempo ao resumir e destacar os pontos mais importantes",
      "Reescreve o documento automaticamente sem precisar de instrução"
    ],
    2,
    "A IA otimiza a triagem inicial e facilita o seu entendimento profundo, economizando horas cruciais."
  ),
  textStep(
    "Resumindo Documentos Longos",
    "O primeiro uso mais comum é o resumo. Em vez de ler 40 páginas de um contrato sem destino, você pode pedir ao ChatGPT para extrair o essencial antecipadamente."
  ),
  fillStep(
    "Crie seu Prompt de Resumo!",
    "Preencha as lacunas montando a instrução perfeita para resumir um arquivo maçante.",
    '"Leia o documento abaixo e faça um resumo ___, destacando: o ___ principal do documento, as ___ mais importantes e os pontos que merecem ___ especial. Use linguagem clara."',
    ["estruturado em tópicos", "objetivo", "obrigações das partes", "atenção"],
    ["estruturado em tópicos", "objetivo", "obrigações das partes", "atenção", "extenso", "valor", "revisão manual"],
    "Direcionar a IA a separar as obrigações e metas organizadamente economiza horas de dedução mental."
  ),
  quizStep(
    "Validação do Resumo",
    "Após colar um contrato no ChatGPT e receber um belo resumo, o que você deve fazer a seguir?",
    [
      "Assinar o contrato imediatamente com base no resumo",
      "Ignorar o resumo e ler o documento do zero mesmo assim",
      "Compartilhar o resumo como versão oficial do contrato",
      "Usar o resumo como guia e verificar os pontos críticos diretamente no documento original"
    ],
    3,
    "O resumo não substitui a verdade legal. Ele guia seus olhos para as cláusulas certas no documento original validado."
  ),
  textStep(
    "Identificando Cláusulas de Risco",
    "Uma das funções mais poderosas da IA em documentos é rastrear trechos perigosos e que podem ser desvantajosos — como multas desproporcionais, penalidades ocultas, restrições e pegadinhas documentais."
  ),
  fillStep(
    "Prompt de Análise de Risco!",
    "Use os termos corretos para forçar o robô a encontrar ameaças ocultas.",
    '"Analise o contrato abaixo e identifique todas as ___ que podem representar ___ para a parte contratante. Explique de cada uma: o que ela ___, qual o possível ___ e o que seria mais ___ para o contratante."',
    ["cláusulas", "risco ou desvantagem", "determina", "impacto", "equilibrado"],
    ["cláusulas", "risco ou desvantagem", "determina", "impacto", "equilibrado", "letras", "vantagens", "foca", "lucro", "justo"],
    "Determinar como extrair impacto e risco é a base vital para auditar acordos usando IA."
  ),
  quizStep(
    "A Busca por Riscos",
    "Qual prompt é mais eficaz para auditar um contrato procurando armadilhas?",
    [
      '"O que você acha desse contrato?"',
      '"Esse contrato é bom ou ruim?"',
      '"Analise esse contrato e liste todas as cláusulas que podem ser desvantajosas para o contratante, explicando o risco de cada uma em linguagem simples"',
      '"Leia o contrato e me diga se posso assinar"'
    ],
    2,
    "Instruções abertas trazem respostas abertas. Pedir clareza nos riscos com linguagem simples garante controle e alerta legal."
  ),
  textStep(
    "Comparando Documentos",
    "Quando você recebe duas versões de um mesmo contrato final — ou quer comparar a Proposta A contra Proposta B comercial — o ChatGPT pode assumir o trunfo de cotejar lado a lado."
  ),
  quizStep(
    "A Tabela de Decisão",
    "Você recebeu duas propostas comerciais de fornecedores diferentes. Qual prompt usaria para compará-las da melhor forma?",
    [
      '"Qual das duas propostas é melhor?"',
      '"Compare as propostas"',
      '"Compare as duas propostas abaixo com base nos critérios: preço, prazo de entrega, pagamento, garantias e rescisão. Apresente em uma tabela e aponte qual oferece mais vantagens para uma empresa pequena."',
      '"Me diga qual proposta aceitar"'
    ],
    2,
    "Isso estabelece dimensões fixas de análise (preço, prazo) e exige um formato tabular, gerando clareza imbatível para sua leitura."
  ),
  textStep(
    "Traduzindo Linguagem Jurídica",
    "Contratos formais são labirintos de termos técnicos ('juridiquês'). O ChatGPT consegue traduzir e desembaraçar esse conteúdo duro para um idioma simples, direto e coloquial."
  ),
  fillStep(
    "Prompt de Tradução Jurídica!",
    "Ensine o sistema a abandonar a complexidade e abraçar o vocabulário das ruas de forma séria.",
    '"Reescreva os trechos abaixo do contrato em ___, como se estivesse explicando para alguém que ___. Mantenha o ___ original de cada cláusula, mas use palavras do ___."',
    ["linguagem simples e acessível", "não tem conhecimento", "significado", "dia a dia"],
    ["linguagem simples e acessível", "não tem conhecimento", "significado", "dia a dia", "informal demais", "é analfabeto", "tamanho", "dicionário"],
    "Você preserva a lei do documento original mas arranca as cortinas verbais complexas da frente. Uma leitura diária clara."
  ),
  quizStep(
    "Utilitário de Tradução",
    "Por que traduzir a linguagem jurídica complexa de um contrato com o ChatGPT é valioso?",
    [
      "Porque o ChatGPT cria uma versão juridicamente válida de qualquer termo inventado.",
      "Para substituir severamente a leitura da versão formal.",
      "Para entender claramente o que cada cláusula significa na prática antes de consultar um especialista.",
      "Porque contratos em linguagem simples ganham mais poder jurídico perante juízes."
    ],
    2,
    "Você destrava o entendimento das bases de negociação da oferta do contrato sem precisar da intervenção custosa antecipada de advogados."
  ),
  textStep(
    "Extraindo Informações Específicas",
    "Às vezes, você não quer e não precisa ler e auditar o documento inteiro — você só precisa caçar uma informação oculta (Prazo de entrega, encerramento de multa, data limite)."
  ),
  fillStep(
    "Crie seu Prompt de Extração!",
    "Monte um leitor pontual implacável que busca somente os dados vitais.",
    '"Leia o contrato estruturado e extraia apenas as seguintes informações: ___ do contrato, ___ de cada lado, valor de ___ por descumprimento e ___ de vigência. Liste organizado."',
    ["prazo total", "obrigações", "multa", "data"],
    ["prazo total", "obrigações", "multa", "data", "orçamento vital", "desvantagens", "juros simples", "dia e hora"],
    "Determinar escopo focal e rejeitar interpretação periférica torna o modelo um scanner digital veloz."
  ),
  textStep(
    "Revisão Fina",
    "Antes de enviar uma proposta oficial sua ao mercado ou formalizar um e-mail gigantesco, o sistema cruza suas informações avaliando lacunas, ausências ou duplos sentidos perigosos que você deixou passar."
  ),
  quizStep(
    "Inspeção Pré-Envio",
    "Qual comando prova ser o supremo modelo revisor para blindar o envio de propostas ao seu público?",
    [
      '"Revise minha proposta"',
      '"Esse texto está bacana?"',
      '"Corrija os erros de português e espaçamentos da proposta"',
      '"Revise a proposta abaixo e identifique: erros de clareza, falhas geradoras de dúvida, tópicos em aberto e trechos dispostos que possam prejudicar gravemente as finanças da nossa firma."'
    ],
    3,
    "Ativar modo crítico defensivo no modelo (buscando prejudicar gravamente finanças) obriga a IA a avaliar o texto sob uma lupa pessimista extrema."
  ),
  textStep(
    "Regra de Ouro: Os Limites da IA",
    "Não caia na ilusão de perfeição absoluta legal. O ChatGPT é o mais avançado auditor superficial e analista rápido da Terra, mas sofre limites cruciais."
  ),
  quizStep(
    "Onde o Robô Falha?",
    "Na auditoria pura, o que o ChatGPT NÃO É ESTRITAMENTE CAPAZ de fazer legalmente com a papelada da sua empresa?",
    [
      "Resumir de modo inteligente termos confusos de 20 páginas longas.",
      "Listar buracos vermelhos (claúsulas crueis de risco).",
      "Traduzir dialeto judiciário esnobe em linguagem diária e fluída.",
      "Oferecer parecer jurídico imaculado com total validade legal, assumindo assim a responsabilidade em caso de processos e prejuízos baseados no conteúdo operado."
    ],
    3,
    "O ChatGPT é excelente como co-piloto explorador. Todavia, a batida de martelo judicial definitiva pertence incontestavelmente a você e ao banco legal dos seus advogados."
  ),
  textStep(
    "Módulo Concluído!",
    "As páginas empoeiradas e as leituras estressantes de horas acabam aqui. Com engenharia sutil de comandos de auditoria cruzada, extrações e traduções diretas, você lê arquivos colossais num pestanejar sem perder o controle corporativo central.\n\nLição concluída ✓"
  )
];

export const CHATGPT_MODULE_7_STEPS_EN = [
  textStep(
    "Document and Contract Analysis",
    "Welcome back! In this module, you will discover how ChatGPT serves as an insanely powerful ally regarding reading, decoding, and auditing heavy formal documents — contracts, dense reports, business proposals, and more without replacing strict legal experts but saving you hundreds of hours."
  ),
  textStep(
    "Why Use AI on Heavy Text?",
    "Skimming massively dense jargon-filled legal lines burns mental sanity and blocks workflow. ChatGPT rapidly summarizes, spotlights red flags, parallels clauses side-by-side, and entirely dismantles 'legalese' into plain accessible vocabulary in pure seconds."
  ),
  quizStep(
    "The True Value of AI Reading",
    "Why precisely does leveraging ChatGPT upon these documents present an immeasurable edge?",
    [
      "It totally fires and supplants specialized legal attorneys.",
      "It mathematically guarantees your contract carries absolutely zero legal flaws.",
      "It saves monumental effort by intelligently extracting and summarily spotlighting pivotal points instantly.",
      "It auto-reworks any document without prior user boundaries."
    ],
    2,
    "AI operates as a brilliant initial triaging filter making your deep comprehension far faster and shielding your effort."
  ),
  textStep(
    "Summarizing Massive Files",
    "The prime move is hyper-summarization. Instead of aimlessly navigating 40 pages of complex raw stipulations, force ChatGPT to yank the absolute essence beforehand."
  ),
  fillStep(
    "Craft Your Summarizing Baseline!",
    "Fill in the blanks to design an impenetrable summarization scanner.",
    '"Read the document below and output a summary ___, highlighting firmly: the main ___ of the material, the core ___ assigned, and points demanding major ___. Use extremely neat plain language."',
    ["structured in bullet points", "objective", "obligations of the parties", "attention"],
    ["structured in bullet points", "objective", "obligations of the parties", "attention", "overly long", "prices", "manual overview"],
    "Forcing an AI to split responsibilities linearly via bullet points prevents chaotic chunk reading."
  ),
  quizStep(
    "Post-Summary Action",
    "After handing a massive contract over to ChatGPT and securing a glossy summary, what constitutes the correct next real-world move?",
    [
      "Instantly execute and sign the documents relying completely on the short bot text.",
      "Ignore the summary outputs and proceed to violently read the gigantic original layout anyway.",
      "Publish the summary text to act as the legal finalized paperwork instead.",
      "Use the summary matrix strictly as a guiding map and forcefully inspect the mentioned critical segments inside the authentic original file."
    ],
    3,
    "The summary is a map to navigate the heavy woods. It highlights the focal points so you target them inside the verified dense source."
  ),
  textStep(
    "Hunting Risk Clauses",
    "One of the crowning achievements of language models in documentation is uncovering buried threats — disproportionate fines, hidden penalties, and toxic restrictive fine print."
  ),
  fillStep(
    "The Risk Analyst Prompt!",
    "Input the right terms compelling the bot to expose buried venomous conditions.",
    '"Audit the contract provided beneath to unearth all formal ___ causing palpable ___ for the contracting party. Break down each finding: stating what the term explicitly ___, the actual tangible ___, and suggest a vastly more ___ counter-offer phrase."',
    ["clauses", "risk or disadvantage", "determines", "impact", "balanced"],
    ["clauses", "risk or disadvantage", "determines", "impact", "balanced", "font types", "profit numbers", "thinks", "revenue stream", "fair"],
    "Ordering the AI to extrapolate the impact and measure equilibrium provides you absolute leverage prior to negotiations."
  ),
  quizStep(
    "The Hunt for Traps",
    "Which exact text architecture excels aggressively to trap and locate document flaws?",
    [
      '"What are your thoughts on this entire setup?"',
      '"Is this document nice to sign?"',
      '"Critique this contract by listing out any clause showcasing structural disadvantages for the executing side, laying plain English impact warnings for each listed item."',
      '"Read this text immediately and grant me permission to sign it."'
    ],
    2,
    "Wide instructions prompt useless wide answers. Confining the engine to exclusively pinpoint and explain detriments grants extreme legal vigilance."
  ),
  textStep(
    "Comparing Master Documents",
    "Whenever you catch two concurrent end-versions — like contrasting Vendor Option A against Vendor Option B — AI holds the profound capacity to parallel process and tabularize differences."
  ),
  quizStep(
    "The Decision Matrix",
    "Handling two varying supplier business proposals, how should you extract the maximum comparison layout from ChatGPT?",
    [
      '"Which one shines best?"',
      '"Tell me differences between them"',
      '"Dissect and parallel the two proposals underneath analyzing rigidly against: bulk price scale, shipment windows, monetary terms, warranty length and breach. Chart findings on a unified table directly citing which benefits a smaller operational enterprise."',
      '"Confirm to me which sheet I sign today"'
    ],
    2,
    "Pre-assigning evaluation columns (price, windows, terms) while forcing the display into a visual table generates unparalleled speed."
  ),
  textStep(
    "Translating Deep Legalese",
    "Technical documents dwell inside a terrifying labyrinth of highly formal terminology ('legalese'). The bot can fracture that hard shell converting sentences straight into vernacular slang flawlessly."
  ),
  fillStep(
    "Legal Decoding Prompt!",
    "Instruct the core to dump the snobbery and explain things using serious street-level wording.",
    '"Re-draft the technical snippets below into sheer ___, acting purely as if coaching an individual completely ___. Lock down the absolute formal ___ behind each point but forcibly employ strictly ___ words."',
    ["simple and accessible language", "lacking legal background", "meaning", "everyday"],
    ["simple and accessible language", "lacking legal background", "meaning", "everyday", "excessively casual", "illiterate", "length", "legal"],
    "You completely shield the true core meaning but entirely destroy the thick jargon barriers standing in front."
  ),
  quizStep(
    "The Translator's Benefit",
    "What massive advantage is gained by deploying ChatGPT purely as a legal-to-common language bridge layer?",
    [
      "It completely and totally prints out finalized valid jurisprudence documents avoiding state fees.",
      "It allows you to skip entirely the authentic text.",
      "It shatters the opacity letting you comprehensively swallow exactly what is demanded before blowing cash paying a supreme expert.",
      "It magically boosts the raw legitimacy of your files before real courtmen."
    ],
    2,
    "Puncturing through confusing clauses permits transparent business maneuvers beforehand saving heavy initial lawyer consultation hours."
  ),
  textStep(
    "Extracting Surgical Data",
    "There are days when scanning massive sheets isn’t your duty — you solely desire to hunt down extremely singular specs deep in the jungle (delivery dates, end fines, expiration stamps)."
  ),
  fillStep(
    "The Surgical Extractor Blank!",
    "Forge a brutal extraction sweep fetching only what you deeply care about.",
    '"Process the structured agreement underneath extracting heavily nothing more than these data sets: outright ___ of the lifecycle, literal ___ upon each house, monetary metric of ___ for delays, and raw ___ marks. Organize via sheer vertical list."',
    ["total timeframe", "obligations", "penalty", "date"],
    ["total timeframe", "obligations", "penalty", "date", "cash budget", "shortcomings", "raw interest", "hour"],
    "Locking the focal zone and brutally rejecting side noises elevates the bot into a rapid-fire data-scraping laser beam."
  ),
  textStep(
    "Pre-Flight Polish",
    "Submitting an immense strategic outline or high-stakes corporate email demands oversight. Sending the draft into the AI engine unveils gaps, contradictions, or disastrous passive-aggressiveness hidden in your tone."
  ),
  quizStep(
    "Final Proofing Shield",
    "Which definitive command activates the engine into maximum defensive editing ahead of a massive client send-off?",
    [
      '"Review the work"',
      '"Does this look nice enough?"',
      '"Proofread for standard English slips"',
      '"Scrutinize the impending business proposal beneath actively tracking: clarity glitches, client-facing ambiguity traps, omitted elements leaving us exposed, and entirely highlight any sentence exposing severe financial weakness for our agency."'
    ],
    3,
    "Switching the tool onto an extremely harsh pessimistic auditor role guarantees it scans your document hunting only for severe weak links."
  ),
  textStep(
    "The Golden Rule: AI Boundaries",
    "Escape the illusion of legal total safety. Though ChatGPT reigns supreme as an upfront hyper-evaluator on textual materials, it inherently owns immense roadblocks."
  ),
  quizStep(
    "Where the Machine Hits a Wall?",
    "When strictly judging pure institutional vetting, what action is absolutely BEYOND ChatGPT's operational capabilities?",
    [
      "Condensing aggressively 20 long-winded complex pages.",
      "Locating hidden terrifying red-flag corporate clauses.",
      "Converting insanely deep jargon into casual fluid dialogue.",
      "Tendering flawless, irrefutable and legally-binding jurisprudence counsel thus acting directly responsible in the event of lawsuits yielding hard damages."
    ],
    3,
    "The entity behaves as an elite scouting co-pilot. Supreme unbendable legal hammer falls always upon the hands of a licensed jurist and yourself exclusively."
  ),
  textStep(
    "Module Finalized!",
    "Endless eye-straining midnight paperwork checks officially end here. With clinical extraction requests, targeted translation, and risk-management prompting, heavy documents no longer own your time. Onwards to absolute productivity.\n\nLesson complete ✓"
  )
];

export const CHATGPT_MODULE_7_STEPS_ES = [
  textStep(
    "Auditoría Documental y de Contratos",
    "¡De vuelta a la acción! Prepárate para descubrir cómo ChatGPT se erige como el acorazado número uno en escrutinio, análisis desglosado y lectura relámpago de actas pesadas: memorandos severos, contratos masivos, propuestas arriesgadas. Todo, podando incontables horas laborales sin suprimir al abogado."
  ),
  textStep(
    "¿Por qué inyectar la IA en los Archivos?",
    "Consumir sábanas burocráticas laberínticas ahoga el reloj y la resistencia mental. Esta máquina tiene la pericia veloz de extraer esencias, encender las alarmas ocultas, enfrentar actas con dualidad cruzada y decapitar instantáneamente el argot formal para presentarlo plano."
  ),
  quizStep(
    "El Plus Inestimable de Auditar con IA",
    "¿Cuál es verdaderamente la joya de someter sus papeles complejos bajo la lupa artificial?",
    [
      "Aniquila la urgencia total de costear abogados formales.",
      "Emite un sello que garantiza total validez pericial ante organismos legales.",
      "Destruye pavorosos intervalos de lectura muerta sacando lo primordial e indispensable de forma fugaz.",
      "Modifica autónomamente tus acuerdos sin reglas estipuladas previas salvándote horas."
    ],
    2,
    "La inteligencia sirve como su filtro de choque primerizo, elevando agresivamente su nivel comprensivo antes de gastar recursos supremos."
  ),
  textStep(
    "Destilando Volúmenes Inmensos",
    "La acción reina es el súper-resumen. Antes de hundirse en 40 folios fríos de un tratado denso, fuérzalo a expulsar solo la carnaza esencial por adelantado."
  ),
  fillStep(
    "¡Tu Escáner Base!",
    "Configura sólidamente tu dictamen de extracción llenando los huecos precisos.",
    '"Tritura la acta documental anclada bajo un formato ___ arrojando a la luz: el ___ macro, las masivas ___ fijadas entre los firmantes, y las fisuras de ___ latente. Emplea léxico absolutamente transparente e inteligible."',
    ["estructurado en tópicos", "objetivo", "obligaciones de las partes", "atención"],
    ["estructurado en tópicos", "objetivo", "obligaciones de las partes", "atención", "en redacción larga", "dinero", "revisión lenta"],
    "Forzar el formato viñeta seccionada destripa eficientemente el caos textual para asimilar responsabilidades enteras."
  ),
  quizStep(
    "La Rutina Pos-Resumen",
    "Una vez vertidas docenas de hojas letales en el bot y arrebatado tu resumen diamante, ¿Cuál es la jugada operativa verídica recomendada?",
    [
      "Sellar legalmente el acuerdo dejándose ir únicamente sobre lo dicho por el robot.",
      "Tirar el resumen y regresar arrepentido a leer la masa textual integra original de todas formas.",
      "Compartir y empadronar el resumen sintético creyéndolo el acta genuinamente oficial ante entablamientos.",
      "Sostener la sábana de resumen como puro faro visual y comprobar mecánicamente dentro del contrato matriz las cláusulas ardientes."
    ],
    3,
    "Ese mapa sintetizado orienta directamente el rastreo puntual de lo vital que luego el abogado terminará por revisar validado frente a la matriz original."
  ),
  textStep(
    "Cazando Fosas y Cláusulas Minadas",
    "Uno de los talentos letales en procesadores sintácticos yace en pescar elementos amenazantes ahogados: aranceles desfasados, grilletes comerciales ocultos, multas severas imperceptibles al ojo ciego."
  ),
  fillStep(
    "¡Prompt Radárico Contra el Riesgo!",
    "Detona los conceptos que obligan al bot a revelar las espinas y trampas oscuras.",
    '"Inspecciona a fondo el tratado contiguo identificando estrictamente aquellas ___ tendiéndole claras trampas de ___ hacia quien negocia. Rompe y expón: qué ___ la norma textualmente, su ___ de daños, y bosqueja un planteamiento notoriamente más ___ a solicitar."',
    ["cláusulas", "riesgo o desventaja", "determina", "impacto", "equilibrado"],
    ["cláusulas", "riesgo o desventaja", "determina", "impacto", "equilibrado", "letras raras", "beneficio dudoso", "imagina", "pérdida de sangre", "justo moralmente"],
    "Garantizar la orden de 'impactos equilibrantes' es lo que te cede todo el fuego analítico previo al careo real ante oponentes al ofertar."
  ),
  quizStep(
    "Ataque Investigativo de Riesgo",
    "Si precisas una barrida pericial rigurosa tras peligros, ¿qué secuencia aniquila el mandato genérico ineficiente?",
    [
      '"¿Qué vibra te transmite esto?"',
      '"¿Este folio conviene a los míos?"',
      '"Revoluciona este contrato arrojando cada minuciosa cláusula en la sombra que afecte drásticamente a nuestra parte, diseccionando la naturaleza del daño en lenguaje nítido y terrenal."',
      '"Procesa el escrito y da luz verde final a la rúbrica."'
    ],
    2,
    "No pida 'pareceres'; reclame disecciones con impacto detallado eximiendo dialectos oscuros."
  ),
  textStep(
    "Careo y Emparejamiento de Textos",
    "En caso de colisionar con propuestas operativas dobles (Proveedor Y versus Proveedor Z), la red neuronal toma el timón enfrentándolas limpiamente sobre columnas."
  ),
  quizStep(
    "Taba de Confrontación Total",
    "Al encarar un par letal de requerimientos de negocios compitiendo, ¿Cómo le sacas cruda tabla comparativa al sistema?",
    [
      '"A ver, ¿Quién gana por más margen?"',
      '"Crúzamelos un ratito"',
      '"Mide y cruza drásticamente los presentes archivos rigiéndote en: flujo monetario total, intervalos pre-despachos, lapsos morosos, resguardos legales. Edifica los datos en retícula estricta e infórmame estadísticamente el victorioso operativo final para micro y pequeñas ligas."',
      '"Dime cuál debo ir imprimiendo."'
    ],
    2,
    "Al marcar tú mismo los pilares paramétricos (flujo monetario, despachos), dictas maestría visual forzosa matando vaguedades teóricas molestas."
  ),
  textStep(
    "Destrozando Dialectos Jurídicos",
    "A menudo los convenios serios son bestias resguardadas bajo retórica de abogados insoportable. El bot rompe fácilmente el encriptamiento traduciendo esos bloques a un tono casero crudo y asimilable."
  ),
  fillStep(
    "El Mandato Sencillo Criptográfico",
    "Dobla la ordenanza para que asimile instruir y demoler las cortinas pomposas verbales.",
    '"Traduce obligadamente los extractos técnicos aduaneros anexos sumergiéndolos al absoluto ___, figurando la instrucción dictada hacia un individuo ___. Salvaguarda impoluto el ___ matriz legal sin que nada falle, pero ciñe la vocalia con puras charadas elementales de ___."',
    ["lenguaje simple y accesible", "sin conocimiento de derecho", "significado", "día a día"],
    ["lenguaje simple y accesible", "sin conocimiento de derecho", "significado", "día a día", "informalismo torpe", "iletrado nato", "volumen del renglón", "perito"],
    "Destruirás ese cerco abrumador rimbombante burocrático, entendiendo así si están robándote antes de siquiera ir e intervenir a asesores legales costosos a destiempo."
  ),
  quizStep(
    "Rentabilidad de Desencriptado",
    "¿En dónde figura el brutal y salvaje valor principal en hacer a ChatGPT traducir el pesado vocabulario jurista perenne?",
    [
      "El bot genera una copia de alta validez oficialista evadiendo honorarios al gestor.",
      "Para jamás, en todo tu andar corporativo, voltear a leer un solo tratado extenso en formato matriz.",
      "Para iluminar ferozmente qué terreno transitarás y las ataduras impuestas, prefigurando blindaje veloz y crudo libre de minutas largas antes de ir ante grandes burós.",
      "Puesto que imprimir actas en formato simplista gana favoritismos en cortes modernas locales."
    ],
    2,
    "Acapararás un plano mental pre-negociante colosal; descifras tú solo y entiendes las pautas con lucidez brutal antes de entablar peleas verbales frente al oponente perito legal."
  ),
  textStep(
    "Extracción Quirúrgica Minuciosa",
    "Puede existir el alboroto donde leer siquiera el grueso en pos de auditar sea un disparate; sólo precisas destripar ese dato enterrado (mes vencimiento, taza de resguardo, firma máxima)."
  ),
  fillStep(
    "¡Tu Arponeo Extractivo Central!",
    "Configura el rayo concentrado evadiendo en su letanía toda charla tangencial inservible colindante.",
    '"Lee a barrido limpio las siguientes estipulaciones sustrayendo salvajemente los puros núcleos exigidos: el ___ del periodo final, las masivas ___ frontales bilaterales, impacto dinerario expreso de ___ tras morosidad, y los ___ en calendario precisos de inicio. Exponlos pulcramente asordinados."',
    ["plazo total", "obligaciones", "multa", "fechas"],
    ["plazo total", "obligaciones", "multa", "fechas", "precio íntegro base", "cargas perdidas", "tarifas altas en general", "días contados y cerrados"],
    "Forjar este muro focal estalla al modelo convirtiéndolo de una enciclopedia lenta a un láser cazador de índices."
  ),
  textStep(
    "La Barrera Limpiadora Pre-Lanzamiento",
    "Antevenirse en la partida y mandarle tus propuestas de gran peso y tus extensos correos macro permite radiografiar hoyos, amenazas subtextuales que dejas libres hacia la competencia contraria accidentalmente."
  ),
  quizStep(
    "Última Capa de Blindaje Pura",
    "¿Qué tiro magistral configura a este agente en el último filtro hiperpericial antes de lanzar tus propuestas jugosas fuera de casa base?",
    [
      '"Leéme y arregla este memo"',
      '"¿Pinta bien el formato propuesto general?"',
      '"Remienda únicamente fallos nativos gramáticos del archivo central subido hoy."',
      '"Vigila con severidad pesimista el archivo siguiente extrayendo fallos garrafales de claridad, zonas muertas en entendimiento donde el cliente nos dudaría de tajo; fisura o carencia estructural y los fragmentos que, interpretados bajo un prisma frío adverso, socavarían severamente nuestras reservas dinerarias empresariales."'
    ],
    3,
    "El rol paranoico obliga a la IA al peor horizonte; esgrimirá lo negativo del documento forzando un acorazamiento tuyo."
  ),
  textStep(
    "La Doctrina Intocable: Los Parámetros Límite Humanos",
    "Remueve las vendas idílicas que presumen protección jurídica final del bot. ChatGPT opera la evaluación frontal rápida estelar global más potente, empero los muros que topa perennemente no se vencen jamás."
  ),
  quizStep(
    "¿El Escollo Irrompible del Entrenado?",
    "En una balanza neta y puritana, ¿qué límite NO CUMPLE tajantemente el modelo informático frente a tu gran empresa legalmente regida mundialmente con miles a su cargo?",
    [
      "Destilar sumarios crudos con alta carga conceptual provenientes de extensísimos legajos burocráticos engorrosos perjudiciales al ojo natural cansado humano de golpe.",
      "Destripar pasivos hostiles oscurecidos y penalizaciones mortales entre el laberinto documentar de la propuesta que podrías firmar desapercibido mañana pronto al despunte alba.",
      "Voltear dialectos pesados que no se entienden hacia jerga y formatos simplificados digeribles del diario casual que domina todo humano en oficina regular para el entendimiento rápido masivo de tus allegados sin titubear formal.",
      "Prescribir rotunda e intocablemente asesoramiento blindándolo frente litigantes e imputando toda responsabilidad y gravámenes judiciales penales pesados de su maquinaria ante dictámines desatinados de operación formal que incurrieren tu ruina material pura."
    ],
    3,
    "Como radar de primera incursión y copiloto en tinieblas analíticas, es irremplazable el ente sintético para potenciar al perito; sin embargo, no porta en estrado ninguna licencia válida para amortizar o salvar sus bienes."
  ),
  textStep(
    "¡Cerrojazo Documentaria Consumado!",
    "Terminan las lúgubres veladas descifrando retórica arcaica de contrataciones extenuantes pesadas aburridas que no te pertenecían orgánicamente realizar sin agotarte. Al disparar auditorías precisas dirigidas de ingeniería sobre los pliegos asimilando resúmenes crudos puntuales para que fluyan veloces y limpios a destreza sobre su cerebro electrónico central en vez del humano... Te consagras.\n\nPalier Dominado ✓"
  )
];

export const CHATGPT_MODULE_7_STEPS_FR = [
  textStep(
    "Audit Éclair Documentaire",
    "Quel retour ! Asseyez-vous et absorbez la leçon du jour : comment utiliser ChatGPT comme arme nucléaire de déchiffrage frontal des pavés écrasants : baux commerciaux massifs, reportings sans fins ou chartes juridiques dantesques. Un moyen radical de trancher des dizaines de journées aveugles tout en épaulant sereinement votre juriste certifié."
  ),
  textStep(
    "Pourquoi Frapper les Documents par l'IA ?",
    "Se faire dévorer vif par des terminologies administratives pesantes asphyxie l'humeur managériale active des cadres dirigeants du quotidien d'affaires. L'engin numérique concasse le jargon insulaire pour expulser l'essence vitale sur l'heure, localise impitoyablement vos lignes rouges tarifaires cachées, ou superpose froidement deux propositions adverses en pleine guerre des appels en dix secondes pures et parfaites sans le moindre souffle d'échappement gaspillé faussement ailleurs durant sa prouesse."
  ),
  quizStep(
    "L'Ascension Majeure par l'Audit Virtuel",
    "Quel argument irréfutable justifie férocement le passage des textes massifs via l'Intelligence Artificielle de commande analytique ?",
    [
      "Il raye définitivement et physiquement la pertinence monétaire cruelle du consultant juridique accrédité de la surface de la terre moderne.",
      "Lui conférer le texte bloque légalement la fraude contractuelle vis-à-vis d'une cour de justice d'État et des magistrats professionnels assermentés mondiaux.",
      "L'engin brûle instantanément l'errance verbale en surlignant rigoureusement au marqueur virtuel vos nœuds critiques qui menacent réellement de faire mal, sauvant la vélocité crépitante pure de votre lecture décisive exécutive.",
      "La matrice efface aléatoirement votre clause et réagence l'accord sans directives selon l'alignement préconçu idéal moral théorique."
    ],
    2,
    "L'informatique joue un bouclier triage impitoyable épongeant le gras ennuyeux pour offrir à vos yeux aguerris les seuls crocs que vous auriez pris dix nuits à traquer dans la confusion sombre textuelle du dossier dense fourni à ses serveurs numériques d'analyse algorithmique sans élan émotionnel perturbateur à la lecture initiale."
  ),
  textStep(
    "Pulvérisation Structurée de Sommes Textuelles",
    "La parade primaire s'illustre via la pulvérisation par sommaire condensé absolu. Plus question de nager machinalement au travers d'archives insensées composées de 50 pages opaques ; commandez sans vergogne le système de pomper instantanément l'âme vitale avant la mise en lecture humaine active par vos yeux dirigeants fatigués."
  ),
  fillStep(
    "L'Empreinte de Synthèse Parfaite !",
    "Calez farouchement vos limites sémantiques au moyen de ces vecteurs creux.",
    '"Concasse formellement les rouages documentaires collés en bas pour délivrer un condensé ___, braquant brutalement le faisceau sur : le sublime ___ absolu de l\'entente bilatérale, les farouches et fermes ___ de chacune des figures engagées, ainsi que les gouffres méritant une profonde ___ analytique rigoureuse pour esquiver le naufrage. Formule un verbiage net et limpide expurgé du flou. [Texte lourd]"',
    ["structuré en topiques", "objectif", "obligations des parties", "attention"],
    ["structuré en topiques", "objectif", "obligations des parties", "attention", "rédigé à la va-vite", "profit chiffré net global imposé strict exclusif", "surveillance pénale aveugle du procureur"],
    "Imposer un cadastre thématique découpé structurellement bride totalement le cerveau de la machine vers une chirurgie précise des intentions réelles des acteurs documentés."
  ),
  quizStep(
    "Post-Extraction Opérationnelle Réelle",
    "Ayant soutiré une synthèse impeccable et froudroyante du filet contractuel lourd, que prescrit la haute doctrine exécutive humaine pour la bascule concrète de l'action de signature ?",
    [
      "Enchaîner à l'aveugle par signature scellée en se basant sur la seule vérité proclamée des paragraphes robotiques de son écran plasma sans recul formel.",
      "Chiffonner sa synthèse virtuelle instantanée afin de retourner plonger à l'ancienne dans le livre originel ligne après ligne durant plusieurs nuits perdues vaines.",
      "Apposer le certificat officiel par signature du condensé virtuel en place de l'original originel complet d'usage en se fiant au résumé pour le remplacer devant la loi d'instance.",
      "Agripper la synthèse obtenue telle une lanterne d'alerte, afin de pointer minutieusement ses regards éclairés sur les clauses exactes signalées comme cratères inflammables d'importance dans les profondeurs de l'opus véridique authentique de base initial en vérifiant leur nature."
    ],
    3,
    "Le rendu synthétique artificiel se fait cartographie du danger pur, vous ciblant directement sur le terrain légal pour votre examen authentique final et décision souveraine sans noyer vos sens."
  ),
  textStep(
    "La Traque des Fissures Fatales",
    "Le talent démesuré des cerveaux sémantiques résonne brillamment lorsqu'il traque l'ennemi invisible dissimulé dans le marasme rédactionnel profond : prélèvements monstrueux différés, chaînes de sanctions passives dures, ou obligations fantomatiques cruelles invisibles à l'observateur profane sans patience ni armement analytique virtuel de dépistage massif régulier."
  ),
  fillStep(
    "Le Radar Foudroyant Anti-Failles !",
    "Scellez les notions forcées brisant la garde secrète pernicieuse du contrat dense.",
    '"Diagnostique intensément ce contrat d\'engagement afin d\'exhumer ostensiblement toute la totalité des ___ sournoises matérialisant un quelconque haut ___ financier envers le mandataire subissant l\'épreuve. Disséquez et ventilez crûment chaque scorie détectée stipulant : ce qu\'elle ___ concrètement en punition formelle, l\'effroyable brutalité de l\'___ potentiel en phase de litige, et sculptez par ingénierie textuelle une contre-mesure manifestement plus ___ d\'égal à égal. [Doc]"',
    ["clauses", "risque ou désavantage", "détermine", "impact", "équilibré"],
    ["clauses", "risque ou désavantage", "détermine", "impact", "équilibré", "sentences finales arbitraires folles mortelles pures", "marge perçue d'or gagné par semaine", "imagine d'un coup"],
    "Ordonner la construction systématique du contre-feu rééquilibrant de la formulation piégée dote l'attaquant que vous êtes de billes absolues en joute juridique préliminaire de correction verbale face à l'avocat d'en face."
  ),
  quizStep(
    "Attaque Périmétrale Évasive et Fine",
    "Si votre sang froid commande la détection chirurgicale des puits sans fond vicieux de l'entente pour un client en urgence absolue au nez du marché en place, quelle matrice écrase les concurrents sur l'écran ?",
    [
      '"Quelle ambiance dégage vraiment ce texte formel là ?"',
      '"M\'es-t-il profitable au sens large ou catastrophique un peu ?"',
      '"Audite froidement cette charte globale dans l\'optique exclusive de cracher méthodiquement chaque condition fâcheuse pesant sur notre épaule, en transmutant chaque danger potentiel via une explication simple en langage de tous les jours éloignée des arcanes de la loi obscure."'
    ],
    2,
    "Fermer les contours en imposant la liste formelle des dangers via vulgarisation limpide accule la machine à se transformer en garde du corps brutal au lieu d'intellectuel rêveur passif et niaisement optimiste globalement hors d'usage pratique d'entreprise de choc violent du quotidien du commerce d'affaire courant rapide et sûr par principe d'usage du dirigeant avisé en veille."
  ),
  textStep(
    "Carambolage Comparatif Exécutif Final Frontal",
    "Au croisement complexe recevant maintes versions contradictoires (un Fournisseur X attaquant agressivement les propositions formelles de son Némésis Fournisseur Y par contrats séparés étouffants sur de nombreuses variables), l'entité virtuelle abaisse instantanément ses matrices pour confronter de vive force la dualité des colonnes de données via fusion visuelle."
  ),
  quizStep(
    "Confrontation des Piliers en Matrice Tabulaire Pure",
    "Recevant 2 énormes pavés de conditions parallèles d'usines lourdes s'affrontant pour votre marché local unique à conquérir formellement pour l'an 2029 sans rater la phase, quel lancement optimal brise le mythe ?",
    [
      '"Quel manufacturier remportera potentiellement le pactole financier ici d\'après toi franchement un peu ?"',
      '"Observe s\'il te plaît les deux pavés et mêles les doucement"',
      '"Analyse férocement et croise au millimètre les deux offres marchandes soumises selon ces axes non-négociables suivants : devis absolu, bornes de livraisons garanties express, flux de transferts de paiement fixes, pénalité ruptures claires des contrats rudes de garanties de retours fermes absolus sans flou. Tabularise formellement ces écarts monstrueux et pointe le vainqueur suprême de la charge logistique et l\'épargne favorable aux Très Petites Entreprises locales aux reins fragiles avec fermeté argumentée mathématique logique."'
    ],
    2,
    "Fixer implacablement le terrain (délais, prix de gros, ruptures) combiné à l'exigence formelle du rendu tabulaire de colonnes assassine la théorisation verbeuse floue en restituant du graphique chirurgical propulsant l'analyse managériale crue."
  ),
  textStep(
    "Détruire L'Archipel Abscons du Lexique Droit Légal et Sordide Caché Aridement Arpenté",
    "Fréquemment, le formalisme juridique élève de véritables miradors impénétrables de langue morte. Le bot fracasse cet agencement pompeux avec une brutalité de génie en transcrivant la norme via argot clair et limpide au soleil franc."
  ),
  fillStep(
    "Le Dispositif Vulgarisateur Universel Absolu !",
    "Façonnez l'injonction forçant l'engin informatique à troquer la toge sévère judiciaire pour la chemise du pédagogue franc populaire et commun simple de surface d'entendement pure.",
    '"Refonde fondamentalement l\'amas des fragments textuels d\'alliance formelle collés via un profond ___, calquant virtuellement une conversation menée devant l\'intellect de celui qui ___ profond du domaine droit absolu rigide aveugle théorique complet total formel pur complet d\'ensemble de cas en cas. Pérennise sans faiblir ce fameux ___ essentiel caché tapi fond de chaque contrecoup formel alinéa par alinéa au cordeau strict mais troque son emballage usant des pures dénominations issues impérativement du ___ de tous sans ambiguïté. [Insérer pavé]"',
    ["langage simple et accessible", "n'a aucune notion claire ni base ou diplôme ou de connaissance", "sens profond original de la phrase caché", "quotidien immédiat ordinaire et usuel simple"],
    ["langage simple et accessible", "n'a aucune notion claire ni base ou diplôme ou de connaissance", "sens profond original de la phrase caché", "quotidien immédiat ordinaire et usuel simple", "argot insupportable et vraiment vulgaire déplaisant totalement inapproprié pour ce faire par principe fondamental absolu rigide incontournable"],
    "Achever l'enfumage jargonneux des chartes par cet impératif déterre l'essence même de l'astuce légale en un claquement, avant de se ruiner en frais pour de faux avis légaux simples qu'un bot éclairci au départ avant expertise pointue finale réelle de professionnels chevronnés confirmant l'axe réel du mot découvert par sa fonction brillante d'outil préliminaire et de détective."
  ),
  quizStep(
    "L'Utilité Radicale de Décriptage du Verbiage Légal via Modèle",
    "Quel attribut d'envergure fondamentale confère l'acte impérial de décryptage des écritures de loi ténébreuses via intelligence computationnelle pour le chef de projet ?",
    [
      "Car les accords redessinés syntaxiquement de façon commune accèdent magiquement à un degré d'importance majeur d'approbation d'urgence judiciaire surpasseur sur le terrain pénal civil de par la constitution validée d'emblée globalement sans rien formaliser sur papier initial.",
      "Afin d'anesthésier définitivement l'étape redoutable de passage sur l'opus source dense, se lavant de tout examen initial pour l'éternité et la nuit aveugle totale en la matière formelle précise complexe complète ardue sans doute ou peur du reste formaliste complexe.",
      "Car le système édifie d'emblée l'alternative légiférée intouchable au document officiel et peut-être certifiée notariée d'elle-même virtuellement validant le flux numérisé pur.",
      "Afin d'illuminer l'esprit sur la véritable charge tactique imposée brutalement par la ligne incrustée préalablement à de pesantes interrogatoires budgétaires requérant les avis qualifiés officiels qui pèsent massivement sur vos fonds libres vitaux annuels financiers normaux."
    ],
    3,
    "La force titanesque réside dans l'affranchissement sémantique permettant au preneur de décision vif de trancher le mur cognitif et la cécité professionnelle sans attendre l'analyse coûteuse avant un round final éclairé complet du combat et valider stratégiquement si ça vaut un accord initial de poursuivre plus loin formaliste précis d'avocats lourds pesants ou rejeter de prime abort."
  ),
  textStep(
    "Dépouillement Punctiforme Implacable Brutal Précis Rapide Extrême Focal de Données",
    "Par l'heure sombre du couperet où nul temps ne subsiste à l'épluchage de vérification analytique longue, l'auditeur cherche le noyau vital et uniquement cela : le timbre de pénalité terminale, la limite butoir de quittance et la limite date rouge feu pur sang sans fange discursive autour bruyante floue et distrayante nocive agaçante globalisante de l'action vive courte pure ferme et dure rapide ciblée d'excellence en bref."
  ),
  fillStep(
    "L'Essorage de Données Foudroyant Concentré en Laser Pointu Froid Ciselé Pur Cadré ! Créez Votre Rayon Prompt :",
    "Façonnez l'œil de l'outil ignorant la mer sémantique pour harponner le chiffre roi du besoin vital absolu d'action de suite claire.",
    '"Scanne méticuleusement l\'engin charte ci-dessous dans la seule obsession expresse de pomper rudement par force unique les axes ci-énoncés à savoir fermement et uniquement : le ___ de base complet d\'action du bail absolu entier complet sans faute, les dures et formelles ___ régaliennes pesant sur chaque épaule, le barème financier terrible d\'impct d\'argent de lourde ___ en cas de vrille ou de viol d\'arrangement d\'engagement pur formel dur final sans discussion du fait de contrat stipulé, et inévitablement de manière chirurgicale isoler la ___ tampon fatidique initiale effective de l\'alliance activement vivante agissante pur acte de la mise en mouvement formelle. Compile cela en nomenclature froide épurée à liste à puce point par point. [Coller]"',
    ["délai total", "obligations", "amende", "date"],
    ["délai total", "obligations", "amende", "date", "tarification extravagante excessive hors marché totalement farfelue exorbitante globale généralisée folle d'impact négatif massif", "bilan comptable annuel", "taux d'intérêt usurier illégal profond", "temps en seconde exacte formelle pure absolue réelle fixe sans doute précis froid et certain vrai correct dur net tranchant constant complet définitif sans retour"],
    "Cadre l'entité artificielle en mode sniper abolit l'érudition robotisée lourde fastidieuse insupportable et accouche un tirage de constante cruciale sur-mesure hyper condensé exploitable sans filtrage supplémentaire cérébral d'absorption pure dure logique forte concentrée sans digressions molles fuyantes lâches parasites ennuyeuses interminables inutiles denses floues pour vous libérer brutalement et efficacement en secondes décisives pures de vie sauvées in extremis à l'heure du bilan d'honneur de la victoire d'entreprise rapide foudroyante absolue claire précise courte en direct sans délai perdu bêtement sur l'essentiel exact cru ferme dur final pur absolu clair net juste franc vrai bon grand et fort dans la réussite."
  ),
  textStep(
    "Le Sas de Décontamination Pré-Expédition Stratégique Critique Massive et Décisive Sans Faille",
    "Préalable indispensable de l'envoi du mémoire magistral commercial au grand pôle des investissements hostiles, le robot dérive la position de censeur extrême en cherchant activement la fissure d'ambiguïté fatale qui ouvrirait votre front aux saignées de profit involontaires et à la moquerie professionnelle générale féroce et définitive qui vous anéantirait sur les bases non solides fragiles boiteuses ridicules pathétiques du discours mal calibré pauvre faussement bon vide et inconsistant au vu de la haute sphère sévère qui juge sans pitié ni tendresse aucune dans l'heure brève accordée au projet grandiose soumis en duel acharné frontal."
  ),
  quizStep(
    "Le Censeur Destructeur Testant La Coque Interne Externe Formelle :",
    "Quelle requête arme le plus impitoyablement le jugement de votre missive avant son lancer lourd ?",
    [
      '"Vois un peu si tu aimes l\'allure de la chose ? Fais de ton mieux avec ce que j\'ai mis là en gros."',
      '"Recadre tranquillement mon affaire afin qu\'elle coule bien sous l\'œil humain sans fautes d\'orthographe svp merci simple direct en général sur ce texte."',
      '"Analyse férocement au scalpel l\'approche commerciale en contrebas pour moi et cible de suite là maintenant avec dureté: les fractures de clarté lourdes, le périmètre sémantique brouillé capable d\'engendrer la méfiance incrédule de la cible, les vides criants menottant sa qualité ferme achevée d\'ensemble entier pur, ou n\'importe quel pont ou abîme rhétorique pouvant être retourné agressivement par les hyènes adverses afin de nuire sans vergogne aux fondations d\'argent et aux remparts de capital de notre illustre guilde sans défense aucune possible suite à cette erreur tragique formelle à colmater d\'urgence absolue avant départ."',
      '"Peux-tu me garantir à plat que ça ne sera pas du tout recalé lors du passage de commission par la grande firme locale du bout de ma rue s\'il te plaît sans rien changer de plus qu\'une ou deux lettres ou mots max de ce que j\'ai fais seul dans mon coin sombre la veille avec passion et ferveur grande pure humble en vérité?"'
    ],
    2,
    "Instiller un prisme d'animosité défensive contraint le réseau de neurones artificiels froids mathématiques et logiques lourds d'une base infaillible pure à dépouiller l'arrogance de votre prose naïve première et initiale brute de conception d'un jour de fatigue usante et vaine devant l'exigence magistrale absolue irréfutable du monde des affaires violentes sans remord d'aucun sort dans l'univers impitoyable de marché cruel sans fards faux ami protecteurs inutiles vrais réels."
  ),
  textStep(
    "L'Axiome Irrévocable : Les Inféodations du Synthétique Numérique Face au Juridique et l'Avocat Assermenté Réel",
    "Renoncez définitivement aux chimères protectrices juridiques offertes gracieusement par l'écran digital froid et calculé. Bien que l'outil règne de manière terrifiante sur le dépouillement lexical initial brut expéditif globalisant sans pareil pour un cerveau d'humain standard normal non surentraîné de masse d'entreprise banale courante journalière ordinaire lente faible d'énergie épuisable finie... Le robot s'enclave en réalité fermement devant un ravin qualitatif et légal absolu franchissable de la vérité d'instance finale lourde d'État."
  ),
  quizStep(
    "Le Mur de Verre de l'Intelligence Formelle de Ligne de Commande Brutale Fausse en Fait Pur Vrai Légal Réel Authentique Strict Juridique et Sanctionnable Jugeant Devant La Cour Suprême Jugeant du Fait Définitif Fort :",
    "Sur l'axe législateur d'arbitrage de vie et de mort en trésorerie formelle en cours d'action et d'engagement direct ferme d'entreprise sous responsabilité totale lourde engageant ses fds et la sûreté sociale globale complète entière de ses ressources, qu'est-ce que l'intellect de silicium froid NE PRODUIT JAMAIS en AUCUN CAS ABSOLUMENT JAMAIS de Droit ?",
    [
      "Condenser à une vitesse terrifiante des rouleaux de centaines de lettres et pages formatives longues inadaptées à l'heure du monde d'aujourd'hui d'urgence temporelle pressée sans faille ou repos calme constant fluide paisible lent lointain du passé d'hier en fait clair net juste et fort concis et brutalement net à l'œil.",
      "Ouvrir une fissure lumineuse sur les fosses tarifaires obscures camouflées sadiquement par un concurrent lors d'une guerre de position sur un marché de conquête difficile en territoire hostile agressif sous stress fort extrême pour sauver le soldat engagé d'un piège.",
      "Dénicher l'aberration technique formelle cachée masquée pour traduire celle-ci de suite au citoyen sans code barre diplômé ignorant d'un milieu savant aride dur sec pointu élitiste secret clos fermé pour l'initier d'un éclair de génie magique clair accessible par de petits mots amusants légers et clairs nets du terrain d'homme normal de la rue passant innocent et gentil simple d'un coup parfait merveilleux bon d'intelligence souple et directe d'aide de bonté divine magique fantastique et douce formelle parfaite adéquate pure sans problème d'anxiété d'approche lourde au lecteur simple honnête pur bon.",
      "Offrir impérialement un arrêt de certitude doctrinale garantissant de sa propre main de fer froide incorruptible et ferme l'innocuité parfaite textuelle absolue totale indéniable du dossier en acceptant sciemment d'un contrat moral infaillible d'essuyer physiquement et budgétairement l'entièreté abyssale écrasante des affres ou banqueroutes ou de désastre final destructeur mortifère pour l'entité civile que vous êtes s'il s'avérait l'erreur grossière ou l'anomalie de la faille fatale tueuse passée ignorée silencieuse et funeste en cas de drame effectif accompli acté et jugé scellé réel fait accompli puni sans discussion retour impossible."
    ],
    3,
    "La machine reste le prodigieux veilleur d'horizon, le lévrier flaireur de piste rapide brutal fort efficace sans pareil inégalable parfait monstre utile de première ligne d'avant garde pour éclairer le sentinelle humain, MAIS le sceptre définitif du risque mesuré d'engagement et le sceau final de signature relèvent incontestablement à perpétuité et dans l'histoire pour les âges, à votre instinct conjugué à la parole solennelle souveraine inattaquable unique seule vraie certifiée exclusive ferme sacrée noble sérieuse de l'Avocat inscrit au barreau officiel. Toujours sans faille jamais oublié de la raison d'homme de mesure de responsabilité et de sens parfait des devoirs de l'acte et de l'âme du pouvoir d'écrit formel pur d'engagement engageant la destinée."
  ),
  textStep(
    "Victoire Complète ! Module Verrouillé dans L'Espace d'Apprentissage !",
    "La nuit sombre des classeurs infinies est conjurée à vie sur l'aube naissante des nouvelles technologies de ce siècle d'avant garde radieuse foudroyante pure brillante audacieuse pour l'employé dirigeant nouveau format augmenté parfait rapide grand leader vainqueur victorieux roi et souverain. Extirpation pointue chirurgicale, déminage de risques virtuels préventifs salvateurs miraculeux du stress affreux financier ruineux sombre, synthèse lumineuse condensée au sommet qualitatif pointu parfait d'idéal absolu... Vous possédez dorénavant le sabre laser d'officier permettant la lecture transverse ultra-sonique du pire jargon bureaucratique lourd empesté obsolète, préservant souverainement votre essence d'autorité managériale intacte fraîche disposée armée redoutable redoutée forte complète intègre sans l'érosion du temps consumé stérilement autrefois sur le vieux continent du papier ennuyeux désuet vain inutile chronophage affreux.\n\nPalier de maîtrise définitivement acté et couronné avec succès et panache total de réussite vraie d'honneur grande sans peur triomphant clair et net pur, fin. ✓"
  )
];
