import type { BigActionProgressSource, BigActionRow } from "@/lib/bigAction";

const BIG_ACTION_UI_LANGS = ["pt", "en", "es", "fr"] as const;

type BigActionUiLang = (typeof BIG_ACTION_UI_LANGS)[number];

type LocalizedStatusCopy = {
  badge: string;
  button: string;
  description: string;
  title: string;
};

type AreaValue =
  | "Vendas"
  | "Saude"
  | "Educacao"
  | "Juridico"
  | "Marketing"
  | "Financas"
  | "Recursos Humanos"
  | "Operacoes"
  | "Atendimento"
  | "Outro";

interface BigActionUiCopy {
  active: {
    areaHint: string;
    areaPlaceholder: string;
    areaQuestion: string;
    backToDashboard: string;
    completeButton: string;
    completeErrorDescription: string;
    completeErrorTitle: string;
    completedDescription: string;
    completedTitle: string;
    copyPromptButton: string;
    copyPromptErrorDescription: string;
    copyPromptErrorTitle: string;
    customAreaLabel: string;
    customAreaPlaceholder: string;
    dashboardButton: string;
    generatingCardDescription: string;
    generatingCardTitle: string;
    generatingDescription: string;
    generatingTitle: string;
    guidedStepsLabel: string;
    needsAreaDescription: string;
    needsAreaTitle: string;
    promptCopiedDescription: string;
    promptCopiedTitle: string;
    promptDescription: string;
    promptLabel: string;
    promptUnavailableDescription: string;
    promptUnavailableTitle: string;
    regenerateDescription: string;
    regenerateTitle: string;
    regenerationErrorCardDescription: string;
    regenerationErrorCardTitle: string;
    retryButton: string;
    retryDescription: string;
    retryTitle: string;
    saveAreaButton: string;
    saveAreaDescription: string;
    saveAreaErrorDescription: string;
    saveAreaErrorTitle: string;
    saveAreaTitle: string;
    titleFallback: string;
    whatToCreateFallback: string;
    whatToCreateLabel: string;
  };
  areaLabels: Record<AreaValue, string>;
  featureName: string;
  loading: string;
  noActive: {
    badge: string;
    challengeLabel: string;
    continueTrailsButton: string;
    description: string;
    notUnlockedTitle: string;
    progressLabel: string;
    specializedLabel: string;
    totalCompletedChallengePrefix: string;
    totalCompletedSpecializedPrefix: string;
    unlockProgressLabel: string;
    whatHappensLabel: string;
    whatHappensStep1: string;
    whatHappensStep2: string;
    whatHappensStep3: string;
  };
  shared: {
    doUnlockProgress: string;
    unlockedBadge: string;
  };
  sourceCopy: Record<BigActionProgressSource, { longLabel: string; shortLabel: string }>;
  statusCopy: Record<Exclude<BigActionRow["status"], "completed">, LocalizedStatusCopy>;
  toasts: {
    autoGenerateErrorDescription: string;
    autoGenerateErrorTitle: string;
    challengeDayUnlockedDescription: string;
    challengeDayUnlockedTitle: string;
    specializedModuleUnlockedDescription: string;
    specializedModuleUnlockedTitle: string;
  };
  units: {
    challengeDayCompletedLabel: string;
    dayPlural: string;
    daySingular: string;
    modulePlural: string;
    moduleSingular: string;
    specializedCompletedLabel: string;
  };
}

