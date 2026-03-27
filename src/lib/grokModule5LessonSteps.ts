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

export const GROK_MODULE_5_STEPS_PT = [
  textStep(
    "Usando o Chat de Voz do Grok",
    "Bem-vindo. Nesta licao, voce vai aprender como usar o chat de voz do Grok para conversar com inteligencia artificial de forma natural, rapida e espontanea. Diferente de muitos assistentes, o Grok foi pensado para um estilo mais direto, descontraido e dinamico."
  ),
  textStep(
    "Por que o Chat de Voz do Grok e Diferente",
    "A maioria dos assistentes tenta manter um tom neutro e formal. O Grok adota uma comunicacao mais natural, direta e espontanea, tornando a experiencia mais proxima de um dialogo humano."
  ),
  quizStep(
    "O diferencial do chat de voz",
    "Por que o chat de voz do Grok se destaca em comparacao com outras IAs?",
    [
      "Porque ele usa uma comunicacao mais natural, direta e espontanea, tornando as conversas mais dinamicas e proximas de um dialogo humano.",
      "Porque o Grok fala mais rapido que outras IAs.",
      "Porque chat de voz funciona apenas em dispositivos moveis.",
      "Porque o Grok responde apenas perguntas simples."
    ],
    0,
    "O principal diferencial nao e velocidade ou dispositivo, mas a sensacao de conversa mais viva, direta e menos robotica."
  ),
  textStep(
    "Iniciando uma Conversa por Voz",
    "O chat de voz permite interagir com o Grok sem precisar digitar. Em muitos casos, falar e mais rapido e mais natural do que montar perguntas longas por escrito."
  ),
  fillStep(
    "Preencha a lacuna - Comece a conversa!",
    "Monte um passo a passo simples para iniciar o chat de voz.",
    "\"Para usar o chat de voz no Grok: abra o aplicativo, toque no botao de ___, fale sua ___ ou comando e aguarde o Grok ___ com uma resposta em audio.\"",
    ["microfone", "pergunta", "responder"],
    ["microfone", "pergunta", "responder", "camera", "imagem", "desligar"],
    "O fluxo basico envolve abrir o recurso de voz, falar com clareza e esperar a resposta em audio."
  ),
  textStep(
    "Conversacao Mais Espontanea",
    "O Grok foi projetado para conversar de forma mais natural e descontraida. Isso permite perguntas mais rapidas, respostas mais imediatas e menos rigidez do que em comandos muito formais."
  ),
  fillStep(
    "Preencha a lacuna - Converse naturalmente!",
    "Monte um pedido que valorize um estilo mais conversacional.",
    "\"Faca perguntas ao Grok como faria em uma conversa normal, usando linguagem ___ e frases ___, permitindo que a conversa flua de forma mais ___.\"",
    ["natural", "espontaneas", "dinamica"],
    ["natural", "espontaneas", "dinamica", "tecnica", "travadas", "rigida"],
    "Quanto mais clara e conversacional for a fala, mais natural tende a ficar a interacao."
  ),
  textStep(
    "Personalidade Mais Direta e Descontraida",
    "Uma caracteristica marcante do Grok e sua personalidade mais direta. Isso torna a conversa mais envolvente e menos parecida com um manual tecnico."
  ),
  fillStep(
    "Preencha a lacuna - Entenda o estilo!",
    "Monte uma frase que descreva o jeito de responder do Grok.",
    "\"O Grok foi projetado para ter um estilo de comunicacao mais ___, as vezes ___ e com respostas mais ___ do que assistentes tradicionais.\"",
    ["descontraido", "provocativo", "diretas"],
    ["descontraido", "provocativo", "diretas", "burocratico", "lento", "neutras"],
    "O tom do Grok se destaca por parecer mais solto, rapido e humano do que o de assistentes excessivamente formais."
  ),
  textStep(
    "Usando o Chat de Voz para Ideias Rapidas",
    "O chat de voz funciona muito bem para brainstorming. Falar em voz alta ajuda a explorar ideias sem perder tempo montando prompts longos."
  ),
  fillStep(
    "Preencha a lacuna - Gere ideias!",
    "Monte um pedido de brainstorming por voz.",
    "\"Me de ___ ideias rapidas para ___ e explique cada uma em poucas frases.\"",
    ["5", "um projeto de marketing"],
    ["5", "um projeto de marketing", "1", "uma resposta final"],
    "Pedidos curtos e objetivos funcionam muito bem em conversas por voz quando voce quer gerar ideias rapidamente."
  ),
  textStep(
    "Usando Voz para Aprender Mais Rapido",
    "O chat de voz tambem pode funcionar como tutor. Explicacoes faladas tendem a soar mais naturais e podem facilitar a compreensao de conceitos mais abstratos."
  ),
  fillStep(
    "Preencha a lacuna - Aprenda com voz!",
    "Monte um prompt simples para pedir uma explicacao didatica.",
    "\"Explique ___ de forma simples, como se estivesse ensinando para um ___.\"",
    ["inteligencia artificial", "iniciante"],
    ["inteligencia artificial", "iniciante", "especialista", "veterano"],
    "Quando voce define o tema e o nivel de quem esta aprendendo, o Grok consegue ajustar melhor a explicacao."
  ),
  textStep(
    "Refinando Conversas por Voz",
    "Assim como no chat de texto, voce pode pedir ajustes na resposta. Em vez de recomecar, vale orientar o Grok para simplificar, detalhar ou trazer exemplos melhores."
  ),
  fillStep(
    "Preencha a lacuna - Ajuste respostas!",
    "Monte um pedido curto para refinar uma explicacao por voz.",
    "\"Explique novamente de forma mais ___ e com um exemplo ___.\"",
    ["simples", "pratico"],
    ["simples", "pratico", "vaga", "abstrato"],
    "Refinar uma resposta e mais eficiente do que reiniciar a conversa, especialmente quando voce ja esta perto do que precisa."
  ),
  textStep(
    "Boas Praticas ao Usar o Chat de Voz",
    "O erro mais comum ao usar chat de voz com IA e falar de forma confusa ou sem contexto suficiente. Quanto mais clara e direta for a sua fala, mais util tende a ser a resposta."
  ),
  quizStep(
    "Erro mais comum no chat de voz",
    "Qual e o erro mais comum ao usar chat de voz com IA?",
    [
      "Fazer perguntas complexas.",
      "Pedir exemplos praticos.",
      "Falar de forma confusa ou sem contexto suficiente.",
      "Conversar naturalmente."
    ],
    2,
    "A clareza continua sendo essencial. Mesmo na voz, contexto e objetividade fazem muita diferenca na qualidade da resposta."
  ),
  textStep(
    "Conclusao",
    "O chat de voz do Grok traz uma forma mais natural de interagir com inteligencia artificial. Comunicacao espontanea, respostas mais diretas e conversas dinamicas tornam a experiencia mais proxima de um dialogo humano.\n\nConverse naturalmente. Explore ideias rapidamente. Aprenda com dialogo.\n\nLicao concluida."
  ),
] as const;

