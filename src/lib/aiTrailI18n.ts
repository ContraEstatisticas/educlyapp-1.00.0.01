const AI_TRAIL_LANGS = ["pt", "en", "es", "fr", "de", "it", "ru", "zh", "ja", "ko", "ar", "hi", "tr", "pl", "nl"] as const;

type AiTrailLang = (typeof AI_TRAIL_LANGS)[number];

interface AiTrailUiCopy {
  comingSoon: string;
  toastTitle: string;
  toastDescription: string;
  backToDashboard: string;
  dashboardEyebrow: string;
  dashboardTitle: string;
  dashboardButton: string;
  dashboardCardAction: string;
  challengeEyebrow: string;
  challengeTitle: string;
  challengeButton: string;
  hubBadge: string;
  hubTitle: string;
  hubTotalLabel: string;
  hubTotalValue: string;
  hubFormatLabel: string;
  hubFormatValue: string;
  hubAtlasLabel: string;
  hubChooseTitle: string;
  hubCatalogLabel: string;
  hubCatalogTitle: string;
  modulesLabel: string;
  lessonsLabel: string;
  seeLater: string;
  pageCategoryFallback: string;
  pageDescription: string;
  pageBuildTitle: string;
  pageBuildDesc: string;
  pageLockedTitle: string;
  pageLockedDesc: string;
  pageUnderstand: string;
}

interface TrailMetaCopy {
  category: string;
  signature: string;
}

const EN_UI: AiTrailUiCopy = {
  comingSoon: "Coming soon",
  toastTitle: "Coming soon",
  toastDescription: "These specialized AI trails will be released soon.",
  backToDashboard: "Back to dashboard",
  dashboardEyebrow: "Trails by AI",
  dashboardTitle: "15 separate trails",
  dashboardButton: "See trails",
  dashboardCardAction: "Notify me",
  challengeEyebrow: "Outside the beginner trail",
  challengeTitle: "Each AI will have its own trail",
  challengeButton: "See AI trails",
  hubBadge: "Trails by AI",
  hubTitle: "15 trails, 1 for each AI.",
  hubTotalLabel: "Total",
  hubTotalValue: "15 trails",
  hubFormatLabel: "Format",
  hubFormatValue: "Compact",
  hubAtlasLabel: "Specialization atlas",
  hubChooseTitle: "Choose your AI",
  hubCatalogLabel: "Catalog",
  hubCatalogTitle: "Choose an AI",
  modulesLabel: "Modules",
  lessonsLabel: "Lessons",
  seeLater: "See later",
  pageCategoryFallback: "AI trail",
  pageDescription: "This trail is still being prepared. The design is reserved, but access will be released soon.",
  pageBuildTitle: "Content in progress",
  pageBuildDesc: "We are organizing lessons, modules, and deliverables for this AI before opening access.",
  pageLockedTitle: "Access is closed for now",
  pageLockedDesc: "When this trail is ready, it will appear in the app with normal access.",
  pageUnderstand: "Got it",
};

const PT_UI: AiTrailUiCopy = {
  comingSoon: "Em breve",
  toastTitle: "Em breve",
  toastDescription: "As trilhas especializadas por IA vao entrar no ar em breve.",
  backToDashboard: "Voltar ao dashboard",
  dashboardEyebrow: "Trilhas por IA",
  dashboardTitle: "15 trilhas separadas",
  dashboardButton: "Ver trilhas",
  dashboardCardAction: "Avisar",
  challengeEyebrow: "Fora da trilha iniciante",
  challengeTitle: "Cada IA tera sua propria trilha",
  challengeButton: "Ver trilhas por IA",
  hubBadge: "Trilhas por IA",
  hubTitle: "15 trilhas, 1 para cada IA.",
  hubTotalLabel: "Total",
  hubTotalValue: "15 trilhas",
  hubFormatLabel: "Formato",
  hubFormatValue: "Compacto",
  hubAtlasLabel: "Atlas de especializacao",
  hubChooseTitle: "Escolha sua IA",
  hubCatalogLabel: "Catalogo",
  hubCatalogTitle: "Escolha uma IA",
  modulesLabel: "Modulos",
  lessonsLabel: "Aulas",
  seeLater: "Ver depois",
  pageCategoryFallback: "Trilha por IA",
  pageDescription: "Essa trilha ainda esta em preparacao. O design ja foi reservado, mas o acesso vai ser liberado em breve.",
  pageBuildTitle: "Conteudo em montagem",
  pageBuildDesc: "Estamos organizando aulas, modulos e entregas dessa IA antes de liberar o acesso.",
  pageLockedTitle: "Acesso fechado por enquanto",
  pageLockedDesc: "Quando essa trilha estiver pronta, ela vai aparecer no app com acesso normal.",
  pageUnderstand: "Entendi",
};