const PT_UI: BigActionUiCopy = {
  active: {
    areaHint: "Sua resposta sera salva no perfil e usada para personalizar as proximas Big Acoes, sem te perguntar tudo de novo.",
    areaPlaceholder: "Escolha uma categoria",
    areaQuestion: "Com o que voce trabalha hoje?",
    backToDashboard: "Voltar ao dashboard",
    completeButton: "Concluir Big Acao",
    completeErrorDescription: "Nao foi possivel concluir sua Big Acao agora.",
    completeErrorTitle: "Erro ao concluir",
    completedDescription: "Seu ciclo foi fechado e o contador das proximas trilhas voltou a correr.",
    completedTitle: "Big Acao concluida",
    copyPromptButton: "Copiar prompt",
    copyPromptErrorDescription: "Tente selecionar o texto manualmente.",
    copyPromptErrorTitle: "Nao foi possivel copiar",
    customAreaLabel: "Descreva sua area em poucas palavras",
    customAreaPlaceholder: "Ex: Consultoria comercial, Clinica medica, Gestao escolar",
    dashboardButton: "Voltar ao dashboard",
    generatingCardDescription: "A IA esta definindo o melhor micro resultado para sua area e preparando um prompt pronto para voce usar.",
    generatingCardTitle: "Montando seus proximos passos...",
    generatingDescription: "A IA esta montando uma tarefa pratica, passo a passo, alinhada com sua area.",
    generatingTitle: "Estamos criando sua atividade personalizada",
    guidedStepsLabel: "Passo a passo guiado",
    needsAreaDescription: "Vamos usar sua area profissional para gerar uma tarefa guiada que faca sentido no seu dia a dia.",
    needsAreaTitle: "Antes de liberar sua atividade, me diga com o que voce trabalha",
    promptCopiedDescription: "Agora e so colar no GPT, Claude ou na IA que preferir.",
    promptCopiedTitle: "Prompt copiado",
    promptDescription: "Copie e cole no GPT, Claude ou na IA que preferir para executar a atividade.",
    promptLabel: "Prompt pronto",
    promptUnavailableDescription: "Ainda nao existe um prompt pronto para copiar nesta Big Acao.",
    promptUnavailableTitle: "Prompt indisponivel",
    regenerateDescription: "Sua atividade personalizada foi atualizada.",
    regenerateTitle: "Big Acao regenerada",
    regenerationErrorCardDescription: "Tente novamente para gerar uma nova versao da sua Big Acao.",
    regenerationErrorCardTitle: "Nao conseguimos finalizar a geracao.",
    retryButton: "Gerar novamente",
    retryDescription: "Ocorreu um erro na geracao. Voce pode tentar novamente agora mesmo.",
    retryTitle: "Sua Big Acao precisa de uma nova tentativa",
    saveAreaButton: "Salvar area e liberar atividade",
    saveAreaDescription: "Agora vamos montar sua Big Acao personalizada.",
    saveAreaErrorDescription: "Nao foi possivel salvar sua area agora.",
    saveAreaErrorTitle: "Erro ao salvar area",
    saveAreaTitle: "Area salva",
    titleFallback: "Sua Big Acao personalizada esta pronta",
    whatToCreateFallback: "Algo pratico e aplicavel ao seu trabalho",
    whatToCreateLabel: "O que voce vai criar hoje",
  },
  areaLabels: {
    Atendimento: "Atendimento",
    Educacao: "Educacao",
    Financas: "Financas",
    Juridico: "Juridico",
    Marketing: "Marketing",
    Operacoes: "Operacoes",
    Outro: "Outro",
    "Recursos Humanos": "Recursos Humanos",
    Saude: "Saude",
    Vendas: "Vendas",
  },
  featureName: "Big Acao",
  loading: "Carregando sua Big Acao...",
  noActive: {
    badge: "Big Acao",
    challengeLabel: "Desafio de 28 dias",
    continueTrailsButton: "Continuar nas trilhas",
    description: "Voce libera uma Big Acao a cada 4 dias concluidos do desafio de 28 dias ou a cada 4 modulos concluidos das trilhas especializadas.",
    notUnlockedTitle: "Sua proxima Big Acao ainda nao foi desbloqueada",
    progressLabel: "Progresso do ciclo",
    specializedLabel: "Trilhas especializadas",
    totalCompletedChallengePrefix: "Total concluido no desafio:",
    totalCompletedSpecializedPrefix: "Total concluido nas especializadas:",
    unlockProgressLabel: "do desbloqueio",
    whatHappensLabel: "O que acontece quando liberar",
    whatHappensStep1: "1. Voce informa sua area profissional so na primeira vez.",
    whatHappensStep2: "2. O sistema gera uma tarefa pratica feita para a sua realidade.",
    whatHappensStep3: "3. Voce sai com um material concreto criado com IA.",
  },
  shared: {
    doUnlockProgress: "do desbloqueio",
    unlockedBadge: "Big Acao desbloqueada",
  },
  sourceCopy: {
    challenge_day: {
      longLabel: "Liberada por 4 dias do desafio de 28 dias",
      shortLabel: "4 dias do desafio",
    },
    specialized_module: {
      longLabel: "Liberada por 4 modulos das trilhas especializadas",
      shortLabel: "4 modulos especializados",
    },
  },
  statusCopy: {
    generation_error: {
      badge: "Precisa de ajuste",
      button: "Tentar de novo",
      description: "A atividade travou na geracao. Toque para abrir e gerar novamente.",
      title: "Sua Big Acao precisa ser regenerada",
    },
    needs_area: {
      badge: "Quase pronta",
      button: "Informar area",
      description: "Antes de liberar sua atividade, precisamos entender com o que voce trabalha hoje.",
      title: "Sua Big Acao ja foi desbloqueada",
    },
    pending_generation: {
      badge: "Gerando agora",
      button: "Abrir Big Acao",
      description: "Estamos montando uma atividade pratica, personalizada e pronta para voce aplicar no trabalho.",
      title: "Sua Big Acao esta sendo criada",
    },
    ready: {
      badge: "Liberada",
      button: "Abrir Big Acao",
      description: "Voce destravou uma atividade guiada para sair com algo concreto feito com IA.",
      title: "Voce desbloqueou sua Big Acao de hoje",
    },
  },
  toasts: {
    autoGenerateErrorDescription: "Nao foi possivel gerar sua Big Acao agora.",
    autoGenerateErrorTitle: "Erro ao gerar Big Acao",
    challengeDayUnlockedDescription: "Voce completou 4 dias do desafio e liberou uma atividade pratica personalizada.",
    challengeDayUnlockedTitle: "Big Acao desbloqueada",
    specializedModuleUnlockedDescription: "Voce completou 4 modulos especializados e liberou uma atividade pratica personalizada.",
    specializedModuleUnlockedTitle: "Big Acao desbloqueada",
  },
  units: {
    challengeDayCompletedLabel: "dias concluidos",
    dayPlural: "dias",
    daySingular: "dia",
    modulePlural: "modulos",
    moduleSingular: "modulo",
    specializedCompletedLabel: "modulos concluidos",
  },
};

