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

export const GAMMA_MODULE_4_STEPS_PT = [
  textStep(
    "Recursos Avançados do Gamma — IA, Embeds e Interatividade",
    "Bem-vindo de volta! Nesta lição, você vai explorar os recursos mais poderosos do Gamma — aqueles que transformam uma apresentação comum em uma experiência interativa e memorável. Vídeos incorporados, gráficos dinâmicos, formulários e a IA avançada do Gamma fazem parte desse arsenal."
  ),
  textStep(
    "Incorporando Mídia Externa com Embeds",
    "Uma das funcionalidades mais diferenciadas do Gamma é a capacidade de incorporar conteúdo externo diretamente nos cards — vídeos do YouTube, gráficos do Google Sheets, formulários, mapas, tweets e muito mais. O conteúdo aparece renderizado e funcional dentro da apresentação, sem precisar sair dela."
  ),
  quizStep(
    "Quiz: Embeds",
    "Por que incorporar vídeos e gráficos diretamente na apresentação é mais eficiente do que linkar para fora?",
    [
      "Porque o espectador vê e interage com o conteúdo sem sair da apresentação — mantendo o fluxo da narrativa e eliminando o risco de perder a audiência em uma aba diferente",
      "Porque links externos nunca funcionam em apresentações ao vivo",
      "Embeds só funcionam em planos pagos do Gamma",
      "Não há diferença prática entre um embed e um link externo"
    ],
    0,
    "Porque o espectador vê e interage com o conteúdo sem sair da apresentação — mantendo o fluxo da narrativa e eliminando o risco de perder a audiência em uma aba diferente."
  ),
  textStep(
    "Criando Gráficos e Visualizações de Dados",
    "O Gamma pode gerar gráficos diretamente a partir dos seus dados — você descreve as informações ou cola os números e ele cria a visualização ideal. Barras, linhas, pizza e tabelas são gerados automaticamente com o estilo visual da apresentação."
  ),
  fillStep(
    "Exercício: Visualize seus dados!",
    "Preencha a lacuna — Visualize seus dados!",
    "Para criar um gráfico no Gamma: use o comando ___ para inserir um novo elemento, escolha o tipo ___ desejado, insira seus ___ ou descreva as informações para a IA gerar automaticamente, ajuste ___ e ___ para manter consistência com o restante da apresentação e posicione o gráfico no ___ do card.",
    ["/", "Gráfico", "dados", "cores", "legendas", "local ideal"],
    ["/", "Gráfico", "dados", "cores", "legendas", "local ideal"],
    "Para criar um gráfico no Gamma: use o comando / para inserir um novo elemento, escolha o tipo Gráfico desejado, insira seus dados ou descreva as informações para a IA gerar automaticamente, ajuste cores e legendas para manter consistência com o restante da apresentação e posicione o gráfico no local ideal do card."
  ),
  textStep(
    "O Gamma Agent — IA Conversacional para Edição",
    "O Gamma Agent é a IA conversacional integrada à plataforma. Em vez de editar card por card, você conversa com o Agent e pede mudanças em linguagem natural — \"adicione um slide sobre ROI após o terceiro card\", \"reescreva toda a apresentação com tom mais informal\", \"gere imagens para todos os slides que ainda não têm\"."
  ),
  fillStep(
    "Exercício: Use o Gamma Agent!",
    "Preencha a lacuna — Use o Gamma Agent!",
    "Para ativar o Gamma Agent: clique no ícone de ___ no painel lateral, descreva a mudança que quer fazer em ___ natural, como '___ o segundo slide com mais dados sobre o mercado' ou '___ o tom de toda a apresentação para mais ___', e o Agent aplica as mudanças em ___ real.",
    ["IA", "linguagem", "Aprofunde", "Mude", "conversacional", "tempo"],
    ["IA", "linguagem", "Aprofunde", "Mude", "conversacional", "tempo"],
    "Para ativar o Gamma Agent: clique no ícone de IA no painel lateral, descreva a mudança que quer fazer em linguagem natural, como 'Aprofunde o segundo slide com mais dados sobre o mercado' ou 'Mude o tom de toda a apresentação para mais conversacional', e o Agent aplica as mudanças em tempo real."
  ),
  textStep(
    "Redesign com Um Clique",
    "O Gamma permite redesenhar toda a apresentação visualmente com um único clique — mantendo o conteúdo intacto mas aplicando uma nova identidade visual completa. É ideal para quando você quer testar diferentes estilos antes de compartilhar com o cliente ou a audiência."
  ),
  quizStep(
    "Quiz: Redesign",
    "Por que o redesign com um clique é estratégico antes de apresentações importantes?",
    [
      "Para impressionar a audiência com uma apresentação diferente da versão de treino",
      "Porque o conteúdo muda junto com o visual a cada redesign",
      "Porque você pode testar diferentes estilos visuais em segundos e escolher o que melhor comunica para aquela audiência específica — sem recriar nenhum conteúdo",
      "O redesign só funciona em apresentações com menos de 10 slides"
    ],
    2,
    "Porque você pode testar diferentes estilos visuais em segundos e escolher o que melhor comunica para aquela audiência específica — sem recriar nenhum conteúdo."
  ),
  textStep(
    "Conclusão",
    "Os recursos avançados do Gamma transformam apresentações estáticas em experiências interativas. Embeds de mídia, gráficos de dados, o Gamma Agent e o redesign com um clique são os diferenciais que colocam a plataforma em outro nível em relação a ferramentas tradicionais. Dominar esses recursos é o que separa quem usa o Gamma do básico de quem realmente extrai o seu potencial completo. Incorpore mídia. Visualize dados. Redesenhe com intenção.\n\nLição concluída ✓"
  )
] as const;

