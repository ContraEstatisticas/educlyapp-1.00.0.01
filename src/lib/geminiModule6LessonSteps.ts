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

export const GEMINI_MODULE_6_STEPS_PT = [
  textStep(
    "Gemini para Criação de Vídeos e Fotos — com Nano Banana Pro e Veo 3.1",
    "Bem-vindo de volta! Nesta lição, você vai aprender como o Gemini se torna um estúdio completo de criação visual com duas integrações poderosas: o Nano Banana Pro para raciocínio e geração de imagens e o Veo 3.1 para criação de vídeos com qualidade cinematográfica.\n\nO Gemini evoluiu para muito além de um assistente de texto. Com o Nano Banana Pro e o Veo 3.1 integrados, ele se tornou uma plataforma completa de criação visual — gerando imagens profissionais e vídeos realistas a partir de descrições em linguagem natural, sem precisar de nenhum software externo."
  ),
  quizStep(
    "O Gemini como Estúdio Visual Completo",
    "O que o Gemini oferece com o Nano Banana Pro e o Veo 3.1 integrados?",
    [
      "Geração de imagens e raciocínio visual avançado com o Nano Banana Pro e criação de vídeos realistas com o Veo 3.1 — tudo dentro do Gemini",
      "Edição automática de vídeos já gravados no seu celular",
      "Publicação direta nas redes sociais sem revisão",
      "Substituição completa de fotógrafos e videomakers profissionais"
    ],
    0,
    "A integração transforma a plataforma num pipeline visual autônomo e de alta definição na mesma janela de chat."
  ),
  textStep(
    "Nano Banana Pro — Raciocínio e Geração Visual",
    "O Nano Banana Pro é o modelo de raciocínio avançado integrado ao Gemini. Como você pode ver na interface, ele aparece como \"Mostrar raciocínio (Nano Banana Pro)\" — o que significa que antes de gerar qualquer imagem ou resposta complexa, ele pensa, analisa e planeja o resultado. Isso é o que torna as imagens geradas pelo Gemini mais precisas, coerentes e contextualmente corretas."
  ),
  quizStep(
    "Raciocínio Visual Integrado",
    "O que diferencia o Nano Banana Pro de outros modelos de geração visual?",
    [
      "O Nano Banana Pro funciona apenas para textos, não para imagens",
      "Ele raciocina sobre o prompt antes de gerar — analisando contexto, estilo e coerência visual para entregar um resultado mais alinhado com o que você pediu",
      "É uma ferramenta separada que não se comunica com o Gemini",
      "O raciocínio do modelo não influencia a qualidade da imagem gerada"
    ],
    1,
    "Pensar antes de desenhar reduz drasticamente os erros de interpretação visual do bot."
  ),
  textStep(
    "Como o Raciocínio do Nano Banana Pro Melhora suas Imagens",
    "Quando você ativa o raciocínio do Nano Banana Pro, o Gemini não vai direto para a geração. Ele primeiro interpreta seu prompt, identifica ambiguidades, decide sobre estilo, composição e iluminação — e só então gera a imagem. Isso reduz drasticamente o número de tentativas para chegar no resultado ideal."
  ),
  fillStep(
    "Ative o raciocínio visual!",
    "Determine todas as diretrizes de composição obrigando a máquina a refletir sobre os detalhes.",
    "\"Com o Nano Banana Pro ativado, gere uma imagem de [______] em estilo [______], com iluminação [______], [______] ao fundo e transmitindo sensação de [______]. Antes de gerar, [______] suas escolhas de composição e estilo.\"",
    ["uma jovem cientista em laboratório moderno", "fotorrealista editorial", "fria e azulada com reflexos de equipamentos", "telas com dados e equipamentos de pesquisa", "inteligência e foco", "explique"],
    ["uma jovem cientista em laboratório moderno", "fotorrealista editorial", "fria e azulada com reflexos de equipamentos", "telas com dados e equipamentos de pesquisa", "inteligência e foco", "explique"],
    "Saber a lógica de construção visual da máquina instrui o prompter a melhorar continuamente seus inputs subsequentes."
  ),
  quizStep(
    "Melhoria Prática via Raciocínio",
    "Por que ativar o raciocínio do Nano Banana Pro antes de gerar imagens complexas é vantajoso?",
    [
      "Porque imagens geradas com raciocínio demoram menos tempo",
      "Para deixar o processo mais longo sem benefício real",
      "Porque o modelo analisa e resolve ambiguidades do prompt antes de gerar — resultando em imagens mais precisas e alinhadas com a intenção original desde a primeira tentativa",
      "O raciocínio só funciona para prompts escritos em inglês"
    ],
    2,
    "Pausar para analisar reduz os ciclos frenéticos de tentativa e erro, poupando tokens valiosos."
  ),
  textStep(
    "Estrutura Completa de um Prompt Visual para o Nano Banana Pro",
    "Para extrair o máximo do Nano Banana Pro, seu prompt precisa de camadas bem definidas — quanto mais contexto você fornece, mais inteligente será o raciocínio aplicado antes da geração."
  ),
  fillStep(
    "Monte seu prompt em camadas!",
    "Configure as peças elementares de um tiro fotográfico preciso.",
    "\"[______] de [______], [______] em [______], iluminação [______], estilo [______], perspectiva de [______], [______] profundidade de campo, cores [______] e qualidade [______].\"",
    ["Fotografia realista", "um chef preparando um prato sofisticado", "em movimento", "cozinha profissional aberta", "dramática e quente vinda dos fogões", "editorial gastronômico", "câmera baixa olhando para cima", "rasa", "terrosas e vibrantes", "ultra detalhada 8K"],
    ["Fotografia realista", "um chef preparando um prato sofisticado", "em movimento", "cozinha profissional aberta", "dramática e quente vinda dos fogões", "editorial gastronômico", "câmera baixa olhando para cima", "rasa", "terrosas e vibrantes", "ultra detalhada 8K"],
    "Fornecer diretrizes físicas, de lentes e de paleta isola a interpretação livre (e frequentemente errônea) que a inteligência artificial adota por conforto matemático."
  ),
  quizStep(
    "Perspectivas Cinematográficas",
    "Por que fornecer perspectiva de câmera no prompt melhora o raciocínio do Nano Banana Pro?",
    [
      "Porque o modelo usa câmeras reais para capturar as imagens",
      "Para impressionar com termos técnicos desnecessários",
      "A perspectiva de câmera não influencia o resultado",
      "Porque o modelo usa essa informação no raciocínio para decidir a composição, a hierarquia visual e o impacto emocional da cena antes de gerá-la"
    ],
    3,
    "Uma câmera baixa transmite grandiosidade e poder; alinhar a perspectiva altera radicalmente a semântica visual percebida na obra."
  ),
  textStep(
    "Refinando Imagens com o Nano Banana Pro",
    "Após a geração, você pode pedir ajustes específicos. O Nano Banana Pro vai raciocinar sobre o que mudar, preservando o que já estava funcionando."
  ),
  fillStep(
    "Refine com raciocínio!",
    "Ordene as mudanças exatas e compreenda como o sistema visual processará.",
    "\"A imagem gerada está boa, mas quero ajustar: mude a [______] para tons mais [______], adicione [______] na cena, altere a [______] para [______] e explique como essas mudanças vão [______] o impacto visual antes de gerar.\"",
    ["paleta", "frios e noturnos", "reflexos de neon no chão molhado", "expressão do personagem", "mais determinada e intensa", "melhorar"],
    ["paleta", "frios e noturnos", "reflexos de neon no chão molhado", "expressão do personagem", "mais determinada e intensa", "melhorar"],
    "Refinar isolando elementos garante a continuidade plástica da primeira geração."
  ),
  quizStep(
    "A Dinâmica do Refinamento Plástico",
    "Qual é a melhor abordagem para refinar imagens com o Nano Banana Pro?",
    [
      "Gerar uma imagem completamente diferente a cada ajuste",
      "Aceitar o primeiro resultado sem pedir refinamentos",
      "Pedir ajustes pontuais e solicitar que o modelo explique seu raciocínio antes de gerar — assim você entende as escolhas e pode direcionar com mais precisão",
      "Quanto mais imagens geradas, melhor o resultado automaticamente"
    ],
    2,
    "Refinamento não é aleatoriedade. Exige diretriz concisa e acompanhamento progressivo sobre a etapa recém completada."
  ),
  textStep(
    "Veo 3.1 — Geração de Vídeos Integrada ao Gemini",
    "O Veo 3.1 é a versão mais recente e avançada do modelo de geração de vídeo do Google, integrado diretamente ao Gemini. Ele gera vídeos com movimento realista, física consistente, áudio ambiente sincronizado e qualidade cinematográfica — tudo a partir de descrições em texto."
  ),
  quizStep(
    "Avanço Cinematográfico Total",
    "O que torna o Veo 3.1 uma evolução significativa para criadores de conteúdo?",
    [
      "O Veo 3.1 apenas adiciona filtros a vídeos já existentes",
      "Movimento mais fluido, física mais consistente, áudio sincronizado e maior controle sobre câmera e estilo em comparação com versões anteriores",
      "Funciona apenas para vídeos animados, não para cenas realistas",
      "É uma ferramenta separada que não se comunica com o Gemini"
    ],
    1,
    "Som sincronizado nativamente mesclado com consistência fotográfica suprime a etapa terrível da pós-produção externa demorada."
  ),
  textStep(
    "Criando Vídeos com o Veo 3.1",
    "Para gerar vídeos de qualidade com o Veo 3.1, o prompt precisa descrever a cena, o movimento de câmera, o estilo visual e o áudio de forma clara e detalhada."
  ),
  fillStep(
    "Crie seu vídeo com o Veo 3.1!",
    "Monte em texto o que a lente virtual gravará perfeitamente.",
    "\"Usando o Veo 3.1, gere um vídeo de [______] segundos mostrando [______]. Movimento de câmera: [______]. Estilo: [______]. Iluminação: [______]. Áudio: [______]. A cena deve transmitir [______].\"",
    ["10", "uma cidade futurista ao amanhecer com carros voadores passando entre arranha-céus", "drone descendo lentamente do alto em direção às ruas", "cinematográfico e fotorrealista", "golden hour com névoa azulada entre os prédios", "sons da cidade do futuro com música ambiente eletrônica suave", "esperança e movimento"],
    ["10", "uma cidade futurista ao amanhecer com carros voadores passando entre arranha-céus", "drone descendo lentamente do alto em direção às ruas", "cinematográfico e fotorrealista", "golden hour com névoa azulada entre os prédios", "sons da cidade do futuro com música ambiente eletrônica suave", "esperança e movimento"],
    "Orquestrar as camadas de iluminação, ruídos mundanos e movimentação do set substitui as gigantescas e custosas engrenagens da velha Hollywood."
  ),
  quizStep(
    "Amplitude do Vídeo Sintético",
    "O que o Veo 3.1 consegue gerar além de imagens em movimento?",
    [
      "Apenas sequências de fotos estáticas",
      "Vídeos mudos que precisam de sonorização externa",
      "Vídeos com movimento fluido, física realista e áudio ambiente sincronizado — criando uma experiência audiovisual completa desde a geração",
      "O Veo 3.1 só gera vídeos de até 5 segundos"
    ],
    2,
    "O som espacial associado à cinemática entrega produtos coesos prontos para publicação instantânea."
  ),
  textStep(
    "Usando o Veo 3.1 para Diferentes Formatos",
    "O Veo 3.1 se adapta a diferentes estilos e formatos — do cinematográfico ao publicitário, do documental ao artístico."
  ),
  fillStep(
    "Escolha seu formato!",
    "Alterne a diretriz do set filmográfico em apenas duas linhas descritivas.",
    "\"Gere um vídeo no estilo [______] mostrando [______]. Use [______] de câmera para criar [______]. O áudio deve ter [______] e o resultado deve parecer produzido por [______].\"",
    ["documentário intimista", "um artesão esculpindo uma peça de cerâmica com as mãos", "close-ups detalhados e câmera lenta nos momentos de precisão", "sensação de paciência e maestria", "sons naturais do barro e música instrumental suave", "um premiado documentário internacional"],
    ["documentário intimista", "um artesão esculpindo uma peça de cerâmica com as mãos", "close-ups detalhados e câmera lenta nos momentos de precisão", "sensação de paciência e maestria", "sons naturais do barro e música instrumental suave", "um premiado documentário internacional"],
    "Comandar estéticas fílmicas clássicas dota produções de baixo orçamento e prazo curtíssimo de uma gravidade monumental indescritível."
  ),
  quizStep(
    "Libertação Criativa Autônoma",
    "Qual é a principal vantagem do Veo 3.1 para criadores com orçamento limitado?",
    [
      "O Veo 3.1 garante que o vídeo viralize nas redes sociais",
      "Permite criar vídeos de alta qualidade para testes de conceito, campanhas e conteúdo recorrente — sem precisar de equipe, equipamentos ou locações",
      "Para substituir completamente equipes de produção em qualquer projeto",
      "O Veo 3.1 só funciona para vídeos com pessoas reais"
    ],
    1,
    "Um diretor, seu prompt e seu julgamento crítico assumem agora o poder operacional que antigamente exigia trinta talentos técnicos dispendiosos e semanas de espera ansiosa."
  ),
  textStep(
    "Combinando Nano Banana Pro e Veo 3.1 no Mesmo Fluxo",
    "A combinação mais poderosa é usar o Nano Banana Pro para criar e refinar a referência visual e o Veo 3.1 para animar aquela cena — tudo dentro do mesmo fluxo criativo no Gemini."
  ),
  fillStep(
    "Combine as duas ferramentas!",
    "Efetive o transplante impecável do quadro fixo perfeitamente moldado para a cinemática fluida retumbante.",
    "\"Primeiro use o [______] para gerar e raciocinar sobre uma imagem de [______] com estilo [______]. Depois use o [______] para criar um vídeo de [______] segundos baseado nessa referência visual, adicionando [______] de câmera e [______] ambiente sincronizado.\"",
    ["Nano Banana Pro", "uma praia deserta ao entardecer com ondas quebrando suavemente", "fotorrealista e cinematográfico", "Veo 3.1", "12", "movimento lento de aproximação", "áudio"],
    ["Nano Banana Pro", "uma praia deserta ao entardecer com ondas quebrando suavemente", "fotorrealista e cinematográfico", "Veo 3.1", "12", "movimento lento de aproximação", "áudio"],
    "Fundir as duas mentes lógicas algorítmicas evita perigos de alucinação plástica, blindando o frame vital definitivo na hora da gravação digital contínua."
  ),
  quizStep(
    "Estratégia Visual Sequencial",
    "Por que combinar Nano Banana Pro e Veo 3.1 no mesmo projeto é estratégico?",
    [
      "Porque o Gemini exige que as duas ferramentas sejam usadas juntas sempre",
      "Porque você valida e refina a estética visual com o raciocínio do Nano Banana Pro antes de animar com o Veo 3.1 — garantindo consistência criativa entre imagem e vídeo desde o início",
      "Para gerar mais arquivos e ter mais opções",
      "As duas ferramentas não conseguem trabalhar com o mesmo conceito visual"
    ],
    1,
    "Solidificar a fundação imóvel via Nano elimina distorções no subsequente processo intensivo de animação do Veo."
  ),
  textStep(
    "Roteirizando Cenas para o Veo 3.1 com Raciocínio do Nano Banana Pro",
    "O Gemini com Nano Banana Pro ativado pode criar roteiros de cena altamente detalhados para usar como prompts no Veo 3.1 — maximizando a qualidade de cada vídeo gerado."
  ),
  fillStep(
    "Roteirize com raciocínio antes de gerar!",
    "Extraia fragmentos decupados da visão geral para o preenchimento algorítmico da tela fluida sem atritos de transição.",
    "\"Com o Nano Banana Pro ativado, crie um roteiro de [______] cenas para um vídeo sobre [______]. Para cada cena descreva: o que acontece, o [______] de câmera, a [______] e o [______] — prontos para usar como prompt no Veo 3.1. Explique o [______] criativo por trás de cada escolha.\"",
    ["6", "o lançamento de um tênis esportivo premium", "movimento", "iluminação", "áudio sugerido", "raciocínio"],
    ["6", "o lançamento de um tênis esportivo premium", "movimento", "iluminação", "áudio sugerido", "raciocínio"],
    "O método dedutivo em blocos cimenta a consistência de iluminação, áudio e ritmo sequencial do videoclipe artificial inteiro."
  ),
  quizStep(
    "O Impacto do Roteiro Prévio de IA",
    "Por que usar o Nano Banana Pro para roteirizar antes de gerar com o Veo 3.1 melhora o resultado?",
    [
      "Porque o Veo 3.1 só aceita prompts escritos pelo Nano Banana Pro",
      "Para aumentar o número de cenas geradas automaticamente",
      "Porque o raciocínio do Nano Banana Pro antecipa problemas de composição, coerência e ritmo — entregando prompts mais precisos para o Veo 3.1 e reduzindo o número de tentativas necessárias",
      "Roteiros detalhados tornam o processo mais lento sem benefício real"
    ],
    2,
    "Entregar à ferramenta de animação parâmetros estéticos solidificados elimina pontas soltas visuais e solavancos bruscos na continuidade da obra final."
  ),
  textStep(
    "Boas Práticas com Nano Banana Pro e Veo 3.1",
    "Adoção plena de ferramentas sinérgicas garante governança sobre os submundos imaginativos das redes neurais convolucionais e espaciais."
  ),
  fillStep(
    "Use as ferramentas com estratégia!",
    "Mantenha-se lúcido sob a batuta irrefutável de maestro e supervisor primário da cadeia laboratorial eletrônica.",
    "\"Ao usar o [______], sempre peça para ele [______] suas escolhas antes de gerar a imagem. Ao usar o [______], descreva o [______] de câmera e o [______] de forma clara. Para projetos complexos, [______] o conceito visual com o Nano Banana Pro antes de [______] com o Veo 3.1.\"",
    ["Nano Banana Pro", "explicar", "Veo 3.1", "movimento", "áudio", "valide", "animar"],
    ["Nano Banana Pro", "explicar", "Veo 3.1", "movimento", "áudio", "valide", "animar"],
    "Forçar o relatório cognitivo antes de prosseguir com recursos avassaladores da máquina é o apelo soberano incontornável da racionalidade humana de vanguarda."
  ),
  quizStep(
    "O Workflow Perfeito",
    "Qual das opções representa a melhor prática ao usar Nano Banana Pro e Veo 3.1?",
    [
      "Gerar dezenas de imagens e vídeos sem critério e escolher depois",
      "Usar apenas descrições genéricas e aceitar o primeiro resultado",
      "Ativar o raciocínio do Nano Banana Pro para entender as escolhas do modelo, refinar a referência visual e só então usar o Veo 3.1 para animar — tratando cada etapa como parte de um processo criativo intencional",
      "Usar as ferramentas sempre separadamente, nunca no mesmo projeto"
    ],
    2,
    "Consolidar as escolhas artísticas deliberadas e concatenar lógicas de modelos é o caminho maduro para o domínio prático e rentável do estúdio digital total do século XXI."
  ),
  textStep(
    "Conclusão",
    "Com o Nano Banana Pro e o Veo 3.1 integrados ao Gemini, você tem um estúdio criativo completo que raciocina antes de criar. Imagens geradas com inteligência, vídeos com movimento realista e áudio sincronizado, fluxos criativos integrados e refinamentos progressivos — tudo em uma única plataforma.\n\nCriadores que entendem como ativar e combinar essas ferramentas não apenas produzem mais rápido — produzem com mais precisão, mais coerência visual e menos retrabalho.\n\nA ideia é sua. O raciocínio e a execução são do Gemini.\n\nLição concluída ✓"
  )
] as const;