const EN_UI: BigActionUiCopy = {
  active: {
    areaHint: "Your answer will be saved to your profile and reused to personalize future Big Actions without asking again.",
    areaPlaceholder: "Choose a category",
    areaQuestion: "What do you work with today?",
    backToDashboard: "Back to dashboard",
    completeButton: "Complete Big Action",
    completeErrorDescription: "We could not complete your Big Action right now.",
    completeErrorTitle: "Error completing",
    completedDescription: "Your cycle is now closed and the next progress counter has started running again.",
    completedTitle: "Big Action completed",
    copyPromptButton: "Copy prompt",
    copyPromptErrorDescription: "Try selecting the text manually.",
    copyPromptErrorTitle: "Could not copy",
    customAreaLabel: "Describe your area in a few words",
    customAreaPlaceholder: "Ex: Sales consulting, Medical clinic, School management",
    dashboardButton: "Back to dashboard",
    generatingCardDescription: "The AI is defining the best micro-result for your area and preparing a ready-to-use prompt.",
    generatingCardTitle: "Building your next steps...",
    generatingDescription: "The AI is building a practical activity, step by step, aligned with your area.",
    generatingTitle: "We are creating your personalized activity",
    guidedStepsLabel: "Guided step by step",
    needsAreaDescription: "We will use your professional area to generate a guided task that fits your real routine.",
    needsAreaTitle: "Before we unlock your activity, tell us what you do today",
    promptCopiedDescription: "Now just paste it into GPT, Claude, or your preferred AI.",
    promptCopiedTitle: "Prompt copied",
    promptDescription: "Copy and paste it into GPT, Claude, or whichever AI you prefer to run the activity.",
    promptLabel: "Ready prompt",
    promptUnavailableDescription: "There is no ready prompt to copy for this Big Action yet.",
    promptUnavailableTitle: "Prompt unavailable",
    regenerateDescription: "Your personalized activity has been refreshed.",
    regenerateTitle: "Big Action regenerated",
    regenerationErrorCardDescription: "Try again to generate a fresh version of your Big Action.",
    regenerationErrorCardTitle: "We could not finish the generation.",
    retryButton: "Generate again",
    retryDescription: "Something went wrong during generation. You can try again right now.",
    retryTitle: "Your Big Action needs another attempt",
    saveAreaButton: "Save area and unlock activity",
    saveAreaDescription: "Now we can build your personalized Big Action.",
    saveAreaErrorDescription: "We could not save your area right now.",
    saveAreaErrorTitle: "Error saving area",
    saveAreaTitle: "Area saved",
    titleFallback: "Your personalized Big Action is ready",
    whatToCreateFallback: "Something practical and useful for your work",
    whatToCreateLabel: "What you are going to create today",
  },
  areaLabels: {
    Atendimento: "Customer Support",
    Educacao: "Education",
    Financas: "Finance",
    Juridico: "Legal",
    Marketing: "Marketing",
    Operacoes: "Operations",
    Outro: "Other",
    "Recursos Humanos": "Human Resources",
    Saude: "Healthcare",
    Vendas: "Sales",
  },
  featureName: "Big Action",
  loading: "Loading your Big Action...",
  noActive: {
    badge: "Big Action",
    challengeLabel: "28-day challenge",
    continueTrailsButton: "Keep going in the trails",
    description: "You unlock a Big Action every 4 completed days in the 28-day challenge or every 4 completed modules in the specialized trails.",
    notUnlockedTitle: "Your next Big Action is not unlocked yet",
    progressLabel: "Cycle progress",
    specializedLabel: "Specialized trails",
    totalCompletedChallengePrefix: "Total completed in the challenge:",
    totalCompletedSpecializedPrefix: "Total completed in specialized trails:",
    unlockProgressLabel: "toward unlock",
    whatHappensLabel: "What happens when it unlocks",
    whatHappensStep1: "1. You share your professional area only the first time.",
    whatHappensStep2: "2. The system generates a practical task tailored to your reality.",
    whatHappensStep3: "3. You leave with a concrete asset created with AI.",
  },
  shared: {
    doUnlockProgress: "toward unlock",
    unlockedBadge: "Big Action unlocked",
  },
  sourceCopy: {
    challenge_day: {
      longLabel: "Unlocked by 4 completed days in the 28-day challenge",
      shortLabel: "4 challenge days",
    },
    specialized_module: {
      longLabel: "Unlocked by 4 completed modules in specialized trails",
      shortLabel: "4 specialized modules",
    },
  },
  statusCopy: {
    generation_error: {
      badge: "Needs attention",
      button: "Try again",
      description: "The activity got stuck during generation. Open it and generate again.",
      title: "Your Big Action needs to be regenerated",
    },
    needs_area: {
      badge: "Almost ready",
      button: "Add area",
      description: "Before we unlock your activity, we need to understand what you work with today.",
      title: "Your Big Action has already been unlocked",
    },
    pending_generation: {
      badge: "Generating now",
      button: "Open Big Action",
      description: "We are building a practical, personalized activity ready for you to apply at work.",
      title: "Your Big Action is being created",
    },
    ready: {
      badge: "Unlocked",
      button: "Open Big Action",
      description: "You unlocked a guided activity that helps you leave with something concrete built with AI.",
      title: "You unlocked your Big Action today",
    },
  },
  toasts: {
    autoGenerateErrorDescription: "We could not generate your Big Action right now.",
    autoGenerateErrorTitle: "Error generating Big Action",
    challengeDayUnlockedDescription: "You completed 4 challenge days and unlocked a personalized practical activity.",
    challengeDayUnlockedTitle: "Big Action unlocked",
    specializedModuleUnlockedDescription: "You completed 4 specialized modules and unlocked a personalized practical activity.",
    specializedModuleUnlockedTitle: "Big Action unlocked",
  },
  units: {
    challengeDayCompletedLabel: "completed days",
    dayPlural: "days",
    daySingular: "day",
    modulePlural: "modules",
    moduleSingular: "module",
    specializedCompletedLabel: "completed modules",
  },
};

