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

export const CHATGPT_MODULE_2_STEPS_PT = [
  textStep(
    "Entendendo os Modelos do ChatGPT",
    "Olá novamente! Nesta lição, você vai explorar os diferentes modelos do ChatGPT disponíveis hoje e como escolher o melhor conforme sua tarefa. Você aprenderá sobre a linha atual, comparará seus pontos fortes e verá como alinhá-los aos seus objetivos.\n\nVamos começar!"
  ),
  textStep(
    "Introdução aos Modelos",
    "O ChatGPT funciona com modelos desenvolvidos pela OpenAI. Eles variam em velocidade, capacidade e recursos. Conhecer o modelo que você está usando ajuda a definir expectativas realistas e escolher a melhor opção para cada situação.\n\nAtualmente, a OpenAI oferece acesso a dois tipos de modelos:\n\n• GPT-5.2 — a opção mais nova e avançada, projetada para fluxos de trabalho em múltiplas etapas, memória persistente e integração completa de ferramentas.\n• GPT-4o (legado) — um modelo confiável que equilibra velocidade, raciocínio e entrada multimodal (texto, imagens e arquivos)."
  ),
  textStep(
    "GPT-4o",
    "O GPT-4o é considerado um modelo legado, mas permanece útil. É rápido, suporta entradas multimodais e lida bem com raciocínio geral. Em comparação ao GPT-5.2, não possui memória persistente, agentes autônomos nem a capacidade de gerenciar fluxos de trabalho complexos em múltiplas etapas.\n\nÉ adequado para:\n• Escrever ensaios, artigos ou textos de marketing\n• Explicar tópicos complexos com clareza\n• Tarefas estruturadas como planejamento ou árvores de decisão\n• Trabalho com imagens e arquivos simultaneamente"
  ),
  textStep(
    "Conheça o GPT-5.2",
    "O GPT-5.2 é o modelo mais avançado da OpenAI até o momento. Ele foi projetado para ir além das respostas simples — executando tarefas complexas, lembrando do seu contexto e trabalhando com ferramentas externas de forma integrada.\n\nUma das suas principais novidades são os modos de uso, que dão a você controle direto sobre o comportamento do modelo:\n• Auto Mode — o modelo decide o equilíbrio entre velocidade e profundidade de acordo com a sua tarefa.\n• Instant Mode — fornece respostas rápidas e leves.\n• Thinking Mode — prioriza raciocínio mais profundo.\n• Pro Mode — combina raciocínio avançado com acesso completo a ferramentas, agentes e memória."
  ),
  textStep(
    "Recursos Exclusivos do GPT-5.2",
    "• Agent Mode: O ChatGPT consegue gerenciar tarefas em várias etapas automaticamente, pesquisando um tema, organizando um esboço e entregando um relatório finalizado.\n• Memória Persistente: Lembra do seu contexto entre sessões. Útil para projetos de longo prazo e lembrar suas necessidades recorrentes.\n• Ferramentas Integradas: Web Search para tempo real, Deep Research para múltiplas fontes e Voice para interações de áudio avançadas."
  ),
  textStep(
    "Quando Usar Cada Modo",
    "• Instant Mode — Use quando a velocidade for prioridade, como em brainstorms rápidos ou perguntas curtas.\n• Thinking Mode — Escolha quando precisar de raciocínio estruturado, como ao analisar dados, resolver problemas ou elaborar relatórios.\n• Pro Mode — Ideal para quem precisa do máximo do GPT-5.2. Com agentes, ferramentas e memória ativados, é a melhor escolha para projetos de pesquisa complexos."
  ),
  quizStep(
    "Instant Mode",
    "Decida se o Instant Mode é melhor focado em velocidade ou em profundidade de raciocínio.",
    [
      "Profundidade",
      "Velocidade",
      "Memória Persistente",
      "Conexão com banco de dados"
    ],
    1,
    "O Instant Mode fornece respostas rápidas e leves quando o tempo importa mais do que o detalhamento estrutural."
  ),
  quizStep(
    "Limitações do GPT-4o",
    "O modelo GPT-4o suporta fluxos de trabalho automatizados em várias etapas?",
    [
      "Sim, é o modelo mais indicado para isso",
      "Não é adequado para gerenciar fluxos em múltiplas etapas automaticamente",
      "Apenas na versão gratuita",
      "Depende do idioma utilizado"
    ],
    1,
    "Em comparação ao GPT-5.2, o GPT-4o não possui agentes autônomos nem a capacidade de gerenciar fluxos complexos."
  ),
  quizStep(
    "Tarefas de Programação",
    "Qual modelo se destaca de forma inquestionável em codificação e programação?",
    [
      "Apenas o GPT-3.5",
      "GPT-5.2, pois executa tarefas complexas e possui raciocínio mais avançado",
      "O ChatGPT não deveria ser usado para programação",
      "Nenhum, não há diferença técnica na geração de códigos."
    ],
    1,
    "O GPT-5.2 é a opção avançada, ideal para análises lógicas complexas e programação passo a passo."
  ),
  quizStep(
    "Utilizando o Pro Mode",
    "Qual destas tarefas NÃO é a recomendação ideal para o Pro Mode?",
    [
      "Gerenciar fluxos de trabalho em várias etapas",
      "Projetos de pesquisa super complexos",
      "Tutoria detalhada e suporte educacional",
      "Perguntas de 'Sim/Não' no chat rápido"
    ],
    3,
    "Perguntas de 'sim ou não' não exigem ferramentas avançadas ou agentes no escopo secundário; o Instant Mode seria muito mais eficiente e veloz."
  ),
  quizStep(
    "Usos do GPT-4o",
    "Qual situação abaixo é mais adequada e costuma brilhar ao utilizar o GPT-4o?",
    [
      "Continuidade de projetos a longo prazo com memória persistente",
      "Tarefas de resposta rápida, rascunhos de layout e uso básico no dia a dia",
      "Fluxos de trabalho em várias etapas com agentes autônomos",
      "Análise aprofundada via Deep Research"
    ],
    1,
    "O GPT-4o permanece excelente e incrivelmente rápido para rotinas corriqueiras num cenário de single-session."
  ),
  textStep(
    "Conclusão",
    "Bom trabalho! Agora que você entende a diferença entre o GPT-4o e o GPT-5.2, e sabe como usar cada modo com estratégia, você está pronto para escolher a opção certa para cada tarefa. À medida que os modelos evoluem, continue experimentando — é assim que você extrai os melhores resultados.\n\nLição concluída ✓"
  )
] as const;

