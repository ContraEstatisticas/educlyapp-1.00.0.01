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

export const LOVABLE_MODULE_3_STEPS_PT = [
  textStep(
    "Edicao via Chat no Lovable",
    "Bem-vindo de volta! Nesta licao, voce vai dominar a edicao via chat, a forma mais poderosa de evoluir, corrigir e personalizar seu aplicativo no Lovable usando apenas linguagem natural, sem tocar em nenhuma linha de codigo."
  ),
  textStep(
    "O Chat como Ferramenta de Edicao Continua",
    "No Lovable, o chat nao serve apenas para criar a primeira versao. Ele acompanha o projeto inteiro. Cada ajuste visual, funcional ou estrutural pode ser descrito em linguagem natural e aplicado em tempo real, sem precisar abrir arquivos tecnicos nem entender codigo."
  ),
  textStep(
    "A Anatomia de um Bom Pedido de Edicao",
    "A diferenca entre uma edicao que ajuda e uma que cria novos problemas esta na qualidade do pedido. Um bom pedido diz onde esta o problema, o que esta errado e o que deve acontecer no lugar."
  ),
  quizStep(
    "Especificar a tela importa",
    "Por que especificar a tela no pedido de edicao e tao importante?",
    [
      "Porque o Lovable nao consegue identificar qual tela editar sem instrucao alguma.",
      "Para deixar o pedido mais longo e detalhado.",
      "Porque apps com varias telas podem ter elementos parecidos, e sem indicar a tela a mudanca pode ser aplicada no lugar errado.",
      "Isso so e necessario em aplicativos com mais de 5 telas."
    ],
    2,
    "Quando voce aponta exatamente em qual tela a mudanca deve acontecer, o Lovable evita editar elementos parecidos em outras partes do app."
  ),
  textStep(
    "Editando Elementos Visuais",
    "Ajustes visuais sao algumas das edicoes mais frequentes: cor, tamanho, espacamento, fonte e distribuicao dos elementos. Quando voce lista varios ajustes na mesma mensagem de forma organizada, consegue avaliar o efeito combinado deles de uma vez."
  ),
  fillStep(
    "Preencha a lacuna - Faca edicoes visuais!",
    "Monte um pedido claro de edicao visual em lote.",
    "\"Faca os seguintes ajustes visuais: mude a ___ de fundo do header para ___, aumente o ___ entre os cards da Dashboard de ___ para ___, mude a fonte dos titulos para ___, deixe os ___ com sombra mais suave e adicione uma ___ de cor ___ no lado esquerdo de cada card de agendamento confirmado.\"",
    [
      "cor",
      "azul escuro",
      "espacamento",
      "8px",
      "16px",
      "Inter",
      "cards",
      "borda vertical",
      "verde"
    ],
    [
      "cor",
      "azul escuro",
      "espacamento",
      "8px",
      "16px",
      "Inter",
      "cards",
      "borda vertical",
      "verde",
      "vermelho neon",
      "margem aleatoria"
    ],
    "Pedidos visuais bons dizem exatamente o que mudar, onde mudar e qual resultado visual voce espera ver."
  ),
  textStep(
    "Editando Funcionalidades Existentes",
    "O chat tambem permite mudar o comportamento de recursos que ja existem. Validacao de campos obrigatorios, mensagens claras e feedback de sucesso reduzem frustracao e aumentam a confianca do usuario no produto."
  ),
  fillStep(
    "Preencha a lacuna - Edite funcionalidades!",
    "Monte um pedido claro para melhorar o comportamento de um formulario.",
    "\"Altere o comportamento do formulario de novo agendamento: antes de ___, verifique se todos os campos ___ foram preenchidos e mostre uma ___ em vermelho abaixo de cada campo vazio. Apos salvar com sucesso, ___ o formulario automaticamente e mostre uma ___ verde no topo da tela por 3 segundos dizendo ___.\"",
    [
      "salvar",
      "obrigatorios",
      "mensagem de erro",
      "feche",
      "notificacao",
      "Agendamento criado com sucesso"
    ],
    [
      "salvar",
      "obrigatorios",
      "mensagem de erro",
      "feche",
      "notificacao",
      "Agendamento criado com sucesso",
      "ignorar",
      "reinicie a pagina"
    ],
    "Melhorar comportamento significa deixar claro o que bloqueia a acao, o que aconteceu com sucesso e como a interface responde."
  ),
  textStep(
    "Adicionando Novas Funcionalidades via Chat",
    "O chat nao serve so para corrigir. Ele tambem e o melhor lugar para pedir recursos novos. Fazer isso aos poucos e mais seguro, porque voce testa cada adicao separadamente e entende exatamente o que mudou."
  ),
  fillStep(
    "Preencha a lacuna - Adicione funcionalidades novas!",
    "Monte um pedido para incluir um recurso novo na tela de clientes.",
    "\"Adicione uma funcionalidade de ___ ao aplicativo: na tela de Clientes, adicione um botao ___ em cada card de cliente. Ao clicar, deve abrir um modal com o historico completo de ___ daquele cliente, mostrando ___, ___ e ___ de cada visita em ordem do mais ___ para o mais antigo.\"",
    [
      "historico de atendimentos",
      "Ver Historico",
      "agendamentos",
      "data",
      "servico realizado",
      "status",
      "recente"
    ],
    [
      "historico de atendimentos",
      "Ver Historico",
      "agendamentos",
      "data",
      "servico realizado",
      "status",
      "recente",
      "aleatorio",
      "oculto"
    ],
    "Ao pedir uma funcionalidade nova, vale dizer em qual tela ela entra, como o usuario acessa e quais dados devem aparecer."
  ),
  textStep(
    "Corrigindo Bugs e Comportamentos Inesperados",
    "Saber descrever um bug com precisao e uma das habilidades mais valiosas da edicao via chat. A sequencia mais util e: o que voce fez, o que aconteceu, o que deveria ter acontecido e em qual tela isso ocorreu."
  ),
  quizStep(
    "Descricao de bug eficaz",
    "O que torna uma descricao de bug eficaz para o Lovable?",
    [
      "Usar termos tecnicos de programacao para impressionar a ferramenta.",
      "Apenas dizer que algo nao esta funcionando.",
      "Descrever o que voce fez, o que aconteceu, o que deveria ter acontecido e em qual tela.",
      "Reiniciar o projeto e evitar explicar o problema."
    ],
    2,
    "Essa sequencia entrega contexto suficiente para o Lovable encontrar a causa mais rapido e corrigir sem adivinhacao."
  ),
  textStep(
    "Reorganizando a Estrutura do Aplicativo",
    "Depois de usar o aplicativo por algum tempo, fica mais facil perceber quais telas e acoes sao mais importantes no uso real. Reorganizar estrutura, menu e atalhos pode deixar o produto muito mais eficiente."
  ),
  fillStep(
    "Preencha a lacuna - Reorganize a estrutura!",
    "Monte um pedido para redistribuir secoes e menu no aplicativo.",
    "\"Faca as seguintes mudancas estruturais: mova a secao ___ que esta na Dashboard para uma tela ___ no menu lateral chamada ___, adicione um ___ de acesso rapido na Dashboard com botoes para as acoes mais frequentes e reordene o menu lateral para: ___, ___, ___, ___ e ___.\"",
    [
      "Configuracoes de Horarios",
      "separada",
      "Disponibilidade",
      "atalho",
      "Dashboard",
      "Agenda",
      "Clientes",
      "Disponibilidade",
      "Configuracoes"
    ],
    [
      "Configuracoes de Horarios",
      "separada",
      "Disponibilidade",
      "atalho",
      "Dashboard",
      "Agenda",
      "Clientes",
      "Disponibilidade",
      "Configuracoes",
      "rodape",
      "banner"
    ],
    "Reorganizacoes boas deixam a estrutura mais alinhada com o uso real, destacando o que precisa estar mais perto da rotina do usuario."
  ),
  textStep(
    "Editando Textos e Microcopy",
    "Os textos do aplicativo, como botoes, placeholders, titulos e mensagens, afetam diretamente a experiencia. Microcopy boa reduz ambiguidade, transmite personalidade e deixa cada acao mais clara."
  ),
  fillStep(
    "Preencha a lacuna - Melhore os textos!",
    "Monte um pedido para ajustar microcopy em varios pontos do app.",
    "\"Ajuste os textos do aplicativo: mude o botao ___ para ___, troque o placeholder do campo de busca de ___ para ___, mude o titulo da tela de Clientes de ___ para ___ e altere a mensagem de confirmacao de exclusao de ___ para ___.\"",
    [
      "Submit",
      "Salvar Agendamento",
      "Search...",
      "Buscar cliente por nome...",
      "Clientes",
      "Meus Clientes",
      "Tem certeza?",
      "Quer mesmo cancelar este agendamento? Essa acao nao pode ser desfeita."
    ],
    [
      "Submit",
      "Salvar Agendamento",
      "Search...",
      "Buscar cliente por nome...",
      "Clientes",
      "Meus Clientes",
      "Tem certeza?",
      "Quer mesmo cancelar este agendamento? Essa acao nao pode ser desfeita.",
      "OK",
      "Campo"
    ],
    "Melhorar microcopy deixa o aplicativo mais claro e transmite mais seguranca em acoes importantes."
  ),
  textStep(
    "Usando o Historico de Versoes",
    "Cada edicao feita via chat cria um ponto no historico de versoes. Isso permite experimentar sem medo, porque se uma mudanca nao funcionar, voce consegue voltar exatamente para um estado anterior sem perder o trabalho ja realizado."
  ),
  fillStep(
    "Preencha a lacuna - Use o historico!",
    "Monte uma explicacao clara sobre o papel do historico de versoes.",
    "\"O historico de versoes do Lovable funciona como um ___ do seu projeto: cada ___ via chat cria um ___ automatico. Se uma edicao gerar um problema inesperado, voce pode ___ para qualquer versao anterior sem perder o ___ das versoes seguintes, permitindo ___ diferentes caminhos de edicao com seguranca.\"",
    [
      "arquivo historico",
      "edicao",
      "checkpoint",
      "voltar",
      "progresso",
      "explorar"
    ],
    [
      "arquivo historico",
      "edicao",
      "checkpoint",
      "voltar",
      "progresso",
      "explorar",
      "bloquear",
      "substituir"
    ],
    "O historico de versoes reduz risco porque transforma cada iteracao em um ponto seguro de retorno."
  ),
  textStep(
    "Os Erros Mais Comuns na Edicao via Chat",
    "O erro mais caro e nao testar cada mudanca antes de pedir a proxima. Quando varios problemas se acumulam, fica muito mais dificil descobrir em qual edicao algo saiu do esperado."
  ),
  quizStep(
    "O erro mais custoso",
    "Qual e o erro mais custoso na edicao via chat do Lovable?",
    [
      "Pedir ajustes visuais muito detalhados.",
      "Usar linguagem simples nos pedidos.",
      "Nao testar cada edicao antes de pedir a proxima.",
      "Fazer varias mudancas visuais antes de adicionar funcionalidades."
    ],
    2,
    "Testar a cada iteracao evita que erros se empilhem e deixa a causa de cada problema muito mais facil de localizar."
  ),
  textStep(
    "Conclusao",
    "A edicao via chat e onde o Lovable realmente vira um parceiro de desenvolvimento. Pedidos precisos, ajustes em lote, descricoes boas de bugs, adicao progressiva de recursos, reorganizacao estrutural, microcopy melhor e uso inteligente do historico tornam o fluxo mais rapido, seguro e eficaz.\n\nLicao concluida."
  ),
] as const;

