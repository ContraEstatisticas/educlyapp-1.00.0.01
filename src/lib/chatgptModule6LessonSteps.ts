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

export const CHATGPT_MODULE_6_STEPS_PT = [
  textStep(
    "Técnicas Avançadas de Engenharia de Prompt",
    "Bem-vindo de volta! Hoje você vai aprimorar suas habilidades para criar prompts mais complexos e eficazes. Vamos explorar três técnicas poderosas: Zero-Shot, Few-Shot e Chain-of-Thought Prompting. Ao final desta lição, você será capaz de elaborar prompts precisos que lidam com tarefas complexas e otimizam as respostas da IA."
  ),
  textStep(
    "Zero-Shot Prompting",
    "Lembra quando pedíamos diretamente uma resposta ao ChatGPT, sem dar nenhum exemplo? Esse método se chama zero-shot prompting. Ele envolve fazer uma solicitação direta, sem fornecer exemplos prévios — e funciona porque o modelo já foi treinado em uma enorme variedade de contextos.\n\nEssa técnica é especialmente útil quando você quer que o ChatGPT execute uma tarefa de forma direta, confiando apenas na instrução que você fornece."
  ),
  quizStep(
    "Compreensão de Zero-Shot",
    "Qual dessas opções é um exemplo prático de Zero-Shot Prompting?",
    [
      '"Veja esses três exemplos de resumos e crie um no mesmo estilo"',
      '"Com base nos exemplos abaixo, gere uma resposta similar"',
      '"Explique o conceito de inteligência artificial em linguagem simples para um estudante do ensino médio"',
      '"Primeiro analise o exemplo, depois repita o mesmo formato"'
    ],
    2,
    "Você comandou a ação sem usar contexto pregresso ou fornecer exemplos prontos."
  ),
  quizStep(
    "Aplicando o Zero-Shot",
    "Imagine que você precisa planejar uma viagem internacional pela primeira vez e não sabe por onde começar. Qual prompt de zero-shot você usaria para pedir ajuda ao ChatGPT?",
    [
      '"Me ajude com viagem"',
      '"O que fazer?"',
      '"Liste os 5 primeiros passos que alguém deve seguir ao planejar sua primeira viagem internacional, incluindo documentos, passagem, hospedagem e seguro viagem"',
      '"Fale sobre viagens"'
    ],
    2,
    "Instruções claras e delimitações (5 passos) formam um tiro 'zero-shot' perfeito."
  ),
  textStep(
    "Few-Shot Prompting",
    "Agora que você entende o zero-shot, vamos avançar para o few-shot prompting — uma técnica que melhora as respostas fornecendo alguns exemplos antes de fazer a solicitação principal. Esses exemplos mostram ao modelo exatamente o padrão, o tom e o formato que você espera."
  ),
  quizStep(
    "Identifique o Few-Shot Correto",
    "Você quer que o ChatGPT classifique frases como positivas ou negativas. Qual prompt usa a técnica few-shot corretamente?",
    [
      '"Classifique as frases abaixo como positivas ou negativas"',
      '"Me diga o sentimento dessas frases"',
      '"Classifique o sentimento de cada frase. Exemplos: \'O dia estava lindo\' → Positivo. \'Fiquei muito frustrado com o atraso\' → Negativo. \'O atendimento foi incrível\' → Positivo. Agora classifique: \'Não gostei nada do resultado\'"',
      '"Veja alguns exemplos e depois me explique o conceito de sentimento"'
    ],
    2,
    "Fornecer múltiplos gabaritos antes da pergunta final condiciona perfeitamente o formato da resposta."
  ),
  fillStep(
    "Few-Shot na Prática!",
    "Complete as lacunas modelando as respostas para que o ChatGPT aprenda o padrão esperado.",
    '"Transforme frases formais em linguagem simples. Exemplos:\nFormal: \'Solicitamos sua presença na reunião.\' → Simples: \'___\'\nFormal: \'Encaminhamos o documento para sua apreciação.\' → Simples: \'___\'\nAgora transforme: \'Informamos que o prazo foi prorrogado.\'"',
    ["Queremos que você venha à reunião", "Mandamos o documento para você dar uma olhada"],
    ["Queremos que você venha à reunião", "Mandamos o documento para você dar uma olhada", "Compareça", "Veja o arquivo urgente", "Formalidades encerradas"],
    "Fornecer a transição correta entre formal e direto ensina a IA como deve ser o tom da resposta gerada."
  ),
  textStep(
    "Chain-of-Thought Prompting",
    "A próxima técnica é o Chain-of-Thought Prompting. Ela ajuda a melhorar a precisão das respostas ao dividir tarefas complexas em etapas sequenciais e lógicas. Em vez de pedir tudo de uma vez, você guia o modelo passo a passo."
  ),
  quizStep(
    "A Vantagem das Etapas",
    "Qual é a principal vantagem do Chain-of-Thought Prompting?",
    [
      "Simplifica o prompt removendo etapas",
      "Acelera o tempo de resposta ao pular detalhes",
      "Divide tarefas complexas em sequências lógicas, aumentando a precisão",
      "Torna os prompts menos compreensíveis"
    ],
    2,
    "A divisão sequencial impede que o modelo 'alucine' ou engula etapas essenciais de raciocínio profundo."
  ),
  textStep(
    "Prática: Decisão de Carreira",
    "Imagine que você está ajudando um amigo a tomar uma decisão importante: ele quer mudar de carreira mas não sabe se está pronto. Vamos agir usando o raciocínio em etapas (Chain-of-Thought)."
  ),
  quizStep(
    "Etapa 1 — Coleta de informações",
    "Qual é o melhor primeiro prompt para entender a situação do seu amigo?",
    [
      '"O que você deve fazer na sua carreira?"',
      '"Mude de emprego logo"',
      '"Para ajudar na decisão de mudança de carreira, preciso entender melhor a situação. Me responda: qual é sua área atual, há quanto tempo trabalha nela, o que te faz querer mudar e qual área te atrai?"',
      '"Liste prós e contras de mudar de carreira"'
    ],
    2,
    "Você coleta as bases antes de forçar o modelo a deduzir estratégias às cegas."
  ),
  quizStep(
    "Etapa 2 — Análise das informações",
    "Seu amigo respondeu que tem 6 anos como contador, mas quer tentar design gráfico. Ele tem família e não pode perder a renda. Qual prompt analisa isso corretamente na sequência?",
    [
      '"O que ele deve fazer?"',
      '"Design é uma boa carreira?"',
      '"Com base nessas informações, analise os principais riscos e oportunidades dessa transição de carreira. Considere o tempo de experiência, as responsabilidades financeiras e o interesse pela nova área. Liste caminhos possíveis que permitam a transição sem abrir mão da estabilidade"',
      '"Faça uma lista de cursos de design"'
    ],
    2,
    "Ao pedir foco em riscos financeiros e estabilidade, a análise do bot será pragmática e não romântica."
  ),
  quizStep(
    "Etapa 3 — Conclusão e próximo passo",
    "A análise foi feita. Agora qual prompt encerra o processo de forma útil?",
    [
      '"Obrigado, pode parar por aqui"',
      '"Com base em tudo que analisamos, sugira um plano de transição realista para os próximos 12 meses, com ações concretas mês a mês que permitam desenvolver as habilidades de design sem abrir mão da renda atual"',
      '"Repita tudo de novo de forma resumida"',
      '"Agora fale sobre outros tipos de carreira"'
    ],
    1,
    "Solicitar um cronograma realista é a etapa máxima executável baseada na cadeia de pensamentos prévia."
  ),
  textStep(
    "A Força do Processo",
    "Essa abordagem em etapas permite lidar sistematicamente com problemas complexos — garantindo que nenhum detalhe importante seja ignorado e que a resposta final seja realmente útil."
  ),
  textStep(
    "Resumo da Lição",
    "Nesta lição, você explorou três técnicas avançadas de engenharia de prompts:\n\n- Zero-Shot: instrução direta, sem exemplos, confiando no conhecimento do modelo.\n- Few-Shot: fornecer exemplos antes da tarefa principal para guiar o padrão de resposta.\n- Chain-of-Thought: dividir tarefas em etapas lógicas para aumentar a precisão.\n\nNa próxima lição, vamos aprofundar o gerenciamento de contexto em prompts.\n\nLição concluída ✓"
  )
];