const ES_UI: BigActionUiCopy = {
  active: {
    areaHint: "Tu respuesta se guardara en tu perfil y se usara para personalizar las proximas Big Actions sin volver a preguntarlo.",
    areaPlaceholder: "Elige una categoria",
    areaQuestion: "A que te dedicas hoy?",
    backToDashboard: "Volver al dashboard",
    completeButton: "Completar Big Action",
    completeErrorDescription: "No pudimos completar tu Big Action ahora mismo.",
    completeErrorTitle: "Error al completar",
    completedDescription: "Tu ciclo se cerro y el siguiente contador de progreso ya volvio a correr.",
    completedTitle: "Big Action completada",
    copyPromptButton: "Copiar prompt",
    copyPromptErrorDescription: "Intenta seleccionar el texto manualmente.",
    copyPromptErrorTitle: "No se pudo copiar",
    customAreaLabel: "Describe tu area en pocas palabras",
    customAreaPlaceholder: "Ej: Consultoria comercial, Clinica medica, Gestion escolar",
    dashboardButton: "Volver al dashboard",
    generatingCardDescription: "La IA esta definiendo el mejor microresultado para tu area y preparando un prompt listo para usar.",
    generatingCardTitle: "Armando tus siguientes pasos...",
    generatingDescription: "La IA esta armando una tarea practica, paso a paso, alineada con tu area.",
    generatingTitle: "Estamos creando tu actividad personalizada",
    guidedStepsLabel: "Paso a paso guiado",
    needsAreaDescription: "Usaremos tu area profesional para generar una tarea guiada que tenga sentido en tu rutina real.",
    needsAreaTitle: "Antes de liberar tu actividad, dinos a que te dedicas hoy",
    promptCopiedDescription: "Ahora solo tienes que pegarlo en GPT, Claude o en la IA que prefieras.",
    promptCopiedTitle: "Prompt copiado",
    promptDescription: "Copialo y pegalo en GPT, Claude o en la IA que prefieras para ejecutar la actividad.",
    promptLabel: "Prompt listo",
    promptUnavailableDescription: "Todavia no hay un prompt listo para copiar en esta Big Action.",
    promptUnavailableTitle: "Prompt no disponible",
    regenerateDescription: "Tu actividad personalizada fue actualizada.",
    regenerateTitle: "Big Action regenerada",
    regenerationErrorCardDescription: "Intentalo otra vez para generar una nueva version de tu Big Action.",
    regenerationErrorCardTitle: "No pudimos terminar la generacion.",
    retryButton: "Generar otra vez",
    retryDescription: "Hubo un error durante la generacion. Puedes intentarlo de nuevo ahora mismo.",
    retryTitle: "Tu Big Action necesita otro intento",
    saveAreaButton: "Guardar area y liberar actividad",
    saveAreaDescription: "Ahora podemos preparar tu Big Action personalizada.",
    saveAreaErrorDescription: "No pudimos guardar tu area ahora mismo.",
    saveAreaErrorTitle: "Error al guardar el area",
    saveAreaTitle: "Area guardada",
    titleFallback: "Tu Big Action personalizada esta lista",
    whatToCreateFallback: "Algo practico y util para tu trabajo",
    whatToCreateLabel: "Lo que vas a crear hoy",
  },
  areaLabels: {
    Atendimento: "Atencion al cliente",
    Educacao: "Educacion",
    Financas: "Finanzas",
    Juridico: "Legal",
    Marketing: "Marketing",
    Operacoes: "Operaciones",
    Outro: "Otro",
    "Recursos Humanos": "Recursos Humanos",
    Saude: "Salud",
    Vendas: "Ventas",
  },
  featureName: "Big Action",
  loading: "Cargando tu Big Action...",
  noActive: {
    badge: "Big Action",
    challengeLabel: "Desafio de 28 dias",
    continueTrailsButton: "Seguir en las rutas",
    description: "Desbloqueas una Big Action cada 4 dias completados del desafio de 28 dias o cada 4 modulos completados de las rutas especializadas.",
    notUnlockedTitle: "Tu proxima Big Action todavia no esta desbloqueada",
    progressLabel: "Progreso del ciclo",
    specializedLabel: "Rutas especializadas",
    totalCompletedChallengePrefix: "Total completado en el desafio:",
    totalCompletedSpecializedPrefix: "Total completado en las rutas especializadas:",
    unlockProgressLabel: "para desbloquear",
    whatHappensLabel: "Que pasa cuando se desbloquea",
    whatHappensStep1: "1. Nos dices tu area profesional solo la primera vez.",
    whatHappensStep2: "2. El sistema genera una tarea practica adaptada a tu realidad.",
    whatHappensStep3: "3. Sales con algo concreto creado con IA.",
  },
  shared: {
    doUnlockProgress: "para desbloquear",
    unlockedBadge: "Big Action desbloqueada",
  },
  sourceCopy: {
    challenge_day: {
      longLabel: "Desbloqueada por 4 dias completados del desafio de 28 dias",
      shortLabel: "4 dias del desafio",
    },
    specialized_module: {
      longLabel: "Desbloqueada por 4 modulos completados de las rutas especializadas",
      shortLabel: "4 modulos especializados",
    },
  },
  statusCopy: {
    generation_error: {
      badge: "Necesita ajuste",
      button: "Intentar otra vez",
      description: "La actividad se trabo durante la generacion. Abrela y generala otra vez.",
      title: "Tu Big Action necesita regenerarse",
    },
    needs_area: {
      badge: "Casi lista",
      button: "Informar area",
      description: "Antes de liberar tu actividad, necesitamos entender a que te dedicas hoy.",
      title: "Tu Big Action ya fue desbloqueada",
    },
    pending_generation: {
      badge: "Generando ahora",
      button: "Abrir Big Action",
      description: "Estamos creando una actividad practica y personalizada lista para aplicar en tu trabajo.",
      title: "Tu Big Action se esta creando",
    },
    ready: {
      badge: "Liberada",
      button: "Abrir Big Action",
      description: "Desbloqueaste una actividad guiada para salir con algo concreto hecho con IA.",
      title: "Desbloqueaste tu Big Action de hoy",
    },
  },
  toasts: {
    autoGenerateErrorDescription: "No pudimos generar tu Big Action ahora mismo.",
    autoGenerateErrorTitle: "Error al generar Big Action",
    challengeDayUnlockedDescription: "Completaste 4 dias del desafio y desbloqueaste una actividad practica personalizada.",
    challengeDayUnlockedTitle: "Big Action desbloqueada",
    specializedModuleUnlockedDescription: "Completaste 4 modulos especializados y desbloqueaste una actividad practica personalizada.",
    specializedModuleUnlockedTitle: "Big Action desbloqueada",
  },
  units: {
    challengeDayCompletedLabel: "dias completados",
    dayPlural: "dias",
    daySingular: "dia",
    modulePlural: "modulos",
    moduleSingular: "modulo",
    specializedCompletedLabel: "modulos completados",
  },
};

