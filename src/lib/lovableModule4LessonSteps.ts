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

export const LOVABLE_MODULE_4_STEPS_PT = [
  textStep(
    "Trabalhando com Importacoes de Design no Lovable",
    "Bem-vindo de volta! Nesta licao, voce vai aprender como importar designs existentes para o Lovable, transformando layouts do Figma, referencias visuais e prototipos em aplicativos funcionais sem precisar construir tudo do zero pelo chat."
  ),
  textStep(
    "Por que Importar Designs e um Superpoder",
    "Construir um app pelo chat ja e poderoso. Mas quando voce ja tem um design pronto, importar essa base acelera muito o processo. Uma imagem comunica proporcoes, tipografia, cores e composicao com muito menos ambiguidade do que uma descricao longa em texto."
  ),
  textStep(
    "Importando do Figma",
    "O Lovable possui integracao direta com o Figma. Ao receber um link, ele interpreta a estrutura visual do layout, entende hierarquia, espacamentos, tipografia e componentes e transforma isso em interface funcional."
  ),
  fillStep(
    "Preencha a lacuna - Importe do Figma!",
    "Monte o fluxo correto para importar um layout do Figma.",
    "\"Para importar do Figma no Lovable: abra seu arquivo no Figma, selecione o ___ ou ___ que quer importar, clique com o botao direito e copie o ___ do elemento, cole o link no ___ do Lovable com a instrucao de importar e aguarde o Lovable ___ o design em codigo HTML e CSS funcional.\"",
    [
      "frame",
      "componente",
      "link de compartilhamento",
      "chat",
      "converter"
    ],
    [
      "frame",
      "componente",
      "link de compartilhamento",
      "chat",
      "converter",
      "arquivo zipado",
      "painel lateral",
      "ignorar"
    ],
    "A importacao funciona melhor quando voce aponta exatamente o elemento visual certo e entrega o link no contexto da conversa."
  ),
  textStep(
    "Preparando o Figma para Importacao",
    "Nem todo arquivo do Figma importa com a mesma qualidade. Nomear bem as camadas, organizar componentes e manter estilos consistentes ajuda o Lovable a gerar codigo mais semantico, reutilizavel e facil de adaptar depois."
  ),
  fillStep(
    "Preencha a lacuna - Prepare o Figma!",
    "Monte um checklist de preparacao do arquivo antes de importar.",
    "\"Para uma importacao de qualidade, certifique-se de que seu arquivo no Figma tem: ___ bem nomeadas para cada tela, componentes ___ com nomes claros como Button, Card e Header, ___ de cores e fontes definidos como estilos globais, elementos ___ em grupos logicos e ___ de imagem corretamente linkados aos assets.\"",
    [
      "frames",
      "organizados",
      "estilos",
      "agrupados",
      "recursos"
    ],
    [
      "frames",
      "organizados",
      "estilos",
      "agrupados",
      "recursos",
      "duplicados",
      "campos aleatorios",
      "comentarios"
    ],
    "Quanto mais limpo e organizado estiver o arquivo de design, mais facil fica para o Lovable interpretar a funcao de cada parte."
  ),
  textStep(
    "Importando Referencias Visuais como Imagem",
    "Voce nao precisa depender apenas do Figma. Screenshots, mockups e referencias visuais tambem podem ser enviados direto no chat. Isso ajuda muito quando a composicao visual e dificil de explicar apenas com palavras."
  ),
  fillStep(
    "Preencha a lacuna - Importe via imagem!",
    "Monte um pedido claro para usar uma imagem como referencia visual.",
    "\"Para importar uma referencia visual: ___ a imagem diretamente no chat do Lovable, acompanhe com uma instrucao como '___ uma interface similar a esta imagem, adaptando para o meu projeto ___' e especifique quais elementos voce quer ___ e quais pode ___ para se adequar melhor ao seu contexto.\"",
    [
      "arraste e solte ou anexe",
      "crie",
      "AgendaPro",
      "manter",
      "adaptar"
    ],
    [
      "arraste e solte ou anexe",
      "crie",
      "AgendaPro",
      "manter",
      "adaptar",
      "remover tudo",
      "duplicar",
      "ignorar"
    ],
    "Ao usar imagem como referencia, o ganho vem de combinar o visual desejado com instrucoes claras sobre o que deve continuar e o que pode mudar."
  ),
  textStep(
    "Combinando Importacao com Adaptacao",
    "Importar um design nao significa copiar exatamente cada detalhe. O mais poderoso e usar a referencia como base e adaptar o resultado ao contexto real do seu produto, com suas cores, textos, funcoes e fluxo."
  ),
  fillStep(
    "Preencha a lacuna - Adapte ao importar!",
    "Monte um pedido que use a referencia visual sem copiar tudo literalmente.",
    "\"Use este design como ___ mas faca as seguintes adaptacoes: mude a paleta de cores para ___ e ___ que sao as cores do meu projeto, substitua os textos de exemplo pelo ___ do AgendaPro, adapte os ___ para refletir as funcionalidades do meu aplicativo e mantenha a ___ geral e o ___ de layout que estao funcionando bem.\"",
    [
      "referencia visual",
      "azul escuro",
      "branco",
      "conteudo real",
      "labels dos botoes",
      "hierarquia visual",
      "sistema"
    ],
    [
      "referencia visual",
      "azul escuro",
      "branco",
      "conteudo real",
      "labels dos botoes",
      "hierarquia visual",
      "sistema",
      "aleatorio",
      "rodape"
    ],
    "A melhor importacao e aquela que preserva o que funciona no design de referencia, mas traduz isso para a identidade e para as necessidades do seu produto."
  ),
  textStep(
    "Importando Componentes Isolados",
    "Voce nao precisa reimportar uma tela inteira toda vez. Em muitos casos, importar um componente isolado, como um card, um formulario ou um menu, e mais seguro e mais eficiente porque preserva o que ja esta funcionando."
  ),
  fillStep(
    "Preencha a lacuna - Importe componentes!",
    "Monte um pedido para recriar um componente visual ja existente em uma referencia.",
    "\"Veja este ___ de card de agendamento nessa imagem. Recrie esse componente no meu projeto e use-o em ___ os lugares onde cards de agendamento aparecem. Mantenha a ___ e o ___ do restante do aplicativo e garanta que o componente se adapta ___ em telas de diferentes tamanhos.\"",
    [
      "design",
      "todos",
      "paleta de cores",
      "sistema de tipografia",
      "responsivamente"
    ],
    [
      "design",
      "todos",
      "paleta de cores",
      "sistema de tipografia",
      "responsivamente",
      "manualmente",
      "layout fixo",
      "rodape"
    ],
    "Importar componente por componente da mais controle sobre consistencia visual e reduz o risco de quebrar outras partes do app."
  ),
  textStep(
    "Usando Screenshots do Seu Proprio App",
    "Uma tecnica muito forte e tirar um screenshot do seu proprio app, anotar o que precisa mudar e devolver essa imagem ao Lovable. Isso elimina ambiguidade sobre qual elemento deve ser ajustado."
  ),
  fillStep(
    "Preencha a lacuna - Anote e reimporte!",
    "Monte um pedido usando screenshot anotado como guia de edicao.",
    "\"Veja este screenshot do AgendaPro com minhas ___. A seta vermelha indica onde o ___ deve ser maior, o circulo azul mostra o botao que precisa ser ___ para a direita e o texto em amarelo descreve a ___ de cor que quero no header. Aplique todas as mudancas ___ na imagem.\"",
    [
      "anotacoes visuais",
      "espacamento",
      "movido",
      "mudanca",
      "indicadas"
    ],
    [
      "anotacoes visuais",
      "espacamento",
      "movido",
      "mudanca",
      "indicadas",
      "aleatorias",
      "copiadas",
      "travadas"
    ],
    "Screenshots anotados funcionam muito bem porque mostram com precisao onde esta a mudanca e qual direcao visual voce quer."
  ),
  textStep(
    "Importando Sistemas de Design Completos",
    "Em projetos mais avancados, voce pode importar um sistema de design completo com cores, tipografia, espacamento e tokens visuais. Isso ajuda o Lovable a manter consistencia em todas as telas e componentes gerados."
  ),
  fillStep(
    "Preencha a lacuna - Importe o sistema!",
    "Monte um pedido para aplicar um guia visual inteiro ao app.",
    "\"Aqui esta o ___ de design do meu projeto com as seguintes definicoes: cor primaria ___, cor secundaria ___, fonte de titulo ___, fonte de corpo ___, espacamento base de ___ e raio de borda dos componentes de ___. Aplique esses ___ como padrao em todo o aplicativo, substituindo os valores atuais.\"",
    [
      "guia",
      "#1A3A5C",
      "#D4AF37",
      "Playfair Display",
      "Inter",
      "8px",
      "12px",
      "tokens de design"
    ],
    [
      "guia",
      "#1A3A5C",
      "#D4AF37",
      "Playfair Display",
      "Inter",
      "8px",
      "12px",
      "tokens de design",
      "gradiente aleatorio",
      "tamanho livre"
    ],
    "Quando os tokens sao definidos como padrao, o app inteiro passa a nascer com a mesma identidade visual."
  ),
  textStep(
    "Resolvendo Problemas Comuns na Importacao",
    "Se uma importacao vier imperfeita, o melhor caminho e corrigir por partes. Identifique o elemento que saiu errado, diga o que foi gerado e explique como ele deveria ter sido reproduzido. Isso funciona melhor do que tentar refazer tudo de uma vez."
  ),
  quizStep(
    "O erro mais comum em importacoes",
    "Qual e o erro mais comum ao trabalhar com importacoes de design no Lovable?",
    [
      "Importar designs muito simples que o Lovable poderia criar sozinho.",
      "Usar referencias visuais de aplicativos concorrentes.",
      "Importar um design complexo completo sem testar tela por tela.",
      "Misturar importacoes do Figma com referencias em imagem no mesmo projeto."
    ],
    2,
    "Quando a importacao e muito grande e algo sai errado, fica bem mais dificil localizar o problema e corrigir sem afetar partes que estavam certas."
  ),
  textStep(
    "Conclusao",
    "Importar designs no Lovable acelera desenvolvimento e aumenta precisao. Figma, imagens de referencia, componentes isolados, screenshots anotados e sistemas de design resolvem problemas diferentes e se completam muito bem. Quanto mais organizado for o material de entrada, melhor sera o resultado gerado.\n\nLicao concluida."
  ),
] as const;

