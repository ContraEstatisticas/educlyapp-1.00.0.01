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

export const GROK_MODULE_2_STEPS_PT = [
  textStep(
    "Criando Videos e Fotos com o Grok",
    "Bem-vindo. Nesta licao, voce vai aprender como usar o Grok para criar imagens e videos com inteligencia artificial. Com prompts bem escritos, voce pode gerar fotos realistas, artes criativas, thumbnails, imagens para redes sociais e ate videos curtos para marketing ou conteudo digital."
  ),
  textStep(
    "Por que Criar Imagens e Videos com IA e um Superpoder",
    "Produzir conteudo visual costuma exigir designers, fotografos ou editores. Com IA, voce transforma descricoes em imagens ou videos rapidamente, sem precisar fotografar, desenhar ou editar manualmente."
  ),
  quizStep(
    "Vantagem da criacao visual com IA",
    "Por que usar IA para criar imagens e videos pode ser mais eficiente?",
    [
      "Porque voce transforma descricoes em imagens ou videos rapidamente, sem precisar fotografar, desenhar ou editar manualmente.",
      "Porque a IA substitui completamente designers profissionais.",
      "Porque imagens geradas por IA sempre sao melhores que fotos reais.",
      "Porque IA so consegue criar imagens simples."
    ],
    0,
    "A maior vantagem esta em acelerar a producao visual e o teste de ideias sem depender de uma execucao manual completa."
  ),
  textStep(
    "Criando Fotos com Prompts no Grok",
    "O Grok gera imagens a partir de descricoes detalhadas. Quanto melhor voce define cena, estilo, iluminacao e ambiente, mais precisa e alinhada tende a ser a imagem gerada."
  ),
  fillStep(
    "Preencha a lacuna - Crie uma imagem!",
    "Monte um prompt simples para gerar uma cena visual clara.",
    "\"Crie uma imagem de ___ em estilo ___, com iluminacao ___ e fundo ___.\"",
    ["escritorio futurista", "realista", "cinematografica", "minimalista"],
    ["escritorio futurista", "realista", "cinematografica", "minimalista", "aleatorio", "confuso", "sem contexto"],
    "Definir assunto, estilo, iluminacao e fundo da ao Grok uma base visual muito mais forte para gerar a cena."
  ),
  textStep(
    "Controlando o Estilo Visual",
    "Voce pode pedir estilos especificos para gerar imagens com identidade mais clara. O estilo orienta a estetica, as cores e o clima visual, fazendo a imagem parecer muito mais intencional."
  ),
  fillStep(
    "Preencha a lacuna - Defina o estilo!",
    "Monte um prompt com direcao estetica clara.",
    "\"Gere uma imagem de ___ no estilo ___, com cores ___ e composicao ___.\"",
    ["cidade futurista", "cyberpunk", "neon", "cinematografica"],
    ["cidade futurista", "cyberpunk", "neon", "cinematografica", "vaga", "apagadas", "sem enquadramento"],
    "Quando voce define estilo, paleta e composicao, a imagem deixa de ser generica e ganha assinatura visual."
  ),
  textStep(
    "Criando Thumbnails e Imagens para Redes Sociais",
    "O Grok tambem pode ajudar a criar thumbnails e imagens para conteudo digital. A grande vantagem e testar varias versoes rapidamente ate encontrar a que mais chama atencao."
  ),
  fillStep(
    "Preencha a lacuna - Crie uma thumbnail!",
    "Monte um prompt voltado para conteudo digital.",
    "\"Crie uma thumbnail para um video sobre ___, com texto grande dizendo '___' e um visual chamativo em estilo ___.\"",
    ["inteligencia artificial", "O FUTURO DA IA", "YouTube"],
    ["inteligencia artificial", "O FUTURO DA IA", "YouTube", "texto pequeno", "neutro", "documento"],
    "Para thumbnails, o prompt precisa deixar claro o tema, o texto principal e o tipo de impacto visual desejado."
  ),
  textStep(
    "Criando Videos com o Grok",
    "Alem de imagens, o Grok pode ajudar a gerar videos ou estruturar cenas para producao automatica. Isso acelera muito a criacao de conteudo visual mesmo sem gravacao fisica."
  ),
  fillStep(
    "Preencha a lacuna - Gere um video!",
    "Monte um pedido simples para uma cena em video.",
    "\"Crie um video curto mostrando ___, com estilo ___ e movimento de camera ___.\"",
    ["cidade futurista a noite", "cinematografico", "drone"],
    ["cidade futurista a noite", "cinematografico", "drone", "sem cena", "travado", "aleatorio"],
    "Um bom prompt de video define ambiente, estilo e movimento, que sao tres pilares da sensacao cinematografica."
  ),
  textStep(
    "Criando Sequencias de Cena para Videos",
    "Uma boa tecnica e pedir ao Grok para estruturar o video em cenas. Dividir em partes ajuda a criar narrativa, ritmo e progressao visual de forma mais coerente."
  ),
  fillStep(
    "Preencha a lacuna - Estruture um video!",
    "Monte um pedido com tres cenas bem definidas.",
    "\"Crie um roteiro visual para um video sobre ___ com tres cenas: introducao mostrando ___, desenvolvimento com ___ e final com ___.\"",
    ["inteligencia artificial", "tecnologia futurista", "aplicacoes no cotidiano", "mensagem inspiradora"],
    ["inteligencia artificial", "tecnologia futurista", "aplicacoes no cotidiano", "mensagem inspiradora", "caos", "nada", "fim vazio"],
    "Quando o video e dividido em cenas, o resultado costuma ficar mais narrativo e mais facil de executar."
  ),
  textStep(
    "Refinando Imagens Geradas",
    "Nem sempre a primeira imagem sera a ideal. A melhor abordagem e ajustar detalhes especificos, como realismo, luz e cores, ate chegar no visual desejado."
  ),
  fillStep(
    "Preencha a lacuna - Refine a imagem!",
    "Ajuste um resultado existente sem recomecar do zero.",
    "\"Melhore esta imagem tornando-a mais ___, aumentando a ___ e ajustando as ___ para um visual mais profissional.\"",
    ["realista", "iluminacao", "cores"],
    ["realista", "iluminacao", "cores", "artificial", "confusao", "falhas"],
    "Refinar por partes ajuda a preservar o que ja funcionou e aproximar o resultado do visual ideal."
  ),
  textStep(
    "Usando Referencias Visuais",
    "Voce tambem pode usar imagens de referencia para orientar a geracao. Uma referencia comunica composicao e estilo muito mais rapido do que uma descricao longa em texto."
  ),
  fillStep(
    "Preencha a lacuna - Use referencia!",
    "Monte um pedido para adaptar uma imagem de referencia.",
    "\"Use esta imagem como ___ e gere uma versao com estilo ___ mantendo a ___ geral da cena.\"",
    ["referencia", "futurista", "composicao"],
    ["referencia", "futurista", "composicao", "desculpa", "aleatorio", "bagunca"],
    "A referencia ajuda o Grok a manter direcao visual sem obrigar voce a explicar tudo apenas com palavras."
  ),
  textStep(
    "Boas Praticas ao Criar Conteudo Visual com o Grok",
    "O erro mais comum ao gerar imagens com IA e usar prompts vagos, sem detalhes suficientes sobre cena, estilo e composicao. Quanto mais claro voce for, melhor tende a ser a primeira geracao."
  ),
  quizStep(
    "Erro mais comum em imagem com IA",
    "Qual e o erro mais comum ao gerar imagens com IA?",
    [
      "Pedir imagens muito especificas.",
      "Gerar varias variacoes.",
      "Usar prompts vagos sem detalhes visuais suficientes.",
      "Ajustar os resultados."
    ],
    2,
    "Prompts vagos produzem imagens vagas. Os detalhes visuais sao o que aproximam o resultado do que voce realmente imaginou."
  ),
  textStep(
    "Conclusao",
    "Criar fotos e videos com o Grok permite transformar ideias em conteudo visual em poucos minutos. Prompts detalhados, controle de estilo, thumbnails, roteiros visuais, refinamento e uso de referencias ajudam voce a produzir conteudo com muito mais velocidade.\n\nO segredo nao e apenas gerar imagens. E saber descrever exatamente o que voce quer criar. Descreva com clareza. Teste variacoes. Crie com inteligencia.\n\nLicao concluida."
  ),
] as const;
export const GROK_MODULE_2_STEPS_EN = [
  textStep(
    "Creating Videos and Photos with Grok",
    "Welcome. In this lesson, you will learn how to use Grok to create images and videos with artificial intelligence. With the right prompts, you can generate realistic photos, creative art, thumbnails, social media visuals, and even short videos for marketing or digital content."
  ),
  textStep(
    "Why Creating Images and Videos with AI Is a Superpower",
    "Producing visual content usually requires designers, photographers, or editors. With AI, you can turn descriptions into images or videos quickly without having to shoot, draw, or edit everything manually."
  ),
  quizStep(
    "Advantage of AI visual creation",
    "Why can using AI to create images and videos be more efficient?",
    [
      "Because it turns descriptions into images or videos quickly without requiring manual shooting, drawing, or editing.",
      "Because AI completely replaces professional designers.",
      "Because AI-generated images are always better than real photos.",
      "Because AI can only create simple images."
    ],
    0,
    "The main advantage is faster visual production and testing, not the elimination of all human creative work."
  ),
  textStep(
    "Creating Photos with Prompts in Grok",
    "Grok creates images from detailed descriptions. The better you define the scene, style, lighting, and environment, the more accurate and aligned the generated image tends to be."
  ),
  fillStep(
    "Fill in the blank - Create an image!",
    "Build a simple prompt for a clear visual scene.",
    "\"Create an image of a ___ in a ___ style, with ___ lighting and a ___ background.\"",
    ["futuristic office", "realistic", "cinematic", "minimalist"],
    ["futuristic office", "realistic", "cinematic", "minimalist", "random", "confusing", "contextless"],
    "Defining subject, style, lighting, and background gives Grok a much stronger visual foundation."
  ),
  textStep(
    "Controlling Visual Style",
    "You can ask for specific styles to generate visuals with a stronger identity. Style guides the aesthetic, color language, and mood of the image."
  ),
  fillStep(
    "Fill in the blank - Define the style!",
    "Build a prompt with clear aesthetic direction.",
    "\"Generate an image of a ___ in a ___ style, with ___ colors and a ___ composition.\"",
    ["futuristic city", "cyberpunk", "neon", "cinematic"],
    ["futuristic city", "cyberpunk", "neon", "cinematic", "vague", "washed out", "unframed"],
    "When you define style, palette, and composition, the image feels much more intentional."
  ),
  textStep(
    "Creating Thumbnails and Social Media Images",
    "Grok can also help create thumbnails and visuals for digital content. A major advantage is being able to test many variations quickly until you find the most attention-grabbing one."
  ),
  fillStep(
    "Fill in the blank - Create a thumbnail!",
    "Build a prompt for digital content artwork.",
    "\"Create a thumbnail for a video about ___, with big text saying '___' and a bold ___ style.\"",
    ["artificial intelligence", "THE FUTURE OF AI", "YouTube"],
    ["artificial intelligence", "THE FUTURE OF AI", "YouTube", "tiny text", "neutral", "document"],
    "For thumbnails, the prompt should clearly define topic, headline, and the kind of visual impact you want."
  ),
  textStep(
    "Creating Videos with Grok",
    "Besides images, Grok can help generate videos or structure scenes for automatic production. That makes visual content creation much faster even without physical shooting."
  ),
  fillStep(
    "Fill in the blank - Generate a video!",
    "Build a simple request for a video scene.",
    "\"Create a short video showing ___, with a ___ style and ___ camera movement.\"",
    ["a futuristic city at night", "cinematic", "drone"],
    ["a futuristic city at night", "cinematic", "drone", "no scene", "static", "random"],
    "A good video prompt defines environment, style, and movement, which are key to the final feel."
  ),
  textStep(
    "Creating Scene Sequences for Videos",
    "A strong technique is to ask Grok to structure a video in scenes. Splitting a video into parts creates clearer narrative, pacing, and visual progression."
  ),
  fillStep(
    "Fill in the blank - Structure a video!",
    "Build a request with three defined scenes.",
    "\"Create a visual outline for a video about ___ with three scenes: an introduction showing ___, a middle section with ___, and an ending with ___.\"",
    ["artificial intelligence", "futuristic technology", "everyday applications", "an inspiring message"],
    ["artificial intelligence", "futuristic technology", "everyday applications", "an inspiring message", "chaos", "nothing", "empty ending"],
    "When a video is structured by scene, the result usually becomes more coherent and easier to produce."
  ),
  textStep(
    "Refining Generated Images",
    "The first generated image will not always be perfect. The best approach is to adjust specific details such as realism, lighting, and color until you reach the desired visual."
  ),
  fillStep(
    "Fill in the blank - Refine the image!",
    "Adjust an existing result without starting over.",
    "\"Improve this image by making it more ___, increasing the ___, and adjusting the ___ for a more professional look.\"",
    ["realistic", "lighting", "colors"],
    ["realistic", "lighting", "colors", "artificial", "confusion", "mistakes"],
    "Refining specific elements helps preserve what already works while pushing the image closer to the ideal result."
  ),
  textStep(
    "Using Visual References",
    "You can also use reference images to guide generation. A visual reference communicates composition and style much faster than a long paragraph."
  ),
  fillStep(
    "Fill in the blank - Use a reference!",
    "Build a request that adapts a reference image.",
    "\"Use this image as a ___ and generate a ___ version while keeping the overall ___ of the scene.\"",
    ["reference", "futuristic", "composition"],
    ["reference", "futuristic", "composition", "excuse", "random", "mess"],
    "References help Grok stay aligned with the intended look without forcing you to describe every detail from scratch."
  ),
  textStep(
    "Best Practices When Creating Visual Content with Grok",
    "The most common mistake in AI image generation is using vague prompts without enough visual detail. The clearer you describe the scene, style, and composition, the stronger the first result tends to be."
  ),
  quizStep(
    "Most common image-generation mistake",
    "What is the most common mistake when generating images with AI?",
    [
      "Requesting very specific images.",
      "Generating several variations.",
      "Using vague prompts without enough visual detail.",
      "Adjusting the results."
    ],
    2,
    "Vague prompts create vague images. Visual detail is what brings the result closer to what you actually imagined."
  ),
  textStep(
    "Conclusion",
    "Creating photos and videos with Grok lets you turn ideas into visual content in minutes. Detailed prompts, style control, thumbnails, scene planning, refinement, and reference-based generation help you produce visuals much faster.\n\nThe secret is not only generating images. It is describing exactly what you want to create. Describe clearly. Test variations. Create intelligently.\n\nLesson complete."
  ),
] as const;
export const GROK_MODULE_2_STEPS_ES = [
  textStep(
    "Creando Videos y Fotos con Grok",
    "Bienvenido. En esta leccion vas a aprender a usar Grok para crear imagenes y videos con inteligencia artificial. Con los prompts correctos, puedes generar fotos realistas, arte creativo, thumbnails, imagenes para redes sociales e incluso videos cortos para marketing o contenido digital."
  ),
  textStep(
    "Por que crear imagenes y videos con IA es un superpoder",
    "Producir contenido visual normalmente requiere diseno, fotografia o edicion. Con IA, conviertes descripciones en imagenes o videos rapidamente sin necesidad de fotografiar, dibujar o editar manualmente."
  ),
  quizStep(
    "Ventaja de la creacion visual con IA",
    "Por que usar IA para crear imagenes y videos puede ser mas eficiente?",
    [
      "Porque transformas descripciones en imagenes o videos rapidamente sin tener que fotografiar, dibujar o editar manualmente.",
      "Porque la IA sustituye por completo a los diseniadores profesionales.",
      "Porque las imagenes generadas por IA siempre son mejores que las fotos reales.",
      "Porque la IA solo puede crear imagenes simples."
    ],
    0,
    "La mayor ventaja es acelerar la produccion y las pruebas visuales, no eliminar por completo el trabajo creativo humano."
  ),
  textStep(
    "Creando fotos con prompts en Grok",
    "Grok genera imagenes a partir de descripciones detalladas. Cuanto mejor definas la escena, el estilo, la iluminacion y el ambiente, mas alineado sera el resultado."
  ),
  fillStep(
    "Completa el espacio - Crea una imagen!",
    "Construye un prompt simple para una escena visual clara.",
    "\"Crea una imagen de ___ en estilo ___, con iluminacion ___ y fondo ___.\"",
    ["oficina futurista", "realista", "cinematografica", "minimalista"],
    ["oficina futurista", "realista", "cinematografica", "minimalista", "aleatorio", "confuso", "sin contexto"],
    "Definir tema, estilo, luz y fondo le da a Grok una base mucho mas fuerte para construir la escena."
  ),
  textStep(
    "Controlando el estilo visual",
    "Puedes pedir estilos especificos para generar imagenes con una identidad mas clara. El estilo orienta la estetica, la paleta y la sensacion visual final."
  ),
  fillStep(
    "Completa el espacio - Define el estilo!",
    "Construye un prompt con direccion estetica clara.",
    "\"Genera una imagen de ___ en estilo ___, con colores ___ y composicion ___.\"",
    ["ciudad futurista", "cyberpunk", "neon", "cinematografica"],
    ["ciudad futurista", "cyberpunk", "neon", "cinematografica", "vaga", "apagados", "sin encuadre"],
    "Cuando defines estilo, colores y composicion, la imagen gana mucha mas personalidad visual."
  ),
  textStep(
    "Creando thumbnails e imagenes para redes sociales",
    "Grok tambien puede ayudarte a crear thumbnails e imagenes para contenido digital. La gran ventaja es probar muchas versiones rapidamente hasta encontrar la mas llamativa."
  ),
  fillStep(
    "Completa el espacio - Crea una thumbnail!",
    "Construye un prompt orientado a contenido digital.",
    "\"Crea una thumbnail para un video sobre ___, con texto grande diciendo '___' y un visual llamativo en estilo ___.\"",
    ["inteligencia artificial", "EL FUTURO DE LA IA", "YouTube"],
    ["inteligencia artificial", "EL FUTURO DE LA IA", "YouTube", "texto pequeno", "neutral", "documento"],
    "Para thumbnails, conviene dejar muy claro el tema, el texto principal y el tipo de impacto visual esperado."
  ),
  textStep(
    "Creando videos con Grok",
    "Ademas de imagenes, Grok puede ayudar a generar videos o a estructurar escenas para una produccion automatica. Eso acelera mucho la creacion visual incluso sin grabacion fisica."
  ),
  fillStep(
    "Completa el espacio - Genera un video!",
    "Construye una peticion simple para una escena en video.",
    "\"Crea un video corto mostrando ___, con estilo ___ y movimiento de camara ___.\"",
    ["ciudad futurista de noche", "cinematografico", "drone"],
    ["ciudad futurista de noche", "cinematografico", "drone", "sin escena", "quieto", "aleatorio"],
    "Un buen prompt de video define entorno, estilo y movimiento, que son claves para la sensacion final."
  ),
  textStep(
    "Creando secuencias de escenas para videos",
    "Una tecnica muy util es pedir a Grok que estructure el video por escenas. Dividirlo en partes mejora la narrativa, el ritmo y la coherencia visual."
  ),
  fillStep(
    "Completa el espacio - Estructura un video!",
    "Construye una peticion con tres escenas definidas.",
    "\"Crea un guion visual para un video sobre ___ con tres escenas: introduccion mostrando ___, desarrollo con ___ y final con ___.\"",
    ["inteligencia artificial", "tecnologia futurista", "aplicaciones en la vida cotidiana", "mensaje inspirador"],
    ["inteligencia artificial", "tecnologia futurista", "aplicaciones en la vida cotidiana", "mensaje inspirador", "caos", "nada", "final vacio"],
    "Cuando el video se divide por escenas, el resultado suele ser mas claro y mas facil de ejecutar."
  ),
  textStep(
    "Refinando imagenes generadas",
    "No siempre la primera imagen sera la ideal. Lo mejor es ajustar detalles concretos, como realismo, luz o color, en lugar de empezar de cero a cada intento."
  ),
  fillStep(
    "Completa el espacio - Refina la imagen!",
    "Ajusta un resultado existente sin reiniciar todo.",
    "\"Mejora esta imagen haciendola mas ___, aumentando la ___ y ajustando los/as ___ para un look mas profesional.\"",
    ["realista", "iluminacion", "colores"],
    ["realista", "iluminacion", "colores", "artificial", "confusion", "fallos"],
    "Refinar por partes te permite conservar lo que ya funciono y acercarte mas rapido al resultado ideal."
  ),
  textStep(
    "Usando referencias visuales",
    "Tambien puedes usar imagenes de referencia para orientar la generacion. Una referencia visual comunica composicion y estilo mucho mas rapido que un texto largo."
  ),
  fillStep(
    "Completa el espacio - Usa referencia!",
    "Construye una peticion para adaptar una imagen de referencia.",
    "\"Usa esta imagen como ___ y genera una version con estilo ___ manteniendo la ___ general de la escena.\"",
    ["referencia", "futurista", "composicion"],
    ["referencia", "futurista", "composicion", "excusa", "aleatorio", "desorden"],
    "La referencia ayuda a Grok a mantenerse alineado con la direccion visual sin depender solo de texto."
  ),
  textStep(
    "Buenas practicas al crear contenido visual con Grok",
    "El error mas comun al generar imagenes con IA es usar prompts vagos, sin suficientes detalles visuales. Cuanto mas describas la escena, el estilo y la composicion, mejor suele ser el primer resultado."
  ),
  quizStep(
    "Error mas comun en imagen con IA",
    "Cual es el error mas comun al generar imagenes con IA?",
    [
      "Pedir imagenes demasiado especificas.",
      "Generar varias variaciones.",
      "Usar prompts vagos sin suficientes detalles visuales.",
      "Ajustar los resultados."
    ],
    2,
    "Los prompts vagos generan imagenes vagas. Los detalles visuales son lo que acerca el resultado a tu idea real."
  ),
  textStep(
    "Conclusion",
    "Crear fotos y videos con Grok permite transformar ideas en contenido visual en pocos minutos. Prompts detallados, control de estilo, thumbnails, estructura por escenas, refinamiento y referencias visuales te ayudan a producir mucho mas rapido.\n\nEl secreto no es solo generar imagenes. Es saber describir exactamente lo que quieres crear. Describe con claridad. Prueba variaciones. Crea con inteligencia.\n\nLeccion concluida."
  ),
] as const;
export const GROK_MODULE_2_STEPS_FR = [
  textStep(
    "Creer des Videos et des Photos avec Grok",
    "Bienvenue. Dans cette lecon, vous allez apprendre a utiliser Grok pour creer des images et des videos avec l'intelligence artificielle. Avec les bons prompts, vous pouvez generer des photos realistes, des visuels creatifs, des thumbnails, des images pour les reseaux sociaux et meme de courtes videos pour le marketing ou le contenu digital."
  ),
  textStep(
    "Pourquoi creer des images et des videos avec l'IA est un superpouvoir",
    "Produire du contenu visuel demande souvent des designers, des photographes ou des monteurs. Avec l'IA, vous transformez rapidement des descriptions en images ou en videos sans avoir a tout photographier, dessiner ou monter a la main."
  ),
  quizStep(
    "Avantage de la creation visuelle avec l'IA",
    "Pourquoi utiliser l'IA pour creer des images et des videos peut-il etre plus efficace ?",
    [
      "Parce que vous transformez rapidement des descriptions en images ou en videos sans devoir photographier, dessiner ou monter manuellement.",
      "Parce que l'IA remplace totalement les designers professionnels.",
      "Parce que les images generees par IA sont toujours meilleures que les vraies photos.",
      "Parce que l'IA ne peut creer que des images simples."
    ],
    0,
    "Le vrai gain est l'acceleration de la production visuelle et des tests creatifs, pas la disparition totale du travail humain."
  ),
  textStep(
    "Creer des photos avec des prompts dans Grok",
    "Grok genere des images a partir de descriptions detaillees. Plus vous precisez la scene, le style, la lumiere et l'ambiance, plus le resultat a de chances d'etre proche de ce que vous voulez."
  ),
  fillStep(
    "Completez le vide - Creez une image !",
    "Construisez un prompt simple pour une scene visuelle claire.",
    "\"Cree une image de ___ dans un style ___, avec un eclairage ___ et un fond ___.\"",
    ["bureau futuriste", "realiste", "cinematographique", "minimaliste"],
    ["bureau futuriste", "realiste", "cinematographique", "minimaliste", "aleatoire", "confus", "sans contexte"],
    "Definir le sujet, le style, la lumiere et le fond donne a Grok une base visuelle beaucoup plus solide."
  ),
  textStep(
    "Controler le style visuel",
    "Vous pouvez demander des styles precis pour generer des images avec une identite visuelle plus forte. Le style guide l'esthetique, la palette et l'atmosphere generale."
  ),
  fillStep(
    "Completez le vide - Definissez le style !",
    "Construisez un prompt avec une direction esthetique claire.",
    "\"Genere une image de ___ dans un style ___, avec des couleurs ___ et une composition ___.\"",
    ["ville futuriste", "cyberpunk", "neon", "cinematographique"],
    ["ville futuriste", "cyberpunk", "neon", "cinematographique", "vague", "ternes", "sans cadrage"],
    "Quand vous definissez le style, les couleurs et la composition, l'image gagne beaucoup plus de personnalite."
  ),
  textStep(
    "Creer des thumbnails et des images pour les reseaux sociaux",
    "Grok peut aussi aider a creer des thumbnails et des visuels pour le contenu digital. Le grand avantage est de pouvoir tester rapidement plusieurs versions jusqu'a trouver la plus accrocheuse."
  ),
  fillStep(
    "Completez le vide - Creez une thumbnail !",
    "Construisez un prompt pour un visuel de contenu digital.",
    "\"Cree une thumbnail pour une video sur ___, avec un grand texte disant '___' et un visuel percutant dans un style ___.\"",
    ["intelligence artificielle", "LE FUTUR DE L'IA", "YouTube"],
    ["intelligence artificielle", "LE FUTUR DE L'IA", "YouTube", "petit texte", "neutre", "document"],
    "Pour une thumbnail, il faut rendre le sujet, le texte principal et l'impact visuel tres explicites."
  ),
  textStep(
    "Creer des videos avec Grok",
    "En plus des images, Grok peut aider a generer des videos ou a structurer des scenes pour une production automatisee. Cela accelere fortement la creation visuelle, meme sans tournage physique."
  ),
  fillStep(
    "Completez le vide - Generez une video !",
    "Construisez une demande simple pour une scene video.",
    "\"Cree une courte video montrant ___, avec un style ___ et un mouvement de camera ___ .\"",
    ["une ville futuriste la nuit", "cinematographique", "drone"],
    ["une ville futuriste la nuit", "cinematographique", "drone", "sans scene", "fige", "aleatoire"],
    "Un bon prompt video definit l'environnement, le style et le mouvement, trois elements essentiels du rendu final."
  ),
  textStep(
    "Creer des sequences de scenes pour les videos",
    "Une bonne technique consiste a demander a Grok de structurer la video en scenes. En divisant la video en parties, vous obtenez plus facilement une narration claire, un bon rythme et une progression visuelle coherente."
  ),
  fillStep(
    "Completez le vide - Structurez une video !",
    "Construisez une demande avec trois scenes bien definies.",
    "\"Cree un plan visuel pour une video sur ___ avec trois scenes : une introduction montrant ___, un developpement avec ___ et une fin avec ___.\"",
    ["l'intelligence artificielle", "une technologie futuriste", "des applications du quotidien", "un message inspirant"],
    ["l'intelligence artificielle", "une technologie futuriste", "des applications du quotidien", "un message inspirant", "le chaos", "rien", "une fin vide"],
    "Quand la video est pensee scene par scene, le resultat est en general plus clair et plus facile a produire."
  ),
  textStep(
    "Affiner les images generees",
    "La premiere image generee ne sera pas toujours parfaite. La meilleure approche consiste a ajuster des details precis comme le realisme, la lumiere ou les couleurs plutot que de recommencer de zero."
  ),
  fillStep(
    "Completez le vide - Affinez l'image !",
    "Ajustez un resultat existant sans tout recommencer.",
    "\"Ameliore cette image en la rendant plus ___, en augmentant l'___ et en ajustant les ___ pour un rendu plus professionnel.\"",
    ["realiste", "eclairage", "couleurs"],
    ["realiste", "eclairage", "couleurs", "artificielle", "confusion", "erreurs"],
    "Affiner par elements permet de conserver ce qui fonctionne deja et de rapprocher plus vite l'image du resultat ideal."
  ),
  textStep(
    "Utiliser des references visuelles",
    "Vous pouvez aussi utiliser des images de reference pour guider la generation. Une reference visuelle communique la composition et le style beaucoup plus vite qu'une longue explication en texte."
  ),
  fillStep(
    "Completez le vide - Utilisez une reference !",
    "Construisez une demande pour adapter une image de reference.",
    "\"Utilise cette image comme ___ et genere une version au style ___ en conservant la ___ generale de la scene.\"",
    ["reference", "futuriste", "composition"],
    ["reference", "futuriste", "composition", "excuse", "aleatoire", "desordre"],
    "La reference aide Grok a rester aligne sur la direction visuelle voulue sans devoir tout expliquer avec des mots."
  ),
  textStep(
    "Bonnes pratiques pour creer du contenu visuel avec Grok",
    "L'erreur la plus courante quand on genere des images avec l'IA est d'utiliser des prompts vagues sans assez de details visuels. Plus vous decrivez la scene, le style et la composition, meilleur sera generalement le premier resultat."
  ),
  quizStep(
    "Erreur la plus courante en generation d'image",
    "Quelle est l'erreur la plus courante quand on genere des images avec l'IA ?",
    [
      "Demander des images tres specifiques.",
      "Generer plusieurs variations.",
      "Utiliser des prompts vagues sans assez de details visuels.",
      "Ajuster les resultats."
    ],
    2,
    "Des prompts vagues produisent des images vagues. Les details visuels sont ce qui rapproche le resultat de votre intention."
  ),
  textStep(
    "Conclusion",
    "Creer des photos et des videos avec Grok permet de transformer des idees en contenu visuel en quelques minutes. Des prompts detailles, le controle du style, les thumbnails, les sequences de scenes, l'affinage et les references visuelles vous aident a produire beaucoup plus vite.\n\nLe secret n'est pas seulement de generer des images. C'est de savoir decrire exactement ce que vous voulez creer. Decrivez avec clarte. Testez des variations. Creez avec intelligence.\n\nLecon terminee."
  ),
] as const;
