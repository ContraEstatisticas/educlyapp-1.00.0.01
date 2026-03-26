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

export const LOVABLE_MODULE_6_STEPS_PT = [
  textStep(
    "Planos, Precos e Como Lancar seu App no Lovable",
    "Bem-vindo de volta! Nesta licao, voce vai aprender sobre o momento mais importante do desenvolvimento: a publicacao. Vamos cobrir como funciona o sistema de creditos, os planos disponiveis, como escolher o plano certo e como publicar seu aplicativo para o mundo."
  ),
  textStep(
    "O Sistema de Creditos",
    "O Lovable usa um sistema de creditos. Cada interacao com a IA consome creditos conforme a complexidade do que foi pedido. Uma edicao simples tende a consumir menos do que a criacao de uma tela completa com varias funcionalidades."
  ),
  quizStep(
    "Como os creditos funcionam",
    "Como funciona o sistema de creditos do Lovable?",
    [
      "Cada mensagem enviada a IA consome creditos de acordo com a complexidade do pedido.",
      "O Lovable cobra um valor fixo por mensagem, independentemente da complexidade.",
      "Creditos sao consumidos apenas ao publicar o app, e nao durante o desenvolvimento.",
      "O sistema de creditos so se aplica a usuarios do plano gratuito."
    ],
    0,
    "Pedidos maiores e mais complexos tendem a consumir mais creditos do que ajustes simples e pontuais."
  ),
  textStep(
    "Os Dois Tipos de Credito",
    "O uso fica mais facil de entender quando voce separa creditos mensais e diarios. Os diarios expiram se nao forem usados, entao uma rotina frequente costuma aproveitar melhor o plano do que sessoes muito longas e esporadicas."
  ),
  fillStep(
    "Preencha a lacuna - Entenda os creditos!",
    "Complete a explicacao dos dois tipos de credito do Lovable.",
    "\"O Lovable oferece dois tipos de credito: ___ mensais que fazem parte do seu plano e ___ ao final do mes para o proximo ciclo, e ___ diarios disponiveis para todos os usuarios incluindo o plano gratuito que ___ ao final de cada dia se nao forem usados.\"",
    [
      "creditos",
      "acumulam",
      "creditos",
      "expiram"
    ],
    [
      "creditos",
      "acumulam",
      "creditos",
      "expiram",
      "somam",
      "travam"
    ],
    "A grande diferenca pratica e que os diarios vencem rapido, enquanto os mensais acompanham o ritmo do plano."
  ),
  textStep(
    "Plano Gratuito",
    "O plano gratuito e a porta de entrada para aprender, testar ideias e explorar a plataforma sem cartao de credito. Ele entrega o essencial para validacoes iniciais e pequenos MVPs."
  ),
  fillStep(
    "Preencha a lacuna - Conheca o plano gratuito!",
    "Complete o resumo do plano Free.",
    "\"O plano ___ oferece: ___ creditos diarios que se renovam automaticamente, projetos ___ ilimitados, integracao com ___ para controle de versao e acesso as funcionalidades essenciais da plataforma. Limitacoes: projetos sao sempre ___, nao e possivel usar ___ personalizado e o app exibe o ___ do Lovable.\"",
    [
      "Free",
      "5",
      "publicos",
      "GitHub",
      "publicos",
      "dominio",
      "badge"
    ],
    [
      "Free",
      "5",
      "publicos",
      "GitHub",
      "publicos",
      "dominio",
      "badge",
      "privados",
      "template"
    ],
    "O plano gratuito e bom para explorar a ferramenta, mas traz limites importantes para publicacao mais profissional."
  ),
  textStep(
    "Plano Pro",
    "O plano Pro foi pensado para quem constroi de verdade e precisa de mais liberdade. Ele acrescenta privacidade, dominio proprio e mais controle sobre a apresentacao final do produto."
  ),
  fillStep(
    "Preencha a lacuna - Conheca o plano Pro!",
    "Complete os principais pontos do plano Pro.",
    "\"O plano Pro custa ___ por mes ou aproximadamente ___ por mes no plano anual. Inclui: ___ creditos mensais que ___ para o proximo mes se nao usados, projetos ___, suporte a ___ personalizado, opcao de remover o ___ do Lovable, edicao direta do ___ e integracao com GitHub.\"",
    [
      "$25",
      "$21",
      "100",
      "acumulam",
      "privados",
      "dominio",
      "badge",
      "codigo"
    ],
    [
      "$25",
      "$21",
      "100",
      "acumulam",
      "privados",
      "dominio",
      "badge",
      "codigo",
      "50",
      "layout"
    ],
    "O Pro e o ponto em que o projeto deixa de parecer um experimento e passa a ter cara de produto profissional."
  ),
  textStep(
    "Plano Business",
    "O plano Business faz sentido quando a construcao deixa de ser individual e passa a envolver equipe, governanca e requisitos internos mais fortes."
  ),
  fillStep(
    "Preencha a lacuna - Conheca o plano Business!",
    "Complete o resumo do plano Business.",
    "\"O plano Business custa ___ por mes por usuario ou aproximadamente ___ no plano anual. Adiciona ao Pro: ___ para login corporativo, ___ e permissoes por membro da equipe, ___ de design reutilizaveis, opcao de ___ de dados para empresas com requisitos de privacidade e ___ centralizado para toda a equipe.\"",
    [
      "$50",
      "$42",
      "SSO",
      "funcoes",
      "templates",
      "opt-out",
      "faturamento"
    ],
    [
      "$50",
      "$42",
      "SSO",
      "funcoes",
      "templates",
      "opt-out",
      "faturamento",
      "avatares",
      "tema"
    ],
    "O Business existe para operacao em equipe, com controles mais fortes e menos improviso na colaboracao."
  ),
  textStep(
    "Plano Enterprise",
    "O Enterprise atende empresas grandes com demandas especificas de seguranca, integracoes e conformidade. Aqui o foco deixa de ser apenas construir rapido e passa a incluir requisitos corporativos mais duros."
  ),
  fillStep(
    "Preencha a lacuna - Conheca o Enterprise!",
    "Complete a descricao do plano Enterprise.",
    "\"O plano Enterprise tem ___ personalizado negociado diretamente com o Lovable. Inclui: ___ dedicado, ___ profissional para a equipe, ___ customizadas com sistemas internos, ___ avancados de acesso por grupo e ___ de dados para conformidade com regulamentacoes corporativas. Para contratar e necessario ___ uma demonstracao no site.\"",
    [
      "preco",
      "suporte",
      "onboarding",
      "integracoes",
      "controles",
      "protecao",
      "agendar"
    ],
    [
      "preco",
      "suporte",
      "onboarding",
      "integracoes",
      "controles",
      "protecao",
      "agendar",
      "modulo",
      "backup"
    ],
    "No Enterprise, a conversa ja e sobre infraestrutura, conformidade e adaptacao ao ambiente corporativo."
  ),
  textStep(
    "Comparando os Planos",
    "Comparar os planos lado a lado ajuda a decidir com mais clareza. O ponto principal nao e comprar o plano mais completo, mas sim o que combina com sua fase atual."
  ),
  fillStep(
    "Preencha a lacuna - Compare os planos!",
    "Complete o comparativo dos quatro planos.",
    "\"Plano ___: $0, 5 creditos por dia, projetos publicos, ideal para ___. Plano ___: $25/mes, 100 creditos mensais, projetos privados e dominio proprio, ideal para ___. Plano ___: $50/mes por usuario, SSO e colaboracao em equipe, ideal para ___. Plano ___: preco sob consulta, suporte dedicado e integracoes customizadas, ideal para ___.\"",
    [
      "Free",
      "aprender e testar",
      "Pro",
      "freelancers e empreendedores solo",
      "Business",
      "times e startups em crescimento",
      "Enterprise",
      "grandes corporacoes"
    ],
    [
      "Free",
      "aprender e testar",
      "Pro",
      "freelancers e empreendedores solo",
      "Business",
      "times e startups em crescimento",
      "Enterprise",
      "grandes corporacoes",
      "estudantes",
      "agencias"
    ],
    "O comparativo deixa evidente que cada plano faz mais sentido em um contexto diferente de uso."
  ),
  textStep(
    "Como os Creditos Sao Consumidos na Pratica",
    "Gerenciar creditos bem depende tanto do tipo de pedido quanto da forma como voce pede. Agrupar alteracoes, testar entre iteracoes e usar o historico de versoes ajuda a extrair mais valor de cada credito."
  ),
  fillStep(
    "Preencha a lacuna - Gerencie seus creditos!",
    "Complete as boas praticas de uso de creditos.",
    "\"Consomem ___ creditos: criar uma nova tela do zero, adicionar funcionalidades complexas com banco de dados e autenticacao. Consomem ___ creditos: ajustes visuais simples, mudancas de texto e correcoes pontuais de layout. Para economizar creditos: faca pedidos ___ e completos em vez de varios pedidos pequenos, ___ antes de pedir a proxima alteracao e use o ___ de versoes para voltar em vez de refazer do zero.\"",
    [
      "mais",
      "menos",
      "detalhados",
      "teste cada mudanca",
      "historico"
    ],
    [
      "mais",
      "menos",
      "detalhados",
      "teste cada mudanca",
      "historico",
      "rascunhados",
      "pausa"
    ],
    "Economizar credito tem muito mais a ver com estrategia de iteracao do que com tentar pedir menos coisas aleatoriamente."
  ),
  textStep(
    "Top-ups",
    "Top-ups sao uteis quando voce tem um pico de uso e nao quer mudar de plano de forma permanente. Eles funcionam melhor como complemento pontual, nao como substituto constante de um plano maior."
  ),
  fillStep(
    "Preencha a lacuna - Use top-ups estrategicamente!",
    "Complete a explicacao sobre creditos avulsos.",
    "\"Top-ups sao ___ de creditos avulsos disponiveis nos planos ___ e ___. Sao uteis quando voce tem um ___ intenso de desenvolvimento em um mes especifico mas nao quer ___ de plano permanentemente. Se voce consistentemente precisa de mais creditos todo mes, ___ de plano costuma ser mais ___ do que comprar top-ups regularmente.\"",
    [
      "compras",
      "Pro",
      "Business",
      "pico",
      "mudar",
      "mudar",
      "economico"
    ],
    [
      "compras",
      "Pro",
      "Business",
      "pico",
      "mudar",
      "mudar",
      "economico",
      "visual",
      "demorado"
    ],
    "Top-up faz sentido quando a excecao aparece. Se ele vira rotina, o plano provavelmente ja nao e mais o certo."
  ),
  textStep(
    "Publicando seu Aplicativo",
    "Antes de publicar, vale revisar responsividade, fluxos de dados, mensagens de erro, consistencia visual e detalhes como o titulo da aba do navegador. Publicar sem esse cuidado aumenta a chance de entregar uma experiencia quebrada."
  ),
  quizStep(
    "Por que testar em varias telas?",
    "Por que testar o aplicativo em diferentes tamanhos de tela antes de publicar e essencial?",
    [
      "Porque o Lovable exige uma aprovacao formal de responsividade antes da publicacao.",
      "Para cumprir regulamentacoes gerais de acessibilidade digital.",
      "Porque os usuarios vao acessar o app em celulares, tablets e computadores, e uma experiencia quebrada em qualquer um deles custa usuarios.",
      "Responsividade so importa para apps com publico majoritariamente mobile."
    ],
    2,
    "Uma funcionalidade boa perde valor rapidamente quando a experiencia quebra no dispositivo real do usuario."
  ),
  textStep(
    "Dominio Personalizado",
    "Por padrao, o Lovable publica em um link gerado automaticamente. Nos planos superiores, voce pode conectar dominio proprio e dar ao produto um endereco mais profissional e confiavel."
  ),
  fillStep(
    "Preencha a lacuna - Configure seu dominio!",
    "Complete o fluxo de configuracao de dominio personalizado.",
    "\"Para conectar um dominio personalizado no Lovable: acesse ___ no painel do projeto, clique em ___, insira o dominio que voce comprou em um registrador como ___ ou ___, configure os registros ___ conforme as instrucoes do Lovable e aguarde a ___ do dominio que pode levar ate ___ horas.\"",
    [
      "Settings",
      "Custom Domain",
      "GoDaddy",
      "Registro.br",
      "DNS",
      "propagacao",
      "48"
    ],
    [
      "Settings",
      "Custom Domain",
      "GoDaddy",
      "Registro.br",
      "DNS",
      "propagacao",
      "48",
      "cache",
      "24"
    ],
    "Conectar dominio envolve tanto o painel do Lovable quanto o registrador, e por isso depende do tempo de propagacao."
  ),
  textStep(
    "Desconto para Estudantes",
    "O desconto estudantil torna o plano Pro bem mais acessivel para quem esta aprendendo. Isso ajuda a montar portfolio com recursos profissionais sem elevar demais o custo mensal."
  ),
  fillStep(
    "Preencha a lacuna - Aproveite o desconto!",
    "Complete a explicacao sobre o desconto para estudantes.",
    "\"Estudantes tem ___% de desconto no plano Pro do Lovable ao se cadastrar com e-mail ___. Isso reduz o custo mensal de ___ para aproximadamente ___, tornando o acesso a projetos ___, dominio personalizado e todos os recursos profissionais muito mais acessivel para quem esta aprendendo.\"",
    [
      "50",
      "universitario",
      "$25",
      "$12,50",
      "privados"
    ],
    [
      "50",
      "universitario",
      "$25",
      "$12,50",
      "privados",
      "publicos",
      "$10"
    ],
    "Esse desconto muda bastante o custo de entrada para quem quer aprender usando recursos mais profissionais."
  ),
  textStep(
    "Escolhendo o Plano Certo",
    "O plano certo nao e o mais caro, e sim o que combina com seu uso real. Comecar menor e subir so quando houver necessidade costuma ser a estrategia mais segura e economica."
  ),
  fillStep(
    "Preencha a lacuna - Escolha com estrategia!",
    "Complete a regra pratica para escolher o plano mais adequado.",
    "\"Se voce esta ___ a plataforma use o plano ___. Se voce e ___ ou empreendedor construindo seu primeiro produto use o ___. Se voce tem uma ___ que precisa colaborar em projetos use o ___. Se voce representa uma ___ com requisitos corporativos use o ___. Sempre comece pelo plano ___ e ___ apenas quando o uso real justificar.\"",
    [
      "aprendendo",
      "Free",
      "freelancer",
      "Pro",
      "equipe",
      "Business",
      "grande empresa",
      "Enterprise",
      "menor",
      "faca upgrade"
    ],
    [
      "aprendendo",
      "Free",
      "freelancer",
      "Pro",
      "equipe",
      "Business",
      "grande empresa",
      "Enterprise",
      "menor",
      "faca upgrade",
      "desistindo",
      "pule"
    ],
    "A escolha mais eficiente e a que acompanha a maturidade do projeto, e nao a que parece mais completa no papel."
  ),
  textStep(
    "Conclusao",
    "Publicar no Lovable e o momento em que o projeto vira produto real. Entender creditos, escolher o plano certo, testar bem antes do lancamento e configurar um dominio proprio quando fizer sentido ajuda voce a crescer com mais metodo. O melhor plano nao e o mais caro, e o que combina com sua fase atual.\n\nLicao concluida."
  ),
] as const;

