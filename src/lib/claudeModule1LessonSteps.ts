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

export const CLAUDE_MODULE_1_STEPS_PT = [
  textStep(
    "Claude como Seu Assistente Inteligente",
    "Bem-vindo a esta licao. Aqui voce vai descobrir como usar o Claude, o assistente de IA da Anthropic, para turbinar sua produtividade, criatividade e aprendizado. O Claude tem caracteristicas unicas que o diferenciam de outras IAs, e entender essas diferencas muda a forma como voce trabalha."
  ),
  textStep(
    "O que e o Claude?",
    "O Claude e um assistente de inteligencia artificial desenvolvido pela Anthropic. Ele foi criado com foco em ser util, honesto e seguro. Isso significa que ele nao apenas responde, mas raciocina junto com voce, questiona premissas quando necessario e admite quando nao tem certeza sobre algo."
  ),
  quizStep(
    "Diferencial do Claude",
    "O que diferencia o Claude de outros assistentes de IA?",
    [
      "Ele foi desenvolvido com foco em raciocinio aprofundado, honestidade e respostas contextualizadas.",
      "Ele memoriza todas as suas conversas anteriores automaticamente.",
      "Ele acessa a internet em tempo real sem nenhuma configuracao.",
      "Ele nunca comete erros em nenhuma circunstancia."
    ],
    0,
    "O principal diferencial do Claude esta na combinacao entre profundidade de raciocinio, honestidade sobre limites e respostas contextualizadas."
  ),
  textStep(
    "Como o Claude Pensa",
    "Diferente de uma busca no Google, que retorna links, o Claude le sua mensagem inteira, interpreta o contexto e constroi uma resposta coerente do inicio ao fim. Quanto mais contexto voce fornece, mais precisa e util tende a ser a resposta."
  ),
  fillStep(
    "Preencha a lacuna - Ative o melhor do Claude!",
    "Monte um prompt completo para pedir ajuda com clareza e contexto.",
    '"Voce e um ___ com experiencia em ___. Preciso de ajuda para ___. Meu nivel de conhecimento no assunto e ___ e o objetivo final e ___."',
    [
      "especialista em financas pessoais",
      "investimentos para iniciantes",
      "montar minha primeira carteira de investimentos",
      "basico",
      "ter uma reserva de emergencia solida em 12 meses"
    ],
    [
      "especialista em financas pessoais",
      "investimentos para iniciantes",
      "montar minha primeira carteira de investimentos",
      "basico",
      "ter uma reserva de emergencia solida em 12 meses",
      "advogado criminal",
      "nivel avancado",
      "esquecer meu objetivo"
    ],
    "Quando voce define papel, contexto, tarefa, nivel atual e objetivo final, o Claude consegue responder com muito mais precisao."
  ),
  textStep(
    "O que o Claude Faz Muito Bem",
    "O Claude se destaca em tarefas que exigem raciocinio, analise e escrita de qualidade. Ele analisa textos, raciocina sobre problemas complexos, escreve com qualidade e explica conceitos em profundidade. Ele nao gera imagens, nao executa tarefas em outros aplicativos automaticamente e nao substitui a opiniao de um especialista humano, mas dentro do seu territorio e uma das ferramentas mais poderosas disponiveis."
  ),
  textStep(
    "Conversando com o Claude de Forma Estrategica",
    "O Claude responde melhor quando voce trata a conversa como um dialogo, nao como uma busca. Voce pode fazer perguntas de acompanhamento, pedir refinamentos e construir a resposta ideal ao longo de varios turnos. Se a primeira resposta nao foi exatamente o que voce precisava, nao comece do zero: refine."
  ),
  fillStep(
    "Preencha a lacuna - Refine sua conversa!",
    "Refine a resposta sem perder o contexto da conversa.",
    '"Gostei da resposta, mas quero que voce ___ a segunda parte, use um tom mais ___ e adicione ___ praticos para alguem que esta comecando do zero."',
    ["aprofunde", "acessivel", "exemplos"],
    ["aprofunde", "acessivel", "exemplos", "ignore", "tecnico demais", "graficos"],
    "Refinar a conversa aproveita o contexto acumulado e leva a uma resposta mais alinhada ao que voce realmente precisa."
  ),
  textStep(
    "Claude para Analise e Raciocinio",
    "Uma das maiores forcas do Claude e a capacidade de analisar situacoes complexas, considerar multiplos angulos e apresentar uma visao equilibrada sem esconder as partes dificeis."
  ),
  fillStep(
    "Preencha a lacuna - Peca uma analise completa!",
    "Monte um prompt para receber uma avaliacao equilibrada.",
    '"Analise a situacao abaixo considerando ___ diferentes perspectivas. Para cada uma, apresente os ___ e os ___. Ao final, de sua recomendacao mais ___ com base nos fatos apresentados. [Descreva a situacao]"',
    ["3", "pontos positivos", "pontos negativos", "equilibrada"],
    ["3", "pontos positivos", "pontos negativos", "equilibrada", "2", "argumentos vagos", "certeza absoluta"],
    "Esse tipo de estrutura ajuda o Claude a comparar cenarios, mapear riscos e entregar uma recomendacao mais madura."
  ),
  textStep(
    "Claude para Escrita e Revisao de Textos",
    "O Claude escreve com naturalidade, adapta o tom ao contexto e consegue imitar diferentes estilos de escrita. Mais do que isso, ele explica o raciocinio por tras de cada escolha quando voce pede."
  ),
  quizStep(
    "Prompt de escrita mais forte",
    "Qual prompt aproveita melhor a capacidade de escrita do Claude?",
    [
      "\"Escreva um texto sobre sustentabilidade\"",
      "\"Faca um texto bom e criativo\"",
      "\"Reescreva o texto abaixo mantendo as ideias originais, mas com um tom mais conversacional e direto. Depois explique as principais mudancas que fez e por que. [Cole o texto aqui]\"",
      "\"Corrija apenas os erros de portugues\""
    ],
    2,
    "O melhor prompt preserva o objetivo original, define o tom desejado e ainda pede transparencia sobre as mudancas feitas."
  ),
  textStep(
    "Claude para Brainstorming e Tomada de Decisao",
    "Quando voce precisa tomar uma decisao dificil ou explorar possibilidades, o Claude vai alem de listar opcoes: ele raciocina junto com voce, questiona premissas e aponta pontos cegos. Use-o para organizar informacoes, mapear riscos e enxergar o que voce nao esta considerando. A decisao final sempre e sua."
  ),
  fillStep(
    "Preencha a lacuna - Use o Claude para decidir melhor!",
    "Monte um pedido de apoio para uma decisao importante.",
    '"Preciso decidir entre ___. Meus criterios mais importantes sao ___. Antes de recomendar, me ___ se estou considerando todos os fatores relevantes ou se existe algum ___ que nao estou levando em conta."',
    [
      "duas propostas de emprego",
      "salario, crescimento e qualidade de vida",
      "questione",
      "ponto cego"
    ],
    [
      "duas propostas de emprego",
      "salario, crescimento e qualidade de vida",
      "questione",
      "ponto cego",
      "uma serie aleatoria",
      "ignore",
      "detalhe irrelevante"
    ],
    "Esse formato transforma o Claude em um parceiro de decisao, nao apenas em uma maquina de opcoes soltas."
  ),
  textStep(
    "Honestidade como Diferencial",
    "O Claude foi desenvolvido para ser honesto, inclusive quando a resposta honesta nao e a que voce quer ouvir. Ele admite incertezas, sinaliza quando nao tem informacoes suficientes e nao inventa dados para parecer mais util."
  ),
  quizStep(
    "Quando ha incerteza",
    "O que o Claude faz quando nao tem certeza sobre uma informacao?",
    [
      "Inventa uma resposta convincente para nao decepcionar o usuario.",
      "Ignora a pergunta e muda de assunto.",
      "Sinaliza a incerteza claramente e sugere que voce verifique em fontes especializadas.",
      "Repete a pergunta de volta para ganhar tempo."
    ],
    2,
    "A honestidade sobre limites e incertezas e uma parte central da experiencia esperada com o Claude."
  ),
  textStep(
    "Usando o Claude no Dia a Dia",
    "O Claude fica mais util quando integrado a sua rotina como um parceiro de pensamento, nao apenas para tarefas pontuais."
  ),
  fillStep(
    "Preencha a lacuna - Monte sua rotina com o Claude!",
    "Transforme o Claude em parte da sua rotina de trabalho.",
    '"Quero usar o Claude para ___ no meu dia a dia. Me sugira ___ formas praticas de integra-lo a minha ___, com exemplos de prompts que eu possa usar ___ nas minhas tarefas mais comuns."',
    [
      "aumentar minha produtividade",
      "5",
      "rotina de trabalho",
      "imediatamente"
    ],
    [
      "aumentar minha produtividade",
      "5",
      "rotina de trabalho",
      "imediatamente",
      "evitar pensar",
      "100",
      "vida inteira"
    ],
    "Quando voce pede integracao pratica e imediata, o Claude sai da teoria e entra no seu fluxo real."
  ),
  textStep(
    "Conclusao",
    "O Claude e um assistente que raciocina, questiona e colabora, nao apenas executa. Quanto mais contexto, clareza e intencao voce colocar nos seus prompts, mais poderoso ele se torna. Use-o como parceiro de pensamento no seu dia a dia e voce vai perceber que as melhores respostas nao vem de perguntas simples, e sim de conversas bem construidas.\n\nLicao concluida."
  ),
] as const;

