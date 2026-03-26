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

export const LOVABLE_MODULE_2_STEPS_PT = [
  textStep(
    "Criando seu Primeiro Projeto do Zero com Lovable",
    "Bem-vindo de volta! Nesta licao, voce vai construir um projeto real do zero e acompanhar cada decisao, cada prompt e cada etapa como se estivesse com o Lovable aberto na sua frente. Vamos criar juntos o AgendaPro, um sistema de agendamento para profissionais autonomos."
  ),
  textStep(
    "O Projeto: AgendaPro",
    "Nesta licao, vamos construir um sistema de agendamento simples para profissionais autonomos como cabeleireiros, coaches, consultores e personal trainers. Trabalhar com um projeto concreto ajuda voce a memorizar o processo completo e depois repetir esse mesmo raciocinio nos seus proprios produtos."
  ),
  quizStep(
    "Por que usar um projeto real?",
    "Por que usar um projeto real e especifico para aprender Lovable?",
    [
      "Porque acompanhar um projeto concreto do inicio ao fim cria uma memoria de processo que voce pode replicar nos seus proprios projetos.",
      "Porque o AgendaPro e o unico tipo de aplicativo que o Lovable consegue criar bem.",
      "Para copiar o projeto e usar como seu proprio produto sem ajustes.",
      "Porque projetos reais sao indicados apenas para usuarios avancados."
    ],
    0,
    "Aprender com um projeto inteiro ajuda muito mais do que estudar conceitos soltos sem contexto nem continuidade."
  ),
  textStep(
    "Passo 1 - Abrindo o Lovable e Criando um Novo Projeto",
    "Ao acessar lovable.dev e clicar em New Project, voce encontra um chat de um lado e a previa ao vivo do outro. Antes de digitar qualquer coisa, vale ter clareza sobre nome do projeto, publico, telas principais e visual desejado. Isso deixa o primeiro prompt muito mais forte."
  ),
  quizStep(
    "Antes de digitar o primeiro prompt",
    "O que voce deve fazer antes de escrever no campo de chat?",
    [
      "Escolher um template visual como ponto de partida.",
      "Configurar o banco de dados antes de criar a interface.",
      "Ter em mente o nome do projeto, para quem ele e, as telas principais e o visual desejado.",
      "Criar uma conta separada no Supabase antes de comecar."
    ],
    2,
    "Um primeiro prompt rico depende de clareza previa sobre produto, usuario, estrutura e estilo."
  ),
  textStep(
    "Passo 2 - O Prompt de Criacao Inicial",
    "Este e o momento mais importante do projeto. Um prompt inicial bem escrito economiza horas de ajustes. Para o AgendaPro, o ideal e descrever as telas Dashboard, Agenda, Clientes e Configuracoes, alem do visual clean e profissional com azul escuro, branco e detalhes em dourado.",
    "Crie um aplicativo chamado AgendaPro para profissionais autonomos. O app deve ter 4 telas principais: Dashboard, Agenda, Clientes e Configuracoes. A Dashboard deve mostrar um resumo do dia. A Agenda deve permitir criar e visualizar horarios. A tela de Clientes deve listar clientes e abrir detalhes. A tela de Configuracoes deve permitir ajustar dados do profissional. O visual deve ser clean e profissional, com azul escuro, branco, detalhes em dourado, fontes modernas e navegacao intuitiva."
  ),
  quizStep(
    "Por que descrever as 4 telas no primeiro prompt?",
    "Por que descrever as 4 telas no primeiro prompt em vez de criar uma por vez?",
    [
      "Porque o Lovable so aceita prompts com multiplas telas.",
      "Para economizar tempo sem precisar de refinamentos.",
      "Porque o Lovable cria uma estrutura de navegacao mais coerente quando conhece todas as telas desde o inicio.",
      "Porque criar todas as telas de uma vez sempre resulta em erros."
    ],
    2,
    "Quando o Lovable entende o mapa geral do produto, ele organiza melhor menus, fluxos e relacoes entre telas."
  ),
  textStep(
    "Passo 3 - Avaliando o que Foi Gerado",
    "Depois de o Lovable gerar a primeira versao, avalie com calma: a navegacao entre as quatro telas funciona, o Dashboard mostra algo util, a Agenda tem acao clara para novo horario, a lista de Clientes esta visivel e o estilo geral segue o que foi pedido."
  ),
  quizStep(
    "Se uma tela vier errada",
    "O que fazer se uma tela ficou completamente diferente do que foi pedido?",
    [
      "Recomecar o projeto inteiro do zero.",
      "Aceitar o resultado e seguir sem pedir ajustes.",
      "Descrever especificamente o que esta diferente e pedir correcao apenas naquela tela.",
      "Apagar a tela e criar outra em um projeto separado."
    ],
    2,
    "O melhor caminho e preservar o que ja esta bom e corrigir apenas o trecho que saiu fora do esperado."
  ),
  textStep(
    "Passo 4 - Ajustando o Visual da Dashboard",
    "A Dashboard e a primeira tela que o usuario ve. Vale pedir um header com nome do profissional e data, cards de resumo com agendamentos, confirmacoes pendentes e receita do mes, alem de uma secao com os proximos horarios do dia."
  ),
  quizStep(
    "Por que os cards sao estrategicos?",
    "Por que os cards de resumo na Dashboard sao estrategicos para o usuario?",
    [
      "Para deixar a tela mais colorida e visualmente interessante.",
      "Porque o Lovable gera cards automaticamente em todas as dashboards.",
      "Porque o profissional entende a situacao do dia em segundos sem navegar por outras telas.",
      "Porque cards sao apenas elementos decorativos."
    ],
    2,
    "A dashboard funciona melhor quando permite leitura rapida e ajuda na tomada de decisao sem atrito."
  ),
  textStep(
    "Passo 5 - Construindo a Tela de Agenda",
    "A Agenda e o coracao do AgendaPro. Ela deve ter visualizacao semanal, botao de novo agendamento com formulario completo e indicadores de cor para confirmado, pendente e cancelado."
  ),
  quizStep(
    "Cores para status",
    "Por que usar cores diferentes para cada status de agendamento melhora a experiencia?",
    [
      "Para tornar a interface apenas mais colorida.",
      "Porque e um requisito tecnico do Lovable.",
      "Porque o profissional identifica instantaneamente a situacao de cada horario sem abrir item por item.",
      "Porque isso so funciona em agendas com mais de 20 eventos."
    ],
    2,
    "A codificacao visual reduz tempo de leitura e diminui o risco de perder um horario importante."
  ),
  textStep(
    "Passo 6 - Criando o Cadastro de Clientes",
    "A tela de Clientes deve ter busca, card por cliente com contato e data do ultimo atendimento, botao para novo cadastro e perfil detalhado com historico ao clicar."
  ),
  quizStep(
    "Valor do historico por cliente",
    "Por que manter um historico de atendimentos por cliente e valioso?",
    [
      "Para cumprir uma regra legal geral em qualquer servico.",
      "Apenas para contar quantas vezes o cliente voltou.",
      "Porque permite personalizar o atendimento e lembrar preferencias, servicos e contexto anterior.",
      "Porque historico so e util depois da decima visita."
    ],
    2,
    "Historico bem usado melhora a experiencia do cliente e ajuda o profissional a se diferenciar."
  ),
  textStep(
    "Passo 7 - Conectando o Banco de Dados Real",
    "Ate aqui, os dados ainda podem estar restritos a sessao atual. Ao conectar o Supabase e criar tabelas de clientes e agendamentos, o AgendaPro passa a persistir informacoes de verdade."
  ),
  quizStep(
    "Como validar o banco de dados",
    "O que confirma que o banco de dados esta funcionando corretamente?",
    [
      "O aplicativo fica mais rapido depois da conexao.",
      "Uma mensagem automatica aparece no Lovable.",
      "Voce cadastra um cliente, recarrega a pagina e ele continua aparecendo na lista.",
      "O Lovable mostra um icone verde quando a conexao existe."
    ],
    2,
    "Persistencia real se prova quando o dado sobrevive ao recarregamento e volta a ser recuperado do banco."
  ),
  textStep(
    "Passo 8 - Adicionando o Sistema de Login",
    "Agora o app precisa de autenticacao. O ideal e ter tela de login como entrada, cadastro para novos usuarios, redirecionamento automatico para a Dashboard depois do login, botao de logout e sessao mantida."
  ),
  quizStep(
    "Redirecionamento apos login",
    "Por que o redirecionamento automatico para a Dashboard apos o login melhora a experiencia?",
    [
      "Porque e um requisito tecnico obrigatorio de seguranca.",
      "Para esconder a tela de login dos usuarios cadastrados.",
      "Porque elimina friccao e leva o usuario diretamente ao centro do produto.",
      "Porque isso so funciona em apps com banco de dados."
    ],
    2,
    "Depois do login, o usuario quer entrar logo no fluxo principal e nao perder tempo navegando manualmente."
  ),
  textStep(
    "Passo 9 - Testando o Fluxo Completo",
    "O teste ideal segue um fluxo completo: criar conta, fazer login, cadastrar cliente, criar agendamento, verificar a Dashboard e recarregar a pagina para conferir se tudo continua la."
  ),
  quizStep(
    "O que anotar no teste",
    "O que voce deve anotar durante o teste completo?",
    [
      "Apenas quanto tempo cada tela demorou para carregar.",
      "Quais partes do codigo pareceram mais complexas.",
      "Qualquer momento de confusao, botao que nao funcionou e informacao que faltou para concluir a tarefa.",
      "Somente erros que quebram totalmente o aplicativo."
    ],
    2,
    "Pontos de atrito pequenos tambem importam, porque sao eles que fazem o usuario desistir ou se perder."
  ),
  textStep(
    "Passo 10 - Corrigindo os Ultimos Detalhes e Publicando",
    "Antes de publicar, ajuste mensagens de erro, confirmacoes de sucesso, responsividade no celular e o titulo da aba do navegador. So depois disso vale clicar em Publish."
  ),
  quizStep(
    "Por que verificar no celular?",
    "Por que verificar o layout no celular antes de publicar e essencial para esse tipo de aplicativo?",
    [
      "Porque o Lovable so publica apps que funcionam no mobile.",
      "Para cumprir um requisito formal de acessibilidade.",
      "Porque profissionais autonomos usam o celular como ferramenta principal e abandonam apps ruins no mobile.",
      "Porque layout mobile so importa em campanhas de redes sociais."
    ],
    2,
    "Neste tipo de produto, o celular faz parte do uso real. Se a experiencia mobile for ruim, o app perde valor rapidamente."
  ),
  textStep(
    "Conclusao",
    "Criar seu primeiro projeto do zero no Lovable muda a forma como voce enxerga produto digital. O AgendaPro que voce acompanhou nesta licao combina estrutura, interface, dados, login e testes em um fluxo que pode ser adaptado para varios outros produtos.\n\nLicao concluida."
  ),
] as const;

