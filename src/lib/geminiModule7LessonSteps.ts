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
  quizStep(
    "Parceiro de Marketing Estratégico",
    "Por que o Gemini é especialmente útil para profissionais de marketing?",
    [
      "Garante que todo conteúdo gerado viralizará automaticamente",
      "Combina acesso à internet em tempo real com geração de conteúdo, análise de mercado e criação visual — tudo em uma única plataforma",
      "Substitui completamente a necessidade de uma equipe de marketing",
      "Funciona apenas para grandes empresas com orçamentos elevados"
    ],
    1,
    "A união de todas as ferramentas em uma única plataforma acelera a produtividade na execução e monitoramento das campanhas."
  ),
  textStep(
    "Criando Estratégias de Conteúdo",
    "O primeiro passo de qualquer ação de marketing é a estratégia. O Gemini monta um plano completo com base no seu negócio, público e objetivos."
  ),
  fillStep(
    "Crie sua estratégia!",
    "Preencha a lacuna para estruturar um planejamento estratégico no Gemini.",
    "\"Você é um estrategista de marketing digital. Crie uma estratégia de conteúdo para [______] para o mês de [______]. Inclua: [______] pilares temáticos, mix de [______], frequência de publicação, [______] ideias de pauta e as [______] métricas para acompanhar o sucesso.\"",
    ["o Instagram de uma clínica de estética", "agosto", "4", "formatos por plataforma", "12", "3 principais"],
    ["o Instagram de uma clínica de estética", "agosto", "4", "formatos por plataforma", "12", "3 principais"],
    "Sempre informe as restrições e o alvo para dar o direcionamento perfeito ao assistente."
  ),
  quizStep(
    "A Força do Contexto na Estratégia",
    "O que torna uma estratégia de conteúdo gerada pelo Gemini mais eficaz do que uma genérica?",
    [
      "O Gemini acessa os dados internos do seu perfil automaticamente",
      "Estratégias do Gemini sempre geram mais seguidores",
      "Quando você fornece contexto real — nicho, público, objetivo e tom da marca — o Gemini adapta cada elemento da estratégia à sua realidade específica",
      "Não faz diferença fornecer contexto ao pedir uma estratégia"
    ],
    2,
    "Dados contextualizados evitam respostas clichês e alinham o plano ao seu funil real de vendas e visibilidade."
  ),
  textStep(
    "Pesquisando Tendências de Marketing em Tempo Real",
    "Com acesso à internet, o Gemini identifica o que está funcionando agora — tendências de conteúdo, formatos em alta e comportamentos do consumidor atualizados."
  ),
  fillStep(
    "Pesquise tendências!",
    "Peça para o Gemini encontrar padrões de aumento e comportamento recente.",
    "\"Pesquise as principais [______] de marketing digital para o setor de [______] em [______]. Para cada tendência: explique o que é, por que está [______] e como uma marca de [______] pode aplicar nos próximos [______] dias.\"",
    ["tendências e estratégias", "alimentação saudável", "2025", "crescendo", "pequeno porte", "30"],
    ["tendências e estratégias", "alimentação saudável", "2025", "crescendo", "pequeno porte", "30"],
    "Estudar as tendências antes de produzir o conteúdo previne a queima gasta de cartuchos num formato ou tema defasado e clichê."
  ),
  quizStep(
    "Eficiência na Pesquisa Digital",
    "Por que usar o Gemini para pesquisar tendências é mais eficiente do que pesquisar manualmente?",
    [
      "Porque o Gemini cria as tendências do mercado",
      "Porque em vez de visitar dezenas de fontes e organizar as informações, você recebe uma síntese já contextualizada para o seu nicho e com sugestões de aplicação imediata",
      "Para evitar qualquer pesquisa adicional",
      "O Gemini só pesquisa tendências internacionais"
    ],
    1,
    "Recolher as informações em síntese, de modo crítico contra infinitos blogs ou vídeos do youtube, poupa muito o precioso tempo diário profissional."
  ),
  textStep(
    "Escrevendo Copies de Alta Conversão",
    "Uma copy poderosa é o coração de qualquer campanha. O Gemini domina os principais frameworks de persuasão e entrega textos prontos para usar."
  ),
  fillStep(
    "Crie sua copy!",
    "Utilize os famosos parâmetros PAS, AIDA ou PPPP na construção exata.",
    "\"Usando o framework [______], escreva uma copy de [______] para [______]. Público: [______]. Dor central: [______]. Apresente a solução como [______]. Finalize com uma [______] clara e urgente. Tom: [______].\"",
    ["PAS — Problema, Agitação, Solução", "vendas", "um curso online de organização financeira", "pessoas entre 25 e 40 anos com dívidas e sem controle do dinheiro", "falta de método e disciplina financeira", "o primeiro passo concreto para a liberdade financeira", "CTA", "direto e empático"],
    ["PAS — Problema, Agitação, Solução", "vendas", "um curso online de organização financeira", "pessoas entre 25 e 40 anos com dívidas e sem controle do dinheiro", "falta de método e disciplina financeira", "o primeiro passo concreto para a liberdade financeira", "CTA", "direto e empático"],
    "Traçar limites aos modelos o forçará a apresentar textos muito voltados para a psicologia persuasiva, não apenas redacionais de belas palavras vazias."
  ),
  quizStep(
    "Estruturando Ação",
    "Qual framework é mais indicado para uma copy que precisa gerar ação imediata?",
    [
      "Apenas listar os benefícios do produto sem estrutura",
      "Frameworks como AIDA ou PAS — que guiam o leitor da atenção à ação de forma estruturada e psicologicamente eficaz",
      "Escrever o texto mais longo possível para parecer mais completo",
      "O Gemini não consegue aplicar frameworks de copywriting"
    ],
    1,
    "As metodologias de redação testadas e validadas evitam argumentações falhas, arrastando naturalmente a persona para a página de vendas."
  ),
  textStep(
    "Criando Posts para Redes Sociais",
    "Do Instagram ao LinkedIn, o Gemini cria posts adaptados para cada plataforma — com gancho, desenvolvimento e CTA alinhados ao tom da marca."
  ),
  fillStep(
    "Crie seus posts!",
    "Passe os limitadores e estipule os gatilhos a serem aplicados a sua sequência semanal.",
    "\"Crie [______] posts para [______] sobre [______]. Para cada post: [______] que pare o scroll na primeira linha, [______] com no máximo [______] linhas e [______] clara no final. Tom: [______]. Inclua [______] hashtags relevantes.\"",
    ["5", "Instagram", "os benefícios do pilates para quem trabalha sentado", "gancho", "desenvolvimento", "4", "CTA", "informativo e próximo", "8"],
    ["5", "Instagram", "os benefícios do pilates para quem trabalha sentado", "gancho", "desenvolvimento", "4", "CTA", "informativo e próximo", "8"],
    "Fornecer parâmetros fixos confere segurança para posts muito alongados não assustarem seu provável seguidor do canal social digital específico que pede agilidade de scroll textuais dinâmicos."
  ),
  quizStep(
    "Estratégia Baseada em Canais",
    "Por que especificar a plataforma ao pedir posts para o Gemini melhora o resultado?",
    [
      "Para deixar o texto automaticamente mais curto",
      "Porque o Gemini tem restrições de conteúdo para cada rede",
      "Porque cada plataforma tem formato, extensão, tom e expectativa de engajamento específicos — e o Gemini adapta todos esses elementos quando sabe onde o conteúdo será publicado",
      "Não faz diferença especificar a plataforma"
    ],
    2,
    "A leitura no LinkedIn flui por histórias contadas em tópicos. O Instagram pede objetividade na legenda após a imagem ou reel visual. O modelo entende disso muito bem se lembrado!"
  ),
  textStep(
    "Criando Anúncios Pagos",
    "Para campanhas de tráfego pago, o Gemini cria variações de anúncios com diferentes ângulos — essencial para testar o que converte melhor com seu público."
  ),
  fillStep(
    "Crie seus anúncios!",
    "Desenvolva ângulos psicológicos para os Ads da rede e estude quais convertem mais fortemente.",
    "\"Crie [______] variações de anúncio para [______] no [______]. Público: [______]. Para cada variação: [______] com até 40 caracteres, [______] com até 125 caracteres e o [______] de abordagem usado — medo de perder, ganho desejado, [______] social ou urgência.\"",
    ["3", "um aplicativo de meditação para iniciantes", "Meta Ads", "adultos entre 28 e 45 anos com estresse e insônia", "headline", "texto principal", "ângulo", "prova"],
    ["3", "um aplicativo de meditação para iniciantes", "Meta Ads", "adultos entre 28 e 45 anos com estresse e insônia", "headline", "texto principal", "ângulo", "prova"],
    "Lembramos sempre do princípio dos gatilhos múltiplos. Tentar abordar uma objeção por vez possibilita achar rapidamente nosso ROI ideal ao subir o anúncio nas redes."
  ),
  quizStep(
    "Teste de Ângulos no Tráfego Múltiplo",
    "Por que criar múltiplas variações de anúncio com ângulos diferentes é importante?",
    [
      "Porque públicos diferentes respondem a gatilhos diferentes — testar ângulos variados é a forma mais eficiente de descobrir o que realmente converte para o seu produto e audiência",
      "Porque o Gemini exige pelo menos 3 versões para funcionar",
      "Para gastar mais budget em testes desnecessários",
      "Todas as variações geram o mesmo resultado independentemente do ângulo"
    ],
    0,
    "Descobrir um gargalo psicológico certo abaixa enormemente seus lances por clique. Multiplicar seu criativo em opções permite a escala infinita a quem anuncia."
  ),
  textStep(
    "Analisando a Concorrência",
    "Com acesso à internet, o Gemini pesquisa e analisa o que seus concorrentes estão fazendo — identificando oportunidades que você pode explorar."
  ),
  fillStep(
    "Analise seus concorrentes!",
    "Realce os buracos falhos do seu oponente direto nas mídias sociais a partir dessa prompt.",
    "\"Pesquise e analise as estratégias de marketing digital de [______] no mercado de [______]. Me traga: como eles se [______] nas redes sociais, quais [______] de conteúdo usam, os [______] mais comentados pelos clientes e as [______] que aparecem nas avaliações e que eu poderia [______] como oportunidade.\"",
    ["os 3 principais concorrentes", "moda sustentável feminina", "comunicam", "formatos", "pontos fortes", "fraquezas", "explorar"],
    ["os 3 principais concorrentes", "moda sustentável feminina", "comunicam", "formatos", "pontos fortes", "fraquezas", "explorar"],
    "Observar sem paixão as críticas nas postagens alheias dão pistas preciosas e ouro inestimável na sua oferta primária exclusiva do que não fazer mal feito de jeito nenhum no seu próprio jardim criativo."
  ),
  quizStep(
    "Aplicação de Inteligência Competitiva Digital",
    "O que fazer com a análise da concorrência gerada pelo Gemini?",
    [
      "Copiar exatamente o que os concorrentes estão fazendo",
      "Identificar lacunas no mercado, aprender com o que está funcionando e criar uma estratégia diferenciada que destaque os pontos onde você pode ser superior",
      "Ignorar o que está funcionando para eles",
      "Usar a análise apenas para criticar os concorrentes"
    ],
    1,
    "Sintetizar dores negligenciadas pelos rivais consolida sua autoridade como salvador que resolverá tal lacuna pendente real dos prospectos ignorados ali do lado no mercado!"
  ),
  textStep(
    "Criando Roteiros para Vídeos de Marketing",
    "Vídeos são o formato de maior alcance orgânico. O Gemini roteiriza qualquer formato — do Reels de 15 segundos ao vídeo longo de vendas."
  ),
  fillStep(
    "Roteirize seu vídeo!",
    "Delimite não apenas as falas do vídeo da marca da campanha sua na rede ou blog ou youtube mas também todo roteiro de cortes da edição necessária de visual visualizações.",
    "\"Crie um roteiro de [______] para [______] sobre [______]. Nos primeiros [______] segundos: [______] que gere curiosidade imediata. Desenvolvimento em [______] blocos com [______] de imagem para cada um. Finalização com [______] direta. Tom: [______].\"",
    ["Reels de 45 segundos", "Instagram", "como dobrar as vendas em 30 dias com marketing orgânico", "3", "gancho", "3", "sugestão", "CTA", "confiante e direto"],
    ["Reels de 45 segundos", "Instagram", "como dobrar as vendas em 30 dias com marketing orgânico", "3", "gancho", "3", "sugestão", "CTA", "confiante e direto"],
    "Delegar o corte fílmico antecipadamente assegura que no set tudo estará fluído, ágil, assertivamente capturado ao estilo visual idealizado com o tom de brand planejado."
  ),
  quizStep(
    "A Relevância da B-Roll Escrita em Scripts Roteirizados e Planos na Geração Fiel ao Resultado Esperado",
    "Por que incluir sugestões de imagem no roteiro de marketing melhora a produção?",
    [
      "Porque o Gemini grava o vídeo automaticamente com essas sugestões",
      "Porque você chega na gravação sabendo exatamente o que mostrar em cada momento — garantindo coerência entre o que é falado e o que é visto e reduzindo o tempo de produção",
      "Para deixar o roteiro mais longo e impressionante",
      "Sugestões visuais só funcionam para produções com equipe profissional"
    ],
    1,
    "Um falante parado do começo ao fim cansa na velocidade temporal das telas digitais. Dirigir insertes dinâmicos sustenta o público plugado com as variações que casam o escutado às mídias exibidas simultaneamente sem grandes e desastrosas rupturas temporais visíveis ali."
  ),
  textStep(
    "Planejando Calendários Editoriais",
    "Um calendário editorial bem planejado é o que separa marcas consistentes de perfis irregulares. O Gemini monta o mês inteiro em minutos."
  ),
  fillStep(
    "Monte seu calendário!",
    "Planeje sua agenda aprofundadamente sem sofrer de branco diário.",
    "\"Crie um calendário editorial para [______] do mês de [______] para [______]. Inclua: [______] publicações por semana, [______] de cada post, [______] indicado para cada conteúdo e [______] especiais do mês que podem ser exploradas pela marca.\"",
    ["Instagram e LinkedIn", "setembro", "uma escola de idiomas", "4", "tema e formato", "melhor horário", "datas"],
    ["Instagram e LinkedIn", "setembro", "uma escola de idiomas", "4", "tema e formato", "melhor horário", "datas"],
    "Programe sazonalidades antes delas chegarem ajuda seu brand de surfar marés ricas gratuitas a bordo de pautas globais na tendência momentânea já predefinida e sem imprevistos estressantes sem fim."
  ),
  quizStep(
    "Vantagens do Panorama Periódico Geral Sem Faltas na Grade ao Final Das Folhas Exibir Um Norte Total Planejado Seguro e Certo Ao Negócio e Profissional De Marketing Nele",
    "Qual é a principal vantagem de ter um calendário editorial montado com antecedência?",
    [
      "Permite planejar com consistência, aproveitar datas estratégicas e evitar a pressão de criar conteúdo de última hora — o que geralmente resulta em posts sem estratégia",
      "Garante que todos os posts terão alto engajamento",
      "Elimina a necessidade de criar conteúdo novo todo mês",
      "Calendários editoriais só funcionam para marcas com mais de 10 mil seguidores"
    ],
    0,
    "Criar no susto gera publicações avulsas sem apelo comercial, empobrecidas e destoantes com seus pilares mestre."
  ),
  textStep(
    "Respondendo Comentários e Gerenciando Comunidade",
    "Uma das tarefas mais repetitivas do marketing é responder comentários e mensagens. O Gemini cria templates que mantêm o tom da marca e economizam tempo."
  ),
  fillStep(
    "Gerencie sua comunidade!",
    "Construa a estrutura de moderação acolhedora que blinda as relações e apaga incêndios na primeira chama sem se perder fora.",
    "\"Crie [______] templates de resposta para comentários e DMs do [______]. Inclua respostas para: [______] ao produto, [______] sobre preço, [______] de entrega e [______] de mais informações. Tom: [______] e sempre [______].\"",
    ["6", "Instagram da marca", "elogio", "dúvida", "reclamação", "pedido", "acolhedor e profissional", "direcionando para o próximo passo"],
    ["6", "Instagram da marca", "elogio", "dúvida", "reclamação", "pedido", "acolhedor e profissional", "direcionando para o próximo passo"],
    "Tratar as dores prontamente, seja com acolhimento afetuoso de gratidão ou calma institucional corporativa assertiva de suporte sem gaguejos ou lentidão prolongada constrói autoridade de ponta com excelência inquestionável frente do potencial faturamento do final da conversa via chat."
  ),
  quizStep(
    "PADRÃO ESCALÁVEL DO RETORNO BÁSICO EFICIENTE E FIEL DE CADA CASO EM SAC RESPONDÍVEL PRONTO PRO ENGAJAMENTO RÁPIDO PARA FRENTE DA EMPRESA.",
    "Por que ter templates de resposta preparados pelo Gemini é estratégico para marcas?",
    [
      "Para responder sem precisar ler o comentário do cliente",
      "Porque respostas automáticas geram mais engajamento",
      "Porque garante consistência de tom e agilidade no atendimento — dois fatores que impactam diretamente a percepção da marca e a satisfação do cliente",
      "Templates só funcionam para marcas grandes com muitos comentários"
    ],
    2,
    "Múltiplos moderadores com mesma máscara de arquétipo textual mantem uma personalidade da sua instituição coesa perante do imenso globo online não transparecendo o volume imenso de amadores espalhados fazendo mau suas gestões de marca nas redes sem padrões definidos."
  ),
  textStep(
    "Mensurando Resultados com o Gemini",
    "Depois de executar as ações, o Gemini ajuda a interpretar os dados — transformando números em insights e decisões estratégicas para o próximo período."
  ),
  fillStep(
    "Analise seus resultados!",
    "Copie a planilha analítica bruta para pedir diagnósticos.",
    "\"Aqui estão os dados de desempenho das minhas ações de marketing do último mês: [cole os dados]. Analise e me diga: o que [______] bem, o que [______] abaixo do esperado, qual [______] devo manter e o que devo [______] nos próximos 30 dias para melhorar os resultados.\"",
    ["funcionou", "ficou", "estratégia", "ajustar"],
    ["funcionou", "ficou", "estratégia", "ajustar"],
    "Ler dados isolados cega diretores de criação ou donos inexperientes nas entrelinhas ou entrelaçamentos cruzados revelados pelas estatísticas ocultas lógicas interpretado ao largo pelo assistente de Inteligência Artificial para não recair jamais nelas outra oportunidade perdida novamente no ciclo das publicações adiante das vindouras datas no final de uma má e fracassada campanha atual de teste ou publicações fracas sem impacto social ou comercial desejado"
  ),
  quizStep(
    "Auditoria Orientada à Nova Melhoria Progressiva Sem Fim Sobre Campanha Atual Fechada Com Seu Bot De Apoio IA Ao Invés De Paralisar Ao Término Desta Na Espera Dos Gráficos Puros Inerentes Pós Dados Lançados Lá",
    "Qual é o uso mais estratégico do Gemini na fase de análise de resultados?",
    [
      "Usar os dados apenas para criar relatórios bonitos",
      "Cruzar os dados de desempenho com o contexto da sua estratégia e pedir ao Gemini para identificar padrões, causas e ajustes concretos para o próximo ciclo",
      "Pedir ao Gemini para garantir que os próximos resultados serão melhores",
      "O Gemini não consegue interpretar dados de marketing"
    ],
    1,
    "Uma planilha inerte torna-se um consultor executivo impagável se pedirmos ao modelo por planos retificadores para realinharmos a falha vista e extração contínua ininterrupta aos aprendizados a um próximo passo rumo ao melhor de mais alta acuidade de ROI e faturamento total sempre subindo aos picos do funil mercadológico comercial e vendas gerais do negócio e empresa."
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
  quizStep(
    "Strategic Marketing Partner",
    "Why is Gemini especially useful for marketing professionals?",
    [
      "It guarantees that all generated content will automatically go viral",
      "It combines real-time internet access with content generation, market analysis, and visual creation — all on a single platform",
      "It completely replaces the need for a marketing team",
      "It only works for large companies with high budgets"
    ],
    1,
    "The integration of all tools on a single platform accelerates productivity in the execution and monitoring of campaigns."
  ),
  textStep(
    "Creating Content Strategies",
    "The first step of any marketing action is strategy. Gemini builds a complete plan based on your business, audience, and goals."
  ),
  fillStep(
    "Create your strategy!",
    "Fill in the blank to structure a strategic plan in Gemini.",
    "\"You are a digital marketing strategist. Create a content strategy for [______] for the month of [______]. Include: [______] thematic pillars, a mix of [______], posting frequency, [______] content ideas, and the [______] metrics to track success.\"",
    ["the Instagram of a beauty clinic", "August", "4", "formats per platform", "12", "top 3"],
    ["the Instagram of a beauty clinic", "August", "4", "formats per platform", "12", "top 3"],
    "Always state constraints and targets to give the assistant the perfect direction."
  ),
  quizStep(
    "The Power of Context in Strategy",
    "What makes a content strategy generated by Gemini more effective than a generic one?",
    [
      "Gemini automatically accesses the internal data of your profile",
      "Gemini strategies always generate more followers",
      "When you provide real context — niche, audience, goal, and brand tone — Gemini adapts each element of the strategy to your specific reality",
      "It makes no difference to provide context when asking for a strategy"
    ],
    2,
    "Contextualized data prevents cliché responses and aligns the plan with your actual sales and visibility funnel."
  ),
  textStep(
    "Researching Marketing Trends in Real-Time",
    "With internet access, Gemini identifies what's working right now — content trends, trending formats, and updated consumer behavior."
  ),
  fillStep(
    "Research trends!",
    "Ask Gemini to find patterns of growth and recent behavior.",
    "\"Research the main [______] of digital marketing for the [______] sector in [______]. For each trend: explain what it is, why it is [______], and how a [______] brand can apply it in the next [______] days.\"",
    ["trends and strategies", "healthy eating", "2025", "growing", "small", "30"],
    ["trends and strategies", "healthy eating", "2025", "growing", "small", "30"],
    "Studying trends before producing content prevents burning through efforts on an outdated, cliché format or theme."
  ),
  quizStep(
    "Efficiency in Digital Research",
    "Why is using Gemini to research trends more efficient than manually researching?",
    [
      "Because Gemini creates the market trends",
      "Because instead of visiting dozens of sources and organizing information, you receive a synthesis already contextualized for your niche with immediate application suggestions",
      "To avoid any additional research",
      "Gemini only researches international trends"
    ],
    1,
    "Gathering synthesized information critically against endless blogs or YouTube videos saves precious daily professional time."
  ),
  textStep(
    "Writing High-Converting Copy",
    "Powerful copy is the heart of any campaign. Gemini masters the main persuasion frameworks and delivers ready-to-use texts."
  ),
  fillStep(
    "Create your copy!",
    "Use famous parameters like PAS, AIDA, or PPPP in the exact construction.",
    "\"Using the [______] framework, write [______] copy for [______]. Audience: [______]. Core pain point: [______]. Present the solution as [______]. Finish with a clear and urgent [______]. Tone: [______].\"",
    ["PAS — Problem, Agitation, Solution", "sales", "an online financial organization course", "people between 25 and 40 in debt and struggling with money", "lack of method and financial discipline", "the first concrete step towards financial freedom", "CTA", "direct and empathetic"],
    ["PAS — Problem, Agitation, Solution", "sales", "an online financial organization course", "people between 25 and 40 in debt and struggling with money", "lack of method and financial discipline", "the first concrete step towards financial freedom", "CTA", "direct and empathetic"],
    "Setting limits on frameworks forces it to generate texts sharply focused on persuasive psychology, not just empty, pretty words."
  ),
  quizStep(
    "Structuring Action",
    "Which framework is best suited for copy that needs to drive immediate action?",
    [
      "Just listing product benefits without structure",
      "Frameworks like AIDA or PAS — which guide the reader from attention to action in a structured and psychologically effective way",
      "Writing the longest text possible so it seems complete",
      "Gemini cannot apply copywriting frameworks"
    ],
    1,
    "Tested and validated writing methodologies prevent flawed arguments, naturally dragging the persona to the sales page."
  ),
  textStep(
    "Creating Social Media Posts",
    "From Instagram to LinkedIn, Gemini creates posts tailored to each platform — with hooks, development, and CTAs aligned with the brand's tone."
  ),
  fillStep(
    "Create your posts!",
    "Provide limiters and stipulate the triggers to be applied to your weekly sequence.",
    "\"Create [______] posts for [______] about [______]. For each post: a [______] that stops the scroll on the first line, a [______] with a maximum of [______] lines, and a clear [______] at the end. Tone: [______]. Include [______] relevant hashtags.\"",
    ["5", "Instagram", "the benefits of pilates for those who work sitting down", "hook", "development", "4", "CTA", "informative and approachable", "8"],
    ["5", "Instagram", "the benefits of pilates for those who work sitting down", "hook", "development", "4", "CTA", "informative and approachable", "8"],
    "Providing fixed parameters provides safety so that excessively long posts don't scare off your likely follower on the specific social channel that demands quick dynamic text scrolling."
  ),
  quizStep(
    "Channel-Based Strategy",
    "Why does specifying the platform when requesting posts from Gemini improve the result?",
    [
      "To automatically make the text shorter",
      "Because Gemini has content restrictions for each network",
      "Because each platform has specific formats, lengths, tones, and expectations for engagement — and Gemini adapts all these elements when it knows where the content will be published",
      "Specifying the platform makes no difference"
    ],
    2,
    "Reading on LinkedIn flows through stories told in topics. Instagram demands objectivity in the caption after a visual reel. The model understands this very well if reminded!"
  ),
  textStep(
    "Creating Paid Ads",
    "For paid traffic campaigns, Gemini creates ad variations with different angles — essential for testing what converts best with your audience."
  ),
  fillStep(
    "Create your ads!",
    "Develop psychological angles for network Ads and study which convert most strongly.",
    "\"Create [______] ad variations for [______] on [______]. Audience: [______]. For each variation: an [______] of up to 40 characters, [______] of up to 125 characters, and the approach [______] used — fear of missing out, desired gain, social [______], or urgency.\"",
    ["3", "a meditation app for beginners", "Meta Ads", "adults between 28 and 45 with stress and insomnia", "headline", "main text", "angle", "proof"],
    ["3", "a meditation app for beginners", "Meta Ads", "adults between 28 and 45 with stress and insomnia", "headline", "main text", "angle", "proof"],
    "We always remember the principle of multiple triggers. Attempting to address one objection at a time makes it possible to quickly find our ideal ROI when launching the ad on the networks."
  ),
  quizStep(
    "Angle Testing Multi-Traffic",
    "Why is creating multiple ad variations with different angles important?",
    [
      "Because different audiences respond to different triggers — testing varying angles is the most efficient way to discover what truly converts for your product and audience",
      "Because Gemini requires at least 3 versions to work",
      "To spend more budget on unnecessary tests",
      "All variations generate the same result regardless of the angle"
    ],
    0,
    "Discovering the right psychological bottleneck dramatically lowers your cost per click. Multiplying your creative options allows infinite scale for advertisers."
  ),
  textStep(
    "Analyzing the Competition",
    "With internet access, Gemini researches and analyzes what your competitors are doing — identifying opportunities you can exploit."
  ),
  fillStep(
    "Analyze your competitors!",
    "Highlight the blind spots of your direct opponent on social media using this prompt.",
    "\"Research and analyze the digital marketing strategies of [______] in the [______] market. Bring me: how they [______] on social media, what content [______] they use, the [______] most commented on by customers, and the [______] appearing in reviews that I could [______] as an opportunity.\"",
    ["the top 3 competitors", "sustainable women's fashion", "communicate", "formats", "strengths", "weaknesses", "exploit"],
    ["the top 3 competitors", "sustainable women's fashion", "communicate", "formats", "strengths", "weaknesses", "exploit"],
    "Dispassionately observing criticisms on others' posts gives precious clues and priceless gold for your exclusive primary offer of what absolutely not to do poorly in your own creative garden."
  ),
  quizStep(
    "Applying Digital Competitive Intelligence",
    "What should you do with the competitor analysis generated by Gemini?",
    [
      "Copy exactly what competitors are doing",
      "Identify gaps in the market, learn from what is working, and create a differentiated strategy that highlights the areas where you can be superior",
      "Ignore what is working for them",
      "Use the analysis only to criticize competitors"
    ],
    1,
    "Synthesizing neglected pain points from rivals solidifies your authority as the savior who will solve that actual pending gap for ignored prospects right next door in the market!"
  ),
  textStep(
    "Creating Scripts for Marketing Videos",
    "Videos are the format with the highest organic reach. Gemini scripts any format — from a 15-second Reel to a long-form sales video."
  ),
  fillStep(
    "Script your video!",
    "Define not just the spoken lines of your brand's video for social media, blogs, or YouTube, but the entire editing cut sequence needed for visual flair.",
    "\"Create a [______] script for [______] about [______]. In the first [______] seconds: a [______] that generates immediate curiosity. Development spread over [______] blocks with an image [______] for each one. Direct [______] to finish. Tone: [______].\"",
    ["45-second Reel", "Instagram", "how to double sales in 30 days with organic marketing", "3", "hook", "3", "suggestion", "CTA", "confident and direct"],
    ["45-second Reel", "Instagram", "how to double sales in 30 days with organic marketing", "3", "hook", "3", "suggestion", "CTA", "confident and direct"],
    "Delegating film cuts in advance ensures that on set everything will be fluid, agile, and assertively captured in the idealized visual style aligned with the planned brand tone."
  ),
  quizStep(
    "The Relevance of Written B-Roll in Scripted Storyboards",
    "Why does including image suggestions in the marketing script improve production?",
    [
      "Because Gemini automatically records the video with these suggestions",
      "Because you arrive at the filming knowing exactly what to show at each moment — ensuring coherence between what is spoken and what is seen, while reducing production time",
      "To make the script longer and more impressive",
      "Visual suggestions only work for professional crew productions"
    ],
    1,
    "A static speaker from start to finish fatigues viewers considering the fast temporal pace of digital screens. Directing dynamic inserts keeps the audience hooked with variations that match the audio to the visuals without disastrous temporal breaks."
  ),
  textStep(
    "Planning Editorial Calendars",
    "A well-planned editorial calendar separates consistent brands from erratic profiles. Gemini plots the entire month in minutes."
  ),
  fillStep(
    "Plan your calendar!",
    "Plan your schedule deeply to avoid daily creative blocks.",
    "\"Create an editorial calendar for [______] for the month of [______] for [______]. Include: [______] publications per week, the [______] of each post, the [______] indicated for each piece of content, and special [______] of the month that the brand could exploit.\"",
    ["Instagram and LinkedIn", "September", "a language school", "4", "theme and format", "best time", "dates"],
    ["Instagram and LinkedIn", "September", "a language school", "4", "theme and format", "best time", "dates"],
    "Programming seasonal peaks before they arrive helps your brand ride rich, free waves atop global trends that are predefined, averting endless stressful surprises."
  ),
  quizStep(
    "Advantages of an Unbroken General Periodic Overview",
    "What is the main advantage of having an editorial calendar built in advance?",
    [
      "It allows you to plan with consistency, leverage strategic dates, and avoid the pressure of creating last-minute content — which usually results in unstrategic posts",
      "It guarantees that all posts will have high engagement",
      "It eliminates the need to create new content every month",
      "Editorial calendars only work for brands with over 10k followers"
    ],
    0,
    "Creating in a panic generates standalone posts lacking commercial appeal, looking impoverished and disconnected from your master pillars."
  ),
  textStep(
    "Replying to Comments and Community Management",
    "One of marketing's most repetitive tasks is answering comments and messages. Gemini creates templates that maintain brand tone and save time."
  ),
  fillStep(
    "Manage your community!",
    "Build a welcoming moderation structure that shields relationships and puts out fires right at the first spark without getting lost.",
    "\"Create [______] reply templates for comments and DMs for [______]. Include responses for: a product [______], a pricing [______], a delivery [______], and a [______] for more info. Tone: [______] and always [______].\"",
    ["6", "the brand's Instagram", "compliment", "question", "complaint", "request", "welcoming and professional", "directing to the next step"],
    ["6", "the brand's Instagram", "compliment", "question", "complaint", "request", "welcoming and professional", "directing to the next step"],
    "Promptly addressing pain points—whether through warm institutional gratitude or calm, assertive corporate support without stutters—builds undisputed leading authority ahead of chat potential."
  ),
  quizStep(
    "Scalable Standard of Fundamental Efficient Direct Returns",
    "Why is having response templates prepared by Gemini strategic for brands?",
    [
      "To answer without needing to read the client’s comment",
      "Because automatic responses generate more engagement",
      "Because it ensures tone consistency and agility in customer service — two factors directly impacting brand perception and customer satisfaction",
      "Templates only work for huge brands with loads of comments"
    ],
    2,
    "Multiple moderators sharing the same textual archetype mask maintain a cohesive institutional brand personality before the massive online globe, never looking like scattered amateurs."
  ),
  textStep(
    "Measuring Results with Gemini",
    "After executing actions, Gemini helps interpret the data — turning numbers into insights and strategic decisions for the next period."
  ),
  fillStep(
    "Analyze your results!",
    "Copy raw analytics spreadsheets to request diagnoses.",
    "\"Here is the performance data for my marketing actions from last month: [paste data]. Analyze and tell me: what [______] well, what [______] below expectations, which [______] I should keep, and what I must [______] over the next 30 days to improve the outcomes.\"",
    ["worked", "fell", "strategy", "adjust"],
    ["worked", "fell", "strategy", "adjust"],
    "Reading isolated data blinds creative directors or inexperienced owners between the lines revealed by hidden statistical logic, stopping them from wasting potential future campaigns."
  ),
  quizStep(
    "Auditing Geared Toward Progressive Unending Improvement",
    "What is the most strategic use of Gemini during the results analysis phase?",
    [
      "Using the data just to make pretty reports",
      "Crossing performance data with the context of your strategy and asking Gemini to identify patterns, causes, and concrete tweaks for the next cycle",
      "Asking Gemini to guarantee that the next results will be better",
      "Gemini cannot interpret marketing data"
    ],
    1,
    "An inert spreadsheet becomes an unpayable executive consultant when you ask the model for rectification plans to realign the exposed flaw and continuously extract learnings for infinite ROI climbing."
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
  quizStep(
    "Socio Estratégico de Marketing",
    "¿Por qué Gemini es especialmente útil para profesionales del marketing?",
    [
      "Garantiza que todo el contenido generado se viralice automáticamente",
      "Combina acceso a internet en tiempo real con generación de contenido, análisis de mercado y creación visual, todo en una sola plataforma",
      "Reemplaza completamente la necesidad de un equipo de marketing",
      "Funciona solo para grandes empresas con presupuestos elevados"
    ],
    1,
    "La unión de todas las herramientas en una plataforma única reduce fricciones y acelera la productividad al ejecutar campañas."
  ),
  textStep(
    "Creando Estrategias de Contenido",
    "El primer paso de cualquier acción de marketing es la estrategia. Gemini arma un plan completo basado en tu negocio, público y objetivos."
  ),
  fillStep(
    "¡Crea tu estrategia!",
    "Completa el espacio para estructurar un plan estratégico en Gemini.",
    "\"Eres un estratega de marketing digital. Crea una estrategia de contenido para [______] para el mes de [______]. Incluye: [______] pilares temáticos, mix de [______], frecuencia de publicación, [______] ideas de pauta y las [______] métricas para medir el éxito.\"",
    ["el Instagram de una clínica de estética", "agosto", "4", "formatos por plataforma", "12", "3 principales"],
    ["el Instagram de una clínica de estética", "agosto", "4", "formatos por plataforma", "12", "3 principales"],
    "Siempre proporciona el contexto real y las restricciones deseadas para un plan certero y enfocado."
  ),
  quizStep(
    "La Fuerza del Contexto en la Estrategia",
    "¿Qué hace que una estrategia de contenido generada por Gemini sea más eficaz que una genérica?",
    [
      "Gemini accede a los datos internos de tu perfil automáticamente",
      "Las estrategias de Gemini siempre generan más seguidores",
      "Cuando proporcionas un contexto real (nicho, público, objetivo y tono de la marca), Gemini adapta cada elemento a tu realidad específica",
      "No hace diferencia proporcionar contexto al pedir una estrategia"
    ],
    2,
    "Los datos contextualizados previenen respuestas trilladas y encauzan el plan hacia tu verdadero embudo de ventas."
  ),
  textStep(
    "Investigando Tendencias de Marketing en Tiempo Real",
    "Con acceso a internet, Gemini identifica lo que funciona ahora mismo: tendencias de contenido, formatos en alta y comportamiento del consumidor actualizados."
  ),
  fillStep(
    "¡Investiga tendencias!",
    "Pídele a Gemini que descubra patrones de aumento y comportamientos actuales.",
    "\"Investiga las principales [______] de marketing digital para el sector de [______] en [______]. Por cada tendencia: explica qué es, por qué está [______] y cómo una marca [______] puede aplicarla en los próximos [______] días.\"",
    ["tendencias y estrategias", "alimentación saludable", "2025", "creciendo", "pequeña", "30"],
    ["tendencias y estrategias", "alimentación saludable", "2025", "creciendo", "pequeña", "30"],
    "Estudiar tendencias antes de producir previene gastar balas en temas pasados de moda."
  ),
  quizStep(
    "Eficiencia en la Investigación Digital",
    "¿Por qué investigar tendencias con Gemini es más eficiente que hacerlo manualmente?",
    [
      "Porque Gemini inventa las tendencias de mercado",
      "Porque en vez de visitar docenas de fuentes y ordenar la información, recibes una síntesis ya contextualizada para tu nicho con la aplicación inmediata sugerida",
      "Para evitar investigar por tu cuenta completamente",
      "Gemini solo investiga tendencias internacionales de EE.UU."
    ],
    1,
    "Recabar la síntesis estructurada evita perder horas filtrando artículos repetitivos en buscadores clásicos."
  ),
  textStep(
    "Escribiendo Copies de Alta Conversión",
    "Un copy poderoso es el corazón de cualquier campaña. Gemini domina los principales frameworks de persuasión y entrega textos listos para usar."
  ),
  fillStep(
    "¡Crea tu copy!",
    "Utiliza los conocidos parámetros PAS, AIDA o PPPP en la redacción persuasiva.",
    "\"Usando el framework [______], escribe un copy de [______] para [______]. Público: [______]. Dolor central: [______]. Presenta la solución como [______]. Finaliza con un [______] claro y urgente. Tono: [______].\"",
    ["PAS — Problema, Agitación, Solución", "ventas", "un curso online de organización financiera", "personas entre 25 y 40 años endudadas y sin control del dinero", "falta de método y disciplina financiera", "el primer paso concreto hacia la libertad financiera", "CTA", "directo y empático"],
    ["PAS — Problema, Agitation, Solución", "ventas", "un curso online de organización financiera", "personas entre 25 y 40 años endudadas y sin control del dinero", "falta de método y disciplina financiera", "el primer paso concreto hacia la libertad financiera", "CTA", "directo y empático"],
    "Trazar límites metodológicos lo fuerza a entregar textos anclados en psicología pura de ventas, no palabrería vacía."
  ),
  quizStep(
    "Estructurando la Acción",
    "¿Qué framework es más indicado para un copy que necesita generar acción inmediata?",
    [
      "Listar meramente los beneficios técnicos sin pensar demasiado",
      "Frameworks como AIDA o PAS, que guían al lector desde la atención hasta la acción de forma estructurada y psicológicamente eficaz",
      "Escribir lo más largo posible para asombrar por volumen",
      "Gemini jamás logra aplicar frameworks de copy publicitario"
    ],
    1,
    "Seguir metodologías probadas arrastra al usuario naturalmente, sin sobresaltos, hasta el botón de compra."
  ),
  textStep(
    "Creando Posts para Redes Sociales",
    "Desde Instagram hasta LinkedIn, Gemini crea posts adaptados para cada plataforma (con gancho, desarrollo y CTA) aliñados al tono original de tu marca."
  ),
  fillStep(
    "¡Crea tus posts!",
    "Estipula los disparadores y límites de volumen para la semana entera.",
    "\"Crea [______] posts para [______] sobre [______]. Para cada post: un [______] que frene el scroll en la primera línea, el [______] con un máximo de [______] líneas y un [______] claro al final. Tono: [______]. Incluye [______] hashtags relevantes.\"",
    ["5", "Instagram", "los beneficios del pilates para quienes trabajan sentados", "gancho", "desarrollo", "4", "CTA", "informativo y cercano", "8"],
    ["5", "Instagram", "los beneficios del pilates para quienes trabajan sentados", "gancho", "desarrollo", "4", "CTA", "informativo y cercano", "8"],
    "Acotar la longitud le brinda al chatbot el límite necesario para no soltar muros de texto espantosos en redes dinámicas de consumo rápido."
  ),
  quizStep(
    "Estrategia Basada en Canales",
    "¿Por qué especificar la plataforma al pedir posts a Gemini mejora tanto el resultado?",
    [
      "Para que acorte todo texto que genere automáticamente a 3 palabras",
      "Porque Gemini sufre bloqueos y restricciones pesadas de cada red",
      "Porque cada plataforma tiene formato, extensión, tono y expectativa de engagement específicos; Gemini adapta esos elementos cuando sabe en dónde se publicará",
      "Darle la red no cambia en absoluto el texto resultante"
    ],
    2,
    "LinkedIn pide narrativas formales con historias. Instagram exige imágenes y textos concisos al pie. Nombrar la app activa estas configuraciones en su núcleo semántico."
  ),
  textStep(
    "Creando Anuncios Pagados",
    "Para campañas de tráfico pago, Gemini crea variaciones de anuncios con diferentes ángulos; tácticas esenciales para probar empíricamente qué convierte mejor con tu audiencia."
  ),
  fillStep(
    "¡Crea tus anuncios!",
    "Aborda distintas motivaciones psicológicas en Ads probando múltiples ganchos directos a la psiquis del cliente.",
    "\"Crea [______] variaciones de anuncio para [______] en [______]. Público: [______]. Para cada variación: un [______] con hasta 40 caracteres, un [______] con hasta 125 caracteres y el [______] de abordaje usado — miedo a perderlo, ganancia deseada, [______] social o urgencia.\"",
    ["3", "una aplicación de meditación para principiantes", "Meta Ads", "adultos entre 28 y 45 años con estrés e insomnio", "título", "texto principal", "ángulo", "prueba"],
    ["3", "una aplicación de meditación para principiantes", "Meta Ads", "adultos entre 28 y 45 años con estrés e insomnio", "título", "texto principal", "ángulo", "prueba"],
    "Separar las motivaciones es la ley primera del test A/B en Ads. Probar distintos abordajes desvela rápidamente la ruta de oro para bajar el CPA."
  ),
  quizStep(
    "Ángulos Semánticos en Tráfico",
    "¿Por qué crear múltiples variaciones de anuncio con ángulos diferentes es valioso?",
    [
      "Porque públicos diferentes responden a gatillos diferentes. Probar ángulos variados es la forma más eficiente de saber qué convierte verdaderamente con tu producto y audiencia",
      "Porque Gemini precisa que le pidan al menos tres para operar bien el script interno de redes sociales sin generar pantallazos grises en vez de foto",
      "Para presumir grandes sumas invertidas ante clientes escépticos.",
      "Siempre da la misma cifra final sin importar el texto si el nicho es el mismo de igual tamaño publicitario"
    ],
    0,
    "Dar en la tecla del dolor exacto abarata muchísimo el costo por registro, y Gemini escupe las variantes base listas para que inicies los tests multiplicando las chances de embocar el premio gordo orgánico."
  ),
  textStep(
    "Analizando la Competencia",
    "Con internet libre, Gemini revisa lo que tus competidores traman, trazando un radiograma de grandes fisuras vacantes que tú deberías explotar para brillar allí."
  ),
  fillStep(
    "¡Analiza a tus rivales!",
    "Destaca sin compasión los puntos flojos contrarios utilizando al chatbot espía.",
    "\"Investiga y analiza las estrategias de marketing digital de [______] en el mercado de [______]. Tráeme: cómo se [______] en redes sociales, qué [______] de contenido usan, los [______] más elogiados por clientes y las [______] mostradas en reviews que yo podría [______] como gran oportunidad.\"",
    ["los 3 principales competidores", "moda sustentable femenina", "comunican", "formatos", "puntos fuertes", "debilidades", "explotar"],
    ["los 3 principales competidores", "moda sustentable femenina", "comunican", "formatos", "puntos fuertes", "debilidades", "explotar"],
    "Sintetizar las miserias del rival reveladas al público te eleva naturalmente como el proveedor infalible superior prometiendo no repetirlas nunca jamás sobre una base fresca y blindada."
  ),
  quizStep(
    "Aplicación Práctica de Inteligencia Rival",
    "¿Qué se recomienda hacer puramente al final con un análisis competitivo generado por el grandioso Gemini?",
    [
      "Copiar el libreto igual y publicarlo tres segundos antes",
      "Identificar agujeros negros en la industria, sacar la lección de sus fallos y ofrecer el remedio superador de dichas carencias exactas",
      "Usarlo como material difamatorio barato exclusivo por las redes sin provecho para ventas de tu marca",
      "Ignorar en fin de cuentas todo para no estresarse"
    ],
    1,
    "Abrazar dolores desatendidos ajenos te otorga un superpoder letal: El de proclamarte Mesías para la clientela furiosa de la tienda vecina que tanto exigía una alternativa madura allí."
  ),
  textStep(
    "Creando Guiones Promocionales para Videos",
    "Los vídeos dominan lo orgánico, y acá este AI redacta la secuencia audiovisual desde el Reels efímero de 15 segundos hasta el spot monumental documentado de un embudo larguísimo sin dudar."
  ),
  fillStep(
    "¡Guioniza tu rodaje!",
    "Marca a fuego la cadencia oral e impone la secuencia estricta visual que la narrativa requerirá simultáneamente al lector a cámara.",
    "\"Crea un guion de [______] para [______] sobre [______]. En los primeros [______] segundos: un [______] que origine suma e inmediata curiosidad veloz. Desarrollo partido en [______] bloques, adjudicando valiosa [______] de imagen para cada uno. Cierre con la veloz [______] al fin de este clip publicitario. Tono de orador: [______].\"",
    ["Reels de 45 segundos", "Instagram", "cómo doblar ventas en 30 días usando publicidad orgánica viva de mercado actual en auge", "3", "gancho rápido e intenso", "3", "sugerencia descriptiva", "CTA", "muy rítmico asertivo seguro directo franco y audaz total sin timidez alguna o rodeos innecesarios sobrantes para ir potente al punto del clip video este"],
    ["Reels de 45 segundos", "Instagram", "cómo doblar ventas en 30 dias usando publicidad orgánica viva de mercado actual en auge", "3", "gancho", "3", "sugerencia", "CTA", "franco y directo"],
    "Dirigir la pantalla secundaria desde el papel asevera la dinámica y el pulso vibrante, espantando el formato mortal de busto parlante sin cortes que la atención digital destruye."
  ),
  quizStep(
    "La Dirección Escénica Digital Inmersiva y Atrapante Rápida B Roll Dinámica Que Arrastra Vistas Efectivamente Muy Bien y Rápido",
    "¿Para qué demonios serviría incluir obligatoriamente notas sugeridas de cámara audiovisual de inserts si Gemini, después de todo, es un generador central de solo textos de palabras literales por acá?",
    [
      "Para confundirlo hasta extenuar el servidor y fallarlo adrede con un bug forzado en la plataforma general de Google",
      "Porque llegas a la grabación dominando firmemente la acción paralela estática requerida en pantalla. Así entrelazando narrativa verbal con material audiovisual B-roll eliminas un postproductor re-explicándole a cero y reduces tu faena bruta de producción por horas enteras a salvo al fin.",
      "Logra generar líneas enormes sin sentidos rimbombantes",
      "Gemini filma sin ti de hecho."
    ],
    1,
    "El dictamen descriptivo impone visuales en el editor; así previenes aburrir a los ojos con la cara perpetua del que relata."
  ),
  textStep(
    "Planeando Calendarios Editoriales",
    "Los bloques bien planeados despojan tu rutina de ansiedades sorpresas. En un microsegundo orquestas grillas densas mensuales estables con un norte bien claro preestablecido antes que inicie el primer día hábil a correr sin descanso hacia ti."
  ),
  fillStep(
    "¡Visualiza tu agenda planificada!",
    "Planea tu artillería futura previniendo apagones en tu constelación social sin quemarte por ideas en una hoja en blanco.",
    "\"Crea un calendario editorial sólido para [______] abarcando el estricto mes venidero de [______] completo dedicado de pleno a [______]. Incluye firmemente: el monto fijo de [______] apariciones por semana en los feeds globales; destacando nítido el tipo puntual de [______] que adopte ahí ese contenido; apuntalado al precioso claro de [______] de salida al aire vivo. Acopla siempre sabias [______] del mes donde te subas a surfear tópicos al alza listos y servidos globales a fin allí presentes que sirvan comercialmente.\"",
    ["múltiples redes como Instagram y LinkedIn enteras", "octubre rojo e intenso venidero ya", "academia digital de artes", "4", "tema y formato", "mejor horario", "fechas especiales fijas"],
    ["Instagram y LinkedIn", "octubre", "academia", "4", "tema y formato", "horario", "fechas especiales"],
    "Predecir feriados o coyunturas mundiales permite cabalgar en tendencias a bajo coste al ser ya temas presentes y de charla por default."
  ),
  quizStep(
    "Ventaja Suprema Táctica Mensual de Organización Sólida",
    "¿Cuál diría que es lejos del montón, la supremacía total primordial y principal de establecerle previamente su norte mensual publicitario allí pre planificado sólido ya?",
    [
      "Permite accionar sólidamente consistente, abrazar épocas propicias muy justas al nicho de forma proactiva pura evitándose al final toda horrible insostenible nefasta mortal trillada trituradora fatal perjudicial y de la enorme y siempre dura inminente muy temida dolorosa terrorífica pésima siempre fatídica y sin piedad presión muy fuerte constante a cada vez en todos ustedes o de tu grupo labor al mando creativo puro sobre tener o el estar a punto y ser requerido y el intentar lograr el hacer improvisado desesperante del sacar apurado de parir doloroso todo urgente con desastrosos resultados fatales los contenidos a pura y bruta última maldita hora o siempre tarde al día con el mal nivel técnico como el bajo alcance y pésimo texto vacío soso estéril malo de toda cosa apurada en este negocio veloz social.",
      "Te dará viralidad astronómica millonaria forzada matemáticamente",
      "Acaba y borra del mapa entero tener o estar buscando jamás tema a la cabeza",
      "Puras fintas teóricas pero que al aplicar fallan miserablemente obligando ir o retornar o intentar de recurrir luego o después luego sin más o luego sin salidas de lleno a tu siempre viejo plan y estilo ameno o anterior del puro improviso puro simple caótico lento básico y pobre muy humano tuyo común diario de hacer todo junto ya"
    ],
    0,
    "Organizado como metrónomo previenes caer en el terrible patrón o hueco fofo desastroso mediocre que deja toda escritura atropellada in pectore el minuto antes de dar enviar con mala calidad o fatídico formato."
  ),
  textStep(
    "Respondiendo Comentarios y Manejando Comunidad Digital",
    "Un CM jamás frena, pero para atajar reclamos rutinarios e infundados basta el blindaje magistral estandarizado que tu bot formatea a perfección en este módulo brillante presente a continuación que salva tiempo enorme oro acá en redes muy intensas al uso al máximo de hoy allí y allí."
  ),
  fillStep(
    "¡Blinda y gerencia a tus masivos seguidores activos fervientes ya!",
    "Acuna respuestas blindadas modulares muy rápidas contra polémicas duras o halagos diarios sin trabas en ti mismo para ser líder claro e inmediato frente el otro al uso tuyo ahora y ya.",
    "\"Crea un banco robusto firme certero para ti y claro listado completo estructurado bien de cerca de al menos [______] templates rápidos o guías modulares precisas bases seguras de pronta respuesta base fiel a utilizar en posibles comentarios duros e íntegros como en privados densos DMs recibidos del canal de [______]. Integra al paquete de base estricto estas directrices para ti mismo: devoluciones buenas para cuando haya un caluroso gran [______] hecho al perfil buen hombre, para una básica y típica [______] ingenua respecto a costes; otra para atajada rápida ante inminente terrible y amenazada de fea [______] del trato de delivery nuestro y el gentil rápido y seguro [______] general por info vaga diversa a dar la marca veloz al caso a caso al chat o correo allí. La vibra general del tono base puro para ti: será invariablemente ultra [______] y sin perder el foco en rematar encausándolo con fuerza o maestría impecable guiada muy sabiamente y directamente sin freno ni pausa y claro total [______] en el largo paso allí del funnel que queramos dictar nosotros mismos y serás maestro de esto a las masas ya total y sin fisuras desde hoy bien rápido allí y firme seguro como un roble viejo en la plaza pura.\"",
    ["6", "el muy vivo movido o el duro Instagram oficial principal puro de nuestra amada marca esta o negocio de perfil propio general grande con gente a reventar de activa ruidosa", "elogio y afecto noble honesto", "duda u consulta", "queja seria y airada fea pero sana y resoluble", "pedido genérico suelto y breve o muy vago incierto ahí puro y vacío", "empático y ultra profesional total noble firme", "redirigiéndolo dócilmente pero muy tenaz directo y fuerte y encausándolo certero total firme hacia justo al preciso próximo claro gran firme escalón firme exactito del embudo paso allá seguro nuestro a vender u convencer ya bien al caso muy de seguro"],
    ["6", "Instagram de marca", "elogio", "duda", "reclama", "solicitud", "empática", "al siguiente paso"],
    "Las plantillas robustas evitan tropezar en peleas innecesarias o parecer fríos autómatas. Otorgan resoluciones veloces con aura empática institucional certera intachable muy pura de empresa madura con aplomo enorme genial al rubro."
  ),
  quizStep(
    "La Cúspide Organizacional Uniforme Frontal Cara a Millones",
    "¿Por qué es oro en polvo estratégico acopiar los templates del chatbot para los SAC de marcas o canales de alto revuelo?",
    [
      "Dejar de lado la obligatoria y digna sana lectura natural total sobre aquello en general, pasando obvio pura llanamente a mandar de lo dicho ya o enviado de tu robot tonto loco copiando ciegas un archivo sordo en la nula revisión obvia por uno allí a su red oficial de chat al mundo.",
      "Porque los bots responden automáticos siempre allí en tu app original",
      "Garantizas mantener consistencia pulida sin estridencias sobre el tono rector madre; aligeras a una décima la carga de tiempos reaccionando y das contención brillante rápida, ambos pilares inmensos absolutos del juicio implacable veloz público popular y social dictador del siglo presente al ver o calificar o elegir una marca que triunfara hoy firme a diario a lo largo de décadas plenas muy duras de verdad frente de y con y para con tus seguidores plásticos modernos muy veloces inmensos siempre hoy de acá más.",
      "Porque no funcionan para pymes sino es de 1 millón seguidores entonces da prestigio creer ser marca top ahí total grande muy de estatus pura en redes y ya fingiendo."
    ],
    2,
    "Mantener la misma cálida diplomacia imperecedera incluso bajo picos de avalanchas hostiles afirmativas defiende la trinchera del corporativo resguardando ilesos a operadores nerviosos fatigados y previniendo el desastre fatal impulsivo no revisado de relaciones públicas muy graves de red o desastre fatal puro social a tu lado con ello o peor crisis dura ahí y en la marca viva expuesta allí a diario a cielo tan abierto total."
  ),
  textStep(
    "Midiendo Resultantes y Métricas Áridas en Pleno Oro con Data Cruda Fina IA",
    "Los datos no cantan, son fríos; Gemini es el orfede y director que entona las notas ocultas. Sube tu sábana inerte de excel y permite descubrir los picos u abismos sobre cuál de todas tus fuerzas publicitadas valieron oro o lodo vil fallido a re calibrar urgente por ello allí ya a este módulo culmen analítico pleno del final del camino virtuoso digital genial inmenso que viste acá con esta tremenda y enorme innegable masterclass superior e invaluable toda que a partir de tan a poco te forjaste íntegro con estos formidables duros pasos geniales dados hasta lograr el final ansiado noble gigante y útil."
  ),
  fillStep(
    "¡Analiza el ROI e Insights vitales duros tuyos!",
    "Deposita métricas ciegas planas pidiéndole rumbos precisos y de cirugía mayor firme y seria audaz clara sin igual brillante ya para adelante a por más fuerte.",
    "\"Amado asistente: toma este crudo set de puras cifras de performance general crudas reales duras inútiles e incomprensibles de mes pasado publicitario cerrado ya. : [pegar la tabla tuya aquí adentro]. Condensa e incinera paja allí, exuda oro al explicar y dime ya: donde fue claro donde en general nos [______] brillantemente bien y genial; qué plano nos [______] y anduvo con un asqueroso fétido patético lodo feo amargado por un y muy por muy por bien mal y del muy por bajo de todo vilmente obvio el triste promedio general del resto visto u de ese nuestro esperado ansiado; decime que tipo general duro inamovible de núcleo básico fuerte vital propio a pura de este genial modelo inmerso de la propia [______] general básica actual muy al fin debo por fuerza aferrar firme sostener duro blindada pura y cual en muy suma o y de qué purga o adenda yo debo o preciso por el deber inmenso y fatal [______] feroz urgente firme fuerte firme o extirpar sin mas ya para mejorar mis ratios del mes del próximo tiro de mes allí enfrente nuestro y así en verdad puro poder mejorar mis ingresos netos muy rápidos y muy seguros ahí general.\"",
    ["funcionó", "quedó o ubicó e instaló patético y de muy mal pésimo o pobre", "pilar de la estructura base táctica real total que poseemos al tiro acá o esa enorme colosal gran fina estrategia", "pulir afinar cortar alistar y alinear u así re adaptar duramente y arreglar con bisturí filoso o modificar y corregir ya en todo fuerte y con dureza o repensar un poco y ajustar"],
    ["funcionó", "quedó", "estrategia", "ajustar"],
    "La frialdad absoluta cibernética previene sesgos emocionales del creador dolido que suele ocultarse y culpar al resto ante fracasos del gráfico al ignorar los verdaderos datos lógicos inobjetables de ajuste por venir pronto puro allí inminentes de ver o actuar al toque al leer estos números puros finos decodificados tan a tiro brillante en minutos reales plenos y sanos."
  ),
  quizStep(
    "Auditoría Resolutiva Magistral Hacia Ascenso Permanente Exponencial Libre a Nuevos Exitos Vitales Mejores",
    "¿Qué maniobra marca diferencia soberana entre mirar data bruta sosa de redes y usar el músculo gigante de discernir a Gemini con los logs tuyos puros y fidedignos o crudos numéricos reales recién bajados por allí plenos de allá en tu consola bruta?",
    [
      "Usarlo nada más de vistoso armador de un Power Point más colorido aburrido tradicional sin valor en el mundo viejo inmenso para mandar inerte sin sentido.",
      "Ensamblar métrica contra objetivos y demandarle desvelar los motivos exactos silenciados de atrás, los arquetipos de repetición invisibles al ojo cansado junto con una guía práctica rectificadora innegable a futuro o ciclo venidero para que su escalada no pare o choque duro nunca y fluya rica en ascensión ininterrumpida sana brutal sin techo puro real hoy día y ya siempre desde hoy muy para mañana para ganar puro a por todas en él hoy del momento vivo de vida nuestra acá de la era presente para ir lejos al fin y bien duro siempre al frente con esto brillante y potente sin dudar ni trabas por su avance inmenso fuerte vital grande",
      "Suplicarle promesas estables de milagros fijos o sea, prometerte rentabilidad o ROI gigantes garantizados infalibles con brujería vana de falso falso poder mágico incomprensible",
      "Gemini jamás te leerá tus reportes aburridos tristes sosos duros matemáticos en planillas excel u otros pesados muy largos que haya subidos a el para buscar algo al pedir un diagnostico simple de números al fin en absoluto el hace otra puras ramas creativas libres sin anexo formal alguno."
    ],
    1,
    "El poder transformativo de encarnar a un CTO infalible extraído a ordenes puras extraídas logia o patrones lógicos indetectables desbanca falsas corazonadas con acciones ejecutables sólidas que ahorran quemar fortunas en los próximos 30 días de pura campaña online fallida y a oscuras sin rumbo base sabio a ciegas total a la mar abierta cruel del marketing y redes."
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
  quizStep(
    "Partenaire Stratégique en Marketing",
    "Pourquoi Gemini est-il particulièrement utile pour les professionnels du marketing ?",
    [
      "Il garantit que tout contenu généré se viralisera automatiquement sur les réseaux",
      "Il combine l'accès à internet en temps réel avec la génération de contenu, l'analyse de marché et la création visuelle — tout cela sur une unique plateforme",
      "Il remplace totalement le besoin d'avoir une équipe marketing",
      "Il ne fonctionne que pour les grandes entreprises dotées de budgets colossaux"
    ],
    1,
    "La consolidation de l'ensemble de ces outils sur une seule plateforme réduit la friction opératoire et décuple la productivité lors de l'exécution des campagnes."
  ),
  textStep(
    "Création de Stratégies de Contenu",
    "La première étape de toute action marketing est la stratégie. Gemini construit un plan complet basé sur votre modèle économique, votre audience et vos objectifs."
  ),
  fillStep(
    "Créez votre stratégie !",
    "Remplissez les espaces pour structurer un plan stratégique dans Gemini.",
    "\"Tu es un stratège en marketing digital. Crée une stratégie de contenu pour [______] pour le mois d'[______]. Inclus : [______] piliers thématiques, un mix de [______], la fréquence de publication, [______] idées de sujets et les [______] métriques pour suivre le succès.\"",
    ["l'Instagram d'une clinique esthétique", "août", "4", "formats par plateforme", "12", "3 principales"],
    ["l'Instagram d'une clinique esthétique", "août", "4", "formats par plateforme", "12", "3 principales"],
    "Toujours encadrer et fournir votre cible permet au modèle d'offrir la direction parfaite sans divaguer."
  ),
  quizStep(
    "La Puissance du Contexte dans la Stratégie",
    "Qu'est-ce qui rend une stratégie de contenu générée par Gemini plus efficace qu'une simple approche générique ?",
    [
      "Gemini accède toujours automatiquement aux donnés privées internes de votre profil",
      "Les stratégies de Gemini génèrent obligatoirement de l'abondance d'abonnés de manière magique",
      "Lorsque vous fournissez un contexte réel — niche, public, objectif et ton de la marque — Gemini adapte précisément chaque élément de la stratégie à votre stricte singularité",
      "Fournir du contexte ne fait rigoureusement aucune différence lors de la demande d'une stratégie"
    ],
    2,
    "Les données contextualisées évitent les réponses clichées et alignent fermement le plan à votre tunnel de vente et à vos besoins réels d'exposition."
  ),
  textStep(
    "Recherche des Tendances Marketing en Temps Réel",
    "Grâce à l'accès natif et en direct à Internet, Gemini identifie ce qui fonctionne à l'heure actuelle — tendances de contenus, formats viraux et évolutions du comportement des consommateurs réactualisées."
  ),
  fillStep(
    "Recherchez des tendances !",
    "Demandez à Gemini de chercher les motifs ascendants et les habitudes toutes récentes.",
    "\"Recherche les principales [______] de marketing digital pour le secteur de [______] en [______]. Pour chaque tendance : explique ce que c'est, pourquoi c'est [______] et comment une marque de [______] peut l'appliquer dans les [______] prochains jours.\"",
    ["tendances et stratégies", "l'alimentation saine", "2025", "en croissance", "petite taille", "30"],
    ["tendances et stratégies", "l'alimentation saine", "2025", "en croissance", "petite taille", "30"],
    "Sonder judicieusement l'air du temps avant d'engager les rotatives de production empêche fermement la combustion stérile de trésorerie sur un format moribond."
  ),
  quizStep(
    "Efficience de l'Audit Numérique",
    "Pourquoi confier à Gemini votre recherche de tendances s'avère bien plus efficient qu'une classique pérégrination manuelle ?",
    [
      "Parce que Gemini est celui qui dicte secrètement au marché l'orientation même de la mode",
      "Parce qu'au lieu d'écumer d'innombrables dizaines de plateformes avec le fardeau de s'y retrouver seul, l'IA compile en urgence pour vous une synthèse cristalline calibrée à votre marché et auréolée d'applications clé en main",
      "Afin d'esquiver vulgairement la corvée laborieuse sans réel apport derrière",
      "Gemini est notoirement cantonné par défaut exclusivement aux marchés nord-américains sans autre ressort international"
    ],
    1,
    "Moissonner un spectre global de flux virtuels au prisme d'un robot de pointe épargne des journées chaotiques entières aux professionnels exigeants."
  ),
  textStep(
    "Rédaction de Copies à Haute Conversion",
    "Le texte persuasif (copy) est le pouls et le cœur d'une campagne. Gemini possède la maîtrise totale des grands paradigmes de la persuasion humaine pour vous livrer l'or en barre."
  ),
  fillStep(
    "Rédigez votre argumentaire de vente !",
    "Utilisez les grilles structurales implacables d'écriture reconnues que l'ordinateur intègre déjà parfaitement comme AIDA et PAS.",
    "\"En utilisant la matrice [______], rédige une copie de [______] pour [______]. Public : [______]. Douleur centrale : [______]. Présente la solution comme [______]. Finalise avec un [______] clair et impératif. Ton : [______].\"",
    ["PAS — Problème, Agitation, Solution", "vente", "un cours en ligne sur l'organisation financière", "personnes entre 25 et 40 ans endettées et sans grand contrôle pécunier", "le manque de méthode et de discipline vis à vis de l'argent", "le grand premier pas concret vers la liberté financière sans détours", "Appel à l'Action (CTA)", "direct et très empathique au client"],
    ["PAS — Problème, Agitation, Solution", "vente", "un cours en ligne sur l'organisation financière", "personnes entre 25 et 40 ans endettées et sans contrôle financier", "manque de méthode et de discipline", "le premier pas vers la liberté financière", "CTA", "direct et empathique"],
    "Poser la chape formelle du script publicitaire contraint l’oracle virtuel à sortir l’arsenal purement orienté neuro-marketing au détriment du simple bel enchaînement inoffensif de verbes."
  ),
  quizStep(
    "Action Organisée pour L'Achat",
    "Lequel de ces principes directeurs s'impose souverainement lorsque votre copie se doit de générer et déclencher l'action sur un clic très immédiat ?",
    [
      "L'empilement vulgaire d'attributs cosmétiques juxtaposés sans aucuns fils logiques",
      "Les grands classiques formels comme AIDA, PAS, PPPP — car ils canalisent vertigineusement tout le long du sillon mental un futur client depuis son réveil intime de curiosité jusqu'au passage en caisse",
      "Tartiner la matrice jusqu'à rendre l’œuvre fleuve de telle sorte à assommer le client sous du volume soi-disant gage de l'exhaustivité infaillible",
      "Aucun pour de vrai. Gemini s'emmêle misérablement les pinceaux en touchant ces dogmes complexes sans âme du marketing d'école."
    ],
    1,
    "Déployer le manuel de l'art rhétorique balisé de la profession neutralise de base un mauvais argumentaire voué au fiasco : l'utilisateur de passage est harponné doucement au site web de commande tout à fait machinalement."
  ),
  textStep(
    "Création Engagée de Posts sur les Réseaux",
    "D'Instagram au paysage LinkedIn, Gemini débauche et dégage pour vous l'armature calibrée millimétrée adaptée et exigée par la norme stricte de chaque écosystème avec amorces acérées, texte fort sans surplus et conclusions orientées vers vos taux d'activité de l'utilisateur."
  ),
  fillStep(
    "Générez vos posts d'auteur !",
    "Posez la bride serrée à l'étendue et nature du texte que lancera pour votre calendrier chaque instance au quotidien de votre cycle communautaire.",
    "\"Crée [______] posts pour [______] sur [______]. Pour chaque post : une [______] qui arrête le scroll brut dès la sublime première ligne, un [______] comprenant un immense maximum de [______] phrases courtes et un strict [______] limpide a la fin. Ton : [______]. Inclus à ta convenance [______] hashtags très utiles là.\"",
    ["5", "Instagram", "les merveilleux bénéfices d'une séance rapide de pilates pour le travailleur hyper sédentaire d'ordinateur ou de bureau", "l'accroche forte", "développement utile et aisé rapide", "4", "Appel a l'action", "parfaitement amical chaud informatif sans jugement altier et distant proche dudit lecteur", "8"],
    ["5", "Instagram", "les bénéfices du pilates pour ceux qui travaillent assis", "accroche", "développement", "4", "CTA", "informatif et chaleureux", "8"],
    "Verrouiller le carcan physique (le nombre de phrases) préserve cruellement votre espace numérique de posts lourdement massifs indigestes que hait farouchement ce si volatil adepte du défilement avec le doigt très pressé de son cher petit smartphone en main !"
  ),
  quizStep(
    "Stratège Aux Pieds de chaque Plateforme",
    "Dans quel sacro-saint bénéfice est-il très lourdement recommandé lors de vos exigences au prompt et toujours avec soin de marquer et dicter sur quel parvis numérique, application phare ou telle ou telle page en jeu le texte pondra très officiellement ici avec nous ses racines d'arbres ?",
    [
      "Aucunement justifié en rien d'utile. Les formats écrits au niveau de l'intellectuel se valent sans nuances des unes des autres pour lui sur ces aspects de code formels figés bas de l'alphabet à la même fin à ce sujet par nous de son fait sans différence aucune",
      "Juste afin de s’assurer d'écoper formellement au bout les plus rachitiques et courts des écrits ou qu'il compresse par son algorithme interne fort le tout là",
      "Par le simple prêche divin immuable de censure inavouable limitant tel ou tel de ses comportements de par une grosse instance d'intelligence évitant un ban social ou l'autre bien dommage sur ledit endroit du réseau public au moment T pour le bot prudent sous la patte molle ou bride pure et dure posée Google pour le modèle de l'app ici !",
      "L'auditoire de la cravate formel sur LinkedIn narre un récit découpé d'items quand en ce bout, L'app au carré visuelle rapide a clics Insta n'implore quant à lui pas le long débat mais le choc chirurgical d'une info nette au bout visuel et ça, et bien il s'adapte à cela."
    ],
    3,
    "Gemini intègre souverainement tout de la structure, syntaxe de culture de dialecte secret sans qu'on ne le brief à part lui signaler sobrement pour l'invite ou on publie à la fin. Sans cela il écrirait dans le vide sidéral."
  ),
  textStep(
    "Façonner l'Annonce Financière : Trafic Payant Ads",
    "Aux affaires sérieuses ! Injecter d'espèces sonnantes et trébuchantes en bourse au net pour la réclame payée. Gemini propulse la déclinaison d'annonces calquées farouchement vers de redoutables prismes multiples sans répit — arme décisive en AB Test ou test croisés afin de discerner pour pas un sou qui du message d’avertissement fait écouler mieux chez de votre chaland et votre propre grande audience finale ou pas d'un cheveu avant ça a lui très fort et tout."
  ),
  fillStep(
    "Faites ruisseler les Annonces Promues Payées Sans Gaspiller",
    "Éprouvez une palette neuro cognitive en réclame ciblée pour dénicher le puit d'or caché avec des variations fines depuis la logia.",
    "\"Crée rigoureusement de fait [______] bonnes variantes pur de réclame Ad's très impactantes dédiées vers un immense et lourd ou majestueux [______] tournant actif en plein espace [______]. L'Audience dure que cherche ce but très bien défini sans autre fioriture ou écart: C'est un groupe composé pure [______]. Et voilà ce cher et précis ordre très juste pour chacune et de façon isolée: rédigez clair un de [______] n’outrepassant surtout la belle limite claire fixée de vos 40 petites frappes, idem pour cet [______] qu'on posera court frappant sous peine maximum et courte au plus au gros de par ses 125 stricts caractères et finalement veuillez m'indiquer avec fierté très pur nom et justesse claire ceci le nom noble exact de plein [______] profond persuasif et grand là que vous appliquez ci bas de soi fort (au nom bien vu exemple grand choix comme: pur gain escompté a court voir long et dur terrible manque via la bonne anxiété ou pure preuve pure du niveau inconditionnel très vrai très [______] etc).\".\"",
    ["3", "une application mobile de médiation bien ou sereine pour grands ou fins et réels complets purs purs purs débutant incompétents à l'art", "Meta grand groupe ou Meta Ads", "adultes situés pure ou durs calés a grand fort entre les 28 purs et a bons 45 purs de l'âge sous grand pic anxiété vrai", "titre clair", "corps texte", "le bel angle vif", "social"],
    ["3", "application de méditation pour débutants", "Meta Ads", "adultes de 28 à 45 ans", "titre", "texte", "angle de persuasion", "sociale"],
    "Séparer finement d'un laser chaque ligne frontale neuronale de chaque client évite avec maestria au budget engagé fort aux enchères virtuelles du CPC d'y bruler tout vif vos billets de par l'ignoble flou d'attraper sans tact sans méthode ou le mauvais dindon pas réceptif de tout."
  ),
  quizStep(
    "Croiser Sous Différents Axes Par Parallélisme Payant Virtuel",
    "Acheter pour un clou mais tester a de mille prismes ou angles variés au même sujet de la campagne est purement et très durement inestimable ! Et pour de très grande bonne et très juste forte ou clair raison de vérité de cause au fin mot ou fait ça, à savoir pourquoi précisément sur ce fait et sans autre dupe vraie pour nous, qui est celle-ci ci-présente bas ici a savoir que : ",
    [
      "Ces robots-ci capricieux au haut et très capricieux requièrent en fait la trilogie pour ne serais ce s’agiter par défaut et non juste beuguer net à rien ou sans sortir au compte goûte par d'erreurs bugs sans forme ni de bon à tirer ou copier au final après tes vaines commandes.",
      "Juste pour aller grassement éparpiller bien grand d'argent au ciel avec ce budget test au vent aux capricieux Dieux des serveurs Ads très content et ravi ou avide de nous pomper l'air sans aucun retour a terme de ça en ROI bien vu au vu de ce Google ami bien la de part lui sur coup ici de par cette app avec son grand de sa malice.",
      "Toute la horde des variations a la pelle accouche de tout poil par tout le seul y sans rien une même pure très belle ou très plate ligne chiffre statique finale du taux brut à qui ou sans aucun cas un seul angle bon n'arrache autre point sur lui, ce point là de chiffre sur son prix coût et ce pour la durée entière ou éternité de toute la page ou promo ad de ça ou la a cette ère numérique du click pour les de ces grands publics cibles",
      "Il existe l'évidence des prismes qui font cliquer fort à 0.10 et la froide rhétorique loupée à 1.40. Varier sans couts chez l'agent ouvre les robinets formels aux bons tests fins en l'A/B très lourd de ce bon saint graal des Media Buyers du digital de haut pur et bon vol avec ca d'y trouver le vrai gros ROI sublime caché de l'aiguille pour s'enrichir très largement avec là"
    ],
    3,
    "Frapper pur coup la pure vraie grande juste bonne ligne de douleur adoucit insolemment ta facture sur chaque formulaire ramassé ; en t'abreuvant en un flash si vite du flot copieux pour mille et plus purs et durs choix tu mets sur orbite lourde tes certitudes publicitaires rentables avant de les tirer fermement aux régies des GAFAM ! Un pas grand au grand de nos très chers succès purs par nous là de nos poches à ça ou sans perte d'argent ici a l'essai très bon marché ça y est bien."
  ),
  textStep(
    "À l'assaut du Voisin : Veille Concurrentielle Numérique Pure Au Laser Intellectuel IA Par Nous Direct Sur Eux Ici ou La ",
    "Sur l'ocean web connecté clair et fluide sans coup, avec ça de ses bons et ou pure longs tentacules de data géantes au fond du grand du beau web live. Ta chose Gemini infiltre discret pour espionner ou il ratisse dur d'y trouver fort a très bien pour soi à savoir: ce très vaste que trament ceux-ci a coté tes dits méchants concurrents du marché hostile par des brèches laissées ou du pain ou du bon miel et de miel clair et franc sur ca a très grand fin utilité pure."
  ),
  fillStep(
    "Rayonnez votre lumière au creux et fort fort ou sombre chez du pauvre rival faible a découvert sur d'angle vif via chat !! ",
    "Dépecer en pleine et bonne grande pure et toute belle de cette très douce cruauté la plaie numérique béante d'un du méchant concurrent et y foncer lourd ou très du bel au vu pour un de votre pur a de belle grande prise sur du tout lourd et de lui pour a y exploiter avec un ce si beau de grand art sans frais de cette si et très pur de la ou IA de Google sans pitié ou faute et ca avec la très belle ou de bonne pure phrase ce ici : ",
    "\"Je requière instamment que mon bot enquête là puis analyse très durement a de belles fortes grandes pur vues sur des cibles réelles d'eux de leurs fameuses toutes d'elles grandes pure stratégie a du marketing en ce digital fort des [______] sur a de plein sur a propos dudit secteur a de la [______]. Il m'importe pur et là beaucoup au vu d'ici a de comprendre fort ceci bien précis: comment se comportent ils tous au vu de la de ceci : ou [______] clair pur avec le quidam de follower sur page ou mur, les formats récurrent de leurs médias lourds de là :[______], avec de gros ou a grand ou quoi comme points de ou [______] que ceux applaudissent d'eux par dessus très pure ou fort la la et puis bien là à la bonne fin et grande et très grave oulala d'ou d'[______] qui fusent amères au vu au et lu en commentaire fielleux afin pour votre maitre là avec une très clair net fort majestueuse posture au de vol [______] comme trou beau pur sans fin.\"",
    ["3 principaux rivaux du secteur", "mode vestimentaire du coton très bio", "prennent le ton avec ca en s'y très bon social ils", "de video ou d'écrit", "satisfaction ou pur eloges lourds de ca très grand la", "insatisfactions haineuse pures pur", "de la ou ma et mienne d'un très pure grande ou de d'une aubaine commercial lourd à pur saisir à de mon fort ce"],
    ["3 principaux concurrents", "mode", "communiquent", "format de contenu", "points forts", "faiblesses cachées", "exploiter pur"],
    "Cristalliser via un miroir déformant synthétisé les lacunes que son voisin laisse orphelines aux yeux de clients qui fuient à côté te tresse une couronne sans prix au de ta de toi vers ta de position royale imminente"
  ),
  quizStep(
    "Doctrine Exploitation Espionnage Ethique De Moteurs Analyser et Décoder En Fin Vers Un Résultat A Notre Plein Seul Avantage",
    "Pour quelles belles ou de grande grandes actions très de juste bon sens avec du noble et de si sage utilités fortes vous est il pur et dur très conseillé et pour quoi avec a par de faire à la pur de toute à toute belle de la très grande bonne à a ce moment en la fin d’analyse de la de concurence de bot sur ton dur la sur ton de bureau par de ce dur et grand AI lui très bien ?",
    [
      "De pur piller honteusement au et par une copie grossière basique des pauvres créatifs avec un mimétisme vil",
      "Il voit dans les étoiles et cratères de ce pauvre radar aveugle ce grand désert où l'ennemi manque cruel et c'est à toi en leader noble d'aller soigner ces frustrés oubliés là-bas de ta pure stratégie neuve unique et bien plus grande que l'ancien gars la n'aura jamais perçu du tout sans elle et ce bot de Gemini ici !!",
      "À figer son dur d'orgueil vain pour médire le grand ou de son adversaire vain de mot sotte avec sans aucun profit sonnant sur de ce bon du chiffre et CA net.",
      "Mettre la charrue oulala sans de ou quoi ou bêtement la pur de charrue et sur pur tout du vent et pure grand du rien de pur et tout à de poubelle car ca et à l'aveugle sans retour ou pur et d'aucun de ces vrais gros pure d'impacts ce au but de du but du tout avec ça ici non."
    ],
    1,
    "Celui du qui ou quoi du observe la fêlure structurelle sans l'injurier lui fonde à petit pas la plus imparable forteresse. Répondre a ceux et de ce à l'oubli donne ce à ta boite le saint Graal rare dit un ou ouf Océan du pur Bleu sans sang versé aux requins concurrents si ou du farouchement à ta de pur bataille la-bas pure avec lui sans arme ou dur a rien dans du rouge ici du bain des Ads très chère et ou au bout du sans rien faire."
  ),
  textStep(
    "Cinéma de Poche pour Votre Marque",
    "Le grand bal visuel mène la danse orgiaque virale à terme aujourd'hui net et pur organique ! De la secousse micro du Tik Tok de pur d'un 15 tops ou secs ou de secondes furtives ou bien ce a ce métrage pur du tunnel long YouTube Gemini taille à la serpe de mots le squelette filmique parfait sans heurt"
  ),
  fillStep(
    "Écrivez les Tablettes Ou du Story Board Pour La Scène et Pour L'Acteur ! ",
    "Dictature absolue des encadrements techniques sur de mot pur sur feuille d'invite de du bot !",
    "\"Produit sur très mesure un très de strict plan et d'écrit de film a savoir un clair [______] taillé ferme envers sa plateforme soit dit de ce de l'[______] parlant en fond avec maestria ferme et de sur les comment il faut pour ce la : [______]. Pour tes très premières secondes là soit de pur ce là lourd au de [______] seconde tu mettras d'ordre ou du bon ceci soit la a toi au [______] choc irrépressible foudroyant ! Sur sa de sa courbe du dur et d'un bon ventre central fort au récit il se dresse droit ce de bloc partagé a sur de bons [______] étapes bien définis tout agrémenté sur avec d'a peu près pour bien au ce de a de [______] de belle visuels net. Tirade final sèche en gros [______] au public. Archétype général pour ce beau [______].\"",
    ["Reels et court vidéo de ça et du dur et bon de long 45 et secs sans d'autre au bout un peu ici de pur secondes", "l'instagram de là", "doubler cash au lourd le ou les beaux volumes en or et ventes via ou de a ce bon beau trafic et gratuit là par 30 ou nets jours de ca de", "de 3", "le grand ou fameux roi pur du ou de l'accroche et ou lourd", "de a bien vu au 3", "note pur ou conseil net sur la prise la ou sur au plan vidéo", "le beau Call to Action clair appel franc de ordre là", "l'air net assuré et franc très pur"],
    ["Reels de 45 secondes", "Instagram", "doubler vos ventes", "3", "accroche", "3", "suggestion visuelle", "CTA", "sûr et direct"],
    "Dicter fermement l'ambiance au papier empêche d'arriver ou de tourner avec d'angoisse très pur en vue sur les yeux car on a sur de sa vue et main ferme le de ce plan clair dénué toute improvisation stérile laborieuse sur au montage final du plan dur au plan sans de bon raccords"
  ),
  quizStep(
    "Pourquoi Figer L'Audovisuel Sur Script Et Des Plans Images Au Mot Présent Avant A Ce Film Final ?",
    "En quoi diable et par très grande bonne idée sainte obliger à vous ici même en dictateur d'intégrer dans d'édits ou mot pour Gemini du B-Roll et ou de quoi suggérer là fermement avec lui au sein de scripts fait pour une pur magie ou vidéo promo ?",
    [
      "Aucune vertu sauf que c'est de l'imposé car avec pur de Nano Pro ça génère au automatique à tes ordres sans bouger hors l'IA ce pur un bon et très beau complet et beau montage vidéo natif.",
      "Juste afin de bien ou très gonfler de grand vide a la vanité de sa lourde commande sans retour au gain clair",
      "Il empêche de radoter visuellement son beau message! Savoir ce du visuel et comment ça avant garantît le lien au parler à savoir du quoi et au sens du ou ce l'oeil voit et il efface là et grand du gouffre sans nul d'un nom de par là la si lourde la et grande des de la lente de des de la et le travail de galère la et de pur lente post-édition !",
      "Ne concerne qu'à la volée les grand studio de Netflix à 5 millions et ce sans rien d'action au quidam commun."
    ],
    2,
    "Mettre l'image du texte là au pur à plat brise très net d'emblée l'effet statique très pur soporifique du gars face de face ou sans couper ce du mur en brique la au derrière. Avec a la carte en mains c'est la victoire au tournage et aux temps de l'edit si la."
  ),
  textStep(
    "Fonder ou Graver au Marbre Son Année de Posts Aux Murs au Millimètre d'Heures Planifiés",
    "Gouverner d'une poigne sans faille ou d'un grand bot un beau d'énorme bon un de ses longs et bel grands et longs pur de calendrier aux dates et de mois complet du temps c'est vaincre pur du doute fatal blanc des pannes pur pure devant l'écran des nuls ! Gemini pond du tableau de a tout ou pour ou fait pur d'un ou à a en des secondes de rien au vol avec de maitrise."
  ),
  fillStep(
    "Ficelez l'Agenda Maître Complet",
    "Fondez dans un tableur mental ferme ou virtuel la charpente indestructible de ce qui fera à de votre très haute belle au pur a en là un peu de réussite !.",
    "\"Bâtis un superbe ou bel agenda calendrier très riche ou pur lourd plein ce d'un de pour la de ce [______] a ou d'ici pur du calendrier au là de [______] de ou pour le la ou un ce pur de pur un ou [______]. Et vous et d'y me pur de me mettre en dur des claires des : du [______] volume par de des pur de dates au de ou par sept ou par pure semaine de ci au delà de pur au format ou [______] clair et du post en lui et puis bien de dire du ou la la heure au bel horaire dit très [______] a chacun du jet pur et de de mention grand au de la de spéciale avec ces très purs [______] évènements au fond de au fond de pur date à bien la à ce pur à pur faire ici à tourner pour ma belle la ou pur campagne là à grand fin !\"",
    ["au pur de la grosse bête LinkedIn a de Instagram a la belle grande et ce un peu forte a en de purs réseau", "ce beau doux de ce mois pur doux gentil d'être un bel et de de fin beau et gentil pur très septembre au vu de belle de belle très", "pour du mon ou ton ce bel ami au de mon au client ici dur sur au mon et de sur de mon belle très grande noble pur noble très classe très classe et d'un bon belle du d'école au ou de en cours a ici et pour bien la pur là en grande belle au belle ce a d'en du des langues purs ici amis au cours de", "pure 4 du pur 4 un bon a pur", "type un belle de type format de ou de ton pur thème dur avec du", "défini l'heure au ce très fin horaire et puis au très", "saisonniers d'agenda fort et de au fête au jour à la au date clair pure de la belle du"],
    ["Réseaux croisés", "Septembre", "école de langues linguistique", "4 post pur", "Thématique claire et format court", "Pic d'audience fort et horaire roi", "Dates opportunités pures du marché a exploiter claires"],
    "Bénéficier d'agendas par blocs prévient et de très de très pur lointain et sans et ou au risque grand sans et au sans faute a de ou sans de ce très lourd là ou de l'effet nul de stress ou sans le mauvais le hasard au vu la au du pur de à post pur pour pur a de bêtement"
  ),
  quizStep(
    "Panorama Absolu Stratégiste Par Ailleurs Planifié En Mois Pour Réussite Sociale Pure ",
    "Quelle se voit ou se révèle être d'ici de par ces choix être la d'un de du bon du ce ou cette d'à la de par à très loin et la pur d'une immense principale des qualités forte et ou de du a a bien pur a possédé de l'agenda très prérempli à mois entier ?",
    [
      "Il empêche nullement ou d'ailleurs d'éviter le si ou au de stress d'avoir a trouver mais pur donne des pur et clair des garanties ferme sûr absolu du roi d'engagement dur à coup sur de au buzz dur ! ",
      "Absoudre du coup et du pur travail de post pur a chaque jour et ce a ce tout ou mois là sans besoin de l'orga ou autre pure a la faire au pur la ou mois la ",
      "Confère le ou du vrai du ou son vrai grand pouvoir pur et dur d'anticiper avec du a au bel ordre a ou pur avec au fil avec la consistance pur sans heurt; t'abreuvant à l'heure des vagues à festivité et des temps là-bas d'actualité pour noyer ce pur le flou ou le noir pur trou dur néant blanc si on agit à ce au la ou a pur dur a courte terme et ou ce sur la à une pur et pure à vue là et sans l'art derrière qui ou ne sort là que banal et ou sans au a sans de but ou vain sur très pure page vierge du néant créatif ! ",
      "Se justifie si et d'uniquement de fait par où alors pour et ou et d'entreprise dur d'usines avec énorme followers."
    ],
    2,
    "Proposer de flux par surprise ce tue pur tes vues via algorithme et ou au ou tes pure belle campagnes ! Le bon Google là avec son beau le dit très ou un d'IA à de de t'a dicté ça très ce le mois la au clair de son au pour de pas faillir du a pur tout !"
  ),
  textStep(
    "CRM de Poches : Dialogues Clairs avec le Fan Fâché Et Le Fan Au Bel Heureux Ici !",
    "C'est au a ou au de pur dans l'art des messages durs que ce ou le tout de bot brille; a ou et avec pour ou a pure par au d'usine à gaz en message d'un à 1 ou par a dix fois le même pur d'écrire la ! Des de masques ou masques là a de bots ou des de modèles clairs ! Un ou ce a gain de pure oulala a grande temps fort et au a pur de au lourd la pour la marque à ce pur du à l'abri a en fait de d'or "
  ),
  fillStep(
    "Apprivoisez l'Abonné et Protégez",
    "Fondez a de l'aura a ou et de au a de son doux pur a aux DMs ou aux Dm une vrai au a pur rempart fort au ton a ou par au de dur et clair la",
    "\"Dresse pour ma la et sa pur avec ce de dur [______] grand format de belles ou grand réponses aux clients purs ou grand DMs la ou a pour et par a de ce de lui ici soit le dit bien le fameux : [______]. Joignez de belles des des bonnes ripostes la ou a pour ceci; soit le gars au gentil qui de ça et nous jette gentil le ou la belle bonne le [______] bon au d'achat la ou doux; au client perdu sur ce grand ou sur [______] de combien ça en très peu pur d'euros lui en vaux et de frais; un client en rage très ou dur fou et vrai et fol la qui de nous sur ou et a la [______] au port pure du bien reçu ; avec celui pure aussi en vague qui pur fait du du la et très de [______] pur sans fin. Soigner du ou par ton et au a ceci: a pour au très [______] de ou du tout a pur et de du a chaud ou au ferme et de lui a dire où du ou le ou [______] ferme et sûr.\"",
    ["de de pur au dur oui 6", "instagram pro dit de a la marque a nous grand pur la a fort de pur et a de ça pur", "doux oulala très très et beau de belle grand mot d'éloge là", "sur ca pure très de la de au sur belle l'interrogation clair tarif prix la ici et ou là de la", "et oulala au vrai et très gronde de de la très dur grogne pur de la ou méchante grande réclamation", "à un ou à de dur petit doux bon a beau ou clair et ce de demande d'infos a nous", "bien veillant et chaud doux ou la au dur de pro", "mener de a la main pur et douce direct très la ou pure par devant sur un bon tunnel après clair pas pas oulala la a ce"],
    ["6 modèles", "Instagram officiel", "éloge ou compliment", "question sur le prix", "plainte de livraison", "demande d'information", "chaleureux et pro", "orientant vers l'action de pur et après"],
    "Prévenir la ou pure bavure a la faute et au pur à au a la d'adrénaline au de a faute du jour de la d'une réponse la ou à pur faite a au sur nerf pur garantît ou de à de a ou par pour ton pur l'empire web a ton au a ton pour un blanc manteau à pur du roi serein"
  ),
  quizStep(
    "Les Grandes Écluses De De La Gestion A Ou Par Les Masses Pure Frontales Formelles ",
    "Une bonne une vrai ou bonne à la au si lourd grande et a de pourquoi la et ou on pur à une de a fait ou du ou on doit pur fort ou dur ou par de a a fort par ou pour d'un pur a ou par par de bot pure la avoir a ou des purs cadres de ça par Gemini à ca ou et à ça ici là ? !",
    [
      "De pur a de pouvoir par de par à à au ou et à rien d'à lire des vraies très pures de d'eux a pur à ça des purs gens sans a avec des sans",
      "Du ou la et la pour la pure du a ou et a a pur des algorithmes ça a a la et pour la de ça fait de a avec de buzz ou à du",
      "Assurer sans l'ombre d'une nuance ce de ton du brand constant à chaque seconde avec le client a a l'heure pile de d'un SAV a au la ou de pur sans temps de réflexion a a la au d'un gars au sur ou et à la derrière et ceci préserve a la très pure a très pure très fidélité a a la très marque la de de ou pour eux là sans faille a ça le pur roi ce toi",
      "Il n'est pur et a que la d'usage ou pur ou et a l'au aux grand empire pur de la grande ville a a au de dix de de a de au million la ! "
    ],
    2,
    "La patte a de la l'accueil oulala se ou tisse de pure au ou du très fil en or pur la a des fils pur à avec des Dm purs ! L'A d'I ou A de de modèle pose et a une base de pur de standard de marbre pour de qui tu de sois de si et a la a et ou pure toujours bien avec de à tes gens au clair de ça"
  ),
  textStep(
    "Auditeur Général Suprême L'IA Gemini en Action Pour Rentabilité Sur Donnée Claire IA ",
    "L'art l'art a ou et de au a pur est aveugle a ou a et au au de si on de on de n' y au à a pose les de a ou aux à a les a lunettes des et au chiffrage de au pur a la purs chiffres la ! Ton Gemini prend pitié ou t'ôte pur ou et au a du la la l'inutile pour ou a te chuchoter de a a où se cache ton pur a a au a la au a le au a or de demain pour eux et ton compte clair pur."
  ),
  fillStep(
    "Réclamez ou et Exigez du Par Le Vrai d'Or Dur En Data ! ",
    "Envoyez vos tableau sales ou lourds et tristes aux bots et on ou au ce ou de vous pur de a aura d'exquis rapports a à a purs pour l'audace créative amont à du lendemain",
    "\"Salut pur bot au a et la voici ce de par au lourd a de très a de ou pur de a pur ce bloc de données pur du la le a au au ou des de la a perf là claires : [a a tu vas a coller toi ton bon brol la ou à ci dedans de ta de pur a de perf la ici de du beau excel ] . Dis et sors à ma la vue la ce clair : le fort a de ce de où la s'est à ou on de l'[______] merveille la en ce pur haut de ce d'ou ; puis et quoi de a a de on n'ou oulala d'[______] pur comme et d'une fiente dure en fin a là ; là qu'est ce que j'ai dit de a à de je au à l'on de doit de a de quoi très garder fort pure le bon et chaud [______] bien pour on y retourne ; et là qu'il fait qu'au quoi la ou je pur du ce [______] pur à du le corriger on au ou pour de dans de trente très jours cliquables de de d'ici pur a pour a mieux bien mieux fort des de a a purs perfs ci demain !\"",
    ["la et on a du a fonctionné a ce", "resté ou il et ça et du ou y resta de ou la", "pur a cap a grand stratégie a de par", "changer un a au recadrer ou a pur au a dur ajuster oulala"],
    ["marché", "échoué", "cap", "ajuster"],
    "Confronter ses idées à leurs impacts arides épargne l'ego blessé qui coûte des sommes astronomiques et empêche de jeter un bébé publicitaire à l'eau sans fondement la a a au"
  ),
  quizStep(
    "Optimiseur Financier Algorithmique Sur Fichier Brut Oubliés Des Bords Ou Froids",
    "Mais où en vient alors pur ce graal et pur diamant dans quoi où ou de se le le plus du très pertinent pur et a la ou à a fort de pur génial de ça d'un par cet de tel là ce d'AI pur pour sur à a te de faire a ou pour ton très de ton a sur de ce de point la ce du compte de de perfs?",
    [
      "De et a pur a et la afin d'y faire a ses du ce de d'a à et de pur beau a et des la des a des des purs a jolis jolis PDF inutiles.",
      "De croiser sans émotions ni parti pris et à grande froide d'intellect oulala vos vraies de campagnes brutes très face a l'œil critique et par l’esprit pur du modèle afin qu'il dresse sur une très liste pur à ça ce diagnostic fort d'action du réparateur et au clair les redressements très nets d'avenir là d'un a l'a ou à faire sans tarder de cycle pur !",
      "Au a et ou à la l’obliger ou a lui de te le bot a t'engager a le forcer avec serment d'office a de un a avoir du chiffre bon demain",
      "Hélas a a ou ce IA la na ne pur a ou oulala n’as le ou s'y a pas ni du a la clair a de pour comprendre aucun data."
    ],
    1,
    "La puissance sans ego oulala du code s'assoit ou met de a plat sans l'honneur ni orgueil la faille pour qu'a tu fasses de ta d'action une reine vraie pure et pleine force du au demain d'ici sous ça."
  ),
  textStep(
    "Conclusion et Finalisation de de la Trilogie Mémorable Et Formidable Assistante Gemini Ici Et Partout La.",
    "Sous l'égide de Gemini le processus si long et fastidieux qui engloutissait ou épuisait a une agence de pur temps vient ici s'abaisser devant l'unique créateur solo ou PME a arme et arme a égale! Avec ou via les campagnes avec ces calendriers et ces très longs DMs templates et analyses à vif ou de pur sur ad la concurrence direct, le jeu n’est en rien pur a ce aux poches et a l'or au de ou des bourses mais au seul maitre au de sur qui ou des de a la pure vision aura de pur su a de si a l'exploiter avec. La très vraie limite de l’art ce pur de ci ou la sera votre de maitrise du d'outil a la du bout à ce bout.\n\nFélicitation au vous et à pour cet a si parfait a très brillant module sans nul de par au a autre sur la pur très maitrise de la et ce de Google ici et sur a l'IA ! ✓"
  )
] as const;