const ES_UI: AiTrailUiCopy = {
  comingSoon: "Proximamente",
  toastTitle: "Proximamente",
  toastDescription: "Las rutas especializadas por IA estaran disponibles pronto.",
  backToDashboard: "Volver al dashboard",
  dashboardEyebrow: "Rutas por IA",
  dashboardTitle: "15 rutas separadas",
  dashboardButton: "Ver rutas",
  dashboardCardAction: "Avisarme",
  challengeEyebrow: "Fuera de la ruta inicial",
  challengeTitle: "Cada IA tendra su propia ruta",
  challengeButton: "Ver rutas por IA",
  hubBadge: "Rutas por IA",
  hubTitle: "15 rutas, 1 para cada IA.",
  hubTotalLabel: "Total",
  hubTotalValue: "15 rutas",
  hubFormatLabel: "Formato",
  hubFormatValue: "Compacto",
  hubAtlasLabel: "Atlas de especializacion",
  hubChooseTitle: "Elige tu IA",
  hubCatalogLabel: "Catalogo",
  hubCatalogTitle: "Elige una IA",
  modulesLabel: "Modulos",
  lessonsLabel: "Lecciones",
  seeLater: "Ver despues",
  pageCategoryFallback: "Ruta de IA",
  pageDescription: "Esta ruta todavia se esta preparando. El diseno ya esta reservado, pero el acceso se liberara pronto.",
  pageBuildTitle: "Contenido en preparacion",
  pageBuildDesc: "Estamos organizando lecciones, modulos y entregables de esta IA antes de abrir el acceso.",
  pageLockedTitle: "Acceso cerrado por ahora",
  pageLockedDesc: "Cuando esta ruta este lista, aparecera en la app con acceso normal.",
  pageUnderstand: "Entendido",
};

const UI_COPY_BY_LANG: Record<AiTrailLang, AiTrailUiCopy> = {
  en: EN_UI,
  pt: PT_UI,
  es: ES_UI,
  fr: EN_UI,
  de: EN_UI,
  it: EN_UI,
  ru: EN_UI,
  zh: EN_UI,
  ja: EN_UI,
  ko: EN_UI,
  ar: EN_UI,
  hi: EN_UI,
  tr: EN_UI,
  pl: EN_UI,
  nl: EN_UI,
};