export const LOVABLE_MODULE_2_STEPS_EN = [
  textStep(
    "Creating Your First Project from Scratch with Lovable",
    "Welcome back! In this lesson, you will build a real project from scratch and follow every decision, every prompt, and every step as if Lovable were open in front of you. We are going to build AgendaPro, a scheduling system for self-employed professionals."
  ),
  textStep(
    "The Project: AgendaPro",
    "In this lesson, we will build a simple booking system for self-employed professionals such as hairstylists, coaches, consultants, and personal trainers. Working through a concrete project helps you memorize the full process and later reuse that same reasoning in your own products."
  ),
  quizStep(
    "Why use a real project?",
    "Why use a real and specific project to learn Lovable?",
    [
      "Because following a concrete project from beginning to end creates a process memory you can reuse in your own builds.",
      "Because AgendaPro is the only type of app that Lovable can build well.",
      "So you can copy the project and use it as your own final product without changes.",
      "Because real projects are only recommended for advanced users."
    ],
    0,
    "Learning through a full project is much more effective than studying isolated concepts without context or continuity."
  ),
  textStep(
    "Step 1 - Opening Lovable and Starting a New Project",
    "When you open lovable.dev and click New Project, you see the chat on one side and the live preview on the other. Before typing anything, it helps to be clear about the project name, target user, core screens, and desired visual style. That makes the first prompt much stronger."
  ),
  quizStep(
    "Before typing the first prompt",
    "What should you do before writing in the chat field?",
    [
      "Choose a visual template as a starting point.",
      "Configure the database before building the interface.",
      "Be clear about the project name, who it is for, the main screens, and the desired visual style.",
      "Create a separate Supabase account before starting."
    ],
    2,
    "A rich first prompt depends on having prior clarity about product, user, structure, and style."
  ),
  textStep(
    "Step 2 - The Initial Creation Prompt",
    "This is the most important moment in the project. A well-written first prompt saves hours of adjustments. For AgendaPro, the ideal prompt describes the Dashboard, Schedule, Clients, and Settings screens, along with a clean and professional look using dark blue, white, and gold accents.",
    "Create an app called AgendaPro for self-employed professionals. The app should have 4 main screens: Dashboard, Schedule, Clients, and Settings. The Dashboard should show a summary of the day. The Schedule screen should allow creating and viewing appointments. The Clients screen should list clients and open details. The Settings screen should let the professional adjust profile data. The visual style should be clean and professional, with dark blue, white, gold accents, modern fonts, and intuitive navigation."
  ),
  quizStep(
    "Why describe the 4 screens first?",
    "Why describe the 4 screens in the first prompt instead of creating one screen at a time?",
    [
      "Because Lovable only accepts prompts with multiple screens.",
      "To save time and avoid all future refinements.",
      "Because Lovable creates a more coherent navigation structure when it knows all screens from the beginning.",
      "Because creating all screens at once always leads to errors."
    ],
    2,
    "When Lovable understands the full product map, it organizes menus, flows, and screen relationships more coherently."
  ),
  textStep(
    "Step 3 - Evaluating What Was Generated",
    "After Lovable generates the first version, review it calmly: the navigation between all four screens should work, the Dashboard should show useful information, the Schedule should have a clear action for a new appointment, the Clients list should be visible, and the overall style should match what you requested."
  ),
  quizStep(
    "If one screen comes out wrong",
    "What should you do if one screen looks completely different from what you asked for?",
    [
      "Restart the entire project from zero.",
      "Accept the result and continue without asking for changes.",
      "Describe exactly what is different and request a correction only for that screen.",
      "Delete the screen and create a new project just for it."
    ],
    2,
    "The best move is to preserve what is already working and correct only the part that came out wrong."
  ),
  textStep(
    "Step 4 - Adjusting the Dashboard",
    "The Dashboard is the first thing the user sees. It is worth adding a header with the professional's name and today's date, summary cards with total bookings, pending confirmations, and monthly revenue, plus a section showing the next appointments of the day."
  ),
  quizStep(
    "Why are summary cards strategic?",
    "Why are summary cards on the Dashboard strategic for the user?",
    [
      "To make the screen more colorful and visually interesting.",
      "Because Lovable automatically creates cards in every dashboard.",
      "Because the professional can understand the state of the day in seconds without navigating elsewhere.",
      "Because cards are only decorative elements."
    ],
    2,
    "A dashboard works better when it gives a quick reading of the situation and supports decisions with minimal friction."
  ),
  textStep(
    "Step 5 - Building the Schedule Screen",
    "The Schedule is the heart of AgendaPro. It should have a weekly view, a new appointment button with a full form, and color indicators for confirmed, pending, and canceled appointments."
  ),
  quizStep(
    "Colors for status",
    "Why does using different colors for each booking status improve the experience?",
    [
      "Only to make the interface more colorful.",
      "Because it is a technical requirement of Lovable.",
      "Because the professional can instantly identify the state of each slot without opening each item.",
      "Because it only works when there are more than 20 bookings."
    ],
    2,
    "Visual status coding reduces reading time and lowers the risk of missing an important booking."
  ),
  textStep(
    "Step 6 - Creating the Client Directory",
    "The Clients screen should include search, a card for each client with contact and last appointment date, a button for adding a new client, and a detailed profile with history on click."
  ),
  quizStep(
    "Why client history matters",
    "Why is keeping a service history for each client valuable?",
    [
      "To comply with a general legal rule in every type of service.",
      "Only to know how many times the client came back.",
      "Because it allows more personalized service by remembering preferences, past services, and context.",
      "Because history is only useful after the tenth visit."
    ],
    2,
    "Well-used history improves client experience and helps the professional stand out."
  ),
  textStep(
    "Step 7 - Connecting the Real Database",
    "Up to this point, the data may still live only inside the current session. Once you connect Supabase and create tables for clients and bookings, AgendaPro starts persisting real information."
  ),
  quizStep(
    "How to validate the database",
    "What confirms that the database is working correctly?",
    [
      "The app becomes faster after the connection.",
      "An automatic success message appears in Lovable.",
      "You create a client, reload the page, and the client still appears in the list.",
      "Lovable shows a green icon when the connection exists."
    ],
    2,
    "Real persistence is proven when the data survives a page reload and comes back from the database."
  ),
  textStep(
    "Step 8 - Adding the Login System",
    "Now the app needs authentication. The ideal setup includes a login screen, signup flow, automatic redirect to the Dashboard after login, a logout button, and session persistence."
  ),
  quizStep(
    "Redirect after login",
    "Why does automatically redirecting the user to the Dashboard after login improve the experience?",
    [
      "Because it is a mandatory security requirement.",
      "To hide the login screen from registered users.",
      "Because it removes friction and takes the user straight to the core of the product.",
      "Because this only works in apps with a database."
    ],
    2,
    "After logging in, the user wants to get straight into the main workflow instead of navigating manually."
  ),
  textStep(
    "Step 9 - Testing the Full Flow",
    "The best test follows the full path: create account, log in, add a client, create a booking, check the Dashboard, and reload the page to confirm that everything persists."
  ),
  quizStep(
    "What to write down while testing",
    "What should you write down during the full test?",
    [
      "Only how long each screen took to load.",
      "Which parts of the code looked more complex.",
      "Any moment of confusion, any broken button, and any missing information needed to complete the task.",
      "Only errors that fully break the app."
    ],
    2,
    "Small friction points matter too, because they are often what make real users quit or get lost."
  ),
  textStep(
    "Step 10 - Fixing the Final Details and Publishing",
    "Before publishing, adjust error messages, success feedback, mobile responsiveness, and the browser tab title. Only after that should you click Publish."
  ),
  quizStep(
    "Why check mobile first?",
    "Why is checking the mobile layout before publishing essential for this kind of app?",
    [
      "Because Lovable only publishes apps that work on mobile.",
      "To satisfy a formal accessibility requirement.",
      "Because self-employed professionals use their phones as a main work tool and will abandon an app that feels bad on mobile.",
      "Because mobile layout only matters for social media campaigns."
    ],
    2,
    "In this kind of product, mobile is part of real usage. If the mobile experience is weak, the app quickly loses value."
  ),
  textStep(
    "Conclusion",
    "Creating your first real project from scratch with Lovable changes the way you think about digital product building. AgendaPro combines structure, interface, data, authentication, and testing in a flow that can be adapted to many other products.\n\nLesson complete."
  ),
] as const;

