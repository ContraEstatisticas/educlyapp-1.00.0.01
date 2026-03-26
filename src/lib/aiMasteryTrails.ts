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
    durationLabel: "6 módulos",
    lessonCount: 6,
    deliverable: "Biblioteca visual pronta para portfólio e marketing",
    signature: "Imagem com intenção e assinatura.",
    audience: "Para quem quer construir linguagem visual forte, não só gerar imagens soltas.",
    vibe: ["cinema", "arte", "assinatura"],
    modules: [
      { title: "Primeira arte", summary: "Acesso, /imagine, U, V e primeiros prompts.", outcome: "Primeira geração com clareza." },
      { title: "Iluminação", summary: "Golden hour, neon, chiaroscuro e atmosferas.", outcome: "Mapa de luz por objetivo." },
      { title: "Formato", summary: "Aspect ratio e composição por canal.", outcome: "Prompts otimizados por plataforma." },
      { title: "Câmera", summary: "Ponto de vista como ferramenta narrativa.", outcome: "Ângulos com intenção." },
      { title: "Combinação", summary: "Como empilhar estilo, luz, mood e parâmetros.", outcome: "Prompt avançado coerente." },
      { title: "Marketing", summary: "Produto, feed, ad, story e campanha.", outcome: "Sistema visual para conversão." },
    ],
  }),
  withToolVisual("gemini", {
    slug: "gemini",
    name: "Gemini",
    headline: "Trilha multimodal com Gemini",
    summary: "Uma trilha para texto, arquivos, contexto e trabalho integrado com o ecossistema Google.",
    category: "Google e multimodal",
    intensity: "Workspace conectado",
    durationLabel: "7 módulos",
    lessonCount: 7,
    deliverable: "Sistema multimodal de trabalho e estudo",
    signature: "Tudo conversa com tudo.",
    audience: "Para quem quer usar arquivos, imagens e contexto em um mesmo fluxo produtivo.",
    vibe: ["arquivos", "multimodal", "workspace"],
    modules: [
      { title: "O Modelo do Google", summary: "O que é o Gemini, como acessar, modelos e ecossistema.", outcome: "Visão clara do motor multimodal." },
      { title: "Eficiência com Documentos", summary: "Análise de PDFs, planilhas e extração de dados.", outcome: "Domínio de análise documental." },
      { title: "NotebookLM", summary: "Cadernos inteligentes e estudo avançado.", outcome: "Sistema de estudo com IA." },
      { title: "Deep Research", summary: "Pesquisas complexas e automatizadas.", outcome: "Habilidade de investigação profunda." },
      { title: "Imagen 3", summary: "Criação de imagens de alta qualidade.", outcome: "Produção visual com Gemini." },
      { title: "Prompting com Gemini", summary: "Técnicas específicas para o modelo Google.", outcome: "Prompts otimizados para Gemini." },
      { title: "Fluxo de Trabalho", summary: "Integrando todas as ferramentas Gemini.", outcome: "Sistema completo de produtividade." },
    ],
  }),
  withToolVisual("chatgpt", {
    slug: "chatgpt",
    name: "ChatGPT",
    headline: "Trilha especialista em ChatGPT",
    summary: "Uma trilha para transformar prompts soltos em sistema de trabalho, conteudo e produtividade.",
    category: "Texto, prompts e operacoes",
    intensity: "Execucao pratica",
    durationLabel: "8 módulos",
    lessonCount: 8,
    deliverable: "Operating system de prompts para trabalho real",
    signature: "Do prompt solto ao sistema replicável.",
    audience: "Para quem quer transformar ChatGPT em motor diário de execução.",
    vibe: ["prompting", "workflow", "operação"],
    modules: [
      { title: "O que é o ChatGPT?", summary: "Conceitos básicos e capacidades fundamentais.", outcome: "Fundação sólida em IA conversacional." },
      { title: "Anatomia do Prompt", summary: "Elementos de um prompt eficaz e erros comuns.", outcome: "Escrita de prompts profissionais." },
      { title: "ChatGPT Especialista", summary: "Técnicas de role-playing e persona.", outcome: "Respostas altamente contextualizadas." },
      { title: "Análise de Textos", summary: "Resumo, síntese e extração de insights.", outcome: "Produtividade em leitura e análise." },
      { title: "Conteúdo Original", summary: "Produção de textos, posts e roteiros.", outcome: "Motor de criação de conteúdo." },
      { title: "E-mails Profissionais", summary: "Comunicação executiva assistida por IA.", outcome: "Agilidade na comunicação corporativa." },
      { title: "Revisão e Prática", summary: "Consolidação das técnicas aprendidas.", outcome: "Domínio dos fundamentos." },
      { title: "Personalização Avançada", summary: "Custom Instructions e memória da IA.", outcome: "IA ajustada ao seu estilo." },
    ],
  }),
  withToolVisual("deepseek", {
    slug: "deepseek",
    name: "DeepSeek",
    headline: "Trilha tecnica com DeepSeek",
    summary: "Uma trilha pensada para codigo, logica, debugging e raciocinio tecnico em profundidade.",
    category: "Codigo e logica",
    intensity: "Hands on tecnico",
    durationLabel: "6 módulos",
    lessonCount: 6,
    deliverable: "Kit técnico para análise e automação",
    signature: "Pensamento técnico com mais profundidade.",
    audience: "Para perfis técnicos que querem uma IA para pensar junto de verdade.",
    vibe: ["debug", "refatoração", "sistemas"],
    modules: [
      { title: "O Modelo DeepSeek", summary: "Modelos V3, R1 e raciocínio visível.", outcome: "Compreensão da lógica DeepSeek." },
      { title: "Técnicas de Raciocínio", summary: "DeepThink e busca web integrada.", outcome: "Domínio de resoluções complexas." },
      { title: "Visão Computacional", summary: "Análise de imagens e diagramas técnicos.", outcome: "Leitura técnica visual." },
      { title: "Análise de Documentos", summary: "Contexto longo e extração de dados.", outcome: "Processamento de grandes volumes." },
      { title: "Eficiência e Automação", summary: "Prompts focados em resultados técnicos.", outcome: "Automação de processos lógicos." },
      { title: "DeepSeek Prático", summary: "Resolvendo problemas reais do dia a dia.", outcome: "Aplicação imediata das técnicas." },
    ],
  }),
  withToolVisual("lovable", {
    slug: "lovable",
    name: "Lovable",
    headline: "Trilha de produto com Lovable",
    summary: "Uma trilha independente para transformar ideia em app, prototipo navegavel e produto apresentavel.",
    category: "Apps e produtos",
    intensity: "Produto em movimento",
    durationLabel: "6 modulos",
    lessonCount: 6,
    deliverable: "Blueprint de produto pronto para validacao",
    signature: "Da ideia ao prototipo navegavel.",
    audience: "Para quem quer tirar um produto da cabeca e colocar na tela rapido.",
    vibe: ["produto", "ux", "shipping"],
    modules: [
      { title: "Fundamentos do Lovable", summary: "O que e a ferramenta, como funciona e como criar apps com prompts.", outcome: "Base para transformar ideia em aplicacao funcional." },
      { title: "Primeiro projeto do zero", summary: "Construcao do AgendaPro do prompt inicial ate testes e publicacao.", outcome: "Visao completa de criacao de produto por camadas." },
      { title: "Edicao via chat", summary: "Ajustes visuais, bugs, funcionalidades e iteracao segura.", outcome: "Fluxo de refinamento continuo sem tocar em codigo." },
      { title: "Importacoes de design", summary: "Figma, referencias visuais, componentes e sistemas de design.", outcome: "Velocidade com consistencia visual na construcao." },
      { title: "Conteudo para produto", summary: "Titulos, CTAs, beneficios, microcopy e onboarding.", outcome: "Texto estrategico para converter e orientar o usuario." },
      { title: "Planos e lancamento", summary: "Creditos, planos, dominio, publicacao e estrategia de crescimento.", outcome: "Capacidade de publicar com seguranca e escalar com metodo." },
    ],
  }),
  withToolVisual("grok", {
    slug: "grok",
    name: "Grok",
    headline: "Trilha radar com Grok",
    summary: "Uma trilha em construcao para usar Grok em pesquisa, leitura de contexto, criacao de conteudo e organizacao de processos.",
    category: "Tempo real e leitura de cenario",
    intensity: "Radar de sinais",
    durationLabel: "2 modulos",
    lessonCount: 2,
    deliverable: "Base de pesquisa e criacao visual com Grok",
    signature: "Contexto vivo para agir mais rapido.",
    audience: "Para quem trabalha com timing, narrativas e leitura de movimento.",
    vibe: ["sinais", "tendencias", "mercado"],
    modules: [
      { title: "Pesquisa, automacao e conteudo", summary: "Prompts claros, pesquisa inteligente, analise, ideias e processos com Grok.", outcome: "Base pratica para usar o Grok com mais contexto e direcao." },
      { title: "Fotos e videos com IA", summary: "Prompts visuais, estilos, thumbnails, videos curtos e refinamento com Grok.", outcome: "Base pratica para criar conteudo visual com mais controle." },
    ],
  }),
  withToolVisual("claude", {
    slug: "claude",
    name: "Claude",
    headline: "Trilha analitica com Claude",
    summary: "Uma trilha feita para leitura profunda, sintese estrategica e tomada de decisao mais clara.",
    category: "Analise e raciocinio",
    intensity: "Pensamento estrategico",
    durationLabel: "7 módulos",
    lessonCount: 7,
    deliverable: "Sala de decisão com Claude",
    signature: "Pensar melhor antes de executar.",
    audience: "Ideal para quem precisa estudar, resumir e decidir com mais profundidade.",
    vibe: ["estratégia", "leitura", "síntese"],
    modules: [
      { title: "Conhecendo o Claude", summary: "História, Anthropic e diferenciais do modelo.", outcome: "Entendimento da filosofia Claude." },
      { title: "Análise de Documentos", summary: "Contexto longo e extração profunda de dados.", outcome: "Domínio de análise estratégica." },
      { title: "Estratégia com Projetos", summary: "Usando Projects para organizar conhecimento.", outcome: "Sistema de base de conhecimento." },
      { title: "Artefatos do Claude", summary: "Criação visual e interativa em tempo real.", outcome: "Habilidade de prototipagem rápida." },
      { title: "Escrita Criativa", summary: "Tom de voz, estilo e redação de alto nível.", outcome: "Produção de textos premium." },
      { title: "Raciocínio Lógico", summary: "Debate, argumentação e tomada de decisão.", outcome: "Matriz de decisão assistida." },
      { title: "Claude no Dia a Dia", summary: "Fluxo contínuo e integração de rotinas.", outcome: "Produtividade estratégica total." },
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
