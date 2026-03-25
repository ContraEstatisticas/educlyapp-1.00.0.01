import { textStep, quizStep, fillStep } from "./deepseekModule1LessonSteps";

export const DEEPSEEK_MODULE_5_STEPS_PT = [
  textStep(
    "Os Erros Mais Comuns ao Usar o DeepSeek",
    "Bem-vindo de volta! Nesta lição, você vai aprender a identificar e evitar os erros mais comuns que fazem usuários do DeepSeek obterem resultados medíocres — mesmo com uma ferramenta poderosa nas mãos. Conhecer os erros é o primeiro passo para superá-los."
  ),
  textStep(
    "Por que Conhecer os Erros é Tão Importante",
    "Muitos usuários culpam a ferramenta quando os resultados são ruins. Na maioria das vezes, o problema não está no DeepSeek — está na forma como ele está sendo usado. Identificar os erros mais comuns transforma um usuário mediano em um usuário estratégico."
  ),
  textStep(
    "Erro 1 — Prompts Vagos e Sem Contexto",
    "O erro mais comum e mais impactante. Usuários fazem perguntas genéricas e ficam frustrados com respostas genéricas — sem perceber que a vagueza do prompt é a causa direta do resultado ruim."
  ),
  fillStep(
    "Identifique o prompt problemático!",
    "Preencha a lacuna para transformar um prompt vago em um prompt poderoso.",
    'Prompt com erro: "Me ajude com meu negócio." Prompt correto: "Sou dono de uma [______] com [______] funcionários e faturamento de [______] por mês. Meu maior desafio atual é [______]. Me ajude a criar um plano de ação com [______] etapas concretas para resolver esse problema nos próximos [______] dias."',
    ["loja de roupas femininas", "3", "R$25k", "converter mais visitantes em compradores", "5", "30"],
    ["loja de roupas femininas", "3", "R$25k", "converter mais visitantes em compradores", "5", "30", "empresa", "vendas", "meses"],
    "Contexto é a matéria-prima que a IA usa para ser precisa."
  ),
  textStep(
    "Erro 2 — Aceitar o Primeiro Resultado sem Refinar",
    "O segundo erro mais comum é tratar a primeira resposta como a resposta final. O DeepSeek foi construído para iteração — cada refinamento melhora significativamente a qualidade do resultado."
  ),
  fillStep(
    "Refine em vez de aceitar!",
    "Preencha a lacuna para pedir um refinamento estratégico.",
    '"A resposta anterior está no caminho certo, mas preciso de ajustes: [______] a segunda parte com mais [______], mude o tom para mais [______], adicione [______] práticos e elimine os trechos que estão [______] demais para o meu contexto."',
    ["aprofundando", "dados e evidências", "direto e assertivo", "exemplos", "genéricos"],
    ["aprofundando", "dados e evidências", "direto e assertivo", "exemplos", "genéricos", "resumindo", "longos", "vagos"],
    "A iteração transforma um rascunho em uma obra-prima."
  ),
  textStep(
    "Erro 3 — Compartilhar Dados Sensíveis e Confidenciais",
    "Um erro crítico que muitos cometem sem perceber. Por ser um modelo de origem chinesa, o DeepSeek está sujeito às leis de dados da China — o que torna o compartilhamento de informações sensíveis um risco real."
  ),
  fillStep(
    "Identifique o que NÃO compartilhar!",
    "Preencha a lacuna para garantir a segurança dos seus dados.",
    '"Antes de usar o DeepSeek para qualquer tarefa, verifique se o conteúdo contém: [______] de clientes, [______] financeiras confidenciais, [______] propriedade intelectual estratégica ou [______] comerciais. Se sim, [______] ou [______] antes de compartilhar."',
    ["dados pessoais", "informações", "propriedade", "segredos", "anonimize os dados", "use outro assistente"],
    ["dados pessoais", "informações", "propriedade", "segredos", "anonimize os dados", "use outro assistente", "nomes", "valores"],
    "Privacidade e segurança devem vir antes da produtividade."
  ),
  textStep(
    "Erro 4 — Usar o Modelo Errado para a Tarefa",
    "O DeepSeek tem versões diferentes para diferentes tipos de tarefa. Usar o modelo genérico para uma tarefa que exige raciocínio profundo — ou o contrário — resulta em respostas abaixo do potencial."
  ),
  fillStep(
    "Escolha o modelo certo!",
    "Preencha a lacuna para associar a tarefa ao modelo ideal.",
    '"Para [______] e problemas que exigem raciocínio lógico profundo, use o [______]. Para tarefas de [______] e uso geral do dia a dia, use o [______]. Para [______] e desenvolvimento de software, use o [______]."',
    ["análises complexas", "DeepSeek R1", "escrita, resumo e brainstorming", "DeepSeek V3", "programação", "DeepSeek Coder"],
    ["análises complexas", "DeepSeek R1", "escrita, resumo e brainstorming", "DeepSeek V3", "programação", "DeepSeek Coder", "chat", "imagens"],
    "Cada modelo é uma ferramenta especializada para um fim diferente."
  ),
  textStep(
    "Erro 5 — Não Verificar as Informações Geradas",
    "O DeepSeek pode gerar informações incorretas com aparência de precisão — especialmente em dados factuais, datas, estatísticas e citações. Aceitar tudo sem verificação é um erro perigoso."
  ),
  fillStep(
    "Adote a verificação como hábito!",
    "Preencha a lacuna para estruturar um processo de revisão.",
    '"Sempre que o DeepSeek apresentar [______], [______] ou [______] específicas, trate como um [______] e verifique nas [______] originais antes de usar em [______], [______] ou qualquer documento importante."',
    ["dados numéricos", "datas", "citações", "ponto de partida", "fontes", "apresentações", "relatórios"],
    ["dados numéricos", "datas", "citações", "ponto de partida", "fontes", "apresentações", "relatórios", "site", "blog"],
    "Confie mas verifique. A IA é um copiloto, não o comandante final."
  ),
  textStep(
    "Erro 6 — Conversas Sem Contexto Acumulado",
    "Muitos usuários começam uma nova conversa para cada pergunta relacionada ao mesmo tema — perdendo o contexto acumulado que tornaria as respostas cada vez mais precisas."
  ),
  fillStep(
    "Mantenha o contexto na conversa!",
    "Preencha a lacuna para dar continuidade a um projeto.",
    '"Continuando nossa conversa sobre [______]: com base em tudo que já [______] até aqui, especialmente [______], agora preciso aprofundar o ponto sobre [______]. Considere tudo que já foi [______] antes de responder."',
    ["estratégia de lançamento", "discutimos", "as decisões anteriores", "o canal de aquisição", "definido"],
    ["estratégia de lançamento", "discutimos", "as decisões anteriores", "o canal de aquisição", "definido", "novo", "ideia", "tema"],
    "O histórico da conversa é a 'personalidade' e o 'conhecimento' que você constrói com a IA."
  ),
  textStep(
    "Erro 7 — Pedir Tudo de Uma Vez em um Único Prompt",
    "Colocar múltiplas tarefas complexas em um único prompt gigante resulta em respostas superficiais. A IA tenta cobrir tudo rápido sem a profundidade necessária."
  ),
  fillStep(
    "Divida para conquistar!",
    "Preencha a lacuna para estruturar um trabalho em etapas.",
    '"Vamos trabalhar em [______] etapas separadas. Começando pela mais [______]: crie uma [______] detalhada para meu negócio de [______] considerando que meu orçamento é [______] e meu público é [______]."',
    ["4", "urgente e estratégica", "análise de concorrência", "consultoria", "limitado", "profissionais em transição"],
    ["4", "urgente e estratégica", "análise de concorrência", "consultoria", "limitado", "profissionais em transição", "2", "grande", "jovens"],
    "Passo a passo gera qualidade. Tudo de uma vez gera mediocridade."
  ),
  textStep(
    "Erro 8 — Ignorar o Raciocínio Visível do R1",
    "O raciocínio passo a passo (Chain of Thought) do R1 revela como o modelo chegou à conclusão. Ignorar isso é perder a chance de validar a lógica por trás da resposta."
  ),
  fillStep(
    "Use o raciocínio a seu favor!",
    "Preencha a lacuna para pedir transparência lógica.",
    '"Antes de apresentar a conclusão, [______] todo o seu raciocínio [______]. Quero ver as [______] consideradas, as [______] descartadas e o motivo de cada [______] tomada."',
    ["mostre", "passo a passo", "variáveis", "hipóteses", "decisão"],
    ["mostre", "passo a passo", "variáveis", "hipóteses", "decisão", "oculte", "final", "erro"],
    "O 'como' a IA pensa é muitas vezes mais valioso do que o 'o que' ela responde."
  ),
  textStep(
    "Erro 9 — Usar o DeepSeek como Oráculo de Decisões Finais",
    "O DeepSeek mapeia opções e riscos, mas a decisão deve ser sempre sua. Delegar decisões críticas inteiramente à IA sem filtro humano é perigoso."
  ),
  quizStep(
    "Papel Decisório",
    "Qual é o papel correto do DeepSeek no processo de tomada de decisão?",
    [
      "Tomar a decisão final com base nos dados disponíveis",
      "Organizar informações, identificar variáveis e apresentar perspectivas que enriquecem o julgamento humano — sem substituí-lo",
      "Confirmar a decisão que você já quer tomar",
      "O DeepSeek não deve ser usado para nenhum tipo de decisão profissional"
    ],
    1,
    "Use a IA para expandir sua visão, não para fechar seus olhos."
  ),
  textStep(
    "Erro 10 — Não Testar o Mesmo Prompt em Modelos Diferentes",
    "Modelos diferentes (Claude, Gemini, GPT) têm 'personalidades' e forças diferentes. Ficar preso a um só é limitar sua visão."
  ),
  textStep(
    "Sumário dos Erros",
    "Superar esses 10 erros é o que separa o amador do profissional na era da IA generativa."
  ),
  textStep(
    "Conclusão",
    "O DeepSeek é poderoso, mas o poder só se manifesta quando você sabe exatamente como não desperdiçá-lo. Prompts com contexto, refinamento iterativo, proteção de dados e escolha do modelo certo são a chave.\n\nEvite os erros. Domine a ferramenta. Colha os resultados.\n\nLição concluída ✓"
  ),
];

