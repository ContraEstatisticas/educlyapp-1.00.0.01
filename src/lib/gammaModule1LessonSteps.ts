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

export const GAMMA_MODULE_1_STEPS_PT = [
  textStep(
    "O que é o Gamma e por que ele Mudou a Forma de Criar Apresentações",
    "Bem-vindo! Nesta lição, você vai conhecer o Gamma — a plataforma de inteligência artificial que transformou a criação de apresentações, documentos e páginas web. Esqueça horas perdidas no PowerPoint ajustando fontes e alinhando caixas de texto. Com o Gamma, você descreve o que quer e ele entrega uma apresentação profissional em minutos."
  ),
  textStep(
    "O que é o Gamma?",
    "O Gamma é uma plataforma de criação de conteúdo baseada em IA. Você fornece um tema, uma ideia ou um arquivo — e o Gamma gera automaticamente slides visualmente atraentes, com estrutura de conteúdo, imagens e layout profissional. Ele funciona no navegador, sem instalação, e exporta para PowerPoint, Google Slides e PDF."
  ),
  quizStep(
    "Quiz: Diferenciais do Gamma",
    "O que diferencia o Gamma de ferramentas tradicionais como PowerPoint?",
    [
      "O Gamma usa IA para gerar estrutura, conteúdo e design automaticamente a partir de um simples prompt — eliminando a página em branco e reduzindo horas de trabalho para minutos",
      "O Gamma só cria apresentações com templates fixos sem personalização",
      "É necessário ter conhecimento de design para usar o Gamma",
      "O Gamma funciona apenas para apresentações corporativas"
    ],
    0,
    "O Gamma usa IA para gerar estrutura, conteúdo e design automaticamente a partir de um simples prompt — eliminando a página em branco e reduzindo horas de trabalho para minutos."
  ),
  textStep(
    "O Sistema de Cards",
    "Em vez de slides tradicionais, o Gamma usa um sistema de cards — blocos de conteúdo que podem conter texto, imagens, vídeos, gráficos e elementos interativos. Cada card é um slide, mas com muito mais flexibilidade visual e capacidade de incorporar mídia externa diretamente na apresentação."
  ),
  quizStep(
    "Quiz: Sistema de Cards",
    "Por que o sistema de cards do Gamma é mais flexível do que slides tradicionais?",
    [
      "Porque cards são menores e carregam mais rápido",
      "Porque o Gamma não suporta imagens em slides tradicionais",
      "Porque cada card pode conter texto, vídeos, gráficos e embeds interativos — enquanto slides tradicionais são limitados a elementos estáticos sem interatividade nativa",
      "Cards e slides tradicionais têm as mesmas capacidades"
    ],
    2,
    "Porque cada card pode conter texto, vídeos, gráficos e embeds interativos — enquanto slides tradicionais são limitados a elementos estáticos sem interatividade nativa."
  ),
  textStep(
    "Para que Serve o Gamma na Prática",
    "O Gamma serve para criar apresentações de negócios, pitch decks, relatórios, materiais de aula, portfólios, landing pages e documentos — tudo a partir de um prompt. Profissionais de marketing, professores, empreendedores e consultores usam o Gamma para produzir conteúdo visual de alta qualidade sem depender de designers."
  ),
  fillStep(
    "Exercício: Conheça os casos de uso!",
    "Preencha a lacuna — Conheça os casos de uso!",
    "O Gamma é usado por ___ para criar pitch decks rapidamente, por ___ para produzir materiais de aula visuais, por ___ para gerar relatórios e propostas e por ___ para criar landing pages e apresentações de campanha — tudo sem precisar de ___.",
    ["empreendedores", "professores", "consultores", "profissionais de marketing", "um designer"],
    ["empreendedores", "professores", "consultores", "profissionais de marketing", "um designer"],
    "O Gamma é usado por empreendedores para criar pitch decks rapidamente, por professores para produzir materiais de aula visuais, por consultores para gerar relatórios e propostas e por profissionais de marketing para criar landing pages e apresentações de campanha — tudo sem precisar de um designer."
  ),
  textStep(
    "O que o Gamma Não Faz Sozinho",
    "O Gamma é um gerador de primeiro rascunho poderoso — mas não substitui sua revisão crítica. Dados numéricos, estatísticas e afirmações factuais precisam ser verificados antes de qualquer apresentação importante. O Gamma estrutura e formata — o conteúdo estratégico ainda é seu."
  ),
  textStep(
    "Conclusão",
    "O Gamma representa uma mudança fundamental na forma como criamos apresentações. Em vez de começar com uma página em branco e gastar horas em design, você começa com uma ideia e o Gamma entrega a estrutura — que você refina e personaliza. Para quem precisa comunicar bem e rápido, é uma das ferramentas mais poderosas disponíveis hoje. Descreva sua ideia. O Gamma faz o resto.\n\nLição concluída ✓"
  )
] as const;