const FR_UI: BigActionUiCopy = {
  active: {
    areaHint: "Ta reponse sera enregistree dans ton profil et reutilisee pour personnaliser les prochaines Big Actions sans redemander.",
    areaPlaceholder: "Choisis une categorie",
    areaQuestion: "Dans quel domaine travailles-tu aujourd'hui ?",
    backToDashboard: "Retour au dashboard",
    completeButton: "Terminer la Big Action",
    completeErrorDescription: "Nous n'avons pas pu terminer ta Big Action pour le moment.",
    completeErrorTitle: "Erreur lors de la validation",
    completedDescription: "Ton cycle est termine et le prochain compteur de progression a deja recommence.",
    completedTitle: "Big Action terminee",
    copyPromptButton: "Copier le prompt",
    copyPromptErrorDescription: "Essaie de selectionner le texte manuellement.",
    copyPromptErrorTitle: "Impossible de copier",
    customAreaLabel: "Decris ton domaine en quelques mots",
    customAreaPlaceholder: "Ex : Conseil commercial, Clinique medicale, Gestion scolaire",
    dashboardButton: "Retour au dashboard",
    generatingCardDescription: "L'IA definit le meilleur micro-resultat pour ton domaine et prepare un prompt pret a l'emploi.",
    generatingCardTitle: "Construction de tes prochaines etapes...",
    generatingDescription: "L'IA cree une activite pratique, etape par etape, alignee avec ton domaine.",
    generatingTitle: "Nous creons ton activite personnalisee",
    guidedStepsLabel: "Etapes guidees",
    needsAreaDescription: "Nous utiliserons ton domaine professionnel pour generer une tache guidee adaptee a ta vraie routine.",
    needsAreaTitle: "Avant de debloquer ton activite, dis-nous dans quel domaine tu travailles",
    promptCopiedDescription: "Il ne reste plus qu'a le coller dans GPT, Claude ou l'IA de ton choix.",
    promptCopiedTitle: "Prompt copie",
    promptDescription: "Copie-le et colle-le dans GPT, Claude ou l'IA de ton choix pour executer l'activite.",
    promptLabel: "Prompt pret",
    promptUnavailableDescription: "Aucun prompt pret a copier n'est encore disponible pour cette Big Action.",
    promptUnavailableTitle: "Prompt indisponible",
    regenerateDescription: "Ton activite personnalisee a ete mise a jour.",
    regenerateTitle: "Big Action regeneree",
    regenerationErrorCardDescription: "Essaie de nouveau pour generer une nouvelle version de ta Big Action.",
    regenerationErrorCardTitle: "Nous n'avons pas pu terminer la generation.",
    retryButton: "Generer a nouveau",
    retryDescription: "Une erreur est survenue pendant la generation. Tu peux reessayer tout de suite.",
    retryTitle: "Ta Big Action a besoin d'une nouvelle tentative",
    saveAreaButton: "Enregistrer le domaine et liberer l'activite",
    saveAreaDescription: "Nous pouvons maintenant preparer ta Big Action personnalisee.",
    saveAreaErrorDescription: "Nous n'avons pas pu enregistrer ton domaine pour le moment.",
    saveAreaErrorTitle: "Erreur lors de l'enregistrement",
    saveAreaTitle: "Domaine enregistre",
    titleFallback: "Ta Big Action personnalisee est prete",
    whatToCreateFallback: "Quelque chose de pratique et utile pour ton travail",
    whatToCreateLabel: "Ce que tu vas creer aujourd'hui",
  },
  areaLabels: {
    Atendimento: "Service client",
    Educacao: "Education",
    Financas: "Finance",
    Juridico: "Juridique",
    Marketing: "Marketing",
    Operacoes: "Operations",
    Outro: "Autre",
    "Recursos Humanos": "Ressources humaines",
    Saude: "Sante",
    Vendas: "Ventes",
  },
  featureName: "Big Action",
  loading: "Chargement de ta Big Action...",
  noActive: {
    badge: "Big Action",
    challengeLabel: "Defi 28 jours",
    continueTrailsButton: "Continuer les parcours",
    description: "Tu debloques une Big Action tous les 4 jours completes du defi de 28 jours ou tous les 4 modules completes des parcours specialises.",
    notUnlockedTitle: "Ta prochaine Big Action n'est pas encore debloquee",
    progressLabel: "Progression du cycle",
    specializedLabel: "Parcours specialises",
    totalCompletedChallengePrefix: "Total complete dans le defi :",
    totalCompletedSpecializedPrefix: "Total complete dans les parcours specialises :",
    unlockProgressLabel: "avant le debloquage",
    whatHappensLabel: "Ce qui se passe au debloquage",
    whatHappensStep1: "1. Tu indiques ton domaine professionnel une seule fois.",
    whatHappensStep2: "2. Le systeme genere une tache pratique adaptee a ta realite.",
    whatHappensStep3: "3. Tu repars avec un livrable concret cree avec l'IA.",
  },
  shared: {
    doUnlockProgress: "avant le debloquage",
    unlockedBadge: "Big Action debloquee",
  },
  sourceCopy: {
    challenge_day: {
      longLabel: "Debloquee apres 4 jours completes du defi de 28 jours",
      shortLabel: "4 jours du defi",
    },
    specialized_module: {
      longLabel: "Debloquee apres 4 modules completes des parcours specialises",
      shortLabel: "4 modules specialises",
    },
  },
  statusCopy: {
    generation_error: {
      badge: "A ajuster",
      button: "Reessayer",
      description: "L'activite s'est bloquee pendant la generation. Ouvre-la et relance la generation.",
      title: "Ta Big Action doit etre regeneree",
    },
    needs_area: {
      badge: "Presque prete",
      button: "Ajouter le domaine",
      description: "Avant de liberer ton activite, nous devons comprendre dans quel domaine tu travailles aujourd'hui.",
      title: "Ta Big Action est deja debloquee",
    },
    pending_generation: {
      badge: "Generation en cours",
      button: "Ouvrir la Big Action",
      description: "Nous preparons une activite pratique et personnalisee, prete a etre appliquee dans ton travail.",
      title: "Ta Big Action est en cours de creation",
    },
    ready: {
      badge: "Disponible",
      button: "Ouvrir la Big Action",
      description: "Tu as debloque une activite guidee pour repartir avec quelque chose de concret cree avec l'IA.",
      title: "Tu as debloque ta Big Action du jour",
    },
  },
  toasts: {
    autoGenerateErrorDescription: "Nous n'avons pas pu generer ta Big Action pour le moment.",
    autoGenerateErrorTitle: "Erreur lors de la generation de la Big Action",
    challengeDayUnlockedDescription: "Tu as complete 4 jours du defi et debloque une activite pratique personnalisee.",
    challengeDayUnlockedTitle: "Big Action debloquee",
    specializedModuleUnlockedDescription: "Tu as complete 4 modules specialises et debloque une activite pratique personnalisee.",
    specializedModuleUnlockedTitle: "Big Action debloquee",
  },
  units: {
    challengeDayCompletedLabel: "jours completes",
    dayPlural: "jours",
    daySingular: "jour",
    modulePlural: "modules",
    moduleSingular: "module",
    specializedCompletedLabel: "modules completes",
  },
};