export const DEEPSEEK_MODULE_5_STEPS_EN = [
  textStep(
    "Common Mistakes When Using DeepSeek",
    "Welcome back! In this lesson, you will learn to identify and avoid the most common mistakes that cause DeepSeek users to get mediocre results — even with a powerful tool in their hands. Knowing the mistakes is the first step to overcoming them."
  ),
  textStep(
    "Why Knowing Mistakes Is Critical",
    "Many users blame the tool when results are poor. Most of the time, the problem isn't DeepSeek — it's how it's being used. Identifying common mistakes turns an average user into a strategic one."
  ),
  textStep(
    "Mistake 1 — Vague Prompts and No Context",
    "The most common and impactful mistake. Users ask generic questions and get frustrated with generic answers — without realizing that prompt vagueness is the direct cause of the poor result."
  ),
  fillStep(
    "Identify the problematic prompt!",
    "Fill in the gap to turn a vague prompt into a powerful one.",
    'Error prompt: "Help me with my business." Correct prompt: "I own a [______] with [______] employees and monthly revenue of [______]. My biggest current challenge is [______]. Help me create an action plan with [______] concrete steps to solve this in the next [______] days."',
    ["women's clothing store", "3", "$25k", "converting visitors into buyers", "5", "30"],
    ["women's clothing store", "3", "$25k", "converting visitors into buyers", "5", "30", "company", "sales", "months"],
    "Context is the raw material AI uses to be precise."
  ),
  textStep(
    "Mistake 2 — Accepting the First Result Without Refining",
    "The second most common mistake is treating the first response as final. DeepSeek was built for iteration — each refinement significantly improves the quality of the result."
  ),
  fillStep(
    "Refine instead of accepting!",
    "Fill in the gap to request a strategic refinement.",
    '"The previous response is on the right track, but I need adjustments: [______] the second part with more [______], change the tone to more [______], add practical [______], and eliminate the [______] parts for my context."',
    ["elaborate on", "data and evidence", "direct and assertive", "examples", "generic"],
    ["elaborate on", "data and evidence", "direct and assertive", "examples", "generic", "summarize", "long", "vague"],
    "Iteration turns a draft into a masterpiece."
  ),
  textStep(
    "Mistake 3 — Sharing Sensitive and Confidential Data",
    "A critical mistake many make without realizing it. Being a Chinese model, DeepSeek is subject to China's data laws — making sensitive data sharing a real risk."
  ),
  fillStep(
    "Identify what NOT to share!",
    "Fill in the gap to ensure your data security.",
    '"Before using DeepSeek for any task, check if the content contains: [______] of clients, confidential [______], strategic [______] property, or commercial [______]. If so, [______] or [______] before sharing."',
    ["personal data", "financial information", "intellectual", "secrets", "anonymize the data", "use another assistant"],
    ["personal data", "financial information", "intellectual", "secrets", "anonymize the data", "use another assistant", "names", "values"],
    "Privacy and security must come before productivity."
  ),
  textStep(
    "Mistake 4 — Using the Wrong Model for the Task",
    "DeepSeek has different versions for different tasks. Using the generic model for deep reasoning — or vice versa — results in sub-par answers."
  ),
  fillStep(
    "Choose the right model!",
    "Fill in the gap to associate the task with the ideal model.",
    '"For [______] and problems requiring deep logic, use [______]. For [______] and everyday general use, use [______]. For [______] and software development, use [______]."',
    ["complex analysis", "DeepSeek R1", "writing and brainstorming", "DeepSeek V3", "programming", "DeepSeek Coder"],
    ["complex analysis", "DeepSeek R1", "writing and brainstorming", "DeepSeek V3", "programming", "DeepSeek Coder", "chat", "images"],
    "Each model is a specialized tool for a different purpose."
  ),
  textStep(
    "Mistake 5 — Not Verifying Generated Information",
    "DeepSeek can generate incorrect information with an appearance of accuracy — especially in facts, dates, stats, and citations. Accepting without verification is a dangerous mistake."
  ),
  fillStep(
    "Make verification a habit!",
    "Fill in the gap to structure a review process.",
    '"Whenever DeepSeek presents specific [______], [______], or [______], treat it as a [______] and check [______] before using in [______], [______], or any important document."',
    ["numerical data", "dates", "citations", "starting point", "original sources", "presentations", "reports"],
    ["numerical data", "dates", "citations", "starting point", "original sources", "presentations", "reports", "site", "blog"],
    "Trust but verify. AI is a co-pilot, not the final commander."
  ),
  textStep(
    "Mistake 6 — Conversations Without Accumulated Context",
    "Many users start a new conversation for every question related to the same topic — losing accumulated context that makes responses more accurate."
  ),
  fillStep(
    "Keep context in the conversation!",
    "Fill in the gap to continue a project.",
    '"Continuing our conversation about the [______]: based on what we already [______], especially [______], now I need to dive into [______]. Consider everything [______] before responding."',
    ["launch strategy", "discussed", "previous decisions", "acquisition channels", "defined"],
    ["launch strategy", "discussed", "previous decisions", "acquisition channels", "defined", "new", "idea", "topic"],
    "Conversation history is the 'personality' and 'knowledge' you build with AI."
  ),
  textStep(
    "Mistake 7 — Asking for Everything at Once in a Single Prompt",
    "Putting multiple complex tasks in one giant prompt results in superficial responses. AI tries to cover everything fast without needed depth."
  ),
  fillStep(
    "Divide and conquer!",
    "Fill in the gap to structure work in stages.",
    '"Let\'s work in [______] separate stages. Starting with the most [______]: create a detailed [______] for my [______] business considering my budget is [______] and my audience is [______]."',
    ["4", "urgent and strategic", "competitor analysis", "consulting", "limited", "career transition professionals"],
    ["4", "urgent and strategic", "competitor analysis", "consulting", "limited", "career transition professionals", "2", "large", "youth"],
    "Step-by-step generates quality. All at once generates mediocrity."
  ),
  textStep(
    "Mistake 8 — Ignoring the Visible Reasoning of R1",
    "R1's step-by-step reasoning (Chain of Thought) reveals how the model reached the conclusion. Ignoring this is missing a chance to validate the logic."
  ),
  fillStep(
    "Use reasoning to your advantage!",
    "Fill in the gap to request logical transparency.",
    '"Before presenting the conclusion, [______] your entire [______] reasoning. I want to see the [______] considered, the [______] discarded, and the reason for each [______] made."',
    ["show", "step-by-step", "variables", "hypotheses", "decision"],
    ["show", "step-by-step", "variables", "hypotheses", "decision", "hide", "final", "error"],
    "The 'how' AI thinks is often more valuable than 'what' it answers."
  ),
  textStep(
    "Mistake 9 — Using DeepSeek as a Final Decision Oracle",
    "DeepSeek maps options and risks, but the decision must always be yours. Delegating critical decisions entirely to AI is dangerous."
  ),
  quizStep(
    "Decision Role",
    "What is DeepSeek's correct role in the decision-making process?",
    [
      "Take the final decision based on available data",
      "Organize information, identify variables, and present perspectives that enrich human judgment — without replacing it",
      "Confirm the decision you already want to make",
      "DeepSeek should not be used for any type of professional decision"
    ],
    1,
    "Use AI to expand your vision, not to close your eyes."
  ),
  textStep(
    "Mistake 10 — Not Testing the Same Prompt in Different Models",
    "Different models (Claude, Gemini, GPT) have different 'personalities' and strengths. Getting stuck with one limits your vision."
  ),
  textStep(
    "Summary of Mistakes",
    "Overcoming these 10 mistakes separates the amateur from the professional in the generative AI era."
  ),
  textStep(
    "Conclusion",
    "DeepSeek is powerful, but power only manifests when you know exactly how not to waste it. Prompts with context, iterative refinement, data protection, and choosing the right model are key.\n\nAvoid the mistakes. Master the tool. Reap the results.\n\nLesson completed ✓"
  ),
];