export const LOVABLE_MODULE_6_STEPS_EN = [
  textStep(
    "Plans, Pricing, and How to Launch Your App in Lovable",
    "Welcome back! In this lesson, you will learn about the most important moment in development: publishing. We will cover how credits work, the available plans, how to choose the right plan, and how to launch your app to the world."
  ),
  textStep(
    "The Credit System",
    "Lovable uses a credit system. Each interaction with the AI consumes credits based on the complexity of the request. A simple edit tends to cost less than building a full screen with several features."
  ),
  quizStep(
    "How credits work",
    "How does Lovable's credit system work?",
    [
      "Each message sent to the AI consumes credits according to the complexity of the request.",
      "Lovable charges a fixed amount per message regardless of complexity.",
      "Credits are only consumed when publishing the app, not during development.",
      "The credit system only applies to users on the free plan."
    ],
    0,
    "Larger and more complex requests usually consume more credits than small visual or text edits."
  ),
  textStep(
    "The Two Types of Credits",
    "Usage becomes easier to understand when you separate monthly and daily credits. Daily credits expire if unused, so a regular routine often gets more value than very long and occasional sessions."
  ),
  fillStep(
    "Fill in the blanks - Understand credits!",
    "Complete the explanation of Lovable's two credit types.",
    "\"Lovable offers two types of credit: monthly ___ that are part of your plan and ___ at the end of the month into the next cycle, and daily ___ available to all users including the free plan that ___ at the end of each day if unused.\"",
    [
      "credits",
      "roll over",
      "credits",
      "expire"
    ],
    [
      "credits",
      "roll over",
      "credits",
      "expire",
      "freeze",
      "stack forever"
    ],
    "The practical difference is that daily credits expire quickly, while monthly credits follow the plan cycle."
  ),
  textStep(
    "Free Plan",
    "The free plan is the entry point for learning, testing ideas, and exploring the platform without a credit card. It is enough for initial validation and small MVP experiments."
  ),
  fillStep(
    "Fill in the blanks - Know the free plan!",
    "Complete the summary of the Free plan.",
    "\"The ___ plan offers: ___ daily credits that renew automatically, unlimited ___ projects, GitHub ___ for version control, and access to the core platform features. Limitations: projects are always ___, you cannot use a custom ___, and the app displays the Lovable ___.\"",
    [
      "Free",
      "5",
      "public",
      "integration",
      "public",
      "domain",
      "badge"
    ],
    [
      "Free",
      "5",
      "public",
      "integration",
      "public",
      "domain",
      "badge",
      "private",
      "template"
    ],
    "The free plan is great for exploration, but it has clear limits for more professional launches."
  ),
  textStep(
    "Pro Plan",
    "The Pro plan is designed for people who are actively building. It adds privacy, custom domain support, and more control over the final presentation of the product."
  ),
  fillStep(
    "Fill in the blanks - Know the Pro plan!",
    "Complete the key points of the Pro plan.",
    "\"The Pro plan costs ___ per month or about ___ per month on the annual plan. It includes ___ monthly credits that ___ into the next month if unused, ___ projects, support for custom ___, the option to remove the Lovable ___, direct editing of the ___, and GitHub integration.\"",
    [
      "$25",
      "$21",
      "100",
      "roll over",
      "private",
      "domain",
      "badge",
      "code"
    ],
    [
      "$25",
      "$21",
      "100",
      "roll over",
      "private",
      "domain",
      "badge",
      "code",
      "50",
      "layout"
    ],
    "Pro is the point where the project starts to feel more like a professional product than a simple experiment."
  ),
  textStep(
    "Business Plan",
    "The Business plan makes sense when the build process is no longer individual and starts involving collaboration, governance, and stronger internal requirements."
  ),
  fillStep(
    "Fill in the blanks - Know the Business plan!",
    "Complete the summary of the Business plan.",
    "\"The Business plan costs ___ per month per user or about ___ on the annual plan. It adds to Pro: ___ for company login, team member roles and ___, reusable design ___, data ___ for companies with privacy requirements, and centralized ___ for the whole team.\"",
    [
      "$50",
      "$42",
      "SSO",
      "permissions",
      "templates",
      "opt-out",
      "billing"
    ],
    [
      "$50",
      "$42",
      "SSO",
      "permissions",
      "templates",
      "opt-out",
      "billing",
      "avatars",
      "theme"
    ],
    "Business is built for team operation, with stronger access control and more structured collaboration."
  ),
  textStep(
    "Enterprise Plan",
    "Enterprise is aimed at large organizations with specific needs around security, integrations, and compliance. Here the focus is not only building fast, but also meeting corporate requirements."
  ),
  fillStep(
    "Fill in the blanks - Know Enterprise!",
    "Complete the description of the Enterprise plan.",
    "\"The Enterprise plan has custom ___ negotiated directly with Lovable. It includes dedicated ___, professional ___ for the team, custom ___ with internal systems, advanced access ___ by group, and data ___ for corporate compliance. To buy it, you need to ___ a demo on the website.\"",
    [
      "pricing",
      "support",
      "onboarding",
      "integrations",
      "controls",
      "protection",
      "schedule"
    ],
    [
      "pricing",
      "support",
      "onboarding",
      "integrations",
      "controls",
      "protection",
      "schedule",
      "module",
      "backup"
    ],
    "At the Enterprise level, the conversation is about infrastructure, governance, and adapting the platform to corporate environments."
  ),
  textStep(
    "Comparing the Plans",
    "Looking at the plans side by side helps with clearer decisions. The main goal is not to buy the biggest plan, but the one that matches your current phase."
  ),
  fillStep(
    "Fill in the blanks - Compare the plans!",
    "Complete the four-plan comparison.",
    "\"___ plan: $0, 5 credits per day, public projects, ideal for ___. ___ plan: $25/month, 100 monthly credits, private projects and custom domain, ideal for ___. ___ plan: $50/month per user, SSO and team collaboration, ideal for ___. ___ plan: custom pricing, dedicated support and custom integrations, ideal for ___.\"",
    [
      "Free",
      "learning and testing",
      "Pro",
      "freelancers and solo founders",
      "Business",
      "teams and growing startups",
      "Enterprise",
      "large corporations"
    ],
    [
      "Free",
      "learning and testing",
      "Pro",
      "freelancers and solo founders",
      "Business",
      "teams and growing startups",
      "Enterprise",
      "large corporations",
      "students",
      "agencies"
    ],
    "Each plan fits a different stage of product maturity and team structure."
  ),
  textStep(
    "How Credits Are Consumed in Practice",
    "Managing credits well depends on both the type of request and how you write it. Bundling changes, testing between iterations, and using version history helps you get more value from each credit."
  ),
  fillStep(
    "Fill in the blanks - Manage your credits!",
    "Complete the good practices for using credits.",
    "\"Requests that consume ___ credits: creating a brand-new screen, adding complex features with database and authentication. Requests that consume ___ credits: simple visual tweaks, text changes, and small layout fixes. To save credits: make ___ and complete requests instead of many small ones, ___ before asking for the next change, and use version ___ to go back instead of rebuilding from scratch.\"",
    [
      "more",
      "fewer",
      "detailed",
      "test each change",
      "history"
    ],
    [
      "more",
      "fewer",
      "detailed",
      "test each change",
      "history",
      "draft",
      "pause"
    ],
    "Saving credits is much more about smart iteration than randomly asking for less."
  ),
  textStep(
    "Top-ups",
    "Top-ups are useful when you hit a temporary spike in usage and do not want to permanently change plans. They work best as occasional complements, not as a constant replacement for a larger plan."
  ),
  fillStep(
    "Fill in the blanks - Use top-ups strategically!",
    "Complete the explanation about one-off credit purchases.",
    "\"Top-ups are ___ of extra credits available on the ___ and ___ plans. They are useful when you have an intense development ___ in a specific month but do not want to permanently ___ plans. If you consistently need more credits every month, ___ plans is usually more ___ than buying top-ups regularly.\"",
    [
      "purchases",
      "Pro",
      "Business",
      "spike",
      "switch",
      "switching",
      "cost-effective"
    ],
    [
      "purchases",
      "Pro",
      "Business",
      "spike",
      "switch",
      "switching",
      "cost-effective",
      "visual",
      "slow"
    ],
    "Top-ups make sense for unusual demand. If they become routine, the plan is probably too small."
  ),
  textStep(
    "Publishing Your App",
    "Before publishing, it is worth reviewing responsiveness, data flows, error messages, visual consistency, and details such as the browser tab title. Publishing without this review increases the risk of a broken experience."
  ),
  quizStep(
    "Why test on multiple screens?",
    "Why is it essential to test the app on different screen sizes before publishing?",
    [
      "Because Lovable requires a formal responsiveness approval before publishing.",
      "To comply with general digital accessibility regulations.",
      "Because users will access the app on phones, tablets, and computers, and a broken experience on any of them costs users.",
      "Responsiveness only matters for apps with mostly mobile traffic."
    ],
    2,
    "A strong feature quickly loses value when the real device experience breaks."
  ),
  textStep(
    "Custom Domain",
    "By default, Lovable publishes on an auto-generated link. On higher plans, you can connect your own domain and give the product a more professional and trustworthy address."
  ),
  fillStep(
    "Fill in the blanks - Set up your domain!",
    "Complete the custom domain configuration flow.",
    "\"To connect a custom domain in Lovable: open ___ in the project panel, click ___, enter the domain you bought from a registrar like ___ or ___, configure the ___ records according to Lovable's instructions, and wait for domain ___, which can take up to ___ hours.\"",
    [
      "Settings",
      "Custom Domain",
      "GoDaddy",
      "Registro.br",
      "DNS",
      "propagation",
      "48"
    ],
    [
      "Settings",
      "Custom Domain",
      "GoDaddy",
      "Registro.br",
      "DNS",
      "propagation",
      "48",
      "cache",
      "24"
    ],
    "Connecting a domain depends both on Lovable and on the registrar, which is why propagation time matters."
  ),
  textStep(
    "Student Discount",
    "The student discount makes the Pro plan much more accessible for people who are still learning. It helps build a portfolio with professional features without pushing the monthly cost too high."
  ),
  fillStep(
    "Fill in the blanks - Use the discount!",
    "Complete the explanation about the student discount.",
    "\"Students get ___% off the Lovable Pro plan when signing up with a ___ email. That reduces the monthly cost from ___ to about ___, making access to ___ projects, custom domain, and professional features much more affordable while learning.\"",
    [
      "50",
      "university",
      "$25",
      "$12.50",
      "private"
    ],
    [
      "50",
      "university",
      "$25",
      "$12.50",
      "private",
      "public",
      "$10"
    ],
    "This discount changes the entry cost a lot for students who want to build with more professional resources."
  ),
  textStep(
    "Choosing the Right Plan",
    "The right plan is not the most expensive one. It is the one that matches your real usage. Starting smaller and upgrading only when needed is usually the safest and most efficient path."
  ),
  fillStep(
    "Fill in the blanks - Choose strategically!",
    "Complete the practical rule for choosing the right plan.",
    "\"If you are ___ the platform, use the ___ plan. If you are a ___ or founder building your first product, use the ___. If you have a ___ that needs to collaborate on projects, use the ___. If you represent a ___ with corporate requirements, use the ___. Always start with the ___ plan and ___ only when real usage justifies it.\"",
    [
      "learning",
      "Free",
      "freelancer",
      "Pro",
      "team",
      "Business",
      "large company",
      "Enterprise",
      "smaller",
      "upgrade"
    ],
    [
      "learning",
      "Free",
      "freelancer",
      "Pro",
      "team",
      "Business",
      "large company",
      "Enterprise",
      "smaller",
      "upgrade",
      "quitting",
      "skip"
    ],
    "The most efficient choice follows the maturity of the project, not the most advanced-looking plan."
  ),
  textStep(
    "Conclusion",
    "Publishing in Lovable is the moment when the project becomes a real product. Understanding credits, choosing the right plan, testing well before launch, and setting up a custom domain when it makes sense helps you grow with more method. The best plan is not the most expensive one, but the one that matches your current stage.\n\nLesson completed."
  ),
] as const;

