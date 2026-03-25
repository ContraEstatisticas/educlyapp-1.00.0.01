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

export const CLAUDE_MODULE_6_STEPS_PT = [
  textStep(
    "Claude para Analise de Documentos e Contratos Longos",
    "Bem-vindo de volta! Nesta licao, voce vai aprender como o Claude pode se tornar um aliado poderoso na leitura, interpretacao e analise de documentos extensos, como contratos, relatorios tecnicos e propostas comerciais, de forma simples e pratica."
  ),
  textStep(
    "Por que o Claude e Especialmente Bom com Documentos Longos?",
    "O Claude possui ampla capacidade de contexto, o que permite analisar documentos extensos mantendo coerencia entre todas as partes. Na pratica, isso significa ler o material completo, conectar informacoes do inicio ao fim e identificar padroes, riscos e inconsistencias com muito mais clareza."
  ),
  quizStep(
    "Capacidade de contexto",
    "O que significa, na pratica, dizer que o Claude lida bem com documentos longos?",
    [
      "Ele le o documento completo, conecta informacoes do inicio ao fim e identifica riscos ou inconsistencias.",
      "Ele assina contratos automaticamente em seu lugar.",
      "Ele substitui totalmente um advogado, contador ou especialista tecnico.",
      "Ele sempre entrega a decisao final correta sem revisao humana."
    ],
    0,
    "A grande vantagem esta em manter contexto ao longo do documento inteiro, o que melhora resumo, interpretacao e deteccao de pontos importantes."
  ),
  textStep(
    "Fazendo o Upload do Documento",
    "Antes de qualquer analise, envie sempre o documento completo. Isso aumenta a precisao e a confiabilidade da interpretacao, porque o Claude consegue observar relacoes entre secoes distantes e evitar leituras fragmentadas."
  ),
  fillStep(
    "Preencha a lacuna - Analise inicial do documento!",
    "Monte um prompt inicial para pedir uma visao geral do material.",
    "\"Vou te enviar um documento. Leia ele por completo e me diga: ___, ___ e ___.\"",
    [
      "qual e o objetivo principal",
      "quais sao os pontos centrais",
      "se existe algo que merece atencao imediata"
    ],
    [
      "qual e o objetivo principal",
      "quais sao os pontos centrais",
      "se existe algo que merece atencao imediata",
      "se eu devo assinar agora",
      "quem esta certo juridicamente",
      "uma opiniao definitiva"
    ],
    "Esse pedido inicial cria uma visao geral util antes de entrar em detalhes ou riscos especificos."
  ),
  textStep(
    "Resumindo Documentos Complexos",
    "Depois da leitura completa, o primeiro passo costuma ser organizar o documento de forma clara e estruturada. Um bom resumo em camadas permite entender rapidamente o quadro geral e depois aprofundar apenas o que exige atencao."
  ),
  fillStep(
    "Preencha a lacuna - Resuma em camadas!",
    "Monte um prompt que organize o resumo em tres niveis.",
    "\"Resuma este documento em 3 niveis: primeiro ___, depois ___ e por fim ___.\"",
    [
      "um resumo executivo curto",
      "um resumo com os principais pontos de cada secao",
      "os pontos que exigem decisao"
    ],
    [
      "um resumo executivo curto",
      "um resumo com os principais pontos de cada secao",
      "os pontos que exigem decisao",
      "uma copia do documento",
      "uma opiniao juridica final",
      "um comentario aleatorio"
    ],
    "Resumos em niveis ajudam a sair do excesso de informacao e focar no que realmente importa."
  ),
  textStep(
    "Identificando Clausulas e Pontos de Risco",
    "Em contratos e textos formais, riscos podem estar escondidos em trechos tecnicos ou juridicos. O Claude ajuda a localizar essas clausulas, explicar o que elas significam em linguagem simples e sugerir alternativas mais equilibradas."
  ),
  fillStep(
    "Preencha a lacuna - Mapeie riscos do contrato!",
    "Estruture um pedido para localizar clausulas desfavoraveis.",
    "\"Analise este contrato e identifique clausulas que possam representar risco ou desvantagem. Para cada uma, ___, ___, ___ e ___.\"",
    [
      "cite o trecho",
      "explique em linguagem simples",
      "classifique o risco",
      "sugira uma redacao mais equilibrada"
    ],
    [
      "cite o trecho",
      "explique em linguagem simples",
      "classifique o risco",
      "sugira uma redacao mais equilibrada",
      "ignore o contexto",
      "faca uma aposta",
      "decida por mim"
    ],
    "Esse formato ajuda o Claude a transformar linguagem tecnica em um mapa pratico de risco."
  ),
  textStep(
    "Extraindo Informacoes Especificas",
    "Nem sempre voce precisa analisar o documento inteiro em profundidade. Em muitos casos, o mais importante e localizar rapidamente os dados que realmente orientam a decisao."
  ),
  fillStep(
    "Preencha a lacuna - Extraia o essencial!",
    "Monte um pedido focado em informacoes-chave do documento.",
    "\"Leia o documento e extraia apenas estas informacoes: ___, ___, ___, ___ e ___.\"",
    [
      "prazo de vigencia",
      "obrigacoes de cada parte",
      "penalidades",
      "condicoes de pagamento",
      "condicoes de rescisao"
    ],
    [
      "prazo de vigencia",
      "obrigacoes de cada parte",
      "penalidades",
      "condicoes de pagamento",
      "condicoes de rescisao",
      "cor do logotipo",
      "opiniao pessoal",
      "suposicoes"
    ],
    "Pedir extracao objetiva acelera a leitura e reduz a chance de se perder em detalhes secundarios."
  ),
  textStep(
    "Comparando Versoes de Documentos",
    "Quando existem duas versoes de um contrato ou proposta, o Claude pode comparar mudancas de forma clara. Isso facilita perceber se alguma alteracao melhorou, piorou ou manteve os termos principais."
  ),
  fillStep(
    "Preencha a lacuna - Compare versoes!",
    "Monte um prompt para comparar duas versoes do mesmo documento.",
    "\"Compare estas duas versoes do documento e apresente as diferencas, destacando ___, ___, ___ e ___.\"",
    [
      "o que mudou",
      "o que ficou mais favoravel",
      "o que ficou mais desfavoravel",
      "o que permaneceu igual"
    ],
    [
      "o que mudou",
      "o que ficou mais favoravel",
      "o que ficou mais desfavoravel",
      "o que permaneceu igual",
      "o que parece bonito",
      "o que eu quero ouvir",
      "o que pode ser ignorado"
    ],
    "Comparacao estruturada ajuda voce a enxergar impacto real, nao apenas diferencas de redacao."
  ),
  textStep(
    "Traduzindo Linguagem Tecnica e Juridica",
    "Documentos formais costumam usar termos dificeis para quem nao e da area. O Claude pode reescrever esses trechos em linguagem acessivel sem perder o significado original, o que facilita muito a compreensao."
  ),
  fillStep(
    "Preencha a lacuna - Simplifique a linguagem juridica!",
    "Peca uma traducao para linguagem acessivel sem perder precisao.",
    "\"Reescreva os trechos abaixo em ___, como se estivesse explicando para alguem sem conhecimento tecnico. ___ e ___.\"",
    [
      "linguagem simples e direta",
      "preserve o significado original",
      "destaque qualquer clausula que mereca atencao"
    ],
    [
      "linguagem simples e direta",
      "preserve o significado original",
      "destaque qualquer clausula que mereca atencao",
      "linguagem vaga",
      "mude o sentido",
      "esconda os riscos"
    ],
    "Simplificar sem distorcer o conteudo e uma das formas mais praticas de usar Claude com documentos densos."
  ),
  textStep(
    "Fazendo Perguntas Diretas sobre o Documento",
    "Depois que o Claude le o documento, voce pode explorar cenarios com perguntas especificas. Perguntas como o que acontece em caso de atraso, quando ha multa ou em quais condicoes o contrato pode ser encerrado ajudam a transformar leitura em entendimento pratico."
  ),
  textStep(
    "Analisando Relatorios Tecnicos e Financeiros",
    "O Claude nao e util apenas para contratos. Ele tambem ajuda a interpretar relatorios extensos, identificando sinais importantes, incoerencias e pontos que exigem acompanhamento mais rapido."
  ),
  fillStep(
    "Preencha a lacuna - Leia o relatorio com foco!",
    "Monte um pedido de analise para relatorios tecnicos ou financeiros.",
    "\"Analise este relatorio e identifique ___, ___, ___ e ___.\"",
    [
      "os principais indicadores",
      "inconsistencias",
      "tendencias preocupantes",
      "os pontos que exigem acao imediata"
    ],
    [
      "os principais indicadores",
      "inconsistencias",
      "tendencias preocupantes",
      "os pontos que exigem acao imediata",
      "as frases mais bonitas",
      "palpites sem base",
      "um resumo divertido"
    ],
    "Esse pedido direciona a analise para o que realmente orienta acompanhamento e tomada de decisao."
  ),
  textStep(
    "A Regra de Ouro",
    "O Claude e excelente para resumir, organizar, interpretar e destacar pontos criticos em documentos longos. Mas ele nao substitui a validacao de um especialista em decisoes com impacto juridico, financeiro ou tecnico. Use o Claude como primeira camada de analise e valide achados importantes com um profissional responsavel."
  ),
  quizStep(
    "O que o Claude nao substitui",
    "Mesmo sendo muito bom com documentos longos, o que o Claude nao substitui?",
    [
      "A validacao de um especialista em decisoes com impacto juridico, financeiro ou tecnico.",
      "A leitura inicial de um documento.",
      "A comparacao entre duas versoes de texto.",
      "A traducao de linguagem tecnica em algo mais simples."
    ],
    0,
    "O Claude ajuda muito na primeira analise, mas decisoes importantes ainda precisam de validacao profissional."
  ),
  textStep(
    "Conclusao",
    "Com o Claude, a leitura de documentos longos deixa de ser um processo cansativo e passa a ser uma analise mais estrategica, clara e pratica. Voce pode resumir, localizar informacoes, comparar versoes, entender clausulas complexas e fazer perguntas diretas sobre o conteudo em uma unica conversa.\n\nLicao concluida."
  ),
] as const;

