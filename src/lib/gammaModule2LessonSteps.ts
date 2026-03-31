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

export const GAMMA_MODULE_2_STEPS_PT = [
  textStep(
    "Criando sua Primeira Apresentação do Zero com o Gamma",
    "Bem-vindo de volta! Nesta lição, você vai criar sua primeira apresentação completa no Gamma — do prompt inicial ao resultado final. Vamos acompanhar cada decisão passo a passo, como se você estivesse com a plataforma aberta na sua frente."
  ),
  textStep(
    "Acessando o Gamma e Criando um Novo Projeto",
    "Acesse gamma.app, crie sua conta gratuita e clique em Criar novo. Você verá três opções de criação: Gerar com IA a partir de um prompt, Importar um arquivo ou URL existente, ou Começar do zero com um template em branco."
  ),
  quizStep(
    "Quiz: Preparação",
    "O que você deve fazer antes de digitar qualquer coisa no Gamma?",
    [
      "Escolher o template visual antes de pensar no conteúdo",
      "Configurar as cores e fontes antes de gerar a apresentação",
      "Ter claro o objetivo da apresentação, o público-alvo e os pontos principais — um prompt rico gera um resultado muito mais alinhado do que uma descrição genérica",
      "Criar uma conta paga antes de testar qualquer funcionalidade"
    ],
    2,
    "Ter claro o objetivo da apresentação, o público-alvo e os pontos principais — um prompt rico gera um resultado muito mais alinhado do que uma descrição genérica."
  ),
  textStep(
    "O Prompt de Geração — A Decisão Mais Importante",
    "A qualidade da apresentação gerada depende diretamente da clareza do seu prompt. Um bom prompt informa o tema, o objetivo, o público e o tom desejado — quanto mais contexto você fornece, mais preciso e útil será o resultado."
  ),
  fillStep(
    "Exercício: Escreva um prompt poderoso!",
    "Preencha a lacuna — Escreva um prompt poderoso!",
    "Crie uma apresentação sobre ___ para ___. O objetivo é ___. Use um tom ___ e inclua slides sobre ___, ___ e ___. Finalize com um slide de ___.",
    ["inteligência artificial no mercado de trabalho", "gestores e líderes de equipe", "mostrar oportunidades e riscos da IA", "analítico e acessível", "contexto atual", "impactos práticos", "como se preparar", "próximos passos"],
    ["inteligência artificial no mercado de trabalho", "gestores e líderes de equipe", "mostrar oportunidades e riscos da IA", "analítico e acessível", "contexto atual", "impactos práticos", "como se preparar", "próximos passos"],
    "Crie uma apresentação sobre inteligência artificial no mercado de trabalho para gestores e líderes de equipe. O objetivo é mostrar oportunidades e riscos da IA. Use um tom analítico e acessível e inclua slides sobre contexto atual, impactos práticos e como se preparar. Finalize com um slide de próximos passos."
  ),
  textStep(
    "Editando o Outline Antes de Gerar",
    "Depois que o Gamma gera o outline — o esboço estruturado da apresentação — você tem a oportunidade de revisar e ajustar antes de confirmar a geração completa. Este é o momento de mover seções, renomear tópicos e garantir que a estrutura reflete exatamente o que você quer comunicar."
  ),
  quizStep(
    "Quiz: Edição do Outline",
    "Por que editar o outline antes de gerar a apresentação completa economiza tempo?",
    [
      "Porque o Gamma cobra créditos extras por ajustes após a geração",
      "Para impressionar a audiência com uma estrutura diferente do padrão",
      "Porque ajustar a estrutura antes da geração é muito mais rápido do que reorganizar slides depois — e garante que o conteúdo gerado siga exatamente a lógica que você planejou",
      "O outline não pode ser editado após a geração inicial"
    ],
    2,
    "Porque ajustar a estrutura antes da geração é muito mais rápido do que reorganizar slides depois — e garante que o conteúdo gerado siga exatamente a lógica que você planejou."
  ),
  textStep(
    "Escolhendo o Tema Visual",
    "Após gerar o conteúdo, o Gamma permite escolher entre dezenas de temas visuais — paletas de cores, tipografias e estilos que mudam a aparência de toda a apresentação com um clique. Você também pode fazer upload do logo e das cores da sua marca para criar um tema personalizado."
  ),
  fillStep(
    "Exercício: Configure o tema visual!",
    "Preencha a lacuna — Configure o tema visual!",
    "Para personalizar o visual da apresentação no Gamma: clique em ___ no painel lateral, escolha entre os temas ___ disponíveis, ajuste as ___ principais e a ___ para refletir sua identidade visual, faça upload do seu ___ e clique em ___ para aplicar em todos os slides de uma vez.",
    ["Tema", "pré-definidos", "cores", "tipografia", "logotipo", "Aplicar tema"],
    ["Tema", "pré-definidos", "cores", "tipografia", "logotipo", "Aplicar tema"],
    "Para personalizar o visual da apresentação no Gamma: clique em Tema no painel lateral, escolha entre os temas pré-definidos disponíveis, ajuste as cores principais e a tipografia para refletir sua identidade visual, faça upload do seu logotipo e clique em Aplicar tema para aplicar em todos os slides de uma vez."
  ),
  textStep(
    "Conclusão",
    "Criar sua primeira apresentação no Gamma é uma experiência que muda perspectivas. Do prompt ao resultado visual leva menos de dois minutos — e o resultado já é um ponto de partida sólido que você refina com precisão. Quanto mais claro e específico for o seu prompt inicial, menos tempo você vai gastar em ajustes depois. Prompts claros. Estrutura revisada. Visual aplicado. Apresentação pronta.\n\nLição concluída ✓"
  )
] as const;