export const CHATGPT_MODULE_2_STEPS_EN = [
  textStep(
    "Understanding ChatGPT Models",
    "Hello again! In this lesson, you will explore the different ChatGPT models available today and how to choose the best one for your task. You will learn about the current lineup, compare their strengths, and see how to align them with your goals.\n\nLet's get started!"
  ),
  textStep(
    "Introduction to Models",
    "ChatGPT is powered by models developed by OpenAI. They vary in speed, capacity, and features. Knowing the model you are using helps set realistic expectations and choose the best option for every situation.\n\nCurrently, OpenAI offers access to two main types of models:\n\n• GPT-5.2 — the newest and most advanced option, designed for multi-step workflows, persistent memory, and full tool integration.\n• GPT-4o (legacy) — a reliable model that balances speed, reasoning, and multimodal input (text, images, and files)."
  ),
  textStep(
    "GPT-4o",
    "GPT-4o is considered a legacy model but remains highly useful. It is fast, supports multimodal inputs, and handles general reasoning well. Compared to GPT-5.2, it doesn't have persistent memory, autonomous agents, or the ability to manage complex multi-step workflows.\n\nIt is suitable for:\n• Writing essays, articles, or marketing copy\n• Explaining complex topics clearly\n• Structured tasks like planning or decision trees\n• Working with text, images, and files simultaneously"
  ),
  textStep(
    "Meet GPT-5.2",
    "GPT-5.2 is OpenAI's most advanced model to date. It was designed to go beyond simple answers — executing complex tasks, remembering your context, and seamlessly working with external tools.\n\nOne of its key additions is its distinct usage modes:\n• Auto Mode — automatically balances speed and depth for your task.\n• Instant Mode — delivers fast and lightweight responses.\n• Thinking Mode — prioritizes deeper reasoning and structured solutions.\n• Pro Mode — combines advanced reasoning with full access to tools, agents, and memory."
  ),
  textStep(
    "Exclusive GPT-5.2 Features",
    "• Agent Mode: ChatGPT can smoothly manage multi-step tasks natively in the background.\n• Persistent Memory: Remembers your context across sessions. Perfect for long-term projects and minimizing repetitive instructions.\n• Integrated Tools: Web Search for real-time intel, Deep Research for multi-source syntheses, and Voice for seamless interactions."
  ),
  textStep(
    "When to Use Each Mode",
    "• Instant Mode — Use when speed is a priority, like quick brainstorms or simple queries.\n• Thinking Mode — Choose this when you need structured reasoning, to solve problems, or create detailed reports.\n• Pro Mode — Ideal for users aiming for maximum GPT-5.2 potential. It represents the best choice for major research, deep tutoring, and multi-step workflows."
  ),
  quizStep(
    "Instant Mode",
    "Is Instant Mode better suited for speed or deep reasoning?",
    [
      "Depth",
      "Speed",
      "Persistent Memory",
      "Database connection"
    ],
    1,
    "Instant Mode delivers fast and lightweight answers when response time matters more than exhaustive detailing."
  ),
  quizStep(
    "GPT-4o Limitations",
    "Does the GPT-4o model support automated multi-step workflows naturally?",
    [
      "Yes, it is the best model for this",
      "No, it's not suitable for autonomously managing multi-step workflows",
      "Only in the free version",
      "It depends on the language utilized"
    ],
    1,
    "Compared to GPT-5.2, GPT-4o lacks autonomous background agents or the ability to execute complex ongoing workflows."
  ),
  quizStep(
    "Programming Tasks",
    "Which model unquestioningly excels at coding and programming tasks?",
    [
      "Only GPT-3.5",
      "GPT-5.2, due to its deep reasoning and complex task execution",
      "ChatGPT shouldn't be used for programming",
      "Neither, they share the exact same technical level."
    ],
    1,
    "GPT-5.2 acts as the advanced option, absolutely perfect for logical problem-solving and coding."
  ),
  quizStep(
    "Using Pro Mode",
    "Which of these tasks is NOT optimal to run on Pro Mode?",
    [
      "Managing multi-step workflows",
      "Highly complex research projects",
      "Detailed tutoring sessions",
      "A quick 'Yes/No' everyday question"
    ],
    3,
    "Quick 'Yes or No' loops don't require advanced agents; Instant Mode hits the mark much more efficiently."
  ),
  quizStep(
    "GPT-4o Sweet Spots",
    "Which situation below is best addressed by using GPT-4o?",
    [
      "Long-term continuity relying on persistent memory",
      "Fast Q&A, basic layout drafts, and everyday quick interactions",
      "Multi-step workloads with autonomous agents",
      "Prolonged evaluations utilizing Deep Research"
    ],
    1,
    "GPT-4o remains an incredibly fast, capable, and responsive workhorse for single-session routines."
  ),
  textStep(
    "Conclusion",
    "Great job! Now that you grasp the stark contrast between GPT-4o and GPT-5.2, and how to maneuver their internal modes, you are officially ready to pick the correct path for each task. As models evolve, keep experimenting.\n\nLesson complete ✓"
  )
] as const;