export const LOVABLE_MODULE_4_STEPS_EN = [
  textStep(
    "Working with Design Imports in Lovable",
    "Welcome back! In this lesson, you will learn how to import existing designs into Lovable, turning Figma layouts, visual references, and prototypes into functional apps without rebuilding everything from scratch through chat."
  ),
  textStep(
    "Why Design Imports Are a Superpower",
    "Building through chat is already powerful. But when you already have a visual design, importing that base speeds everything up dramatically. An image communicates proportions, typography, colors, and composition with far less ambiguity than a long text description."
  ),
  textStep(
    "Importing from Figma",
    "Lovable has a direct integration with Figma. When it receives a link, it interprets the visual structure of the layout, understands hierarchy, spacing, typography, and components, and turns that into a functional interface."
  ),
  fillStep(
    "Fill in the blanks - Import from Figma!",
    "Build the correct flow for importing a layout from Figma.",
    "\"To import from Figma into Lovable: open your file in Figma, select the ___ or ___ you want to import, right-click and copy the element's ___, paste the link into the Lovable ___ with the import instruction, and wait for Lovable to ___ the design into functional HTML and CSS code.\"",
    [
      "frame",
      "component",
      "share link",
      "chat",
      "convert"
    ],
    [
      "frame",
      "component",
      "share link",
      "chat",
      "convert",
      "zipped file",
      "side panel",
      "ignore"
    ],
    "Import works best when you point to the exact visual element and provide the link inside the conversation context."
  ),
  textStep(
    "Preparing Figma for Import",
    "Not every Figma file imports with the same quality. Well-named layers, organized components, and consistent styles help Lovable generate cleaner, more semantic, and more reusable code."
  ),
  fillStep(
    "Fill in the blanks - Prepare the Figma file!",
    "Build a preparation checklist before importing.",
    "\"For a high-quality import, make sure your Figma file has: ___ clearly named for each screen, ___ components with clear names like Button, Card, and Header, color and font ___ defined as global styles, elements ___ into logical groups, and image ___ correctly linked to the assets.\"",
    [
      "frames",
      "organized",
      "styles",
      "grouped",
      "resources"
    ],
    [
      "frames",
      "organized",
      "styles",
      "grouped",
      "resources",
      "duplicates",
      "random fields",
      "comments"
    ],
    "The cleaner and more organized the design file is, the easier it is for Lovable to understand the role of each part."
  ),
  textStep(
    "Importing Visual References as Images",
    "You do not have to rely only on Figma. Screenshots, mockups, and visual references can also be sent directly in the chat. This is especially helpful when the visual composition is hard to explain in words."
  ),
  fillStep(
    "Fill in the blanks - Import through an image!",
    "Build a clear request to use an image as a visual reference.",
    "\"To import a visual reference: ___ the image directly into Lovable chat, include an instruction such as '___ an interface similar to this image, adapting it for my ___ project,' and specify which elements you want to ___ and which ones you can ___ to better fit your context.\"",
    [
      "drag and drop or attach",
      "create",
      "AgendaPro",
      "keep",
      "adapt"
    ],
    [
      "drag and drop or attach",
      "create",
      "AgendaPro",
      "keep",
      "adapt",
      "remove everything",
      "duplicate",
      "ignore"
    ],
    "When you use an image as reference, the real gain comes from combining the desired visual direction with clear guidance about what should stay and what can change."
  ),
  textStep(
    "Combining Import with Adaptation",
    "Importing a design does not mean copying every detail literally. The strongest approach is to use the reference as a base and adapt the result to your real product, with its own colors, texts, features, and flow."
  ),
  fillStep(
    "Fill in the blanks - Adapt while importing!",
    "Build a request that uses a visual reference without copying it literally.",
    "\"Use this design as a ___ but make the following adaptations: change the color palette to ___ and ___, which are my project's colors, replace the sample text with the AgendaPro ___, adapt the button ___ to reflect my app's functionality, and keep the overall visual ___ and the layout ___ that are already working well.\"",
    [
      "visual reference",
      "dark blue",
      "white",
      "real content",
      "labels",
      "hierarchy",
      "system"
    ],
    [
      "visual reference",
      "dark blue",
      "white",
      "real content",
      "labels",
      "hierarchy",
      "system",
      "random",
      "footer"
    ],
    "The best import keeps what works in the source design while translating it into the identity and needs of your own product."
  ),
  textStep(
    "Importing Individual Components",
    "You do not need to reimport an entire screen every time. In many cases, importing an isolated component such as a card, form, or menu is safer and more efficient because it preserves what is already working."
  ),
  fillStep(
    "Fill in the blanks - Import components!",
    "Build a request to recreate a visual component from a reference.",
    "\"Look at this appointment card ___ in the image. Recreate this component in my project and use it in ___ places where appointment cards appear. Keep the app's ___ and ___ system, and make sure the component adapts ___ across different screen sizes.\"",
    [
      "design",
      "all",
      "color palette",
      "typography",
      "responsively"
    ],
    [
      "design",
      "all",
      "color palette",
      "typography",
      "responsively",
      "manually",
      "fixed layout",
      "footer"
    ],
    "Importing one component at a time gives you more control over consistency and reduces the chance of breaking other parts of the app."
  ),
  textStep(
    "Using Screenshots of Your Own App",
    "A very effective technique is to take a screenshot of your own app, annotate what should change, and send that image back to Lovable. This removes ambiguity about which element needs to be edited."
  ),
  fillStep(
    "Fill in the blanks - Annotate and reimport!",
    "Build a request that uses an annotated screenshot as an editing guide.",
    "\"Look at this AgendaPro screenshot with my visual ___. The red arrow shows where the ___ should be larger, the blue circle highlights the button that needs to be ___ to the right, and the yellow note describes the color ___ I want in the header. Apply all the changes ___ in the image.\"",
    [
      "notes",
      "spacing",
      "moved",
      "change",
      "indicated"
    ],
    [
      "notes",
      "spacing",
      "moved",
      "change",
      "indicated",
      "random",
      "copied",
      "locked"
    ],
    "Annotated screenshots work well because they show exactly where the change is and what visual direction you want."
  ),
  textStep(
    "Importing Full Design Systems",
    "In more advanced projects, you can import a full design system with colors, typography, spacing, and visual tokens. This helps Lovable keep consistency across all screens and components it generates."
  ),
  fillStep(
    "Fill in the blanks - Import the system!",
    "Build a request to apply a full visual guide to the app.",
    "\"Here is the design ___ for my project with the following definitions: primary color ___, secondary color ___, heading font ___, body font ___, base spacing of ___, and component border radius of ___. Apply these ___ as the standard across the whole app, replacing the current values.\"",
    [
      "guide",
      "#1A3A5C",
      "#D4AF37",
      "Playfair Display",
      "Inter",
      "8px",
      "12px",
      "design tokens"
    ],
    [
      "guide",
      "#1A3A5C",
      "#D4AF37",
      "Playfair Display",
      "Inter",
      "8px",
      "12px",
      "design tokens",
      "random gradient",
      "free size"
    ],
    "Once the tokens are defined as standard, the entire app starts to inherit the same visual identity."
  ),
  textStep(
    "Solving Common Import Problems",
    "If an import comes back imperfect, the best path is to fix it in parts. Identify the element that came out wrong, say what was generated, and explain what it should have looked like. That works better than redoing everything at once."
  ),
  quizStep(
    "The most common import mistake",
    "What is the most common mistake when working with design imports in Lovable?",
    [
      "Importing very simple designs that Lovable could build on its own.",
      "Using visual references from competitor apps.",
      "Importing one large complex design without testing screen by screen.",
      "Mixing Figma imports with image references in the same project."
    ],
    2,
    "When the import is too large and something breaks, it becomes much harder to find the issue and correct it without damaging parts that were already right."
  ),
  textStep(
    "Conclusion",
    "Importing designs in Lovable speeds up development and increases accuracy. Figma, visual references, isolated components, annotated screenshots, and full design systems each solve different problems and work very well together. The more organized your input material is, the better the generated result will be.\n\nLesson completed."
  ),
] as const;