export const LOVABLE_MODULE_2_STEPS_ES = [
  textStep(
    "Creando tu Primer Proyecto desde Cero con Lovable",
    "Bienvenido de vuelta. En esta leccion vas a construir un proyecto real desde cero y acompanar cada decision, cada prompt y cada etapa como si tuvieras Lovable abierto frente a ti. Vamos a crear AgendaPro, un sistema de agendamiento para profesionales autonomos."
  ),
  textStep(
    "El Proyecto: AgendaPro",
    "En esta leccion vamos a construir un sistema de agendamiento simple para profesionales autonomos como peluqueros, coaches, consultores y entrenadores personales. Trabajar con un proyecto concreto ayuda a fijar el proceso completo y a reutilizar ese mismo razonamiento en tus propios productos."
  ),
  quizStep(
    "Por que usar un proyecto real?",
    "Por que usar un proyecto real y especifico para aprender Lovable?",
    [
      "Porque seguir un proyecto concreto de principio a fin crea una memoria de proceso que luego puedes repetir en tus propios proyectos.",
      "Porque AgendaPro es el unico tipo de aplicacion que Lovable crea bien.",
      "Para copiar el proyecto y usarlo como producto final sin cambios.",
      "Porque los proyectos reales son solo para usuarios avanzados."
    ],
    0,
    "Aprender con un proyecto completo es mucho mas efectivo que estudiar conceptos aislados sin contexto."
  ),
  textStep(
    "Paso 1 - Abrir Lovable y Crear un Nuevo Proyecto",
    "Cuando entras en lovable.dev y haces clic en New Project, ves el chat de un lado y la vista previa en vivo del otro. Antes de escribir, conviene tener claro el nombre del proyecto, el publico, las pantallas principales y el estilo visual deseado. Eso fortalece mucho el primer prompt."
  ),
  quizStep(
    "Antes del primer prompt",
    "Que debes hacer antes de escribir en el chat?",
    [
      "Elegir una plantilla visual como punto de partida.",
      "Configurar la base de datos antes de construir la interfaz.",
      "Tener claro el nombre del proyecto, para quien es, las pantallas principales y el visual deseado.",
      "Crear una cuenta separada en Supabase antes de empezar."
    ],
    2,
    "Un primer prompt rico depende de claridad previa sobre producto, usuario, estructura y estilo."
  ),
  textStep(
    "Paso 2 - El Prompt de Creacion Inicial",
    "Este es el momento mas importante del proyecto. Un primer prompt bien escrito ahorra horas de ajustes. Para AgendaPro, lo ideal es describir las pantallas Dashboard, Agenda, Clientes y Configuraciones, ademas del visual limpio y profesional con azul oscuro, blanco y detalles dorados.",
    "Crea una aplicacion llamada AgendaPro para profesionales autonomos. La app debe tener 4 pantallas principales: Dashboard, Agenda, Clientes y Configuraciones. El Dashboard debe mostrar un resumen del dia. La Agenda debe permitir crear y visualizar horarios. La pantalla de Clientes debe listar clientes y abrir detalles. La pantalla de Configuraciones debe permitir ajustar los datos del profesional. El estilo visual debe ser limpio y profesional, con azul oscuro, blanco, detalles dorados, tipografias modernas y navegacion intuitiva."
  ),
  quizStep(
    "Por que describir las 4 pantallas primero?",
    "Por que describir las 4 pantallas en el primer prompt en vez de crear una por una?",
    [
      "Porque Lovable solo acepta prompts con varias pantallas.",
      "Para ahorrar tiempo sin refinamientos posteriores.",
      "Porque Lovable crea una estructura de navegacion mas coherente cuando conoce todas las pantallas desde el inicio.",
      "Porque crear todas las pantallas de una vez siempre genera errores."
    ],
    2,
    "Cuando Lovable entiende el mapa completo del producto, organiza mejor menus, flujos y relaciones entre pantallas."
  ),
  textStep(
    "Paso 3 - Evaluando lo Generado",
    "Despues de que Lovable genere la primera version, revisa con calma: la navegacion entre las cuatro pantallas debe funcionar, el Dashboard debe mostrar informacion util, la Agenda debe tener una accion clara para nuevo horario, la lista de Clientes debe ser visible y el estilo general debe coincidir con lo pedido."
  ),
  quizStep(
    "Si una pantalla sale mal",
    "Que hacer si una pantalla quedo muy diferente de lo que pediste?",
    [
      "Reiniciar todo el proyecto desde cero.",
      "Aceptar el resultado y seguir sin pedir cambios.",
      "Describir exactamente que esta diferente y pedir la correccion solo de esa pantalla.",
      "Borrar la pantalla y crear otro proyecto solo para ella."
    ],
    2,
    "Lo mejor es preservar lo que ya funciona y corregir solamente la parte que salio fuera de lo esperado."
  ),
  textStep(
    "Paso 4 - Ajustando el Dashboard",
    "El Dashboard es la primera pantalla que ve el usuario. Conviene pedir un header con nombre del profesional y fecha, cards de resumen con total de turnos, confirmaciones pendientes e ingresos del mes, ademas de una seccion con los proximos horarios del dia."
  ),
  quizStep(
    "Por que los cards son estrategicos?",
    "Por que los cards de resumen en el Dashboard son estrategicos para el usuario?",
    [
      "Para hacer la pantalla mas colorida.",
      "Porque Lovable crea cards automaticamente en cualquier dashboard.",
      "Porque el profesional entiende la situacion del dia en segundos sin navegar por otras pantallas.",
      "Porque los cards son solo elementos decorativos."
    ],
    2,
    "Un buen Dashboard da lectura rapida del estado del dia y ayuda a tomar decisiones sin friccion."
  ),
  textStep(
    "Paso 5 - Construyendo la Pantalla de Agenda",
    "La Agenda es el corazon de AgendaPro. Debe tener visualizacion semanal, boton para nuevo agendamiento con formulario completo e indicadores de color para confirmado, pendiente y cancelado."
  ),
  quizStep(
    "Colores para los estados",
    "Por que usar colores diferentes para cada estado mejora la experiencia?",
    [
      "Solo para que la interfaz sea mas colorida.",
      "Porque es un requisito tecnico de Lovable.",
      "Porque el profesional identifica al instante el estado de cada horario sin abrir uno por uno.",
      "Porque solo funciona con mas de 20 agendamientos."
    ],
    2,
    "La codificacion visual reduce el tiempo de lectura y disminuye el riesgo de pasar por alto un horario importante."
  ),
  textStep(
    "Paso 6 - Creando el Registro de Clientes",
    "La pantalla de Clientes debe incluir busqueda, tarjeta por cliente con contacto y fecha del ultimo servicio, boton para nuevo cliente y perfil detallado con historial al hacer clic."
  ),
  quizStep(
    "Por que importa el historial",
    "Por que es valioso mantener un historial de atenciones por cliente?",
    [
      "Para cumplir una regla legal general.",
      "Solo para contar cuantas veces volvio el cliente.",
      "Porque permite personalizar la atencion recordando preferencias, servicios anteriores y contexto.",
      "Porque solo sirve despues de la decima visita."
    ],
    2,
    "Un historial bien usado mejora la experiencia del cliente y ayuda al profesional a diferenciarse."
  ),
  textStep(
    "Paso 7 - Conectando la Base de Datos Real",
    "Hasta aqui, los datos todavia pueden existir solo en la sesion actual. Cuando conectas Supabase y creas tablas de clientes y agendamientos, AgendaPro empieza a guardar informacion real y persistente."
  ),
  quizStep(
    "Como validar la base",
    "Que confirma que la base de datos esta funcionando bien?",
    [
      "La app se vuelve mas rapida despues de conectarla.",
      "Aparece automaticamente un mensaje en Lovable.",
      "Creas un cliente, recargas la pagina y el cliente sigue apareciendo en la lista.",
      "Lovable muestra un icono verde cuando la conexion existe."
    ],
    2,
    "La persistencia real se demuestra cuando el dato sobrevive al recargar la pagina y vuelve desde la base."
  ),
  textStep(
    "Paso 8 - Agregando el Sistema de Login",
    "Ahora la app necesita autenticacion. Lo ideal es una pantalla de login, flujo de registro, redireccion automatica al Dashboard despues de entrar, boton de logout y sesion mantenida."
  ),
  quizStep(
    "Redireccion despues del login",
    "Por que redirigir automaticamente al Dashboard despues del login mejora la experiencia?",
    [
      "Porque es un requisito tecnico de seguridad.",
      "Para ocultar la pantalla de login a usuarios ya registrados.",
      "Porque elimina friccion y lleva al usuario directamente al corazon del producto.",
      "Porque eso solo funciona en apps con base de datos."
    ],
    2,
    "Despues de hacer login, el usuario quiere entrar directo al flujo principal sin pasos innecesarios."
  ),
  textStep(
    "Paso 9 - Probando el Flujo Completo",
    "La mejor prueba recorre todo el camino: crear cuenta, hacer login, registrar un cliente, crear un agendamiento, revisar el Dashboard y recargar la pagina para confirmar que todo persiste."
  ),
  quizStep(
    "Que anotar durante la prueba",
    "Que debes anotar durante la prueba completa?",
    [
      "Solo cuanto tarda en cargar cada pantalla.",
      "Que partes del codigo parecen mas complejas.",
      "Cualquier momento de confusion, boton que no funcione y dato faltante para completar una tarea.",
      "Solo los errores que rompen totalmente la app."
    ],
    2,
    "Los pequenos puntos de friccion importan mucho porque suelen ser lo que hace que el usuario se pierda o abandone."
  ),
  textStep(
    "Paso 10 - Corrigiendo los Ultimos Detalles y Publicando",
    "Antes de publicar, ajusta mensajes de error, confirmaciones de exito, responsividad en celular y el titulo de la pestana del navegador. Solo despues conviene hacer clic en Publish."
  ),
  quizStep(
    "Por que revisar el celular?",
    "Por que revisar el layout en celular antes de publicar es esencial para este tipo de app?",
    [
      "Porque Lovable solo publica apps que funcionan en mobile.",
      "Para cumplir un requisito formal de accesibilidad.",
      "Porque los profesionales autonomos usan el celular como herramienta principal y abandonan apps malas en mobile.",
      "Porque el layout mobile solo importa en campanas de redes."
    ],
    2,
    "En este tipo de producto, el uso movil es parte del uso real. Si la experiencia en celular falla, la app pierde valor muy rapido."
  ),
  textStep(
    "Conclusion",
    "Crear tu primer proyecto real desde cero con Lovable cambia la forma de pensar producto digital. AgendaPro combina estructura, interfaz, datos, autenticacion y pruebas en un flujo que puedes adaptar a muchos otros productos.\n\nLeccion completada."
  ),
] as const;