export const GAMMA_MODULE_2_STEPS_EN = [
  textStep(
    "Creating Your First Presentation from Scratch with Gamma",
    "Welcome back! In this lesson, you'll create your first complete presentation in Gamma — from the initial prompt to the final result. We'll follow each decision step by step, as if you had the platform open in front of you."
  ),
  textStep(
    "Accessing Gamma and Creating a New Project",
    "Access gamma.app, create your free account, and click Create new. You'll see three creation options: Generate with AI from a prompt, Import an existing file or URL, or Start from scratch with a blank template."
  ),
  quizStep(
    "Quiz: Preparation",
    "What should you do before typing anything in Gamma?",
    [
      "Choose the visual template before thinking about the content",
      "Configure colors and fonts before generating the presentation",
      "Have a clear objective for the presentation, target audience, and main points — a rich prompt generates a much more aligned result than a generic description",
      "Create a paid account before testing any functionality"
    ],
    2,
    "Have a clear objective for the presentation, target audience, and main points — a rich prompt generates a much more aligned result than a generic description."
  ),
  textStep(
    "The Generation Prompt — The Most Important Decision",
    "The quality of the generated presentation depends directly on the clarity of your prompt. A good prompt informs the theme, objective, audience, and desired tone — the more context you provide, the more precise and useful the result will be."
  ),
  fillStep(
    "Exercise: Write a powerful prompt!",
    "Fill in the blank — Write a powerful prompt!",
    "Create a presentation about ___ for ___. The objective is to ___. Use a ___ tone and include slides about ___, ___, and ___. Finish with a ___ slide.",
    ["artificial intelligence in the job market", "managers and team leaders", "show opportunities and risks of AI", "analytical and accessible", "current context", "practical impacts", "how to prepare", "next steps"],
    ["artificial intelligence in the job market", "managers and team leaders", "show opportunities and risks of AI", "analytical and accessible", "current context", "practical impacts", "how to prepare", "next steps"],
    "Create a presentation about artificial intelligence in the job market for managers and team leaders. The objective is to show opportunities and risks of AI. Use an analytical and accessible tone and include slides about current context, practical impacts, and how to prepare. Finish with a next steps slide."
  ),
  textStep(
    "Editing the Outline Before Generating",
    "After Gamma generates the outline — the structured sketch of the presentation — you have the opportunity to review and adjust before confirming the complete generation. This is the moment to move sections, rename topics, and ensure the structure reflects exactly what you want to communicate."
  ),
  quizStep(
    "Quiz: Outline Editing",
    "Why does editing the outline before generating the complete presentation save time?",
    [
      "Because Gamma charges extra credits for adjustments after generation",
      "To impress the audience with a different structure from the standard",
      "Because adjusting the structure before generation is much faster than reorganizing slides later — and ensures the generated content follows exactly the logic you planned",
      "The outline cannot be edited after initial generation"
    ],
    2,
    "Because adjusting the structure before generation is much faster than reorganizing slides later — and ensures the generated content follows exactly the logic you planned."
  ),
  textStep(
    "Choosing the Visual Theme",
    "After generating the content, Gamma allows you to choose from dozens of visual themes — color palettes, typographies, and styles that change the appearance of the entire presentation with one click. You can also upload your logo and brand colors to create a custom theme."
  ),
  fillStep(
    "Exercise: Configure the visual theme!",
    "Fill in the blank — Configure the visual theme!",
    "To customize the presentation's visual in Gamma: click on ___ in the side panel, choose from the available ___ themes, adjust the main ___ and ___ to reflect your visual identity, upload your ___, and click ___ to apply to all slides at once.",
    ["Theme", "pre-defined", "colors", "typography", "logo", "Apply theme"],
    ["Theme", "pre-defined", "colors", "typography", "logo", "Apply theme"],
    "To customize the presentation's visual in Gamma: click on Theme in the side panel, choose from the available pre-defined themes, adjust the main colors and typography to reflect your visual identity, upload your logo, and click Apply theme to apply to all slides at once."
  ),
  textStep(
    "Conclusion",
    "Creating your first presentation in Gamma is a perspective-changing experience. From prompt to visual result takes less than two minutes — and the result is already a solid starting point that you refine with precision. The clearer and more specific your initial prompt, the less time you'll spend on adjustments later. Clear prompts. Revised structure. Applied visual. Presentation ready.\n\nLesson complete ✓"
  )
] as const;

