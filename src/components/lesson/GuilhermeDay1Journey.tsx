import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Bell,
  Bot,
  Brain,
  CircleHelp,
  Check,
  ChevronDown,
  ChevronRight,
  Compass,
  Database,
  FileText,
  Heart,
  Images,
  LayoutDashboard,
  Map,
  PencilRuler,
  Plus,
  Search,
  Settings2,
  Shield,
  Sparkles,
  Star,
  Target,
  UserRound,
  UsersRound,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";

import chatgptLogo from "@/assets/ai-logos/chatgpt.png";
import claudeLogo from "@/assets/ai-logos/claude.png";
import geminiLogo from "@/assets/ai-logos/gemini.png";
import copilotLogo from "@/assets/ai-logos/copilot.png";
import deepseekLogo from "@/assets/ai-logos/deepseek.png";
import perplexityLogo from "@/assets/ai-logos/perplexity.png";
import lovableLogo from "@/assets/ai-logos/lovable.png";
import nanobananaLogo from "@/assets/ai-logos/nanobanana.png";
import veoLogo from "@/assets/ai-logos/veo.png";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getGuilhermeDay1JourneyCopy, resolveGuilhermeJourneyLocale } from "@/components/lesson/guilhermeDay1JourneyCopy";
import { cn } from "@/lib/utils";

type SectionKey = "intro" | "map" | "personalize" | "practice";

