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

export const GEMINI_MODULE_5_STEPS_PT = [
  textStep(
    "Gemini para Auxílio na Escrita de Textos",
    "Bem-vindo de volta! Nesta lição, você vai aprender como o Gemini se torna um parceiro poderoso na escrita — redigindo, revisando, adaptando e aprimorando qualquer tipo de texto com velocidade e qualidade profissional.\n\nEscrever bem é uma das habilidades mais valorizadas no mundo profissional. Com o Gemini, você tem um assistente que adapta o tom, ajusta o estilo, corrige erros e sugere melhorias — para qualquer tipo de texto, em qualquer contexto."
  ),
  quizStep(
    "O Gemini como Parceiro de Escrita",
    "Qual é a forma mais eficaz de usar o Gemini para escrita?",
    [
      "Colaborar de forma iterativa — você define o objetivo e o contexto, ele gera, você refina e ajusta até chegar no resultado ideal",
      "Pedir que ele escreva tudo do zero e publicar sem revisar",
      "Usar apenas para corrigir erros de português",
      "O Gemini só funciona bem com textos curtos"
    ],
    0,
    "A escrita auxiliada por IA é uma colaboração: o modelo atua melhor como rascunhador rápido e revisor do seu próprio direcionamento estratégico."
  ),
  textStep(
    "Escrevendo Textos do Zero",
    "A primeira aplicação mais comum é pedir ao Gemini para redigir um texto completo com base nas informações que você fornece — objetivo, público, tom e formato."
  ),
  fillStep(
    "Peça seu texto!",
    "Determine todas as variáveis do seu texto em um único prompt de direcionamento.",
    "\"Escreva um [______] sobre [______] para [______]. Tom: [______]. O objetivo é [______]. Inclua [______] no início para prender a atenção e uma [______] clara no final.\"",
    ["artigo", "os benefícios do trabalho remoto para pequenas empresas", "gestores e empreendedores", "informativo e direto", "apresentar argumentos práticos e convincentes", "um dado surpreendente", "conclusão com chamada para reflexão"],
    ["artigo", "os benefícios do trabalho remoto para pequenas empresas", "gestores e empreendedores", "informativo e direto", "apresentar argumentos práticos e convincentes", "um dado surpreendente", "conclusão com chamada para reflexão"],
    "Isolar cada aspecto redatorial no prompt impede que a IA assuma posturas extremas ou estilos artificiais padronizados."
  ),
  quizStep(
    "Direcionamento Estruturado",
    "O que torna esse prompt mais eficaz do que simplesmente pedir \"escreva um artigo sobre trabalho remoto\"?",
    [
      "O tamanho do prompt — quanto maior, melhor",
      "Ele define o público, o tom, o objetivo e os elementos estruturais do texto — reduzindo o espaço de interpretação e gerando um resultado mais alinhado com o que você precisa",
      "Usar a palavra 'escreva' em vez de 'crie' melhora o resultado",
      "Não faz diferença — qualquer prompt gera o mesmo texto"
    ],
    1,
    "Fornecer parâmetros concretos estreita a área de caça da IA, entregando materiais cirurgicamente úteis no primeiro disparo."
  ),
  textStep(
    "Revisando e Melhorando Textos",
    "Você já tem um texto escrito mas sente que pode ser melhor. O Gemini revisa, aponta problemas e reescreve trechos específicos mantendo a sua voz e intenção original."
  ),
  fillStep(
    "Revise seu texto!",
    "Transforme o modelo num experiente editor-chefe.",
    "\"Aqui está o meu texto: [cole aqui]. Revise e identifique: trechos com [______] de clareza, partes que estão [______], erros de [______] e palavras [______] que podem ser substituídas por alternativas mais precisas. Depois reescreva mantendo minha [______] original.\"",
    ["falta", "repetitivas ou longas demais", "coesão e concordância", "vagas", "voz e estilo"],
    ["falta", "repetitivas ou longas demais", "coesão e concordância", "vagas", "voz e estilo"],
    "Forçá-lo a manter a sua voz evita que o seu texto original pareça impessoal."
  ),
  quizStep(
    "A Edição Fina e Iterativa",
    "Após receber a revisão do Gemini, qual é o melhor próximo passo?",
    [
      "Aceitar todas as sugestões sem avaliar",
      "Ignorar a revisão e publicar o texto original",
      "Avaliar cada sugestão criticamente, aceitar as que melhoram o texto e rejeitar as que mudam sua intenção original",
      "Pedir uma revisão completamente diferente do zero"
    ],
    2,
    "A avaliação humana final deve sempre reinar sobre a máquina."
  ),
  textStep(
    "Adaptando o Tom e o Estilo",
    "O mesmo texto pode precisar de tons diferentes dependendo do canal e do público. O Gemini adapta qualquer conteúdo para o contexto que você precisa."
  ),
  fillStep(
    "Adapte o tom do seu texto!",
    "Desdobre a mesma informação para plataformas diferentes.",
    "\"Aqui está meu texto original: [cole aqui]. Reescreva em [______] versões com tons diferentes: uma [______] para um e-mail corporativo, uma [______] para um post no Instagram e uma [______] para um artigo técnico. Mantenha as [______] principais em todas as versões.\"",
    ["3", "formal e objetiva", "descontraída e envolvente", "precisa e fundamentada", "ideias"],
    ["3", "formal e objetiva", "descontraída e envolvente", "precisa e fundamentada", "ideias"],
    "Com um único prompt você adota abordagens múltiplas."
  ),
  quizStep(
    "Variações Contextuais Poderosas",
    "Por que adaptar o tom de um texto para diferentes canais é importante?",
    [
      "Porque o Gemini exige um tom diferente para cada plataforma",
      "Para criar mais trabalho e testar mais versões",
      "Porque cada canal tem um público com expectativas diferentes",
      "Adaptar o tom muda completamente o significado do texto"
    ],
    2,
    "Um post de blog publicado inadvertidamente no WhatsApp produz imediata antipatia."
  ),
  textStep(
    "Escrevendo E-mails Profissionais",
    "O Gemini redige qualquer tipo de e-mail em segundos, economizando horas cruciais na semana."
  ),
  fillStep(
    "Redija seu e-mail!",
    "Equilibre firmeza e elegância sem estresse e na velocidade máxima.",
    "\"Escreva um e-mail [______] para [______] sobre [______]. O objetivo é [______]. Tom: [______]. Seja [______] e evite [______]. Inclua um assunto que [______] abertura.\"",
    ["profissional", "um fornecedor com quem tivemos um problema de entrega", "solicitar reembolso ou reposição", "resolver a situação de forma amigável mas firme", "cordial e assertivo", "rodeios e linguagem agressiva", "gere"],
    ["profissional", "um fornecedor com quem tivemos um problema de entrega", "solicitar reembolso ou reposição", "resolver a situação de forma amigável mas firme", "cordial e assertivo", "rodeios e linguagem agressiva", "gere"],
    "Delegando as emoções textuais, você redige comunicações blindadas emocionalmente."
  ),
  quizStep(
    "A Arte do E-mail Delicado",
    "Qual é a melhor forma de usar o Gemini para e-mails delicados?",
    [
      "Pedir ao Gemini para escrever o e-mail mais direto e duro possível",
      "Escrever o e-mail sozinho para garantir o tom correto",
      "Descrever o contexto, o relacionamento com o destinatário e o resultado que você quer alcançar",
      "O Gemini não é indicado para e-mails delicados"
    ],
    2,
    "Contexto relacional prévio embase e suaviza as palavras gerando polidez."
  ),
  textStep(
    "Criando Textos para Redes Sociais",
    "O Gemini domina as especificidades de cada rede e cria textos adaptados para o feed infinito."
  ),
  fillStep(
    "Escreva para redes sociais!",
    "Crie munição sob medida.",
    "\"Crie um texto para [______] sobre [______]. Inclua: um [______] na primeira linha, [______] no máximo, uma [______] clara no final e [______] relevantes. Tom: [______].\"",
    ["LinkedIn", "como superei meu maior fracasso", "gancho", "5 parágrafos", "chamada para ação", "hashtags", "reflexivo e humano"],
    ["LinkedIn", "como superei meu maior fracasso", "gancho", "5 parágrafos", "chamada para ação", "hashtags", "reflexivo e humano"],
    "Estipular número de linhas e o uso mandatório de ganchos direciona o bot livremente."
  ),
  quizStep(
    "Comunicação Adaptada",
    "Por que especificar a plataforma melhora o resultado?",
    [
      "Porque o Gemini tem restrições diferentes",
      "Para deixar o texto mais curto",
      "Porque cada plataforma tem formato, extensão e tom diferentes",
      "Não faz diferença especificar a plataforma"
    ],
    2,
    "A métrica de formatação visual varia brutalmente de uma rede para outra."
  ),
  textStep(
    "Escrevendo Textos Longos e Estruturados",
    "Pressione as margens lúdicas emulando incontáveis guias e projetos longos de uma só tacada."
  ),
  fillStep(
    "Estruture seu texto longo!",
    "O segredo magnânimo da produção interativa.",
    "\"Preciso escrever um [______] sobre [______] com aproximadamente [______] palavras. Primeiro crie um [______] completo com todas as seções. Depois desenvolva seção por seção, garantindo [______] entre os tópicos e um [______] progressivo do início ao fim.\"",
    ["guia completo", "uma rotina de estudos", "2.000", "índice", "coerência e fluidez", "aprofundamento"],
    ["guia completo", "uma rotina de estudos", "2.000", "índice", "coerência e fluidez", "aprofundamento"],
    "Cercá-lo primeiro no arranjo direciona o documento final a um trabalho brilhante."
  ),
  quizStep(
    "As Arquiteturas Massivas",
    "Qual é a melhor abordagem para escrever textos longos com o Gemini?",
    [
      "Pedir o texto inteiro de uma vez",
      "Escrever cada seção sem um planejamento prévio",
      "Começar pelo índice e estrutura geral, depois desenvolver seção por seção",
      "Textos longos não funcionam bem com IA"
    ],
    2,
    "Sessões controladas forçam a máquina a recuperar memórias contextuais cruciais."
  ),
  textStep(
    "Corrigindo Gramática e Ortografia",
    "O Gemini atua secretamente como seu revisor gramatical absoluto."
  ),
  fillStep(
    "Corrija seu texto!",
    "Nunca aceite a correção cega sem fundamentação lógica.",
    "\"Revise o texto abaixo e corrija todos os erros de [______], [______] e [______]. Para cada correção, [______] o erro original, a versão corrigida e uma [______] breve do motivo da correção.\"",
    ["ortografia", "concordância", "pontuação", "mostre", "explicação"],
    ["ortografia", "concordância", "pontuação", "mostre", "explicação"],
    "Entender a regra garante a fixação gramatical no usuário."
  ),
  quizStep(
    "Aprendizado Implícito Exigido",
    "Por que pedir ao Gemini para explicar cada correção é mais valioso?",
    [
      "Para a resposta ficar mais robusta",
      "Por causa da credibilidade visual",
      "Porque você aprende com cada correção e evita cometer os mesmos erros",
      "Tornam a revisão inútil"
    ],
    2,
    "Receptor consciente evolui e não refaz incorretamente o processo em branco."
  ),
  textStep(
    "Reescrevendo com Diferentes Estilos Literários",
    "Para projetos criativos, o Gemini consegue reescrever o texto em diferentes visões narrativas."
  ),
  fillStep(
    "Explore estilos diferentes!",
    "Transmute e experimente as facetas lúdicas redatoriais.",
    "\"Reescreva o texto abaixo em [______] estilos diferentes: um [______], um [______] e um [______]. Mantenha as [______] centrais mas mude completamente a forma de [______] e o impacto [______].\"",
    ["3", "narrativo e pessoal", "jornalístico e objetivo", "inspirador e motivacional", "ideias", "expressar", "emocional"],
    ["3", "narrativo e pessoal", "jornalístico e objective", "inspirador e motivacional", "ideias", "expressar", "emocional"],
    "Isolar cada faceta redatorial confere polaridades cruciais ao leitor nativo alvo."
  ),
  quizStep(
    "Modelagem Criativa Polimórfica",
    "Qual é a principal vantagem de testar diferentes estilos criativos?",
    [
      "Para escolher o estilo mais complexo",
      "Para possuir inúmeras linhas textuais extras",
      "Para descobrir qual abordagem ressoa melhor com o seu público-alvo",
      "Nenhuma vantagem visual clara no produto final editado e reeditado exaustivamente"
    ],
    2,
    "Múltiplas narrativas dissecam perfeitamente o cérebro social leitor engajado na publicação primária elaborada meticulosamente pelas inteligências artificiais emparelhadas e comandadas de antemão pelo redator digital autêntico."
  ),
  textStep(
    "Conclusão",
    "Com o Gemini como parceiro de escrita, você nunca mais enfrenta a página em branco sozinho. Textos do zero, revisões, adaptações de tom, e-mails profissionais, conteúdo para redes sociais, documentos longos e correções gramaticais — tudo em uma única conversa, com qualidade e velocidade que transformam sua produtividade.\n\nA escrita sempre foi uma das habilidades mais poderosas. Agora, com o Gemini ao lado, ela está ao alcance de qualquer pessoa que saiba o que quer comunicar.\n\nEscreva com mais confiança. Comunique com mais impacto."
  )
] as const;

