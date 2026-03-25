const AI_TRAIL_LANGS = ["pt", "en", "es", "fr", "de", "it", "ru", "zh", "ja", "ko", "ar", "hi", "tr", "pl", "nl"] as const;

type AiTrailLang = (typeof AI_TRAIL_LANGS)[number];

interface AiTrailUiCopy {
  comingSoon: string;
  availableNow: string;
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
  openTrail: string;
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
  availableNow: "Live now",
  toastTitle: "Coming soon",
  toastDescription: "We are fine-tuning this specialized trail for you. It will be available very soon!",
  backToDashboard: "Back to dashboard",
  dashboardEyebrow: "Trails by AI",
  dashboardTitle: "8 specialized trails",
  dashboardButton: "See trails",
  dashboardCardAction: "Notify me",
  challengeEyebrow: "Outside the beginner trail",
  challengeTitle: "Each AI will have its own trail",
  challengeButton: "See AI trails",
  hubBadge: "Trails by AI",
  hubTitle: "8 focused trails, 1 for each selected AI.",
  hubTotalLabel: "Total",
  hubTotalValue: "8 trails",
  hubFormatLabel: "Format",
  hubFormatValue: "Compact",
  hubAtlasLabel: "Specialization atlas",
  hubChooseTitle: "Choose your AI",
  hubCatalogLabel: "Catalog",
  hubCatalogTitle: "Choose an AI",
  modulesLabel: "Modules",
  lessonsLabel: "Lessons",
  seeLater: "See later",
  openTrail: "Open trail",
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
  availableNow: "Disponivel",
  toastTitle: "Em breve",
  toastDescription: "Estamos finalizando os detalhes desta trilha para você. Ela estará disponível muito em breve!",
  backToDashboard: "Voltar ao dashboard",
  dashboardEyebrow: "Trilhas por IA",
  dashboardTitle: "8 trilhas especializadas",
  dashboardButton: "Ver trilhas",
  dashboardCardAction: "Avisar",
  challengeEyebrow: "Fora da trilha iniciante",
  challengeTitle: "Cada IA tera sua propria trilha",
  challengeButton: "Ver trilhas por IA",
  hubBadge: "Trilhas por IA",
  hubTitle: "8 trilhas focadas, 1 para cada IA selecionada.",
  hubTotalLabel: "Total",
  hubTotalValue: "8 trilhas",
  hubFormatLabel: "Formato",
  hubFormatValue: "Compacto",
  hubAtlasLabel: "Atlas de especializacao",
  hubChooseTitle: "Escolha sua IA",
  hubCatalogLabel: "Catalogo",
  hubCatalogTitle: "Escolha uma IA",
  modulesLabel: "Modulos",
  lessonsLabel: "Aulas",
  seeLater: "Ver depois",
  openTrail: "Abrir trilha",
  pageCategoryFallback: "Trilha por IA",
  pageDescription: "Estamos finalizando esta trilha com todo cuidado para entregar a melhor experiencia para voce. Em breve, o acesso sera liberado com conteudo completo.",
  pageBuildTitle: "Conteudo em montagem",
  pageBuildDesc: "Estamos organizando aulas, modulos e entregas dessa IA antes de liberar o acesso.",
  pageLockedTitle: "Acesso fechado por enquanto",
  pageLockedDesc: "Quando essa trilha estiver pronta, ela vai aparecer no app com acesso normal.",
  pageUnderstand: "Entendi",
};

const ES_UI: AiTrailUiCopy = {
  comingSoon: "Proximamente",
  availableNow: "Disponible",
  toastTitle: "Proximamente",
  toastDescription: "Estamos ultimando los detalles de esta ruta para ti. ¡Estará disponible muy pronto!",
  backToDashboard: "Volver al dashboard",
  dashboardEyebrow: "Rutas por IA",
  dashboardTitle: "8 rutas especializadas",
  dashboardButton: "Ver rutas",
  dashboardCardAction: "Avisarme",
  challengeEyebrow: "Fuera de la ruta inicial",
  challengeTitle: "Cada IA tendra su propia ruta",
  challengeButton: "Ver rutas por IA",
  hubBadge: "Rutas por IA",
  hubTitle: "8 rutas enfocadas, 1 para cada IA seleccionada.",
  hubTotalLabel: "Total",
  hubTotalValue: "8 rutas",
  hubFormatLabel: "Formato",
  hubFormatValue: "Compacto",
  hubAtlasLabel: "Atlas de especializacion",
  hubChooseTitle: "Elige tu IA",
  hubCatalogLabel: "Catalogo",
  hubCatalogTitle: "Elige una IA",
  modulesLabel: "Modulos",
  lessonsLabel: "Lecciones",
  seeLater: "Ver despues",
  openTrail: "Abrir ruta",
  pageCategoryFallback: "Ruta de IA",
  pageDescription: "Esta ruta todavia se esta preparando. El diseno ya esta reservado, pero el acceso se liberara pronto.",
  pageBuildTitle: "Contenido en preparacion",
  pageBuildDesc: "Estamos organizando lecciones, modulos y entregables de esta IA antes de abrir el acceso.",
  pageLockedTitle: "Acceso cerrado por ahora",
  pageLockedDesc: "Cuando esta ruta este lista, aparecera en la app con acceso normal.",
  pageUnderstand: "Entendido",
};