export const LOVABLE_MODULE_4_STEPS_ES = [
  textStep(
    "Trabajando con Importaciones de Diseno en Lovable",
    "Bienvenido de nuevo. En esta leccion vas a aprender como importar disenos existentes a Lovable, transformando layouts de Figma, referencias visuales y prototipos en aplicaciones funcionales sin tener que construir todo desde cero por chat."
  ),
  textStep(
    "Por que Importar Disenos es un Superpoder",
    "Construir una app por chat ya es potente. Pero cuando ya tienes un diseno visual, importar esa base acelera el proceso de forma drastica. Una imagen comunica proporciones, tipografia, colores y composicion con mucha menos ambiguedad que una descripcion larga."
  ),
  textStep(
    "Importando desde Figma",
    "Lovable tiene integracion directa con Figma. Cuando recibe un enlace, interpreta la estructura visual del layout, entiende jerarquia, espaciados, tipografia y componentes, y transforma eso en una interfaz funcional."
  ),
  fillStep(
    "Completa los espacios - Importa desde Figma!",
    "Construye el flujo correcto para importar un layout desde Figma.",
    "\"Para importar desde Figma en Lovable: abre tu archivo en Figma, selecciona el ___ o ___ que quieres importar, haz clic derecho y copia el ___ del elemento, pega el enlace en el ___ de Lovable con la instruccion de importar y espera a que Lovable ___ el diseno en codigo HTML y CSS funcional.\"",
    [
      "frame",
      "componente",
      "link de comparticion",
      "chat",
      "convertir"
    ],
    [
      "frame",
      "componente",
      "link de comparticion",
      "chat",
      "convertir",
      "archivo zip",
      "panel lateral",
      "ignorar"
    ],
    "La importacion funciona mejor cuando apuntas al elemento visual correcto y entregas el enlace dentro del contexto de la conversacion."
  ),
  textStep(
    "Preparando Figma para la Importacion",
    "No todos los archivos de Figma se importan con la misma calidad. Capas bien nombradas, componentes organizados y estilos consistentes ayudan a Lovable a generar codigo mas limpio, semantico y reutilizable."
  ),
  fillStep(
    "Completa los espacios - Prepara Figma!",
    "Construye un checklist de preparacion antes de importar.",
    "\"Para una importacion de calidad, asegurate de que tu archivo en Figma tenga: ___ bien nombrados para cada pantalla, componentes ___ con nombres claros como Button, Card y Header, ___ de colores y fuentes definidos como estilos globales, elementos ___ en grupos logicos y ___ de imagen correctamente vinculados a los assets.\"",
    [
      "frames",
      "organizados",
      "estilos",
      "agrupados",
      "recursos"
    ],
    [
      "frames",
      "organizados",
      "estilos",
      "agrupados",
      "recursos",
      "duplicados",
      "campos aleatorios",
      "comentarios"
    ],
    "Cuanto mas limpio y ordenado este el archivo de diseno, mas facil sera para Lovable interpretar el rol de cada parte."
  ),
  textStep(
    "Importando Referencias Visuales como Imagen",
    "No necesitas depender solo de Figma. Capturas, mockups y referencias visuales tambien pueden enviarse directamente por el chat. Esto ayuda mucho cuando la composicion visual es dificil de explicar con palabras."
  ),
  fillStep(
    "Completa los espacios - Importa por imagen!",
    "Construye un pedido claro para usar una imagen como referencia visual.",
    "\"Para importar una referencia visual: ___ la imagen directamente en el chat de Lovable, acompana con una instruccion como '___ una interfaz similar a esta imagen, adaptandola para mi proyecto ___' y especifica que elementos quieres ___ y cuales puedes ___ para ajustarse mejor a tu contexto.\"",
    [
      "arrastra y suelta o adjunta",
      "crea",
      "AgendaPro",
      "mantener",
      "adaptar"
    ],
    [
      "arrastra y suelta o adjunta",
      "crea",
      "AgendaPro",
      "mantener",
      "adaptar",
      "eliminar todo",
      "duplicar",
      "ignorar"
    ],
    "Cuando usas una imagen como referencia, la ganancia real viene de combinar la direccion visual deseada con instrucciones claras sobre que debe quedarse y que puede cambiar."
  ),
  textStep(
    "Combinando Importacion con Adaptacion",
    "Importar un diseno no significa copiarlo exactamente. Lo mas potente es usar la referencia como base y adaptar el resultado al contexto real de tu producto, con sus colores, textos, funcionalidades y flujo."
  ),
  fillStep(
    "Completa los espacios - Adapta al importar!",
    "Construye un pedido que use la referencia visual sin copiarla literalmente.",
    "\"Usa este diseno como ___ pero haz las siguientes adaptaciones: cambia la paleta de colores a ___ y ___, que son los colores de mi proyecto, sustituye los textos de ejemplo por el ___ real de AgendaPro, adapta las ___ de los botones para reflejar las funcionalidades de mi aplicacion y manten la ___ general y el ___ de layout que ya estan funcionando bien.\"",
    [
      "referencia visual",
      "azul oscuro",
      "blanco",
      "contenido",
      "labels",
      "jerarquia visual",
      "sistema"
    ],
    [
      "referencia visual",
      "azul oscuro",
      "blanco",
      "contenido",
      "labels",
      "jerarquia visual",
      "sistema",
      "aleatorio",
      "footer"
    ],
    "La mejor importacion conserva lo que funciona en el diseno de origen, pero lo traduce a la identidad y a las necesidades de tu producto."
  ),
  textStep(
    "Importando Componentes Aislados",
    "No necesitas reimportar una pantalla completa cada vez. En muchos casos, importar un componente aislado, como una card, un formulario o un menu, es mas seguro y mas eficiente porque preserva lo que ya funciona."
  ),
  fillStep(
    "Completa los espacios - Importa componentes!",
    "Construye un pedido para recrear un componente visual desde una referencia.",
    "\"Mira este ___ de card de agendamiento en la imagen. Recrea este componente en mi proyecto y usalo en ___ los lugares donde aparecen cards de agendamiento. Manten la ___ y el ___ del resto de la aplicacion y garantiza que el componente se adapte ___ en pantallas de distintos tamanos.\"",
    [
      "diseno",
      "todos",
      "paleta de colores",
      "sistema de tipografia",
      "responsivamente"
    ],
    [
      "diseno",
      "todos",
      "paleta de colores",
      "sistema de tipografia",
      "responsivamente",
      "manualmente",
      "layout fijo",
      "footer"
    ],
    "Importar componente por componente da mas control sobre la consistencia y reduce el riesgo de romper otras partes de la app."
  ),
  textStep(
    "Usando Capturas de Tu Propia App",
    "Una tecnica muy potente es tomar una captura de tu propia app, anotar lo que quieres cambiar y devolver esa imagen a Lovable. Asi eliminas la ambiguedad sobre que elemento debe editarse."
  ),
  fillStep(
    "Completa los espacios - Anota y reimporta!",
    "Construye un pedido que use una captura anotada como guia de edicion.",
    "\"Mira esta captura de AgendaPro con mis ___. La flecha roja indica donde el ___ debe ser mayor, el circulo azul muestra el boton que necesita ser ___ hacia la derecha y el texto amarillo describe el ___ de color que quiero en el header. Aplica todos los cambios ___ en la imagen.\"",
    [
      "anotaciones visuales",
      "espaciado",
      "movido",
      "cambio",
      "indicados"
    ],
    [
      "anotaciones visuales",
      "espaciado",
      "movido",
      "cambio",
      "indicados",
      "aleatorios",
      "copiados",
      "bloqueados"
    ],
    "Las capturas anotadas funcionan muy bien porque muestran exactamente donde esta el cambio y cual es la direccion visual esperada."
  ),
  textStep(
    "Importando Sistemas de Diseno Completos",
    "En proyectos mas avanzados, puedes importar un sistema de diseno completo con colores, tipografia, espaciados y tokens visuales. Eso ayuda a Lovable a mantener consistencia en todas las pantallas y componentes que genera."
  ),
  fillStep(
    "Completa los espacios - Importa el sistema!",
    "Construye un pedido para aplicar una guia visual completa en la app.",
    "\"Aqui esta la ___ de diseno de mi proyecto con las siguientes definiciones: color primario ___, color secundario ___, fuente de titulos ___, fuente de cuerpo ___, espaciado base de ___ y radio de borde de componentes de ___. Aplica estos ___ como estandar en toda la aplicacion, reemplazando los valores actuales.\"",
    [
      "guia",
      "#1A3A5C",
      "#D4AF37",
      "Playfair Display",
      "Inter",
      "8px",
      "12px",
      "tokens de diseno"
    ],
    [
      "guia",
      "#1A3A5C",
      "#D4AF37",
      "Playfair Display",
      "Inter",
      "8px",
      "12px",
      "tokens de diseno",
      "gradiente aleatorio",
      "tamano libre"
    ],
    "Cuando los tokens quedan definidos como estandar, toda la app empieza a heredar la misma identidad visual."
  ),
  textStep(
    "Resolviendo Problemas Comunes de Importacion",
    "Si una importacion sale imperfecta, el mejor camino es corregir por partes. Identifica el elemento que quedo mal, explica que fue lo que se genero y como deberia haberse reproducido. Eso funciona mejor que rehacer todo de una sola vez."
  ),
  quizStep(
    "El error mas comun en importaciones",
    "Cual es el error mas comun al trabajar con importaciones de diseno en Lovable?",
    [
      "Importar disenos muy simples que Lovable podria crear por si solo.",
      "Usar referencias visuales de apps competidoras.",
      "Importar un diseno complejo completo sin probar pantalla por pantalla.",
      "Mezclar importaciones de Figma con referencias en imagen dentro del mismo proyecto."
    ],
    2,
    "Cuando la importacion es muy grande y algo sale mal, es mucho mas dificil encontrar el problema y corregirlo sin romper partes que ya estaban bien."
  ),
  textStep(
    "Conclusion",
    "Importar disenos en Lovable acelera el desarrollo y aumenta la precision. Figma, referencias visuales, componentes aislados, capturas anotadas y sistemas de diseno completos resuelven problemas distintos y funcionan muy bien juntos. Cuanto mas organizado este el material de entrada, mejor sera el resultado generado.\n\nLeccion concluida."
  ),
] as const;

