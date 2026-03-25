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

export const CLAUDE_MODULE_4_STEPS_PT = [
  textStep(
    "🎨 Criando com os Artefatos do Claude",
    "Bem-vindo de volta! Nesta lição, você vai aprender a usar uma das funcionalidades mais visuais e práticas do Claude — os Artefatos. Com eles, você cria documentos, códigos, páginas, apresentações e muito mais diretamente na conversa, sem precisar de nenhuma ferramenta externa."
  ),
  textStep(
    "🖼️ O que são os Artefatos?",
    "Os Artefatos são criações geradas pelo Claude que aparecem em uma janela separada ao lado da conversa — um espaço dedicado para visualizar, editar e exportar o que foi produzido. Em vez de receber um texto longo na conversa, você vê o resultado final renderizado em tempo real. Os Artefatos suportam diferentes tipos de conteúdo: documentos em Markdown, páginas HTML, componentes em React, apresentações e visualizações de dados."
  ),
  quizStep(
    "Funcionamento dos Artefatos",
    "O que diferencia um Artefato de uma resposta comum do Claude?",
    [
      "O Artefato aparece em uma janela separada, renderizado visualmente, pronto para usar ou exportar",
      "Artefatos são respostas mais longas do que o normal",
      "Apenas usuários com assinatura avançada conseguem visualizar Artefatos",
      "Artefatos são salvos automaticamente em um arquivo no seu computador"
    ],
    0,
    "Os Artefatos proveem um ambiente dedicado para visualização e interação com o conteúdo gerado, facilitando o uso imediato."
  ),
  textStep(
    "📄 Criando Documentos e Relatórios",
    "O uso mais imediato dos Artefatos é para criar documentos estruturados — relatórios, propostas, planos de ação, resumos executivos — que você pode visualizar, copiar e usar diretamente. O conteúdo aparece formatado e organizado em uma janela separada, facilitando a leitura, edição e exportação."
  ),
  fillStep(
    "Exercício 1: Peça seu documento como Artefato!",
    "Complete o prompt para gerar um documento estruturado.",
    '"Crie um ___ para a minha empresa de ___. Inclua: resumo executivo, ___ identificados, plano de ação com ___ etapas e métricas de ___. Gere como Artefato em Markdown."',
    ["plano estratégico trimestral", "consultoria de RH", "principais desafios", "5", "acompanhamento"],
    ["plano estratégico trimestral", "consultoria de RH", "principais desafios", "5", "acompanhamento", "email marketing", "lista de compras", "10", "falha"],
    "Isso instrui o Claude a organizar informações densas em um formato profissional e pronto para uso."
  ),
  textStep(
    "🌐 Criando Páginas Web com HTML",
    "Com Artefatos em HTML, você pode criar páginas completas — landing pages, portfólios, apresentações — diretamente no Claude, sem saber programar. Depois de gerada, você visualiza a página renderizada, pede ajustes na conversa e copia o código para usar no seu projeto."
  ),
  fillStep(
    "Exercício 2: Crie sua página web!",
    "Complete o prompt para criar uma página visual.",
    '"Crie uma ___ em HTML para o meu serviço de ___. Inclua: seção de ___, lista de ___, depoimento de cliente e botão de ___. Use cores ___ e design limpo e moderno. Gere como Artefato."',
    ["landing page", "coaching de carreira", "apresentação do serviço", "benefícios", "contato", "azul e branco"],
    ["landing page", "coaching de carreira", "apresentação do serviço", "benefícios", "contato", "azul e branco", "planilha", "banco de dados", "vermelho e preto"],
    "Os Artefatos em HTML permitem prototipar interfaces visuais rapidamente."
  ),
  textStep(
    "⚛️ Criando Componentes Interativos com React",
    "Para quem quer ir além, o Claude pode gerar componentes interativos em React — calculadoras, formulários, dashboards, quizzes — que funcionam diretamente na janela do Artefato."
  ),
  quizStep(
    "Prompts para Componentes",
    "Qual prompt geraria o Artefato interativo mais útil?",
    [
      "Crie algo em React para mim",
      "Faça um componente bonito",
      "Crie um componente React interativo de calculadora de IMC. O usuário insere peso e altura, e o resultado aparece com a classificação (abaixo do peso, normal, sobrepeso ou obesidade) e uma cor diferente para cada faixa. Gere como Artefato",
      "Faça uma calculadora em qualquer linguagem"
    ],
    2,
    "Detalhar a interatividade e a lógica desejada ajuda o Claude a gerar um componente funcional e útil logo de primeira."
  ),
  textStep(
    "✏️ Editando e Refinando Artefatos",
    "Depois de gerar um Artefato, você pode pedir ajustes diretamente na conversa — mudar cores, adicionar seções, alterar o tom ou reformatar o conteúdo. O Claude atualiza o Artefato em tempo real. A forma mais eficiente é dar instruções específicas de ajuste — o Claude atualiza mantendo tudo que já estava bom."
  ),
  fillStep(
    "Exercício 3: Refine seu Artefato!",
    "Complete o prompt para ajustar o conteúdo existente.",
    '"No Artefato gerado, ___ a seção de introdução, adicione um ___ no topo com o logo da empresa, mude a cor principal para ___ e inclua uma seção de ___ ao final."',
    ["reescreva", "cabeçalho", "verde escuro", "perguntas frequentes"],
    ["reescreva", "cabeçalho", "verde escuro", "perguntas frequentes", "apague", "rodapé", "rosa choque", "anúncios"],
    "Instruções iterativas permitem polir o Artefato até que ele fique perfeito."
  ),
  textStep(
    "📊 Criando Visualizações de Dados",
    "Com Artefatos, o Claude pode transformar dados brutos em gráficos e visualizações interativas — usando código que roda direto na janela do Artefato."
  ),
  fillStep(
    "Exercício 4: Visualize seus dados!",
    "Complete o prompt para gerar um gráfico interativo.",
    '"Tenho os seguintes dados de ___: [cole os dados]. Crie um ___ interativo que mostre a ___ ao longo dos meses. Use cores ___, inclua ___ nos pontos do gráfico e gere como Artefato."',
    ["vendas mensais", "gráfico de linha", "evolução das vendas", "distintas por categoria", "tooltips com os valores"],
    ["vendas mensais", "gráfico de linha", "evolução das vendas", "distintas por categoria", "tooltips com os valores", "clima", "torta", "queda", "monocromáticas"],
    "A visualização interativa torna a análise de dados complexos muito mais intuitiva."
  ),
  textStep(
    "🏁 Conclusão",
    "Os Artefatos do Claude transformam conversas em criações reais — documentos, páginas, componentes interativos, apresentações e visualizações de dados, tudo em uma única janela. Você não precisa sair do Claude para ver o resultado. Não precisa de outras ferramentas para começar. Só precisa saber pedir. Quanto mais específico for o seu prompt, mais próximo do resultado final você chega na primeira geração — e menos ajustes você vai precisar fazer.\n\nCrie com intenção. Refine com precisão. O resultado já está a um prompt de distância.\n\nLição concluída ✓"
  )
] as const;