export const CLAUDE_MODULE_6_STEPS_EN = [
  textStep(
    "Claude for Long Document and Contract Analysis",
    "Welcome back! In this lesson, you will learn how Claude can become a powerful ally in reading, interpreting, and analyzing long documents such as contracts, technical reports, and commercial proposals in a simple and practical way."
  ),
  textStep(
    "Why Is Claude Especially Good with Long Documents?",
    "Claude has a broad context capacity, which allows it to analyze long documents while maintaining coherence across all parts. In practice, that means reading the full material, connecting information from beginning to end, and spotting patterns, risks, and inconsistencies more clearly."
  ),
  quizStep(
    "Context capacity",
    "What does it mean in practice to say that Claude handles long documents well?",
    [
      "It reads the full document, connects information from start to finish, and identifies risks or inconsistencies.",
      "It automatically signs contracts for you.",
      "It completely replaces a lawyer, accountant, or technical expert.",
      "It always gives the final correct decision without human review."
    ],
    0,
    "The key advantage is maintaining context across the full document, which improves summary, interpretation, and risk detection."
  ),
  textStep(
    "Uploading the Document",
    "Before any analysis, always send the full document. That improves accuracy and reliability because Claude can observe relationships between distant sections instead of working from fragmented excerpts."
  ),
  fillStep(
    "Fill in the blank - Start the document analysis!",
    "Build an opening prompt for a broad first reading.",
    "\"I am going to send you a document. Read it fully and tell me: ___, ___, and ___.\"",
    [
      "what the main objective is",
      "what the central points are",
      "whether there is anything that deserves immediate attention"
    ],
    [
      "what the main objective is",
      "what the central points are",
      "whether there is anything that deserves immediate attention",
      "whether I should sign it right now",
      "who is legally right",
      "a final verdict"
    ],
    "This opening request creates a useful high-level view before moving into details or specific risks."
  ),
  textStep(
    "Summarizing Complex Documents",
    "After the full reading, the first step is often to organize the document clearly. A layered summary helps you understand the overall picture quickly and then go deeper only where attention is required."
  ),
  fillStep(
    "Fill in the blank - Summarize in layers!",
    "Build a three-level summary prompt.",
    "\"Summarize this document in 3 levels: first ___, then ___, and finally ___.\"",
    [
      "a short executive summary",
      "a summary with the main points of each section",
      "the points that require a decision"
    ],
    [
      "a short executive summary",
      "a summary with the main points of each section",
      "the points that require a decision",
      "a copy of the document",
      "a final legal opinion",
      "a random comment"
    ],
    "Layered summaries help you move from information overload to practical clarity."
  ),
  textStep(
    "Identifying Clauses and Risk Points",
    "In contracts and formal documents, risks may be hidden in technical or legal language. Claude helps locate those clauses, explain them in plain language, and suggest more balanced alternatives."
  ),
  fillStep(
    "Fill in the blank - Map contract risks!",
    "Structure a request to find unfavorable clauses.",
    "\"Analyze this contract and identify clauses that may represent risk or disadvantage. For each one, ___, ___, ___, and ___.\"",
    [
      "quote the passage",
      "explain it in simple language",
      "classify the risk",
      "suggest more balanced wording"
    ],
    [
      "quote the passage",
      "explain it in simple language",
      "classify the risk",
      "suggest more balanced wording",
      "ignore the context",
      "make a bet",
      "decide for me"
    ],
    "This format helps Claude turn technical language into a practical risk map."
  ),
  textStep(
    "Extracting Specific Information",
    "You do not always need a deep analysis of the entire document. In many cases, the most valuable thing is to quickly locate the information that actually drives the decision."
  ),
  fillStep(
    "Fill in the blank - Extract the essentials!",
    "Build a request focused on key document facts.",
    "\"Read the document and extract only this information: ___, ___, ___, ___, and ___.\"",
    [
      "term length",
      "each party's obligations",
      "penalties",
      "payment terms",
      "termination conditions"
    ],
    [
      "term length",
      "each party's obligations",
      "penalties",
      "payment terms",
      "termination conditions",
      "logo color",
      "personal opinion",
      "assumptions"
    ],
    "Objective extraction speeds up reading and keeps you focused on what matters most."
  ),
  textStep(
    "Comparing Document Versions",
    "When there are two versions of a contract or proposal, Claude can compare the changes clearly. That makes it easier to see whether an edit improved, worsened, or preserved the main terms."
  ),
  fillStep(
    "Fill in the blank - Compare versions!",
    "Build a prompt to compare two versions of the same document.",
    "\"Compare these two versions of the document and present the differences, highlighting ___, ___, ___, and ___.\"",
    [
      "what changed",
      "what became more favorable",
      "what became less favorable",
      "what stayed the same"
    ],
    [
      "what changed",
      "what became more favorable",
      "what became less favorable",
      "what stayed the same",
      "what looks nicer",
      "what I want to hear",
      "what can be ignored"
    ],
    "Structured comparison helps you see real impact, not just wording differences."
  ),
  textStep(
    "Translating Technical and Legal Language",
    "Formal documents often use difficult language for people outside the field. Claude can rewrite those passages into accessible language without changing the original meaning, which makes comprehension much easier."
  ),
  fillStep(
    "Fill in the blank - Simplify legal language!",
    "Ask for a clearer version without losing precision.",
    "\"Rewrite the passages below in ___, as if you were explaining them to someone without technical knowledge. ___ and ___.\"",
    [
      "simple and direct language",
      "preserve the original meaning",
      "highlight any clause that deserves attention"
    ],
    [
      "simple and direct language",
      "preserve the original meaning",
      "highlight any clause that deserves attention",
      "vague language",
      "change the meaning",
      "hide the risks"
    ],
    "Simplifying without distorting the content is one of the most practical ways to use Claude with dense documents."
  ),
  textStep(
    "Asking Direct Questions About the Document",
    "Once Claude has read the document, you can explore scenarios with direct questions. Questions about late payment, penalties, or termination conditions turn passive reading into practical understanding."
  ),
  textStep(
    "Analyzing Technical and Financial Reports",
    "Claude is not only useful for contracts. It also helps interpret long reports by identifying important signals, inconsistencies, and points that require closer follow-up."
  ),
  fillStep(
    "Fill in the blank - Read the report with focus!",
    "Build a request for technical or financial report analysis.",
    "\"Analyze this report and identify ___, ___, ___, and ___.\"",
    [
      "the main indicators",
      "inconsistencies",
      "concerning trends",
      "the points that require immediate action"
    ],
    [
      "the main indicators",
      "inconsistencies",
      "concerning trends",
      "the points that require immediate action",
      "the prettiest phrases",
      "unsupported guesses",
      "a funny summary"
    ],
    "This request directs the analysis toward what actually supports monitoring and decision-making."
  ),
  textStep(
    "The Golden Rule",
    "Claude is excellent at summarizing, organizing, interpreting, and highlighting critical points in long documents. But it does not replace validation by a specialist in decisions with legal, financial, or technical impact. Use Claude as the first layer of analysis and validate important findings with a responsible professional."
  ),
  quizStep(
    "What Claude does not replace",
    "Even though Claude is very strong with long documents, what does it not replace?",
    [
      "Validation by a specialist in decisions with legal, financial, or technical impact.",
      "The initial reading of a document.",
      "Comparison between two versions of a text.",
      "Translation of technical language into simpler wording."
    ],
    0,
    "Claude helps a lot in the first analysis, but important decisions still need professional validation."
  ),
  textStep(
    "Conclusion",
    "With Claude, reading long documents stops being a tiring process and becomes a clearer, more strategic analysis. You can summarize, locate information, compare versions, understand complex clauses, and ask direct questions about the content in a single conversation.\n\nLesson complete."
  ),
] as const;