export const GAMMA_MODULE_2_STEPS_ES = [
  textStep(
    "Creando tu Primera Presentación desde Cero con Gamma",
    "¡Bienvenido de nuevo! En esta lección, crearás tu primera presentación completa en Gamma — desde el prompt inicial hasta el resultado final. Seguiremos cada decisión paso a paso, como si tuvieras la plataforma abierta frente a ti."
  ),
  textStep(
    "Accediendo a Gamma y Creando un Nuevo Proyecto",
    "Accede a gamma.app, crea tu cuenta gratuita y haz clic en Crear nuevo. Verás tres opciones de creación: Generar con IA a partir de un prompt, Importar un archivo o URL existente, o Comenzar desde cero con una plantilla en blanco."
  ),
  quizStep(
    "Quiz: Preparación",
    "¿Qué debes hacer antes de escribir cualquier cosa en Gamma?",
    [
      "Elegir la plantilla visual antes de pensar en el contenido",
      "Configurar los colores y fuentes antes de generar la presentación",
      "Tener claro el objetivo de la presentación, el público objetivo y los puntos principales — un prompt rico genera un resultado mucho más alineado que una descripción genérica",
      "Crear una cuenta de pago antes de probar cualquier funcionalidad"
    ],
    2,
    "Tener claro el objetivo de la presentación, el público objetivo y los puntos principales — un prompt rico genera un resultado mucho más alineado que una descripción genérica."
  ),
  textStep(
    "El Prompt de Generación — La Decisión Más Importante",
    "La calidad de la presentación generada depende directamente de la claridad de tu prompt. Un buen prompt informa el tema, el objetivo, el público y el tono deseado — cuanto más contexto proporciones, más preciso y útil será el resultado."
  ),
  fillStep(
    "Ejercicio: ¡Escribe un prompt poderoso!",
    "Rellena el espacio — ¡Escribe un prompt poderoso!",
    "Crea una presentación sobre ___ para ___. El objetivo es ___. Usa un tono ___ e incluye diapositivas sobre ___, ___ y ___. Finaliza con una diapositiva de ___.",
    ["inteligencia artificial en el mercado laboral", "gerentes y líderes de equipo", "mostrar oportunidades y riesgos de la IA", "analítico y accesible", "contexto actual", "impactos prácticos", "cómo prepararse", "próximos pasos"],
    ["inteligencia artificial en el mercado laboral", "gerentes y líderes de equipo", "mostrar oportunidades y riesgos de la IA", "analítico y accesible", "contexto actual", "impactos prácticos", "cómo prepararse", "próximos pasos"],
    "Crea una presentación sobre inteligencia artificial en el mercado laboral para gerentes y líderes de equipo. El objetivo es mostrar oportunidades y riesgos de la IA. Usa un tono analítico y accesible e incluye diapositivas sobre contexto actual, impactos prácticos y cómo prepararse. Finaliza con una diapositiva de próximos pasos."
  ),
  textStep(
    "Editando el Outline Antes de Generar",
    "Después de que Gamma genera el outline — el esquema estructurado de la presentación — tienes la oportunidad de revisar y ajustar antes de confirmar la generación completa. Este es el momento de mover secciones, renombrar tópicos y garantizar que la estructura refleja exactamente lo que quieres comunicar."
  ),
  quizStep(
    "Quiz: Edición del Outline",
    "¿Por qué editar el outline antes de generar la presentación completa ahorra tiempo?",
    [
      "Porque Gamma cobra créditos extras por ajustes después de la generación",
      "Para impresionar a la audiencia con una estructura diferente del estándar",
      "Porque ajustar la estructura antes de la generación es mucho más rápido que reorganizar diapositivas después — y garantiza que el contenido generado siga exactamente la lógica que planeaste",
      "El outline no puede ser editado después de la generación inicial"
    ],
    2,
    "Porque ajustar la estructura antes de la generación es mucho más rápido que reorganizar diapositivas después — y garantiza que el contenido generado siga exactamente la lógica que planeaste."
  ),
  textStep(
    "Eligiendo el Tema Visual",
    "Después de generar el contenido, Gamma permite elegir entre docenas de temas visuales — paletas de colores, tipografías y estilos que cambian la apariencia de toda la presentación con un clic. También puedes subir el logo y los colores de tu marca para crear un tema personalizado."
  ),
  fillStep(
    "Ejercicio: ¡Configura el tema visual!",
    "Rellena el espacio — ¡Configura el tema visual!",
    "Para personalizar el visual de la presentación en Gamma: haz clic en ___ en el panel lateral, elige entre los temas ___ disponibles, ajusta los ___ principales y la ___ para reflejar tu identidad visual, sube tu ___ y haz clic en ___ para aplicar en todas las diapositivas de una vez.",
    ["Tema", "predefinidos", "colores", "tipografía", "logotipo", "Aplicar tema"],
    ["Tema", "predefinidos", "colores", "tipografía", "logotipo", "Aplicar tema"],
    "Para personalizar el visual de la presentación en Gamma: haz clic en Tema en el panel lateral, elige entre los temas predefinidos disponibles, ajusta los colores principales y la tipografía para reflejar tu identidad visual, sube tu logotipo y haz clic en Aplicar tema para aplicar en todas las diapositivas de una vez."
  ),
  textStep(
    "Conclusión",
    "Crear tu primera presentación en Gamma es una experiencia que cambia perspectivas. Del prompt al resultado visual toma menos de dos minutos — y el resultado ya es un punto de partida sólido que refinas con precisión. Cuanto más claro y específico sea tu prompt inicial, menos tiempo gastarás en ajustes después. Prompts claros. Estructura revisada. Visual aplicado. Presentación lista.\n\nLección completada ✓"
  )
] as const;