export const LOVABLE_MODULE_4_STEPS_FR = [
  textStep(
    "Travailler avec les Importations de Design dans Lovable",
    "Bon retour. Dans cette lecon, vous allez apprendre a importer des designs existants dans Lovable, en transformant des layouts Figma, des references visuelles et des prototypes en applications fonctionnelles sans tout reconstruire depuis zero dans le chat."
  ),
  textStep(
    "Pourquoi Importer des Designs est un Superpouvoir",
    "Construire une application via le chat est deja puissant. Mais quand vous avez deja un design visuel, importer cette base accelere le processus de maniere radicale. Une image communique proportions, typographie, couleurs et composition avec beaucoup moins d'ambiguite qu'une longue description."
  ),
  textStep(
    "Importer depuis Figma",
    "Lovable propose une integration directe avec Figma. Lorsqu'il recoit un lien, il interprete la structure visuelle du layout, comprend hierarchie, espacements, typographie et composants, puis transforme cela en interface fonctionnelle."
  ),
  fillStep(
    "Completez les blancs - Importez depuis Figma !",
    "Construisez le bon flux pour importer un layout depuis Figma.",
    "\"Pour importer depuis Figma dans Lovable : ouvrez votre fichier dans Figma, selectionnez le ___ ou le ___ que vous voulez importer, faites un clic droit et copiez le ___ de l'element, collez le lien dans le ___ de Lovable avec l'instruction d'import, puis attendez que Lovable ___ le design en code HTML et CSS fonctionnel.\"",
    [
      "frame",
      "composant",
      "lien de partage",
      "chat",
      "convertisse"
    ],
    [
      "frame",
      "composant",
      "lien de partage",
      "chat",
      "convertisse",
      "fichier zippe",
      "panneau lateral",
      "ignore"
    ],
    "L'importation fonctionne mieux quand vous ciblez exactement le bon element visuel et que vous fournissez le lien dans le contexte de la conversation."
  ),
  textStep(
    "Preparer Figma pour l'Importation",
    "Tous les fichiers Figma ne s'importent pas avec la meme qualite. Des calques bien nommes, des composants organises et des styles coherents aident Lovable a produire un code plus propre, plus semantique et plus reutilisable."
  ),
  fillStep(
    "Completez les blancs - Preparez Figma !",
    "Construisez une checklist de preparation avant l'importation.",
    "\"Pour une importation de qualite, assurez-vous que votre fichier Figma contient : des ___ bien nommes pour chaque ecran, des composants ___ avec des noms clairs comme Button, Card et Header, des ___ de couleurs et de polices definis comme styles globaux, des elements ___ dans des groupes logiques et des ___ d'image correctement relies aux assets.\"",
    [
      "frames",
      "organises",
      "styles",
      "regroupes",
      "ressources"
    ],
    [
      "frames",
      "organises",
      "styles",
      "regroupes",
      "ressources",
      "duplicates",
      "champs aleatoires",
      "commentaires"
    ],
    "Plus le fichier de design est propre et organise, plus il est facile pour Lovable de comprendre le role de chaque partie."
  ),
  textStep(
    "Importer des References Visuelles comme Image",
    "Vous ne dependez pas uniquement de Figma. Captures d'ecran, mockups et references visuelles peuvent aussi etre envoyes directement dans le chat. C'est tres utile quand la composition visuelle est difficile a decrire avec precision."
  ),
  fillStep(
    "Completez les blancs - Importez via une image !",
    "Construisez une demande claire pour utiliser une image comme reference visuelle.",
    "\"Pour importer une reference visuelle : ___ l'image directement dans le chat de Lovable, ajoutez une instruction comme '___ une interface similaire a cette image, en l'adaptant a mon projet ___' et precisez quels elements vous voulez ___ et lesquels vous pouvez ___ pour mieux s'adapter a votre contexte.\"",
    [
      "glissez-deposez ou joignez",
      "cree",
      "AgendaPro",
      "conserver",
      "adapter"
    ],
    [
      "glissez-deposez ou joignez",
      "cree",
      "AgendaPro",
      "conserver",
      "adapter",
      "supprimer",
      "dupliquer",
      "ignorer"
    ],
    "Quand vous utilisez une image comme reference, le vrai gain vient de l'association entre la direction visuelle voulue et des consignes claires sur ce qui doit rester ou changer."
  ),
  textStep(
    "Combiner Importation et Adaptation",
    "Importer un design ne veut pas dire le copier trait pour trait. L'approche la plus forte consiste a utiliser la reference comme base puis a adapter le resultat au contexte reel de votre produit, avec ses couleurs, ses textes, ses fonctionnalites et son flux."
  ),
  fillStep(
    "Completez les blancs - Adaptez pendant l'importation !",
    "Construisez une demande qui utilise la reference sans la copier litteralement.",
    "\"Utilisez ce design comme ___ mais faites les adaptations suivantes : changez la palette de couleurs en ___ et ___, qui sont les couleurs de mon projet, remplacez les textes d'exemple par le ___ reel d'AgendaPro, adaptez les ___ des boutons pour refleter les fonctionnalites de mon application et conservez la ___ generale ainsi que le ___ de layout qui fonctionnent deja bien.\"",
    [
      "reference visuelle",
      "bleu fonce",
      "blanc",
      "contenu",
      "labels",
      "hierarchie visuelle",
      "systeme"
    ],
    [
      "reference visuelle",
      "bleu fonce",
      "blanc",
      "contenu",
      "labels",
      "hierarchie visuelle",
      "systeme",
      "aleatoire",
      "footer"
    ],
    "La meilleure importation conserve ce qui fonctionne dans le design source tout en le traduisant dans l'identite et les besoins de votre produit."
  ),
  textStep(
    "Importer des Composants Isoles",
    "Vous n'avez pas besoin de reimporter un ecran entier a chaque fois. Dans beaucoup de cas, importer un composant isole, comme une carte, un formulaire ou un menu, est plus sur et plus efficace, car cela preserve ce qui fonctionne deja."
  ),
  fillStep(
    "Completez les blancs - Importez des composants !",
    "Construisez une demande pour recreer un composant visuel a partir d'une reference.",
    "\"Regardez ce ___ de carte de rendez-vous dans l'image. Recreez ce composant dans mon projet et utilisez-le dans ___ les endroits ou des cartes de rendez-vous apparaissent. Conservez la ___ et le ___ du reste de l'application et assurez-vous que le composant s'adapte ___ a des ecrans de tailles differentes.\"",
    [
      "design",
      "tous",
      "palette de couleurs",
      "systeme de typographie",
      "responsivement"
    ],
    [
      "design",
      "tous",
      "palette de couleurs",
      "systeme de typographie",
      "responsivement",
      "manuellement",
      "layout fixe",
      "footer"
    ],
    "Importer composant par composant donne plus de controle sur la coherence visuelle et reduit le risque de casser d'autres parties de l'application."
  ),
  textStep(
    "Utiliser des Captures de Votre Propre App",
    "Une technique tres efficace consiste a prendre une capture d'ecran de votre propre application, annoter ce que vous voulez changer, puis renvoyer cette image a Lovable. Cela elimine toute ambiguite sur l'element concerne."
  ),
  fillStep(
    "Completez les blancs - Annotez et reimportez !",
    "Construisez une demande qui utilise une capture annotee comme guide d'edition.",
    "\"Regardez cette capture d'AgendaPro avec mes ___. La fleche rouge indique ou l'___ doit etre plus grand, le cercle bleu montre le bouton qui doit etre ___ vers la droite et le texte jaune decrit le ___ de couleur que je veux dans le header. Appliquez toutes les modifications ___ sur l'image.\"",
    [
      "annotations visuelles",
      "espacement",
      "deplace",
      "changement",
      "indiquees"
    ],
    [
      "annotations visuelles",
      "espacement",
      "deplace",
      "changement",
      "indiquees",
      "aleatoires",
      "copiees",
      "bloquees"
    ],
    "Les captures annotees fonctionnent tres bien parce qu'elles montrent exactement ou se situe la modification et dans quelle direction visuelle aller."
  ),
  textStep(
    "Importer des Systemes de Design Complets",
    "Dans des projets plus avances, vous pouvez importer un systeme de design complet avec couleurs, typographie, espacements et tokens visuels. Cela aide Lovable a conserver la coherence sur tous les ecrans et composants qu'il genere."
  ),
  fillStep(
    "Completez les blancs - Importez le systeme !",
    "Construisez une demande pour appliquer un guide visuel complet a l'application.",
    "\"Voici le ___ de design de mon projet avec les definitions suivantes : couleur principale ___, couleur secondaire ___, police des titres ___, police du corps ___, espacement de base de ___ et rayon de bordure des composants de ___. Appliquez ces ___ comme standard dans toute l'application en remplacant les valeurs actuelles.\"",
    [
      "guide",
      "#1A3A5C",
      "#D4AF37",
      "Playfair Display",
      "Inter",
      "8px",
      "12px",
      "tokens de design"
    ],
    [
      "guide",
      "#1A3A5C",
      "#D4AF37",
      "Playfair Display",
      "Inter",
      "8px",
      "12px",
      "tokens de design",
      "degrade aleatoire",
      "taille libre"
    ],
    "Quand les tokens deviennent la norme, toute l'application commence a heriter de la meme identite visuelle."
  ),
  textStep(
    "Resoudre les Problemes Courants d'Importation",
    "Si une importation revient imparfaite, le meilleur chemin consiste a corriger par parties. Identifiez l'element incorrect, dites ce qui a ete genere et expliquez comment il aurait du etre reproduit. Cela marche mieux que de tout refaire d'un coup."
  ),
  quizStep(
    "L'erreur la plus courante en importation",
    "Quelle est l'erreur la plus courante lorsqu'on travaille avec des importations de design dans Lovable ?",
    [
      "Importer des designs tres simples que Lovable pourrait creer seul.",
      "Utiliser des references visuelles d'applications concurrentes.",
      "Importer un design complexe complet sans tester ecran par ecran.",
      "Melanger les importations Figma et les references image dans le meme projet."
    ],
    2,
    "Quand l'importation est trop vaste et qu'un element sort mal, il devient beaucoup plus difficile de trouver le probleme et de le corriger sans casser ce qui etait deja bon."
  ),
  textStep(
    "Conclusion",
    "Importer des designs dans Lovable accelere le developpement et augmente la precision. Figma, references visuelles, composants isoles, captures annotees et systemes de design complets resolvent des problemes differents et se completent tres bien. Plus votre materiel d'entree est organise, meilleur sera le resultat genere.\n\nLecon terminee."
  ),
] as const;