interface GuilhermeDay1JourneyProps {
  section: SectionKey;
  learnerName?: string;
  onComplete: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const outcomeCards = [
  {
    icon: PencilRuler,
    title: "Textos e comunicação",
    description:
      "E-mails, posts, artigos, legendas, roteiros e traduções. Tudo que envolve escrever, a IA faz mais rápido e muitas vezes melhor do que gastar horas na frente de uma tela em branco.",
    palette: "border-sky-200 bg-sky-50/90 text-sky-700",
  },
  {
    icon: Images,
    title: "Imagens e vídeos",
    description:
      "Artes para redes sociais, logos, thumbnails, ilustrações e vídeos infográficos. Mesmo que você nunca tenha aberto o Photoshop, a IA gera visuais profissionais.",
    palette: "border-rose-200 bg-rose-50/90 text-rose-700",
  },
  {
    icon: LayoutDashboard,
    title: "Planilhas e dados",
    description:
      "Controles financeiros, gráficos, dashboards e fórmulas automáticas. Você descreve o que precisa em português e a IA monta a planilha pronta.",
    palette: "border-emerald-200 bg-emerald-50/90 text-emerald-700",
  },
  {
    icon: FileText,
    title: "Documentos e apresentações",
    description:
      "Slides profissionais, PDFs formatados, propostas comerciais e ebooks. Tudo que você precisa apresentar ou entregar para alguém.",
    palette: "border-violet-200 bg-violet-50/90 text-violet-700",
  },
  {
    icon: Bot,
    title: "Automações do dia a dia",
    description:
      "Resumos automáticos, traduções rápidas, reorganização de informações e análise de textos longos. Tarefas que tomam tempo e que a IA resolve em segundos.",
    palette: "border-amber-200 bg-amber-50/90 text-amber-700",
  },
] as const;

const aiToolCards = [
  {
    name: "ChatGPT (OpenAI)",
    logo: chatgptLogo,
    palette: "border-emerald-200 bg-emerald-50/80",
    bulletPalette: "bg-emerald-500",
    bullets: [
      "O mais popular e versátil do mercado",
      "Ótimo para conversas longas e criação de textos",
      "Gera imagens com o DALL-E integrado",
      "Tem modo de voz para conversar falando",
      "Navega na internet em tempo real",
      "Milhares de GPTs personalizados prontos para usar",
    ],
  },
  {
    name: "Claude (Anthropic)",
    logo: claudeLogo,
    palette: "border-orange-200 bg-orange-50/80",
    bulletPalette: "bg-orange-500",
    bullets: [
      "Melhor para textos longos e análise de documentos",
      "Janela de contexto gigante entende documentos enormes",
      "Respostas mais naturais e menos robóticas",
      "Excelente para revisão, reescrita e copywriting",
      "Cria arquivos completos (PDFs, planilhas, apresentações)",
      "Permite criar Projetos com instruções fixas",
    ],
  },
  {
    name: "Gemini (Google)",
    logo: geminiLogo,
    palette: "border-blue-200 bg-blue-50/80",
    bulletPalette: "bg-blue-500",
    bullets: [
      "Integrado ao ecossistema Google (Gmail, Drive, Docs)",
      "Forte em pesquisa e informações atualizadas",
      "Entende imagens e vídeos muito bem",
      "Versão gratuita bastante completa",
      "Gera imagens e vídeos diretamente no chat",
      "Bom para resumir e-mails e organizar informações",
    ],
  },
  {
    name: "Copilot (Microsoft)",
    logo: copilotLogo,
    palette: "border-cyan-200 bg-cyan-50/80",
    bulletPalette: "bg-cyan-500",
    bullets: [
      "Integrado ao Word, Excel, PowerPoint e Outlook",
      "Ideal para quem já trabalha com ferramentas Microsoft",
      "Gera apresentações e planilhas dentro do Office",
      "Navega na internet com o Bing",
      "Bom para tarefas corporativas e produtividade no trabalho",
      "Versão gratuita disponível no Edge e no Bing",
    ],
  },
  {
    name: "DeepSeek",
    logo: deepseekLogo,
    palette: "border-slate-200 bg-slate-50/90",
    bulletPalette: "bg-slate-700",
    bullets: [
      "Modelo de código aberto com alta qualidade",
      "Gratuito e sem limites de uso",
      "Excelente para raciocínio lógico e matemática",
      "Forte em programação e código",
      "Respostas detalhadas e com raciocínio passo a passo",
      "Alternativa poderosa sem precisar pagar assinatura",
    ],
  },
  {
    name: "Perplexity",
    logo: perplexityLogo,
    palette: "border-zinc-200 bg-zinc-50/90",
    bulletPalette: "bg-zinc-700",
    bullets: [
      "Funciona como um buscador inteligente com IA",
      "Sempre mostra as fontes das informações",
      "Ideal para pesquisas e checagem de fatos",
      "Respostas atualizadas com dados da internet em tempo real",
      "Interface simples e direta sem enrolação",
      "Ótimo para substituir buscas confusas no Google",
    ],
  },
  {
    name: "Lovable",
    logo: lovableLogo,
    palette: "border-fuchsia-200 bg-fuchsia-50/90",
    bulletPalette: "bg-fuchsia-500",
    bullets: [
      "Cria sites e aplicativos completos sem saber programar",
      "Você descreve o que quer em português e a IA constrói tudo",
      "Inclui banco de dados, login de usuário e pagamentos",
      "Publica o app online com um clique sem configurar nada",
      "Ideal para criar MVPs, portfólios, landing pages e ferramentas internas",
      "Código exportável para o GitHub se quiser evoluir com um programador",
    ],
  },
  {
    name: "Nano Banana (Google)",
    logo: nanobananaLogo,
    palette: "border-yellow-200 bg-yellow-50/90",
    bulletPalette: "bg-yellow-500",
    bullets: [
      "Editor de imagens por texto: descreva a edição e a IA faz",
      "Mantém consistência de personagens entre várias edições",
      "Preserva o cenário original enquanto aplica mudanças pontuais",
      "Ótimo para criar figurinhas, memes e artes para redes sociais",
      "Baseado no Gemini com qualidade alta e geração rápida",
      "Disponível gratuitamente com créditos diários",
    ],
  },
  {
    name: "Veo (Google)",
    logo: veoLogo,
    palette: "border-rose-200 bg-rose-50/90",
    bulletPalette: "bg-rose-500",
    bullets: [
      "Gera vídeos a partir de texto: descreva a cena e a IA cria",
      "Produz vídeos de até 8 segundos em alta qualidade (1080p)",
      "Gera áudio nativo junto com o vídeo (efeitos sonoros e diálogos)",
      "Entende linguagem cinematográfica (plano aéreo, câmera lenta, close)",
      "Disponível no Gemini e no Google AI Studio",
      "Ideal para protótipos de vídeo, reels e conteúdo visual rápido",
    ],
  },
] as const;

const MAP_BULLET_REVEAL_INTERVAL_MS = 500;

const chatGptPanels = {
  estilo: {
    title: "Estilo e tom básicos",
    description:
      "Aqui a pessoa escolhe o estilo geral da conversa. Exemplo: mais direto, mais criativo, mais didático, mais profissional.",
  },
  caracteristicas: {
    title: "Características",
    description:
      "Aqui ela informa quem é, com o que trabalha, seu nível de experiência e para que usa o ChatGPT. Isso ajuda a IA a responder de forma mais alinhada à realidade dela.",
  },
  respostas: {
    title: "Como quer as respostas",
    description:
      "Defina o tom, o formato e as preferências. Exemplo: responda de forma direta, sem enrolação, use exemplos práticos e organize em tópicos curtos quando possível.",
  },
  memoria: {
    title: "Memória",
    description:
      "O ChatGPT também tem um recurso de memória que aprende sobre você ao longo das conversas. Você pode ver e editar o que ele lembra em Configurações > Personalização > Memória.",
  },
} as const;

const chatGptSettingsMenu = [
  { id: "geral", label: "Geral", icon: Settings2 },
  { id: "notificacoes", label: "Notificações", icon: Bell },
  { id: "personalizacao", label: "Personalização", icon: Sparkles },
  { id: "apps", label: "Apps", icon: LayoutDashboard },
  { id: "dados", label: "Controles de dados", icon: Database },
  { id: "seguranca", label: "Segurança", icon: Shield },
  { id: "parental", label: "Controles parentais", icon: UsersRound },
  { id: "conta", label: "Conta", icon: UserRound },
] as const;

const claudePanels = {
  perfil: {
    title: "Preferências de perfil",
    description:
      "Descreva quem é, sua área, idioma preferido e como quer que o Claude responda. Exemplo: Sou professor de história, trabalho com ensino médio. Prefiro respostas claras, com exemplos do cotidiano, em português.",
  },
  projetos: {
    title: "Projetos",
    description:
      "No Claude, você pode criar Projetos com instruções fixas. Tudo que você conversar dentro de um projeto já segue as regras que você definiu. Ideal para separar trabalho pessoal de profissional.",
  },
  estilos: {
    title: "Estilos de resposta",
    description:
      "O Claude permite escolher entre estilos de escrita diferentes (formal, conciso, explicativo). Você também pode criar o seu próprio estilo personalizado.",
  },
} as const;

const exerciseOneOptions = [
  {
    id: "a",
    text: "Não existe diferença. A IA sempre entende o que você quer.",
    isCorrect: false,
  },
  {
    id: "b",
    text: "O prompt vago faz a IA travar e não responder nada.",
    isCorrect: false,
  },
  {
    id: "c",
    text: "O prompt específico dá contexto e detalhes, o que permite à IA gerar uma resposta muito mais útil e alinhada com o que você precisa.",
    isCorrect: true,
  },
  {
    id: "d",
    text: "O prompt específico serve só para tarefas de programação, não para textos comuns.",
    isCorrect: false,
  },
] as const;

const exerciseThreeLegend = [
  { id: "A", label: "Textos longos e análise de documentos" },
  { id: "B", label: "Geração de vídeos a partir de texto" },
  { id: "C", label: "Pesquisa com fontes em tempo real" },
  { id: "D", label: "Edição de imagens por comandos de texto" },
  { id: "E", label: "Criação de sites e apps sem programar" },
] as const;

const exerciseThreePairs = [
  { id: "perplexity", label: "1. Perplexity", correct: "C" },
  { id: "claude", label: "2. Claude", correct: "A" },
  { id: "lovable", label: "3. Lovable", correct: "E" },
  { id: "veo", label: "4. Veo", correct: "B" },
  { id: "nanobanana", label: "5. Nano Banana", correct: "D" },
] as const;

const templateLines = [
  "SOBRE MIM:",
  "- Meu nome é [seu nome]",
  "- Trabalho como [sua profissão ou área]",
  "- Meu público é [descreva seu público ou clientes]",
  "- Meu nível com tecnologia é [iniciante, intermediário ou avançado]",
  "- Uso a IA principalmente para [liste 2 ou 3 usos principais]",
  "",
  "COMO QUERO AS RESPOSTAS:",
  "- Tom: [direto, amigável, profissional, casual]",
  "- Formato preferido: [tópicos curtos, parágrafos, tabelas]",
  "- Idioma: [português do Brasil]",
  "- Evite: [jargão técnico, respostas longas demais, etc.]",
  "- Sempre: [dê exemplos práticos, pergunte antes de assumir, etc.]",
] as const;

const SIMULATED_UI_COPY = {
  pt: {
    chatgpt: {
      homeScreen: "Tela inicial",
      sidebarItems: ["Novo chat", "Procurar chats", "Imagens", "Apps", "Investigar a fundo", "Saúde"],
      plans: "Ver planos e preços",
      settings: "Definições",
      help: "Ajuda",
      simulationBadge: "Simulacao guiada",
      simulationTitle: "Esta tela e uma simulacao.",
      simulationDescription:
        "Use esta demonstracao para entender o caminho. Depois, repita esses passos no seu proprio ChatGPT.",
      personalizedAnswersTitle: "Obtenha respostas personalizadas",
      personalizedAnswersDescription:
        "Clique para abrir as definições e configurar o ChatGPT do seu jeito.",
      signIn: "Iniciar sessão",
      signUp: "Aderir gratuitamente",
      homeTitle: "Por onde devemos começar?",
      askAnything: "Pergunte qualquer coisa",
      voice: "Voz",
      settingsHint:
        "Isto e uma simulacao guiada. Clique em Definicoes aqui para entender o fluxo e depois faca o mesmo no seu proprio ChatGPT.",
      footerTerms:
        "Ao enviar mensagens ao ChatGPT, um chatbot de IA, concorda com os termos e com a política de privacidade.",
      settingsTitle: "Personalização",
      settingsMenu: [
        "Geral",
        "Notificações",
        "Personalização",
        "Apps",
        "Controles de dados",
        "Segurança",
        "Controles parentais",
        "Conta",
      ],
      traits: ["Simpático", "Entusiasta", "Cabeçalhos e listas", "Emoji"],
      preset: "Predefinição",
      customInstructionsLabel: "Instruções personalizadas",
      customInstructionsValue: "Preferências adicionais de comportamento, estilo e tom",
      aboutYouTitle: "Sobre si",
      edit: "Editar",
      nicknameLabel: "Alcunha",
      nicknameValue: "Como deve o ChatGPT dirigir-se a si?",
      professionLabel: "Profissão",
      professionValue: "Advogado de direito da família",
      moreAboutYouLabel: "Mais sobre si",
      moreAboutYouValue: "Interesses, valores ou preferências a ter em conta",
      manage: "Gerir",
      memoryItems: [
        {
          title: "Fazer referência a memórias guardadas",
          description: "Permite que o ChatGPT guarde e use memórias ao responder.",
        },
        {
          title: "Fazer referência ao histórico de chat",
          description: "Permitir que o ChatGPT faça referência a conversas recentes ao responder.",
        },
      ],
      tip:
        "Dica: personalize uma vez e depois teste um pedido real. A diferença costuma aparecer logo na primeira resposta.",
    },
    claude: {
      sideActions: ["Novo", "Buscar", "Escrever", "Aprender", "Apps", "Código"],
      freePlan: "plano Gratuito",
      upgrade: "Fazer Upgrade",
      promptPlaceholder: "Como posso ajudar você hoje?",
      shortcuts: ["Escrever", "Aprender", "Código", "Assuntos pessoais", "Do Drive"],
      simulationBadge: "Simulacao guiada",
      simulationTitle: "Esta tela e uma simulacao.",
      simulationDescription:
        "Use esta demonstracao apenas como referencia visual. Depois, abra o seu proprio Claude e repita esse processo por la.",
      profileHint:
        "Isto e uma simulacao guiada. Clique no perfil aqui para entender o fluxo e depois repita isso no seu proprio Claude.",
      settingsOpenedFromProfile: "Configurações abertas a partir do perfil.",
      profileMenu: ["Preferências de perfil", "Projetos", "Estilos de resposta"],
      flowLabel: (title: string) => `Fluxo: Perfil → Configurações → ${title}`,
      profileEyebrow: "Perfil",
      profileFields: {
        whoAreYouLabel: "Quem é você",
        whoAreYouValue: "Sou professor de história, trabalho com ensino médio.",
        preferredLanguageLabel: "Idioma preferido",
        preferredLanguageValue: "Português do Brasil",
        responseLabel: "Como quer as respostas",
        responseValue:
          "Prefiro respostas claras, com exemplos do cotidiano, em português. Sem formalidade excessiva.",
        profileTip:
          "Exemplo prático: conte sua área, seu público, seu idioma e o tom ideal das respostas. Isso já deixa o Claude muito mais alinhado com a sua rotina.",
      },
      projectCards: [
        {
          title: "Projeto trabalho",
          description: "Tudo o que você conversar aqui segue regras fixas para sua rotina profissional.",
        },
        {
          title: "Projeto pessoal",
          description: "Separe hobbies, estudos e tarefas pessoais com outro contexto e outro estilo.",
        },
      ],
      projectsTip:
        "Ideal para separar trabalho pessoal de profissional. Cada projeto pode guardar instruções fixas para você não repetir contexto toda hora.",
      styleOptions: ["Formal", "Conciso", "Explicativo", "Personalizado"],
      select: "Selecionar",
      customStyleValue:
        "Crie seu próprio estilo: respostas claras, objetivas, com exemplos e sem excesso de formalidade.",
      stylesTip:
        "Dica: ajuste uma dessas áreas e depois faça um teste real no Claude. Você vai perceber rapidamente a diferença no tom e no formato das respostas.",
    },
  },
  en: {
    chatgpt: {
      homeScreen: "Home screen",
      sidebarItems: ["New chat", "Search chats", "Images", "Apps", "Deep research", "Health"],
      plans: "View plans and pricing",
      settings: "Settings",
      help: "Help",
      simulationBadge: "Guided simulation",
      simulationTitle: "This screen is a simulation.",
      simulationDescription:
        "Use this demo to understand the path. Then repeat these steps in your own ChatGPT account.",
      personalizedAnswersTitle: "Get personalized answers",
      personalizedAnswersDescription:
        "Click to open settings and configure ChatGPT your way.",
      signIn: "Log in",
      signUp: "Sign up for free",
      homeTitle: "Where should we begin?",
      askAnything: "Ask anything",
      voice: "Voice",
      settingsHint:
        "This is a guided simulation. Click Settings here to understand the flow, then do the same in your own ChatGPT.",
      footerTerms:
        "By sending messages to ChatGPT, an AI chatbot, you agree to the terms and privacy policy.",
      settingsTitle: "Personalization",
      settingsMenu: [
        "General",
        "Notifications",
        "Personalization",
        "Apps",
        "Data controls",
        "Security",
        "Parental controls",
        "Account",
      ],
      traits: ["Friendly", "Enthusiastic", "Headings and lists", "Emoji"],
      preset: "Preset",
      customInstructionsLabel: "Custom instructions",
      customInstructionsValue: "Additional behavior, style, and tone preferences",
      aboutYouTitle: "About you",
      edit: "Edit",
      nicknameLabel: "Nickname",
      nicknameValue: "How should ChatGPT address you?",
      professionLabel: "Profession",
      professionValue: "Family law attorney",
      moreAboutYouLabel: "More about you",
      moreAboutYouValue: "Interests, values, or preferences to keep in mind",
      manage: "Manage",
      memoryItems: [
        {
          title: "Reference saved memories",
          description: "Allows ChatGPT to store and use memories while responding.",
        },
        {
          title: "Reference chat history",
          description: "Allows ChatGPT to reference recent conversations when responding.",
        },
      ],
      tip:
        "Tip: personalize once and then test a real request. The difference usually appears in the very first answer.",
    },
    claude: {
      sideActions: ["New", "Search", "Write", "Learn", "Apps", "Code"],
      freePlan: "Free plan",
      upgrade: "Upgrade",
      promptPlaceholder: "How can I help you today?",
      shortcuts: ["Write", "Learn", "Code", "Personal", "From Drive"],
      simulationBadge: "Guided simulation",
      simulationTitle: "This screen is a simulation.",
      simulationDescription:
        "Use this demo only as a visual guide. Then open your own Claude account and repeat the same process there.",
      profileHint:
        "This is a guided simulation. Click the profile here to understand the flow, then repeat it in your own Claude.",
      settingsOpenedFromProfile: "Settings opened from the profile.",
      profileMenu: ["Profile preferences", "Projects", "Response styles"],
      flowLabel: (title: string) => `Flow: Profile -> Settings -> ${title}`,
      profileEyebrow: "Profile",
      profileFields: {
        whoAreYouLabel: "Who are you",
        whoAreYouValue: "I am a history teacher working with high school students.",
        preferredLanguageLabel: "Preferred language",
        preferredLanguageValue: "English",
        responseLabel: "How you want answers",
        responseValue:
          "I prefer clear answers, with everyday examples, in English. No excessive formality.",
        profileTip:
          "Practical example: tell Claude your field, your audience, your language, and your ideal tone. That already makes it much more aligned with your routine.",
      },
      projectCards: [
        {
          title: "Work project",
          description: "Everything you discuss here follows fixed rules for your professional routine.",
        },
        {
          title: "Personal project",
          description: "Separate hobbies, studies, and personal tasks with another context and another style.",
        },
      ],
      projectsTip:
        "Ideal for separating personal and professional work. Each project can keep fixed instructions so you do not have to repeat context all the time.",
      styleOptions: ["Formal", "Concise", "Explanatory", "Custom"],
      select: "Select",
      customStyleValue:
        "Create your own style: clear, objective answers with examples and without too much formality.",
      stylesTip:
        "Tip: adjust one of these areas and then run a real test in Claude. You will quickly notice the difference in tone and format.",
    },
  },
  es: {
    chatgpt: {
      homeScreen: "Pantalla inicial",
      sidebarItems: ["Nuevo chat", "Buscar chats", "Imagenes", "Apps", "Investigacion profunda", "Salud"],
      plans: "Ver planes y precios",
      settings: "Configuracion",
      help: "Ayuda",
      simulationBadge: "Simulacion guiada",
      simulationTitle: "Esta pantalla es una simulacion.",
      simulationDescription:
        "Usa esta demostracion para entender el camino. Despues, repite estos pasos en tu propio ChatGPT.",
      personalizedAnswersTitle: "Obten respuestas personalizadas",
      personalizedAnswersDescription:
        "Haz clic para abrir la configuracion y adaptar ChatGPT a tu manera.",
      signIn: "Iniciar sesion",
      signUp: "Registrarse gratis",
      homeTitle: "Por donde empezamos?",
      askAnything: "Pregunta lo que quieras",
      voice: "Voz",
      settingsHint:
        "Esto es una simulacion guiada. Haz clic en Configuracion aqui para entender el flujo y luego haz lo mismo en tu propio ChatGPT.",
      footerTerms:
        "Al enviar mensajes a ChatGPT, un chatbot de IA, aceptas los terminos y la politica de privacidad.",
      settingsTitle: "Personalizacion",
      settingsMenu: [
        "General",
        "Notificaciones",
        "Personalizacion",
        "Apps",
        "Controles de datos",
        "Seguridad",
        "Controles parentales",
        "Cuenta",
      ],
      traits: ["Amable", "Entusiasta", "Titulos y listas", "Emoji"],
      preset: "Predefinido",
      customInstructionsLabel: "Instrucciones personalizadas",
      customInstructionsValue: "Preferencias adicionales de comportamiento, estilo y tono",
      aboutYouTitle: "Sobre ti",
      edit: "Editar",
      nicknameLabel: "Apodo",
      nicknameValue: "Como debe dirigirse ChatGPT a ti?",
      professionLabel: "Profesion",
      professionValue: "Abogado de derecho de familia",
      moreAboutYouLabel: "Mas sobre ti",
      moreAboutYouValue: "Intereses, valores o preferencias a tener en cuenta",
      manage: "Gestionar",
      memoryItems: [
        {
          title: "Usar recuerdos guardados",
          description: "Permite que ChatGPT guarde y use recuerdos al responder.",
        },
        {
          title: "Usar historial del chat",
          description: "Permite que ChatGPT haga referencia a conversaciones recientes al responder.",
        },
      ],
      tip:
        "Consejo: personalizalo una vez y luego prueba una solicitud real. La diferencia suele aparecer desde la primera respuesta.",
    },
    claude: {
      sideActions: ["Nuevo", "Buscar", "Escribir", "Aprender", "Apps", "Codigo"],
      freePlan: "Plan gratuito",
      upgrade: "Mejorar plan",
      promptPlaceholder: "Como puedo ayudarte hoy?",
      shortcuts: ["Escribir", "Aprender", "Codigo", "Temas personales", "Desde Drive"],
      simulationBadge: "Simulacion guiada",
      simulationTitle: "Esta pantalla es una simulacion.",
      simulationDescription:
        "Usa esta demostracion solo como referencia visual. Despues, abre tu propio Claude y repite alli el mismo proceso.",
      profileHint:
        "Esto es una simulacion guiada. Haz clic aqui en el perfil para entender el flujo y luego repitelo en tu propio Claude.",
      settingsOpenedFromProfile: "Configuracion abierta desde el perfil.",
      profileMenu: ["Preferencias de perfil", "Proyectos", "Estilos de respuesta"],
      flowLabel: (title: string) => `Flujo: Perfil -> Configuracion -> ${title}`,
      profileEyebrow: "Perfil",
      profileFields: {
        whoAreYouLabel: "Quien eres",
        whoAreYouValue: "Soy profesor de historia y trabajo con secundaria.",
        preferredLanguageLabel: "Idioma preferido",
        preferredLanguageValue: "Espanol",
        responseLabel: "Como quieres las respuestas",
        responseValue:
          "Prefiero respuestas claras, con ejemplos cotidianos, en espanol y sin demasiada formalidad.",
        profileTip:
          "Ejemplo practico: cuentale tu area, tu publico, tu idioma y el tono ideal. Eso ya deja a Claude mucho mas alineado con tu rutina.",
      },
      projectCards: [
        {
          title: "Proyecto de trabajo",
          description: "Todo lo que hables aqui sigue reglas fijas para tu rutina profesional.",
        },
        {
          title: "Proyecto personal",
          description: "Separa hobbies, estudios y tareas personales con otro contexto y otro estilo.",
        },
      ],
      projectsTip:
        "Ideal para separar el trabajo personal del profesional. Cada proyecto puede guardar instrucciones fijas para no repetir contexto todo el tiempo.",
      styleOptions: ["Formal", "Conciso", "Explicativo", "Personalizado"],
      select: "Seleccionar",
      customStyleValue:
        "Crea tu propio estilo: respuestas claras, objetivas, con ejemplos y sin exceso de formalidad.",
      stylesTip:
        "Consejo: ajusta una de estas areas y luego haz una prueba real en Claude. Notaras rapidamente la diferencia en el tono y en el formato.",
    },
  },
  fr: {
    chatgpt: {
      homeScreen: "Ecran d'accueil",
      sidebarItems: ["Nouveau chat", "Rechercher", "Images", "Apps", "Recherche avancee", "Sante"],
      plans: "Voir les offres et tarifs",
      settings: "Parametres",
      help: "Aide",
      simulationBadge: "Simulation guidee",
      simulationTitle: "Cet ecran est une simulation.",
      simulationDescription:
        "Utilise cette demonstration pour comprendre le parcours. Ensuite, refais ces etapes dans ton propre ChatGPT.",
      personalizedAnswersTitle: "Obtiens des reponses personnalisees",
      personalizedAnswersDescription:
        "Clique pour ouvrir les parametres et adapter ChatGPT a ta facon de travailler.",
      signIn: "Se connecter",
      signUp: "S'inscrire gratuitement",
      homeTitle: "Par ou commence-t-on ?",
      askAnything: "Pose n'importe quelle question",
      voice: "Voix",
      settingsHint:
        "Ceci est une simulation guidee. Clique ici sur Parametres pour comprendre le flux, puis refais la meme chose dans ton propre ChatGPT.",
      footerTerms:
        "En envoyant des messages a ChatGPT, un chatbot d'IA, tu acceptes les conditions et la politique de confidentialite.",
      settingsTitle: "Personnalisation",
      settingsMenu: [
        "General",
        "Notifications",
        "Personnalisation",
        "Apps",
        "Controles des donnees",
        "Securite",
        "Controles parentaux",
        "Compte",
      ],
      traits: ["Sympathique", "Enthousiaste", "Titres et listes", "Emoji"],
      preset: "Predefinition",
      customInstructionsLabel: "Instructions personnalisees",
      customInstructionsValue: "Preferences supplementaires de comportement, style et ton",
      aboutYouTitle: "A propos de toi",
      edit: "Modifier",
      nicknameLabel: "Surnom",
      nicknameValue: "Comment ChatGPT doit-il s'adresser a toi ?",
      professionLabel: "Profession",
      professionValue: "Avocat en droit de la famille",
      moreAboutYouLabel: "Plus sur toi",
      moreAboutYouValue: "Interets, valeurs ou preferences a garder en tete",
      manage: "Gerer",
      memoryItems: [
        {
          title: "Utiliser les souvenirs enregistres",
          description: "Permet a ChatGPT de stocker et d'utiliser des souvenirs pendant ses reponses.",
        },
        {
          title: "Utiliser l'historique du chat",
          description: "Permet a ChatGPT de faire reference aux conversations recentes quand il repond.",
        },
      ],
      tip:
        "Conseil : personnalise-le une fois puis teste une vraie demande. La difference apparait souvent des la premiere reponse.",
    },
    claude: {
      sideActions: ["Nouveau", "Rechercher", "Ecrire", "Apprendre", "Apps", "Code"],
      freePlan: "Forfait gratuit",
      upgrade: "Passer a l'offre superieure",
      promptPlaceholder: "Comment puis-je t'aider aujourd'hui ?",
      shortcuts: ["Ecrire", "Apprendre", "Code", "Sujets perso", "Depuis Drive"],
      simulationBadge: "Simulation guidee",
      simulationTitle: "Cet ecran est une simulation.",
      simulationDescription:
        "Utilise cette demonstration uniquement comme repere visuel. Ensuite, ouvre ton propre Claude et refais ce processus la-bas.",
      profileHint:
        "Ceci est une simulation guidee. Clique ici sur le profil pour comprendre le flux, puis refais-le dans ton propre Claude.",
      settingsOpenedFromProfile: "Parametres ouverts depuis le profil.",
      profileMenu: ["Preferences de profil", "Projets", "Styles de reponse"],
      flowLabel: (title: string) => `Parcours : Profil -> Parametres -> ${title}`,
      profileEyebrow: "Profil",
      profileFields: {
        whoAreYouLabel: "Qui es-tu",
        whoAreYouValue: "Je suis professeur d'histoire et je travaille avec des lyceens.",
        preferredLanguageLabel: "Langue preferee",
        preferredLanguageValue: "Francais",
        responseLabel: "Comment tu veux les reponses",
        responseValue:
          "Je prefere des reponses claires, avec des exemples du quotidien, en francais et sans formalite excessive.",
        profileTip:
          "Exemple pratique : indique ton domaine, ton public, ta langue et le ton ideal. Claude devient alors beaucoup plus aligne avec ton quotidien.",
      },
      projectCards: [
        {
          title: "Projet travail",
          description: "Tout ce que tu ecris ici suit des regles fixes pour ta routine professionnelle.",
        },
        {
          title: "Projet personnel",
          description: "Separe loisirs, etudes et taches personnelles avec un autre contexte et un autre style.",
        },
      ],
      projectsTip:
        "Ideal pour separer le personnel du professionnel. Chaque projet peut garder des instructions fixes pour eviter de repeter ton contexte.",
      styleOptions: ["Formel", "Concis", "Explicatif", "Personnalise"],
      select: "Choisir",
      customStyleValue:
        "Cree ton propre style : des reponses claires, directes, avec des exemples et sans trop de formalite.",
      stylesTip:
        "Conseil : ajuste l'une de ces zones puis fais un vrai test dans Claude. Tu verras vite la difference de ton et de format.",
    },
  },
} as const;

const JOURNEY_SECTION_UI_COPY = {
  pt: {
    chatgptTitle: "Como personalizar no ChatGPT",
    chatgptDescription:
      "Acesse Configuracoes e depois Personalizacao. Voce vai preencher caixas para definir estilo, contexto e o formato ideal das respostas.",
    claudeTitle: "Como personalizar no Claude",
    claudeDescription:
      "Acesse o icone do seu perfil, depois Configuracoes e depois Perfil. Preencha o campo de preferencias com informacoes sobre voce e como quer as respostas.",
  },
  en: {
    chatgptTitle: "How to customize ChatGPT",
    chatgptDescription:
      "Open Settings and then Personalization. You will fill in fields to define style, context, and the ideal response format.",
    claudeTitle: "How to customize Claude",
    claudeDescription:
      "Open your profile icon, then Settings, then Profile. Fill in the preferences field with information about yourself and how you want the answers.",
  },
  es: {
    chatgptTitle: "Como personalizar en ChatGPT",
    chatgptDescription:
      "Abre Configuracion y luego Personalizacion. Vas a completar campos para definir el estilo, el contexto y el formato ideal de las respuestas.",
    claudeTitle: "Como personalizar en Claude",
    claudeDescription:
      "Abre el icono de tu perfil, luego Configuracion y despues Perfil. Completa el campo de preferencias con informacion sobre ti y sobre como quieres las respuestas.",
  },
  fr: {
    chatgptTitle: "Comment personnaliser ChatGPT",
    chatgptDescription:
      "Ouvre les Parametres puis la Personnalisation. Tu vas remplir des champs pour definir le style, le contexte et le format ideal des reponses.",
    claudeTitle: "Comment personnaliser Claude",
    claudeDescription:
      "Ouvre l'icone de ton profil, puis Parametres, puis Profil. Renseigne les preferences avec des informations sur toi et sur la facon dont tu veux les reponses.",
  },
} as const;

const LOCALIZED_CHAT_GPT_PANELS = {
  pt: chatGptPanels,
  en: {
    estilo: {
      title: "Base style and tone",
      description:
        "This is where the person chooses the overall conversation style. Example: more direct, more creative, more didactic, or more professional.",
    },
    caracteristicas: {
      title: "Traits",
      description:
        "This is where they explain who they are, what they do, their experience level, and what they use ChatGPT for. That helps AI answer in a way that is more aligned with their reality.",
    },
    respostas: {
      title: "How you want answers",
      description:
        "Define tone, format, and preferences. Example: answer directly, without fluff, use practical examples, and organize in short bullet points when possible.",
    },
    memoria: {
      title: "Memory",
      description:
        "ChatGPT also has a memory feature that learns about you across conversations. You can view and edit what it remembers in Settings > Personalization > Memory.",
    },
  },
  es: {
    estilo: {
      title: "Estilo y tono base",
      description:
        "Aqui la persona elige el estilo general de la conversacion. Por ejemplo: mas directo, mas creativo, mas didactico o mas profesional.",
    },
    caracteristicas: {
      title: "Caracteristicas",
      description:
        "Aqui cuenta quien es, a que se dedica, su nivel de experiencia y para que usa ChatGPT. Eso ayuda a la IA a responder de forma mas alineada con su realidad.",
    },
    respostas: {
      title: "Como quieres las respuestas",
      description:
        "Define el tono, el formato y las preferencias. Por ejemplo: responde de forma directa, sin rodeos, con ejemplos practicos y, cuando se pueda, en puntos cortos.",
    },
    memoria: {
      title: "Memoria",
      description:
        "ChatGPT tambien tiene una funcion de memoria que aprende sobre ti a lo largo de las conversaciones. Puedes ver y editar lo que recuerda en Configuracion > Personalizacion > Memoria.",
    },
  },
  fr: {
    estilo: {
      title: "Style et ton de base",
      description:
        "C'est ici que la personne choisit le style general de la conversation. Par exemple : plus direct, plus creatif, plus pedagogique ou plus professionnel.",
    },
    caracteristicas: {
      title: "Caracteristiques",
      description:
        "C'est ici qu'elle explique qui elle est, ce qu'elle fait, son niveau d'experience et a quoi elle utilise ChatGPT. Cela aide l'IA a repondre de facon plus alignee avec sa realite.",
    },
    respostas: {
      title: "Comment tu veux les reponses",
      description:
        "Definis le ton, le format et les preferences. Par exemple : reponds de facon directe, sans bla-bla, avec des exemples concrets et, si possible, en points courts.",
    },
    memoria: {
      title: "Memoire",
      description:
        "ChatGPT dispose aussi d'une fonction memoire qui apprend a te connaitre au fil des conversations. Tu peux voir et modifier ce qu'il retient dans Parametres > Personnalisation > Memoire.",
    },
  },
} as const;

const LOCALIZED_CLAUDE_PANELS = {
  pt: claudePanels,
  en: {
    perfil: {
      title: "Profile preferences",
      description:
        "Describe who you are, your field, preferred language, and how you want Claude to respond. Example: I am a history teacher working with high school students. I prefer clear answers with everyday examples.",
    },
    projetos: {
      title: "Projects",
      description:
        "In Claude, you can create Projects with fixed instructions. Everything you discuss inside a project already follows the rules you defined. It is ideal for separating personal and professional work.",
    },
    estilos: {
      title: "Response styles",
      description:
        "Claude lets you choose among different writing styles such as formal, concise, and explanatory. You can also create your own custom style.",
    },
  },
  es: {
    perfil: {
      title: "Preferencias de perfil",
      description:
        "Describe quien eres, tu area, tu idioma preferido y como quieres que Claude responda. Ejemplo: soy profesor de historia y trabajo con secundaria. Prefiero respuestas claras y con ejemplos cotidianos.",
    },
    projetos: {
      title: "Proyectos",
      description:
        "En Claude puedes crear Proyectos con instrucciones fijas. Todo lo que hables dentro de un proyecto ya sigue las reglas que definiste. Es ideal para separar el trabajo personal del profesional.",
    },
    estilos: {
      title: "Estilos de respuesta",
      description:
        "Claude te permite elegir entre distintos estilos de escritura, como formal, conciso o explicativo. Tambien puedes crear tu propio estilo personalizado.",
    },
  },
  fr: {
    perfil: {
      title: "Preferences de profil",
      description:
        "Decris qui tu es, ton domaine, ta langue preferee et la facon dont tu veux que Claude reponde. Exemple : je suis professeur d'histoire et je travaille avec des lyceens. Je prefere des reponses claires avec des exemples concrets.",
    },
    projetos: {
      title: "Projets",
      description:
        "Dans Claude, tu peux creer des Projets avec des instructions fixes. Tout ce que tu ecris dans un projet suit deja les regles que tu as definies. C'est ideal pour separer vie perso et vie pro.",
    },
    estilos: {
      title: "Styles de reponse",
      description:
        "Claude te permet de choisir entre plusieurs styles d'ecriture, comme formel, concis ou explicatif. Tu peux aussi creer ton propre style personnalise.",
    },
  },
} as const;

const sectionShellClasses =
  "relative overflow-hidden rounded-[32px] border border-[#eadfce] bg-[linear-gradient(180deg,#fffcf7_0%,#fff8ef_100%)] p-5 shadow-[0_24px_60px_rgba(89,57,18,0.08)] sm:p-6 md:p-8";

const floatingTransition = {
  duration: 4.6,
  repeat: Infinity,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
};

const SectionWrapper = ({ children }: { children: ReactNode }) => (
  <div className={sectionShellClasses}>
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -left-12 top-10 h-28 w-28 rounded-full bg-[#ff7a1a]/14 blur-3xl"
      animate={{ x: [0, 16, -10], y: [0, -18, 10] }}
      transition={{ ...floatingTransition, duration: 6 }}
    />
    <motion.div
      aria-hidden
      className="pointer-events-none absolute right-0 top-0 h-36 w-36 rounded-full bg-[#ffc64d]/20 blur-3xl"
      animate={{ x: [0, -14, 8], y: [0, 10, -14] }}
      transition={{ ...floatingTransition, duration: 5.2 }}
    />
    <motion.div
      aria-hidden
      className="pointer-events-none absolute bottom-6 right-14 h-20 w-20 rounded-full bg-[#16a34a]/12 blur-2xl"
      animate={{ x: [0, 12, -8], y: [0, -8, 14] }}
      transition={{ ...floatingTransition, duration: 4.8 }}
    />
    <div className="relative z-10">{children}</div>
  </div>
);

const SectionIntro = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={stagger}
    className="space-y-4"
  >
    <motion.div variants={fadeUp} className="inline-flex items-center gap-3">
      <span className="h-12 w-[3px] rounded-full bg-gradient-to-b from-[#ff3c7e] via-[#ff7a1a] to-[#ffbe3d]" />
      <span className="text-xs font-black uppercase tracking-[0.35em] text-[#d35f12]">{eyebrow}</span>
    </motion.div>
    <motion.h2
      variants={fadeUp}
      className="font-serif text-[2rem] leading-tight text-[#1f2434] sm:text-[2.35rem]"
    >
      {title}
    </motion.h2>
    <motion.p variants={fadeUp} className="max-w-2xl text-base leading-8 text-[#40475a] sm:text-[1.05rem]">
      {description}
    </motion.p>
  </motion.div>
);

const EditorialHeading = ({
  icon,
  title,
}: {
  icon: ReactNode;
  title: string;
}) => (
  <div className="mt-10 flex items-start gap-3">
    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 text-[#ff6a00] shadow-sm ring-1 ring-[#ffd5ba]">
      {icon}
    </div>
    <h3 className="font-serif text-[1.9rem] leading-tight text-[#20263a] sm:text-[2.15rem]">{title}</h3>
  </div>
);

const ContinueFooter = ({
  label,
  helper,
  onComplete,
  disabled = false,
}: {
  label: string;
  helper?: string;
  onComplete: () => void;
  disabled?: boolean;
}) => (
  <div className="mt-8 rounded-[28px] border border-[#eadfce] bg-white/85 p-4 shadow-sm">
    {helper ? <p className="mb-3 text-sm text-[#6b7280]">{helper}</p> : null}
    <Button
      onClick={onComplete}
      disabled={disabled}
      className="h-12 w-full rounded-2xl bg-[#1f2434] text-base font-semibold text-white hover:bg-[#111726]"
    >
      {label}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </div>
);

const GuilhermeDay1Journey = ({ section, learnerName, onComplete }: GuilhermeDay1JourneyProps) => {
  const { i18n } = useTranslation();
  const journeyLocale = resolveGuilhermeJourneyLocale(i18n.resolvedLanguage || i18n.language);
  const copy = getGuilhermeDay1JourneyCopy(i18n.resolvedLanguage || i18n.language);
  const simulatedUi = SIMULATED_UI_COPY[journeyLocale] ?? SIMULATED_UI_COPY.pt;
  const journeyUi = JOURNEY_SECTION_UI_COPY[journeyLocale] ?? JOURNEY_SECTION_UI_COPY.pt;
  const localizedChatGptPanels =
    LOCALIZED_CHAT_GPT_PANELS[journeyLocale] ?? LOCALIZED_CHAT_GPT_PANELS.pt;
  const localizedClaudePanels =
    LOCALIZED_CLAUDE_PANELS[journeyLocale] ?? LOCALIZED_CLAUDE_PANELS.pt;
  const localizedOutcomeCards = outcomeCards.map((card, index) => ({
    ...card,
    title: copy.intro.outcomeCards[index]?.title ?? card.title,
    description: copy.intro.outcomeCards[index]?.description ?? card.description,
  }));
  const localizedAiToolCards = aiToolCards.map((card, index) => ({
    ...card,
    name: copy.map.tools[index]?.name ?? card.name,
    bullets: copy.map.tools[index]?.bullets ?? card.bullets,
  }));
  const localizedExerciseOneOptions = exerciseOneOptions.map((option, index) => ({
    ...option,
    text: copy.practice.exercise1.options[index] ?? option.text,
  }));
  const localizedExerciseThreeLegend = exerciseThreeLegend.map((option, index) => ({
    ...option,
    label: copy.practice.exercise3.legend[index] ?? option.label,
  }));
  const localizedTemplateLines = copy.personalize.templateLines ?? templateLines;
  const [chatGptPanel, setChatGptPanel] = useState<keyof typeof chatGptPanels>("estilo");
  const [chatGptScreen, setChatGptScreen] = useState<"home" | "settings">("home");
  const [claudePanel, setClaudePanel] = useState<keyof typeof claudePanels>("perfil");
  const [claudeScreen, setClaudeScreen] = useState<"home" | "profile">("home");
  const [exerciseOneChoice, setExerciseOneChoice] = useState<string | null>(null);
  const [exerciseTwoInput, setExerciseTwoInput] = useState("");
  const [exerciseTwoChecked, setExerciseTwoChecked] = useState(false);
  const [exerciseThreeAnswers, setExerciseThreeAnswers] = useState<Record<string, string>>({});
  const [activeExerciseThreePairId, setActiveExerciseThreePairId] = useState<string | null>(null);
  const [exerciseThreeFeedback, setExerciseThreeFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [exerciseThreeBoardSize, setExerciseThreeBoardSize] = useState({ width: 0, height: 0 });
  const [exerciseThreeLines, setExerciseThreeLines] = useState<
    Array<{
      pairId: string;
      answerId: string;
      isCorrect: boolean;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    }>
  >([]);
  const [activeMapToolIndex, setActiveMapToolIndex] = useState(0);
  const [visibleMapBulletCount, setVisibleMapBulletCount] = useState(0);
  const exerciseThreeBoardRef = useRef<HTMLDivElement | null>(null);
  const exerciseThreeLeftDotRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const exerciseThreeRightDotRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  const exerciseOneSelected = localizedExerciseOneOptions.find((option) => option.id === exerciseOneChoice);
  const isExerciseOneCorrect = exerciseOneSelected?.isCorrect ?? false;
  const isExerciseTwoCorrect =
    exerciseTwoChecked && exerciseTwoInput.trim().toLowerCase() === "prompt";
  const areAllExerciseThreeAnswered = exerciseThreePairs.every((pair) => exerciseThreeAnswers[pair.id]);
  const isExerciseThreeCorrect = exerciseThreePairs.every(
    (pair) => exerciseThreeAnswers[pair.id] === pair.correct
  );
  const activeExerciseThreePair = exerciseThreePairs.find(
    (pair) => pair.id === activeExerciseThreePairId
  );
  const unlockedFinalButton =
    isExerciseOneCorrect && isExerciseTwoCorrect && areAllExerciseThreeAnswered && isExerciseThreeCorrect;

  const progressSummary = {
    total: 3,
    completed:
      Number(isExerciseOneCorrect) + Number(isExerciseTwoCorrect) + Number(isExerciseThreeCorrect),
  };
  const currentMapTool = localizedAiToolCards[activeMapToolIndex] ?? localizedAiToolCards[0];
  const nextMapTool = localizedAiToolCards[activeMapToolIndex + 1];
  const isLastMapTool = activeMapToolIndex === localizedAiToolCards.length - 1;
  const areAllCurrentMapBulletsVisible =
    visibleMapBulletCount >= (currentMapTool?.bullets?.length ?? 0);
  const activeChatGptPanel = localizedChatGptPanels[chatGptPanel] ?? localizedChatGptPanels.estilo;
  const activeClaudePanel = localizedClaudePanels[claudePanel] ?? localizedClaudePanels.perfil;
  const chatGptUi = simulatedUi.chatgpt ?? SIMULATED_UI_COPY.pt.chatgpt;
  const claudeUi = simulatedUi.claude ?? SIMULATED_UI_COPY.pt.claude;
  const personalizeInputCards = copy.personalize.responseInputCards ?? [];
  const personalizeOutputItems = copy.personalize.responseOutputItems ?? [];
  const chatGptSidebarItems = chatGptUi.sidebarItems ?? [];
  const chatGptSettingsLabels = chatGptUi.settingsMenu ?? [];
  const chatGptTraits = chatGptUi.traits ?? [];
  const chatGptMemoryItems = chatGptUi.memoryItems ?? [];
  const claudeSideActions = claudeUi.sideActions ?? [];
  const claudeShortcuts = claudeUi.shortcuts ?? [];
  const claudeProfileMenu = claudeUi.profileMenu ?? [];
  const claudeProfileFields = claudeUi.profileFields ?? SIMULATED_UI_COPY.pt.claude.profileFields;
  const claudeProjectCards = claudeUi.projectCards ?? [];
  const claudeStyleOptions = claudeUi.styleOptions ?? [];
  const learnerNameParts = learnerName?.trim().split(/\s+/).filter(Boolean) ?? [];
  const claudeGreetingName = learnerNameParts[0] ?? "";
  const claudeProfileInitials =
    learnerNameParts.length === 0
      ? "A"
      : learnerNameParts.length === 1
        ? learnerNameParts[0].charAt(0).toUpperCase()
        : `${learnerNameParts[0].charAt(0)}${learnerNameParts[learnerNameParts.length - 1].charAt(0)}`.toUpperCase();
  const claudeGreetingTitle =
    journeyLocale === "pt"
      ? claudeGreetingName
        ? `Bom dia, ${claudeGreetingName}`
        : "Bom dia"
      : journeyLocale === "es"
        ? claudeGreetingName
          ? `Buenos días, ${claudeGreetingName}`
          : "Buenos días"
        : journeyLocale === "fr"
          ? claudeGreetingName
            ? `Bonjour, ${claudeGreetingName}`
            : "Bonjour"
          : claudeGreetingName
            ? `Good morning, ${claudeGreetingName}`
            : "Good morning";

  useEffect(() => {
    if (section !== "personalize") return;

    setChatGptScreen("home");
    setChatGptPanel("estilo");
    setClaudeScreen("home");
    setClaudePanel("perfil");
  }, [section]);

  useEffect(() => {
    if (section !== "map") return;

    setActiveMapToolIndex(0);
    setVisibleMapBulletCount(0);
  }, [section]);

  useEffect(() => {
    if (section !== "map") return;

    setVisibleMapBulletCount(0);
  }, [activeMapToolIndex, section]);

  useEffect(() => {
    if (section !== "map") return;
    if (visibleMapBulletCount >= currentMapTool.bullets.length) return;

    const timeout = window.setTimeout(() => {
      setVisibleMapBulletCount((current) =>
        Math.min(current + 1, currentMapTool.bullets.length)
      );
    }, MAP_BULLET_REVEAL_INTERVAL_MS);

    return () => window.clearTimeout(timeout);
  }, [currentMapTool, section, visibleMapBulletCount]);

  useEffect(() => {
    if (section !== "practice") return;

    const updateExerciseThreeLines = () => {
      const board = exerciseThreeBoardRef.current;
      if (!board) {
        setExerciseThreeBoardSize({ width: 0, height: 0 });
        setExerciseThreeLines([]);
        return;
      }

      const boardRect = board.getBoundingClientRect();
      setExerciseThreeBoardSize({ width: boardRect.width, height: boardRect.height });
      const nextLines = exerciseThreePairs.flatMap((pair) => {
        const answerId = exerciseThreeAnswers[pair.id];
        if (!answerId) return [];

        const leftDot = exerciseThreeLeftDotRefs.current[pair.id];
        const rightDot = exerciseThreeRightDotRefs.current[answerId];
        if (!leftDot || !rightDot) return [];

        const leftRect = leftDot.getBoundingClientRect();
        const rightRect = rightDot.getBoundingClientRect();

        return [
          {
            pairId: pair.id,
            answerId,
            isCorrect: answerId === pair.correct,
            x1: leftRect.left + leftRect.width / 2 - boardRect.left,
            y1: leftRect.top + leftRect.height / 2 - boardRect.top,
            x2: rightRect.left + rightRect.width / 2 - boardRect.left,
            y2: rightRect.top + rightRect.height / 2 - boardRect.top,
          },
        ];
      });

      setExerciseThreeLines(nextLines);
    };

    const frame = window.requestAnimationFrame(updateExerciseThreeLines);
    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateExerciseThreeLines) : null;

    if (resizeObserver && exerciseThreeBoardRef.current) {
      resizeObserver.observe(exerciseThreeBoardRef.current);
    }

    window.addEventListener("resize", updateExerciseThreeLines);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateExerciseThreeLines);
    };
  }, [exerciseThreeAnswers, section]);