export const GAMMA_MODULE_4_STEPS_EN = [
  textStep(
    "Advanced Gamma Features — AI, Embeds, and Interactivity",
    "Welcome back! In this lesson, you'll explore Gamma's most powerful features — those that transform a common presentation into an interactive and memorable experience. Embedded videos, dynamic charts, forms, and Gamma's advanced AI are part of this arsenal."
  ),
  textStep(
    "Embedding External Media with Embeds",
    "One of Gamma's most distinctive features is the ability to embed external content directly in cards — YouTube videos, Google Sheets charts, forms, maps, tweets, and much more. The content appears rendered and functional within the presentation, without needing to leave it."
  ),
  quizStep(
    "Quiz: Embeds",
    "Why is embedding videos and charts directly in the presentation more efficient than linking out?",
    [
      "Because the viewer sees and interacts with the content without leaving the presentation — maintaining narrative flow and eliminating the risk of losing the audience in a different tab",
      "Because external links never work in live presentations",
      "Embeds only work in Gamma's paid plans",
      "There is no practical difference between an embed and an external link"
    ],
    0,
    "Because the viewer sees and interacts with the content without leaving the presentation — maintaining narrative flow and eliminating the risk of losing the audience in a different tab."
  ),
  textStep(
    "Creating Charts and Data Visualizations",
    "Gamma can generate charts directly from your data — you describe the information or paste the numbers and it creates the ideal visualization. Bars, lines, pie, and tables are automatically generated with the presentation's visual style."
  ),
  fillStep(
    "Exercise: Visualize your data!",
    "Fill in the blank — Visualize your data!",
    "To create a chart in Gamma: use the ___ command to insert a new element, choose the desired ___ type, enter your ___ or describe the information for the AI to generate automatically, adjust ___ and ___ to maintain consistency with the rest of the presentation, and position the chart in the ___ of the card.",
    ["/", "Chart", "data", "colors", "legends", "ideal location"],
    ["/", "Chart", "data", "colors", "legends", "ideal location"],
    "To create a chart in Gamma: use the / command to insert a new element, choose the desired Chart type, enter your data or describe the information for the AI to generate automatically, adjust colors and legends to maintain consistency with the rest of the presentation, and position the chart in the ideal location of the card."
  ),
  textStep(
    "The Gamma Agent — Conversational AI for Editing",
    "The Gamma Agent is the conversational AI integrated into the platform. Instead of editing card by card, you chat with the Agent and request changes in natural language — \"add a slide about ROI after the third card\", \"rewrite the entire presentation with a more informal tone\", \"generate images for all slides that don't have them yet\"."
  ),
  fillStep(
    "Exercise: Use the Gamma Agent!",
    "Fill in the blank — Use the Gamma Agent!",
    "To activate the Gamma Agent: click on the ___ icon in the side panel, describe the change you want to make in natural ___, like '___ the second slide with more market data' or '___ the tone of the entire presentation to more ___', and the Agent applies the changes in ___ time.",
    ["AI", "language", "Deepen", "Change", "conversational", "real"],
    ["AI", "language", "Deepen", "Change", "conversational", "real"],
    "To activate the Gamma Agent: click on the AI icon in the side panel, describe the change you want to make in natural language, like 'Deepen the second slide with more market data' or 'Change the tone of the entire presentation to more conversational', and the Agent applies the changes in real time."
  ),
  textStep(
    "Redesign with One Click",
    "Gamma allows you to visually redesign the entire presentation with a single click — keeping the content intact but applying a complete new visual identity. It's ideal for when you want to test different styles before sharing with the client or audience."
  ),
  quizStep(
    "Quiz: Redesign",
    "Why is one-click redesign strategic before important presentations?",
    [
      "To impress the audience with a presentation different from the practice version",
      "Because the content changes along with the visual in each redesign",
      "Because you can test different visual styles in seconds and choose what best communicates to that specific audience — without recreating any content",
      "Redesign only works on presentations with less than 10 slides"
    ],
    2,
    "Because you can test different visual styles in seconds and choose what best communicates to that specific audience — without recreating any content."
  ),
  textStep(
    "Conclusion",
    "Gamma's advanced features transform static presentations into interactive experiences. Media embeds, data charts, the Gamma Agent, and one-click redesign are the differentiators that put the platform on another level compared to traditional tools. Mastering these features is what separates those who use Gamma at a basic level from those who truly extract its full potential. Embed media. Visualize data. Redesign with intention.\n\nLesson complete ✓"
  )
] as const;