export const CHATGPT_MODULE_6_STEPS_EN = [
  textStep(
    "Advanced Prompt Engineering Techniques",
    "Welcome back! Today, you are going to level up your skills to craft highly complex and effective prompts. We will explore three powerful tactics: Zero-Shot, Few-Shot, and Chain-of-Thought Prompting. By the end of this lesson, you will excel at tackling heavy tasks and optimizing AI outputs."
  ),
  textStep(
    "Zero-Shot Prompting",
    "Remember directly asking ChatGPT a question without giving it any background examples? That is called zero-shot prompting. You deliver a direct demand relying purely on the model's massive trained background knowledge.\n\nThis technique is incredibly useful when you want a straightforward task completed without much fuss, depending solely on your instruction's clarity."
  ),
  quizStep(
    "Zero-Shot Comprehension",
    "Which of these perfectly represents Zero-Shot Prompting?",
    [
      '"Look at these three summary formats and mimic them"',
      '"Based on the examples below, yield a similar copy"',
      '"Explain the core concept of artificial intelligence using simple language suited for a high school student"',
      '"First analyze the template, then replicate its format"'
    ],
    2,
    "You successfully commanded an action without supplying pre-made variables or structural examples."
  ),
  quizStep(
    "Applying Zero-Shot",
    "Imagine you need to plan an international trip for the first time. Which zero-shot prompt efficiently asks ChatGPT for guidance?",
    [
      '"Help me travel"',
      '"What should I do?"',
      '"List the very first 5 steps someone should take when planning an international trip, including passports, flights, housing, and travel insurance"',
      '"Talk to me about tourism"'
    ],
    2,
    "Explicit outlines (the 5 steps limitation) forge a crisp 'zero-shot' instruction."
  ),
  textStep(
    "Few-Shot Prompting",
    "Stepping forward: Few-Shot Prompting. This technique drastically improves formatting by feeding a few solved examples right before asking the final question. This maps out the exact pattern, tone, and logic structure the AI should mirror."
  ),
  quizStep(
    "Spotting the Few-Shot",
    "You want ChatGPT to label sentences as positive or negative. Which prompt properly utilizes Few-Shot mechanics?",
    [
      '"Classify the text below as positive or negative"',
      '"Tell me to tone of the following"',
      '"Classify the sentiment of each phrase. Examples: \'The day was gorgeous\' → Positive. \'I got frustrated by the lag\' → Negative. \'The service was stunning\' → Positive. Now classify: \'I really disliked the final score\'"',
      '"Read some reviews and tell me about feelings"'
    ],
    2,
    "Providing the template solutions directly coaches the algorithm exactly how to behave on the ensuing final test."
  ),
  fillStep(
    "Few-Shot in Practice!",
    "Fill the blanks to model the exact translation you expect ChatGPT to learn.",
    '"Translate formal corporate phrases into accessible language. Examples:\nFormal: \'We request your presence at the gathering.\' → Simple: \'___\'\nFormal: \'We forward this brief for your appreciation.\' → Simple: \'___\'\nNow translate: \'We inform you that the final deadline has been extended.\'"',
    ["We want you to come to the meeting", "We sent the document for you to take a look"],
    ["We want you to come to the meeting", "We sent the document for you to take a look", "Go there", "Read the text", "It is over"],
    "Showcasing the conversion between rigid corporate text and common slang teaches the AI the expected tone."
  ),
  textStep(
    "Chain-of-Thought Prompting",
    "The next major technique is Chain-of-Thought. It enhances logic accuracy by fracturing complex problems into smaller, sequential steps. Instead of asking for a master answer right away, you walk the AI through deductions."
  ),
  quizStep(
    "The Benefit of Phases",
    "What is the ultimate upside of using Chain-of-Thought Prompting?",
    [
      "It makes the prompt shorter",
      "It boosts generating speed by omitting details",
      "It fragments a complex puzzle into logical sequences, heavily increasing mathematical and deduction accuracy",
      "It corrupts outputs but makes them look smarter"
    ],
    2,
    "Sequential fragmentation stops the model from hallucinating or skipping deep logic tiers."
  ),
  textStep(
    "Practice: Career Crossroads",
    "Assume you are guiding a friend dealing with a massive career change. They feel lost. Let's solve this using sequential reasoning (Chain-of-Thought)."
  ),
  quizStep(
    "Stage 1 — Gathering Intelligence",
    "Which is the best opener prompt to understand their landscape?",
    [
      '"What career is good?"',
      '"Quit your job today"',
      '"To help chart a career pivot, I need background context. Answer me: what is your current field, how long have you been there, what drives the desire to change, and what new area sparks your interest?"',
      '"Give me pros and cons of working"'
    ],
    2,
    "You establish baseline variables before forcing the engine to blindly advise anything."
  ),
  quizStep(
    "Stage 2 — Data Analysis",
    "Your friend answers: 'I have been an accountant for 6 years but lack motivation. I always liked graphic design but never formally studied it. I have a family to feed and cannot lose my income stream.' What prompt follows next?",
    [
      '"What should they do?"',
      '"Is design a decent job?"',
      '"Based on this feedback, analyze the main risks and opportunities of this transition. Factor in current experience, financial burdens, and interest in design. Draft paths that allow a transition without threatening household stability."',
      '"List 10 cheap design courses"'
    ],
    2,
    "Forcing focus onto financial constraints and safety nets guides the analysis to be highly pragmatic, avoiding romanticized useless answers."
  ),
  quizStep(
    "Stage 3 — Final Masterplan",
    "The analysis is complete. What prompt perfectly closes the process into action?",
    [
      '"Thanks, you can log off now"',
      '"Based on everything we analyzed, pitch a realistic 12-month transition roadmap. Build month-to-month concrete actions allowing them to cultivate design skills without sacrificing the current accounting paycheck."',
      '"Repeat everything we just discussed randomly"',
      '"Talk to me about being an engineer"'
    ],
    1,
    "Demanding a realistic timeline is the ultimate executable step born strictly from the previous thought chain."
  ),
  textStep(
    "The Power of the Process",
    "Treating interaction as a segmented staircase forces the AI to systematically conquer problems—guaranteeing no detail is cast aside and output yields premium utility."
  ),
  textStep(
    "Lesson Summary",
    "You have dissected three pinnacle prompt engineering techniques:\n\n- Zero-Shot: Direct demands leaning on the model's native training.\n- Few-Shot: Handing over templates and answers to strictly govern format.\n- Chain-of-Thought: Severing massive tasks into logical steps to force analytical accuracy.\n\nNext, we leap into massive context management. Keep pushing.\n\nLesson complete ✓"
  )
];

