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

export const LOVABLE_MODULE_1_STEPS_PT = [
  textStep(
    "Lovable Criando Aplicativos com Inteligencia Artificial",
    "Bem-vindo de volta! Nesta licao, voce vai descobrir o Lovable, a plataforma que permite criar aplicativos web completos e funcionais usando linguagem natural, sem precisar escrever uma unica linha de codigo."
  ),
  textStep(
    "O que e o Lovable?",
    "O Lovable e uma plataforma de desenvolvimento de aplicativos baseada em inteligencia artificial. Voce descreve em texto o que quer criar e o Lovable constroi o aplicativo completo, com interface, funcionalidades e banco de dados, em minutos. E o fim da barreira entre ter uma ideia e ter um produto funcionando."
  ),
  quizStep(
    "O que torna o Lovable revolucionario?",
    "O que torna o Lovable revolucionario para quem nao sabe programar?",
    [
      "Ele transforma descricoes em linguagem natural em aplicativos web completamente funcionais, com interface, logica e banco de dados, sem exigir conhecimento tecnico de programacao.",
      "O Lovable cria apenas prototipos visuais sem funcionalidade real.",
      "Funciona apenas para desenvolvedores com experiencia em codigo.",
      "Os aplicativos criados no Lovable so funcionam dentro da propria plataforma."
    ],
    0,
    "O grande diferencial do Lovable e transformar descricoes em produtos web funcionais, nao apenas em mockups ou prototipos visuais."
  ),
  textStep(
    "Como o Lovable Funciona",
    "O Lovable usa IA para interpretar sua descricao, gerar o codigo completo do aplicativo e exibi-lo em tempo real em uma previa ao lado do chat. Voce ve o aplicativo sendo construido enquanto conversa e pode pedir ajustes a qualquer momento. Diferente de construtores baseados em templates fixos, ele cria logica real a partir de texto."
  ),
  fillStep(
    "Preencha a lacuna - Entenda o fluxo!",
    "Monte o fluxo basico de criacao de um app no Lovable.",
    "\"Para criar seu primeiro aplicativo no Lovable: descreva o que quer ___ em linguagem natural, aguarde a IA ___ o codigo automaticamente, visualize o resultado na ___ em tempo real, peca ___ diretamente no chat e publique com um ___ quando estiver pronto.\"",
    [
      "criar",
      "gerar",
      "previa ao vivo",
      "ajustes e melhorias",
      "clique"
    ],
    [
      "criar",
      "gerar",
      "previa ao vivo",
      "ajustes e melhorias",
      "clique",
      "ignorar",
      "template fixo",
      "rebuild manual"
    ],
    "O fluxo do Lovable parte da descricao do que voce quer criar, passa pela geracao automatica, pela previa em tempo real, pelos ajustes no chat e termina na publicacao com um clique."
  ),
  textStep(
    "Seu Primeiro Aplicativo",
    "A qualidade do que o Lovable cria depende diretamente da clareza do seu prompt inicial. Um bom prompt traz o objetivo do app, as funcionalidades principais, quem vai usar e a aparencia desejada. Quanto mais contexto, mais alinhado ao seu objetivo o resultado tende a ser."
  ),
  fillStep(
    "Preencha a lacuna - Crie seu primeiro app!",
    "Monte um prompt inicial claro para um aplicativo simples.",
    "\"Crie um aplicativo de ___ onde o usuario pode ___, ___ e ___. O visual deve ser ___ com cores ___. Inclua uma ___ para adicionar novos itens e uma ___ para marcar como concluido.\"",
    [
      "lista de tarefas",
      "adicionar tarefas",
      "editar tarefas",
      "deletar tarefas",
      "limpo e moderno",
      "azul e branco",
      "area de input",
      "opcao"
    ],
    [
      "lista de tarefas",
      "adicionar tarefas",
      "editar tarefas",
      "deletar tarefas",
      "limpo e moderno",
      "azul e branco",
      "area de input",
      "opcao",
      "sem estrutura",
      "cores aleatorias"
    ],
    "Quanto mais claro voce e sobre funcoes, visual e interacoes, maior a chance de o Lovable criar algo util ja na primeira versao."
  ),
  textStep(
    "Tipos de Aplicativos que Voce Pode Criar",
    "O Lovable nao tem limitacoes rigidas de tipo de aplicativo. De ferramentas simples a sistemas mais robustos, tudo pode ser descrito e construido. O limite esta muito mais na clareza da sua descricao do que na capacidade da plataforma."
  ),
  fillStep(
    "Preencha a lacuna - Identifique o tipo certo!",
    "Associe cada necessidade ao tipo de aplicativo mais adequado.",
    "\"Para gerenciar ___ de clientes crie um ___. Para vender produtos online crie uma ___. Para organizar projetos em equipe crie um ___. Para coletar informacoes de leads crie um ___. Para exibir seu trabalho profissional crie um ___.\"",
    [
      "informacoes",
      "CRM simples",
      "loja virtual",
      "gerenciador de projetos",
      "formulario inteligente",
      "portfolio interativo"
    ],
    [
      "informacoes",
      "CRM simples",
      "loja virtual",
      "gerenciador de projetos",
      "formulario inteligente",
      "portfolio interativo",
      "blog vazio",
      "pagina estatica"
    ],
    "Esse exercicio mostra como o Lovable pode atender varios cenarios, de operacao interna a venda, captacao e apresentacao profissional."
  ),
  textStep(
    "Refinando e Melhorando seu Aplicativo",
    "O refinamento iterativo e onde o Lovable realmente brilha. Partir de uma base funcional e ajustar progressivamente ajuda voce a ver o resultado de cada mudanca em tempo real antes de adicionar mais complexidade."
  ),
  fillStep(
    "Preencha a lacuna - Refine seu aplicativo!",
    "Peca melhorias pontuais sobre uma base que ja funciona.",
    "\"Faca as seguintes melhorias no aplicativo: ___ a cor do botao principal para ___, adicione uma ___ de confirmacao antes de deletar um item, inclua um ___ de busca no topo da lista e mude a ___ para uma fonte mais ___.\"",
    [
      "mude",
      "verde",
      "mensagem",
      "campo",
      "tipografia",
      "moderna e legivel"
    ],
    [
      "mude",
      "verde",
      "mensagem",
      "campo",
      "tipografia",
      "moderna e legivel",
      "ignore",
      "vermelho neon"
    ],
    "Refinar por partes ajuda a manter controle do app e a melhorar a experiencia sem quebrar a base que ja esta pronta."
  ),
  textStep(
    "Adicionando Banco de Dados e Autenticacao",
    "Uma das capacidades mais poderosas do Lovable e integrar banco de dados real e sistema de login. Isso transforma um app de demonstracao em um produto funcional com dados persistentes e usuarios cadastrados."
  ),
  fillStep(
    "Preencha a lacuna - Adicione funcionalidades avancadas!",
    "Monte um prompt para pedir persistencia e area privada.",
    "\"Adicione ao aplicativo: um sistema de ___ onde o usuario pode se ___ e fazer ___, um ___ de dados para salvar as informacoes de cada usuario de forma ___ e uma area ___ onde cada usuario ve apenas seus proprios dados.\"",
    [
      "autenticacao",
      "cadastrar",
      "login",
      "banco",
      "persistente",
      "privada"
    ],
    [
      "autenticacao",
      "cadastrar",
      "login",
      "banco",
      "persistente",
      "privada",
      "anonima",
      "temporaria"
    ],
    "Autenticacao, banco e area privada sao os elementos que levam o app de um prototipo para um produto de verdade."
  ),
  textStep(
    "Conectando o Lovable com Outras Ferramentas",
    "O Lovable se integra com ferramentas externas e amplia o que o aplicativo pode fazer. Essas integracoes trazem pagamentos, emails, analytics e armazenamento de arquivos sem que voce precise construir tudo do zero."
  ),
  fillStep(
    "Preencha a lacuna - Conecte ferramentas!",
    "Associe cada integracao a sua funcao principal.",
    "\"Integre o aplicativo com ___ para processar pagamentos, conecte com ___ para envio de e-mails automaticos, adicione ___ para analise de dados de uso e integre com ___ para armazenamento de arquivos e imagens dos usuarios.\"",
    [
      "Stripe",
      "Resend ou SendGrid",
      "Google Analytics",
      "Supabase Storage"
    ],
    [
      "Stripe",
      "Resend ou SendGrid",
      "Google Analytics",
      "Supabase Storage",
      "Word",
      "Paint"
    ],
    "Cada integracao adiciona uma capacidade especializada e aproxima o app de um produto pronto para uso real."
  ),
  textStep(
    "Publicando seu Aplicativo",
    "Uma das maiores vantagens do Lovable e a publicacao com um clique. O app vai ao ar em um link publico sem que voce precise configurar servidor, dominio ou infraestrutura tecnica manualmente."
  ),
  fillStep(
    "Preencha a lacuna - Publique seu app!",
    "Monte o fluxo de publicacao no Lovable.",
    "\"Para publicar seu aplicativo no Lovable: clique em ___ no canto superior direito, o Lovable gera automaticamente um ___ publico para compartilhar, voce pode conectar um ___ personalizado nas configuracoes e qualquer ___ feita apos a publicacao e atualizada em ___ automaticamente.\"",
    [
      "Publish",
      "link",
      "dominio",
      "alteracao",
      "tempo real"
    ],
    [
      "Publish",
      "link",
      "dominio",
      "alteracao",
      "tempo real",
      "backup manual",
      "servidor local"
    ],
    "A publicacao com um clique reduz a barreira tecnica e acelera muito o caminho entre prototipo e app no ar."
  ),
  textStep(
    "Lovable para Validacao de Ideias de Negocio",
    "Uma das aplicacoes mais estrategicas do Lovable e criar MVPs para validar ideias de negocio antes de investir em desenvolvimento profissional. Assim voce aprende com usuarios reais e reduz o risco de construir algo que ninguem vai usar."
  ),
  fillStep(
    "Preencha a lacuna - Valide sua ideia!",
    "Monte um fluxo de validacao com MVP.",
    "\"Para validar uma ideia de negocio com o Lovable: crie um ___ funcional em horas, compartilhe com ___ reais para coletar ___, analise como as pessoas ___ com o produto e use o ___ para decidir se vale a pena ___ em desenvolvimento profissional.\"",
    [
      "MVP",
      "usuarios",
      "feedback real",
      "interagem",
      "aprendizado",
      "investir"
    ],
    [
      "MVP",
      "usuarios",
      "feedback real",
      "interagem",
      "aprendizado",
      "investir",
      "ignorar",
      "suposicao"
    ],
    "O objetivo do MVP e aprender rapido com uso real antes de comprometer tempo e dinheiro em algo maior."
  ),
  textStep(
    "Boas Praticas ao Usar o Lovable",
    "O erro mais comum de iniciantes e tentar descrever um aplicativo complexo inteiro em um unico prompt. O melhor caminho e comecar pelo objetivo principal, construir uma base solida e adicionar complexidade aos poucos."
  ),
  fillStep(
    "Preencha a lacuna - Use com estrategia!",
    "Monte um conjunto de boas praticas para criar melhor com o Lovable.",
    "\"Sempre comece descrevendo o ___ do aplicativo antes das funcionalidades. Refine em ___ pequenas em vez de pedir tudo de uma vez. Teste cada ___ antes de adicionar a proxima. Use nomes ___ para descrever botoes e secoes. E antes de publicar, ___ o aplicativo como um usuario real para identificar ___ de experiencia.\"",
    [
      "objetivo principal",
      "etapas",
      "funcionalidade",
      "claros e especificos",
      "teste",
      "pontos de atrito"
    ],
    [
      "objetivo principal",
      "etapas",
      "funcionalidade",
      "claros e especificos",
      "teste",
      "pontos de atrito",
      "detalhes irrelevantes",
      "caos"
    ],
    "Comecar pelo objetivo, testar por etapas e nomear tudo com clareza melhora muito o resultado final e reduz retrabalho."
  ),
  textStep(
    "Conclusao",
    "O Lovable representa uma mudanca importante na forma como aplicativos sao criados. Com prompts bem escritos, refinamento iterativo e as integracoes certas, qualquer pessoa pode sair de uma ideia para um produto digital funcional em horas.\n\nLicao concluida."
  ),
] as const;