export const GAMMA_MODULE_4_STEPS_ES = [
  textStep(
    "Recursos Avanzados de Gamma — IA, Embeds e Interactividad",
    "¡Bienvenido de nuevo! En esta lección, explorarás las características más poderosas de Gamma — aquellas que transforman una presentación común en una experiencia interactiva y memorable. Videos incorporados, gráficos dinámicos, formularios y la IA avanzada de Gamma forman parte de este arsenal."
  ),
  textStep(
    "Incorporando Medios Externos con Embeds",
    "Una de las funcionalidades más distintivas de Gamma es la capacidad de incorporar contenido externo directamente en las tarjetas — videos de YouTube, gráficos de Google Sheets, formularios, mapas, tweets y mucho más. El contenido aparece renderizado y funcional dentro de la presentación, sin necesidad de salir de ella."
  ),
  quizStep(
    "Quiz: Embeds",
    "¿Por qué incorporar videos y gráficos directamente en la presentación es más eficiente que enlazar hacia afuera?",
    [
      "Porque el espectador ve e interactúa con el contenido sin salir de la presentación — manteniendo el flujo de la narrativa y eliminando el riesgo de perder a la audiencia en una pestaña diferente",
      "Porque los enlaces externos nunca funcionan en presentaciones en vivo",
      "Los embeds solo funcionan en planes pagos de Gamma",
      "No hay diferencia práctica entre un embed y un enlace externo"
    ],
    0,
    "Porque el espectador ve e interactúa con el contenido sin salir de la presentación — manteniendo el flujo de la narrativa y eliminando el riesgo de perder a la audiencia en una pestaña diferente."
  ),
  textStep(
    "Creando Gráficos y Visualizaciones de Datos",
    "Gamma puede generar gráficos directamente a partir de tus datos — describes la información o pegas los números y él crea la visualización ideal. Barras, líneas, pastel y tablas se generan automáticamente con el estilo visual de la presentación."
  ),
  fillStep(
    "Ejercicio: ¡Visualiza tus datos!",
    "Rellena el espacio — ¡Visualiza tus datos!",
    "Para crear un gráfico en Gamma: usa el comando ___ para insertar un nuevo elemento, elige el tipo ___ deseado, ingresa tus ___ o describe la información para que la IA genere automáticamente, ajusta ___ y ___ para mantener consistencia con el resto de la presentación y posiciona el gráfico en el ___ de la tarjeta.",
    ["/", "Gráfico", "datos", "colores", "leyendas", "lugar ideal"],
    ["/", "Gráfico", "datos", "colores", "leyendas", "lugar ideal"],
    "Para crear un gráfico en Gamma: usa el comando / para insertar un nuevo elemento, elige el tipo Gráfico deseado, ingresa tus datos o describe la información para que la IA genere automáticamente, ajusta colores y leyendas para mantener consistencia con el resto de la presentación y posiciona el gráfico en el lugar ideal de la tarjeta."
  ),
  textStep(
    "El Gamma Agent — IA Conversacional para Edición",
    "El Gamma Agent es la IA conversacional integrada en la plataforma. En lugar de editar tarjeta por tarjeta, conversas con el Agent y pides cambios en lenguaje natural — \"añade una diapositiva sobre ROI después de la tercera tarjeta\", \"reescribe toda la presentación con un tono más informal\", \"genera imágenes para todas las diapositivas que aún no tienen\"."
  ),
  fillStep(
    "Ejercicio: ¡Usa el Gamma Agent!",
    "Rellena el espacio — ¡Usa el Gamma Agent!",
    "Para activar el Gamma Agent: haz clic en el ícono de ___ en el panel lateral, describe el cambio que quieres hacer en ___ natural, como '___ la segunda diapositiva con más datos sobre el mercado' o '___ el tono de toda la presentación para más ___', y el Agent aplica los cambios en ___ real.",
    ["IA", "lenguaje", "Profundiza", "Cambia", "conversacional", "tiempo"],
    ["IA", "lenguaje", "Profundiza", "Cambia", "conversacional", "tiempo"],
    "Para activar el Gamma Agent: haz clic en el ícono de IA en el panel lateral, describe el cambio que quieres hacer en lenguaje natural, como 'Profundiza la segunda diapositiva con más datos sobre el mercado' o 'Cambia el tono de toda la presentación para más conversacional', y el Agent aplica los cambios en tiempo real."
  ),
  textStep(
    "Rediseño con Un Clic",
    "Gamma permite rediseñar toda la presentación visualmente con un solo clic — manteniendo el contenido intacto pero aplicando una nueva identidad visual completa. Es ideal para cuando quieres probar diferentes estilos antes de compartir con el cliente o la audiencia."
  ),
  quizStep(
    "Quiz: Rediseño",
    "¿Por qué el rediseño con un clic es estratégico antes de presentaciones importantes?",
    [
      "Para impresionar a la audiencia con una presentación diferente de la versión de práctica",
      "Porque el contenido cambia junto con el visual en cada rediseño",
      "Porque puedes probar diferentes estilos visuales en segundos y elegir el que mejor comunica para esa audiencia específica — sin recrear ningún contenido",
      "El rediseño solo funciona en presentaciones con menos de 10 diapositivas"
    ],
    2,
    "Porque puedes probar diferentes estilos visuales en segundos y elegir el que mejor comunica para esa audiencia específica — sin recrear ningún contenido."
  ),
  textStep(
    "Conclusión",
    "Las características avanzadas de Gamma transforman presentaciones estáticas en experiencias interactivas. Embeds de medios, gráficos de datos, el Gamma Agent y el rediseño con un clic son los diferenciadores que colocan a la plataforma en otro nivel en comparación con herramientas tradicionales. Dominar estas características es lo que separa a quienes usan Gamma a nivel básico de quienes realmente extraen su potencial completo. Incorpora medios. Visualiza datos. Rediseña con intención.\n\nLección completada ✓"
  )
] as const;

