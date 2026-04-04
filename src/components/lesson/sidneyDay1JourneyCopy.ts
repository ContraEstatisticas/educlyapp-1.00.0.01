import { EN_SIDNEY_DAY1_JOURNEY_COPY } from "@/components/lesson/sidneyDay1JourneyCopy.en";
import { ES_SIDNEY_DAY1_JOURNEY_COPY } from "@/components/lesson/sidneyDay1JourneyCopy.es";
import { FR_SIDNEY_DAY1_JOURNEY_COPY } from "@/components/lesson/sidneyDay1JourneyCopy.fr";

export type SidneyJourneyLocale = "pt" | "en" | "es" | "fr";

export type SidneyJourneySectionKey =
  | "onboarding"
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

const mergeLocalizedOptions = (
  baseOptions: any[] = [],
  localizedOptions?: any[],
) =>
  baseOptions.map((baseOption) => {
    const localizedOption = localizedOptions?.find(
      (option) => option.id === baseOption.id,
    );

    if (!localizedOption) {
      return baseOption;
    }

    return {
      ...baseOption,
      ...localizedOption,
      previewTags: localizedOption.previewTags ?? baseOption.previewTags,
      exercise:
        baseOption.exercise || localizedOption.exercise
          ? {
              ...(baseOption.exercise || {}),
              ...(localizedOption.exercise || {}),
            }
          : undefined,
    };
  });

const mergeLocalizedSection = (baseSection: any, localizedSection?: any) => ({
  ...baseSection,
  ...(localizedSection || {}),
  steps: localizedSection?.steps ?? baseSection.steps,
  loadingLines: localizedSection?.loadingLines ?? baseSection.loadingLines,
  options: mergeLocalizedOptions(baseSection.options, localizedSection?.options),
});

const FRAME_PROMPTS = {
  A: "Mulher latina de cerca de 30 anos, cabelo longo escuro, roupa casual moderna em tons de azul claro e branco, sorriso amplo, olhar direto para a camera, fundo branco limpo, enquadramento do busto para cima, iluminacao suave. Estilo mascote de app mobile. Alta resolucao, sem texto.",
  B: "Mulher latina de cerca de 30 anos, cabelo longo escuro, roupa casual moderna em tons de azul claro e branco, expressao triste e desanimada, olhos levemente baixos, fundo branco limpo, enquadramento do busto para cima, iluminacao suave. Estilo mascote de app mobile. Alta resolucao, sem texto.",
  C: "Mulher latina de cerca de 30 anos, cabelo longo escuro, roupa casual moderna em tons de azul claro e branco, expressao seria e firme, olhar direto para a camera sem sorrir, fundo branco limpo, enquadramento do busto para cima, iluminacao suave. Estilo mascote de app mobile. Alta resolucao, sem texto.",
} as const;