export const LOVABLE_MODULE_6_STEPS_ES = [
  textStep(
    "Planes, Precios y Como Lanzar tu App en Lovable",
    "Bienvenido de nuevo. En esta leccion vas a aprender sobre el momento mas importante del desarrollo: la publicacion. Vamos a cubrir como funciona el sistema de creditos, los planes disponibles, como elegir el plan correcto y como lanzar tu aplicacion al mundo."
  ),
  textStep(
    "El Sistema de Creditos",
    "Lovable usa un sistema de creditos. Cada interaccion con la IA consume creditos segun la complejidad del pedido. Una edicion simple suele consumir menos que crear una pantalla completa con varias funcionalidades."
  ),
  quizStep(
    "Como funcionan los creditos",
    "Como funciona el sistema de creditos de Lovable?",
    [
      "Cada mensaje enviado a la IA consume creditos segun la complejidad del pedido.",
      "Lovable cobra un valor fijo por mensaje sin importar la complejidad.",
      "Los creditos solo se consumen al publicar la app, no durante el desarrollo.",
      "El sistema de creditos solo aplica al plan gratuito."
    ],
    0,
    "Los pedidos mas grandes y complejos suelen consumir mas creditos que ajustes simples de texto o visuales."
  ),
  textStep(
    "Los Dos Tipos de Credito",
    "El uso se entiende mejor cuando separas creditos mensuales y diarios. Los diarios vencen si no se usan, por eso una rutina frecuente suele aprovechar mejor el plan que sesiones largas y esporadicas."
  ),
  fillStep(
    "Completa los espacios - Entiende los creditos!",
    "Completa la explicacion de los dos tipos de credito de Lovable.",
    "\"Lovable ofrece dos tipos de credito: ___ mensuales que forman parte de tu plan y ___ al final del mes para el siguiente ciclo, y ___ diarios disponibles para todos los usuarios incluido el plan gratuito que ___ al final de cada dia si no se usan.\"",
    [
      "creditos",
      "acumulan",
      "creditos",
      "expiran"
    ],
    [
      "creditos",
      "acumulan",
      "creditos",
      "expiran",
      "congelan",
      "suman para siempre"
    ],
    "La diferencia practica es que los diarios caducan rapido, mientras los mensuales siguen el ciclo del plan."
  ),
  textStep(
    "Plan Gratuito",
    "El plan gratuito es la puerta de entrada para aprender, probar ideas y explorar la plataforma sin tarjeta de credito. Sirve muy bien para validaciones iniciales y MVPs pequenos."
  ),
  fillStep(
    "Completa los espacios - Conoce el plan gratuito!",
    "Completa el resumen del plan Free.",
    "\"El plan ___ ofrece: ___ creditos diarios que se renuevan automaticamente, proyectos ___ ilimitados, integracion con ___ para control de versiones y acceso a las funciones esenciales de la plataforma. Limitaciones: los proyectos son siempre ___, no es posible usar ___ personalizado y la app muestra el ___ de Lovable.\"",
    [
      "Free",
      "5",
      "publicos",
      "GitHub",
      "publicos",
      "dominio",
      "badge"
    ],
    [
      "Free",
      "5",
      "publicos",
      "GitHub",
      "publicos",
      "dominio",
      "badge",
      "privados",
      "template"
    ],
    "El plan gratuito es excelente para explorar, pero tiene limites claros para lanzamientos mas profesionales."
  ),
  textStep(
    "Plan Pro",
    "El plan Pro fue pensado para quien realmente construye. Suma privacidad, dominio propio y mas control sobre la presentacion final del producto."
  ),
  fillStep(
    "Completa los espacios - Conoce el plan Pro!",
    "Completa los puntos clave del plan Pro.",
    "\"El plan Pro cuesta ___ al mes o aproximadamente ___ al mes en el plan anual. Incluye ___ creditos mensuales que ___ para el mes siguiente si no se usan, proyectos ___, soporte para ___ personalizado, opcion de quitar el ___ de Lovable, edicion directa del ___ e integracion con GitHub.\"",
    [
      "$25",
      "$21",
      "100",
      "acumulan",
      "privados",
      "dominio",
      "badge",
      "codigo"
    ],
    [
      "$25",
      "$21",
      "100",
      "acumulan",
      "privados",
      "dominio",
      "badge",
      "codigo",
      "50",
      "layout"
    ],
    "Pro es el punto en el que el proyecto empieza a verse y sentirse como un producto profesional."
  ),
  textStep(
    "Plan Business",
    "El plan Business tiene sentido cuando la construccion deja de ser individual y pasa a involucrar colaboracion, gobernanza y requisitos internos mas fuertes."
  ),
  fillStep(
    "Completa los espacios - Conoce el plan Business!",
    "Completa el resumen del plan Business.",
    "\"El plan Business cuesta ___ al mes por usuario o aproximadamente ___ en el plan anual. Suma al Pro: ___ para login corporativo, ___ y permisos por miembro del equipo, ___ de diseno reutilizables, opcion de ___ de datos para empresas con requisitos de privacidad y ___ centralizada para todo el equipo.\"",
    [
      "$50",
      "$42",
      "SSO",
      "funciones",
      "templates",
      "opt-out",
      "facturacion"
    ],
    [
      "$50",
      "$42",
      "SSO",
      "funciones",
      "templates",
      "opt-out",
      "facturacion",
      "avatares",
      "tema"
    ],
    "Business fue creado para operacion en equipo, con mas control y menos improvisacion en la colaboracion."
  ),
  textStep(
    "Plan Enterprise",
    "Enterprise esta pensado para organizaciones grandes con necesidades especificas de seguridad, integraciones y cumplimiento. Aqui el enfoque ya no es solo construir rapido, sino cumplir requisitos corporativos."
  ),
  fillStep(
    "Completa los espacios - Conoce Enterprise!",
    "Completa la descripcion del plan Enterprise.",
    "\"El plan Enterprise tiene ___ personalizado negociado directamente con Lovable. Incluye ___ dedicado, ___ profesional para el equipo, ___ personalizadas con sistemas internos, ___ avanzados de acceso por grupo y ___ de datos para cumplimiento corporativo. Para contratarlo necesitas ___ una demo en el sitio.\"",
    [
      "precio",
      "soporte",
      "onboarding",
      "integraciones",
      "controles",
      "proteccion",
      "agendar"
    ],
    [
      "precio",
      "soporte",
      "onboarding",
      "integraciones",
      "controles",
      "proteccion",
      "agendar",
      "modulo",
      "backup"
    ],
    "En Enterprise la conversacion ya gira alrededor de infraestructura, gobernanza y adaptacion al entorno corporativo."
  ),
  textStep(
    "Comparando los Planes",
    "Ver los planes lado a lado ayuda a decidir con mas claridad. La meta no es comprar el plan mas completo, sino el que mejor encaja con tu etapa actual."
  ),
  fillStep(
    "Completa los espacios - Compara los planes!",
    "Completa la comparacion de los cuatro planes.",
    "\"Plan ___: $0, 5 creditos por dia, proyectos publicos, ideal para ___. Plan ___: $25/mes, 100 creditos mensuales, proyectos privados y dominio propio, ideal para ___. Plan ___: $50/mes por usuario, SSO y colaboracion en equipo, ideal para ___. Plan ___: precio a medida, soporte dedicado e integraciones personalizadas, ideal para ___.\"",
    [
      "Free",
      "aprender y probar",
      "Pro",
      "freelancers y emprendedores en solitario",
      "Business",
      "equipos y startups en crecimiento",
      "Enterprise",
      "grandes corporaciones"
    ],
    [
      "Free",
      "aprender y probar",
      "Pro",
      "freelancers y emprendedores en solitario",
      "Business",
      "equipos y startups en crecimiento",
      "Enterprise",
      "grandes corporaciones",
      "estudiantes",
      "agencias"
    ],
    "Cada plan responde a una etapa distinta de madurez del producto y de estructura del equipo."
  ),
  textStep(
    "Como se Consumen los Creditos en la Practica",
    "Gestionar bien los creditos depende tanto del tipo de pedido como de como lo formulas. Agrupar cambios, probar entre iteraciones y usar el historial de versiones ayuda a sacar mas valor de cada credito."
  ),
  fillStep(
    "Completa los espacios - Gestiona tus creditos!",
    "Completa las buenas practicas de uso de creditos.",
    "\"Consumen ___ creditos: crear una pantalla nueva desde cero, agregar funcionalidades complejas con base de datos y autenticacion. Consumen ___ creditos: ajustes visuales simples, cambios de texto y correcciones pequenas de layout. Para ahorrar creditos: haz pedidos ___ y completos en vez de muchos pedidos pequenos, ___ antes de pedir el siguiente cambio y usa el ___ de versiones para volver atras en lugar de rehacer todo desde cero.\"",
    [
      "mas",
      "menos",
      "detallados",
      "prueba cada cambio",
      "historial"
    ],
    [
      "mas",
      "menos",
      "detallados",
      "prueba cada cambio",
      "historial",
      "borradores",
      "pausa"
    ],
    "Ahorrar creditos tiene mucho mas que ver con iterar con inteligencia que con pedir menos cosas sin criterio."
  ),
  textStep(
    "Top-ups",
    "Los top-ups sirven cuando tienes un pico puntual de uso y no quieres cambiar de plan de forma permanente. Funcionan mejor como complemento ocasional, no como sustituto continuo de un plan mayor."
  ),
  fillStep(
    "Completa los espacios - Usa top-ups con estrategia!",
    "Completa la explicacion sobre compras de creditos extra.",
    "\"Los top-ups son ___ de creditos extra disponibles en los planes ___ y ___. Son utiles cuando tienes un ___ intenso de desarrollo en un mes concreto pero no quieres ___ de plan permanentemente. Si de forma constante necesitas mas creditos cada mes, ___ de plan suele ser mas ___ que comprar top-ups con regularidad.\"",
    [
      "compras",
      "Pro",
      "Business",
      "pico",
      "cambiar",
      "cambiar",
      "economico"
    ],
    [
      "compras",
      "Pro",
      "Business",
      "pico",
      "cambiar",
      "cambiar",
      "economico",
      "visual",
      "lento"
    ],
    "Los top-ups tienen sentido cuando la demanda extra es excepcional. Si se vuelven rutina, el plan ya no es el adecuado."
  ),
  textStep(
    "Publicando tu Aplicacion",
    "Antes de publicar, conviene revisar responsividad, flujos de datos, mensajes de error, consistencia visual y detalles como el titulo de la pestana del navegador. Publicar sin esa revision aumenta el riesgo de entregar una experiencia rota."
  ),
  quizStep(
    "Por que probar en varias pantallas?",
    "Por que es esencial probar la aplicacion en distintos tamanos de pantalla antes de publicar?",
    [
      "Porque Lovable exige una aprobacion formal de responsividad antes de publicar.",
      "Para cumplir regulaciones generales de accesibilidad digital.",
      "Porque los usuarios entraran desde moviles, tablets y computadoras, y una mala experiencia en cualquiera de ellos cuesta usuarios.",
      "La responsividad solo importa en apps con publico mayoritariamente mobile."
    ],
    2,
    "Una funcionalidad buena pierde valor muy rapido cuando la experiencia real se rompe en el dispositivo del usuario."
  ),
  textStep(
    "Dominio Personalizado",
    "Por defecto, Lovable publica en un enlace generado automaticamente. En los planes superiores puedes conectar tu propio dominio y darle al producto una direccion mas profesional y confiable."
  ),
  fillStep(
    "Completa los espacios - Configura tu dominio!",
    "Completa el flujo de configuracion de dominio personalizado.",
    "\"Para conectar un dominio personalizado en Lovable: entra en ___ en el panel del proyecto, haz clic en ___, ingresa el dominio que compraste en un registrador como ___ o ___, configura los registros ___ segun las instrucciones de Lovable y espera la ___ del dominio, que puede tardar hasta ___ horas.\"",
    [
      "Settings",
      "Custom Domain",
      "GoDaddy",
      "Registro.br",
      "DNS",
      "propagacion",
      "48"
    ],
    [
      "Settings",
      "Custom Domain",
      "GoDaddy",
      "Registro.br",
      "DNS",
      "propagacion",
      "48",
      "cache",
      "24"
    ],
    "Conectar dominio depende tanto de Lovable como del registrador, por eso el tiempo de propagacion es importante."
  ),
  textStep(
    "Descuento para Estudiantes",
    "El descuento para estudiantes hace que el plan Pro sea bastante mas accesible para quienes aun estan aprendiendo. Ayuda a construir portfolio con funciones profesionales sin disparar el costo mensual."
  ),
  fillStep(
    "Completa los espacios - Aprovecha el descuento!",
    "Completa la explicacion sobre el descuento para estudiantes.",
    "\"Los estudiantes tienen ___% de descuento en el plan Pro de Lovable al registrarse con correo ___. Eso reduce el costo mensual de ___ a aproximadamente ___, haciendo mucho mas accesible el acceso a proyectos ___, dominio personalizado y recursos profesionales mientras aprenden.\"",
    [
      "50",
      "universitario",
      "$25",
      "$12,50",
      "privados"
    ],
    [
      "50",
      "universitario",
      "$25",
      "$12,50",
      "privados",
      "publicos",
      "$10"
    ],
    "Este descuento cambia bastante el costo de entrada para quien quiere aprender usando recursos mas profesionales."
  ),
  textStep(
    "Elegir el Plan Correcto",
    "El plan correcto no es el mas caro, sino el que encaja con tu uso real. Empezar mas pequeno y subir solo cuando haga falta suele ser la estrategia mas segura y eficiente."
  ),
  fillStep(
    "Completa los espacios - Elige con estrategia!",
    "Completa la regla practica para elegir el plan adecuado.",
    "\"Si estas ___ la plataforma usa el plan ___. Si eres ___ o emprendedor construyendo tu primer producto usa el ___. Si tienes un ___ que necesita colaborar en proyectos usa el ___. Si representas a una ___ con requisitos corporativos usa el ___. Empieza siempre por el plan ___ y ___ solo cuando el uso real lo justifique.\"",
    [
      "aprendiendo",
      "Free",
      "freelancer",
      "Pro",
      "equipo",
      "Business",
      "gran empresa",
      "Enterprise",
      "menor",
      "haz upgrade"
    ],
    [
      "aprendiendo",
      "Free",
      "freelancer",
      "Pro",
      "equipo",
      "Business",
      "gran empresa",
      "Enterprise",
      "menor",
      "haz upgrade",
      "abandonando",
      "salta"
    ],
    "La decision mas eficiente sigue la madurez del proyecto y no el plan que parece mas completo en papel."
  ),
  textStep(
    "Conclusion",
    "Publicar en Lovable es el momento en que el proyecto se convierte en un producto real. Entender creditos, elegir el plan correcto, probar bien antes del lanzamiento y configurar un dominio propio cuando tenga sentido te ayuda a crecer con mas metodo. El mejor plan no es el mas caro, sino el que coincide con tu etapa actual.\n\nLeccion concluida."
  ),
] as const;

