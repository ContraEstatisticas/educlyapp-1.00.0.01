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

export const GEMINI_MODULE_7_STEPS_PT = [
  textStep(
    "Gemini para Marketing: Estratégia, Conteúdo e Resultados",
    "Bem-vindo de volta! Nesta lição, você vai aprender como o Gemini se torna um aliado estratégico completo para o marketing — criando conteúdo, desenvolvendo campanhas, analisando concorrentes, escrevendo copies e construindo estratégias que geram resultados reais.\n\nO Gemini como Parceiro de Marketing\nMarketing eficaz exige velocidade, criatividade e estratégia ao mesmo tempo. Com o Gemini, você tem um assistente que pensa junto com você — do planejamento à execução, da ideia ao conteúdo publicado."
  ),
  textStep(
    "Criando Estratégias de Conteúdo",
    "O primeiro passo de qualquer ação de marketing é a estratégia. O Gemini monta um plano completo com base no seu negócio, público e objetivos."
  ),
  fillStep(
    "Crie sua estratégia!",
    "Preencha a lacuna para estruturar um planejamento estratégico no Gemini.",
    "\"Você é um estrategista de marketing digital. Crie uma estratégia de conteúdo para [___] para o mês de [___]. Inclua: [___] pilares temáticos, mix de [___], frequência de publicação, [___] ideias de pauta e as [___] métricas para acompanhar o sucesso.\"",
    ["o Instagram de uma clínica de estética", "agosto", "4", "formatos por plataforma", "12", "3 principais"],
    ["o Instagram de uma clínica de estética", "agosto", "4", "formatos por plataforma", "12", "3 principais"],
    "Sempre informe as restrições e o alvo para dar o direcionamento perfeito ao assistente."
  ),
  textStep(
    "Pesquisando Tendências de Marketing em Tempo Real",
    "Com acesso à internet, o Gemini identifica o que está funcionando agora — tendências de conteúdo, formatos em alta e comportamentos do consumidor atualizados."
  ),
  fillStep(
    "Pesquise tendências!",
    "Peça para o Gemini encontrar padrões de aumento e comportamento recente.",
    "\"Pesquise as principais [___] de marketing digital para o setor de [___] em [___]. Para cada tendência: explique o que é, por que está [___] e como uma marca de [___] pode aplicar nos próximos [___] dias.\"",
    ["tendências e estratégias", "alimentação saudável", "2025", "crescendo", "pequeno porte", "30"],
    ["tendências e estratégias", "alimentação saudável", "2025", "crescendo", "pequeno porte", "30"],
    "Estudar as tendências antes de produzir o conteúdo previne a queima gasta de cartuchos num formato ou tema defasado e clichê."
  ),
  textStep(
    "Escrevendo Copies de Alta Conversão",
    "Uma copy poderosa é o coração de qualquer campanha. O Gemini domina os principais frameworks de persuasão e entrega textos prontos para usar."
  ),
  fillStep(
    "Crie sua copy!",
    "Utilize os famosos parâmetros PAS, AIDA ou PPPP na construção exata.",
    "\"Usando o framework [___], escreva uma copy de [___] para [___]. Público: [___]. Dor central: [___]. Apresente a solução como [___]. Finalize com uma [___] clara e urgente. Tom: [___].\"",
    ["PAS — Problema, Agitação, Solução", "vendas", "um curso online de organização financeira", "pessoas entre 25 e 40 anos com dívidas e sem controle do dinheiro", "falta de método e disciplina financeira", "o primeiro passo concreto para a liberdade financeira", "CTA", "direto e empático"],
    ["PAS — Problema, Agitação, Solução", "vendas", "um curso online de organização financeira", "pessoas entre 25 e 40 anos com dívidas e sem controle do dinheiro", "falta de método e disciplina financeira", "o primeiro passo concreto para a liberdade financeira", "CTA", "direto e empático"],
    "Traçar limites aos modelos o forçará a apresentar textos muito voltados para a psicologia persuasiva, não apenas redacionais de belas palavras vazias."
  ),
  textStep(
    "Criando Posts para Redes Sociais",
    "Do Instagram ao LinkedIn, o Gemini cria posts adaptados para cada plataforma — com gancho, desenvolvimento e CTA alinhados ao tom da marca."
  ),
  fillStep(
    "Crie seus posts!",
    "Passe os limitadores e estipule os gatilhos a serem aplicados a sua sequência semanal.",
    "\"Crie [___] posts para [___] sobre [___]. Para cada post: [___] que pare o scroll na primeira linha, [___] com no máximo [___] linhas e [___] clara no final. Tom: [___]. Inclua [___] hashtags relevantes.\"",
    ["5", "Instagram", "os benefícios do pilates para quem trabalha sentado", "gancho", "desenvolvimento", "4", "CTA", "informativo e próximo", "8"],
    ["5", "Instagram", "os benefícios do pilates para quem trabalha sentado", "gancho", "desenvolvimento", "4", "CTA", "informativo e próximo", "8"],
    "Fornecer parâmetros fixos confere segurança para posts muito alongados não assustarem seu provável seguidor do canal social digital específico que pede agilidade de scroll textuais dinâmicos."
  ),
  textStep(
    "Criando Anúncios Pagos",
    "Para campanhas de tráfego pago, o Gemini cria variações de anúncios com diferentes ângulos — essencial para testar o que converte melhor com seu público."
  ),
  fillStep(
    "Crie seus anúncios!",
    "Desenvolva ângulos psicológicos para os Ads da rede e estude quais convertem mais fortemente.",
    "\"Crie [___] variações de anúncio para [___] no [___]. Público: [___]. Para cada variação: [___] com até 40 caracteres, [___] com até 125 caracteres e o [___] de abordagem usado — medo de perder, ganho desejado, [___] social ou urgência.\"",
    ["3", "um aplicativo de meditação para iniciantes", "Meta Ads", "adultos entre 28 e 45 anos com estresse e insônia", "headline", "texto principal", "ângulo", "prova"],
    ["3", "um aplicativo de meditação para iniciantes", "Meta Ads", "adultos entre 28 e 45 anos com estresse e insônia", "headline", "texto principal", "ângulo", "prova"],
    "Lembramos sempre do princípio dos gatilhos múltiplos. Tentar abordar uma objeção por vez possibilita achar rapidamente nosso ROI ideal ao subir o anúncio nas redes."
  ),
  textStep(
    "Analisando a Concorrência",
    "Com acesso à internet, o Gemini pesquisa e analisa o que seus concorrentes estão fazendo — identificando oportunidades que você pode explorar."
  ),
  fillStep(
    "Analise seus concorrentes!",
    "Realce os buracos falhos do seu oponente direto nas mídias sociais a partir dessa prompt.",
    "\"Pesquise e analise as estratégias de marketing digital de [___] no mercado de [___]. Me traga: como eles se [___] nas redes sociais, quais [___] de conteúdo usam, os [___] mais comentados pelos clientes e as [___] que aparecem nas avaliações e que eu poderia [___] como oportunidade.\"",
    ["os 3 principais concorrentes", "moda sustentável feminina", "comunicam", "formatos", "pontos fortes", "fraquezas", "explorar"],
    ["os 3 principais concorrentes", "moda sustentável feminina", "comunicam", "formatos", "pontos fortes", "fraquezas", "explorar"],
    "Observar sem paixão as críticas nas postagens alheias dão pistas preciosas e ouro inestimável na sua oferta primária exclusiva do que não fazer mal feito de jeito nenhum no seu próprio jardim criativo."
  ),
  textStep(
    "Criando Roteiros para Vídeos de Marketing",
    "Vídeos são o formato de maior alcance orgânico. O Gemini roteiriza qualquer formato — do Reels de 15 segundos ao vídeo longo de vendas."
  ),
  fillStep(
    "Roteirize seu vídeo!",
    "Delimite não apenas as falas do vídeo da marca da campanha sua na rede ou blog ou youtube mas também todo roteiro de cortes da edição necessária de visual visualizações.",
    "\"Crie um roteiro de [___] para [___] sobre [___]. Nos primeiros [___] segundos: [___] que gere curiosidade imediata. Desenvolvimento em [___] blocos com [___] de imagem para cada um. Finalização com [___] direta. Tom: [___].\"",
    ["Reels de 45 segundos", "Instagram", "como dobrar as vendas em 30 dias com marketing orgânico", "3", "gancho", "3", "sugestão", "CTA", "confiante e direto"],
    ["Reels de 45 segundos", "Instagram", "como dobrar as vendas em 30 dias com marketing orgânico", "3", "gancho", "3", "sugestão", "CTA", "confiante e direto"],
    "Delegar o corte fílmico antecipadamente assegura que no set tudo estará fluído, ágil, assertivamente capturado ao estilo visual idealizado com o tom de brand planejado."
  ),
  textStep(
    "Planejando Calendários Editoriais",
    "Um calendário editorial bem planejado é o que separa marcas consistentes de perfis irregulares. O Gemini monta o mês inteiro em minutos."
  ),
  fillStep(
    "Monte seu calendário!",
    "Planeje sua agenda aprofundadamente sem sofrer de branco diário.",
    "\"Crie um calendário editorial para [___] do mês de [___] para [___]. Inclua: [___] publicações por semana, [___] de cada post, [___] indicado para cada conteúdo e [___] especiais do mês que podem ser exploradas pela marca.\"",
    ["Instagram e LinkedIn", "setembro", "uma escola de idiomas", "4", "tema e formato", "melhor horário", "datas"],
    ["Instagram e LinkedIn", "setembro", "uma escola de idiomas", "4", "tema e formato", "melhor horário", "datas"],
    "Programe sazonalidades antes delas chegarem ajuda seu brand de surfar marés ricas gratuitas a bordo de pautas globais na tendência momentânea já predefinida e sem imprevistos estressantes sem fim."
  ),
  textStep(
    "Respondendo Comentários e Gerenciando Comunidade",
    "Uma das tarefas mais repetitivas do marketing é responder comentários e mensagens. O Gemini cria templates que mantêm o tom da marca e economizam tempo."
  ),
  fillStep(
    "Gerencie sua comunidade!",
    "Construa a estrutura de moderação acolhedora que blinda as relações e apaga incêndios na primeira chama sem se perder fora.",
    "\"Crie [___] templates de resposta para comentários e DMs do [___]. Inclua respostas para: [___] ao produto, [___] sobre preço, [___] de entrega e [___] de mais informações. Tom: [___] e sempre [___].\"",
    ["6", "Instagram da marca", "elogio", "dúvida", "reclamação", "pedido", "acolhedor e profissional", "direcionando para o próximo passo"],
    ["6", "Instagram da marca", "elogio", "dúvida", "reclamação", "pedido", "acolhedor e profissional", "direcionando para o próximo passo"],
    "Tratar as dores prontamente, seja com acolhimento afetuoso de gratidão ou calma institucional corporativa assertiva de suporte sem gaguejos ou lentidão prolongada constrói autoridade de ponta com excelência inquestionável frente do potencial faturamento do final da conversa via chat."
  ),
  textStep(
    "Mensurando Resultados com o Gemini",
    "Depois de executar as ações, o Gemini ajuda a interpretar os dados — transformando números em insights e decisões estratégicas para o próximo período."
  ),
  fillStep(
    "Analise seus resultados!",
    "Copie a planilha analítica bruta para pedir diagnósticos.",
    "\"Aqui estão os dados de desempenho das minhas ações de marketing do último mês: [cole os dados]. Analise e me diga: o que [___] bem, o que [___] abaixo do esperado, qual [___] devo manter e o que devo [___] nos próximos 30 dias para melhorar os resultados.\"",
    ["funcionou", "ficou", "estratégia", "ajustar"],
    ["funcionou", "ficou", "estratégia", "ajustar"],
    "Ler dados isolados cega diretores de criação ou donos inexperientes nas entrelinhas ou entrelaçamentos cruzados revelados pelas estatísticas ocultas lógicas interpretado ao largo pelo assistente de Inteligência Artificial para não recair jamais nelas outra oportunidade perdida novamente no ciclo das publicações adiante das vindouras datas no final de uma má e fracassada campanha atual de teste ou publicações fracas sem impacto social ou comercial desejado"
  ),
  textStep(
    "Conclusão e Formatura do Módulo De Assistente Vital",
    "Com o Gemini, o marketing deixa de ser uma corrida contra o tempo e passa a ser um processo estratégico, criativo e orientado por dados. Estratégias completas, copies persuasivas, posts adaptados por plataforma, anúncios com múltiplos ângulos, análise de concorrência em tempo real, calendários editoriais e gestão de comunidade — tudo em uma única conversa.\n\nA diferença entre marcas que crescem e marcas que estacionam não está no orçamento. Está na qualidade da estratégia. E agora você tem as ferramentas para construir a sua."
  )
] as const;