export const CLAUDE_MODULE_6_STEPS_ES = [
  textStep(
    "Claude para Analisis de Documentos y Contratos Largos",
    "Bienvenido de vuelta. En esta leccion aprenderas como Claude puede convertirse en un gran aliado para leer, interpretar y analizar documentos extensos, como contratos, informes tecnicos y propuestas comerciales, de forma simple y practica."
  ),
  textStep(
    "Por que Claude es Especialmente Bueno con Documentos Largos?",
    "Claude tiene una gran capacidad de contexto, lo que le permite analizar documentos extensos manteniendo coherencia entre todas sus partes. En la practica, eso significa leer el material completo, conectar informacion del inicio al final e identificar patrones, riesgos e inconsistencias con mayor claridad."
  ),
  quizStep(
    "Capacidad de contexto",
    "Que significa en la practica decir que Claude maneja bien los documentos largos?",
    [
      "Lee el documento completo, conecta informacion de principio a fin e identifica riesgos o inconsistencias.",
      "Firma contratos automaticamente por ti.",
      "Sustituye por completo a un abogado, contador o especialista tecnico.",
      "Siempre entrega la decision final correcta sin revision humana."
    ],
    0,
    "La gran ventaja es mantener el contexto a lo largo de todo el documento, mejorando el resumen, la interpretacion y la deteccion de puntos importantes."
  ),
  textStep(
    "Subiendo el Documento",
    "Antes de cualquier analisis, envia siempre el documento completo. Eso mejora la precision y la confiabilidad de la interpretacion, porque Claude puede observar relaciones entre secciones distantes en lugar de trabajar con fragmentos aislados."
  ),
  fillStep(
    "Completa el espacio - Analisis inicial del documento!",
    "Construye un prompt inicial para pedir una vision general.",
    "\"Voy a enviarte un documento. Leelo por completo y dime: ___, ___ y ___.\"",
    [
      "cual es el objetivo principal",
      "cuales son los puntos centrales",
      "si hay algo que merece atencion inmediata"
    ],
    [
      "cual es el objetivo principal",
      "cuales son los puntos centrales",
      "si hay algo que merece atencion inmediata",
      "si debo firmarlo ahora",
      "quien tiene la razon legal",
      "un veredicto definitivo"
    ],
    "Este pedido inicial crea una vision general util antes de entrar en detalles o riesgos especificos."
  ),
  textStep(
    "Resumiendo Documentos Complejos",
    "Despues de la lectura completa, el primer paso suele ser organizar el documento de forma clara. Un resumen en capas ayuda a entender rapidamente el panorama general y luego profundizar solo donde hace falta."
  ),
  fillStep(
    "Completa el espacio - Resume por capas!",
    "Construye un prompt de resumen en tres niveles.",
    "\"Resume este documento en 3 niveles: primero ___, despues ___ y por ultimo ___.\"",
    [
      "un resumen ejecutivo corto",
      "un resumen con los puntos principales de cada seccion",
      "los puntos que requieren decision"
    ],
    [
      "un resumen ejecutivo corto",
      "un resumen con los puntos principales de cada seccion",
      "los puntos que requieren decision",
      "una copia del documento",
      "una opinion legal final",
      "un comentario aleatorio"
    ],
    "Los resumenes por niveles ayudan a pasar del exceso de informacion a una claridad accionable."
  ),
  textStep(
    "Identificando Clausulas y Puntos de Riesgo",
    "En contratos y documentos formales, los riesgos pueden estar escondidos en lenguaje tecnico o juridico. Claude ayuda a localizar esas clausulas, explicarlas en lenguaje simple y sugerir alternativas mas equilibradas."
  ),
  fillStep(
    "Completa el espacio - Detecta riesgos del contrato!",
    "Estructura un pedido para localizar clausulas desfavorables.",
    "\"Analiza este contrato e identifica clausulas que puedan representar riesgo o desventaja. Para cada una, ___, ___, ___ y ___.\"",
    [
      "cita el fragmento",
      "explicalo en lenguaje simple",
      "clasifica el riesgo",
      "sugiere una redaccion mas equilibrada"
    ],
    [
      "cita el fragmento",
      "explicalo en lenguaje simple",
      "clasifica el riesgo",
      "sugiere una redaccion mas equilibrada",
      "ignora el contexto",
      "haz una apuesta",
      "decide por mi"
    ],
    "Este formato ayuda a Claude a convertir lenguaje tecnico en un mapa practico de riesgos."
  ),
  textStep(
    "Extrayendo Informacion Especifica",
    "No siempre necesitas analizar todo el documento en profundidad. Muchas veces lo mas valioso es localizar rapidamente la informacion que realmente guia la decision."
  ),
  fillStep(
    "Completa el espacio - Extrae lo esencial!",
    "Construye un pedido enfocado en datos clave del documento.",
    "\"Lee el documento y extrae solo esta informacion: ___, ___, ___, ___ y ___.\"",
    [
      "plazo de vigencia",
      "obligaciones de cada parte",
      "penalidades",
      "condiciones de pago",
      "condiciones de rescision"
    ],
    [
      "plazo de vigencia",
      "obligaciones de cada parte",
      "penalidades",
      "condiciones de pago",
      "condiciones de rescision",
      "color del logotipo",
      "opinion personal",
      "suposiciones"
    ],
    "Pedir una extraccion objetiva acelera la lectura y evita perderse en detalles secundarios."
  ),
  textStep(
    "Comparando Versiones de Documentos",
    "Cuando existen dos versiones de un contrato o propuesta, Claude puede comparar los cambios de manera clara. Eso facilita ver si alguna modificacion mejoro, empeoro o mantuvo los terminos principales."
  ),
  fillStep(
    "Completa el espacio - Compara versiones!",
    "Construye un prompt para comparar dos versiones del mismo documento.",
    "\"Compara estas dos versiones del documento y presenta las diferencias, destacando ___, ___, ___ y ___.\"",
    [
      "que cambio",
      "que quedo mas favorable",
      "que quedo mas desfavorable",
      "que se mantuvo igual"
    ],
    [
      "que cambio",
      "que quedo mas favorable",
      "que quedo mas desfavorable",
      "que se mantuvo igual",
      "que se ve mas bonito",
      "lo que quiero oir",
      "lo que puede ignorarse"
    ],
    "Una comparacion estructurada ayuda a ver impacto real, no solo diferencias de redaccion."
  ),
  textStep(
    "Traduciendo Lenguaje Tecnico y Juridico",
    "Los documentos formales suelen usar terminos dificiles para quien no pertenece al area. Claude puede reescribir esos fragmentos en lenguaje accesible sin alterar el significado original, lo que facilita mucho la comprension."
  ),
  fillStep(
    "Completa el espacio - Simplifica el lenguaje legal!",
    "Pide una version mas clara sin perder precision.",
    "\"Reescribe los fragmentos de abajo en ___, como si se los explicaras a alguien sin conocimiento tecnico. ___ y ___.\"",
    [
      "lenguaje simple y directo",
      "preserva el significado original",
      "destaca cualquier clausula que merezca atencion"
    ],
    [
      "lenguaje simple y directo",
      "preserva el significado original",
      "destaca cualquier clausula que merezca atencion",
      "lenguaje vago",
      "cambia el sentido",
      "oculta los riesgos"
    ],
    "Simplificar sin distorsionar el contenido es una de las formas mas practicas de usar Claude con documentos densos."
  ),
  textStep(
    "Haciendo Preguntas Directas sobre el Documento",
    "Una vez que Claude ya leyo el documento, puedes explorar escenarios con preguntas directas. Preguntas sobre atrasos, multas o condiciones de salida convierten la lectura pasiva en comprension practica."
  ),
  textStep(
    "Analizando Informes Tecnicos y Financieros",
    "Claude no solo sirve para contratos. Tambien ayuda a interpretar informes extensos identificando senales importantes, incoherencias y puntos que requieren seguimiento mas rapido."
  ),
  fillStep(
    "Completa el espacio - Lee el informe con foco!",
    "Construye un pedido de analisis para informes tecnicos o financieros.",
    "\"Analiza este informe e identifica ___, ___, ___ y ___.\"",
    [
      "los principales indicadores",
      "inconsistencias",
      "tendencias preocupantes",
      "los puntos que requieren accion inmediata"
    ],
    [
      "los principales indicadores",
      "inconsistencias",
      "tendencias preocupantes",
      "los puntos que requieren accion inmediata",
      "las frases mas bonitas",
      "suposiciones sin base",
      "un resumen divertido"
    ],
    "Este pedido dirige el analisis hacia lo que realmente ayuda al seguimiento y a la toma de decisiones."
  ),
  textStep(
    "La Regla de Oro",
    "Claude es excelente para resumir, organizar, interpretar y resaltar puntos criticos en documentos largos. Pero no sustituye la validacion de un especialista en decisiones con impacto juridico, financiero o tecnico. Usa Claude como primera capa de analisis y valida los hallazgos importantes con un profesional responsable."
  ),
  quizStep(
    "Lo que Claude no sustituye",
    "Aunque Claude es muy bueno con documentos largos, que es lo que no sustituye?",
    [
      "La validacion de un especialista en decisiones con impacto juridico, financiero o tecnico.",
      "La lectura inicial de un documento.",
      "La comparacion entre dos versiones de un texto.",
      "La traduccion de lenguaje tecnico a algo mas simple."
    ],
    0,
    "Claude ayuda mucho en la primera analisis, pero las decisiones importantes siguen necesitando validacion profesional."
  ),
  textStep(
    "Conclusion",
    "Con Claude, leer documentos largos deja de ser un proceso agotador y se convierte en un analisis mas claro y estrategico. Puedes resumir, localizar informacion, comparar versiones, entender clausulas complejas y hacer preguntas directas sobre el contenido dentro de una sola conversacion.\n\nLeccion completada."
  ),
] as const;

