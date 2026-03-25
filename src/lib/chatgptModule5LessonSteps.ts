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

export const CHATGPT_MODULE_5_STEPS_PT = [
  textStep(
    "ChatGPT para Marketing nas Redes Sociais",
    "Bem-vindo de volta! As possibilidades da IA para marketing são quase ilimitadas. Nesta lição, você vai usar o ChatGPT para criar posts envolventes, desenvolver estratégias de conteúdo, escrever legendas e analisar tendências — tudo com prompts bem construídos."
  ),
  textStep(
    "Bem-vindo à Equipe!",
    "Aqui é a Maya! Hoje você recebeu sua primeira tarefa na Viva Fit, uma marca de produtos para saúde e bem-estar. Eles querem aumentar o engajamento nas redes sociais e atrair novos clientes usando IA. Seu objetivo é criar prompts eficazes para produzir conteúdo relevante, criativo e alinhado à voz da marca.\n\nVamos começar!"
  ),
  textStep(
    "Gerando Ideias de Conteúdo",
    "O primeiro passo de qualquer estratégia de conteúdo é ter um banco de ideias diversificado — posts informativos, depoimentos, bastidores, datas comemorativas e destaques de produtos."
  ),
  fillStep(
    "Crie seu prompt de ideias!",
    "Preencha a lacuna para criar seu prompt gerador de ideias.",
    '"Você é um estrategista de conteúdo especializado em ___. Gere ___ ideias de posts para o Instagram da Viva Fit, uma marca de ___. Varie os formatos: dica rápida, depoimento, bastidor, dado curioso e destaque de produto."',
    ["redes sociais para marcas de saúde", "10", "produtos para saúde e bem-estar"],
    ["redes sociais para marcas de saúde", "10", "produtos para saúde e bem-estar", "roupas", "5", "comédia e humor"],
    "Você inseriu papéis, quantidade e contexto perfeito sobre a marca."
  ),
  quizStep(
    "Próximo Passo",
    "O que você deve fazer após gerar as ideias de posts?",
    [
      "Fazer uma pausa e voltar mais tarde",
      "Publicar conteúdo aleatório sem um plano",
      "Ignorar as ideias e começar de novo",
      "Selecionar as melhores ideias e pedir ao ChatGPT textos específicos para cada uma"
    ],
    3,
    "Use a lista gerada como base para iterar o conteúdo um a um com a IA."
  ),
  textStep(
    "Criando Legendas para Posts",
    "Com as ideias em mãos, o próximo passo é escrever as legendas. Uma boa legenda tem gancho, corpo e CTA — e deve soar como a voz da marca, não como texto gerado por máquina."
  ),
  fillStep(
    "Crie sua legenda!",
    "Preencha a lacuna definindo elementos cruciais da legenda.",
    '"Escreva uma legenda para o Instagram sobre ___ para a Viva Fit. Tom: ___. Inclua um ___ na primeira linha para parar o scroll, um texto de até 3 linhas e uma ___ clara no final. Adicione 5 hashtags relevantes."',
    ["os benefícios de beber água com frequência", "animado e acessível", "gancho", "CTA"],
    ["os benefícios de beber água com frequência", "animado e acessível", "gancho", "CTA", "tédio", "piada sem graça"],
    "Delimitar o gancho inicial e a CTA (Call to Action) formata a legenda perfeitamente."
  ),
  quizStep(
    "Descrições de Produto Eficazes",
    "Após criar a legenda, você precisa adicionar a descrição de um produto ao post. Qual prompt é mais eficaz?",
    [
      '"Descreva o produto o máximo que puder"',
      '"O que você pode dizer sobre suplementos naturais?"',
      '"Escreva uma descrição de produto para nossa nova linha de suplementos naturais da Viva Fit, destacando os benefícios para a saúde, os ingredientes principais e por que ele se diferencia dos concorrentes. Tom: confiante e acolhedor"',
      '"Fale algo sobre nosso novo produto"'
    ],
    2,
    "Quanto mais detalhes como benefícios e contexto da marca, melhor."
  ),
  textStep(
    "Planejando Conteúdo para Datas Especiais",
    "Datas comemorativas são oportunidades de ouro para marcas. Um bom prompt para datas especiais precisa conectar a data com o posicionamento da marca de forma genuína."
  ),
  quizStep(
    "Campanha Sazonal",
    "Nova tarefa! A Viva Fit quer uma série de posts para o Dia Mundial da Saúde. Qual prompt você usaria?",
    [
      '"Me dê fatos sobre o Dia Mundial da Saúde"',
      '"Crie uma série de 5 posts para o Dia Mundial da Saúde para a Viva Fit, uma marca de saúde e bem-estar. Cada post deve ter um ângulo diferente: dado surpreendente, dica prática, motivação, produto e convite à comunidade. Tom: inspirador e próximo"',
      '"Escreva sobre saúde"',
      '"Sugira alguns posts sobre saúde para o dia 7 de abril"'
    ],
    1,
    "O agrupamento de posts em 'série', forçando múltiplos ângulos (dado, dica, motivação) é altamente estratégico."
  ),
  textStep(
    "Criando Roteiros para Stories e Reels",
    "Vídeos curtos são o formato de maior alcance orgânico hoje. O ChatGPT pode roteirizar stories e reels em segundos — desde que o prompt seja bem estruturado."
  ),
  fillStep(
    "Crie seu roteiro!",
    "Preencha a lacuna para estruturar Reels envolventes.",
    '"Crie um roteiro de Reels de ___ segundos para a Viva Fit sobre ___. Estrutura: gancho nos primeiros ___ segundos, desenvolvimento em 3 pontos rápidos e CTA final. Tom: ___ e direto."',
    ["30", "como criar um hábito saudável em 21 dias", "3", "motivacional"],
    ["30", "como criar um hábito saudável em 21 dias", "3", "motivacional", "600", "piada", "triste"],
    "Demarcar o tempo garante que o roteiro fique no tamanho apropriado do formato curto de vídeo."
  ),
  quizStep(
    "Estrutura Condicionada",
    "Por que especificar o tempo e a estrutura do roteiro no prompt melhora o resultado?",
    [
      "Não faz diferença especificar a estrutura",
      "Porque o modelo entrega um roteiro já adaptado ao formato do vídeo, sem precisar de ajustes manuais",
      "Para deixar o texto mais longo",
      "Porque o ChatGPT só funciona com prompts curtos"
    ],
    1,
    "Se você omitir o tempo, a IA pode entregar um texto de 5 páginas para um vídeo vertical."
  ),
  textStep(
    "Analisando Tendências com IA",
    "Além de criar conteúdo, o ChatGPT pode ajudar a identificar tendências do mercado e do comportamento do seu público — transformando dados em estratégia."
  ),
  fillStep(
    "Crie seu prompt de tendências!",
    "Injete as palavras-chave analíticas no prompt.",
    '"Analise as principais tendências de ___ para o mercado de ___ em ___. Para cada tendência, explique: o que é, por que está crescendo e como uma marca como a Viva Fit pode ___ para se posicionar."',
    ["conteúdo nas redes sociais", "saúde e bem-estar", "2025", "usá-la"],
    ["conteúdo nas redes sociais", "saúde e bem-estar", "2025", "usá-la", "carros antigos", "descartar"],
    "Este comando eleva seu papel de 'criador de conteúdo' para estrategista."
  ),
  textStep(
    "Criando uma Estratégia Completa de Conteúdo",
    "Com o ChatGPT, você pode montar uma estratégia de conteúdo para o mês inteiro em minutos — desde que o prompt contenha as informações certas."
  ),
  quizStep(
    "Calendário Mensal",
    "Qual prompt geraria a estratégia de conteúdo mais completa para a Viva Fit?",
    [
      '"Planeje o conteúdo da Viva Fit para maio com bastante criatividade"',
      '"Me dê ideias de conteúdo para saúde"',
      '"Crie um calendário de posts para o mês"',
      '"Você é um estrategista de marketing digital. Crie uma estratégia de conteúdo para o Instagram da Viva Fit para o mês de maio. Inclua: 4 pilares temáticos, frequência de postagem, mix de formatos (reels, carrossel, story, estático), 12 ideias de pauta e as 3 métricas principais para medir o sucesso"'
    ],
    3,
    "Definir pilares temáticos, frequência e mix de formatos é a base profissional de um Social Media."
  ),
  textStep(
    "Respondendo Comentários e Mensagens com IA",
    "Uma das tarefas mais repetitivas do social media é responder comentários e DMs. O ChatGPT pode criar templates de resposta que mantêm o tom da marca e economizam tempo."
  ),
  fillStep(
    "Crie seu template de resposta!",
    "Monte um comando para respostas automatizadas da Viva Fit.",
    '"Crie ___ templates de resposta para comentários no Instagram da Viva Fit. Inclua respostas para: elogio ao produto, dúvida sobre ___, reclamação de ___ e pedido de mais informações. Tom: ___, humano e próximo."',
    ["5", "ingredientes", "entrega", "acolhedor"],
    ["5", "ingredientes", "entrega", "acolhedor", "sarcástico", "50", "cor das embalagens"],
    "Automatizar SAC de forma humana resolve horas de trabalho diário na gestão da comunidade."
  ),
  textStep(
    "Conclusão",
    "Quer você esteja gerando ideias, escrevendo legendas, roteirizando reels, planejando estratégias ou respondendo sua comunidade — prompts claros e específicos melhoram significativamente a qualidade do seu conteúdo e a velocidade do seu trabalho.\n\nO diferencial não é só usar o ChatGPT. É saber exatamente o que pedir para ele.\n\nLição concluída ✓"
  )
];