export const GEMINI_MODULE_5_STEPS_EN = [
  textStep(
    "Gemini for Writing Assistance",
    "Welcome back! In this lesson, you will learn how Gemini becomes a powerful writing partner—drafting, revising, adapting, and enhancing any type of text with speed and professional quality."
  ),
  quizStep(
    "Gemini as a Writing Partner",
    "What is the most effective way to use Gemini for writing?",
    [
      "Collaborating iteratively—you define the goal and context, it generates, you refine and adjust until reaching the ideal result",
      "Asking it to write everything from scratch and publishing without reviewing",
      "Using it only to correct grammatical errors",
      "Gemini only works well with short texts"
    ],
    0,
    "AI-assisted writing is a collaboration where the model best performs as your strategic co-editor."
  ),
  textStep(
    "Writing Texts from Scratch",
    "The most common application is asking Gemini to draft a complete text based on the parameters you set."
  ),
  fillStep(
    "Request your text!",
    "Determine the variables of your text in a single guiding prompt.",
    "\"Write an [______] about [______] for [______]. Tone: [______]. The goal is to [______]. Include [______] at the beginning to grab attention and a clear [______] at the end.\"",
    ["article", "the benefits of remote work for small businesses", "managers and entrepreneurs", "informative and direct", "present practical and convincing arguments", "a surprising fact", "conclusion with a call to reflection"],
    ["article", "the benefits of remote work for small businesses", "managers and entrepreneurs", "informative and direct", "present practical and convincing arguments", "a surprising fact", "conclusion with a call to reflection"],
    "Isolating editorial variables avoids purely robotic AI outputs."
  ),
  quizStep(
    "Structured Targeting",
    "What makes this prompt more effective than simply asking 'write an article about remote work'?",
    [
      "The size of the prompt—the longer, the better",
      "It defines the audience, tone, goal, and structural elements of the text—reducing the space for interpretation and generating a result more aligned with what you need",
      "Using the word 'write' instead of 'create' improves the outcome",
      "It makes no difference—any prompt generates the same text"
    ],
    1,
    "Providing concrete parameters narrows the AI's hunting area."
  ),
  textStep(
    "Revising and Improving Texts",
    "Gemini reviews, points out issues, and rewrites specific sections while maintaining your original voice."
  ),
  fillStep(
    "Review your text!",
    "Turn the model into an experienced editor-in-chief.",
    "\"Here is my text: [paste here]. Review and identify: sections with a [______] of clarity, parts that are [______], errors in [______], and [______] words that can be replaced. Then rewrite maintaining my original [______].\"",
    ["lack", "repetitive", "cohesion", "vague", "voice"],
    ["lack", "repetitive", "cohesion", "vague", "voice"],
    "Keeping your original voice prevents a sterile tone."
  ),
  quizStep(
    "Fine Iterative Editing",
    "After receiving Gemini's review, what is the best next step?",
    [
      "Accept all suggestions blindly",
      "Ignore its advice",
      "Evaluate each suggestion critically, accepting those that improve the text without shifting its original intent",
      "Start completely from zero instantly"
    ],
    2,
    "Human final judgment must reign supreme."
  ),
  textStep(
    "Adapting Tone and Style",
    "Gemini seamlessly acts as a contextual translator, adapting your content to match diverse environments."
  ),
  fillStep(
    "Adapt the tone of your text!",
    "Modify the timbre of the same information for varied platforms.",
    "\"Rewrite in [______] versions with different tones: one [______] for a corporate email, one [______] for an Instagram post, and one [______] for a technical article. Maintain the core [______] in all versions.\"",
    ["3", "formal", "relaxed", "precise", "ideas"],
    ["3", "formal", "relaxed", "precise", "ideas"],
    "A single prompt prepares you for omnichannel publishing."
  ),
  quizStep(
    "Powerful Contextual Variations",
    "Why adapt the tone for different channels?",
    [
      "Because Gemini demands it by design",
      "To artificially test more variations",
      "Because each channel has an audience with different stylistic expectations",
      "It destroys the original message essentially entirely and definitively"
    ],
    2,
    "Publishing formal legal jargon on WhatsApp immediately alienates the reader."
  ),
  textStep(
    "Writing Professional Emails",
    "Gemini writes precise, assertive, or diplomatic emails instantly, solving a major office bottleneck."
  ),
  fillStep(
    "Draft your email!",
    "Balance diplomacy and directness without losing your entire morning.",
    "\"Write a [______] email to [______] about [______]. The goal is to [______]. Tone: [______]. Be [______] and avoid [______]. Include a subject line that [______] opening.\"",
    ["professional", "a supplier", "refund issues", "resolve the situation", "cordial", "assertive", "generates"],
    ["professional", "a supplier", "refund issues", "resolve the situation", "cordial", "assertive", "generates"],
    "Outsourcing the emotional drafting ensures objective professional comms."
  ),
  quizStep(
    "The Delicate Email",
    "What is the best way to utilize AI for heavy conflict communication?",
    [
      "Instruct it to be extremely rude automatically and decisively",
      "Write it manually to prevent issues",
      "Describe the context and desired outcome, letting Gemini synthesize firmness and politeness",
      "Avoid generative texts under pressure"
    ],
    2,
    "Providing relationship context is the master key to AI diplomacy."
  ),
  textStep(
    "Creating Texts for Social Media",
    "Gemini shapes social hooks to fit the endless scrolling feeds seamlessly."
  ),
  fillStep(
    "Write for social media!",
    "Design algorithmic assets correctly.",
    "\"Create a text for [______] about [______]. Include: a [______] in the first line, [______] maximum, a clear [______] at the end, and relevant [______]. Tone: [______].\"",
    ["LinkedIn", "overcoming failure", "hook", "5 paragraphs", "call to action", "hashtags", "human"],
    ["LinkedIn", "overcoming failure", "hook", "5 paragraphs", "call to action", "hashtags", "human"],
    "Enforcing hooks and word limits ensures platform-native appeal."
  ),
  quizStep(
    "Adapted Communication",
    "Why does specifying the social network platform yield better deliverables?",
    [
      "Due to restricted character tokens only",
      "To produce smaller output blocks systematically",
      "Because every platform has distinct tones and limits",
      "Platform inclusion holds no creative value"
    ],
    2,
    "The reading tolerance on an X feed fundamentally battles long-form LinkedIn articles."
  ),
  textStep(
    "Writing Long and Structured Texts",
    "When facing massive manuals or guides, Gemini organizes the skeletal chunks first for safety."
  ),
  fillStep(
    "Structure your long text!",
    "Prevent hallucination through structural mapping.",
    "\"First create a complete [______] with all sections. Then develop section by section, ensuring [______] between topics and a progressive [______] from start to finish.\"",
    ["index", "coherence", "deepening"],
    ["index", "coherence", "deepening"],
    "Structuring the index anchors the subsequent long-form generation."
  ),
  quizStep(
    "Massive Architectures",
    "What is the optimal path for creating extensive articles with Gemini?",
    [
      "Ordering the entire document instantly",
      "Developing random chunks iteratively",
      "Executing the structural index first, then progressively elaborating section by section",
      "AI models inherently fail large text deployments"
    ],
    2,
    "The step-by-step model sustains logical stringency and saves token memory."
  ),
  textStep(
    "Correcting Grammar and Spelling",
    "Use the machine not just as an editor, but as your linguistic tutor."
  ),
  fillStep(
    "Correct your text!",
    "Acquire grammatical insight along with structural fixes.",
    "\"For each correction, [______] the original error, the corrected version, and a brief [______] of why it was corrected.\"",
    ["show", "explanation"],
    ["show", "explanation"],
    "Understanding the underlying mistake improves the human operator organically."
  ),
  quizStep(
    "Implicit Learning",
    "Why request explanatory breakdowns of your grammatical edits?",
    [
      "To visually lengthen the answer box",
      "For a perceived aesthetic of extreme rigor",
      "It facilitates active learning, preventing repeated syntactical mistakes",
      "It wastes generation times significantly with useless linguistic filler"
    ],
    2,
    "Engaging the rationale trains your internal writer alongside the artificial one."
  ),
  textStep(
    "Rewriting in Different Literary Styles",
    "Test dramatic narrative swings using style directives."
  ),
  fillStep(
    "Explore different styles!",
    "Push the boundaries of standard formatting.",
    "\"Rewrite in [______] different styles: one [______], one [______], and one [______].\"",
    ["3", "narrative", "journalistic", "emotional"],
    ["3", "narrative", "journalistic", "emotional"],
    "Demanding extreme versions reveals unforeseen tonal advantages."
  ),
  quizStep(
    "Creative Modeling",
    "Why generate highly polarized stylistic versions simultaneously?",
    [
      "To maximize word count artificially and systematically without core substance",
      "To increase computing usage unnecessarily",
      "To uncover the exact resonance pitch required to move your specific audience, accelerating your storytelling repertoire",
      "To intentionally garble the primary message for security"
    ],
    2,
    "Isolating alternative views hones the definitive marketing thrust."
  ),
  textStep(
    "Conclusion",
    "With Gemini alongside, the blank page paralysis evaporates. Emails, posts, structures, and deep edits all flow interactively. Master it and elevate your delivery speed exponentially."
  )
] as const;

