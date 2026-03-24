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
  textStep(
    "Escrevendo Textos do Zero",
    "A primeira aplicação mais comum é pedir ao Gemini para redigir um texto completo com base nas informações que você fornece — objetivo, público, tom e formato."
  ),
  fillStep(
    "Peça seu texto!",
    "Determine todas as variáveis do seu texto em um único prompt de direcionamento.",
    "\"Escreva um [___] sobre [___] para [___]. Tom: [___]. O objetivo é [___]. Inclua [___] no início para prender a atenção e uma [___] clara no final.\"",
    ["artigo", "os benefícios do trabalho remoto para pequenas empresas", "gestores e empreendedores", "informativo e direto", "apresentar argumentos práticos e convincentes", "um dado surpreendente", "conclusão com chamada para reflexão"],
    ["artigo", "os benefícios do trabalho remoto para pequenas empresas", "gestores e empreendedores", "informativo e direto", "apresentar argumentos práticos e convincentes", "um dado surpreendente", "conclusão com chamada para reflexão"],
    "Isolar cada aspecto redatorial no prompt impede que a IA assuma posturas extremas ou estilos artificiais padronizados."
  ),
  textStep(
    "Revisando e Melhorando Textos",
    "Você já tem um texto escrito mas sente que pode ser melhor. O Gemini revisa, aponta problemas e reescreve trechos específicos mantendo a sua voz e intenção original."
  ),
  fillStep(
    "Revise seu texto!",
    "Transforme o modelo num experiente editor-chefe.",
    "\"Aqui está o meu texto: [cole aqui]. Revise e identifique: trechos com [___] de clareza, partes que estão [___], erros de [___] e palavras [___] que podem ser substituídas por alternativas mais precisas. Depois reescreva mantendo minha [___] original.\"",
    ["falta", "repetitivas ou longas demais", "coesão e concordância", "vagas", "voz e estilo"],
    ["falta", "repetitivas ou longas demais", "coesão e concordância", "vagas", "voz e estilo"],
    "Forçá-lo a manter a sua voz evita que o seu texto original pareça impessoal."
  ),
  textStep(
    "Adaptando o Tom e o Estilo",
    "O mesmo texto pode precisar de tons diferentes dependendo do canal e do público. O Gemini adapta qualquer conteúdo para o contexto que você precisa."
  ),
  fillStep(
    "Adapte o tom do seu texto!",
    "Desdobre a mesma informação para plataformas diferentes.",
    "\"Aqui está meu texto original: [cole aqui]. Reescreva em [___] versões com tons diferentes: uma [___] para um e-mail corporativo, uma [___] para um post no Instagram e uma [___] para um artigo técnico. Mantenha as [___] principais em todas as versões.\"",
    ["3", "formal e objetiva", "descontraída e envolvente", "precisa e fundamentada", "ideias"],
    ["3", "formal e objetiva", "descontraída e envolvente", "precisa e fundamentada", "ideias"],
    "Com um único prompt você adota abordagens múltiplas."
  ),
  textStep(
    "Escrevendo E-mails Profissionais",
    "O Gemini redige qualquer tipo de e-mail em segundos, economizando horas cruciais na semana."
  ),
  fillStep(
    "Redija seu e-mail!",
    "Equilibre firmeza e elegância sem estresse e na velocidade máxima.",
    "\"Escreva um e-mail [___] para [___] sobre [___]. O objetivo é [___]. Tom: [___]. Seja [___] e evite [___]. Inclua um assunto que [___] abertura.\"",
    ["profissional", "um fornecedor com quem tivemos um problema de entrega", "solicitar reembolso ou reposição", "resolver a situação de forma amigável mas firme", "cordial e assertivo", "profissional", "rodeios e linguagem agressiva", "gere"],
    ["profissional", "um fornecedor com quem tivemos um problema de entrega", "solicitar reembolso ou reposição", "resolver a situação de forma amigável mas firme", "cordial e assertivo", "profissional", "rodeios e linguagem agressiva", "gere"],
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
    "\"Crie um texto para [___] sobre [___]. Inclua: um [___] na primeira linha, [___] no máximo, uma [___] clara no final e [___] relevantes. Tom: [___].\"",
    ["LinkedIn", "como superei meu maior fracasso", "gancho", "5 parágrafos", "chamada para ação", "hashtags", "reflexivo e humano"],
    ["LinkedIn", "como superei meu maior fracasso", "gancho", "5 parágrafos", "chamada para ação", "hashtags", "reflexivo e humano"],
    "Estipular número de linhas e o uso mandatório de ganchos direciona o bot livremente."
  ),
  textStep(
    "Escrevendo Textos Longos e Estruturados",
    "Pressione as margens lúdicas emulando incontáveis guias e projetos longos de uma só tacada."
  ),
  fillStep(
    "Estruture seu texto longo!",
    "O segredo magnânimo da produção interativa.",
    "\"Preciso escrever um [___] sobre [___] com aproximadamente [___] palavras. Primeiro crie um [___] completo com todas as seções. Depois desenvolva seção por seção, garantindo [___] entre os tópicos e um [___] progressivo do início ao fim.\"",
    ["guia completo", "uma rotina de estudos", "2.000", "índice", "coerência e fluidez", "aprofundamento"],
    ["guia completo", "uma rotina de estudos", "2.000", "índice", "coerência e fluidez", "aprofundamento"],
    "Cercá-lo primeiro no arranjo direciona o documento final a um trabalho brilhante."
  ),
  textStep(
    "Corrigindo Gramática e Ortografia",
    "O Gemini atua secretamente como seu revisor gramatical absoluto."
  ),
  fillStep(
    "Corrija seu texto!",
    "Nunca aceite a correção cega sem fundamentação lógica.",
    "\"Revise o texto abaixo e corrija todos os erros de [___], [___] e [___]. Para cada correção, [___] o erro original, a versão corrigida e uma [___] breve do motivo da correção.\"",
    ["ortografia", "concordância", "pontuação", "mostre", "explicação"],
    ["ortografia", "concordância", "pontuação", "mostre", "explicação"],
    "Entender a regra garante a fixação gramatical no usuário."
  ),
  textStep(
    "Reescrevendo com Diferentes Estilos Literários",
    "Para projetos criativos, o Gemini consegue reescrever o texto em diferentes visões narrativas."
  ),
  fillStep(
    "Explore estilos diferentes!",
    "Transmute e experimente as facetas lúdicas redatoriais.",
    "\"Reescreva o texto abaixo em [___] estilos diferentes: um [___], um [___] e um [___]. Mantenha as [___] centrais mas mude completamente a forma de [___] e o impacto [___].\"",
    ["3", "narrativo e pessoal", "jornalístico e objetivo", "inspirador e motivacional", "ideias", "expressar", "emocional"],
    ["3", "narrativo e pessoal", "jornalístico e objective", "inspirador e motivacional", "ideias", "expressar", "emocional"],
    "Isolar cada faceta redatorial confere polaridades cruciais ao leitor nativo alvo."
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
  textStep(
    "Writing Texts from Scratch",
    "The most common application is asking Gemini to draft a complete text based on the parameters you set."
  ),
  fillStep(
    "Request your text!",
    "Determine the variables of your text in a single guiding prompt.",
    "\"Write an [___] about [___] for [___]. Tone: [___]. The goal is to [___]. Include [___] at the beginning to grab attention and a clear [___] at the end.\"",
    ["article", "the benefits of remote work for small businesses", "managers and entrepreneurs", "informative and direct", "present practical and convincing arguments", "a surprising fact", "conclusion with a call to reflection"],
    ["article", "the benefits of remote work for small businesses", "managers and entrepreneurs", "informative and direct", "present practical and convincing arguments", "a surprising fact", "conclusion with a call to reflection"],
    "Isolating editorial variables avoids purely robotic AI outputs."
  ),
  textStep(
    "Revising and Improving Texts",
    "Gemini reviews, points out issues, and rewrites specific sections while maintaining your original voice."
  ),
  fillStep(
    "Review your text!",
    "Turn the model into an experienced editor-in-chief.",
    "\"Here is my text: [paste here]. Review and identify: sections with a [___] of clarity, parts that are [___], errors in [___], and [___] words that can be replaced. Then rewrite maintaining my original [___].\"",
    ["lack", "repetitive", "cohesion", "vague", "voice"],
    ["lack", "repetitive", "cohesion", "vague", "voice"],
    "Keeping your original voice prevents a sterile tone."
  ),
  textStep(
    "Adapting Tone and Style",
    "Gemini seamlessly acts as a contextual translator, adapting your content to match diverse environments."
  ),
  fillStep(
    "Adapt the tone of your text!",
    "Modify the timbre of the same information for varied platforms.",
    "\"Rewrite in [___] versions with different tones: one [___] for a corporate email, one [___] for an Instagram post, and one [___] for a technical article. Maintain the core [___] in all versions.\"",
    ["3", "formal", "relaxed", "precise", "ideas"],
    ["3", "formal", "relaxed", "precise", "ideas"],
    "A single prompt prepares you for omnichannel publishing."
  ),
  textStep(
    "Writing Professional Emails",
    "Gemini writes precise, assertive, or diplomatic emails instantly, solving a major office bottleneck."
  ),
  fillStep(
    "Draft your email!",
    "Balance diplomacy and directness without losing your entire morning.",
    "\"Write a [___] email to [___] about [___]. The goal is to [___]. Tone: [___]. Be [___] and avoid [___]. Include a subject line that [___] opening.\"",
    ["professional", "a supplier with whom we had a delivery problem", "requesting a refund or replacement", "resolving the situation in a friendly but firm way", "cordial and assertive", "professional", "beating around the bush and aggressive language", "generates"],
    ["professional", "a supplier with whom we had a delivery problem", "requesting a refund or replacement", "resolving the situation in a friendly but firm way", "cordial and assertive", "professional", "beating around the bush and aggressive language", "generates"],
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
    "\"Create a text for [___] about [___]. Include: a [___] in the first line, [___] maximum, a clear [___] at the end, and relevant [___]. Tone: [___].\"",
    ["LinkedIn", "overcoming failure", "hook", "5 paragraphs", "call to action", "hashtags", "human"],
    ["LinkedIn", "overcoming failure", "hook", "5 paragraphs", "call to action", "hashtags", "human"],
    "Enforcing hooks and word limits ensures platform-native appeal."
  ),
  textStep(
    "Writing Long and Structured Texts",
    "When facing massive manuals or guides, Gemini organizes the skeletal chunks first for safety."
  ),
  fillStep(
    "Structure your long text!",
    "Prevent hallucination through structural mapping.",
    "\"First create a complete [___] with all sections. Then develop section by section, ensuring [___] between topics and a progressive [___] from start to finish.\"",
    ["index", "coherence", "deepening"],
    ["index", "coherence", "deepening"],
    "Structuring the index anchors the subsequent long-form generation."
  ),
  textStep(
    "Correcting Grammar and Spelling",
    "Use the machine not just as an editor, but as your linguistic tutor."
  ),
  fillStep(
    "Correct your text!",
    "Acquire grammatical insight along with structural fixes.",
    "\"For each correction, [___] the original error, the corrected version, and a brief [___] of why it was corrected.\"",
    ["show", "explanation"],
    ["show", "explanation"],
    "Understanding the underlying mistake improves the human operator organically."
  ),
  textStep(
    "Rewriting in Different Literary Styles",
    "Test dramatic narrative swings using style directives."
  ),
  fillStep(
    "Explore different styles!",
    "Push the boundaries of standard formatting.",
    "\"Rewrite in [___] different styles: one [___], one [___], and one [___].\"",
    ["3", "narrative", "journalistic", "emotional"],
    ["3", "narrative", "journalistic", "emotional"],
    "Demanding extreme versions reveals unforeseen tonal advantages."
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
  textStep(
    "Escribiendo Textos desde Cero",
    "La primera aplicación y más común es pedirle a Gemini que redacte un texto completo basado en la información que proporcionas: objetivo, público, tono y formato."
  ),
  fillStep(
    "¡Pide tu texto!",
    "Determina todas las variables de tu texto en un único prompt de dirección.",
    "\"Escribe un [___] sobre [___] para [___]. Tono: [___]. El objetivo es [___]. Incluye [___] al principio para captar la atención y una [___] clara al final.\"",
    ["artículo", "los beneficios del trabajo remoto para pequeñas empresas", "gestores y emprendedores", "informativo y directo", "presentar argumentos prácticos y convincentes", "un dato sorprendente", "conclusión con llamado a la reflexión"],
    ["artículo", "los beneficios del trabajo remoto para pequeñas empresas", "gestores y emprendedores", "informativo y directo", "presentar argumentos prácticos y convincentes", "un dato sorprendente", "conclusión con llamado a la reflexión"],
    "Aislar cada aspecto de redacción (extensión, público, estilo, formato) en el prompt impide que la IA asuma posturas extremas o estilos artificiales estandarizados."
  ),
  textStep(
    "Revisando y Mejorando Textos",
    "Ya tienes un texto escrito pero sientes que puede mejorar. Gemini revisa, señala problemas y reescribe fragmentos específicos manteniendo tu voz e intención original."
  ),
  fillStep(
    "¡Revisa tu texto!",
    "Transforma al modelo en un experimentado editor jefe.",
    "\"Aquí está mi texto: [pega aquí]. Revisa e identifica: tramos con [___] de claridad, partes que son [___], errores de [___] y palabras [___] que pueden sustituirse por alternativas más precisas. Luego reescribe manteniendo mi [___] original.\"",
    ["falta", "repetitivas o demasiado largas", "cohesión y concordancia", "vagas", "voz y estilo"],
    ["falta", "repetitivas o demasiado largas", "cohesión y concordancia", "vagas", "voz y estilo"],
    "Obligarlo a mantener tu voz evita que tu texto original parezca escrito por un robot enciclopedista impersonal."
  ),
  textStep(
    "Adaptando el Tono y el Estilo",
    "Un mismo texto puede necesitar tonos diferentes dependiendo del canal y del público. Gemini adapta cualquier contenido al contexto que necesitas: formal, informal, técnico, inspirador."
  ),
  fillStep(
    "¡Adapta el tono de tu texto!",
    "Desdobla y modifica el timbre de la misma información para distintas plataformas.",
    "\"Aquí está mi texto original: [pega aquí]. Reescribe en [___] versiones con tonos diferentes: una [___] para un correo corporativo, una [___] para un post en Instagram y una [___] para un artículo técnico. Mantén las [___] principales en todas las versiones.\"",
    ["3", "formal y objetiva", "descontraída y envolvente", "precisa y fundamentada", "ideas"],
    ["3", "formal y objetiva", "descontraída y envolvente", "precisa y fundamentada", "ideas"],
    "Con un único prompt adoptas enfoques múltiples listos para su difusión en tu ecosistema omnicanal."
  ),
  textStep(
    "Escribiendo Correos Profesionales",
    "Los correos son una de las formas de escritura más frecuentes en el entorno profesional, y también donde más tiempo se pierde buscando el tono correcto. Gemini redacta cualquier correo en segundos."
  ),
  fillStep(
    "¡Redacta tu correo!",
    "Equilibra firmeza y elegancia sin estrés y a máxima velocidad.",
    "\"Escribe un correo [___] para [___] sobre [___]. El objetivo es [___]. Tono: [___]. Sé [___] y evita [___]. Incluye un asunto que [___] apertura.\"",
    ["profesional", "un proveedor con quien tuvimos un problema de entrega", "solicitar reembolso o reposición", "resolver la situación de forma amigable pero firme", "cordial y asertivo", "profesional", "rodeos y lenguaje agresivo", "genere"],
    ["profesional", "un proveedor con quien tuvimos un problema de entrega", "solicitar reembolso o reposición", "resolver la situación de forma amigable pero firme", "cordial y asertivo", "profesional", "rodeos y lenguaje agresivo", "genere"],
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
    "\"Crea un texto para [___] sobre [___]. Incluye: un [___] que frene el scroll en la primera línea, [___] como máximo, una [___] clara al final y [___] relevantes. Tono: [___].\"",
    ["LinkedIn", "cómo superé mi mayor fracaso profesional y qué aprendí", "gancho", "5 párrafos", "llamada a la acción", "hashtags", "reflexivo y humano"],
    ["LinkedIn", "cómo superé mi mayor fracaso profesional y qué aprendí", "gancho", "5 párrafos", "llamada a la acción", "hashtags", "reflexivo y humano"],
    "Estipular el número de líneas y el uso obligatorio de ganchos es la regla de oro antes de soltar libremente al bot en posts orgánicos."
  ),
  textStep(
    "Escribiendo Textos Largos y Estructurados",
    "Para textos más extensos —informes, artículos, ebooks, propuestas—, Gemini ayuda a estructurar, desarrollar y mantener la coherencia a lo largo de todo el documento."
  ),
  fillStep(
    "¡Estructura tu texto largo!",
    "El secreto espléndido de la producción másiva iterativa libre de alucinación discursiva.",
    "\"Necesito escribir un [___] sobre [___] con aproximadamente [___] palabras. Primero crea un [___] completo con todas las secciones. Luego desarrolla sección por sección, garantizando [___] entre los temas y un [___] progresivo de principio a fin.\"",
    ["guía completa", "cómo montar una rutina de estudios eficiente", "2.000", "índice", "coherencia y fluidez", "profundización"],
    ["guía completa", "cómo montar una rutina de estudios eficiente", "2.000", "índice", "coherencia y fluidez", "profundización"],
    "Cercarlo primero en la disposición del índice por temas evita el monótono bloque interminable en estilo robótico e incoherente."
  ),
  textStep(
    "Corrigiendo Gramática y Ortografía",
    "Para quienes necesitan un texto impecable antes de publicar o enviar, Gemini funciona como un revisor ortotipográfico completo, detectando y enmendando errores con explicaciones claras."
  ),
  fillStep(
    "¡Corrige tu texto!",
    "Nunca aceptes la corrección a ciegas sin captar los fundamentos del defecto gramatical subsanado.",
    "\"Revisa el texto de abajo y corrige todos los errores de [___], [___] y [___]. Por cada corrección, [___] el error original, la versión corregida y una [___] breve del motivo de la rectificación. [Pega aquí el texto]\"",
    ["ortografía", "concordancia", "puntuación", "muestra", "explicación"],
    ["ortografía", "concordancia", "puntuación", "muestra", "explicación"],
    "Al requerir un informe pedagógico por cada coma arreglada, la máquina actúa secretamente como un profesor particular de gramática de la propia lengua."
  ),
  textStep(
    "Reescribiendo con Diferentes Estilos Literarios",
    "Para proyectos altamente creativos, Gemini puede transcribir el mismo argumento base por medio de enfoques narrativos variopintos: tono poético, reportaje investigativo, nota técnica..."
  ),
  fillStep(
    "¡Explora estilos insólitos!",
    "Lleva las barreras al extremo pidiendo mutar las líneas a estilos completamente opuestos.",
    "\"Vuelve a redactar el texto siguiente en [___] formatos dispares: un modo [___], otro esquema [___] y un corte enteramente [___]. Conserva el pilar de las [___] base, pero transforma el afán al [___] y el rebote [___] brindado en cada faceta. [Pega tu copia aquí]\"",
    ["3", "narrativo e intimista", "jornalístico distante", "arengador emotivo", "ideas", "expresar", "emocional"],
    ["3", "narrativo e intimista", "jornalístico distante", "arengador emotivo", "ideas", "expresar", "emocional"],
    "Tensionar fronteras induce a la computadora a exhibir propuestas comunicativas potentísimas que, frente al lienzo en blanco humano, son inalcanzables al instante."
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
  textStep(
    "Rédaction de Textes à Partir de Zéro",
    "La première et la plus courante des applications consiste à demander à Gemini de rédiger un texte complet en se basant sur les informations que vous fournissez : l'objectif, le public cible, le ton et le format."
  ),
  fillStep(
    "Demandez votre texte !",
    "Déterminez toutes les variables de votre texte en une seule instruction de guidage.",
    "\"Écris un [___] sur [___] pour [___]. Ton : [___]. L'objectif est de [___]. Inclus [___] au début pour capter l'attention et une [___] claire à la fin.\"",
    ["article", "les avantages du télétravail pour les petites entreprises", "des managers et entrepreneurs", "informativo y directo", "présenter des arguments pratiques et convaincants", "une donnée surprenante", "conclusion avec un appel à la réflexion"],
    ["article", "les avantages du télétravail pour les petites entreprises", "des managers et entrepreneurs", "informativo y directo", "présenter des arguments pratiques et convaincants", "une donnée surprenante", "conclusion avec un appel à la réflexion"],
    "Isoler chaque aspect rédactionnel (longueur, public cible, style, format) dans le prompt empêche l'IA d'adopter des positions extrêmes ou des styles artificiels standardisés."
  ),
  textStep(
    "Révision et Amélioration de Textes",
    "Vous avez déjà un texte rédigé mais vous sentez qu'il pourrait être meilleur. Gemini l'examine, signale les défauts et réécrit des parties spécifiques en conservant votre voix et intention d'origine."
  ),
  fillStep(
    "Révisez votre texte !",
    "Transformez le modèle en un rédacteur en chef expérimenté.",
    "\"Voici mon texte : [collez ici]. Révise-le et identifie : les passages avec un [___] de clarté, les parties qui sont [___], les fautes de [___] et les termes [___] qui peuvent être remplacés par des options plus précises. Ensuite, réécris-le en gardant mon [___] initial.\"",
    ["manque", "répétitives ou trop longues", "syntaxe et d'accord", "vagues", "ton et ma voix d'auteur"],
    ["manque", "répétitives ou trop longues", "syntaxe et d'accord", "vagues", "ton et ma voix d'auteur"],
    "Le forcer à garder votre identité verbale évite que votre texte finisse calqué et modelé par un incommensurable esprit froid d'ordinateur."
  ),
  textStep(
    "Adaptation du Ton et du Style",
    "Le même texte peut nécessiter des tons différents selon le canal ou selon le lectorat d'arrivée. Avec Gemini, vous calibrez une publication pour un monde institutionnel ou inspiratif d'un simple clic."
  ),
  fillStep(
    "Adaptez le ton de votre texte !",
    "Dupliquez finement le fond en altérant grandement l'apparence sur chaque point de contact.",
    "\"Je te donne un texte premier : [collez ici]. Traduis-le sous [___] variantes d'adaptation au niveau du ton : il m'en faut une mouture [___] pour le réseau pro interne de mails, une forme très [___] pour notre vitrine Instagram et un ultime jet [___] pour une revue technique des pairs. Il ne faut pas omettre le socle des [___] fondatrices, bien entendu.\"",
    ["3", "stricte et objective", "décontractée et accrocheuse", "méthodique et étayée", "idées"],
    ["3", "stricte et objective", "décontractée et accrocheuse", "méthodique et étayée", "idées"],
    "D'une phrase maîtresse, vous libérez la puissance d'un écosystème entier omnicanal, paré aux divers lancements."
  ),
  textStep(
    "Rédaction d'Emails Professionnels",
    "Les courriels figurent en tête des besognes épineuses quotidiennes corporatives. C'est le carrefour idéal pour se perdre en doutes psychologiques sur les bons angles d'approche. Gemini résout l'épineux email en peu de minutes."
  ),
  fillStep(
    "Rédigez votre email !",
    "Mariez fermeté tactique et belle tournure sans aucun échauffement d'esprit.",
    "\"Développe-moi un e-mail [___] à l'égard d'[___] concernant [___]. Le but final réside dans la ferme démarche visant à [___]. Le ton d'approche se doit d'être [___]. Soyez [___] et évitez [___]. Coiffe ceci par une ligne d'objet qui force le clic et l'[___].\"",
    ["professionnel", "un fournisseur avec qui nous avons eu un problème de livraison", "demander un remboursement ou un remplacement", "résoudre la situation de manière amicale mais ferme", "cordial et assertif", "professionnel", "des détours et un langage agressif", "ouverture"],
    ["professionnel", "un fournisseur avec qui nous avons eu un problème de livraison", "demander un remboursement ou un remplacement", "résoudre la situation de manière amicale mais ferme", "cordial et assertif", "professionnel", "des détours et un langage agressif", "ouverture"],
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
    "\"Produis un post taillé expressément pour le cercle [___] qui raconte [___]. N'oublie pas d'y forger : un immense [___] brisant le balayage passif à l'instant du premier regard, la limite totale s'échelonnant sur [___], l'incontournable [___] frontale clôturant et la liste de robustes [___]. Adopte sur l'ensemble une vue [___].\"",
    ["LinkedIn", "mon plus humiliant revers d'employé et ce qu'il m'a coûté avant de rebondir", "hameçon (hook)", "5 encarts descriptifs", "sollicitation au commentaire (call-to-action)", "tags (hashtags)", "très humaine et contemplative"],
    ["LinkedIn", "mon plus humiliant revers d'employé et ce qu'il m'a coûté avant de rebondir", "hameçon (hook)", "5 encarts descriptifs", "sollicitation au commentaire (call-to-action)", "tags (hashtags)", "très humaine et contemplative"],
    "Dicter des bornages et implanter des arrêts (les fameux 'hooks') forme le premier commandement impérieux encadrant une machinerie synthétisante générique."
  ),
  textStep(
    "Gérer d'Extrêmes Éditions Structurées",
    "L'élaboration de briques documentaires très denses (manuel, essai ou livre blanc massif) demande qu'on orchestre Gemini par d'étroits segments unifiant la clarté."
  ),
  fillStep(
    "Édifiez un gratte-ciel documentaire !",
    "La suprême clé du chantier textuel imposant épargnant au rédacteur humain l'essoufflement intellectuel de masse et prémunissant contre toute fabulation générée.",
    "\"Il me faut déployer l'équivalent publicatif d'un [___] en enseignant [___] d'un volume textuel gravant les [___] termes à la balance. Pose en toute majesté l'[___] complet initial englobant les chapitres. Dans un second temps, accouche les paragraphes pièce par pièce tout en surveillant la [___] d'une partie vers l'autre assurant d'avoir un lent et robuste [___] logique jusqu'au terme ultime de l'œuvre.\"",
    ["manifeste directeur absolu", "les piliers en or pour acquérir le savoir continuel auto-didacte", "2000", "arborescence (le squelette)", "suture fluide", "développement graduel"],
    ["manifeste directeur absolu", "les piliers en or pour acquérir le savoir continuel auto-didacte", "2000", "arborescence (le squelette)", "suture fluide", "développement graduel"],
    "Borner l'édifice mental à travers un sommaire tranché annule radicalement la menace d'un rendu lourd redondant au rythme cadavérique."
  ),
  textStep(
    "La Sentinelle Éducative de la Langue",
    "C'est sur ce rempart de grammaire pointilleux qu'on érige sa probité de diffuseur, repérant d'intraitables lacunes de liaison, des ratures latentes de frappes et administrant en retour le précieux rappel justifiant la mutation ordonnée par Gemini."
  ),
  fillStep(
    "Guérissez votre composition en la comprenant !",
    "Devenez imbattable en excommuniant la passivité ; ne validez aucune correction obscure du système par le biais du mutisme.",
    "\"Agis comme le correcteur suprême de ce fragment en bannissant les crimes d'[___], d'[___] et de stricte [___]. Face à tes redressements, j'exige d'y [___] le vice d'origine juxtaposé face à la guérison choisie puis une nette [___] didactique succincte arguant de ladite norme appliquée et réparée de mon lourd pêché textuel originel. [Déposer l'extrait cible ici]\"",
    ["orthographe", "accords de grammaire", "syntaxe de ponctuation", "constater", "règle enseignée"],
    ["orthographe", "accords de grammaire", "syntaxe de ponctuation", "constater", "règle enseignée"],
    "Exiger cette expertise méticuleuse du modèle propulse le dictionnaire virtuel dans l'arène inestimable d'un tuteur pédagogique."
  ),
  textStep(
    "Réécritures Littéraires Polymorphes",
    "Au gré de vos audaces intellectuelles, ordonnez à Gemini de contorsionner vos blocs discursifs sous maints angles narratifs (pimenté de poésie candide, corsé par de la rigueur froide journalistique, teinté de sagesse technique palpable…)."
  ),
  fillStep(
    "Testez les prismes narratifs opposés !",
    "Ouvrir grand la porte dimensionnelle en convoquant trois orateurs invisibles s'entrechoquant.",
    "\"Prends en charge cette prose initiale : [Copiez cela ci-dessous]. Modifie-la entièrement sous la contrainte de [___] gabarits d'éloquences bien distincts : délivre mon propos sous l'allure d'un conte [___], puis verse-le dans le moule d'une investigation [___], pour achever ta mue sous des accents criants d'un appel [___]. Verouille scrupuleusement les [___] mères mais réinvente intégralement ta façon d'[___] et la sève [___] qui les cimente.\"",
    ["3", "narratif intime", "journalistique distant", "inspirant enflammé", "idées", "exprimer", "émotive ressentie"],
    ["3", "narratif intime", "journalistique distant", "inspirant enflammé", "idées", "exprimer", "émotive ressentie"],
    "Commander de l'inattendu radical au programme l'oblige à se surpasser, déverrouillant une fraîcheur lexicale surprenante et inédite devant un brouillon asséché."
  ),
  textStep(
    "Conclusion",
    "Fort d'avoir embarqué Gemini comme acolyte perpétuel de l'encre numérique, la glaçante agonie vertigineuse d'une page blanche déserte appartient résolument au passé mort de l'informatique. Architecture complexe, retouches magistrales, pirouettes de style et de ton, urgences du mail ou vastitude d'un blog de bord... vos exigences prennent forme du premier coup d'œil, balayant à main nue des barrières productives autrefois immenses.\n\nS'il est admis que ciseler la phrase portait les vertus du pouvoir de convaincre depuis des siècles, aujourd'hui l'assistant vous livre ce sceptre sans lutte titanesque. L'exigence de la rédaction n'a besoin que d'une intention ordonnée intelligemment.\n\nPrenez votre élan. Caressez la réussite."
  )
] as const;