export const LOVABLE_MODULE_1_STEPS_EN = [
  textStep(
    "Lovable Creating Apps with Artificial Intelligence",
    "Welcome back! In this lesson, you will discover Lovable, the platform that lets you create complete and functional web apps using natural language without writing a single line of code."
  ),
  textStep(
    "What Is Lovable?",
    "Lovable is an AI-based app development platform. You describe in text what you want to build and Lovable creates the full app, with interface, features, and database, in minutes. It removes the barrier between having an idea and having a working product."
  ),
  quizStep(
    "What makes Lovable revolutionary?",
    "What makes Lovable revolutionary for people who do not know how to code?",
    [
      "It turns natural language descriptions into fully functional web apps with interface, logic, and database, without requiring technical programming knowledge.",
      "Lovable only creates visual prototypes with no real functionality.",
      "It only works for developers with coding experience.",
      "Apps built in Lovable only work inside the platform itself."
    ],
    0,
    "Lovable stands out because it builds real web apps from natural language instead of limiting you to static mockups or visual-only prototypes."
  ),
  textStep(
    "How Lovable Works",
    "Lovable uses AI to interpret your description, generate the full code of the app, and show it in real time in a preview next to the chat. You watch the app being built while you talk to it and can request changes at any point. Unlike tools built around rigid templates, Lovable creates real logic from text."
  ),
  fillStep(
    "Fill in the blank - Understand the flow!",
    "Build the basic Lovable creation flow.",
    "\"To create your first app in Lovable: describe what you want to ___ in natural language, wait for the AI to ___ the code automatically, view the result in the ___ in real time, ask for ___ directly in the chat, and publish with one ___ when it is ready.\"",
    [
      "create",
      "generate",
      "live preview",
      "adjustments and improvements",
      "click"
    ],
    [
      "create",
      "generate",
      "live preview",
      "adjustments and improvements",
      "click",
      "ignore",
      "fixed template",
      "manual rebuild"
    ],
    "The Lovable flow starts with describing what you want to create, then moves through automatic generation, live preview, chat-based refinements, and one-click publishing."
  ),
  textStep(
    "Your First App",
    "The quality of what Lovable creates depends directly on the clarity of your first prompt. A good prompt includes the goal of the app, the main features, who will use it, and the desired appearance. The more context you provide, the more aligned the result tends to be."
  ),
  fillStep(
    "Fill in the blank - Create your first app!",
    "Build a clear first prompt for a simple application.",
    "\"Create a ___ app where the user can ___, ___, and ___. The visual should be ___ with ___ colors. Include an ___ to add new items and an ___ to mark items as completed.\"",
    [
      "to-do list",
      "add tasks",
      "edit tasks",
      "delete tasks",
      "clean and modern",
      "blue and white",
      "input area",
      "option"
    ],
    [
      "to-do list",
      "add tasks",
      "edit tasks",
      "delete tasks",
      "clean and modern",
      "blue and white",
      "input area",
      "option",
      "without structure",
      "random colors"
    ],
    "The clearer you are about actions, interface, and style, the higher the chance Lovable will generate something useful on the first pass."
  ),
  textStep(
    "Types of Apps You Can Create",
    "Lovable does not have rigid limitations on app type. From simple tools to more robust systems, everything can be described and built. The limit is much more about the clarity of your description than the platform's capability."
  ),
  fillStep(
    "Fill in the blank - Identify the right app type!",
    "Match each need to the most suitable kind of app.",
    "\"To manage customer ___ create a ___. To sell products online create an ___. To organize team projects create a ___. To collect lead information create an ___. To showcase your professional work create an ___.\"",
    [
      "information",
      "simple CRM",
      "online store",
      "project manager",
      "smart form",
      "interactive portfolio"
    ],
    [
      "information",
      "simple CRM",
      "online store",
      "project manager",
      "smart form",
      "interactive portfolio",
      "empty blog",
      "static page"
    ],
    "This exercise shows how Lovable can support internal operations, selling, lead capture, and professional presentation."
  ),
  textStep(
    "Refining and Improving Your App",
    "Iterative refinement is where Lovable really shines. Starting from a working base and improving it step by step lets you see the impact of each change in real time before adding more complexity."
  ),
  fillStep(
    "Fill in the blank - Refine your app!",
    "Ask for targeted improvements on top of a working base.",
    "\"Make the following improvements in the app: ___ the main button color to ___, add a confirmation ___ before deleting an item, include a search ___ at the top of the list, and change the ___ to a more ___ font.\"",
    [
      "change",
      "green",
      "message",
      "field",
      "typography",
      "modern and readable"
    ],
    [
      "change",
      "green",
      "message",
      "field",
      "typography",
      "modern and readable",
      "ignore",
      "neon red"
    ],
    "Refining in small pieces helps you keep control of the app and improve the experience without breaking what already works."
  ),
  textStep(
    "Adding Database and Authentication",
    "One of Lovable's most powerful capabilities is integrating a real database and login system. That turns a demo app into a functional product with persistent data and registered users."
  ),
  fillStep(
    "Fill in the blank - Add advanced features!",
    "Build a prompt for persistence and a private area.",
    "\"Add to the app: an ___ system where the user can ___ and log in, a data ___ to save each user's information in a ___ way, and a ___ area where each user sees only their own data.\"",
    [
      "authentication",
      "sign up",
      "database",
      "persistent",
      "private"
    ],
    [
      "authentication",
      "sign up",
      "database",
      "persistent",
      "private",
      "anonymous",
      "temporary"
    ],
    "Authentication, database, and private user views are what push an app from demo to real product."
  ),
  textStep(
    "Connecting Lovable with Other Tools",
    "Lovable integrates with external tools and expands what your app can do. Those integrations add payments, email delivery, analytics, and file storage without forcing you to build everything from scratch."
  ),
  fillStep(
    "Fill in the blank - Connect tools!",
    "Match each integration to its main function.",
    "\"Integrate the app with ___ to process payments, connect it with ___ to send automatic emails, add ___ for usage analytics, and integrate ___ for storing user files and images.\"",
    [
      "Stripe",
      "Resend or SendGrid",
      "Google Analytics",
      "Supabase Storage"
    ],
    [
      "Stripe",
      "Resend or SendGrid",
      "Google Analytics",
      "Supabase Storage",
      "Word",
      "Paint"
    ],
    "Each integration adds a specialized capability and pushes the app closer to a commercially viable product."
  ),
  textStep(
    "Publishing Your App",
    "One of Lovable's biggest advantages is one-click publishing. Your app goes live on a public link without manual server, domain, or infrastructure setup."
  ),
  fillStep(
    "Fill in the blank - Publish your app!",
    "Build the Lovable publishing flow.",
    "\"To publish your app in Lovable: click ___ in the top-right corner, Lovable automatically generates a public ___ to share, you can connect a custom ___ in settings, and any ___ made after publishing is updated in ___ automatically.\"",
    [
      "Publish",
      "link",
      "domain",
      "change",
      "real time"
    ],
    [
      "Publish",
      "link",
      "domain",
      "change",
      "real time",
      "manual backup",
      "local server"
    ],
    "One-click publishing reduces the technical barrier and dramatically shortens the path from prototype to live app."
  ),
  textStep(
    "Lovable for Validating Business Ideas",
    "One of Lovable's most strategic uses is creating MVPs to validate business ideas before paying for professional development. That lets you learn from real users and reduce the risk of building something no one wants."
  ),
  fillStep(
    "Fill in the blank - Validate your idea!",
    "Build an MVP validation flow.",
    "\"To validate a business idea with Lovable: create a functional ___ in hours, share it with real ___ to collect real ___, analyze how people ___ with the product, and use that ___ to decide whether it is worth ___ in professional development.\"",
    [
      "MVP",
      "users",
      "feedback",
      "interact",
      "learning",
      "investing"
    ],
    [
      "MVP",
      "users",
      "feedback",
      "interact",
      "learning",
      "investing",
      "ignoring",
      "guesswork"
    ],
    "The point of an MVP is to learn quickly from real usage before committing larger amounts of time and money."
  ),
  textStep(
    "Best Practices When Using Lovable",
    "The most common beginner mistake is trying to describe a complex app all at once in a single prompt. The better path is to start with the main goal, build a solid base, and add complexity progressively."
  ),
  fillStep(
    "Fill in the blank - Use it strategically!",
    "Build a set of good practices for creating better with Lovable.",
    "\"Always start by describing the app's ___ before the features. Refine in small ___ instead of asking for everything at once. Test each ___ before adding the next one. Use ___ names to describe buttons and sections. And before publishing, ___ the app like a real user to identify ___ in the experience.\"",
    [
      "main goal",
      "steps",
      "feature",
      "clear and specific",
      "test",
      "friction points"
    ],
    [
      "main goal",
      "steps",
      "feature",
      "clear and specific",
      "test",
      "friction points",
      "irrelevant details",
      "chaos"
    ],
    "Starting from the main goal, testing step by step, and naming everything clearly leads to better outputs and less rework."
  ),
  textStep(
    "Conclusion",
    "Lovable represents an important change in how apps are created. With strong prompts, iterative refinement, and the right integrations, anyone can move from idea to functional digital product in hours.\n\nLesson complete."
  ),
] as const;

