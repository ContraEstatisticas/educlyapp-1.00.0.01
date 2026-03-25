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

export const CLAUDE_MODULE_3_STEPS_PT = [
  textStep(
    "Projetos no Claude - Organize, Contextualize e Produza Mais",
    "Bem-vindo de volta. Nesta licao, voce vai aprender a usar uma das funcionalidades mais poderosas do Claude: os Projetos. Com eles, voce mantem contexto, organiza conversas por tema e transforma o Claude em um assistente dedicado para cada area da sua vida."
  ),
  textStep(
    "O que sao os Projetos do Claude?",
    "Os Projetos sao espacos organizados dentro do Claude onde voce pode centralizar conversas, instrucoes e contexto sobre um tema especifico. Em vez de repetir as mesmas informacoes a cada nova conversa, o Projeto ja carrega tudo que o Claude precisa saber para te ajudar desde o primeiro momento."
  ),
  textStep(
    "Criando Seu Primeiro Projeto",
    "Para criar um Projeto, abra o painel lateral do Claude e clique em Novo Projeto. Dê um nome claro e objetivo, porque esse nome ajuda voce a encontrar o espaco depois e tambem comunica ao Claude o contexto geral do trabalho. Configure as instrucoes ja na criacao para evitar repeticao nas conversas seguintes."
  ),
  fillStep(
    "Preencha a lacuna - Configure seu primeiro projeto!",
    "Monte um prompt de configuracao inicial para o seu projeto.",
    '"Este projeto e sobre ___. Meu objetivo principal aqui e ___. Sempre que eu trouxer uma tarefa, considere que ___ e use um tom ___."',
    [
      "meu negocio de confeitaria artesanal",
      "criar conteudo para redes sociais e responder clientes",
      "estou falando com um publico jovem e informal",
      "descontraido e proximo"
    ],
    [
      "meu negocio de confeitaria artesanal",
      "criar conteudo para redes sociais e responder clientes",
      "estou falando com um publico jovem e informal",
      "descontraido e proximo",
      "muito tecnico",
      "ignorar o publico"
    ],
    "Um bom projeto deixa claro o tema, o objetivo, o publico e o tom esperado para que o Claude ja entre no contexto certo."
  ),
  textStep(
    "Instrucoes Personalizadas do Projeto",
    "Dentro de cada Projeto, voce pode adicionar instrucoes fixas, ou seja, informacoes que o Claude vai considerar em todas as conversas daquele espaco. E como entregar um briefing permanente ao seu assistente."
  ),
  fillStep(
    "Preencha a lacuna - Escreva suas instrucoes de projeto!",
    "Construa um conjunto de instrucoes fixas para um projeto profissional.",
    '"Contexto fixo: Sou ___ e uso este projeto para ___. Meu publico e ___. Sempre responda de forma ___, com exemplos ___ e evite ___."',
    [
      "consultor financeiro autonomo",
      "criar relatorios e analisar dados de clientes",
      "profissionais entre 30 e 50 anos",
      "clara e objetiva",
      "praticos",
      "linguagem excessivamente tecnica"
    ],
    [
      "consultor financeiro autonomo",
      "criar relatorios e analisar dados de clientes",
      "profissionais entre 30 e 50 anos",
      "clara e objetiva",
      "praticos",
      "linguagem excessivamente tecnica",
      "vago",
      "complicada"
    ],
    "As instrucoes fixas alinham o estilo de resposta com seu perfil, seu publico e o tipo de entrega que voce precisa."
  ),
  textStep(
    "Organizando Projetos por Area da Vida",
    "Uma das melhores formas de usar Projetos e criar um espaco separado para cada area: trabalho, estudos, projetos pessoais ou criacao de conteudo. Assim, cada conversa comeca com o contexto certo, sem misturar temas."
  ),
  textStep(
    "Adicionando Documentos e Arquivos ao Projeto",
    "Dentro de um Projeto, voce pode fazer upload de documentos como contratos, relatorios, anotacoes e briefings. O Claude passa a considerar esse material como referencia permanente, sem que voce precise reenviar o arquivo em toda conversa."
  ),
  fillStep(
    "Preencha a lacuna - Use documentos no seu projeto!",
    "Monte uma instrucao para que o Claude consulte um documento fixo antes de responder.",
    '"Adicionei ao projeto o ___ da minha empresa. Sempre que eu fizer uma pergunta sobre ___, consulte esse documento antes de responder e ___ qualquer informacao que nao esteja nele."',
    [
      "manual de identidade visual",
      "criacao de conteudo e comunicacao",
      "sinalize"
    ],
    [
      "manual de identidade visual",
      "criacao de conteudo e comunicacao",
      "sinalize",
      "ignore",
      "invente"
    ],
    "Quando voce deixa claro que um documento e a base da resposta, o Claude trabalha com mais consistencia e transparência."
  ),
  textStep(
    "Usando Projetos para Trabalho em Equipe",
    "Projetos tambem podem ser compartilhados com outras pessoas, o que e ideal para times que usam o Claude de forma colaborativa. Instrucoes fixas ajudam a manter o mesmo padrao de tom, formato e profundidade independentemente de quem fez a pergunta."
  ),
  fillStep(
    "Preencha a lacuna - Configure um projeto de equipe!",
    "Crie uma configuracao basica para um projeto compartilhado com o time.",
    '"Este projeto e compartilhado com minha equipe de ___. As instrucoes fixas sao: sempre responda em ___, use formatacao em ___ para facilitar a leitura e considere que todos os membros tem nivel ___ de conhecimento no assunto."',
    ["marketing", "portugues", "topicos", "intermediario"],
    ["marketing", "portugues", "topicos", "intermediario", "ingles", "paragrafos longos"],
    "Projetos compartilhados funcionam melhor quando o padrao de idioma, formato e nivel esperado esta explicitado desde o inicio."
  ),
  textStep(
    "Projetos para Aprendizado Continuo",
    "Os Projetos sao perfeitos para quem estuda algo ao longo do tempo. Voce cria um projeto para o assunto, adiciona materiais de referencia e mantem um historico de conversas que evolui junto com o seu aprendizado."
  ),
  quizStep(
    "Instrucao fixa para estudos",
    "Qual prompt de instrucao fixa voce usaria para um projeto de estudos de longo prazo?",
    [
      "\"Responda qualquer coisa que eu perguntar\"",
      "\"Seja breve em todas as respostas\"",
      "\"Este projeto e dedicado ao meu estudo de [tema]. Meu nivel atual e iniciante. Conforme as conversas avancarem, ajuste a complexidade das explicacoes. Sempre que eu aprender um conceito novo, conecte com o que ja estudamos antes neste projeto\"",
      "\"Guarde todas as minhas respostas para usar depois\""
    ],
    2,
    "A melhor instrucao informa o tema, o nivel atual, a progressao esperada e a necessidade de conectar novos conceitos ao historico do projeto."
  ),
  textStep(
    "Boas Praticas para Usar Projetos",
    "Para extrair o maximo dos Projetos, algumas praticas fazem toda a diferenca: criar projetos por area tematica, adicionar instrucoes claras e revisa-las periodicamente conforme o projeto evolui. Projetos bem configurados economizam tempo, mas ainda dependem de bons prompts dentro de cada conversa."
  ),
  fillStep(
    "Preencha a lacuna - Escreva a instrucao ideal para o seu projeto!",
    "Monte uma instrucao para manter o foco do projeto ao abrir novas conversas.",
    '"Sempre que eu iniciar uma nova conversa neste projeto, ___ o contexto principal antes de responder. Se minha pergunta for ___ do escopo do projeto, me ___ e pergunte se devo criar um ___ separado para esse tema."',
    ["considere", "fora", "avise", "projeto"],
    ["considere", "fora", "avise", "projeto", "ignore", "misture"],
    "Essa instrucao ajuda o Claude a manter consistencia, proteger o escopo e sugerir organizacao quando um novo assunto surgir."
  ),
  textStep(
    "Conclusao",
    "Os Projetos do Claude transformam o assistente de uma ferramenta pontual em um parceiro de longo prazo. Com contexto fixo, documentos de referencia, instrucoes personalizadas e historico organizado, cada conversa comeca exatamente de onde precisa, sem repeticao e sem retrabalho. Configure seus projetos com cuidado, revise as instrucoes conforme suas necessidades evoluem e use esse espaco como um verdadeiro ambiente de trabalho inteligente.\n\nLicao concluida."
  ),
] as const;