export const CHATGPT_MODULE_5_STEPS_EN = [
  textStep(
    "ChatGPT for Social Media Marketing",
    "Welcome back! AI possibilities for marketing are almost limitless. In this lesson, you will use ChatGPT to create engaging posts, develop content strategies, write captions, and analyze trends—all using well-constructed prompts."
  ),
  textStep(
    "Welcome to the Team!",
    "Maya here! Today you received your first assignment at Viva Fit, a health and wellness product brand. They want to boost social media engagement and attract new customers using AI. Your goal is to craft effective prompts to yield relevant, creative content aligned with the brand's voice.\n\nLet's get started!"
  ),
  textStep(
    "Generating Content Ideas",
    "The first step of any content strategy is having a diverse ideation bank—educational posts, testimonials, behind-the-scenes, holidays, and product highlights."
  ),
  fillStep(
    "Create your ideation prompt!",
    "Fill the blanks to assemble a professional idea-generating prompt.",
    '"You are a content strategist specializing in ___. Generate ___ post ideas for Viva Fit\'s Instagram, a brand in ___. Mix formats: quick tips, testimonials, behind-the-scenes, fun facts, and product highlights."',
    ["social media for health brands", "10", "health and wellness products"],
    ["social media for health brands", "10", "health and wellness products", "comedy sketches", "5"],
    "You successfully detailed roles, quantity, and precise brand context."
  ),
  quizStep(
    "Next Steps",
    "What should you do after generating the batch of post ideas?",
    [
      "Ignore the ideas and restart entirely",
      "Randomly publish without any plan",
      "Take a break and come back much later",
      "Select the best ideas and prompt ChatGPT for the specific scripts/copies of each"
    ],
    3,
    "Use the broad list to iterate deeper on the selected winners, tasking the AI step-by-step."
  ),
  textStep(
    "Crafting Post Captions",
    "Ideas in hand, the next step is writing captions. A great caption hooks the reader, develops the body, and closes with a CTA—while sounding like the brand instead of a machine."
  ),
  fillStep(
    "Build your caption!",
    "Fill the gaps defining the crucial elements of the caption layout.",
    '"Write an Instagram caption about ___ for Viva Fit. Tone: ___. Include a ___ in the first line to stop the scroll, keep the body under 3 lines, and add a clear ___ at the end. Include 5 relevant hashtags."',
    ["the benefits of drinking water frequently", "upbeat and accessible", "hook", "CTA"],
    ["the benefits of drinking water frequently", "upbeat and accessible", "hook", "CTA", "boring joke", "long novel"],
    "Limiting text length and demanding hooks anchors the caption for social consumption."
  ),
  quizStep(
    "Effective Product Descriptions",
    "You now need to attach a product description to the post. Which prompt is the most effective?",
    [
      '"Write a product description for our new natural supplement line at Viva Fit, highlighting the health benefits, core ingredients, and what sets it apart from competitors. Tone: confident and welcoming"',
      '"What can you say about natural supplements?"',
      '"Say something about our new item"',
      '"Describe the product as much as possible"'
    ],
    0,
    "The more explicit the boundaries (benefits, ingredients, uniqueness), the richer the copy."
  ),
  textStep(
    "Planning Seasonal Content",
    "Special dates are golden opportunities for brands. A solid prompt for holidays needs to organically tie the date to the brand's core positioning."
  ),
  quizStep(
    "Seasonal Campaigning",
    "New task! Viva Fit wants a series for World Health Day. Which prompt hits the mark?",
    [
      '"Create a 5-post series for World Health Day for Viva Fit, a health and wellness brand. Each post needs a distinct angle: a surprising stat, a practical tip, motivation, a product push, and a community question. Tone: inspiring and close"',
      '"Suggest posts on health for April 7th"',
      '"Write about health"',
      '"Give me facts about World Health Day"'
    ],
    0,
    "Forcing multiple unique angles (stat, tip, push) provides a well-rounded and strategic marketing series."
  ),
  textStep(
    "Scripting Stories and Reels",
    "Short-form video dominates organic reach today. ChatGPT can script stories and reels in seconds—provided your prompt has rigid dimensions."
  ),
  fillStep(
    "Write your script!",
    "Fill the blanks to properly structure an engaging Reel.",
    '"Write a ___-second Reels script for Viva Fit about ___. Structure: hook in the first ___ seconds, develop across 3 rapid points, and end with a CTA. Tone: ___ and direct."',
    ["30", "how to build a healthy habit in 21 days", "3", "motivational"],
    ["30", "how to build a healthy habit in 21 days", "3", "motivational", "500", "depressing"],
    "Timing forces the script to remain dense, snappy, and optimized for vertical video."
  ),
  quizStep(
    "Conditioned Formatting",
    "Why does specifying the time constraint and structure improve the output drastically?",
    [
      "Because the model delivers a script already tailored to the video format length, skipping manual edits",
      "To purposefully make the output much longer",
      "It makes no real difference",
      "Because ChatGPT only accepts brief inputs"
    ],
    0,
    "Without constraints, the AI could deliver a 5-minute monologue that ruins a short-form video idea."
  ),
  textStep(
    "Analyzing Trends with AI",
    "Beyond generating content, ChatGPT can identify market trends and audience behavior, easily translating cold data into actionable strategy."
  ),
  fillStep(
    "Create your trend prompt!",
    "Inject the analytical keywords to shift roles.",
    '"Analyze the main trends in ___ for the ___ market in ___. For each trend, explain: what it is, why it is growing, and how a brand like Viva Fit can ___ to position itself correctly."',
    ["social media content", "health and wellness", "2025", "leverage it"],
    ["social media content", "health and wellness", "2025", "leverage it", "ancient cars", "ignore it"],
    "This query upgrades you from a mere 'content creator' to a digital strategist."
  ),
  textStep(
    "Drafting a Full Content Strategy",
    "You can sketch an entire monthly content strategy in absolute minutes—as long as the prompt requires professional pillars."
  ),
  quizStep(
    "Monthly Calendar",
    "Which prompt commands the most robust content strategy for Viva Fit?",
    [
      '"Plan Viva Fit content for May with lots of creativity"',
      '"You are a digital marketing strategist. Outline a content strategy for Viva Fit\'s Instagram for the month of May. Include: 4 thematic pillars, posting frequency, format mix (reels, carousel, static, stories), 12 topic ideas, and the 3 main metrics we should track for success"',
      '"Create a posting calendar for this month"',
      '"Give me health content ideas"'
    ],
    1,
    "Defining pillars, frequencies, and KPIs mimics the exact breakdown a real agency operates on."
  ),
  textStep(
    "Managing Comments and DMs",
    "A deeply repetitive part of social management is clearing inboxes. ChatGPT can whip up response templates that preserve brand voice while slicing hours of typing."
  ),
  fillStep(
    "Create your response template!",
    "Assemble a command for Community Management templates.",
    '"Create ___ response templates for Instagram comments for Viva Fit. Include replies for: product compliment, question about ___, complaint about ___, and requests for more info. Tone: ___, human, and close."',
    ["5", "ingredients", "shipping", "welcoming"],
    ["5", "ingredients", "shipping", "welcoming", "mean", "100"],
    "Automating support cleanly reduces massive friction in community management."
  ),
  textStep(
    "Conclusion",
    "Whether generating raw concepts, writing captions, scripting reels, planning monthly roadmaps, or engaging your community—sharp, surgical prompts elevate the final tier of your outputs.\n\nThe real edge isn't just having ChatGPT available. It is knowing precisely what and how to ask.\n\nLesson complete ✓"
  )
];

