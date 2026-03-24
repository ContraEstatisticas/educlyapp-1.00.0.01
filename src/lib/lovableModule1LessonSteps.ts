export const textStep = (title: string, content: string, promptBox?: string) => ({
  type: "text" as const,
  title,
  content,
  ...(promptBox ? { promptBox } : {}),
});

export const quizStep = (
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

export const fillStep = (
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

export const LOVABLE_MODULE_1_STEPS_PT = [
  textStep(
    "Introdução",
    "Bem-vindo de volta! Nesta lição, você vai descobrir o Lovable — a plataforma que permite criar aplicativos web completos e funcionais usando apenas linguagem natural, sem precisar escrever uma única linha de código."
  ),
  textStep(
    "O que é o Lovable?",
    "O Lovable é uma plataforma de desenvolvimento de aplicativos baseada em inteligência artificial. Você descreve em texto o que quer criar — e o Lovable constrói o aplicativo completo, com interface, funcionalidades e banco de dados — em minutos. É o fim da barreira entre ter uma ideia e ter um produto funcionando."
  ),
  quizStep(
    "O que torna o Lovable revolucionário para quem não sabe programar?",
    "Escolha a opção correta sobre o Lovable:",
    [
      "Ele transforma descrições em linguagem natural em aplicativos web completamente funcionais — com interface, lógica e banco de dados — sem exigir nenhum conhecimento técnico de programação",
      "O Lovable cria apenas protótipos visuais sem funcionalidade real",
      "Funciona apenas para desenvolvedores com experiência em código",
      "Os aplicativos criados no Lovable só funcionam dentro da própria plataforma"
    ],
    0,
    "O Lovable não cria apenas protótipos; ele constrói aplicativos web totalmente funcionais (com lógica e banco de dados) apenas interpretando regras escritas em linguagem natural."
  ),
  textStep(
    "Como o Lovable Funciona",
    "O Lovable usa IA para interpretar sua descrição, gerar o código completo do aplicativo e exibi-lo em tempo real em uma prévia ao lado do chat. Você vê o aplicativo sendo construído enquanto conversa — e pode pedir ajustes a qualquer momento."
  ),
  fillStep(
    "Entenda o fluxo!",
    "Preencha as lacunas com os termos corretos sobre o funcionamento do Lovable.",
    "Para criar seu primeiro aplicativo no Lovable: descreva o que quer {blank} em linguagem natural, aguarde a IA {blank} o código automaticamente, visualize o resultado na {blank} em tempo real, peça {blank} diretamente no chat e publique com um {blank} quando estiver pronto.",
    ["criar", "gerar", "prévia ao vivo", "ajustes e melhorias", "clique"],
    ["gerar", "prévia ao vivo", "clique", "ajustes e melhorias", "criar"],
    "Você descreve o que quer CRIAR, aguarda a IA GERAR o código, vê na PRÉVIA AO VIVO, pede AJUSTES E MELHORIAS no chat e publica com um CLIQUE."
  ),
  quizStep(
    "Diferencial do Lovable",
    "O que diferencia o Lovable de outras ferramentas de criação de sites como Wix ou Squarespace?",
    [
      "O Lovable tem mais templates prontos para escolher",
      "É mais barato do que qualquer outra plataforma de criação de sites",
      "O Lovable cria aplicativos com lógica real e funcionalidades complexas a partir de descrições em texto — enquanto ferramentas como Wix e Squarespace trabalham com templates visuais fixos sem capacidade de criar lógica personalizada",
      "O Lovable só cria landing pages e sites institucionais simples"
    ],
    2,
    "Ferramentas tradicionais baseiam-se em arrastar e soltar elementos em templates estáticos. O Lovable gera código do zero, criando lógica complexa e aplicativos totalmente funcionais."
  ),
  textStep(
    "Seu Primeiro Aplicativo — O Prompt de Criação",
    "A qualidade do que o Lovable cria depende diretamente da clareza do seu prompt inicial. Quanto mais você descreve o objetivo, o público, as funcionalidades e o visual, mais preciso será o resultado."
  ),
  fillStep(
    "Crie seu primeiro app!",
    "Preencha as lacunas com os termos do prompt.",
    "Crie um aplicativo de {blank} onde o usuário pode {blank}, {blank} e {blank}. O visual deve ser {blank} com cores {blank}. Inclua uma {blank} para adicionar novos itens e uma {blank} para marcar como concluído.",
    ["lista de tarefas", "adicionar tarefas", "editar tarefas", "deletar tarefas", "limpo e moderno", "azul e branco", "área de input", "opção"],
    ["editar tarefas", "deletar tarefas", "azul e branco", "área de input", "opção", "lista de tarefas", "limpo e moderno", "adicionar tarefas"],
    "Esse é um exemplo claro de prompt: define o objetivo (lista de tarefas), as ações (adicionar, editar, deletar), o estilo visual (limpo e moderno, azul e branco) e os componentes chave (área de input, opção de conclusão)."
  ),
  quizStep(
    "O Prompt Ideal",
    "O que deve estar presente em um bom prompt inicial para o Lovable?",
    [
      "O máximo de detalhes técnicos sobre como o código deve ser escrito",
      "Apenas o nome do aplicativo sem mais informações",
      "O objetivo do aplicativo, as funcionalidades principais, quem vai usar e a aparência desejada — quanto mais contexto você fornece, mais alinhado ao seu objetivo será o resultado gerado",
      "Prompts longos confundem o Lovable e geram resultados piores"
    ],
    2,
    "Para a IA construir exatamente o que você espera, ela precisa entender seu objetivo, as interações necessárias e a estética desejada."
  ),
  textStep(
    "Tipos de Aplicativos que Você Pode Criar",
    "O Lovable não tem limitações rígidas de tipo de aplicativo. De ferramentas simples a sistemas complexos — tudo pode ser descrito e construído."
  ),
  fillStep(
    "Identifique o tipo certo!",
    "Ligue o objetivo ao tipo de aplicativo.",
    "Para gerenciar {blank} de clientes crie um {blank}. Para vender produtos online crie uma {blank}. Para organizar projetos em equipe crie um {blank}. Para coletar informações de leads crie um {blank}. Para exibir seu trabalho profissional crie um {blank}.",
    ["informações", "CRM simples", "loja virtual", "gerenciador de projetos", "formulário inteligente", "portfólio interativo"],
    ["gerenciador de projetos", "loja virtual", "CRM simples", "portfólio interativo", "informações", "formulário inteligente"],
    "O Lovable pode criar uma enorme variedade de soluções: CRMs para gerenciar INFORMAÇÕES, LOJA VIRTUAL para vendas, GERENCIADOR DE PROJETOS, FORMULÁRIO INTELIGENTE para leads e PORTFÓLIO INTERATIVO para mostrar trabalhos."
  ),
  quizStep(
    "Complexidade no Lovable",
    "Qual é o limite real de complexidade de um aplicativo criado no Lovable?",
    [
      "O Lovable só cria aplicativos com no máximo 3 telas",
      "Aplicativos complexos com banco de dados não são possíveis no Lovable",
      "O Lovable consegue criar aplicativos com múltiplas telas, autenticação de usuários, banco de dados integrado e lógica complexa — o limite está na clareza da sua descrição, não na capacidade da plataforma",
      "Apenas aplicativos de lista e formulário funcionam bem no Lovable"
    ],
    2,
    "Não há limitação rígida por parte da plataforma; o Lovable cria sistemas completos. A principal restrição é o quão bem você consegue dividir as funcionalidades e instruir a IA."
  ),
  textStep(
    "Refinando e Melhorando seu Aplicativo",
    "Assim como em outros assistentes de IA, o refinamento iterativo é onde o Lovable realmente brilha. Você parte de uma versão inicial e vai ajustando cada detalhe através do chat."
  ),
  fillStep(
    "Refine seu aplicativo!",
    "Preencha as lacunas com o prompt de refinamento.",
    "Faça as seguintes melhorias no aplicativo: {blank} a cor do botão principal para {blank}, adicione uma {blank} de confirmação antes de deletar um item, inclua um {blank} de busca no topo da lista e mude a {blank} para uma fonte mais {blank}.",
    ["mude", "verde", "mensagem", "campo", "tipografia", "moderna e legível"],
    ["tipografia", "mensagem", "campo", "verde", "mude", "moderna e legível"],
    "Refinar envolve pedir alterações específicas: MUDE a cor para VERDE, adicione uma MENSAGEM de confirmação, um CAMPO de busca e altere a TIPOGRAFIA para que fique MODERNA E LEGÍVEL."
  ),
  quizStep(
    "O Poder da Iteração",
    "Por que o refinamento iterativo é mais eficaz do que tentar descrever tudo no primeiro prompt?",
    [
      "Porque o Lovable tem limite de caracteres no primeiro prompt",
      "Para gerar mais versões e ter mais opções para escolher",
      "Porque partir de uma base funcional e ajustar progressivamente permite ver o resultado de cada mudança em tempo real — identificando o que está bom antes de adicionar complexidade",
      "O Lovable ignora prompts de refinamento e sempre recomeça do zero"
    ],
    2,
    "Ao usar iterações, você evita sobrecarregar a IA com um milhão de requisitos. Começar com uma base sólida e adicionar componentes depois garante um app mais robusto."
  ),
  textStep(
    "Adicionando Banco de Dados e Autenticação",
    "Uma das capacidades mais poderosas do Lovable é integrar banco de dados real e sistema de login — transformando qualquer ideia em um produto com dados persistentes e usuários cadastrados."
  ),
  fillStep(
    "Adicione funcionalidades avançadas!",
    "Preencha as palavras-chave do backend.",
    "Adicione ao aplicativo: um sistema de {blank} onde o usuário pode se {blank} e fazer {blank}, um {blank} de dados para salvar as informações de cada usuário de forma {blank} e uma área {blank} onde cada usuário vê apenas seus próprios dados.",
    ["autenticação", "cadastrar", "login", "banco", "persistente", "privada"],
    ["banco", "login", "persistente", "privada", "cadastrar", "autenticação"],
    "Você pode criar um sistema de AUTENTICAÇÃO para CADASTRAR e fazer LOGIN, um BANCO para salvar em forma PERSISTENTE e criar uma área PRIVADA."
  ),
  quizStep(
    "A Importância do Banco de Dados",
    "O que a integração de banco de dados transforma em um aplicativo criado no Lovable?",
    [
      "Apenas deixa o aplicativo mais rápido e responsivo",
      "Adiciona animações e transições visuais mais sofisticadas",
      "Transforma o aplicativo de uma demonstração estática em um produto real — onde os dados dos usuários são salvos, recuperados e persistem entre sessões, tornando o aplicativo verdadeiramente funcional",
      "Banco de dados só é necessário para aplicativos com mais de 100 usuários"
    ],
    2,
    "Sem banco de dados, todo o avanço do usuário é perdido ao atualizar a página. O banco de dados a torna uma aplicação útil para valer."
  ),
  textStep(
    "Conectando o Lovable com Outras Ferramentas",
    "O Lovable se integra com ferramentas externas — expandindo as capacidades do seu aplicativo muito além do que é possível construir internamente."
  ),
  fillStep(
    "Conecte ferramentas!",
    "Como expandir as integrações do seu app.",
    "Integre o aplicativo com {blank} para processar pagamentos, conecte com {blank} para envio de e-mails automáticos, adicione {blank} para análise de dados de uso e integre com {blank} para armazenamento de arquivos e imagens dos usuários.",
    ["Stripe", "Resend ou SendGrid", "Google Analytics", "Supabase Storage"],
    ["Google Analytics", "Resend ou SendGrid", "Supabase Storage", "Stripe"],
    "STRIPE domina pagamentos; RESEND ou SENDGRID enviam e-mails; GOOGLE ANALYTICS rastreia visitantes e SUPABASE STORAGE guarda arquivos dos usuários."
  ),
  quizStep(
    "Integrações Estratégicas",
    "Por que as integrações externas são estratégicas para aplicativos criados no Lovable?",
    [
      "Porque o Lovable não consegue criar nenhuma funcionalidade por conta própria",
      "Para aumentar o número de ferramentas usadas sem necessidade real",
      "Porque cada integração adiciona uma capacidade especializada — pagamentos reais, e-mails transacionais, análise de comportamento — que transformam um aplicativo simples em um produto comercialmente viável",
      "Integrações externas só funcionam em planos pagos avançados do Lovable"
    ],
    2,
    "Conectar serviços já consolidados evita que você tenha que 'reinventar a roda' e adiciona robustez em áreas específicas (cobrar clientes, disparar e-mails, analisar tráfego)."
  ),
  textStep(
    "Publicando seu Aplicativo",
    "Uma das maiores vantagens do Lovable é a publicação com um clique — seu aplicativo vai ao ar em um link público sem precisar configurar servidores, domínios ou infraestrutura técnica."
  ),
  fillStep(
    "Publique seu app!",
    "Preencha as lacunas sobre a publicação.",
    "Para publicar seu aplicativo no Lovable: clique em {blank} no canto superior direito, o Lovable gera automaticamente um {blank} público para compartilhar, você pode conectar um {blank} personalizado nas configurações e qualquer {blank} feita após a publicação é atualizada em {blank} automaticamente.",
    ["Publish", "link", "domínio", "alteração", "tempo real"],
    ["tempo real", "alteração", "domínio", "Publish", "link"],
    "Basta clicar em PUBLISH e você ganha um LINK, onde se pode conectar um DOMÍNIO personalizado. Qualquer ALTERAÇÃO fica refletida em TEMPO REAL."
  ),
  quizStep(
    "Facilidades na Publicação",
    "O que a publicação com um clique do Lovable representa para empreendedores sem conhecimento técnico?",
    [
      "Uma forma de criar sites simples sem funcionalidade real",
      "Um recurso apenas para testes internos sem uso comercial",
      "A eliminação completa da barreira técnica entre ter uma ideia e ter um produto no ar — o que antes exigia semanas de desenvolvimento e milhares de reais agora acontece em horas sem nenhum custo de infraestrutura",
      "A publicação do Lovable só funciona para aplicativos sem banco de dados"
    ],
    2,
    "A possibilidade de publicar algo profissional com um único botão corta os altos custos e burocracia do deploy tradicional."
  ),
  textStep(
    "Lovable para Validação de Ideias de Negócio",
    "Uma das aplicações mais estratégicas do Lovable é criar MVPs — produtos mínimos viáveis — para validar ideias de negócio antes de investir em desenvolvimento profissional."
  ),
  fillStep(
    "Valide sua ideia!",
    "Preencha as lacunas da lógica do MVP.",
    "Para validar uma ideia de negócio com o Lovable: crie um {blank} funcional em horas, compartilhe com {blank} reais para coletar {blank}, analise como as pessoas {blank} com o produto e use o {blank} para decidir se vale a pena {blank} em desenvolvimento profissional.",
    ["MVP", "usuários", "feedback real", "interagem", "aprendizado", "investir"],
    ["usuários", "investir", "interagem", "feedback real", "MVP", "aprendizado"],
    "Ao criar um MVP, você atrai USUÁRIOS para ganhar FEEDBACK REAL de como INTERAGEM e transformar isso em APRENDIZADO antes de decidir se deve INVESTIR mais dinheiro."
  ),
  quizStep(
    "A estratégia do MVP",
    "Por que criar um MVP no Lovable antes de contratar uma equipe de desenvolvimento é estratégico?",
    [
      "Porque o Lovable é sempre mais barato do que qualquer desenvolvedor",
      "Para evitar completamente a necessidade de contratar desenvolvedores no futuro",
      "Porque você valida se a ideia tem demanda real com usuários reais antes de investir tempo e dinheiro em desenvolvimento profissional — reduzindo drasticamente o risco de construir algo que ninguém vai usar",
      "MVPs no Lovable não podem ser convertidos em produtos reais depois"
    ],
    2,
    "Validar demanda real usando um produto que não custou muito é a base das startups enxutas, garantindo que o seu investimento trará retorno."
  ),
  fillStep(
    "Casos de Uso Reais com o Lovable",
    "Identifique os profissionais em cada cenário.",
    "Um {blank} pode criar um sistema de agendamento para seus clientes. Um {blank} pode criar um portal de entrega de materiais e tarefas. Um {blank} pode criar uma loja com catálogo e carrinho de compras. Um {blank} pode criar um dashboard para acompanhar métricas de campanhas. Um {blank} pode criar um sistema de gestão de projetos para sua equipe.",
    ["profissional de saúde", "professor", "pequeno empreendedor", "profissional de marketing", "gestor"],
    ["pequeno empreendedor", "professor", "gestor", "profissional de marketing", "profissional de saúde"],
    "PROFISSIONAL DE SAÚDE (agendamentos), PROFESSOR (portal do aluno), PEQUENO EMPREENDEDOR (loja), PROFISSIONAL DE MARKETING (dashboard de métricas) e GESTOR (gerenciador de projetos)."
  ),
  quizStep(
    "Público-Alvo",
    "Qual profissional se beneficia mais imediatamente do Lovable?",
    [
      "Apenas desenvolvedores que querem acelerar seu trabalho",
      "Grandes empresas com equipes de tecnologia estabelecidas",
      "Qualquer profissional com uma ideia de produto digital e sem conhecimento técnico — empreendedores, consultores, professores, profissionais de saúde e criativos que sempre dependeram de terceiros para executar suas ideias tecnológicas",
      "O Lovable é indicado apenas para startups em estágio inicial"
    ],
    2,
    "O Lovable empodera pessoas que não programam mas que têm vivência ou especialistas de negócio que agora ganharam superpoderes de criação de produtos."
  ),
  fillStep(
    "Boas Práticas ao Usar o Lovable",
    "Estruturando seu uso de forma eficiente.",
    "Sempre comece descrevendo o {blank} do aplicativo antes das funcionalidades. Refine em {blank} pequenas em vez de pedir tudo de uma vez. Teste cada {blank} antes de adicionar a próxima. Use nomes {blank} para descrever botões e seções. E antes de publicar, {blank} o aplicativo como um usuário real para identificar {blank} de experiência.",
    ["objetivo principal", "etapas", "funcionalidade", "claros e específicos", "teste", "pontos de atrito"],
    ["etapas", "pontos de atrito", "teste", "objetivo principal", "funcionalidade", "claros e específicos"],
    "Foque no OBJETIVO PRINCIPAL e use ETAPAS. Adicione FUNCIONALIDADE aos poucos e dê nomes CLAROS E ESPECÍFICOS. Por fim, TESTE tudo antes e identifique PONTOS DE ATRITO."
  ),
  quizStep(
    "Erros Comuns",
    "Qual é o erro mais comum de iniciantes ao usar o Lovable?",
    [
      "Criar aplicativos muito simples para o potencial da plataforma",
      "Usar linguagem técnica nos prompts de criação",
      "Tentar descrever um aplicativo complexo completo em um único prompt — sem dar ao Lovable a chance de construir uma base sólida primeiro para depois adicionar complexidade de forma progressiva e controlada",
      "Publicar o aplicativo antes de testar todas as funcionalidades"
    ],
    2,
    "Dar instruções longas e pesadas logo no início pode atrapalhar a AI. Construa por blocos!"
  ),
  textStep(
    "Conclusão",
    "O Lovable representa uma mudança fundamental na forma como aplicativos são criados. Você não precisa mais de meses de desenvolvimento, equipe técnica ou orçamento elevado para transformar uma ideia em um produto digital real e funcional. Com prompts bem escritos, refinamento iterativo e as integrações certas, qualquer pessoa consegue criar desde uma ferramenta simples até um produto comercialmente viável — em horas. A barreira entre ter uma ideia e ter um produto no ar nunca foi tão pequena. Descreva com clareza. Refine com intenção. Publique com confiança."
  )
];

export const LOVABLE_MODULE_1_STEPS_EN = [
  textStep(
    "Introduction",
    "Welcome back! In this lesson, you will discover Lovable — the platform that allows you to create complete and functional web applications using only natural language, without having to write a single line of code."
  ),
  textStep(
    "What is Lovable?",
    "Lovable is an artificial intelligence-based application development platform. You describe in text what you want to create — and Lovable builds the complete application, with interface, features, and database — in minutes. It's the end of the barrier between having an idea and having a working product."
  ),
  quizStep(
    "What makes Lovable revolutionary for those who don't know how to code?",
    "Choose the correct option about Lovable:",
    [
      "It transforms natural language descriptions into fully functional web applications — with interface, logic, and database — without requiring any technical programming knowledge",
      "Lovable only creates visual prototypes with no real functionality",
      "It only works for developers with coding experience",
      "Applications created on Lovable only work within the platform itself"
    ],
    0,
    "Lovable doesn't just create prototypes; it builds fully functional web applications (with logic and database) just by interpreting rules written in natural language."
  ),
  textStep(
    "How Lovable Works",
    "Lovable uses AI to interpret your description, generate the complete code for the application, and display it in real time in a preview next to the chat. You see the application being built while you chat — and you can ask for adjustments at any time."
  ),
  fillStep(
    "Understand the flow!",
    "Fill in the blanks with the correct terms about how Lovable works.",
    "To create your first app in Lovable: describe what you want to {blank} in natural language, wait for the AI to {blank} the code automatically, view the result in the {blank} in real time, ask for {blank} directly in the chat, and publish with a {blank} when ready.",
    ["create", "generate", "live preview", "adjustments and improvements", "click"],
    ["generate", "live preview", "click", "adjustments and improvements", "create"],
    "You describe what you want to CREATE, wait for the AI to GENERATE the code, see it in the LIVE PREVIEW, ask for ADJUSTMENTS AND IMPROVEMENTS in the chat, and publish with a CLICK."
  ),
  quizStep(
    "Lovable's Differential",
    "What differentiates Lovable from other website creation tools like Wix or Squarespace?",
    [
      "Lovable has more ready-made templates to choose from",
      "It's cheaper than any other website creation platform",
      "Lovable creates applications with real logic and complex functionalities from text descriptions — whereas tools like Wix and Squarespace work with fixed visual templates without the ability to create custom logic",
      "Lovable only creates landing pages and simple institutional websites"
    ],
    2,
    "Traditional tools rely on dragging and dropping elements into static templates. Lovable generates code from scratch, creating complex logic and fully functional applications."
  ),
  textStep(
    "Your First App — The Creation Prompt",
    "The quality of what Lovable creates depends directly on the clarity of your initial prompt. The more you describe the goal, audience, features, and visuals, the more accurate the result will be."
  ),
  fillStep(
    "Create your first app!",
    "Fill in the blanks with the prompt terms.",
    "Create a {blank} app where the user can {blank}, {blank}, and {blank}. The look should be {blank} with {blank} colors. Include an {blank} to add new items and an {blank} to mark as done.",
    ["to-do list", "add tasks", "edit tasks", "delete tasks", "clean and modern", "blue and white", "input area", "option"],
    ["edit tasks", "delete tasks", "blue and white", "input area", "option", "to-do list", "clean and modern", "add tasks"],
    "This is a clear example of a prompt: it defines the goal (to-do list), actions (add, edit, delete), visual style (clean and modern, blue and white), and key components (input area, completion option)."
  ),
  quizStep(
    "The Ideal Prompt",
    "What should be present in a good initial prompt for Lovable?",
    [
      "The maximum amount of technical details on how the code should be written",
      "Only the name of the application without further information",
      "The goal of the application, main features, who will use it, and the desired appearance — the more context you provide, the better aligned the generated result will be with your goal",
      "Long prompts confuse Lovable and generate worse results"
    ],
    2,
    "For the AI to build exactly what you expect, it needs to understand your goal, the necessary interactions, and the desired aesthetics."
  ),
  textStep(
    "Types of Applications You Can Create",
    "Lovable has no rigid limitations on the type of application. From simple tools to complex systems — everything can be described and built."
  ),
  fillStep(
    "Identify the right type!",
    "Match the goal to the application type.",
    "To manage customer {blank} create a {blank}. To sell products online create a {blank}. To organize team projects create a {blank}. To collect lead information create a {blank}. To display your professional work create an {blank}.",
    ["information", "simple CRM", "virtual store", "project manager", "smart form", "interactive portfolio"],
    ["project manager", "virtual store", "simple CRM", "interactive portfolio", "information", "smart form"],
    "Lovable can create a huge variety of solutions: CRMs to manage INFORMATION, VIRTUAL STORE for sales, PROJECT MANAGER, SMART FORM for leads, and INTERACTIVE PORTFOLIO to showcase work."
  ),
  quizStep(
    "Complexity in Lovable",
    "What is the real limit of complexity for an application created in Lovable?",
    [
      "Lovable only creates applications with a maximum of 3 screens",
      "Complex applications with databases are not possible in Lovable",
      "Lovable can create applications with multiple screens, user authentication, integrated databases, and complex logic — the limit is in the clarity of your description, not the platform's capability",
      "Only list and form applications work well in Lovable"
    ],
    2,
    "There are no rigid platform limitations; Lovable creates complete systems. The main restriction is how well you can break down the features and instruct the AI."
  ),
  textStep(
    "Refining and Improving your App",
    "As with other AI assistants, iterative refinement is where Lovable truly shines. You start from an initial version and tweak every detail through the chat."
  ),
  fillStep(
    "Refine your app!",
    "Fill in the blanks with the refinement prompt.",
    "Make the following improvements to the app: {blank} the color of the main button to {blank}, add a confirmation {blank} before deleting an item, include a search {blank} at the top of the list, and change the {blank} to a more {blank} font.",
    ["change", "green", "message", "field", "typography", "modern and legible"],
    ["typography", "message", "field", "green", "change", "modern and legible"],
    "Refining involves asking for specific changes: CHANGE the color to GREEN, add a confirmation MESSAGE, a search FIELD, and change the TYPOGRAPHY so it's MODERN AND LEGIBLE."
  ),
  quizStep(
    "The Power of Iteration",
    "Why is iterative refinement more effective than trying to describe everything in the first prompt?",
    [
      "Because Lovable has a character limit on the first prompt",
      "To generate more versions and have more options to choose from",
      "Because starting from a functional base and progressing incrementally allows you to see the result of each change in real time — identifying what looks good before adding complexity",
      "Lovable ignores refinement prompts and always starts from scratch"
    ],
    2,
    "By using iterations, you avoid overwhelming the AI with a million requirements. Starting with a solid base and adding components later ensures a more robust app."
  ),
  textStep(
    "Adding a Database and Authentication",
    "One of Lovable's most powerful capabilities is integrating a real database and login system — transforming any idea into a product with persistent data and registered users."
  ),
  fillStep(
    "Add advanced features!",
    "Fill in the backend keywords.",
    "Add to the app: an {blank} system where users can {blank} and {blank}, a data {blank} to save each user's info {blank}, and a {blank} area where each user only sees their own data.",
    ["authentication", "register", "login", "database", "persistently", "private"],
    ["database", "login", "persistently", "private", "register", "authentication"],
    "You can create an AUTHENTICATION system to REGISTER and LOGIN, a DATABASE to save PERSISTENTLY, and a PRIVATE area."
  ),
  quizStep(
    "The Importance of a Database",
    "What does database integration transform in an application created in Lovable?",
    [
      "It just makes the app faster and more responsive",
      "It adds more sophisticated visual animations and transitions",
      "It transforms the app from a static demo into a real product — where user data is saved, retrieved, and persists across sessions, making the app truly functional",
      "A database is only necessary for apps with more than 100 users"
    ],
    2,
    "Without a database, all user progress is lost upon refreshing the page. The database makes it a genuinely useful application."
  ),
  textStep(
    "Connecting Lovable with Other Tools",
    "Lovable integrates with external tools — expanding your application's capabilities far beyond what's possible to build internally."
  ),
  fillStep(
    "Connect tools!",
    "How to expand your app's integrations.",
    "Integrate the app with {blank} to process payments, connect with {blank} for automatic emails, add {blank} for usage data analytics, and integrate with {blank} for storing user files and images.",
    ["Stripe", "Resend or SendGrid", "Google Analytics", "Supabase Storage"],
    ["Google Analytics", "Resend or SendGrid", "Supabase Storage", "Stripe"],
    "STRIPE dominates payments; RESEND or SENDGRID sends emails; GOOGLE ANALYTICS tracks visitors, and SUPABASE STORAGE stores user files."
  ),
  quizStep(
    "Strategic Integrations",
    "Why are external integrations strategic for applications created in Lovable?",
    [
      "Because Lovable can't create any functionality on its own",
      "To increase the number of tools used without real need",
      "Because each integration adds a specialized capability — real payments, transactional emails, behavior analytics — that transforms a simple app into a commercially viable product",
      "External integrations only work on Lovable's advanced paid plans"
    ],
    2,
    "Connecting consolidated services prevents you from having to 'reinvent the wheel' and adds robustness in specific areas (billing customers, sending emails, analyzing traffic)."
  ),
  textStep(
    "Publishing Your App",
    "One of Lovable's greatest advantages is one-click publishing — your app goes live on a public link without needing to set up servers, domains, or technical infrastructure."
  ),
  fillStep(
    "Publish your app!",
    "Fill in the blanks about publishing.",
    "To publish your app in Lovable: click {blank} in the top right corner, Lovable automatically generates a public {blank} to share, you can connect a custom {blank} in the settings, and any {blank} made after publishing gets updated in {blank} automatically.",
    ["Publish", "link", "domain", "change", "real time"],
    ["real time", "change", "domain", "Publish", "link"],
    "Just click PUBLISH and you get a LINK, where you can connect a custom DOMAIN. Any CHANGE is reflected in REAL TIME."
  ),
  quizStep(
    "Publishing Ease",
    "What does Lovable's one-click publishing mean for non-technical entrepreneurs?",
    [
      "A way to create simple sites with no real functionality",
      "A feature only for internal tests without commercial use",
      "The complete elimination of the technical barrier between having an idea and having a live product — what used to take weeks of development and thousands of dollars now happens in hours with no infrastructure costs",
      "Lovable publishing only works for apps without a database"
    ],
    2,
    "The ability to publish something professional with a single button cuts out the high costs and bureaucracy of traditional deployment."
  ),
  textStep(
    "Lovable for Validating Business Ideas",
    "One of Lovable's most strategic uses is creating MVPs — Minimum Viable Products — to validate business ideas before investing in professional development."
  ),
  fillStep(
    "Validate your idea!",
    "Fill in the blanks of the MVP logic.",
    "To validate a business idea with Lovable: create a functional {blank} in hours, share it with real {blank} to collect {blank}, analyze how people {blank} with the product, and use the {blank} to decide if it's worth {blank} in professional development.",
    ["MVP", "users", "real feedback", "interact", "learning", "investing"],
    ["users", "investing", "interact", "real feedback", "MVP", "learning"],
    "By creating an MVP, you attract USERS to gain REAL FEEDBACK on how they INTERACT and turn that into LEARNING before you decide whether to INVEST more money."
  ),
  quizStep(
    "The MVP Strategy",
    "Why is creating an MVP in Lovable before hiring a development team strategic?",
    [
      "Because Lovable is always cheaper than any developer",
      "To completely avoid the need to hire developers in the future",
      "Because you validate if the idea has real demand with real users before investing time and money into professional development — drastically reducing the risk of building something no one will use",
      "MVPs in Lovable cannot be converted into real products later"
    ],
    2,
    "Validating real demand using a low-cost product is the foundation of lean startups, ensuring your investment will yield returns."
  ),
  fillStep(
    "Real Use Cases with Lovable",
    "Identify the professionals in each scenario.",
    "A {blank} can create a scheduling system for clients. A {blank} can create a portal for material delivery and tasks. A {blank} can create a store with a catalog and shopping cart. A {blank} can create a dashboard to track campaign metrics. A {blank} can create a project management system for their team.",
    ["health professional", "teacher", "small entrepreneur", "marketing professional", "manager"],
    ["small entrepreneur", "teacher", "manager", "marketing professional", "health professional"],
    "HEALTH PROFESSIONAL (appointments), TEACHER (student portal), SMALL ENTREPRENEUR (store), MARKETING PROFESSIONAL (metrics dashboard), and MANAGER (project management)."
  ),
  quizStep(
    "Target Audience",
    "Which professional benefits most immediately from Lovable?",
    [
      "Only developers who want to speed up their work",
      "Large companies with established tech teams",
      "Any professional with a digital product idea and no technical knowledge — entrepreneurs, consultants, teachers, health professionals, and creatives who always relied on third parties to execute tech ideas",
      "Lovable is only suited for early-stage startups"
    ],
    2,
    "Lovable empowers non-coders who possess deep domain or business expertise, now granting them product creation superpowers."
  ),
  fillStep(
    "Best Practices When Using Lovable",
    "Structuring your usage efficiently.",
    "Always start by describing the app's {blank} before the features. Refine in small {blank} instead of asking for everything at once. {blank} each feature before adding the next. Use {blank} names to describe buttons and sections. And before publishing, {blank} the app like a real user to identify friction {blank}.",
    ["main goal", "steps", "test", "clear and specific", "test", "points"],
    ["steps", "points", "test", "main goal", "clear and specific"],
    "Focus on the MAIN GOAL and use STEPS. TEST features little by little and give CLEAR AND SPECIFIC names. Lastly, TEST it all first to find friction POINTS."
  ),
  quizStep(
    "Common Mistakes",
    "What is the most common mistake beginners make when using Lovable?",
    [
      "Creating apps that are too simple for the platform's potential",
      "Using technical jargon in creation prompts",
      "Trying to describe an entire complex application in a single prompt — without giving Lovable the chance to build a solid foundation first before adding complexity progressively and methodically",
      "Publishing the app before testing all features"
    ],
    2,
    "Giving long and heavy instructions right at the start can confuse the AI. Build it up block by block!"
  ),
  textStep(
    "Conclusion",
    "Lovable represents a fundamental shift in how apps are created. You no longer need months of development, a tech team, or a high budget to turn an idea into a real, functional digital product. With well-written prompts, iterative refinement, and the right integrations, anyone can create anything from a simple tool to a commercially viable product — in hours. The barrier between having an idea and putting a product live has never been lower. Describe clearly. Refine with intent. Publish with confidence."
  )
];
export const LOVABLE_MODULE_1_STEPS_ES = [
  textStep(
    "Introducción",
    "¡Bienvenido de vuelta! En esta lección, descubrirás Lovable — la plataforma que te permite crear aplicaciones web completas y funcionales usando solo lenguaje natural, sin necesidad de escribir una sola línea de código."
  ),
  textStep(
    "¿Qué es Lovable?",
    "Lovable es una plataforma de desarrollo de aplicaciones basada en inteligencia artificial. Describes en texto lo que quieres crear — y Lovable construye la aplicación completa, con interfaz, funcionalidades y base de datos — en minutos. Es el fin de la barrera entre tener una idea y tener un producto funcionando."
  ),
  quizStep(
    "¿Qué hace a Lovable revolucionario para quienes no saben programar?",
    "Elige la opción correcta sobre Lovable:",
    [
      "Transforma descripciones en lenguaje natural en aplicaciones web completamente funcionales — con interfaz, lógica y base de datos — sin exigir ningún conocimiento técnico de programación",
      "Lovable solo crea prototipos visuales sin funcionalidad real",
      "Solo funciona para desarrolladores con experiencia en código",
      "Las aplicaciones creadas en Lovable solo funcionan dentro de la propia plataforma"
    ],
    0,
    "Lovable no solo crea prototipos; construye aplicaciones web totalmente funcionales (con lógica y base de datos) solo interpretando reglas escritas en lenguaje natural."
  ),
  textStep(
    "Cómo Funciona Lovable",
    "Lovable usa IA para interpretar tu descripción, generar el código completo de la aplicación y mostrarlo en tiempo real en una vista previa junto al chat. Ves la aplicación construyéndose mientras chateas — y puedes pedir ajustes en cualquier momento."
  ),
  fillStep(
    "¡Entiende el flujo!",
    "Rellena los espacios en blanco con los términos correctos sobre cómo funciona Lovable.",
    "Para crear tu primera aplicación en Lovable: describe lo que quieres {blank} en lenguaje natural, espera a que la IA {blank} el código automáticamente, visualiza el resultado en la {blank} en tiempo real, pide {blank} directamente en el chat, y publica con un {blank} cuando esté lista.",
    ["crear", "generar", "vista previa", "ajustes y mejoras", "clic"],
    ["generar", "vista previa", "clic", "ajustes y mejoras", "crear"],
    "Describes lo que quieres CREAR, esperas a que la IA se encargue de GENERAR el código, lo ves en la VISTA PREVIA, pides AJUSTES Y MEJORAS en el chat y lo publicas con un CLIC."
  ),
  quizStep(
    "El Diferencial de Lovable",
    "¿Qué diferencia a Lovable de otras herramientas de creación de sitios web como Wix o Squarespace?",
    [
      "Lovable tiene más plantillas predefinidas para elegir",
      "Es más barato que cualquier otra plataforma de creación de sitios web",
      "Lovable crea aplicaciones con lógica real y funcionalidades complejas a partir de descripciones en texto — mientras que herramientas como Wix y Squarespace trabajan con plantillas visuales fijas sin capacidad de crear lógica personalizada",
      "Lovable solo crea landing pages y sitios institucionales simples"
    ],
    2,
    "Las herramientas tradicionales se basan en arrastrar y soltar elementos en plantillas estáticas. Lovable genera código desde cero, creando lógica compleja y aplicaciones totalmente funcionales."
  ),
  textStep(
    "Tu Primera Aplicación — El Prompt de Creación",
    "La calidad de lo que crea Lovable depende directamente de la claridad de tu prompt inicial. Cuanto más describas el objetivo, el público, las funcionalidades y la estética, más preciso será el resultado."
  ),
  fillStep(
    "¡Crea tu primera app!",
    "Rellena los espacios en blanco con los términos del prompt.",
    "Crea una aplicación de {blank} donde el usuario pueda {blank}, {blank} y {blank}. El aspecto debe ser {blank} con colores {blank}. Incluye una {blank} para añadir nuevos elementos y una {blank} para marcar como completado.",
    ["lista de tareas", "añadir tareas", "editar tareas", "eliminar tareas", "limpio y moderno", "azul y blanco", "área de input", "opción"],
    ["editar tareas", "eliminar tareas", "azul y blanco", "área de input", "opción", "lista de tareas", "limpio y moderno", "añadir tareas"],
    "Este es un ejemplo claro de prompt: define el objetivo (lista de tareas), las acciones (añadir, editar, eliminar), el estilo visual (limpio y moderno, azul y blanco) y los componentes clave (área de input, opción de completado)."
  ),
  quizStep(
    "El Prompt Ideal",
    "¿Qué debe estar presente en un buen prompt inicial para Lovable?",
    [
      "La mayor cantidad de detalles técnicos sobre cómo se debe escribir el código",
      "Solo el nombre de la aplicación sin más información",
      "El objetivo de la aplicación, las funcionalidades principales, quién la va a usar y la apariencia deseada — cuanta más contexto proporciones, más alineado estará el resultado generado con tu objetivo",
      "Los prompts largos confunden a Lovable y generan peores resultados"
    ],
    2,
    "Para que la IA construya exactamente lo que esperas, necesita entender tu objetivo, las interacciones necesarias y la estética deseada."
  ),
  textStep(
    "Tipos de Aplicaciones que Puedes Crear",
    "Lovable no tiene limitaciones rígidas en cuanto al tipo de aplicación. Desde herramientas simples hasta sistemas complejos — todo puede ser descrito y construido."
  ),
  fillStep(
    "¡Identifica el tipo perfecto!",
    "Relaciona el objetivo con el tipo de aplicación.",
    "Para gestionar {blank} de clientes crea un {blank}. Para vender productos online crea una {blank}. Para organizar proyectos en equipo crea un {blank}. Para recopilar información de leads crea un {blank}. Para mostrar tu trabajo profesional crea un {blank}.",
    ["información", "CRM simple", "tienda virtual", "gestor de proyectos", "formulario inteligente", "portafolio interactivo"],
    ["gestor de proyectos", "tienda virtual", "CRM simple", "portafolio interactivo", "información", "formulario inteligente"],
    "Lovable puede crear una gran variedad de soluciones: CRMs para gestionar INFORMACIÓN, TIENDA VIRTUAL para ventas, GESTOR DE PROYECTOS, FORMULARIO INTELIGENTE para leads y un PORTAFOLIO INTERACTIVO para mostrar tu trabajo."
  ),
  quizStep(
    "Complejidad en Lovable",
    "¿Cuál es el verdadero límite de complejidad de una aplicación creada en Lovable?",
    [
      "Lovable solo crea aplicaciones de hasta 3 pantallas",
      "Aplicaciones complejas con bases de datos no son posibles en Lovable",
      "Lovable puede crear aplicaciones con múltiples pantallas, autenticación de usuarios, base de datos integrada y lógica compleja — el límite está en la claridad de tu descripción, no en la capacidad de la plataforma",
      "Solo las aplicaciones de lista y formulario funcionan bien en Lovable"
    ],
    2,
    "No hay una limitación rígida por parte de la plataforma; Lovable crea sistemas completos. La principal restricción es qué tan bien puedes desglosar las funcionalidades para instruir a la IA."
  ),
  textStep(
    "Refinando y Mejorando tu Aplicación",
    "Al igual que con otros asistentes de IA, el refinamiento iterativo es donde Lovable realmente brilla. Partes de una versión inicial y ajustas cada detalle a través del chat."
  ),
  fillStep(
    "¡Refina tu aplicación!",
    "Rellena los espacios en blanco con el prompt de refinamiento.",
    "Haz las siguientes mejoras en la aplicación: {blank} el color del botón principal a {blank}, añade un {blank} de confirmación antes de borrar un elemento, incluye un {blank} de búsqueda en la parte superior de la lista y cambia la {blank} a una más {blank}.",
    ["cambia", "verde", "mensaje", "campo", "tipografía", "moderna y legible"],
    ["tipografía", "mensaje", "campo", "verde", "cambia", "moderna y legible"],
    "Refinar implica pedir cambios específicos: CAMBIA el color a VERDE, añade un MENSAJE de confirmación, un CAMPO de búsqueda y cambia la TIPOGRAFÍA para que sea MODERNA Y LEGIBLE."
  ),
  quizStep(
    "El Poder de la Iteración",
    "¿Por qué el refinamiento iterativo es más efectivo que intentar describir todo en un solo prompt inicial?",
    [
      "Porque Lovable tiene límite de caracteres en el primer prompt",
      "Para generar más versiones y tener más opciones donde elegir",
      "Porque comenzar con una base funcional y hacer ajustes progresivos te permite ver el resultado de cada cambio en tiempo real — identificando lo que funciona antes de añadir complejidad",
      "Lovable ignora los prompts de refinamiento y siempre empieza desde cero"
    ],
    2,
    "Al utilizar iteraciones, evitas abrumar a la IA con un millón de requisitos. Iniciar con una base sólida y añadir componentes después garantiza una aplicación más robusta."
  ),
  textStep(
    "Añadiendo Base de Datos y Autenticación",
    "Una de las capacidades más poderosas de Lovable es integrar una base de datos real y un sistema de inicio de sesión — transformando cualquier idea en un producto con datos persistentes y usuarios registrados."
  ),
  fillStep(
    "¡Añade funciones avanzadas!",
    "Rellena las palabras clave del sistema backend.",
    "Añade a la aplicación: un sistema de {blank} donde los usuarios puedan {blank} e iniciar {blank}, una {blank} de datos para guardar la información de cada usuario de manera {blank} y un área {blank} donde cada usuario solo vea sus propios datos.",
    ["autenticación", "registrarse", "sesión", "base", "persistente", "privada"],
    ["base", "sesión", "persistente", "privada", "registrarse", "autenticación"],
    "Puedes crear un sistema de AUTENTICACIÓN para REGISTRARSE e INICIAR SESIÓN, una BASE de datos para guardar todo de forma PERSISTENTE y un área PRIVADA."
  ),
  quizStep(
    "La Importancia de la Base de Datos",
    "¿Qué transforma la integración de la base de datos en una aplicación creada en Lovable?",
    [
      "Solo hace que la aplicación sea más rápida y fluida",
      "Añade animaciones y transiciones visuales más complejas",
      "Transforma la aplicación de una simple demostración estética en un producto real — donde los datos de los usuarios se guardan, se leen y persisten entre sesiones, haciendo que la aplicación sea verdaderamente funcional",
      "Una base de datos solo es necesaria para aplicaciones con más de 100 usuarios"
    ],
    2,
    "Sin una base de datos, todo el progreso del usuario se pierde al actualizar la página. La base de datos convierte tu proyecto en una aplicación que realmente sirve para algo."
  ),
  textStep(
    "Conectando Lovable con Otras Herramientas",
    "Lovable se integra con herramientas externas — expandiendo las capacidades de tu aplicación mucho más allá de lo que se puede construir de forma interna."
  ),
  fillStep(
    "¡Conecta herramientas!",
    "Cómo expandir las integraciones de tu app.",
    "Integra la aplicación con {blank} para cobrar pagos, conecta con {blank} para enviar correos automáticos, usa {blank} para analizar los datos de los usuarios e integra con {blank} para guardar los archivos e imágenes de los clientes.",
    ["Stripe", "Resend o SendGrid", "Google Analytics", "Supabase Storage"],
    ["Google Analytics", "Resend o SendGrid", "Supabase Storage", "Stripe"],
    "STRIPE domina los pagos; RESEND o SENDGRID envían correos; GOOGLE ANALYTICS rastrea la actividad de los usuarios y SUPABASE STORAGE aloja todo tipo de archivos y documentos."
  ),
  quizStep(
    "Integraciones Estratégicas",
    "¿Por qué las integraciones externas son estratégicas para las aplicaciones creadas en Lovable?",
    [
      "Porque Lovable no puede crear ninguna funcionalidad por sí mismo",
      "Para aumentar el número de programas utilizados sin necesidad real",
      "Porque cada integración añade una capacidad especializada — pagos reales, correos transaccionales, analítica de comportamiento — que transforman una pequeña herramienta en un gran negocio o producto viable comercialmente",
      "Las integraciones externas solo funcionan si contratas los planes de pago más altos de Lovable"
    ],
    2,
    "Conectar servicios que ya están consolidados evita tener que 'reinventar la rueda' y permite incorporar muchísima solidez y nivel empresarial en tareas complejas."
  ),
  textStep(
    "Publicando tu Aplicación",
    "Una de las mayores ventajas de Lovable es su proceso para publicar tu app con un solo clic — se publica la app online mediante un enlace público para que la use cualquiera, sin necesidad de dominar temas de infraestructuras de servidores, compras complejas de dominios u otros temas de desarrollo o servidores."
  ),
  fillStep(
    "¡Publica tu aplicación!",
    "Rellena los espacios sobre la publicación.",
    "Para publicar tu aplicación alojada en Lovable: da clic en {blank} en la esquina superior derecha, tras eso Lovable genera de inmediato y de forma automática un {blank} público para compartir la app desde ya. Además, se le sumará la facilidad de que puedas vincularle un {blank} más personalizado más adelante según los planes y también tienes la opción de ver que toda {blank} hecha en código en todo momento se pueda probar y verificar sus resultados ajustándose en {blank} al diseño.",
    ["Publish", "enlace", "dominio", "modificación", "tiempo real"],
    ["tiempo real", "modificación", "dominio", "Publish", "enlace"],
    "Es suficiente usar la opción PUBLISH de su interfaz para obtener nuestro ENLACE público con un buen aspecto desde el primer minuto; en el futuro podrás incorporar tu DOMINIO, mientras cualquier MODIFICACIÓN que ocurra dentro se verá en TIEMPO REAL."
  ),
  quizStep(
    "Facilidad para Emprender",
    "¿Qué significa la publicación de la aplicación en Lovable con un solo clic para los emprendedores o dueños de pequeños y medianos emprendimientos que no conocen la programación web?",
    [
      "Una mera alternativa gratuita para obtener portales web estáticos y sencillos",
      "Manejar recursos limitados con opciones básicas para programadores intermedios al probar y corregir aplicaciones de gran impacto global",
      "Que no requerirán depender y pagar elevadas cantidades a todo un equipo técnico en largos tiempos de producción y validación y tendrán el poder de pasar su idea en borrador al entorno global donde estén todos sus posibles clientes a coste súper accesible en cuestión de unas pocas horas con toda validación garantizada",
      "Que esto tan solo nos lo dejará visualizar unos par de minutos durante las pruebas y deberemos bajar todo a bases pesadas, enredándonos para pasarlo luego a una página web real"
    ],
    2,
    "Saber lo caro y tardío que era y es que un equipo pase una app hasta su fase de deploy o final hoy en día marca un hito; ahora en pocas horas lo lanzaremos sin los costos masivos tradicionales al tener esta posibilidad que Lovable facilita con un gran servidor de respaldo gratuito y la alternativa más premium a pocos clics y menor precio de todo el mercado para este rubro particular."
  ),
  textStep(
    "Lovable para Probar Ideas de Negocio",
    "Una de las utilidades lógicas de las que más te debes poder beneficiar ante tal poder es que te da alas para desarrollar y darle vida e iteraciones a un MVP (Producto Mínimo Viable); lo que implica validar un proyecto que en tu cabeza te pudiese suponer costarte tu propio sueldo."
  ),
  fillStep(
    "¡Valida tu idea!",
    "La clave y el concepto del MVP con Lovable.",
    "Desarrollar, iterar y validar un verdadero negocio o concepto usando sólamente a Lovable requeriría que tengas preparado tan sólo esta lógica de MVP: primero construir un {blank} o servicio útil en unas pocas horas, luego tendrás que dárselo a usar y validar a las personas como los propios posibles futuros {blank} que generarán una retribución valiosa de {blank}. A través del panel vas conociendo bien a nivel general cómo este grupo de personas navegan, cliquean e {blank} y luego usas ese asombroso grado de {blank} sacado en unos días u horas, para poder medir mejor qué vas a cobrar y si merece ir más lejos y comenzar en realidad a {blank} tu tiempo.",
    ["MVP", "usuarios", "feedback real", "interactúan", "conocimiento", "invertir"],
    ["usuarios", "invertir", "interactúan", "feedback real", "MVP", "conocimiento"],
    "Ese es el poder tan inmenso que Lovable ahora le dará al emprendedor: todo lo referente a sacar al MVP para validarlo obteniendo USUARIOS que brinden un FEEDBACK REAL observando cómo es que de hecho INTERACTÚAN con las opciones logrando ganar muchísimo CONOCIMIENTO a tal extremo que validará con grandes éxitos si realmente resulta provechoso o idóneo de una vez por todas INVERTIR."
  ),
  quizStep(
    "Estrategias Lean aplicadas al Desarrollo",
    "¿Por qué usar todas estas herramientas en conjunto con un simple Lovable a base de IA para forjar MVPs iniciales o productos de prueba antes del contrato de ingenieros o expertos resulta ser el movimiento de emprendimiento de negocios moderno más infalible hoy por hoy?",
    [
      "Debido a los pocos presupuestos y escasos inversores, esto permite solo reducir grandes nóminas e impuestos costosos generados mes tras mes y no estar al borde del cierre mes tras mes logrando la sostenibilidad de negocios de baja inversión inicial en países latinos",
      "Porque no hay ninguna barrera técnica en absoluto que te pida evitar a toda costa no tocar al equipo de TI; siempre hay alternativas viables",
      "Gracias a todo lo aprendido: porque de entrada evitas caer en la principal falla global de startups en el rubro debido a que logras primero ver, probar e interactuar comprobando junto con verdaderas validaciones de demanda con lo fundamental desde Lovable la reacción total de las personas minimizando cualquier tipo o nivel de un gran descalabro financiero, de recursos temporales o gastos humanos evitándote una caída monumental al final de cualquier etapa sin sentido",
      "Esto solo beneficia en escenarios únicos donde hay productos estrictamente limitados en sus características o de funciones menores como sitios de citas"
    ],
    2,
    "Lovable garantiza reducir al mínimo riesgo financiero en proyectos fallidos desde la idea ya que puedes interactuar con clientes de forma inmediata obteniendo pruebas directas de validación. Y así evitas arruinar tu capital pagando de miles de dólares a todo equipo desarrollador de meses"
  ),
  fillStep(
    "Los Perfiles Recomendados",
    "¿Sabes encontrar casos y profesiones de éxito reales? Relaciona cada caso de esta lista.",
    "Una sencilla interfaz para coordinar horas médicas y servicios: un {blank}. Aquel profesional de la educación creando y dictando las clases en los tableros internos a usuarios que se le asocian directamente en las materias: el gran {blank}. Una plataforma con productos y el catálogo en un carrito funcional puede ir ideal para un {blank}. El caso donde requieras ver datos, revisar KPI e inversiones de anuncios para cada nueva venta en una pantalla un {blank} lo desearía. El típico sistema avanzado corporativo capaz de delegar funciones al área o empresa para organizar un flujo y medir logros la construiría tu {blank}.",
    ["profesional de salud", "docente", "pequeño comerciante", "profesional de marketing", "gestor"],
    ["pequeño comerciante", "docente", "gestor", "profesional de marketing", "profesional de salud"],
    "Una gran coincidencia, un PROFESIONAL DE SALUD es perfecto para coordinar citas o historias médicas, el perfil ideal o caso útil en portales internos es un DOCENTE, un sistema moderno de ventas en línea es tu opción si la idea proviene de un PEQUEÑO COMERCIANTE, todo lo concerniente a un tablero avanzado lo diseña a puro código base cualquier PROFESIONAL DE MARKETING en minutos. Lo ideal para manejo en corporativos amplios o pequeños será requerido y diseñado bajo la IA velozmente por cualquier GESTOR de equipos."
  ),
  quizStep(
    "Tus Públicos de Interés y Beneficiarios Creadores directos",
    "Tras comprender que para programar plataformas asombrosamente completas en un récord asombroso el código lo puede hacer hoy Lovable sin que estés en eso en lugar de delegarlo de manera carísima; ¿cuál rol o profesionista se ve inmediatamente empoderado de sus talentos al cien por ciento y logrando cosas épicas usando a su favor a Lovable?",
    [
      "Estudiantes o jóvenes que requieren hacer páginas webs a la vez para sus prácticas sin un fin de uso real corporativo comercial ni masivo para la aprobación",
      "Puros desarrolladores y analistas seniors aburridos en sus corporativos, los CEO buscando la rentabilidad técnica",
      "Definitivamente, absolutamente, todo usuario profesional en el mercado global entero hoy por hoy independientemente a la falta o experiencia que de entrada les impusiera el mercado; el caso base ideal será los que jamás crearon, es decir ese profesional soñador que jamás tuvo capital o nivel educativo técnico necesario con el deseo genuino comercial como por ejemplo maestros, consultores, creativos y visionarios de proyectos, la IA da ahora sus famosas capas, atajos y superpoderes tangibles logrando al fin romper esta limitante que afectaba por igual, sin requerir expertos terceros técnicos",
      "Toda startup tecnológica a pocos meses tras nacer intentando generar el MVP rápido y con bases de datos"
    ],
    2,
    "Literalmente. De eso trataba cuando en un comienzo de la clase mencionábamos cómo se rompía el muro por fin a toda limitación para toda esta gente experta en otra cosa que no sea el nivel profundo o nivel Senior como ingeniero y por las capacidades monetarias imposibles en muchos de ellos."
  ),
  fillStep(
    "Buenas Prácticas del Manejo con la IA",
    "Comprende el manejo.",
    "Cuando arranques por nada empieces complicándote; define o escribe más bien claramente en la primer casilla y mensaje tu más importante meta o su denominado {blank} e ignorando por un momento en las ideas, luego detalla con precisión e incorpora en {blank} lógicas y ordenadas, siempre debes poder recordar que esto requiere la paciencia de probar, iterando cada {blank} luego de ello y continuar agregando progresiva funcionalidad. Utiliza frases y términos totalmente {blank} de tal forma que puedas dar instrucciones directas, no confusas. El truco máximo que al final se traduce con un producto pulido antes que tus posibles inversores lo prueben publicadamente, consiste en ir al detalle y pasarse al entorno donde lo deberás usar e intentar a todas de una buena vez {blank} tú mismo el estado de las cosas y dar una idea precisa simulada de poder localizar posibles errores ocultos logrando percibir sus {blank} finales y reestructurarlos de ser el caso por esta tan innovadora dinámica iterativa en Lovable.",
    ["objetivo central", "etapas", "característica", "precisos y directos", "testear", "cuellos de botella"],
    ["etapas", "cuellos de botella", "testear", "objetivo central", "característica", "precisos y directos"],
    "La magia final de interactuar usando el lenguaje en cualquier chat para la elaboración o programación directa siempre será que tengas claramente el OBJETIVO CENTRAL guiándolo inteligentemente a través de un paso a paso de múltiples ETAPAS incorporando o quitándole alguna CARACTERÍSTICA dándole nombre, y reglas lógicas con instrucciones compuestas bajo la base de estar usando terminologías y enunciados PRECISOS Y DIRECTOS con este nuevo mejor amigo y asistente; una vez finalizando todo y como recomendación absoluta tras meses probándolo en producción; tómate con tranquilidad todos tus momentos antes de llegar y tener a la vez a clientes insatisfechos y siempre decídete preferible a que primero requieras loguear o entrar tú a TESTEAR y simular el ser ese nuevo e inexperto usuario notando esos terribles potenciales CUELLOS DE BOTELLA durante esos precisos y reales recorridos en Lovable."
  ),
  quizStep(
    "Erros",
    "De lo expuesto y aprendido con detalle ¿qué consideras tras tantos meses el mayor reto que suele entorpecer comúnmente en usuarios no diestros ni en tecnología ni al mandar un mensaje inicial y la respuesta al programar la web app total usando desde hoy al tan fascinante y productivo motor que da base de datos llamado Lovable a los más novatos y primerizos usando todo este poder por primera y gloriosa vez de poder lograr eso tan soñado?",
    [
      "Crean puramente plataformas ridículamente simples o de pantallas aisladas cuando su verdadera e innata destreza la alcanzan o superan tras incorporar muchos campos a la vez aprovechando desde las cuentas premium lo maravilloso",
      "Porque mandan o describen palabras rebuscadas provenientes del sector informático para impresionar que logran despistar al propio modelo interno afectando negativamente desde la primera interacción generadora, afectando al backend sin necesidad al dar una petición que pudo formularse con sus palabras y su propia esencia",
      "Serían puramente el hecho más recurrente y mortal y que los agobie que un solo usuario en su propio desespero o ansiedad y de golpe intentar meter toda esa enorme y grande cantidad infinita de detalles minuciosos del código del front, requerimientos visuales detallados paso a paso de animaciones de logotipos, campos inmensos, variables complicadas a un ritmo precipitado para tan sola una y pobre e inmensa petición base sin entender esto de los bloques para no estallar al chat de un proyecto ambicioso perdiendo todos esos increíbles recursos generadores que poco a poco escalándolo sería de otra y de forma más espectacular su ejecución a todo poder de la IA y del código logrando tener bajo sus comandos de control las revisiones necesarias y la optimización en vivo",
      "Que no publican de forma continua dejando un poco abandonadas o sin actualizar con los respectivos reportes todos esas asombrosas aplicaciones desarrolladas bajo entornos corporativos y de gran facturación que ahora podrían"
    ],
    2,
    "Eso es así para la mayoría al iniciarse aquí o con los demás chatbots: se les pide arrancar progresivamente como si una gran construcción requiriese siempre de fundaciones en inicio por las tantas confusiones. Dejamos que ellos creen los primeros ladrillos con peticiones sólidas, probables y bases firmes y así paulatinamente le vamos incluyendo complejidades y de esto resulta las famosas maravillas informáticas por iteración en lugar a los temidos mensajes repletos con la instrucción infinita al momento sin dar espacio de entendimiento ni optimización con este grandísimo Lovable."
  ),
  textStep(
    "Consideraciones Finales Especiales",
    "Finalmente para culminarlos a un nivel altísimo hoy y con estos tantos conocimientos reales y actualísimos dados y transmitido en este breve pero al parecer de un impacto asombrosamente alto al lograr el fin que todo emprendimiento ha querido durante años. De tal manera resumidamente a todo Lovable lograste ya comprender cómo su presencia actual e incursión tan atrevida logrará un giro tan absoluto o rotundo en cómo todos lograrán generar sus ideas al transformarlas gracias a todo aquello tan mágico e inesperado donde sus limitados ingresos ya jamás serán frenos. Su simplicidad sumada a potentes comandos con refinamiento iterando asombrosamente los detalles minuciosos que van de la mano dadas mediante todas estas integraciones tan corporativamente requeridas; las posibilitará a ser un arma invaluable haciendo una increíble demostración o realidad con alto de rentabilidad al menos en gran porción en una sola corta e inspiradora tarde con un presupuesto y conocimiento básico cero. Por todo esto, hoy tu límite será puramente las bases de tu imaginación y la claridad que mantendrás siempre del usuario. Exprésales las ordenes a tu asistente sin dudar y evalúa el trabajo resultante logrando generar grandes maravillas hasta estar cien o totalmente complacido con los resultados y logres ir seguro a probar con ese primer usuario oficial e iniciar esa gran trayectoria que hoy esta innovación te posibilita."
  )
];
export const LOVABLE_MODULE_1_STEPS_FR = [
  textStep(
    "Introduction",
    "Bon retour ! Dans cette leçon, vous allez découvrir Lovable — la plateforme qui vous permet de créer des applications web complètes et fonctionnelles en utilisant uniquement le langage naturel, sans avoir besoin d'écrire une seule ligne de code."
  ),
  textStep(
    "Qu'est-ce que Lovable ?",
    "Lovable est une plateforme de développement d'applications basée sur l'intelligence artificielle. Vous décrivez par texte ce que vous souhaitez créer — et Lovable construit l'application complète, avec interface, fonctionnalités et base de données — en quelques minutes. C'est la fin de la barrière entre avoir une idée et avoir un produit fonctionnel."
  ),
  quizStep(
    "Qu'est-ce qui rend Lovable révolutionnaire pour ceux qui ne savent pas programmer ?",
    "Choisissez la bonne option concernant Lovable :",
    [
      "Il transforme les descriptions en langage naturel en applications web entièrement fonctionnelles — avec interface, logique et base de données — sans exiger aucune connaissance technique en programmation",
      "Lovable ne crée que des prototypes visuels sans vraie fonctionnalité",
      "Il ne fonctionne que pour les développeurs ayant de l'expérience en codage",
      "Les applications créées sur Lovable ne fonctionnent qu'au sein de la plateforme elle-même"
    ],
    0,
    "Lovable ne fait pas que créer des prototypes ; il construit des applications web entièrement fonctionnelles (avec logique et base de données) simplement en interprétant des règles écrites en langage naturel."
  ),
  textStep(
    "Comment Lovable fonctionne",
    "Lovable utilise l'IA pour interpréter votre description, générer le code complet de l'application et l'afficher en temps réel dans un aperçu à côté du chat. Vous voyez l'application se construire pendant que vous discutez — et vous pouvez demander des ajustements à tout moment."
  ),
  fillStep(
    "Comprenez le processus !",
    "Remplissez les espaces vides avec les termes corrects sur le fonctionnement de Lovable.",
    "Pour créer votre première application dans Lovable : décrivez ce que vous voulez {blank} en langage naturel, attendez que l'IA {blank} le code automatiquement, visualisez le résultat dans l'{blank} en temps réel, demandez des {blank} directement dans le chat, et publiez avec un {blank} quand c'est prêt.",
    ["créer", "générer", "aperçu en direct", "ajustements et améliorations", "clic"],
    ["générer", "aperçu en direct", "clic", "ajustements et améliorations", "créer"],
    "Vous décrivez ce que vous voulez CRÉER, attendez que l'IA se charge de GÉNÉRER le code, vous le voyez dans l'APERÇU EN DIRECT, vous demandez des AJUSTEMENTS ET AMÉLIORATIONS dans le chat et vous publiez avec un CLIC."
  ),
  quizStep(
    "La différence Lovable",
    "Qu'est-ce qui différencie Lovable des autres outils de création de sites web comme Wix ou Squarespace ?",
    [
      "Lovable a plus de modèles prêts à l'emploi parmi lesquels choisir",
      "Il est moins cher que n'importe quelle autre plateforme de création de sites web",
      "Lovable crée des applications avec une vraie logique et des fonctionnalités complexes à partir de descriptions textuelles — tandis que des outils comme Wix et Squarespace travaillent avec des modèles visuels fixes sans capacité de créer une logique personnalisée",
      "Lovable ne crée que des pages de destination et des sites institutionnels simples"
    ],
    2,
    "Les outils traditionnels se basent sur le glisser-déposer d'éléments dans des modèles statiques. Lovable génère du code de zéro, créant une logique complexe et des applications totalement fonctionnelles."
  ),
  textStep(
    "Votre première App — L'invite de création",
    "La qualité de ce que Lovable crée dépend directement de la clarté de votre invite initiale (prompt). Plus vous décrivez l'objectif, le public, les fonctionnalités et les visuels, plus le résultat sera précis."
  ),
  fillStep(
    "Créez votre première app !",
    "Remplissez les espaces vides avec les termes de l'invite.",
    "Créez une application de {blank} où l'utilisateur peut {blank}, {blank} et {blank}. Le visuel doit être {blank} avec des couleurs {blank}. Incluez une {blank} pour ajouter de nouveaux éléments et une {blank} pour marquer comme terminé.",
    ["liste de tâches", "ajouter des tâches", "modifier des tâches", "supprimer des tâches", "épuré et moderne", "bleu et blanc", "zone de saisie", "option"],
    ["modifier des tâches", "supprimer des tâches", "bleu et blanc", "zone de saisie", "option", "liste de tâches", "épuré et moderne", "ajouter des tâches"],
    "Ceci est un exemple clair d'invite : il définit l'objectif (liste de tâches), les actions (ajouter, modifier, supprimer), le style visuel (épuré et moderne, bleu et blanc) et les composants clés (zone de saisie, option d'achèvement)."
  ),
  quizStep(
    "L'invite idéale",
    "Qu'est-ce qui devrait être présent dans une bonne invite initiale pour Lovable ?",
    [
      "Le maximum de détails techniques sur la façon dont le code doit être écrit",
      "Seulement le nom de l'application sans plus d'informations",
      "L'objectif de l'application, les principales fonctionnalités, qui va l'utiliser et l'apparence souhaitée — plus vous fournissez de contexte, plus le résultat généré sera aligné avec votre objectif",
      "Les invites longues perturbent Lovable et génèrent de moins bons résultats"
    ],
    2,
    "Pour que l'IA construise exactement ce que vous attendez, elle doit comprendre votre objectif, les interactions nécessaires et l'esthétique souhaitée."
  ),
  textStep(
    "Types d'applications que vous pouvez créer",
    "Lovable n'a pas de limites strictes sur le type d'application. Des outils simples aux systèmes complexes — tout peut être décrit et construit."
  ),
  fillStep(
    "Identifiez le bon type !",
    "Associez l'objectif au type d'application.",
    "Pour gérer les {blank} clients, créez un {blank}. Pour vendre des produits en ligne, créez une {blank}. Pour organiser des projets d'équipe, créez un {blank}. Pour collecter des informations sur des prospects, créez un {blank}. Pour afficher votre travail professionnel, créez un {blank}.",
    ["informations", "CRM simple", "boutique en ligne", "gestionnaire de projets", "formulaire intelligent", "portfolio interactif"],
    ["gestionnaire de projets", "boutique en ligne", "CRM simple", "portfolio interactif", "informations", "formulaire intelligent"],
    "Lovable peut créer une grande variété de solutions : des CRM pour gérer les INFORMATIONS, une BOUTIQUE EN LIGNE pour les ventes, un GESTIONNAIRE DE PROJETS, un FORMULAIRE INTELLIGENT pour les prospects et un PORTFOLIO INTERACTIF pour montrer votre travail."
  ),
  quizStep(
    "Complexité dans Lovable",
    "Quelle est la véritable limite de complexité pour une application créée dans Lovable ?",
    [
      "Lovable ne crée que des applications avec un maximum de 3 écrans",
      "Les applications complexes avec bases de données ne sont pas possibles dans Lovable",
      "Lovable peut créer des applications avec plusieurs écrans, authentification des utilisateurs, base de données intégrée et logique complexe — la limite réside dans la clarté de votre description, non dans la capacité de la plateforme",
      "Seules les applications de liste et de formulaire fonctionnent bien dans Lovable"
    ],
    2,
    "Il n'y a aucune limitation stricte de la part de la plateforme ; Lovable crée des systèmes complets. La principale contrainte est de savoir comment bien décomposer les fonctionnalités pour instruire l'IA."
  ),
  textStep(
    "Affiner et améliorer votre application",
    "Comme avec d'autres assistants IA, le raffinement itératif est là où Lovable brille vraiment. Vous partez d'une version initiale et vous ajustez chaque détail via le chat."
  ),
  fillStep(
    "Affinez votre application !",
    "Remplissez les espaces vides avec l'invite d'amélioration.",
    "Apportez les améliorations suivantes : {blank} la couleur du bouton principal en {blank}, ajoutez un {blank} de confirmation avant de supprimer un élément, incluez un {blank} de recherche en haut de la liste, et passez la {blank} à une police plus {blank}.",
    ["changez", "vert", "message", "champ", "typographie", "moderne et lisible"],
    ["typographie", "message", "champ", "vert", "changez", "moderne et lisible"],
    "Affiner consiste à demander des changements spécifiques : CHANGEZ la couleur en VERT, ajoutez un MESSAGE de confirmation, un CHAMP de recherche et modifier la TYPOGRAPHIE pour qu'elle soit MODERNE ET LISIBLE."
  ),
  quizStep(
    "Le pouvoir de l'itération",
    "Pourquoi le raffinement itératif est-il plus efficace que d'essayer de tout décrire dans la première invite ?",
    [
      "Parce que Lovable a une limite de caractères pour la première invite",
      "Pour générer plus de versions et avoir plus d'options à choisir",
      "Parce que commencer avec une base fonctionnelle et faire des ajustements progressifs vous permet de voir le résultat de chaque changement en temps réel — identifiant ce qui fonctionne avant d'ajouter de la complexité",
      "Lovable ignore les invites de raffinement et recommence toujours à zéro"
    ],
    2,
    "En utilisant des itérations, vous évitez de surcharger l'IA avec un million d'exigences. Commencer par une base solide et ajouter des composants plus tard garantit une application plus robuste."
  ),
  textStep(
    "Ajout d'une base de données et d'authentification",
    "L'une des capacités les plus puissantes de Lovable est d'intégrer une vraie base de données et un système de connexion — transformant n'importe quelle idée en un produit avec des données persistantes et des utilisateurs enregistrés."
  ),
  fillStep(
    "Ajoutez des fonctionnalités avancées !",
    "Remplissez les mots-clés du système backend.",
    "Ajoutez à l'application : un système d'{blank} où les utilisateurs peuvent s'{blank} et se {blank}, une {blank} de données pour sauvegarder les informations de chaque utilisateur de manière {blank} et une zone {blank} où chaque utilisateur ne voit que ses propres données.",
    ["authentification", "inscrire", "connecter", "base", "persistante", "privée"],
    ["base", "connecter", "persistante", "privée", "inscrire", "authentification"],
    "Vous pouvez créer un système d'AUTHENTIFICATION pour s'INSCRIRE et se CONNECTER, une BASE de données pour enregistrer de manière PERSISTANTE et une zone PRIVÉE."
  ),
  quizStep(
    "L'importance de la base de données",
    "Que transforme l'intégration de base de données dans une application créée dans Lovable ?",
    [
      "Cela rend juste l'application plus rapide et plus réactive",
      "Cela ajoute des animations visuelles et des transitions plus sophistiquées",
      "Cela transforme l'application d'une démonstration statique en un vrai produit — où les données des utilisateurs sont sauvegardées, récupérées et persistent d'une session à l'autre, rendant l'application vraiment fonctionnelle",
      "Une base de données n'est nécessaire que pour les applications de plus de 100 utilisateurs"
    ],
    2,
    "Sans base de données, toute la progression de l'utilisateur est perdue lors du rafraîchissement de la page. La base de données en fait une application véritablement utile."
  ),
  textStep(
    "Connecter Lovable à d'autres outils",
    "Lovable s'intègre à des outils externes — élargissant les capacités de votre application bien au-delà de ce qu'il est possible de construire en interne."
  ),
  fillStep(
    "Connectez des outils !",
    "Comment développer les intégrations de votre app.",
    "Intégrez l'application à {blank} pour traiter les paiements, connectez-la à {blank} pour envoyer des e-mails automatiques, utilisez {blank} pour analyser les données des utilisateurs, et intégrez {blank} pour enregistrer les fichiers et images des clients.",
    ["Stripe", "Resend ou SendGrid", "Google Analytics", "Supabase Storage"],
    ["Google Analytics", "Resend ou SendGrid", "Supabase Storage", "Stripe"],
    "STRIPE domine les paiements ; RESEND ou SENDGRID envoient des e-mails ; GOOGLE ANALYTICS suit les visiteurs et SUPABASE STORAGE stocke toutes sortes de fichiers et documents."
  ),
  quizStep(
    "Intégrations stratégiques",
    "Pourquoi les intégrations externes sont-elles stratégiques pour les applications créées dans Lovable ?",
    [
      "Parce que Lovable ne peut créer aucune fonctionnalité par lui-même",
      "Pour augmenter le nombre d'outils utilisés sans réel besoin",
      "Parce que chaque intégration ajoute une capacité spécialisée — vrais paiements, e-mails transactionnels, analyse de comportement — qui transforment une simple application en un grand produit commercialement viable",
      "Les intégrations externes ne fonctionnent que si vous souscrivez aux plans payants les plus élevés de Lovable"
    ],
    2,
    "Connecter des services déjà consolidés évite d'avoir à « réinventer la roue » et ajoute une grande solidité dans des domaines spécifiques (facturer les clients, envoyer des e-mails, analyser le trafic)."
  ),
  textStep(
    "Publication de votre application",
    "L'un des plus grands avantages de Lovable est sa publication en un clic — votre application est mise en ligne via un lien public sans avoir besoin de configurer de serveurs, de domaines ou d'infrastructure technique."
  ),
  fillStep(
    "Publiez votre application !",
    "Remplissez les espaces concernant la publication.",
    "Pour publier votre application dans Lovable : cliquez sur {blank} dans le coin supérieur droit, Lovable génère automatiquement un {blank} public à partager, vous pourrez lui connecter un {blank} plus personnalisé ensuite, et toute {blank} effectuée après coup s'actualise en {blank} automatiquement.",
    ["Publish", "lien", "domaine", "modification", "temps réel"],
    ["temps réel", "modification", "domaine", "Publish", "lien"],
    "Il suffit de cliquer sur PUBLISH et vous obtenez un LIEN, où vous pourrez y connecter par la suite un DOMAINE personnalisé. Toute MODIFICATION est répercutée en TEMPS RÉEL."
  ),
  quizStep(
    "Facilité de déploiement",
    "Que représente la publication en un clic de Lovable pour des entrepreneurs non techniques ?",
    [
      "Un moyen de créer des sites simples sans fonctionnalité réelle",
      "Une fonctionnalité réservée aux tests internes sans usage commercial",
      "L'élimination complète de la barrière technique entre avoir une idée et avoir un produit en ligne — ce qui nécessitait auparavant des semaines de développement et des milliers de dollars se fait maintenant en quelques heures sans coûts d'infrastructure",
      "La publication Lovable ne fonctionne que pour les applications sans base de données"
    ],
    2,
    "La possibilité de déployer quelque chose de professionnel via un simple bouton supprime les coûts énormes et les défis de serveurs traditionnels."
  ),
  textStep(
    "Lovable pour valider des idées d'entreprise",
    "L'un des cas d'utilisation les plus stratégiques de Lovable est la création de MVP — Produits Minimum Viables — pour valider des idées avant d'investir dans un développement professionnel."
  ),
  fillStep(
    "Validez votre idée !",
    "Remplissez les blancs sur le concept de MVP.",
    "Pour valider une idée d'entreprise avec Lovable : créez un {blank} fonctionnel en quelques heures, partagez-le avec de vrais {blank} pour recueillir de vrais {blank}, analysez comment les gens {blank} avec le produit et utilisez l'{blank} pour décider s'il vaut la peine d'{blank} dans le développement professionnel.",
    ["MVP", "utilisateurs", "retours", "interagissent", "apprentissage", "investir"],
    ["utilisateurs", "investir", "interagissent", "retours", "MVP", "apprentissage"],
    "En créant un MVP, vous attirez des UTILISATEURS pour obtenir de vrais RETOURS sur la façon dont ils INTERAGISSENT, puis transformez cet APPRENTISSAGE pour décider d'INVESTIR plus d'argent ou non."
  ),
  quizStep(
    "La stratégie MVP",
    "Pourquoi créer un MVP dans Lovable avant d'embaucher une équipe de développement est-il stratégique ?",
    [
      "Parce que Lovable est toujours moins cher que n'importe quel développeur",
      "Pour éviter complètement d'avoir besoin d'embaucher des développeurs à l'avenir",
      "Parce que vous validez que l'idée suscite une vraie demande avec de vrais utilisateurs avant d'investir du temps et de l'argent dans un développement professionnel — réduisant considérablement le risque de construire quelque chose que personne ne voudra",
      "Les MVP dans Lovable ne peuvent pas être convertis en vrais produits plus tard"
    ],
    2,
    "Valider la demande réelle en utilisant un produit à faible coût est la base des startups Lean, s'assurant que votre investissement portera ses fruits."
  ),
  fillStep(
    "Cas d'utilisation réels de Lovable",
    "Identifiez les professionnels recommandés.",
    "Un {blank} peut créer un système de planification pour ses patients. Un {blank} peut créer un portail numérique pour les cours. Un {blank} peut créer une boutique avec le catalogue de vente. Un {blank} peut créer un tableau de bord des métriques publicitaires. Un {blank} peut créer un système de suivi d'équipe avancé.",
    ["professionnel de santé", "enseignant", "petit entrepreneur", "professionnel du marketing", "gestionnaire"],
    ["petit entrepreneur", "enseignant", "gestionnaire", "professionnel du marketing", "professionnel de santé"],
    "Générer une plateforme de rendez-vous est l'idéal pour le PROFESSIONNEL DE SANTÉ, le portail est pour l'ENSEIGNANT, une boutique facile pour le PETIT ENTREPRENEUR, le tableau de bord pour le PROFESSIONNEL DU MARKETING et le suivi d'équipes pour le GESTIONNAIRE."
  ),
  quizStep(
    "Le grand bénéficiaire",
    "Quel professionnel bénéficie le plus immédiatement de Lovable ?",
    [
      "Seuls les développeurs qui cherchent à accélérer leur travail",
      "Les grandes entreprises avec des équipes technologiques déjà en place",
      "Tout professionnel ayant une idée de produit numérique et aucune connaissance technique — entrepreneurs, consultants, enseignants, professionnels de la santé et créatifs qui dépendaient toujours de tiers pour réaliser leurs projets numériques",
      "Lovable n'est destiné qu'aux startups en démarrage précoce"
    ],
    2,
    "Lovable donne le pouvoir à ceux qui ne codent pas mais qui ont l'expertise et l'expérience métier, leur offrant les superpouvoirs de l'ingénieur de produits."
  ),
  fillStep(
    "Bonnes Pratiques de la Création IA",
    "Faites de prompts clairs.",
    "Commencez toujours par décrire l'{blank} de l'application avant les fonctionnalités. Affinez par petites {blank} au lieu de tout demander d'un coup. {blank} chaque fonctionnalité avant d'ajouter la suivante. Utilisez des noms {blank} pour décrire les boutons et les sections. Et avant de publier, {blank} l'application comme si vous étiez un utilisateur lambda histoire de repérer tout possible {blank} d'expérience.",
    ["objectif principal", "étapes", "Testez", "clairs et précis", "naviguez", "point de friction"],
    ["étapes", "point de friction", "naviguez", "objectif principal", "Testez", "clairs et précis"],
    "Concentrez-vous d'abord sur l'OBJECTIF PRINCIPAL et utilisez vos ÉTAPES. Naviguez et TESTEZ peu à peu en donnant des noms CLAIRS ET PRÉCIS. Enfin, NAVIGUEZ-y afin de découvrir d'éventuels POINTS DE FRICTION."
  ),
  quizStep(
    "L'erreur fondamentale",
    "Quelle est l'erreur la plus courante des débutants lorsqu'ils utilisent Lovable ?",
    [
      "Créer des applications trop simples pour le potentiel global de l'outil",
      "Invoquer des mots techniques inutiles dans les prompts au lieu de mots logiques",
      "Tenter de décrire la quasi totalité et la complexité d'une application entière en un seul lourd prompt — sans jamais donner à Lovable la chance première de construire un ciment ou une base avant d'y greffer toute la suite requise étape par étape",
      "Héberger de manière publique et payante ces serveurs dès le premier jour"
    ],
    2,
    "Donner des ordres très lourds par bloc immense noie l'IA. Prenez le réflexe de construire de brique en brique et validez le travail au fur et à mesure."
  ),
  textStep(
    "Conclusion",
    "Lovable représente un changement fondamental dans la façon dont les applications sont créées. Vous n'avez plus besoin de mois de développement, d'équipes informatiques, ou d'énormes budgets pour transformer l'idée en réalité. Avec de bonnes invites, un ajustement progressif itératif et les bonnes intégrations de tierces parties, n'importe qui de la planète est au niveau pour tout concrétiser. La fameuse barrière qui vous empêchait de mettre votre commerce en ligne avec une application n'est plus, alors n'ayez plus de freins, formulez vos souhaits avec clarté, testez et publiez le tout avec confiance et avec ce super pouvoir d'innovation absolu."
  )
];
