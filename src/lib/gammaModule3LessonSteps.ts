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

export const GAMMA_MODULE_3_STEPS_PT = [
  textStep(
    "Editando e Personalizando sua Apresentação no Gamma",
    "Bem-vindo de volta! Nesta lição, você vai dominar a edição no Gamma — ajustando conteúdo, reorganizando cards, refinando o visual e usando a IA para melhorar cada slide até chegar no resultado que você realmente quer."
  ),
  textStep(
    "Editando Conteúdo Diretamente nos Cards",
    "Clicar em qualquer texto dentro de um card ativa o modo de edição direta — você pode reescrever, reformatar e ajustar o conteúdo como em um editor de texto comum. O Gamma também oferece atalhos rápidos com o comando \"/\" para inserir novos elementos como listas, citações, botões e separadores."
  ),
  fillStep(
    "Exercício: Edite com precisão!",
    "Preencha a lacuna — Edite com precisão!",
    "Para editar um card no Gamma: clique no ___ que deseja modificar, selecione o texto e ___ diretamente, use o comando ___ para inserir novos elementos como listas ou imagens, e use as opções de ___ do painel lateral para ajustar tamanho, alinhamento e ___ do conteúdo.",
    ["card", "reescreva", "/", "formatação", "espaçamento"],
    ["card", "reescreva", "/", "formatação", "espaçamento"],
    "Para editar um card no Gamma: clique no card que deseja modificar, selecione o texto e reescreva diretamente, use o comando / para inserir novos elementos como listas ou imagens, e use as opções de formatação do painel lateral para ajustar tamanho, alinhamento e espaçamento do conteúdo."
  ),
  textStep(
    "Usando a IA para Refinar o Conteúdo",
    "O Gamma tem um assistente de IA integrado que permite melhorar qualquer card sem sair da plataforma. Você pode pedir para a IA expandir um tópico, resumir um texto longo, mudar o tom ou reescrever uma seção inteira com uma instrução em linguagem natural."
  ),
  quizStep(
    "Quiz: IA na Edição",
    "Qual comando de IA dentro do Gamma é mais útil para melhorar uma apresentação existente?",
    [
      "Pedir para a IA gerar uma apresentação completamente nova do zero",
      "Usar apenas os templates sem envolver a IA na edição",
      "Selecionar um card específico, clicar em Editar com IA e dar uma instrução precisa — como \"torne este slide mais direto e reduz para 3 tópicos\" — para refinar sem perder o contexto do restante da apresentação",
      "A IA só pode ser usada na criação inicial, não na edição"
    ],
    2,
    "Selecionar um card específico, clicar em Editar com IA e dar uma instrução precisa — como \"torne este slide mais direto e reduz para 3 tópicos\" — para refinar sem perder o contexto do restante da apresentação."
  ),
  textStep(
    "Reorganizando e Adicionando Cards",
    "Você pode arrastar e soltar qualquer card para reorganizar a ordem da apresentação. Novos cards podem ser adicionados entre os existentes com um clique no botão \"+\" que aparece entre os cards — mantendo o fluxo visual e narrativo sem precisar recomeçar."
  ),
  quizStep(
    "Quiz: Reorganização",
    "Por que reorganizar cards é mais eficiente no Gamma do que reorganizar slides no PowerPoint?",
    [
      "Porque o Gamma tem menos slides do que apresentações tradicionais",
      "Porque reorganizar no PowerPoint é impossível sem perder formatação",
      "Porque o sistema de drag and drop do Gamma é visual e instantâneo — você vê o resultado em tempo real sem precisar recortar, colar e realinhar elementos que perderam a formatação original",
      "Não há diferença prática entre reorganizar no Gamma e no PowerPoint"
    ],
    2,
    "Porque o sistema de drag and drop do Gamma é visual e instantâneo — você vê o resultado em tempo real sem precisar recortar, colar e realinhar elementos que perderam a formatação original."
  ),
  textStep(
    "Trocando e Gerando Imagens",
    "Cada card pode ter uma imagem gerada pela IA do Gamma ou importada do seu computador. Para trocar uma imagem, basta clicar nela e escolher entre gerar uma nova com IA, fazer upload ou buscar em um banco de imagens integrado. As imagens geradas pela IA se adaptam ao tema visual da apresentação."
  ),
  fillStep(
    "Exercício: Gerencie as imagens!",
    "Preencha a lacuna — Gerencie as imagens!",
    "Para trocar uma imagem no Gamma: clique na ___ existente, selecione ___ para criar uma nova com IA descrevendo o que quer ver, ___ uma imagem do seu computador ou busque no ___ integrado. Sempre verifique se a imagem está ___ com o conteúdo do card antes de confirmar.",
    ["imagem", "Gerar com IA", "importe", "banco de imagens", "alinhada"],
    ["imagem", "Gerar com IA", "importe", "banco de imagens", "alinhada"],
    "Para trocar uma imagem no Gamma: clique na imagem existente, selecione Gerar com IA para criar uma nova com IA descrevendo o que quer ver, importe uma imagem do seu computador ou busque no banco de imagens integrado. Sempre verifique se a imagem está alinhada com o conteúdo do card antes de confirmar."
  ),
  textStep(
    "Conclusão",
    "Editar no Gamma é intuitivo e rápido — especialmente quando você combina edição direta com os refinamentos via IA. A chave é trabalhar card por card, ajustando conteúdo e visual progressivamente até que cada slide comunique exatamente o que precisa. O resultado final não é apenas uma apresentação bonita — é uma apresentação que funciona. Edite com precisão. Refine com IA. Apresente com confiança.\n\nLição concluída ✓"
  )
] as const;