const FR_UI: AiTrailUiCopy = {
  comingSoon: "Bientot",
  availableNow: "Disponible",
  toastTitle: "Bientot",
  toastDescription: "Nous finalisons les détails de ce parcours pour vous. Il sera disponible très bientôt !",
  backToDashboard: "Retour au dashboard",
  dashboardEyebrow: "Parcours par IA",
  dashboardTitle: "8 parcours specialises",
  dashboardButton: "Voir les parcours",
  dashboardCardAction: "Me prevenir",
  challengeEyebrow: "En dehors du parcours debutant",
  challengeTitle: "Chaque IA aura son propre parcours",
  challengeButton: "Voir les parcours IA",
  hubBadge: "Parcours par IA",
  hubTitle: "8 parcours cibles, 1 pour chaque IA selectionnee.",
  hubTotalLabel: "Total",
  hubTotalValue: "8 parcours",
  hubFormatLabel: "Format",
  hubFormatValue: "Compact",
  hubAtlasLabel: "Atlas de specialisation",
  hubChooseTitle: "Choisis ton IA",
  hubCatalogLabel: "Catalogue",
  hubCatalogTitle: "Choisis une IA",
  modulesLabel: "Modules",
  lessonsLabel: "Lecons",
  seeLater: "Voir plus tard",
  openTrail: "Ouvrir le parcours",
  pageCategoryFallback: "Parcours IA",
  pageDescription: "Ce parcours est encore en preparation. Le design est reserve, mais l'acces sera bientot ouvert.",
  pageBuildTitle: "Contenu en construction",
  pageBuildDesc: "Nous organisons encore les lecons, les modules et les livrables de cette IA avant l'ouverture.",
  pageLockedTitle: "Acces ferme pour le moment",
  pageLockedDesc: "Quand ce parcours sera pret, il apparaitra dans l'app avec un acces normal.",
  pageUnderstand: "Compris",
};

const UI_COPY_BY_LANG: Record<AiTrailLang, AiTrailUiCopy> = {
  en: EN_UI,
  pt: PT_UI,
  es: ES_UI,
  fr: FR_UI,
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
    grok: { category: "Tempo real e leitura de cenario", signature: "Contexto vivo para agir mais rapido." },
    lovable: { category: "Apps e produtos", signature: "Da ideia ao prototipo navegavel." },
    midjourney: { category: "Arte e direcao visual", signature: "Imagem com intencao e assinatura." },
    gamma: { category: "Apresentacoes e narrativa visual", signature: "Ideias melhor embaladas vendem mais." },
  },
  en: {
    chatgpt: { category: "Text, prompts, and operations", signature: "From loose prompts to a repeatable system." },
    claude: { category: "Analysis and reasoning", signature: "Think better before you execute." },
    deepseek: { category: "Code and logic", signature: "Technical thinking with more depth." },
    gemini: { category: "Google and multimodal", signature: "Everything speaks to everything." },
    grok: { category: "Real-time signals", signature: "Live context to move faster." },
    lovable: { category: "Apps and products", signature: "From idea to navigable prototype." },
    midjourney: { category: "Art and visual direction", signature: "Image with intention and signature." },
    gamma: { category: "Presentations and visual storytelling", signature: "Better packaged ideas sell better." },
  },
  es: {
    chatgpt: { category: "Texto, prompts y operaciones", signature: "Del prompt suelto al sistema repetible." },
    claude: { category: "Analisis y razonamiento", signature: "Pensar mejor antes de ejecutar." },
    deepseek: { category: "Código y lógica", signature: "Pensamiento técnico con más profundidad." },
    gemini: { category: "Google y multimodal", signature: "Todo conversa con todo." },
    grok: { category: "Tiempo real y lectura de contexto", signature: "Contexto vivo para actuar mas rapido." },
    lovable: { category: "Apps y productos", signature: "De la idea al prototipo navegable." },
    midjourney: { category: "Arte y direccion visual", signature: "Imagen con intencion y firma." },
    gamma: { category: "Presentaciones y narrativa visual", signature: "Las ideas mejor empaquetadas venden mas." },
  },
  fr: {
    chatgpt: { category: "Texte, prompts et operations", signature: "Du prompt isole au systeme repetable." },
    claude: { category: "Analyse et raisonnement", signature: "Mieux penser avant d'executer." },
    deepseek: { category: "Code et logique", signature: "Une pensée technique plus profonde." },
    gemini: { category: "Google et multimodal", signature: "Tout parle avec tout." },
    grok: { category: "Temps reel et lecture de contexte", signature: "Du contexte vivant pour agir plus vite." },
    lovable: { category: "Apps et produits", signature: "De l'idee au prototype navigable." },
    midjourney: { category: "Art et direction visuelle", signature: "Image avec intention et signature." },
    gamma: { category: "Presentations et narration visuelle", signature: "Les idees mieux emballees se vendent mieux." },
  },
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
