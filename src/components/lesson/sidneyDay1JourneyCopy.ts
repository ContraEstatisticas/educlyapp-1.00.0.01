export type SidneyJourneyLocale = "pt" | "en" | "es" | "fr";

export type SidneyJourneySectionKey =
  | "intro"
  | "frames"
  | "video"
  | "flyer"
  | "slides"
  | "site"
  | "summary";

const SUPPORTED_SIDNEY_JOURNEY_LOCALES = new Set<SidneyJourneyLocale>([
  "pt",
  "en",
  "es",
  "fr",
]);

export const resolveSidneyJourneyLocale = (
  language?: string,
): SidneyJourneyLocale => {
  const base = language?.split("-")[0]?.toLowerCase() as
    | SidneyJourneyLocale
    | undefined;

  return base && SUPPORTED_SIDNEY_JOURNEY_LOCALES.has(base) ? base : "pt";
};

const FRAME_PROMPTS = {
  A: "FELIZ Mujer latina de unos 30 anos, cabello largo oscuro, ropa casual moderna en tonos azul claro y blanco, sonrisa amplia, mirada directa a la camara, fondo blanco limpio, encuadre del busto hacia arriba, iluminacion suave. Estilo mascota de app movil. Alta resolucion, sin texto.",
  B: "TRISTE Mujer latina de unos 30 anos, cabello largo oscuro, ropa casual moderna en tonos azul claro y blanco, expresion triste y desanimada, ojos ligeramente bajos, fondo blanco limpio, encuadre del busto hacia arriba, iluminacion suave. Estilo mascota de app movil. Alta resolucion, sin texto.",
  C: "SERIA Mujer latina de unos 30 anos, cabello largo oscuro, ropa casual moderna en tonos azul claro y blanco, expresion seria y firme, mirada directa a la camara sin sonrisa, fondo blanco limpio, encuadre del busto hacia arriba, iluminacion suave. Estilo mascota de app movil. Alta resolucion, sin texto.",
} as const;

const VIDEO_PROMPTS = {
  A: `FELIZ A Latin woman in her late 20s, long dark hair, wearing a casual modern outfit in light blue and white tones, standing in front of a clean white background. She looks directly at the camera with a big warm smile, eyes bright and excited. She speaks in Spanish with an enthusiastic and happy tone: "Bienvenida. Tomaste la mejor decision de tu vida al unirte a Educly. Elegiste la educacion y eso lo cambia todo." Realistic style, soft lighting, bust up framing. No music. Natural lip sync.`,
  B: `TRISTE A Latin woman in her late 20s, long dark hair, wearing a casual modern outfit in light blue and white tones, standing in front of a clean white background. She looks directly at the camera with a soft, emotional and melancholic expression, eyes slightly watery, as if genuinely moved. She speaks in Spanish with a slow and heartfelt tone: "Suscribirse a Educly no fue facil... pero elegiste la educacion. Y eso... eso es lo mas valioso que existe." Realistic style, soft lighting, bust up framing. No music. Natural lip sync.`,
  C: `BRAVA A Latin woman in her late 20s, long dark hair, wearing a casual modern outfit in light blue and white tones, standing in front of a clean white background. She looks directly at the camera with a fierce and determined expression, eyebrows slightly furrowed, serious tone. She speaks in Spanish with a strong and passionate tone: "Bienvenida a Educly. Elegiste la educacion y eso no es cualquier cosa. Ahora a trabajar, porque el que estudia no se queda atras." Realistic style, soft lighting, bust up framing. No music. Natural lip sync.`,
} as const;

const promptExercise = (
  title: string,
  sentenceOrPrompt: string,
  answers: string[],
  options: string[],
  explanation: string,
) => ({
  title,
  sentence: sentenceOrPrompt.includes("[BLANK]")
    ? sentenceOrPrompt
    : answers.reduce(
        (currentPrompt, answer) => currentPrompt.replace(answer, "[BLANK]"),
        sentenceOrPrompt,
      ),
  answers,
  options,
  explanation,
});