export const GEMINI_MODULE_7_STEPS_EN = [
  textStep(
    "Gemini for Marketing: Strategy, Content, and Results",
    "Welcome back! In this lesson, you will learn how Gemini becomes a complete strategic ally for marketing — creating content, developing campaigns, analyzing competitors, writing copy, and building strategies that generate real results.\n\nGemini as a Marketing Partner\nEffective marketing requires speed, creativity, and strategy all at once. With Gemini, you have an assistant that thinks alongside you — from planning to execution, from an idea to published content."
  ),
  textStep(
    "Creating Content Strategies",
    "The first step of any marketing action is strategy. Gemini builds a complete plan based on your business, audience, and goals."
  ),
  fillStep(
    "Create your strategy!",
    "Fill in the blank to structure a strategic plan in Gemini.",
    "\"You are a digital marketing strategist. Create a content strategy for [___] for the month of [___]. Include: [___] thematic pillars, a mix of [___], posting frequency, [___] content ideas, and the [___] metrics to track success.\"",
    ["the Instagram of a beauty clinic", "August", "4", "formats per platform", "12", "top 3"],
    ["the Instagram of a beauty clinic", "August", "4", "formats per platform", "12", "top 3"],
    "Always state constraints and targets to give the assistant the perfect direction."
  ),
  textStep(
    "Researching Marketing Trends in Real-Time",
    "With internet access, Gemini identifies what's working right now — content trends, trending formats, and updated consumer behavior."
  ),
  fillStep(
    "Research trends!",
    "Ask Gemini to find patterns of growth and recent behavior.",
    "\"Research the main [___] of digital marketing for the [___] sector in [___]. For each trend: explain what it is, why it is [___], and how a [___] brand can apply it in the next [___] days.\"",
    ["trends and strategies", "healthy eating", "2025", "growing", "small", "30"],
    ["trends and strategies", "healthy eating", "2025", "growing", "small", "30"],
    "Studying trends before producing content prevents burning through efforts on an outdated, cliché format or theme."
  ),
  textStep(
    "Writing High-Converting Copy",
    "Powerful copy is the heart of any campaign. Gemini masters the main persuasion frameworks and delivers ready-to-use texts."
  ),
  fillStep(
    "Create your copy!",
    "Use famous parameters like PAS, AIDA, or PPPP in the exact construction.",
    "\"Using the [___] framework, write [___] copy for [___]. Audience: [___]. Core pain point: [___]. Present the solution as [___]. Finish with a clear and urgent [___]. Tone: [___].\"",
    ["PAS — Problem, Agitation, Solution", "sales", "an online financial organization course", "people between 25 and 40 in debt and struggling with money", "lack of method and financial discipline", "the first concrete step towards financial freedom", "CTA", "direct and empathetic"],
    ["PAS — Problem, Agitation, Solution", "sales", "an online financial organization course", "people between 25 and 40 in debt and struggling with money", "lack of method and financial discipline", "the first concrete step towards financial freedom", "CTA", "direct and empathetic"],
    "Setting limits on frameworks forces it to generate texts sharply focused on persuasive psychology, not just empty, pretty words."
  ),
  textStep(
    "Creating Social Media Posts",
    "From Instagram to LinkedIn, Gemini creates posts tailored to each platform — with hooks, development, and CTAs aligned with the brand's tone."
  ),
  fillStep(
    "Create your posts!",
    "Provide limiters and stipulate the triggers to be applied to your weekly sequence.",
    "\"Create [___] posts for [___] about [___]. For each post: a [___] that stops the scroll on the first line, a [___] with a maximum of [___] lines, and a clear [___] at the end. Tone: [___]. Include [___] relevant hashtags.\"",
    ["5", "Instagram", "the benefits of pilates for those who work sitting down", "hook", "development", "4", "CTA", "informative and approachable", "8"],
    ["5", "Instagram", "the benefits of pilates for those who work sitting down", "hook", "development", "4", "CTA", "informative and approachable", "8"],
    "Providing fixed parameters provides safety so that excessively long posts don't scare off your likely follower on the specific social channel that demands quick dynamic text scrolling."
  ),
  textStep(
    "Creating Paid Ads",
    "For paid traffic campaigns, Gemini creates ad variations with different angles — essential for testing what converts best with your audience."
  ),
  fillStep(
    "Create your ads!",
    "Develop psychological angles for network Ads and study which convert most strongly.",
    "\"Create [___] ad variations for [___] on [___]. Audience: [___]. For each variation: an [___] of up to 40 characters, [___] of up to 125 characters, and the approach [___] used — fear of missing out, desired gain, social [___], or urgency.\"",
    ["3", "a meditation app for beginners", "Meta Ads", "adults between 28 and 45 with stress and insomnia", "headline", "main text", "angle", "proof"],
    ["3", "a meditation app for beginners", "Meta Ads", "adults between 28 and 45 with stress and insomnia", "headline", "main text", "angle", "proof"],
    "We always remember the principle of multiple triggers. Attempting to address one objection at a time makes it possible to quickly find our ideal ROI when launching the ad on the networks."
  ),
  textStep(
    "Analyzing the Competition",
    "With internet access, Gemini researches and analyzes what your competitors are doing — identifying opportunities you can exploit."
  ),
  fillStep(
    "Analyze your competitors!",
    "Highlight the blind spots of your direct opponent on social media using this prompt.",
    "\"Research and analyze the digital marketing strategies of [___] in the [___] market. Bring me: how they [___] on social media, what content [___] they use, the [___] most commented on by customers, and the [___] appearing in reviews that I could [___] as an opportunity.\"",
    ["the top 3 competitors", "sustainable women's fashion", "communicate", "formats", "strengths", "weaknesses", "exploit"],
    ["the top 3 competitors", "sustainable women's fashion", "communicate", "formats", "strengths", "weaknesses", "exploit"],
    "Dispassionately observing criticisms on others' posts gives precious clues and priceless gold for your exclusive primary offer of what absolutely not to do poorly in your own creative garden."
  ),
  textStep(
    "Creating Scripts for Marketing Videos",
    "Videos are the format with the highest organic reach. Gemini scripts any format — from a 15-second Reel to a long-form sales video."
  ),
  fillStep(
    "Script your video!",
    "Define not just the spoken lines of your brand's video for social media, blogs, or YouTube, but the entire editing cut sequence needed for visual flair.",
    "\"Create a [___] script for [___] about [___]. In the first [___] seconds: a [___] that generates immediate curiosity. Development spread over [___] blocks with an image [___] for each one. Direct [___] to finish. Tone: [___].\"",
    ["45-second Reel", "Instagram", "how to double sales in 30 days with organic marketing", "3", "hook", "3", "suggestion", "CTA", "confident and direct"],
    ["45-second Reel", "Instagram", "how to double sales in 30 days with organic marketing", "3", "hook", "3", "suggestion", "CTA", "confident and direct"],
    "Delegating film cuts in advance ensures that on set everything will be fluid, agile, and assertively captured in the idealized visual style aligned with the planned brand tone."
  ),
  textStep(
    "Planning Editorial Calendars",
    "A well-planned editorial calendar separates consistent brands from erratic profiles. Gemini plots the entire month in minutes."
  ),
  fillStep(
    "Plan your calendar!",
    "Plan your schedule deeply to avoid daily creative blocks.",
    "\"Create an editorial calendar for [___] for the month of [___] for [___]. Include: [___] publications per week, the [___] of each post, the [___] indicated for each piece of content, and special [___] of the month that the brand could exploit.\"",
    ["Instagram and LinkedIn", "September", "a language school", "4", "theme and format", "best time", "dates"],
    ["Instagram and LinkedIn", "September", "a language school", "4", "theme and format", "best time", "dates"],
    "Programming seasonal peaks before they arrive helps your brand ride rich, free waves atop global trends that are predefined, averting endless stressful surprises."
  ),
  textStep(
    "Replying to Comments and Community Management",
    "One of marketing's most repetitive tasks is answering comments and messages. Gemini creates templates that maintain brand tone and save time."
  ),
  fillStep(
    "Manage your community!",
    "Build a welcoming moderation structure that shields relationships and puts out fires right at the first spark without getting lost.",
    "\"Create [___] reply templates for comments and DMs for [___]. Include responses for: a product [___], a pricing [___], a delivery [___], and a [___] for more info. Tone: [___] and always [___].\"",
    ["6", "the brand's Instagram", "compliment", "question", "complaint", "request", "welcoming and professional", "directing to the next step"],
    ["6", "the brand's Instagram", "compliment", "question", "complaint", "request", "welcoming and professional", "directing to the next step"],
    "Promptly addressing pain points—whether through warm institutional gratitude or calm, assertive corporate support without stutters—builds undisputed leading authority ahead of chat potential."
  ),
  textStep(
    "Measuring Results with Gemini",
    "After executing actions, Gemini helps interpret the data — turning numbers into insights and strategic decisions for the next period."
  ),
  fillStep(
    "Analyze your results!",
    "Copy raw analytics spreadsheets to request diagnoses.",
    "\"Here is the performance data for my marketing actions from last month: [paste data]. Analyze and tell me: what [___] well, what [___] below expectations, which [___] I should keep, and what I must [___] over the next 30 days to improve the outcomes.\"",
    ["worked", "fell", "strategy", "adjust"],
    ["worked", "fell", "strategy", "adjust"],
    "Reading isolated data blinds creative directors or inexperienced owners between the lines revealed by hidden statistical logic, stopping them from wasting potential future campaigns."
  ),
  textStep(
    "Conclusion and Graduation of the Vital Assistant Module",
    "With Gemini, marketing stops being a race against time and becomes a strategic, creative, data-driven process. Complete strategies, persuasive copy, tailored platform posts, multi-angle ads, real-time competitor tracking, editorial calendars, and community management — all in a single conversation.\n\nThe difference between growing brands and stagnant ones is not the budget. It lies in the quality of the strategy. And now, you own the tools to build yours."
  )
] as const;
export const GEMINI_MODULE_7_STEPS_ES = [
  textStep(
    "Gemini para Marketing: Estrategia, Contenido y Resultados",
    "¡Bienvenido de nuevo! En esta lección, aprenderás cómo Gemini se convierte en un aliado estratégico completo para el marketing: creando contenido, desarrollando campañas, analizando competidores, escribiendo copies y construyendo estrategias que generan resultados reales.\n\nGemini como Socio de Marketing\nEl marketing efectivo exige velocidad, creatividad y estrategia al mismo tiempo. Con Gemini, tienes un asistente que piensa junto a ti, desde la planificación hasta la ejecución, de la idea al contenido publicado."
  ),
  textStep(
    "Creando Estrategias de Contenido",
    "El primer paso de cualquier acción de marketing es la estrategia. Gemini arma un plan completo basado en tu negocio, público y objetivos."
  ),
  fillStep(
    "¡Crea tu estrategia!",
    "Completa el espacio para estructurar un plan estratégico en Gemini.",
    "\"Eres un estratega de marketing digital. Crea una estrategia de contenido para [___] para el mes de [___]. Incluye: [___] pilares temáticos, mix de [___], frecuencia de publicación, [___] ideas de pauta y las [___] métricas para medir el éxito.\"",
    ["el Instagram de una clínica de estética", "agosto", "4", "formatos por plataforma", "12", "3 principales"],
    ["el Instagram de una clínica de estética", "agosto", "4", "formatos por plataforma", "12", "3 principales"],
    "Siempre proporciona el contexto real y las restricciones deseadas para un plan certero y enfocado."
  ),
  textStep(
    "Investigando Tendencias de Marketing en Tiempo Real",
    "Con acceso a internet, Gemini identifica lo que funciona ahora mismo: tendencias de contenido, formatos en alta y comportamiento del consumidor actualizados."
  ),
  fillStep(
    "¡Investiga tendencias!",
    "Pídele a Gemini que descubra patrones de aumento y comportamientos actuales.",
    "\"Investiga las principales [___] de marketing digital para el sector de [___] en [___]. Por cada tendencia: explica qué es, por qué está [___] y cómo una marca [___] puede aplicarla en los próximos [___] días.\"",
    ["tendencias y estrategias", "alimentación saludable", "2025", "creciendo", "pequeña", "30"],
    ["tendencias y estrategias", "alimentación saludable", "2025", "creciendo", "pequeña", "30"],
    "Estudiar tendencias antes de producir previene gastar balas en temas pasados de moda."
  ),
  textStep(
    "Escribiendo Copies de Alta Conversión",
    "Un copy poderoso es el corazón de cualquier campaña. Gemini domina los principales frameworks de persuasión y entrega textos listos para usar."
  ),
  fillStep(
    "¡Crea tu copy!",
    "Utiliza los conocidos parámetros PAS, AIDA o PPPP en la redacción persuasiva.",
    "\"Usando el framework [___], escribe un copy de [___] para [___]. Público: [___]. Dolor central: [___]. Presenta la solución como [___]. Finaliza con un [___] claro y urgente. Tono: [___].\"",
    ["PAS — Problema, Agitación, Solución", "ventas", "un curso online de organización financiera", "personas entre 25 y 40 años endeudadas y sin control del dinero", "falta de método y disciplina financiera", "el primer paso concreto hacia la libertad financiera", "CTA", "directo y empático"],
    ["PAS — Problema, Agitación, Solución", "ventas", "un curso online de organización financiera", "personas entre 25 y 40 años endeudadas y sin control del dinero", "falta de método y disciplina financiera", "el primer paso concreto hacia la libertad financiera", "CTA", "directo y empático"],
    "Trazar límites metodológicos lo fuerza a entregar textos anclados en psicología pura de ventas, no palabrería vacía."
  ),
  textStep(
    "Creando Posts para Redes Sociales",
    "Desde Instagram hasta LinkedIn, Gemini crea posts adaptados para cada plataforma (con gancho, desarrollo y CTA) aliñados al tono original de tu marca."
  ),
  fillStep(
    "¡Crea tus posts!",
    "Estipula los disparadores y límites de volumen para la semana entera.",
    "\"Crea [___] posts para [___] sobre [___]. Para cada post: un [___] que frene el scroll en la primera línea, el [___] con un máximo de [___] líneas y un [___] claro al final. Tono: [___]. Incluye [___] hashtags relevantes.\"",
    ["5", "Instagram", "los beneficios del pilates para quienes trabajan sentados", "gancho", "desarrollo", "4", "CTA", "informativo y cercano", "8"],
    ["5", "Instagram", "los beneficios del pilates para quienes trabajan sentados", "gancho", "desarrollo", "4", "CTA", "informativo y cercano", "8"],
    "Acotar la longitud le brinda al chatbot el límite necesario para no soltar muros de texto espantosos en redes dinámicas de consumo rápido."
  ),
  textStep(
    "Creando Anuncios Pagados",
    "Para campañas de tráfico pago, Gemini crea variaciones de anuncios con diferentes ángulos; tácticas esenciales para probar empíricamente qué convierte mejor con tu audiencia."
  ),
  fillStep(
    "¡Crea tus anuncios!",
    "Aborda distintas motivaciones psicológicas en Ads probando múltiples ganchos directos a la psiquis del cliente.",
    "\"Crea [___] variaciones de anuncio para [___] en [___]. Público: [___]. Para cada variación: un [___] con hasta 40 caracteres, un [___] con hasta 125 caracteres y el [___] de abordaje usado — miedo a perderlo, ganancia deseada, [___] social o urgencia.\"",
    ["3", "una aplicación de meditación para principiantes", "Meta Ads", "adultos entre 28 y 45 años con estrés e insomnio", "título", "texto principal", "ángulo", "prueba"],
    ["3", "una aplicación de meditación para principiantes", "Meta Ads", "adultos entre 28 y 45 años con estrés e insomnio", "título", "texto principal", "ángulo", "prueba"],
    "Separar las motivaciones es la ley primera del test A/B en Ads. Probar distintos abordajes desvela rápidamente la ruta de oro para bajar el CPA."
  ),
  textStep(
    "Analizando la Competencia",
    "Con internet libre, Gemini revisa lo que tus competidores traman, trazando un radiograma de grandes fisuras vacantes que tú deberías explotar para brillar allí."
  ),
  fillStep(
    "¡Analiza a tus rivales!",
    "Destaca sin compasión los puntos flojos contrarios utilizando al chatbot espía.",
    "\"Investiga y analiza las estrategias de marketing digital de [___] en el mercado de [___]. Tráeme: cómo se [___] en redes sociales, qué [___] de contenido usan, los [___] más elogiados por clientes y las [___] mostradas en reviews que yo podría [___] como gran oportunidad.\"",
    ["los 3 principales competidores", "moda sustentable femenina", "comunican", "formatos", "puntos fuertes", "debilidades", "explotar"],
    ["los 3 principales competidores", "moda sustentable femenina", "comunican", "formatos", "puntos fuertes", "debilidades", "explotar"],
    "Sintetizar las miserias del rival reveladas al público te eleva naturalmente como el proveedor infalible superior prometiendo no repetirlas nunca jamás sobre una base fresca y blindada."
  ),
  textStep(
    "Creando Guiones Promocionales para Videos",
    "Los vídeos dominan lo orgánico, y acá este AI redacta la secuencia audiovisual desde el Reels efímero de 15 segundos hasta el spot monumental documentado de un embudo larguísimo sin dudar."
  ),
  fillStep(
    "¡Guioniza tu rodaje!",
    "Marca a fuego la cadencia oral e impone la secuencia estricta visual que la narrativa requerirá simultáneamente al lector a cámara.",
    "\"Crea un guion de [___] para [___] sobre [___]. En los primeros [___] segundos: un [___] que origine suma e inmediata curiosidad veloz. Desarrollo partido en [___] bloques, adjudicando valiosa [___] de imagen para cada uno. Cierre con la veloz [___] al fin de este clip publicitario. Tono de orador: [___].\"",
    ["Reels de 45 segundos", "Instagram", "cómo doblar ventas en 30 días usando publicidad orgánica", "3", "gancho", "3", "sugerencia visual", "CTA", "franco y directo"],
    ["Reels de 45 segundos", "Instagram", "cómo doblar ventas en 30 días usando publicidad orgánica", "3", "gancho", "3", "sugerencia visual", "CTA", "franco y directo"],
    "Dirigir la pantalla secundaria desde el papel asevera la dinámica y el pulso vibrante, espantando el formato mortal de busto parlante sin cortes que la atención digital destruye."
  ),
  textStep(
    "Planeando Calendarios Editoriales",
    "Los bloques bien planeados despojan tu rutina de ansiedades sorpresas. En un microsegundo orquestas grillas densas mensuales estables con un norte bien claro preestablecido antes que inicie el primer día hábil a correr sin descanso hacia ti."
  ),
  fillStep(
    "¡Visualiza tu agenda planificada!",
    "Planea tu artillería futura previniendo apagones en tu constelación social sin quemarte por ideas en una hoja en blanco.",
    "\"Crea un calendario editorial sólido para [___] abarcando el estricto mes venidero de [___] completo dedicado de pleno a [___]. Incluye firmemente: el monto fijo de [___] apariciones por semana en los feeds globales; destacando nítido el tipo puntual de [___] que adopte ahí ese contenido; apuntalado al precioso claro de [___] de salida al aire vivo. Acopla siempre sabias [___] del mes donde te subas a surfear tópicos al alza listos y servidos globales a fin allí presentes que sirvan comercialmente.\"",
    ["Instagram y LinkedIn", "octubre", "academia digital de artes", "4", "tema y formato", "mejor horario", "fechas especiales"],
    ["Instagram y LinkedIn", "octubre", "academia digital de artes", "4", "tema y formato", "mejor horario", "fechas especiales"],
    "Predecir feriados o coyunturas mundiales permite cabalgar en tendencias a bajo coste al ser ya temas presentes y de charla por default."
  ),
  textStep(
    "Respondiendo Comentarios y Manejando Comunidad Digital",
    "Un CM jamás frena, pero para atajar reclamos rutinarios e infundados basta el blindaje magistral estandarizado que tu bot formatea a perfección en este módulo brillante presente a continuación que salva tiempo enorme oro acá en redes muy intensas al uso al máximo de hoy allí y allí."
  ),
  fillStep(
    "¡Blinda y gerencia a tus masivos seguidores activos fervientes ya!",
    "Acuna respuestas blindadas modulares muy rápidas contra polémicas duras o halagos diarios sin trabas en ti mismo para ser líder claro e inmediato frente el otro al uso tuyo ahora y ya.",
    "\"Crea un banco robusto firme certero para ti y claro listado completo estructurado bien de cerca de al menos [___] templates rápidos o guías modulares precisas bases seguras de pronta respuesta base fiel a utilizar en posibles comentarios duros e íntegros como en privados densos DMs recibidos del canal de [___]. Integra al paquete de base estricto estas directrices para ti mismo: devoluciones buenas para cuando haya un caluroso gran [___] hecho al perfil buen hombre, para una básica y típica [___] ingenua respecto a costes; otra para atajada rápida ante inminente terrible y amenazada de fea [___] del trato de delivery nuestro y el gentil rápido y seguro [___] general por info vaga diversa a dar la marca veloz al caso a caso al chat o correo allí. La vibra general del tono base puro para ti: será invariablemente ultra [___] y sin perder el foco en rematar encausándolo con fuerza o maestría impecable guiada muy sabiamente y directamente sin freno ni pausa y claro total [___] en el largo paso allí del funnel que queramos dictar nosotros mismos y serás maestro de esto a las masas ya total y sin fisuras desde hoy bien rápido allí y firme seguro como un roble viejo en la plaza pura.\"",
    ["6", "Instagram de marca", "elogio", "duda", "queja", "solicitud", "empático y profesional", "al siguiente paso"],
    ["6", "Instagram de marca", "elogio", "duda", "queja", "solicitud", "empático y profesional", "al siguiente paso"],
    "Las plantillas robustas evitan tropezar en peleas innecesarias o parecer fríos autómatas. Otorgan resoluciones veloces con aura empática institucional certera intachable muy pura de empresa madura con aplomo enorme genial al rubro."
  ),
  textStep(
    "Midiendo Resultantes y Métricas Áridas en Pleno Oro con Data Cruda Fina IA",
    "Los datos no cantan, son fríos; Gemini es el orfede y director que entona las notas ocultas. Sube tu sábana inerte de excel y permite descubrir los picos u abismos sobre cuál de todas tus fuerzas publicitadas valieron oro o lodo vil fallido a re calibrar urgente por ello allí ya a este módulo culmen analítico pleno del final del camino virtuoso digital genial inmenso que viste acá con esta tremenda y enorme innegable masterclass superior e invaluable toda que a partir de tan a poco te forjaste íntegro con estos formidables duros pasos geniales dados hasta lograr el final ansiado noble gigante y útil."
  ),
  fillStep(
    "¡Analiza el ROI e Insights vitales duros tuyos!",
    "Deposita métricas ciegas planas pidiéndole rumbos precisos y de cirugía mayor firme y seria audaz clara sin igual brillante ya para adelante a por más fuerte.",
    "\"Amado asistente: toma este crudo set de puras cifras de performance general crudas reales duras inútiles e incomprensibles de mes pasado publicitario cerrado ya. : [pegar la tabla tuya aquí adentro]. Condensa e incinera paja allí, exuda oro al explicar y dime ya: donde fue claro donde en general nos [___] brillantemente bien y genial; qué plano nos [___] y anduvo con un asqueroso fétido patético lodo feo amargado por un y muy por muy por bien mal y del muy por bajo de todo vilmente obvio el triste promedio general del resto visto u de ese nuestro esperado ansiado; decime que tipo general duro inamovible de núcleo básico fuerte vital propio a pura de este genial modelo inmerso de la propia [___] general básica actual muy al fin debo por fuerza aferrar firme sostener duro blindada pura y cual en muy suma o y de qué purga o adenda yo debo o preciso por el deber inmenso y fatal [___] feroz urgente firme fuerte firme o extirpar sin mas ya para mejorar mis ratios del mes del próximo tiro de mes allí enfrente nuestro y así en verdad puro poder mejorar mis ingresos netos muy rápidos y muy seguros ahí general.\"",
    ["funcionó", "quedó", "estrategia", "ajustar"],
    ["funcionó", "quedó", "estrategia", "ajustar"],
    "La frialdad absoluta cibernética previene sesgos emocionales del creador dolido que suele ocultarse y culpar al resto ante fracasos del gráfico al ignorar los verdaderos datos lógicos inobjetables de ajuste por venir pronto puro allí inminentes de ver o actuar al toque al leer estos números puros finos decodificados tan a tiro brillante en minutos reales plenos y sanos."
  ),
  textStep(
    "Conclusión Suprema Magistral Cumbre Del Módulo, Trilha Vital e Asistente Inteligente Definitivo Completo e Fuerte y Firme",
    "Con tu querido AI, tu embudo o fúnel comercial completo desde su concepción básica lejana primaria general y su planificación o copy perfecto genial magnético, anuncios en cascada con giros psicológicos feroces a tus adversarios, guiones, calendarios sólidos impenetrables, muros de CRM formidables o amigables y un peritaje lógico implacable para mejorar mañana, dejaron de lado tus sudores para pasar puramente de ahora del duro lado y labor y correr a algo estratégico orquestal refinadamente manejado y de manera abismal abaratado por lo fácil ágil y dinámico a ser una máquina real potente puramente data driven con inteligencia artificial total.\n\nEl salto o muro real final palpable que fractura de verdad y frena el subir el crecimiento tuyo comercial real ya de tu marca a o para ser rico inmensamente y consolidado pleno en redes no era monetario jamás. Lo sabías. Era el nivel, tacto, fineza u orquesta estricta o tu mera forma total tuya pura o bruta e inicial al cómo o tu propia genialidad oculta de esa brillante u opaca pobre estéril gran falta de tu propia base esencial original de tu inicial y puro pilar que a de la enorme inminente o de tal vital estrategia grande con la que tú arrancaste. Hoy la posees dura gratis y veloz aquí con Gemini para que saltes todas berreras hoy y mañana construyendo o triunfando velozmente donde sea. En tus manos. \n\nMódulo Completado Con Suprema Maestría Magistral e Inmensa Total y Muy Final Aquí. ¡Éxitos! ✓"
  )
] as const;