export const DEEPSEEK_MODULE_5_STEPS_ES = [
  textStep(
    "Errores Más Comunes al Usar DeepSeek",
    "¡Bienvenido de nuevo! En esta lección, aprenderás a identificar y evitar los errores más comunes que hacen que los usuarios de DeepSeek obtengan resultados mediocres, incluso con una herramienta poderosa en sus manos. Conocer los errores es el primer paso para superarlos."
  ),
  textStep(
    "Por qué Conocer los Errores es Crítico",
    "Muchos usuarios culpan a la herramienta cuando los resultados son malos. La mayoría de las veces, el problema no es DeepSeek, sino cómo se está utilizando. Identificar los errores comunes convierte a un usuario promedio en uno estratégico."
  ),
  textStep(
    "Error 1 — Prompts Vagos y Sin Contexto",
    "El error más común e impactante. Los usuarios hacen preguntas genéricas y se frustran con respuestas genéricas, sin darse cuenta de que la vaguedad del prompt es la causa directa del mal resultado."
  ),
  fillStep(
    "¡Identifica el prompt problemático!",
    "Rellena el espacio para convertir un prompt vago en uno poderoso.",
    'Prompt con error: "Ayúdame con mi negocio." Prompt correcto: "Soy dueño de una [______] con [______] empleados y una facturación mensual de [______]. Mi mayor desafío actual es [______]. Ayúdame a crear un plan de acción con [______] pasos concretos para resolver esto en los próximos [______] días."',
    ["tienda de ropa femenina", "3", "$25k", "convertir visitantes en compradores", "5", "30"],
    ["tienda de ropa femenina", "3", "$25k", "convertir visitantes en compradores", "5", "30", "empresa", "ventas", "meses"],
    "El contexto es la materia prima que la IA usa para ser precisa."
  ),
  textStep(
    "Error 2 — Aceptar el Primer Resultado sin Refinar",
    "El segundo error más común es tratar la primera respuesta como final. DeepSeek fue construido para la iteración: cada refinamiento mejora significativamente la calidad del resultado."
  ),
  fillStep(
    "¡Refina en lugar de aceptar!",
    "Rellena el espacio para solicitar un refinamiento estratégico.",
    '"La respuesta anterior va por buen camino, pero necesito ajustes: [______] la segunda parte con más [______], cambia el tono a uno más [______], añade [______] prácticos y elimina las partes que sean demasiado [______] para mi contexto."',
    ["profundiza en", "datos y evidencias", "directo y asertivo", "ejemplos", "genéricas"],
    ["profundiza en", "datos y evidencias", "directo y asertivo", "ejemplos", "genéricas", "resume", "largas", "vagas"],
    "La iteración convierte un borrador en una obra maestra."
  ),
  textStep(
    "Error 3 — Compartir Datos Sensibles y Confidenciales",
    "Un error crítico que muchos cometen sin darse cuenta. Al ser un modelo chino, DeepSeek está sujeto a las leyes de datos de China, lo que hace que compartir datos sensibles sea un riesgo real."
  ),
  fillStep(
    "¡Identifica qué NO compartir!",
    "Rellena el espacio para garantizar la seguridad de tus datos.",
    '"Antes de usar DeepSeek para cualquier tarea, verifica si el contenido contiene: [______] de clientes, [______] financiera confidencial, [______] intelectual estratégica o [______] comerciales. Si es así, [______] o [______] antes de compartir."',
    ["datos personales", "información", "propiedad", "secretos", "anonimiza los datos", "usa otro asistente"],
    ["datos personales", "información", "propiedad", "secretos", "anonimiza los datos", "usa outro assistente", "nombres", "valores"],
    "La privacidad y la seguridad deben ir antes que la productividad."
  ),
  textStep(
    "Error 4 — Usar el Modelo Equivocado para la Tarea",
    "DeepSeek tiene diferentes versiones para diferentes tareas. Usar el modelo genérico para razonamiento profundo, o viceversa, resulta en respuestas deficientes."
  ),
  fillStep(
    "¡Elige el modelo correcto!",
    "Rellena el espacio para asociar la tarea con el modelo ideal.",
    '"Para [______] y problemas que requieren lógica profunda, usa [______]. Para [______] y uso general diario, usa [______]. Para [______] y desarrollo de software, usa [______]."',
    ["análisis complejos", "DeepSeek R1", "escritura y lluvia de ideas", "DeepSeek V3", "programación", "DeepSeek Coder"],
    ["análisis complejos", "DeepSeek R1", "escritura y lluvia de ideas", "DeepSeek V3", "programación", "DeepSeek Coder", "chat", "imágenes"],
    "Cada modelo es una herramienta especializada para un propósito diferente."
  ),
  textStep(
    "Error 5 — No Verificar la Información Generada",
    "DeepSeek puede generar información incorrecta con apariencia de precisión, especialmente en hechos, fechas, estadísticas y citas. Aceptar sin verificar es un error peligroso."
  ),
  fillStep(
    "¡Haz de la verificación un hábito!",
    "Rellena el espacio para estructurar un proceso de revisión.",
    '"Siempre que DeepSeek presente [______], [______] o [______] específicos, trátalo como un [______] y verifica en las [______] originales antes de usarlo en [______], [______] o cualquier documento importante."',
    ["datos numéricos", "fechas", "citas", "punto de partida", "fuentes", "presentaciones", "informes"],
    ["datos numéricos", "fechas", "citas", "punto de partida", "fuentes", "presentaciones", "informes", "sitio web", "blog"],
    "Confía pero verifica. La IA es un copiloto, no el comandante final."
  ),
  textStep(
    "Error 6 — Conversaciones Sin Contexto Acumulado",
    "Muchos usuarios comienzan una nueva conversación para cada pregunta relacionada con el mismo tema, perdiendo el contexto acumulado que hace que las respuestas sean más precisas."
  ),
  fillStep(
    "¡Mantén el contexto en la conversación!",
    "Rellena el espacio para continuar un proyecto.",
    '"Continuando nuestra conversación sobre la [______]: basándonos en lo que ya [______], especialmente [______], ahora necesito profundizar en [______]. Ten en cuenta todo lo [______] antes de responder."',
    ["estrategia de lanzamiento", "discutimos", "decisiones anteriores", "canales de adquisición", "definido"],
    ["estrategia de lanzamiento", "discutimos", "decisiones anteriores", "canales de adquisición", "definido", "nueva", "idea", "tema"],
    "El historial de conversación es la 'personalidad' y el 'conocimiento' que construyes con la IA."
  ),
  textStep(
    "Error 7 — Pedir Todo a la Vez en un Solo Prompt",
    "Poner múltiples tareas complejas en un solo prompt gigante resulta en respuestas superficiales. La IA intenta cubrirlo todo rápido sin la profundidad necesaria."
  ),
  fillStep(
    "¡Divide y vencerás!",
    "Rellena el espacio para estructurar el trabajo en etapas.",
    '"Vamos a trabajar en [______] etapas separadas. Comenzando por la más [______]: crea un [______] detallado para mi negocio de [______] considerando que mi presupuesto es [______] y mi audiencia es [______]."',
    ["4", "urgente y estratégica", "análisis de competencia", "consultoría", "limitado", "profesionales en transición de carrera"],
    ["4", "urgente y estratégica", "análisis de competencia", "consultoría", "limitado", "profesionales en transición de carrera", "2", "grande", "jóvenes"],
    "El paso a paso genera calidad. Todo a la vez genera mediocridad."
  ),
  textStep(
    "Error 8 — Ignorar el Razonamiento Visible de R1",
    "El razonamiento paso a paso (Chain of Thought) de R1 revela cómo el modelo llegó a la conclusión. Ignorar esto es perder una oportunidad de validar la lógica."
  ),
  fillStep(
    "¡Usa el razonamiento a tu favor!",
    "Rellena el espacio para solicitar transparencia lógica.",
    '"Antes de presentar la conclusión, [______] todo tu razonamiento [______]. Quiero ver las [______] consideradas, las [______] descartadas y el motivo de cada [______] tomada."',
    ["muestra", "paso a paso", "variables", "hipótesis", "decisión"],
    ["muestra", "paso a paso", "variables", "hipótesis", "decisión", "oculta", "final", "error"],
    "El 'cómo' piensa la IA es a menudo más valioso que 'qué' responde."
  ),
  textStep(
    "Error 9 — Usar DeepSeek como Oráculo de Decisiones Finales",
    "DeepSeek mapea opciones y riesgos, pero la decisión debe ser siempre tuya. Delegar decisiones críticas enteramente a la IA es peligroso."
  ),
  quizStep(
    "Papel Decisorio",
    "¿Cuál es el papel correcto de DeepSeek en el proceso de toma de decisiones?",
    [
      "Tomar la decisión final basándose en los datos disponibles",
      "Organizar información, identificar variables y presentar perspectivas que enriquezcan el juicio humano, sin reemplazarlo",
      "Confirmar la decisión que ya quieres tomar",
      "DeepSeek no debe usarse para ningún tipo de decisión profesional"
    ],
    1,
    "Usa la IA para ampliar tu visión, no para cerrar tus ojos."
  ),
  textStep(
    "Error 10 — No Probar el Mismo Prompt en Diferentes Modelos",
    "Diferentes modelos (Claude, Gemini, GPT) tienen diferentes 'personalidades' y fortalezas. Quedarse estancado con uno limita tu visión."
  ),
  textStep(
    "Sumário de Errores",
    "Superar estos 10 errores separa al aficionado del profesional en la era de la IA generativa."
  ),
  textStep(
    "Conclusión",
    "DeepSeek es poderoso, pero el poder solo se manifiesta cuando sabes exactamente cómo no desperdiciarlo. Los prompts con contexto, el refinamiento iterativo, la protección de datos y la elección del modelo correcto son clave.\n\nEvita los errores. Domina la herramienta. Cosecha los resultados.\n\nLección completada ✓"
  ),
];