export const LOVABLE_MODULE_3_STEPS_EN = [
  textStep(
    "Editing via Chat in Lovable",
    "Welcome back! In this lesson, you will master chat-based editing, the most powerful way to evolve, fix, and personalize your app in Lovable using only natural language, without touching a single line of code."
  ),
  textStep(
    "Chat as a Continuous Editing Tool",
    "In Lovable, the chat is not only for creating the first version. It stays with the project from start to finish. Every visual, functional, or structural change can be described in plain language and applied in real time without opening technical files or understanding code."
  ),
  textStep(
    "The Anatomy of a Good Editing Request",
    "The difference between an edit that helps and one that creates new problems lies in the quality of the request. A good request says where the problem is, what is wrong, and what should happen instead."
  ),
  quizStep(
    "Why naming the screen matters",
    "Why is it so important to specify the screen in an editing request?",
    [
      "Because Lovable cannot identify which screen to edit without any instruction.",
      "To make the request longer and more detailed.",
      "Because apps with multiple screens can have similar elements, and without naming the screen the change may be applied in the wrong place.",
      "This is only necessary in apps with more than 5 screens."
    ],
    2,
    "When you point to the exact screen, Lovable is much less likely to edit similar elements somewhere else in the app."
  ),
  textStep(
    "Editing Visual Elements",
    "Visual adjustments are among the most common edits: color, size, spacing, font, and element layout. When you group several adjustments in one organized request, you can review their combined effect in a single iteration."
  ),
  fillStep(
    "Fill in the blanks - Make visual edits!",
    "Build a clear batch request for visual editing.",
    "\"Make the following visual adjustments: change the header background ___ to ___, increase the ___ between the Dashboard cards from ___ to ___, change the title font to ___, make the ___ have a softer shadow, and add a ___ in ___ on the left side of each confirmed appointment card.\"",
    [
      "color",
      "dark blue",
      "spacing",
      "8px",
      "16px",
      "Inter",
      "cards",
      "vertical border",
      "green"
    ],
    [
      "color",
      "dark blue",
      "spacing",
      "8px",
      "16px",
      "Inter",
      "cards",
      "vertical border",
      "green",
      "neon red",
      "random margin"
    ],
    "Good visual requests explain exactly what should change, where it should change, and what final look you want."
  ),
  textStep(
    "Editing Existing Functionality",
    "The chat can also change the behavior of features that already exist. Required-field validation, clear error messages, and success feedback reduce frustration and make the product feel more trustworthy."
  ),
  fillStep(
    "Fill in the blanks - Edit functionality!",
    "Build a request to improve the behavior of a form.",
    "\"Change the behavior of the new appointment form: before ___, check whether all ___ fields have been filled in and show a ___ in red below each empty field. After a successful save, ___ the form automatically and show a green ___ at the top of the screen for 3 seconds saying ___.\"",
    [
      "saving",
      "required",
      "error message",
      "close",
      "notification",
      "Appointment created successfully"
    ],
    [
      "saving",
      "required",
      "error message",
      "close",
      "notification",
      "Appointment created successfully",
      "ignore",
      "reload the page"
    ],
    "Improving behavior means making it clear what blocks the action, what succeeded, and how the interface responds."
  ),
  textStep(
    "Adding New Features via Chat",
    "Chat is not just for fixing existing parts. It is also the best place to request completely new features. Adding them progressively is safer because you test each one separately and know exactly what changed."
  ),
  fillStep(
    "Fill in the blanks - Add new functionality!",
    "Build a request to add a new feature to the clients screen.",
    "\"Add a ___ feature to the app: on the Clients screen, add a ___ button to each client card. When clicked, it should open a modal with that client's full ___, showing the ___, ___, and ___ of each visit from most ___ to oldest.\"",
    [
      "service history",
      "View History",
      "appointments",
      "date",
      "service performed",
      "status",
      "recent"
    ],
    [
      "service history",
      "View History",
      "appointments",
      "date",
      "service performed",
      "status",
      "recent",
      "random",
      "hidden"
    ],
    "When asking for a new feature, it helps to say which screen it belongs to, how the user opens it, and which data should appear."
  ),
  textStep(
    "Fixing Bugs and Unexpected Behavior",
    "Knowing how to describe a bug precisely is one of the most valuable chat-editing skills. The most useful sequence is: what you did, what happened, what should have happened, and on which screen it occurred."
  ),
  quizStep(
    "An effective bug report",
    "What makes a bug description effective for Lovable?",
    [
      "Using technical programming terms to impress the tool.",
      "Only saying that something is not working.",
      "Describing what you did, what happened, what should have happened, and on which screen.",
      "Restarting the project and avoiding any description."
    ],
    2,
    "That sequence gives Lovable enough context to find the likely cause faster and fix the issue with less guesswork."
  ),
  textStep(
    "Reorganizing the App Structure",
    "After using the app for some time, it becomes easier to notice which screens and actions matter most in real usage. Reorganizing structure, menu order, and shortcuts can make the product much more efficient."
  ),
  fillStep(
    "Fill in the blanks - Reorganize the structure!",
    "Build a request to redistribute sections and menu order in the app.",
    "\"Make the following structural changes: move the ___ section currently on the Dashboard to a ___ screen in the side menu called ___, add a quick-access ___ on the Dashboard with buttons for the most frequent actions, and reorder the side menu to: ___, ___, ___, ___, and ___.\"",
    [
      "Schedule Settings",
      "separate",
      "Availability",
      "shortcut",
      "Dashboard",
      "Schedule",
      "Clients",
      "Availability",
      "Settings"
    ],
    [
      "Schedule Settings",
      "separate",
      "Availability",
      "shortcut",
      "Dashboard",
      "Schedule",
      "Clients",
      "Availability",
      "Settings",
      "footer",
      "banner"
    ],
    "Good reorganizations make the structure match real usage, bringing the most common actions closer to the user's daily flow."
  ),
  textStep(
    "Editing Text and Microcopy",
    "App text such as buttons, placeholders, titles, and messages has a direct impact on the user experience. Strong microcopy reduces ambiguity, communicates personality, and makes every action clearer."
  ),
  fillStep(
    "Fill in the blanks - Improve the text!",
    "Build a request to improve microcopy in several parts of the app.",
    "\"Adjust the app text: change the ___ button to ___, replace the search field placeholder from ___ to ___, change the Clients screen title from ___ to ___, and update the deletion confirmation message from ___ to ___.\"",
    [
      "Submit",
      "Save Appointment",
      "Search...",
      "Search client by name...",
      "Clients",
      "My Clients",
      "Are you sure?",
      "Do you really want to cancel this appointment? This action cannot be undone."
    ],
    [
      "Submit",
      "Save Appointment",
      "Search...",
      "Search client by name...",
      "Clients",
      "My Clients",
      "Are you sure?",
      "Do you really want to cancel this appointment? This action cannot be undone.",
      "OK",
      "Field"
    ],
    "Better microcopy makes the app clearer and creates more confidence around important actions."
  ),
  textStep(
    "Using Version History",
    "Each edit made through chat creates a point in the version history. That means you can experiment safely, because if a change goes wrong you can return to a previous state without losing the work already done."
  ),
  fillStep(
    "Fill in the blanks - Use the history!",
    "Build a clear explanation of what version history does.",
    "\"Lovable's version history works like a project ___: each chat ___ creates an automatic ___. If an edit creates an unexpected problem, you can ___ to any previous version without losing the ___ from later versions, which lets you ___ different editing paths safely.\"",
    [
      "archive",
      "edit",
      "checkpoint",
      "go back",
      "progress",
      "explore"
    ],
    [
      "archive",
      "edit",
      "checkpoint",
      "go back",
      "progress",
      "explore",
      "block",
      "replace"
    ],
    "Version history lowers risk because every iteration becomes a safe recovery point."
  ),
  textStep(
    "The Most Common Mistakes in Chat Editing",
    "The most expensive mistake is not testing each change before requesting the next one. When several issues pile up, it becomes much harder to see which edit caused the problem."
  ),
  quizStep(
    "The most costly mistake",
    "What is the most costly mistake in Lovable chat editing?",
    [
      "Requesting very detailed visual changes.",
      "Using simple language in requests.",
      "Not testing each edit before requesting the next one.",
      "Making several visual changes before adding new features."
    ],
    2,
    "Testing between iterations prevents issues from stacking up and makes each problem much easier to trace."
  ),
  textStep(
    "Conclusion",
    "Chat editing is where Lovable truly becomes a development partner. Precise requests, batch adjustments, strong bug descriptions, progressive feature additions, structural reorganization, better microcopy, and smart use of history make the workflow faster, safer, and more effective.\n\nLesson completed."
  ),
] as const;