export const CLAUDE_MODULE_3_STEPS_EN = [
  textStep(
    "Projects in Claude - Organize, Add Context, and Produce More",
    "Welcome back. In this lesson, you will learn how to use one of Claude's most powerful features: Projects. With them, you keep context, organize conversations by theme, and turn Claude into a dedicated assistant for each area of your life."
  ),
  textStep(
    "What Are Claude Projects?",
    "Projects are organized spaces inside Claude where you can centralize conversations, instructions, and context around a specific theme. Instead of repeating the same information every time you open a new chat, the Project already carries what Claude needs to help you from the first message."
  ),
  textStep(
    "Creating Your First Project",
    "To create a Project, open Claude's sidebar and click New Project. Give it a clear and objective name, because that name helps you find it later and also signals the overall context of the space to Claude. Configure the instructions right at creation so the context carries across future conversations."
  ),
  fillStep(
    "Fill in the blank - Configure your first project!",
    "Build an initial setup prompt for your project.",
    '"This project is about ___. My main goal here is ___. Whenever I bring a task, consider that ___ and use a ___ tone."',
    [
      "my handmade bakery business",
      "create social media content and reply to customers",
      "I am speaking to a young and informal audience",
      "relaxed and approachable"
    ],
    [
      "my handmade bakery business",
      "create social media content and reply to customers",
      "I am speaking to a young and informal audience",
      "relaxed and approachable",
      "highly technical",
      "ignore the audience"
    ],
    "A strong project setup makes the theme, objective, audience, and tone explicit so Claude starts from the right context."
  ),
  textStep(
    "Project Custom Instructions",
    "Inside each Project, you can add fixed instructions, which are pieces of information Claude should consider in every conversation in that space. It works like a permanent briefing for your assistant."
  ),
  fillStep(
    "Fill in the blank - Write your project instructions!",
    "Build a set of fixed instructions for a professional project.",
    '"Fixed context: I am a ___ and I use this project to ___. My audience is ___. Always respond in a ___ way, with ___ examples, and avoid ___."',
    [
      "self-employed financial consultant",
      "create reports and analyze client data",
      "professionals between 30 and 50 years old",
      "clear and objective",
      "practical",
      "overly technical language"
    ],
    [
      "self-employed financial consultant",
      "create reports and analyze client data",
      "professionals between 30 and 50 years old",
      "clear and objective",
      "practical",
      "overly technical language",
      "vague",
      "complicated"
    ],
    "Fixed instructions align Claude's response style with your profile, your audience, and the kind of output you need."
  ),
  textStep(
    "Organizing Projects by Life Area",
    "One of the best ways to use Projects is to create a separate space for each area: work, study, personal projects, or content creation. That way every conversation starts with the right context instead of mixing unrelated topics."
  ),
  textStep(
    "Adding Documents and Files to a Project",
    "Inside a Project, you can upload documents such as contracts, reports, notes, and briefs. Claude then uses that material as a standing reference, so you do not need to send the same file again in every conversation."
  ),
  fillStep(
    "Fill in the blank - Use documents in your project!",
    "Build an instruction telling Claude to consult a fixed document before answering.",
    '"I added the ___ of my company to the project. Whenever I ask a question about ___, consult that document before answering and ___ any information that is not in it."',
    [
      "brand identity manual",
      "content creation and communication",
      "flag"
    ],
    [
      "brand identity manual",
      "content creation and communication",
      "flag",
      "ignore",
      "invent"
    ],
    "When you make it explicit that a document is the source of truth, Claude can answer with more consistency and transparency."
  ),
  textStep(
    "Using Projects for Teamwork",
    "Projects can also be shared with other people, which is ideal for teams using Claude collaboratively. Fixed instructions help maintain the same standard of tone, format, and depth no matter who asked the question."
  ),
  fillStep(
    "Fill in the blank - Configure a team project!",
    "Create a basic setup for a shared team project.",
    '"This project is shared with my ___ team. The fixed instructions are: always answer in ___, use ___ formatting to make reading easier, and assume all members have an ___ level of knowledge on the subject."',
    ["marketing", "Portuguese", "bullet points", "intermediate"],
    ["marketing", "Portuguese", "bullet points", "intermediate", "English", "long paragraphs"],
    "Shared projects work better when language, formatting, and expected level are clearly defined from the beginning."
  ),
  textStep(
    "Projects for Continuous Learning",
    "Projects are perfect for anyone studying something over time. You create a project for the subject, add reference materials, and keep a conversation history that evolves together with your learning."
  ),
  quizStep(
    "Fixed study instruction",
    "Which fixed instruction prompt would you use for a long-term study project?",
    [
      "\"Answer anything I ask\"",
      "\"Be brief in every answer\"",
      "\"This project is dedicated to my study of [topic]. My current level is beginner. As the conversations progress, adjust the complexity of the explanations. Whenever I learn a new concept, connect it with what we have already studied in this project\"",
      "\"Store all of my answers for later use\""
    ],
    2,
    "The best instruction states the topic, the current level, the expected progression, and the need to connect new concepts to the project's history."
  ),
  textStep(
    "Best Practices for Using Projects",
    "To get the most out of Projects, a few practices make a big difference: create projects by thematic area, add clear instructions, and review them periodically as the project evolves. Well-configured projects save time, but they still depend on good prompts inside each conversation."
  ),
  fillStep(
    "Fill in the blank - Write the ideal instruction for your project!",
    "Build an instruction to keep the project focused when new chats start.",
    '"Whenever I start a new conversation in this project, ___ the main context before answering. If my question is ___ the project scope, ___ me and ask whether I should create a separate ___ for that topic."',
    ["consider", "outside", "warn", "project"],
    ["consider", "outside", "warn", "project", "ignore", "mix"],
    "This instruction helps Claude preserve consistency, protect the scope, and suggest better organization when a new topic appears."
  ),
  textStep(
    "Conclusion",
    "Claude Projects turn the assistant from a one-off tool into a long-term partner. With fixed context, reference documents, custom instructions, and organized history, each conversation starts exactly where it should, without repetition and without rework. Configure your projects carefully, review the instructions as your needs evolve, and use the space as a true intelligent work environment.\n\nLesson complete."
  ),
] as const;