const PT_COPY = {
  common: {
    simulatorBadge: "experiencia pratica",
    exerciseBadge: "exercicio rapido",
    choosePrompt: "Escolha um prompt",
    promptSelected: "Prompt selecionado",
    promptLockedTitle: "Complete o exercicio para destravar o prompt",
    promptLockedBody:
      "Escolha as opcoes corretas no exercicio acima. Quando acertar, o prompt completo aparece aqui e o botao de gerar e liberado.",
    promptReadyTitle: "Prompt completo destravado",
    promptReadyBody:
      "Agora voce montou a base certa. Confira o prompt inteiro abaixo antes de gerar.",
    exerciseLockedHint:
      "Primeiro complete o prompt com as opcoes corretas. Depois disso a geracao sera liberada.",
    exerciseCompleted: "Prompt montado com sucesso",
    redoExercise: "Montar este prompt de novo",
    generate: "Gerar agora",
    regenerate: "Gerar outra versao",
    loadingLabel: "Gerando com IA",
    resultLabel: "Resultado pronto",
    readyToContinue:
      "Tudo certo. Agora voce pode seguir para a proxima criacao.",
    loadingProgress: (value: number) => `${value}% concluido`,
  },
  intro: {
    eyebrow: "Dia 1 na pratica",
    title: "Hoje voce nao vai estudar. Vai criar.",
    description:
      "Hoje voce vai criar 4 coisas reais com IA. Nao precisa saber nada. Nao precisa entender como funciona. So siga os passos, escolha um prompt e veja o resultado.",
    supporting:
      "Vamos esclarecer de acordo com o que voce avanca na trilha.",
    cards: [
      {
        icon: "frames",
        title: "Frames para o video",
        tool: "Gemini",
        time: "~3 min",
      },
      { icon: "video", title: "Um video", tool: "Grok", time: "~3 min" },
      {
        icon: "flyer",
        title: "Um flyer de motivacao",
        tool: "ChatGPT",
        time: "~3 min",
      },
      {
        icon: "slides",
        title: "Uma apresentacao em slides",
        tool: "Gamma",
        time: "~3 min",
      },
      {
        icon: "site",
        title: "Um site completo",
        tool: "Claude",
        time: "~3 min",
      },
    ],
    kickoffTitle: "Tudo comecando pela pratica",
    kickoffBody:
      "Primeiro voce cria os frames do video, depois transforma isso em video, imagem, slides e site. A ideia aqui e te fazer sentir a IA trabalhando na pratica antes da teoria.",
    continueLabel: "Comecar pelos frames do video",
    continueHelper:
      "Antes do video, vamos criar as imagens-chave que vao dar o clima da cena.",
  },
  sections: {
    frames: {
      eyebrow: "Preparacao do video",
      title: "Crie frames para o seu video",
      tool: "Ferramenta: ChatGPT",
      description:
        "Antes de gerar o video, vamos criar as imagens-chave (frames). A IA gera os quadros e depois voce usa eles para montar o video.",
      steps: [
        "Escolha um dos prompts abaixo.",
        "Cole no campo de geracao de imagem no Educly.",
        "Toque em gerar imagem e aguarde.",
        "Salve os frames e use isso no proximo passo.",
      ],
      promptHint:
        "Prompt e o comando que voce da para a IA. Quanto mais claro voce for, melhor sera a resposta.",
      loadingTitle: "Gerando os frames",
      loadingLines: [
        "Lendo expressao, pose, enquadramento e estilo visual...",
        "Montando a iluminacao, a personagem e o clima de cada frame...",
        "Finalizando os quadros-chave para revelar os frames na tela...",
      ],
      options: [
        {
          id: "A",
          label: "Prompt A",
          name: "Mujer Feliz",
          prompt: FRAME_PROMPTS.A,
          exercise: promptExercise(
            "Complete o prompt da mulher feliz",
            "FELIZ Mujer latina de unos 30 anos, cabello largo oscuro, ropa casual moderna en tonos azul claro y blanco, sonrisa amplia, mirada directa a la camara, [BLANK], encuadre [BLANK], iluminacion suave. Estilo mascota de app movil. Alta resolucion, sin texto.",
            ["fondo blanco limpio", "del busto hacia arriba"],
            [
              "fondo blanco limpio",
              "fondo con ciudad neon",
              "del busto hacia arriba",
              "de cuerpo entero",
              "mirada hacia abajo",
              "sin iluminacion suave",
            ],
            "Perfeito. Agora o prompt completo da mulher feliz foi liberado.",
          ),
          resultFrames: [{ label: "Frame gerado", alt: "Frame da mulher feliz" }],
          previewTitle: "Frame feliz para uma abertura acolhedora",
          previewDescription:
            "Uma imagem-chave com sorriso aberto, energia positiva e clima de boas-vindas para iniciar o video.",
          previewTags: ["Feliz", "Frame", "Abertura"],
        },
        {
          id: "B",
          label: "Prompt B",
          name: "Mujer Triste",
          prompt: FRAME_PROMPTS.B,
          exercise: promptExercise(
            "Complete o prompt da mulher triste",
            "TRISTE Mujer latina de unos 30 anos, cabello largo oscuro, ropa casual moderna en tonos azul claro y blanco, expresion triste y desanimada, [BLANK], [BLANK], encuadre del busto hacia arriba, iluminacion suave. Estilo mascota de app movil. Alta resolucion, sin texto.",
            ["ojos ligeramente bajos", "fondo blanco limpio"],
            [
              "ojos ligeramente bajos",
              "sonrisa amplia",
              "fondo blanco limpio",
              "fondo de escenario oscuro",
              "mirada desafiante",
              "luz neon azul",
            ],
            "Boa. Agora o prompt completo da mulher triste esta liberado.",
          ),
          resultFrames: [{ label: "Frame gerado", alt: "Frame da mulher triste" }],
          previewTitle: "Frame triste para cenas mais emocionais",
          previewDescription:
            "Um frame mais sensivel para gerar contraste, empatia e um tom de superacao ao longo do video.",
          previewTags: ["Triste", "Emocao", "Contraste"],
        },
        {
          id: "C",
          label: "Prompt C",
          name: "Mujer Seria",
          prompt: FRAME_PROMPTS.C,
          exercise: promptExercise(
            "Complete o prompt da mulher seria",
            "SERIA Mujer latina de unos 30 anos, cabello largo oscuro, ropa casual moderna en tonos azul claro y blanco, expresion [BLANK], [BLANK] [BLANK], fondo blanco limpio, encuadre del busto hacia arriba, iluminacion suave. Estilo mascota de app movil. Alta resolucion, sin texto.",
            ["seria y firme", "mirada directa a la camara", "sin sonrisa"],
            [
              "seria y firme",
              "alegre y relajada",
              "mirada directa a la camara",
              "mirada al suelo",
              "sin sonrisa",
              "con una gran risa",
            ],
            "Perfeito. O prompt mais firme agora esta destravado.",
          ),
          resultFrames: [{ label: "Frame gerado", alt: "Frame da mulher seria" }],
          previewTitle: "Frame serio para uma fala firme",
          previewDescription:
            "Um quadro direto e confiante para mensagens mais fortes, com presenca e autoridade na cena.",
          previewTags: ["Seria", "Firme", "Autoridade"],
        },
      ],
      resultTitle: "Seus frames estao prontos",
      resultDescription:
        "Agora voce ja tem os quadros-chave da personagem. No proximo passo, isso vira um video com voz, emocao e mais impacto.",
      continueLabel: "Continuar para o video com IA",
      continueHelper:
        "Agora vamos transformar esse clima em um video falado com IA.",
    },
    video: {
      eyebrow: "Criacao 1",
      title: "Crie um video com IA",
      tool: "Ferramenta: Grok",
      description:
        "Voce descreve a cena. A IA cria o video. Escolha um prompt, toque em gerar e aguarde.",
      steps: [
        "Escolha um dos 3 prompts abaixo.",
        "Cole no campo de geracao de video no Educly.",
        "Toque em gerar video e aguarde.",
        "Assista ao resultado.",
      ],
      promptHint:
        "Pense como um diretor: diga o que quer, como quer e qual o clima da cena.",
      loadingTitle: "Renderizando o video",
      loadingLines: [
        "Interpretando o clima da cena, a emocao e a fala da personagem...",
        "Animando expressao, voz, labios e presenca da personagem...",
        "Finalizando a renderizacao para revelar o video com lip sync...",
      ],
      options: [
        {
          id: "A",
          label: "Prompt A",
          name: "Playa al atardecer",
          prompt: VIDEO_PROMPTS.A,
          exercise: promptExercise(
            "Complete o prompt do video feliz",
            `FELIZ A Latin woman in her late 20s, long dark hair, wearing a casual modern outfit in light blue and white tones, standing in front of a clean white background. She looks directly at the camera with [BLANK]. She speaks in [BLANK] with an [BLANK] and happy tone: "Bienvenida. Tomaste la mejor decision de tu vida al unirte a Educly. Elegiste la educacion y eso lo cambia todo." Realistic style, soft lighting, bust up framing. No music. Natural lip sync.`,
            ["a big warm smile, eyes bright and excited", "Spanish", "enthusiastic"],
            [
              "a big warm smile, eyes bright and excited",
              "slightly watery eyes and a melancholic look",
              "Spanish",
              "English",
              "enthusiastic",
              "slow and heartfelt",
            ],
            "Certo. Agora o prompt do video feliz pode ser usado na geracao.",
          ),
          resultVideos: [{ label: "Video gerado", alt: "Video da mulher feliz" }],
          previewTitle: "Boas-vindas com energia e entusiasmo",
          previewDescription:
            "Uma fala calorosa, sorriso grande e tom confiante para abrir o video com impacto positivo.",
          previewTags: ["Feliz", "Boas-vindas", "Lip sync"],
        },
        {
          id: "B",
          label: "Prompt B",
          name: "Ciudad de noche",
          prompt: VIDEO_PROMPTS.B,
          exercise: promptExercise(
            "Complete o prompt do video emotivo",
            `TRISTE A Latin woman in her late 20s, long dark hair, wearing a casual modern outfit in light blue and white tones, standing in front of a clean white background. She looks directly at the camera with [BLANK]. She speaks in [BLANK] with a [BLANK] tone: "Suscribirse a Educly no fue facil... pero elegiste la educacion. Y eso... eso es lo mas valioso que existe." Realistic style, soft lighting, bust up framing. No music. Natural lip sync.`,
            ["a soft, emotional and melancholic expression, eyes slightly watery, as if genuinely moved", "Spanish", "slow and heartfelt"],
            [
              "a soft, emotional and melancholic expression, eyes slightly watery, as if genuinely moved",
              "a fierce and determined expression",
              "Spanish",
              "French",
              "slow and heartfelt",
              "strong and passionate",
            ],
            "Perfeito. O prompt do video emocional ja esta destravado.",
          ),
          resultVideos: [{ label: "Video gerado", alt: "Video da mulher triste" }],
          previewTitle: "Tom emotivo com dor e valor da escolha",
          previewDescription:
            "Uma personagem mais sensivel, com voz carregada de emocao e uma fala que valoriza a decisao do aluno.",
          previewTags: ["Triste", "Emocao", "Lip sync"],
        },
        {
          id: "C",
          label: "Prompt C",
          name: "Amanecer en las montanas",
          prompt: VIDEO_PROMPTS.C,
          exercise: promptExercise(
            "Complete o prompt do video firme",
            `BRAVA A Latin woman in her late 20s, long dark hair, wearing a casual modern outfit in light blue and white tones, standing in front of a clean white background. She looks directly at the camera with [BLANK]. She speaks in [BLANK] with a [BLANK] tone: "Bienvenida a Educly. Elegiste la educacion y eso no es cualquier cosa. Ahora a trabajar, porque el que estudia no se queda atras." Realistic style, soft lighting, bust up framing. No music. Natural lip sync.`,
            ["a fierce and determined expression, eyebrows slightly furrowed, serious tone", "Spanish", "strong and passionate"],
            [
              "a fierce and determined expression, eyebrows slightly furrowed, serious tone",
              "a soft emotional expression with watery eyes",
              "Spanish",
              "Portuguese",
              "strong and passionate",
              "light and casual",
            ],
            "Boa. Agora o prompt do video firme esta liberado para gerar.",
          ),
          resultVideos: [{ label: "Video gerado", alt: "Video da mulher brava" }],
          previewTitle: "Convite firme e determinado para agir",
          previewDescription:
            "Uma fala forte, com postura segura e energia de acao para passar urgencia e atitude.",
          previewTags: ["Brava", "Determinacao", "Lip sync"],
        },
      ],
      resultTitle: "Seu video esta pronto",
      resultDescription:
        "A cena foi montada a partir do prompt que voce escolheu. Agora observe como a emocao da personagem muda o impacto do video.",
      continueLabel: "Continuar para o flyer de motivacao",
      continueHelper:
        "Agora voce vai gerar uma arte motivacional pronta para publicar e comparar estilos criativos diferentes.",
    },
    flyer: {
      eyebrow: "Criacao 2",
      title: "Crie um flyer de motivacao",
      tool: "Ferramenta: ChatGPT",
      description:
        "A IA tambem cria imagens profissionais. Aqui voce vai gerar uma arte pronta para publicar no Instagram do tipo que parece feita por designer.",
      steps: [
        "Escolha um dos 3 prompts abaixo.",
        "Cole o prompt no campo indicado no Educly.",
        "Toque em gerar imagem.",
        "Veja o resultado.",
      ],
      promptHint:
        "Cada prompt gera um tipo diferente de criativo. Escolha o que mais combina com voce.",
      loadingTitle: "Montando o flyer",
      loadingLines: [
        "Lendo composicao, paleta de cores e estilo do criativo...",
        "Gerando fundo, tipografia e elementos de destaque...",
        "Finalizando a arte para exibir o flyer na tela...",
      ],
      options: [
        {
          id: "A",
          label: "Prompt A",
          name: "Imagem opcao 1",
          prompt:
            `Crie um flyer motivacional para Instagram com uma pessoa treinando ou trabalhando com foco, iluminacao dramatica e estilo moderno.
Adicione um texto forte na imagem:
"Disciplina hoje. Resultado amanha."
Use tipografia grande, contraste alto e design profissional.`,
          exercise: promptExercise(
            "Complete o prompt do flyer de disciplina",
            `Crie um flyer motivacional para Instagram com [BLANK], iluminacao dramatica e estilo [BLANK].
Adicione um texto forte na imagem:
"[BLANK]"
Use tipografia grande, contraste alto e design profissional.`,
            [
              "uma pessoa treinando ou trabalhando com foco",
              "Disciplina hoje. Resultado amanha.",
              "moderno",
            ],
            [
              "uma pessoa treinando ou trabalhando com foco",
              "uma praia vazia",
              "Disciplina hoje. Resultado amanha.",
              "Tudo vai dar certo sem esforco.",
              "moderno",
              "retro infantil",
            ],
            "Certo. O prompt do flyer de disciplina agora esta pronto.",
          ),
          previewTitle: "Disciplina hoje. Resultado amanha.",
          previewDescription:
            "Um criativo forte, moderno e dramatico para passar energia de foco e consistencia.",
          previewTags: ["Motivacao", "Contraste", "Instagram"],
        },
        {
          id: "B",
          label: "Prompt B",
          name: "Imagem opcao 2",
          prompt:
            `Crie um flyer motivacional com uma pessoa caminhando ao nascer do sol, transmitindo sensacao de recomeco e progresso.
Adicione o texto:
"Voce nao precisa ser perfeito. So nao pode parar."
Estilo cinematografico, cores quentes e visual inspirador.`,
          exercise: promptExercise(
            "Complete o prompt do flyer de recomeco",
            `Crie um flyer motivacional com [BLANK], transmitindo sensacao de recomeco e progresso.
Adicione o texto:
"[BLANK]"
Estilo [BLANK], cores quentes e visual inspirador.`,
            [
              "uma pessoa caminhando ao nascer do sol",
              "Voce nao precisa ser perfeito. So nao pode parar.",
              "cinematografico",
            ],
            [
              "uma pessoa caminhando ao nascer do sol",
              "uma mulher em um escritorio escuro",
              "Voce nao precisa ser perfeito. So nao pode parar.",
              "Fique parado e espere.",
              "cinematografico",
              "cartunesco",
            ],
            "Perfeito. O flyer mais inspirador agora foi destravado.",
          ),
          previewTitle: "Voce nao precisa ser perfeito",
          previewDescription:
            "Um visual inspirador, quente e cinematografico para transmitir recomeco e constancia.",
          previewTags: ["Inspirador", "Recomeco", "Instagram"],
        },
        {
          id: "C",
          label: "Prompt C",
          name: "Imagem opcao 3",
          prompt:
            `Crie um flyer motivacional com uma pessoa olhando para o horizonte em um ambiente urbano ou natural, simbolizando crescimento pessoal.
Adicione o texto:
"Todo dia e uma nova chance de evoluir."
Design clean, elegante e com aparencia profissional.`,
          exercise: promptExercise(
            "Complete o prompt do flyer de evolucao",
            `Crie um flyer motivacional com [BLANK] em um ambiente urbano ou natural, simbolizando crescimento pessoal.
Adicione o texto:
"[BLANK]"
Design [BLANK], elegante e com aparencia profissional.`,
            [
              "uma pessoa olhando para o horizonte",
              "Todo dia e uma nova chance de evoluir.",
              "clean",
            ],
            [
              "uma pessoa olhando para o horizonte",
              "um grupo correndo na praia",
              "Todo dia e uma nova chance de evoluir.",
              "Nunca mude nada.",
              "clean",
              "cheio de poluicao visual",
            ],
            "Boa. Agora o prompt do flyer clean esta completo.",
          ),
          previewTitle: "Todo dia e uma nova chance de evoluir",
          previewDescription:
            "Um criativo clean e elegante que comunica crescimento pessoal com uma mensagem forte.",
          previewTags: ["Clean", "Crescimento", "Instagram"],
        },
      ],
      resultTitle: "Seu flyer esta pronto",
      resultDescription:
        "Mesmo mudando so o prompt, a identidade visual muda completamente. E assim que a IA comeca a obedecer a direcao criativa.",
      continueLabel: "Continuar para a apresentacao",
      continueHelper:
        "Agora voce vai sair da imagem e ver uma apresentacao inteira sendo estruturada em poucos segundos.",
    },
    slides: {
      eyebrow: "Criacao 3",
      title: "Crie uma apresentacao em slides",
      tool: "Ferramenta: Gamma",
      description:
        "Chega de passar horas no PowerPoint. A IA monta uma apresentacao completa com design, textos e estrutura em segundos.",
      steps: [
        "Escolha um dos 3 prompts abaixo.",
        "Cole no campo de geracao de apresentacao no Educly.",
        "Toque em gerar apresentacao e aguarde.",
        "Navegue pelos slides prontos.",
      ],
      promptHint:
        "O Gamma cuida do design, dos textos e do layout. Voce nao precisa ajustar nada.",
      loadingTitle: "Montando os slides",
      loadingLines: [
        "Organizando roteiro, narrativa e ordem dos topicos...",
        "Distribuindo titulos, paginas e hierarquia visual...",
        "Aplicando layout, destaque e ritmo de apresentacao...",
      ],
      options: [
        {
          id: "A",
          label: "Apresentacao opcao 1",
          name: "Jornada de transformacao",
          prompt:
            "Capa com uma frase que gere identificacao. Apresentacao da pessoa e sua rotina dificil. Principais dores (cansaco, falta de tempo, dificuldade com tecnologia). Momento de descoberta de uma solucao simples. Explicacao de como a solucao funciona de forma pratica. Primeiros resultados percebidos. Mudancas na rotina e qualidade de vida. Beneficios concretos (mais tempo, mais organizacao, menos estresse). Mensagem de que qualquer pessoa pode conseguir o mesmo. Slide final com convite claro para comecar. Use linguagem humana, proxima e facil de entender. Frases curtas, impacto emocional leve e visual acolhedor.",
          exercise: promptExercise(
            "Complete o prompt da apresentacao de transformacao",
            "Capa com uma frase que gere identificacao. Apresentacao da pessoa e sua [BLANK]. Principais dores (cansaco, falta de tempo, dificuldade com tecnologia). Momento de descoberta de uma solucao simples. Explicacao de como a solucao funciona de forma pratica. Primeiros resultados percebidos. Mudancas na rotina e qualidade de vida. Beneficios concretos (mais tempo, mais organizacao, menos estresse). Mensagem de que qualquer pessoa pode conseguir o mesmo. Slide final com [BLANK]. Use linguagem [BLANK] e facil de entender. Frases curtas, impacto emocional leve e visual acolhedor.",
            ["rotina dificil", "humana e proxima", "um convite claro para comecar"],
            [
              "rotina dificil",
              "produto tecnico sem historia",
              "humana e proxima",
              "robotica e fria",
              "um convite claro para comecar",
              "um final sem chamada",
            ],
            "Perfeito. O prompt completo da jornada de transformacao foi liberado.",
          ),
          previewTitle: "Apresentacao com historia e evolucao",
          previewDescription:
            "Uma sequencia pensada para gerar identificacao, alivio e vontade de comecar.",
          previewTags: ["Historia", "Humana", "Conversao"],
        },
        {
          id: "B",
          label: "Apresentacao opcao 2",
          name: "Explicacao simples",
          prompt:
            "Capa com titulo claro e direto. Explicacao simples do conceito (sem termos tecnicos). Comparacao com algo do dia a dia para facilitar entendimento. Exemplos praticos de uso na vida real. Situacoes onde isso pode ajudar (trabalho, organizacao, rotina). Beneficios claros e faceis de perceber. Quebra de objecoes (mostrar que nao e dificil). Passo a passo basico para comecar. Reforco de que qualquer pessoa pode aprender. Slide final com incentivo para dar o primeiro passo. Use linguagem didatica, acolhedora e simples. Visual leve, organizado e com foco em facilitar o entendimento.",
          exercise: promptExercise(
            "Complete o prompt da apresentacao didatica",
            "Capa com [BLANK]. Explicacao simples do conceito (sem termos tecnicos). Comparacao com algo do dia a dia para facilitar entendimento. Exemplos praticos de uso na vida real. Situacoes onde isso pode ajudar (trabalho, organizacao, rotina). Beneficios claros e faceis de perceber. Quebra de objecoes (mostrar que nao e dificil). Passo a passo basico para comecar. Reforco de que qualquer pessoa pode aprender. Slide final com incentivo para [BLANK]. Use linguagem [BLANK]. Visual leve, organizado e com foco em facilitar o entendimento.",
            ["titulo claro e direto", "didatica e simples", "dar o primeiro passo"],
            [
              "titulo claro e direto",
              "titulo abstrato e confuso",
              "didatica e simples",
              "tecnica e distante",
              "dar o primeiro passo",
              "encerrar sem acao",
            ],
            "Boa. Agora o prompt da apresentacao didatica esta pronto.",
          ),
          previewTitle: "Deck didatico e facil de seguir",
          previewDescription:
            "Estrutura clara, visual leve e ritmo natural para quem esta vendo o assunto pela primeira vez.",
          previewTags: ["Didatico", "Leve", "Passo a passo"],
        },
        {
          id: "C",
          label: "Apresentacao opcao 3",
          name: "Rotina dificil para rotina melhor",
          prompt:
            "Capa com uma frase que gere identificacao. Apresentacao da pessoa e sua rotina dificil. Principais dores (cansaco, falta de tempo, dificuldade com tecnologia). Momento de descoberta de uma solucao simples. Explicacao de como a solucao funciona de forma pratica. Primeiros resultados percebidos. Mudancas na rotina e qualidade de vida. Beneficios concretos (mais tempo, mais organizacao, menos estresse). Mensagem de que qualquer pessoa pode conseguir o mesmo. Slide final com convite claro para comecar. Use linguagem humana, proxima e facil de entender. Frases curtas, impacto emocional leve e visual acolhedor.",
          exercise: promptExercise(
            "Complete o prompt da apresentacao acolhedora",
            "Capa com [BLANK]. Apresentacao da pessoa e sua rotina dificil. Principais dores (cansaco, falta de tempo, dificuldade com tecnologia). Momento de descoberta de uma solucao simples. Explicacao de como a solucao funciona de forma pratica. Primeiros resultados percebidos. Mudancas na rotina e qualidade de vida. Beneficios concretos (mais tempo, mais organizacao, menos estresse). Mensagem de que [BLANK]. Slide final com convite claro para comecar. Use linguagem humana, proxima e facil de entender. Frases curtas, [BLANK] e visual acolhedor.",
            [
              "uma frase que gere identificacao",
              "impacto emocional leve",
              "qualquer pessoa pode conseguir o mesmo",
            ],
            [
              "uma frase que gere identificacao",
              "um grafico tecnico frio",
              "impacto emocional leve",
              "linguagem dura e agressiva",
              "qualquer pessoa pode conseguir o mesmo",
              "so especialistas podem fazer isso",
            ],
            "Perfeito. Esse prompt acolhedor agora esta destravado.",
          ),
          previewTitle: "Slides com antes e depois da rotina",
          previewDescription:
            "A IA organiza a narrativa e entrega uma apresentacao pronta para emocao e clareza ao mesmo tempo.",
          previewTags: ["Rotina", "Antes e depois", "Clareza"],
        },
      ],
      resultTitle: "Sua apresentacao esta pronta",
      resultDescription:
        "Aqui voce sente como a IA pode assumir estrutura, visual e texto ao mesmo tempo, sem depender de um arquivo em branco.",
      continueLabel: "Continuar para o site completo",
      continueHelper:
        "Fechando o Dia 1, voce vai pedir um site inteiro e ver uma pagina pronta surgir a partir de um unico prompt.",
    },
    site: {
      eyebrow: "Criacao 4",
      title: "Crie um site completo",
      tool: "Ferramenta: Claude",
      description:
        "Um site inteiro com paginas, botoes, design e textos. Tudo a partir de um pedido. Nao e so imagem: e codigo real.",
      steps: [
        "Escolha um dos 3 prompts abaixo.",
        "Cole no campo de geracao de site no Educly.",
        "Toque em gerar site e aguarde.",
        "Navegue pelo site pronto.",
      ],
      promptHint:
        "O Claude monta sites com HTML, CSS e codigo real. Isso significa que o resultado ja nasce com cara de algo navegavel.",
      loadingTitle: "Construindo o site",
      loadingLines: [
        "Interpretando estrutura, sessoes e experiencia principal...",
        "Compondo layout, estilo visual e elementos interativos...",
        "Fechando HTML, CSS e detalhes para revelar a pagina...",
      ],
      options: [
        {
          id: "A",
          label: "Site opcao 1",
          name: "Landing page de luxo",
          prompt:
            "Crie uma landing page de alto padrao para venda de um apartamento de luxo chamado Senda. Visual elegante com fundo escuro, dourado e creme. Precisa ter: hero impactante com titulo grande, barra com dados do apartamento (142m2, 3 dormitorios, 3 vagas, 18 andar), galeria de ambientes, secao de diferenciais, formulario de contato e mapa de localizacao. Cursor personalizado dourado. Tudo em um unico arquivo HTML.",
          exercise: promptExercise(
            "Complete o prompt do site Senda",
            "Crie uma landing page de alto padrao para venda de [BLANK]. Visual elegante com [BLANK]. Precisa ter: hero impactante com titulo grande, barra com dados do apartamento (142m2, 3 dormitorios, 3 vagas, 18 andar), galeria de ambientes, secao de diferenciais, formulario de contato e mapa de localizacao. Cursor personalizado dourado. Tudo em [BLANK].",
            [
              "um apartamento de luxo chamado Senda",
              "fundo escuro, dourado e creme",
              "um unico arquivo HTML",
            ],
            [
              "um apartamento de luxo chamado Senda",
              "uma loja de roupas chamada Forma",
              "fundo escuro, dourado e creme",
              "visual todo neon colorido",
              "um unico arquivo HTML",
              "dez arquivos separados",
            ],
            "Perfeito. O prompt premium do Senda esta completo.",
          ),
          previewTitle: "Senda: visual premium com hero de impacto",
          previewDescription:
            "Um projeto de alto padrao com atmosfera sofisticada e detalhes pensados para conversao.",
          previewTags: ["Luxo", "Landing page", "Dark gold"],
        },
        {
          id: "B",
          label: "Site opcao 2",
          name: "E-commerce clean",
          prompt:
            "Crie um e-commerce de moda chamado Forma. Visual clean, minimalista, fundo quase branco. Precisa funcionar de verdade: listagem de produtos com filtro por categoria, busca em tempo real, pagina de produto individual com selecao de tamanho e cor, carrinho lateral que abre e fecha, e contador no icone do carrinho. Inclua pelo menos 10 produtos de roupas com precos. Tudo em um unico arquivo HTML.",
          exercise: promptExercise(
            "Complete o prompt do e-commerce Forma",
            "Crie um e-commerce de moda chamado [BLANK]. Visual [BLANK], fundo quase branco. Precisa funcionar de verdade: listagem de produtos com filtro por categoria, busca em tempo real, pagina de produto individual com selecao de tamanho e cor, [BLANK], e contador no icone do carrinho. Inclua pelo menos 10 produtos de roupas com precos. Tudo em um unico arquivo HTML.",
            [
              "Forma",
              "clean e minimalista",
              "carrinho lateral que abre e fecha",
            ],
            [
              "Forma",
              "Raiz",
              "clean e minimalista",
              "escuro e barroco",
              "carrinho lateral que abre e fecha",
              "sem carrinho nenhum",
            ],
            "Boa. O prompt do e-commerce funcional esta pronto para gerar.",
          ),
          previewTitle: "Forma: loja elegante e funcional",
          previewDescription:
            "Catalogo, filtros, busca e carrinho em um visual leve com cara de marca moderna.",
          previewTags: ["E-commerce", "Minimalista", "Funcional"],
        },
        {
          id: "C",
          label: "Site opcao 3",
          name: "Blog organico",
          prompt:
            "Crie um blog de nutricao e alimentacao chamado Raiz. Visual organico com tons de verde, terra e creme. Precisa ter: pagina inicial com posts em destaque, artigos recentes em cards, receita da semana, categorias, newsletter e rodape. Ao clicar em um artigo deve abrir o post completo com conteudo real de nutricao. Inclua pelo menos 6 artigos escritos de verdade sobre alimentacao saudavel. Tudo em um unico arquivo HTML.",
          exercise: promptExercise(
            "Complete o prompt do blog Raiz",
            "Crie um blog de nutricao e alimentacao chamado [BLANK]. Visual organico com tons [BLANK]. Precisa ter: pagina inicial com posts em destaque, artigos recentes em cards, receita da semana, categorias, newsletter e rodape. Ao clicar em um artigo deve abrir o post completo com conteudo real de nutricao. Inclua pelo menos [BLANK] sobre alimentacao saudavel. Tudo em um unico arquivo HTML.",
            [
              "Raiz",
              "de verde, terra e creme",
              "6 artigos escritos de verdade",
            ],
            [
              "Raiz",
              "Forma",
              "de verde, terra e creme",
              "metalicos e frios",
              "6 artigos escritos de verdade",
              "apenas uma frase solta",
            ],
            "Perfeito. O prompt do blog organico agora esta liberado.",
          ),
          previewTitle: "Raiz: blog editorial com conteudo de verdade",
          previewDescription:
            "Uma pagina viva, com identidade organica e estrutura pronta para leitura, descoberta e newsletter.",
          previewTags: ["Blog", "Editorial", "Organico"],
        },
      ],
      resultTitle: "Seu site esta pronto",
      resultDescription:
        "Voce pediu um produto inteiro e recebeu uma interface navegavel. Esse e o tipo de salto que faz a IA parecer absurda para quem esta vendo pela primeira vez.",
      continueLabel: "Ir para o resumo final do Dia 1",
      continueHelper:
        "Agora vale olhar para tras e perceber o que voce criou em poucos minutos.",
    },
  },
  summary: {
    eyebrow: "Fechamento",
    title: "O que voce acabou de criar",
    description:
      "Um video, um flyer motivacional, uma apresentacao em slides e um site completo. Tudo em poucos minutos, com prompts prontos e sem precisar entender teoria antes.",
    items: [
      "Um video",
      "Um flyer motivacional",
      "Uma apresentacao em slides",
      "Um site completo",
    ],
    finalLine:
      "Agora imagina quando voce aprender a criar os seus proprios prompts do zero.",
    nextDay:
      "Amanha: como a IA funciona e como fazer ela trabalhar do seu jeito.",
    continueLabel: "Concluir Dia 1",
    continueHelper:
      "Conclua para abrir o fluxo normal do fim do Dia 1 e registrar sua avaliacao.",
  },
} as const;

