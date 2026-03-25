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

export const DEEPSEEK_MODULE_3_STEPS_PT = [
  textStep(
    "O Jeito Certo de Aprender Coisas Novoas com o DeepSeek",
    "Bem-vindo de volta! Nesta lição, você vai descobrir como usar o DeepSeek como seu professor particular mais poderoso — aproveitando sua capacidade de raciocínio profundo para aprender qualquer assunto de forma estruturada, progressiva e verdadeiramente eficaz."
  ),
  textStep(
    "Por que o DeepSeek é Diferente como Ferramenta de Aprendizado",
    "A maioria dos assistentes de IA explica. O DeepSeek raciocina. Essa diferença é enorme quando o assunto é aprendizado. Ele não apenas entrega informações — ele decompõe conceitos, mostra o raciocínio por trás de cada ideia e constrói o conhecimento de forma lógica e progressiva."
  ),

  textStep(
    "Começando do Zero com Estrutura",
    "O erro mais comum de quem quer aprender algo novo com IA é fazer perguntas soltas sem uma base estruturada. Com o DeepSeek, o ponto de partida certo é estabelecer o mapa completo do que você vai aprender antes de mergulhar nos detalhes."
  ),
  fillStep(
    "Mapeie o aprendizado!",
    "Preencha a lacuna para criar uma base sólida para o seu estudo.",
    '"Quero aprender ___ do zero. Antes de começar, crie um ___ completo do que preciso aprender, organizado do ___ ao ___, com os ___ de cada etapa e o que devo ser capaz de ___ ao final de cada fase."',
    ["filosofia estoica", "mapa de aprendizado", "mais fundamental", "mais avançado", "tópicos principais", "fazer ou entender"],
    ["filosofia estoica", "mapa de aprendizado", "mais fundamental", "mais avançado", "tópicos principais", "fazer ou entender", "texto simples", "rápidas", "ideias"],
    "Entender a estrutura completa evita o sentimento de aprender pedaços soltos sem conexão."
  ),

  textStep(
    "Aprendendo com Raciocínio Visível",
    "A grande vantagem do DeepSeek R1 no aprendizado é poder ver o raciocínio por trás de cada explicação. Em vez de receber uma resposta pronta, você acompanha o processo de pensamento — o que acelera a compreensão real do conceito."
  ),
  fillStep(
    "Ative o raciocínio no aprendizado!",
    "Preencha a lacuna para ver a lógica por trás da explicação.",
    '"Explique o conceito de ___ mostrando seu ___ passo a passo. Não chegue direto à definição — ___ o problema que esse conceito resolve, mostre como alguém ___ chegaria a essa ideia e só então apresente a ___ formal com exemplos."',
    ["juros compostos", "raciocínio", "comece com", "naturalmente", "definição"],
    ["juros compostos", "raciocínio", "comece com", "naturalmente", "definição", "texto", "vago", "conclusão"],
    "Acompanhar o processo de pensamento acelera a compreensão profunda de qualquer conceito."
  ),

  textStep(
    "Criando seu Plano de Estudos com o DeepSeek",
    "Um plano de estudos bem estruturado é a diferença entre aprender de verdade e apenas sentir que está aprendendo. O DeepSeek cria planos detalhados e realistas baseados no seu objetivo, tempo e nível atual."
  ),
  fillStep(
    "Monte seu plano!",
    "Preencha a lacuna para criar seu cronograma personalizado.",
    '"Crie um plano de estudos para eu aprender ___ em ___. Tenho ___ por dia disponíveis. Meu nível atual é ___. O plano deve: ser ___ em semanas, incluir ___ para cada tópico, indicar como ___ o aprendizado de cada etapa e prever ___ para fixação."',
    ["análise de dados com Python", "3 meses", "1 hora", "iniciante absoluto", "dividido", "exercícios práticos", "verificar", "momentos de revisão"],
    ["análise de dados com Python", "3 meses", "1 hora", "iniciante absoluto", "dividido", "exercícios práticos", "verificar", "momentos de revisão", "rápido", "lento"],
    "Um plano com marcos claros e revisões mantém você focado e garante a evolução constante."
  ),
  quizStep(
    "Plano de Estudos Eficaz",
    "O que deve estar presente em um bom plano de estudos gerado pelo DeepSeek?",
    [
      "Apenas uma lista de tópicos para estudar",
      "O máximo de conteúdo possível para aproveitar o tempo",
      "Progressão lógica do básico ao avançado, exercícios práticos por etapa, momentos de revisão e formas de verificar o aprendizado antes de avançar",
      "Planos de estudo só funcionam para quem já tem conhecimento prévio na área"
    ],
    2,
    "Um plano equilibrado entre teoria, prática e revisão é a chave para a maestria."
  ),
  textStep(
    "Aprendendo com Analogias Personalizadas",
    "Conceitos difíceis ficam simples quando conectados a algo que você já conhece. O DeepSeek é especially bom em criar analogias sob medida — desde que você informe seu universo de referência."
  ),


  textStep(
    "Testando o que Você Aprendeu",
    "Aprender é uma coisa. Confirmar que realmente aprendeu é outra. O DeepSeek cria testes personalizados que vão além de múltipla escolha — avaliando se você entendeu o raciocínio por trás do conceito, não apenas a definição."
  ),


  textStep(
    "Aprendendo pelo Método de Feynman com o DeepSeek",
    "O Método de Feynman é uma das técnicas de aprendizado mais eficazes do mundo — você aprende um conceito e depois tenta explicá-lo com palavras simples. Se consegue, aprendeu. Se trava, identificou exatamente onde está a lacuna. O DeepSeek é o parceiro perfeito para esse método."
  ),
  fillStep(
    "Aplique o Método Feynman!",
    "Preencha a lacuna para testar sua capacidade de simplificação.",
    '"Vou tentar explicar o conceito de ___ com minhas próprias palavras: [sua explicação]. Analise minha explicação e me diga: o que eu entendi ___, onde meu raciocínio está ___ ou ___ e quais ___ precisam ser revisitados. Não corrija diretamente — faça ___ que me levem a descobrir o erro sozinho."',
    ["relatividade especial", "corretamente", "incorreto", "incompleto", "conceitos", "perguntas"],
    ["relatividade especial", "corretamente", "incorreto", "incompleto", "conceitos", "perguntas", "respostas", "frases"],
    "Simplificar a explicação é a prova final de que você realmente entende o assunto."
  ),

  textStep(
    "Aprofundando Conceitos Progressivamente",
    "O aprendizado real acontece em camadas. O DeepSeek permite ir do básico ao avançado de forma progressiva — cada resposta construindo sobre a anterior, sem saltos que criam lacunas."
  ),
  fillStep(
    "Aprenda em camadas!",
    "Preencha a lacuna para construir uma base sólida antes da complexidade.",
    '"Explique ___ em ___ níveis de profundidade crescente. Nível 1: explicação para quem nunca ouviu falar. Nível 2: aprofundamento com ___ e nuances. Nível 3: visão de ___ com conexões a outros conceitos. Pause entre cada nível e me pergunte se estou ___ antes de avançar."',
    ["economia comportamental", "3", "mecanismos", "especialista", "pronto para continuar"],
    ["economia comportamental", "3", "mecanismos", "especialista", "pronto para continuar", "feliz", "cansado"],
    "Controlar o aumento da complexidade evita a sobrecarga cognitiva e garante a base firme."
  ),

  textStep(
    "Aprendendo com Casos Reais e Aplicações Práticas",
    "Teoria sem prática não vira conhecimento. O DeepSeek conecta qualquer conceito a casos reais e aplicações concretas — tornando o aprendizado muito mais relevante e memorável."
  ),
  fillStep(
    "Conecte teoria à prática!",
    "Preencha a lacuna para dar vida aos conceitos abstratos.",
    '"Acabei de entender o conceito de ___ em teoria. Agora me mostre ___ casos reais onde esse conceito foi aplicado com ___, ___ onde foi ignorado com consequências negativas e como eu poderia ___ esse conhecimento na minha realidade de ___."',
    ["viés de confirmação", "3", "sucesso", "situações", "aplicar", "tomada de decisão profissional"],
    ["viés de confirmação", "3", "sucesso", "situações", "aplicar", "tomada de decisão profissional", "estudo", "lazer"],
    "Ver o conceito 'em ação' revela as nuances que a teoria pura não consegue transmitir."
  ),

  textStep(
    "Revisando e Consolidando com o DeepSeek",
    "A revisão espaçada é uma das técnicas de memorização mais comprovadas pela ciência. O DeepSeek cria sessões de revisão inteligentes que reforçam exatamente o que precisa ser fixado."
  ),


  textStep(
    "Aprendendo Idiomas com o DeepSeek",
    "Para aprendizado de idiomas, o DeepSeek funciona como professor de gramática, parceiro de conversação e analisador de erros — com a profundidade de raciocínio que o diferencia de outros assistentes."
  ),


  textStep(
    "A Regra de Ouro do Aprendizado com o DeepSeek",
    "O DeepSeek potencializa seu aprendizado — mas o esforço ainda é seu. Ele entrega o raciocínio, a estrutura, o teste e a revisão. A prática deliberada, a aplicação real e a consistência dependem de você."
  ),

  textStep(
    "Conclusão",
    "O DeepSeek não é apenas um assistente que explica — é um parceiro de aprendizado que raciocina junto com você, mostra o processo por trás de cada conceito, cria planos estruturados, testa seu entendimento real e identifica lacunas com precisão cirúrgica.\n\nQuem aprende com o DeepSeek da forma certa não apenas absorve informações — desenvolve raciocínio. E raciocínio bem desenvolvido é o que transforma conhecimento em resultado real.\n\nAprenda com profundidade. Pense com clareza. Evolua com intenção.\n\nLição concluída ✓"
  ),
];