export const GEMINI_MODULE_6_STEPS_EN = [
  textStep(
    "Gemini for Video and Photo Creation — with Nano Banana Pro and Veo 3.1",
    "Welcome back! In this lesson, you will learn how Gemini becomes a complete visual creation studio with two powerful integrations: Nano Banana Pro for reasoning and image generation, and Veo 3.1 for cinematic quality video creation.\n\nGemini has evolved far beyond a text assistant. With Nano Banana Pro and Veo 3.1 integrated, it has become a complete visual creation platform—generating professional images and realistic videos from natural language descriptions, without needing any external software."
  ),
  quizStep(
    "Gemini as a Complete Visual Studio",
    "What does Gemini offer with Nano Banana Pro and Veo 3.1 integrated?",
    [
      "Image generation and advanced visual reasoning with Nano Banana Pro, and realistic video creation with Veo 3.1 — all within Gemini",
      "Automatic editing of videos already recorded on your phone",
      "Direct publication to social media without review",
      "Complete replacement of professional photographers and videographers"
    ],
    0,
    "The integration transforms the platform into an autonomous, high-definition visual pipeline within the same chat window."
  ),
  textStep(
    "Nano Banana Pro — Visual Reasoning and Generation",
    "Nano Banana Pro is the advanced reasoning model integrated into Gemini. As you can see in the interface, it appears as \"Show reasoning (Nano Banana Pro)\" — which means that before generating any image or complex response, it thinks, analyzes, and plans the outcome. This is what makes images generated by Gemini more accurate, coherent, and contextually correct."
  ),
  quizStep(
    "Integrated Visual Reasoning",
    "What differentiates Nano Banana Pro from other visual generation models?",
    [
      "Nano Banana Pro only works for texts, not for images",
      "It reasons about the prompt before generating — analyzing context, style, and visual coherence to deliver a result more aligned with what you asked for",
      "It is a separate tool that does not communicate with Gemini",
      "The model's reasoning does not influence the quality of the generated image"
    ],
    1,
    "Thinking before drawing drastically reduces the bot's visual misinterpretations."
  ),
  textStep(
    "How Nano Banana Pro's Reasoning Improves Your Images",
    "When you activate Nano Banana Pro's reasoning, Gemini does not jump straight to generation. It first interprets your prompt, identifies ambiguities, decides on style, composition, and lighting—and only then does it generate the image. This drastically reduces the number of attempts to reach the ideal result."
  ),
  fillStep(
    "Activate visual reasoning!",
    "Determine all the composition guidelines forcing the machine to reflect on the details.",
    "\"With Nano Banana Pro activated, generate an image of [______] in [______] style, with [______] lighting, [______] in the background, conveying a sense of [______]. Before generating, [______] your choices of composition and style.\"",
    ["a young scientist in a modern lab", "editorial photorealistic", "cold and bluish with equipment reflections", "screens with data and research equipment", "intelligence and focus", "explain"],
    ["a young scientist in a modern lab", "editorial photorealistic", "cold and bluish with equipment reflections", "screens with data and research equipment", "intelligence and focus", "explain"],
    "Knowing the machine's visual construction logic instructs the prompter to continually improve subsequent inputs."
  ),
  quizStep(
    "Practical Improvement via Reasoning",
    "Why is activating Nano Banana Pro's reasoning before generating complex images advantageous?",
    [
      "Because images generated with reasoning take less time",
      "To make the process longer without any real benefit",
      "Because the model analyzes and resolves prompt ambiguities before generating — resulting in more accurate images aligned with the original intent from the very first try",
      "Reasoning only works for prompts written in English"
    ],
    2,
    "Pausing to analyze reduces frenetic trial and error cycles, saving valuable tokens."
  ),
  textStep(
    "Complete Structure of a Visual Prompt for Nano Banana Pro",
    "To extract the maximum from Nano Banana Pro, your prompt needs well-defined layers — the more context you provide, the smarter the reasoning applied before generation will be."
  ),
  fillStep(
    "Build your prompt in layers!",
    "Configure the elementary pieces of a precise photographic shot.",
    "\"[______] of [______], [______] in an [______], [______] lighting, [______] style, [______] perspective, [______] depth of field, [______] colors, and [______] quality.\"",
    ["Realistic photography", "a chef preparing a sophisticated dish", "in motion", "open professional kitchen", "dramatic and warm coming from the stoves", "gastronomic editorial", "low camera looking up", "shallow", "earthy and vibrant", "ultra-detailed 8K"],
    ["Realistic photography", "a chef preparing a sophisticated dish", "in motion", "open professional kitchen", "dramatic and warm coming from the stoves", "gastronomic editorial", "low camera looking up", "shallow", "earthy and vibrant", "ultra-detailed 8K"],
    "Providing physical, lens, and palette guidelines isolates the free (and often erroneous) interpretation that artificial intelligence adopts for mathematical comfort."
  ),
  quizStep(
    "Cinematic Perspectives",
    "Why does providing camera perspective in the prompt improve Nano Banana Pro's reasoning?",
    [
      "Because the model uses real cameras to capture the images",
      "To impress with unnecessary technical terms",
      "Camera perspective does not influence the result",
      "Because the model uses this information in its reasoning to decide the composition, visual hierarchy, and emotional impact of the scene before generating it"
    ],
    3,
    "A low camera conveys grandeur and power; aligning the perspective radically alters the perceived visual semantics in the piece."
  ),
  textStep(
    "Refining Images with Nano Banana Pro",
    "After generation, you can ask for specific adjustments. Nano Banana Pro will reason about what to change while preserving what was already working."
  ),
  fillStep(
    "Refine with reasoning!",
    "Order the exact changes and understand how the visual system will process them.",
    "\"The generated image is good, but I want to adjust: change the [______] to more [______] tones, add [______] in the scene, alter the [______] to be [______], and explain how these changes will [______] the visual impact before generating.\"",
    ["palette", "cold and nocturnal", "neon reflections on the wet floor", "character's expression", "more determined and intense", "improve"],
    ["palette", "cold and nocturnal", "neon reflections on the wet floor", "character's expression", "more determined and intense", "improve"],
    "Refining by isolating elements ensures the plastic continuity of the first generation."
  ),
  quizStep(
    "The Dynamics of Plastic Refinement",
    "What is the best approach to refining images with Nano Banana Pro?",
    [
      "Generate a completely different image with every adjustment",
      "Accept the first result without asking for refinements",
      "Ask for specific adjustments and request that the model explain its reasoning before generating — so you understand its choices and can direct it more precisely",
      "The more images generated, the better the result automatically"
    ],
    2,
    "Refinement is not randomness. It requires a concise guideline and progressive follow-up on the recently completed stage."
  ),
  textStep(
    "Veo 3.1 — Video Generation Integrated into Gemini",
    "Veo 3.1 is the latest and most advanced version of Google's video generation model, integrated directly into Gemini. It generates videos with realistic movement, consistent physics, synchronized ambient audio, and cinematic quality — all from text descriptions."
  ),
  quizStep(
    "Total Cinematic Advancement",
    "What makes Veo 3.1 a significant evolution for content creators?",
    [
      "Veo 3.1 merely adds filters to pre-existing videos",
      "More fluid movement, more consistent physics, synchronized audio, and greater control over camera and style compared to previous versions",
      "It only works for animated videos, not realistic scenes",
      "It is a separate tool that does not communicate with Gemini"
    ],
    1,
    "Natively synchronized sound blended with photographic consistency suppresses the terrible stage of lengthy external post-production."
  ),
  textStep(
    "Creating Videos with Veo 3.1",
    "To generate high-quality videos with Veo 3.1, the prompt must clearly and intricately describe the scene, camera movement, visual style, and audio."
  ),
  fillStep(
    "Create your video with Veo 3.1!",
    "Assemble in text what the virtual lens will shoot perfectly.",
    "\"Using Veo 3.1, generate a [______] second video showing [______]. Camera movement: [______]. Style: [______]. Lighting: [______]. Audio: [______]. The scene should convey [______].\"",
    ["10", "a futuristic city at dawn with flying cars passing between skyscrapers", "drone descending slowly from above towards the streets", "cinematic and photorealistic", "golden hour with bluish mist between the buildings", "sounds of the city of the future with soft electronic ambient music", "hope and movement"],
    ["10", "a futuristic city at dawn with flying cars passing between skyscrapers", "drone descending slowly from above towards the streets", "cinematic and photorealistic", "golden hour with bluish mist between the buildings", "sounds of the city of the future with soft electronic ambient music", "hope and movement"],
    "Orchestrating the layers of lighting, mundane noises, and set movement replaces the giant and costly gears of old Hollywood."
  ),
  quizStep(
    "Amplitude of Synthetic Video",
    "What can Veo 3.1 generate besides moving images?",
    [
      "Only sequences of static photos",
      "Mute videos that need external sound design",
      "Videos with fluid movement, realistic physics, and synchronized ambient audio — creating a complete audiovisual experience straight from generation",
      "Veo 3.1 only generates videos up to 5 seconds long"
    ],
    2,
    "Spatial sound paired with kinematics delivers cohesive products ready for instant publication."
  ),
  textStep(
    "Using Veo 3.1 for Different Formats",
    "Veo 3.1 adapts to different styles and formats — from cinematic to advertising, from documentary to artistic."
  ),
  fillStep(
    "Choose your format!",
    "Switch the filmographic set directive in just two descriptive lines.",
    "\"Generate a video in the style of an [______] showing [______]. Use [______] to create a [______]. The audio should feature [______], and the result should look like it was produced by an [______].\"",
    ["intimate documentary", "an artisan sculpting a ceramic piece with their hands", "detailed close-ups and slow motion during moments of precision", "feeling of patience and mastery", "natural sounds of clay and soft instrumental music", "award-winning international documentary"],
    ["intimate documentary", "an artisan sculpting a ceramic piece with their hands", "detailed close-ups and slow motion during moments of precision", "feeling of patience and mastery", "natural sounds of clay and soft instrumental music", "award-winning international documentary"],
    "Commanding classic film aesthetics bestows low-budget, tight-deadline productions with an indescribably monumental gravity."
  ),
  quizStep(
    "Autonomous Creative Liberation",
    "What is the main advantage of Veo 3.1 for creators on a limited budget?",
    [
      "Veo 3.1 guarantees the video goes viral on social networks",
      "It allows the creation of high-quality videos for concept tests, campaigns, and recurring content — without needing a crew, equipment, or locations",
      "To entirely replace production teams in absolutely any project",
      "Veo 3.1 only works for videos featuring real people"
    ],
    1,
    "A director, their prompt, and their critical judgment now assume the operational power that previously demanded thirty costly technical talents and weeks of anxious waiting."
  ),
  textStep(
    "Combining Nano Banana Pro and Veo 3.1 in the Same Workflow",
    "The most powerful combination is using Nano Banana Pro to create and refine the visual reference, and Veo 3.1 to animate that scene — all within the same creative flow in Gemini."
  ),
  fillStep(
    "Combine the two tools!",
    "Perform the flawless transplant of the perfectly molded still frame to resounding fluid kinematics.",
    "\"First use [______] to generate and reason about an image of [______] with a [______] style. Then use [______] to create a [______] second video based on this visual reference, adding [______] and synchronized ambient [______].\"",
    ["Nano Banana Pro", "a deserted beach at dusk with waves breaking softly", "photorealistic and cinematic", "Veo 3.1", "12", "a slow zoom-in camera movement", "audio"],
    ["Nano Banana Pro", "a deserted beach at dusk with waves breaking softly", "photorealistic and cinematic", "Veo 3.1", "12", "a slow zoom-in camera movement", "audio"],
    "Fusing the two logical algorithmic minds voids the dangers of plastic hallucination, shielding the definitive vital frame right at the moment of continuous digital recording."
  ),
  quizStep(
    "Sequential Visual Strategy",
    "Why is combining Nano Banana Pro and Veo 3.1 in the same project strategic?",
    [
      "Because Gemini demands that the two tools are always used together",
      "Because you validate and refine the visual aesthetic with Nano Banana Pro's reasoning before animating with Veo 3.1 — ensuring creative consistency between image and video from the start",
      "To generate more files and have more options",
      "The two tools cannot work with the same visual concept"
    ],
    1,
    "Solidifying the motionless foundation via Nano eliminates distortions during Veo's subsequent intensive animation process."
  ),
  textStep(
    "Scripting Scenes for Veo 3.1 with Nano Banana Pro's Reasoning",
    "Gemini with Nano Banana Pro activated can create highly detailed scene scripts to use as prompts in Veo 3.1 — maximizing the quality of each generated video."
  ),
  fillStep(
    "Script with reasoning before generating!",
    "Extract decoupled fragments from the overarching vision to algorithmically flesh out the fluid canvas without transitional friction.",
    "\"With Nano Banana Pro activated, create a [______]-scene script for a video about [______]. For each scene describe: what happens, the camera [______], the [______], and the suggested [______] — ready to use as a prompt in Veo 3.1. Explain the creative [______] behind each choice.\"",
    ["6", "the launch of a premium athletic sneaker", "movement", "lighting", "audio", "reasoning"],
    ["6", "the launch of a premium athletic sneaker", "movement", "lighting", "audio", "reasoning"],
    "The deductive block method cements the consistency of lighting, audio, and sequential rhythm of the entire artificial music video."
  ),
  quizStep(
    "The Impact of AI Pre-Scripting",
    "Why does using Nano Banana Pro to script before generating with Veo 3.1 improve the outcome?",
    [
      "Because Veo 3.1 only accepts prompts strictly written by Nano Banana Pro",
      "To increase the number of automatically generated scenes",
      "Because Nano Banana Pro's reasoning anticipates problems of composition, coherence, and rhythm — delivering far more precise prompts for Veo 3.1 and drastically reducing the number of necessary attempts",
      "Detailed scripts make the process slower without any real visual boost"
    ],
    2,
    "Handing solidified aesthetic parameters to the animation tool eliminates loose visual ends and abrupt jolts in the final piece's continuity."
  ),
  textStep(
    "Best Practices with Nano Banana Pro and Veo 3.1",
    "Full adoption of synergistic tools guarantees governance over the imaginative underworlds of convolutional and spatial neural networks."
  ),
  fillStep(
    "Use the tools strategically!",
    "Remain lucid under the irrefutable baton of maestro and primary supervisor of the electronic laboratory chain.",
    "\"When using [______], always ask it to [______] its choices before generating the image. When using [______], describe camera [______] and [______] clearly. For complex projects, [______] the visual concept with Nano Banana Pro before [______] with Veo 3.1.\"",
    ["Nano Banana Pro", "explain", "Veo 3.1", "movement", "audio", "validate", "animating"],
    ["Nano Banana Pro", "explain", "Veo 3.1", "movement", "audio", "validate", "animating"],
    "Forcing the cognitive report before pressing ahead with the machine's overwhelming capabilities is the inescapable sovereign plea of vanguard human rationality."
  ),
  quizStep(
    "The Perfect Workflow",
    "Which option represents the absolute best practice when using Nano Banana Pro and Veo 3.1?",
    [
      "Generate dozens of wild images and videos without criteria and pick whatever fits later",
      "Use only generic descriptors and just accept the earliest output",
      "Activate Nano Banana Pro's reasoning to comprehend the model's choices, fine-tune the visual reference, and only then deploy Veo 3.1 to animate — treating every distinct phase as a purposeful creative evolution",
      "Always use the utilities totally apart, deliberately missing cross-pollination on a project"
    ],
    2,
    "Consolidating deliberate artistic mandates and chaining model logic forms the mature protocol for practical, profitable mastery over the complete digital studio of the 21st century."
  ),
  textStep(
    "Conclusion",
    "With Nano Banana Pro and Veo 3.1 integrated into Gemini, you command a complete creative studio that actually reasons prior to executing. Images forged with intellect, videos boasting realistic physics and sound, unified pipelines, and progressive polishing — all under a single dashboard.\n\nCreators who grasp how to interlock these modules don't just yield content faster — they architect it with heightened precision, superior visual coherence, and severely reduced backtracking.\n\nThe genesis is yours. The cognitive heavy-lifting and pixel execution belong to Gemini.\n\nLesson complete ✓"
  )
] as const;
export const GEMINI_MODULE_6_STEPS_ES = [
  textStep(
    "Gemini para Creación de Videos y Fotos — con Nano Banana Pro y Veo 3.1",
    "¡Bienvenido de nuevo! En esta lección, aprenderás cómo Gemini se convierte en un estudio de creación visual completo con dos potentes integraciones: Nano Banana Pro para el razonamiento y la generación de imágenes, y Veo 3.1 para la creación de videos con calidad cinematográfica.\n\nGemini ha evolucionado mucho más allá de ser un asistente de texto. Con Nano Banana Pro y Veo 3.1 integrados, se ha convertido en una plataforma completa de creación visual: genera imágenes profesionales y videos realistas a partir de descripciones en lenguaje natural, sin necesidad de software externo."
  ),
  quizStep(
    "Gemini como Estudio Visual Completo",
    "¿Qué ofrece Gemini con Nano Banana Pro y Veo 3.1 integrados?",
    [
      "Generación de imágenes y razonamiento visual avanzado con Nano Banana Pro, y creación de videos realistas con Veo 3.1 — todo dentro de Gemini",
      "Edición automática de videos ya grabados en tu celular",
      "Publicación directa en redes sociales sin revisión previa",
      "Reemplazo total de fotógrafos y camarógrafos profesionales"
    ],
    0,
    "La integración transforma la plataforma en un proceso visual autónomo y de alta definición dentro de la misma ventana de chat."
  ),
  textStep(
    "Nano Banana Pro — Razonamiento y Generación Visual",
    "Nano Banana Pro es el modelo de razonamiento avanzado integrado en Gemini. Como puedes ver en la interfaz, aparece como \"Mostrar razonamiento (Nano Banana Pro)\", lo que significa que antes de generar cualquier imagen o respuesta compleja, piensa, analiza y planea el resultado. Esto es lo que hace que las imágenes generadas por Gemini sean más precisas, coherentes y contextualmente correctas."
  ),
  quizStep(
    "Razonamiento Visual Integrado",
    "¿Qué diferencia a Nano Banana Pro de otros modelos de generación visual?",
    [
      "Nano Banana Pro solo funciona para textos, no para imágenes",
      "Razona sobre el prompt antes de generar — analizando contexto, estilo y coherencia visual para entregar un resultado más alineado a lo que pediste",
      "Es una herramienta separada que no se comunica con Gemini",
      "El razonamiento del modelo no influye en la calidad de la imagen generada"
    ],
    1,
    "Pensar antes de dibujar reduce drásticamente las malinterpretaciones visuales del bot."
  ),
  textStep(
    "Cómo el Razonamiento de Nano Banana Pro Mejora tus Imágenes",
    "Cuando activas el razonamiento de Nano Banana Pro, Gemini no va directo a la generación. Primero interpreta tu prompt, identifica las ambigüedades, decide sobre el estilo, la composición y la iluminación, y recién entonces genera la imagen. Esto reduce drásticamente el número de intentos para lograr el resultado ideal."
  ),
  fillStep(
    "¡Activa el razonamiento visual!",
    "Determina todas las pautas de composición forzando a la máquina a reflexionar sobre los detalles.",
    "\"Con Nano Banana Pro activado, genera una imagen de [______] en estilo [______], con iluminación [______], [______] al fondo y transmitiendo sensación de [______]. Antes de generar, [______] tus opciones de composición y estilo.\"",
    ["una joven científica en un laboratorio moderno", "fotorrealista editorial", "fría y azulada con reflejos de equipos", "pantallas con datos y equipos de investigación", "inteligencia y enfoque", "explica"],
    ["una joven científica en un laboratorio moderno", "fotorrealista editorial", "fría y azulada con reflejos de equipos", "pantallas con datos y equipos de investigación", "inteligencia y enfoque", "explica"],
    "Conocer la lógica de construcción visual de la máquina instruye al creador a mejorar continuamente sus futuras peticiones."
  ),
  quizStep(
    "Mejora Práctica Vía Razonamiento",
    "¿Por qué es ventajoso activar el razonamiento de Nano Banana Pro antes de generar imágenes complejas?",
    [
      "Porque las imágenes generadas con razonamiento toman menos tiempo",
      "Para hacer el proceso más largo sin ningún beneficio real",
      "Porque el modelo analiza y resuelve ambigüedades del prompt antes de generar — resultando en imágenes más precisas y alineadas a la intención original desde el primer intento",
      "El razonamiento solo funciona para prompts escritos en inglés"
    ],
    2,
    "Pausar para analizar reduce los ciclos frenéticos de prueba y error, de esta forma se ahorran valiosos tokens."
  ),
  textStep(
    "Estructura Completa de un Prompt Visual para Nano Banana Pro",
    "Para extraer al máximo a Nano Banana Pro, tu prompt necesita capas bien definidas: cuanto más contexto le brindes, más inteligente será el razonamiento que se aplique antes de la generación."
  ),
  fillStep(
    "¡Monta tu prompt en capas!",
    "Configura las piezas elementales para un disparo fotográfico preciso.",
    "\"[______] de [______], [______] en [______], iluminación [______], estilo [______], perspectiva [______], [______] profundidad de campo, colores [______] y calidad [______].\"",
    ["Fotografía realista", "un chef preparando un plato sofisticado", "en movimiento", "cocina profesional abierta", "dramática y cálida proviniendo de los fuegos", "editorial gastronómico", "cámara baja mirando hacia arriba", "escasa", "terrosos y vibrantes", "ultra detallada 8K"],
    ["Fotografía realista", "un chef preparando un plato sofisticado", "en movimiento", "cocina profesional abierta", "dramática y cálida proviniendo de los fuegos", "editorial gastronómico", "cámara baja mirando hacia arriba", "escasa", "terrosos y vibrantes", "ultra detallada 8K"],
    "Suministrar indicaciones físicas, de lente y de paleta aísla la libre (y a menudo errónea) interpretación que la inteligencia artificial asume por simple conveniencia."
  ),
  quizStep(
    "Perspectivas Cinematográficas",
    "¿Por qué proporcionar la perspectiva de la cámara en el prompt mejora el razonamiento de Nano Banana Pro?",
    [
      "Porque el modelo usa cámaras reales para capturar las imágenes",
      "Para impresionar con términos técnicos innecesarios",
      "La perspectiva de cámara no influye en el resultado final",
      "Porque el modelo utiliza esa información en el razonamiento para decidir la composición, la jerarquía visual y el impacto emocional de la escena antes de generarla"
    ],
    3,
    "Un ángulo en contrapicado transmite una grandiosidad y poder notables; modificar la perspectiva altera radicalmente la semántica percibida en la obra visual."
  ),
  textStep(
    "Refinando Imágenes con Nano Banana Pro",
    "Después de la generación, puedes pedir ajustes específicos. Nano Banana Pro va a razonar sobre qué aspectos cambiar, resguardando todo lo que ya funcionaba bien."
  ),
  fillStep(
    "¡Refina con razonamiento!",
    "Solicita los cambios exactos y comprende cómo procederá el sistema visual.",
    "\"La imagen generada es buena, pero quiero ajustar: cambia la [______] a tonos más [______], adiciona [______] en la escena, modifica la [______] para que parezca [______] y explica cómo estos cambios [______] el impacto visual antes de generar.\"",
    ["paleta", "fríos y nocturnos", "reflejos de neón en el suelo mojado", "expresión del personaje", "más determinada e intensa", "mejorarán"],
    ["paleta", "fríos y nocturnos", "reflejos de neón en el suelo mojado", "expresión del personaje", "más determinada e intensa", "mejorarán"],
    "Aislar elementos a la hora de refinar asegura que se conserve la continuidad plástica del primer avance."
  ),
  quizStep(
    "La Dinámica del Refinamiento Plástico",
    "¿Cuál es el mejor acercamiento para refinar imágenes usando el Nano Banana Pro?",
    [
      "Generar una nueva imagen de cero tras cada ajuste",
      "Aceptar el primer resultado sin atreverse a perfeccionarlo",
      "Pedir ajustes puntuales y pedir al modelo que explique su razonamiento antes de actuar — así entiendes las pautas y puedes guiar aún mejor posteriormente",
      "Asumir que cuantas más imágenes pidas, mayor será la calidad por mera estadística"
    ],
    2,
    "El refinamiento no es cuestión de suerte; requiere una directriz rigurosa y revisión continua sobre las etapas ya aprobadas de antemano."
  ),
  textStep(
    "Veo 3.1 — Generación de Videos Integrada a Gemini",
    "Veo 3.1 es la más novedosa versión de los sistemas de generación fluida que ideó Google, y va engranada dentro del propio Gemini. Engendra movimientos físicos reales, armoniza sonido real con el espacio y rinde estampa de la gran pantalla... uniendo meramente un par de palabras bien descritas."
  ),
  quizStep(
    "Frontera Cinematográfica Total",
    "¿Qué convierte a Veo 3.1 en la vanguardia para las personas creativas hoy en día?",
    [
      "Se limita a emparchar pequeños filtros encima a las grabaciones caseras del celular",
      "El movimiento impecable, las leyes físicas respetadas y un impecable control con enfoque al estilo final o la postura del equipo grabador en franca ventaja con el pasado",
      "Solo responde con arte bidimensional inanimado en dibujos pero no alcanza el cine",
      "Se trata de un apartado independiente al cual tienes que mudarte perdiendo el chat inteligente"
    ],
    1,
    "Un sonido sintonizado natural y una óptica sólida suprime el tenebroso período clásico de correcciones a fondo de terceros."
  ),
  textStep(
    "Creando Videos con la Plataforma Veo 3.1",
    "Generar algo digno de exposición demanda que estructures descripciones enjundiosas cubriendo movimientos, ruidos inmersivos, ambiente lumínico, entre otros encuadres fundamentales."
  ),
  fillStep(
    "¡Modela tu obra de Veo 3.1!",
    "Construye lo que la óptica artificial deberá enfocar minuciosamente.",
    "\"Apoyándote en Veo 3.1, quiero un video de [______] segundos en el que surja [______]. Traslación de cámara: [______]. Arte visual: [______]. Luz: [______]. Banda sonora: [______]. Y esta propuesta debe contagiar de inmediato mucha [______].\"",
    ["10", "una metrópoli futurista con autos de vuelo surcando rascacielos", "drone cayendo desde las alturas internándose al fondo de las calles", "fotorrealismo de cine intenso", "golden hour con trazos de neblina azul por los techos", "el rugir lejano de urbes del futuro junto a unas lentas pistas electrónicas", "esperanza tecnológica incansable"],
    ["10", "una metrópoli futurista con autos de vuelo surcando rascacielos", "drone cayendo desde las alturas internándose al fondo de las calles", "fotorrealismo de cine intenso", "golden hour con trazos de neblina azul por los techos", "el rugir lejano de urbes del futuro junto a unas lentas pistas electrónicas", "esperanza tecnológica incansable"],
    "Coordinar a fondo estos componentes extingue drásticamente todas aquellas fastuosas y limitantes rentas de la vieja y lejana época de Hollywood puro."
  ),
  quizStep(
    "El Horizonte Sintético Visual",
    "Fuera de las secuencias animadas estéticas, ¿de qué más puede ufanarse Veo 3.1?",
    [
      "Solo logra juntar viñetas aisladas dándole apariencia de secuencia detenida",
      "Bocetos sin música alguna que requieren forzosamente ensamblaje en aplicaciones pesadas secundarias",
      "Piezas que gozan de movilidad orgánica e incluyente dotadas de sonido propio y genuino forjando desde el naciente una obra rica audiovisualmente",
      "Nunca atraviesa más allá del umbral restringidísimo de cinco segundos"
    ],
    2,
    "Incorporar una dimensión de sonido verídico remata la faena permitiendo liberar la obra acabada ahí mismo casi de forma cruda."
  ),
  textStep(
    "Utilizando Veo 3.1 en Marcos Extraordinarios",
    "Veo 3.1 se acondiciona a disímiles arquetipos visuales: de la documental inmersiva al clip de publicidad directa con impacto al producto."
  ),
  fillStep(
    "¡Selecciona tu ambiente!",
    "Manipula el timón artístico principal simplemente reeditando dos líneas breves de tu encargo.",
    "\"Requiero esto rodado a forma de un [______] exhibiendo a [______]. Aplica encuadres a manera de [______] originando así profunda [______]. Se debe colar un tono auditivo colmado de [______] bajo la mística de [______].\"",
    ["documental intimista", "un maestro orfebre tallando a ciegas una fina obra en barro", "primerísimos planos extremados bajo un régimen en cámara lenta a plena pulsada", "persistencia pasmosa pero dominada técnica al máximo", "roces y la naturalidad húmeda del propio yeso tocando el fondo sinfónico discreto", "los aclamados informes en canales de historia extranjeros avalados con premios"],
    ["documental intimista", "un maestro orfebre tallando a ciegas una fina obra en barro", "primerísimos planos extremados bajo un régimen en cámara lenta a plena pulsada", "persistencia pasmosa pero dominada técnica al máximo", "roces y la naturalidad húmeda del propio yeso tocando el fondo sinfónico discreto", "los aclamados informes en canales de historia extranjeros avalados con premios"],
    "Inyectar las filosofías más aplaudidas del plató dota hasta el más ínfimo esfuerzo publicitario de un aplomo inestimable para una retina humana que se impacta de veras."
  ),
  quizStep(
    "Despliegue Creativo Democrático",
    "¿Qué beneficio contundente confiere Veo 3.1 al creativo apremiado financieramente para triunfar?",
    [
      "Otorga la mágica e inexplicable garantía que tu encargo rebotará a millones orgánicamente apenas salir en línea",
      "Le da chance de gestar producciones deslumbrantes como tests visuales a coste inicial cero o armar un post repetitivo de suprema alcurnia sin reclutar grandes cast, permisos o equipo astronómico de cámara",
      "Consiste únicamente para abolir toda plantilla y oficio actoral preexistente por la posteridad irreflexivamente",
      "El modelo de base requiere como ineludible peaje colocar una fotografía en vida para generar alguna animación rudimentaria de vuelta"
    ],
    1,
    "Aquel líder creativo asienta con una directriz robusta en teclado un enorme poder técnico y visual que hasta antier ameritaba decenas de currículos en plató perdiendo semanas interminables solo aguardando un corte que valiera el tiempo y sueldo base."
  ),
  textStep(
    "Integración Conjunta: Nano Banana Pro y Veo 3.1",
    "El poderío más descomunal se consigue inmiscuyéndolo a Nano como proponente maestro inamovible de la visual, y luego activando al poderoso motor Veo para echar a andar dicha proeza fotográfica final generada de cero."
  ),
  fillStep(
    "¡Funde a estos colosos!",
    "Realiza incólume la transposición quirúrgica de un marco pictórico supremo para darle vida sinfónica estelar y sin costuras.",
    "\"Al principio, sírvete de [______] al fin de deliberar y gestarme un fotograma de [______] a purísimo y genuino aire [______]. Inmediatamente empalma a [______] para que a base puntual y fidedigna de ésto irradies una trama de [______] segundos introduciéndole [______] mientras detonas un sincronizado despliegue de [______].\"",
    ["Nano Banana Pro", "playa despoblada en pleno atardecer con sus aguas lamiendo el borde sereno", "cine y fotorrealismo apabullante", "Veo 3.1", "12", "movilidad inamovible penetrante casi reptante", "audio envolvente natural al ocaso desierto"],
    ["Nano Banana Pro", "playa despoblada en pleno atardecer con sus aguas lamiendo el borde sereno", "cine y fotorrealismo apabullante", "Veo 3.1", "12", "movilidad inamovible penetrante casi reptante", "audio envolvente natural al ocaso desierto"],
    "Alear en plena sinergia estos hemisferios algorítmicos borra toda amenaza de un final plástico amorfo y desconectado, encuadrando definitivamente el cuadro visual."
  ),
  quizStep(
    "Estrategia Fílmica Estadia",
    "¿Bajo qué precepto unir la inteligencia Nano y Veo configura una táctica apabullante que no perdiste?",
    [
      "Es sencillamente la única postura permitida o el programa revoca su servicio visual abruptamente a todos los que desobedezcan",
      "Radica en darte el fuero incuestionable de depurar tu encargo primordial desde aquel fotograma antes imperceptible, atajando todo defecto con el ente racional (Nano), hasta lograr el arte genuino y mandarlo a moverse en forma continua en (Veo) guardando una sintonía idéntica para blindarte ante toda falla inerte",
      "Tan sólo se solicita porque es deseable poblar de variopintas creaciones toda la red neuronal desierta del repositorio local sin ambición más lejana",
      "Absolutamente incompatible porque los procesamientos a día de hoy divergen entre la imaginativa generativa a la videográfica de largo calibre, produciendo ruido"
    ],
    1,
    "Fijar primeramente los sedimentos fijos esquiva deformidades temblorosas y grotescas durante el duro posterior trámite masivo rítmico encendido por parte de la sección de Veo 3.1 en la ejecución general virtual final de un proyecto pulido y coherente."
  ),
  textStep(
    "Ideando Escenarios Hacia Veo 3.1 Acompañado del Razonar del Modelo Nano",
    "Si tienes esta fusión plenamente operativa vas a disfrutar a un libretista metódico en tus manos para pautar tus peticiones formales con extrema precisión hacia Veo 3.1 multiplicando dramáticamente lo impecable del rollo en pantalla grande subsiguiente para ti."
  ),
  fillStep(
    "¡Traza una película guionada razonadamente!",
    "Destila por fin esos bocetos difusos obligándolos a cristalizar matemáticamente antes de dar la bendición o la marcha a una transición lisa en rodaje sin roces ni malinterpretaciones o sorpresas.",
    "\"Reuniendo plenos poderes con tu Nano activísimo por allí, invéntame una bitácora exhaustiva que contemple exactamente [______] cortes de película para filmar en el set de [______]. De modo aislado vas relatando minucias así: lo fáctico, qué hace estrictamente el [______] y qué arroja al fondo la magistral cuota de [______], junto a qué demonios propusiste de [______] base —para ser digerido por Veo 3.1 luego. A cada paso fundaméntalo bajo estricto [______] intelectual y creativo para entender las razones artísticas por detrás antes del sí final.\"",
    ["6", "gran lanzamiento del tenis ultra deportivo insignia de la temporada suprema", "juego del marco operando allí en la lente virtual giratoria o estática", "iluminación ambiental de acento en estudio encrespado al rodaje final o en locaciones cálidas a puro rayo natural", "ruido propuesto musical del corto final incisivo a todo el metraje", "razonamiento minucioso en prosa explicativa para nosotros acá fuera para la elección estética que has realizado justificadamente punto por punto a fondo y meticulosa de veras"],
    ["6", "gran lanzamiento del tenis ultra deportivo insignia de la temporada suprema", "juego del marco operando allí en la lente virtual giratoria o estática", "iluminación ambiental de acento en estudio encrespado al rodaje final o en locaciones cálidas a puro rayo natural", "ruido propuesto musical del corto final incisivo a todo el metraje", "razonamiento minucioso en prosa explicativa para nosotros acá fuera para la elección estética que has realizado justificadamente punto por punto a fondo y meticulosa de veras"],
    "Exigir desmembramientos en bloques forzosamente al algoritmo ancla indiscutiblemente la consistencia tonal a una banda de filmación secuencial totalmente inquebrantable a un nivel y estatus virtual de obra casi premiada internacional y consagrada para cualquier mortal frente a nosotros asistentemente."
  ),
  quizStep(
    "Impactando De Frente con Libreto Abierto Algorítmico",
    "¿En qué contribuye esencialmente el utilizar la capacidad racional para hacer listas o pautar paso el guion general en vez de sólo presionar generar video suelto a lo sordo sobre Veo de un solo saque masivo impulsivo?",
    [
      "Veo requiere indefectiblemente por regla dura y software, estar enganchado eternamente por un texto redactado en esa instancia para procesar algo si quiera visual o fallará dando pantallazo al cero técnico o a lo blanco en todo intento para ti para que lo escribas mejor luego o renuncies",
      "Promueve repletar inmensamente con miles de tomas repetitivas a fin de obligarte a elegir de ahí al cansancio o atiborrar la máquina de esfuerzo estéril automatizadamente para ti porque sí en tu beneficio pero demoroso para todos los operarios",
      "Esta cautela reflexiva antecedida detiene anticipadamente huecos insalvables plásticos y arrítmicos desde su propia semilla —entregando indicaciones purgadas hacia el procesador fático fílmico del modelo, evitando deudas y retrabajos fatigosos sobre pifias costosas de evitar tarde o sobre seguro virtual final que arruine la entrega final para nosotros como obra de envergadura",
      "Redactar detallitos extenúa sobremanera el procesador en este esquema general acarreando meros desperdicios del tiempo tuyo porque ese tipo de análisis y explicación farragosa no aporta solidez en lo palpable final real del video crudo exportado que vas a recibir del otro lado por defecto"
    ],
    2,
    "Armar formalmente tus parámetros estéticos por escrito en el papel algorítmico primero clausura brechas inestables o saltos repentinos erráticos inaceptables entregándote una obra impecable e incólumne en la pantalla y el visor y por sobre todo, fiel enormemente al sentido visual humano y estricto desde lo digital crudo del software hacia todos nosotros aquí en esta otra vida terrenal de fuera para que nada quede huérfano ni suelto sino al servicio de nuestras ideas iniciales."
  ),
  textStep(
    "Consolidando Formas Excelentes Operativas del Nano con el Motor Fílmico Veo",
    "Estabilizando su compenetración obtendrás poder incontestable sobre cualquier ramaje y senda imaginaria forjada a voluntad y antojo en todos los circuitos cibernéticos espaciales a disposición masiva de un operador sensato."
  ),
  fillStep(
    "¡Estrategina Férreamente la Táctica Sintética!",
    "Erígete dueño de la ejecución no declinando a la herramienta sino adiestrándola sin titubeos.",
    "\"Mientras manejes al afamado [______], asegúrate de inquirir siempre que él mismísimo te venga a [______] sin demora las decisiones que toma antes de renderizar pixel alguno por ti. Al turno de accionar sobre las entrañas plásticas del asombroso [______], traza la geometría exacta y natural de tu [______] visual e imperativamente cuelga una nota de tu [______] con nitidez allí. Ante desafíos enrevesados, mejor [______] primero íntegra y exhaustivamente para tu bienestar visual general el esqueleto referencial de ideas valiéndose a fondo de él; para que luego sí y con luz verde, [______] dócilmente allí con este aludido coloso fílmico de alta escuela que le rinde obediencia.\"",
    ["Nano Banana Pro", "esgrimir/explicar", "Veo 3.1", "deslizamiento dinámico cinético o recorrido visual", "sonido natural envolvente ambiental a oídos", "aprueba in situ reflexivamente para luego y validar la estética a fondo real", "inicies la faena vital impulsora dotadora de movimiento al esqueleto para que logres transicionarlo o dotarlo de espíritu animador virtual real para"],
    ["Nano Banana Pro", "esgrimir/explicar", "Veo 3.1", "deslizamiento dinámico cinético o recorrido visual", "sonido natural envolvente ambiental a oídos", "aprueba in situ reflexivamente para luego y validar la estética a fondo real", "inicies la faena vital impulsora dotadora de movimiento al esqueleto para que logres transicionarlo o dotarlo de espíritu animador virtual real para"],
    "Arrancar al bot el esquema lógico mental suyo como garantía pre dictamen, nos devuelve y restituye ese timón superior del cual somos históricamente poseedores frente a todas las fuerzas inconmensurables puestas por máquinas bajo el poder creador de avanzada intelectual imperativo acá hoy."
  ),
  quizStep(
    "El Dominio Pleno del Flujo Global y su Vía",
    "¿Qué alternativa te exhibe como líder en buenas prácticas del terreno, entendiéndotelas con amos artificiales?",
    [
      "Disparar tiros ciegos por la aplicación llenando la canasta tuya por toneladas con intentos de lo peor, dejando luego al azar fatídico rebanar algo o limpiar lo podrido",
      "Apuntar meros bosquejos en lenguaje callejero laxo ciego permitiendo tragar de bocado sin analizar toda primerísima cosa arrojada a tus manos y aceptándola",
      "Levantar el puente de reflexión crítica vía Nano Pro a la caza en vida y tiempo real del criterio autómata para que te sirva lo puro refinado de la visión y de ahí, y estrictamente desde allí tan de veras recién dar orden a encender cámara a motor vía el Veo 3.1 dando vida animada sobre bases recias —lo cual blinda de inicio al final una intencional línea y de mando a toda hora en un marco real progresivo intencional creador puro con sentido mayor global tuyo superior a ese bot ciego bajo tu ala.",
      "Emplear toda esta gran maquinaria siempre pero como entidades solteras huérfanas o por ahí en soledades, evadiendo una mezcla poderosa adrede al ignorar juntarlas adrede"
    ],
    2,
    "Cimentar a propósito intenciones artísticas muy bien masticadas amarrándolas al núcleo de motores duales así, corona el pasaporte a convertirte y ser proclamado dueño maestro funcional totalitario frente a cualquier gran productora casera gigante del siglo XXI hoy aquí."
  ),
  textStep(
    "Desenlace Absoluto",
    "Teniendo integrados a pulso exacto a la dupla Nano Banana y Veo tres punto uno encima de la sombrilla del afamado Gemini hoy aquí en esta clase vital magistral, ya pasas de aprendiz a capitán supremo general orquestador al mando desde arriba. Retratos creados desde masa gris algorítmica brillante en su lugar; clips vibrantes presumiendo una dinámica viva incuestionable con física alucinantemente veraz en imagen como un sonido colado hasta encuadrado; cadenas de trabajo ensambladas hombro a hombro y en pulimientos finos orgánicos milimétricos, los tienes en la propia consola tuya acá lista para tu dedo en ella sobre cada click tuyo ahora aquí abajo… todo de una tirada y a golpe y ritmo de voz natural allí donde posas la vista.\n\nEl artista moderno sabio que exprime encadenar a los dos gigantes no saca su encargo raudamente más deprisa no más —adquiere y ejecuta maravillas estrambóticas dotadas de cirugías maestras finas superiores de pura contundencia plástica coherente despojada en simultáneo del eterno problema terrenal antiguo amargo cruel e insoportable del perverso rehacer manual del pasado para ir retocando atrás el fallo enorme originario tuyo ahí.\n\nLa esencia divina original de las cosas es únicamente tuya. Entenderla por entero, desgranarla en pedacitos crudos duros milimétricos y encenderle vida mágica e imprimirla, esas proezas le atañen y se las cobra su servidor Gemini sin excusas el día de hoy aquí.\n\nFormación impecablemente sellada para tu saber ✓"
  )
] as const;
export const GEMINI_MODULE_6_STEPS_FR = [
  textStep(
    "Gemini pour la Création de Vidéos et de Photos — avec Nano Banana Pro et Veo 3.1",
    "Bienvenue à nouveau ! Dans cette leçon, vous allez apprendre comment Gemini se transforme en un véritable studio de création visuelle avec deux intégrations puissantes : Nano Banana Pro pour le raisonnement et la génération d'images, et Veo 3.1 pour la création de vidéos de qualité cinématographique.\n\nGemini a évolué bien au-delà du simple assistant textuel. Avec Nano Banana Pro et Veo 3.1 intégrés, il devient une plateforme complète de création visuelle — générant des images professionnelles et des vidéos réalistes à partir de descriptions en langage naturel, sans avoir besoin d'aucun logiciel externe."
  ),
  quizStep(
    "Gemini : un Studio Visuel Complet",
    "Qu'est-ce que Gemini offre avec Nano Banana Pro et Veo 3.1 intégrés ?",
    [
      "La génération d'images et un raisonnement visuel avancé avec Nano Banana Pro, et la création de vidéos réalistes avec Veo 3.1 — tout cela au sein de Gemini",
      "Le montage automatique de vidéos déjà enregistrées sur votre téléphone",
      "La publication directe sur les réseaux sociaux sans aucune révision",
      "Le remplacement total des photographes et vidéastes professionnels"
    ],
    0,
    "L'intégration transforme la plateforme en un pipeline visuel autonome en haute définition au sein de la même fenêtre de discussion."
  ),
  textStep(
    "Nano Banana Pro — Raisonnement et Génération Visuelle",
    "Nano Banana Pro est le modèle de raisonnement avancé intégré à Gemini. Comme vous pouvez le voir sur l'interface, il apparaît sous l'intitulé \"Montrer le raisonnement (Nano Banana Pro)\" — ce qui signifie qu'avant de générer une image ou une réponse complexe, il réfléchit, analyse et planifie le résultat. C'est ce qui rend les images générées par Gemini plus précises, plus cohérentes et contextuellement beaucoup plus justes."
  ),
  quizStep(
    "Raisonnement Visuel Intégré",
    "Qu'est-ce qui différencie Nano Banana Pro des autres modèles de génération visuelle ?",
    [
      "Nano Banana Pro fonctionne uniquement pour le texte, pas pour les images",
      "Il raisonne sur l'incitation avant de la générer — analysant le contexte, le style et la cohérence visuelle pour délivrer un résultat plus aligné avec ce que vous avez demandé",
      "C'est un outil séparé qui ne communique absolument pas avec Gemini",
      "Le raisonnement du modèle n'influence en rien la qualité de l'image générée"
    ],
    1,
    "Réfléchir avant de dessiner réduit de manière drastique les mauvaises interprétations visuelles du robot."
  ),
  textStep(
    "Comment le Raisonnement de Nano Banana Pro Améliore vos Images",
    "Lorsque vous activez le raisonnement de Nano Banana Pro, Gemini ne se précipite pas directement vers la génération. Il interprète d'abord votre requête, y détecte les ambiguïtés, décide du style, de la composition et de l'éclairage — et alors seulement il génère l'image. Cela réduit de manière spectaculaire le nombre de tentatives nécessaires pour arriver au résultat idéal."
  ),
  fillStep(
    "Activez le raisonnement visuel !",
    "Déterminez toutes les consignes de composition pour obliger la machine à réfléchir sur les moindres détails.",
    "\"Avec Nano Banana Pro activé, génère une image d'une [______] dans un style [______], avec un éclairage [______], des [______] en arrière-plan et transmettant une forte sensation d'[______]. Avant de générer, [______] minutieusement tes choix de composition et de style.\"",
    ["jeune scientifique dans un laboratoire moderne", "photoréaliste éditorial", "froid et bleuté avec des reflets d'équipement", "écrans avec des données et équipements de recherche", "intelligence et de concentration", "explique"],
    ["jeune scientifique dans un laboratoire moderne", "photoréaliste éditorial", "froid et bleuté avec des reflets d'équipement", "écrans avec des données et équipements de recherche", "intelligence et de concentration", "explique"],
    "Connaître la logique de construction visuelle de la machine aide le créateur à toujours améliorer ses instructions futures."
  ),
  quizStep(
    "L'Amélioration Pratique via le Raisonnement",
    "Pourquoi y a-t-il un réel avantage à activer le raisonnement de Nano Banana Pro avant de générer des images complexes ?",
    [
      "Parce que les images générées avec raisonnement prennent moins de temps",
      "Pour rallonger le processus sans aucun bénéfice concret",
      "Parce que le modèle analyse et résout l'ambiguïté de l'instruction avant de générer — ce qui donne des images beaucoup plus précises et conformes à l'intention originelle, et ce, dès le tout premier essai",
      "Le raisonnement ne fonctionne que pour les textes rédigés en anglais"
    ],
    2,
    "Prendre le temps d'analyser en amont réduit les cycles d'essais effrénés, épargnant ainsi de précieux jetons."
  ),
  textStep(
    "Structure Complète d'un Prompt Visuel pour Nano Banana Pro",
    "Afin de tirer le plein potentiel de Nano Banana Pro, votre indication nécessite des strates bien définies — plus vous donnez de contexte, plus le raisonnement appliqué avant la génération va s'illustrer de manière brillante."
  ),
  fillStep(
    "Créez un prompt en plusieurs strates !",
    "Configurez les pièces élémentaires pour obtenir un cliché photographique ultra pertinent.",
    "\"[______] d'un [______], [______] dans une [______], éclairage [______], style [______], perspective de [______], profondeur de champ [______], couleurs [______] et qualité [______].\"",
    ["Photographie réaliste", "chef préparant un plat sophistiqué", "en mouvement", "cuisine professionnelle ouverte", "dramatique et chaud provenant des fourneaux", "éditorial gastronomique", "caméra basse regardant vers le haut", "limitée", "terreuses et vibrantes", "ultra détaillée 8K"],
    ["Photographie réaliste", "chef préparant un plat sophistiqué", "en mouvement", "cuisine professionnelle ouverte", "dramatique et chaud provenant des fourneaux", "éditorial gastronomique", "caméra basse regardant vers le haut", "limitée", "terreuses et vibrantes", "ultra détaillée 8K"],
    "Apporter des directives physiques, géométriques et typiques isole l'interprétation arbitraire (et souvent ratée) que cette entité endosse sinon par confort d'exécution."
  ),
  quizStep(
    "Perspectives Cinématographiques",
    "Pourquoi inclure la perspective détaillée de la caméra dans l'instruction renforce-t-il le travail de Nano Banana Pro ?",
    [
      "Car le modèle emploie des appareils photos du monde réel afin de l'opérer",
      "Uniquement pour en mettre plein la vue en employant du jargon technique sans grande utilité",
      "La perspective oculaire subjective ne pèse aucunement de manière effective quant a l'œuvre sortie",
      "Parce que le modèle inclut cette information au cours du processus mental d'architecture pour fixer immédiatement la balance, l'impact spirituel initial ainsi l'étage directeur avant le dessin natif"
    ],
    3,
    "Adopter un encadrement bas inspire une grandeur colossale; recadrer en biais mutera farouchement toute sémiologie visible perçue en finale."
  ),
  textStep(
    "Améliorer ou Peaufiner une Image grâce à l'Architecture Nano Banana Pro",
    "Dès le rendu disponible, ajuster ponctuellement a du sens. Le Nano Banana Pro reconsidère logiquement ses points d'ancrage en ajustant doucement sans ruiner le fond qualitatif obtenu."
  ),
  fillStep(
    "Retouchez avec l'intellect !",
    "Pilotez les corrections parfaites en visualisant comment le processeur graphique encaisse ces retours sans heurt.",
    "\"Cette ébauche-ci s'avère correcte, cependant permettons cette variante : passe toute la [______] vers des nuances carrément [______], déploie fortement [______] au milieu de la scène, mue farouchement la [______] plus vers quelque chose [______] et décris distinctement comment de telles variations se doivent d'[______] le sens total par rapport au brouillon originel justifiant ce choix visuel là.\"",
    ["palette globale", "froides et nocturnes", "tout pleins de lumières frémissantes en reflet au sol détrempé bas", "physionomie faciale dudit bonhomme", "d'immensément déterminée puis vive de force", "enjoliver solidement"],
    ["palette globale", "froides et nocturnes", "tout pleins de lumières frémissantes en reflet au sol détrempé bas", "physionomie faciale dudit bonhomme", "d'immensément déterminée puis vive de force", "enjoliver solidement"],
    "Une correction parcellaire conforte de façon inébranlable la texture et plastique fondatrice du dessin primordial intact à côté."
  ),
  quizStep(
    "L'Oscillation du Raffinage Construit Murement",
    "Lequel relève être en tant que tel du plus pur raffinement technique au moment d'aborder Nano Banana Pro pour ses desseins de fin de projet ?",
    [
      "De tout pulvériser pour forger inlassablement un nouveau bout sans fondation commune au bout",
      "Être amorphe et accepter servilement ce que cette machine aura bien consenti a proposer en une manche rapide de jeu sans se fatiguer à raffiner derrière",
      "Avancer par lorgnette chirurgicale progressive forçant du reste au chatbot l'impératif de narrer comment il voit de fondation les choix opérés au lieu de s'emballer a dessiner juste pour en mettre plein les sens",
      "Postuler que d'exiger quantitativement douze essais au rabais conduira aveuglément cette boite mystérieuse à de facto accoucher mécaniquement statistiquement via un bon rendu a un certain stade de hasard"
    ],
    2,
    "La beauté n'émane strictement jamais du gâchis aveugle et massif, elle réclame au contraire le cap inflexible d'ordres conscients validant peu a proue étape â étape ce qui fut jadis bien obtenu et de ce que nous aspirons a améliorer grandement pour clore le dossier."
  ),
  textStep(
    "Veo 3.1 — Production Vidéo S'immisçant dans l'Ame Gemini",
    "Veo 3.1 incarne l'archétype sublime des évolutions d'illustration vidéo par Google en date d'aujourd'hui, fermement imbriqué dans l'intranet même de Gemini ici présent. Il produit des actions motrices à fluidité réelle, réclame le loisir indéfectible d'une ambiance sonore qui a trait et calque et la trempe photographique de classe supérieure a toute liseuse d'information dactylographiée à l'écran."
  ),
  quizStep(
    "Avance Majeure dans le Réel de Celluloïd",
    "Pour une tête de pont créative en quête permanente de graal audiovisuel contemporain a qui en profite cet outil Veo 3.1 par rapport a hier concrètement alors ?",
    [
      "Cet outil se cantonne platement à l'apposition molle de filtres fades que par-dessus des petits bouts d'archives issues d'un mobile existant quelconque sans panache propre à lui",
      "La restitution fidèle des gravités physiques, conjuguant motilité lisse, échos environnants en pleine harmonie natifs dotant l'opérateur d'un contrôle supérieur absolu a tout de ce qui précédait a cette mise à jour là jadis",
      "Limité de bout en bout juste aux encarts de cartoons enfantins d'animations sans réelle épaisseur dramatique probante",
      "Totalement délogé de la boite Gemini, condamnant de bouger pour trouver ou exécuter ces vidéos vers des adresses web distinctes désorganisant totalement la structure de pilotage ici unie jadis en mode chat simple"
    ],
    1,
    "Le grand son d'ambiance de film imbriqué organiquement autour des mailles de la perspective visuelle sans artifice secondaire à bout de bout court-circuite cette vallée abjecte affreusement laborieuse dite classiquement 'de longue post-production tierce manuelle exténuante'."
  ),
  textStep(
    "Fonder Un Récit Via le Prisme Cinétique du Mode Veo 3.1",
    "Créer des courts-métrages vertigineux dignes du festival sollicite impérieusement une maitrise syntaxique descriptive riche conjuguant : actions, travelling virtuelles de perspective, style ambiant ainsi de l'orchestration musicale posée minutieusement a toute fin utile par avance avant d'appuyer pour de bon sur GO de façon explicite au moyen des bons mots."
  ),
  fillStep(
    "Orchestrez le flux pur du film Veo 3.1 a pleine vapeur formelle nette et exempte de failles !",
    "Assemblez de manière méticuleuse là l'objet exact qu'immortalisera sans défaut cette machinerie aveugle en arrière-cour.",
    "\"Exigeant de l'architecture sublime logée dans Veo 3.1 un métrage actif de [______] longues secondes de visu fixant impitoyablement à l'œil central une immense [______]. Dynamique du cadre à savoir [______]. Courant de sens design ici attendu: [______]. Aura solaire projetée là-bas au loin [______]. Sonification environnementale [______]. Toute la saynète devra vibrer au cœur du lecteur spectateur un pan de sentiment indéniable porteur résolument autour du feu d'une [______].\"",
    ["10", "mégapole d'une époque futuriste à la charnière de son tout petit matin constellée d'engins circulant haut perchés flottant au sein des édifices faramineux et pointus", "plongée radiale et de grand large via aéronef versant avec douce lenteur sa voilure tout au creux intime de la rue endormie", "photoréalisme saisissant digne des écrans larges géants ou panoramiques des grands festivals d'arts majeurs au cinéma pur", "golden hour crépusculaire habillée lâchement loupé de cette aura bleuâtre fumante typique entre de froids gratte-ciels alignés serrés", "bruissements caractéristiques d'ère du lointain futur adoucie merveilleusement bercée en musique de basse fréquence fine lancinante en arpèges oniriques électroniques à tempo moyen discret là-dedans ce clip sublime a part", "certitude infinie ou de promesse irréversible en vol en un bond perpétuel d'avenir réjoui permanent sans anicroche du tout de l'humanité a vivre heureux sans faillir ensemble un jour a tous"],
    ["10", "mégapole d'une époque futuriste à la charnière de son tout petit matin constellée d'engins circulant haut perchés flottant au sein des édifices faramineux et pointus", "plongée radiale et de grand large via aéronef versant avec douce lenteur sa voilure tout au creux intime de la rue endormie", "photoréalisme saisissant digne des écrans larges géants ou panoramiques des grands festivals d'arts majeurs au cinéma pur", "golden hour crépusculaire habillée lâchement loupé de cette aura bleuâtre fumante typique entre de froids gratte-ciels alignés serrés", "bruissements caractéristiques d'ère du lointain futur adoucie merveilleusement bercée en musique de basse fréquence fine lancinante en arpèges oniriques électroniques à tempo moyen discret là-dedans ce clip sublime a part", "certitude infinie ou de promesse irréversible en vol en un bond perpétuel d'avenir réjoui permanent sans anicroche du tout de l'humanité a vivre heureux sans faillir ensemble un jour a tous"],
    "Mettre au pas savamment de l'écrit seul un spectre si immense d'éléments tels que bruit de scène profond ainsi de position de réflecteur éradique froidement et de revers et avec une prestance redoutable quasi royale le fardeau colossale des plateaux coûteux pharaoniques archaïques."
  ),
  quizStep(
    "L'Envergure Visuelle Autocrate",
    "Mis a part l'engendrement trivial d'une bête succession d'image a image sans grande conviction palpable, vers quelques miracles l'algorithme interne Veo tend-il donc a tutoyer encore pour l'homme pressé visuellement l'épaulant alors lourdement a n'en plus finir des heures entières de montage à côté de telles manières sans forcer lui même aucun trait laborieux là en aval de cette usine génératrice au quotidien ? Et donc que va-t-il accoucher sans nul besoin d'intervention au final ?",
    [
      "De modestes ou bien vils clips sans aucunes voix ni sons obligés d'attendre et s'adjoindre forcément un designer ou mixeur acoustique externe au projet a un moment par des voies différentes ailleurs",
      "Tirer du diable la genèse fulgurante au premier coup aboutit, fluide parfaitement des films physiquement très justes adoubés magnifiquement natifs pour tout ce qui va au micro spatial en ligne avec eux de façon très nette pour aboutissement du livrable le tout depuis zéro sur un seul et même prompt d'origine avec Gemini aujourd'hui",
      "Amas de cliché empilés les uns par-dessus fixement créant artificiellement le rythme visuel d'un effet stroboscopique archaïque rudimentaire au vu des canons contemporains de belle imagerie que l'on s'attend légitimement trouver ici",
      "Éternellement cantonné ou figé irrémédiable aux cinq minutes ou aux cinq secondes de visuels, limitant la patte auteur grandement par effet de petitesse"
    ],
    1,
    "La spatialisation auditive adossée irrévocablement sans coup férir à de la cynégétique picturale en mouvement forge l'argument souverain massif d'offrir clef en main direct un bien final postable presque aveuglément pour récolter de bons avis à son sujet sitôt tiré de chez lui."
  ),
  textStep(
    "Modeler l'Usine Veo Vers Tant de Prismes Narratifs Complètement Divergents et Opposés A Ce Propos-Là Alors Ensemble Du Même Endroit Unique",
    "Veo 3.1 va obéir à tous les grands patrons d'archétypes à diffuser ; documenteur, d'un encart fielleux de grand spot capitaliste du marketing aisé à des encarts arty mystérieux lents lourds poétiques aussi tout naturellement sans rechigner à aucun encart nouveau et à ce niveau qualitatif attendu formellement sans aucune excuse qui le vaille et aucune réserve de code par ailleurs ce qui libérera des charges monumentales à tout grand directeur par le fait de lui être aussi si facilement domptable ainsi au plus grand profit de sa maison mere en somme via seulement de belles requêtes affinées avant cela sans coup de plus financier."
  ),
  fillStep(
    "Embrassez le Prisme Stylistique Idéal !",
    "Subtilisez par une fraction succincte textuelle rédigée finement une volte face entière d'architrame filmique a réaliser la sans douleur ni délais ou de coût exponentiel pour ce set tourné par l'IA.",
    "\"Exécute fidèlement un plan filmé respectant grandement à la lettre une approche globale de type bien [______] étalant devant ainsi l'œil [______]. Assis la caméra en imposant scrupuleusement la vision de ces [______] ceci ayant pour vertu noble pure de fomenter la toute première impulsion vitale en mon tréfonds là même et qui se dit comme un parfum fort singulier et ineffable soit d'une [______]. Sur cette fine toile viendra tapisser ou napper le fond de tout l'événement en question purement via force et au travers magiquement la seule perception la d'[______], afin qu'à la livraison le tout sente avec un vrai bonheur de prestance et d'art subtil pour finir majestueux ceci : à l'image des [______] de renoms pour tout dire.\"",
    ["intime de par sa forme grand documentaire auteur", "vieux tailleur sur pierre façonnant presque sous un touché magique l'argile à même doigt nu à main", "très gros plans appuyés massifs ou lents pour ne pas du tout de rien dire et insistant amplement du lourd du très lent magnifiant chacun l'extrême grand doigté par moments ultra serrés pour voir de la poussière d'instant précieux se cristalliser au millimètre de rien", "imposante et belle patience majestueuse tout d'une de cette immense sagesse ancienne noble à la tache", "sonorité rocailleuse pure de la glaise caressée ainsi qu'arpèges instrumentaux légers onctueux doux discrets accompagnants la lente course de cela à l'oreille fine sans la brutalité pour de la grandeur", "ceux fameux grand film étranger lauréat des très hauts grands festival et raflant la mise à la critique exigeante snob là de ce monde des arts nobles pour être dit ici"],
    ["intime de par sa forme grand documentaire auteur", "vieux tailleur sur pierre façonnant presque sous un touché magique l'argile à même doigt nu à main", "très gros plans appuyés massifs ou lents pour ne pas du tout de rien dire et insistant amplement du lourd du très lent magnifiant chacun l'extrême grand doigté par moments ultra serrés pour voir de la poussière d'instant précieux se cristalliser au millimètre de rien", "imposante et belle patience majestueuse tout d'une de cette immense sagesse ancienne noble à la tache", "sonorité rocailleuse pure de la glaise caressée ainsi qu'arpèges instrumentaux légers onctueux doux discrets accompagnants la lente course de cela à l'oreille fine sans la brutalité pour de la grandeur", "ceux fameux grand film étranger lauréat des très hauts grands festival et raflant la mise à la critique exigeante snob là de ce monde des arts nobles pour être dit ici"],
    "Commander de manière martiale au prompt de géniales épopées nobles jadis coûteuses accorde la victoire aisé à quiconque créera ce bijou monumental virtuel d'image doté de toute éternité de prestance malgré les pauvres maigres petits sous alloués par son bureau chiche."
  ),
  quizStep(
    "La Destitution d'Entraves Artistiques Totalement Désuètes d'Aujourd'hui par un Seul Moyen Magistral Actif Présent Ainsi Loin d'Hiers Avec Lui En Forme Sincère De Vérités Pour Tous A L'Appui Total Sur Çà Désormais Et En Son Sein Dans Notre Domaine Vaste D'Activité Ainsi Libéré Au Devoir Accomplie Entièrement Et Seul. Quoi qu'il Arrive À Long Terme Par Là Qu'En Est L'Avantage Décisif Et Phare ? ",
    "Dans l'espace concurrentiel dur au denier où la qualité a de gros coûts rédhibitoires pour exister par rapport aux autres au fond, qu'apporte à une humble âme douée et inspirée la forge miraculeuse Veo derrière son écran ici là en vrai dans ce Gemini aujourd'hui avant tout sans trop tourner avec d'autres raisons diverses l'on comprend ceci avant toutes les raisons ou options qu'on avancerait en face du néophyte qui déboucherait sans la posséder sur une telle offre de cette trempe-là aujourd'hui sans détours majeurs sur son principe phare de bout en bout visé le mieux pour cet apprenant au bas ?",
    [
      "De prétendument et de façon assez trompeuse certifier d'entendre que tu deviendras roi viral ou millionnaire vues sur médias à ce titre parce ton fichier a eu là de la IA c'est sûr car l'algorithme est complice via cette fabrique interne Google tout pour toi. Du baratin pur mensonge à ne croire qu'au loin",
      "Il remet très bêtement un tout entier de pan entier d'industrie aux ordures car il remplace en soi un cameraman complet sans distinction d'art et du génie vif humain des lieux car il exécute bêtement ou très précisément au détriment pour du bon",
      "Celle d'adresser ou d'apparier formellement et prodigieusement et tout de manière à en créer massivement bien entendu la forme pour le concepteur d'aujourd'hui une pléthore sublime richement habillée de films majeurs et dignes avec tout le cran, son et maestria formel que ce qui fut autrefois l'or blanc sans jamais pourtant engager, ou déranger un casting la production des sites ainsi du matériel et engin roulant pesants",
      "Que ce système puissant sera le seul pour mettre au monde en ligne des corps véritables visuellement sans fausses créations et d'un réalisme strict mais alors bien sur incapable pour créer plus fantastique et féérique, sans cela du vrai pour lui il y aura que du vain buggué derrière avec, voilà ce sera sans tout et à l'aide en tout sans vrai choix là de ton doigt pour y palier sur l'instant."
    ],
    2,
    "L'œil savant dirigeant de clavier via quelques lignes son grand projet au cœur vif d'IA supplée ce qu'exigea pendant de plus de cinquante années : foultitude d'hommes aux rôles pointus hors de prix englobés derrière tous du producteur avec patience à rude épreuve jusqu'au retour à la liasse sans garantie au cinéma au tout vieux bout des mois là sans issue en fin du compte sans argent après là sur aucun cas bien loin là et jadis tout en vain souvent bien dit souvent avec d'énormes frais de retour perdants sans merci. Voici vaincue cette époque stérile."
  ),
  textStep(
    "Accouplement Puissant Nano Pro Visuel Réflexif Pour Le Flux Veo Filmique Global Continu Unique",
    "Le summun pour la créativité est à coup sûr l'imbrication étroite. Figer l'excellence statique en raisonner amont pour son style (Nano), pour ensuite balancer le flux sans failles (Veo) donne le tempo impérial parfait pur et sublime sous Gemini en même bloc sans failles de bout sans rien perdre là pour tout ce travail uni en parfaite logique et suite au sein un seul espace créateur souverain absolu avec vous comme roi ou directeur pour ce tout. Allons-y alors sans crainte de rater ! Apprenons ensemble au mieux ce principe unique par ci. Allons voir ce qu'il peut faire mieux avec."
  ),
  fillStep(
    "Joignez La Maîtrise Outil-Double !",
    "La clef dorée de voute sublime revient à clouer fixement du dur le beau du fixe d'avant d'insuffler prodigieusement du génie ou fluide de temps continu avec, tel le miracle des temps animés virtuels contemporains via d'IA. Ainsi sans plus et hop sans peur en un clic, à toi les manettes ici du bon sans faux bond au but visé précis là ce soir pour toute de suite a votre maitrise claire à fond formel pur grand dieu ! Voyons ! Que faire avec et ou ? Ici :",
    "\"Je requiers de me concevoir initialement par du raisonné fort le bel écrin au sein pur grâce [______] de façon sublime via [______] dans ce très lourd jus visuel d'esprit [______]. Seulement dès aval au rendu ok, actionne avec force sans appel tout via majesté ce dit là, le féroce et tout dernier moteur puissant ici de [______] lui demandant instamment fort l'éclosion du clip film là via durée imposante et de pas moins de ces intenses très long [______] secondes appuyées fortes dessus la très noble de susdit vision fixée, incluant pour le chic et drame absolu mouvement visuel imposé à l'appareil de ce type à présent pour le beau final en force là; [______] et sans clore sans rajouter encore un gros très gros du bien senti en bande acoustique tel ce que l'on voudra bien être et paraître là [______].\"",
    ["Nano Banana Pro", "grève abandonnée crépusculaire au calme ressac d'océan évanoui de bord doux caressant tendrement aux brisants fins du large des flots bleus de nuit de feu", "totalement photo authentique sublime a frémir aux tripes pur jus de pur du lourd grand très cinéma pur grandiloquent noblement magistrale sans faillir l'âme au vent d'étoiles fines un peu", "Veo 3.1", "12", "avancée bien menée calme majestueuse et puissamment englobante doucereusement en approches douces des choses de pres sans aucune de viles précipitation gâchant toute vision magistrale noble un peu sereinement sans brutal", "de bruitage du lieu du songe en accord sonore d'ambiance raccord en pleine harmonie natifs d'un vrai souffle ambiante vrai très clair à la mer un peu doux discret un peu au crépuscule d'horizon de là pour lui"],
    ["Nano Banana Pro", "grève abandonnée crépusculaire au calme ressac d'océan évanoui de bord doux caressant tendrement aux brisants fins du large des flots bleus de nuit de feu", "totalement photo authentique sublime a frémir aux tripes pur jus de pur du lourd grand très cinéma pur grandiloquent noblement magistrale sans faillir l'âme au vent d'étoiles fines un peu", "Veo 3.1", "12", "avancée bien menée calme majestueuse et puissamment englobante doucereusement en approches douces des choses de pres sans aucune de viles précipitation gâchant toute vision magistrale noble un peu sereinement sans brutal", "de bruitage du lieu du songe en accord sonore d'ambiance raccord en pleine harmonie natifs d'un vrai souffle ambiante vrai très clair à la mer un peu doux discret un peu au crépuscule d'horizon de là pour lui"],
    "Cristalliser via la très sage instance pensée à l'image des erreurs prévisibles l'état du fixe va couper vif l'herbe des pieds froids a de grandes chimères hasardeuses ou autres délires monstrueux générés au moment d'aborder sans filet dur avec la très dure machine cinétique le Veo la grande scène fluide du très beau final ou de gros bugs couteux auraient frappés si ce pas n'eut point fait avant par raison. Du bon pour lui en vain de l'outil et sans lourd cout du faux bond total. Ce qu'on écarte ici de fait du chemin !"
  ),
  quizStep(
    "Stratégie Cohérente Globale Du Travail En Binôme Sur Scène AI Visual Studio Ici Même En Suite Logique Ou Processus Réel Là Ce Jour Sans Autre Recours Du Dehors Bien Sûr Avec Nous Pour Ce Process.",
    "Comment peut on concevoir pour stratégique réellement d'adopter le mixte hybride accouplé au sein projet créatif commun via d'une du Nano raisonneur fort au préalable suivi par la toute suite au grand animateur de fluidité pour image qu'est ce si fabuleux Veo sur l'écran d'invite textuelle devant avec Gemini nous offrant sa force sans compter de temps ?",
    [
      "Le créateur est tenu sous entraves obligatoires formelles car sans ce mariage lourd les deux modules refusent inconditionnellement d'obéissance le code se bloquant à 100% avec d'ennuyants crashs a tous coups dès refus à s'y joindre de fait et force aveugles pour nous imposer leurs loi stricte inflexible sous IA du système",
      "Il est permis là d'ancrer fermement au bon point la patte créative formelle validée au plus fort intellect duel du modèle fort Nano de façon d'entame, avant de s'engager au si coutasseux en point et de hasardeux pari de temps dans l'étroite piste d'engendrage vif là pour image Veo - le pont assuré d'avoir un sens lié avec et sans rupture d'un fil logique constant de bout formel pour tout du temps d'ici là sans gâchi à vide aucun sur ton bout et bon gout d'art pour l'esprit visé pour du film juste sur sa vue sublime du travail pur pour finir a ce compte-là bien dit du tout avec nous",
      "Du point purement arithmétique il accouche a profusion en des tonnes a gogo d'autant par kilo des médias lourds au rendu vide ce remplissant vos bases a rabord du coup ce pour des fausses piochages sans conviction ensuite mais avec quoi on a gagné du temps à amasser du tout vain hélas",
      "Un tel couplage ne peut concrètement en rien travailler sainement main a main des requêtes analogues car un bot reste textuel figé via de gros mots savants quand a côté l'animation cinétique vidéo est par coutume en roue libre du monde sauvage aveugle des maths pures incompables entre elles bien vu !"
    ],
    1,
    "Forger un socle du pur inamovible préalablement aux intenses rouages d'animatique épargne du dur et de distorsions si dramatiques des cauchemars artistiques affreux sur l'encadrement animée que délivrent ces grosses usines lorsqu'on ne prend nullement soins par amont de dicter ses visions sur claires avec le bon ciment formel des formes avec le maitre de logique amont à fond d'avoir avec cette vision claire imposée à temps de son propre jugement sur son plan. L'accord est l'arc vainqueur et grand du grand génie pour la main a main. Vive la raison AI amont par là avant ! Le secret pur de créatif totalitaire vrai sur l'instrument total visual pour sa boite de bout en là, pour son monde d'hier vers le présent bien vu ce de nous là avec !"
  ),
  textStep(
    "Diriger De Manière Scriptée Vers L'Opérateur Veo Assisté Du Très Lourd Penser Structurel et Visuelle Prévisionnel Avec Du Pur Nano, Afin d'En Générer Qu'Excellence Et Que Pas De Déviance Filmique Formelle Ici-Bas Du Premier Choc Jusqu'Au Rendu Brillant Sans Rejet De Code Erreur Aucune Ainsi.",
    "Déployé sous son plein pouvoir de matière grise algorithmique, le bon Nano au prompt se voit très fort qualifié afin de broder ou ficeler d'entiers scripts séquenciers détaillant chaque plan filmique au cheveu prêt. Et que tu envoies d'un coup bien clair pour les cracher aux bons petits et énormes moteurs de ce grand Veo 3.1. Ce stratège écarte la bêtise pure des engins lâchés libres à la folle, il donne loi de composition pour la qualité pure et sure a votre bot aveugle bien que si costaud en la matière vidéo animée au premier regard à tous de nous et vous. Donc allons y gaiement en plan par script sur ce point !"
  ),
  fillStep(
    "Forger Ses Scénarios De Force Par Anticipation Réfléchie Visuelle Du Bon !",
    "Capter d'en haut ou fractionner ton dessein ultime a de justes micro blocs ou des directives prémâchées pour abreuver de fluidité et coulant le grand automate a clip virtuel sans choc abrupt. Avec ordre pur on y est, avec ça là devant pour vous au pur :",
    "\"Exécute je te prie avec tes beaux cerveaux Nano très bien ouvert à la tache ceci pour nous: conçois pour de vrai de vrai de tout pur avec raison : Un bien dense registre du plan en pleine et vraie écriture a hauteur des justes [______] cadres divers du beau récit là pour de vrai clip portant ce grand sujet a dire ici de par: [______]. Alors ici et en ces petits découpages tu mettras l'action vive détaillée; le sens physique à mouvoir la belle mécanique fine de l'optique par [______] imposé ou guidé; avec quoi on éclaire en belle lumière a ce beau jour bien précis ce de par un fond via ce cadre fin d'éblouis la bonne [______], de l'ambiant aussi au rendu audio parfait bien de son juste pour le décor via là un peu beau suggéré : [______] au rendu fort sans faille avec le beau rendu du clip au final, sans faillir le pourquoi le plus noble là au sein de cette tête bien pensante pour ton [______] pur et du meilleur gout pour valider avant a cette tache si vaste en avant Veo 3.1 !\"",
    ["6", "grande et monumentale présentation produit via un grand et noble soulier d’athlétisme premium rare en vue", "mouvement global a mener en vue avec", "lumineuse et sa forte disposition à irradier sans fausse lumière cruelle inepte sur sujet d'au cœur sans ombrer fort du beau avec ca sans faille", "du bruit sonore de pur acoustique ambiance a proposer avec du bel effet sur de ce fond au film final sans aucun couac un peu bien calé sans", "fort lourd beau et profond du pourquoi je prend telle mesure là pour y amener du bon raisonnement de création justifié sans faillir à propos de cette choix précis avant a l'usage un peu pour ce Veo bien guidé ainsi par le cerveau Nano"],
    ["6", "grande et monumentale présentation produit via un grand et noble soulier d’athlétisme premium rare en vue", "mouvement global a mener en vue avec", "lumineuse et sa forte disposition à irradier sans fausse lumière cruelle inepte sur sujet d'au cœur sans ombrer fort du beau avec ca sans faille", "du bruit sonore de pur acoustique ambiance a proposer avec du bel effet sur de ce fond au film final sans aucun couac un peu bien calé sans", "fort lourd beau et profond du pourquoi je prend telle mesure là pour y amener du bon raisonnement de création justifié sans faillir à propos de cette choix précis avant a l'usage un peu pour ce Veo bien guidé ainsi par le cerveau Nano"],
    "Convier l'arsenal et ses gros canons de logique deductive par strates de scripts fermement découpés grave fermement de cohésion ou du fil commun d'acoustique ou des rayons, et tout l'élan continu séquentiel ou du vide clip musical d'artificiel absolu se mue de chaos a tout chef œuvre du moment."
  ),
  quizStep(
    "Puissance Magistrale Du Librettiste De Code AI Script Prévisionnel Là Exact",
    "Pour quelles sombres a vrai ou fausses vertus utiliseriez vous formellement via l'ordre clair le cerveau de ce Nano à pré-scénariser par de petits ponts avant donner en pâture sa vision libre pour concevoir par l'image en ce grand moteur Veo qui l'accepte si on veut juste sans ? La différence crucialité au fin alors est ici, car un peu : c'est très beau la avec ce Nano ! :",
    [
      "Aucune vertu sauf que c'est une règle de mort fixée par code dur imposée là sans cela crash et néant aucun du tout. Sans Nano au départ ça bug fatal ! Donc on ne choisi hélas pas et on fait ou subit sans se l'entendre dire en rien",
      "Il a l'avantage et mérite stupide ou bien plat juste a te générer du gros fichier vide en surnombre aléatoire lourd et grandement absurde créant masse inutile sur ton temps au moment par du hasard là a remplir la liste et du choix vide pour que la forme, un grand vide pour tes yeux au final. Du gachis par là tout a la poubelle un bout d'heure a regarder",
      "Il voit poindre en maître de sagesse visuel ses bugs possibles et en supprime radicalement toutes ses distorsions formelles graves ou désaccords de fond —ce par avance; t'exportant ce coup précis par petit message limpide vers le Veo fort précis, te soulageant lourd en boucle vain et tentatives foireuses coutant bras financier si en vrai. Formidable du beau coup a maitriser en temps réel a l'instant présent.",
      "Travailler en script te bouffera toute du temps à le pondre, pour ensuite rendre tes projets aussi lents et fastidieux a digérer bêtement sans réelle du bon la à ressort de la grande beauté finale ni la maestria du code en bout du processus."
    ],
    2,
    "Baliser fermement de la pure matière grise pré-architecturée aux bots d'animations qui sont fort d'action éradique l'affreuse surprise fort décousue inerte ou l'anicroche et la fracture d'oeil au raccord sur les visuels sans âme ou ratés. Cela fait loi commune de pure cohésion finale. Le sceau l'artisan expert IA sur de son art noble ici. Vous êtes maitre ! Bravo du progrès l'ami sur ceci a de suite à bien."
  ),
  textStep(
    "Démarche Du Maître, Règles Et Process Virtuose Total Via Notre Veo A L'Oeil Avec Nano !",
    "Capter de bout en bout ferme la bride de contrôle sans jamais baisser du rang les forces sombres des matrices mathématiques et spacieuses du grand Google sur l'art des toiles vierges pixelisés magiques virtuelles là devant nous pour du vrai sur toute cette ligne ! Restez le boss en somme par cette belle démarche avec ça et ce dernier bloc de la théorie a ce présent ! Et bravo pour çà sur cette formidable progression de vous."
  ),
  fillStep(
    "Déployez Stratégiquement Ton Pouvoir Opérateur AI Majeur Ici, Pilote Visuel Là !",
    "Se tenir fermement du clair dans la vue de diriger tel le vrai de pur directeur général au trépied maître d'ensemble grand de l'arsenal ou complexe laboratoire sans pareille des miracles écran ou du vide du vide en code de bits tout de beauté la :",
    "\"A chaque appel bien solennel là au fameux [______], de grâce dictez fort toujours la règle pure l'exhortant par avant même a très bien en vous en détailler c'est-à-dire [______] tous ses choix profonds. Ensuite lors aux appels vers grand seigneur le pur de chez pur d'un certain fort fameux l'autre : [______], alors vous poserez clairs mots de description la sur cette caméra dans toute de son gros [______] ainsi en n'oubliant en rien et surtout son très primordial son d'[______] assez évident avec ; Dès si grand ou gros labeurs projet en tête ambitieux ou plus subtiles là sans faute; il ne vous tiendra en maitre que de l'utiliser fort avant et avec maitrise d'abords par de bon Nano de façon par bien qu'on [______] ça solide amont ; Avant d'oser a ce de l'action pour fin sans faute l'imminente tache fort pure donnant du grand mouvement ou [______] de vie forte sous le charme Veo pour cloturer cela de la superbe maestria visuelle en bout à jamais graver noble là d'ici présent par vos seules directives pures pour votre majesté l'auteur.\"",
    ["Nano Banana Pro", "expliquant de raisons au dit en bon français sur son acte intellectuel pour ça", "Veo 3.1", "et si clair de mouvement", "le bon bel et majestueux bel attribut audio pour fond", "valide sans bouger un brin avec forte assurance à l'image via ça de l'intellect formel de la IA", "animer fort joliment et si réaliste ça in fine avec ça sans faux bug et faille pour y arriver noble et du tout bonnement et fermement"],
    ["Nano Banana Pro", "expliquant de raisons au dit en bon français sur son acte intellectuel pour ça", "Veo 3.1", "et si clair de mouvement", "le bon bel et majestueux bel attribut audio pour fond", "valide sans bouger un brin avec forte assurance à l'image via ça de l'intellect formel de la IA", "animer fort joliment et si réaliste ça in fine avec ça sans faux bug et faille pour y arriver noble et du tout bonnement et fermement"],
    "Soumettre la boite mystère au verdict formel verbalisé garantit ou impose le dictat absolu souverain du grand de l'humain créateur que nul génie ou robot aveugle même de grand luxe ou de force pure ne viendra par là ravir au bout ou usurper et sans faille pour nos artistes ou du bon travail maitrisé de soi d'origine noble."
  ),
  quizStep(
    "La Recette Magique Magistrale Supérieure Workflow Sans Erreur Aucune Au Fond A Retenir",
    "Sur toutes ces pitoyables voies proposées l'une rayonne la vraie attitude sacrée de gloire aux bons ouvriers formées sur le noble Gemini visuel Nano/Veo ? Et pour gagner et de produire d'un pur avec ça c'est :",
    [
      "Arroser en lot et par d'illusions grand tas d'ordures formelles par milles sans critères ni fond ou but et tirer par le hasard tout crasseux puis se cogner la tête avec un peu à l'image vaine en priant le ciel a dénicher miraculé de bon coup",
      "Émettre deux de très vastes banalités ternes puis d'encaisser de coups de massue fatale le premier élan raté venu comme on avalerait couleuvre sans mot et de pleurs. Sans faire saigner de créatif du bon",
      "Exciter les nobles synapses froides de Nano pour un bel avant de raison fine au compte verbal pur afin qu'il raffine en maître à vue ou d'arrêt image fixe son idée, et de ceci si stable adoubé a loisir du vrai du dur y plonger là a plein ce grand et pur fluide moteur Veo donner en animation ou animer grand ce tableau magistral avec grande force pure - ce menant par une chaine de belles victoires voulues maitraisées pas a pas comme vrai chemin créatif mur noble par nous du présent voulu !",
      "Agir très stupidement en refus pour eux au lieu même moment, cloisonner là a fort la séparation étanche aveugle sans lier force des duos magique, se niant en tout de par l'absurde au profit d'outils forts du grand mélange par essence ignorée bêtement d'orgueil vain à coup sûr un de de soi pour le raté parfait sur tous rapports virtuels."
    ],
    2,
    "Agencer par le dur avec art la commande intentionnelle puis encastrer du pur logiciel a l'autre engin puissant crée assurément les armes mures et puissantes redoutables pour régner noble là bas riche ou fier très du formidable maitre du stud visuels à domicile ou tout à vous si majestueux en cette si vaste belle décade numérique nouvelle et magique pour vos arts nobles de demain ou en fin prêt !."
  ),
  textStep(
    "Dénouement Sommet de Formation Module Complet Magistral Par Lui Gemini AI Par La Créa Video Et Visual Total Ici Pour Vous Tous Présent ",
    "L'adjonction de l'âme et intelligence Nano et du très corporel puissant grand moteur du génie des fluides mouvement réel aux audio si noble pour vrai, sous son aile a un certain grand cerveau bien unique d'IA qu'ici : vous sacrent aujourd'hui tout maitre inconditionnel dirigeant un fort studio parfait visual en la seule force unique qui raisonne vif ! Images gorgée très pure raison, clip ou les montages ou vidéos douées aux belles cinétiques des chocs réels synchronisant l'invisible murmure ou souffle natifs - Un seul grand tuyau ou workflow affutée uni dans la fine perfection du geste correcteur ou raffineur sous son interface toute unique a ton clavier via la page à l'invite. Rien que sous un bel unique toit de verre très lumineux ce panel tout présent pour ce toi ici à faire pour eux. Une vraie merveille outil a disposition sans doutes par ici au doigt et à vue la de vous.\n\nCelui parmi le créatif là d'entre homme sachant plier intelligemment leurs forces et liens là d'une l'autre pour marier ceci : ce gars de bien pas ce contentera de juste battre des pauvres records ou accoucher en mille vitesse un volume. Par la non cela. Il bâtit l'œuvre sous haute sphère par exigence, fort d'absence ou pas tant des bugs très fous avec le refus absolu d'ignobles détours aux erreurs fâcheuses passé d'art ou retouches fatiguant et laides repoussés d'avant aux ordures sans la chance jadis avant l'aide ou maitrise pure ici présente avec Nano pour d'avant Veo la.\n\nLe germe brut du cœur là au milieu, a toi l'initiateur l'âme. La forte lourde besogne fine calculatoire la ou toute puissance motrice de calcul pixelisée pure là du miracle sur d'images a un grand du moteur au lourd si vaillant de par ici présentement fort: ça, c'est ta boite d'a votre humble très majordome de force brute noble l'IA ou votre assistant le si fidèle au bel esprit ce jour: Gemini ici au complet du visuel pour vous !\n\nL'épreuve de classe d'une telle force s'annonce tout simplement : clôturé magistrale ✓ !"
  )
] as const;