export const CHATGPT_MODULE_6_STEPS_ES = [
  textStep(
    "Técnicas Avanzadas de Ingeniería de Prompts",
    "¡Bienvenido nuevamente! Hoy refinarás tus habilidades para forjar prompts altamente complejos. Vamos a explorar tres mecánicas agresivas: Zero-Shot, Few-Shot y el Chain-of-Thought (Cadena de Pensamiento). Al clausurar la sesión, manejarás encargos de alto intelecto con soltura."
  ),
  textStep(
    "Zero-Shot Prompting",
    "¿Recuerdas cuando pedíamos al vuelo una contestación sin darle un solo ejemplo al ChatGPT? Eso es el formato Zero-Shot. Radica en exigir una encomienda directa confiando en la sapiencia pre-entrenada de la máquina.\n\nEs inmensamente útil para órdenes frontales que demandan rapidez sin malabarismos."
  ),
  quizStep(
    "Comprensión del Zero-Shot",
    "¿Cuál de las siguientes premisas encarna limpiamente al Zero-Shot?",
    [
      '"Mira estos tres resúmenes y clónalos"',
      '"Habiendo leído los ejemplos anexados, propón uno equivalente"',
      '"Explica el marco teórico de la inteligencia generativa empleando una narrativa afable para estudiantes de secundaria"',
      '"Primero consume los patrones, luego emula la estructura"'
    ],
    2,
    "Lanzaste una solicitud sólida libre de maquetas o modelos guías."
  ),
  quizStep(
    "Impactando el Zero-Shot",
    "Imagina organizar tu primer vuelo transatlántico. ¿Qué mandato Zero-Shot le pedirías al ChatGPT?",
    [
      '"Ayúdame a salir del país"',
      '"¿Qué hago para viajar?"',
      '"Enlista concretamente los primeros 5 peldaños organizativos al trazar un viaje internacional. Incluye papelería, logística de vuelos, techo y seguros."',
      '"Inyéctame motivación viajera"'
    ],
    2,
    "Forzar escalones precisos (los 5 peldaños) levanta una orden magistral directa al grano."
  ),
  textStep(
    "Few-Shot Prompting",
    "Entremos al Few-Shot — una técnica letal que acondiciona las contestaciones insertando resoluciones de muestra previo a tu consulta real. Esto le imprime a la máquina el código estético, patrón y molde exacto que anhelas."
  ),
  quizStep(
    "Identificando el Few-Shot",
    "Deseas clasiﬁcar el termómetro emocional de ciertas reseñas. ¿Qué texto invoca la mecánica Few-Shot?",
    [
      '"Clasifica las oraciones entre luz y sombra"',
      '"Dime si están tristes o contentos"',
      '"Clasifica la vibra textual. Casos: \'La tarde es un sol brillante\' → Positivo. \'Odio con mi ser este atasco\' → Negativo. \'Servicio 5 estrellas\' → Positivo. Turno actual, clasifica: \'Repudio la entrega defectuosa\'"',
      '"Lee algunos casos allá afuera y dime tus impresiones"'
    ],
    2,
    "Regalarle ejemplos resueltos entrena al vuelo el núcleo duro del procesador para su próxima jugada."
  ),
  fillStep(
    "¡Few-Shot en las Trincheras!",
    "Autocompleta las traducciones maestras para que el modelo imite el tono llano.",
    '"Traduce verbosidades corporativas a un lenguaje horizontal. Casos:\nEstricto: \'Demandamos su comparecencia al presídium.\' → Llano: \'___\'\nEstricto: \'Derivamos la constancia para su peritaje final.\' → Llano: \'___\'\nTurno actual, traduce: \'Notificámosle la prórroga de los tiempos de entrega.\'"',
    ["Queremos que vengas a la reunión", "Te mandamos el archivo para que le des un vistazo"],
    ["Queremos que vengas a la reunión", "Te mandamos el archivo para que le des un vistazo", "Ve ahora", "No lo leas aún", "Cita cancelada"],
    "Mostrar la transformación de la jerga burocrática a la casual le impregna la cadencia que buscas."
  ),
  textStep(
    "Configuración Chain-of-Thought",
    "Toca gobernar los hilos con el Chain-of-Thought (Cadena de Pensamiento). Fractura misiones abrumadoras en escalones secuenciales lógicos. En vez de soltar una pregunta faraónica, encaminas al bot de la mano hacia deducciones de alta gama."
  ),
  quizStep(
    "El Filo de las Fases",
    "¿Dónde radica el verdadero genio de segmentar el mandato en Cadenas de Pensamiento?",
    [
      "Acorta drásticamente el texto en pantalla",
      "Vuelve a la IA perezosa saltando pasos grises",
      "Desguaza algoritmos enormes en piezas digeribles, exterminando márgenes de error deductivo",
      "Ensucia los textos y los vuelve irrelegibles"
    ],
    2,
    "Pausar las etapas evita de facto que la IA sufra alucinaciones o puentee bloques críticos racionales."
  ),
  textStep(
    "Misión Analítica: Brújula Laboral",
    "Supón que auxilias a un amigo al borde del salto profesional. Desconoce si lanzarse al abismo del cambio. Vamos a radiografiar esto en escalones."
  ),
  quizStep(
    "Fase 1 — Extracción Pericial",
    "¿Qué tiro de apertura desentraña limpio su mapa de vida?",
    [
      '"Dime qué empleo le dejo"',
      '"Renuncia a tu puesto mañana a primera hora"',
      '"Para esculpir un puente de trancisión laboral, urjo armar un perfil tuyo: ¿Cuál es tu actual circuito laboral, años de maduración ahí, el motor real de escape y el sector hacia el cual vibras ahora mismo?"',
      '"Pásame beneficios de cambiar de rubro"'
    ],
    2,
    "Consolidar pilares biográficos primeramente frena sugerencias vacías y estadísticas genéricas de la máquina."
  ),
  quizStep(
    "Fase 2 — Choque de Deducciones",
    "Respondió: 'Soy contador con 6 años de antigüedad, pero harto de lo mismo. Me brilla el diseño gráfico pero no poseo cartón formal. Mantengo a mi familia mes a mes y no puedo apostar a quedar a la deriva'. ¿Qué prompt exprime el análisis a continuación?",
    [
      '"Dime qué hacer velozmente"',
      '"Pregúntale si diseñar le gusta bastante"',
      '"Consumiendo esa crónica, radiografía amenazas y ventanas maestras del cambio. Basa tu foco inviolablemente en los deberes económicos, la madurez en su área y su interés en arte gráfico. Esboza puentes viables que anclen su seguridad financiera integral."',
      '"Tírame academias online de ilustración"'
    ],
    2,
    "Fijar restricciones de fuego en compromisos familiares vuelve pragmático e implacable al consejo del bot."
  ),
  quizStep(
    "Fase 3 — Masterplan Táctico",
    "Análisis gestado. ¿Bajo qué orden coronamos la obra operativa?",
    [
      '"Se acabó, apágate"',
      '"Cimentados en la inspección de riesgos, parpadea un itinerario cronológico de 12 meses implacables. Funda accionables mes a mes permitiendo su formación en lo gráfico pero reteniendo su nómina como contable base."',
      '"Vomita un resumen relámpago inofensivo"',
      '"Comienza a redactarme sobre ser veterinario"'
    ],
    1,
    "Extraer la tabla cronometrada remata a la perfección la arquitectura previa, volviéndolo material factible y accionable."
  ),
  textStep(
    "La Gravedad del Sistema",
    "Fragmentar el peso logístico permite atacar y dilucidar encrucijadas magnas, vigilando de cerca que ningún hilo se corrompa en las profundidades del bot."
  ),
  textStep(
    "Epílogo de la Sesión",
    "Consumiste la triada divina en ingeniería algorítmica de texto:\n\n- Zero-Shot: Disparos puros anclados en su mente instalada original.\n- Few-Shot: Donaciones periciales pre-resueltas como cimientos de aprendizaje al vuelo.\n- Chain-of-Thought: Fragmentación quirúrgica sistemática para forjar sapiencia robótica.\n\nA continuación, domaremos la gran ventana de la amnesia. Avanza.\n\nPalier Dominado ✓"
  )
];