export const CLAUDE_MODULE_3_STEPS_ES = [
  textStep(
    "Proyectos en Claude - Organiza, Contextualiza y Produce Mas",
    "Bienvenido de nuevo. En esta leccion aprenderas a usar una de las funciones mas poderosas de Claude: los Proyectos. Con ellos, mantienes contexto, organizas conversaciones por tema y conviertes a Claude en un asistente dedicado para cada area de tu vida."
  ),
  textStep(
    "Que son los Proyectos de Claude?",
    "Los Proyectos son espacios organizados dentro de Claude donde puedes centralizar conversaciones, instrucciones y contexto sobre un tema especifico. En lugar de repetir la misma informacion cada vez que abres una nueva conversacion, el Proyecto ya conserva lo que Claude necesita para ayudarte desde el primer mensaje."
  ),
  textStep(
    "Creando tu Primer Proyecto",
    "Para crear un Proyecto, abre el panel lateral de Claude y haz clic en Nuevo Proyecto. Dale un nombre claro y objetivo, porque ese nombre te ayuda a encontrarlo despues y tambien le comunica a Claude el contexto general del espacio. Configura las instrucciones desde el principio para evitar repetirlas en las conversaciones futuras."
  ),
  fillStep(
    "Completa el espacio - Configura tu primer proyecto!",
    "Construye un prompt de configuracion inicial para tu proyecto.",
    '"Este proyecto es sobre ___. Mi objetivo principal aqui es ___. Siempre que traiga una tarea, considera que ___ y usa un tono ___."',
    [
      "mi negocio de reposteria artesanal",
      "crear contenido para redes sociales y responder clientes",
      "estoy hablando con un publico joven e informal",
      "relajado y cercano"
    ],
    [
      "mi negocio de reposteria artesanal",
      "crear contenido para redes sociales y responder clientes",
      "estoy hablando con un publico joven e informal",
      "relajado y cercano",
      "muy tecnico",
      "ignorar al publico"
    ],
    "Una buena configuracion inicial deja claro el tema, el objetivo, el publico y el tono para que Claude empiece con el contexto correcto."
  ),
  textStep(
    "Instrucciones Personalizadas del Proyecto",
    "Dentro de cada Proyecto puedes agregar instrucciones fijas, es decir, informacion que Claude debe considerar en todas las conversaciones de ese espacio. Funciona como un briefing permanente para tu asistente."
  ),
  fillStep(
    "Completa el espacio - Escribe tus instrucciones de proyecto!",
    "Construye un conjunto de instrucciones fijas para un proyecto profesional.",
    '"Contexto fijo: Soy ___ y uso este proyecto para ___. Mi publico es ___. Responde siempre de forma ___, con ejemplos ___ y evita ___."',
    [
      "consultor financiero autonomo",
      "crear informes y analizar datos de clientes",
      "profesionales entre 30 y 50 anos",
      "clara y objetiva",
      "practicos",
      "lenguaje excesivamente tecnico"
    ],
    [
      "consultor financiero autonomo",
      "crear informes y analizar datos de clientes",
      "profesionales entre 30 y 50 anos",
      "clara y objetiva",
      "practicos",
      "lenguaje excesivamente tecnico",
      "vaga",
      "complicada"
    ],
    "Las instrucciones fijas alinean el estilo de respuesta con tu perfil, tu publico y el tipo de entrega que necesitas."
  ),
  textStep(
    "Organizando Proyectos por Area de la Vida",
    "Una de las mejores maneras de usar Proyectos es crear un espacio separado para cada area: trabajo, estudio, proyectos personales o creacion de contenido. Asi cada conversacion empieza con el contexto correcto, sin mezclar temas."
  ),
  textStep(
    "Agregando Documentos y Archivos al Proyecto",
    "Dentro de un Proyecto puedes subir documentos como contratos, informes, notas y briefings. Claude pasa a considerar ese material como referencia permanente, sin que tengas que reenviar el archivo en cada conversacion."
  ),
  fillStep(
    "Completa el espacio - Usa documentos en tu proyecto!",
    "Construye una instruccion para que Claude consulte un documento fijo antes de responder.",
    '"Agregue al proyecto el ___ de mi empresa. Siempre que haga una pregunta sobre ___, consulta ese documento antes de responder y ___ cualquier informacion que no este alli."',
    [
      "manual de identidad visual",
      "creacion de contenido y comunicacion",
      "senala"
    ],
    [
      "manual de identidad visual",
      "creacion de contenido y comunicacion",
      "senala",
      "ignora",
      "inventa"
    ],
    "Cuando dejas claro que un documento es la base de referencia, Claude trabaja con mas consistencia y transparencia."
  ),
  textStep(
    "Usando Proyectos para Trabajo en Equipo",
    "Los Proyectos tambien pueden compartirse con otras personas, lo que es ideal para equipos que usan Claude de manera colaborativa. Las instrucciones fijas ayudan a mantener el mismo patron de tono, formato y profundidad sin importar quien haga la pregunta."
  ),
  fillStep(
    "Completa el espacio - Configura un proyecto de equipo!",
    "Crea una configuracion basica para un proyecto compartido con el equipo.",
    '"Este proyecto esta compartido con mi equipo de ___. Las instrucciones fijas son: responde siempre en ___, usa formato en ___ para facilitar la lectura y considera que todos los miembros tienen un nivel ___ de conocimiento sobre el tema."',
    ["marketing", "portugues", "temas", "intermedio"],
    ["marketing", "portugues", "temas", "intermedio", "ingles", "parrafos largos"],
    "Los proyectos compartidos funcionan mejor cuando idioma, formato y nivel esperado quedan claros desde el principio."
  ),
  textStep(
    "Proyectos para Aprendizaje Continuo",
    "Los Proyectos son perfectos para quien estudia algo a lo largo del tiempo. Creas un proyecto para el tema, agregas materiales de referencia y mantienes un historial de conversaciones que evoluciona junto con tu aprendizaje."
  ),
  quizStep(
    "Instruccion fija para estudio",
    "Que prompt de instruccion fija usarias para un proyecto de estudio de largo plazo?",
    [
      "\"Responde cualquier cosa que pregunte\"",
      "\"Se breve en todas las respuestas\"",
      "\"Este proyecto esta dedicado a mi estudio de [tema]. Mi nivel actual es principiante. A medida que las conversaciones avancen, ajusta la complejidad de las explicaciones. Siempre que aprenda un concepto nuevo, conectalo con lo que ya estudiamos antes en este proyecto\"",
      "\"Guarda todas mis respuestas para usarlas despues\""
    ],
    2,
    "La mejor instruccion informa el tema, el nivel actual, la progresion esperada y la necesidad de conectar nuevos conceptos con el historial del proyecto."
  ),
  textStep(
    "Buenas Practicas para Usar Proyectos",
    "Para sacar el maximo provecho de los Proyectos, algunas practicas marcan mucha diferencia: crear proyectos por area tematica, agregar instrucciones claras y revisarlas periodicamente conforme el proyecto evoluciona. Los proyectos bien configurados ahorran tiempo, pero siguen dependiendo de buenos prompts dentro de cada conversacion."
  ),
  fillStep(
    "Completa el espacio - Escribe la instruccion ideal para tu proyecto!",
    "Construye una instruccion para mantener el foco del proyecto al iniciar nuevas conversaciones.",
    '"Siempre que inicie una nueva conversacion en este proyecto, ___ el contexto principal antes de responder. Si mi pregunta esta ___ del alcance del proyecto, me ___ y pregunta si debo crear un ___ separado para ese tema."',
    ["considera", "fuera", "avisa", "proyecto"],
    ["considera", "fuera", "avisa", "proyecto", "ignora", "mezcla"],
    "Esta instruccion ayuda a Claude a mantener consistencia, proteger el alcance y sugerir mejor organizacion cuando aparece un tema nuevo."
  ),
  textStep(
    "Conclusion",
    "Los Proyectos de Claude transforman al asistente de una herramienta puntual en un socio de largo plazo. Con contexto fijo, documentos de referencia, instrucciones personalizadas e historial organizado, cada conversacion empieza exactamente donde debe, sin repeticion ni retrabajo. Configura tus proyectos con cuidado, revisa las instrucciones a medida que tus necesidades evolucionan y usa este espacio como un verdadero entorno de trabajo inteligente.\n\nLeccion completada."
  ),
] as const;