export const CLAUDE_MODULE_1_STEPS_EN = [
  textStep(
    "Claude as Your Intelligent Assistant",
    "Welcome to this lesson. Here you will discover how to use Claude, Anthropic's AI assistant, to boost your productivity, creativity, and learning. Claude has unique traits that set it apart from other AIs, and understanding those differences changes the way you work."
  ),
  textStep(
    "What Is Claude?",
    "Claude is an artificial intelligence assistant developed by Anthropic. It was built to be helpful, honest, and safe. That means it does not just answer, it reasons with you, questions assumptions when needed, and admits when it is not sure about something."
  ),
  quizStep(
    "Claude's Differentiator",
    "What sets Claude apart from other AI assistants?",
    [
      "It was developed with a focus on deep reasoning, honesty, and contextualized responses.",
      "It automatically remembers all of your previous conversations.",
      "It accesses the internet in real time without any setup.",
      "It never makes mistakes under any circumstances."
    ],
    0,
    "Claude stands out because it combines stronger reasoning, honesty about limits, and more context-aware answers."
  ),
  textStep(
    "How Claude Thinks",
    "Unlike a Google search, which returns links, Claude reads your full message, interprets the context, and builds a coherent response from beginning to end. The more context you provide, the more precise and useful the answer tends to be."
  ),
  fillStep(
    "Fill in the blank - Bring out Claude's best!",
    "Build a complete prompt with clarity and context.",
    '"You are a ___ with experience in ___. I need help to ___. My current knowledge level is ___ and my final goal is ___."',
    [
      "personal finance expert",
      "beginner investing",
      "build my first investment portfolio",
      "basic",
      "build a solid emergency fund in 12 months"
    ],
    [
      "personal finance expert",
      "beginner investing",
      "build my first investment portfolio",
      "basic",
      "build a solid emergency fund in 12 months",
      "criminal lawyer",
      "advanced",
      "forget my goal"
    ],
    "When you define role, context, task, current level, and final goal, Claude can respond with much more precision."
  ),
  textStep(
    "What Claude Does Very Well",
    "Claude stands out in tasks that require reasoning, analysis, and strong writing. It analyzes texts, reasons through complex problems, writes clearly, and explains concepts in depth. It does not generate images, does not automatically perform tasks in other apps, and does not replace a human expert, but inside its territory it is one of the most powerful tools available."
  ),
  textStep(
    "Talking to Claude Strategically",
    "Claude works best when you treat the conversation like a dialogue, not like a search engine. You can ask follow-up questions, request refinements, and build the ideal answer across multiple turns. If the first answer was not exactly what you needed, do not start over. Refine it."
  ),
  fillStep(
    "Fill in the blank - Refine your conversation!",
    "Refine the answer without losing the context of the conversation.",
    '"I liked the answer, but I want you to ___ the second part, use a more ___ tone, and add practical ___ for someone starting from zero."',
    ["deepen", "accessible", "examples"],
    ["deepen", "accessible", "examples", "ignore", "overly technical", "charts"],
    "Refining the conversation uses the context you already built and leads to a much better answer."
  ),
  textStep(
    "Claude for Analysis and Reasoning",
    "One of Claude's greatest strengths is its ability to analyze complex situations, consider multiple angles, and present a balanced view without hiding the difficult parts."
  ),
  fillStep(
    "Fill in the blank - Ask for a complete analysis!",
    "Build a prompt to receive a balanced evaluation.",
    '"Analyze the situation below from ___ different perspectives. For each one, present the ___ and the ___. At the end, give your most ___ recommendation based on the facts presented. [Describe the situation]"',
    ["3", "positive points", "negative points", "balanced"],
    ["3", "positive points", "negative points", "balanced", "2", "vague arguments", "absolute certainty"],
    "This structure helps Claude compare scenarios, map risks, and deliver a more mature recommendation."
  ),
  textStep(
    "Claude for Writing and Text Revision",
    "Claude writes naturally, adapts tone to context, and can imitate different writing styles. More than that, it can explain the reasoning behind each choice when you ask."
  ),
  quizStep(
    "Stronger writing prompt",
    "Which prompt makes better use of Claude's writing ability?",
    [
      "\"Write a text about sustainability\"",
      "\"Make a good and creative text\"",
      "\"Rewrite the text below keeping the original ideas, but with a more conversational and direct tone. Then explain the main changes you made and why. [Paste the text here]\"",
      "\"Only fix the grammar mistakes\""
    ],
    2,
    "The best prompt preserves the original objective, defines the desired tone, and asks for transparency about the changes."
  ),
  textStep(
    "Claude for Brainstorming and Decision-Making",
    "When you need to make a difficult decision or explore possibilities, Claude goes beyond listing options. It reasons with you, questions assumptions, and points out blind spots. Use it to organize information, map risks, and notice what you are not considering. The final decision is always yours."
  ),
  fillStep(
    "Fill in the blank - Use Claude to decide better!",
    "Build a request for support in an important decision.",
    '"I need to decide between ___. My most important criteria are ___. Before recommending anything, ___ me if I am considering all relevant factors or if there is any ___ I am missing."',
    [
      "two job offers",
      "salary, growth, and quality of life",
      "question",
      "blind spot"
    ],
    [
      "two job offers",
      "salary, growth, and quality of life",
      "question",
      "blind spot",
      "a random series",
      "ignore",
      "irrelevant detail"
    ],
    "This format turns Claude into a thinking partner, not just a machine that lists loose options."
  ),
  textStep(
    "Honesty as a Differentiator",
    "Claude was designed to be honest, even when the honest answer is not the one you want to hear. It admits uncertainty, signals when it does not have enough information, and does not invent data just to appear helpful."
  ),
  quizStep(
    "When there is uncertainty",
    "What does Claude do when it is not sure about a piece of information?",
    [
      "It invents a convincing answer so the user will not be disappointed.",
      "It ignores the question and changes the subject.",
      "It clearly signals the uncertainty and suggests checking specialized sources.",
      "It repeats the question back to buy time."
    ],
    2,
    "Honesty about limits and uncertainty is a central part of the expected Claude experience."
  ),
  textStep(
    "Using Claude in Everyday Life",
    "Claude becomes more useful when it is integrated into your routine as a thinking partner, not just for one-off tasks."
  ),
  fillStep(
    "Fill in the blank - Build your routine with Claude!",
    "Turn Claude into part of your work routine.",
    '"I want to use Claude to ___ in my daily life. Suggest ___ practical ways to integrate it into my ___, with prompt examples I can use ___ in my most common tasks."',
    [
      "increase my productivity",
      "5",
      "work routine",
      "immediately"
    ],
    [
      "increase my productivity",
      "5",
      "work routine",
      "immediately",
      "avoid thinking",
      "100",
      "entire life"
    ],
    "When you ask for practical and immediate integration, Claude moves from theory into your real workflow."
  ),
  textStep(
    "Conclusion",
    "Claude is an assistant that reasons, questions, and collaborates, not one that only executes. The more context, clarity, and intention you place in your prompts, the more powerful it becomes. Use it as a thinking partner in your daily routine and you will notice that the best answers do not come from simple questions, but from well-built conversations.\n\nLesson complete."
  ),
] as const;