export const GAMMA_MODULE_3_STEPS_EN = [
  textStep(
    "Editing and Customizing Your Presentation in Gamma",
    "Welcome back! In this lesson, you'll master editing in Gamma — adjusting content, reorganizing cards, refining the visual, and using AI to improve each slide until you get the result you really want."
  ),
  textStep(
    "Editing Content Directly in Cards",
    "Clicking on any text within a card activates direct editing mode — you can rewrite, reformat, and adjust content as in a common text editor. Gamma also offers quick shortcuts with the \"/\" command to insert new elements like lists, quotes, buttons, and dividers."
  ),
  fillStep(
    "Exercise: Edit with precision!",
    "Fill in the blank — Edit with precision!",
    "To edit a card in Gamma: click on the ___ you want to modify, select the text and ___ directly, use the ___ command to insert new elements like lists or images, and use the ___ options from the side panel to adjust size, alignment, and ___ of the content.",
    ["card", "rewrite", "/", "formatting", "spacing"],
    ["card", "rewrite", "/", "formatting", "spacing"],
    "To edit a card in Gamma: click on the card you want to modify, select the text and rewrite directly, use the / command to insert new elements like lists or images, and use the formatting options from the side panel to adjust size, alignment, and spacing of the content."
  ),
  textStep(
    "Using AI to Refine Content",
    "Gamma has an integrated AI assistant that allows you to improve any card without leaving the platform. You can ask the AI to expand a topic, summarize a long text, change the tone, or rewrite an entire section with a natural language instruction."
  ),
  quizStep(
    "Quiz: AI in Editing",
    "Which AI command within Gamma is most useful for improving an existing presentation?",
    [
      "Ask the AI to generate a completely new presentation from scratch",
      "Use only templates without involving AI in editing",
      "Select a specific card, click Edit with AI, and give a precise instruction — like \"make this slide more direct and reduce to 3 topics\" — to refine without losing context of the rest of the presentation",
      "AI can only be used in initial creation, not in editing"
    ],
    2,
    "Select a specific card, click Edit with AI, and give a precise instruction — like \"make this slide more direct and reduce to 3 topics\" — to refine without losing context of the rest of the presentation."
  ),
  textStep(
    "Reorganizing and Adding Cards",
    "You can drag and drop any card to reorganize the presentation order. New cards can be added between existing ones with a click on the \"+\" button that appears between cards — maintaining visual and narrative flow without needing to start over."
  ),
  quizStep(
    "Quiz: Reorganization",
    "Why is reorganizing cards more efficient in Gamma than reorganizing slides in PowerPoint?",
    [
      "Because Gamma has fewer slides than traditional presentations",
      "Because reorganizing in PowerPoint is impossible without losing formatting",
      "Because Gamma's drag and drop system is visual and instant — you see the result in real time without needing to cut, paste, and realign elements that lost their original formatting",
      "There is no practical difference between reorganizing in Gamma and PowerPoint"
    ],
    2,
    "Because Gamma's drag and drop system is visual and instant — you see the result in real time without needing to cut, paste, and realign elements that lost their original formatting."
  ),
  textStep(
    "Changing and Generating Images",
    "Each card can have an image generated by Gamma's AI or imported from your computer. To change an image, just click on it and choose between generating a new one with AI, uploading, or searching in an integrated image bank. AI-generated images adapt to the presentation's visual theme."
  ),
  fillStep(
    "Exercise: Manage images!",
    "Fill in the blank — Manage images!",
    "To change an image in Gamma: click on the existing ___, select ___ to create a new one with AI describing what you want to see, ___ an image from your computer, or search in the integrated ___. Always check if the image is ___ with the card content before confirming.",
    ["image", "Generate with AI", "import", "image bank", "aligned"],
    ["image", "Generate with AI", "import", "image bank", "aligned"],
    "To change an image in Gamma: click on the existing image, select Generate with AI to create a new one with AI describing what you want to see, import an image from your computer, or search in the integrated image bank. Always check if the image is aligned with the card content before confirming."
  ),
  textStep(
    "Conclusion",
    "Editing in Gamma is intuitive and fast — especially when you combine direct editing with AI refinements. The key is to work card by card, progressively adjusting content and visual until each slide communicates exactly what it needs to. The final result is not just a beautiful presentation — it's a presentation that works. Edit with precision. Refine with AI. Present with confidence.\n\nLesson complete ✓"
  )
] as const;