export const GROK_MODULE_5_STEPS_EN = [
  textStep(
    "Using Grok Voice Chat",
    "Welcome. In this lesson, you will learn how to use Grok voice chat to speak with artificial intelligence in a natural, fast, and spontaneous way. Unlike many assistants, Grok was designed with a more direct, relaxed, and dynamic style."
  ),
  textStep(
    "Why Grok Voice Chat Is Different",
    "Most AI assistants try to keep a neutral and formal tone. Grok uses a more natural, direct, and spontaneous communication style, which makes the experience feel closer to a human dialogue."
  ),
  quizStep(
    "What makes voice chat stand out",
    "Why does Grok voice chat stand out compared with other AIs?",
    [
      "Because it uses a more natural, direct, and spontaneous communication style, making conversations more dynamic and closer to a human dialogue.",
      "Because Grok speaks faster than other AIs.",
      "Because voice chat only works on mobile devices.",
      "Because Grok only answers simple questions."
    ],
    0,
    "The main differentiator is not speed or device support, but the feeling of a more alive, direct, and less robotic conversation."
  ),
  textStep(
    "Starting a Voice Conversation",
    "Voice chat lets you interact with Grok without typing. In many cases, speaking is faster and more natural than writing long questions."
  ),
  fillStep(
    "Fill in the blank - Start the conversation!",
    "Build a simple step-by-step prompt for beginning voice chat.",
    "\"To use voice chat in Grok: open the app, tap the ___ button, say your ___ or command, and wait for Grok to ___ with an audio response.\"",
    ["microphone", "question", "respond"],
    ["microphone", "question", "respond", "camera", "image", "disconnect"],
    "The basic flow is to open the voice feature, speak clearly, and wait for the spoken reply."
  ),
  textStep(
    "More Spontaneous Conversation",
    "Grok was designed to speak in a more natural and relaxed way. That allows quicker questions, more immediate answers, and less rigidity than highly formal commands."
  ),
  fillStep(
    "Fill in the blank - Speak naturally!",
    "Build a request that values a more conversational style.",
    "\"Ask Grok questions as you would in a normal conversation, using ___ language and ___ sentences, allowing the exchange to flow in a more ___ way.\"",
    ["natural", "spontaneous", "dynamic"],
    ["natural", "spontaneous", "dynamic", "technical", "stiff", "rigid"],
    "The clearer and more conversational your speech is, the more natural the interaction tends to become."
  ),
  textStep(
    "A More Direct and Relaxed Personality",
    "One of Grok's strongest characteristics is its more direct personality. That makes the interaction feel more engaging and less like reading a technical manual."
  ),
  fillStep(
    "Fill in the blank - Understand the style!",
    "Build a sentence that describes Grok's tone.",
    "\"Grok was designed to have a more ___ communication style, sometimes ___, and with responses that are more ___ than those of traditional assistants.\"",
    ["relaxed", "provocative", "direct"],
    ["relaxed", "provocative", "direct", "bureaucratic", "slow", "neutral"],
    "Grok's tone stands out because it feels looser, faster, and more human than overly formal assistants."
  ),
  textStep(
    "Using Voice Chat for Quick Ideas",
    "Voice chat works very well for brainstorming. Speaking out loud helps you explore ideas without losing time building long prompts."
  ),
  fillStep(
    "Fill in the blank - Generate ideas!",
    "Build a voice brainstorming request.",
    "\"Give me ___ quick ideas for ___ and explain each one in a few sentences.\"",
    ["5", "a marketing project"],
    ["5", "a marketing project", "1", "a final answer"],
    "Short and direct requests work especially well in voice conversations when you want fast idea generation."
  ),
  textStep(
    "Using Voice to Learn Faster",
    "Voice chat can also work like a tutor. Spoken explanations often feel more natural and can make abstract concepts easier to understand."
  ),
  fillStep(
    "Fill in the blank - Learn with voice!",
    "Build a simple prompt asking for a beginner-friendly explanation.",
    "\"Explain ___ in a simple way, as if you were teaching a ___.\"",
    ["artificial intelligence", "beginner"],
    ["artificial intelligence", "beginner", "expert", "veteran"],
    "When you define both the topic and the learner's level, Grok can adapt the explanation more effectively."
  ),
  textStep(
    "Refining Voice Conversations",
    "Just like in text chat, you can ask for adjustments. Instead of restarting, it is often better to ask Grok to simplify, expand, or bring stronger examples."
  ),
  fillStep(
    "Fill in the blank - Adjust responses!",
    "Build a short request to refine a spoken explanation.",
    "\"Explain it again in a more ___ way and with a ___ example.\"",
    ["simple", "practical"],
    ["simple", "practical", "vague", "abstract"],
    "Refining an answer is usually more efficient than restarting the conversation, especially when the answer is already close to what you need."
  ),
  textStep(
    "Best Practices for Voice Chat",
    "The most common mistake when using AI voice chat is speaking in a confusing way or without enough context. The clearer and more direct your speech is, the more useful the answer tends to be."
  ),
  quizStep(
    "Most common voice chat mistake",
    "What is the most common mistake when using AI voice chat?",
    [
      "Asking complex questions.",
      "Requesting practical examples.",
      "Speaking in a confusing way or without enough context.",
      "Speaking naturally."
    ],
    2,
    "Clarity still matters. Even in voice, context and directness strongly affect the quality of the reply."
  ),
  textStep(
    "Conclusion",
    "Grok voice chat offers a more natural way to interact with artificial intelligence. Spontaneous communication, more direct answers, and dynamic exchanges make the experience feel closer to a real dialogue.\n\nSpeak naturally. Explore ideas quickly. Learn through dialogue.\n\nLesson completed."
  ),
] as const;