export const LOVABLE_MODULE_6_STEPS_FR = [
  textStep(
    "Plans, Tarifs et Comment Lancer Votre App dans Lovable",
    "Bon retour. Dans cette lecon, vous allez apprendre a gerer le moment le plus important du developpement : la publication. Nous allons voir comment fonctionne le systeme de credits, les plans disponibles, comment choisir le bon plan et comment mettre votre application en ligne."
  ),
  textStep(
    "Le Systeme de Credits",
    "Lovable utilise un systeme de credits. Chaque interaction avec l'IA consomme des credits selon la complexite de la demande. Une edition simple coute en general moins qu'une nouvelle ecran avec plusieurs fonctionnalites."
  ),
  quizStep(
    "Comment fonctionnent les credits",
    "Comment fonctionne le systeme de credits de Lovable ?",
    [
      "Chaque message envoye a l'IA consomme des credits selon la complexite de la demande.",
      "Lovable facture un montant fixe par message quelle que soit la complexite.",
      "Les credits ne sont consommes qu'au moment de publier l'application.",
      "Le systeme de credits s'applique uniquement au plan gratuit."
    ],
    0,
    "Les demandes plus lourdes et plus complexes consomment generalement plus de credits que de simples ajustements visuels ou textuels."
  ),
  textStep(
    "Les Deux Types de Credits",
    "L'utilisation devient plus simple a comprendre lorsque vous separez les credits mensuels et les credits quotidiens. Les credits quotidiens expirent s'ils ne sont pas utilises, donc une routine reguliere profite souvent mieux du plan."
  ),
  fillStep(
    "Completez les blancs - Comprenez les credits !",
    "Completez l'explication des deux types de credits Lovable.",
    "\"Lovable propose deux types de credit : des ___ mensuels qui font partie de votre plan et ___ a la fin du mois vers le cycle suivant, ainsi que des ___ quotidiens disponibles pour tous les utilisateurs y compris le plan gratuit qui ___ a la fin de chaque journee s'ils ne sont pas utilises.\"",
    [
      "credits",
      "s'accumulent",
      "credits",
      "expirent"
    ],
    [
      "credits",
      "s'accumulent",
      "credits",
      "expirent",
      "gelent",
      "restent toujours"
    ],
    "La difference pratique est que les credits quotidiens se perdent vite, tandis que les credits mensuels suivent le cycle du plan."
  ),
  textStep(
    "Plan Gratuit",
    "Le plan gratuit est la porte d'entree pour apprendre, tester des idees et explorer la plateforme sans carte bancaire. Il convient bien a la validation initiale et aux petits MVP."
  ),
  fillStep(
    "Completez les blancs - Decouvrez le plan gratuit !",
    "Completez le resume du plan Free.",
    "\"Le plan ___ offre : ___ credits quotidiens qui se renouvellent automatiquement, des projets ___ illimites, l'integration ___ pour le controle de version et l'acces aux fonctions essentielles de la plateforme. Limitations : les projets sont toujours ___, il n'est pas possible d'utiliser un ___ personnalise et l'application affiche le ___ de Lovable.\"",
    [
      "Free",
      "5",
      "publics",
      "GitHub",
      "publics",
      "domaine",
      "badge"
    ],
    [
      "Free",
      "5",
      "publics",
      "GitHub",
      "publics",
      "domaine",
      "badge",
      "prives",
      "template"
    ],
    "Le plan gratuit est tres utile pour explorer, mais il pose des limites claires pour des lancements plus professionnels."
  ),
  textStep(
    "Plan Pro",
    "Le plan Pro est pense pour les personnes qui construisent vraiment. Il ajoute la confidentialite, le domaine personnalise et un meilleur controle de la presentation finale du produit."
  ),
  fillStep(
    "Completez les blancs - Decouvrez le plan Pro !",
    "Completez les points cles du plan Pro.",
    "\"Le plan Pro coute ___ par mois ou environ ___ par mois en annuel. Il inclut ___ credits mensuels qui ___ vers le mois suivant s'ils ne sont pas utilises, des projets ___, le support de ___ personnalise, l'option de retirer le ___ de Lovable, l'edition directe du ___ et l'integration GitHub.\"",
    [
      "$25",
      "$21",
      "100",
      "s'accumulent",
      "prives",
      "domaine",
      "badge",
      "code"
    ],
    [
      "$25",
      "$21",
      "100",
      "s'accumulent",
      "prives",
      "domaine",
      "badge",
      "code",
      "50",
      "layout"
    ],
    "Le plan Pro marque le moment ou le projet commence a ressembler a un produit professionnel."
  ),
  textStep(
    "Plan Business",
    "Le plan Business devient pertinent lorsque la construction n'est plus individuelle et implique collaboration, gouvernance et exigences internes plus fortes."
  ),
  fillStep(
    "Completez les blancs - Decouvrez le plan Business !",
    "Completez le resume du plan Business.",
    "\"Le plan Business coute ___ par mois et par utilisateur ou environ ___ en annuel. Il ajoute au plan Pro : ___ pour la connexion d'entreprise, des ___ et permissions par membre de l'equipe, des ___ de design reutilisables, une option d'___ des donnees pour les entreprises ayant des exigences de confidentialite et une ___ centralisee pour toute l'equipe.\"",
    [
      "$50",
      "$42",
      "SSO",
      "roles",
      "templates",
      "opt-out",
      "facturation"
    ],
    [
      "$50",
      "$42",
      "SSO",
      "roles",
      "templates",
      "opt-out",
      "facturation",
      "avatars",
      "theme"
    ],
    "Business a ete concu pour les equipes, avec davantage de controle et moins d'improvisation dans la collaboration."
  ),
  textStep(
    "Plan Enterprise",
    "Le plan Enterprise vise les grandes organisations avec des besoins specifiques en securite, integrations et conformite. A ce niveau, il ne s'agit plus seulement de construire vite, mais aussi de repondre a des exigences d'entreprise."
  ),
  fillStep(
    "Completez les blancs - Decouvrez Enterprise !",
    "Completez la description du plan Enterprise.",
    "\"Le plan Enterprise a un ___ personnalise negocie directement avec Lovable. Il inclut un ___ dedie, un ___ professionnel pour l'equipe, des ___ personnalisees avec les systemes internes, des ___ avances d'acces par groupe et une ___ des donnees pour la conformite. Pour y souscrire, il faut ___ une demonstration sur le site.\"",
    [
      "prix",
      "support",
      "onboarding",
      "integrations",
      "controles",
      "protection",
      "programmer"
    ],
    [
      "prix",
      "support",
      "onboarding",
      "integrations",
      "controles",
      "protection",
      "programmer",
      "module",
      "backup"
    ],
    "A ce niveau, la discussion porte surtout sur l'infrastructure, la gouvernance et l'adaptation au contexte corporate."
  ),
  textStep(
    "Comparer les Plans",
    "Comparer les plans cote a cote aide a decider avec plus de clarte. Le but n'est pas de prendre le plan le plus gros, mais celui qui correspond a votre phase actuelle."
  ),
  fillStep(
    "Completez les blancs - Comparez les plans !",
    "Completez la comparaison des quatre plans.",
    "\"Plan ___ : $0, 5 credits par jour, projets publics, ideal pour ___. Plan ___ : $25/mois, 100 credits mensuels, projets prives et domaine personnalise, ideal pour ___. Plan ___ : $50/mois par utilisateur, SSO et collaboration d'equipe, ideal pour ___. Plan ___ : prix sur demande, support dedie et integrations personnalisees, ideal pour ___.\"",
    [
      "Free",
      "apprendre et tester",
      "Pro",
      "freelances et entrepreneurs solo",
      "Business",
      "equipes et startups en croissance",
      "Enterprise",
      "grandes entreprises"
    ],
    [
      "Free",
      "apprendre et tester",
      "Pro",
      "freelances et entrepreneurs solo",
      "Business",
      "equipes et startups en croissance",
      "Enterprise",
      "grandes entreprises",
      "etudiants",
      "agences"
    ],
    "Chaque plan repond a un moment different de maturite produit et de structure d'equipe."
  ),
  textStep(
    "Comment les Credits Sont Consommes en Pratique",
    "Bien gerer ses credits depend autant du type de demande que de la maniere dont vous la formulez. Regrouper les modifications, tester entre les iterations et utiliser l'historique aide a tirer plus de valeur de chaque credit."
  ),
  fillStep(
    "Completez les blancs - Gerez vos credits !",
    "Completez les bonnes pratiques d'utilisation des credits.",
    "\"Consomment ___ credits : creer un nouvel ecran depuis zero, ajouter des fonctionnalites complexes avec base de donnees et authentification. Consomment ___ credits : ajustements visuels simples, changements de texte et corrections ponctuelles de layout. Pour economiser des credits : faites des demandes ___ et completes plutot que beaucoup de petites demandes, ___ avant de demander la modification suivante et utilisez l'___ des versions pour revenir en arriere plutot que de tout refaire.\"",
    [
      "plus",
      "moins",
      "detaillees",
      "testez chaque changement",
      "historique"
    ],
    [
      "plus",
      "moins",
      "detaillees",
      "testez chaque changement",
      "historique",
      "brouillon",
      "pause"
    ],
    "Economiser des credits depend surtout d'une bonne strategie d'iteration, pas du fait de demander moins au hasard."
  ),
  textStep(
    "Top-ups",
    "Les top-ups sont utiles quand vous avez un pic ponctuel d'utilisation et que vous ne voulez pas changer de plan durablement. Ils fonctionnent mieux comme complement occasionnel que comme remplacement permanent d'un plan plus grand."
  ),
  fillStep(
    "Completez les blancs - Utilisez les top-ups avec strategie !",
    "Completez l'explication sur les achats ponctuels de credits.",
    "\"Les top-ups sont des ___ de credits supplementaires disponibles sur les plans ___ et ___. Ils sont utiles lorsque vous avez un ___ intense de developpement sur un mois donne mais que vous ne voulez pas ___ de plan durablement. Si vous avez regulierement besoin de plus de credits chaque mois, ___ de plan est souvent plus ___ que d'acheter des top-ups en permanence.\"",
    [
      "achats",
      "Pro",
      "Business",
      "pic",
      "changer",
      "changer",
      "economique"
    ],
    [
      "achats",
      "Pro",
      "Business",
      "pic",
      "changer",
      "changer",
      "economique",
      "visuel",
      "lent"
    ],
    "Les top-ups sont pertinents pour une exception. S'ils deviennent une habitude, le plan n'est probablement plus le bon."
  ),
  textStep(
    "Publier Votre Application",
    "Avant de publier, il vaut mieux verifier la responsivite, les flux de donnees, les messages d'erreur, la coherence visuelle et des details comme le titre de l'onglet du navigateur. Publier sans cette verification augmente le risque d'une experience casse."
  ),
  quizStep(
    "Pourquoi tester sur plusieurs ecrans ?",
    "Pourquoi est-il essentiel de tester l'application sur differentes tailles d'ecran avant de publier ?",
    [
      "Parce que Lovable exige une validation formelle de la responsivite avant publication.",
      "Pour respecter des regles generales d'accessibilite numerique.",
      "Parce que les utilisateurs viendront depuis mobiles, tablettes et ordinateurs, et qu'une mauvaise experience sur l'un d'eux fait perdre des utilisateurs.",
      "La responsivite ne compte que pour les apps principalement mobiles."
    ],
    2,
    "Une bonne fonctionnalite perd vite sa valeur si l'experience casse sur l'appareil reel de l'utilisateur."
  ),
  textStep(
    "Domaine Personnalise",
    "Par defaut, Lovable publie sur un lien genere automatiquement. Dans les plans superieurs, vous pouvez connecter votre propre domaine et donner au produit une adresse plus professionnelle et plus fiable."
  ),
  fillStep(
    "Completez les blancs - Configurez votre domaine !",
    "Completez le flux de configuration du domaine personnalise.",
    "\"Pour connecter un domaine personnalise dans Lovable : ouvrez ___ dans le panneau du projet, cliquez sur ___, saisissez le domaine achete chez un registrar comme ___ ou ___, configurez les enregistrements ___ selon les instructions de Lovable et attendez la ___ du domaine, ce qui peut prendre jusqu'a ___ heures.\"",
    [
      "Settings",
      "Custom Domain",
      "GoDaddy",
      "Registro.br",
      "DNS",
      "propagation",
      "48"
    ],
    [
      "Settings",
      "Custom Domain",
      "GoDaddy",
      "Registro.br",
      "DNS",
      "propagation",
      "48",
      "cache",
      "24"
    ],
    "La connexion du domaine depend a la fois de Lovable et du registrar, d'ou l'importance du temps de propagation."
  ),
  textStep(
    "Reduction Etudiante",
    "La reduction etudiante rend le plan Pro bien plus accessible pour les personnes encore en apprentissage. Elle aide a construire un portfolio avec des fonctions professionnelles sans faire exploser le cout mensuel."
  ),
  fillStep(
    "Completez les blancs - Profitez de la reduction !",
    "Completez l'explication sur la reduction etudiante.",
    "\"Les etudiants ont ___% de reduction sur le plan Pro de Lovable en s'inscrivant avec un email ___. Cela fait passer le cout mensuel de ___ a environ ___, rendant l'acces aux projets ___, au domaine personnalise et aux fonctions professionnelles beaucoup plus accessible pendant l'apprentissage.\"",
    [
      "50",
      "universitaire",
      "$25",
      "$12,50",
      "prives"
    ],
    [
      "50",
      "universitaire",
      "$25",
      "$12,50",
      "prives",
      "publics",
      "$10"
    ],
    "Cette reduction change fortement le cout d'entree pour les etudiants qui veulent apprendre avec des ressources plus professionnelles."
  ),
  textStep(
    "Choisir le Bon Plan",
    "Le bon plan n'est pas le plus cher, mais celui qui correspond a votre usage reel. Commencer plus petit et monter seulement quand c'est necessaire reste souvent la strategie la plus sure et la plus efficace."
  ),
  fillStep(
    "Completez les blancs - Choisissez avec strategie !",
    "Completez la regle pratique pour choisir le bon plan.",
    "\"Si vous etes en train d'___ la plateforme, utilisez le plan ___. Si vous etes ___ ou entrepreneur en train de construire votre premier produit, utilisez le ___. Si vous avez une ___ qui doit collaborer sur des projets, utilisez le ___. Si vous representez une ___ avec des exigences corporate, utilisez le ___. Commencez toujours par le plan le plus ___ et ___ seulement quand l'usage reel le justifie.\"",
    [
      "apprendre",
      "Free",
      "freelance",
      "Pro",
      "equipe",
      "Business",
      "grande entreprise",
      "Enterprise",
      "petit",
      "faites upgrade"
    ],
    [
      "apprendre",
      "Free",
      "freelance",
      "Pro",
      "equipe",
      "Business",
      "grande entreprise",
      "Enterprise",
      "petit",
      "faites upgrade",
      "abandonner",
      "sautez"
    ],
    "Le choix le plus efficace suit la maturite du projet, pas le plan qui semble le plus complet sur le papier."
  ),
  textStep(
    "Conclusion",
    "Publier dans Lovable, c'est le moment ou le projet devient un vrai produit. Comprendre les credits, choisir le bon plan, bien tester avant le lancement et connecter un domaine personnalise quand cela a du sens vous aide a avancer avec plus de methode. Le meilleur plan n'est pas le plus cher, mais celui qui correspond a votre etape actuelle.\n\nLecon terminee."
  ),
] as const;