export const CLAUDE_MODULE_4_STEPS_EN = [
  textStep(
    "🎨 Creating with Claude Artifacts",
    "Welcome back! In this lesson, you will learn how to use one of Claude's most visual and practical features — Artifacts. With them, you create documents, code, pages, presentations, and much more directly in the conversation, without needing any external tools."
  ),
  textStep(
    "🖼️ What are Artifacts?",
    "Artifacts are creations generated by Claude that appear in a separate window next to the conversation — a dedicated space to view, edit, and export what was produced. Instead of receiving a long text in the conversation, you see the final result rendered in real-time. Artifacts support different types of content: Markdown documents, HTML pages, React components, presentations, and data visualizations."
  ),
  quizStep(
    "How Artifacts Work",
    "What distinguishes an Artifact from a common Claude response?",
    [
      "The Artifact appears in a separate window, visually rendered, ready to use or export",
      "Artifacts are longer-form answers than usual",
      "Only users with an advanced subscription can view Artifacts",
      "Artifacts are automatically saved to a file on your computer"
    ],
    0,
    "Artifacts provide a dedicated environment for viewing and interacting with generated content, making it easier to use immediately."
  ),
  textStep(
    "📄 Creating Documents and Reports",
    "The most immediate use for Artifacts is to create structured documents — reports, proposals, action plans, executive summaries — that you can view, copy, and use directly. The content appears formatted and organized in a separate window, making it easier to read, edit, and export."
  ),
  fillStep(
    "Exercise 1: Ask for your document as an Artifact!",
    "Complete the prompt to generate a structured document.",
    '"Create a ___ for my ___ company. Include: executive summary, identified ___, action plan with ___ steps, and ___ metrics. Generate as a Markdown Artifact."',
    ["quarterly strategic plan", "HR consulting", "key challenges", "5", "follow-up"],
    ["quarterly strategic plan", "HR consulting", "key challenges", "5", "follow-up", "email marketing", "grocery list", "10", "failure"],
    "This instructs Claude to organize dense information into a professional and ready-to-use format."
  ),
  textStep(
    "🌐 Creating Web Pages with HTML",
    "With HTML Artifacts, you can create complete pages — landing pages, portfolios, presentations — directly in Claude, without knowing how to code. Once generated, you view the rendered page, ask for adjustments in the conversation, and copy the code to use in your project."
  ),
  fillStep(
    "Exercise 2: Create your web page!",
    "Complete the prompt to create a visual page.",
    '"Create a ___ in HTML for my ___ service. Include: ___ section, ___ list, customer testimonial, and ___ button. Use ___ colors and a clean, modern design. Generate as an Artifact."',
    ["landing page", "career coaching", "service presentation", "benefits", "contact", "blue and white"],
    ["landing page", "career coaching", "service presentation", "benefits", "contact", "blue and white", "spreadsheet", "database", "red and black"],
    "HTML Artifacts allow you to prototype visual interfaces quickly."
  ),
  textStep(
    "⚛️ Creating Interactive Components with React",
    "For those who want to go further, Claude can generate interactive React components — calculators, forms, dashboards, quizzes — that work directly in the Artifact window."
  ),
  quizStep(
    "Prompts for Components",
    "Which prompt would generate the most useful interactive Artifact?",
    [
      "Create something in React for me",
      "Make a beautiful component",
      "Create an interactive React BMI calculator component. The user enters weight and height, and the result appears with the classification (underweight, normal, overweight, or obese) and a different color for each range. Generate as an Artifact",
      "Make a calculator in any language"
    ],
    2,
    "Detailing the desired interactivity and logic helps Claude generate a functional and useful component on the first try."
  ),
  textStep(
    "✏️ Editing and Refining Artifacts",
    "After generating an Artifact, you can ask for adjustments directly in the conversation — change colors, add sections, alter the tone, or reformat the content. Claude updates the Artifact in real-time. The most efficient way is to give specific adjustment instructions — Claude updates while keeping everything that was already good."
  ),
  fillStep(
    "Exercise 3: Refine your Artifact!",
    "Complete the prompt to adjust existing content.",
    '"In the generated Artifact, ___ the introduction section, add a ___ at the top with the company logo, change the main color to ___, and include a ___ section at the end."',
    ["rewrite", "header", "dark green", "FAQ"],
    ["rewrite", "header", "dark green", "FAQ", "delete", "footer", "hot pink", "ads"],
    "Iterative instructions allow you to polish the Artifact until it is perfect."
  ),
  textStep(
    "📊 Creating Data Visualizations",
    "With Artifacts, Claude can transform raw data into interactive charts and visualizations — using code that runs directly in the Artifact window."
  ),
  fillStep(
    "Exercise 4: Visualize your data!",
    "Complete the prompt to generate an interactive chart.",
    '"I have the following data for ___: [paste data]. Create an interactive ___ showing the ___ over the months. Use ___ colors, include ___ on the chart points, and generate as an Artifact."',
    ["monthly sales", "line chart", "sales evolution", "distinct by category", "tooltips with values"],
    ["monthly sales", "line chart", "sales evolution", "distinct by category", "tooltips with values", "weather", "pie chart", "drop", "monochromatic"],
    "Interactive visualization makes complex data analysis much more intuitive."
  ),
  textStep(
    "🏁 Conclusion",
    "Claude Artifacts transform conversations into real creations — documents, pages, interactive components, presentations, and data visualizations, all in a single window. You don't need to leave Claude to see the result. You don't need other tools to start. You just need to know how to ask. The more specific your prompt, the closer you get to the final result in the first generation — and the fewer adjustments you'll need to make.\n\nCreate with intention. Refine with precision. The result is just a prompt away.\n\nLesson complete ✓"
  )
] as const;