export const GAMMA_MODULE_3_STEPS_ES = [
  textStep(
    "Editando y Personalizando tu Presentación en Gamma",
    "¡Bienvenido de nuevo! En esta lección, dominarás la edición en Gamma — ajustando contenido, reorganizando tarjetas, refinando el visual y usando la IA para mejorar cada diapositiva hasta llegar al resultado que realmente quieres."
  ),
  textStep(
    "Editando Contenido Directamente en las Tarjetas",
    "Hacer clic en cualquier texto dentro de una tarjeta activa el modo de edición directa — puedes reescribir, reformatear y ajustar el contenido como en un editor de texto común. Gamma también ofrece atajos rápidos con el comando \"/\" para insertar nuevos elementos como listas, citas, botones y separadores."
  ),
  fillStep(
    "Ejercicio: ¡Edita con precisión!",
    "Rellena el espacio — ¡Edita con precisión!",
    "Para editar una tarjeta en Gamma: haz clic en la ___ que deseas modificar, selecciona el texto y ___ directamente, usa el comando ___ para insertar nuevos elementos como listas o imágenes, y usa las opciones de ___ del panel lateral para ajustar tamaño, alineación y ___ del contenido.",
    ["tarjeta", "reescribe", "/", "formateo", "espaciado"],
    ["tarjeta", "reescribe", "/", "formateo", "espaciado"],
    "Para editar una tarjeta en Gamma: haz clic en la tarjeta que deseas modificar, selecciona el texto y reescribe directamente, usa el comando / para insertar nuevos elementos como listas o imágenes, y usa las opciones de formateo del panel lateral para ajustar tamaño, alineación y espaciado del contenido."
  ),
  textStep(
    "Usando la IA para Refinar el Contenido",
    "Gamma tiene un asistente de IA integrado que permite mejorar cualquier tarjeta sin salir de la plataforma. Puedes pedir a la IA que expanda un tópico, resuma un texto largo, cambie el tono o reescriba una sección entera con una instrucción en lenguaje natural."
  ),
  quizStep(
    "Quiz: IA en la Edición",
    "¿Qué comando de IA dentro de Gamma es más útil para mejorar una presentación existente?",
    [
      "Pedir a la IA que genere una presentación completamente nueva desde cero",
      "Usar solo las plantillas sin involucrar la IA en la edición",
      "Seleccionar una tarjeta específica, hacer clic en Editar con IA y dar una instrucción precisa — como \"haz esta diapositiva más directa y reduce a 3 tópicos\" — para refinar sin perder el contexto del resto de la presentación",
      "La IA solo puede ser usada en la creación inicial, no en la edición"
    ],
    2,
    "Seleccionar una tarjeta específica, hacer clic en Editar con IA y dar una instrucción precisa — como \"haz esta diapositiva más directa y reduce a 3 tópicos\" — para refinar sin perder el contexto del resto de la presentación."
  ),
  textStep(
    "Reorganizando y Añadiendo Tarjetas",
    "Puedes arrastrar y soltar cualquier tarjeta para reorganizar el orden de la presentación. Nuevas tarjetas pueden ser añadidas entre las existentes con un clic en el botón \"+\" que aparece entre las tarjetas — manteniendo el flujo visual y narrativo sin necesidad de empezar de nuevo."
  ),
  quizStep(
    "Quiz: Reorganización",
    "¿Por qué reorganizar tarjetas es más eficiente en Gamma que reorganizar diapositivas en PowerPoint?",
    [
      "Porque Gamma tiene menos diapositivas que presentaciones tradicionales",
      "Porque reorganizar en PowerPoint es imposible sin perder formateo",
      "Porque el sistema de arrastrar y soltar de Gamma es visual e instantáneo — ves el resultado en tiempo real sin necesidad de cortar, pegar y realinear elementos que perdieron su formateo original",
      "No hay diferencia práctica entre reorganizar en Gamma y PowerPoint"
    ],
    2,
    "Porque el sistema de arrastrar y soltar de Gamma es visual e instantáneo — ves el resultado en tiempo real sin necesidad de cortar, pegar y realinear elementos que perdieron su formateo original."
  ),
  textStep(
    "Cambiando y Generando Imágenes",
    "Cada tarjeta puede tener una imagen generada por la IA de Gamma o importada de tu computadora. Para cambiar una imagen, solo haz clic en ella y elige entre generar una nueva con IA, subir o buscar en un banco de imágenes integrado. Las imágenes generadas por IA se adaptan al tema visual de la presentación."
  ),
  fillStep(
    "Ejercicio: ¡Gestiona las imágenes!",
    "Rellena el espacio — ¡Gestiona las imágenes!",
    "Para cambiar una imagen en Gamma: haz clic en la ___ existente, selecciona ___ para crear una nueva con IA describiendo lo que quieres ver, ___ una imagen de tu computadora o busca en el ___ integrado. Siempre verifica si la imagen está ___ con el contenido de la tarjeta antes de confirmar.",
    ["imagen", "Generar con IA", "importa", "banco de imágenes", "alineada"],
    ["imagen", "Generar con IA", "importa", "banco de imágenes", "alineada"],
    "Para cambiar una imagen en Gamma: haz clic en la imagen existente, selecciona Generar con IA para crear una nueva con IA describiendo lo que quieres ver, importa una imagen de tu computadora o busca en el banco de imágenes integrado. Siempre verifica si la imagen está alineada con el contenido de la tarjeta antes de confirmar."
  ),
  textStep(
    "Conclusión",
    "Editar en Gamma es intuitivo y rápido — especialmente cuando combinas edición directa con los refinamientos vía IA. La clave es trabajar tarjeta por tarjeta, ajustando contenido y visual progresivamente hasta que cada diapositiva comunique exactamente lo que necesita. El resultado final no es solo una presentación bonita — es una presentación que funciona. Edita con precisión. Refina con IA. Presenta con confianza.\n\nLección completada ✓"
  )
] as const;