const TRAIL_META_BY_LANG: Record<AiTrailLang, Record<string, TrailMetaCopy>> = {
  pt: {
    chatgpt: { category: "Texto, prompts e operacoes", signature: "Do prompt solto ao sistema replicavel." },
    claude: { category: "Analise e raciocinio", signature: "Pensar melhor antes de executar." },
    deepseek: { category: "Codigo e logica", signature: "Pensamento tecnico com mais profundidade." },
    gemini: { category: "Google e multimodal", signature: "Tudo conversa com tudo." },
    copilot: { category: "Produtividade corporativa", signature: "Menos friccao, mais entrega." },
    grok: { category: "Tempo real e leitura de cenario", signature: "Contexto vivo para agir mais rapido." },
    perplexity: { category: "Pesquisa com fontes", signature: "Buscar melhor antes de concluir." },
    manus: { category: "Agentes autonomos", signature: "Delegar bem muda o jogo." },
    lovable: { category: "Apps e produtos", signature: "Da ideia ao prototipo navegavel." },
    nanobanana: { category: "Criacao visual", signature: "Criar rapido sem perder identidade." },
    leonardo: { category: "Design de imagens", signature: "Imagem util, nao so bonita." },
    midjourney: { category: "Arte e direcao visual", signature: "Imagem com intencao e assinatura." },
    captions: { category: "Video curto", signature: "Velocidade com retencao." },
    elevenlabs: { category: "Voz e narracao", signature: "Sua mensagem com timbre e presenca." },
    veo: { category: "Video com IA", signature: "Da cena imaginada ao frame dirigido." },
  },
  en: {
    chatgpt: { category: "Text, prompts, and operations", signature: "From loose prompts to a repeatable system." },
    claude: { category: "Analysis and reasoning", signature: "Think better before you execute." },
    deepseek: { category: "Code and logic", signature: "Technical thinking with more depth." },
    gemini: { category: "Google and multimodal", signature: "Everything speaks to everything." },
    copilot: { category: "Corporate productivity", signature: "Less friction, more delivery." },
    grok: { category: "Real-time signals", signature: "Live context to move faster." },
    perplexity: { category: "Source-based research", signature: "Research better before you conclude." },
    manus: { category: "Autonomous agents", signature: "Delegating well changes the game." },
    lovable: { category: "Apps and products", signature: "From idea to navigable prototype." },
    nanobanana: { category: "Visual creation", signature: "Create fast without losing identity." },
    leonardo: { category: "Image design", signature: "Useful images, not just pretty ones." },
    midjourney: { category: "Art and visual direction", signature: "Image with intention and signature." },
    captions: { category: "Short-form video", signature: "Speed with retention." },
    elevenlabs: { category: "Voice and narration", signature: "Your message with tone and presence." },
    veo: { category: "AI video", signature: "From imagined scene to directed frame." },
  },
  es: {
    chatgpt: { category: "Texto, prompts y operaciones", signature: "Del prompt suelto al sistema repetible." },
    claude: { category: "Analisis y razonamiento", signature: "Pensar mejor antes de ejecutar." },
    deepseek: { category: "Codigo y logica", signature: "Pensamiento tecnico con mas profundidad." },
    gemini: { category: "Google y multimodal", signature: "Todo conversa con todo." },
    copilot: { category: "Productividad corporativa", signature: "Menos friccion, mas entrega." },
    grok: { category: "Tiempo real y lectura de contexto", signature: "Contexto vivo para actuar mas rapido." },
    perplexity: { category: "Investigacion con fuentes", signature: "Investigar mejor antes de concluir." },
    manus: { category: "Agentes autonomos", signature: "Delegar bien cambia el juego." },
    lovable: { category: "Apps y productos", signature: "De la idea al prototipo navegable." },
    nanobanana: { category: "Creacion visual", signature: "Crear rapido sin perder identidad." },
    leonardo: { category: "Diseno de imagenes", signature: "Imagen util, no solo bonita." },
    midjourney: { category: "Arte y direccion visual", signature: "Imagen con intencion y firma." },
    captions: { category: "Video corto", signature: "Velocidad con retencion." },
    elevenlabs: { category: "Voz y narracion", signature: "Tu mensaje con timbre y presencia." },
    veo: { category: "Video con IA", signature: "De la escena imaginada al frame dirigido." },
  },
  fr: {} as Record<string, TrailMetaCopy>,
  de: {} as Record<string, TrailMetaCopy>,
  it: {} as Record<string, TrailMetaCopy>,
  ru: {} as Record<string, TrailMetaCopy>,
  zh: {} as Record<string, TrailMetaCopy>,
  ja: {} as Record<string, TrailMetaCopy>,
  ko: {} as Record<string, TrailMetaCopy>,
  ar: {} as Record<string, TrailMetaCopy>,
  hi: {} as Record<string, TrailMetaCopy>,
  tr: {} as Record<string, TrailMetaCopy>,
  pl: {} as Record<string, TrailMetaCopy>,
  nl: {} as Record<string, TrailMetaCopy>,
};

const normalizeAiTrailLanguage = (language?: string): AiTrailLang => {
  const baseLanguage = language?.split("-")[0]?.toLowerCase();
  return AI_TRAIL_LANGS.includes(baseLanguage as AiTrailLang) ? (baseLanguage as AiTrailLang) : "en";
};

export const getAiTrailUiCopy = (language?: string) => UI_COPY_BY_LANG[normalizeAiTrailLanguage(language)] || EN_UI;

export const getAiTrailLocalizedMeta = (
  slug: string,
  language?: string,
): TrailMetaCopy => {
  const normalizedLanguage = normalizeAiTrailLanguage(language);
  return (
    TRAIL_META_BY_LANG[normalizedLanguage]?.[slug] ||
    TRAIL_META_BY_LANG.en[slug] ||
    { category: "", signature: "" }
  );
};