export const DEEPSEEK_MODULE_3_STEPS_EN = [
  textStep(
    "The Right Way to Learn New Things with DeepSeek",
    "Welcome back! In this lesson, you will discover how to use DeepSeek as your most powerful private tutor — leveraging its deep reasoning capacity to learn any subject in a structured, progressive, and truly effective way."
  ),
  textStep(
    "Why DeepSeek is Different as a Learning Tool",
    "Most AI assistants explain. DeepSeek reasons. This difference is huge when it comes to learning. It doesn't just deliver information — it decomposes concepts, shows the reasoning behind each idea, and builds knowledge in a logical and progressive way."
  ),

  textStep(
    "Starting from Scratch with Structure",
    "The most common mistake for those who want to learn something new with AI is asking loose questions without a structured basis. With DeepSeek, the right starting point is to establish the complete map of what you will learn before diving into details."
  ),
  fillStep(
    "Map the learning!",
    "Fill in the gap to create a solid foundation for your study.",
    '"I want to learn ___ from scratch. Before starting, create a complete ___ of what I need to learn, organized from ___ to ___, with the ___ of each stage and what I should be able to ___ at the end of each phase."',
    ["stoic philosophy", "learning map", "most fundamental", "most advanced", "main topics", "do or understand"],
    ["stoic philosophy", "learning map", "most fundamental", "most advanced", "main topics", "do or understand", "simple text", "fast", "ideas"],
    "Understanding the complete structure avoids the feeling of learning loose pieces without connection."
  ),

  textStep(
    "Learning with Visible Reasoning",
    "The great advantage of DeepSeek R1 in learning is being able to see the reasoning behind each explanation. Instead of receiving a ready-made answer, you follow the thought process — which accelerates real comprehension of the concept."
  ),
  fillStep(
    "Activate reasoning in learning!",
    "Fill in the gap to see the logic behind the explanation.",
    '"Explain the concept of ___ showing your ___ step-by-step. Don\'t go straight to the definition — ___ the problem that this concept solves, show how someone would ___ reach this idea, and only then present the formal ___ with examples."',
    ["compound interest", "reasoning", "start with", "naturally", "definition"],
    ["compound interest", "reasoning", "start with", "naturally", "definition", "text", "vague", "conclusion"],
    "Following the thought process accelerates the deep understanding of any concept."
  ),

  textStep(
    "Creating your Study Plan with DeepSeek",
    "A well-structured study plan is the difference between truly learning and just feeling like you are learning. DeepSeek creates detailed and realistic plans based on your goal, time, and current level."
  ),
  fillStep(
    "Build your plan!",
    "Fill in the gap to create your personalized schedule.",
    '"Create a study plan for me to learn ___ in ___. I have ___ per day available. My current level is ___. The plan should: be ___ in weeks, include ___ for each topic, indicate how to ___ the learning of each stage, and provide for ___ for consolidation."',
    ["data analysis with Python", "3 months", "1 hour", "absolute beginner", "divided", "practical exercises", "verify", "review moments"],
    ["data analysis with Python", "3 months", "1 hour", "absolute beginner", "divided", "practical exercises", "verify", "review moments", "fast", "slow"],
    "A plan with clear milestones and reviews keeps you focused and guarantees constant evolution."
  ),
  quizStep(
    "Effective Study Plan",
    "What should be present in a good study plan generated by DeepSeek?",
    [
      "Just a list of topics to study",
      "The maximum content possible to make use of time",
      "Logical progression from basic to advanced, practical exercises per stage, review moments, and ways to verify learning before advancing",
      "Study plans only work for those who already have previous knowledge in the area"
    ],
    2,
    "A plan balanced between theory, practice, and review is the key to mastery."
  ),
  textStep(
    "Learning with Personalized Analogies",
    "Difficult concepts become simple when connected to something you already know. DeepSeek is especially good at creating tailor-made analogies — as long as you provide your reference universe."
  ),


  textStep(
    "Testing what You Learned",
    "Learning is one thing. Confirming that you actually learned is another. DeepSeek creates personalized tests that go beyond multiple choice — evaluating if you understood the reasoning behind the concept, not just the definition."
  ),


  textStep(
    "Learning through the Feynman Method with DeepSeek",
    "The Feynman Method is one of the most effective learning techniques in the world — you learn a concept and then try to explain it in simple words. If you can, you learned. If you fail, you identified exactly where the gap is. DeepSeek is the perfect partner for this method."
  ),
  fillStep(
    "Apply the Feynman Method!",
    "Fill in the gap to test your simplification capacity.",
    '"I will try to explain the concept of ___ with my own words: [your explanation]. Analyze my explanation and tell me: what I understood ___, where my reasoning is ___ or ___ and which ___ need to be revisited. Don\'t correct directly — ask ___ that lead me to discover the error myself."',
    ["special relativity", "correctly", "incorrect", "incomplete", "concepts", "questions"],
    ["special relativity", "correctly", "incorrect", "incomplete", "concepts", "questions", "answers", "sentences"],
    "Simplifying the explanation is the final proof that you truly understand the subject."
  ),

  textStep(
    "Deepening Concepts Progressively",
    "Real learning happens in layers. DeepSeek allows going from basic to advanced progressively — each answer building on the previous one, without jumps that create gaps."
  ),
  fillStep(
    "Learn in layers!",
    "Fill in the gap to build a solid foundation before complexity.",
    '"Explain ___ in ___ levels of increasing depth. Level 1: explanation for someone who has never heard of it. Level 2: deepening with ___ and nuances. Level 3: ___ vision with connections to other concepts. Pause between each level and ask me if I am ___ before advancing."',
    ["behavioral economics", "3", "mechanisms", "specialist", "ready to continue"],
    ["behavioral economics", "3", "mechanisms", "specialist", "ready to continue", "happy", "tired"],
    "Controlling the increase in complexity avoids cognitive overload and guarantees a firm foundation."
  ),

  textStep(
    "Learning with Real Cases and Practical Applications",
    "Theory without practice doesn't become knowledge. DeepSeek connects any concept to real cases and concrete applications — making learning much more relevant and memorable."
  ),
  fillStep(
    "Connect theory to practice!",
    "Fill in the gap to give life to abstract concepts.",
    '"I just understood the concept of ___ in theory. Now show me ___ real cases where this concept was applied with ___, ___ where it was ignored with negative consequences, and how I could ___ this knowledge in my reality of ___."',
    ["confirmation bias", "3", "success", "situations", "apply", "professional decision making"],
    ["confirmation bias", "3", "success", "situations", "apply", "professional decision making", "study", "leisure"],
    "Seeing the concept 'in action' reveals nuances that pure theory cannot transmit."
  ),

  textStep(
    "Reviewing and Consolidating with DeepSeek",
    "Spaced repetition is one of the most scientifically proven memory techniques. DeepSeek creates intelligent review sessions that reinforce exactly what needs to be fixed."
  ),


  textStep(
    "Learning Languages with DeepSeek",
    "For language learning, DeepSeek works as a grammar teacher, conversation partner, and error analyzer — with the reasoning depth that sets it apart from other assistants."
  ),


  textStep(
    "The Golden Rule of Learning with DeepSeek",
    "DeepSeek enhances your learning — but the effort is still yours. It delivers the reasoning, the structure, the test, and the review. Deliberate practice, real application, and consistency depend on you."
  ),

  textStep(
    "Conclusion",
    "DeepSeek is not just an assistant that explains — it is a learning partner that reasons with you, shows the process behind each concept, creates structured plans, tests your real understanding and identifies gaps with surgical precision.\n\nThose who learn with DeepSeek the right way don't just absorb information — they develop reasoning. And well-developed reasoning is what transforms knowledge into real results.\n\nLearn in depth. Think clearly. Evolve with intention.\n\nLesson completed ✓"
  ),
];