export const GAMMA_MODULE_4_STEPS_FR = [
  textStep(
    "Fonctionnalités Avancées de Gamma — IA, Embeds et Interactivité",
    "Bienvenue ! Dans cette leçon, vous explorerez les fonctionnalités les plus puissantes de Gamma — celles qui transforment une présentation commune en une expérience interactive et mémorable. Vidéos intégrées, graphiques dynamiques, formulaires et l'IA avancée de Gamma font partie de cet arsenal."
  ),
  textStep(
    "Intégrer des Médias Externes avec des Embeds",
    "L'une des fonctionnalités les plus distinctives de Gamma est la capacité d'intégrer du contenu externe directement dans les cartes — vidéos YouTube, graphiques Google Sheets, formulaires, cartes, tweets et bien plus. Le contenu apparaît rendu et fonctionnel dans la présentation, sans avoir besoin de la quitter."
  ),
  quizStep(
    "Quiz : Embeds",
    "Pourquoi intégrer des vidéos et graphiques directement dans la présentation est-il plus efficace que de créer un lien vers l'extérieur ?",
    [
      "Parce que le spectateur voit et interagit avec le contenu sans quitter la présentation — maintenant le flux narratif et éliminant le risque de perdre l'audience dans un onglet différent",
      "Parce que les liens externes ne fonctionnent jamais dans les présentations en direct",
      "Les embeds ne fonctionnent que dans les plans payants de Gamma",
      "Il n'y a pas de différence pratique entre un embed et un lien externe"
    ],
    0,
    "Parce que le spectateur voit et interagit avec le contenu sans quitter la présentation — maintenant le flux narratif et éliminant le risque de perdre l'audience dans un onglet différent."
  ),
  textStep(
    "Créer des Graphiques et Visualisations de Données",
    "Gamma peut générer des graphiques directement à partir de vos données — vous décrivez les informations ou collez les chiffres et il crée la visualisation idéale. Barres, lignes, camembert et tableaux sont générés automatiquement avec le style visuel de la présentation."
  ),
  fillStep(
    "Exercice : Visualisez vos données !",
    "Remplissez le blanc — Visualisez vos données !",
    "Pour créer un graphique dans Gamma : utilisez la commande ___ pour insérer un nouvel élément, choisissez le type ___ souhaité, entrez vos ___ ou décrivez les informations pour que l'IA génère automatiquement, ajustez ___ et ___ pour maintenir la cohérence avec le reste de la présentation et positionnez le graphique à l'___ de la carte.",
    ["/", "Graphique", "données", "couleurs", "légendes", "emplacement idéal"],
    ["/", "Graphique", "données", "couleurs", "légendes", "emplacement idéal"],
    "Pour créer un graphique dans Gamma : utilisez la commande / pour insérer un nouvel élément, choisissez le type Graphique souhaité, entrez vos données ou décrivez les informations pour que l'IA génère automatiquement, ajustez couleurs et légendes pour maintenir la cohérence avec le reste de la présentation et positionnez le graphique à l'emplacement idéal de la carte."
  ),
  textStep(
    "Le Gamma Agent — IA Conversationnelle pour l'Édition",
    "Le Gamma Agent est l'IA conversationnelle intégrée à la plateforme. Au lieu d'éditer carte par carte, vous conversez avec l'Agent et demandez des changements en langage naturel — \"ajoutez une diapositive sur le ROI après la troisième carte\", \"réécrivez toute la présentation avec un ton plus informel\", \"générez des images pour toutes les diapositives qui n'en ont pas encore\"."
  ),
  fillStep(
    "Exercice : Utilisez le Gamma Agent !",
    "Remplissez le blanc — Utilisez le Gamma Agent !",
    "Pour activer le Gamma Agent : cliquez sur l'icône d'___ dans le panneau latéral, décrivez le changement que vous voulez faire en ___ naturel, comme '___ la deuxième diapositive avec plus de données sur le marché' ou '___ le ton de toute la présentation pour plus ___', et l'Agent applique les changements en ___ réel.",
    ["IA", "langage", "Approfondissez", "Changez", "conversationnel", "temps"],
    ["IA", "langage", "Approfondissez", "Changez", "conversationnel", "temps"],
    "Pour activer le Gamma Agent : cliquez sur l'icône d'IA dans le panneau latéral, décrivez le changement que vous voulez faire en langage naturel, comme 'Approfondissez la deuxième diapositive avec plus de données sur le marché' ou 'Changez le ton de toute la présentation pour plus conversationnel', et l'Agent applique les changements en temps réel."
  ),
  textStep(
    "Redesign en Un Clic",
    "Gamma permet de redesigner visuellement toute la présentation en un seul clic — en gardant le contenu intact mais en appliquant une nouvelle identité visuelle complète. C'est idéal lorsque vous voulez tester différents styles avant de partager avec le client ou l'audience."
  ),
  quizStep(
    "Quiz : Redesign",
    "Pourquoi le redesign en un clic est-il stratégique avant des présentations importantes ?",
    [
      "Pour impressionner l'audience avec une présentation différente de la version d'entraînement",
      "Parce que le contenu change avec le visuel à chaque redesign",
      "Parce que vous pouvez tester différents styles visuels en quelques secondes et choisir celui qui communique le mieux pour cette audience spécifique — sans recréer aucun contenu",
      "Le redesign ne fonctionne que sur les présentations de moins de 10 diapositives"
    ],
    2,
    "Parce que vous pouvez tester différents styles visuels en quelques secondes et choisir celui qui communique le mieux pour cette audience spécifique — sans recréer aucun contenu."
  ),
  textStep(
    "Conclusion",
    "Les fonctionnalités avancées de Gamma transforment les présentations statiques en expériences interactives. Les embeds de médias, graphiques de données, le Gamma Agent et le redesign en un clic sont les différenciateurs qui placent la plateforme à un autre niveau par rapport aux outils traditionnels. Maîtriser ces fonctionnalités est ce qui sépare ceux qui utilisent Gamma au niveau de base de ceux qui en extraient vraiment tout le potentiel. Intégrez des médias. Visualisez des données. Redesignez avec intention.\n\nLeçon terminée ✓"
  )
] as const;