export const CHATGPT_MODULE_5_STEPS_ES = [
  textStep(
    "ChatGPT para Marketing en Redes Sociales",
    "¡Bienvenido de vuelta! Las posibilidades de la IA para marketing son prácticamente infinitas. En esta lección, emplearemos ChatGPT para tejer posts cautivadores, estrategias complejas, subtítulos, guiones e identificar tendencias emergentes."
  ),
  textStep(
    "¡Te Damos la Bienvenida al Equipo!",
    "¡Hola, soy Maya! Hoy has recibido tu primer gran encargo en Viva Fit, una pujante marca de bienestar y salud integral. Desean detonar el compromiso orgánico en redes y abrazar nuevos clientes empleando IA. Tu meta es idear prompts magistrales que destilen la auténtica voz de su marca.\n\n¡En marcha!"
  ),
  textStep(
    "Engendrando un Banco de Ideas",
    "La piedra angular de la trinchera digital es contar con un abanico rico de ideas preventivas: divulgación, testimonios crudos, días festivos y reseñas de producto."
  ),
  fillStep(
    "¡Estructura tu prompt de ideas!",
    "Rellena los vacíos para conformar el mandato ideológico perfecto.",
    '"Actúa como un estratega de contenidos experto en ___. Genera ___ ideas de publicaciones para el Instagram de Viva Fit, una marca de ___. Alterna formatos: consejo ágil, testimonio, detrás de cámaras, dato curioso y foco de producto."',
    ["redes sociales para marcas de salud", "10", "productos de salud integral y bienestar"],
    ["redes sociales para marcas de salud", "10", "productos de salud integral y bienestar", "comida rápida", "50"],
    "Esbozaste magistralmente el rol, envergadura temática y sector industrial demandado."
  ),
  quizStep(
    "Siguiente Movimiento",
    "Al tener la ráfaga de ideas frente a tu pantalla, ¿Cuál es la ruta óptima?",
    [
      "Desecharlas de golpe y cambiar de tema",
      "Exigir descansar la tarde entera",
      "Publicarlas ciegamente saltando lineamientos",
      "Filtrar las más sobresalientes y exigirle al bot textos minuciosos de cada vertiente"
    ],
    3,
    "La lista ancha inicial funciona como vitrina, tras escoger tus preferidas, profundizas la producción de cada una con la IA."
  ),
  textStep(
    "Pulido de Textos para Post (Captions)",
    "Con la materia bruta seleccionada, toca parir la literatura o leyenda del post. Una escritura demoledora lleva gancho, carnaza y una orden de llamada a la acción (CTA)."
  ),
  fillStep(
    "¡Arma tu Pie de Foto!",
    "Cubre las ausencias para limitar y pulir la escritura.",
    '"Escribe una leyenda para Instagram hablando sobre ___ para Viva Fit. Tono: ___. Incrusta un ___ potente en la primera línea que frene el scroll, restringe el texto a 3 líneas y finaliza con una ___ indudable. Agrega 5 hashtags relativos al gremio."',
    ["los beneficios de hidratarse continuamente", "vibrante y amistoso", "gancho magnético", "CTA (llamada de acción)"],
    ["los beneficios de hidratarse continuamente", "vibrante y amistoso", "gancho magnético", "CTA (llamada de acción)", "queja ruidosa", "poema antiguo"],
    "Forzar límites en longitud y acatar un gancho previenen textos robóticos ignorados."
  ),
  quizStep(
    "Reseñas de Producto Letales",
    "Llega el instante de colgar la descripción técnica de un suplemento de la marca, ¿Cuál instrucción rendirá mejores cuentas?",
    [
      '"Redacta la descripción para la flamante línea de suplementos orgánicos de Viva Fit; reluce las bondades vitales, el corazón de sus ingredientes y la ventaja fulminante sobre competidores. Tono seguro y cálido."',
      '"Habla un rato sobre el suplemento nuevo que sacamos"',
      '"¿Qué nociones recabas tú sobre salud natural?"',
      '"Extiéndete sin límite respecto a la nueva botella de pastillas"'
    ],
    0,
    "Otorgar cauces obligatorios (ingredientes, beneficios y ventajas competitivas) erradica la divagación vacía."
  ),
  textStep(
    "Agendas Conmemorativas",
    "Exprimir las fechas inalienables del calendario es primordial. Un mandato estelar asocia orgánicamente el hito del calendario al corazón de la marca."
  ),
  quizStep(
    "Estrategia Feriada",
    "¡Misión entrante! Viva Fit anhela una docena de cartuchos por el Día Mundial de la Salud. ¿Qué prompt los elabora mejor?",
    [
      '"Sugiéreme subidas para enmarcar el mes patrio"',
      '"Desarrolla filosofía médica"',
      '"Fabrícame una serie de 5 posteos del Día de la Salud para Viva Fit. Cada post debe acariciar una curva independiente: dato de shock, tip utilizable, inyección de motivación, producto y pregunta abierta. Tono: Inspiracional e íntimo."',
      '"Tírame algunos datos locos del Día de la Salud"'
    ],
    2,
    "Fragmentar temáticamente el tema principal brinda oxígeno a una campaña evitando estancarse en felicitar mecánicamente."
  ),
  textStep(
    "Guiones de Altura en Formato Corto",
    "Instagram Reels y TikTok gobiernan el flujo mediático. ChatGPT vomita guiones de oro para vídeo en fracciones de segundo si logras restringir su verborrea."
  ),
  fillStep(
    "¡Escribe la Pauta Audiovisual!",
    "Reemplaza los blancos para empaquetar un libreto corto avasallador.",
    '"Confecciona un libreto para Reel de ___ segundos exclusivo para Viva Fit enfocado en ___. Patrón innegociable: ancla de seducción en los primeros ___ segundos, expansión en 3 actos y un cierre con CTA. Tono ___ e hiper directo."',
    ["30", "cómo solidificar una rutina en 21 días", "3", "altamente motivacional"],
    ["30", "cómo solidificar una rutina en 21 días", "3", "altamente motivacional", "600", "melancólico"],
    "Limitar severamente los tiempos impide que el bot se desboque escribiendo algo inabarcable en formato cámara web."
  ),
  quizStep(
    "Arquitectura Formateada",
    "¿Qué motivo central te obliga a imponer el minutaje riguroso en los guiones?",
    [
      "Para estirar innecesariamente el trabajo de lectura del cliente",
      "Garantizar que el modelo nos devuelva un manuscrito meticulosamente ceñido a las barreras del audiovisual ágil, evitando purgas manuales",
      "Ya que de por sí la IA censura líneas gigantescas",
      "Son manías vacías de forma"
    ],
    1,
    "Es vital, un video vertical carece de oxígeno para locuciones pesadas de documentalista. ChatGPT debe saberlo."
  ),
  textStep(
    "Rastreo de Tendencias Analíticas",
    "Aspirando datos fríos, ChatGPT funge como analista futurista. Provee el pulso social desenterrando viralidades ocultas o mapeando ecosistemas venideros."
  ),
  fillStep(
    "¡Escudriña el Futuro!",
    "Integra vocablos gerenciales para exprimir el hemisferio matemático.",
    '"Analiza las pulsaciones de tendencia en ___ concernientes al mercado de ___ para ___. Sobre cada fenómeno desgrana: origen de impacto, motor de crecimiento y cómo Viva Fit puede ___ para posicionarse exitosamente."',
    ["estrategia de redes sociales", "salud deportiva y bienestar", "2025", "utilizarla a su favor"],
    ["estrategia de redes sociales", "salud deportiva y bienestar", "2025", "utilizarla a su favor", "vehículos chatarras", "ignorar de golpe"],
    "Delinear la prospección otorga estrategias de agencias top."
  ),
  textStep(
    "Gestación de un Workflow Integral",
    "Exprimir al máximo la IA significa estructurar calendarios mensuales orgánicos con todos los engranajes en minutos."
  ),
  quizStep(
    "Arquitectura a Escala",
    "Para mapear la estrategia del mes, ¿Qué comando despliega la artillería completa?",
    [
      '"Sorpréndeme subiendo algo estacional en mayo"',
      '"Ejerce de estratega digital. Crea una estrategia de contenido en el Instagram de Viva Fit para mayo. Incluye: 4 pilares temáticos, frecuencia, mix de formatos (reels, muro, stories), 12 ideas de temas y las 3 métricas de éxito (KPI)."',
      '"Dibuja mi calendario de posteos para el mes"',
      '"Busca ideas sueltas de salud"'
    ],
    1,
    "Al instruir pilares, formatos y KPIs te alineas a la ingeniería de planificación industrial verdadera y no improvisada."
  ),
  textStep(
    "Autopilot de Interacciones y SAC",
    "Limpiar la avalancha de comentarios y mensajes es monótono. Una táctica genial comprende fabricar bibliotecas de templates y ahorrar horas de atención."
  ),
  fillStep(
    "¡Ensaya tus Comodines Comunitarios!",
    "Diseña la instrucción de respuestas prefabricadas.",
    '"Genera meticulosamente ___ templates de respuesta a comentarios en IG de Viva Fit. Que incluyan réplicas para: oda al producto, desconciertos concernientes a los ___, ira contenida sobre ___, y pedidos de datos extra. Registro: ___, íntimo y reconfortante."',
    ["5", "ingredientes orgánicos", "retrasos logísticos o entrega", "cálido y humano"],
    ["5", "ingredientes orgánicos", "retrasos logísticos o entrega", "cálido y humano", "burlesco", "100"],
    "Elaborar atención rápida pulcra mitiga confluencia pesada y mejora el status marcario frente al cliente ardido o leal."
  ),
  textStep(
    "Conclusión",
    "Idear asaltos publicitarios, estructurar leyendas, componer reels y planear interacciones descansan integralmente sobre la maestría con la que dirijas a tu procesador.\n\nLa verdadera diferencia no está en usar IA, sino en saber ser el estratega ordenando qué, cuándo y cómo pedir las ideas.\n\nLección superada ✓"
  )
];

