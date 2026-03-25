const textStep = (title: string, content: string, promptBox?: string) => ({
  type: "text" as const,
  title,
  content,
  ...(promptBox ? { promptBox } : {}),
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

export const CLAUDE_MODULE_5_STEPS_PT = [
  textStep(
    "Claude para Criatividade - Ideias Sem Limite",
    "Bem-vindo de volta! Nesta licao, voce vai descobrir como usar o Claude como parceiro criativo para gerar ideias originais, escrever textos com personalidade, criar historias, roteiros e conteudos que realmente se destacam."
  ),
  textStep(
    "O Claude como Parceiro Criativo",
    "Criatividade com IA nao e sobre delegar, e sobre expandir. O Claude nao substitui sua voz criativa. Ele amplifica, sugere, provoca e abre caminhos que talvez voce nao enxergasse sozinho. O segredo esta em tratar a conversa como colaboracao, nao como encomenda. Voce direciona, ele gera, voce refina, ele aprimora."
  ),
  textStep(
    "Gerando Ideias Originais",
    "O Claude e um gerador de possibilidades. Quando voce trava em um projeto criativo, ele consegue abrir dezenas de caminhos em segundos, dos mais obvios aos mais ousados e inesperados. Depois, voce seleciona os que mais ressoaram e pede para aprofundar cada um."
  ),
  fillStep(
    "Preencha a lacuna - Peca ideias com diversidade!",
    "Monte um prompt que abra espaco para variacao real de ideias.",
    "\"Gere ___ ideias para ___. Varie os angulos: inclua ideias ___, ___, ___ e completamente fora do padrao. Nao se autocensure. Depois destaque as ___ com maior potencial criativo e explique por que.\"",
    [
      "15",
      "o nome de uma marca de moda sustentavel",
      "obvias",
      "poeticas",
      "provocativas",
      "3"
    ],
    [
      "15",
      "o nome de uma marca de moda sustentavel",
      "obvias",
      "poeticas",
      "provocativas",
      "3",
      "1",
      "uma receita de bolo",
      "burocraticas",
      "100"
    ],
    "Quando voce pede variedade explicita, o Claude sai do previsivel e explora caminhos mais criativos."
  ),
  textStep(
    "Escrevendo com Personalidade",
    "O Claude consegue adaptar o estilo de escrita ao tom, a voz e ao universo que voce quer criar. Quanto mais referencias voce fornece, mais proximo da sua identidade fica o resultado. Ele reconhece os padroes esteticos que voce valoriza e usa isso como guia para criar algo original dentro desse universo."
  ),
  fillStep(
    "Preencha a lacuna - Defina sua voz criativa!",
    "Descreva estilo, ritmo e sensacao desejada para a escrita.",
    "\"Escreva um ___ sobre ___ com as seguintes caracteristicas de estilo: tom ___, frases ___, use ___ e evite ___. A sensacao que o texto deve transmitir ao leitor e ___.\"",
    [
      "texto de abertura para um podcast",
      "comportamento humano e psicologia",
      "curioso e provocativo",
      "curtas e diretas",
      "perguntas retoricas",
      "explicacoes longas e academicas",
      "que ele esta prestes a descobrir algo que vai mudar sua perspectiva"
    ],
    [
      "texto de abertura para um podcast",
      "comportamento humano e psicologia",
      "curioso e provocativo",
      "curtas e diretas",
      "perguntas retoricas",
      "explicacoes longas e academicas",
      "que ele esta prestes a descobrir algo que vai mudar sua perspectiva",
      "relatorio tecnico",
      "frases burocraticas",
      "humor pastelao"
    ],
    "Quanto mais voce especifica a identidade do texto, mais o Claude consegue escrever com personalidade real."
  ),
  textStep(
    "Criando Historias e Narrativas",
    "O Claude e um narrador poderoso. Ele domina estruturas classicas de storytelling e consegue criar historias com personagens, conflitos, arcos emocionais e reviravoltas. Para gerar impacto, o mais importante e deixar claro o conflito central e a transformacao do protagonista."
  ),
  fillStep(
    "Preencha a lacuna - Crie sua historia!",
    "Estruture uma narrativa curta com conflito e transformacao.",
    "\"Crie uma historia curta sobre ___. O protagonista e ___. O conflito central e ___. Use a estrutura ___. O tom deve ser ___ e a ultima frase deve deixar o leitor com uma sensacao de ___.\"",
    [
      "uma pessoa que descobre um talento escondido aos 40 anos",
      "alguem comum com uma vida previsivel",
      "o medo de comecar tarde demais",
      "Problema, Virada, Transformacao",
      "inspirador e humano",
      "que tudo ainda e possivel"
    ],
    [
      "uma pessoa que descobre um talento escondido aos 40 anos",
      "alguem comum com uma vida previsivel",
      "o medo de comecar tarde demais",
      "Problema, Virada, Transformacao",
      "inspirador e humano",
      "que tudo ainda e possivel",
      "um robo sem emocao",
      "lista de topicos",
      "frio e distante"
    ],
    "Quando voce define protagonista, conflito, estrutura e efeito final, o Claude consegue construir uma narrativa mais marcante."
  ),
  textStep(
    "Saindo do Lugar Comum",
    "Por padrao, o Claude tende ao centro estatistico, ao que e mais comum e esperado. Para sair do generico, voce precisa pedir explicitamente perspectivas diferentes e inesperadas. Uma forma forte de fazer isso e inverter a premissa principal do tema e criar a partir dessa ruptura."
  ),
  fillStep(
    "Preencha a lacuna - Force a originalidade!",
    "Empurre o prompt para um angulo menos previsivel.",
    "\"Quero uma abordagem ___ para ___. Evite os cliches mais comuns sobre esse tema. Pense em um angulo que ___ nao consideraria imediatamente e que seja ao mesmo tempo ___ e ___.\"",
    [
      "contraintuitiva e surpreendente",
      "uma campanha sobre coragem",
      "a maioria das pessoas",
      "autentico",
      "memoravel"
    ],
    [
      "contraintuitiva e surpreendente",
      "uma campanha sobre coragem",
      "a maioria das pessoas",
      "autentico",
      "memoravel",
      "padrao e segura",
      "um manual tecnico",
      "burocratico"
    ],
    "Originalidade raramente aparece por acidente. Quando voce pede ruptura explicita, o Claude se afasta dos cliches."
  ),
  textStep(
    "Criando Roteiros e Conteudo em Video",
    "Para criadores de conteudo, o Claude funciona como um roteirista sob demanda. Ele organiza roteiros com gancho, desenvolvimento e CTA, adaptando a estrutura ao tempo e a plataforma."
  ),
  fillStep(
    "Preencha a lacuna - Roteirize seu conteudo!",
    "Monte um prompt para um video curto com estrutura clara.",
    "\"Crie um roteiro de ___ para ___ sobre ___. Estrutura: gancho nos primeiros ___ segundos que gere ___, desenvolvimento em ___ blocos rapidos e CTA final pedindo ___. Tom: ___.\"",
    [
      "60 segundos",
      "Reels",
      "um erro que a maioria das pessoas comete ao tentar criar habitos",
      "5",
      "curiosidade imediata",
      "3",
      "que o seguidor salve o video",
      "direto e proximo"
    ],
    [
      "60 segundos",
      "Reels",
      "um erro que a maioria das pessoas comete ao tentar criar habitos",
      "5",
      "curiosidade imediata",
      "3",
      "que o seguidor salve o video",
      "direto e proximo",
      "podcast de 2 horas",
      "nenhuma emocao"
    ],
    "Definir formato, tempo, ritmo e CTA ajuda o Claude a entregar um roteiro pronto para uso, nao apenas uma ideia vaga."
  ),
  textStep(
    "Superando o Bloqueio Criativo",
    "Todo criativo conhece o bloqueio: aquele momento em que nenhuma ideia parece boa o suficiente. Pedir perguntas provocativas costuma ser mais eficaz do que pedir solucoes diretas, porque isso ativa seu proprio raciocinio criativo e torna o resultado mais autentico."
  ),
  fillStep(
    "Preencha a lacuna - Use o Claude para destravar!",
    "Peca provocacoes que mudem seu ponto de vista.",
    "\"Estou travado em ___. Ja tentei ___ e nada parece ___. Me faca ___ perguntas provocativas que me ajudem a enxergar esse projeto de um ___ completamente diferente.\"",
    [
      "um projeto de identidade visual para um cliente",
      "varias abordagens",
      "suficientemente original",
      "5",
      "angulo"
    ],
    [
      "um projeto de identidade visual para um cliente",
      "varias abordagens",
      "suficientemente original",
      "5",
      "angulo",
      "uma planilha financeira",
      "perfeito demais",
      "50",
      "manual"
    ],
    "Perguntas bem escolhidas ajudam voce a sair da repeticao e enxergar possibilidades que ainda nao tinha considerado."
  ),
  textStep(
    "Refinando e Evoluindo uma Ideia",
    "A primeira versao de qualquer criacao raramente e a melhor. O maior erro ao usar o Claude para criatividade e aceitar o primeiro resultado sem refinar. A criatividade real aparece no processo iterativo."
  ),
  fillStep(
    "Preencha a lacuna - Eleve sua criacao!",
    "Peca analise critica e reescrita com base no que ainda falta.",
    "\"Aqui esta minha ___: [cole aqui]. O que esta funcionando bem, o que pode ser ___ e o que esta faltando para ela ter mais ___? Depois reescreva incorporando essas melhorias, mantendo minha ___ original.\"",
    [
      "ideia de campanha",
      "melhorado",
      "impacto e originalidade",
      "essencia criativa"
    ],
    [
      "ideia de campanha",
      "melhorado",
      "impacto e originalidade",
      "essencia criativa",
      "lista de compras",
      "apagado",
      "burocracia"
    ],
    "Pedir avaliacao critica e reescrita preservando a essencia ajuda o Claude a evoluir a ideia sem descaracterizar o que ja funciona."
  ),
  textStep(
    "Conclusao",
    "O Claude nao cria por voce, ele cria com voce. Quanto mais intencao, referencia e direcao voce traz, mais ele consegue surpreender, provocar e expandir suas possibilidades criativas. Use-o para sair do obvio, testar angulos inesperados, superar bloqueios e refinar ate chegar em algo que realmente represente o que voce queria expressar.\n\nLicao concluida."
  ),
] as const;

export const CLAUDE_MODULE_5_STEPS_EN = [
  textStep(
    "Claude for Creativity - Limitless Ideas",
    "Welcome back! In this lesson, you will discover how to use Claude as a creative partner to generate original ideas, write with personality, build stories, shape scripts, and create content that truly stands out."
  ),
  textStep(
    "Claude as a Creative Partner",
    "Creativity with AI is not about delegating, it is about expanding. Claude does not replace your creative voice. It amplifies, suggests, challenges, and opens paths you might not see on your own. The key is to treat the conversation like a collaboration, not an order. You direct, Claude generates, you refine, Claude improves."
  ),
  textStep(
    "Generating Original Ideas",
    "Claude is a generator of possibilities. When you get stuck on a creative project, it can open dozens of directions in seconds, from the obvious to the bold and unexpected. Once you have the list, select the ones that resonate most and ask Claude to develop each one further."
  ),
  fillStep(
    "Fill in the blank - Ask for idea diversity!",
    "Build a prompt that creates real variation in the results.",
    "\"Generate ___ ideas for ___. Vary the angles: include ___, ___, ___, and completely off-pattern ideas. Do not self-censor. Then highlight the ___ with the strongest creative potential and explain why.\"",
    [
      "15",
      "the name of a sustainable fashion brand",
      "obvious",
      "poetic",
      "provocative",
      "3"
    ],
    [
      "15",
      "the name of a sustainable fashion brand",
      "obvious",
      "poetic",
      "provocative",
      "3",
      "1",
      "a cake recipe",
      "bureaucratic",
      "100"
    ],
    "When you explicitly ask for variety, Claude moves away from the predictable and explores more creative directions."
  ),
  textStep(
    "Writing with Personality",
    "Claude can adapt its writing style to the tone, voice, and world you want to create. The more references you provide, the closer the result gets to your identity. It recognizes the aesthetic patterns you value and uses them as a guide to produce something original inside that universe."
  ),
  fillStep(
    "Fill in the blank - Define your creative voice!",
    "Describe style, rhythm, and emotional effect for the writing.",
    "\"Write a ___ about ___ with the following style traits: ___ tone, ___ sentences, use ___ and avoid ___. The feeling the text should create in the reader is ___.\"",
    [
      "podcast opening text",
      "human behavior and psychology",
      "curious and provocative",
      "short and direct",
      "rhetorical questions",
      "long academic explanations",
      "that they are about to discover something that will change their perspective"
    ],
    [
      "podcast opening text",
      "human behavior and psychology",
      "curious and provocative",
      "short and direct",
      "rhetorical questions",
      "long academic explanations",
      "that they are about to discover something that will change their perspective",
      "technical report",
      "bureaucratic phrases",
      "slapstick humor"
    ],
    "The more clearly you define the identity of the text, the more Claude can write with real personality."
  ),
  textStep(
    "Creating Stories and Narratives",
    "Claude is a strong narrator. It understands classic storytelling structures and can build stories with characters, conflict, emotional arcs, and twists. To create impact, the most important thing is to make the central conflict and the protagonist's transformation clear."
  ),
  fillStep(
    "Fill in the blank - Create your story!",
    "Structure a short narrative with conflict and transformation.",
    "\"Create a short story about ___. The protagonist is ___. The central conflict is ___. Use the ___ structure. The tone should be ___ and the final sentence should leave the reader with a feeling that ___.\"",
    [
      "a person who discovers a hidden talent at 40",
      "an ordinary person with a predictable life",
      "the fear of starting too late",
      "Problem, Turning Point, Transformation",
      "inspiring and human",
      "everything is still possible"
    ],
    [
      "a person who discovers a hidden talent at 40",
      "an ordinary person with a predictable life",
      "the fear of starting too late",
      "Problem, Turning Point, Transformation",
      "inspiring and human",
      "everything is still possible",
      "an emotionless robot",
      "bullet list",
      "cold and distant"
    ],
    "When you define protagonist, conflict, structure, and emotional effect, Claude can build a more memorable story."
  ),
  textStep(
    "Getting Out of the Ordinary",
    "By default, Claude tends toward the statistical center, the most common and expected answer. To escape generic output, you need to ask explicitly for unusual and unexpected perspectives. One strong move is to invert the main premise and create from that inversion."
  ),
  fillStep(
    "Fill in the blank - Force originality!",
    "Push the prompt toward a less predictable angle.",
    "\"I want a ___ approach for ___. Avoid the most common cliches around this theme. Think of an angle that ___ would not immediately consider and that feels both ___ and ___.\"",
    [
      "counterintuitive and surprising",
      "a campaign about courage",
      "most people",
      "authentic",
      "memorable"
    ],
    [
      "counterintuitive and surprising",
      "a campaign about courage",
      "most people",
      "authentic",
      "memorable",
      "safe and standard",
      "a technical manual",
      "bureaucratic"
    ],
    "Originality rarely appears by accident. When you explicitly ask for rupture, Claude moves away from cliches."
  ),
  textStep(
    "Creating Scripts and Video Content",
    "For content creators, Claude works like an on-demand scriptwriter. It organizes scripts with a hook, development, and CTA, adapting the structure to the time limit and the platform."
  ),
  fillStep(
    "Fill in the blank - Script your content!",
    "Build a prompt for a short-form video with a clear structure.",
    "\"Create a ___ script for ___ about ___. Structure: a hook in the first ___ seconds that creates ___, development in ___ quick blocks, and a final CTA asking ___. Tone: ___.\"",
    [
      "60-second",
      "Reels",
      "a mistake most people make when trying to build habits",
      "5",
      "immediate curiosity",
      "3",
      "the viewer to save the video",
      "direct and approachable"
    ],
    [
      "60-second",
      "Reels",
      "a mistake most people make when trying to build habits",
      "5",
      "immediate curiosity",
      "3",
      "the viewer to save the video",
      "direct and approachable",
      "2-hour",
      "emotionless"
    ],
    "When you define format, timing, rhythm, and CTA, Claude can deliver a ready-to-use script instead of a vague idea."
  ),
  textStep(
    "Overcoming Creative Block",
    "Every creative person knows the block, that moment when no idea feels good enough. Asking for provocative questions is often more effective than asking for direct solutions, because it activates your own reasoning and makes the result feel more authentic."
  ),
  fillStep(
    "Fill in the blank - Use Claude to get unstuck!",
    "Ask for provocations that shift your perspective.",
    "\"I am stuck on ___. I have already tried ___ and nothing feels ___. Ask me ___ provocative questions that help me see this project from a completely different ___.\"",
    [
      "a visual identity project for a client",
      "several approaches",
      "original enough",
      "5",
      "angle"
    ],
    [
      "a visual identity project for a client",
      "several approaches",
      "original enough",
      "5",
      "angle",
      "a financial spreadsheet",
      "perfect already",
      "50",
      "manual"
    ],
    "Well-chosen questions help you break repetition and notice possibilities you had not considered yet."
  ),
  textStep(
    "Refining and Evolving an Idea",
    "The first version of any creation is rarely the best. The biggest mistake when using Claude for creativity is accepting the first result without refinement. Real creativity appears in the iterative process."
  ),
  fillStep(
    "Fill in the blank - Elevate your creation!",
    "Ask for critical feedback and a stronger rewrite.",
    "\"Here is my ___: [paste here]. What is working well, what could be ___, and what is missing for it to have more ___? Then rewrite it with those improvements while keeping my original ___.\"",
    [
      "campaign idea",
      "improved",
      "impact and originality",
      "creative essence"
    ],
    [
      "campaign idea",
      "improved",
      "impact and originality",
      "creative essence",
      "shopping list",
      "deleted",
      "bureaucracy"
    ],
    "Asking for critical review plus a rewrite that preserves the core idea helps Claude improve the work without flattening it."
  ),
  textStep(
    "Conclusion",
    "Claude does not create instead of you, it creates with you. The more intention, reference, and direction you bring, the more it can surprise, challenge, and expand your creative possibilities. Use it to move beyond the obvious, test unexpected angles, overcome blocks, and refine until you arrive at something that truly represents what you wanted to express.\n\nLesson complete."
  ),
] as const;

export const CLAUDE_MODULE_5_STEPS_ES = [
  textStep(
    "Claude para Creatividad - Ideas Sin Limite",
    "Bienvenido de vuelta. En esta leccion descubriras como usar Claude como socio creativo para generar ideas originales, escribir textos con personalidad, crear historias, guiones y contenidos que realmente destaquen."
  ),
  textStep(
    "Claude como Socio Creativo",
    "La creatividad con IA no trata de delegar, sino de expandir. Claude no reemplaza tu voz creativa. La amplifica, sugiere, provoca y abre caminos que tal vez no verias por tu cuenta. La clave esta en tratar la conversacion como una colaboracion, no como un encargo. Tu diriges, Claude genera, tu refinas, Claude mejora."
  ),
  textStep(
    "Generando Ideas Originales",
    "Claude es un generador de posibilidades. Cuando te atascas en un proyecto creativo, puede abrir decenas de caminos en segundos, desde los mas obvios hasta los mas audaces e inesperados. Luego puedes elegir los que mas resonaron y pedirle que desarrolle cada uno."
  ),
  fillStep(
    "Completa el espacio - Pide ideas con diversidad!",
    "Construye un prompt que fuerce variedad real de ideas.",
    "\"Genera ___ ideas para ___. Varia los angulos: incluye ideas ___, ___, ___ y completamente fuera de lo comun. No te autocensures. Despues destaca las ___ con mayor potencial creativo y explica por que.\"",
    [
      "15",
      "el nombre de una marca de moda sostenible",
      "obvias",
      "poeticas",
      "provocadoras",
      "3"
    ],
    [
      "15",
      "el nombre de una marca de moda sostenible",
      "obvias",
      "poeticas",
      "provocadoras",
      "3",
      "1",
      "una receta de pastel",
      "burocraticas",
      "100"
    ],
    "Cuando pides variedad explicita, Claude se aleja de lo predecible y explora caminos mas creativos."
  ),
  textStep(
    "Escribiendo con Personalidad",
    "Claude puede adaptar su estilo de escritura al tono, la voz y el universo que quieres crear. Cuantas mas referencias le das, mas cerca estara el resultado de tu identidad. Reconoce los patrones esteticos que valoras y los usa como guia para crear algo original dentro de ese mundo."
  ),
  fillStep(
    "Completa el espacio - Define tu voz creativa!",
    "Describe estilo, ritmo y sensacion buscada para el texto.",
    "\"Escribe un ___ sobre ___ con las siguientes caracteristicas de estilo: tono ___, frases ___, usa ___ y evita ___. La sensacion que el texto debe transmitir al lector es ___.\"",
    [
      "texto de apertura para un podcast",
      "comportamiento humano y psicologia",
      "curioso y provocador",
      "cortas y directas",
      "preguntas retoricas",
      "explicaciones largas y academicas",
      "que esta a punto de descubrir algo que cambiara su perspectiva"
    ],
    [
      "texto de apertura para un podcast",
      "comportamiento humano y psicologia",
      "curioso y provocador",
      "cortas y directas",
      "preguntas retoricas",
      "explicaciones largas y academicas",
      "que esta a punto de descubrir algo que cambiara su perspectiva",
      "informe tecnico",
      "frases burocraticas",
      "humor absurdo"
    ],
    "Cuanto mas defines la identidad del texto, mas puede Claude escribir con personalidad real."
  ),
  textStep(
    "Creando Historias y Narrativas",
    "Claude es un narrador potente. Domina estructuras clasicas de storytelling y puede crear historias con personajes, conflictos, arcos emocionales y giros. Para generar impacto, lo mas importante es dejar claro el conflicto central y la transformacion del protagonista."
  ),
  fillStep(
    "Completa el espacio - Crea tu historia!",
    "Estructura una narrativa breve con conflicto y transformacion.",
    "\"Crea una historia corta sobre ___. El protagonista es ___. El conflicto central es ___. Usa la estructura ___. El tono debe ser ___ y la ultima frase debe dejar al lector con la sensacion de que ___.\"",
    [
      "una persona que descubre un talento oculto a los 40 anos",
      "alguien comun con una vida predecible",
      "el miedo a empezar demasiado tarde",
      "Problema, Giro, Transformacion",
      "inspirador y humano",
      "todo sigue siendo posible"
    ],
    [
      "una persona que descubre un talento oculto a los 40 anos",
      "alguien comun con una vida predecible",
      "el miedo a empezar demasiado tarde",
      "Problema, Giro, Transformacion",
      "inspirador y humano",
      "todo sigue siendo posible",
      "un robot sin emociones",
      "lista de puntos",
      "frio y distante"
    ],
    "Cuando defines protagonista, conflicto, estructura y efecto final, Claude puede construir una historia mas memorable."
  ),
  textStep(
    "Saliendo de lo Comun",
    "Por defecto, Claude tiende al centro estadistico, a lo mas comun y esperado. Para salir de lo generico, debes pedir de forma explicita perspectivas distintas e inesperadas. Una manera poderosa de hacerlo es invertir la premisa central y crear a partir de esa ruptura."
  ),
  fillStep(
    "Completa el espacio - Fuerza la originalidad!",
    "Empuja el prompt hacia un angulo menos previsible.",
    "\"Quiero un enfoque ___ para ___. Evita los cliches mas comunes sobre este tema. Piensa en un angulo que ___ no consideraria de inmediato y que sea al mismo tiempo ___ y ___.\"",
    [
      "contraintuitivo y sorprendente",
      "una campana sobre el coraje",
      "la mayoria de las personas",
      "autentico",
      "memorable"
    ],
    [
      "contraintuitivo y sorprendente",
      "una campana sobre el coraje",
      "la mayoria de las personas",
      "autentico",
      "memorable",
      "seguro y estandar",
      "un manual tecnico",
      "burocratico"
    ],
    "La originalidad rara vez aparece por accidente. Cuando pides ruptura explicita, Claude se aleja de los cliches."
  ),
  textStep(
    "Creando Guiones y Contenido en Video",
    "Para creadores de contenido, Claude funciona como un guionista bajo demanda. Organiza guiones con gancho, desarrollo y CTA, adaptando la estructura al tiempo y a la plataforma."
  ),
  fillStep(
    "Completa el espacio - Guioniza tu contenido!",
    "Construye un prompt para un video corto con estructura clara.",
    "\"Crea un guion de ___ para ___ sobre ___. Estructura: gancho en los primeros ___ segundos que genere ___, desarrollo en ___ bloques rapidos y CTA final pidiendo ___. Tono: ___.\"",
    [
      "60 segundos",
      "Reels",
      "un error que la mayoria de las personas comete al intentar crear habitos",
      "5",
      "curiosidad inmediata",
      "3",
      "que el seguidor guarde el video",
      "directo y cercano"
    ],
    [
      "60 segundos",
      "Reels",
      "un error que la mayoria de las personas comete al intentar crear habitos",
      "5",
      "curiosidad inmediata",
      "3",
      "que el seguidor guarde el video",
      "directo y cercano",
      "podcast de 2 horas",
      "sin emocion"
    ],
    "Definir formato, tiempo, ritmo y CTA ayuda a Claude a entregar un guion listo para usar y no solo una idea suelta."
  ),
  textStep(
    "Superando el Bloqueo Creativo",
    "Toda persona creativa conoce el bloqueo, ese momento en que ninguna idea parece suficientemente buena. Pedir preguntas provocadoras suele ser mas efectivo que pedir soluciones directas, porque activa tu propio razonamiento y vuelve el resultado mas autentico."
  ),
  fillStep(
    "Completa el espacio - Usa Claude para destrabarte!",
    "Pide provocaciones que cambien tu punto de vista.",
    "\"Estoy bloqueado en ___. Ya probe ___ y nada parece ___. Hazme ___ preguntas provocadoras que me ayuden a ver este proyecto desde un ___ completamente diferente.\"",
    [
      "un proyecto de identidad visual para un cliente",
      "varios enfoques",
      "suficientemente original",
      "5",
      "angulo"
    ],
    [
      "un proyecto de identidad visual para un cliente",
      "varios enfoques",
      "suficientemente original",
      "5",
      "angulo",
      "una hoja de calculo financiera",
      "perfecto ya",
      "50",
      "manual"
    ],
    "Las preguntas bien elegidas te ayudan a romper la repeticion y detectar posibilidades que no estabas viendo."
  ),
  textStep(
    "Refinando y Evolucionando una Idea",
    "La primera version de cualquier creacion rara vez es la mejor. El mayor error al usar Claude para creatividad es aceptar el primer resultado sin refinarlo. La creatividad real aparece en el proceso iterativo."
  ),
  fillStep(
    "Completa el espacio - Eleva tu creacion!",
    "Pide critica y reescritura con una direccion mas fuerte.",
    "\"Aqui esta mi ___: [pega aqui]. Que esta funcionando bien, que podria ser ___ y que le falta para tener mas ___? Despues reescribelo incorporando esas mejoras, manteniendo mi ___ original.\"",
    [
      "idea de campana",
      "mejorado",
      "impacto y originalidad",
      "esencia creativa"
    ],
    [
      "idea de campana",
      "mejorado",
      "impacto y originalidad",
      "esencia creativa",
      "lista de compras",
      "borrado",
      "burocracia"
    ],
    "Pedir revision critica y reescritura preservando la esencia ayuda a Claude a mejorar la idea sin quitarle identidad."
  ),
  textStep(
    "Conclusion",
    "Claude no crea por ti, crea contigo. Cuanta mas intencion, referencia y direccion aportes, mas podra sorprender, provocar y expandir tus posibilidades creativas. Usalo para salir de lo obvio, probar angulos inesperados, superar bloqueos y refinar hasta llegar a algo que realmente represente lo que querias expresar.\n\nLeccion completada."
  ),
] as const;

export const CLAUDE_MODULE_5_STEPS_FR = [
  textStep(
    "Claude pour la Creativite - Des Idees Sans Limite",
    "Bon retour. Dans cette lecon, vous allez decouvrir comment utiliser Claude comme partenaire creatif pour generer des idees originales, ecrire avec de la personnalite, creer des histoires, des scripts et des contenus qui se distinguent vraiment."
  ),
  textStep(
    "Claude comme Partenaire Creatif",
    "La creativite avec l'IA ne consiste pas a deleguer, mais a elargir. Claude ne remplace pas votre voix creative. Il l'amplifie, suggere, provoque et ouvre des pistes que vous ne verriez peut-etre pas seul. La cle consiste a traiter la conversation comme une collaboration, pas comme une commande. Vous dirigez, Claude genere, vous affinez, Claude ameliore."
  ),
  textStep(
    "Generer des Idees Originales",
    "Claude est un generateur de possibilites. Quand vous bloquez sur un projet creatif, il peut ouvrir des dizaines de pistes en quelques secondes, des plus evidentes aux plus audacieuses et inattendues. Ensuite, vous pouvez choisir celles qui vous parlent le plus et lui demander de les developper."
  ),
  fillStep(
    "Remplissez le vide - Demandez des idees variees !",
    "Construisez un prompt qui force une vraie diversite d'idees.",
    "\"Genere ___ idees pour ___. Varie les angles : inclus des idees ___, ___, ___ et completement hors des standards. Ne t'autocensure pas. Ensuite, souligne les ___ au plus fort potentiel creatif et explique pourquoi.\"",
    [
      "15",
      "le nom d'une marque de mode durable",
      "evidentes",
      "poetiques",
      "provocatrices",
      "3"
    ],
    [
      "15",
      "le nom d'une marque de mode durable",
      "evidentes",
      "poetiques",
      "provocatrices",
      "3",
      "1",
      "une recette de gateau",
      "bureaucratiques",
      "100"
    ],
    "Quand vous demandez explicitement de la variete, Claude s'eloigne du previsible et explore des pistes plus creatives."
  ),
  textStep(
    "Ecrire avec de la Personnalite",
    "Claude peut adapter son style d'ecriture au ton, a la voix et a l'univers que vous voulez creer. Plus vous lui donnez de references, plus le resultat se rapproche de votre identite. Il reconnait les codes esthetiques que vous valorisez et les utilise comme guide pour produire quelque chose d'original dans cet univers."
  ),
  fillStep(
    "Remplissez le vide - Definissez votre voix creative !",
    "Decrivez le style, le rythme et l'effet recherche.",
    "\"Ecris un ___ sur ___ avec les caracteristiques de style suivantes : ton ___, phrases ___, utilise ___ et evite ___. La sensation que le texte doit transmettre au lecteur est ___.\"",
    [
      "texte d'ouverture pour un podcast",
      "le comportement humain et la psychologie",
      "curieux et provocateur",
      "courtes et directes",
      "les questions rhetoriques",
      "les explications longues et academiques",
      "qu'il est sur le point de decouvrir quelque chose qui va changer sa perspective"
    ],
    [
      "texte d'ouverture pour un podcast",
      "le comportement humain et la psychologie",
      "curieux et provocateur",
      "courtes et directes",
      "les questions rhetoriques",
      "les explications longues et academiques",
      "qu'il est sur le point de decouvrir quelque chose qui va changer sa perspective",
      "rapport technique",
      "phrases bureaucratiques",
      "humour burlesque"
    ],
    "Plus vous precisez l'identite du texte, plus Claude peut ecrire avec une vraie personnalite."
  ),
  textStep(
    "Creer des Histoires et des Narrations",
    "Claude est un narrateur solide. Il maitrise les structures classiques du storytelling et peut creer des histoires avec personnages, conflits, arcs emotionnels et rebondissements. Pour produire de l'impact, le plus important est de clarifier le conflit central et la transformation du protagoniste."
  ),
  fillStep(
    "Remplissez le vide - Creez votre histoire !",
    "Structurez un recit court avec conflit et transformation.",
    "\"Cree une histoire courte sur ___. Le protagoniste est ___. Le conflit central est ___. Utilise la structure ___. Le ton doit etre ___ et la derniere phrase doit laisser au lecteur la sensation que ___.\"",
    [
      "une personne qui decouvre un talent cache a 40 ans",
      "quelqu'un d'ordinaire avec une vie previsible",
      "la peur de commencer trop tard",
      "Probleme, Bascule, Transformation",
      "inspirant et humain",
      "tout reste encore possible"
    ],
    [
      "une personne qui decouvre un talent cache a 40 ans",
      "quelqu'un d'ordinaire avec une vie previsible",
      "la peur de commencer trop tard",
      "Probleme, Bascule, Transformation",
      "inspirant et humain",
      "tout reste encore possible",
      "un robot sans emotion",
      "liste a puces",
      "froid et distant"
    ],
    "Quand vous definissez le protagoniste, le conflit, la structure et l'effet final, Claude peut construire une histoire plus marquante."
  ),
  textStep(
    "Sortir du Conventionnel",
    "Par defaut, Claude tend vers le centre statistique, donc vers la reponse la plus commune et la plus attendue. Pour sortir du generique, vous devez demander explicitement des perspectives inattendues. Une methode puissante consiste a inverser la premisse centrale et a creer a partir de cette rupture."
  ),
  fillStep(
    "Remplissez le vide - Forcez l'originalite !",
    "Poussez le prompt vers un angle moins previsible.",
    "\"Je veux une approche ___ pour ___. Evite les cliches les plus courants sur ce theme. Pense a un angle que ___ ne considererait pas immediatement et qui soit a la fois ___ et ___.\"",
    [
      "contre-intuitive et surprenante",
      "une campagne sur le courage",
      "la plupart des gens",
      "authentique",
      "memorable"
    ],
    [
      "contre-intuitive et surprenante",
      "une campagne sur le courage",
      "la plupart des gens",
      "authentique",
      "memorable",
      "sereine et standard",
      "un manuel technique",
      "bureaucratique"
    ],
    "L'originalite apparait rarement par hasard. Quand vous demandez explicitement une rupture, Claude s'eloigne des cliches."
  ),
  textStep(
    "Creer des Scripts et du Contenu Video",
    "Pour les createurs de contenu, Claude fonctionne comme un scenariste a la demande. Il organise des scripts avec accroche, developpement et CTA, en adaptant la structure a la duree et a la plateforme."
  ),
  fillStep(
    "Remplissez le vide - Scenario de votre contenu !",
    "Construisez un prompt pour une video courte avec une structure claire.",
    "\"Cree un script de ___ pour ___ sur ___. Structure : accroche dans les ___ premieres secondes qui cree ___, developpement en ___ blocs rapides et CTA final demandant ___. Ton : ___.\"",
    [
      "60 secondes",
      "Reels",
      "une erreur que la plupart des gens commettent en essayant de creer des habitudes",
      "5",
      "une curiosite immediate",
      "3",
      "que l'abonne enregistre la video",
      "direct et proche"
    ],
    [
      "60 secondes",
      "Reels",
      "une erreur que la plupart des gens commettent en essayant de creer des habitudes",
      "5",
      "une curiosite immediate",
      "3",
      "que l'abonne enregistre la video",
      "direct et proche",
      "podcast de 2 heures",
      "sans emotion"
    ],
    "Quand vous fixez le format, le temps, le rythme et le CTA, Claude peut livrer un script exploitable, pas seulement une idee vague."
  ),
  textStep(
    "Surmonter le Blocage Creatif",
    "Toute personne creative connait ce blocage, ce moment ou aucune idee ne semble assez bonne. Demander des questions provocatrices est souvent plus efficace que demander des solutions directes, car cela active votre propre raisonnement et rend le resultat plus authentique."
  ),
  fillStep(
    "Remplissez le vide - Utilisez Claude pour vous debloquer !",
    "Demandez des provocations qui changent votre perspective.",
    "\"Je suis bloque sur ___. J'ai deja essaye ___ et rien ne parait ___. Pose-moi ___ questions provocatrices qui m'aident a voir ce projet sous un ___ completement different.\"",
    [
      "un projet d'identite visuelle pour un client",
      "plusieurs approches",
      "assez original",
      "5",
      "angle"
    ],
    [
      "un projet d'identite visuelle pour un client",
      "plusieurs approches",
      "assez original",
      "5",
      "angle",
      "un tableau financier",
      "parfait deja",
      "50",
      "manuel"
    ],
    "Des questions bien choisies vous aident a sortir de la repetition et a voir des possibilites que vous n'aviez pas encore remarquees."
  ),
  textStep(
    "Affiner et Faire Evoluer une Idee",
    "La premiere version d'une creation est rarement la meilleure. La plus grande erreur quand on utilise Claude pour la creativite est d'accepter le premier resultat sans le retravailler. La vraie creativite apparait dans le processus iteratif."
  ),
  fillStep(
    "Remplissez le vide - Elevez votre creation !",
    "Demandez une critique et une reecriture plus fortes.",
    "\"Voici mon ___ : [collez ici]. Qu'est-ce qui fonctionne bien, qu'est-ce qui pourrait etre ___ et qu'est-ce qui manque pour lui donner plus de ___ ? Ensuite, reecris-le en integrant ces ameliorations tout en gardant mon ___ d'origine.\"",
    [
      "idee de campagne",
      "ameliore",
      "impact et originalite",
      "essence creative"
    ],
    [
      "idee de campagne",
      "ameliore",
      "impact et originalite",
      "essence creative",
      "liste de courses",
      "supprime",
      "bureaucratie"
    ],
    "Demander une revision critique et une reecriture qui preserve l'essence permet a Claude d'ameliorer l'idee sans l'aplatir."
  ),
  textStep(
    "Conclusion",
    "Claude ne cree pas a votre place, il cree avec vous. Plus vous apportez d'intention, de references et de direction, plus il peut surprendre, provoquer et elargir vos possibilites creatives. Utilisez-le pour sortir de l'evidence, tester des angles inattendus, depasser les blocages et affiner jusqu'a obtenir quelque chose qui represente vraiment ce que vous vouliez exprimer.\n\nLecon terminee."
  ),
] as const;