export const GROK_MODULE_5_STEPS_ES = [
  textStep(
    "Usando el Chat de Voz de Grok",
    "Bienvenido. En esta leccion aprenderas a usar el chat de voz de Grok para hablar con inteligencia artificial de forma natural, rapida y espontanea. A diferencia de muchos asistentes, Grok fue pensado con un estilo mas directo, relajado y dinamico."
  ),
  textStep(
    "Por que el Chat de Voz de Grok es Diferente",
    "La mayoria de los asistentes de IA intenta mantener un tono neutro y formal. Grok usa una comunicacion mas natural, directa y espontanea, lo que hace que la experiencia se sienta mas cercana a un dialogo humano."
  ),
  quizStep(
    "Que hace destacar al chat de voz",
    "Por que el chat de voz de Grok se destaca frente a otras IAs?",
    [
      "Porque usa una comunicacion mas natural, directa y espontanea, haciendo que las conversaciones sean mas dinamicas y cercanas a un dialogo humano.",
      "Porque Grok habla mas rapido que otras IAs.",
      "Porque el chat de voz solo funciona en dispositivos moviles.",
      "Porque Grok solo responde preguntas simples."
    ],
    0,
    "La diferencia principal no es la velocidad ni el dispositivo, sino la sensacion de una conversacion mas viva, directa y menos robotica."
  ),
  textStep(
    "Iniciando una Conversacion por Voz",
    "El chat de voz te permite interactuar con Grok sin escribir. En muchos casos, hablar es mas rapido y natural que redactar preguntas largas."
  ),
  fillStep(
    "Completa el espacio - Empieza la conversacion!",
    "Construye un paso a paso simple para iniciar el chat de voz.",
    "\"Para usar el chat de voz en Grok: abre la aplicacion, toca el boton de ___, di tu ___ o comando y espera a que Grok ___ con una respuesta en audio.\"",
    ["microfono", "pregunta", "responder"],
    ["microfono", "pregunta", "responder", "camara", "imagen", "desconectar"],
    "El flujo basico consiste en abrir la funcion de voz, hablar con claridad y esperar la respuesta hablada."
  ),
  textStep(
    "Conversacion Mas Espontanea",
    "Grok fue disenado para conversar de forma mas natural y relajada. Eso permite preguntas mas rapidas, respuestas mas inmediatas y menos rigidez que en comandos demasiado formales."
  ),
  fillStep(
    "Completa el espacio - Habla naturalmente!",
    "Construye una indicacion que valore un estilo mas conversacional.",
    "\"Haz preguntas a Grok como lo harias en una conversacion normal, usando lenguaje ___ y frases ___, permitiendo que el intercambio fluya de forma mas ___.\"",
    ["natural", "espontaneas", "dinamica"],
    ["natural", "espontaneas", "dinamica", "tecnico", "rigidas", "cerrada"],
    "Cuanto mas clara y conversacional sea tu forma de hablar, mas natural tendera a sentirse la interaccion."
  ),
  textStep(
    "Una Personalidad Mas Directa y Relajada",
    "Una de las caracteristicas mas marcadas de Grok es su personalidad mas directa. Eso hace que la interaccion se sienta mas atractiva y menos parecida a un manual tecnico."
  ),
  fillStep(
    "Completa el espacio - Entiende el estilo!",
    "Construye una frase que describa el tono de Grok.",
    "\"Grok fue disenado para tener un estilo de comunicacion mas ___, a veces ___ y con respuestas mas ___ que las de asistentes tradicionales.\"",
    ["relajado", "provocativo", "directas"],
    ["relajado", "provocativo", "directas", "burocratico", "lento", "neutras"],
    "El tono de Grok destaca porque se siente mas suelto, rapido y humano que el de asistentes demasiado formales."
  ),
  textStep(
    "Usando el Chat de Voz para Ideas Rapidas",
    "El chat de voz funciona muy bien para brainstorming. Hablar en voz alta te ayuda a explorar ideas sin perder tiempo armando prompts largos."
  ),
  fillStep(
    "Completa el espacio - Genera ideas!",
    "Construye una solicitud de brainstorming por voz.",
    "\"Dame ___ ideas rapidas para ___ y explica cada una en pocas frases.\"",
    ["5", "un proyecto de marketing"],
    ["5", "un proyecto de marketing", "1", "una respuesta final"],
    "Las solicitudes cortas y directas funcionan muy bien en conversaciones por voz cuando quieres generar ideas rapido."
  ),
  textStep(
    "Usando la Voz para Aprender Mas Rapido",
    "El chat de voz tambien puede funcionar como tutor. Las explicaciones habladas suelen sentirse mas naturales y pueden facilitar la comprension de conceptos abstractos."
  ),
  fillStep(
    "Completa el espacio - Aprende con voz!",
    "Construye un prompt simple para pedir una explicacion didactica.",
    "\"Explica ___ de forma simple, como si estuvieras ensenando a un ___.\"",
    ["inteligencia artificial", "principiante"],
    ["inteligencia artificial", "principiante", "experto", "veterano"],
    "Cuando defines el tema y el nivel de quien aprende, Grok puede ajustar mucho mejor la explicacion."
  ),
  textStep(
    "Refinando Conversaciones por Voz",
    "Igual que en el chat de texto, puedes pedir ajustes en la respuesta. En lugar de empezar de cero, suele ser mejor pedirle a Grok que simplifique, amplie o traiga mejores ejemplos."
  ),
  fillStep(
    "Completa el espacio - Ajusta respuestas!",
    "Construye una solicitud corta para refinar una explicacion hablada.",
    "\"Explicalo de nuevo de forma mas ___ y con un ejemplo ___.\"",
    ["simple", "practico"],
    ["simple", "practico", "vaga", "abstracto"],
    "Refinar una respuesta suele ser mas eficiente que reiniciar la conversacion, especialmente cuando ya estas cerca de lo que necesitas."
  ),
  textStep(
    "Buenas Practicas al Usar el Chat de Voz",
    "El error mas comun al usar chat de voz con IA es hablar de forma confusa o sin suficiente contexto. Cuanto mas clara y directa sea tu voz, mas util tendera a ser la respuesta."
  ),
  quizStep(
    "Error mas comun en chat de voz",
    "Cual es el error mas comun al usar chat de voz con IA?",
    [
      "Hacer preguntas complejas.",
      "Pedir ejemplos practicos.",
      "Hablar de forma confusa o sin suficiente contexto.",
      "Hablar naturalmente."
    ],
    2,
    "La claridad sigue siendo clave. Incluso en voz, el contexto y la objetividad cambian mucho la calidad de la respuesta."
  ),
  textStep(
    "Conclusion",
    "El chat de voz de Grok trae una forma mas natural de interactuar con inteligencia artificial. La comunicacion espontanea, las respuestas mas directas y los intercambios dinamicos hacen que la experiencia se sienta mas cercana a un dialogo real.\n\nHabla con naturalidad. Explora ideas rapido. Aprende mediante el dialogo.\n\nLeccion completada."
  ),
] as const;