const VIDEO_PROMPTS = {
  A: `Uma mulher latina na faixa dos 20 e poucos anos, com cabelo longo escuro, usando uma roupa casual moderna em tons de azul claro e branco, em pe diante de um fundo branco limpo. Ela olha diretamente para a camera com um sorriso grande e acolhedor, olhos brilhantes e animados. Ela fala em portugues, com um tom entusiasmado e feliz: "Bem-vinda. Voce tomou uma das melhores decisoes da sua vida ao entrar na Educly. Voce escolheu a educacao, e isso muda tudo." Estilo realista, iluminacao suave, enquadramento do busto para cima. Sem musica. Lip sync natural.`,
  B: `Uma mulher latina na faixa dos 20 e poucos anos, com cabelo longo escuro, usando uma roupa casual moderna em tons de azul claro e branco, em pe diante de um fundo branco limpo. Ela olha diretamente para a camera com uma expressao suave, emotiva e melancolica, olhos levemente marejados, como se estivesse realmente tocada. Ela fala em portugues, com um tom lento e sincero: "Entrar na Educly nao foi uma decisao qualquer... mas voce escolheu a educacao. E isso... isso e uma das coisas mais valiosas que existem." Estilo realista, iluminacao suave, enquadramento do busto para cima. Sem musica. Lip sync natural.`,
  C: `Uma mulher latina na faixa dos 20 e poucos anos, com cabelo longo escuro, usando uma roupa casual moderna em tons de azul claro e branco, em pe diante de um fundo branco limpo. Ela olha diretamente para a camera com uma expressao forte e determinada, sobrancelhas levemente franzidas, tom serio. Ela fala em portugues, com um tom forte e apaixonado: "Bem-vinda a Educly. Voce escolheu a educacao e isso nao e pouca coisa. Agora e hora de agir, porque quem estuda nao fica para tras." Estilo realista, iluminacao suave, enquadramento do busto para cima. Sem musica. Lip sync natural.`,
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
    pipelineLabel: "pipeline de IA",
    generatedResultBadge: "resultado da geracao",
    finalAssetLabel: "asset final",
    videoAssetPending:
      "O video gerado vai aparecer aqui assim que os assets forem conectados.",
    frameAssetPending:
      "O frame gerado vai aparecer aqui assim que os assets forem conectados.",
    protectedResultLabel: "resultado protegido",
    hiddenVideoLabel: "video oculto",
    hiddenFrameLabel: "frame oculto",
    hiddenVideoHint:
      "Escolha a opcao que quiser e clique em gerar agora. O video real aparece somente depois do suspense e da tela de loading.",
    hiddenFramesHint:
      "Escolha a opcao que quiser e clique em gerar agora. Os frames reais aparecem somente depois do suspense e da tela de loading.",
    generatedVideoLabel: "video gerado",
    generatedFrameLabel: "frame gerado",
    flyerCtaLabel: "Reserve agora",
    promptPanelLabel: "Prompt",
    dayLabel: "Dia 1",
  },
  onboarding: {
    eyebrow: "Boas-vindas em video",
    title: "Veja o onboarding antes de comecar a criar",
    description:
      "Este video abre a experiencia do Sidney e te mostra rapidamente como o Dia 1 vai funcionar antes das geracoes com IA.",
    supporting:
      "Depois dele, a trilha segue igual ao sidney_texto: frames, video, flyer, apresentacao e site.",
    playerEyebrow: "video de onboarding",
    playerTitle: "Introducao rapida da trilha",
    playerDescription:
      "Assista e entre na experiencia sabendo o que voce vai ver e construir daqui para frente.",
    fallbackNotice:
      "Enquanto o onboarding em portugues nao chega, estamos exibindo a versao mais proxima disponivel.",
    continueLabel: "Entrar na experiencia pratica",
    continueHelper:
      "Depois do onboarding, voce segue para a introducao normal do Dia 1.",
  },
  intro: {
    eyebrow: "Dia 1 na pratica",
    title: "Hoje voce nao vai estudar. Vai criar.",
    description:
      "Hoje voce vai criar 5 entregas visiveis com IA: frames, um video, um flyer, uma apresentacao e um site real. Nao precisa saber nada antes. So siga os passos, escolha um prompt e veja o resultado.",
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
      { icon: "flyer", title: "Um flyer", tool: "ChatGPT", time: "~3 min" },
      {
        icon: "slides",
        title: "Uma apresentacao",
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
      "Primeiro voce cria os frames do video, depois transforma isso em um video falado, em seguida gera um flyer, depois ve uma apresentacao completa surgir na tela e fecha a experiencia vendo um site real aparecer. A ideia aqui e te fazer sentir a IA trabalhando na pratica antes da teoria.",
    continueLabel: "Comecar pelos frames do video",
    continueHelper:
      "Antes do video, vamos criar as imagens-chave que vao dar o clima da cena.",
  },
  sections: {
    frames: {
      eyebrow: "Preparacao do video",
      title: "Crie frames para o seu video",
      tool: "Ferramenta: Gemini",
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
          name: "Mulher Feliz",
          prompt: FRAME_PROMPTS.A,
          exercise: promptExercise(
            "Complete o prompt da mulher feliz",
            "Mulher latina de cerca de 30 anos, cabelo longo escuro, roupa casual moderna em tons de azul claro e branco, sorriso amplo, olhar direto para a camera, [BLANK], enquadramento [BLANK], iluminacao suave. Estilo mascote de app mobile. Alta resolucao, sem texto.",
            ["fundo branco limpo", "do busto para cima"],
            [
              "fundo branco limpo",
              "fundo com cidade neon",
              "do busto para cima",
              "de corpo inteiro",
              "olhando para baixo",
              "sem iluminacao suave",
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
          name: "Mulher Triste",
          prompt: FRAME_PROMPTS.B,
          exercise: promptExercise(
            "Complete o prompt da mulher triste",
            "Mulher latina de cerca de 30 anos, cabelo longo escuro, roupa casual moderna em tons de azul claro e branco, expressao triste e desanimada, [BLANK], [BLANK], enquadramento do busto para cima, iluminacao suave. Estilo mascote de app mobile. Alta resolucao, sem texto.",
            ["olhos levemente baixos", "fundo branco limpo"],
            [
              "olhos levemente baixos",
              "sorriso amplo",
              "fundo branco limpo",
              "fundo de cenario escuro",
              "olhar desafiador",
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
          name: "Mulher Seria",
          prompt: FRAME_PROMPTS.C,
          exercise: promptExercise(
            "Complete o prompt da mulher seria",
            "Mulher latina de cerca de 30 anos, cabelo longo escuro, roupa casual moderna em tons de azul claro e branco, expressao [BLANK], [BLANK] [BLANK], fundo branco limpo, enquadramento do busto para cima, iluminacao suave. Estilo mascote de app mobile. Alta resolucao, sem texto.",
            ["seria e firme", "olhar direto para a camera", "sem sorrir"],
            [
              "seria e firme",
              "alegre e relaxada",
              "olhar direto para a camera",
              "olhando para o chao",
              "sem sorrir",
              "com uma grande risada",
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
          name: "Boas-vindas entusiasmada",
          prompt: VIDEO_PROMPTS.A,
          exercise: promptExercise(
            "Complete o prompt do video feliz",
            `Uma mulher latina na faixa dos 20 e poucos anos, com cabelo longo escuro, usando uma roupa casual moderna em tons de azul claro e branco, em pe diante de um fundo branco limpo. Ela olha diretamente para a camera com [BLANK]. Ela fala em [BLANK], com um tom [BLANK] e feliz: "Bem-vinda. Voce tomou uma das melhores decisoes da sua vida ao entrar na Educly. Voce escolheu a educacao, e isso muda tudo." Estilo realista, iluminacao suave, enquadramento do busto para cima. Sem musica. Lip sync natural.`,
            ["um sorriso grande e acolhedor, olhos brilhantes e animados", "portugues", "entusiasmado"],
            [
              "um sorriso grande e acolhedor, olhos brilhantes e animados",
              "olhos levemente marejados e um olhar melancolico",
              "portugues",
              "ingles",
              "entusiasmado",
              "lento e sincero",
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
          name: "Mensagem emotiva",
          prompt: VIDEO_PROMPTS.B,
          exercise: promptExercise(
            "Complete o prompt do video emotivo",
            `Uma mulher latina na faixa dos 20 e poucos anos, com cabelo longo escuro, usando uma roupa casual moderna em tons de azul claro e branco, em pe diante de um fundo branco limpo. Ela olha diretamente para a camera com [BLANK]. Ela fala em [BLANK], com um tom [BLANK]: "Entrar na Educly nao foi uma decisao qualquer... mas voce escolheu a educacao. E isso... isso e uma das coisas mais valiosas que existem." Estilo realista, iluminacao suave, enquadramento do busto para cima. Sem musica. Lip sync natural.`,
            ["uma expressao suave, emotiva e melancolica, olhos levemente marejados, como se estivesse realmente tocada", "portugues", "lento e sincero"],
            [
              "uma expressao suave, emotiva e melancolica, olhos levemente marejados, como se estivesse realmente tocada",
              "uma expressao forte e determinada",
              "portugues",
              "frances",
              "lento e sincero",
              "forte e apaixonado",
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
          name: "Convite firme",
          prompt: VIDEO_PROMPTS.C,
          exercise: promptExercise(
            "Complete o prompt do video firme",
            `Uma mulher latina na faixa dos 20 e poucos anos, com cabelo longo escuro, usando uma roupa casual moderna em tons de azul claro e branco, em pe diante de um fundo branco limpo. Ela olha diretamente para a camera com [BLANK]. Ela fala em [BLANK], com um tom [BLANK]: "Bem-vinda a Educly. Voce escolheu a educacao e isso nao e pouca coisa. Agora e hora de agir, porque quem estuda nao fica para tras." Estilo realista, iluminacao suave, enquadramento do busto para cima. Sem musica. Lip sync natural.`,
            ["uma expressao forte e determinada, sobrancelhas levemente franzidas, tom serio", "portugues", "forte e apaixonado"],
            [
              "uma expressao forte e determinada, sobrancelhas levemente franzidas, tom serio",
              "uma expressao suave e emotiva, com olhos marejados",
              "portugues",
              "espanhol",
              "forte e apaixonado",
              "leve e casual",
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
      continueLabel: "Continuar para o flyer",
      continueHelper:
        "Agora voce vai transformar a ideia do video em uma arte pronta para divulgar.",
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
              "moderno",
              "Disciplina hoje. Resultado amanha.",
            ],
            [
              "uma pessoa treinando ou trabalhando com foco",
              "uma praia vazia",
              "moderno",
              "retro infantil",
              "Disciplina hoje. Resultado amanha.",
              "Tudo vai dar certo sem esforco.",
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
          name: "Apresentacao premium",
          prompt:
            "Crie uma apresentacao profissional de alto nivel sobre [tema], com um enfoque estrategico e visual premium. Gere entre 10 e 12 slides bem estruturados com: capa impactante, contexto do problema, analise da situacao atual, oportunidades, proposta de solucao, plano de acao, beneficios claros, diferenciais e conclusao. Utilize uma linguagem executiva, clara e persuasiva, evitando termos desnecessariamente tecnicos. O design deve ser moderno, elegante e minimalista, com cores sobrias (preto, branco, tons neutros) e tipografia sofisticada. Inclua sugestoes visuais para cada slide (graficos, icones, esquemas) e mantenha os textos curtos e de alto impacto.",
          exercise: promptExercise(
            "Complete o prompt da apresentacao premium",
            "Crie uma apresentacao profissional de alto nivel sobre [tema], com um enfoque [BLANK]. Gere entre 10 e 12 slides bem estruturados com: capa impactante, contexto do problema, analise da situacao atual, oportunidades, proposta de solucao, [BLANK], beneficios claros, diferenciais e conclusao. O design deve ser moderno, elegante e minimalista, com [BLANK] e tipografia sofisticada.",
            [
              "estrategico e visual premium",
              "plano de acao",
              "cores sobrias (preto, branco, tons neutros)",
            ],
            [
              "estrategico e visual premium",
              "informal e improvisado",
              "plano de acao",
              "piadas no meio",
              "cores sobrias (preto, branco, tons neutros)",
              "cores neon saturadas",
            ],
            "Perfeito. O prompt da apresentacao premium agora esta pronto.",
          ),
          previewTitle: "Deck executivo com visual premium",
          previewDescription:
            "Uma apresentacao estrategica, elegante e persuasiva para temas corporativos ou de alto nivel.",
          previewTags: ["Executiva", "Premium", "Estrategica"],
        },
        {
          id: "B",
          label: "Apresentacao opcao 2",
          name: "Apresentacao dinamica",
          prompt:
            "Crie uma apresentacao dinamica e atrativa sobre [tema], com um enfoque moderno e facil de conectar com a audiencia. Estruture entre 8 e 10 slides em formato storytelling: inicio chamativo, contexto do problema, situacoes do dia a dia, descoberta de uma solucao, como funciona na pratica, beneficios reais e conclusao com chamada para a acao. Use linguagem proxima, clara e facil de entender, evitando excesso de formalidade. O design deve ser visual, moderno e limpo, com cores suaves, boa hierarquia visual e imagens que transmitam situacoes reais. Inclua textos curtos, frases de impacto e sugestoes visuais para cada slide.",
          exercise: promptExercise(
            "Complete o prompt da apresentacao dinamica",
            "Crie uma apresentacao dinamica e atrativa sobre [tema], com um enfoque [BLANK]. Estruture entre 8 e 10 slides em formato storytelling: inicio chamativo, contexto do problema, situacoes do dia a dia, [BLANK], como funciona na pratica, beneficios reais e conclusao com chamada para a acao. O design deve ser visual, moderno e limpo, com [BLANK], boa hierarquia visual e imagens que transmitam situacoes reais.",
            [
              "moderno e facil de conectar com a audiencia",
              "descoberta de uma solucao",
              "cores suaves",
            ],
            [
              "moderno e facil de conectar com a audiencia",
              "frio e distante",
              "descoberta de uma solucao",
              "um fechamento sem direcao",
              "cores suaves",
              "tons agressivos e pesados",
            ],
            "Boa. O prompt da apresentacao dinamica agora esta pronto.",
          ),
          previewTitle: "Storytelling visual e envolvente",
          previewDescription:
            "Uma estrutura moderna, leve e conectada a situacoes reais para prender a atencao da audiencia.",
          previewTags: ["Dinamica", "Storytelling", "Conexao"],
        },
        {
          id: "C",
          label: "Apresentacao opcao 3",
          name: "Produtividade no trabalho",
          prompt:
            "Crie uma apresentacao profissional sobre produtividade no trabalho. Gere entre 8 e 12 slides com a seguinte estrutura: introducao, situacao atual, principais desafios, solucoes praticas, beneficios e conclusao. Use linguagem clara, direta e facil de entender em um contexto profissional. Inclua titulos curtos, pontos organizados e sugestoes visuais para cada slide.",
          exercise: promptExercise(
            "Complete o prompt da apresentacao de produtividade",
            "Crie uma apresentacao profissional sobre [BLANK]. Gere entre 8 e 12 slides com a seguinte estrutura: introducao, situacao atual, principais desafios, [BLANK], beneficios e conclusao. Use [BLANK] em um contexto profissional.",
            [
              "produtividade no trabalho",
              "solucoes praticas",
              "linguagem clara, direta e facil de entender",
            ],
            [
              "produtividade no trabalho",
              "moda de luxo",
              "solucoes praticas",
              "historias sem aplicacao",
              "linguagem clara, direta e facil de entender",
              "uma linguagem rebuscada e confusa",
            ],
            "Perfeito. O prompt da apresentacao de produtividade agora esta pronto.",
          ),
          previewTitle: "Apresentacao profissional e objetiva",
          previewDescription:
            "Um deck claro e pratico sobre produtividade, com estrutura corporativa e foco em aplicacao.",
          previewTags: ["Produtividade", "Profissional", "Clareza"],
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
      "Frames para um video, um video falado, um flyer, uma apresentacao em slides e um site completo. Tudo em poucos minutos, com prompts prontos e sem precisar entender teoria antes.",
    items: [
      "Frames para o video",
      "Um video",
      "Um flyer",
      "Uma apresentacao",
      "Um site completo",
    ],
    finalLine:
      "Agora imagina quando voce aprender a criar os seus proprios prompts do zero.",
    nextDay:
      "A partir de amanha, vamos te ajudar a entender e aprender cada uma dessas IAs para que voce consiga fazer tudo isso sozinho.",
    toolsEyebrow: "IAs usadas hoje",
    toolsTitle: "As ferramentas que voce acabou de experimentar",
    toolsDescription:
      "Nos proximos dias vamos te ajudar a aprender Gemini, Grok, ChatGPT, Gamma e Claude para que voce consiga criar tudo isso sozinho, sem depender de prompt pronto.",
    tools: [
      { icon: "frames", name: "Gemini", focus: "Frames para o video" },
      { icon: "video", name: "Grok", focus: "Video falado" },
      { icon: "flyer", name: "ChatGPT", focus: "Flyer" },
      { icon: "slides", name: "Gamma", focus: "Apresentacao" },
      { icon: "site", name: "Claude", focus: "Site completo" },
    ],
    continueLabel: "Concluir Dia 1",
    continueHelper:
      "Conclua para abrir o fluxo normal do fim do Dia 1 e registrar sua avaliacao.",
  },
} as const;

export const SIDNEY_DAY1_JOURNEY_COPY: Record<SidneyJourneyLocale, any> = {
  pt: PT_COPY,
  en: EN_SIDNEY_DAY1_JOURNEY_COPY,
  es: ES_SIDNEY_DAY1_JOURNEY_COPY,
  fr: FR_SIDNEY_DAY1_JOURNEY_COPY,
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
    onboarding: {
      ...PT_COPY.onboarding,
      ...(localizedCopy?.onboarding || {}),
    },
    intro: {
      ...PT_COPY.intro,
      ...(localizedCopy?.intro || {}),
    },
    sections: {
      frames: mergeLocalizedSection(
        PT_COPY.sections.frames,
        localizedCopy?.sections?.frames,
      ),
      video: mergeLocalizedSection(
        PT_COPY.sections.video,
        localizedCopy?.sections?.video,
      ),
      flyer: mergeLocalizedSection(
        PT_COPY.sections.flyer,
        localizedCopy?.sections?.flyer,
      ),
      slides: mergeLocalizedSection(
        PT_COPY.sections.slides,
        localizedCopy?.sections?.slides,
      ),
      site: mergeLocalizedSection(
        PT_COPY.sections.site,
        localizedCopy?.sections?.site,
      ),
    },
    summary: {
      ...PT_COPY.summary,
      ...(localizedCopy?.summary || {}),
    },
  };
};