export const CLAUDE_MODULE_6_STEPS_FR = [
  textStep(
    "Claude pour l'Analyse de Documents et de Contrats Longs",
    "Bon retour. Dans cette lecon, vous allez apprendre comment Claude peut devenir un allie puissant pour lire, interpreter et analyser des documents longs, comme des contrats, des rapports techniques et des propositions commerciales, de maniere simple et pratique."
  ),
  textStep(
    "Pourquoi Claude est-il Specialement Bon avec les Documents Longs ?",
    "Claude dispose d'une grande capacite de contexte, ce qui lui permet d'analyser des documents longs tout en gardant une coherence entre toutes les parties. En pratique, cela signifie lire le document complet, relier les informations du debut a la fin et identifier plus clairement les motifs, les risques et les incoherences."
  ),
  quizStep(
    "Capacite de contexte",
    "Que signifie concretement le fait que Claude gere bien les documents longs ?",
    [
      "Il lit le document complet, relie les informations du debut a la fin et identifie les risques ou incoherences.",
      "Il signe automatiquement les contrats a votre place.",
      "Il remplace totalement un avocat, un comptable ou un expert technique.",
      "Il fournit toujours la bonne decision finale sans revision humaine."
    ],
    0,
    "Le grand avantage est de conserver le contexte sur l'ensemble du document, ce qui ameliore le resume, l'interpretation et la detection des points importants."
  ),
  textStep(
    "Envoyer le Document",
    "Avant toute analyse, envoyez toujours le document complet. Cela augmente la precision et la fiabilite de l'interpretation, car Claude peut observer les liens entre des sections eloignees plutot que travailler a partir d'extraits fragmentes."
  ),
  fillStep(
    "Remplissez le vide - Analyse initiale du document !",
    "Construisez un prompt d'ouverture pour demander une premiere vue d'ensemble.",
    "\"Je vais t'envoyer un document. Lis-le en entier et dis-moi : ___, ___ et ___.\"",
    [
      "quel est l'objectif principal",
      "quels sont les points centraux",
      "s'il existe quelque chose qui merite une attention immediate"
    ],
    [
      "quel est l'objectif principal",
      "quels sont les points centraux",
      "s'il existe quelque chose qui merite une attention immediate",
      "si je dois signer tout de suite",
      "qui a juridiquement raison",
      "un verdict definitif"
    ],
    "Cette demande initiale cree une vue generale utile avant d'entrer dans les details ou les risques specifiques."
  ),
  textStep(
    "Resumer des Documents Complexes",
    "Apres la lecture complete, la premiere etape consiste souvent a organiser le document clairement. Un resume par couches permet de comprendre rapidement l'ensemble avant d'approfondir seulement ce qui demande de l'attention."
  ),
  fillStep(
    "Remplissez le vide - Resumez par niveaux !",
    "Construisez un prompt de resume en trois niveaux.",
    "\"Resume ce document en 3 niveaux : d'abord ___, puis ___, et enfin ___.\"",
    [
      "un court resume executif",
      "un resume avec les points principaux de chaque section",
      "les points qui exigent une decision"
    ],
    [
      "un court resume executif",
      "un resume avec les points principaux de chaque section",
      "les points qui exigent une decision",
      "une copie du document",
      "un avis juridique final",
      "un commentaire aleatoire"
    ],
    "Les resumes en niveaux vous aident a passer de la surcharge d'information a une clarte exploitable."
  ),
  textStep(
    "Identifier les Clauses et les Points de Risque",
    "Dans les contrats et documents formels, les risques peuvent etre caches dans un langage technique ou juridique. Claude aide a localiser ces clauses, a les expliquer simplement et a suggerer des formulations plus equilibrees."
  ),
  fillStep(
    "Remplissez le vide - Cartographiez les risques du contrat !",
    "Structurez une demande pour trouver les clauses defavorables.",
    "\"Analyse ce contrat et identifie les clauses qui peuvent representer un risque ou un desavantage. Pour chacune, ___, ___, ___ et ___.\"",
    [
      "cite le passage",
      "explique-le en langage simple",
      "classe le risque",
      "suggere une redaction plus equilibree"
    ],
    [
      "cite le passage",
      "explique-le en langage simple",
      "classe le risque",
      "suggere une redaction plus equilibree",
      "ignore le contexte",
      "fais un pari",
      "decide pour moi"
    ],
    "Ce format aide Claude a transformer un langage technique en carte pratique des risques."
  ),
  textStep(
    "Extraire des Informations Specifiques",
    "Vous n'avez pas toujours besoin d'une analyse profonde de l'ensemble du document. Bien souvent, le plus utile est de localiser rapidement les informations qui orientent vraiment la decision."
  ),
  fillStep(
    "Remplissez le vide - Extrayez l'essentiel !",
    "Construisez une demande centree sur les informations cles du document.",
    "\"Lis le document et extrais seulement ces informations : ___, ___, ___, ___ et ___.\"",
    [
      "duree de validite",
      "obligations de chaque partie",
      "penalites",
      "conditions de paiement",
      "conditions de resiliation"
    ],
    [
      "duree de validite",
      "obligations de chaque partie",
      "penalites",
      "conditions de paiement",
      "conditions de resiliation",
      "couleur du logo",
      "opinion personnelle",
      "suppositions"
    ],
    "Une extraction objective accelere la lecture et vous garde concentre sur ce qui compte vraiment."
  ),
  textStep(
    "Comparer des Versions de Documents",
    "Lorsqu'il existe deux versions d'un contrat ou d'une proposition, Claude peut comparer les changements clairement. Cela facilite la detection de ce qui a ete ameliore, degrade ou laisse tel quel."
  ),
  fillStep(
    "Remplissez le vide - Comparez les versions !",
    "Construisez un prompt pour comparer deux versions d'un meme document.",
    "\"Compare ces deux versions du document et presente les differences en mettant en avant ___, ___, ___ et ___.\"",
    [
      "ce qui a change",
      "ce qui est devenu plus favorable",
      "ce qui est devenu moins favorable",
      "ce qui est reste identique"
    ],
    [
      "ce qui a change",
      "ce qui est devenu plus favorable",
      "ce qui est devenu moins favorable",
      "ce qui est reste identique",
      "ce qui semble plus joli",
      "ce que je veux entendre",
      "ce qui peut etre ignore"
    ],
    "Une comparaison structuree vous aide a voir l'impact reel, pas seulement les differences de formulation."
  ),
  textStep(
    "Traduire le Langage Technique et Juridique",
    "Les documents formels utilisent souvent des termes difficiles pour les personnes exterieures au domaine. Claude peut reecrire ces passages en langage accessible sans changer le sens initial, ce qui facilite fortement la comprehension."
  ),
  fillStep(
    "Remplissez le vide - Simplifiez le langage juridique !",
    "Demandez une version plus claire sans perdre en precision.",
    "\"Reecris les passages ci-dessous en ___, comme si tu les expliquais a quelqu'un sans connaissance technique. ___ et ___.\"",
    [
      "langage simple et direct",
      "preserve le sens original",
      "mets en avant toute clause qui merite de l'attention"
    ],
    [
      "langage simple et direct",
      "preserve le sens original",
      "mets en avant toute clause qui merite de l'attention",
      "langage vague",
      "change le sens",
      "cache les risques"
    ],
    "Simplifier sans deformer le contenu est l'une des facons les plus pratiques d'utiliser Claude avec des documents denses."
  ),
  textStep(
    "Poser des Questions Directes sur le Document",
    "Une fois que Claude a lu le document, vous pouvez explorer des scenarios avec des questions directes. Les questions sur le retard de paiement, les penalites ou les conditions de sortie transforment la lecture passive en comprehension pratique."
  ),
  textStep(
    "Analyser des Rapports Techniques et Financiers",
    "Claude n'est pas utile uniquement pour les contrats. Il aide aussi a interpreter des rapports longs en identifiant les signaux importants, les incoherences et les points qui demandent un suivi plus rapide."
  ),
  fillStep(
    "Remplissez le vide - Lisez le rapport avec focus !",
    "Construisez une demande d'analyse pour un rapport technique ou financier.",
    "\"Analyse ce rapport et identifie ___, ___, ___ et ___.\"",
    [
      "les principaux indicateurs",
      "les incoherences",
      "les tendances preoccupantes",
      "les points qui exigent une action immediate"
    ],
    [
      "les principaux indicateurs",
      "les incoherences",
      "les tendances preoccupantes",
      "les points qui exigent une action immediate",
      "les plus belles phrases",
      "des suppositions sans base",
      "un resume amusant"
    ],
    "Cette demande oriente l'analyse vers ce qui soutient vraiment le suivi et la prise de decision."
  ),
  textStep(
    "La Regle d'Or",
    "Claude est excellent pour resumer, organiser, interpreter et mettre en evidence les points critiques dans des documents longs. Mais il ne remplace pas la validation d'un specialiste pour des decisions a impact juridique, financier ou technique. Utilisez Claude comme premiere couche d'analyse puis validez les points importants avec un professionnel responsable."
  ),
  quizStep(
    "Ce que Claude ne remplace pas",
    "Meme si Claude est tres bon avec les documents longs, qu'est-ce qu'il ne remplace pas ?",
    [
      "La validation par un specialiste pour les decisions a impact juridique, financier ou technique.",
      "La lecture initiale d'un document.",
      "La comparaison entre deux versions d'un texte.",
      "La traduction d'un langage technique vers quelque chose de plus simple."
    ],
    0,
    "Claude aide beaucoup dans la premiere analyse, mais les decisions importantes ont encore besoin d'une validation professionnelle."
  ),
  textStep(
    "Conclusion",
    "Avec Claude, la lecture de documents longs cesse d'etre un processus fatigant et devient une analyse plus claire et plus strategique. Vous pouvez resumer, localiser des informations, comparer des versions, comprendre des clauses complexes et poser des questions directes sur le contenu dans une seule conversation.\n\nLecon terminee."
  ),
] as const;