export const GROK_MODULE_5_STEPS_FR = [
  textStep(
    "Utiliser le Chat Vocal de Grok",
    "Bienvenue. Dans cette lecon, vous allez apprendre a utiliser le chat vocal de Grok pour parler avec une intelligence artificielle de facon naturelle, rapide et spontanee. Contrairement a beaucoup d'assistants, Grok a ete pense avec un style plus direct, detendu et dynamique."
  ),
  textStep(
    "Pourquoi le Chat Vocal de Grok est Different",
    "La plupart des assistants IA essaient de garder un ton neutre et formel. Grok utilise une communication plus naturelle, directe et spontanee, ce qui rend l'experience plus proche d'un vrai dialogue humain."
  ),
  quizStep(
    "Ce qui distingue le chat vocal",
    "Pourquoi le chat vocal de Grok se distingue-t-il par rapport aux autres IA ?",
    [
      "Parce qu'il utilise une communication plus naturelle, directe et spontanee, rendant les conversations plus dynamiques et plus proches d'un dialogue humain.",
      "Parce que Grok parle plus vite que les autres IA.",
      "Parce que le chat vocal fonctionne seulement sur mobile.",
      "Parce que Grok ne repond qu'a des questions simples."
    ],
    0,
    "La vraie difference ne vient ni de la vitesse ni du support, mais de la sensation d'une conversation plus vivante, directe et moins robotique."
  ),
  textStep(
    "Commencer une Conversation Vocale",
    "Le chat vocal vous permet d'interagir avec Grok sans taper. Dans beaucoup de cas, parler est plus rapide et plus naturel qu'ecrire de longues questions."
  ),
  fillStep(
    "Completez le blanc - Commencez la conversation !",
    "Construisez une etape simple pour demarrer le chat vocal.",
    "\"Pour utiliser le chat vocal dans Grok : ouvrez l'application, appuyez sur le bouton ___, dites votre ___ ou commande, puis attendez que Grok ___ avec une reponse audio.\"",
    ["microphone", "question", "reponde"],
    ["microphone", "question", "reponde", "camera", "image", "se deconnecte"],
    "Le flux de base consiste a ouvrir la fonction vocale, parler clairement et attendre la reponse par audio."
  ),
  textStep(
    "Une Conversation Plus Spontanee",
    "Grok a ete concu pour parler de facon plus naturelle et detendue. Cela permet des questions plus rapides, des reponses plus immediates et moins de rigidite que des commandes trop formelles."
  ),
  fillStep(
    "Completez le blanc - Parlez naturellement !",
    "Construisez une consigne qui valorise un style plus conversationnel.",
    "\"Posez des questions a Grok comme dans une conversation normale, en utilisant un langage ___ et des phrases ___, afin que l'echange se fasse de facon plus ___.\"",
    ["naturel", "spontanees", "dynamique"],
    ["naturel", "spontanees", "dynamique", "technique", "raides", "rigide"],
    "Plus votre facon de parler est claire et conversationnelle, plus l'interaction a tendance a sembler naturelle."
  ),
  textStep(
    "Une Personnalite Plus Directe et Detendue",
    "L'une des caracteristiques marquantes de Grok est sa personnalite plus directe. Cela rend l'interaction plus engageante et moins proche d'un manuel technique."
  ),
  fillStep(
    "Completez le blanc - Comprenez le style !",
    "Construisez une phrase qui decrit le ton de Grok.",
    "\"Grok a ete concu pour avoir un style de communication plus ___, parfois ___, avec des reponses plus ___ que celles des assistants traditionnels.\"",
    ["detendu", "provocateur", "directes"],
    ["detendu", "provocateur", "directes", "bureaucratique", "lent", "neutres"],
    "Le ton de Grok se distingue parce qu'il semble plus libre, plus rapide et plus humain que celui d'assistants trop formels."
  ),
  textStep(
    "Utiliser le Chat Vocal pour des Idees Rapides",
    "Le chat vocal fonctionne tres bien pour le brainstorming. Parler a voix haute aide a explorer des idees sans perdre de temps a construire de longs prompts."
  ),
  fillStep(
    "Completez le blanc - Generez des idees !",
    "Construisez une demande de brainstorming vocal.",
    "\"Donne-moi ___ idees rapides pour ___ et explique chacune en quelques phrases.\"",
    ["5", "un projet marketing"],
    ["5", "un projet marketing", "1", "une reponse finale"],
    "Les demandes courtes et directes fonctionnent tres bien en conversation vocale quand vous voulez generer des idees rapidement."
  ),
  textStep(
    "Utiliser la Voix pour Apprendre Plus Vite",
    "Le chat vocal peut aussi servir de tuteur. Les explications orales semblent souvent plus naturelles et peuvent faciliter la comprehension de concepts abstraits."
  ),
  fillStep(
    "Completez le blanc - Apprenez avec la voix !",
    "Construisez un prompt simple pour demander une explication pedagogique.",
    "\"Explique ___ de facon simple, comme si tu enseignais a un ___.\"",
    ["l'intelligence artificielle", "debutant"],
    ["l'intelligence artificielle", "debutant", "expert", "veteran"],
    "Quand vous precisez le sujet et le niveau de la personne, Grok peut beaucoup mieux adapter l'explication."
  ),
  textStep(
    "Affiner les Conversations Vocales",
    "Comme dans le chat texte, vous pouvez demander des ajustements. Au lieu de recommencer, il vaut souvent mieux demander a Grok de simplifier, detailler ou apporter de meilleurs exemples."
  ),
  fillStep(
    "Completez le blanc - Ajustez les reponses !",
    "Construisez une demande courte pour affiner une explication vocale.",
    "\"Explique encore une fois de facon plus ___ et avec un exemple ___.\"",
    ["simple", "pratique"],
    ["simple", "pratique", "vague", "abstrait"],
    "Affiner une reponse est souvent plus efficace que relancer toute la conversation, surtout quand la reponse est deja proche de ce qu'il vous faut."
  ),
  textStep(
    "Bonnes Pratiques pour le Chat Vocal",
    "L'erreur la plus courante avec le chat vocal IA est de parler de facon confuse ou sans assez de contexte. Plus votre parole est claire et directe, plus la reponse sera utile."
  ),
  quizStep(
    "Erreur la plus frequente en chat vocal",
    "Quelle est l'erreur la plus courante quand on utilise le chat vocal avec une IA ?",
    [
      "Poser des questions complexes.",
      "Demander des exemples pratiques.",
      "Parler de facon confuse ou sans assez de contexte.",
      "Parler naturellement."
    ],
    2,
    "La clarte reste essentielle. Meme en vocal, le contexte et la precision changent fortement la qualite de la reponse."
  ),
  textStep(
    "Conclusion",
    "Le chat vocal de Grok apporte une facon plus naturelle d'interagir avec l'intelligence artificielle. Une communication spontanee, des reponses plus directes et des echanges dynamiques rendent l'experience plus proche d'un vrai dialogue.\n\nParlez naturellement. Explorez des idees rapidement. Apprenez par le dialogue.\n\nLecon terminee."
  ),
] as const;