const BIG_ACTION_UI_MAP: Record<BigActionUiLang, BigActionUiCopy> = {
  en: EN_UI,
  es: ES_UI,
  fr: FR_UI,
  pt: PT_UI,
};

const resolveBigActionLanguage = (language?: string) => {
  const baseLanguage = language?.split("-")[0]?.toLowerCase() as BigActionUiLang | undefined;
  return baseLanguage && BIG_ACTION_UI_LANGS.includes(baseLanguage) ? baseLanguage : "en";
};

const isCanonicalArea = (value: string): value is AreaValue =>
  value in PT_UI.areaLabels;

export const getBigActionUiCopy = (language?: string) => BIG_ACTION_UI_MAP[resolveBigActionLanguage(language)];

export const getLocalizedBigActionSourceCopy = (
  source: BigActionProgressSource | string | null | undefined,
  language?: string,
) => {
  const ui = getBigActionUiCopy(language);

  if (source === "challenge_day") {
    return ui.sourceCopy.challenge_day;
  }

  return ui.sourceCopy.specialized_module;
};

export const getLocalizedProfessionalArea = (value?: string | null, language?: string) => {
  const normalizedValue = value?.trim() || "";
  if (!normalizedValue) return "";

  if (!isCanonicalArea(normalizedValue)) {
    return normalizedValue;
  }

  return getBigActionUiCopy(language).areaLabels[normalizedValue];
};
