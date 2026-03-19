import { aiToolsConfig } from "@/components/lesson/AIToolSelector";

export interface MasteryTrailModule {
  title: string;
  summary: string;
  outcome: string;
}

export interface MasteryTrail {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  category: string;
  intensity: string;
  durationLabel: string;
  lessonCount: number;
  deliverable: string;
  signature: string;
  audience: string;
  modules: MasteryTrailModule[];
  vibe: [string, string, string];
  accent: string;
  logo?: string;
}

const withToolVisual = (slug: string, trail: Omit<MasteryTrail, "accent" | "logo">): MasteryTrail => ({
  ...trail,
  accent: aiToolsConfig[slug]?.color || "#f97316",
  logo: aiToolsConfig[slug]?.logo,
});

export const aiMasteryTrails: MasteryTrail[] = [
  withToolVisual("midjourney", {
    slug: "midjourney",
    name: "MidJourney",
    headline: "Trilha de direcao visual com MidJourney",
    summary: "Uma trilha pratica para dominar prompt visual, luz, formato, camera e aplicacao em marketing com MidJourney.",
    category: "Arte e direcao visual",
    intensity: "Visual premium",
    durationLabel: "6 modulos",
    lessonCount: 6,
    deliverable: "Biblioteca visual pronta para portfolio e marketing",
    signature: "Imagem com intencao e assinatura.",
    audience: "Para quem quer construir linguagem visual forte, nao so gerar imagens soltas.",
    vibe: ["cinema", "arte", "assinatura"],
    modules: [
      { title: "Primeira arte", summary: "Acesso, /imagine, U, V e primeiros prompts.", outcome: "Primeira geracao com clareza." },
      { title: "Iluminacao", summary: "Golden hour, neon, chiaroscuro e atmosferas.", outcome: "Mapa de luz por objetivo." },
      { title: "Formato", summary: "Aspect ratio e composicao por canal.", outcome: "Prompts otimizados por plataforma." },
      { title: "Camera", summary: "Ponto de vista como ferramenta narrativa.", outcome: "Angulos com intencao." },
      { title: "Combinacao", summary: "Como empilhar estilo, luz, mood e parametros.", outcome: "Prompt avancado coerente." },
      { title: "Marketing", summary: "Produto, feed, ad, story e campanha.", outcome: "Sistema visual para conversao." },
    ],
  }),
  withToolVisual("gemini", {
    slug: "gemini",
    name: "Gemini",
    headline: "Trilha multimodal com Gemini",
    summary: "Uma trilha para texto, arquivos, contexto e trabalho integrado com o ecossistema Google.",
    category: "Google e multimodal",
    intensity: "Workspace conectado",
    durationLabel: "4 modulos",
    lessonCount: 12,
    deliverable: "Sistema multimodal de trabalho e estudo",
    signature: "Tudo conversa com tudo.",
    audience: "Para quem quer usar arquivos, imagens e contexto em um mesmo fluxo produtivo.",
    vibe: ["arquivos", "multimodal", "workspace"],
    modules: [
      { title: "Briefing em camadas", summary: "Pergunta, contexto e objetivo no mesmo fluxo.", outcome: "Modelo de briefing multimodal." },
      { title: "Leitura com arquivos", summary: "Documentos longos com mais clareza e velocidade.", outcome: "Rotina de estudo assistida." },
      { title: "Imagem e contexto", summary: "Interpretando screenshots e recursos visuais.", outcome: "Fluxo visual para decisao." },
      { title: "Painel de rotina", summary: "Organizando uso diario com Gemini.", outcome: "Sistema integrado pessoal." },
    ],
  }),
  withToolVisual("chatgpt", {
    slug: "chatgpt",
    name: "ChatGPT",
    headline: "Trilha especialista em ChatGPT",
    summary: "Uma trilha para transformar prompts soltos em sistema de trabalho, conteudo e produtividade.",
    category: "Texto, prompts e operacoes",
    intensity: "Execucao pratica",
    durationLabel: "4 modulos",
    lessonCount: 12,
    deliverable: "Operating system de prompts para trabalho real",
    signature: "Do prompt solto ao sistema replicavel.",
    audience: "Para quem quer transformar ChatGPT em motor diario de execucao.",
    vibe: ["prompting", "workflow", "operacao"],
    modules: [
      { title: "Arquitetura de prompts", summary: "Contexto, restricoes e saidas previsiveis.", outcome: "Biblioteca essencial de prompts." },
      { title: "Rotinas de trabalho", summary: "Pesquisa, escrita, organizacao e revisao.", outcome: "Stack de produtividade pessoal." },
      { title: "Conteudo e distribuicao", summary: "Posts, emails, paginas e roteiros com consistencia.", outcome: "Sistema de conteudo assistido." },
      { title: "Playbook final", summary: "Como transformar tudo em um metodo repetivel.", outcome: "Playbook de uso real." },
    ],
  }),
  withToolVisual("deepseek", {
    slug: "deepseek",
    name: "DeepSeek",
    headline: "Trilha tecnica com DeepSeek",
    summary: "Uma trilha pensada para codigo, logica, debugging e raciocinio tecnico em profundidade.",
    category: "Codigo e logica",
    intensity: "Hands on tecnico",
    durationLabel: "4 modulos",
    lessonCount: 12,
    deliverable: "Kit tecnico para analise e automacao",
    signature: "Pensamento tecnico com mais profundidade.",
    audience: "Para perfis tecnicos que querem uma IA para pensar junto de verdade.",
    vibe: ["debug", "refatoracao", "sistemas"],
    modules: [
      { title: "Decomposicao de problema", summary: "Quebrando desafios em blocos resolviveis.", outcome: "Metodo de raciocinio tecnico." },
      { title: "Debug guiado", summary: "Logs, causas raiz e validacao de hipoteses.", outcome: "Checklist de troubleshooting." },
      { title: "Refatoracao assistida", summary: "Estrutura, legibilidade e performance.", outcome: "Fluxo de refatoracao com IA." },
      { title: "Projeto final", summary: "Mini build tecnico com apoio da IA.", outcome: "Entrega tecnica aplicada." },
    ],
  }),
  withToolVisual("lovable", {
    slug: "lovable",
    name: "Lovable",
    headline: "Trilha de produto com Lovable",
    summary: "Uma trilha independente para transformar ideia em app, prototipo navegavel e produto apresentavel.",
    category: "Apps e produtos",
    intensity: "Produto em movimento",
    durationLabel: "4 modulos",
    lessonCount: 12,
    deliverable: "Blueprint de produto pronto para validacao",
    signature: "Da ideia ao prototipo navegavel.",
    audience: "Para quem quer tirar um produto da cabeca e colocar na tela rapido.",
    vibe: ["produto", "ux", "shipping"],
    modules: [
      { title: "Tese de produto", summary: "Problema, usuario e promessa central.", outcome: "Documento de tese." },
      { title: "Arquitetura da experiencia", summary: "Fluxo de telas e hierarquia.", outcome: "Mapa navegavel da experiencia." },
      { title: "Construcao com prompts", summary: "Como pedir paginas, blocos e refinamentos.", outcome: "Prompt stack de build." },
      { title: "Demo final", summary: "Polimento visual e narrativa de produto.", outcome: "Versao pronta para mostrar." },
    ],
  }),
  withToolVisual("grok", {
    slug: "grok",
    name: "Grok",
    headline: "Trilha radar com Grok",
    summary: "Uma trilha para usar Grok como radar de tendencia, contexto e leitura de mercado em tempo real.",
    category: "Tempo real e leitura de cenario",
    intensity: "Radar de sinais",
    durationLabel: "4 modulos",
    lessonCount: 10,
    deliverable: "Rotina de inteligencia em tempo real",
    signature: "Contexto vivo para agir mais rapido.",
    audience: "Para quem trabalha com timing, narrativas e leitura de movimento.",
    vibe: ["sinais", "tendencias", "mercado"],
    modules: [
      { title: "Leitura de sinais", summary: "Separando o que importa do ruido.", outcome: "Painel de monitoramento rapido." },
      { title: "Contexto e narrativa", summary: "Interpretando debates e movimentos.", outcome: "Mapa narrativo do tema." },
      { title: "Atualizacao diaria", summary: "Resumos rapidos para decisao e conteudo.", outcome: "Ritual de atualizacao." },
      { title: "Aplicacao em negocio", summary: "Transformando cenario em acao.", outcome: "Template de resposta ao mercado." },
    ],
  }),
  withToolVisual("claude", {
    slug: "claude",
    name: "Claude",
    headline: "Trilha analitica com Claude",
    summary: "Uma trilha feita para leitura profunda, sintese estrategica e tomada de decisao mais clara.",
    category: "Analise e raciocinio",
    intensity: "Pensamento estrategico",
    durationLabel: "4 modulos",
    lessonCount: 12,
    deliverable: "Sala de decisao com Claude",
    signature: "Pensar melhor antes de executar.",
    audience: "Ideal para quem precisa estudar, resumir e decidir com mais profundidade.",
    vibe: ["estrategia", "leitura", "sintese"],
    modules: [
      { title: "Leitura de contexto", summary: "Importando materiais densos e organizando o raciocinio.", outcome: "Mapa mental do problema." },
      { title: "Sintese de alto nivel", summary: "Resumos executivos e comparativos em camadas.", outcome: "Briefings claros e acionaveis." },
      { title: "Diagnostico e debate", summary: "Argumentos, riscos e contradicoes.", outcome: "Quadro de decisao com pros e contras." },
      { title: "Operacao editorial", summary: "Notas, relatorios e entregas estruturadas.", outcome: "Template editorial final." },
    ],
  }),
  withToolVisual("gamma", {
    slug: "gamma",
    name: "Gamma",
    headline: "Trilha de apresentacoes com Gamma",
    summary: "Uma trilha para transformar ideias em apresentacoes, documentos visuais e storytelling de alto impacto.",
    category: "Apresentacoes e narrativa visual",
    intensity: "Storytelling visual",
    durationLabel: "4 modulos",
    lessonCount: 12,
    deliverable: "Deck visual pronto para apresentar",
    signature: "Ideias melhor embaladas vendem mais.",
    audience: "Para quem precisa apresentar melhor, vender melhor e organizar narrativa com mais clareza.",
    vibe: ["slides", "narrativa", "visual"],
    modules: [
      { title: "Estrutura da mensagem", summary: "Organizando a ideia principal antes do design.", outcome: "Roteiro da apresentacao." },
      { title: "Narrativa em slides", summary: "Transformando texto em sequencia clara e convincente.", outcome: "Fluxo visual de apresentacao." },
      { title: "Design com clareza", summary: "Hierarquia, impacto e leitura rapida.", outcome: "Padrao visual replicavel." },
      { title: "Deck final", summary: "Ajustes para pitch, aula ou proposta.", outcome: "Apresentacao pronta para uso." },
    ],
  }),
];

export const aiMasteryTrailsBySlug = Object.fromEntries(
  aiMasteryTrails.map((trail) => [trail.slug, trail]),
) as Record<string, MasteryTrail>;