export const GAMMA_MODULE_1_STEPS_EN = [
  textStep(
    "What is Gamma and Why It Changed the Way We Create Presentations",
    "Welcome! In this lesson, you'll learn about Gamma — the artificial intelligence platform that transformed the creation of presentations, documents, and web pages. Forget hours lost in PowerPoint adjusting fonts and aligning text boxes. With Gamma, you describe what you want and it delivers a professional presentation in minutes."
  ),
  textStep(
    "What is Gamma?",
    "Gamma is an AI-based content creation platform. You provide a theme, an idea, or a file — and Gamma automatically generates visually appealing slides with content structure, images, and professional layout. It works in the browser, without installation, and exports to PowerPoint, Google Slides, and PDF."
  ),
  quizStep(
    "Quiz: Gamma's Differentiators",
    "What differentiates Gamma from traditional tools like PowerPoint?",
    [
      "Gamma uses AI to automatically generate structure, content, and design from a simple prompt — eliminating the blank page and reducing hours of work to minutes",
      "Gamma only creates presentations with fixed templates without customization",
      "Design knowledge is required to use Gamma",
      "Gamma only works for corporate presentations"
    ],
    0,
    "Gamma uses AI to automatically generate structure, content, and design from a simple prompt — eliminating the blank page and reducing hours of work to minutes."
  ),
  textStep(
    "The Card System",
    "Instead of traditional slides, Gamma uses a card system — content blocks that can contain text, images, videos, charts, and interactive elements. Each card is a slide, but with much more visual flexibility and the ability to embed external media directly in the presentation."
  ),
  quizStep(
    "Quiz: Card System",
    "Why is Gamma's card system more flexible than traditional slides?",
    [
      "Because cards are smaller and load faster",
      "Because Gamma doesn't support images in traditional slides",
      "Because each card can contain text, videos, charts, and interactive embeds — while traditional slides are limited to static elements without native interactivity",
      "Cards and traditional slides have the same capabilities"
    ],
    2,
    "Because each card can contain text, videos, charts, and interactive embeds — while traditional slides are limited to static elements without native interactivity."
  ),
  textStep(
    "What Gamma is Used for in Practice",
    "Gamma is used to create business presentations, pitch decks, reports, teaching materials, portfolios, landing pages, and documents — all from a prompt. Marketing professionals, teachers, entrepreneurs, and consultants use Gamma to produce high-quality visual content without depending on designers."
  ),
  fillStep(
    "Exercise: Know the use cases!",
    "Fill in the blank — Know the use cases!",
    "Gamma is used by ___ to quickly create pitch decks, by ___ to produce visual teaching materials, by ___ to generate reports and proposals, and by ___ to create landing pages and campaign presentations — all without needing ___.",
    ["entrepreneurs", "teachers", "consultants", "marketing professionals", "a designer"],
    ["entrepreneurs", "teachers", "consultants", "marketing professionals", "a designer"],
    "Gamma is used by entrepreneurs to quickly create pitch decks, by teachers to produce visual teaching materials, by consultants to generate reports and proposals, and by marketing professionals to create landing pages and campaign presentations — all without needing a designer."
  ),
  textStep(
    "What Gamma Doesn't Do Alone",
    "Gamma is a powerful first draft generator — but it doesn't replace your critical review. Numerical data, statistics, and factual claims need to be verified before any important presentation. Gamma structures and formats — the strategic content is still yours."
  ),
  textStep(
    "Conclusion",
    "Gamma represents a fundamental change in how we create presentations. Instead of starting with a blank page and spending hours on design, you start with an idea and Gamma delivers the structure — which you refine and customize. For those who need to communicate well and fast, it's one of the most powerful tools available today. Describe your idea. Gamma does the rest.\n\nLesson complete ✓"
  )
] as const;