  const handleContinueMapTool = () => {
    if (isLastMapTool) {
      onComplete();
      return;
    }

    setActiveMapToolIndex((current) => Math.min(current + 1, localizedAiToolCards.length - 1));
  };

  const handleOpenChatGptSettings = (panel: keyof typeof chatGptPanels = "estilo") => {
    setChatGptPanel(panel);
    setChatGptScreen("settings");
  };

  const handleOpenClaudeProfile = (panel: keyof typeof claudePanels = "perfil") => {
    setClaudePanel(panel);
    setClaudeScreen("profile");
  };

  const handleSelectExerciseThreePair = (pairId: string) => {
    setExerciseThreeFeedback(null);
    setActiveExerciseThreePairId((current) => (current === pairId ? null : pairId));
  };

  const handleConnectExerciseThreePair = (answerId: string) => {
    if (!activeExerciseThreePairId) {
      const pairedItem = exerciseThreePairs.find((pair) => exerciseThreeAnswers[pair.id] === answerId);
      if (pairedItem) {
        setActiveExerciseThreePairId(pairedItem.id);
        setExerciseThreeFeedback(null);
        return;
      }

      setExerciseThreeFeedback({
        type: "error",
        message: copy.practice.exercise3.selectPairFirst,
      });
      return;
    }

    const activePair = exerciseThreePairs.find((pair) => pair.id === activeExerciseThreePairId);
    const selectedOption = localizedExerciseThreeLegend.find((option) => option.id === answerId);

    if (!activePair || !selectedOption) return;

    if (answerId !== activePair.correct) {
      setExerciseThreeAnswers((current) => {
        const next = { ...current };
        delete next[activePair.id];
        return next;
      });

      setExerciseThreeFeedback({
        type: "error",
        message: copy.practice.exercise3.feedbackWrong(
          activePair.label,
          selectedOption.id,
          selectedOption.label
        ),
      });
      return;
    }

    setExerciseThreeAnswers((current) => {
      const next = { ...current };

      for (const [pairId, selectedAnswerId] of Object.entries(next)) {
        if (selectedAnswerId === answerId) {
          delete next[pairId];
        }
      }

      next[activeExerciseThreePairId] = answerId;
      return next;
    });

    setExerciseThreeFeedback({
      type: "success",
      message: copy.practice.exercise3.feedbackCorrect(
        activePair.label,
        selectedOption.id,
        selectedOption.label
      ),
    });
    setActiveExerciseThreePairId(null);
  };