export const LOVABLE_MODULE_2_STEPS_FR = [
  textStep(
    "Creer Votre Premier Projet de Zero avec Lovable",
    "Bon retour. Dans cette lecon, vous allez construire un projet reel a partir de zero et suivre chaque decision, chaque prompt et chaque etape comme si Lovable etait ouvert devant vous. Nous allons creer AgendaPro, un systeme de prise de rendez-vous pour les professionnels independants."
  ),
  textStep(
    "Le Projet : AgendaPro",
    "Dans cette lecon, nous allons construire un systeme de reservation simple pour des professionnels independants comme des coiffeurs, coaches, consultants et personal trainers. Travailler sur un projet concret aide a memoriser le processus complet et a reutiliser ensuite ce meme raisonnement dans vos propres produits."
  ),
  quizStep(
    "Pourquoi utiliser un projet reel ?",
    "Pourquoi utiliser un projet reel et precis pour apprendre Lovable ?",
    [
      "Parce que suivre un projet concret du debut a la fin cree une memoire du processus que vous pourrez reutiliser dans vos propres projets.",
      "Parce qu'AgendaPro est le seul type d'application que Lovable sait bien creer.",
      "Pour copier le projet et l'utiliser comme produit final sans adaptation.",
      "Parce que les projets reels sont seulement destines aux utilisateurs avances."
    ],
    0,
    "Apprendre avec un projet complet est bien plus efficace que d'etudier des concepts isoles sans contexte."
  ),
  textStep(
    "Etape 1 - Ouvrir Lovable et Creer un Nouveau Projet",
    "Quand vous ouvrez lovable.dev et cliquez sur New Project, vous voyez le chat d'un cote et l'apercu en direct de l'autre. Avant d'ecrire quoi que ce soit, il vaut mieux avoir une idee claire du nom du projet, du public, des ecrans principaux et du style visuel souhaite. Cela rend le premier prompt bien plus solide."
  ),
  quizStep(
    "Avant le premier prompt",
    "Que devez-vous faire avant d'ecrire dans le champ de chat ?",
    [
      "Choisir un template visuel comme point de depart.",
      "Configurer la base de donnees avant de creer l'interface.",
      "Avoir en tete le nom du projet, le public vise, les ecrans principaux et le style visuel souhaite.",
      "Creer un compte Supabase separe avant de commencer."
    ],
    2,
    "Un premier prompt riche depend d'une clarte prealable sur le produit, l'utilisateur, la structure et le style."
  ),
  textStep(
    "Etape 2 - Le Prompt Initial de Creation",
    "C'est le moment le plus important du projet. Un premier prompt bien redige economise des heures d'ajustements. Pour AgendaPro, l'ideal est de decrire les ecrans Dashboard, Agenda, Clients et Parametres, ainsi qu'un style propre et professionnel avec bleu fonce, blanc et touches dorees.",
    "Cree une application appelee AgendaPro pour des professionnels independants. L'application doit avoir 4 ecrans principaux : Dashboard, Agenda, Clients et Parametres. Le Dashboard doit montrer un resume de la journee. L'Agenda doit permettre de creer et de visualiser les rendez-vous. L'ecran Clients doit lister les clients et ouvrir leurs details. L'ecran Parametres doit permettre d'ajuster les informations du professionnel. Le style visuel doit etre propre et professionnel, avec bleu fonce, blanc, touches dorees, polices modernes et navigation intuitive."
  ),
  quizStep(
    "Pourquoi decrire les 4 ecrans d'abord ?",
    "Pourquoi decrire les 4 ecrans dans le premier prompt au lieu de les creer un par un ?",
    [
      "Parce que Lovable n'accepte que des prompts avec plusieurs ecrans.",
      "Pour gagner du temps et ne plus avoir besoin d'affinements.",
      "Parce que Lovable cree une structure de navigation plus coherente lorsqu'il connait tous les ecrans des le debut.",
      "Parce que creer tous les ecrans d'un coup provoque toujours des erreurs."
    ],
    2,
    "Quand Lovable comprend la carte complete du produit, il organise mieux les menus, les flux et les relations entre ecrans."
  ),
  textStep(
    "Etape 3 - Evaluer ce qui a Ete Genere",
    "Apres la premiere generation, prenez le temps de verifier : la navigation entre les quatre ecrans doit fonctionner, le Dashboard doit afficher quelque chose d'utile, l'Agenda doit presenter une action claire pour un nouveau rendez-vous, la liste Clients doit etre visible et le style general doit suivre votre demande."
  ),
  quizStep(
    "Si un ecran sort mal",
    "Que faire si un ecran est tres different de ce qui a ete demande ?",
    [
      "Recommencer entierement le projet depuis zero.",
      "Accepter le resultat et continuer sans demander de correction.",
      "Decrire precisement ce qui est different et demander une correction seulement sur cet ecran.",
      "Supprimer l'ecran et creer un autre projet uniquement pour lui."
    ],
    2,
    "La meilleure approche consiste a conserver ce qui fonctionne deja et a corriger seulement la partie incorrecte."
  ),
  textStep(
    "Etape 4 - Ajuster le Dashboard",
    "Le Dashboard est la premiere chose que l'utilisateur voit. Il vaut la peine d'ajouter un header avec le nom du professionnel et la date du jour, des cartes de resume avec total des reservations, confirmations en attente et chiffre du mois, ainsi qu'une section montrant les prochains rendez-vous de la journee."
  ),
  quizStep(
    "Pourquoi les cartes sont-elles strategiques ?",
    "Pourquoi les cartes de resume sur le Dashboard sont-elles strategiques pour l'utilisateur ?",
    [
      "Pour rendre l'ecran plus colore.",
      "Parce que Lovable cree automatiquement des cartes dans tous les dashboards.",
      "Parce que le professionnel peut comprendre la situation de la journee en quelques secondes sans naviguer ailleurs.",
      "Parce que les cartes sont seulement decoratives."
    ],
    2,
    "Un bon Dashboard donne une lecture rapide de la situation et aide a decider sans friction."
  ),
  textStep(
    "Etape 5 - Construire l'Ecran Agenda",
    "L'Agenda est le coeur d'AgendaPro. Il doit avoir une vue hebdomadaire, un bouton de nouveau rendez-vous avec formulaire complet, et des indicateurs de couleur pour confirme, en attente et annule."
  ),
  quizStep(
    "Couleurs pour les statuts",
    "Pourquoi l'utilisation de couleurs differentes pour chaque statut ameliore-t-elle l'experience ?",
    [
      "Seulement pour rendre l'interface plus coloree.",
      "Parce que c'est une exigence technique de Lovable.",
      "Parce que le professionnel peut identifier immediatement l'etat de chaque horaire sans ouvrir chaque element.",
      "Parce que cela ne fonctionne qu'au-dela de 20 reservations."
    ],
    2,
    "Le codage visuel reduit le temps de lecture et diminue le risque de manquer un rendez-vous important."
  ),
  textStep(
    "Etape 6 - Creer le Registre des Clients",
    "L'ecran Clients doit contenir une recherche, une carte par client avec contact et date du dernier rendez-vous, un bouton pour ajouter un nouveau client, et un profil detaille avec historique au clic."
  ),
  quizStep(
    "Pourquoi l'historique est utile",
    "Pourquoi conserver un historique des rendez-vous par client est-il precieux ?",
    [
      "Pour respecter une regle legale generale.",
      "Seulement pour compter le nombre de visites.",
      "Parce que cela permet de personnaliser la relation en memorisant preferences, services precedents et contexte.",
      "Parce que l'historique n'est utile qu'apres dix visites."
    ],
    2,
    "Un historique bien utilise ameliore l'experience client et aide le professionnel a se differencier."
  ),
  textStep(
    "Etape 7 - Connecter la Vraie Base de Donnees",
    "Jusqu'ici, les donnees peuvent encore exister seulement dans la session en cours. Lorsque vous connectez Supabase et creez les tables clients et rendez-vous, AgendaPro commence a enregistrer des informations reelles et persistantes."
  ),
  quizStep(
    "Comment valider la base",
    "Qu'est-ce qui confirme que la base de donnees fonctionne correctement ?",
    [
      "L'application devient plus rapide apres la connexion.",
      "Un message automatique apparait dans Lovable.",
      "Vous creez un client, rechargez la page et le client est toujours present dans la liste.",
      "Lovable affiche une icone verte quand la connexion existe."
    ],
    2,
    "La persistance reelle se verifie quand la donnee survit au rechargement et revient depuis la base."
  ),
  textStep(
    "Etape 8 - Ajouter le Systeme de Connexion",
    "L'application a maintenant besoin d'authentification. L'ideal est d'avoir un ecran de connexion, une inscription, une redirection automatique vers le Dashboard apres connexion, un bouton de deconnexion et une session conservee."
  ),
  quizStep(
    "Redirection apres connexion",
    "Pourquoi la redirection automatique vers le Dashboard apres la connexion ameliore-t-elle l'experience ?",
    [
      "Parce que c'est une exigence de securite obligatoire.",
      "Pour cacher l'ecran de connexion aux utilisateurs deja inscrits.",
      "Parce qu'elle supprime la friction et emmene l'utilisateur directement au coeur du produit.",
      "Parce que cela ne marche que dans des apps avec base de donnees."
    ],
    2,
    "Apres connexion, l'utilisateur veut entrer directement dans le flux principal sans etapes inutiles."
  ),
  textStep(
    "Etape 9 - Tester le Flux Complet",
    "Le meilleur test suit tout le parcours : creer un compte, se connecter, ajouter un client, creer un rendez-vous, verifier le Dashboard et recharger la page pour confirmer que tout persiste."
  ),
  quizStep(
    "Que noter pendant le test",
    "Que devez-vous noter pendant le test complet ?",
    [
      "Seulement le temps de chargement de chaque ecran.",
      "Les parties du code qui semblent les plus complexes.",
      "Tout moment de confusion, tout bouton qui ne marche pas et toute information manquante pour terminer une tache.",
      "Seulement les erreurs qui cassent totalement l'application."
    ],
    2,
    "Les petits points de friction comptent eux aussi, car ce sont souvent eux qui font perdre ou fuir l'utilisateur."
  ),
  textStep(
    "Etape 10 - Corriger les Derniers Details et Publier",
    "Avant de publier, ajustez les messages d'erreur, les retours de succes, la version mobile et le titre de l'onglet du navigateur. C'est seulement ensuite qu'il faut cliquer sur Publish."
  ),
  quizStep(
    "Pourquoi verifier le mobile ?",
    "Pourquoi verifier la version mobile avant de publier est-il essentiel pour ce type d'application ?",
    [
      "Parce que Lovable ne publie que les applications qui fonctionnent sur mobile.",
      "Pour satisfaire une exigence formelle d'accessibilite.",
      "Parce que les professionnels independants utilisent le telephone comme outil principal et abandonnent rapidement une app mediocre sur mobile.",
      "Parce que le mobile ne compte que pour les campagnes reseaux sociaux."
    ],
    2,
    "Dans ce type de produit, l'usage mobile fait partie de l'usage reel. Si l'experience mobile est faible, la valeur de l'app chute tres vite."
  ),
  textStep(
    "Conclusion",
    "Creer votre premier vrai projet de zero avec Lovable change la facon de penser la creation de produit digital. AgendaPro combine structure, interface, donnees, authentification et tests dans un flux adaptable a de nombreux autres produits.\n\nLecon terminee."
  ),
] as const;