export const CHATGPT_MODULE_2_STEPS_ES = [
  textStep(
    "Entendiendo los Modelos de ChatGPT",
    "¡Hola de nuevo! En esta lección, explorarás los diferentes modelos de ChatGPT disponibles hoy y cómo elegir el mejor según tu requerimiento. Aprenderás sobre la línea actualizada de OpenAI.\n\n¡Comencemos!"
  ),
  textStep(
    "Introducción a Modelos",
    "ChatGPT opera con modelos desarrollados por OpenAI, que varían en velocidad, capacidad y funciones adicionales. Entender qué modelo seleccionas te ayuda a definir las expectativas correctas y a optar por la mejor funcionalidad:\n\n• GPT-5.2 — la versión más asombrosa y reciente, diseñada para flujos de trabajo en múltiples pasos, memoria viva e integración suprema con herramientas.\n• GPT-4o (legado) — una versión robusta y veloz que equilibra una entrada multimodal sensacional con buen razonamiento."
  ),
  textStep(
    "GPT-4o",
    "Aunque se considera un software en etapa de legado, GPT-4o mantiene un inmenso valor. Es acelerado, asimila textos, audios e imágenes a la vez, y es idóneo para el intelecto de corte general. Si se le compara con GPT-5.2, no dispone de agentes de gestión autónomos ni memoria persistente a lo largo del tiempo.\n\nEs ideal para:\n• Escribir correos, redactar ideas o esquematizar campañas de marketing\n• Explicar cuestiones intrincadas fácilmente\n• Actividades estructuradas como esquemas simples\n• Trabajo simultáneo texto-imagen"
  ),
  textStep(
    "Conoce a GPT-5.2",
    "Es el cerebro más adelantado de OpenAI en la actualidad, y no solo contesta simples interrogantes. Ejecuta actividades de tremenda densidad en la red, integrando lo que conoce de ti constantemente.\n\nTus modalidades clave son:\n• Auto Mode — balancea la velocidad y el análisis de la tarea sin que tú intervengas.\n• Instant Mode — prioriza la entrega de resoluciones instantáneas y directas.\n• Thinking Mode — se concentra y enfrasca en un razonamiento lógico estructurado muy profundo.\n• Pro Mode — te abastece de agentes y memoria con alcance completo de la Red Global para proyectos gigantes."
  ),
  textStep(
    "Recursos Exclusivos de GPT-5.2",
    "• Modo Agente: Logra gestionar una pesquisa amplia, catalogarla y devolverte un reporte finiquitado desde cero sin pedírselo paso a paso.\n• Memoria Persistente: Es capaz de sostener la continuidad en diferentes días del mes. Excepcional para mentorías prolongadas.\n• Herramientas Integradas: Búsqueda Online verídica en tiempo real y Deep Research para buceos en distintas fuentes cruzadas paralelamente."
  ),
  textStep(
    "Cuándo Seleccionar Cada Modo",
    "• Instant Mode — Priorízalo ante una tormenta de ideas o requerimientos agudos de segundos.\n• Thinking Mode — Actívalo frente a tablas de datos desquiciantes o resolución de hipótesis.\n• Pro Mode — Si tienes la versión premium actívalo al desarrollar un proyecto magno de múltiples ramas y pasos iterativos."
  ),
  quizStep(
    "Instant Mode",
    "El Instant Mode, ¿se destaca estrictamente en la precisión reflexiva o en la agilidad de entrega?",
    [
      "Precisión reflexiva (Profundidad)",
      "Agilidad de entrega (Velocidad)",
      "Ninguna de las dos",
      "Exige base de datos externa"
    ],
    1,
    "Como su nombre indica, Instant Mode brinda un alivio dinámico y raudo."
  ),
  quizStep(
    "Limitaciones de GPT-4o",
    "¿Podemos exigirle al GPT-4o que corra secuencias de análisis o flujos autogestionables profundos a su aire?",
    [
      "Sí, ha sido calibrado especialmente para eso.",
      "Para nada, ese no es su ecosistema diseñado debido a que carece de estos agentes libres.",
      "Sólo ocurre si habilitas un código extraña.",
      "Depende puramente de la base documental."
    ],
    1,
    "El modelo 4o asimila peticiones unitarias impecables, más no puede ir de la mano trabajando subyacentemente tus pasos automáticos a futuro."
  ),
  quizStep(
    "Estructuración Lógica",
    "Ante las matemáticas fuertes, desarrollo de código y raciocinio programático, ¿qué motor fulgura un éxito evidente?",
    [
      "El modelo clásico 3.5",
      "GPT-5.2; es un genio capaz de realizar deducción a escala superior",
      "Ambos fracasan fatalmente",
      "No existe modelo diferencial"
    ],
    1,
    "Tener Thinking y Pro Modes devela al GPT-5.2 como la cumbre arquitectónica algorítmica y deductiva actual de OpenAI."
  ),
  quizStep(
    "El Dominio del Pro Mode",
    "¿Bajo cuál de estos escenarios invocar al costoso Pro Mode es totalmente intrascendente y un desperdicio neto?",
    [
      "Organización en segundo plano de hojas complejas.",
      "Tutelas universitarias recurrentes.",
      "Desarrollar una aplicación de principio a fin.",
      "Efectuar una consulta trivial de \"Si o No\" sobre el clíma"
    ],
    3,
    "No emplees cohetes espaciales para cruzar una calle; Instant Mode se hace cargo de interrogantes básicas sobradamente."
  ),
  quizStep(
    "Mejores Casos Prácticos",
    "Ubica al GPT-4o en su trono particular en la siguiente lista comparativa:",
    [
      "Continuidad proyectual extendida mes a mes con memoria",
      "Gestión de rutinas diarias instantáneas, redacciones veloces y chat intermitente",
      "Agentes operacionales desatendidos a largo plazo",
      "Reportes de Deep Research con múltiples fuentes anexadas"
    ],
    1,
    "Esta versión domina por su fluidez imbatible cuando requieres tareas sencillas finalizadas estupendamente en un único intercambio charlado directo."
  ),
  textStep(
    "Conclusión",
    "¡Perfecto! Al separar adecuadamente las atribuciones de GPT-4o frente al titán GPT-5.2 lograste el escalafón necesario para no errar el comando vital.\n\nLección completada ✓"
  )
] as const;