export const CLAUDE_MODULE_4_STEPS_ES = [
  textStep(
    "🎨 Creando con os Artefactos de Claude",
    "¡Bienvenido de nuevo! En esta lección, aprenderás a usar una de las funcionalidades más visuales y prácticas de Claude: los Artefactos. Con ellos, creas documentos, códigos, páginas, presentaciones y mucho más directamente en la conversación, sin necesidad de ninguna herramienta externa."
  ),
  textStep(
    "🖼️ ¿Qué son los Artefactos?",
    "Los Artefactos son creaciones generadas por Claude que aparecen en una ventana separada al lado de la conversación: un espacio dedicado para visualizar, editar y exportar lo producido. En lugar de recibir un texto largo en la conversación, ves el resultado final renderizado en tiempo real. Los Artefactos soportan diferentes tipos de contenido: documentos en Markdown, páginas HTML, componentes en React, presentaciones y visualizaciones de datos."
  ),
  quizStep(
    "Funcionamiento de los Artefactos",
    "¿Qué diferencia a un Artefacto de una respuesta común de Claude?",
    [
      "El Artefacto aparece en una ventana separada, renderizado visualmente, listo para usar o exportar",
      "Los Artefactos son respuestas más largas de lo normal",
      "Solo los usuarios con suscripción avanzada pueden ver Artefactos",
      "Los Artefactos se guardan automáticamente en un archivo en tu computadora"
    ],
    0,
    "Los Artefactos proporcionan un entorno dedicado para visualizar e interactuar con el contenido generado, facilitando su uso inmediato."
  ),
  textStep(
    "📄 Creando Documentos e Informes",
    "El uso más inmediato de los Artefactos es para crear documentos estructurados: informes, propuestas, planes de acción, resúmenes ejecutivos, que puedes visualizar, copiar y usar directamente. El contenido aparece formateado y organizado en una ventana separada, facilitando su lectura, edición y exportación."
  ),
  fillStep(
    "Ejercicio 1: ¡Pide tu documento como Artefacto!",
    "Completa el prompt para generar un documento estructurado.",
    '"Crea un ___ para mi empresa de ___. Incluye: resumen ejecutivo, ___ identificados, plan de acción con ___ etapas y métricas de ___. Genera como Artefacto en Markdown."',
    ["plan estratégico trimestral", "consultoría de RRHH", "desafíos principales", "5", "seguimiento"],
    ["plan estratégico trimestral", "consultoría de RRHH", "desafíos principales", "5", "seguimiento", "email marketing", "lista de compras", "10", "fallo"],
    "Esto instruye a Claude a organizar información densa en un formato profesional y listo para usar."
  ),
  textStep(
    "🌐 Creando Páginas Web con HTML",
    "Con Artefactos en HTML, puedes crear páginas completas: landing pages, portafolios, presentaciones, directamente en Claude, sin saber programar. Una vez generada, visualizas la página renderizada, pides ajustes en la conversación y copias el código para usar en tu proyecto."
  ),
  fillStep(
    "Ejercicio 2: ¡Crea tu página web!",
    "Completa el prompt para crear una página visual.",
    '"Crea una ___ en HTML para mi servicio de ___. Incluye: sección de ___, lista de ___, testimonio de cliente y botón de ___. Usa colores ___ y diseño limpio y moderno. Genera como Artefacto."',
    ["landing page", "coaching de carrera", "presentación del servicio", "beneficios", "contacto", "azul y blanco"],
    ["landing page", "coaching de carrera", "presentación del servicio", "beneficios", "contacto", "azul y blanco", "hoja de cálculo", "base de datos", "rojo y negro"],
    "Los Artefactos en HTML permiten prototipar interfaces visuales rápidamente."
  ),
  textStep(
    "⚛️ Creando Componentes Interactivos con React",
    "Para quienes quieren ir más allá, Claude puede generar componentes interactivos en React: calculadoras, formularios, dashboards, quizzes, que funcionan directamente en la ventana del Artefacto."
  ),
  quizStep(
    "Prompts para Componentes",
    "¿Qué prompt generaría el Artefacto interactivo más útil?",
    [
      "Crea algo en React para mí",
      "Haz un componente bonito",
      "Crea un componente React interactivo de calculadora de IMC. El usuario ingresa peso y altura, y el resultado aparece con la clasificación (bajo peso, normal, sobrepeso u obesidad) y un color diferente para cada rango. Genera como Artefacto",
      "Haz una calculadora en cualquier lenguaje"
    ],
    2,
    "Detallar la interactividad y la lógica deseada ayuda a Claude a generar un componente funcional y útil a la primera."
  ),
  textStep(
    "✏️ Editando y Refinando Artefactos",
    "Después de generar un Artefacto, puedes pedir ajustes directamente en la conversación: cambiar colores, añadir secciones, alterar el tono o reformatar el contenido. Claude actualiza el Artefacto en tiempo real. La forma más eficiente es dar instrucciones específicas de ajuste: Claude actualiza manteniendo todo lo que ya estaba bien."
  ),
  fillStep(
    "Ejercicio 3: ¡Refina tu Artefacto!",
    "Completa el prompt para ajustar el contenido existente.",
    '"En el Artefacto generado, ___ la sección de introducción, añade un ___ en la parte superior con el logo de la empresa, cambia el color principal a ___ e incluye una sección de ___ al final."',
    ["reescribe", "encabezado", "verde oscuro", "preguntas frecuentes"],
    ["reescribe", "encabezado", "verde oscuro", "preguntas frecuentes", "borra", "pie de página", "rosa fucsia", "anuncios"],
    "Las instrucciones iterativas permiten pulir el Artefacto hasta que quede perfecto."
  ),
  textStep(
    "📊 Creando Visualizaciones de Dados",
    "Con Artefactos, Claude puede transformar datos brutos en gráficos y visualizaciones interactivas, usando código que se ejecuta directamente en la ventana del Artefacto."
  ),
  fillStep(
    "Ejercicio 4: ¡Visualiza tus datos!",
    "Completa el prompt para generar un gráfico interactivo.",
    '"Tengo los siguientes datos de ___: [pega los datos]. Crea un ___ interactivo que muestre la ___ a lo largo de los meses. Usa colores ___, incluye ___ en los puntos del gráfico y genera como Artefacto."',
    ["ventas mensuales", "gráfico de líneas", "evolución de las ventas", "distintas por categoría", "tooltips con los valores"],
    ["ventas mensuales", "gráfico de líneas", "evolución de las ventas", "distintas por categoría", "tooltips con los valores", "clima", "tarta", "caída", "monocromáticos"],
    "La visualización interactiva hace que el análisis de datos complejos sea mucho más intuitivo."
  ),
  textStep(
    "🏁 Conclusión",
    "Los Artefactos de Claude transforman conversaciones en creaciones reales: documentos, páginas, componentes interactivos, presentaciones y visualizaciones de datos, todo en una sola ventana. No necesitas salir de Claude para ver el resultado. No necesitas otras herramientas para empezar. Solo necesitas saber pedir. Cuanto más específico sea tu prompt, más cerca del resultado final llegarás en la primera generación, y menos ajustes tendrás que hacer.\n\nCrea con intención. Refina con precisión. El resultado está a un prompt de distancia.\n\nLección completada ✓"
  )
] as const;

