export type GuilhermeJourneyLocale = "pt" | "en" | "es" | "fr";

const SUPPORTED_GUILHERME_JOURNEY_LOCALES = new Set<GuilhermeJourneyLocale>([
  "pt",
  "en",
  "es",
  "fr",
]);

export const resolveGuilhermeJourneyLocale = (
  language?: string,
): GuilhermeJourneyLocale => {
  const base = language?.split("-")[0]?.toLowerCase() as GuilhermeJourneyLocale | undefined;
  return base && SUPPORTED_GUILHERME_JOURNEY_LOCALES.has(base) ? base : "en";
};

const PT_COPY = {
  intro: {
    eyebrow: "Modulo 01",
    title: "Antes de tudo: esquece o que te falaram sobre IA",
    description:
      "Voce ja deve ter ouvido falar do ChatGPT. Talvez ate ja tenha testado. Abriu a ferramenta, digitou qualquer coisa e achou que a IA e mais ou menos. Normal. Todo mundo comeca assim.",
    leadHighlight: "Mas o problema nunca foi a IA.",
    leadBody:
      "O problema e que ninguem ensinou voce a pedir do jeito certo e muito menos a configurar a IA pra funcionar do seu jeito.",
    body:
      "Nesse desafio de 28 dias, voce nao vai aprender o ChatGPT nem decorar menus. Voce vai aprender a fazer coisas reais com inteligencia artificial: gerar imagens, escrever textos profissionais, montar planilhas e criar apresentacoes. A ferramenta e so o meio. O resultado e seu.",
    keyShiftBadge: "Virada de chave",
    keyShiftTitle:
      "Quanto melhor o seu contexto, melhor a resposta que a IA devolve.",
    keyShiftDescription:
      "A IA nao e um truque. Ela e um assistente extremamente capaz que fica muito mais util quando voce entrega intencao, direcao e formato logo no pedido.",
    youDeliverLabel: "Voce entrega",
    youDeliverText: "Contexto + objetivo + tom + formato",
    responseBadge: "A resposta vem",
    responseText:
      "Mais util, mais clara e muito mais proxima do que voce realmente queria.",
    realResultBadge: "Resultado real",
    realResultTitle: "O que a IA generativa realmente faz",
    realResultFirst:
      "A inteligencia artificial generativa cria conteudo novo a partir das suas instrucoes. Voce descreve o que quer, e ela entrega texto, imagem, planilha, codigo, audio ou video.",
    realResultSecond:
      "O nome tecnico da instrucao que voce da e prompt. Pense no prompt como um pedido feito a um assistente extremamente capaz, mas que precisa de clareza.",
    vagueLabel: "Vago",
    vaguePrompt: "\"Me fala sobre vendas\"",
    specificLabel: "Especifico",
    specificPrompt:
      "\"Crie um e-mail de follow-up para um cliente que pediu orcamento de consultoria em marketing digital ha 3 dias e nao respondeu. Tom profissional e empatico, maximo 150 palavras.\"",
    promptDifference:
      "Essa diferenca entre os dois prompts e o que separa quem acha a IA mediana de quem a usa pra trabalhar de verdade. Nos proximos 27 dias voce vai dominar essa habilidade.",
    resultsTitle: "Os 5 grandes resultados que a IA entrega",
    resultsDescription:
      "Tudo o que a IA faz de util se encaixa em uma dessas cinco categorias. Cada semana do desafio foca em uma delas:",
    outcomeCards: [
      {
        title: "Textos e comunicacao",
        description:
          "E-mails, posts, artigos, legendas, roteiros e traducoes. Tudo que envolve escrever, a IA faz mais rapido e muitas vezes melhor do que gastar horas na frente de uma tela em branco.",
      },
      {
        title: "Imagens e videos",
        description:
          "Artes para redes sociais, logos, thumbnails, ilustracoes e videos infograficos. Mesmo que voce nunca tenha aberto o Photoshop, a IA gera visuais profissionais.",
      },
      {
        title: "Planilhas e dados",
        description:
          "Controles financeiros, graficos, dashboards e formulas automaticas. Voce descreve o que precisa em portugues e a IA monta a planilha pronta.",
      },
      {
        title: "Documentos e apresentacoes",
        description:
          "Slides profissionais, PDFs formatados, propostas comerciais e ebooks. Tudo que voce precisa apresentar ou entregar para alguem.",
      },
      {
        title: "Automacoes do dia a dia",
        description:
          "Resumos automaticos, traducoes rapidas, reorganizacao de informacoes e analise de textos longos. Tarefas que tomam tempo e que a IA resolve em segundos.",
      },
    ],
    continueLabel: "Continuar para a personalizacao",
    continueHelper:
      "Primeiro voce entendeu a logica. Agora vamos deixar a IA calibrada para responder do seu jeito.",
  },
  map: {
    eyebrow: "Mapa das IAs",
    title: "Pontos fortes de cada uma",
    description:
      "Existe mais de uma IA disponivel hoje e cada uma tem seus pontos fortes. O segredo nao e escolher a melhor, mas saber qual usar para cada situacao.",
    intro:
      "Aqui esta o mapa completo com as IAs mais usadas e quando cada uma brilha. Os pontos fortes entram um por vez e, quando terminar, voce avanca manualmente para a proxima IA.",
    aiCounter: (current: number, total: number) => `IA ${current} de ${total}`,
    aiHint: "Veja esta ferramenta e, quando terminar, avance para a proxima.",
    visiblePoints: (current: number, total: number) => `${current}/${total} pontos visiveis`,
    continueToExercises: "Continuar para os exercicios e missao final",
    continueToNext: (name: string) => `Continuar para ${name}`,
    waiting:
      "Os pontos desta IA estao entrando na tela. Assim que todos aparecerem, o botao para a proxima ferramenta e liberado.",
    goldTipBadge: "Dica de ouro",
    goldTipText:
      "Voce nao precisa pagar todas. Comece com uma gratuita, como ChatGPT, Gemini ou DeepSeek, aprenda a usar bem e depois explore as outras conforme precisar. Durante o desafio, vamos indicar a melhor ferramenta para cada tipo de tarefa.",
    tools: [
      {
        name: "ChatGPT (OpenAI)",
        bullets: [
          "O mais popular e versatil do mercado",
          "Otimo para conversas longas e criacao de textos",
          "Gera imagens com o DALL-E integrado",
          "Tem modo de voz para conversar falando",
          "Navega na internet em tempo real",
          "Milhares de GPTs personalizados prontos para usar",
        ],
      },
      {
        name: "Claude (Anthropic)",
        bullets: [
          "Melhor para textos longos e analise de documentos",
          "Janela de contexto gigante entende documentos enormes",
          "Respostas mais naturais e menos roboticas",
          "Excelente para revisao, reescrita e copywriting",
          "Cria arquivos completos (PDFs, planilhas, apresentacoes)",
          "Permite criar Projetos com instrucoes fixas",
        ],
      },
      {
        name: "Gemini (Google)",
        bullets: [
          "Integrado ao ecossistema Google (Gmail, Drive, Docs)",
          "Forte em pesquisa e informacoes atualizadas",
          "Entende imagens e videos muito bem",
          "Versao gratuita bastante completa",
          "Gera imagens e videos diretamente no chat",
          "Bom para resumir e-mails e organizar informacoes",
        ],
      },
      {
        name: "Copilot (Microsoft)",
        bullets: [
          "Integrado ao Word, Excel, PowerPoint e Outlook",
          "Ideal para quem ja trabalha com ferramentas Microsoft",
          "Gera apresentacoes e planilhas dentro do Office",
          "Navega na internet com o Bing",
          "Bom para tarefas corporativas e produtividade no trabalho",
          "Versao gratuita disponivel no Edge e no Bing",
        ],
      },
      {
        name: "DeepSeek",
        bullets: [
          "Modelo de codigo aberto com alta qualidade",
          "Gratuito e sem limites de uso",
          "Excelente para raciocinio logico e matematica",
          "Forte em programacao e codigo",
          "Respostas detalhadas e com raciocinio passo a passo",
          "Alternativa poderosa sem precisar pagar assinatura",
        ],
      },
      {
        name: "Perplexity",
        bullets: [
          "Funciona como um buscador inteligente com IA",
          "Sempre mostra as fontes das informacoes",
          "Ideal para pesquisas e checagem de fatos",
          "Respostas atualizadas com dados da internet em tempo real",
          "Interface simples e direta sem enrolacao",
          "Otimo para substituir buscas confusas no Google",
        ],
      },
      {
        name: "Lovable",
        bullets: [
          "Cria sites e aplicativos completos sem saber programar",
          "Voce descreve o que quer em portugues e a IA constroi tudo",
          "Inclui banco de dados, login de usuario e pagamentos",
          "Publica o app online com um clique sem configurar nada",
          "Ideal para criar MVPs, portfolios, landing pages e ferramentas internas",
          "Codigo exportavel para o GitHub se quiser evoluir com um programador",
        ],
      },
      {
        name: "Nano Banana (Google)",
        bullets: [
          "Editor de imagens por texto: descreva a edicao e a IA faz",
          "Mantem consistencia de personagens entre varias edicoes",
          "Preserva o cenario original enquanto aplica mudancas pontuais",
          "Otimo para criar figurinhas, memes e artes para redes sociais",
          "Baseado no Gemini com qualidade alta e geracao rapida",
          "Disponivel gratuitamente com creditos diarios",
        ],
      },
      {
        name: "Veo (Google)",
        bullets: [
          "Gera videos a partir de texto: descreva a cena e a IA cria",
          "Produz videos de ate 8 segundos em alta qualidade (1080p)",
          "Gera audio nativo junto com o video (efeitos sonoros e dialogos)",
          "Entende linguagem cinematografica (plano aereo, camera lenta, close)",
          "Disponivel no Gemini e no Google AI Studio",
          "Ideal para prototipos de video, reels e conteudo visual rapido",
        ],
      },
    ],
  },
  personalize: {
    eyebrow: "Personalizacao",
    title: "Deixe a IA com a sua cara: personalizacao na pratica",
    description:
      "Essa e a parte que quase ninguem faz e que muda completamente a experiencia. As principais IAs permitem que voce configure instrucoes permanentes sobre quem voce e, como trabalha e o que espera das respostas.",
    lead:
      "E como contratar um assistente e, no primeiro dia, sentar com ele e explicar: eu trabalho com tal coisa, gosto que me respondam assim, e preciso desses tipos de resultado. Depois disso, toda resposta ja vem calibrada pra voce.",
    responseBadge: "Resposta calibrada",
    responseTitle: "Quando voce personaliza, a IA ja comeca entendendo quem voce e.",
    responseDescription:
      "Em vez de responder do zero toda vez, ela passa a considerar o seu contexto, o seu jeito de trabalhar e o formato que voce prefere receber.",
    responseInputCards: ["Quem sou eu", "Como trabalho", "Como responder"],
    responseOutputBadge: "Saida final",
    responseOutputTitle: "Resposta mais util",
    responseOutputItems: ["Direta", "Com exemplos", "Sem enrolacao"],
    responseFooter:
      "Personalizar a IA leva 3 minutos e economiza horas. Toda resposta que ela der a partir de agora vai ser mais util, mais rapida e mais alinhada com o que voce realmente precisa.",
    templateTitle: "Modelo pronto para copiar e colar",
    templateDescription:
      "Use este template como ponto de partida. Copie, adapte com suas informacoes e cole nas configuracoes da sua IA favorita:",
    templateLines: [
      "SOBRE MIM:",
      "- Meu nome e [seu nome]",
      "- Trabalho como [sua profissao ou area]",
      "- Meu publico e [descreva seu publico ou clientes]",
      "- Meu nivel com tecnologia e [iniciante, intermediario ou avancado]",
      "- Uso a IA principalmente para [liste 2 ou 3 usos principais]",
      "",
      "COMO QUERO AS RESPOSTAS:",
      "- Tom: [direto, amigavel, profissional, casual]",
      "- Formato preferido: [topicos curtos, paragrafos, tabelas]",
      "- Idioma: [portugues do Brasil]",
      "- Evite: [jargao tecnico, respostas longas demais, etc.]",
      "- Sempre: [de exemplos praticos, pergunte antes de assumir, etc.]",
    ],
    continueLabel: "Ir para o mapa das IAs",
    continueHelper:
      "Voce ja configurou as principais ferramentas. Agora vamos ver onde cada IA brilha e quando usar cada uma.",
  },
  practice: {
    eyebrow: "Exercicios praticos",
    title: "Agora e hora de colocar em pratica",
    description:
      "Faca os tres exercicios abaixo. Depois disso, personalize a sua IA principal e use o botao abaixo para concluir esta trilha do Dia 1.",
    exercise1: {
      eyebrow: "Exercicio 1",
      title: "Multipla escolha",
      question:
        "Qual e a principal diferenca entre dar um prompt vago e um prompt especifico para a IA?",
      options: [
        "Nao existe diferenca. A IA sempre entende o que voce quer.",
        "O prompt vago faz a IA travar e nao responder nada.",
        "O prompt especifico da contexto e detalhes, o que permite a IA gerar uma resposta muito mais util e alinhada com o que voce precisa.",
        "O prompt especifico serve so para tarefas de programacao, nao para textos comuns.",
      ],
      correct:
        "Resposta correta: c. O prompt especifico da contexto e detalhes, entao a IA consegue entregar uma resposta muito mais util.",
      incorrect:
        "Quase la. A resposta correta e c, porque contexto e detalhes fazem a IA responder com mais qualidade e precisao.",
    },
    exercise2: {
      eyebrow: "Exercicio 2",
      title: "Complete a frase",
      question:
        "A instrucao que voce digita para a IA gerar uma resposta se chama ________, e quanto mais contexto ela tiver, melhor sera o resultado.",
      placeholder: "Digite a palavra",
      verify: "Verificar",
      correct: "Perfeito. A palavra correta e prompt.",
      incorrect: "Ainda nao. A resposta correta e prompt.",
    },
    exercise3: {
      eyebrow: "Exercicio 3",
      title: "Ligue os termos",
      question:
        "Clique em uma IA a esquerda e depois no ponto forte correspondente a direita para criar a conexao.",
      activePrompt: (pairLabel: string) =>
        `Agora conecte ${pairLabel} ao ponto forte correto.`,
      idlePrompt: "Escolha uma IA e depois conecte ao ponto forte certo.",
      secondaryPrompt:
        "Se quiser mudar uma conexao, selecione a IA novamente ou limpe tudo e refaca.",
      connectionsCount: (count: number, total: number) => `${count}/${total} conexoes`,
      clearButton: "Limpar conexoes",
      selectPairFirst:
        "Selecione uma IA primeiro e depois escolha o ponto forte para criar a conexao.",
      feedbackCorrect: (pairLabel: string, optionId: string, optionLabel: string) =>
        `Perfeito. ${pairLabel} foi ligado corretamente a ${optionId}. ${optionLabel}.`,
      feedbackWrong: (pairLabel: string, optionId: string, optionLabel: string) =>
        `Ainda nao. ${pairLabel} nao combina com ${optionId}. ${optionLabel}. Escolha outra opcao.`,
      leftColumn: "IAs",
      rightColumn: "Pontos fortes",
      rowConnected: "Conectada. Clique para trocar essa ligacao.",
      rowIdle: "Clique para selecionar esta IA.",
      allCorrect: "Gabarito correto: 1-C, 2-A, 3-E, 4-B, 5-D.",
      allReview: "Confira o gabarito: 1-C, 2-A, 3-E, 4-B, 5-D.",
      legend: [
        "Textos longos e analise de documentos",
        "Geracao de videos a partir de texto",
        "Pesquisa com fontes em tempo real",
        "Edicao de imagens por comandos de texto",
        "Criacao de sites e apps sem programar",
      ],
    },
    mission: {
      badge: "Missao",
      title: "Personalize a sua IA",
      description: "Esse e o exercicio mais importante de hoje. Nao pule.",
      steps: [
        "Escolha sua IA principal (ChatGPT, Claude, Gemini ou outra).",
        "Abra as configuracoes de personalizacao.",
        "Preencha com suas informacoes usando o template acima.",
        "Faca um pedido teste e veja a diferenca.",
        "Se quiser, repita o processo em uma segunda IA.",
      ],
    },
    status: {
      badge: "Status",
      title: "Parabens! Dia 1 concluido.",
      description: "Amanha no Dia 2: escrever prompts que funcionam.",
      progress: (completed: number, total: number) => `${completed}/${total} exercicios liberados`,
      continueLabel: "Concluir Dia 1",
      continueReady:
        "Tudo certo. Agora voce ja pode concluir o Dia 1 e seguir para o fluxo normal de conclusao.",
      continueLocked:
        "Resolva corretamente os 3 exercicios para liberar a conclusao do Dia 1.",
    },
  },
} as const;