export const GAMMA_MODULE_3_STEPS_FR = [
  textStep(
    "Éditer et Personnaliser votre Présentation dans Gamma",
    "Bienvenue ! Dans cette leçon, vous maîtriserez l'édition dans Gamma — ajustant le contenu, réorganisant les cartes, affinant le visuel et utilisant l'IA pour améliorer chaque diapositive jusqu'à obtenir le résultat que vous voulez vraiment."
  ),
  textStep(
    "Éditer le Contenu Directement dans les Cartes",
    "Cliquer sur n'importe quel texte dans une carte active le mode d'édition directe — vous pouvez réécrire, reformater et ajuster le contenu comme dans un éditeur de texte commun. Gamma offre également des raccourcis rapides avec la commande \"/\" pour insérer de nouveaux éléments comme des listes, citations, boutons et séparateurs."
  ),
  fillStep(
    "Exercice : Éditez avec précision !",
    "Remplissez le blanc — Éditez avec précision !",
    "Pour éditer une carte dans Gamma : cliquez sur la ___ que vous souhaitez modifier, sélectionnez le texte et ___ directement, utilisez la commande ___ pour insérer de nouveaux éléments comme des listes ou images, et utilisez les options de ___ du panneau latéral pour ajuster la taille, l'alignement et l'___ du contenu.",
    ["carte", "réécrivez", "/", "formatage", "espacement"],
    ["carte", "réécrivez", "/", "formatage", "espacement"],
    "Pour éditer une carte dans Gamma : cliquez sur la carte que vous souhaitez modifier, sélectionnez le texte et réécrivez directement, utilisez la commande / pour insérer de nouveaux éléments comme des listes ou images, et utilisez les options de formatage du panneau latéral pour ajuster la taille, l'alignement et l'espacement du contenu."
  ),
  textStep(
    "Utiliser l'IA pour Affiner le Contenu",
    "Gamma a un assistant IA intégré qui permet d'améliorer n'importe quelle carte sans quitter la plateforme. Vous pouvez demander à l'IA d'élargir un sujet, résumer un texte long, changer le ton ou réécrire une section entière avec une instruction en langage naturel."
  ),
  quizStep(
    "Quiz : IA dans l'Édition",
    "Quelle commande IA dans Gamma est la plus utile pour améliorer une présentation existante ?",
    [
      "Demander à l'IA de générer une présentation complètement nouvelle de zéro",
      "Utiliser uniquement les modèles sans impliquer l'IA dans l'édition",
      "Sélectionner une carte spécifique, cliquer sur Éditer avec l'IA et donner une instruction précise — comme \"rendez cette diapositive plus directe et réduisez à 3 sujets\" — pour affiner sans perdre le contexte du reste de la présentation",
      "L'IA ne peut être utilisée que dans la création initiale, pas dans l'édition"
    ],
    2,
    "Sélectionner une carte spécifique, cliquer sur Éditer avec l'IA et donner une instruction précise — comme \"rendez cette diapositive plus directe et réduisez à 3 sujets\" — pour affiner sans perdre le contexte du reste de la présentation."
  ),
  textStep(
    "Réorganiser et Ajouter des Cartes",
    "Vous pouvez glisser-déposer n'importe quelle carte pour réorganiser l'ordre de la présentation. De nouvelles cartes peuvent être ajoutées entre les existantes avec un clic sur le bouton \"+\" qui apparaît entre les cartes — maintenant le flux visuel et narratif sans avoir besoin de recommencer."
  ),
  quizStep(
    "Quiz : Réorganisation",
    "Pourquoi réorganiser les cartes est-il plus efficace dans Gamma que réorganiser les diapositives dans PowerPoint ?",
    [
      "Parce que Gamma a moins de diapositives que les présentations traditionnelles",
      "Parce que réorganiser dans PowerPoint est impossible sans perdre le formatage",
      "Parce que le système de glisser-déposer de Gamma est visuel et instantané — vous voyez le résultat en temps réel sans avoir besoin de couper, coller et réaligner les éléments qui ont perdu leur formatage original",
      "Il n'y a pas de différence pratique entre réorganiser dans Gamma et PowerPoint"
    ],
    2,
    "Parce que le système de glisser-déposer de Gamma est visuel et instantané — vous voyez le résultat en temps réel sans avoir besoin de couper, coller et réaligner les éléments qui ont perdu leur formatage original."
  ),
  textStep(
    "Changer et Générer des Images",
    "Chaque carte peut avoir une image générée par l'IA de Gamma ou importée de votre ordinateur. Pour changer une image, il suffit de cliquer dessus et de choisir entre générer une nouvelle avec l'IA, télécharger ou chercher dans une banque d'images intégrée. Les images générées par l'IA s'adaptent au thème visuel de la présentation."
  ),
  fillStep(
    "Exercice : Gérez les images !",
    "Remplissez le blanc — Gérez les images !",
    "Pour changer une image dans Gamma : cliquez sur l'___ existante, sélectionnez ___ pour créer une nouvelle avec l'IA en décrivant ce que vous voulez voir, ___ une image de votre ordinateur ou cherchez dans la ___ intégrée. Vérifiez toujours si l'image est ___ avec le contenu de la carte avant de confirmer.",
    ["image", "Générer avec l'IA", "importez", "banque d'images", "alignée"],
    ["image", "Générer avec l'IA", "importez", "banque d'images", "alignée"],
    "Pour changer une image dans Gamma : cliquez sur l'image existante, sélectionnez Générer avec l'IA pour créer une nouvelle avec l'IA en décrivant ce que vous voulez voir, importez une image de votre ordinateur ou cherchez dans la banque d'images intégrée. Vérifiez toujours si l'image est alignée avec le contenu de la carte avant de confirmer."
  ),
  textStep(
    "Conclusion",
    "Éditer dans Gamma est intuitif et rapide — surtout lorsque vous combinez édition directe avec les affinements via l'IA. La clé est de travailler carte par carte, ajustant progressivement le contenu et le visuel jusqu'à ce que chaque diapositive communique exactement ce qu'elle doit. Le résultat final n'est pas seulement une belle présentation — c'est une présentation qui fonctionne. Éditez avec précision. Affinez avec l'IA. Présentez avec confiance.\n\nLeçon terminée ✓"
  )
] as const;