const EN_COPY = {} as const;
const ES_COPY = {} as const;
const FR_COPY = {} as const;

export const SIDNEY_DAY1_JOURNEY_COPY: Record<SidneyJourneyLocale, any> = {
  pt: PT_COPY,
  en: EN_COPY,
  es: ES_COPY,
  fr: FR_COPY,
};

export const getSidneyDay1JourneyCopy = (language?: string) => {
  const locale = resolveSidneyJourneyLocale(language);
  const localizedCopy = SIDNEY_DAY1_JOURNEY_COPY[locale];

  return {
    ...PT_COPY,
    ...localizedCopy,
    common: {
      ...PT_COPY.common,
      ...(localizedCopy?.common || {}),
    },
    intro: {
      ...PT_COPY.intro,
      ...(localizedCopy?.intro || {}),
    },
    sections: {
      frames: {
        ...PT_COPY.sections.frames,
        ...(localizedCopy?.sections?.frames || {}),
      },
      video: {
        ...PT_COPY.sections.video,
        ...(localizedCopy?.sections?.video || {}),
      },
      flyer: {
        ...PT_COPY.sections.flyer,
        ...(localizedCopy?.sections?.flyer || {}),
      },
      slides: {
        ...PT_COPY.sections.slides,
        ...(localizedCopy?.sections?.slides || {}),
      },
      site: {
        ...PT_COPY.sections.site,
        ...(localizedCopy?.sections?.site || {}),
      },
    },
    summary: {
      ...PT_COPY.summary,
      ...(localizedCopy?.summary || {}),
    },
  };
};