export const CHATGPT_MODULE_2_STEPS_FR = [
  textStep(
    "Comprendre les Modèles ChatGPT",
    "Bonjour à nouveau ! Dans cette leçon, vous allez explorer les différents modèles de ChatGPT disponibles aujourd'hui et comment choisir le meilleur selon votre tâche. Vous découvrirez la gamme actuelle.\n\nC'est parti !"
  ),
  textStep(
    "Introduction aux Modèles",
    "ChatGPT foncitionne avec des modèles développés par OpenAI. Ils varient en vitesse, en capacité et en fonctionnalités intégrées:\n\n• GPT-5.2 — l'option la plus récente et la plus avancée, conçue pour les flux de travail en plusieurs étapes, la mémoire persistante et l'intégration complète de tous les outils.\n• GPT-4o (legacy) — un modèle de confiance qui équilibre merveilleusement bien la vitesse, le raisonnement et l'entrée multimodale simple."
  ),
  textStep(
    "Le modèle GPT-4o",
    "Le GPT-4o est considéré comme un modèle historique (legacy), mais reste incontestablement utile. Très véloce, il gère magnifiquement les directives standards. Comparé au GPT-5.2, il n'a pas de mémoire persistante, pas de mode agent ni de support poussé pour des workflows séquentiels.\n\nIdéal pour :\n• Rédiger des essais ou posts marketing rapides\n• Éclaircir un concept complexe poliment\n• Exécuter des tâches simples de planification\n• Traitement texte et une image ponctuellement"
  ),
  textStep(
    "Anatomie de GPT-5.2",
    "GPT-5.2 se propulse comme l'ultime version de ses créateurs. Capable de se souvenir, d'agir de son plein gré et d'appeler de multiples utilitaires hors système.\n\nLes modes mis à part de cette version clé :\n• Auto Mode — bascule automatiquement vers la vitesse ou la profondeur.\n• Instant Mode — la rapidité pure prime, réponse courte.\n• Thinking Mode — pour aborder un exercice logique ou épineux.\n• Pro Mode — invoque toute l'armada de recherche, d'agents et le stockage mnémotechnique entier de vos affinités."
  ),
  textStep(
    "Atouts Supérieurs du GPT-5.2",
    "• Mode Agent : Gère seul un travail fractionné (recherche, squelettisation et rédaction finale).\n• Mémoire Résidente : S'imprègne de vos méthodes au fil de semaines. Capital lors de longue modélisation de cas ou l'apprentissage de votre voix professionnelle.\n• Outils Internes Liés : Web Search (exploration du web direct), Deep Research (synthèse transversale sans faille) et module Vocal absolu."
  ),
  textStep(
    "Quel Mode et Quand ?",
    "• Instant Mode — Si l'allure compte davantage qu'un raffinement (questions de passage brèves).\n• Thinking Mode — Adoptez-le lors d'examens d'un code source ou l'exploitation d'une donnée abrupte brute.\n• Pro Mode — Assigne au prompteur averti l'entièreté de l'écosystème pour matérialiser du contenu professionnel end-to-end complet de A à Z."
  ),
  quizStep(
    "Mode Instantané",
    "L'Instant Mode est-il plus réputé pour sa vitesse de réaction ou pour son décaissement laborieux d'une donnée exhaustive ?",
    [
      "Donnée exhaustive (Profondeur)",
      "Vitesse de réaction (Rapidité)",
      "Les deux conjointement systématiquement",
      "Il analyse un serveur local prioritairement"
    ],
    1,
    "L'Instant Mode fournit d'abord une réponse instantanée délestée de lourd processus séquentiel superflu."
  ),
  quizStep(
    "Limites Conceptuelles du 4o",
    "Le système antérieur GPT-4o supporte-t-il les flux d'actions en plusieurs branches travaillant par elles-mêmes sans interaction ?",
    [
      "Absolument, l'outil sert fondamentalement par essence à cette fin",
      "Non, le 4o manque viscéralement des modules cognitifs semi-autonomes d'agents",
      "En version gratuite uniquement",
      "Cela concerne une application annexe tierce"
    ],
    1,
    "Dépourvu d'agent, le GPT-4o répond ponctuellement à une consigne sans anticiper un flux programmé en série."
  ),
  quizStep(
    "Développement Dédié",
    "Vers quelle sphère IA devriez-vous pencher si des calculs, de la programmation orientée objet ou un exercice dense s'amènent à vous ?",
    [
      "Le grand GPT-3.5 originel d'antan",
      "Incorruptible GPT-5.2 qui articule et dérive l'information via un Thinking de niveau exceptionnel",
      "Ne pas du tout impliquer ChatGPT là où ça concerne du pur algorithme délicat",
      "Il n'existe aucune distinction en codage entre les modèles d'OpenAI connus"
    ],
    1,
    "En sélectionnant GPT-5.2, vous engagez une force analytique faite sur-mesure pour pulvériser les pannes et édifier de l'architecture code complexe."
  ),
  quizStep(
    "Filtre du Pro Mode",
    "Identifiez la tâche inappropriée qui gaspilleraient notoirement tout le flux de puissance d'un Pro Mode lourd et étendu.",
    [
      "Scénarisation en dix phases de déploiement de logiciels",
      "Recherches bibliographiques encyclopédiques liées",
      "Mentorat d'éducation prolongée nécessitant mémorisation sur des mois",
      "Formuler une question creuse de oui/non sur une information basique au quotidien"
    ],
    3,
    "Si l'objectif ne va pas plus loin qu'un renseignement flash sans mémoire à stocker, Pro Mode représente une consommation superflue."
  ),
  quizStep(
    "Légitimité de 4o",
    "Dans quelle circonstance le bon format de GPT-4o continue sans effort de distancer les lourdes attentes de son ainé de par sa simplicité brute ?",
    [
      "Construction de long projet en agent programmé",
      "Interventions de la routine ponctuelle ou rédaction de simples emails expéditifs rapides",
      "Mémorisation vitale des attributs charismatiques d'un profil écrivain de six mois",
      "Compilation de liens universitaires vastes en utilisant l'assistant d'exploration Web multi-sources"
    ],
    1,
    "Rapide et perspicace en 'one-shot', l'ancien modèle offre l'ergonomie agile nécessaire où l'intervention ne vise ni la profondeur séquentielle absolue ni la mémorisation tenace."
  ),
  textStep(
    "Conclusion",
    "Excellent ! Grâce à ce balisage net entre les options de promptage interne, vos demandes seront routées naturellement vers la voie de moindre résistance et de plus grande pertinence.\n\nLeçon aboutie ✓"
  )
] as const;