export const CLAUDE_MODULE_1_STEPS_ES = [
  textStep(
    "Claude como tu Asistente Inteligente",
    "Bienvenido a esta leccion. Aqui descubriras como usar Claude, el asistente de IA de Anthropic, para potenciar tu productividad, creatividad y aprendizaje. Claude tiene caracteristicas unicas que lo diferencian de otras IAs, y entender esas diferencias cambia la forma en que trabajas."
  ),
  textStep(
    "Que es Claude?",
    "Claude es un asistente de inteligencia artificial desarrollado por Anthropic. Fue creado con foco en ser util, honesto y seguro. Eso significa que no solo responde, sino que razona contigo, cuestiona premisas cuando hace falta y admite cuando no esta seguro de algo."
  ),
  quizStep(
    "Diferencial de Claude",
    "Que diferencia a Claude de otros asistentes de IA?",
    [
      "Fue desarrollado con foco en razonamiento profundo, honestidad y respuestas contextualizadas.",
      "Memoriza automaticamente todas tus conversaciones anteriores.",
      "Accede a internet en tiempo real sin ninguna configuracion.",
      "Nunca comete errores bajo ninguna circunstancia."
    ],
    0,
    "Claude destaca por combinar mas profundidad de razonamiento, honestidad sobre sus limites y respuestas sensibles al contexto."
  ),
  textStep(
    "Como piensa Claude",
    "A diferencia de una busqueda en Google, que devuelve enlaces, Claude lee tu mensaje completo, interpreta el contexto y construye una respuesta coherente de principio a fin. Cuanto mas contexto le das, mas precisa y util suele ser la respuesta."
  ),
  fillStep(
    "Completa el espacio - Saca lo mejor de Claude!",
    "Construye un prompt completo con claridad y contexto.",
    '"Eres un ___ con experiencia en ___. Necesito ayuda para ___. Mi nivel actual de conocimiento es ___ y mi objetivo final es ___."',
    [
      "especialista en finanzas personales",
      "inversiones para principiantes",
      "armar mi primera cartera de inversiones",
      "basico",
      "tener un fondo de emergencia solido en 12 meses"
    ],
    [
      "especialista en finanzas personales",
      "inversiones para principiantes",
      "armar mi primera cartera de inversiones",
      "basico",
      "tener un fondo de emergencia solido en 12 meses",
      "abogado penal",
      "avanzado",
      "olvidar mi objetivo"
    ],
    "Cuando defines rol, contexto, tarea, nivel actual y meta final, Claude puede responder con mucha mas precision."
  ),
  textStep(
    "Lo que Claude Hace Muy Bien",
    "Claude destaca en tareas que exigen razonamiento, analisis y buena escritura. Analiza textos, razona sobre problemas complejos, escribe con calidad y explica conceptos con profundidad. No genera imagenes, no ejecuta tareas automaticamente en otras aplicaciones y no reemplaza a un especialista humano, pero dentro de su terreno es una de las herramientas mas potentes disponibles."
  ),
  textStep(
    "Conversar con Claude de Forma Estrategica",
    "Claude responde mejor cuando tratas la conversacion como un dialogo, no como una busqueda. Puedes hacer preguntas de seguimiento, pedir refinamientos y construir la respuesta ideal a lo largo de varios turnos. Si la primera respuesta no fue exactamente lo que necesitabas, no empieces desde cero: refinela."
  ),
  fillStep(
    "Completa el espacio - Refina tu conversacion!",
    "Refina la respuesta sin perder el contexto de la conversacion.",
    '"Me gusto la respuesta, pero quiero que ___ la segunda parte, uses un tono mas ___ y agregues ___ practicos para alguien que esta empezando desde cero."',
    ["profundices", "accesible", "ejemplos"],
    ["profundices", "accesible", "ejemplos", "ignores", "demasiado tecnico", "graficos"],
    "Refinar la conversacion aprovecha el contexto ya construido y lleva a una respuesta mucho mejor."
  ),
  textStep(
    "Claude para Analisis y Razonamiento",
    "Una de las mayores fortalezas de Claude es su capacidad para analizar situaciones complejas, considerar varios angulos y presentar una vision equilibrada sin esconder las partes dificiles."
  ),
  fillStep(
    "Completa el espacio - Pide un analisis completo!",
    "Construye un prompt para recibir una evaluacion equilibrada.",
    '"Analiza la situacion de abajo considerando ___ perspectivas diferentes. Para cada una, presenta los ___ y los ___. Al final, da tu recomendacion mas ___ con base en los hechos presentados. [Describe la situacion]"',
    ["3", "puntos positivos", "puntos negativos", "equilibrada"],
    ["3", "puntos positivos", "puntos negativos", "equilibrada", "2", "argumentos vagos", "certeza absoluta"],
    "Esa estructura ayuda a Claude a comparar escenarios, mapear riesgos y entregar una recomendacion mas madura."
  ),
  textStep(
    "Claude para Escritura y Revision de Textos",
    "Claude escribe con naturalidad, adapta el tono al contexto y puede imitar distintos estilos de escritura. Ademas, puede explicar el razonamiento detras de cada eleccion cuando se lo pides."
  ),
  quizStep(
    "Prompt de escritura mas fuerte",
    "Que prompt aprovecha mejor la capacidad de escritura de Claude?",
    [
      "\"Escribe un texto sobre sostenibilidad\"",
      "\"Haz un texto bueno y creativo\"",
      "\"Reescribe el texto de abajo manteniendo las ideas originales, pero con un tono mas conversacional y directo. Despues explica los principales cambios que hiciste y por que. [Pega el texto aqui]\"",
      "\"Corrige solo los errores de gramatica\""
    ],
    2,
    "El mejor prompt conserva el objetivo original, define el tono deseado y pide transparencia sobre los cambios realizados."
  ),
  textStep(
    "Claude para Brainstorming y Toma de Decisiones",
    "Cuando necesitas tomar una decision dificil o explorar posibilidades, Claude va mas alla de enumerar opciones. Razona contigo, cuestiona premisas y senala puntos ciegos. Usalo para organizar informacion, mapear riesgos y ver lo que no estas considerando. La decision final siempre es tuya."
  ),
  fillStep(
    "Completa el espacio - Usa Claude para decidir mejor!",
    "Construye una solicitud de apoyo para una decision importante.",
    '"Necesito decidir entre ___. Mis criterios mas importantes son ___. Antes de recomendarme algo, ___ si estoy considerando todos los factores relevantes o si existe algun ___ que no estoy teniendo en cuenta."',
    [
      "dos ofertas de trabajo",
      "salario, crecimiento y calidad de vida",
      "cuestiona",
      "punto ciego"
    ],
    [
      "dos ofertas de trabajo",
      "salario, crecimiento y calidad de vida",
      "cuestiona",
      "punto ciego",
      "una serie aleatoria",
      "ignora",
      "detalle irrelevante"
    ],
    "Ese formato convierte a Claude en un socio de razonamiento, no solo en una maquina de opciones sueltas."
  ),
  textStep(
    "La Honestidad como Diferencial",
    "Claude fue desarrollado para ser honesto, incluso cuando la respuesta honesta no es la que quieres oir. Admite incertidumbre, senala cuando no tiene suficiente informacion y no inventa datos para parecer mas util."
  ),
  quizStep(
    "Cuando hay incertidumbre",
    "Que hace Claude cuando no esta seguro sobre una informacion?",
    [
      "Inventa una respuesta convincente para no decepcionar al usuario.",
      "Ignora la pregunta y cambia de tema.",
      "Senala claramente la incertidumbre y sugiere verificar en fuentes especializadas.",
      "Repite la pregunta para ganar tiempo."
    ],
    2,
    "La honestidad sobre limites e incertidumbre es una parte central de la experiencia esperada con Claude."
  ),
  textStep(
    "Usando Claude en el Dia a Dia",
    "Claude se vuelve mas util cuando se integra en tu rutina como un socio de pensamiento, y no solo para tareas puntuales."
  ),
  fillStep(
    "Completa el espacio - Arma tu rutina con Claude!",
    "Convierte a Claude en parte de tu rutina de trabajo.",
    '"Quiero usar Claude para ___ en mi dia a dia. Sugiereme ___ formas practicas de integrarlo a mi ___, con ejemplos de prompts que pueda usar ___ en mis tareas mas comunes."',
    [
      "aumentar mi productividad",
      "5",
      "rutina de trabajo",
      "de inmediato"
    ],
    [
      "aumentar mi productividad",
      "5",
      "rutina de trabajo",
      "de inmediato",
      "evitar pensar",
      "100",
      "vida entera"
    ],
    "Cuando pides integracion practica e inmediata, Claude pasa de la teoria a tu flujo real."
  ),
  textStep(
    "Conclusion",
    "Claude es un asistente que razona, cuestiona y colabora, no uno que solo ejecuta. Cuanto mas contexto, claridad e intencion pongas en tus prompts, mas poderoso se vuelve. Usalo como socio de pensamiento en tu rutina diaria y notaras que las mejores respuestas no nacen de preguntas simples, sino de conversaciones bien construidas.\n\nLeccion completada."
  ),
] as const;