export const GAMMA_MODULE_2_STEPS_FR = [
  textStep(
    "Créer votre Première Présentation de Zéro avec Gamma",
    "Bienvenue ! Dans cette leçon, vous créerez votre première présentation complète dans Gamma — du prompt initial au résultat final. Nous suivrons chaque décision étape par étape, comme si vous aviez la plateforme ouverte devant vous."
  ),
  textStep(
    "Accéder à Gamma et Créer un Nouveau Projet",
    "Accédez à gamma.app, créez votre compte gratuit et cliquez sur Créer nouveau. Vous verrez trois options de création : Générer avec l'IA à partir d'un prompt, Importer un fichier ou URL existant, ou Commencer de zéro avec un modèle vierge."
  ),
  quizStep(
    "Quiz : Préparation",
    "Que devez-vous faire avant de taper quoi que ce soit dans Gamma ?",
    [
      "Choisir le modèle visuel avant de penser au contenu",
      "Configurer les couleurs et polices avant de générer la présentation",
      "Avoir clair l'objectif de la présentation, le public cible et les points principaux — un prompt riche génère un résultat beaucoup plus aligné qu'une description générique",
      "Créer un compte payant avant de tester toute fonctionnalité"
    ],
    2,
    "Avoir clair l'objectif de la présentation, le public cible et les points principaux — un prompt riche génère un résultat beaucoup plus aligné qu'une description générique."
  ),
  textStep(
    "Le Prompt de Génération — La Décision la Plus Importante",
    "La qualité de la présentation générée dépend directement de la clarté de votre prompt. Un bon prompt informe le thème, l'objectif, le public et le ton souhaité — plus vous fournissez de contexte, plus le résultat sera précis et utile."
  ),
  fillStep(
    "Exercice : Écrivez un prompt puissant !",
    "Remplissez le blanc — Écrivez un prompt puissant !",
    "Créez une présentation sur ___ pour ___. L'objectif est de ___. Utilisez un ton ___ et incluez des diapositives sur ___, ___ et ___. Terminez avec une diapositive de ___.",
    ["l'intelligence artificielle sur le marché du travail", "gestionnaires et chefs d'équipe", "montrer les opportunités et risques de l'IA", "analytique et accessible", "contexte actuel", "impacts pratiques", "comment se préparer", "prochaines étapes"],
    ["l'intelligence artificielle sur le marché du travail", "gestionnaires et chefs d'équipe", "montrer les opportunités et risques de l'IA", "analytique et accessible", "contexte actuel", "impacts pratiques", "comment se préparer", "prochaines étapes"],
    "Créez une présentation sur l'intelligence artificielle sur le marché du travail pour gestionnaires et chefs d'équipe. L'objectif est de montrer les opportunités et risques de l'IA. Utilisez un ton analytique et accessible et incluez des diapositives sur contexte actuel, impacts pratiques et comment se préparer. Terminez avec une diapositive de prochaines étapes."
  ),
  textStep(
    "Éditer le Plan Avant de Générer",
    "Après que Gamma génère le plan — l'esquisse structurée de la présentation — vous avez l'opportunité de réviser et ajuster avant de confirmer la génération complète. C'est le moment de déplacer des sections, renommer des sujets et garantir que la structure reflète exactement ce que vous voulez communiquer."
  ),
  quizStep(
    "Quiz : Édition du Plan",
    "Pourquoi éditer le plan avant de générer la présentation complète économise du temps ?",
    [
      "Parce que Gamma facture des crédits supplémentaires pour les ajustements après la génération",
      "Pour impressionner l'audience avec une structure différente du standard",
      "Parce qu'ajuster la structure avant la génération est beaucoup plus rapide que réorganiser les diapositives après — et garantit que le contenu généré suive exactement la logique que vous avez planifiée",
      "Le plan ne peut pas être édité après la génération initiale"
    ],
    2,
    "Parce qu'ajuster la structure avant la génération est beaucoup plus rapide que réorganiser les diapositives après — et garantit que le contenu généré suive exactement la logique que vous avez planifiée."
  ),
  textStep(
    "Choisir le Thème Visuel",
    "Après avoir généré le contenu, Gamma permet de choisir parmi des dizaines de thèmes visuels — palettes de couleurs, typographies et styles qui changent l'apparence de toute la présentation en un clic. Vous pouvez également télécharger votre logo et les couleurs de votre marque pour créer un thème personnalisé."
  ),
  fillStep(
    "Exercice : Configurez le thème visuel !",
    "Remplissez le blanc — Configurez le thème visuel !",
    "Pour personnaliser le visuel de la présentation dans Gamma : cliquez sur ___ dans le panneau latéral, choisissez parmi les thèmes ___ disponibles, ajustez les ___ principales et la ___ pour refléter votre identité visuelle, téléchargez votre ___ et cliquez sur ___ pour appliquer à toutes les diapositives en une fois.",
    ["Thème", "prédéfinis", "couleurs", "typographie", "logo", "Appliquer le thème"],
    ["Thème", "prédéfinis", "couleurs", "typographie", "logo", "Appliquer le thème"],
    "Pour personnaliser le visuel de la présentation dans Gamma : cliquez sur Thème dans le panneau latéral, choisissez parmi les thèmes prédéfinis disponibles, ajustez les couleurs principales et la typographie pour refléter votre identité visuelle, téléchargez votre logo et cliquez sur Appliquer le thème pour appliquer à toutes les diapositives en une fois."
  ),
  textStep(
    "Conclusion",
    "Créer votre première présentation dans Gamma est une expérience qui change les perspectives. Du prompt au résultat visuel prend moins de deux minutes — et le résultat est déjà un point de départ solide que vous affinez avec précision. Plus votre prompt initial est clair et spécifique, moins vous passerez de temps sur les ajustements après. Prompts clairs. Structure révisée. Visuel appliqué. Présentation prête.\n\nLeçon terminée ✓"
  )
] as const;