export const GAMMA_MODULE_1_STEPS_ES = [
  textStep(
    "Qué es Gamma y por qué Cambió la Forma de Crear Presentaciones",
    "¡Bienvenido! En esta lección, conocerás Gamma — la plataforma de inteligencia artificial que transformó la creación de presentaciones, documentos y páginas web. Olvida las horas perdidas en PowerPoint ajustando fuentes y alineando cuadros de texto. Con Gamma, describes lo que quieres y él entrega una presentación profesional en minutos."
  ),
  textStep(
    "¿Qué es Gamma?",
    "Gamma es una plataforma de creación de contenido basada en IA. Proporcionas un tema, una idea o un archivo — y Gamma genera automáticamente diapositivas visualmente atractivas, con estructura de contenido, imágenes y diseño profesional. Funciona en el navegador, sin instalación, y exporta a PowerPoint, Google Slides y PDF."
  ),
  quizStep(
    "Quiz: Diferenciadores de Gamma",
    "¿Qué diferencia a Gamma de herramientas tradicionales como PowerPoint?",
    [
      "Gamma usa IA para generar estructura, contenido y diseño automáticamente a partir de un simple prompt — eliminando la página en blanco y reduciendo horas de trabajo a minutos",
      "Gamma solo crea presentaciones con plantillas fijas sin personalización",
      "Es necesario tener conocimiento de diseño para usar Gamma",
      "Gamma solo funciona para presentaciones corporativas"
    ],
    0,
    "Gamma usa IA para generar estructura, contenido y diseño automáticamente a partir de un simple prompt — eliminando la página en blanco y reduciendo horas de trabajo a minutos."
  ),
  textStep(
    "El Sistema de Tarjetas",
    "En lugar de diapositivas tradicionales, Gamma usa un sistema de tarjetas — bloques de contenido que pueden contener texto, imágenes, videos, gráficos y elementos interactivos. Cada tarjeta es una diapositiva, pero con mucha más flexibilidad visual y capacidad de incorporar medios externos directamente en la presentación."
  ),
  quizStep(
    "Quiz: Sistema de Tarjetas",
    "¿Por qué el sistema de tarjetas de Gamma es más flexible que las diapositivas tradicionales?",
    [
      "Porque las tarjetas son más pequeñas y cargan más rápido",
      "Porque Gamma no soporta imágenes en diapositivas tradicionales",
      "Porque cada tarjeta puede contener texto, videos, gráficos y embeds interactivos — mientras que las diapositivas tradicionales están limitadas a elementos estáticos sin interactividad nativa",
      "Las tarjetas y las diapositivas tradicionales tienen las mismas capacidades"
    ],
    2,
    "Porque cada tarjeta puede contener texto, videos, gráficos y embeds interactivos — mientras que las diapositivas tradicionales están limitadas a elementos estáticos sin interactividad nativa."
  ),
  textStep(
    "Para qué Sirve Gamma en la Práctica",
    "Gamma sirve para crear presentaciones de negocios, pitch decks, informes, materiales de clase, portafolios, landing pages y documentos — todo a partir de un prompt. Profesionales de marketing, profesores, emprendedores y consultores usan Gamma para producir contenido visual de alta calidad sin depender de diseñadores."
  ),
  fillStep(
    "Ejercicio: ¡Conoce los casos de uso!",
    "Rellena el espacio — ¡Conoce los casos de uso!",
    "Gamma es usado por ___ para crear pitch decks rápidamente, por ___ para producir materiales de clase visuales, por ___ para generar informes y propuestas y por ___ para crear landing pages y presentaciones de campaña — todo sin necesitar ___.",
    ["emprendedores", "profesores", "consultores", "profesionales de marketing", "un diseñador"],
    ["emprendedores", "profesores", "consultores", "profesionales de marketing", "un diseñador"],
    "Gamma es usado por emprendedores para crear pitch decks rápidamente, por profesores para producir materiales de clase visuales, por consultores para generar informes y propuestas y por profesionales de marketing para crear landing pages y presentaciones de campaña — todo sin necesitar un diseñador."
  ),
  textStep(
    "Lo que Gamma No Hace Solo",
    "Gamma es un generador de primer borrador poderoso — pero no reemplaza tu revisión crítica. Datos numéricos, estadísticas y afirmaciones factuales necesitan ser verificados antes de cualquier presentación importante. Gamma estructura y formatea — el contenido estratégico sigue siendo tuyo."
  ),
  textStep(
    "Conclusión",
    "Gamma representa un cambio fundamental en la forma en que creamos presentaciones. En lugar de comenzar con una página en blanco y gastar horas en diseño, comienzas con una idea y Gamma entrega la estructura — que refinas y personalizas. Para quienes necesitan comunicar bien y rápido, es una de las herramientas más poderosas disponibles hoy. Describe tu idea. Gamma hace el resto.\n\nLección completada ✓"
  )
] as const;