const EN_COPY = {
  intro: {
    eyebrow: "Module 01",
    title: "Before anything else: forget what they told you about AI",
    description:
      "You have probably heard about ChatGPT. Maybe you have even tested it. You opened the tool, typed something random, and thought AI was just okay. That is normal. Everyone starts there.",
    leadHighlight: "But the problem was never the AI.",
    leadBody:
      "The problem is that nobody taught you how to ask the right way, and even less how to configure AI to work your way.",
    body:
      "In this 28-day challenge, you will not just learn ChatGPT or memorize menus. You will learn how to do real things with artificial intelligence: generate images, write professional texts, build spreadsheets, and create presentations. The tool is only the vehicle. The result is yours.",
    keyShiftBadge: "Mindset shift",
    keyShiftTitle:
      "The better your context, the better the answer AI gives back.",
    keyShiftDescription:
      "AI is not a trick. It is an extremely capable assistant that becomes far more useful when you provide intent, direction, and format right in the request.",
    youDeliverLabel: "You provide",
    youDeliverText: "Context + goal + tone + format",
    responseBadge: "The answer comes back",
    responseText:
      "More useful, clearer, and much closer to what you actually wanted.",
    realResultBadge: "Real result",
    realResultTitle: "What generative AI really does",
    realResultFirst:
      "Generative artificial intelligence creates brand new content from your instructions. You describe what you want, and it delivers text, image, spreadsheet, code, audio, or video.",
    realResultSecond:
      "The technical name for the instruction you give is prompt. Think of a prompt as a request made to an extremely capable assistant that still needs clarity.",
    vagueLabel: "Vague",
    vaguePrompt: "\"Tell me about sales\"",
    specificLabel: "Specific",
    specificPrompt:
      "\"Write a follow-up email for a client who requested a digital marketing consulting quote 3 days ago and has not replied yet. Professional and empathetic tone, maximum 150 words.\"",
    promptDifference:
      "That difference between the two prompts is what separates people who think AI is average from people who use it for real work. Over the next 27 days, you will master this skill.",
    resultsTitle: "The 5 big results AI delivers",
    resultsDescription:
      "Everything useful AI does fits into one of these five categories. Each week of the challenge focuses on one of them:",
    outcomeCards: [
      {
        title: "Texts and communication",
        description:
          "Emails, posts, articles, captions, scripts, and translations. Everything related to writing gets done faster, and often better, than spending hours in front of a blank screen.",
      },
      {
        title: "Images and videos",
        description:
          "Social media art, logos, thumbnails, illustrations, and infographic videos. Even if you have never opened Photoshop, AI can generate professional visuals.",
      },
      {
        title: "Spreadsheets and data",
        description:
          "Financial controls, charts, dashboards, and automatic formulas. You describe what you need in plain language and AI builds the spreadsheet for you.",
      },
      {
        title: "Documents and presentations",
        description:
          "Professional slides, formatted PDFs, business proposals, and ebooks. Everything you need to present or deliver to someone.",
      },
      {
        title: "Everyday automations",
        description:
          "Automatic summaries, quick translations, information reorganization, and long-text analysis. Tasks that consume time and that AI solves in seconds.",
      },
    ],
    continueLabel: "Continue to customization",
    continueHelper:
      "First you understood the logic. Now let us calibrate AI to respond your way.",
  },
  map: {
    eyebrow: "AI map",
    title: "What each one is best at",
    description:
      "There is more than one AI available today, and each one has its own strengths. The secret is not choosing the best one, but knowing which one to use for each situation.",
    intro:
      "Here is the full map of the most used AIs and when each one shines. The strengths appear one by one, and when they finish, you move manually to the next AI.",
    aiCounter: (current: number, total: number) => `AI ${current} of ${total}`,
    aiHint: "Review this tool and, when you finish, move on to the next one.",
    visiblePoints: (current: number, total: number) => `${current}/${total} visible points`,
    continueToExercises: "Continue to the exercises and final mission",
    continueToNext: (name: string) => `Continue to ${name}`,
    waiting:
      "This AI's strengths are entering the screen. As soon as they all appear, the button for the next tool is unlocked.",
    goldTipBadge: "Golden tip",
    goldTipText:
      "You do not need to pay for all of them. Start with a free one such as ChatGPT, Gemini, or DeepSeek, learn to use it well, and then explore the others when you need them. During the challenge, we will point out the best tool for each task type.",
    tools: [
      {
        name: "ChatGPT (OpenAI)",
        bullets: [
          "The most popular and versatile one on the market",
          "Great for long conversations and text creation",
          "Generates images with integrated DALL-E",
          "Has voice mode so you can talk to it",
          "Browses the internet in real time",
          "Thousands of ready-made custom GPTs",
        ],
      },
      {
        name: "Claude (Anthropic)",
        bullets: [
          "Best for long texts and document analysis",
          "Huge context window that understands very large documents",
          "More natural and less robotic answers",
          "Excellent for revision, rewriting, and copywriting",
          "Creates complete files (PDFs, spreadsheets, presentations)",
          "Lets you create Projects with fixed instructions",
        ],
      },
      {
        name: "Gemini (Google)",
        bullets: [
          "Integrated with the Google ecosystem (Gmail, Drive, Docs)",
          "Strong in research and updated information",
          "Understands images and videos very well",
          "Very complete free version",
          "Generates images and videos directly in chat",
          "Good for summarizing emails and organizing information",
        ],
      },
      {
        name: "Copilot (Microsoft)",
        bullets: [
          "Integrated with Word, Excel, PowerPoint, and Outlook",
          "Ideal for people who already work with Microsoft tools",
          "Creates presentations and spreadsheets inside Office",
          "Browses the internet with Bing",
          "Good for corporate tasks and workplace productivity",
          "Free version available in Edge and Bing",
        ],
      },
      {
        name: "DeepSeek",
        bullets: [
          "Open-source model with high quality",
          "Free and without usage limits",
          "Excellent for logical reasoning and math",
          "Strong in programming and code",
          "Detailed answers with step-by-step reasoning",
          "Powerful alternative without paying for a subscription",
        ],
      },
      {
        name: "Perplexity",
        bullets: [
          "Works like an AI-powered smart search engine",
          "Always shows the information sources",
          "Ideal for research and fact checking",
          "Updated answers with real-time internet data",
          "Simple and direct interface with no fluff",
          "Great to replace confusing Google searches",
        ],
      },
      {
        name: "Lovable",
        bullets: [
          "Creates complete websites and apps without coding",
          "You describe what you want and the AI builds it",
          "Includes database, user login, and payments",
          "Publishes the app online with one click and no setup",
          "Ideal for MVPs, portfolios, landing pages, and internal tools",
          "Exportable code to GitHub if you want to evolve it with a developer",
        ],
      },
      {
        name: "Nano Banana (Google)",
        bullets: [
          "Image editor by text: describe the edit and the AI does it",
          "Keeps character consistency across multiple edits",
          "Preserves the original scene while applying small changes",
          "Great for stickers, memes, and social media art",
          "Based on Gemini with high quality and fast generation",
          "Available for free with daily credits",
        ],
      },
      {
        name: "Veo (Google)",
        bullets: [
          "Generates videos from text: describe the scene and AI creates it",
          "Produces up to 8-second high-quality videos (1080p)",
          "Generates native audio together with the video",
          "Understands cinematic language (aerial shot, slow motion, close-up)",
          "Available in Gemini and Google AI Studio",
          "Ideal for video prototypes, reels, and fast visual content",
        ],
      },
    ],
  },
  personalize: {
    eyebrow: "Customization",
    title: "Make AI feel like you: customization in practice",
    description:
      "This is the part almost nobody does, and it completely changes the experience. The main AIs let you configure permanent instructions about who you are, how you work, and what you expect from the answers.",
    lead:
      "It is like hiring an assistant and, on day one, sitting down with them and explaining: I work with this, I like to be answered this way, and I need these kinds of results. After that, every answer comes pre-calibrated for you.",
    responseBadge: "Calibrated answer",
    responseTitle: "When you customize, AI already starts by understanding who you are.",
    responseDescription:
      "Instead of answering from scratch every single time, it starts considering your context, your work style, and the format you prefer to receive.",
    responseInputCards: ["Who I am", "How I work", "How to answer"],
    responseOutputBadge: "Final output",
    responseOutputTitle: "More useful answer",
    responseOutputItems: ["Direct", "With examples", "No fluff"],
    responseFooter:
      "Customizing AI takes 3 minutes and saves hours. Every answer from now on becomes more useful, faster, and more aligned with what you really need.",
    templateTitle: "Ready-to-copy template",
    templateDescription:
      "Use this template as a starting point. Copy it, adapt it with your information, and paste it into your favorite AI settings:",
    templateLines: [
      "ABOUT ME:",
      "- My name is [your name]",
      "- I work as [your profession or field]",
      "- My audience is [describe your audience or clients]",
      "- My technology level is [beginner, intermediate, or advanced]",
      "- I mainly use AI for [list 2 or 3 main uses]",
      "",
      "HOW I WANT THE ANSWERS:",
      "- Tone: [direct, friendly, professional, casual]",
      "- Preferred format: [short bullets, paragraphs, tables]",
      "- Language: [English]",
      "- Avoid: [technical jargon, overly long answers, etc.]",
      "- Always: [give practical examples, ask before assuming, etc.]",
    ],
    continueLabel: "Go to the AI map",
    continueHelper:
      "You already configured the main tools. Now let us see where each AI shines and when to use each one.",
  },
  practice: {
    eyebrow: "Practical exercises",
    title: "Now it is time to put it into practice",
    description:
      "Do the three exercises below. After that, customize your main AI and use the button below to complete this Day 1 journey.",
    exercise1: {
      eyebrow: "Exercise 1",
      title: "Multiple choice",
      question:
        "What is the main difference between giving AI a vague prompt and a specific prompt?",
      options: [
        "There is no difference. AI always understands what you want.",
        "A vague prompt makes AI freeze and not answer anything.",
        "A specific prompt gives context and details, which allows AI to generate a much more useful answer aligned with what you need.",
        "A specific prompt only works for programming tasks, not for normal texts.",
      ],
      correct:
        "Correct answer: c. A specific prompt adds context and details, so AI can deliver a much more useful answer.",
      incorrect:
        "Almost there. The correct answer is c, because context and details improve quality and precision.",
    },
    exercise2: {
      eyebrow: "Exercise 2",
      title: "Complete the sentence",
      question:
        "The instruction you type for AI to generate an answer is called ________, and the more context it has, the better the result will be.",
      placeholder: "Type the word",
      verify: "Check",
      correct: "Perfect. The correct word is prompt.",
      incorrect: "Not yet. The correct answer is prompt.",
    },
    exercise3: {
      eyebrow: "Exercise 3",
      title: "Match the terms",
      question:
        "Click one AI on the left and then click the matching strength on the right to create the connection.",
      activePrompt: (pairLabel: string) =>
        `Now connect ${pairLabel} to the correct strength.`,
      idlePrompt: "Choose an AI and then connect it to the right strength.",
      secondaryPrompt:
        "If you want to change a connection, select the AI again or clear everything and redo it.",
      connectionsCount: (count: number, total: number) => `${count}/${total} connections`,
      clearButton: "Clear connections",
      selectPairFirst:
        "Select an AI first and then choose the strength to create the connection.",
      feedbackCorrect: (pairLabel: string, optionId: string, optionLabel: string) =>
        `Perfect. ${pairLabel} was correctly connected to ${optionId}. ${optionLabel}.`,
      feedbackWrong: (pairLabel: string, optionId: string, optionLabel: string) =>
        `Not yet. ${pairLabel} does not match ${optionId}. ${optionLabel}. Pick another option.`,
      leftColumn: "AIs",
      rightColumn: "Strengths",
      rowConnected: "Connected. Click to change this match.",
      rowIdle: "Click to select this AI.",
      allCorrect: "Correct key: 1-C, 2-A, 3-E, 4-B, 5-D.",
      allReview: "Check the key: 1-C, 2-A, 3-E, 4-B, 5-D.",
      legend: [
        "Long texts and document analysis",
        "Video generation from text",
        "Research with real-time sources",
        "Image editing by text commands",
        "Creating websites and apps without coding",
      ],
    },
    mission: {
      badge: "Mission",
      title: "Customize your AI",
      description: "This is the most important exercise of today. Do not skip it.",
      steps: [
        "Choose your main AI (ChatGPT, Claude, Gemini, or another one).",
        "Open the personalization settings.",
        "Fill them in using the template above.",
        "Make a test request and see the difference.",
        "If you want, repeat the process in a second AI.",
      ],
    },
    status: {
      badge: "Status",
      title: "Congrats! Day 1 completed.",
      description: "Tomorrow on Day 2: writing prompts that work.",
      progress: (completed: number, total: number) => `${completed}/${total} exercises unlocked`,
      continueLabel: "Complete Day 1",
      continueReady:
        "All good. You can now complete Day 1 and continue through the normal completion flow.",
      continueLocked:
        "Solve the 3 exercises correctly to unlock Day 1 completion.",
    },
  },
} as const;
const ES_COPY = {
  intro: {
    eyebrow: "Modulo 01",
    title: "Antes que nada: olvida lo que te dijeron sobre IA",
    description:
      "Seguro ya escuchaste hablar de ChatGPT. Tal vez incluso ya lo probaste. Abriste la herramienta, escribiste cualquier cosa y sentiste que la IA era normalita. Es normal. Todo el mundo empieza asi.",
    leadHighlight: "Pero el problema nunca fue la IA.",
    leadBody:
      "El problema es que nadie te enseno a pedir de la forma correcta, y mucho menos a configurar la IA para que funcione a tu manera.",
    body:
      "En este desafio de 28 dias, no vas a aprender solo ChatGPT ni a memorizar menus. Vas a aprender a hacer cosas reales con inteligencia artificial: generar imagenes, escribir textos profesionales, montar hojas de calculo y crear presentaciones. La herramienta es solo el medio. El resultado es tuyo.",
    keyShiftBadge: "Cambio de chip",
    keyShiftTitle:
      "Cuanto mejor sea tu contexto, mejor sera la respuesta que te devuelve la IA.",
    keyShiftDescription:
      "La IA no es un truco. Es un asistente extremadamente capaz que se vuelve mucho mas util cuando le das intencion, direccion y formato desde el pedido.",
    youDeliverLabel: "Tu entregas",
    youDeliverText: "Contexto + objetivo + tono + formato",
    responseBadge: "La respuesta llega",
    responseText:
      "Mas util, mas clara y mucho mas cerca de lo que realmente querias.",
    realResultBadge: "Resultado real",
    realResultTitle: "Lo que realmente hace la IA generativa",
    realResultFirst:
      "La inteligencia artificial generativa crea contenido nuevo a partir de tus instrucciones. Describes lo que quieres y ella entrega texto, imagen, hoja de calculo, codigo, audio o video.",
    realResultSecond:
      "El nombre tecnico de la instruccion que das es prompt. Piensa en el prompt como un pedido hecho a un asistente extremadamente capaz, pero que necesita claridad.",
    vagueLabel: "Vago",
    vaguePrompt: "\"Hablame de ventas\"",
    specificLabel: "Especifico",
    specificPrompt:
      "\"Crea un correo de seguimiento para un cliente que pidio presupuesto de consultoria en marketing digital hace 3 dias y no respondio. Tono profesional y empatico, maximo 150 palabras.\"",
    promptDifference:
      "Esa diferencia entre los dos prompts es lo que separa a quien cree que la IA es regular de quien la usa para trabajar de verdad. En los proximos 27 dias vas a dominar esta habilidad.",
    resultsTitle: "Los 5 grandes resultados que entrega la IA",
    resultsDescription:
      "Todo lo util que hace la IA encaja en una de estas cinco categorias. Cada semana del desafio se enfoca en una de ellas:",
    outcomeCards: [
      { title: "Textos y comunicacion", description: "Correos, posts, articulos, captions, guiones y traducciones. Todo lo que implique escribir, la IA lo hace mas rapido y muchas veces mejor que pasar horas frente a una pantalla en blanco." },
      { title: "Imagenes y videos", description: "Piezas para redes sociales, logos, thumbnails, ilustraciones y videos infograficos. Aunque nunca hayas abierto Photoshop, la IA genera visuales profesionales." },
      { title: "Hojas de calculo y datos", description: "Controles financieros, graficos, dashboards y formulas automaticas. Describes lo que necesitas y la IA arma la hoja por ti." },
      { title: "Documentos y presentaciones", description: "Slides profesionales, PDFs formateados, propuestas comerciales y ebooks. Todo lo que necesitas presentar o entregar a alguien." },
      { title: "Automatizaciones del dia a dia", description: "Resumenes automaticos, traducciones rapidas, reorganizacion de informacion y analisis de textos largos. Tareas que consumen tiempo y que la IA resuelve en segundos." },
    ],
    continueLabel: "Continuar a la personalizacion",
    continueHelper:
      "Primero entendiste la logica. Ahora vamos a calibrar la IA para que responda a tu manera.",
  },
  map: {
    eyebrow: "Mapa de IAs",
    title: "Puntos fuertes de cada una",
    description:
      "Hoy existe mas de una IA disponible y cada una tiene puntos fuertes diferentes. El secreto no es elegir la mejor, sino saber cual usar en cada situacion.",
    intro:
      "Aqui tienes el mapa completo de las IAs mas usadas y cuando brilla cada una. Los puntos fuertes entran uno por uno y, cuando termina, avanzas manualmente a la siguiente IA.",
    aiCounter: (current: number, total: number) => `IA ${current} de ${total}`,
    aiHint: "Mira esta herramienta y, cuando termines, avanza a la siguiente.",
    visiblePoints: (current: number, total: number) => `${current}/${total} puntos visibles`,
    continueToExercises: "Continuar a los ejercicios y la mision final",
    continueToNext: (name: string) => `Continuar a ${name}`,
    waiting:
      "Los puntos de esta IA estan entrando en pantalla. Cuando aparezcan todos, se desbloquea el boton de la siguiente herramienta.",
    goldTipBadge: "Consejo de oro",
    goldTipText:
      "No necesitas pagar por todas. Empieza con una gratuita, como ChatGPT, Gemini o DeepSeek, aprende a usarla bien y despues explora las demas cuando lo necesites. Durante el desafio te diremos cual herramienta conviene mas para cada tipo de tarea.",
    tools: [
      {
        name: "ChatGPT (OpenAI)",
        bullets: [
          "La mas popular y versatil del mercado",
          "Excelente para conversaciones largas y creacion de textos",
          "Genera imagenes con DALL-E integrado",
          "Tiene modo de voz para conversar hablando",
          "Navega por internet en tiempo real",
          "Miles de GPTs personalizados listos para usar",
        ],
      },
      {
        name: "Claude (Anthropic)",
        bullets: [
          "Ideal para textos largos y analisis de documentos",
          "Ventana de contexto enorme que entiende documentos muy grandes",
          "Respuestas mas naturales y menos roboticas",
          "Excelente para revision, reescritura y copywriting",
          "Crea archivos completos (PDF, hojas de calculo, presentaciones)",
          "Permite crear Proyectos con instrucciones fijas",
        ],
      },
      {
        name: "Gemini (Google)",
        bullets: [
          "Integrado al ecosistema Google (Gmail, Drive, Docs)",
          "Fuerte en investigacion e informacion actualizada",
          "Entiende muy bien imagenes y videos",
          "Version gratuita bastante completa",
          "Genera imagenes y videos directamente en el chat",
          "Bueno para resumir correos y organizar informacion",
        ],
      },
      {
        name: "Copilot (Microsoft)",
        bullets: [
          "Integrado con Word, Excel, PowerPoint y Outlook",
          "Ideal para quienes ya trabajan con herramientas Microsoft",
          "Genera presentaciones y hojas de calculo dentro de Office",
          "Navega por internet con Bing",
          "Bueno para tareas corporativas y productividad en el trabajo",
          "Version gratuita disponible en Edge y Bing",
        ],
      },
      {
        name: "DeepSeek",
        bullets: [
          "Modelo de codigo abierto con alta calidad",
          "Gratis y sin limites de uso",
          "Excelente para razonamiento logico y matematicas",
          "Fuerte en programacion y codigo",
          "Respuestas detalladas con razonamiento paso a paso",
          "Alternativa potente sin pagar suscripcion",
        ],
      },
      {
        name: "Perplexity",
        bullets: [
          "Funciona como un buscador inteligente con IA",
          "Siempre muestra las fuentes de informacion",
          "Ideal para investigacion y verificacion de datos",
          "Respuestas actualizadas con datos de internet en tiempo real",
          "Interfaz simple y directa, sin rodeos",
          "Excelente para reemplazar busquedas confusas en Google",
        ],
      },
      {
        name: "Lovable",
        bullets: [
          "Crea sitios y aplicaciones completos sin programar",
          "Describes lo que quieres y la IA lo construye",
          "Incluye base de datos, login de usuario y pagos",
          "Publica la app online con un clic y sin configuracion",
          "Ideal para MVPs, portafolios, landing pages y herramientas internas",
          "Codigo exportable a GitHub si luego quieres evolucionarlo con un desarrollador",
        ],
      },
      {
        name: "Nano Banana (Google)",
        bullets: [
          "Editor de imagenes por texto: describe la edicion y la IA la hace",
          "Mantiene consistencia de personajes entre varias ediciones",
          "Preserva la escena original mientras aplica cambios puntuales",
          "Ideal para stickers, memes y artes para redes sociales",
          "Basado en Gemini con alta calidad y generacion rapida",
          "Disponible gratis con creditos diarios",
        ],
      },
      {
        name: "Veo (Google)",
        bullets: [
          "Genera videos a partir de texto: describes la escena y la IA la crea",
          "Produce videos de hasta 8 segundos en alta calidad (1080p)",
          "Genera audio nativo junto con el video",
          "Entiende lenguaje cinematografico (plano aereo, camara lenta, primer plano)",
          "Disponible en Gemini y Google AI Studio",
          "Ideal para prototipos de video, reels y contenido visual rapido",
        ],
      },
    ],
  },
  personalize: {
    eyebrow: "Personalizacion",
    title: "Haz que la IA se sienta tuya: personalizacion en practica",
    description:
      "Esta es la parte que casi nadie hace y que cambia por completo la experiencia. Las principales IAs permiten configurar instrucciones permanentes sobre quien eres, como trabajas y que esperas de las respuestas.",
    lead:
      "Es como contratar a un asistente y, en el primer dia, sentarte con el y explicarle: trabajo con esto, me gusta que me respondan asi y necesito este tipo de resultado. Despues de eso, cada respuesta ya viene calibrada para ti.",
    responseBadge: "Respuesta calibrada",
    responseTitle: "Cuando personalizas, la IA ya empieza entendiendo quien eres.",
    responseDescription:
      "En lugar de responder desde cero cada vez, pasa a considerar tu contexto, tu forma de trabajar y el formato en que prefieres recibir la respuesta.",
    responseInputCards: ["Quien soy", "Como trabajo", "Como responder"],
    responseOutputBadge: "Salida final",
    responseOutputTitle: "Respuesta mas util",
    responseOutputItems: ["Directa", "Con ejemplos", "Sin rodeos"],
    responseFooter:
      "Personalizar la IA toma 3 minutos y te ahorra horas. Desde ahora, cada respuesta sera mas util, mas rapida y mas alineada con lo que realmente necesitas.",
    templateTitle: "Modelo listo para copiar y pegar",
    templateDescription:
      "Usa este template como punto de partida. Copialo, adaptalo con tu informacion y pegalo en la configuracion de tu IA favorita:",
    templateLines: [
      "SOBRE MI:",
      "- Mi nombre es [tu nombre]",
      "- Trabajo como [tu profesion o area]",
      "- Mi publico es [describe tu publico o clientes]",
      "- Mi nivel con tecnologia es [principiante, intermedio o avanzado]",
      "- Uso la IA principalmente para [lista 2 o 3 usos principales]",
      "",
      "COMO QUIERO LAS RESPUESTAS:",
      "- Tono: [directo, amable, profesional, casual]",
      "- Formato preferido: [puntos cortos, parrafos, tablas]",
      "- Idioma: [espanol]",
      "- Evita: [jerga tecnica, respuestas demasiado largas, etc.]",
      "- Siempre: [da ejemplos practicos, pregunta antes de asumir, etc.]",
    ],
    continueLabel: "Ir al mapa de IAs",
    continueHelper:
      "Ya configuraste las herramientas principales. Ahora vamos a ver donde brilla cada IA y cuando conviene usarla.",
  },
  practice: {
    eyebrow: "Ejercicios practicos",
    title: "Ahora toca ponerlo en practica",
    description:
      "Haz los tres ejercicios de abajo. Despues, personaliza tu IA principal y usa el boton de abajo para completar esta ruta del Dia 1.",
    exercise1: {
      eyebrow: "Ejercicio 1",
      title: "Opcion multiple",
      question: "Cual es la principal diferencia entre darle a la IA un prompt vago y uno especifico?",
      options: [
        "No hay diferencia. La IA siempre entiende lo que quieres.",
        "Un prompt vago hace que la IA se bloquee y no responda nada.",
        "Un prompt especifico da contexto y detalles, lo que permite a la IA generar una respuesta mucho mas util y alineada con lo que necesitas.",
        "Un prompt especifico solo sirve para tareas de programacion, no para textos normales.",
      ],
      correct: "Respuesta correcta: c. Un prompt especifico da contexto y detalles, por eso la IA entrega una respuesta mucho mas util.",
      incorrect: "Casi. La respuesta correcta es c, porque el contexto y los detalles mejoran mucho la calidad y la precision.",
    },
    exercise2: {
      eyebrow: "Ejercicio 2",
      title: "Completa la frase",
      question: "La instruccion que escribes para que la IA genere una respuesta se llama ________, y cuanto mas contexto tenga, mejor sera el resultado.",
      placeholder: "Escribe la palabra",
      verify: "Verificar",
      correct: "Perfecto. La palabra correcta es prompt.",
      incorrect: "Todavia no. La respuesta correcta es prompt.",
    },
    exercise3: {
      eyebrow: "Ejercicio 3",
      title: "Une los terminos",
      question: "Haz clic en una IA a la izquierda y luego en la fortaleza correspondiente a la derecha para crear la conexion.",
      activePrompt: (pairLabel: string) => `Ahora conecta ${pairLabel} con la fortaleza correcta.`,
      idlePrompt: "Elige una IA y despues conectala con la fortaleza correcta.",
      secondaryPrompt: "Si quieres cambiar una conexion, vuelve a seleccionar la IA o limpia todo y hazlo otra vez.",
      connectionsCount: (count: number, total: number) => `${count}/${total} conexiones`,
      clearButton: "Limpiar conexiones",
      selectPairFirst: "Selecciona primero una IA y luego elige la fortaleza para crear la conexion.",
      feedbackCorrect: (pairLabel: string, optionId: string, optionLabel: string) => `Perfecto. ${pairLabel} se conecto correctamente con ${optionId}. ${optionLabel}.`,
      feedbackWrong: (pairLabel: string, optionId: string, optionLabel: string) => `Todavia no. ${pairLabel} no coincide con ${optionId}. ${optionLabel}. Elige otra opcion.`,
      leftColumn: "IAs",
      rightColumn: "Fortalezas",
      rowConnected: "Conectada. Haz clic para cambiar esta union.",
      rowIdle: "Haz clic para seleccionar esta IA.",
      allCorrect: "Solucion correcta: 1-C, 2-A, 3-E, 4-B, 5-D.",
      allReview: "Revisa la solucion: 1-C, 2-A, 3-E, 4-B, 5-D.",
      legend: [
        "Textos largos y analisis de documentos",
        "Generacion de videos a partir de texto",
        "Investigacion con fuentes en tiempo real",
        "Edicion de imagenes por comandos de texto",
        "Creacion de sitios y apps sin programar",
      ],
    },
    mission: {
      badge: "Mision",
      title: "Personaliza tu IA",
      description: "Este es el ejercicio mas importante de hoy. No lo saltes.",
      steps: [
        "Elige tu IA principal (ChatGPT, Claude, Gemini u otra).",
        "Abre la configuracion de personalizacion.",
        "Completa tus datos usando el template de arriba.",
        "Haz una prueba y mira la diferencia.",
        "Si quieres, repite el proceso en una segunda IA.",
      ],
    },
    status: {
      badge: "Estado",
      title: "Felicidades! Dia 1 completado.",
      description: "Manana en el Dia 2: escribir prompts que funcionan.",
      progress: (completed: number, total: number) => `${completed}/${total} ejercicios desbloqueados`,
      continueLabel: "Completar el Dia 1",
      continueReady:
        "Todo listo. Ahora ya puedes completar el Dia 1 y seguir el flujo normal de cierre.",
      continueLocked:
        "Resuelve correctamente los 3 ejercicios para desbloquear la finalizacion del Dia 1.",
    },
  },
} as const;
const FR_COPY = {
  intro: {
    eyebrow: "Module 01",
    title: "Avant tout : oublie ce qu'on t'a dit sur l'IA",
    description:
      "Tu as surement deja entendu parler de ChatGPT. Peut-etre que tu l'as meme deja teste. Tu as ouvert l'outil, tape n'importe quoi et pense que l'IA etait juste moyenne. C'est normal. Tout le monde commence comme ca.",
    leadHighlight: "Mais le probleme n'a jamais ete l'IA.",
    leadBody:
      "Le probleme, c'est que personne ne t'a appris a demander de la bonne facon, ni a configurer l'IA pour qu'elle fonctionne a ta maniere.",
    body:
      "Dans ce defi de 28 jours, tu ne vas pas juste apprendre ChatGPT ou memoriser des menus. Tu vas apprendre a faire des choses concretes avec l'intelligence artificielle : generer des images, ecrire des textes professionnels, monter des feuilles de calcul et creer des presentations. L'outil n'est qu'un moyen. Le resultat t'appartient.",
    keyShiftBadge: "Declic",
    keyShiftTitle:
      "Plus ton contexte est bon, meilleure sera la reponse que l'IA te renvoie.",
    keyShiftDescription:
      "L'IA n'est pas un tour de magie. C'est un assistant extremement capable qui devient bien plus utile quand tu donnes l'intention, la direction et le format des le debut.",
    youDeliverLabel: "Tu donnes",
    youDeliverText: "Contexte + objectif + ton + format",
    responseBadge: "La reponse arrive",
    responseText:
      "Plus utile, plus claire et beaucoup plus proche de ce que tu voulais vraiment.",
    realResultBadge: "Resultat concret",
    realResultTitle: "Ce que l'IA generative fait vraiment",
    realResultFirst:
      "L'intelligence artificielle generative cree du contenu nouveau a partir de tes instructions. Tu decris ce que tu veux et elle livre du texte, des images, des feuilles de calcul, du code, de l'audio ou de la video.",
    realResultSecond:
      "Le nom technique de l'instruction que tu donnes est prompt. Pense au prompt comme a une demande faite a un assistant extremement capable, mais qui a besoin de clarte.",
    vagueLabel: "Vague",
    vaguePrompt: "\"Parle-moi des ventes\"",
    specificLabel: "Specifique",
    specificPrompt:
      "\"Cree un e-mail de relance pour un client qui a demande un devis de conseil en marketing digital il y a 3 jours et n'a pas repondu. Ton professionnel et empathique, maximum 150 mots.\"",
    promptDifference:
      "Cette difference entre les deux prompts, c'est ce qui separe ceux qui trouvent l'IA moyenne de ceux qui l'utilisent vraiment pour travailler. Pendant les 27 prochains jours, tu vas maitriser cette competence.",
    resultsTitle: "Les 5 grands resultats que l'IA peut offrir",
    resultsDescription:
      "Tout ce que l'IA fait d'utile entre dans l'une de ces cinq categories. Chaque semaine du defi se concentre sur l'une d'elles :",
    outcomeCards: [
      { title: "Textes et communication", description: "E-mails, posts, legendes, scripts et traductions. Tout ce qui touche a l'ecriture se fait plus vite, et souvent mieux, que de passer des heures devant une page blanche." },
      { title: "Images et videos", description: "Visuels pour reseaux sociaux, logos, thumbnails, illustrations et videos infographiques. Meme si tu n'as jamais ouvert Photoshop, l'IA genere des visuels professionnels." },
      { title: "Tableurs et donnees", description: "Suivi financier, graphiques, dashboards et formules automatiques. Tu decris ce dont tu as besoin et l'IA monte la feuille de calcul pour toi." },
      { title: "Documents et presentations", description: "Slides professionnels, PDF mis en forme, propositions commerciales et ebooks. Tout ce que tu dois presenter ou livrer a quelqu'un." },
      { title: "Automatisations du quotidien", description: "Resumes automatiques, traductions rapides, reorganisation d'informations et analyse de textes longs. Des taches qui prennent du temps et que l'IA regle en quelques secondes." },
    ],
    continueLabel: "Continuer vers la personnalisation",
    continueHelper:
      "Tu as compris la logique. Maintenant, on va calibrer l'IA pour qu'elle reponde a ta maniere.",
  },
  map: {
    eyebrow: "Carte des IA",
    title: "Les points forts de chacune",
    description:
      "Aujourd'hui, il existe plusieurs IA, et chacune a ses points forts. Le secret n'est pas de choisir la meilleure, mais de savoir laquelle utiliser selon la situation.",
    intro:
      "Voici la carte complete des IA les plus utilisees et du moment ou chacune brille. Les points forts apparaissent un par un et, quand c'est fini, tu passes manuellement a l'IA suivante.",
    aiCounter: (current: number, total: number) => `IA ${current} sur ${total}`,
    aiHint: "Observe cet outil et, quand tu as fini, passe au suivant.",
    visiblePoints: (current: number, total: number) => `${current}/${total} points visibles`,
    continueToExercises: "Continuer vers les exercices et la mission finale",
    continueToNext: (name: string) => `Continuer vers ${name}`,
    waiting:
      "Les points de cette IA arrivent a l'ecran. Des qu'ils sont tous visibles, le bouton de l'outil suivant est debloque.",
    goldTipBadge: "Conseil en or",
    goldTipText:
      "Tu n'as pas besoin de payer toutes les IA. Commence avec une gratuite comme ChatGPT, Gemini ou DeepSeek, apprends a bien l'utiliser, puis explore les autres quand tu en as besoin. Pendant le defi, on te dira quelle est la meilleure option pour chaque type de tache.",
    tools: [
      {
        name: "ChatGPT (OpenAI)",
        bullets: [
          "La plus populaire et polyvalente du marche",
          "Excellente pour les longues conversations et la creation de textes",
          "Genere des images avec DALL-E integre",
          "Possede un mode vocal pour converser a l'oral",
          "Navigue sur internet en temps reel",
          "Des milliers de GPT personnalises prets a l'emploi",
        ],
      },
      {
        name: "Claude (Anthropic)",
        bullets: [
          "Ideale pour les textes longs et l'analyse de documents",
          "Tres grande fenetre de contexte capable de comprendre de gros documents",
          "Reponses plus naturelles et moins robotiques",
          "Excellente pour la revision, la reecriture et le copywriting",
          "Cree des fichiers complets (PDF, tableurs, presentations)",
          "Permet de creer des Projets avec des instructions fixes",
        ],
      },
      {
        name: "Gemini (Google)",
        bullets: [
          "Integree a l'ecosysteme Google (Gmail, Drive, Docs)",
          "Tres forte en recherche et en informations a jour",
          "Comprend tres bien les images et les videos",
          "Version gratuite tres complete",
          "Genere des images et des videos directement dans le chat",
          "Pratique pour resumer des e-mails et organiser des informations",
        ],
      },
      {
        name: "Copilot (Microsoft)",
        bullets: [
          "Integre a Word, Excel, PowerPoint et Outlook",
          "Ideal pour celles et ceux qui travaillent deja avec les outils Microsoft",
          "Genere des presentations et des tableurs dans Office",
          "Navigue sur internet avec Bing",
          "Utile pour les taches d'entreprise et la productivite au travail",
          "Version gratuite disponible dans Edge et Bing",
        ],
      },
      {
        name: "DeepSeek",
        bullets: [
          "Modele open source de haute qualite",
          "Gratuit et sans limite d'utilisation",
          "Excellent pour le raisonnement logique et les mathematiques",
          "Tres fort en programmation et en code",
          "Reponses detaillees avec raisonnement pas a pas",
          "Alternative puissante sans abonnement payant",
        ],
      },
      {
        name: "Perplexity",
        bullets: [
          "Fonctionne comme un moteur de recherche intelligent avec IA",
          "Affiche toujours les sources d'information",
          "Ideal pour la recherche et la verification des faits",
          "Reponses a jour avec des donnees internet en temps reel",
          "Interface simple et directe, sans bla-bla",
          "Parfait pour remplacer les recherches confuses sur Google",
        ],
      },
      {
        name: "Lovable",
        bullets: [
          "Cree des sites et applications complets sans coder",
          "Tu decris ce que tu veux et l'IA le construit",
          "Inclut base de donnees, connexion utilisateur et paiements",
          "Publie l'application en ligne en un clic, sans configuration",
          "Ideal pour les MVP, portfolios, landing pages et outils internes",
          "Code exportable sur GitHub si tu veux ensuite l'ameliorer avec un developpeur",
        ],
      },
      {
        name: "Nano Banana (Google)",
        bullets: [
          "Editeur d'images par texte : decris la modification et l'IA la realise",
          "Maintient la coherence des personnages sur plusieurs editions",
          "Preserve la scene d'origine tout en appliquant de petites modifications",
          "Ideal pour stickers, memes et visuels reseaux sociaux",
          "Base sur Gemini avec haute qualite et generation rapide",
          "Disponible gratuitement avec des credits quotidiens",
        ],
      },
      {
        name: "Veo (Google)",
        bullets: [
          "Genere des videos a partir de texte : tu decris la scene et l'IA la cree",
          "Produit des videos jusqu'a 8 secondes en haute qualite (1080p)",
          "Genere un audio natif en meme temps que la video",
          "Comprend le langage cinematographique (plan aerien, ralenti, gros plan)",
          "Disponible dans Gemini et Google AI Studio",
          "Ideal pour les prototypes video, reels et contenus visuels rapides",
        ],
      },
    ],
  },
  personalize: {
    eyebrow: "Personnalisation",
    title: "Donne a l'IA ta propre touche : personnalisation en pratique",
    description:
      "C'est la partie que presque personne ne fait, et pourtant elle change completement l'experience. Les principales IA permettent de configurer des instructions permanentes sur qui tu es, comment tu travailles et ce que tu attends des reponses.",
    lead:
      "C'est comme embaucher un assistant et, le premier jour, s'asseoir avec lui pour lui expliquer : je travaille dans ceci, j'aime qu'on me reponde ainsi, et j'ai besoin de ce type de resultat. Ensuite, chaque reponse arrive deja calibree pour toi.",
    responseBadge: "Reponse calibree",
    responseTitle: "Quand tu personnalises, l'IA commence deja par comprendre qui tu es.",
    responseDescription:
      "Au lieu de repondre de zero a chaque fois, elle tient compte de ton contexte, de ta facon de travailler et du format que tu preferes recevoir.",
    responseInputCards: ["Qui je suis", "Comment je travaille", "Comment repondre"],
    responseOutputBadge: "Sortie finale",
    responseOutputTitle: "Reponse plus utile",
    responseOutputItems: ["Directe", "Avec exemples", "Sans detours"],
    responseFooter:
      "Personnaliser l'IA prend 3 minutes et fait gagner des heures. Des maintenant, chaque reponse sera plus utile, plus rapide et plus alignee avec ce dont tu as vraiment besoin.",
    templateTitle: "Modele pret a copier-coller",
    templateDescription:
      "Utilise ce modele comme point de depart. Copie-le, adapte-le avec tes informations et colle-le dans les reglages de ton IA preferee :",
    templateLines: [
      "A MON SUJET :",
      "- Mon nom est [ton nom]",
      "- Je travaille comme [ta profession ou ton domaine]",
      "- Mon public est [decris ton public ou tes clients]",
      "- Mon niveau en technologie est [debutant, intermediaire ou avance]",
      "- J'utilise surtout l'IA pour [liste 2 ou 3 usages principaux]",
      "",
      "COMMENT JE VEUX LES REPONSES :",
        "- Ton : [direct, amical, professionnel, detendu]",
      "- Format prefere : [points courts, paragraphes, tableaux]",
      "- Langue : [francais]",
      "- Eviter : [jargon technique, reponses trop longues, etc.]",
      "- Toujours : [donner des exemples pratiques, demander avant de supposer, etc.]",
    ],
    continueLabel: "Aller vers la carte des IA",
    continueHelper:
      "Tu as deja configure les principaux outils. Maintenant, voyons ou chaque IA brille et quand l'utiliser.",
  },
  practice: {
    eyebrow: "Exercices pratiques",
    title: "Maintenant, place a la pratique",
    description:
      "Fais les trois exercices ci-dessous. Ensuite, personnalise ton IA principale et utilise le bouton ci-dessous pour terminer cette version du Jour 1.",
    exercise1: {
      eyebrow: "Exercice 1",
      title: "Choix multiple",
      question: "Quelle est la principale difference entre donner a l'IA un prompt vague et un prompt specifique ?",
      options: [
        "Il n'y a aucune difference. L'IA comprend toujours ce que tu veux.",
        "Un prompt vague fait planter l'IA et elle ne repond plus.",
        "Un prompt specifique donne du contexte et des details, ce qui permet a l'IA de produire une reponse beaucoup plus utile et alignee avec ton besoin.",
        "Un prompt specifique sert seulement pour la programmation, pas pour les textes normaux.",
      ],
      correct: "Bonne reponse : c. Un prompt specifique apporte du contexte et des details, donc l'IA peut livrer une reponse bien plus utile.",
      incorrect: "Presque. La bonne reponse est c, parce que le contexte et les details augmentent la qualite et la precision.",
    },
    exercise2: {
      eyebrow: "Exercice 2",
      title: "Complete la phrase",
      question: "L'instruction que tu tapes pour que l'IA genere une reponse s'appelle ________, et plus elle a de contexte, meilleur sera le resultat.",
      placeholder: "Tape le mot",
      verify: "Verifier",
      correct: "Parfait. Le mot correct est prompt.",
      incorrect: "Pas encore. La bonne reponse est prompt.",
    },
    exercise3: {
      eyebrow: "Exercice 3",
      title: "Relie les termes",
      question: "Clique sur une IA a gauche puis sur la force correspondante a droite pour creer la connexion.",
      activePrompt: (pairLabel: string) => `Maintenant, relie ${pairLabel} au point fort correct.`,
      idlePrompt: "Choisis une IA puis relie-la au bon point fort.",
      secondaryPrompt: "Si tu veux changer une connexion, selectionne a nouveau l'IA ou efface tout et recommence.",
      connectionsCount: (count: number, total: number) => `${count}/${total} connexions`,
      clearButton: "Effacer les connexions",
      selectPairFirst: "Selectionne d'abord une IA puis choisis le point fort pour creer la connexion.",
      feedbackCorrect: (pairLabel: string, optionId: string, optionLabel: string) => `Parfait. ${pairLabel} a ete correctement relie a ${optionId}. ${optionLabel}.`,
      feedbackWrong: (pairLabel: string, optionId: string, optionLabel: string) => `Pas encore. ${pairLabel} ne correspond pas a ${optionId}. ${optionLabel}. Choisis une autre option.`,
      leftColumn: "IA",
      rightColumn: "Points forts",
      rowConnected: "Connectee. Clique pour modifier ce lien.",
      rowIdle: "Clique pour selectionner cette IA.",
      allCorrect: "Correction : 1-C, 2-A, 3-E, 4-B, 5-D.",
      allReview: "Verifie la correction : 1-C, 2-A, 3-E, 4-B, 5-D.",
      legend: [
        "Textes longs et analyse de documents",
        "Generation de videos a partir de texte",
        "Recherche avec sources en temps reel",
        "Edition d'images par commandes textuelles",
        "Creation de sites et d'apps sans coder",
      ],
    },
    mission: {
      badge: "Mission",
      title: "Personnalise ton IA",
      description: "C'est l'exercice le plus important d'aujourd'hui. Ne le saute pas.",
      steps: [
        "Choisis ton IA principale (ChatGPT, Claude, Gemini ou une autre).",
        "Ouvre les reglages de personnalisation.",
        "Remplis-les avec tes informations en utilisant le modele ci-dessus.",
        "Fais une demande test et observe la difference.",
        "Si tu veux, repete le processus dans une deuxieme IA.",
      ],
    },
    status: {
      badge: "Statut",
      title: "Bravo ! Jour 1 termine.",
      description: "Demain, Jour 2 : ecrire des prompts qui fonctionnent.",
      progress: (completed: number, total: number) => `${completed}/${total} exercices debloques`,
      continueLabel: "Terminer le Jour 1",
      continueReady:
        "Tout est bon. Tu peux maintenant terminer le Jour 1 et suivre le flux normal de fin.",
      continueLocked:
        "Resous correctement les 3 exercices pour debloquer la fin du Jour 1.",
    },
  },
} as const;

export const GUILHERME_DAY1_JOURNEY_COPY: Record<GuilhermeJourneyLocale, any> = {
  pt: PT_COPY,
  en: EN_COPY,
  es: ES_COPY,
  fr: FR_COPY,
};

export const getGuilhermeDay1JourneyCopy = (language?: string) => {
  const locale = resolveGuilhermeJourneyLocale(language);
  const localizedCopy = GUILHERME_DAY1_JOURNEY_COPY[locale];

  return {
    ...PT_COPY,
    ...localizedCopy,
    intro: {
      ...PT_COPY.intro,
      ...(localizedCopy?.intro || {}),
    },
    map: {
      ...PT_COPY.map,
      ...(localizedCopy?.map || {}),
    },
    personalize: {
      ...PT_COPY.personalize,
      ...(localizedCopy?.personalize || {}),
    },
    practice: {
      ...PT_COPY.practice,
      ...(localizedCopy?.practice || {}),
    },
  };
};
