import {
  AiTrailFillBlanksLessonStep,
  AiTrailQuizLessonStep,
  AiTrailTextLessonStep,
} from "./aiTrailContent";

const textStep = (
  title: string,
  content: string,
  promptBox?: string,
): AiTrailTextLessonStep => ({
  type: "text",
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
): AiTrailQuizLessonStep => ({
  type: "quiz",
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
): AiTrailFillBlanksLessonStep => ({
  type: "fill_blanks",
  title,
  instruction,
  sentence,
  answers,
  options,
  explanation,
});

export const CHATGPT_MODULE_4_STEPS_PT = [
  textStep(
    "Dados Importam",
    "Bem-vindo novamente! Nesta lição, você vai elevar o nível e entender uma parte crucial do uso de IA — fornecer dados ao ChatGPT."
  ),
  quizStep(
    "A Importância dos Dados",
    "Por que é importante fornecer dados ao ChatGPT?",
    [
      "Limita as capacidades da IA",
      "Fornece o contexto e as informações necessárias para gerar respostas precisas e relevantes",
      "Torna o modelo mais divertido",
      "Acelera o tempo de resposta"
    ],
    1,
    "Ao fornecer informações relevantes de antemão, você orienta a IA para gerar resultados mais contextuais e úteis."
  ),
  textStep(
    "A Base do Contexto",
    "Essa técnica é importante porque permite adaptar as respostas do ChatGPT às suas necessidades específicas. Ao fornecer informações relevantes de antemão, você orienta a IA para gerar resultados mais precisos, contextuais e úteis. Pense nisso como um mini-briefing que você entrega ao ChatGPT antes de pedir que ele execute uma tarefa."
  ),
  fillStep(
    "Exercício — Planejamento Alimentar",
    "Complete a lacuna com os termos corretos para montar o briefing.",
    '"Preciso de ajuda para planejar uma ___ saudável para a semana. Sou ___, não tenho muito tempo para cozinhar e prefiro refeições com no máximo ___ ingredientes."',
    ["dieta", "vegetariano", "5"],
    ["dieta", "vegetariano", "5", "pizza", "churrasco", "20"],
    "Sendo claro em suas restrições (dieta vegetariana e max 5 ingredientes), o ChatGPT não recomendará carnes ou pratos complexos."
  ),
  textStep(
    "Perguntas a Fazer",
    "Como você deve ter percebido, o segredo está em ser conciso e relevante nas informações que fornece."
  ),
  quizStep(
    "Garantindo a Compreensão",
    "O que você deve considerar para garantir que o ChatGPT entenda sua consulta?",
    [
      "O conhecimento de base necessário, incluindo terminologia específica, fatos ou restrições",
      "Como confundir a IA com informações vagas para testá-la",
      "Os tópicos favoritos e hobbies da IA",
      "Como tornar o prompt o mais curto possível cortando descrições"
    ],
    0,
    "Entregar os contornos, terminologias exclusivas e regras claras formam a barreira para resultados ruins."
  ),
  textStep(
    "O Exemplo do Evento",
    "Vamos analisar um exemplo prático. Imagine que você está organizando um evento comunitário de coleta de lixo na sua cidade. Há várias formas de pedir ajuda ao ChatGPT.\n\nVocê pode simplesmente pedir: \"Me dê ideias para divulgar um evento.\" Mas assim provavelmente vai receber sugestões genéricas que não servem para a sua situação específica.\n\nAgora imagine fornecer contexto real: tipo do evento, público-alvo, cidade, data e canais de comunicação disponíveis. O resultado vai ser completamente diferente."
  ),
  quizStep(
    "Contexto x Perguntas Genéricas",
    "Por que fornecer contexto ao ChatGPT é melhor do que fazer perguntas genéricas?",
    [
      "Evita que o ChatGPT consuma seus créditos diários",
      "Faz a IA trabalhar mais rápido ao fornecer menos informações",
      "Garante que as respostas sejam mais longas, independentemente de sua relevância",
      "Prepara o ChatGPT para gerar ideias mais relevantes e personalizadas, com base no seu objetivo, público e contexto real"
    ],
    3,
    "Fornecer contexto ancora a IA na sua realidade, em vez de deixá-la voar sobre médias estatísticas."
  ),
  textStep(
    "O Exemplo do Idioma",
    "Outro exemplo prático: imagine que você está pedindo ao ChatGPT ajuda para aprender um novo idioma. Em vez de perguntar genericamente \"como aprender inglês?\", você pode especificar seu nível atual, quanto tempo tem por dia para estudar, seu objetivo e o seu estilo de aprendizado preferido.\n\nDessa forma, o ChatGPT pode oferecer um plano muito mais direcionado e útil."
  ),
  textStep(
    "Regras Importantes para Fornecer Dados à IA",
    "Lembre-se: o ChatGPT é incrivelmente capaz, mas não é onisciente. Ele não guarda memória de conversas anteriores — a menos que você esteja usando o GPT-5.2 com memória ativada. Por isso, pode ser necessário reafirmar o contexto importante ao iniciar uma nova sessão ou retomar uma tarefa."
  ),
  quizStep(
    "Iniciando em um Projeto Longo",
    "Se você está trabalhando em um projeto longo e abre uma nova conversa com o ChatGPT, o que deve fazer primeiro?",
    [
      "Criar uma conta nova para reiniciar tudo do zero",
      "Reafirmar os pontos-chave e fornecer o contexto necessário para continuar de onde parou",
      "Começar a fazer perguntas diretas sem contexto",
      "Esperar que o modelo lembre do que foi discutido antes"
    ],
    1,
    "Cada conversa em branco é como se o modelo tivesse acabado de acordar sem memórias, a menos que o sistema de Memória Persistente atue. Sempre reinsira os fatos."
  ),
  textStep(
    "Desenvolvendo a Prática",
    "No geral, à medida que você pratica, vai desenvolvendo uma percepção natural de quais informações são mais importantes incluir — e como apresentá-las de forma eficaz. O objetivo é sempre fornecer contexto suficiente para que o ChatGPT entenda suas necessidades sem sobrecarregá-lo com detalhes irrelevantes."
  ),
  textStep(
    "Personalização — Fazendo o ChatGPT Responder do Seu Jeito",
    "O ChatGPT não tem um único jeito de responder. Ele se adapta ao contexto que você fornece. E existe uma forma de tornar isso permanente: a personalização.\n\nAcesse: Configurações → Personalização\n\nPor lá, você pode ajustar o tom das respostas (simples, direto ou técnico), o tipo de explicação (curta ou detalhada) e o uso principal que você faz da ferramenta, seja para estudo, trabalho ou criação de conteúdo.\n\nNão existe um texto ideal. O melhor é o que combina com o seu objetivo e o seu jeito de trabalhar. Comece simples e ajuste conforme for sentindo necessidade.\n\nExemplo de texto de personalização:\n\"Quero respostas claras, práticas e objetivas. Prefiro linguagem simples e exemplos quando possível. Uso o ChatGPT para aprender, organizar ideias e resolver problemas do dia a dia. Evite respostas genéricas.\""
  ),
  quizStep(
    "Configuração Pessoal",
    "Qual das opções abaixo é um bom texto de personalização para o ChatGPT?",
    [
      '"Pode responder do jeito que quiser, tanto faz"',
      '"Não preciso de contexto, só me dê a resposta"',
      '"Responda sempre de forma longa e com palavras difíceis"',
      '"Prefiro respostas diretas, com exemplos práticos e linguagem simples. Uso o ChatGPT principalmente para aprender coisas novas e organizar minhas ideias"'
    ],
    3,
    "Este texto dá tom e finalidade de forma transparente para guiar todo output da máquina."
  ),
  textStep(
    "Lição Concluída",
    "Você compreendeu que domar a IA em tarefas complexas não exige magia, apenas instruções claras e um bom envio de dados antes do pedido real.\n\nLição concluída ✓"
  )
];

export const CHATGPT_MODULE_4_STEPS_EN = [
  textStep(
    "Data Matters",
    "Welcome back! In this lesson, you are going to jump to the next level by understanding a critical part of AI usage: providing data to ChatGPT."
  ),
  quizStep(
    "The Importance of Data",
    "Why is providing data to ChatGPT so important?",
    [
      "It makes the model more fun",
      "It limits AI capabilities",
      "It accelerates response time",
      "It provides the context and necessary information to generate precise and relevant responses"
    ],
    3,
    "By supplying relevant information upfront, you guide the AI to generate much more contextual and useful outputs."
  ),
  textStep(
    "The Foundation of Context",
    "This technique is vital because it allows adapting ChatGPT's answers to your specific needs. Think of it as a mini-briefing you hand to ChatGPT before asking it to execute a task."
  ),
  fillStep(
    "Exercise — Meal Planning",
    "Fill in the blanks with the correct terms to build the briefing.",
    '"I need help planning a healthy ___ for the week. I am ___, I have little time to cook, and I prefer meals with a maximum of ___ ingredients."',
    ["diet", "vegetarian", "5"],
    ["diet", "vegetarian", "5", "pizza", "barbecue", "20"],
    "By stating clear restrictions (vegetarian and max 5 ingredients), ChatGPT will not recommend meat or complex dishes."
  ),
  textStep(
    "Questions to Ask",
    "As you might have noticed, the secret resides in being concise and relevant with the information you provide."
  ),
  quizStep(
    "Ensuring Comprehension",
    "What should you consider to make sure ChatGPT truly understands your query?",
    [
      "The AI's favorite topics and hobbies",
      "How to confuse the AI with vague details to test it",
      "How to make the prompt as short as possible by cutting descriptions",
      "The required background knowledge, including specific terminology, facts, or constraints"
    ],
    3,
    "Delivering boundaries, exclusive terminologies, and clear rules form the wall against bad results."
  ),
  textStep(
    "The Event Example",
    "Let's analyze a practical example. Imagine you are organizing a community trash cleanup event in your city. There are several ways to ask ChatGPT for help.\n\nYou might simply say: \"Give me ideas to promote an event.\" But then you will likely receive generic suggestions completely unusable for your specific scenario.\n\nNow imagine providing actual context: event type, target audience, city, date, and available communication channels. The output will be entirely different."
  ),
  quizStep(
    "Context x Generic Questions",
    "Why is feeding context to ChatGPT better than asking generic questions?",
    [
      "It prevents ChatGPT from using up your daily credits",
      "It ensures answers be incredibly long, regardless of relevance",
      "It makes the AI work faster because it limits options",
      "It preps ChatGPT to generate highly relevant and personalized ideas based on your real goal, audience, and constraints"
    ],
    3,
    "Providing context anchors the AI in your reality instead of letting it drift over statistical average responses."
  ),
  textStep(
    "The Language Example",
    "Another practical example: imagine asking ChatGPT for help learning a new language. Instead of asking generically \"how do I learn Spanish?\", you could define your current level, the time you have to study each day, your end goal, and your preferred learning style.\n\nThat way, ChatGPT will deploy a vastly more targeted and useful roadmap."
  ),
  textStep(
    "Golden Rules for Feeding AI",
    "Remember: ChatGPT is incredibly capable but it is not omniscient. It does not carry over memory from previous conversations naturally—unless you are using a model like GPT-5.2 with explicit memory enabled. Therefore, you often need to reaffirm important context when booting up a new session or resuming an old task."
  ),
  quizStep(
    "Spinning Up a Long Project",
    "If you are working across a long-term project and open a fresh conversation with ChatGPT, what should you do first?",
    [
      "Start asking direct questions with absolutely no context",
      "Expect the model to simply remember what was discussed in the past",
      "Reaffirm key points and provide the necessary context to pick up where you left off",
      "Make a brand new account to start from scratch"
    ],
    2,
    "Every blank chat is like the model waking up with amnesia, absent the new persistent memory system. Always feed the facts in."
  ),
  textStep(
    "Building the Habit",
    "In general, as you practice, you will naturally develop a sense for what information is critical to include, and how to present it effectively. The core goal is to give sufficient context so ChatGPT gets your needs, without flooding it with irrelevant trivia."
  ),
  textStep(
    "Custom Instructions — Making ChatGPT Talk Your Way",
    "ChatGPT doesn't have an exclusive way to speak. It adapts. And there is a way to make that adaptation permanent: Custom Instructions (Personalization).\n\nGo to: Settings → Customization / Custom Instructions\n\nThere, you can adjust the tone of its replies (simple, blunt, technical), the depth of the explanation, and the primary reason you use the tool.\n\nThere isn't a single perfect setup. The best one matches your goal. Start simple and tweak as you go.\n\nExample chunk of Custom Instructions:\n\"I want clear, practical, and objective responses. I prefer simple language and examples when feasible. I use ChatGPT to learn, organize ideas, and solve daily problems. Avoid generic answers.\""
  ),
  quizStep(
    "Personal Setup",
    "Which of the following is a fantastic set of custom instructions for ChatGPT?",
    [
      "\"You can reply however you feel like, it's whatever\"",
      "\"I don't need context, just spit the answer\"",
      "\"Always respond in heavily elongated text with tough vocabulary\"",
      "\"I prefer direct answers, practical examples, and straightforward language. I mainly use ChatGPT to learn things and organize my thoughts.\""
    ],
    3,
    "This establishes tone and purpose transparently guiding all machine output."
  ),
  textStep(
    "Lesson Completed",
    "You have learned that taming the AI for complex tasks requires no magic, just clear instructions and a good data dump prior to the actual command.\n\nLesson complete ✓"
  )
];

export const CHATGPT_MODULE_4_STEPS_ES = [
  textStep(
    "Los Datos Importan",
    "¡Bienvenido nuevamente! En esta lección, vas a elevar el nivel y entender una parte crucial del uso de IA — proveer datos a ChatGPT."
  ),
  quizStep(
    "La Importancia de los Datos",
    "¿Por qué es importante proveer datos a ChatGPT?",
    [
      "Acelera el tiempo de respuesta",
      "Provee el contexto y la información necesaria para generar respuestas precisas y relevantes",
      "Limita las capacidades de la IA",
      "Hace que el modelo sea más divertido"
    ],
    1,
    "Al proporcionar información relevante de antemano, orientas a la IA para generar resultados más contextuales y útiles."
  ),
  textStep(
    "La Base del Contexto",
    "Esta técnica es importante porque permite adaptar las respuestas de ChatGPT a tus necesidades específicas. Piensa en ello como un mini-briefing que le entregas a ChatGPT antes de perdirle que ejecute una tarea."
  ),
  fillStep(
    "Ejercicio — Planificación de Comidas",
    "Completa el espacio con los términos correctos para armar el briefing.",
    '"Necesito ayuda para planificar una ___ saludable para la semana. Soy ___, no tengo mucho tiempo para cocinar y prefiero comidas con un máximo de ___ ingredientes."',
    ["dieta", "vegetariano", "5"],
    ["dieta", "vegetariano", "5", "pizza", "barbacoa", "20"],
    "Al dejar claras las restricciones (vegetariano y máximo 5 ingredientes), ChatGPT no sugerirá carne ni recetas intrincadas."
  ),
  textStep(
    "Preguntas para Hacer",
    "Como te habrás dado cuenta, el secreto está en ser conciso y relevante con la información que provees."
  ),
  quizStep(
    "Asegurando la Comprensión",
    "¿Qué debes considerar para asegurar que ChatGPT entienda tu consulta?",
    [
      "Los temas favoritos de la IA",
      "El conocimiento base necesario, incluyendo terminología específica, hechos o restricciones",
      "Cómo confundir a la IA con detalles vagos",
      "Cómo hacer el prompt lo más corto posible cortando variables"
    ],
    1,
    "Entregar los contornos de reglas, las palabras exactas y la base empírica forjan el baluarte contra malos resultados."
  ),
  textStep(
    "El Ejemplo del Evento",
    "Analicemos un ejemplo práctico. Imagina que organizas un evento comunitario de recolección de residuos en tu ciudad. Hay varias formas de pedirle ayuda a ChatGPT.\n\nPuedes simplemente decir: \"Dame ideas para promocionar un evento.\" Pero probablemente vas a recibir sugerencias genéricas y banales que no sirven para tu fin in situ.\n\nAhora imagina dar contexto real: tipo de evento, audiencia meta, locación, fecha y canales de difusión. El resultado será formidable e instantáneo."
  ),
  quizStep(
    "Contexto x Preguntas Genéricas",
    "¿Por qué brindar contexto a ChatGPT es mejor que realizarle simples preguntas genéricas?",
    [
      "Prepara a ChatGPT para parir sugerencias ricas y personalizadas cimentadas en tus objetivos y contexto directo",
      "Previene que el ChatGPT descuente créditos de conexión",
      "Garantiza que las contestaciones resulten interminables, independiente a su calidad",
      "Logra que la IA accione con mayor velocidad"
    ],
    0,
    "Brindar variables ancla a la máquina en la realidad del problema evitando que deambule por lo plano y genérico."
  ),
  textStep(
    "El Ejemplo del Idioma",
    "Otro ejemplo práctico: imagina clamar auxilio a ChatGPT con el aprendizaje de un idioma. En lugar de preguntar al aire \"¿cómo aprendo francés?\", puedes dictaminar tu nivel académico previo, tiempos diarios reales, el norte meta y tus formas predilectas de asimilación auditiva o visual.\n\nEl mapeo posterior será de un potencial inmenso comparado a lo anterior."
  ),
  textStep(
    "Reglas de Oro en Ingesta de Datos",
    "Recuerda firmemente: el asistente es altamente poderoso pero lejos está de gozar de omnisciencia estricta. Carecerá de memorias entre chat y chat, en tanto no dispongas de modelos 5.2 con memoria conectada en tiempo real. Esto sugiere reiterar tus variables centrales al abrir sesiones frescas."
  ),
  quizStep(
    "Emprendiendo Proyectos Grandes",
    "Sí te encuentras trabajando un extenso plan de negocios y creas un nuevo chat... ¿Cuál es tu primera movida intelectual?",
    [
      "Afirmar las cimas conceptuales y la brújula contextual en un prompt de resumen para retornar exactamente donde terminaste",
      "Hacerte un usuario inédito para recomenzar",
      "Preguntar a bocajarro cuestiones de cálculo",
      "Esperar ingenuamente a que reconstruya lo debatido la semana anterior"
    ],
    0,
    "Conversación en blanco implica reset algorítmico, a no ser del manejo de Memoria Persistente. Repasa el ecosistema inicial siempre."
  ),
  textStep(
    "Fabricando Instintos",
    "Al practicar de forma sostenida notarás un tacto natural indicando qué sumar u obviar por mera eficacia. Un balance perfecto entre bañar el algoritmo con contexto sin atosigarlo de anécdotas estériles será el pan de cada día glorioso."
  ),
  textStep(
    "Personalización — Mandando Sobre Su Voz",
    "Puntaje a favor: el robot se amolda a tus mañas. Para volver inquebrantable esa amalgama posees las Instrucciones Personalizadas (Customization).\n\nVisita: Configuración → Personalización.\n\nAhí asentarás si su trato debe resultar clínico o cercano, detallista o microscópico, e incluso notificar tu industria madre para que él la pre-conciba detrás de bambalinas.\n\nEjemplo textual:\n\"Solicito contestaciones claras, ágiles y asertivas. Aprecio un registro ameno. Acciono y consulto principalmente materia legal y documental para resolver burocracias. Evite las obviedades banales o introducciones éticas redundantes.\""
  ),
  quizStep(
    "Setup Permanente",
    "En términos de la sección 'Personalización', ¿Qué variante constituye un acierto contundente?",
    [
      '"Realiza el encargo como prefieras, carezco de un molde ideal"',
      '"Comunícate ostentosamente despachando tecnicismos oscuros por doquier"',
      '"Anhelo respuestas certeras, esquemas ejemplificativos y una escritura lisa sin adornos. Te recabaré para consolidar reflexiones de estudiante"',
      '"A mí me da igual, vomita el dato numérico y ya"'
    ],
    2,
    "Ese enunciado impone matriz, motivo de consulta e idiosincrasia lingüística de un plumazo sólido a lo largo de las futuras interacciones."
  ),
  textStep(
    "Cierre de Fase",
    "Dominamos una faceta de alto rigor logístico. La Inteligencia Artificial es tu socio genio, pero si carece del tablero y lineamientos de lo que hay en tu cabeza, te entregará espejismos superficiales. \n\nLección superada ✓"
  )
];

export const CHATGPT_MODULE_4_STEPS_FR = [
  textStep(
    "Les Données Priment",
    "Bienvenue une fois de plus ! Au cours de cette séance, nous attaquons un pivot cardinal dans l'utilisation algorithmique professionnelle — approvisionner les bonnes données contextuelles à la machine."
  ),
  quizStep(
    "La Charge Contextuelle Principale",
    "Quel fondement justifie de confier un contexte généreux au robot ?",
    [
      "Il donne l'opportunité au système virtuel de jouer",
      "Il réduit violemment sa latence technique",
      "Il établit un socle informatif indispensable au calcul d'une proposition millimétrée",
      "Il dynamise grandement la rapidité d'affichage pure des pixels mots"
    ],
    2,
    "Transférer les bases concrètes à l'algorithme aplanit la direction d'investigation pour qu'une utilité totale en sorte."
  ),
  textStep(
    "Le Cadre Central",
    "Pareil procédé revêt une ampleur critique puisqu'il calque le modèle sur des exigences pointues à vous. Voyez ça du même œil qu'un briefing d'action délivré aux troupes humaines avant commanderie de tâche lourde."
  ),
  fillStep(
    "Entraînement — Plan Alimentaire Complet",
    "Ajoutez les termes stricts correspondant aux attentes formulées lors d'un cadrage :",
    '"J\'ai vitalement besoin de tracer une ___ saine encadrant mes jours. Étant de base ___, manquant violemment de plage horaire pour la conception des plats, j\'autoriserai uniquement des plats limités à ___ aliments en totalité."',
    ["diète", "végétarien", "5"],
    ["diète", "végétarien", "5", "pizza", "barbecue de bœuf", "20"],
    "Spécifier des limites strictes (végétarien et max 5 éléments) interdit à la machine l'écart sur des pistes carnées chronophages."
  ),
  textStep(
    "Inquisition des Modèles",
    "Vous l'éprouverez : l'apogée des techniques consiste à demeurer tranchant, chirurgical et remarquablement lucide à travers la donnée offerte."
  ),
  quizStep(
    "Blindage Qualitatif",
    "Si l'on cherche la pure exactitude algorithmique, quelle donnée demeure inéluctable à inscrire ?",
    [
      "Fomenter un chaos volontaire par ambiguïté textuelle pure",
      "L'historique académique, terminologies précises, règles empiriques limitatives de l'ouvrage",
      "L'énonciation des films adorés du processeur",
      "L'économie extrême de lettres frénétique par soustraction des verbes"
    ],
    1,
    "Déposer vos règles du jeu sans faille, des bornes irréductibles de faisabilité et la sémantique noble élèveront prodigieusement les rendements."
  ),
  textStep(
    "L'Attitude de l'Événement",
    "Dissépons un tableau de la rue : imaginez lancer de bout en bout l'organisation citadine d'une journée de purification routière. Une constellation de demandes à l'IA s'ouvre à vous.\n\nSe satisfaire d'un : \"Trouvez une approche pub citadine\" attirera de pitoyables suggestions plates et mornes pour votre agglomération.\n\nRenversez la vapeur avec l'environnement social exhaustif : audience choyée, ville exacte, dates fatidiques, enveloppe budgétaire et leviers médiatiques pré-établis. Une arme fatale s'imprimera à l'écran."
  ),
  quizStep(
    "Contextualisation contre Banalité",
    "Pourquoi l'injonction contextuelle balaie logiquement sans pitié la simple requête superficielle classique ?",
    [
      "Elle provoque l'étirement des caractères sortants peu importent l'intelligence du propos global",
      "Elle arme l'outil jusqu'aux dents afin d'extruder du pertinent et du chirurgical adéquat face au dessein espéré et du terreau initial",
      "Elle abaisse miraculeusement la consommation énergétique réseau de votre ordinateur personnel",
      "Défend farouchement votre compteur algorithmique de crédit artificiel"
    ],
    1,
    "Injecter le tableau l'ancre solidement dans le réalisme de la vie active sans flottements sur un axe théorique purement stérile."
  ),
  textStep(
    "La Stratégie d'Acquisitions",
    "Scénario redondant : réclamer au serveur ChatGPT l'accompagnement de vos séances d'une acquisition linguistique neuve. Demander \"apprends-moi l'italien\" a minima donne un brouillon plat.\n\nA l'exact contraire, définir le socle de pré-savoir, imposer la cadence biquotidienne d'écolier, et la préférence exclusive pour les jeux auditifs débloqueraient la pédagogie impérieusement adaptée et unique."
  ),
  textStep(
    "La Théorie d'Instillation Souveraine",
    "Fixez mentalement la réalité : la chose artificielle reste faramineuse par l'omniscience des réseaux de neurones sans briller dans l'omniscience extralucide de la mémoire partagée. Sans activation manifeste sur base GPT-5.2 mémoire persistante, l'entremêt de conversation n'absorbe pas les acquis des autres jours, l'incitant fatalement à une re-contextualisation lors d'entames massives fraîches."
  ),
  quizStep(
    "Architecture du Chantier Prolongé",
    "Lorsque la situation s'étale sur des jours et que vous déverrouillez fatalement une session de traitement toute neuve du lundi, quelle serait l'attitude primordiale indiscutable ?",
    [
      "Faire foi d'une souvenance aveugle du programme algorithmique",
      "Re-configurer un profil utilisateur exclusif en amont absolu",
      "Assener un prompt massif réconciliant tout l'envers du tableau afin de coudre précisément le bout du sillage en suspens",
      "Fondre à tombeau ouvert sans une Once d'historisation sur de l'ingénierie pointue"
    ],
    2,
    "La ligne vide de réinitialisation provoque d'amblée une mémoire blanche ; hors de systèmes pro gérants le suivi de logs. On refaçade la fondation sans exception."
  ),
  textStep(
    "Musculature d'Exercice",
    "Par l'usage rude continu, les synapses créatives naturelles accorderont instinctivement du discernement entre une donnée pivotale fondamentale face à l'énonciation polluante, trouvant irrémédiablement le parfait calibrage afin que ChatGPT encaisse un bloc magistral."
  ),
  textStep(
    "Paramétrage Customisé — L'Éducateur Constant",
    "On constate sans détours une variation de verve algorithmique selon les circonstances. Un réglage dur peut scléroser indéfiniment cet aspect par biais des Directives Personnalisées (Custom Instructions).\n\nRendez-vous : Profils / Paramètres → Interface Personnalisée.\n\nC'est la tribune d'influence de ton permanent (simple, brut, intellectuel) ou d'arborescence structurelle en de long formats et d'identifications sur vous-mêmes pour ses biais théoriques profonds.\n\nExtrait pratique de charpente :\n\"Je m'attarderai à exiger de l'implacable, de l'efficience pratique. Les formulations simples me sont de choix. Mon usage réside dans l'académisme, le bouillon technique industriel au quotidien. Fuyez systématiquement la flagornerie des banales salutations superflues.\""
  ),
  quizStep(
    "Setup Personnel Ultime",
    "Au rang des Directives Personnalisées permanentes du fond, laquelle des propositions brille comme le grand vainqueur absolu de cette démarche ?",
    [
      "\"Ma délectation réside du rapide et du pratique et je proscris vivement l'artifice pompeux. Mon utilisation cimente rudement de la formation personnelle sur de la technologie informatique moderne.\"",
      "\"Procede selon l'humeur logistique instantanée, ni de moule formel ni de dictées fermement arrêtées en ma demeure textuelle\"",
      "\"Aucune patience, balance l'élémentaire solution immédiatement sans un mot additionnel ou politesse d'usage\"",
      "\"Force systématique à une volumétrie extrême et au vocabulaire académique d'histoire moyen-âge\""
    ],
    0,
    "La charte encadre l'exactitude logistique de verve, la finalité globale du bot, et la méthode verbale la plus probante à l'opérateur pour l'ensemble des futurs entretiens ouverts."
  ),
  textStep(
    "Bilan Magistral d'Achèvement",
    "Finalement la soumission des intelligences artificielles au rendement magistral, c'est l'union maritale entre directivité transparente des mots alignés et du bon jet de la matière de contexte pure avant même d'aboyer les demandes de code, graphisme ou de littéraire.\n\nLeçon aboutie ✓"
  )
];