export const GAMMA_MODULE_1_STEPS_FR = [
  textStep(
    "Qu'est-ce que Gamma et pourquoi il a Changé la Façon de Créer des Présentations",
    "Bienvenue ! Dans cette leçon, vous découvrirez Gamma — la plateforme d'intelligence artificielle qui a transformé la création de présentations, documents et pages web. Oubliez les heures perdues dans PowerPoint à ajuster les polices et aligner les zones de texte. Avec Gamma, vous décrivez ce que vous voulez et il livre une présentation professionnelle en quelques minutes."
  ),
  textStep(
    "Qu'est-ce que Gamma ?",
    "Gamma est une plateforme de création de contenu basée sur l'IA. Vous fournissez un thème, une idée ou un fichier — et Gamma génère automatiquement des diapositives visuellement attrayantes, avec structure de contenu, images et mise en page professionnelle. Il fonctionne dans le navigateur, sans installation, et exporte vers PowerPoint, Google Slides et PDF."
  ),
  quizStep(
    "Quiz : Différenciateurs de Gamma",
    "Qu'est-ce qui différencie Gamma des outils traditionnels comme PowerPoint ?",
    [
      "Gamma utilise l'IA pour générer automatiquement structure, contenu et design à partir d'un simple prompt — éliminant la page blanche et réduisant des heures de travail à quelques minutes",
      "Gamma ne crée que des présentations avec des modèles fixes sans personnalisation",
      "Des connaissances en design sont nécessaires pour utiliser Gamma",
      "Gamma ne fonctionne que pour les présentations d'entreprise"
    ],
    0,
    "Gamma utilise l'IA pour générer automatiquement structure, contenu et design à partir d'un simple prompt — éliminant la page blanche et réduisant des heures de travail à quelques minutes."
  ),
  textStep(
    "Le Système de Cartes",
    "Au lieu de diapositives traditionnelles, Gamma utilise un système de cartes — des blocs de contenu qui peuvent contenir du texte, des images, des vidéos, des graphiques et des éléments interactifs. Chaque carte est une diapositive, mais avec beaucoup plus de flexibilité visuelle et la capacité d'incorporer des médias externes directement dans la présentation."
  ),
  quizStep(
    "Quiz : Système de Cartes",
    "Pourquoi le système de cartes de Gamma est-il plus flexible que les diapositives traditionnelles ?",
    [
      "Parce que les cartes sont plus petites et se chargent plus rapidement",
      "Parce que Gamma ne prend pas en charge les images dans les diapositives traditionnelles",
      "Parce que chaque carte peut contenir du texte, des vidéos, des graphiques et des embeds interactifs — tandis que les diapositives traditionnelles sont limitées à des éléments statiques sans interactivité native",
      "Les cartes et les diapositives traditionnelles ont les mêmes capacités"
    ],
    2,
    "Parce que chaque carte peut contenir du texte, des vidéos, des graphiques et des embeds interactifs — tandis que les diapositives traditionnelles sont limitées à des éléments statiques sans interactivité native."
  ),
  textStep(
    "À quoi Sert Gamma en Pratique",
    "Gamma sert à créer des présentations d'affaires, pitch decks, rapports, matériels de cours, portfolios, landing pages et documents — tout à partir d'un prompt. Les professionnels du marketing, enseignants, entrepreneurs et consultants utilisent Gamma pour produire du contenu visuel de haute qualité sans dépendre de designers."
  ),
  fillStep(
    "Exercice : Connaissez les cas d'usage !",
    "Remplissez le blanc — Connaissez les cas d'usage !",
    "Gamma est utilisé par ___ pour créer rapidement des pitch decks, par ___ pour produire des matériels de cours visuels, par ___ pour générer des rapports et propositions et par ___ pour créer des landing pages et présentations de campagne — tout sans avoir besoin d'___.",
    ["entrepreneurs", "enseignants", "consultants", "professionnels du marketing", "un designer"],
    ["entrepreneurs", "enseignants", "consultants", "professionnels du marketing", "un designer"],
    "Gamma est utilisé par entrepreneurs pour créer rapidement des pitch decks, par enseignants pour produire des matériels de cours visuels, par consultants pour générer des rapports et propositions et par professionnels du marketing pour créer des landing pages et présentations de campagne — tout sans avoir besoin d'un designer."
  ),
  textStep(
    "Ce que Gamma ne Fait pas Seul",
    "Gamma est un générateur de premier brouillon puissant — mais il ne remplace pas votre révision critique. Les données numériques, statistiques et affirmations factuelles doivent être vérifiées avant toute présentation importante. Gamma structure et formate — le contenu stratégique reste le vôtre."
  ),
  textStep(
    "Conclusion",
    "Gamma représente un changement fondamental dans la façon dont nous créons des présentations. Au lieu de commencer avec une page blanche et de passer des heures sur le design, vous commencez avec une idée et Gamma livre la structure — que vous affinez et personnalisez. Pour ceux qui ont besoin de communiquer bien et vite, c'est l'un des outils les plus puissants disponibles aujourd'hui. Décrivez votre idée. Gamma fait le reste.\n\nLeçon terminée ✓"
  )
] as const;