  const handleClearExerciseThreeConnections = () => {
    setExerciseThreeAnswers({});
    setActiveExerciseThreePairId(null);
    setExerciseThreeFeedback(null);
  };

  if (section === "intro") {
    return (
      <SectionWrapper>
        <SectionIntro
          eyebrow={copy.intro.eyebrow}
          title={copy.intro.title}
          description={copy.intro.description}
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mt-6 space-y-5 text-[1.04rem] leading-8 text-[#303648]"
        >
          <motion.p variants={fadeUp}>
            <span className="font-semibold text-[#ff6a00]">{copy.intro.leadHighlight}</span>{" "}
            {copy.intro.leadBody}
          </motion.p>
          <motion.p variants={fadeUp}>{copy.intro.body}</motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mt-8 grid gap-4 md:grid-cols-[1.15fr_0.85fr]"
        >
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-[30px] border border-[#ffd8c0] bg-[radial-gradient(circle_at_top_left,#fff5e8_0%,#fff1e1_38%,#fff8ef_100%)] p-5"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,122,26,0.16),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(255,200,61,0.18),transparent_22%),radial-gradient(circle_at_80%_82%,rgba(45,212,191,0.14),transparent_26%)]" />
            <motion.div
              aria-hidden
              className="absolute left-8 top-6 h-16 w-16 rounded-full border border-white/60 bg-white/50 blur-[1px]"
              animate={{ x: [0, 12, -6, 0], y: [0, -10, 8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="absolute bottom-8 right-8 h-24 w-24 rounded-full bg-[#ffd89e]/30 blur-2xl"
              animate={{ scale: [1, 1.15, 0.95, 1], opacity: [0.45, 0.75, 0.5, 0.45] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative grid gap-6 md:grid-cols-[0.95fr_1.05fr] md:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#ffd0b2] bg-white/80 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-[#c45f17] shadow-sm">
                  <Sparkles className="h-4 w-4" />
                  {copy.intro.keyShiftBadge}
                </div>
                <h4 className="mt-4 font-serif text-[1.95rem] leading-tight text-[#1f2434]">
                  {copy.intro.keyShiftTitle}
                </h4>
                <p className="mt-4 max-w-lg text-sm leading-7 text-[#6b5b4f]">
                  {copy.intro.keyShiftDescription}
                </p>
              </div>

              <div className="relative min-h-[250px]">
                <motion.div
                  className="absolute left-0 top-5 rounded-[24px] border border-[#ffd9bf] bg-white/90 px-4 py-3 shadow-[0_18px_40px_rgba(255,122,26,0.10)]"
                  animate={{ y: [0, -8, 0], rotate: [0, -2, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#c45f17]">{copy.intro.youDeliverLabel}</p>
                  <p className="mt-2 text-sm font-semibold text-[#2f3445]">{copy.intro.youDeliverText}</p>
                </motion.div>

                <motion.div
                  className="absolute right-3 top-0 flex h-16 w-16 items-center justify-center rounded-[22px] border border-white/80 bg-white/85 text-[#ff6a00] shadow-lg"
                  animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Brain className="h-7 w-7" />
                </motion.div>

                <motion.div
                  className="absolute left-[18%] top-[34%] flex h-24 w-24 items-center justify-center rounded-full bg-[radial-gradient(circle,#ffb15a_0%,#ff7a1a_68%,#ff6a00_100%)] text-white shadow-[0_22px_48px_rgba(255,122,26,0.28)]"
                  animate={{ scale: [1, 1.08, 1], boxShadow: ["0 22px 48px rgba(255,122,26,0.22)", "0 28px 62px rgba(255,122,26,0.34)", "0 22px 48px rgba(255,122,26,0.22)"] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Bot className="h-10 w-10" />
                </motion.div>

                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    aria-hidden
                    className="absolute left-[46%] top-[43%] h-3 w-3 rounded-full bg-[#ff8c38]"
                    animate={{ x: [0, 36 + index * 18, 74 + index * 24], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.35, ease: "easeInOut" }}
                  />
                ))}

                <motion.div
                  className="absolute bottom-3 right-0 max-w-[260px] rounded-[24px] border border-[#d7f0de] bg-white/92 px-4 py-4 shadow-[0_18px_40px_rgba(22,163,74,0.10)]"
                  animate={{ y: [0, 10, 0], rotate: [0, 1.5, 0] }}
                  transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8fff1] text-[#16a34a]">
                      <Check className="h-4 w-4" />
                    </span>
                    <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#16803c]">{copy.intro.responseBadge}</p>
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-7 text-[#2f3445]">
                    {copy.intro.responseText}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="rounded-[28px] border border-[#eadfce] bg-white/90 p-5 shadow-sm"
          >
            <div className="flex items-center gap-3 text-[#1f2434]">
              <Zap className="h-5 w-5 text-[#ff6a00]" />
              <p className="font-black uppercase tracking-[0.25em] text-[#d35f12]">{copy.intro.realResultBadge}</p>
            </div>
            <p className="mt-4 font-serif text-[1.5rem] leading-tight text-[#1f2434]">
              {copy.intro.realResultTitle}
            </p>
            <p className="mt-4 text-sm leading-7 text-[#4b5563]">
              {copy.intro.realResultFirst}
            </p>
            <p className="mt-4 text-sm leading-7 text-[#4b5563]">
              {copy.intro.realResultSecond}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8 overflow-hidden rounded-[30px] border border-[#eadfce] bg-white/90 shadow-sm"
        >
          <motion.div
            className="space-y-4 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid overflow-hidden rounded-2xl border border-[#f2c9c3] md:grid-cols-[170px_1fr]">
              <div className="flex items-center justify-center gap-2 bg-[#ef5350] px-4 py-4 text-sm font-black uppercase tracking-[0.2em] text-white">
                <X className="h-4 w-4" />
                {copy.intro.vagueLabel}
              </div>
              <div className="bg-[#fff1ee] px-5 py-4 text-[1.02rem] text-[#2f3445]">{copy.intro.vaguePrompt}</div>
            </div>

            <div className="grid overflow-hidden rounded-2xl border border-[#c7e7cf] md:grid-cols-[170px_1fr]">
              <div className="flex items-center justify-center gap-2 bg-[#24a148] px-4 py-4 text-sm font-black uppercase tracking-[0.2em] text-white">
                <Check className="h-4 w-4" />
                {copy.intro.specificLabel}
              </div>
              <div className="bg-[#eefbf1] px-5 py-4 text-[1.02rem] leading-7 text-[#2f3445]">
                {copy.intro.specificPrompt}
              </div>
            </div>

            <div className="rounded-2xl border border-[#ffe1cb] bg-[#fff6ef] p-4 text-[1rem] leading-7 text-[#41485c]">
              {copy.intro.promptDifference}
            </div>
          </motion.div>
        </motion.div>

        <EditorialHeading icon={<Target className="h-5 w-5" />} title={copy.intro.resultsTitle} />
        <p className="mt-4 text-[1.04rem] leading-8 text-[#41485c]">
          {copy.intro.resultsDescription}
        </p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mt-6 space-y-4"
        >
          {localizedOutcomeCards.map((card) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                variants={fadeUp}
                className={cn(
                  "grid gap-4 rounded-[26px] border p-4 shadow-sm md:grid-cols-[64px_1fr] md:items-start",
                  card.palette
                )}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/85 shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-[1.15rem] font-black leading-tight">{card.title}</h4>
                  <p className="mt-2 text-sm leading-7 text-[#475569]">{card.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <ContinueFooter
          label={copy.intro.continueLabel}
          helper={copy.intro.continueHelper}
          onComplete={onComplete}
        />
      </SectionWrapper>
    );
  }

  if (section === "map") {
    return (
      <SectionWrapper>
        <SectionIntro
          eyebrow={copy.map.eyebrow}
          title={copy.map.title}
          description={copy.map.description}
        />

        <div className="mt-6 rounded-[28px] border border-[#eadfce] bg-white/90 p-5 shadow-sm">
          <p className="text-sm leading-7 text-[#4b5563]">
            {copy.map.intro}
          </p>
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMapTool.name}
              initial={{ opacity: 0, y: 28, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.985 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "overflow-hidden rounded-[30px] border p-5 shadow-sm",
                currentMapTool.palette
              )}
            >
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-[22px] border border-white/70 bg-white/75 px-4 py-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-[#d35f12]">
                    {copy.map.aiCounter(activeMapToolIndex + 1, localizedAiToolCards.length)}
                  </p>
                  <p className="mt-2 text-sm text-[#4b5563]">
                    {copy.map.aiHint}
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-[160px_1fr]">
                <motion.div
                  className="flex flex-col items-center justify-center rounded-[24px] border border-white/80 bg-white/90 p-4 text-center shadow-sm"
                  initial={{ opacity: 0, scale: 0.88, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src={currentMapTool.logo}
                    alt={currentMapTool.name}
                    className="h-14 w-14 object-contain"
                  />
                  <p className="mt-3 font-black leading-snug text-[#1f2434]">
                    {currentMapTool.name}
                  </p>
                </motion.div>

                <div className="space-y-3">
                  <AnimatePresence initial={false}>
                    {currentMapTool.bullets.slice(0, visibleMapBulletCount).map((bullet) => (
                      <motion.div
                        key={`${currentMapTool.name}-${bullet}`}
                        initial={{ opacity: 0, x: 22, filter: "blur(4px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: -14 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-start gap-3 rounded-2xl border border-white/80 bg-white/80 p-3"
                      >
                        <span
                          className={cn("mt-2 h-2.5 w-2.5 rounded-full", currentMapTool.bulletPalette)}
                        />
                        <p className="text-sm leading-7 text-[#394150]">{bullet}</p>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {areAllCurrentMapBulletsVisible ? (
                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="pt-3"
                    >
                      <Button
                        type="button"
                        onClick={handleContinueMapTool}
                        className="h-12 rounded-2xl bg-[#1f2434] px-6 text-base font-semibold text-white hover:bg-[#111726]"
                      >
                        {isLastMapTool && !nextMapTool
                          ? copy.map.continueToExercises
                          : copy.map.continueToNext(nextMapTool?.name ?? "")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  ) : (
                    null
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="mt-8 rounded-[30px] border border-[#ffe0a6] bg-[linear-gradient(135deg,#fff7d8_0%,#fff2bd_100%)] p-5 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <Star className="h-5 w-5 text-[#a76b00]" />
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#b57a05]">{copy.map.goldTipBadge}</p>
          </div>
          <p className="mt-3 text-[1.02rem] leading-8 text-[#55411f]">
            {copy.map.goldTipText}
          </p>
        </motion.div>
      </SectionWrapper>
    );
  }

  if (section === "personalize") {
    return (
      <SectionWrapper>
        <SectionIntro
          eyebrow={copy.personalize.eyebrow}
          title={copy.personalize.title}
          description={copy.personalize.description}
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mt-6 space-y-5 text-[1.02rem] leading-8 text-[#374151]"
        >
          <motion.p variants={fadeUp}>
            {copy.personalize.lead}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-[30px] border border-[#eadfce] bg-[linear-gradient(135deg,#fffaf5_0%,#fff5ea_52%,#fffdf9_100%)] p-5 shadow-sm"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(255,122,26,0.16),transparent_26%),radial-gradient(circle_at_88%_22%,rgba(251,191,36,0.16),transparent_24%),radial-gradient(circle_at_78%_86%,rgba(45,212,191,0.12),transparent_26%)]" />
            <div className="relative grid gap-6 md:grid-cols-[1.05fr_0.95fr] md:items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#ffd9bf] bg-white/80 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-[#c45f17] shadow-sm">
                  <WandSparkles className="h-4 w-4" />
                  {copy.personalize.responseBadge}
                </div>
                <h4 className="font-serif text-[1.8rem] leading-tight text-[#1f2434]">
                  {copy.personalize.responseTitle}
                </h4>
                <p className="max-w-lg text-sm leading-7 text-[#4b5563]">
                  {copy.personalize.responseDescription}
                </p>
              </div>

              <div className="relative min-h-[240px]">
                {personalizeInputCards.map((label: string, index: number) => (
                  <motion.div
                    key={label}
                    className={cn(
                      "absolute left-0 w-[210px] rounded-[22px] border border-[#ffd9bf] bg-white/92 px-4 py-3 shadow-sm",
                      ["top-0", "top-[72px]", "top-[144px]"][index]
                    )}
                    animate={{ x: [0, 10, 0], y: [0, index % 2 === 0 ? -6 : 8, 0] }}
                    transition={{ duration: 4 + index * 0.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
                  >
                    <p className="text-sm font-semibold text-[#2f3445]">{label}</p>
                  </motion.div>
                ))}

                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    aria-hidden
                    className="absolute left-[230px] top-[44px] h-2.5 w-2.5 rounded-full bg-[#ff8c38]"
                    animate={{
                      y: [index * 72, index * 72, 72],
                      x: [0, 44, 92],
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.4, ease: "easeInOut" }}
                  />
                ))}

                <motion.div
                  className="absolute right-0 top-[56px] w-[250px] rounded-[26px] border border-[#d7f0de] bg-white/94 p-4 shadow-[0_20px_44px_rgba(22,163,74,0.10)]"
                  animate={{ y: [0, -8, 0], rotate: [0, 1.2, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eafff2] text-[#16a34a]">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[#16803c]">{copy.personalize.responseOutputBadge}</p>
                      <p className="text-sm font-semibold text-[#1f2434]">{copy.personalize.responseOutputTitle}</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {personalizeOutputItems.map((item: string) => (
                      <div key={item} className="rounded-2xl border border-[#e6f5ea] bg-[#f7fff9] px-3 py-2 text-sm font-medium text-[#33523c]">
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
            <p className="relative mt-6 max-w-xl text-sm leading-7 text-[#4b5563]">
              {copy.personalize.responseFooter}
            </p>
          </motion.div>
        </motion.div>

        <div className="mt-10">
          <h3 className="text-[1.7rem] font-black leading-tight text-[#ff6a00]">
            {journeyUi.chatgptTitle}
          </h3>
          <p className="mt-3 text-[1.02rem] leading-8 text-[#374151]">
            {journeyUi.chatgptDescription}
          </p>

          <div className="mt-5 overflow-hidden rounded-[32px] border border-[#2b2b2b] bg-[#212121] shadow-[0_28px_80px_rgba(15,15,15,0.34)]">
            <div className="border-b border-white/8 bg-[#181818] px-5 py-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
                <span className="inline-flex w-fit rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-amber-200">
                  {simulatedUi.chatgpt.simulationBadge}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{simulatedUi.chatgpt.simulationTitle}</p>
                  <p className="mt-1 text-xs leading-6 text-[#a9abb3]">
                    {simulatedUi.chatgpt.simulationDescription}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid min-h-[680px] md:grid-cols-[208px_1fr]">
              <div className="flex flex-col border-b border-white/10 bg-[#171717] p-4 text-white md:border-b-0 md:border-r">
                <div className="flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <img src={chatgptLogo} alt="ChatGPT" className="h-5 w-5 object-contain" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setChatGptScreen("home")}
                    className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-[#bcc1ca] transition hover:bg-white/10"
                  >
                    {simulatedUi.chatgpt.homeScreen}
                  </button>
                </div>

                <div className="mt-5 space-y-1.5">
                  {chatGptSidebarItems.map((label, index) => {
                    const item = [
                      { icon: Plus },
                      { icon: Search },
                      { icon: Images },
                      { icon: LayoutDashboard },
                      { icon: Compass },
                      { icon: Heart },
                    ][index] ?? { icon: Search };
                    const Icon = item.icon;

                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setChatGptScreen("home")}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-[#edf0f5] transition hover:bg-white/8"
                      >
                        <Icon className="h-4 w-4 text-[#cfd4dc]" />
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-auto space-y-2">
                  <button
                    type="button"
                    onClick={() => setChatGptScreen("home")}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-[#c8cdd5] transition hover:bg-white/8"
                >
                  <Star className="h-4 w-4" />
                  <span>{simulatedUi.chatgpt.plans}</span>
                </button>

                  <button
                    type="button"
                    onClick={() => handleOpenChatGptSettings()}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition",
                      chatGptScreen === "settings"
                        ? "bg-white/12 text-[#ffffff]"
                        : "text-[#d7dbe2] hover:bg-white/8"
                    )}
                  >
                    <Settings2 className="h-4 w-4" />
                    <span>{simulatedUi.chatgpt.settings}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setChatGptScreen("home")}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-[#c8cdd5] transition hover:bg-white/8"
                >
                  <CircleHelp className="h-4 w-4" />
                  <span>{simulatedUi.chatgpt.help}</span>
                </button>

                  <button
                    type="button"
                    onClick={() => handleOpenChatGptSettings("caracteristicas")}
                    className="w-full rounded-[22px] border border-white/10 bg-[#1f1f1f] px-4 py-4 text-left shadow-inner"
                  >
                    <p className="text-sm font-semibold text-white">{simulatedUi.chatgpt.personalizedAnswersTitle}</p>
                    <p className="mt-2 text-xs leading-6 text-[#a9abb3]">
                      {simulatedUi.chatgpt.personalizedAnswersDescription}
                    </p>
                  </button>
                </div>
              </div>

              <div className="relative flex min-h-[680px] flex-col overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/8 px-6 py-4 text-white">
                  <button
                    type="button"
                    onClick={() => setChatGptScreen("home")}
                    className="text-sm font-semibold text-[#f3f5f8] transition hover:text-white"
                  >
                    ChatGPT
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="rounded-full border border-white/10 bg-white px-4 py-2 text-sm font-semibold text-[#1f1f1f]"
                    >
                      {simulatedUi.chatgpt.signIn}
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-white/12 bg-transparent px-4 py-2 text-sm font-semibold text-white"
                    >
                      {simulatedUi.chatgpt.signUp}
                    </button>
                  </div>
                </div>

                <div className="flex flex-1 flex-col items-center justify-center px-6 pb-20 pt-10 text-white">
                  <div className="w-full max-w-[760px] text-center">
                    <h4 className="text-[2rem] font-medium tracking-[-0.03em] text-white sm:text-[2.35rem]">
                      {simulatedUi.chatgpt.homeTitle}
                    </h4>

                    <button
                      type="button"
                      onClick={() => handleOpenChatGptSettings()}
                      className="mx-auto mt-8 flex w-full max-w-[620px] items-center justify-between rounded-[28px] border border-white/8 bg-[#303030] px-4 py-4 text-left shadow-[0_18px_42px_rgba(0,0,0,0.18)] transition hover:bg-[#343434]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/7 text-[#e3e6eb]">
                          <Plus className="h-4 w-4" />
                        </span>
                        <span className="text-sm text-[#b5b7be]">{simulatedUi.chatgpt.askAnything}</span>
                      </div>

                      <span className="rounded-full bg-white/8 px-4 py-2 text-sm font-semibold text-[#f0f2f6]">
                        {simulatedUi.chatgpt.voice}
                      </span>
                    </button>

                    <p className="mt-5 text-sm leading-7 text-[#a8abb2]">
                      {simulatedUi.chatgpt.settingsHint}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/8 px-6 py-3 text-center text-[11px] leading-6 text-[#9da0a8]">
                  {simulatedUi.chatgpt.footerTerms}
                </div>

                <AnimatePresence>
                  {chatGptScreen === "settings" ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-10 bg-black/62 backdrop-blur-[2px]"
                    >
                      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                          initial={{ opacity: 0, y: 22, scale: 0.985 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 18, scale: 0.985 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="flex h-[min(620px,100%)] w-full max-w-[860px] overflow-hidden rounded-[24px] border border-white/8 bg-[#212121] shadow-[0_36px_90px_rgba(0,0,0,0.46)]"
                        >
                          <div className="w-[178px] shrink-0 border-r border-white/6 bg-[#1f1f1f] p-4">
                            <button
                              type="button"
                              onClick={() => setChatGptScreen("home")}
                              className="flex h-9 w-9 items-center justify-center rounded-full text-[#e6e9ee] transition hover:bg-white/8"
                            >
                              <X className="h-4 w-4" />
                            </button>

                            <div className="mt-5 space-y-1.5">
                              {chatGptSettingsMenu.map((item, index) => {
                                const Icon = item.icon;
                                const isActive = item.id === "personalizacao";

                                return (
                                  <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => {
                                      if (item.id === "personalizacao") {
                                        setChatGptPanel("estilo");
                                      }
                                    }}
                                    className={cn(
                                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition",
                                      isActive
                                        ? "bg-white/10 text-[#ffffff]"
                                        : "text-[#d8dce3] hover:bg-white/6"
                                    )}
                                  >
                                    <Icon className="h-4 w-4" />
                                    <span>{chatGptSettingsLabels[index] ?? item.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
                            <div className="mx-auto max-w-[560px]">
                              <h4 className="text-[1.85rem] font-medium tracking-[-0.03em] text-white">
                                {simulatedUi.chatgpt.settingsTitle}
                              </h4>
                              <div className="mt-4 border-t border-white/10" />

                              <div
                                className={cn(
                                  "mt-6 rounded-[20px] border p-4 transition",
                                  chatGptPanel === "estilo"
                                    ? "border-white/16 bg-white/[0.04]"
                                    : "border-transparent bg-transparent"
                                )}
                              >
                                <button
                                  type="button"
                                  onClick={() => setChatGptPanel("estilo")}
                                  className="flex w-full items-center justify-between gap-4 text-left"
                                >
                                  <div>
                                    <p className="text-[1.05rem] font-semibold text-white">
                                      {localizedChatGptPanels.estilo.title}
                                    </p>
                                    <p className="mt-2 text-sm leading-7 text-[#a9adb5]">
                                      {localizedChatGptPanels.estilo.description}
                                    </p>
                                  </div>

                                  <div className="flex items-center gap-2 text-sm font-medium text-[#f1f3f6]">
                                    <span>{simulatedUi.chatgpt.preset}</span>
                                    <ChevronDown className="h-4 w-4" />
                                  </div>
                                </button>
                              </div>

                              <div
                                className={cn(
                                  "mt-6 rounded-[20px] border p-4 transition",
                                  chatGptPanel === "caracteristicas"
                                    ? "border-white/16 bg-white/[0.04]"
                                    : "border-transparent bg-transparent"
                                )}
                              >
                                <button
                                  type="button"
                                  onClick={() => setChatGptPanel("caracteristicas")}
                                  className="w-full text-left"
                                >
                                  <p className="text-[1.05rem] font-semibold text-white">
                                    {localizedChatGptPanels.caracteristicas.title}
                                  </p>
                                  <p className="mt-1 text-sm leading-7 text-[#a9adb5]">
                                    {localizedChatGptPanels.caracteristicas.description}
                                  </p>
                                </button>

                                <div className="mt-5 space-y-1.5">
                                  {chatGptTraits.map((item) => (
                                    <button
                                      key={item}
                                      type="button"
                                      onClick={() => setChatGptPanel("caracteristicas")}
                                      className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition hover:bg-white/5"
                                    >
                                      <span className="text-[1.02rem] text-white">{item}</span>
                                      <span className="flex items-center gap-2 text-sm text-[#eff2f6]">
                                        {simulatedUi.chatgpt.preset}
                                        <ChevronDown className="h-4 w-4" />
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div
                                className={cn(
                                  "mt-4 rounded-[20px] border p-4 transition",
                                  chatGptPanel === "respostas"
                                    ? "border-white/16 bg-white/[0.04]"
                                    : "border-transparent bg-transparent"
                                )}
                              >
                                <button
                                  type="button"
                                  onClick={() => setChatGptPanel("respostas")}
                                  className="w-full text-left"
                                >
                                  <p className="text-[1.02rem] font-semibold text-white">{simulatedUi.chatgpt.customInstructionsLabel}</p>
                                  <p className="mt-2 text-sm leading-7 text-[#a9adb5]">
                                    {localizedChatGptPanels.respostas.description}
                                  </p>
                                </button>

                                <textarea
                                  readOnly
                                  onFocus={() => setChatGptPanel("respostas")}
                                  className="mt-3 min-h-[78px] w-full resize-none rounded-[12px] border border-white/12 bg-[#303030] px-4 py-3 text-sm text-[#d8dbe2] outline-none"
                                  value={simulatedUi.chatgpt.customInstructionsValue}
                                />
                              </div>

                              <div
                                className={cn(
                                  "mt-8 rounded-[20px] border p-4 transition",
                                  chatGptPanel === "caracteristicas"
                                    ? "border-white/16 bg-white/[0.04]"
                                    : "border-transparent bg-transparent"
                                )}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <h5 className="text-[1.15rem] font-medium text-white">{simulatedUi.chatgpt.aboutYouTitle}</h5>
                                  <button
                                    type="button"
                                    onClick={() => setChatGptPanel("caracteristicas")}
                                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#c9ced6] transition hover:bg-white/6"
                                  >
                                    {simulatedUi.chatgpt.edit}
                                  </button>
                                </div>
                                <div className="mt-4 border-t border-white/10" />

                                <div className="mt-4 space-y-5">
                                  <div>
                                    <p className="text-sm font-medium text-white">{simulatedUi.chatgpt.nicknameLabel}</p>
                                    <Input
                                      readOnly
                                      onFocus={() => setChatGptPanel("caracteristicas")}
                                      value={simulatedUi.chatgpt.nicknameValue}
                                      className="mt-2 h-11 rounded-[10px] border-white/12 bg-[#303030] text-[#d8dbe2]"
                                    />
                                  </div>

                                  <div>
                                    <p className="text-sm font-medium text-white">{simulatedUi.chatgpt.professionLabel}</p>
                                    <Input
                                      readOnly
                                      onFocus={() => setChatGptPanel("caracteristicas")}
                                      value={simulatedUi.chatgpt.professionValue}
                                      className="mt-2 h-11 rounded-[10px] border-white/12 bg-[#303030] text-[#d8dbe2]"
                                    />
                                  </div>

                                  <div>
                                    <p className="text-sm font-medium text-white">{simulatedUi.chatgpt.moreAboutYouLabel}</p>
                                    <Input
                                      readOnly
                                      onFocus={() => setChatGptPanel("caracteristicas")}
                                      value={simulatedUi.chatgpt.moreAboutYouValue}
                                      className="mt-2 h-11 rounded-[10px] border-white/12 bg-[#303030] text-[#d8dbe2]"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div
                                className={cn(
                                  "mt-6 rounded-[20px] border p-4 transition",
                                  chatGptPanel === "memoria"
                                    ? "border-white/16 bg-white/[0.04]"
                                    : "border-transparent bg-transparent"
                                )}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-2">
                                    <h5 className="text-[1.15rem] font-medium text-white">
                                      {localizedChatGptPanels.memoria.title}
                                    </h5>
                                    <CircleHelp className="h-4 w-4 text-[#949aa5]" />
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => setChatGptPanel("memoria")}
                                    className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-[#f0f2f6] transition hover:bg-white/10"
                                  >
                                    {simulatedUi.chatgpt.manage}
                                  </button>
                                </div>
                                <div className="mt-4 border-t border-white/10" />

                                <div className="mt-4 space-y-1">
                                  {chatGptMemoryItems.map((item) => (
                                    <button
                                      key={item.title}
                                      type="button"
                                      onClick={() => setChatGptPanel("memoria")}
                                      className="flex w-full items-start justify-between gap-4 rounded-xl px-1 py-3 text-left transition hover:bg-white/4"
                                    >
                                      <div>
                                        <p className="text-[1.02rem] font-medium text-white">{item.title}</p>
                                        <p className="mt-1 text-sm leading-7 text-[#a9adb5]">{item.description}</p>
                                      </div>
                                      <span className="mt-1 inline-flex h-7 w-12 shrink-0 items-center rounded-full bg-[#0a84ff] px-1">
                                        <span className="ml-auto h-5 w-5 rounded-full bg-white" />
                                      </span>
                                    </button>
                                  ))}
                                </div>

                                <div className="mt-3 border-t border-white/10 pt-4 text-sm leading-7 text-[#a9adb5]">
                                  {localizedChatGptPanels.memoria.description}
                                </div>
                              </div>

                              <div className="mt-6 rounded-[18px] border border-[#244438] bg-[#173226] px-4 py-3 text-sm leading-7 text-[#cbefdd]">
                                {simulatedUi.chatgpt.tip}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-[1.7rem] font-black leading-tight text-[#d97706]">
            {journeyUi.claudeTitle}
          </h3>
          <p className="mt-3 text-[1.02rem] leading-8 text-[#374151]">
            {journeyUi.claudeDescription}
          </p>

          <div className="mt-5 overflow-hidden rounded-[32px] border border-[#433d35] bg-[#262522] shadow-[0_28px_80px_rgba(26,22,18,0.34)]">
            <div className="border-b border-[#3f3932] bg-[#211f1c] px-5 py-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
                <span className="inline-flex w-fit rounded-full border border-[#c28b5a]/20 bg-[#c28b5a]/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-[#efc9a2]">
                  {simulatedUi.claude.simulationBadge}
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#f5eadb]">{simulatedUi.claude.simulationTitle}</p>
                  <p className="mt-1 text-xs leading-6 text-[#c7b8a8]">
                    {simulatedUi.claude.simulationDescription}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid min-h-[720px] md:grid-cols-[36px_1fr]">
              <div className="border-r border-[#3a352f] bg-[#23211f]">
                <div className="flex h-full flex-col items-center justify-between py-4">
                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={() => setClaudeScreen("home")}
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-[#4b433a] text-[#d9d1c4] transition hover:bg-white/5"
                    >
                      <div className="grid gap-0.5">
                        <span className="h-0.5 w-3 rounded-full bg-current" />
                        <span className="h-0.5 w-3 rounded-full bg-current" />
                      </div>
                    </button>

                    {claudeSideActions.map((label, index) => {
                      const item = [
                        { icon: Plus },
                        { icon: Search },
                        { icon: FileText },
                        { icon: Brain },
                        { icon: LayoutDashboard },
                        { icon: Bot },
                      ][index] ?? { icon: Bot };
                      const Icon = item.icon;

                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setClaudeScreen("home")}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-[#c8bdaa] transition hover:bg-white/5 hover:text-[#efe3d0]"
                        >
                          <Icon className="h-4 w-4" />
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setClaudeScreen("home")}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-[#c8bdaa] transition hover:bg-white/5 hover:text-[#efe3d0]"
                    >
                      <Map className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenClaudeProfile()}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#5b544b] bg-[#d9d5d1] text-sm font-black text-[#4a4136] shadow-sm transition hover:scale-[1.03]"
                    >
                      {claudeProfileInitials}
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative flex min-h-[720px] flex-col overflow-hidden bg-[#262522]">
                <button
                  type="button"
                  onClick={() => handleOpenClaudeProfile()}
                  className="absolute right-4 top-4 z-[1] flex h-8 min-w-[2rem] items-center justify-center rounded-full border border-[#4f4941] bg-[#2e2c29] px-2 text-[11px] font-black text-[#e9dfd3] transition hover:bg-[#35332f]"
                >
                  {claudeProfileInitials}
                </button>

                <div className="flex flex-1 flex-col items-center justify-center px-6 pb-20 pt-12">
                  <div className="w-full max-w-[780px] text-center">
                    <div className="inline-flex items-center gap-2 rounded-lg border border-[#4c433a] bg-[#1f1d1b] px-3 py-1.5 text-sm text-[#d0c4b6]">
                      <span>{simulatedUi.claude.freePlan}</span>
                      <span className="text-[#8e7b65]">•</span>
                      <span className="text-[#d9ae7b]">{simulatedUi.claude.upgrade}</span>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-3 text-[#e7d8c8]">
                      <Sparkles className="h-7 w-7 text-[#dd8458]" />
                      <h4 className="font-serif text-[2.5rem] leading-tight tracking-[-0.03em]">
                        {claudeGreetingTitle}
                      </h4>
                    </div>

                    <div className="mx-auto mt-8 max-w-[560px] rounded-[24px] border border-[#474139] bg-[#302e2a] p-4 shadow-[0_18px_42px_rgba(0,0,0,0.16)]">
                      <div className="min-h-[34px] text-left text-[1.02rem] text-[#bdb3a7]">
                        {simulatedUi.claude.promptPlaceholder}
                      </div>

                      <div className="mt-5 flex items-center justify-between text-sm text-[#d8cfc4]">
                        <button
                          type="button"
                          onClick={() => setClaudeScreen("home")}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-[#cbbda9] transition hover:bg-white/5"
                        >
                          <Plus className="h-4 w-4" />
                        </button>

                        <div className="flex items-center gap-4">
                          <span>Sonnet 4.6</span>
                          <span className="tracking-[0.35em] text-[#a79b8d]">|||</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                      {claudeShortcuts.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handleOpenClaudeProfile(item === claudeShortcuts[2] ? "estilos" : "perfil")}
                          className="rounded-full border border-[#4c463e] bg-[#24221f] px-4 py-2 text-sm text-[#ddd2c6] transition hover:bg-[#2c2925]"
                        >
                          {item}
                        </button>
                      ))}
                    </div>

                    <p className="mx-auto mt-5 max-w-[620px] rounded-full border border-[#4c463e] bg-[#24221f] px-4 py-3 text-sm leading-7 text-[#d0c7bb]">
                      {simulatedUi.claude.profileHint}
                    </p>
                  </div>
                </div>

                <AnimatePresence>
                  {claudeScreen === "profile" ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-10 bg-black/62 backdrop-blur-[2px]"
                    >
                      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                          initial={{ opacity: 0, y: 18, scale: 0.985 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 18, scale: 0.985 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="flex h-[min(620px,100%)] w-full max-w-[860px] overflow-hidden rounded-[24px] border border-[#4c443c] bg-[#262522] shadow-[0_36px_90px_rgba(0,0,0,0.46)]"
                        >
                          <div className="w-[220px] shrink-0 border-r border-[#3b362f] bg-[#23211f] p-4">
                            <button
                              type="button"
                              onClick={() => setClaudeScreen("home")}
                              className="flex h-9 w-9 items-center justify-center rounded-full text-[#e6dbcf] transition hover:bg-white/6"
                            >
                              <X className="h-4 w-4" />
                            </button>

                            <div className="mt-5 rounded-[18px] border border-[#4b443b] bg-[#2b2824] px-4 py-3">
                              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#b89d80]">Claude</p>
                              <p className="mt-2 text-sm leading-6 text-[#eadfce]">
                                {simulatedUi.claude.settingsOpenedFromProfile}
                              </p>
                            </div>

                            <div className="mt-5 space-y-2">
                              {[
                                { id: "perfil", label: claudeProfileMenu[0] ?? activeClaudePanel.title },
                                { id: "projetos", label: claudeProfileMenu[1] ?? localizedClaudePanels.projetos.title },
                                { id: "estilos", label: claudeProfileMenu[2] ?? localizedClaudePanels.estilos.title },
                              ].map((item) => (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() => setClaudePanel(item.id as keyof typeof claudePanels)}
                                  className={cn(
                                    "flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm transition-all",
                                    claudePanel === item.id
                                      ? "bg-[#3a3530] text-[#fff5ea]"
                                      : "text-[#d7cbbd] hover:bg-white/6"
                                  )}
                                >
                                  <span>{item.label}</span>
                                  <ChevronRight className="h-4 w-4" />
                                </button>
                              ))}
                            </div>

                            <div className="mt-6 rounded-[18px] border border-[#4b443b] bg-[#2b2824] p-4 text-sm leading-7 text-[#cdbfad]">
                              {simulatedUi.claude.flowLabel(activeClaudePanel.title)}
                            </div>
                          </div>

                          <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
                            <div className="mx-auto max-w-[560px]">
                              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#b89d80]">
                                {simulatedUi.claude.profileEyebrow}
                              </p>
                              <h4 className="mt-3 font-serif text-[2rem] leading-tight text-[#f5eadb]">
                                {activeClaudePanel.title}
                              </h4>
                              <p className="mt-3 text-sm leading-7 text-[#cabfaf]">
                                {activeClaudePanel.description}
                              </p>
                              <div className="mt-4 border-t border-[#3d3832]" />

                              {claudePanel === "perfil" ? (
                                <div className="mt-6 space-y-5">
                                  <div>
                                    <p className="text-sm font-medium text-[#f5eadb]">{claudeProfileFields.whoAreYouLabel}</p>
                                    <Input
                                      readOnly
                                      value={claudeProfileFields.whoAreYouValue}
                                      className="mt-2 h-11 rounded-[10px] border-[#4e473f] bg-[#302d29] text-[#eadfce]"
                                    />
                                  </div>

                                  <div>
                                    <p className="text-sm font-medium text-[#f5eadb]">{claudeProfileFields.preferredLanguageLabel}</p>
                                    <Input
                                      readOnly
                                      value={claudeProfileFields.preferredLanguageValue}
                                      className="mt-2 h-11 rounded-[10px] border-[#4e473f] bg-[#302d29] text-[#eadfce]"
                                    />
                                  </div>

                                  <div>
                                    <p className="text-sm font-medium text-[#f5eadb]">{claudeProfileFields.responseLabel}</p>
                                    <textarea
                                      readOnly
                                      className="mt-2 min-h-[132px] w-full resize-none rounded-[16px] border border-[#4e473f] bg-[#302d29] px-4 py-3 text-sm leading-7 text-[#eadfce] outline-none"
                                      value={claudeProfileFields.responseValue}
                                    />
                                  </div>

                                  <div className="rounded-[18px] border border-[#51463b] bg-[#2d2925] p-4 text-sm leading-7 text-[#d7c9ba]">
                                    {claudeProfileFields.profileTip}
                                  </div>
                                </div>
                              ) : null}

                              {claudePanel === "projetos" ? (
                                <div className="mt-6 space-y-4">
                                  {claudeProjectCards.map((item) => (
                                    <button
                                      key={item.title}
                                      type="button"
                                      className="w-full rounded-[20px] border border-[#4e473f] bg-[#2f2b27] p-4 text-left transition hover:bg-[#35312c]"
                                    >
                                      <p className="text-[1.02rem] font-semibold text-[#f5eadb]">{item.title}</p>
                                      <p className="mt-2 text-sm leading-7 text-[#cbbfad]">{item.description}</p>
                                    </button>
                                  ))}

                                  <div className="rounded-[18px] border border-[#51463b] bg-[#2d2925] p-4 text-sm leading-7 text-[#d7c9ba]">
                                    {simulatedUi.claude.projectsTip}
                                  </div>
                                </div>
                              ) : null}

                              {claudePanel === "estilos" ? (
                                <div className="mt-6 space-y-4">
                                  {claudeStyleOptions.map((item) => (
                                    <button
                                      key={item}
                                      type="button"
                                      className="flex w-full items-center justify-between rounded-[20px] border border-[#4e473f] bg-[#2f2b27] px-4 py-4 text-left transition hover:bg-[#35312c]"
                                    >
                                      <span className="text-[1.02rem] font-semibold text-[#f5eadb]">{item}</span>
                                      <span className="text-sm text-[#d3c6b7]">{simulatedUi.claude.select}</span>
                                    </button>
                                  ))}

                                  <textarea
                                    readOnly
                                    className="min-h-[132px] w-full resize-none rounded-[16px] border border-[#4e473f] bg-[#302d29] px-4 py-3 text-sm leading-7 text-[#eadfce] outline-none"
                                    value={simulatedUi.claude.customStyleValue}
                                  />
                                </div>
                              ) : null}

                              <div className="mt-6 rounded-[18px] border border-[#7f5a34] bg-[#3b2c1e] px-4 py-3 text-sm leading-7 text-[#f4ddc6]">
                                {simulatedUi.claude.stylesTip}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[30px] border border-[#ffd8c0] bg-white/90 p-5 shadow-sm">
          <h3 className="font-serif text-[2rem] leading-tight text-[#26438f]">{copy.personalize.templateTitle}</h3>
          <p className="mt-3 text-[1.02rem] leading-8 text-[#374151]">
            {copy.personalize.templateDescription}
          </p>

          <div className="mt-5 overflow-x-auto rounded-[24px] border border-[#ffd9b5] bg-[#fff8f0] p-5">
            <pre className="font-mono text-sm leading-7 text-[#6c370d]">
              {localizedTemplateLines.join("\n")}
            </pre>
          </div>
        </div>

        <ContinueFooter
          label={copy.personalize.continueLabel}
          helper={copy.personalize.continueHelper}
          onComplete={onComplete}
        />
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper>
      <SectionIntro
        eyebrow={copy.practice.eyebrow}
        title={copy.practice.title}
        description={copy.practice.description}
      />

      <div className="mt-8 space-y-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="rounded-[28px] border border-[#dbe7ff] bg-white/90 p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#2563eb]">{copy.practice.exercise1.eyebrow}</p>
          <h3 className="mt-2 font-serif text-[1.75rem] text-[#1f2434]">{copy.practice.exercise1.title}</h3>
          <p className="mt-3 text-[1.02rem] leading-8 text-[#374151]">
            {copy.practice.exercise1.question}
          </p>

          <div className="mt-5 space-y-3">
            {localizedExerciseOneOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setExerciseOneChoice(option.id)}
                className={cn(
                  "w-full rounded-[22px] border p-4 text-left text-sm leading-7 transition-all",
                  exerciseOneChoice === option.id
                    ? option.isCorrect
                      ? "border-emerald-300 bg-emerald-50"
                      : "border-rose-300 bg-rose-50"
                    : "border-[#e6ebf2] bg-[#fbfcfe] hover:border-[#cbd5e1]"
                )}
              >
                <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#1f2434] text-xs font-black uppercase text-white">
                  {option.id}
                </span>
                {option.text}
              </button>
            ))}
          </div>

          {exerciseOneChoice ? (
            <div
              className={cn(
                "mt-4 rounded-[22px] border p-4 text-sm leading-7",
                isExerciseOneCorrect
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                  : "border-rose-300 bg-rose-50 text-rose-800"
              )}
            >
              {isExerciseOneCorrect
                ? copy.practice.exercise1.correct
                : copy.practice.exercise1.incorrect}
            </div>
          ) : null}
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="rounded-[28px] border border-[#dcefdc] bg-white/90 p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#15803d]">{copy.practice.exercise2.eyebrow}</p>
          <h3 className="mt-2 font-serif text-[1.75rem] text-[#1f2434]">{copy.practice.exercise2.title}</h3>
          <p className="mt-3 text-[1.02rem] leading-8 text-[#374151]">
            {copy.practice.exercise2.question}
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Input
              value={exerciseTwoInput}
              onChange={(event) => {
                setExerciseTwoInput(event.target.value);
                setExerciseTwoChecked(false);
              }}
              placeholder={copy.practice.exercise2.placeholder}
              className="h-12 rounded-2xl border-[#d9e4d9]"
            />
            <Button
              type="button"
              onClick={() => setExerciseTwoChecked(true)}
              className="h-12 rounded-2xl bg-[#1f2434] px-6 hover:bg-[#111726]"
            >
              {copy.practice.exercise2.verify}
            </Button>
          </div>

          {exerciseTwoChecked ? (
            <div
              className={cn(
                "mt-4 rounded-[22px] border p-4 text-sm leading-7",
                isExerciseTwoCorrect
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                  : "border-amber-300 bg-amber-50 text-amber-900"
              )}
            >
              {isExerciseTwoCorrect
                ? copy.practice.exercise2.correct
                : copy.practice.exercise2.incorrect}
            </div>
          ) : null}
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="rounded-[28px] border border-[#f0dec4] bg-white/90 p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#b45309]">{copy.practice.exercise3.eyebrow}</p>
          <h3 className="mt-2 font-serif text-[1.75rem] text-[#1f2434]">{copy.practice.exercise3.title}</h3>
          <p className="mt-3 text-[1.02rem] leading-8 text-[#374151]">
            {copy.practice.exercise3.question}
          </p>

          <div className="mt-5 rounded-[22px] border border-[#f5e5d2] bg-[#fff8f1] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#6b4d1f]">
                  {activeExerciseThreePair
                    ? copy.practice.exercise3.activePrompt(activeExerciseThreePair.label)
                    : copy.practice.exercise3.idlePrompt}
                </p>
                <p className="mt-1 text-sm leading-7 text-[#8b5e28]">
                  {copy.practice.exercise3.secondaryPrompt}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="rounded-full border border-[#efd9bf] bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#9a5b14]">
                  {copy.practice.exercise3.connectionsCount(Object.keys(exerciseThreeAnswers).length, exerciseThreePairs.length)}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClearExerciseThreeConnections}
                  className="h-10 rounded-2xl border-[#e7ccb0] bg-white px-4 text-sm text-[#7c4b16] hover:bg-[#fff3e3]"
                >
                  {copy.practice.exercise3.clearButton}
                </Button>
              </div>
            </div>
          </div>

          {exerciseThreeFeedback ? (
            <div
              className={cn(
                "mt-4 rounded-[22px] border p-4 text-sm leading-7",
                exerciseThreeFeedback.type === "success"
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                  : "border-rose-300 bg-rose-50 text-rose-800"
              )}
            >
              {exerciseThreeFeedback.message}
            </div>
          ) : null}

          <div
            ref={exerciseThreeBoardRef}
            className="relative mt-5 overflow-hidden rounded-[28px] border border-[#ece5dc] bg-[linear-gradient(135deg,#fcfaf7_0%,#fff7ef_100%)] p-4 sm:p-5"
          >
            <svg
              className="pointer-events-none absolute inset-0 z-0 h-full w-full"
              viewBox={`0 0 ${Math.max(exerciseThreeBoardSize.width, 1)} ${Math.max(exerciseThreeBoardSize.height, 1)}`}
              preserveAspectRatio="none"
            >
              {exerciseThreeLines.map((line) => {
                const curveOffset = Math.max(40, Math.abs(line.x2 - line.x1) / 2);
                const stroke = line.isCorrect ? "#10b981" : "#f59e0b";

                return (
                  <g key={`${line.pairId}-${line.answerId}`}>
                    <motion.path
                      d={`M ${line.x1} ${line.y1} C ${line.x1 + curveOffset} ${line.y1}, ${line.x2 - curveOffset} ${line.y2}, ${line.x2} ${line.y2}`}
                      fill="none"
                      stroke={stroke}
                      strokeWidth="4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    />
                    <circle cx={line.x1} cy={line.y1} r="5" fill={stroke} />
                    <circle cx={line.x2} cy={line.y2} r="5" fill={stroke} />
                  </g>
                );
              })}
            </svg>

            <div className="relative z-10 grid grid-cols-[minmax(0,1fr)_32px_minmax(0,1fr)] gap-3 sm:grid-cols-[minmax(0,1fr)_88px_minmax(0,1fr)] sm:gap-5">
              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.26em] text-[#b45309]">{copy.practice.exercise3.leftColumn}</p>
                <div className="space-y-3">
                  {exerciseThreePairs.map((pair) => {
                    const assignedAnswer = exerciseThreeAnswers[pair.id];
                    const isActive = activeExerciseThreePairId === pair.id;

                    return (
                      <button
                        key={pair.id}
                        type="button"
                        onClick={() => handleSelectExerciseThreePair(pair.id)}
                        className={cn(
                          "relative w-full rounded-[22px] border bg-white p-4 pr-12 text-left shadow-sm transition-all",
                          isActive
                            ? "border-[#ff8f35] ring-2 ring-[#ffd4ae]"
                            : "border-[#e8ddd2] hover:border-[#f2c08e] hover:bg-[#fffdf9]"
                        )}
                      >
                        <span
                          ref={(node) => {
                            exerciseThreeLeftDotRefs.current[pair.id] = node;
                          }}
                          className={cn(
                            "absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white shadow-sm",
                            assignedAnswer ? "bg-[#ff8f35]" : "bg-[#d7d0c8]"
                          )}
                        />

                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold leading-7 text-[#1f2434]">{pair.label}</span>
                          {assignedAnswer ? (
                            <span className="rounded-full bg-[#fff0df] px-2.5 py-1 text-xs font-bold text-[#b45309]">
                              {assignedAnswer}
                            </span>
                          ) : null}
                        </div>

                        <p className="mt-2 text-xs leading-6 text-[#6b7280]">
                          {assignedAnswer
                            ? copy.practice.exercise3.rowConnected
                            : copy.practice.exercise3.rowIdle}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="h-full w-px bg-[linear-gradient(180deg,rgba(251,191,36,0.12)_0%,rgba(217,119,6,0.35)_40%,rgba(251,191,36,0.12)_100%)]" />
              </div>

              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.26em] text-[#b45309]">{copy.practice.exercise3.rightColumn}</p>
                <div className="space-y-3">
                  {localizedExerciseThreeLegend.map((option) => {
                    const linkedPair = exerciseThreePairs.find(
                      (pair) => exerciseThreeAnswers[pair.id] === option.id
                    );

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleConnectExerciseThreePair(option.id)}
                        className={cn(
                          "relative w-full rounded-[22px] border bg-white p-4 pl-12 text-left shadow-sm transition-all",
                          linkedPair
                            ? "border-[#f1c48d] bg-[#fffdf8]"
                            : "border-[#e8ddd2] hover:border-[#f2c08e] hover:bg-[#fffdf9]",
                          activeExerciseThreePairId ? "ring-1 ring-[#ffe1bf]" : ""
                        )}
                      >
                        <span
                          ref={(node) => {
                            exerciseThreeRightDotRefs.current[option.id] = node;
                          }}
                          className={cn(
                            "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white shadow-sm",
                            linkedPair ? "bg-[#ff8f35]" : "bg-[#d7d0c8]"
                          )}
                        />

                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-[#fff3e3] px-2.5 py-1 text-xs font-black text-[#b45309]">
                            {option.id}
                          </span>
                          {linkedPair ? (
                            <span className="rounded-full bg-[#eff6ff] px-2.5 py-1 text-xs font-bold text-[#1d4ed8]">
                              {linkedPair.label}
                            </span>
                          ) : null}
                        </div>

                        <p className="mt-2 text-sm leading-7 text-[#2f3445]">{option.label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {areAllExerciseThreeAnswered ? (
            <div
              className={cn(
                "mt-4 rounded-[22px] border p-4 text-sm leading-7",
                isExerciseThreeCorrect
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                  : "border-amber-300 bg-amber-50 text-amber-900"
              )}
            >
              {isExerciseThreeCorrect
                ? copy.practice.exercise3.allCorrect
                : copy.practice.exercise3.allReview}
            </div>
          ) : null}
        </motion.div>
      </div>

      <div className="mt-8 rounded-[30px] border border-[#eadfce] bg-white/90 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <Map className="h-5 w-5 text-[#ff6a00]" />
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#d35f12]">{copy.practice.mission.badge}</p>
        </div>
        <h3 className="mt-3 font-serif text-[1.85rem] leading-tight text-[#1f2434]">{copy.practice.mission.title}</h3>
        <p className="mt-3 text-[1.02rem] leading-8 text-[#374151]">
          {copy.practice.mission.description}
        </p>

        <div className="mt-5 space-y-3">
          {copy.practice.mission.steps.map((item: string, index: number) => (
            <div key={item} className="flex items-start gap-3 rounded-[20px] border border-[#ece5dc] bg-[#fcfaf7] p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1f2434] text-sm font-black text-white">
                {index + 1}
              </div>
              <p className="text-sm leading-7 text-[#374151]">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-[30px] border border-[#d7ead8] bg-[linear-gradient(135deg,#edfdf1_0%,#f7fff9_100%)] p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#15803d]">{copy.practice.status.badge}</p>
            <h3 className="mt-2 font-serif text-[1.85rem] leading-tight text-[#164e2c]">
              {copy.practice.status.title}
            </h3>
            <p className="mt-3 text-[1.02rem] leading-8 text-[#2d5b3d]">
              {copy.practice.status.description}
            </p>
          </div>

          <div className="rounded-[20px] border border-[#cce7cf] bg-white/80 px-4 py-3 text-sm font-semibold text-[#2d5b3d]">
            {copy.practice.status.progress(progressSummary.completed, progressSummary.total)}
          </div>
        </div>

        <ContinueFooter
          label={copy.practice.status.continueLabel}
          helper={
            unlockedFinalButton
              ? copy.practice.status.continueReady
              : copy.practice.status.continueLocked
          }
          onComplete={onComplete}
          disabled={!unlockedFinalButton}
        />
      </div>
    </SectionWrapper>
  );
};

export default GuilhermeDay1Journey;