export const CHATGPT_MODULE_5_STEPS_FR = [
  textStep(
    "ChatGPT et Marketing sur les Réseaux Sociaux",
    "Bon retour parmi nous ! La force de l'intelligence générative dans le domaine du marketing est monstrueuse. Cette session forgera votre habilité à édicter des devis algorithmiques pondérant stratégies, posts attractifs et textes pertinents."
  ),
  textStep(
    "Bienvenue dans l'Équipe !",
    "Ici Maya ! On vous assigne votre première tâche chez 'Viva Fit', une marque de produits santé et bien-être. Ils veulent pulvériser l'engagement communautaire via l'IA. Votre objectif est de créer des requêtes efficaces, créatives et alignées avec l'enseigne.\n\nÀ la manœuvre !"
  ),
  textStep(
    "Générer des Idées de Contenu",
    "Le premier pas d'une stratégie solide est d'avoir une arborescence d'idées large — informatifs, témoignages, coulisses, temps forts, et fiches produit."
  ),
  fillStep(
    "Structurez votre Prompte à Idées !",
    "Remplissez les variables d'un bon d'idées purificateur.",
    '"Tu es un stratège de contenu spécialisé en ___. Génère ___ idées de publications Instagram ciblant Viva Fit, enseigne focalisée sur ___. Varie les formats : astuce rapide, témoignages bruts, coulisses, faits surprenants et produit."',
    ["réseaux sociaux en sphère médicale et santé", "10", "la pleine forme et le bien-être organique"],
    ["réseaux sociaux en sphère médicale et santé", "10", "la pleine forme et le bien-être organique", "voitures de sport", "2"],
    "Les critères sectoriels et la quantité étouffent la monotonie."
  ),
  quizStep(
    "Suite Logique du Rendu",
    "Après avoir généré ces fameuses idées, quelle décision est magistrale ?",
    [
      "Balayer la console et tout jeter",
      "Épurer vigoureusement l'essaim pour ne sélectionner que les pointes de diamant et demander au bot le texte de chacune",
      "Fermer les onglets et reporter à un autre jour",
      "Actionner la publication intégrale automatique sans modifier"
    ],
    1,
    "La première liste IA sert d'écran radar. Ce n'est qu'après sélection féroce que vous attaquez l'écriture pointue par délégation."
  ),
  textStep(
    "Écriture de Légendes Textuelles (Captions)",
    "Avec vos idées, l'étape suivante est l'habillement fort d'une légende. On structure sans broncher le triptyque : l'appât (hook), le corps et l'appel à action (CTA)."
  ),
  fillStep(
    "Forgez la Tournure de la Légende",
    "Intégrez les limitations de gabarit à l'intelligence.",
    '"Écris une légende Instagram sur ___ au bénéfice de Viva Fit. Ton : ___. Place un ___ puissant à la première ligne pour stopper le défilement, un texte résumé à 3 lignes max, et un ___ clair à la fin. Ajoute 5 hashtags relatifs."',
    ["les bienfaits de s'hydrater régulièrement", "animé et ludique", "accroche ou hook", "Appel à l'Action (CTA)"],
    ["les bienfaits de s'hydrater régulièrement", "animé et ludique", "accroche ou hook", "Appel à l'Action (CTA)", "récit de 5 pages", "ennuyeux"],
    "Borner une légende évite que l'IA ne crache un bloc scolaire inapte à briller sur les réseaux."
  ),
  quizStep(
    "Radiographie de Produit Intelligente",
    "Après la légende, il faut ajouter le feu descriptif du produit. Quelle injonction est la plus efficace ?",
    [
      '"Mache-moi au maximum de textes ce que fait cela"',
      '"Parle de ce produit vaguement"',
      '"Quels sont des bons suppléments globaux ?"',
      '"Rédige la description produit de la nouvelle ligne de compléments naturels de Viva Fit. Souligne les bienfaits vitaux, les ingrédients clés, et sa différence concurrentielle. Ton : Confiant et accueillant."'
    ],
    3,
    "Orienter farouchement l'IA sur le distinguo (ingrédients, bienfaits) écarte le rendu bas de gamme universel."
  ),
  textStep(
    "Planifier pour les Dates Stratégiques",
    "Les célébrations calendaires sont des opportunités royales. Un bon paramètre associe organiquement la date avec l'identité du client."
  ),
  quizStep(
    "Stratège des Fêtes Mondiales",
    "Viva Fit attend urgemment une série pour la Journée Mondiale de la Santé. Quel prompt l'emporte haut la main ?",
    [
      '"Crée une série de 5 posts pour la Journée Mondiale de la Santé au nom de Viva Fit, marque de bien-être. Chaque post doit aborder un angle précis : chiffre surprenant, astuce pratique, motivation quotidienne, incitation produit, appel à la communauté. Ton : Inspirant et proche."',
      '"Génère des faits sur la journée de la santé"',
      '"Juste un petit post du 7 avril s\'il te plaît"',
      '"Fournis une histoire médicale"'
    ],
    0,
    "Contraindre les multiples publications à s'appuyer chacune sur une variation sémantique (chiffre, astuce, vente) offre une dimension très stratégique."
  ),
  textStep(
    "Mécanique Vidéo Courte (Stories / Reels)",
    "Le format court dirige la portée organique aujourd'hui. ChatGPT scénarise des reels redoutables si sa structure de prompt est impeccable."
  ),
  fillStep(
    "Instillez le Découpage Vidéoludique !",
    "Calez les verrous du chronomètre.",
    '"Écris un script pour Reel de ___ secondes destiné à Viva Fit portant sur ___. Archétype : accroche frontale dans les ___ premières secondes, corps éparpillé en 3 arguments brefs et CTA final. Ton : ___ et direct."',
    ["30", "comment cimenter une habitude saine en 21 jours", "3", "inspirationnel et motivant"],
    ["30", "comment cimenter une habitude saine en 21 jours", "3", "inspirationnel et motivant", "900", "mortifère"],
    "Forcer le sablier algorithmique empêche le générateur de rédiger un texte documentaire soporifique."
  ),
  quizStep(
    "Conditionnement Vertical",
    "En quoi spécifier drastiquement le chronométrage et l'ossature d'un Reel améliore l'output ?",
    [
      "Pour faire transpirer le présentateur video en accéléré",
      "Le bot accepte seulement les textes très courts",
      "Assurer un rendu directement profilé et ajusté à la taille d'un clip court vertical, réduisant grandement les retouches complexes ou résumés à postériori",
      "Il n'y a pas d'importance"
    ],
    2,
    "Ignorer l'assignation temporelle résulte d'emblée à assister à la production d'un texte hors norme incapable d'être récité convenablement à grande vitesse."
  ),
  textStep(
    "L'Œil Analytique (Tendances)",
    "Reléguant la création pure au statut d'outil, ChatGPT endosse parfaitement les habits d'analyste de tendance, mâchant la donnée brute en vision stratégique."
  ),
  fillStep(
    "Le Sillon des Prospections !",
    "Convoquez le spectre de conjoncture économique du bot.",
    '"Analyse froidement les tendances majeurs touchant au ___ sur le marché florissant de la ___ en ___. Sur chaque courant, décris ce que c\'est, pourquoi ça gonfle, et de quelle manière l\'enseigne Viva Fit peut ___ formellement dans sa doctrine marchande."',
    ["création de contenu social", "sphère santé et bien-être global", "2025", "s'en emparer et l'utiliser"],
    ["création de contenu social", "sphère santé et bien-être global", "2025", "s'en emparer et l'utiliser", "ignorer la data", "détruire l'entreprise"],
    "Élever un niveau d'abstraction métamorphose votre statut de simple créatif vers stratège redouté d'agence."
  ),
  textStep(
    "La Construction Globale d'un Mois",
    "Vous pouvez générer une stratégie de contenu intégrale de 30 jours, prémunie des failles conceptuelles usuelles, en quelques minutes sur le pont de commande."
  ),
  quizStep(
    "Symphonie d'Agenda",
    "Parmi les choix, quelle formule commande la stratégie de fer la mieux rodée ?",
    [
      '"Crée un calendrier des posts d\'ici fin mai"',
      '"Donne des idées vastes orientées hôpital et bien-être"',
      '"Écris joliment un mois de plan de com"',
      '"Agis en majestueux directeur webmarketing : Délimite la stratégie éditoriale Instagram complête de Viva Fit en mai. Oblige-toi à unifier 4 piliers thématiques, la fréquence hebdomadaire idéale, un dosage juste des formats (Reels, carrousels, fixes, stories), tes 12 meilleures pistes précises et les 3 grands leviers KPI pour estimer une prouesse chiffrée."'
    ],
    3,
    "Instaurer des règles de formats mixtes, des cadences et dicter les piliers sont le code pur de la machinerie des experts webmarketing véritables."
  ),
  textStep(
    "Modération par Templates Répétés",
    "Gérer les réponses répétitives en messagerie et mur use atrocement. ChatGPT accouche prodigieusement de templates de messages affectueux calant l'horloge biologique relationnelle avec un gros gain capacitaire."
  ),
  fillStep(
    "Aiguisage de la Repartie Directe",
    "Cimentez l'automatisme modérateur du SAV.",
    '"Construis d\'un trait ___ variantes officielles de Templates à dégainer en commentaire sous les visuels IG Viva Fit. Prémunis les cas : les compliments forts aux mixtures, l\'angoisse légitime portant aux ___, les réclamations tendues face à la ___ ou et l\'intérêt de souscription. Signature verbale : ___, aimant et humain véritable."',
    ["5", "détails des ingrédients internes", "qualité des livraisons logistiques", "empathique mais ferme et chaleureux"],
    ["5", "détails des ingrédients internes", "qualité des livraisons logistiques", "empathique mais ferme et chaleureux", "mécanique strict robotisé", "200"],
    "Des blocs de relance clairs réduisent l'abrasion humaine devant le drame du service client, verrouillant l'image chaleureuse du groupe."
  ),
  textStep(
    "Bilan de Stratégie",
    "Qu'il s'agisse de concevoir une rafale organique, de forger un clip publicitaire, de disséquer des données mondiales ou de répondre doucement aux foules — la fluidité réside intégralement dans le respect scrupuleux des repères injectés au cœur de votre requête.\n\nFaire la distinction passe non pas par la seule usure du chatbot, mais de régner en maître incontesté sur l'art de ce formidablisme algorithmique.\n\nPalier Valable et Approuvé ✓"
  )
];