export const LOVABLE_MODULE_3_STEPS_ES = [
  textStep(
    "Edicion por Chat en Lovable",
    "Bienvenido de nuevo. En esta leccion vas a dominar la edicion por chat, la forma mas poderosa de evolucionar, corregir y personalizar tu aplicacion en Lovable usando solo lenguaje natural, sin tocar una sola linea de codigo."
  ),
  textStep(
    "El Chat como Herramienta de Edicion Continua",
    "En Lovable, el chat no sirve solo para crear la primera version. Acompana todo el proyecto. Cada ajuste visual, funcional o estructural puede describirse en lenguaje natural y aplicarse en tiempo real, sin abrir archivos tecnicos ni entender codigo."
  ),
  textStep(
    "La Anatomia de un Buen Pedido de Edicion",
    "La diferencia entre una edicion que ayuda y una que genera nuevos problemas esta en la calidad del pedido. Un buen pedido dice donde esta el problema, que esta mal y que debe ocurrir en su lugar."
  ),
  quizStep(
    "Por que importa indicar la pantalla",
    "Por que es tan importante especificar la pantalla en el pedido de edicion?",
    [
      "Porque Lovable no puede identificar que pantalla editar sin ninguna instruccion.",
      "Para hacer el pedido mas largo y detallado.",
      "Porque las apps con varias pantallas pueden tener elementos parecidos y, sin indicar la pantalla, el cambio puede aplicarse en el lugar equivocado.",
      "Solo es necesario en aplicaciones con mas de 5 pantallas."
    ],
    2,
    "Cuando indicas exactamente en que pantalla debe hacerse el cambio, Lovable evita editar elementos parecidos en otras partes de la app."
  ),
  textStep(
    "Editando Elementos Visuales",
    "Los ajustes visuales son de las ediciones mas frecuentes: color, tamano, espaciado, fuente y distribucion de elementos. Cuando agrupas varios cambios en un solo pedido bien organizado, puedes evaluar su efecto combinado en una sola iteracion."
  ),
  fillStep(
    "Completa los espacios - Haz ediciones visuales!",
    "Construye un pedido claro de edicion visual por lotes.",
    "\"Haz los siguientes ajustes visuales: cambia el ___ de fondo del header a ___, aumenta el ___ entre las cards del Dashboard de ___ a ___, cambia la fuente de los titulos a ___, deja las ___ con una sombra mas suave y agrega una ___ de color ___ en el lado izquierdo de cada card de cita confirmada.\"",
    [
      "color",
      "azul oscuro",
      "espaciado",
      "8px",
      "16px",
      "Inter",
      "cards",
      "borde vertical",
      "verde"
    ],
    [
      "color",
      "azul oscuro",
      "espaciado",
      "8px",
      "16px",
      "Inter",
      "cards",
      "borde vertical",
      "verde",
      "rojo neon",
      "margen aleatorio"
    ],
    "Los buenos pedidos visuales dicen exactamente que cambiar, donde hacerlo y que resultado visual esperas ver."
  ),
  textStep(
    "Editando Funcionalidades Existentes",
    "El chat tambien permite cambiar el comportamiento de funciones que ya existen. La validacion de campos obligatorios, los mensajes claros y el feedback de exito reducen la frustracion y aumentan la confianza del usuario."
  ),
  fillStep(
    "Completa los espacios - Edita funcionalidades!",
    "Construye un pedido para mejorar el comportamiento de un formulario.",
    "\"Cambia el comportamiento del formulario de nueva cita: antes de ___, verifica si todos los campos ___ fueron completados y muestra un ___ en rojo debajo de cada campo vacio. Despues de guardar con exito, ___ el formulario automaticamente y muestra una ___ verde en la parte superior de la pantalla durante 3 segundos diciendo ___.\"",
    [
      "guardar",
      "obligatorios",
      "mensaje de error",
      "cierra",
      "notificacion",
      "Cita creada con exito"
    ],
    [
      "guardar",
      "obligatorios",
      "mensaje de error",
      "cierra",
      "notificacion",
      "Cita creada con exito",
      "ignora",
      "recarga la pagina"
    ],
    "Mejorar el comportamiento significa dejar claro que bloquea la accion, que salio bien y como responde la interfaz."
  ),
  textStep(
    "Agregando Nuevas Funcionalidades por Chat",
    "El chat no solo sirve para corregir. Tambien es el mejor lugar para pedir funciones completamente nuevas. Agregarlas de forma progresiva es mas seguro porque pruebas cada una por separado y sabes exactamente que cambio."
  ),
  fillStep(
    "Completa los espacios - Agrega nuevas funcionalidades!",
    "Construye un pedido para incluir una nueva funcion en la pantalla de clientes.",
    "\"Agrega una funcionalidad de ___ a la aplicacion: en la pantalla de Clientes, agrega un boton ___ en cada card de cliente. Al hacer clic, debe abrir un modal con el historial completo de ___ de ese cliente, mostrando ___, ___ y ___ de cada visita en orden de lo mas ___ a lo mas antiguo.\"",
    [
      "historial de atenciones",
      "Ver Historial",
      "citas",
      "fecha",
      "servicio realizado",
      "estado",
      "reciente"
    ],
    [
      "historial de atenciones",
      "Ver Historial",
      "citas",
      "fecha",
      "servicio realizado",
      "estado",
      "reciente",
      "aleatorio",
      "oculto"
    ],
    "Al pedir una funcion nueva, conviene decir en que pantalla aparece, como la abre el usuario y que datos debe mostrar."
  ),
  textStep(
    "Corrigiendo Bugs y Comportamientos Inesperados",
    "Saber describir un bug con precision es una de las habilidades mas valiosas de la edicion por chat. La secuencia mas util es: que hiciste, que paso, que deberia haber pasado y en que pantalla ocurrio."
  ),
  quizStep(
    "Descripcion de bug eficaz",
    "Que hace eficaz una descripcion de bug para Lovable?",
    [
      "Usar terminos tecnicos de programacion para impresionar a la herramienta.",
      "Solo decir que algo no funciona.",
      "Describir que hiciste, que paso, que deberia haber pasado y en que pantalla.",
      "Reiniciar el proyecto y evitar explicar el problema."
    ],
    2,
    "Esa secuencia le da a Lovable suficiente contexto para encontrar la causa mas rapido y corregir el problema con menos suposiciones."
  ),
  textStep(
    "Reorganizando la Estructura de la Aplicacion",
    "Despues de usar la app durante un tiempo, resulta mas facil notar que pantallas y acciones son las mas importantes en el uso real. Reorganizar la estructura, el menu y los accesos rapidos puede volver el producto mucho mas eficiente."
  ),
  fillStep(
    "Completa los espacios - Reorganiza la estructura!",
    "Construye un pedido para redistribuir secciones y menu en la aplicacion.",
    "\"Haz los siguientes cambios estructurales: mueve la seccion ___ que esta en el Dashboard a una pantalla ___ en el menu lateral llamada ___, agrega un ___ de acceso rapido en el Dashboard con botones para las acciones mas frecuentes y reordena el menu lateral como: ___, ___, ___, ___ y ___.\"",
    [
      "Configuracion de Horarios",
      "separada",
      "Disponibilidad",
      "atajo",
      "Dashboard",
      "Agenda",
      "Clientes",
      "Disponibilidad",
      "Configuraciones"
    ],
    [
      "Configuracion de Horarios",
      "separada",
      "Disponibilidad",
      "atajo",
      "Dashboard",
      "Agenda",
      "Clientes",
      "Disponibilidad",
      "Configuraciones",
      "pie de pagina",
      "banner"
    ],
    "Las buenas reorganizaciones alinean la estructura con el uso real y acercan las acciones mas frecuentes a la rutina del usuario."
  ),
  textStep(
    "Editando Textos y Microcopy",
    "Los textos de la aplicacion, como botones, placeholders, titulos y mensajes, impactan directamente en la experiencia. Un buen microcopy reduce ambiguedad, comunica personalidad y hace que cada accion se entienda mejor."
  ),
  fillStep(
    "Completa los espacios - Mejora los textos!",
    "Construye un pedido para mejorar el microcopy en varias partes de la app.",
    "\"Ajusta los textos de la aplicacion: cambia el boton ___ por ___, reemplaza el placeholder del campo de busqueda de ___ por ___, cambia el titulo de la pantalla de Clientes de ___ a ___ y actualiza el mensaje de confirmacion de eliminacion de ___ a ___.\"",
    [
      "Submit",
      "Guardar Cita",
      "Search...",
      "Buscar cliente por nombre...",
      "Clientes",
      "Mis Clientes",
      "Estas seguro?",
      "Realmente quieres cancelar esta cita? Esta accion no se puede deshacer."
    ],
    [
      "Submit",
      "Guardar Cita",
      "Search...",
      "Buscar cliente por nombre...",
      "Clientes",
      "Mis Clientes",
      "Estas seguro?",
      "Realmente quieres cancelar esta cita? Esta accion no se puede deshacer.",
      "OK",
      "Campo"
    ],
    "Mejorar el microcopy vuelve la app mas clara y transmite mayor seguridad en acciones importantes."
  ),
  textStep(
    "Usando el Historial de Versiones",
    "Cada edicion hecha por chat crea un punto en el historial de versiones. Eso te permite experimentar con seguridad porque, si un cambio sale mal, puedes volver exactamente a un estado anterior sin perder el trabajo ya hecho."
  ),
  fillStep(
    "Completa los espacios - Usa el historial!",
    "Construye una explicacion clara del papel del historial de versiones.",
    "\"El historial de versiones de Lovable funciona como un ___ de tu proyecto: cada ___ por chat crea un ___ automatico. Si una edicion genera un problema inesperado, puedes ___ a cualquier version anterior sin perder el ___ de las versiones siguientes, lo que te permite ___ distintos caminos de edicion con seguridad.\"",
    [
      "archivo historico",
      "edicion",
      "checkpoint",
      "volver",
      "progreso",
      "explorar"
    ],
    [
      "archivo historico",
      "edicion",
      "checkpoint",
      "volver",
      "progreso",
      "explorar",
      "bloquear",
      "reemplazar"
    ],
    "El historial de versiones reduce el riesgo porque convierte cada iteracion en un punto seguro de retorno."
  ),
  textStep(
    "Los Errores Mas Comunes en la Edicion por Chat",
    "El error mas costoso es no probar cada cambio antes de pedir el siguiente. Cuando varios problemas se acumulan, se vuelve mucho mas dificil descubrir en que edicion algo se desvio."
  ),
  quizStep(
    "El error mas costoso",
    "Cual es el error mas costoso en la edicion por chat de Lovable?",
    [
      "Pedir ajustes visuales demasiado detallados.",
      "Usar lenguaje simple en los pedidos.",
      "No probar cada edicion antes de pedir la siguiente.",
      "Hacer varios cambios visuales antes de agregar funcionalidades."
    ],
    2,
    "Probar entre iteraciones evita que los problemas se acumulen y hace mucho mas facil rastrear la causa de cada error."
  ),
  textStep(
    "Conclusion",
    "La edicion por chat es donde Lovable realmente se convierte en un socio de desarrollo. Pedidos precisos, ajustes por lotes, buenas descripciones de bugs, adicion progresiva de funciones, reorganizacion estructural, mejor microcopy y uso inteligente del historial hacen el flujo mas rapido, seguro y eficaz.\n\nLeccion concluida."
  ),
] as const;