export const CLAUDE_MODULE_1_STEPS_FR = [
  textStep(
    "Claude comme Votre Assistant Intelligent",
    "Bienvenue dans cette lecon. Ici, vous allez decouvrir comment utiliser Claude, l'assistant IA d'Anthropic, pour booster votre productivite, votre creativite et votre apprentissage. Claude possede des caracteristiques uniques qui le distinguent des autres IA, et comprendre ces differences change la maniere dont vous travaillez."
  ),
  textStep(
    "Qu'est-ce que Claude ?",
    "Claude est un assistant d'intelligence artificielle developpe par Anthropic. Il a ete concu pour etre utile, honnete et sur. Cela signifie qu'il ne se contente pas de repondre, il raisonne avec vous, questionne les hypotheses quand c'est necessaire et admet quand il n'est pas certain de quelque chose."
  ),
  quizStep(
    "Le point fort de Claude",
    "Qu'est-ce qui distingue Claude des autres assistants IA ?",
    [
      "Il a ete developpe avec un accent sur le raisonnement approfondi, l'honnetete et les reponses contextualisees.",
      "Il memorise automatiquement toutes vos conversations precedentes.",
      "Il accede a internet en temps reel sans aucune configuration.",
      "Il ne fait jamais d'erreur en aucune circonstance."
    ],
    0,
    "Claude se distingue par sa combinaison de raisonnement plus profond, d'honnetete sur ses limites et de reponses tres sensibles au contexte."
  ),
  textStep(
    "Comment Claude Pense",
    "Contrairement a une recherche Google, qui renvoie des liens, Claude lit votre message dans son ensemble, interprete le contexte et construit une reponse coherente du debut a la fin. Plus vous fournissez de contexte, plus la reponse a tendance a etre precise et utile."
  ),
  fillStep(
    "Remplissez le vide - Activez le meilleur de Claude !",
    "Construisez un prompt complet avec clarte et contexte.",
    '"Vous etes un ___ avec de l\'experience en ___. J\'ai besoin d\'aide pour ___. Mon niveau actuel de connaissance est ___ et mon objectif final est ___."',
    [
      "expert en finances personnelles",
      "investissement pour debutants",
      "construire mon premier portefeuille d'investissement",
      "basique",
      "constituer un fonds d'urgence solide en 12 mois"
    ],
    [
      "expert en finances personnelles",
      "investissement pour debutants",
      "construire mon premier portefeuille d'investissement",
      "basique",
      "constituer un fonds d'urgence solide en 12 mois",
      "avocat penaliste",
      "avance",
      "oublier mon objectif"
    ],
    "Quand vous definissez le role, le contexte, la tache, le niveau actuel et l'objectif final, Claude peut repondre avec beaucoup plus de precision."
  ),
  textStep(
    "Ce que Claude Fait Tres Bien",
    "Claude excelle dans les taches qui demandent du raisonnement, de l'analyse et une bonne qualite d'ecriture. Il analyse des textes, raisonne sur des problemes complexes, ecrit avec qualite et explique les concepts en profondeur. Il ne genere pas d'images, n'execute pas automatiquement des taches dans d'autres applications et ne remplace pas un expert humain, mais dans son domaine c'est l'un des outils les plus puissants disponibles."
  ),
  textStep(
    "Parler avec Claude de Facon Strategique",
    "Claude repond mieux lorsque vous traitez la conversation comme un dialogue, et non comme une recherche. Vous pouvez poser des questions de suivi, demander des refinements et construire la reponse ideale sur plusieurs tours. Si la premiere reponse n'etait pas exactement celle dont vous aviez besoin, ne repartez pas de zero : affinez-la."
  ),
  fillStep(
    "Remplissez le vide - Affinez votre conversation !",
    "Affinez la reponse sans perdre le contexte de la conversation.",
    '"J\'ai aime la reponse, mais je veux que vous ___ la deuxieme partie, utilisiez un ton plus ___ et ajoutiez des ___ pratiques pour quelqu\'un qui commence de zero."',
    ["approfondissiez", "accessible", "exemples"],
    ["approfondissiez", "accessible", "exemples", "ignoriez", "trop technique", "graphiques"],
    "Affiner la conversation permet d'exploiter le contexte deja construit et d'obtenir une reponse bien plus utile."
  ),
  textStep(
    "Claude pour l'Analyse et le Raisonnement",
    "L'une des plus grandes forces de Claude est sa capacite a analyser des situations complexes, considerer plusieurs angles et presenter une vision equilibree sans cacher les aspects difficiles."
  ),
  fillStep(
    "Remplissez le vide - Demandez une analyse complete !",
    "Construisez un prompt pour recevoir une evaluation equilibree.",
    '"Analysez la situation ci-dessous en considerant ___ perspectives differentes. Pour chacune, presentez les ___ et les ___. A la fin, donnez votre recommandation la plus ___ en vous appuyant sur les faits presentes. [Decrivez la situation]"',
    ["3", "points positifs", "points negatifs", "equilibree"],
    ["3", "points positifs", "points negatifs", "equilibree", "2", "arguments vagues", "certitude absolue"],
    "Cette structure aide Claude a comparer les scenarios, cartographier les risques et formuler une recommandation plus solide."
  ),
  textStep(
    "Claude pour l'Ecriture et la Revision de Textes",
    "Claude ecrit naturellement, adapte le ton au contexte et peut imiter differents styles d'ecriture. Plus encore, il peut expliquer le raisonnement derriere chaque choix lorsque vous le demandez."
  ),
  quizStep(
    "Prompt d'ecriture le plus fort",
    "Quel prompt exploite le mieux la capacite d'ecriture de Claude ?",
    [
      "\"Ecris un texte sur la durabilite\"",
      "\"Fais un bon texte creatif\"",
      "\"Reecris le texte ci-dessous en gardant les idees d'origine, mais avec un ton plus conversationnel et direct. Explique ensuite les principaux changements que tu as faits et pourquoi. [Colle le texte ici]\"",
      "\"Corrige seulement les fautes de grammaire\""
    ],
    2,
    "Le meilleur prompt preserve l'objectif initial, definit le ton souhaite et demande aussi de la transparence sur les modifications."
  ),
  textStep(
    "Claude pour le Brainstorming et la Prise de Decision",
    "Quand vous devez prendre une decision difficile ou explorer des possibilites, Claude va au-dela d'une simple liste d'options. Il raisonne avec vous, questionne les hypotheses et signale les angles morts. Utilisez-le pour organiser les informations, cartographier les risques et voir ce que vous n'envisagez pas encore. La decision finale reste toujours la votre."
  ),
  fillStep(
    "Remplissez le vide - Utilisez Claude pour mieux decider !",
    "Construisez une demande d'aide pour une decision importante.",
    '"Je dois choisir entre ___. Mes criteres les plus importants sont ___. Avant de recommander quoi que ce soit, ___-moi si je prends en compte tous les facteurs pertinents ou s\'il existe un ___ que j\'ignore."',
    [
      "deux offres d'emploi",
      "salaire, evolution et qualite de vie",
      "questionnez",
      "angle mort"
    ],
    [
      "deux offres d'emploi",
      "salaire, evolution et qualite de vie",
      "questionnez",
      "angle mort",
      "une serie aleatoire",
      "ignorez",
      "detail sans importance"
    ],
    "Ce format transforme Claude en partenaire de reflexion et non en simple machine a produire des options."
  ),
  textStep(
    "L'Honnetete comme Difference",
    "Claude a ete concu pour etre honnete, meme lorsque la reponse honnete n'est pas celle que vous voulez entendre. Il admet l'incertitude, signale quand il n'a pas assez d'informations et n'invente pas des donnees pour paraitre plus utile."
  ),
  quizStep(
    "Lorsqu'il y a de l'incertitude",
    "Que fait Claude lorsqu'il n'est pas certain d'une information ?",
    [
      "Il invente une reponse convaincante pour ne pas decevoir l'utilisateur.",
      "Il ignore la question et change de sujet.",
      "Il signale clairement l'incertitude et suggere de verifier dans des sources specialisees.",
      "Il repete la question pour gagner du temps."
    ],
    2,
    "L'honnetete sur les limites et l'incertitude fait partie du coeur de l'experience attendue avec Claude."
  ),
  textStep(
    "Utiliser Claude au Quotidien",
    "Claude devient plus utile lorsqu'il est integre a votre routine comme partenaire de reflexion, et pas seulement pour des taches ponctuelles."
  ),
  fillStep(
    "Remplissez le vide - Construisez votre routine avec Claude !",
    "Faites entrer Claude dans votre routine de travail.",
    '"Je veux utiliser Claude pour ___ au quotidien. Suggerez-moi ___ manieres concretes de l\'integrer a ma ___, avec des exemples de prompts que je peux utiliser ___ dans mes taches les plus frequentes."',
    [
      "augmenter ma productivite",
      "5",
      "routine de travail",
      "immediatement"
    ],
    [
      "augmenter ma productivite",
      "5",
      "routine de travail",
      "immediatement",
      "eviter de penser",
      "100",
      "vie entiere"
    ],
    "Quand vous demandez une integration pratique et immediate, Claude passe de la theorie a votre flux de travail reel."
  ),
  textStep(
    "Conclusion",
    "Claude est un assistant qui raisonne, questionne et collabore, pas seulement un outil qui execute. Plus vous mettez de contexte, de clarte et d'intention dans vos prompts, plus il devient puissant. Utilisez-le comme partenaire de reflexion dans votre routine quotidienne et vous verrez que les meilleures reponses ne viennent pas de questions simples, mais de conversations bien construites.\n\nLecon terminee."
  ),
] as const;