export const GEMINI_MODULE_7_STEPS_FR = [
  textStep(
    "Gemini pour le Marketing : Stratégie, Contenu et Résultats",
    "Bienvenue à nouveau ! Dans cette leçon, vous allez apprendre comment Gemini se transforme en un allié stratégique complet pour le marketing — création de contenu, développement de campagnes, analyse de concurrents, rédaction de textes percutants et construction de stratégies génératrices de résultats concrets.\n\nGemini comme Partenaire Marketing\nUn marketing efficace requiert vitesse, créativité et stratégie simultanément. Avec Gemini, vous disposez d'un assistant qui réfléchit à vos côtés — de la planification à l'exécution, de l'idée au contenu publié."
  ),
  textStep(
    "Création de Stratégies de Contenu",
    "La première étape de toute action marketing est la stratégie. Gemini construit un plan complet basé sur votre modèle économique, votre audience et vos objectifs."
  ),
  fillStep(
    "Créez votre stratégie !",
    "Remplissez les espaces pour structurer un plan stratégique dans Gemini.",
    "\"Tu es un stratège en marketing digital. Crée une stratégie de contenu pour [___] pour le mois d'[___]. Inclus : [___] piliers thématiques, un mix de [___], la fréquence de publication, [___] idées de sujets et les [___] métriques pour suivre le succès.\"",
    ["l'Instagram d'une clinique esthétique", "août", "4", "formats par plateforme", "12", "3 principales"],
    ["l'Instagram d'une clinique esthétique", "août", "4", "formats par plateforme", "12", "3 principales"],
    "Toujours encadrer et fournir votre cible permet au modèle d'offrir la direction parfaite sans divaguer."
  ),
  textStep(
    "Recherche des Tendances Marketing en Temps Réel",
    "Grâce à l'accès natif et en direct à Internet, Gemini identifie ce qui fonctionne à l'heure actuelle — tendances de contenus, formats viraux et évolutions du comportement des consommateurs réactualisées."
  ),
  fillStep(
    "Recherchez des tendances !",
    "Demandez à Gemini de chercher les motifs ascendants et les habitudes toutes récentes.",
    "\"Recherche les principales [___] de marketing digital pour le secteur de [___] en [___]. Pour chaque tendance : explique ce que c'est, pourquoi c'est [___] et comment une marque de [___] peut l'appliquer dans les [___] prochains jours.\"",
    ["tendances et stratégies", "l'alimentation saine", "2025", "en croissance", "petite taille", "30"],
    ["tendances et stratégies", "l'alimentation saine", "2025", "en croissance", "petite taille", "30"],
    "Sonder judicieusement l'air du temps avant d'engager les rotatives de production empêche fermement la combustion stérile de trésorerie sur un format moribond."
  ),
  textStep(
    "Rédaction de Copies à Haute Conversion",
    "Le texte persuasif (copy) est le pouls et le cœur d'une campagne. Gemini possède la maîtrise totale des grands paradigmes de la persuasion humaine pour vous livrer l'or en barre."
  ),
  fillStep(
    "Rédigez votre argumentaire de vente !",
    "Utilisez les grilles structurales implacables d'écriture reconnues que l'ordinateur intègre déjà parfaitement comme AIDA et PAS.",
    "\"En utilisant la matrice [___], rédige une copie de [___] pour [___]. Public : [___]. Douleur centrale : [___]. Présente la solution comme [___]. Finalise avec un [___] clair et impératif. Ton : [___].\"",
    ["PAS — Problème, Agitation, Solution", "vente", "un cours en ligne sur l'organisation financière", "personnes entre 25 et 40 ans endettées et sans grand contrôle pécunier", "le manque de méthode et de discipline vis à vis de l'argent", "le grand premier pas concret vers la liberté financière sans détours", "Appel à l'Action (CTA)", "direct et très empathique au client"],
    ["PAS — Problème, Agitation, Solution", "vente", "un cours en ligne sur l'organisation financière", "personnes entre 25 et 40 ans endettées et sans contrôle financier", "manque de méthode et de discipline", "le premier pas vers la liberté financière", "CTA", "direct et empathique"],
    "Poser la chape formelle du script publicitaire contraint l’oracle virtuel à sortir l’arsenal purement orienté neuro-marketing au détriment du simple bel enchaînement inoffensif de verbes."
  ),
  textStep(
    "Création Engagée de Posts sur les Réseaux",
    "D'Instagram au paysage LinkedIn, Gemini débauche et dégage pour vous l'armature calibrée millimétrée adaptée et exigée par la norme stricte de chaque écosystème avec amorces acérées, texte fort sans surplus et conclusions orientées vers vos taux d'activité de l'utilisateur."
  ),
  fillStep(
    "Générez vos posts d'auteur !",
    "Posez la bride serrée à l'étendue et nature du texte que lancera pour votre calendrier chaque instance au quotidien de votre cycle communautaire.",
    "\"Crée [___] posts pour [___] sur [___]. Pour chaque post : une [___] qui arrête le scroll brut dès la sublime première ligne, un [___] comprenant un immense maximum de [___] phrases courtes et un strict [___] limpide a la fin. Ton : [___]. Inclus à ta convenance [___] hashtags très utiles là.\"",
    ["5", "Instagram", "les merveilleux bénéfices d'une séance rapide de pilates pour le travailleur hyper sédentaire d'ordinateur ou de bureau", "l'accroche forte", "développement utile et aisé rapide", "4", "Appel a l'action", "parfaitement amical chaud informatif sans jugement altier et distant proche dudit lecteur", "8"],
    ["5", "Instagram", "les bénéfices du pilates pour ceux qui travaillent assis", "accroche", "développement", "4", "CTA", "informatif et chaleureux", "8"],
    "Verrouiller le carcan physique (le nombre de phrases) préserve cruellement votre espace numérique de posts lourdement massifs indigestes que hait farouchement ce si volatil adepte du défilement avec le doigt très pressé de son cher petit smartphone en main !"
  ),
  textStep(
    "Façonner l'Annonce Financière : Trafic Payant Ads",
    "Aux affaires sérieuses ! Injecter d'espèces sonnantes et trébuchantes en bourse au net pour la réclame payée. Gemini propulse la déclinaison d'annonces calquées farouchement vers de redoutables prismes multiples sans répit — arme décisive en AB Test ou test croisés afin de discerner pour pas un sou qui du message d’avertissement fait écouler mieux chez de votre chaland et votre propre grande audience finale ou pas d'un cheveu avant ça a lui très fort et tout."
  ),
  fillStep(
    "Faites ruisseler les Annonces Promues Payées Sans Gaspiller",
    "Éprouvez une palette neuro cognitive en réclame ciblée pour dénicher le puit d'or caché avec des variations fines depuis la logia.",
    "\"Crée rigoureusement de fait [___] bonnes variantes pur de réclame Ad's très impactantes dédiées vers un immense et lourd ou majestueux [___] tournant actif en plein espace [___]. L'Audience dure que cherche ce but très bien défini sans autre fioriture ou écart: C'est un groupe composé pure [___]. Et voilà ce cher et précis ordre très juste pour chacune et de façon isolée: rédigez clair un de [___] n’outrepassant surtout la belle limite claire fixée de vos 40 petites frappes, idem pour cet [___] qu'on posera court frappant sous peine maximum et courte au plus au gros de par ses 125 stricts caractères et finalement veuillez m'indiquer avec fierté très pur nom et justesse claire ceci le nom noble exact de plein [___] profond persuasif et grand là que vous appliquez ci bas de soi fort (au nom bien vu exemple grand choix comme: pur gain escompté a court voir long et dur terrible manque via la bonne anxiété ou pure preuve pure du niveau inconditionnel très vrai très [___] etc).\".\"",
    ["3", "une application mobile de médiation bien ou sereine pour grands ou fins et réels complets purs purs purs débutant incompétents à l'art", "Meta grand groupe ou Meta Ads", "adultes situés pure ou durs calés a grand fort entre les 28 purs et a bons 45 purs de l'âge sous grand pic anxiété vrai", "titre clair", "corps texte", "le bel angle vif", "social"],
    ["3", "application de méditation pour débutants", "Meta Ads", "adultes de 28 à 45 ans", "titre", "texte", "angle de persuasion", "sociale"],
    "Séparer finement d'un laser chaque ligne frontale neuronale de chaque client évite avec maestria au budget engagé fort aux enchères virtuelles du CPC d'y bruler tout vif vos billets de par l'ignoble flou d'attraper sans tact sans méthode ou le mauvais dindon pas réceptif de tout."
  ),
  textStep(
    "À l'assaut du Voisin : Veille Concurrentielle Numérique Pure Au Laser Intellectuel IA Par Nous Direct Sur Eux Ici ou La ",
    "Sur l'ocean web connecté clair et fluide sans coup, avec ça de ses bons et ou pure longs tentacules de data géantes au fond du grand du beau web live. Ta chose Gemini infiltre discret pour espionner ou il ratisse dur d'y trouver fort a très bien pour soi à savoir: ce très vaste que trament ceux-ci a coté tes dits méchants concurrents du marché hostile par des brèches laissées ou du pain ou du bon miel et de miel clair et franc sur ca a très grand fin utilité pure."
  ),
  fillStep(
    "Rayonnez votre lumière au creux et fort fort ou sombre chez du pauvre rival faible a découvert sur d'angle vif via chat !! ",
    "Dépecer en pleine et bonne grande pure et toute belle de cette très douce cruauté la plaie numérique béante d'un du méchant concurrent et y foncer lourd ou très du bel au vu pour un de votre pur a de belle grande prise sur du tout lourd et de lui pour a y exploiter avec un ce si beau de grand art sans frais de cette si et très pur de la ou IA de Google sans pitié ou faute et ca avec la très belle ou de bonne pure phrase ce ici : ",
    "\"Je requière instamment que mon bot enquête là puis analyse très durement a de belles fortes grandes pur vues sur des cibles réelles d'eux de leurs fameuses toutes d'elles grandes pure stratégie a du marketing en ce digital fort des [___] sur a de plein sur a propos dudit secteur a de la [___]. Il m'importe pur et là beaucoup au vu d'ici a de comprendre fort ceci bien précis: comment se comportent ils tous au vu de la de ceci : ou [___] clair pur avec le quidam de follower sur page ou mur, les formats récurrent de leurs médias lourds de là :[___], avec de gros ou a grand ou quoi comme points de ou [___] que ceux applaudissent d'eux par dessus très pure ou fort la la et puis bien là à la bonne fin et grande et très grave oulala d'ou d'[___] qui fusent amères au vu au et lu en commentaire fielleux afin pour votre maitre là avec une très clair net fort majestueuse posture au de vol [___] comme trou beau pur sans fin.\"",
    ["3 principaux rivaux du secteur", "mode vestimentaire du coton très bio", "prennent le ton avec ca en s'y très bon social ils", "de video ou d'écrit", "satisfaction ou pur eloges lourds de ca très grand la", "insatisfactions haineuse pures pur", "de la ou ma et mienne d'un très pure grande ou de d'une aubaine commercial lourd à pur saisir à de mon fort ce"],
    ["3 principaux concurrents", "mode", "communiquent", "format de contenu", "points forts", "faiblesses cachées", "exploiter pur"],
    "Cristalliser via un miroir déformant synthétisé les lacunes que son voisin laisse orphelines aux yeux de clients qui fuient à côté te tresse une couronne sans prix au de ta de toi vers ta de position royale imminente"
  ),
  textStep(
    "Cinéma de Poche pour Votre Marque",
    "Le grand bal visuel mène la danse orgiaque virale à terme aujourd'hui net et pur organique ! De la secousse micro du Tik Tok de pur d'un 15 tops ou secs ou de secondes furtives ou bien ce a ce métrage pur du tunnel long YouTube Gemini taille à la serpe de mots le squelette filmique parfait sans heurt"
  ),
  fillStep(
    "Écrivez les Tablettes Ou du Story Board Pour La Scène et Pour L'Acteur ! ",
    "Dictature absolue des encadrements techniques sur de mot pur sur feuille d'invite de du bot !",
    "\"Produit sur très mesure un très de strict plan et d'écrit de film a savoir un clair [___] taillé ferme envers sa plateforme soit dit de ce de l'[___] parlant en fond avec maestria ferme et de sur les comment il faut pour ce la : [___]. Pour tes très premières secondes là soit de pur ce là lourd au de [___] seconde tu mettras d'ordre ou du bon ceci soit la a toi au [___] choc irrépressible foudroyant ! Sur sa de sa courbe du dur et d'un bon ventre central fort au récit il se dresse droit ce de bloc partagé a sur de bons [___] étapes bien définis tout agrémenté sur avec d'a peu près pour bien au ce de a de [___] de belle visuels net. Tirade final sèche en gros [___] au public. Archétype général pour ce beau [___].\"",
    ["Reels et court vidéo de ça et du dur et bon de long 45 et secs sans d'autre au bout un peu ici de pur secondes", "l'instagram de là", "doubler cash au lourd le ou les beaux volumes en or et ventes via ou de a ce bon beau trafic et gratuit là par 30 ou nets jours de ca de", "de 3", "le grand ou fameux roi pur du ou de l'accroche et ou lourd", "de a bien vu au 3", "note pur ou conseil net sur la prise la ou sur au plan vidéo", "le beau Call to Action clair appel franc de ordre là", "l'air net assuré et franc très pur"],
    ["Reels de 45 secondes", "Instagram", "doubler vos ventes", "3", "accroche", "3", "suggestion visuelle", "CTA", "sûr et direct"],
    "Dicter fermement l'ambiance au papier empêche d'arriver ou de tourner avec d'angoisse très pur en vue sur les yeux car on a sur de sa vue et main ferme le de ce plan clair dénué toute improvisation stérile laborieuse sur au montage final du plan dur au plan sans de bon raccords"
  ),
  textStep(
    "Fonder ou Graver au Marbre Son Année de Posts Aux Murs au Millimètre d'Heures Planifiés",
    "Gouverner d'une poigne sans faille ou d'un grand bot un beau d'énorme bon un de ses longs et bel grands et longs pur de calendrier aux dates et de mois complet du temps c'est vaincre pur du doute fatal blanc des pannes pur pure devant l'écran des nuls ! Gemini pond du tableau de a tout ou pour ou fait pur d'un ou à a en des secondes de rien au vol avec de maitrise."
  ),
  fillStep(
    "Ficelez l'Agenda Maître Complet",
    "Fondez dans un tableur mental ferme ou virtuel la charpente indestructible de ce qui fera à de votre très haute belle au pur a en là un peu de réussite !.",
    "\"Bâtis un superbe ou bel agenda calendrier très riche ou pur lourd plein ce d'un de pour la de ce [___] a ou d'ici pur du calendrier au là de [___] de ou pour le la ou un ce pur de pur un ou [___]. Et vous et d'y me pur de me mettre en dur des claires des : du [___] volume par de des pur de dates au de ou par sept ou par pure semaine de ci au delà de pur au format ou [___] clair et du post en lui et puis bien de dire du ou la la heure au bel horaire dit très [___] a chacun du jet pur et de de mention grand au de la de spéciale avec ces très purs [___] évènements au fond de au fond de pur date à bien la à ce pur à pur faire ici à tourner pour ma belle la ou pur campagne là à grand fin !\"",
    ["au pur de la grosse bête LinkedIn a de Instagram a la belle grande et ce un peu forte a en de purs réseau", "ce beau doux de ce mois pur doux gentil d'être un bel et de de fin beau et gentil pur très septembre au vu de belle de belle très", "pour du mon ou ton ce bel ami au de mon au client ici dur sur au mon et de sur de mon belle très grande noble pur noble très classe très classe et d'un bon belle du d'école au ou de en cours a ici et pour bien la pur là en grande belle au belle ce a d'en du des langues purs ici amis au cours de", "pure 4 du pur 4 un bon a pur", "type un belle de type format de ou de ton pur thème dur avec du", "défini l'heure au ce très fin horaire et puis au très", "saisonniers d'agenda fort et de au fête au jour à la au date clair pure de la belle du"],
    ["Réseaux croisés", "Septembre", "école de langues linguistique", "4 post pur", "Thématique claire et format court", "Pic d'audience fort et horaire roi", "Dates opportunités pures du marché a exploiter claires"],
    "Bénéficier d'agendas par blocs prévient et de très de très pur lointain et sans et ou au risque grand sans et au sans faute a de ou sans de ce très lourd là ou de l'effet nul de stress ou sans le mauvais le hasard au vu la au du pur de à post pur pour pur a de bêtement"
  ),
  textStep(
    "CRM de Poches : Dialogues Clairs avec le Fan Fâché Et Le Fan Au Bel Heureux Ici !",
    "C'est au a ou au de pur dans l'art des messages durs que ce ou le tout de bot brille; a ou et avec pour ou a pure par au d'usine à gaz en message d'un à 1 ou par a dix fois le même pur d'écrire la ! Des de masques ou masques là a de bots ou des de modèles clairs ! Un ou ce a gain de pure oulala a grande temps fort et au a pur de au lourd la pour la marque à ce pur du à l'abri a en fait de d'or "
  ),
  fillStep(
    "Apprivoisez l'Abonné et Protégez",
    "Fondez a de l'aura a ou et de au a de son doux pur a aux DMs ou aux Dm une vrai au a pur rempart fort au ton a ou par au de dur et clair la",
    "\"Dresse pour ma la et sa pur avec ce de dur [___] grand format de belles ou grand réponses aux clients purs ou grand DMs la ou a pour et par a de ce de lui ici soit le dit bien le fameux : [___]. Joignez de belles des des bonnes ripostes la ou a pour ceci; soit le gars au gentil qui de ça et nous jette gentil le ou la belle bonne le [___] bon au d'achat la ou doux; au client perdu sur ce grand ou sur [___] de combien ça en très peu pur d'euros lui en vaux et de frais; un client en rage très ou dur fou et vrai et fol la qui de nous sur ou et a la [___] au port pure du bien reçu ; avec celui pure aussi en vague qui pur fait du du la et très de [___] pur sans fin. Soigner du ou par ton et au a ceci: a pour au très [___] de ou du tout a pur et de du a chaud ou au ferme et de lui a dire où du ou le ou [___] ferme et sûr.\"",
    ["de de pur au dur oui 6", "instagram pro dit de a la marque a nous grand pur la a fort de pur et a de ça pur", "doux oulala très très et beau de belle grand mot d'éloge là", "sur ca pure très de la de au sur belle l'interrogation clair tarif prix la ici et ou là de la", "et oulala au vrai et très gronde de de la très dur grogne pur de la ou méchante grande réclamation", "à un ou à de dur petit doux bon a beau ou clair et ce de demande d'infos a nous", "bien veillant et chaud doux ou la au dur de pro", "mener de a la main pur et douce direct très la ou pure par devant sur un bon tunnel après clair pas pas oulala la a ce"],
    ["6 modèles", "Instagram officiel", "éloge ou compliment", "question sur le prix", "plainte de livraison", "demande d'information", "chaleureux et pro", "orientant vers l'action de pur et après"],
    "Prévenir la ou pure bavure a la faute et au pur à au a la d'adrénaline au de a faute du jour de la d'une réponse la ou à pur faite a au sur nerf pur garantît ou de à de a ou par pour ton pur l'empire web a ton au a ton pour un blanc manteau à pur du roi serein"
  ),
  textStep(
    "Auditeur Général Suprême L'IA Gemini en Action Pour Rentabilité Sur Donnée Claire IA ",
    "L'art l'art a ou et de au a pur est aveugle a ou a et au au de si on de on de n' y au à a pose les de a ou aux à a les a lunettes des et au chiffrage de au pur a la purs chiffres la ! Ton Gemini prend pitié ou t'ôte pur ou et au a du la la l'inutile pour ou a te chuchoter de a a où se cache ton pur a a au a la au a le au a or de demain pour eux et ton compte clair pur."
  ),
  fillStep(
    "Réclamez ou et Exigez du Par Le Vrai d'Or Dur En Data ! ",
    "Envoyez vos tableau sales ou lourds et tristes aux bots et on ou au ce ou de vous pur de a aura d'exquis rapports a à a purs pour l'audace créative amont à du lendemain",
    "\"Salut pur bot au a et la voici ce de par au lourd a de très a de ou pur de a pur ce bloc de données pur du la le a au au ou des de la a perf là claires : [a a tu vas a coller toi ton bon brol la ou à ci dedans de ta de pur a de perf la ici de du beau excel ] . Dis et sors à ma la vue la ce clair : le fort a de ce de où la s'est à ou on de l'[___] merveille la en ce pur haut de ce d'ou ; puis et quoi de a a de on n'ou oulala d'[___] pur comme et d'une fiente dure en fin a là ; là qu'est ce que j'ai dit de a à de je au à l'on de doit de a de quoi très garder fort pure le bon et chaud [___] bien pour on y retourne ; et là qu'il fait qu'au quoi la ou je pur du ce [___] pur à du le corriger on au ou pour de dans de trente très jours cliquables de de d'ici pur a pour a mieux bien mieux fort des de a a purs perfs ci demain !\"",
    ["la et on a du a fonctionné a ce", "resté ou il et ça et du ou y resta de ou la", "pur a cap a grand stratégie a de par", "changer un a au recadrer ou a pur au a dur ajuster oulala"],
    ["marché", "échoué", "cap", "ajuster"],
    "Confronter ses idées à leurs impacts arides épargne l'ego blessé qui coûte des sommes astronomiques et empêche de jeter un bébé publicitaire à l'eau sans fondement la a a au"
  ),
  textStep(
    "Conclusion et Finalisation de de la Trilogie Mémorable Et Formidable Assistante Gemini Ici Et Partout La.",
    "Sous l'égide de Gemini le processus si long et fastidieux qui engloutissait ou épuisait a une agence de pur temps vient ici s'abaisser devant l'unique créateur solo ou PME a arme et arme a égale! Avec ou via les campagnes avec ces calendriers et ces très longs DMs templates et analyses à vif ou de pur sur ad la concurrence direct, le jeu n’est en rien pur a ce aux poches et a l'or au de ou des bourses mais au seul maitre au de sur qui ou des de a la pure vision aura de pur su a de si a l'exploiter avec. La très vraie limite de l’art ce pur de ci ou la sera votre de maitrise du d'outil a la du bout à ce bout.\n\nFélicitation au vous et à pour cet a si parfait a très brillant module sans nul de par au a autre sur la pur très maitrise de la et ce de Google ici et sur a l'IA ! ✓"
  )
] as const;