export const DEEPSEEK_MODULE_3_STEPS_ES = [
  textStep(
    "La Forma Correcta de Aprender Cosas Nuevas con DeepSeek",
    "¡Bienvenido de nuevo! En esta lección, descubrirás cómo usar DeepSeek como tu profesor particular más poderoso — aprovechando su capacidad de razonamiento profundo para aprender cualquier tema de forma estructurada, progresiva y verdaderamente eficaz."
  ),
  textStep(
    "Por qué DeepSeek es Diferente como Herramienta de Aprendizaje",
    "La mayoría de los asistentes de IA explican. DeepSeek razona. Esta diferencia es enorme cuando se trata de aprender. No solo entrega información — descompone conceptos, muestra el razonamiento detrás de cada idea y construye el conocimiento de forma lógica y progresiva."
  ),

  textStep(
    "Empezando desde Cero con Estructura",
    "El error más común de quien quiere aprender algo nuevo con IA es hacer preguntas sueltas sin una base estructurada. Con DeepSeek, el punto de partida correcto es establecer el mapa completo de lo que vas a aprender antes de sumergirte en los detalles."
  ),
  fillStep(
    "¡Mapea el aprendizaje!",
    "Completa el espacio para crear una base sólida para tu estudio.",
    '"Quiero aprender ___ desde cero. Antes de empezar, crea un ___ completo de lo que necesito aprender, organizado desde lo ___ a lo ___, con los ___ de cada etapa y lo que debo ser capaz de ___ al final de cada fase."',
    ["filosofía estoica", "mapa de aprendizaje", "más fundamental", "más avanzado", "temas principales", "hacer o entender"],
    ["filosofía estoica", "mapa de aprendizaje", "más fundamental", "más avanzado", "temas principais", "hacer o entender", "texto simple", "rápidas", "ideas"],
    "Entender la estructura completa evita la sensación de aprender piezas sueltas sin conexión."
  ),

  textStep(
    "Aprendiendo con Razonamiento Visible",
    "La gran ventaja de DeepSeek R1 en el aprendizaje es poder ver el razonamiento detrás de cada explicación. En lugar de recibir una respuesta lista, acompañas el proceso de pensamiento — lo que acelera la comprensión real del concepto."
  ),
  fillStep(
    "¡Activa el razonamiento en el aprendizaje!",
    "Completa el espacio para ver la lógica detrás de la explicación.",
    '"Explica el concepto de ___ mostrando tu ___ paso a paso. No vayas directo a la definición — ___ el problema que este concepto resuelve, muestra cómo alguien ___ llegaría a esta idea y solo entonces presenta la ___ formal con ejemplos."',
    ["interés compuesto", "razonamiento", "comienza con", "naturalmente", "definición"],
    ["interés compuesto", "razonamiento", "comienza con", "naturalmente", "definición", "texto", "vago", "conclusión"],
    "Acompañar el proceso de pensamiento acelera la comprensión profunda de cualquier concepto."
  ),

  textStep(
    "Creando tu Plan de Estudios con DeepSeek",
    "Un plan de estudios bien estructurado é la diferencia entre aprender de verdad y solo sentir que estás aprendiendo. DeepSeek crea planes detallados de acuerdo a tu objetivo, tiempo y nivel habitual."
  ),
  fillStep(
    "¡Monta tu plan!",
    "Completa el espacio para crear tu cronograma personalizado.",
    '"Crea un plan de estudios para que aprenda ___ en ___. Tengo ___ por día disponible. Mi nivel actual es ___. El plan debe: estar ___ en semanas, incluir ___ para cada tema, indicar cómo ___ el aprendizaje de cada etapa y prever ___ para la fijación."',
    ["análisis de datos con Python", "3 meses", "1 hora", "principiante absoluto", "dividido", "ejercícios prácticos", "verificar", "momentos de revisión"],
    ["análisis de datos con Python", "3 meses", "1 hora", "principiante absoluto", "dividido", "ejercícios prácticos", "verificar", "momentos de revisión", "rápido", "lento"],
    "Un plan con metas claras y revisiones te mantiene enfocado y garantiza la evolución constante."
  ),
  quizStep(
    "Plan de Estudios Eficaz",
    "¿Qué debe estar presente en un buen plan de estudios generado por DeepSeek?",
    [
      "Solo una lista de temas para estudiar",
      "El máximo contenido posible para aprovechar el tiempo",
      "Progresión lógica de lo básico a lo avanzado, ejercicios prácticos por etapa, momentos de revisión y formas de verificar el aprendizaje antes de avanzar",
      "Los planes de estudio solo funcionan para quienes ya tienen conocimiento previo en el área"
    ],
    2,
    "Un plan equilibrado entre teoría, práctica y revisión es la clave para la maestría."
  ),
  textStep(
    "Aprendiendo con Analogías Personalizadas",
    "Los conceptos difíciles se vuelven simples cuando se conectan con algo que ya conoces. DeepSeek es especialmente bueno creando analogías a medida — siempre que informes tu universo de referencia."
  ),


  textStep(
    "Probando lo que Has Aprendido",
    "Aprender es una cosa. Confirmar que realmente has aprendido es otra. DeepSeek crea pruebas personalizadas que van más allá de la opción múltiple — evaluando si entendiste el razonamiento detrás del concepto, no solo la definición."
  ),


  textStep(
    "Aprendiendo por el Método de Feynman con DeepSeek",
    "El Método de Feynman es una de las técnicas de aprendizaje más eficaces del mundo — aprendes un concepto y luego intentas explicarlo con palabras sencillas. Si lo logras, has aprendido. Si te trabas, identificaste exactamente dónde está la laguna. DeepSeek es el compañero perfecto para este método."
  ),
  fillStep(
    "¡Aplica el Método Feynman!",
    "Completa el espacio para probar tu capacidad de simplificación.",
    '"Voy a intentar explicar el concepto de ___ con mis propias palabras: [tu explicación]. Analiza mi explicación y dime: qué entendí ___, dónde mi razonamiento es ___ o ___ y qué ___ necesitan ser revisitados. No corrijas directamente — haz ___ que me lleven a descubrir el error por mí mismo."',
    ["relatividad especial", "correctamente", "incorrecto", "incompleto", "conceptos", "preguntas"],
    ["relatividad especial", "correctamente", "incorrecto", "incompleto", "conceptos", "preguntas", "respuestas", "frases"],
    "Simplificar la explicación es la prueba final de que realmente entiendes el tema."
  ),

  textStep(
    "Profundizando Conceptos Progresivamente",
    "El aprendizaje real ocurre en capas. DeepSeek permite ir de lo básico a lo avanzado de forma progresiva — cada respuesta construyéndose sobre la anterior, sin saltos que creen lagunas."
  ),
  fillStep(
    "¡Aprende en capas!",
    "Completa el espacio para construir una base sólida antes de la complejidad.",
    '"Explica ___ en ___ niveles de profundidad creciente. Nivel 1: explicación para quien nunca ha oído hablar de ello. Nivel 2: profundización con ___ e matices. Nivel 3: visión de ___ con conexiones a otros conceptos. Haz una pausa entre cada nivel y pregúntame si estoy ___ antes de avanzar."',
    ["economía del comportamiento", "3", "mecanismos", "experto", "listo para continuar"],
    ["economía del comportamiento", "3", "mecanismos", "experto", "listo para continuar", "feliz", "cansado"],
    "Controlar el aumento de la complejidad evita la sobrecarga cognitiva y garantiza una base firme."
  ),

  textStep(
    "Aprendiendo con Casos Reales y Aplicaciones Prácticas",
    "La teoría sin práctica no se convierte en conocimiento. DeepSeek conecta cualquier concepto con casos reales y aplicaciones concretas — haciendo que el aprendizaje sea mucho más relevante y memorable."
  ),
  fillStep(
    "¡Conecta la teoría con la práctica!",
    "Completa el espacio para dar vida a los conceptos abstractos.",
    '"Acabo de entender el concepto de ___ en teoría. Ahora muéstrame ___ casos reales donde este concepto se aplicó con ___, ___ donde fue ignorado con consecuencias negativas y como podría ___ este conocimiento en mi realidad de ___."',
    ["sesgo de confirmación", "3", "éxito", "situaciones", "aplicar", "toma de decisiones profesional"],
    ["sesgo de confirmación", "3", "éxito", "situaciones", "aplicar", "toma de decisiones profesional", "estudio", "ocio"],
    "Ver el concepto 'en acción' revela los matices que la teoría pura no puede transmitir."
  ),

  textStep(
    "Revisando y Consolidando con DeepSeek",
    "La revisión espaciada es una de las técnicas de memorización más probadas por la ciencia. DeepSeek crea sesiones de revisión inteligentes que refuerzan exactamente lo que necesita ser fijado."
  ),


  textStep(
    "Aprendiendo Idiomas con DeepSeek",
    "Para el aprendizaje de idiomas, DeepSeek funciona como profesor de gramática, compañero de conversación y analizador de errores — con la profundidad de razonamiento que lo diferencia de otros asistentes."
  ),
  fillStep(
    "¡Aprende idiomas con profundidad!",
    "Completa el espacio para dominar la estructura de un nuevo idioma.",
    '"Quiero practicar ___. Responde ___ durante toda la conversación. Cuando cometa errores, no solo ___ — explica el ___ gramatical detrás del error, muestra las ___ correctas y hazme ___ la estructura correcta en una oración nueva antes de continuar."',
    ["alemán intermedio", "solo en alemán", "corrige", "razonamiento", "formas", "practicar"],
    ["alemán intermedio", "solo en alemán", "corrige", "razonamiento", "formas", "practicar", "texto", "hablar"],
    "Entender la 'lógica' del idioma es mucho mais poderoso que solo memorizar frases listas."
  ),

  textStep(
    "La Regla de Oro del Aprendizaje con DeepSeek",
    "DeepSeek potencia tu aprendizaje — pero el esfuerzo sigue siendo tuyo. Él entrega el razonamiento, la estructura, la prueba y la revisión. La práctica deliberada, la aplicación real y la consistencia dependen de ti."
  ),

  textStep(
    "Conclusión",
    "DeepSeek no es solo un asistente que explica — es un compañero de aprendizaje que razona junto contigo, muestra el proceso detrás de cada concepto, crea planes estructurados, pone a prueba tu entendimiento real e identifica lagunas con precisión quirúrgica.\n\nQuien aprende con DeepSeek de la forma correcta no solo absorbe información — desarrolla razonamiento. Y un razonamiento bien desarrollado es lo que transforma el conocimiento en un resultado real.\n\nAprende con profundidad. Piensa con claridad. Evoluciona con intención.\n\nLección completada ✓"
  ),
];