export const LOVABLE_MODULE_1_STEPS_ES = [
  textStep(
    "Lovable Creando Aplicaciones con Inteligencia Artificial",
    "Bienvenido de vuelta. En esta leccion descubriras Lovable, la plataforma que permite crear aplicaciones web completas y funcionales usando lenguaje natural sin escribir una sola linea de codigo."
  ),
  textStep(
    "Que es Lovable?",
    "Lovable es una plataforma de desarrollo de aplicaciones basada en inteligencia artificial. Describes en texto lo que quieres crear y Lovable construye la aplicacion completa, con interfaz, funcionalidades y base de datos, en minutos. Elimina la barrera entre tener una idea y tener un producto funcionando."
  ),
  quizStep(
    "Que hace revolucionario a Lovable?",
    "Que hace revolucionario a Lovable para quien no sabe programar?",
    [
      "Transforma descripciones en lenguaje natural en aplicaciones web completamente funcionales, con interfaz, logica y base de datos, sin exigir conocimientos tecnicos de programacion.",
      "Crea solo prototipos visuales sin funcionalidad real.",
      "Funciona solo para desarrolladores con experiencia en codigo.",
      "Las aplicaciones creadas en Lovable solo funcionan dentro de la propia plataforma."
    ],
    0,
    "Lovable destaca porque crea productos web funcionales a partir de lenguaje natural y no solo maquetas visuales."
  ),
  textStep(
    "Como Funciona Lovable",
    "Lovable usa IA para interpretar tu descripcion, generar el codigo completo de la aplicacion y mostrarlo en tiempo real en una vista previa al lado del chat. Ves la aplicacion mientras se construye y puedes pedir cambios en cualquier momento. A diferencia de herramientas basadas en plantillas fijas, genera logica real desde texto."
  ),
  fillStep(
    "Completa el espacio - Entiende el flujo!",
    "Construye el flujo basico de creacion en Lovable.",
    "\"Para crear tu primera aplicacion en Lovable: describe lo que quieres ___ en lenguaje natural, espera a que la IA ___ el codigo automaticamente, visualiza el resultado en la ___ en tiempo real, pide ___ directamente en el chat y publica con un ___ cuando este listo.\"",
    [
      "crear",
      "generar",
      "vista previa en vivo",
      "ajustes y mejoras",
      "clic"
    ],
    [
      "crear",
      "generar",
      "vista previa en vivo",
      "ajustes y mejoras",
      "clic",
      "ignorar",
      "plantilla fija",
      "rebuild manual"
    ],
    "El flujo de Lovable parte de describir lo que quieres crear, pasa por la generacion automatica y la vista previa en vivo, sigue con ajustes en el chat y termina con la publicacion en un clic."
  ),
  textStep(
    "Tu Primera Aplicacion",
    "La calidad de lo que Lovable crea depende directamente de la claridad de tu prompt inicial. Un buen prompt incluye el objetivo de la app, las funcionalidades principales, quien la va a usar y la apariencia deseada. Cuanto mas contexto des, mas alineado sera el resultado."
  ),
  fillStep(
    "Completa el espacio - Crea tu primera app!",
    "Construye un prompt inicial claro para una aplicacion sencilla.",
    "\"Crea una aplicacion de ___ donde el usuario puede ___, ___ y ___. El visual debe ser ___ con colores ___. Incluye un area de ___ para agregar nuevos items y una ___ para marcar como completado.\"",
    [
      "lista de tareas",
      "agregar tareas",
      "editar tareas",
      "borrar tareas",
      "limpio y moderno",
      "azul y blanco",
      "input",
      "opcion"
    ],
    [
      "lista de tareas",
      "agregar tareas",
      "editar tareas",
      "borrar tareas",
      "limpio y moderno",
      "azul y blanco",
      "input",
      "opcion",
      "sin estructura",
      "colores aleatorios"
    ],
    "Cuanto mas claro seas sobre acciones, interfaz y estilo, mayor sera la probabilidad de que Lovable cree algo util desde la primera version."
  ),
  textStep(
    "Tipos de Aplicaciones que Puedes Crear",
    "Lovable no tiene limites rigidos sobre el tipo de aplicacion. Desde herramientas simples hasta sistemas mas complejos, todo puede describirse y construirse. El limite esta mucho mas en la claridad de tu descripcion que en la capacidad de la plataforma."
  ),
  fillStep(
    "Completa el espacio - Identifica el tipo correcto!",
    "Relaciona cada necesidad con el tipo de aplicacion mas adecuado.",
    "\"Para gestionar ___ de clientes crea un ___. Para vender productos online crea una ___. Para organizar proyectos en equipo crea un ___. Para recopilar informacion de leads crea un ___. Para mostrar tu trabajo profesional crea un ___.\"",
    [
      "informacion",
      "CRM simple",
      "tienda online",
      "gestor de proyectos",
      "formulario inteligente",
      "portafolio interactivo"
    ],
    [
      "informacion",
      "CRM simple",
      "tienda online",
      "gestor de proyectos",
      "formulario inteligente",
      "portafolio interactivo",
      "blog vacio",
      "pagina estatica"
    ],
    "Este ejercicio muestra como Lovable puede cubrir escenarios de gestion, venta, captacion y presentacion profesional."
  ),
  textStep(
    "Refinando y Mejorando tu Aplicacion",
    "El refinamiento iterativo es donde Lovable realmente brilla. Partir de una base funcional y ajustarla paso a paso te ayuda a ver el impacto de cada cambio en tiempo real antes de anadir mas complejidad."
  ),
  fillStep(
    "Completa el espacio - Refina tu aplicacion!",
    "Pide mejoras puntuales sobre una base que ya funciona.",
    "\"Haz las siguientes mejoras en la aplicacion: ___ el color del boton principal a ___, anade un mensaje de ___ antes de borrar un item, incluye un campo de ___ en la parte superior de la lista y cambia la ___ a una fuente mas ___.\"",
    [
      "cambia",
      "verde",
      "confirmacion",
      "busqueda",
      "tipografia",
      "moderna y legible"
    ],
    [
      "cambia",
      "verde",
      "confirmacion",
      "busqueda",
      "tipografia",
      "moderna y legible",
      "ignora",
      "rojo neon"
    ],
    "Refinar por partes te ayuda a mantener control sobre la app y a mejorar la experiencia sin romper lo que ya funciona."
  ),
  textStep(
    "Anadiendo Base de Datos y Autenticacion",
    "Una de las capacidades mas potentes de Lovable es integrar una base de datos real y un sistema de login. Eso convierte una demo en un producto funcional con datos persistentes y usuarios registrados."
  ),
  fillStep(
    "Completa el espacio - Agrega funciones avanzadas!",
    "Construye un prompt para pedir persistencia y area privada.",
    "\"Agrega a la aplicacion: un sistema de ___ donde el usuario puede ___ y hacer login, una ___ de datos para guardar la informacion de cada usuario de forma ___ y un area ___ donde cada usuario vea solo sus propios datos.\"",
    [
      "autenticacion",
      "registrarse",
      "base",
      "persistente",
      "privada"
    ],
    [
      "autenticacion",
      "registrarse",
      "base",
      "persistente",
      "privada",
      "anonima",
      "temporal"
    ],
    "Autenticacion, base de datos y area privada son los elementos que llevan la app de una demo a un producto real."
  ),
  textStep(
    "Conectando Lovable con Otras Herramientas",
    "Lovable se integra con herramientas externas y amplifica lo que tu aplicacion puede hacer. Esas integraciones anaden pagos, correos, analitica y almacenamiento sin que tengas que construir todo desde cero."
  ),
  fillStep(
    "Completa el espacio - Conecta herramientas!",
    "Relaciona cada integracion con su funcion principal.",
    "\"Integra la aplicacion con ___ para procesar pagos, conectala con ___ para envio de correos automaticos, agrega ___ para analisis de uso e integra ___ para almacenamiento de archivos e imagenes de usuarios.\"",
    [
      "Stripe",
      "Resend o SendGrid",
      "Google Analytics",
      "Supabase Storage"
    ],
    [
      "Stripe",
      "Resend o SendGrid",
      "Google Analytics",
      "Supabase Storage",
      "Word",
      "Paint"
    ],
    "Cada integracion agrega una capacidad especializada y acerca la app a un producto comercialmente util."
  ),
  textStep(
    "Publicando tu Aplicacion",
    "Una de las mayores ventajas de Lovable es la publicacion con un clic. Tu aplicacion se publica en un enlace publico sin que tengas que configurar servidor, dominio o infraestructura tecnica manualmente."
  ),
  fillStep(
    "Completa el espacio - Publica tu app!",
    "Construye el flujo de publicacion en Lovable.",
    "\"Para publicar tu aplicacion en Lovable: haz clic en ___ en la esquina superior derecha, Lovable genera automaticamente un ___ publico para compartir, puedes conectar un ___ personalizado en configuraciones y cualquier ___ hecha despues de publicar se actualiza en ___ automaticamente.\"",
    [
      "Publish",
      "link",
      "dominio",
      "cambio",
      "tiempo real"
    ],
    [
      "Publish",
      "link",
      "dominio",
      "cambio",
      "tiempo real",
      "backup manual",
      "servidor local"
    ],
    "La publicacion con un clic reduce la barrera tecnica y acorta mucho el camino entre prototipo y app online."
  ),
  textStep(
    "Lovable para Validar Ideas de Negocio",
    "Uno de los usos mas estrategicos de Lovable es crear MVPs para validar ideas de negocio antes de pagar por desarrollo profesional. Asi aprendes con usuarios reales y reduces el riesgo de construir algo que nadie quiera."
  ),
  fillStep(
    "Completa el espacio - Valida tu idea!",
    "Construye un flujo de validacion con MVP.",
    "\"Para validar una idea de negocio con Lovable: crea un ___ funcional en horas, compartelo con ___ reales para obtener ___, analiza como las personas ___ con el producto y usa ese ___ para decidir si vale la pena ___ en desarrollo profesional.\"",
    [
      "MVP",
      "usuarios",
      "feedback real",
      "interactuan",
      "aprendizaje",
      "invertir"
    ],
    [
      "MVP",
      "usuarios",
      "feedback real",
      "interactuan",
      "aprendizaje",
      "invertir",
      "ignorar",
      "suposicion"
    ],
    "El objetivo del MVP es aprender rapido con uso real antes de comprometer mas tiempo y dinero."
  ),
  textStep(
    "Buenas Practicas al Usar Lovable",
    "El error mas comun de quien empieza es intentar describir toda una app compleja en un solo prompt. El mejor camino es empezar por el objetivo principal, construir una base solida y sumar complejidad de forma progresiva."
  ),
  fillStep(
    "Completa el espacio - Usa Lovable con estrategia!",
    "Construye un conjunto de buenas practicas para crear mejor con Lovable.",
    "\"Empieza siempre describiendo el ___ de la aplicacion antes de las funcionalidades. Refina en ___ pequenas en vez de pedir todo de una sola vez. Prueba cada ___ antes de agregar la siguiente. Usa nombres ___ para describir botones y secciones. Y antes de publicar, ___ la aplicacion como un usuario real para identificar ___ de experiencia.\"",
    [
      "objetivo principal",
      "etapas",
      "funcionalidad",
      "claros y especificos",
      "prueba",
      "puntos de friccion"
    ],
    [
      "objetivo principal",
      "etapas",
      "funcionalidad",
      "claros y especificos",
      "prueba",
      "puntos de friccion",
      "detalles irrelevantes",
      "caos"
    ],
    "Empezar por el objetivo, probar paso a paso y nombrar todo con claridad mejora mucho el resultado y reduce retrabajo."
  ),
  textStep(
    "Conclusion",
    "Lovable representa un cambio importante en la forma en que se crean aplicaciones. Con buenos prompts, refinamiento iterativo e integraciones correctas, cualquier persona puede pasar de una idea a un producto digital funcional en horas.\n\nLeccion completada."
  ),
] as const;