export const GEMINI_MODULE_5_STEPS_ES = [
  textStep(
    "Gemini para Ayuda en la Escritura de Textos",
    "¡Bienvenido de nuevo! En esta lección, aprenderás cómo Gemini se convierte en un socio poderoso en la escritura: redactando, revisando, adaptando y mejorando cualquier tipo de texto con velocidad y calidad profesional.\n\nEscribir bien es una de las habilidades más valoradas en el mundo profesional. Con Gemini, tienes un asistente que adapta el tono, ajusta el estilo, corrige errores y sugiere mejoras, para cualquier tipo de texto y en cualquier contexto."
  ),
  quizStep(
    "Gemini como Socio de Escritura",
    "¿Cuál es la forma más eficaz de usar Gemini para la escritura?",
    [
      "Colaborar de forma iterativa: tú defines el objetivo y el contexto, él genera, tú refinas y ajustas hasta llegar al resultado ideal",
      "Pedirle que escriba todo desde cero y publicar sin revisar",
      "Usarlo solo para corregir errores gramaticales",
      "Gemini solo funciona bien con textos cortos"
    ],
    0,
    "La escritura asistida por IA es una colaboración: el modelo funciona mejor como redactor rápido y revisor bajo tu propia dirección estratégica."
  ),
  textStep(
    "Escribiendo Textos desde Cero",
    "La primera aplicación y más común es pedirle a Gemini que redacte un texto completo basado en la información que proporcionas: objetivo, público, tono y formato."
  ),
  fillStep(
    "¡Pide tu texto!",
    "Determina todas las variables de tu texto en un único prompt de dirección.",
    "\"Escribe un [______] sobre [______] para [______]. Tono: [______]. El objetivo es [______]. Incluye [______] al principio para captar la atención y una [______] clara al final.\"",
    ["artículo", "los beneficios del trabajo remoto para pequeñas empresas", "gestores y emprendedores", "informativo y directo", "presentar argumentos prácticos y convincentes", "un dato sorprendente", "conclusión con llamado a la reflexión"],
    ["artículo", "los beneficios del trabajo remoto para pequeñas empresas", "gestores y emprendedores", "informativo y directo", "presentar argumentos prácticos y convincentes", "un dato sorprendente", "conclusión con llamado a la reflexión"],
    "Aislar cada aspecto de redacción (extensión, público, estilo, formato) en el prompt impide que la IA asuma posturas extremas o estilos artificiales estandarizados."
  ),
  quizStep(
    "Dirección Estructurada",
    "¿Qué hace que este prompt sea más eficaz que simplemente pedir 'escribe un artículo sobre el trabajo remoto'?",
    [
      "El tamaño del prompt: cuanto más largo, mejor",
      "Define el público, el tono, el objetivo y los elementos estructurales del texto, reduciendo el espacio de interpretación y generando un resultado más alineado a lo que necesitas",
      "Usar la palabra 'escribe' en vez de 'crea' mejora el resultado",
      "No hace diferencia, cualquier prompt genera el mismo texto"
    ],
    1,
    "Proveer parámetros concretos estrecha el área de caza de la IA, entregando materiales quirúrgicamente útiles al primer disparo."
  ),
  textStep(
    "Revisando y Mejorando Textos",
    "Ya tienes un texto escrito pero sientes que puede mejorar. Gemini revisa, señala problemas y reescribe fragmentos específicos manteniendo tu voz e intención original."
  ),
  fillStep(
    "¡Revisa tu texto!",
    "Transforma al modelo en un experimentado editor jefe.",
    "\"Aquí está mi texto: [pega aquí]. Revisa e identifica: tramos con [______] de claridad, partes que son [______], errores de [______] y palabras [______] que pueden sustituirse por alternativas más precisas. Luego reescribe manteniendo mi [______] original.\"",
    ["falta", "repetitivas o demasiado largas", "cohesión y concordancia", "vagas", "voz y estilo"],
    ["falta", "repetitivas o demasiado largas", "cohesión y concordancia", "vagas", "voz y estilo"],
    "Obligarlo a mantener tu voz evita que tu texto original parezca escrito por un robot enciclopedista impersonal."
  ),
  quizStep(
    "La Edición Fina e Iterativa",
    "Después de recibir la revisión de Gemini, ¿cuál es el mejor siguiente paso?",
    [
      "Aceptar todas las sugerencias sin evaluar",
      "Ignorar la revisión y publicar el texto original",
      "Evaluar cada sugerencia críticamente, aceptar las que mejoran el texto y rechazar las que cambian tu intención original",
      "Pedir una revisión completamente diferente desde cero"
    ],
    2,
    "Ninguna IA tiene comprensión total de los matices afectivos, sociológicos y políticos de tu negocio; la valoración final humana debe reinar."
  ),
  textStep(
    "Adaptando el Tono y el Estilo",
    "Un mismo texto puede necesitar tonos diferentes dependiendo del canal y del público. Gemini adapta cualquier contenido al contexto que necesitas: formal, informal, técnico, inspirador."
  ),
  fillStep(
    "¡Adapta el tono de tu texto!",
    "Desdobla y modifica el timbre de la misma información para distintas plataformas.",
    "\"Aquí está mi texto original: [pega aquí]. Reescribe en [______] versiones con tonos diferentes: una [______] para un correo corporativo, una [______] para un post en Instagram y una [______] para un artículo técnico. Mantén las [______] principales en todas las versiones.\"",
    ["3", "formal y objetiva", "descontraída y envolvente", "precisa y fundamentada", "ideas"],
    ["3", "formal y objetiva", "descontraída y envolvente", "precisa y fundamentada", "ideas"],
    "Con un único prompt adoptas enfoques múltiples listos para su difusión en tu ecosistema omnicanal."
  ),
  quizStep(
    "Variaciones Contextuales Poderosas",
    "¿Por qué es importante adaptar el tono de un texto para diferentes canales?",
    [
      "Porque Gemini exige un tono diferente para cada plataforma",
      "Para generar más trabajo y probar más versiones",
      "Porque cada canal tiene un público con expectativas diferentes: el mismo contenido necesita comunicarse de maneras distintas para generar el mismo impacto en cada contexto",
      "Adaptar el tono cambia por completo el significado del texto"
    ],
    2,
    "Publicar un post de blog técnico inadvertidamente en el WhatsApp de la empresa produce una antipatía inmediata."
  ),
  textStep(
    "Escribiendo Correos Profesionales",
    "Los correos son una de las formas de escritura más frecuentes en el entorno profesional, y también donde más tiempo se pierde buscando el tono correcto. Gemini redacta cualquier correo en segundos."
  ),
  fillStep(
    "¡Redacta tu correo!",
    "Equilibra firmeza y elegancia sin estrés y a máxima velocidad.",
    "\"Escribe un correo [______] para [______] sobre [______]. El objetivo es [______]. Tono: [______]. Sé [______] y evita [______]. Incluye un asunto que [______] apertura.\"",
    ["profesional", "un proveedor con quien tuvimos un problema de entrega", "solicitar reembolso o reposición", "resolver la situación de forma amigable pero firme", "cordial y asertivo", "rodeos y lenguaje agresivo", "genere"],
    ["profesional", "un proveedor con quien tuvimos un problema de entrega", "solicitar reembolso o reposición", "resolver la situación de forma amigable pero firme", "cordial y asertivo", "rodeos y lenguaje agresivo", "genere"],
    "Al delegar las emociones textuales, redactas comunicaciones urgentes blindadas emocionalmente y robustas a nivel corporativo."
  ),
  quizStep(
    "El Arte del Correo Delicado",
    "¿Cuál es la mejor forma de usar Gemini para correos delicados, como cobros o quejas?",
    [
      "Pedirle a Gemini que escriba el correo lo más directo y duro posible",
      "Escribir el correo uno mismo para asegurar el tono correcto",
      "Describir el contexto, la relación con el destinatario y el resultado que se desea alcanzar, dejando a Gemini encontrar el equilibrio entre firmeza y cordialidad",
      "Gemini no está indicado para correos profesionales delicados"
    ],
    2,
    "El contexto relacional previo cimienta y suaviza las palabras que el algoritmo emulará para generar amabilidad."
  ),
  textStep(
    "Creando Textos para Redes Sociales",
    "Cada plataforma tiene su propio lenguaje y formato. Gemini domina las especificidades de cada red y crea textos adaptados para Instagram, LinkedIn, X y otras."
  ),
  fillStep(
    "¡Escribe para redes sociales!",
    "El algoritmo generando munición a medida directamente para el scroll infinito de otras plataformas.",
    "\"Crea un texto para [______] sobre [______]. Incluye: un [______] que frene el scroll en la primera línea, [______] como máximo, una [______] clara al final y [______] relevantes. Tono: [______].\"",
    ["LinkedIn", "cómo superé mi mayor fracaso profesional y qué aprendí", "gancho", "5 párrafos", "llamada a la acción", "hashtags", "reflexivo y humano"],
    ["LinkedIn", "cómo superé mi mayor fracaso profesional y qué aprendí", "gancho", "5 párrafos", "llamada a la acción", "hashtags", "reflexivo y humano"],
    "Estipular el número de líneas y el uso obligatorio de ganchos es la regla de oro antes de soltar libremente al bot en posts orgánicos."
  ),
  quizStep(
    "Comunicación Adaptada",
    "¿Por qué especificar la plataforma al pedir un texto para redes sociales mejora el resultado?",
    [
      "Porque Gemini tiene restricciones diferentes de contenido para cada red",
      "Para hacer el texto más corto automáticamente",
      "Porque cada plataforma tiene formato, extensión, tono y expectativa de engagement diferentes: Gemini adapta todos estos elementos cuando sabe dónde se publicará el texto",
      "No hace ninguna diferencia especificar la plataforma"
    ],
    2,
    "La métrica de formateo visual varía brutalmente desde un post de X (ex-Twitter) comparado frente a la extensión formidable de un artículo de LinkedIn."
  ),
  textStep(
    "Escribiendo Textos Largos y Estructurados",
    "Para textos más extensos —informes, artículos, ebooks, propuestas—, Gemini ayuda a estructurar, desarrollar y mantener la coherencia a lo largo de todo el documento."
  ),
  fillStep(
    "¡Estructura tu texto largo!",
    "El secreto espléndido de la producción másiva iterativa libre de alucinación discursiva.",
    "\"Necesito escribir un [______] sobre [______] con aproximadamente [______] palabras. Primero crea un [______] completo con todas las secciones. Luego desarrolla sección por sección, garantizando [______] entre los temas y un [______] progresivo de principio a fin.\"",
    ["guía completa", "cómo montar una rutina de estudios eficiente", "2.000", "índice", "coherencia y fluidez", "profundización"],
    ["guía completa", "cómo montar una rutina de estudios eficiente", "2.000", "índice", "coherencia y fluidez", "profundización"],
    "Cercarlo primero en la disposición del índice por temas evita el monótono bloque interminable en estilo robótico e incoherente."
  ),
  quizStep(
    "Las Arquitecturas Masivas",
    "¿Cuál es el mejor enfoque para escribir textos largos con Gemini?",
    [
      "Pedir el texto entero a la vez en un único prompt",
      "Escribir cada sección sin planificación previa",
      "Empezar por el índice y la estructura general, probar la organización y luego desarrollar sección por sección, manteniendo el control sobre el resultado final",
      "Los textos largos no funcionan bien con asistentes de IA"
    ],
    2,
    "Las sesiones controladas obligan a la máquina a recuperar memorias de contexto manteniendo su cohesión original invicta y aguda a lo largo de las hojas."
  ),
  textStep(
    "Corrigiendo Gramática y Ortografía",
    "Para quienes necesitan un texto impecable antes de publicar o enviar, Gemini funciona como un revisor ortotipográfico completo, detectando y enmendando errores con explicaciones claras."
  ),
  fillStep(
    "¡Corrige tu texto!",
    "Nunca aceptes la corrección a ciegas sin captar los fundamentos del defecto gramatical subsanado.",
    "\"Revisa el texto de abajo y corrige todos los errores de [______], [______] y [______]. Por cada corrección, [______] el error original, la versión corregida y una [______] breve del motivo de la rectificación. [Pega aquí el texto]\"",
    ["ortografía", "concordancia", "puntuación", "muestra", "explicación"],
    ["ortografía", "concordancia", "puntuación", "muestra", "explicación"],
    "Al requerir un informe pedagógico por cada coma arreglada, la máquina actúa secretamente como un profesor particular de gramática de la propia lengua."
  ),
  quizStep(
    "Aprendizaje Implícito Solicitado",
    "¿Por qué es más valioso pedir a Gemini que explique cada corrección en vez de solo recibir el texto reglado?",
    [
      "Para que la respuesta de Gemini resulte más larga",
      "Porque los textos con comentarios dan mayor credibilidad",
      "Porque tú aprendes con cada corrección, evitas reiterar las pifias y transformas la revisión en un estudio activo",
      "Exigir pormenores hace más pesada la edición sin traer ningún avance"
    ],
    2,
    "Un receptor pasivo no afina el conocimiento innato. Interiorizar el porqué asegura no refilar el tropiezo a posteriori."
  ),
  textStep(
    "Reescribiendo con Diferentes Estilos Literarios",
    "Para proyectos altamente creativos, Gemini puede transcribir el mismo argumento base por medio de enfoques narrativos variopintos: tono poético, reportaje investigativo, nota técnica..."
  ),
  fillStep(
    "¡Explora estilos insólitos!",
    "Lleva las barreras al extremo pidiendo mutar las líneas a estilos completamente opuestos.",
    "\"Vuelve a redactar el texto siguiente en [______] formatos dispares: un modo [______], otro esquema [______] y un corte enteramente [______]. Conserva el pilar de las [______] base, pero transforma el afán al [______] y el rebote [______] brindado en cada faceta. [Pega tu copia aquí]\"",
    ["3", "narrativo e intimista", "jornalístico distante", "arengador emotivo", "ideas", "expresar", "emocional"],
    ["3", "narrativo e intimista", "jornalístico distante", "arengador emotivo", "ideas", "expresar", "emocional"],
    "Tensionar fronteras induce a la computadora a exhibir propuestas comunicativas potentísimas que, frente al lienzo en blanco humano, son inalcanzables al instante."
  ),
  quizStep(
    "Plasmado Creativo Multimodal",
    "¿En qué te favorece comandar a Gemini el recitado del mismo relato usando filtros emocionales opuestos?",
    [
      "Sirve para acumular párrafos desvirtuados sin sentido unitario y ensanchar la longitud total",
      "Para alargar artificialmente cualquier argumento insípido",
      "Te sirve a ti para auscultar cómo un mismo contenido interpela más o menos fuertemente, madurando de paso tu propia ductilidad de escritor al observar otras formas de tejer las mismas fibras",
      "Jugar con los registros no influye ni mejora la eficiencia"
    ],
    2,
    "Someter a tensión las alternativas tonales te permite aislar un discurso con magnetismo rotundo con escaso desgaste psíquico."
  ),
  textStep(
    "Conclusión",
    "Con Gemini investido como copluma perpetuo, la soledad apabullante del papel en blanco queda diezmada por completo. Arquitectura primaria, repasos formidables, modulaciones vocales, correos críticos de negocios, parrillas de redes asimiladas, manuscritos gigantes o corrección rigurosa… todo en un canal instantáneo, inyectando un aluvión de productividad estelar a tu flujo de tareas.\n\nTradicionalmente, escribir con garra era privilegio forjado a martillazos. Hoy, con esta inteligencia, la maestría abraza a quien articula claramente lo que necesita comunicar.\n\nEscribe con temple. Impacta donde comuniques."
  )
] as const;
export const GEMINI_MODULE_5_STEPS_FR = [
  textStep(
    "Gemini pour l'Assistance à la Rédaction",
    "Bon retour ! Dans cette leçon, vous allez apprendre comment Gemini devient un partenaire de rédaction puissant — il rédige, révise, adapte et améliore tout type de texte avec rapidité et une qualité professionnelle.\n\nBien écrire est l'une des compétences les plus valorisées dans le monde professionnel. Avec Gemini, vous disposez d'un assistant qui adapte le ton, ajuste le style, corrige les erreurs et suggère des améliorations — pour n'importe quel texte, dans n'importe quel contexte."
  ),
  quizStep(
    "Gemini comme Partenaire de Rédaction",
    "Quelle est la façon la plus efficace d'utiliser Gemini pour écrire ?",
    [
      "Collaborer de manière itérative : vous définissez l'objectif et le contexte, il génère, vous affinez et ajustez jusqu'à obtenir le résultat idéal",
      "Lui demander de tout écrire de zéro et de publier sans réviser",
      "L'utiliser uniquement pour corriger des fautes d'orthographe",
      "Gemini ne fonctionne bien qu'avec des textes courts"
    ],
    0,
    "L'écriture assistée par l'IA est une collaboration : le modèle agit au mieux comme un brouillonneur rapide et un relecteur sous votre propre direction stratégique."
  ),
  textStep(
    "Rédaction de Textes à Partir de Zéro",
    "La première et la plus courante des applications consiste à demander à Gemini de rédiger un texte complet en se basant sur les informations que vous fournissez : l'objectif, le public cible, le ton et le format."
  ),
  fillStep(
    "Demandez votre texte !",
    "Déterminez toutes les variables de votre texte en une seule instruction de guidage.",
    "\"Écris un [______] sur [______] pour [______]. Ton : [______]. L'objectif est de [______]. Inclus [______] au début pour capter l'attention et une [______] claire à la fin.\"",
    ["article", "les avantages du télétravail pour les petites entreprises", "des managers et entrepreneurs", "informativo y directo", "présenter des arguments pratiques et convaincants", "une donnée surprenante", "conclusion avec un appel à la réflexion"],
    ["article", "les avantages du télétravail pour les petites entreprises", "des managers et entrepreneurs", "informativo y directo", "présenter des arguments pratiques et convaincants", "une donnée surprenante", "conclusion avec un appel à la réflexion"],
    "Isoler chaque aspect rédactionnel (longueur, public cible, style, format) dans le prompt empêche l'IA d'adopter des positions extrêmes ou des styles artificiels standardisés."
  ),
  quizStep(
    "Ciblage Structuré",
    "Qu'est-ce qui rend ce prompt plus efficace que de demander simplement 'écris un article sur le télétravail' ?",
    [
      "La taille du prompt — plus il est long, mieux c'est",
      "Il définit l'audience, le ton, l'objectif et les éléments structurels du texte — réduisant la marge d'interprétation et générant un résultat plus en adéquation avec vos besoins",
      "L'utilisation du terme 'écris' au lieu de 'crée' améliore le résultat",
      "Cela ne fait aucune différence — n'importe quel prompt génère le même texte"
    ],
    1,
    "Fournir des paramètres concrets restreint la zone de chasse de l'IA, livrant des matériaux utiles chirurgicalement du premier coup."
  ),
  textStep(
    "Révision et Amélioration de Textes",
    "Vous avez déjà un texte rédigé mais vous sentez qu'il pourrait être meilleur. Gemini l'examine, signale les défauts et réécrit des parties spécifiques en conservant votre voix et intention d'origine."
  ),
  fillStep(
    "Révisez votre texte !",
    "Transformez le modèle en un rédacteur en chef expérimenté.",
    "\"Voici mon texte : [collez ici]. Révise-le et identifie : les passages avec un [______] de clarté, les parties qui sont [______], les fautes de [______] et les termes [______] qui peuvent être remplacés par des options plus précises. Ensuite, réécris-le en gardant mon [______] initial.\"",
    ["manque", "répétitives ou trop longues", "syntaxe et d'accord", "vagues", "ton et ma voix d'auteur"],
    ["manque", "répétitives ou trop longues", "syntaxe et d'accord", "vagues", "ton et ma voix d'auteur"],
    "Le forcer à garder votre identité verbale évite que votre texte finisse calqué et modelé par un incommensurable esprit froid d'ordinateur."
  ),
  quizStep(
    "L'Édition Fine et Itérative",
    "Quelle est la meilleure étape à suivre après avoir reçu la révision de Gemini ?",
    [
      "Accepter toutes les suggestions sans les évaluer",
      "Ignorer la révision et publier le brouillon brut",
      "Évaluer chaque recommandation avec un œil critique, valider celles qui affinent la version, et repousser formellement celles qui sapent le message véritable",
      "Redemander un tout autre examen d'un point de vue zéro"
    ],
    2,
    "La machine ne possède ni le passif politique de votre firme, ni l'affect profond au client; seul votre veto décide."
  ),
  textStep(
    "Adaptation du Ton et du Style",
    "Le même texte peut nécessiter des tons différents selon le canal ou selon le lectorat d'arrivée. Avec Gemini, vous calibrez une publication pour un monde institutionnel ou inspiratif d'un simple clic."
  ),
  fillStep(
    "Adaptez le ton de votre texte !",
    "Dupliquez finement le fond en altérant grandement l'apparence sur chaque point de contact.",
    "\"Je te donne un texte premier : [collez ici]. Traduis-le sous [______] variantes d'adaptation au niveau du ton : il m'en faut une mouture [______] pour le réseau pro interne de mails, une forme très [______] pour notre vitrine Instagram et un ultime jet [______] pour une revue technique des pairs. Il ne faut pas omettre le socle des [______] fondatrices, bien entendu.\"",
    ["3", "stricte et objective", "décontractée et accrocheuse", "méthodique et étayée", "idées"],
    ["3", "stricte et objective", "décontractée et accrocheuse", "méthodique et étayée", "idées"],
    "D'une phrase maîtresse, vous libérez la puissance d'un écosystème entier omnicanal, paré aux divers lancements."
  ),
  quizStep(
    "Puissantes Variations Contextuelles",
    "Pourquoi est-il primordial de transposer le son de cloche éditorial selon la voie empruntée ?",
    [
      "Car sans cela le modèle d'IA refuse de travailler les sorties.",
      "Juste pour saturer la production et s'offrir du luxe test.",
      "Car chaque auditoire a une réception forgée : si une même mécanique verbale tourne sur tous les paliers, elle heurtera violemment l'environnement qui ne la tolère pas sous cet aspect grossier.",
      "Changer le rythme change automatiquement le fond mathématique du bilan."
    ],
    2,
    "Glisser une charte syntaxique guindée d'entreprise parmi une dynamique de SMS joyeux crée un fiasco communicatif flagrant."
  ),
  textStep(
    "Rédaction d'Emails Professionnels",
    "Les courriels figurent en tête des besognes épineuses quotidiennes corporatives. C'est le carrefour idéal pour se perdre en doutes psychologiques sur les bons angles d'approche. Gemini résout l'épineux email en peu de minutes."
  ),
  fillStep(
    "Rédigez votre email !",
    "Mariez fermeté tactique et belle tournure sans aucun échauffement d'esprit.",
    "\"Développe-moi un e-mail [______] à l'égard d'[______] concernant [______]. Le but final réside dans la ferme démarche visant à [______]. Le ton d'approche se doit d'être [______]. Prends garde d'exclure tout [______]. Coiffe ceci par une ligne d'objet qui force le clic et l'[______].\"",
    ["professionnel", "un sous-traitant impliqué dans des litiges d'envoi", "lui intimer de rembourser ou remplacer le matériel", "solutionner cette brèche cordialement mais fixement", "diplomatique et intransigeant", "bavardage ou attaque accusatoire", "ouverture"],
    ["professionnel", "un sous-traitant impliqué dans des litiges d'envoi", "lui intimer de rembourser ou remplacer le matériel", "solutionner cette brèche cordialement mais fixement", "diplomatique et intransigeant", "bavardage ou attaque accusatoire", "ouverture"],
    "Évacuer l'intense brûlure affective via le bouclier logiciel enfourne une objectivité percutante face aux affaires lourdes."
  ),
  quizStep(
    "L'Art Délicat de l'Échange Numérique",
    "Quelle philosophie doit prédominer quand on sollicite l'assistant par IA lors d'un différent monétaire acéré par couriel ?",
    [
      "Suggérer une destruction agressive de courtoisie pour asséner l'ascendant moral.",
      "Cesser de collaborer avec le module pour un fait si grave et se débrouiller par habitude.",
      "Transmettre fidèlement tout le panorama conflictuel des acteurs et requérir fermement que l'entité artificielle bâtisse le pont étroit unissant le respect déontologique et l'inflexibilité marchande réclamée.",
      "L'interface rejette de fait, d'ordinaire, toute médiation de conflit interne de société."
    ],
    2,
    "Contextualiser le poids de la querelle à ce modèle numérique arme les tournures de phrases d'une sagesse modératrice."
  ),
  textStep(
    "Créer des Contenus pour Réseaux Sociaux",
    "Ces terminaux commandent des cadences, des filtres et de longues métriques divergentes. L'algorithme se fond remarquablement au cœur d'Instagram, du mur LinkedIn ou du fil de gazouillis courts."
  ),
  fillStep(
    "Écrivez selon la tribu !",
    "Laisser les robots digérer intrinsèquement l'infinité capricieuse des algorithmes filaires extérieurs.",
    "\"Produis un post taillé expressément pour le cercle [______] qui raconte [______]. N'oublie pas d'y forger : un immense [______] brisant le balayage passif à l'instant du premier regard, la limite totale s'échelonnant sur [______], l'incontournable [______] frontale clôturant et la liste de robustes [______]. Adopte sur l'ensemble une vue [______].\"",
    ["LinkedIn", "mon plus humiliant revers d'employé et ce qu'il m'a coûté avant de rebondir", "hameçon (hook)", "5 encarts descriptifs", "sollicitation au commentaire (call-to-action)", "tags (hashtags)", "très humaine et contemplative"],
    ["LinkedIn", "mon plus humiliant revers d'employé et ce qu'il m'a coûté avant de rebondir", "hameçon (hook)", "5 encarts descriptifs", "sollicitation au commentaire (call-to-action)", "tags (hashtags)", "très humaine et contemplative"],
    "Dicter des bornages et implanter des arrêts (les fameux 'hooks') forme le premier commandement impérieux encadrant une machinerie synthétisante générique."
  ),
  quizStep(
    "Passeport Sémantique Ciblé",
    "Qu'est-ce qui valide l'importance sacrée d'identifier en clair le domaine du média social récepteur aux yeux de Gemini ?",
    [
      "Une broutille algorithmique lénifiante sans importance majeure au bout du compte.",
      "Afin que le rendement final s'évapore et redevienne laconique au possible d'un claquement expéditif.",
      "Car chaque univers virtuel engendre des tolérances spatiales d'écran, des codes émotifs uniques d'abonnés et un type d'accroche très exclusif au format — Gemini bascule et tisse sur ce socle la toile textuelle de fond.",
      "Pour s'aligner par caprice exclusif de programmation en C++ non affiché à l'écran."
    ],
    2,
    "La surface visuelle admise des lecteurs d'une application bondissante est drastiquement à l'antipode du récit solennel posé sur un support d'offres de poste."
  ),
  textStep(
    "Gérer d'Extrêmes Éditions Structurées",
    "L'élaboration de briques documentaires très denses (manuel, essai ou livre blanc massif) demande qu'on orchestre Gemini par d'étroits segments unifiant la clarté."
  ),
  fillStep(
    "Édifiez un gratte-ciel documentaire !",
    "La suprême clé du chantier textuel imposant épargnant au rédacteur humain l'essoufflement intellectuel de masse et prémunissant contre toute fabulation générée.",
    "\"Il me faut déployer l'équivalent publicatif d'un [______] en enseignant [______] d'un volume textuel gravant les [______] termes à la balance. Pose en toute majesté l'[______] complet initial englobant les chapitres. Dans un second temps, accouche les paragraphes pièce par pièce tout en surveillant la [______] d'une partie vers l'autre assurant d'avoir un lent et robuste [______] logique jusqu'au terme ultime de l'œuvre.\"",
    ["manifeste directeur absolu", "les piliers en or pour acquérir le savoir continuel auto-didacte", "2000", "arborescence (le squelette)", "suture fluide", "développement graduel"],
    ["manifeste directeur absolu", "les piliers en or pour acquérir le savoir continuel auto-didacte", "2000", "arborescence (le squelette)", "suture fluide", "développement graduel"],
    "Borner l'édifice mental à travers un sommaire tranché annule radicalement la menace d'un rendu lourd redondant au rythme cadavérique."
  ),
  quizStep(
    "Ingénierie de la Macro-Architecture",
    "Quelle doctrine fondatrice sied de loin le plus au pilotage en solitaire de manuscrits lourds de plusieurs douzaines de feuillets avec un système intelligent ?",
    [
      "Hurler dans le clavier que le tout (la notice complète) jaillisse instantanément par d'imprécations lapidaires sommaires unanimes.",
      "Démarrer bille en tête le paragraphe un sans se concevoir du reste de l'édifice théorique.",
      "Soulever doucement les fondements charpentant la somme du propos puis examiner ce sommaire de l'esprit, asseoir chaque pierre de la narration sur ledit plan et valider méthodiquement le tout de cette maquette progressive de conception pure.",
      "Périr dans un amoncellement et accuser la machine qui souffrirait fatalement du fameux déficit d'attrait."
    ],
    2,
    "Ce scindement tactique en grappes maîtrisables contraint le programme à rafraichir perpétuellement les concepts-liens vitaux sauvegardant la pureté de la sève narratrice à travers tout le vaste roman d'affaires."
  ),
  textStep(
    "La Sentinelle Éducative de la Langue",
    "C'est sur ce rempart de grammaire pointilleux qu'on érige sa probité de diffuseur, repérant d'intraitables lacunes de liaison, des ratures latentes de frappes et administrant en retour le précieux rappel justifiant la mutation ordonnée par Gemini."
  ),
  fillStep(
    "Guérissez votre composition en la comprenant !",
    "Devenez imbattable en excommuniant la passivité ; ne validez aucune correction obscure du système par le biais du mutisme.",
    "\"Agis comme le correcteur suprême de ce fragment en bannissant les crimes d'[______], d'[______] et de stricte [______]. Face à tes redressements, j'exige d'y [______] le vice d'origine juxtaposé face à la guérison choisie puis une nette [______] didactique succincte arguant de ladite norme appliquée et réparée de mon lourd pêché textuel originel. [Déposer l'extrait cible ici]\"",
    ["orthographe", "accords de grammaire", "syntaxe de ponctuation", "constater", "règle enseignée"],
    ["orthographe", "accords de grammaire", "syntaxe de ponctuation", "constater", "règle enseignée"],
    "Exiger cette expertise méticuleuse du modèle propulse le dictionnaire virtuel dans l'arène inestimable d'un tuteur pédagogique."
  ),
  quizStep(
    "Le Cerveau Littéraire Éveillé",
    "Pour trancher par-delà tout équivoque, quel bénéfice inouï se dégage en requérant de l'IA ses principes théoriques derrière une pure correction technique ?",
    [
      "Gonfler impunément le métrage global",
      "Éblouir de fausse science factice.",
      "Vous éduquer silencieusement en extirpant le mauvais réflexe inné à l'insu d'un lourd cours magistral poussiéreux.",
      "Laisser la lourdeur s'infiltrer gratuitement sans en capter un dividende d'évolution."
    ],
    2,
    "Ne glissez plus dans la stagnation ! Absorber le motif profond corrige le geste littéraire instinctif la fois d'après."
  ),
  textStep(
    "Réécritures Littéraires Polymorphes",
    "Au gré de vos audaces intellectuelles, ordonnez à Gemini de contorsionner vos blocs discursifs sous maints angles narratifs (pimenté de poésie candide, corsé par de la rigueur froide journalistique, teinté de sagesse technique palpable…)."
  ),
  fillStep(
    "Testez les prismes narratifs opposés !",
    "Ouvrir grand la porte dimensionnelle en convoquant trois orateurs invisibles s'entrechoquant.",
    "\"Prends en charge cette prose initiale : [Copiez cela ci-dessous]. Modifie-la entièrement sous la contrainte de [______] gabarits d'éloquences bien distincts : délivre mon propos sous l'allure d'un conte [______], puis verse-le dans le moule d'une investigation [______], pour achever ta mue sous des accents criants d'un appel [______]. Verouille scrupuleusement les [______] mères mais réinvente intégralement ta façon d'[______] et la sève [______] qui les cimente.\"",
    ["3", "narratif intime", "journalistique distant", "inspirant enflammé", "idées", "exprimer", "émotive ressentie"],
    ["3", "narratif intime", "journalistique distant", "inspirant enflammé", "idées", "exprimer", "émotive ressentie"],
    "Commander de l'inattendu radical au programme l'oblige à se surpasser, déverrouillant une fraîcheur lexicale surprenante et inédite devant un brouillon asséché."
  ),
  quizStep(
    "L'Arsenal Oratoire Multiplié",
    "Où réside la toute première supériorité d'user de la plasticité d'expression stylistique pour vos publications organiques avec le système ?",
    [
      "Se noyer complaisamment dans des digressions infinies et creuses de littérature obscure.",
      "La certitude mécanique algorithmique que les articles longs valent fondamentalement plus cher que ceux concis et frappants.",
      "Faire résonner, percuter l'audience d'une vibration inouïe en expérimentant tour à tour d'éclectiques tonalités, ce qui densifie le registre interne de l'écrivain stratège lui-même.",
      "Prouver bêtement que le logiciel s'exécute à merveille face aux ordres fantasques du maître."
    ],
    2,
    "Déceler le diapason parfait via de multiples tirs exploratoires de la variante de style est la pierre d'angle des meneurs de foules."
  ),
  textStep(
    "Conclusion",
    "Fort d'avoir embarqué Gemini comme acolyte perpétuel de l'encre numérique, la glaçante agonie vertigineuse d'une page blanche déserte appartient résolument au passé mort de l'informatique. Architecture complexe, retouches magistrales, pirouettes de style et de ton, urgences du mail ou vastitude d'un blog de bord... vos exigences prennent forme du premier coup d'œil, balayant à main nue des barrières productives autrefois immenses.\n\nS'il est admis que ciseler la phrase portait les vertus du pouvoir de convaincre depuis des siècles, aujourd'hui l'assistant vous livre ce sceptre sans lutte titanesque. L'exigence de la rédaction n'a besoin que d'une intention ordonnée intelligemment.\n\nPrenez votre élan. Caressez la réussite."
  )
] as const;