export const CLAUDE_MODULE_3_STEPS_FR = [
  textStep(
    "Projets dans Claude - Organisez, Contextualisez et Produisez Davantage",
    "Bienvenue de retour. Dans cette lecon, vous allez apprendre a utiliser l'une des fonctionnalites les plus puissantes de Claude : les Projets. Avec eux, vous conservez le contexte, organisez les conversations par theme et transformez Claude en assistant dedie a chaque domaine de votre vie."
  ),
  textStep(
    "Que sont les Projets de Claude ?",
    "Les Projets sont des espaces organises dans Claude ou vous pouvez centraliser des conversations, des instructions et du contexte autour d'un sujet precis. Au lieu de repeter les memes informations a chaque nouvelle conversation, le Projet garde deja ce dont Claude a besoin pour vous aider des le premier message."
  ),
  textStep(
    "Creer Votre Premier Projet",
    "Pour creer un Projet, ouvrez le panneau lateral de Claude et cliquez sur Nouveau Projet. Donnez-lui un nom clair et objectif, car ce nom vous aide a le retrouver plus tard et communique aussi a Claude le contexte general de l'espace. Configurez les instructions des la creation pour eviter les repetitions dans les conversations suivantes."
  ),
  fillStep(
    "Remplissez le vide - Configurez votre premier projet !",
    "Construisez un prompt de configuration initiale pour votre projet.",
    '"Ce projet porte sur ___. Mon objectif principal ici est ___. Chaque fois que j\'apporte une tache, considerez que ___ et utilisez un ton ___."',
    [
      "mon entreprise de patisserie artisanale",
      "creer du contenu pour les reseaux sociaux et repondre aux clients",
      "je parle a un public jeune et informel",
      "detendu et proche"
    ],
    [
      "mon entreprise de patisserie artisanale",
      "creer du contenu pour les reseaux sociaux et repondre aux clients",
      "je parle a un public jeune et informel",
      "detendu et proche",
      "tres technique",
      "ignorer le public"
    ],
    "Une bonne configuration initiale rend explicites le theme, l'objectif, le public et le ton pour que Claude demarre avec le bon contexte."
  ),
  textStep(
    "Instructions Personnalisees du Projet",
    "Dans chaque Projet, vous pouvez ajouter des instructions fixes, c'est-a-dire des informations que Claude doit prendre en compte dans toutes les conversations de cet espace. Cela fonctionne comme un briefing permanent pour votre assistant."
  ),
  fillStep(
    "Remplissez le vide - Ecrivez vos instructions de projet !",
    "Construisez un ensemble d'instructions fixes pour un projet professionnel.",
    '"Contexte fixe : Je suis ___ et j\'utilise ce projet pour ___. Mon public est ___. Repondez toujours de facon ___, avec des exemples ___ et evitez ___."',
    [
      "consultant financier independant",
      "creer des rapports et analyser des donnees clients",
      "des professionnels entre 30 et 50 ans",
      "claire et objective",
      "pratiques",
      "un langage excessivement technique"
    ],
    [
      "consultant financier independant",
      "creer des rapports et analyser des donnees clients",
      "des professionnels entre 30 et 50 ans",
      "claire et objective",
      "pratiques",
      "un langage excessivement technique",
      "vague",
      "compliquee"
    ],
    "Les instructions fixes alignent le style de reponse avec votre profil, votre public et le type de livrable dont vous avez besoin."
  ),
  textStep(
    "Organiser les Projets par Domaine de Vie",
    "L'une des meilleures facons d'utiliser les Projets est de creer un espace separe pour chaque domaine : travail, etudes, projets personnels ou creation de contenu. Ainsi, chaque conversation commence avec le bon contexte, sans melanger les sujets."
  ),
  textStep(
    "Ajouter des Documents et Fichiers au Projet",
    "Dans un Projet, vous pouvez televerser des documents comme des contrats, rapports, notes et briefs. Claude commence alors a utiliser ce materiel comme reference permanente, sans que vous ayez a renvoyer le fichier a chaque conversation."
  ),
  fillStep(
    "Remplissez le vide - Utilisez des documents dans votre projet !",
    "Construisez une instruction demandant a Claude de consulter un document fixe avant de repondre.",
    '"J\'ai ajoute au projet le ___ de mon entreprise. Chaque fois que je pose une question sur ___, consultez ce document avant de repondre et ___ toute information qui ne s\'y trouve pas."',
    [
      "manuel d'identite visuelle",
      "la creation de contenu et la communication",
      "signalez"
    ],
    [
      "manuel d'identite visuelle",
      "la creation de contenu et la communication",
      "signalez",
      "ignorez",
      "inventez"
    ],
    "Quand vous precisez qu'un document est la base de reference, Claude peut travailler avec davantage de coherence et de transparence."
  ),
  textStep(
    "Utiliser les Projets pour le Travail d'Equipe",
    "Les Projets peuvent aussi etre partages avec d'autres personnes, ce qui est ideal pour les equipes qui utilisent Claude de facon collaborative. Les instructions fixes aident a maintenir le meme standard de ton, de format et de profondeur, peu importe qui pose la question."
  ),
  fillStep(
    "Remplissez le vide - Configurez un projet d'equipe !",
    "Creez une configuration de base pour un projet partage avec l'equipe.",
    '"Ce projet est partage avec mon equipe de ___. Les instructions fixes sont : repondez toujours en ___, utilisez une mise en forme en ___ pour faciliter la lecture et considerez que tous les membres ont un niveau ___ de connaissance du sujet."',
    ["marketing", "portugais", "points", "intermediaire"],
    ["marketing", "portugais", "points", "intermediaire", "anglais", "paragraphes longs"],
    "Les projets partages fonctionnent mieux quand la langue, le format et le niveau attendu sont clairement definis des le depart."
  ),
  textStep(
    "Projets pour l'Apprentissage Continu",
    "Les Projets sont parfaits pour ceux qui etudient un sujet sur la duree. Vous creez un projet pour le sujet, ajoutez des ressources de reference et gardez un historique de conversations qui evolue avec votre apprentissage."
  ),
  quizStep(
    "Instruction fixe pour les etudes",
    "Quel prompt d'instruction fixe utiliseriez-vous pour un projet d'etude a long terme ?",
    [
      "\"Reponds a tout ce que je demande\"",
      "\"Sois bref dans toutes les reponses\"",
      "\"Ce projet est dedie a mon etude de [theme]. Mon niveau actuel est debutant. A mesure que les conversations avancent, ajuste la complexite des explications. Chaque fois que j'apprends un nouveau concept, relie-le a ce que nous avons deja etudie dans ce projet\"",
      "\"Garde toutes mes reponses pour les utiliser plus tard\""
    ],
    2,
    "La meilleure instruction indique le theme, le niveau actuel, la progression attendue et la necessite de relier les nouveaux concepts a l'historique du projet."
  ),
  textStep(
    "Bonnes Pratiques pour Utiliser les Projets",
    "Pour tirer le maximum des Projets, certaines pratiques changent tout : creer des projets par zone thematique, ajouter des instructions claires et les revoir periodiquement a mesure que le projet evolue. Des projets bien configures font gagner du temps, mais ils dependent toujours de bons prompts dans chaque conversation."
  ),
  fillStep(
    "Remplissez le vide - Ecrivez l'instruction ideale pour votre projet !",
    "Construisez une instruction pour garder le projet focalise lors de nouvelles conversations.",
    '"Chaque fois que je commence une nouvelle conversation dans ce projet, ___ le contexte principal avant de repondre. Si ma question est ___ du cadre du projet, ___-moi et demandez si je dois creer un ___ separe pour ce sujet."',
    ["considerez", "hors", "avertissez", "projet"],
    ["considerez", "hors", "avertissez", "projet", "ignorez", "melangez"],
    "Cette instruction aide Claude a maintenir la coherence, proteger le perimetre et proposer une meilleure organisation quand un nouveau sujet apparait."
  ),
  textStep(
    "Conclusion",
    "Les Projets de Claude transforment l'assistant d'un outil ponctuel en partenaire de long terme. Avec un contexte fixe, des documents de reference, des instructions personnalisees et un historique organise, chaque conversation commence exactement ou elle doit commencer, sans repetition ni retravail. Configurez vos projets avec soin, revisez les instructions a mesure que vos besoins evoluent et utilisez cet espace comme un veritable environnement de travail intelligent.\n\nLecon terminee."
  ),
] as const;