export const LOVABLE_MODULE_1_STEPS_FR = [
  textStep(
    "Lovable Creer des Applications avec l'Intelligence Artificielle",
    "Bon retour. Dans cette lecon, vous allez decouvrir Lovable, la plateforme qui permet de creer des applications web completes et fonctionnelles en utilisant le langage naturel, sans ecrire une seule ligne de code."
  ),
  textStep(
    "Qu'est-ce que Lovable ?",
    "Lovable est une plateforme de developpement d'applications basee sur l'intelligence artificielle. Vous decrivez en texte ce que vous voulez creer et Lovable construit l'application complete, avec interface, fonctionnalites et base de donnees, en quelques minutes. Cela reduit fortement la distance entre une idee et un produit en fonctionnement."
  ),
  quizStep(
    "Pourquoi Lovable est-il revolutionnaire ?",
    "Qu'est-ce qui rend Lovable revolutionnaire pour quelqu'un qui ne sait pas programmer ?",
    [
      "Il transforme des descriptions en langage naturel en applications web pleinement fonctionnelles avec interface, logique et base de donnees, sans exiger de connaissances techniques en programmation.",
      "Lovable ne cree que des prototypes visuels sans vraie fonctionnalite.",
      "Il fonctionne uniquement pour des developpeurs experimentes.",
      "Les applications creees dans Lovable ne fonctionnent qu'a l'interieur de la plateforme."
    ],
    0,
    "Lovable se distingue parce qu'il construit de vrais produits web a partir du langage naturel au lieu de se limiter a des maquettes visuelles."
  ),
  textStep(
    "Comment Fonctionne Lovable",
    "Lovable utilise l'IA pour interpreter votre description, generer le code complet de l'application et l'afficher en temps reel dans un apercu a cote du chat. Vous voyez l'application se construire pendant la conversation et pouvez demander des ajustements a tout moment. Contrairement aux outils fondes sur des templates rigides, Lovable cree une vraie logique a partir du texte."
  ),
  fillStep(
    "Remplissez le vide - Comprenez le flux !",
    "Construisez le flux de base de creation dans Lovable.",
    "\"Pour creer votre premiere application dans Lovable : decrivez ce que vous voulez ___ en langage naturel, attendez que l'IA ___ automatiquement le code, visualisez le resultat dans l'___ en temps reel, demandez des ___ directement dans le chat et publiez en un ___ lorsque tout est pret.\"",
    [
      "creer",
      "generer",
      "apercu en direct",
      "ajustements et ameliorations",
      "clic"
    ],
    [
      "creer",
      "generer",
      "apercu en direct",
      "ajustements et ameliorations",
      "clic",
      "ignorer",
      "template fixe",
      "rebuild manuel"
    ],
    "Le flux Lovable part de ce que vous voulez creer, passe par la generation automatique, l'apercu en direct, les ajustements dans le chat, puis la publication en un clic."
  ),
  textStep(
    "Votre Premiere Application",
    "La qualite de ce que Lovable cree depend directement de la clarte de votre prompt initial. Un bon prompt contient l'objectif de l'application, les fonctionnalites principales, les utilisateurs vises et l'apparence souhaitee. Plus vous donnez de contexte, plus le resultat sera aligne."
  ),
  fillStep(
    "Remplissez le vide - Creez votre premiere app !",
    "Construisez un prompt initial clair pour une application simple.",
    "\"Cree une application de ___ ou l'utilisateur peut ___, ___ et ___. Le visuel doit etre ___ avec des couleurs ___. Inclus une zone de ___ pour ajouter de nouveaux elements et une ___ pour marquer comme termine.\"",
    [
      "liste de taches",
      "ajouter des taches",
      "modifier des taches",
      "supprimer des taches",
      "propre et moderne",
      "bleu et blanc",
      "saisie",
      "option"
    ],
    [
      "liste de taches",
      "ajouter des taches",
      "modifier des taches",
      "supprimer des taches",
      "propre et moderne",
      "bleu et blanc",
      "saisie",
      "option",
      "sans structure",
      "couleurs aleatoires"
    ],
    "Plus vous etes clair sur les actions, l'interface et le style, plus Lovable a de chances de generer quelque chose d'utile des la premiere version."
  ),
  textStep(
    "Types d'Applications que Vous Pouvez Creer",
    "Lovable n'a pas de limites rigides sur le type d'application. Des outils simples aux systemes plus complexes, tout peut etre decrit et construit. La limite vient bien plus de la clarte de votre description que de la capacite de la plateforme."
  ),
  fillStep(
    "Remplissez le vide - Identifiez le bon type d'app !",
    "Associez chaque besoin au type d'application le plus adapte.",
    "\"Pour gerer des ___ clients, creez un ___. Pour vendre des produits en ligne, creez une ___. Pour organiser des projets en equipe, creez un ___. Pour collecter des informations de leads, creez un ___. Pour montrer votre travail professionnel, creez un ___.\"",
    [
      "informations",
      "CRM simple",
      "boutique en ligne",
      "gestionnaire de projets",
      "formulaire intelligent",
      "portfolio interactif"
    ],
    [
      "informations",
      "CRM simple",
      "boutique en ligne",
      "gestionnaire de projets",
      "formulaire intelligent",
      "portfolio interactif",
      "blog vide",
      "page statique"
    ],
    "Cet exercice montre comment Lovable peut couvrir la gestion, la vente, la collecte de leads et la presentation professionnelle."
  ),
  textStep(
    "Affiner et Ameliorer Votre Application",
    "Le raffinement iteratif est l'endroit ou Lovable brille vraiment. Partir d'une base fonctionnelle et l'ameliorer progressivement vous permet de voir l'effet de chaque changement en temps reel avant d'ajouter plus de complexite."
  ),
  fillStep(
    "Remplissez le vide - Affinez votre application !",
    "Demandez des ameliorations precises sur une base deja fonctionnelle.",
    "\"Faites les ameliorations suivantes dans l'application : ___ la couleur du bouton principal en ___, ajoutez un message de ___ avant de supprimer un element, incluez un champ de ___ en haut de la liste et changez la ___ pour une police plus ___.\"",
    [
      "changez",
      "vert",
      "confirmation",
      "recherche",
      "typographie",
      "moderne et lisible"
    ],
    [
      "changez",
      "vert",
      "confirmation",
      "recherche",
      "typographie",
      "moderne et lisible",
      "ignorez",
      "rouge neon"
    ],
    "Affiner par petites parties aide a garder le controle sur l'application et a ameliorer l'experience sans casser ce qui fonctionne deja."
  ),
  textStep(
    "Ajouter Base de Donnees et Authentification",
    "L'une des capacites les plus puissantes de Lovable est l'integration d'une vraie base de donnees et d'un systeme de connexion. Cela transforme une demo en produit fonctionnel avec des donnees persistantes et des utilisateurs enregistres."
  ),
  fillStep(
    "Remplissez le vide - Ajoutez des fonctions avancees !",
    "Construisez un prompt pour demander persistance et espace prive.",
    "\"Ajoutez a l'application : un systeme d'___ ou l'utilisateur peut se ___ et se connecter, une base de ___ pour enregistrer les informations de chaque utilisateur de maniere ___ et un espace ___ ou chaque utilisateur ne voit que ses propres donnees.\"",
    [
      "authentification",
      "inscrire",
      "donnees",
      "persistante",
      "prive"
    ],
    [
      "authentification",
      "inscrire",
      "donnees",
      "persistante",
      "prive",
      "anonyme",
      "temporaire"
    ],
    "Authentification, base de donnees et espace prive sont les elements qui font passer l'application du prototype au vrai produit."
  ),
  textStep(
    "Connecter Lovable a d'Autres Outils",
    "Lovable s'integre a des outils externes et etend les capacites de votre application. Ces integrations ajoutent paiements, e-mails, analytics et stockage de fichiers sans devoir tout construire depuis zero."
  ),
  fillStep(
    "Remplissez le vide - Connectez les outils !",
    "Associez chaque integration a sa fonction principale.",
    "\"Integrez l'application avec ___ pour traiter les paiements, connectez-la a ___ pour l'envoi d'e-mails automatiques, ajoutez ___ pour l'analyse de l'usage et integrez ___ pour le stockage des fichiers et images des utilisateurs.\"",
    [
      "Stripe",
      "Resend ou SendGrid",
      "Google Analytics",
      "Supabase Storage"
    ],
    [
      "Stripe",
      "Resend ou SendGrid",
      "Google Analytics",
      "Supabase Storage",
      "Word",
      "Paint"
    ],
    "Chaque integration ajoute une capacite specialisee et rapproche l'application d'un produit viable commercialement."
  ),
  textStep(
    "Publier Votre Application",
    "L'un des plus grands avantages de Lovable est la publication en un clic. Votre application part en ligne sur un lien public sans configuration manuelle de serveur, de domaine ou d'infrastructure technique."
  ),
  fillStep(
    "Remplissez le vide - Publiez votre app !",
    "Construisez le flux de publication dans Lovable.",
    "\"Pour publier votre application dans Lovable : cliquez sur ___ en haut a droite, Lovable genere automatiquement un ___ public a partager, vous pouvez connecter un ___ personnalise dans les reglages et toute ___ faite apres publication est mise a jour en ___ automatiquement.\"",
    [
      "Publish",
      "lien",
      "domaine",
      "modification",
      "temps reel"
    ],
    [
      "Publish",
      "lien",
      "domaine",
      "modification",
      "temps reel",
      "backup manuel",
      "serveur local"
    ],
    "La publication en un clic reduit la barriere technique et raccourcit fortement le chemin entre prototype et application en ligne."
  ),
  textStep(
    "Lovable pour Valider des Idees de Business",
    "L'un des usages les plus strategiques de Lovable consiste a creer des MVP pour valider des idees de business avant de payer un developpement professionnel. Vous apprenez ainsi a partir d'utilisateurs reels et reduisez le risque de construire quelque chose que personne ne veut."
  ),
  fillStep(
    "Remplissez le vide - Validez votre idee !",
    "Construisez un flux de validation par MVP.",
    "\"Pour valider une idee de business avec Lovable : creez un ___ fonctionnel en quelques heures, partagez-le avec de vrais ___ pour recueillir du ___, analysez comment les gens ___ avec le produit et utilisez cet ___ pour decider s'il vaut la peine d'___ dans un developpement professionnel.\"",
    [
      "MVP",
      "utilisateurs",
      "feedback reel",
      "interagissent",
      "apprentissage",
      "investir"
    ],
    [
      "MVP",
      "utilisateurs",
      "feedback reel",
      "interagissent",
      "apprentissage",
      "investir",
      "ignorer",
      "supposition"
    ],
    "Le but d'un MVP est d'apprendre vite a partir d'un usage reel avant d'engager davantage de temps et d'argent."
  ),
  textStep(
    "Bonnes Pratiques avec Lovable",
    "L'erreur la plus courante chez les debutants est de tenter de decrire une application complexe entiere dans un seul prompt. Le meilleur chemin est de commencer par l'objectif principal, construire une base solide et ajouter de la complexite de maniere progressive."
  ),
  fillStep(
    "Remplissez le vide - Utilisez Lovable avec strategie !",
    "Construisez un ensemble de bonnes pratiques pour mieux creer avec Lovable.",
    "\"Commencez toujours par decrire l'___ de l'application avant les fonctionnalites. Affinez en petites ___ au lieu de tout demander d'un coup. Testez chaque ___ avant d'ajouter la suivante. Utilisez des noms ___ pour decrire boutons et sections. Et avant de publier, ___ l'application comme un vrai utilisateur afin d'identifier les ___ de l'experience.\"",
    [
      "objectif principal",
      "etapes",
      "fonctionnalite",
      "clairs et precis",
      "testez",
      "points de friction"
    ],
    [
      "objectif principal",
      "etapes",
      "fonctionnalite",
      "clairs et precis",
      "testez",
      "points de friction",
      "details irrelevants",
      "chaos"
    ],
    "Commencer par l'objectif, tester et affiner par etapes, puis nommer clairement les elements ameliore beaucoup le resultat final."
  ),
  textStep(
    "Conclusion",
    "Lovable represente un changement important dans la facon de creer des applications. Avec de bons prompts, un raffinement iteratif et les bonnes integrations, n'importe qui peut passer d'une idee a un produit digital fonctionnel en quelques heures.\n\nLecon terminee."
  ),
] as const;