export const CLAUDE_MODULE_4_STEPS_FR = [
  textStep(
    "🎨 Créer avec les Artefacts de Claude",
    "Bon retour ! Dans cette leçon, vous allez apprendre à utiliser l'une des fonctionnalités les plus visuelles et pratiques de Claude — les Artefacts. Avec eux, vous créez des documents, du code, des pages, des présentations et bien plus encore directement dans la conversation, sans aucun outil externe."
  ),
  textStep(
    "🖼️ Que são les Artefacts ?",
    "Les Artefacts sont des créations générées par Claude qui apparaissent dans une fenêtre séparée à côté de la conversation — un espace dédié pour visualiser, modifier et exporter ce qui a été produit. Au lieu de recevoir un long texte, vous voyez le résultat final rendu en temps réel. Les Artefacts supportent différents types de contenu : documents Markdown, pages HTML, composants React, présentations et visualisations de données."
  ),
  quizStep(
    "Fonctionnement des Artefacts",
    "Qu'est-ce qui distingue un Artefact d'une réponse classique de Claude ?",
    [
      "L'Artefact apparaît dans une fenêtre séparée, avec un rendu visuel, prêt à l'emploi ou à l'exportation",
      "Les Artefacts sont des réponses plus longues que d'habitude",
      "Seuls les utilisateurs avec un abonnement avancé peuvent voir les Artefacts",
      "Les Artefacts sont automatiquement enregistrés dans un fichier sur votre ordinateur"
    ],
    0,
    "Les Artefacts offrent un environnement dédié pour visualiser et interagir avec le contenu généré, facilitant son utilisation immédiate."
  ),
  textStep(
    "📄 Création de Documents et de Rapports",
    "L'utilisation la plus immédiate des Artefacts est la création de documents structurés — rapports, propositions, plans d'action, synthèses — que vous pouvez visualiser, copier et utiliser directement. Le contenu apparaît formaté et organisé dans une fenêtre séparée, facilitant la lecture, l'édition et l'exportation."
  ),
  fillStep(
    "Exercice 1 : Demandez votre document sous forme d'Artefact !",
    "Complétez le prompt pour générer un document structuré.",
    '"Crée un ___ pour mon entreprise de ___. Inclus : résumé exécutif, ___ identifiés, plan d\'action avec ___ étapes et métriques de ___. Génère comme un Artefact en Markdown."',
    ["plan stratégique trimestriel", "conseil en RH", "défis principaux", "5", "suivi"],
    ["plan stratégique trimestriel", "conseil en RH", "défis principaux", "5", "suivi", "email marketing", "liste de courses", "10", "échec"],
    "Cela indique à Claude d'organiser des informations denses dans un format professionnel et prêt à l'emploi."
  ),
  textStep(
    "🌐 Création de Pages Web avec HTML",
    "Avec les Artefacts HTML, vous pouvez créer des pages complètes — landing pages, portfolios, présentations — directement dans Claude, sans savoir programmer. Une fois générée, vous visualisez la page rendue, demandez des ajustements dans la conversation et copiez le code pour l'utiliser dans votre projet."
  ),
  fillStep(
    "Exercice 2 : Créez votre page web !",
    "Complétez le prompt pour créer une page visuelle.",
    '"Crée une ___ en HTML pour mon service de ___. Inclus : section de ___, liste de ___, témoignage client et bouton de ___. Utilise des couleurs ___ et un design épuré et moderne. Génère comme un Artefact."',
    ["landing page", "coaching de carrière", "présentation du service", "avantages", "contact", "bleu et blanc"],
    ["landing page", "coaching de carrière", "présentation du service", "avantages", "contact", "bleu et blanc", "tableur", "base de données", "rouge et noir"],
    "Les Artefacts HTML permettent de prototyper des interfaces visuelles rapidement."
  ),
  textStep(
    "⚛️ Création de Composants Interactifs avec React",
    "Pour ceux qui veulent aller plus loin, Claude peut générer des composants React interactifs — calculatrices, formulaires, tableaux de bord, quiz — qui fonctionnent directement dans la fenêtre de l'Artefact."
  ),
  quizStep(
    "Prompts pour Composants",
    "Quel prompt générererait l'Artefact interactif le plus utile ?",
    [
      "Crée quelque chose en React pour moi",
      "Fais un beau composant",
      "Crée un composant React interactif de calcul de l'IMC. L'utilisateur saisit son poids et sa taille, et le résultat s'affiche avec la classification (maigreur, normal, surpoids ou obésité) et une couleur différente pour chaque tranche. Génère comme un Artefact",
      "Fais une calculatrice dans n'importe quel langage"
    ],
    2,
    "Détailler l'interactivité et la logique souhaitées aide Claude à générer un composant fonctionnel et utile dès le premier essai."
  ),
  textStep(
    "✏️ Édition et Affinement des Artefacts",
    "Après avoir généré un Artefact, vous pouvez demander des ajustements directement dans la conversation — changer les couleurs, ajouter des sections, modifier le ton ou reformater le contenu. Claude met à jour l'Artefact en temps réel. La manière la plus efficace est de donner des instructions d'ajustement spécifiques — Claude met à jour tout en conservant ce qui était déjà bien."
  ),
  fillStep(
    "Exercice 3 : Affinez votre Artefact !",
    "Complétez le prompt pour ajuster le contenu existant.",
    '"Dans l\'Artefact généré, ___ la section d\'introduction, ajoute un ___ en haut avec le logo de l\'entreprise, change la couleur principale en ___ et inclus une section ___ à la fin."',
    ["réécris", "en-tête", "vert foncé", "foire aux questions"],
    ["réécris", "en-tête", "vert foncé", "foire aux questions", "supprime", "pied de page", "rose vif", "publicités"],
    "Les instructions itératives permettent de polir l'Artefact jusqu'à ce qu'il soit parfait."
  ),
  textStep(
    "📊 Création de Visualisations de Données",
    "Avec les Artefacts, Claude peut transformer des données brutes en graphiques et visualisations interactives — en utilisant du code qui s'exécute directement dans la fenêtre de l'Artefact."
  ),
  fillStep(
    "Exercice 4 : Visualisez vos données !",
    "Complétez le prompt pour générer un graphique interactif.",
    '"J\'ai les données suivantes pour ___ : [coller les données]. Crée un ___ interactif montrant ___ au fil des mois. Utilise des couleurs ___, inclus des ___ sur les points du graphique et génère comme un Artefact."',
    ["ventes mensuelles", "graphique linéaire", "l'évolution des ventes", "distinctes par catégorie", "info-bulles avec les valeurs"],
    ["ventes mensuelles", "graphique linéaire", "l'évolution des ventes", "distinctes par catégorie", "info-bulles avec les valeurs", "météo", "camembert", "baisse", "monochromatiques"],
    "La visualisation interactive rend l'analyse de données complexes beaucoup plus intuitive."
  ),
  textStep(
    "🏁 Conclusion",
    "Les Artefacts de Claude transforment les conversations en créations réelles — documents, pages, composants interactifs, présentations et visualisations de données, le tout dans une seule fenêtre. Vous n'avez pas besoin de quitter Claude pour voir le résultat. Vous n'avez pas besoin d'autres outils pour commencer. Vous devez juste savoir comment demander. Plus votre prompt est spécifique, plus vous vous rapprochez du résultat final dès la première génération — et moins vous aurez d'ajustements à faire.\n\nCréez avec intention. Affinez avec précision. Le résultat est à portée de prompt.\n\nLeçon terminée ✓"
  )
] as const;