export const CHATGPT_MODULE_6_STEPS_FR = [
  textStep(
    "Ingénierie Avancée des Requêtes Magistrales",
    "Saluts ! C'est l'heure d'affiner profondément vos commandes et de percer les couches opaques de l'IA. Nous manipulons aujourd'hui l'artillerie algorithmique tactique : le Zero-Shot, le Few-Shot, et l'iconique Chain-of-Thought (Chaîne de Pensée). À la clôture, l'amateurisme s'effacera face à la mathématique textuelle."
  ),
  textStep(
    "La Logique Zero-Shot",
    "Souvenez-vous de ces ordres propulsés sans la moindre béquille d'exemple ? Cela obéit à la loi du Zero-Shot prompting. Le système crache l'analyse en s'appuyant aveuglément sur l'océan stratosphérique de ses données neuronales mémorisées.\n\nUne approche dévastatrice pour accomplir une consigne basique requérant plus de dynamisme que de calembours pointus."
  ),
  quizStep(
    "Diagnostics de Base",
    "Qu'est-ce qui caractérise parfaitement l'emploi du canon Zero-Shot dans l'action ?",
    [
      '"Observe ces extraits narratifs et craches-en un calque"',
      '"Analyse méticuleusement les formats suivants pour me plier un résumé conforme"',
      '"Vulgariser magistralement le concept de matrice informatique pour les yeux d\'un adolescent de seconde générale"',
      '"Lis mon patron avant de répéter la boucle"'
    ],
    2,
    "Une injonction massive lâchée seule sans le moindre tuteur ni maquette préconçue signale le tir Zero-Shot."
  ),
  quizStep(
    "La Faisabilité en Vol",
    "Supposez l'ordonnancement d'un grand départ aérien inédit vers l'autre hémisphère. Quelle formule Zero-Shot sonne magistralement claire ?",
    [
      '"Aide mon départ au plus vite"',
      '"As-tu des astuces loisirs ?"',
      '"Inventorie brutalement les 5 prémices obligatoires encadrant un départ intercontinental vierge. Fusionne documents légaux, transit aérien, hébergement et barrières d\'assurance."',
      '"Cause-moi de gares et d\'avions"'
    ],
    2,
    "En posant directement la limitation au chiffre 5 et les secteurs exacts, l'esprit de l'engin percute le mille sans fioritures."
  ),
  textStep(
    "L'Armement Few-Shot",
    "Élevez le débat vers le Few-Shot — tactique d'apprivoisement expéditif offrant à la bécane quelques pépites de résolution avant qu'elle ne prenne la parole. Vous l'étalonnez sur la cadence, le modèle mathématique, et le son de la voix qu'on veut lui soutirer."
  ),
  quizStep(
    "Détecter l'Injection de Gabarits",
    "Vous ordonnez au bot le triage émotionnel de citations brutes. Quelle formule exploite la fibre Few-Shot ?",
    [
      '"Sépare les affirmations belles des tristes"',
      '"Quelle est leur température d\'humeur globale ?"',
      '"Sonde rigoureusement la sentence. Étalonnage : \'L\'aube fut dorée\' → Positif. \'Je suffoque d\'horreur au milieu de cet embouteillage\' → Négatif. \'Prestation royale du serveur\' → Positif. Ton tour : \'J\'abhorre radicalement votre produit bas de gamme\'"',
      '"Sais-tu ce qu\'est la colère ?"'
    ],
    2,
    "Lui concéder les solutions étalons à l'avance calque son architecture neuronale pour livrer un jugement sur le même axe."
  ),
  fillStep(
    "Few-Shot Déployé au Combat !",
    "Incorporez les résolutions attendues pour moduler la syntaxe du système.",
    '"Traduis la rigidité protocolaire vers la rue. Études :\nGuindé : \'L\'honneur de votre venue est requis en salle des conseils.\' → Franc : \'___\'\nGuindé : \'On vous lègue l\'archive pour vos considérations expertes.\' → Franc : \'___\'\nMaintenant plie ceci : \'Nous vous notifions solennellement de l\'extension chronologique du projet.\'"',
    ["Faut que tu viennes à la réunion", "Tiens, regarde un peu le document"],
    ["Faut que tu viennes à la réunion", "Tiens, regarde un peu le document", "Restez à l'écart", "Je refuse formellement", "Salut la compagnie"],
    "L'antagonisme affiché entre jargon lourd et parler cru entraîne une adaptation virulente."
  ),
  textStep(
    "La Pyramide analytique : Chain-of-Thought",
    "Apogée du traitement : le déroulement analytique en Chaîne de Pensée (Chain-of-Thought). Il s'agit d'éclater un cauchemar conceptuel en rondelles sécables et logiques. Sous emprise de fragmentation, l'IA esquive ainsi l'hallucination et délivre les joyaux d'une sagesse pure."
  ),
  quizStep(
    "La Supériorité de Fragmenter l'Intellect",
    "Qu'est-ce qui différencie farouchement un ordre segmenté du chaos généralisé ?",
    [
      "Le texte défile moins longtemps",
      "Le système ignore joyeusement les consignes de fond",
      "Couper un drame insoluble en paliers mathématiques endigue farouchement l'hérésie de fond et magnifie la justesse d'impact logique",
      "Rien ne change fondamentalement dans l'appareil de calcul"
    ],
    2,
    "L'interdire de sauter par-dessus les noeuds d'analyse l'oblige à bâtir les fondations avant de monter le mur déductif."
  ),
  textStep(
    "Épreuve du Feu : L'Interstice de Carrière",
    "Vous guidez les aveux de transition de métier d'un proche ami terrifié. Lançons la dissection paramétrique."
  ),
  quizStep(
    "Étage Numéro 1 — Pompage de Données Primordiales",
    "Comment déminer d'entrée la cartographie vitale du naufragé ?",
    [
      '"Vends moi ton poste en or"',
      '"Fuis ta boîte avant qu\'elle coule"',
      '"Générons un pont de sauvegarde vital concernant ce pivot. Confie-moi sans trahir ta matrice ambiante : domaine actif, durée d\'emprisonnement là-bas, catalyseur fort provoquant l\'envie d\'ailleurs, et le rêve professionnel qui te consume à l\'instant t ?"',
      '"Liste moi gentiment les tares de ton job"'
    ],
    2,
    "Agripper l'architecture des contraintes bride le bot pour qu'il n'avance aucune fumisterie hasardeuse d'emblée."
  ),
  quizStep(
    "Étage Numéro 2 — Laboratoire Déductif",
    "Votre compagnon fige les faits : '6 années plombées dans la comptabilité, morosité intense. Fasciné viscéralement par le web-design sans palmarès existant. Responsable des frais du foyer et interdiction totale de rupture de versement salarial'. Comment enclencher l'analyse frontale du processeur ?",
    [
      '"Donne un métier rapide à ce type perdu"',
      '"Penses-tu que l\'art c\'est viable financièrement sur le long cours ?"',
      '"À la racine pure des aveux : ausculte âprement les gouffres de risques et les ascenseurs potentiels d\'un tel saut ! Accroche vigoureusement l\'algorithme à la charge pécuniaire inconditionnelle et son parcours natif. Traces les artères du possible n\'écorchant aucunement la fiabilité de son maintien salarial."',
      '"Quels cours d\'ordinateur peut-il suivre ?"'
    ],
    2,
    "Bloquer vigoureusement l'IA sur l'angoisse financière la purge de toute rêverie idéaliste pour forger une feuille de route tenable mentalement."
  ),
  quizStep(
    "Étage Numéro 3 — Clôture Stratégique Magistrale",
    "Le cadastre des peurs est dressé. Quel acte impérial entérine ce chantier d'assistance sur une note brillante ?",
    [
      '"C\'est noté, l\'exercice prend fin"',
      '"Emmenant l\'ensemble des bilans épluchés, dresse l\'ossature mathématique de mois en mois pour cette année test. Conçois des blocs opérationnels précis liant l\'avancée frénétique sur palette graphique au chevet de sa routine comptable immuable."',
      '"Récapitules platement ces données de nouveau mais très très vite"',
      '"Change d\'axe et aborde gentiment les métiers d\'ingénieur"'
    ],
    1,
    "Arracher le calendrier prévisionnel des mains de la machine exprime le rendement optimal final justifié par la chaîne déductive intégrale."
  ),
  textStep(
    "Souveraineté sur la Machine",
    "Adopter les tranches successives musèle la bêtise artificielle expéditive. Vous dégagez avec insolence des pistes valides en épargnant l'effondrement thématique de chaque détail."
  ),
  textStep(
    "Plaidoyer Terminal",
    "Une séance dédiée à l'apprentissage de formules transcendantales :\n\n- Zero-Shot : L'ordre nu de frappe d'ingénierie brute.\n- Few-Shot : Injection de protocoles résolus afin de façonner l'âme stylistique du bot en amont de bataille.\n- Chain-of-Thought : Démembrement strict du problème förçant fermement l'IA à gravir méthodiquement les déductions logiques.\n\nDemain, les guerres tactiques sur la conservation des paramètres longs. Tenez bon.\n\nÉtape Confirmée ✓"
  )
];