export const LOVABLE_MODULE_3_STEPS_FR = [
  textStep(
    "Edition par Chat dans Lovable",
    "Bon retour. Dans cette lecon, vous allez maitriser l'edition par chat, la maniere la plus puissante de faire evoluer, corriger et personnaliser votre application dans Lovable en utilisant uniquement le langage naturel, sans toucher a une seule ligne de code."
  ),
  textStep(
    "Le Chat comme Outil d'Edition Continue",
    "Dans Lovable, le chat ne sert pas seulement a creer la premiere version. Il accompagne tout le projet. Chaque ajustement visuel, fonctionnel ou structurel peut etre decrit en langage naturel et applique en temps reel, sans ouvrir de fichiers techniques ni comprendre le code."
  ),
  textStep(
    "L'Anatomie d'une Bonne Demande d'Edition",
    "La difference entre une edition utile et une edition qui cree de nouveaux problemes repose sur la qualite de la demande. Une bonne demande indique ou se trouve le probleme, ce qui ne va pas et ce qui doit se passer a la place."
  ),
  quizStep(
    "Pourquoi preciser l'ecran",
    "Pourquoi est-il si important de preciser l'ecran dans une demande d'edition ?",
    [
      "Parce que Lovable est incapable d'identifier quel ecran modifier sans instruction.",
      "Pour rendre la demande plus longue et detaillee.",
      "Parce que les applications avec plusieurs ecrans peuvent avoir des elements similaires, et sans preciser l'ecran le changement peut etre applique au mauvais endroit.",
      "Ce n'est necessaire que pour les applications avec plus de 5 ecrans."
    ],
    2,
    "Quand vous indiquez clairement l'ecran concerne, Lovable evite plus facilement de modifier des elements similaires ailleurs dans l'application."
  ),
  textStep(
    "Modifier les Elements Visuels",
    "Les ajustements visuels font partie des editions les plus frequentes : couleur, taille, espacement, police et disposition des elements. Quand vous regroupez plusieurs ajustements dans une demande bien organisee, vous pouvez evaluer leur effet combine en une seule iteration."
  ),
  fillStep(
    "Completez les blancs - Faites des editions visuelles !",
    "Construisez une demande claire d'edition visuelle par lot.",
    "\"Faites les ajustements visuels suivants : changez la ___ de fond du header en ___, augmentez l'___ entre les cartes du Dashboard de ___ a ___, changez la police des titres en ___, rendez les ___ avec une ombre plus douce et ajoutez une ___ de couleur ___ sur le cote gauche de chaque carte de rendez-vous confirme.\"",
    [
      "couleur",
      "bleu fonce",
      "espacement",
      "8px",
      "16px",
      "Inter",
      "cards",
      "bordure verticale",
      "verte"
    ],
    [
      "couleur",
      "bleu fonce",
      "espacement",
      "8px",
      "16px",
      "Inter",
      "cards",
      "bordure verticale",
      "verte",
      "rouge neon",
      "marge aleatoire"
    ],
    "Les bonnes demandes visuelles expliquent exactement quoi changer, ou le changer et quel resultat final vous souhaitez."
  ),
  textStep(
    "Modifier des Fonctionnalites Existantes",
    "Le chat permet aussi de changer le comportement de fonctions deja presentes. La validation des champs obligatoires, des messages clairs et un retour de succes reduisent la frustration et renforcent la confiance de l'utilisateur."
  ),
  fillStep(
    "Completez les blancs - Modifiez des fonctionnalites !",
    "Construisez une demande pour ameliorer le comportement d'un formulaire.",
    "\"Modifiez le comportement du formulaire de nouveau rendez-vous : avant de ___, verifiez si tous les champs ___ sont remplis et affichez un ___ en rouge sous chaque champ vide. Apres un enregistrement reussi, ___ automatiquement le formulaire et affichez une ___ verte en haut de l'ecran pendant 3 secondes indiquant ___.\"",
    [
      "sauvegarder",
      "obligatoires",
      "message d'erreur",
      "fermez",
      "notification",
      "Rendez-vous cree avec succes"
    ],
    [
      "sauvegarder",
      "obligatoires",
      "message d'erreur",
      "fermez",
      "notification",
      "Rendez-vous cree avec succes",
      "ignorez",
      "rechargez la page"
    ],
    "Ameliorer le comportement, c'est rendre clair ce qui bloque l'action, ce qui a reussi et comment l'interface repond."
  ),
  textStep(
    "Ajouter de Nouvelles Fonctionnalites via le Chat",
    "Le chat ne sert pas seulement a corriger. C'est aussi le meilleur endroit pour demander des fonctionnalites entierement nouvelles. Les ajouter progressivement est plus sur, car vous testez chaque ajout separement et savez exactement ce qui a change."
  ),
  fillStep(
    "Completez les blancs - Ajoutez de nouvelles fonctionnalites !",
    "Construisez une demande pour ajouter une nouvelle fonctionnalite a l'ecran des clients.",
    "\"Ajoutez une fonctionnalite de ___ a l'application : sur l'ecran Clients, ajoutez un bouton ___ sur chaque carte client. Lors du clic, il doit ouvrir une fenetre modale avec l'historique complet des ___ de ce client, en affichant la ___, le ___ realise et le ___ de chaque visite, de la plus ___ a la plus ancienne.\"",
    [
      "historique des rendez-vous",
      "Voir l'historique",
      "rendez-vous",
      "date",
      "service",
      "statut",
      "recente"
    ],
    [
      "historique des rendez-vous",
      "Voir l'historique",
      "rendez-vous",
      "date",
      "service",
      "statut",
      "recente",
      "aleatoire",
      "cache"
    ],
    "Quand vous demandez une nouvelle fonctionnalite, il est utile de preciser sur quel ecran elle apparait, comment l'utilisateur y accede et quelles donnees doivent s'afficher."
  ),
  textStep(
    "Corriger des Bugs et Comportements Inattendus",
    "Savoir decrire un bug avec precision est l'une des competences les plus utiles de l'edition par chat. La sequence la plus efficace est : ce que vous avez fait, ce qui s'est passe, ce qui aurait du se passer et sur quel ecran cela s'est produit."
  ),
  quizStep(
    "Description de bug efficace",
    "Qu'est-ce qui rend une description de bug efficace pour Lovable ?",
    [
      "Utiliser des termes techniques de programmation pour impressionner l'outil.",
      "Dire seulement que quelque chose ne fonctionne pas.",
      "Decrire ce que vous avez fait, ce qui s'est passe, ce qui aurait du se passer et sur quel ecran.",
      "Redemarrer le projet et eviter de decrire le probleme."
    ],
    2,
    "Cette sequence donne a Lovable assez de contexte pour trouver la cause plus vite et corriger avec moins d'hypotheses."
  ),
  textStep(
    "Reorganiser la Structure de l'Application",
    "Apres avoir utilise l'application pendant un certain temps, il devient plus facile d'identifier les ecrans et actions les plus importants dans l'usage reel. Reorganiser la structure, le menu et les raccourcis peut rendre le produit beaucoup plus efficace."
  ),
  fillStep(
    "Completez les blancs - Reorganisez la structure !",
    "Construisez une demande pour redistribuer les sections et le menu dans l'application.",
    "\"Faites les changements structurels suivants : deplacez la section ___ qui se trouve sur le Dashboard vers un ecran ___ dans le menu lateral appele ___, ajoutez un ___ d'acces rapide sur le Dashboard avec des boutons pour les actions les plus frequentes et reorganisez le menu lateral ainsi : ___, ___, ___, ___ et ___.\"",
    [
      "Configuration des horaires",
      "separe",
      "Disponibilite",
      "raccourci",
      "Dashboard",
      "Agenda",
      "Clients",
      "Disponibilite",
      "Parametres"
    ],
    [
      "Configuration des horaires",
      "separe",
      "Disponibilite",
      "raccourci",
      "Dashboard",
      "Agenda",
      "Clients",
      "Disponibilite",
      "Parametres",
      "pied de page",
      "banniere"
    ],
    "Les bonnes reorganisations alignent la structure sur l'usage reel et rapprochent les actions les plus frequentes du flux quotidien de l'utilisateur."
  ),
  textStep(
    "Modifier les Textes et le Microcopy",
    "Les textes de l'application, comme les boutons, placeholders, titres et messages, ont un impact direct sur l'experience utilisateur. Un bon microcopy reduit l'ambiguite, transmet une personnalite et rend chaque action plus claire."
  ),
  fillStep(
    "Completez les blancs - Ameliorez les textes !",
    "Construisez une demande pour ameliorer le microcopy a plusieurs endroits de l'application.",
    "\"Ajustez les textes de l'application : remplacez le bouton ___ par ___, changez le placeholder du champ de recherche de ___ en ___, modifiez le titre de l'ecran Clients de ___ en ___ et remplacez le message de confirmation de suppression de ___ par ___.\"",
    [
      "Submit",
      "Enregistrer le rendez-vous",
      "Search...",
      "Rechercher un client par nom...",
      "Clients",
      "Mes Clients",
      "Etes-vous sur ?",
      "Voulez-vous vraiment annuler ce rendez-vous ? Cette action est irreversible."
    ],
    [
      "Submit",
      "Enregistrer le rendez-vous",
      "Search...",
      "Rechercher un client par nom...",
      "Clients",
      "Mes Clients",
      "Etes-vous sur ?",
      "Voulez-vous vraiment annuler ce rendez-vous ? Cette action est irreversible.",
      "OK",
      "Champ"
    ],
    "Un meilleur microcopy rend l'application plus claire et renforce la confiance autour des actions importantes."
  ),
  textStep(
    "Utiliser l'Historique des Versions",
    "Chaque edition faite via le chat cree un point dans l'historique des versions. Cela vous permet d'experimenter sans crainte, car si un changement pose probleme vous pouvez revenir exactement a un etat precedent sans perdre le travail deja effectue."
  ),
  fillStep(
    "Completez les blancs - Utilisez l'historique !",
    "Construisez une explication claire du role de l'historique des versions.",
    "\"L'historique des versions de Lovable fonctionne comme une ___ de votre projet : chaque ___ via le chat cree un ___ automatique. Si une edition genere un probleme inattendu, vous pouvez ___ vers n'importe quelle version precedente sans perdre la ___ des versions suivantes, ce qui permet d'___ differents chemins d'edition en toute securite.\"",
    [
      "archive",
      "edition",
      "checkpoint",
      "revenir",
      "progression",
      "explorer"
    ],
    [
      "archive",
      "edition",
      "checkpoint",
      "revenir",
      "progression",
      "explorer",
      "bloquer",
      "remplacer"
    ],
    "L'historique des versions reduit le risque en transformant chaque iteration en point de retour fiable."
  ),
  textStep(
    "Les Erreurs les Plus Courantes dans l'Edition par Chat",
    "L'erreur la plus couteuse est de ne pas tester chaque changement avant de demander le suivant. Quand plusieurs problemes s'accumulent, il devient bien plus difficile d'identifier a quelle edition quelque chose a derape."
  ),
  quizStep(
    "L'erreur la plus couteuse",
    "Quelle est l'erreur la plus couteuse dans l'edition par chat sur Lovable ?",
    [
      "Demander des ajustements visuels trop detailles.",
      "Utiliser un langage simple dans les demandes.",
      "Ne pas tester chaque edition avant de demander la suivante.",
      "Faire plusieurs changements visuels avant d'ajouter des fonctionnalites."
    ],
    2,
    "Tester entre les iterations evite l'accumulation de problemes et rend la cause de chaque erreur beaucoup plus facile a retracer."
  ),
  textStep(
    "Conclusion",
    "L'edition par chat est l'endroit ou Lovable devient vraiment un partenaire de developpement. Des demandes precises, des ajustements par lot, de bonnes descriptions de bugs, un ajout progressif des fonctionnalites, une reorganisation structurelle, un meilleur microcopy et un usage intelligent de l'historique rendent le flux plus rapide, plus sur et plus efficace.\n\nLecon terminee."
  ),
] as const;