export const DEEPSEEK_MODULE_5_STEPS_FR = [
  textStep(
    "Erreurs les Plus Courantes lors de l'Utilisation de DeepSeek",
    "Bienvenue à nouveau ! Dans cette leçon, vous apprendrez à identifier et à éviter les erreurs les plus courantes qui font que les utilisateurs de DeepSeek obtiennent des résultats médiocres — même avec un outil puissant entre les mains. Connaître les erreurs est la première étape pour les surmonter."
  ),
  textStep(
    "Pourquoi Connaître les Erreurs est Crucial",
    "Beaucoup d'utilisateurs blâment l'outil lorsque les résultats sont mauvais. La plupart du temps, le problème ne vient pas de DeepSeek — il vient de la façon dont il est utilisé. Identifier les erreurs courantes transforme un utilisateur moyen en un utilisateur stratégique."
  ),
  textStep(
    "Erreur 1 — Prompts Vagues et Sans Contexte",
    "L'erreur la plus courante et la plus impactante. Les utilisateurs posent des questions génériques et sont frustrés par des réponses génériques — sans se rendre compte que le flou du prompt est la cause directe du mauvais résultat."
  ),
  fillStep(
    "Identifiez le prompt problématique !",
    "Remplissez l'espace pour transformer un prompt vague en un prompt puissant.",
    'Prompt avec erreur : "Aidez-moi avec mon business." Prompt correct : "Je suis propriétaire d\'une [______] avec [______] employés e um faturamento mensal de [______]. Mon plus grand défi actuel est [______]. Aidez-moi à créer un plan d\'action avec [______] étapes concrètes pour résoudre cela dans les [______] prochains jours."',
    ["boutique de vêtements", "3", "25k€", "convertir les visiteurs en acheteurs", "5", "30"],
    ["boutique de vêtements", "3", "25k€", "convertir les visiteurs en acheteurs", "5", "30", "entreprise", "ventas", "mois"],
    "Le contexte est la matière première que l'IA utilise pour être précise."
  ),
  textStep(
    "Erreur 2 — Accepter le Premier Résultat sans Affiner",
    "La deuxième erreur la plus courante consiste à traiter la première réponse comme la réponse finale. DeepSeek a été conçu pour l'itération — chaque affinement améliore considérablement la qualité du résultat."
  ),
  fillStep(
    "Affinez au lieu d'accepter !",
    "Remplissez l'espace pour demander un affinement stratégique.",
    '"La réponse précédente est sur la bonne voie, mais j\'ai besoin d\'ajustements : [______] la deuxième partie avec plus de [______], changez le ton pour quelque chose de plus [______], ajoutez des [______] pratiques et éliminez les passages trop [______] pour mon contexte."',
    ["approfondissez", "données et preuves", "direct et assertif", "exemples", "génériques"],
    ["approfondissez", "données et preuves", "direct et assertif", "exemples", "génériques", "résumez", "longs", "vagues"],
    "L'itération transforme un brouillon en un chef-d'œuvre."
  ),
  textStep(
    "Erreur 3 — Partager des Données Sensibles et Confidentielles",
    "Une erreur critique que beaucoup commettent sans s'en rendre compte. En tant que modèle d'origine chinoise, DeepSeek est soumis aux lois chinoises sur les données — ce que faz do partage d'informations sensibles un risque réel."
  ),
  fillStep(
    "Identifiez ce qu'il ne faut PAS partager !",
    "Remplissez l'espace pour garantir a segurança dos seus dados.",
    '"Avant d\'utiliser DeepSeek pour toute tâche, vérifiez si le contenu contient : des [______] clients, des [______] financières confidentielles, de la [______] intellectuelle stratégique ou des [______] commerciaux. Si oui, [______] ou [______] avant de partager."',
    ["données personnelles", "informations", "propriété", "secrets", "anonymisez les données", "utilisez un outro assistant"],
    ["données personnelles", "informations", "propriété", "secrets", "anonymisez les données", "utilisez un outro assistant", "noms", "valeurs"],
    "La confidentialité et la sécurité doivent passer avant la productividade."
  ),
  textStep(
    "Erreur 4 — Utiliser le Mauvais Modèle pour la Tâche",
    "DeepSeek propose différentes versions pour différents types de tâches. Utiliser le modèle générique pour une tâche exigeant um raciocínio profundo — ou l'inverse — entraîno des réponses en deçà du potentiel."
  ),
  fillStep(
    "Choisissez le bon modèle !",
    "Remplissez l'espace para associar a tarefa ao modelo ideal.",
    '"Pour les [______] et les problèmes exigeant une logique profonde, utilisez [______]. Pour les tâches de [______] et l\'usage quotidien général, utilisez [______]. Pour la [______] et le développement logiciel, utilisez [______]."',
    ["analyses complexes", "DeepSeek R1", "rédaction et brainstorming", "DeepSeek V3", "programmation", "DeepSeek Coder"],
    ["analyses complexes", "DeepSeek R1", "rédaction et brainstorming", "DeepSeek V3", "programmation", "DeepSeek Coder", "chat", "images"],
    "Chaque modèle est un outil spécialisé pour un but différent."
  ),
  textStep(
    "Erreur 5 — Ne pas Vérifier les Informations Générées",
    "DeepSeek peut générer des informações incorrectas com aparência de precisão — surtout sur des faits, des dates, des statistiques e des citações. Tout accepter sans verificação est uma erreur dangereuse."
  ),
  fillStep(
    "Adote a verificação como habitude !",
    "Remplissez l'espace para estruturar um processo de revisão.",
    '"Chaque fois que DeepSeek présente des [______], des [______] ou des [______] spécifiques, traitez cela como um [______] e vérifiez nas [______] originais avant de l\'utiliser dans des [______], des [______] ou tout document important."',
    ["données numériques", "dates", "citations", "point de départ", "sources", "présentations", "rapports"],
    ["données numériques", "dates", "citations", "point de départ", "sources", "présentations", "rapports", "site", "blog"],
    "Faites confiance mais vérifiez. L'IA est um copiloto, pas le comandante final."
  ),
  textStep(
    "Erreur 6 — Conversations sans Contexte Accumulé",
    "Beaucoup d'utilisateurs começam uma nova conversa para cada pergunta liée ao mesmo thème — perdant assim o contexto acumulado que rendrait os respostas mais précises."
  ),
  fillStep(
    "Gardez le contexto na conversa !",
    "Remplissez l'espace para dar de continuidade a um projeto.",
    '"Pour poursuivre notre conversation sur la [______] : en me basant sur ce que nous avons déjà [______], en particulier les [______], j\'ai maintenant besoin d\'approfondir le point sur [______]. Tenez compte de tout ce qui a été [______] avant de répondre."',
    ["stratégie de lançamento", "discuté", "décisions précédentes", "le canal d'acquisition", "défini"],
    ["stratégie de lançamento", "discuté", "décisions précédentes", "le canal d'acquisition", "défini", "nouvelle", "idée", "sujet"],
    "L'historique de la conversa est a 'personalidade' e o 'conhecimento' que vous construisez avec l'IA."
  ),
  textStep(
    "Erreur 7 — Tout Demander d'un Coup dans um Seul Prompt",
    "Placer plusieurs tâches complexes dans um seul prompt géant entraîno des respostas superficiais. L'IA essaie de tudo cobrir rapidamente sans a profundidade necessária."
  ),
  fillStep(
    "Diviser pour régner !",
    "Remplissez l'espace para estruturar um trabalho por étapes.",
    '"Travaillons en [______] étapes distinctes. En commençant par la plus [______] : créez une [______] détaillée pour mon atividade de [______] sachant que mon orçamento est [______] e mon público est [______]."',
    ["4", "urgente e stratégique", "analyse de concurrence", "conseil", "limité", "professionnels en transition"],
    ["4", "urgente e estratégica", "análise de concorrência", "consultoria", "limitado", "profissionais em transição", "2", "grande", "jeunes"],
    "Le etapa par etapa génère de la qualidade. Tout d'un coup génère de la mediocridade."
  ),
  textStep(
    "Erreur 8 — Ignorer o raciocínio visível do R1",
    "Le raisonnement etapa par etapa (Chain of Thought) du R1 révèle como o modelo est arrivé à la conclusão. Ignorer cela, c'est perdre uma chance de validar a lógica."
  ),
  fillStep(
    "Utilize o raciocínio a seu favor !",
    "Remplissez l'espace para pedir transparência lógica.",
    '"Avant de présenter la conclusion, [______] tout votre raisonnement [______]. Je veux voir les [______] consideradas, as [______] descartadas e o motivo de cada [______] tomada."',
    ["montrez", "étape par étape", "variables", "hypothèses", "décision"],
    ["montrez", "étape par étape", "variables", "hypothèses", "décision", "cachez", "final", "erro"],
    "Le 'comment' l'IA pense est souvent plus précieux que le 'ce qu'elle' répond."
  ),
  textStep(
    "Erreur 9 — Utiliser DeepSeek como Oracle de Décisions Finales",
    "DeepSeek cartographie les options et les risques, mas a decisão deve ser sempre sua. Delegar decisões críticas inteiramente à IA est perigoso."
  ),
  quizStep(
    "Rôle Décisionnel",
    "Quel est le rôle correct de DeepSeek dans le processus de prise de décision ?",
    [
      "Prendre la décision finale sur la base des données disponibles",
      "Organiser les informations, identifier les variables et présenter des perspectives qui enrichissent le jugement humain — sans le remplacer",
      "Confirmer la décision que vous voulez déjà prendre",
      "DeepSeek ne doit être utilisé pour aucun type de décision professionnelle"
    ],
    1,
    "Utilisez l'IA pour élargir votre vision, pas pour fermer les yeux."
  ),
  textStep(
    "Erreur 10 — Ne pas Tester le Mesmo Prompt sur Différents Modèles",
    "Différents modèles (Claude, Gemini, GPT) têm 'personalidades' e forças diferentes. Rester bloqué sur um seul, c'est limitar a sua visão."
  ),
  textStep(
    "Résumé des Erreurs",
    "Surmonter ces 10 erreurs sépare l'amateur du professionnel à l'ère de l'IA générative."
  ),
  textStep(
    "Conclusion",
    "DeepSeek est puissant, mais cette puissance ne se manifeste que lorsque vous savez exatamente como não a gaspiller. Les prompts avec contexto, l'affinement itératif, a proteção das dados e a escolha do modelo certo são as clés.\n\nÉvitez les erreurs. Maîtrisez l'outil. Récoltez les résultats.\n\nLeçon terminée ✓"
  ),
];