export const DEEPSEEK_MODULE_3_STEPS_FR = [
  textStep(
    "La Bonne Façon d'Apprendre de Nouvelles Choses avec DeepSeek",
    "Bienvenue de retour ! Dans cette leçon, vous découvrirez comment utiliser DeepSeek comme votre tuteur privé le plus puissant — en tirant parti de sa capacité de raisonnement profond pour apprendre n'importe quel sujet de manière structurée, progressive et véritablement efficace."
  ),
  textStep(
    "Pourquoi DeepSeek est Différent en tant qu'Outil d'Apprentissage",
    "La plupart des assistants IA expliquent. DeepSeek raisonne. Cette différence est énorme lorsqu'il s'agit d'apprendre. Il ne se contente pas de livrer des informations — il décompose les concepts, montre le raisonnement derrière chaque idée et construit le savoir de manière logique et progressive."
  ),

  textStep(
    "Commencer de Zéro with Structure",
    "L'erreur la plus courante pour those qui veulent apprendre quelque chose de nouveau avec l'IA est de poser des questions isolées sans base structurée. Avec DeepSeek, le bon point de départ est d'établir la carte complète de ce que vous allez apprendre avant de plonger dans les détails."
  ),
  fillStep(
    "Cartographiez l'apprentissage !",
    "Complétez le vide pour créer une base solide pour votre étude.",
    '"Je veux apprendre ___ en partant de zéro. Avant de commencer, crée une ___ complète de ce que je dois apprendre, organisée du ___ au ___, avec les ___ de chaque étape et ce que je dois être capable de ___ à la fin de chaque phase."',
    ["philosophie stoïcienne", "carte d'apprentissage", "plus fondamental", "plus avancé", "sujets principaux", "faire ou comprendre"],
    ["philosophie stoïcienne", "carte d'apprentissage", "plus fondamental", "plus avancé", "sujets principaux", "faire ou comprendre", "texte simple", "rapides", "idées"],
    "Comprendre la structure complète évite le sentiment d'apprendre des morceaux isolés sans connexion."
  ),

  textStep(
    "Apprendre avec un Raisonnement Visible",
    "Le grand avantage de DeepSeek R1 dans l'apprentissage est de pouvoir voir le raisonnement derrière chaque explication. Au lieu de recevoir une réponse toute faite, vous suivez le processus de réflexion — ce qui accélère la compréhension réelle du concept."
  ),
  fillStep(
    "Activez le raisonnement dans l'apprentissage !",
    "Complétez le vide pour voir la logique derrière l'explication.",
    '"Explique le concept de ___ en montrant ton ___ étape par étape. Ne va pas directement à la définition — ___ le problème que ce concept résout, montre comment quelqu\'un y arriverait ___ et présente alors seulement la ___ formelle avec des exemples."',
    ["intérêts composés", "raisonnement", "commence par", "naturellement", "définition"],
    ["intérêts composés", "raisonnement", "commence par", "naturellement", "définition", "texte", "vague", "conclusion"],
    "Suivre le processus de réflexion accélère la compréhension profonde de n'importe quel concept."
  ),

  textStep(
    "Créer votre Plan d'Études avec DeepSeek",
    "Un plan d'études bien structuré est la différence entre apprendre vraiment et avoir seulement l'impression d'apprendre. DeepSeek crée des plans détaillés et réalistes basés sur votre objectif, votre temps et votre niveau actuel."
  ),
  fillStep(
    "Montez votre plan !",
    "Complétez le vide pour créer votre calendrier personnalisé.",
    '"Crée un plan d\'études pour que j\'apprenne ___ en ___. J\'ai ___ par jour de disponible. Mon niveau actuel est ___. Le plan doit : être ___ en semaines, inclure des ___ pour chaque sujet, indiquer comment ___ l\'apprentissage de chaque étape et prévoir des ___ pour la consolidation."',
    ["l'analyse de données avec Python", "3 mois", "1 heure", "débutant absolu", "divisé", "exercices pratiques", "vérifier", "moments de révision"],
    ["l'analyse de données avec Python", "3 months", "1 heure", "débutant absolu", "divisé", "exercices pratiques", "vérifier", "moments de révision", "rapide", "lent"],
    "Un plan avec des jalons clairs et des révisions vous garde concentré et garantit une évolution constante."
  ),
  quizStep(
    "Plan d'Études Efficace",
    "Qu'est-ce qui doit être présent dans un bon plan d'études généré par DeepSeek ?",
    [
      "Seulement une liste de sujets à étudier",
      "Le maximum de contenu possible pour profiter du temps",
      "Une progression logique du basique à l'avancé, des exercices pratiques par étape, des moments de révision et des moyens de vérifier l'apprentissage avant d'avancer",
      "Les plans d'études ne fonctionnent que pour ceux qui ont déjà des connaissances préalables dans le domaine"
    ],
    2,
    "Un plan équilibré entre théorie, pratique et révision est la clé de la maîtrise."
  ),
  textStep(
    "Apprendre avec des Analogies Personnalisées",
    "Les concepts difficiles deviennent simples lorsqu'ils sont connectés à quelque chose que vous connaissez déjà. DeepSeek est particulièrement doué pour créer des analogies sur mesure — à condition que vous indiquiez votre univers de référence."
  ),


  textStep(
    "Tester ce que Vous Avez Appris",
    "Apprendre est une chose. Confirmer qu'on a vraiment appris en est une autre. DeepSeek crée des tests personnalisés qui vont au-delà du choix multiple — en évaluant si vous avez compris le raisonnement derrière le concept, et pas seulement la définition."
  ),


  textStep(
    "Apprendre par la Méthode Feynman avec DeepSeek",
    "La Méthode Feynman est l'une des techniques d'apprentissage les plus efficaces au monde — vous apprenez un concept, puis vous essayez de l'expliquer avec des mots simples. Si vous y arrivez, vous avez appris. Si vous bloquez, vous avez identifié exactement où se trouve la lacune. DeepSeek est le partenaire idéal pour cette méthode."
  ),
  fillStep(
    "Appliquez la Méthode Feynman !",
    "Complétez le vide pour tester votre capacité de simplification.",
    '"Je vais essayer d\'expliquer le concept de ___ avec mes propres mots : [votre explication]. Analyse mon explication et dis-moi : ce que j\'ai compris ___, où mon raisonnement est ___ ou ___ et quels ___ doivent être revisités. Ne corrige pas directement — pose des ___ qui m\'amènent à découvrir l\'erreur par moi-même."',
    ["relativité restreinte", "correctement", "incorrect", "incomplet", "concepts", "questions"],
    ["relativité restreinte", "correctement", "incorrect", "incomplet", "concepts", "questions", "réponses", "phrases"],
    "Simplifier l'explication est la preuve finale que vous comprenez vraiment le sujet."
  ),

  textStep(
    "Approfondir les Concepts Progressivement",
    "L'apprentissage réel se fait par étapes. DeepSeek permet d'aller du basique à l'avancé de manière progressive — chaque réponse s'appuyant sur la précédente, sans sauts qui créent des lacunes."
  ),
  fillStep(
    "Apprenez par étapes !",
    "Complétez le vide pour construire une base solide avant la complexité.",
    '"Explique ___ en ___ niveaux de profondeur croissante. Niveau 1 : explication pour quelqu\'un qui n\'en a jamais entendu parler. Niveau 2 : approfondissement avec des ___ et des nuances. Niveau 3 : vision d\'___ avec des connexions à d\'autres concepts. Fais une pause entre chaque niveau et demande-moi si je suis ___ avant d\'avancer."',
    ["l'économie comportementale", "3", "mécanismes", "expert", "prêt à continuer"],
    ["l'économie comportementale", "3", "mécanismes", "expert", "prêt à continuer", "heureux", "fatigué"],
    "Contrôler l'augmentation de la complexité évite la surcharge cognitive et garantit une base solide."
  ),

  textStep(
    "Apprendre avec des Cas Réels et des Applications Pratiques",
    "La théorie sans la pratique ne devient pas un savoir. DeepSeek connecte n'importe quel concept à des cas réels et des applications concrètes — rendant l'apprentissage beaucoup plus pertinent et mémorable."
  ),
  fillStep(
    "Connectez la théorie à la pratique !",
    "Complétez le vide pour donner vie aux concepts abstraits.",
    '"Je viens de comprendre le concept de ___ en théorie. Maintenant, montre-moi ___ cas réels où ce concept a été appliqué avec ___, des ___ où il a été ignoré avec des conséquences négatives et comment je pourrais ___ ce savoir dans ma réalité de ___."',
    ["biais de confirmation", "3", "succès", "situations", "appliquer", "prise de décision professionnelle"],
    ["biais de confirmation", "3", "succès", "situations", "appliquer", "prise de décision professionnelle", "étude", "loisir"],
    "Voir le concept 'en action' révèle des nuances que la pure théorie ne peut pas transmettre."
  ),

  textStep(
    "Réviser et Consolider avec DeepSeek",
    "La révision espacée est l'une des techniques de mémorisation les plus prouvées par la science. DeepSeek crée des sessions de révision intelligentes qui renforcent exactement ce qui doit être fixé."
  ),


  textStep(
    "Apprendre des Langues with DeepSeek",
    "Pour l'apprentissage des langues, DeepSeek fonctionne comme un professeur de grammaire, un partenaire de conversation et un analyseur d'erreurs — avec la profondeur de raisonnement qui le différencie des autres assistants."
  ),


  textStep(
    "La Règle d'Or de l'Apprentissage avec DeepSeek",
    "DeepSeek décuple votre apprentissage — mais l'effort reste le vôtre. Il livre le raisonnement, la structure, le test et la révision. La pratique délibérée, l'application réelle et la régularité dépendent de vous."
  ),

  textStep(
    "Conclusion",
    "DeepSeek n'est pas seulement un assistant qui explique — c'est un partenaire d'apprentissage qui raisonne avec vous, montre le processus derrière chaque concept, crée des plans structurés, teste votre compréhension réelle et identifie les lacunes avec une précision chirurgicale.\n\nCeux qui apprennent avec DeepSeek de la bonne manière ne font pas qu'absorber des informations — ils développent un raisonnement. Et un raisonnement bien développé est ce qui transforme le savoir en résultat réel.\n\nApprenez en profondeur. Pensez avec clarté. Évoluez avec intention.\n\nLeçon terminée ✓"
  ),
];
