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

export const GEMINI_MODULE_6_STEPS_PT = [
  textStep(
    "Gemini para Criação de Vídeos e Fotos — com Nano Banana Pro e Veo 3.1",
    "Bem-vindo de volta! Nesta lição, você vai aprender como o Gemini se torna um estúdio completo de criação visual com duas integrações poderosas: o Nano Banana Pro para raciocínio e geração de imagens e o Veo 3.1 para criação de vídeos com qualidade cinematográfica.\n\nO Gemini evoluiu para muito além de um assistente de texto. Com o Nano Banana Pro e o Veo 3.1 integrados, ele se tornou uma plataforma completa de criação visual — gerando imagens profissionais e vídeos realistas a partir de descrições em linguagem natural, sem precisar de nenhum software externo."
  ),
  textStep(
    "Nano Banana Pro — Raciocínio e Geração Visual",
    "O Nano Banana Pro é o modelo de raciocínio avançado integrado ao Gemini. Como você pode ver na interface, ele aparece como \"Mostrar raciocínio (Nano Banana Pro)\" — o que significa que antes de gerar qualquer imagem ou resposta complexa, ele pensa, analisa e planeja o resultado. Isso é o que torna as imagens geradas pelo Gemini mais precisas, coerentes e contextualmente corretas."
  ),
  textStep(
    "Como o Raciocínio do Nano Banana Pro Melhora suas Imagens",
    "Quando você ativa o raciocínio do Nano Banana Pro, o Gemini não vai direto para a geração. Ele primeiro interpreta seu prompt, identifica ambiguidades, decide sobre estilo, composição e iluminação — e só então gera a imagem. Isso reduz drasticamente o número de tentativas para chegar no resultado ideal."
  ),
  fillStep(
    "Ative o raciocínio visual!",
    "Determine todas as diretrizes de composição obrigando a máquina a refletir sobre os detalhes.",
    "\"Com o Nano Banana Pro ativado, gere uma imagem de [___] em estilo [___], com iluminação [___], [___] ao fundo e transmitindo sensação de [___]. Antes de gerar, [___] suas escolhas de composição e estilo.\"",
    ["uma jovem cientista em laboratório moderno", "fotorrealista editorial", "fria e azulada com reflexos de equipamentos", "telas com dados e equipamentos de pesquisa", "inteligência e foco", "explique"],
    ["uma jovem cientista em laboratório moderno", "fotorrealista editorial", "fria e azulada com reflexos de equipamentos", "telas com dados e equipamentos de pesquisa", "inteligência e foco", "explique"],
    "Saber a lógica de construção visual da máquina instrui o prompter a melhorar continuamente seus inputs subsequentes."
  ),
  textStep(
    "Estrutura Completa de um Prompt Visual para o Nano Banana Pro",
    "Para extrair o máximo do Nano Banana Pro, seu prompt precisa de camadas bem definidas — quanto mais contexto você fornece, mais inteligente será o raciocínio aplicado antes da geração."
  ),
  fillStep(
    "Monte seu prompt em camadas!",
    "Configure as peças elementares de um tiro fotográfico preciso.",
    "\"[___] de [___], [___] em [___], iluminação [___], estilo [___], perspectiva de [___], [___] profundidade de campo, cores [___] e qualidade [___].\"",
    ["Fotografia realista", "um chef preparando um prato sofisticado", "em movimento", "cozinha profissional aberta", "dramática e quente vinda dos fogões", "editorial gastronômico", "câmera baixa olhando para cima", "rasa", "terrosas e vibrantes", "ultra detalhada 8K"],
    ["Fotografia realista", "um chef preparando um prato sofisticado", "em movimento", "cozinha profissional aberta", "dramática e quente vinda dos fogões", "editorial gastronômico", "câmera baixa olhando para cima", "rasa", "terrosas e vibrantes", "ultra detalhada 8K"],
    "Fornecer diretrizes físicas, de lentes e de paleta isola a interpretação livre (e frequentemente errônea) que a inteligência artificial adota por conforto matemático."
  ),
  textStep(
    "Refinando Imagens com o Nano Banana Pro",
    "Após a geração, você pode pedir ajustes específicos. O Nano Banana Pro vai raciocinar sobre o que mudar, preservando o que já estava funcionando."
  ),
  fillStep(
    "Refine com raciocínio!",
    "Ordene as mudanças exatas e compreenda como o sistema visual processará.",
    "\"A imagem gerada está boa, mas quero ajustar: mude a [___] para tons mais [___], adicione [___] na cena, altere a [___] para [___] e explique como essas mudanças vão [___] o impacto visual antes de gerar.\"",
    ["paleta", "frios e noturnos", "reflexos de neon no chão molhado", "expressão do personagem", "mais determinada e intensa", "melhorar"],
    ["paleta", "frios e noturnos", "reflexos de neon no chão molhado", "expressão do personagem", "mais determinada e intensa", "melhorar"],
    "Refinar isolando elementos garante a continuidade plástica da primeira geração."
  ),
  textStep(
    "Veo 3.1 — Geração de Vídeos Integrada ao Gemini",
    "O Veo 3.1 é a versão mais recente e avançada do modelo de geração de vídeo do Google, integrado diretamente ao Gemini. Ele gera vídeos com movimento realista, física consistente, áudio ambiente sincronizado e qualidade cinematográfica — tudo a partir de descrições em texto."
  ),
  textStep(
    "Criando Vídeos com o Veo 3.1",
    "Para gerar vídeos de qualidade com o Veo 3.1, o prompt precisa descrever a cena, o movimento de câmera, o estilo visual e o áudio de forma clara e detalhada."
  ),
  fillStep(
    "Crie seu vídeo com o Veo 3.1!",
    "Monte em texto o que a lente virtual gravará perfeitamente.",
    "\"Usando o Veo 3.1, gere um vídeo de [___] segundos mostrando [___]. Movimento de câmera: [___]. Estilo: [___]. Iluminação: [___]. Áudio: [___]. A cena deve transmitir [___].\"",
    ["10", "uma cidade futurista ao amanhecer com carros voadores passando entre arranha-céus", "drone descendo lentamente do alto em direção às ruas", "cinematográfico e fotorrealista", "golden hour com névoa azulada entre os prédios", "sons da cidade do futuro com música ambiente eletrônica suave", "esperança e movimento"],
    ["10", "uma cidade futurista ao amanhecer com carros voadores passando entre arranha-céus", "drone descendo lentamente do alto em direção às ruas", "cinematográfico e fotorrealista", "golden hour com névoa azulada entre os prédios", "sons da cidade do futuro com música ambiente eletrônica suave", "esperança e movimento"],
    "Orquestrar as camadas de iluminação, ruídos mundanos e movimentação do set substitui as gigantescas e custosas engrenagens da velha Hollywood."
  ),
  textStep(
    "Usando o Veo 3.1 para Diferentes Formatos",
    "O Veo 3.1 se adapta a diferentes estilos e formatos — do cinematográfico ao publicitário, do documental ao artístico."
  ),
  fillStep(
    "Escolha seu formato!",
    "Alterne a diretriz do set filmográfico em apenas duas linhas descritivas.",
    "\"Gere um vídeo no estilo [___] mostrando [___]. Use [___] de câmera para criar [___]. O áudio deve ter [___] e o resultado deve parecer produzido por [___].\"",
    ["documentário intimista", "um artesão esculpindo uma peça de cerâmica com as mãos", "close-ups detalhados e câmera lenta nos momentos de precisão", "sensação de paciência e maestria", "sons naturais do barro e música instrumental suave", "um premiado documentário internacional"],
    ["documentário intimista", "um artesão esculpindo uma peça de cerâmica com as mãos", "close-ups detalhados e câmera lenta nos momentos de precisão", "sensação de paciência e maestria", "sons naturais do barro e música instrumental suave", "um premiado documentário internacional"],
    "Comandar estéticas fílmicas clássicas dota produções de baixo orçamento e prazo curtíssimo de uma gravidade monumental indescritível."
  ),
  textStep(
    "Combinando Nano Banana Pro e Veo 3.1 no Mesmo Fluxo",
    "A combinação mais poderosa é usar o Nano Banana Pro para criar e refinar a referência visual e o Veo 3.1 para animar aquela cena — tudo dentro do mesmo fluxo criativo no Gemini."
  ),
  fillStep(
    "Combine as duas ferramentas!",
    "Efetive o transplante impecável do quadro fixo perfeitamente moldado para a cinemática fluida retumbante.",
    "\"Primeiro use o [___] para gerar e raciocinar sobre uma imagem de [___] com estilo [___]. Depois use o [___] para criar um vídeo de [___] segundos baseado nessa referência visual, adicionando [___] de câmera e [___] ambiente sincronizado.\"",
    ["Nano Banana Pro", "uma praia deserta ao entardecer com ondas quebrando suavemente", "fotorrealista e cinematográfico", "Veo 3.1", "12", "movimento lento de aproximação", "áudio"],
    ["Nano Banana Pro", "uma praia deserta ao entardecer com ondas quebrando suavemente", "fotorrealista e cinematográfico", "Veo 3.1", "12", "movimento lento de aproximação", "áudio"],
    "Fundir as duas mentes lógicas algorítmicas evita perigos de alucinação plástica, blindando o frame vital definitivo na hora da gravação digital contínua."
  ),
  textStep(
    "Roteirizando Cenas para o Veo 3.1 com Raciocínio do Nano Banana Pro",
    "O Gemini com Nano Banana Pro ativado pode criar roteiros de cena altamente detalhados para usar como prompts no Veo 3.1 — maximizando a qualidade de cada vídeo gerado."
  ),
  fillStep(
    "Roteirize com raciocínio antes de gerar!",
    "Extraia fragmentos decupados da visão geral para o preenchimento algorítmico da tela fluida sem atritos de transição.",
    "\"Com o Nano Banana Pro ativado, crie um roteiro de [___] cenas para um vídeo sobre [___]. Para cada cena descreva: o que acontece, o [___] de câmera, a [___] e o [___] — prontos para usar como prompt no Veo 3.1. Explique o [___] criativo por trás de cada escolha.\"",
    ["6", "o lançamento de um tênis esportivo premium", "movimento", "iluminação", "áudio sugerido", "raciocínio"],
    ["6", "o lançamento de um tênis esportivo premium", "movimento", "iluminação", "áudio sugerido", "raciocínio"],
    "O método dedutivo em blocos cimenta a consistência de iluminação, áudio e ritmo sequencial do videoclipe artificial inteiro."
  ),
  textStep(
    "Boas Práticas com Nano Banana Pro e Veo 3.1",
    "Adoção plena de ferramentas sinérgicas garante governança sobre os submundos imaginativos das redes neurais convolucionais e espaciais."
  ),
  fillStep(
    "Use as ferramentas com estratégia!",
    "Mantenha-se lúcido sob a batuta irrefutável de maestro e supervisor primário da cadeia laboratorial eletrônica.",
    "\"Ao usar o [___], sempre peça para ele [___] suas escolhas antes de gerar a imagem. Ao usar o [___], descreva o [___] de câmera e o [___] de forma clara. Para projetos complexos, [___] o conceito visual com o Nano Banana Pro antes de [___] com o Veo 3.1.\"",
    ["Nano Banana Pro", "explicar", "Veo 3.1", "movimento", "áudio", "valide", "animar"],
    ["Nano Banana Pro", "explicar", "Veo 3.1", "movimento", "áudio", "valide", "animar"],
    "Forçar o relatório cognitivo antes de prosseguir com recursos avassaladores da máquina é o apelo soberano incontornável da racionalidade humana de vanguarda."
  ),
  textStep(
    "Conclusão",
    "Com o Nano Banana Pro e o Veo 3.1 integrados ao Gemini, você tem um estúdio criativo completo que raciocina antes de criar. Imagens geradas com inteligência, vídeos com movimento realista e áudio sincronizado, fluxos criativos integrados e refinamentos progressivos — tudo em uma única plataforma.\n\nCriadores que entendem como ativar e combinar essas ferramentas não apenas produzem mais rápido — produzem com mais precisão, mais coerência visual e menos retrabalho.\n\nA ideia é sua. O raciocínio e a execução são do Gemini.\n\nLição concluída ✓"
  )
] as const;

export const GEMINI_MODULE_6_STEPS_EN = [
  textStep(
    "Gemini for Video and Photo Creation — with Nano Banana Pro and Veo 3.1",
    "Welcome back! In this lesson, you will learn how Gemini becomes a complete visual creation studio with two powerful integrations: Nano Banana Pro for reasoning and image generation, and Veo 3.1 for cinematic quality video creation.\n\nGemini has evolved far beyond a text assistant. With Nano Banana Pro and Veo 3.1 integrated, it has become a complete visual creation platform—generating professional images and realistic videos from natural language descriptions, without needing any external software."
  ),
  textStep(
    "Nano Banana Pro — Visual Reasoning and Generation",
    "Nano Banana Pro is the advanced reasoning model integrated into Gemini. As you can see in the interface, it appears as \"Show reasoning (Nano Banana Pro)\" — which means that before generating any image or complex response, it thinks, analyzes, and plans the outcome. This is what makes images generated by Gemini more accurate, coherent, and contextually correct."
  ),
  textStep(
    "How Nano Banana Pro's Reasoning Improves Your Images",
    "When you activate Nano Banana Pro's reasoning, Gemini does not jump straight to generation. It first interprets your prompt, identifies ambiguities, decides on style, composition, and lighting—and only then does it generate the image. This drastically reduces the number of attempts to reach the ideal result."
  ),
  fillStep(
    "Activate visual reasoning!",
    "Determine all the composition guidelines forcing the machine to reflect on the details.",
    "\"With Nano Banana Pro activated, generate an image of [___] in [___] style, with [___] lighting, [___] in the background, conveying a sense of [___]. Before generating, [___] your choices of composition and style.\"",
    ["a young scientist in a modern lab", "editorial photorealistic", "cold and bluish with equipment reflections", "screens with data and research equipment", "intelligence and focus", "explain"],
    ["a young scientist in a modern lab", "editorial photorealistic", "cold and bluish with equipment reflections", "screens with data and research equipment", "intelligence and focus", "explain"],
    "Knowing the machine's visual construction logic instructs the prompter to continually improve subsequent inputs."
  ),
  textStep(
    "Complete Structure of a Visual Prompt for Nano Banana Pro",
    "To extract the maximum from Nano Banana Pro, your prompt needs well-defined layers — the more context you provide, the smarter the reasoning applied before generation will be."
  ),
  fillStep(
    "Build your prompt in layers!",
    "Configure the elementary pieces of a precise photographic shot.",
    "\"[___] of [___], [___] in an [___], [___] lighting, [___] style, [___] perspective, [___] depth of field, [___] colors, and [___] quality.\"",
    ["Realistic photography", "a chef preparing a sophisticated dish", "in motion", "open professional kitchen", "dramatic and warm coming from the stoves", "gastronomic editorial", "low camera looking up", "shallow", "earthy and vibrant", "ultra-detailed 8K"],
    ["Realistic photography", "a chef preparing a sophisticated dish", "in motion", "open professional kitchen", "dramatic and warm coming from the stoves", "gastronomic editorial", "low camera looking up", "shallow", "earthy and vibrant", "ultra-detailed 8K"],
    "Providing physical, lens, and palette guidelines isolates the free (and often erroneous) interpretation that artificial intelligence adopts for mathematical comfort."
  ),
  textStep(
    "Refining Images with Nano Banana Pro",
    "After generation, you can ask for specific adjustments. Nano Banana Pro will reason about what to change while preserving what was already working."
  ),
  fillStep(
    "Refine with reasoning!",
    "Order the exact changes and understand how the visual system will process them.",
    "\"The generated image is good, but I want to adjust: change the [___] to more [___] tones, add [___] in the scene, alter the [___] to be [___], and explain how these changes will [___] the visual impact before generating.\"",
    ["palette", "cold and nocturnal", "neon reflections on the wet floor", "character's expression", "more determined and intense", "improve"],
    ["palette", "cold and nocturnal", "neon reflections on the wet floor", "character's expression", "more determined and intense", "improve"],
    "Refining by isolating elements ensures the plastic continuity of the first generation."
  ),
  textStep(
    "Veo 3.1 — Video Generation Integrated into Gemini",
    "Veo 3.1 is the latest and most advanced version of Google's video generation model, integrated directly into Gemini. It generates videos with realistic movement, consistent physics, synchronized ambient audio, and cinematic quality — all from text descriptions."
  ),
  textStep(
    "Creating Videos with Veo 3.1",
    "To generate high-quality videos with Veo 3.1, the prompt must clearly and intricately describe the scene, camera movement, visual style, and audio."
  ),
  fillStep(
    "Create your video with Veo 3.1!",
    "Assemble in text what the virtual lens will shoot perfectly.",
    "\"Using Veo 3.1, generate a [___] second video showing [___]. Camera movement: [___]. Style: [___]. Lighting: [___]. Audio: [___]. The scene should convey [___].\"",
    ["10", "a futuristic city at dawn with flying cars passing between skyscrapers", "drone descending slowly from above towards the streets", "cinematic and photorealistic", "golden hour with bluish mist between the buildings", "sounds of the city of the future with soft electronic ambient music", "hope and movement"],
    ["10", "a futuristic city at dawn with flying cars passing between skyscrapers", "drone descending slowly from above towards the streets", "cinematic and photorealistic", "golden hour with bluish mist between the buildings", "sounds of the city of the future with soft electronic ambient music", "hope and movement"],
    "Orchestrating the layers of lighting, mundane noises, and set movement replaces the giant and costly gears of old Hollywood."
  ),
  textStep(
    "Using Veo 3.1 for Different Formats",
    "Veo 3.1 adapts to different styles and formats — from cinematic to advertising, from documentary to artistic."
  ),
  fillStep(
    "Choose your format!",
    "Switch the filmographic set directive in just two descriptive lines.",
    "\"Generate a video in the style of an [___] showing [___]. Use [___] to create a [___]. The audio should feature [___], and the result should look like it was produced by an [___].\"",
    ["intimate documentary", "an artisan sculpting a ceramic piece with their hands", "detailed close-ups and slow motion during moments of precision", "feeling of patience and mastery", "natural sounds of clay and soft instrumental music", "award-winning international documentary"],
    ["intimate documentary", "an artisan sculpting a ceramic piece with their hands", "detailed close-ups and slow motion during moments of precision", "feeling of patience and mastery", "natural sounds of clay and soft instrumental music", "award-winning international documentary"],
    "Commanding classic film aesthetics bestows low-budget, tight-deadline productions with an indescribably monumental gravity."
  ),
  textStep(
    "Combining Nano Banana Pro and Veo 3.1 in the Same Workflow",
    "The most powerful combination is using Nano Banana Pro to create and refine the visual reference, and Veo 3.1 to animate that scene — all within the same creative flow in Gemini."
  ),
  fillStep(
    "Combine the two tools!",
    "Perform the flawless transplant of the perfectly molded still frame to resounding fluid kinematics.",
    "\"First use [___] to generate and reason about an image of [___] with a [___] style. Then use [___] to create a [___] second video based on this visual reference, adding [___] and synchronized ambient [___].\"",
    ["Nano Banana Pro", "a deserted beach at dusk with waves breaking softly", "photorealistic and cinematic", "Veo 3.1", "12", "a slow zoom-in camera movement", "audio"],
    ["Nano Banana Pro", "a deserted beach at dusk with waves breaking softly", "photorealistic and cinematic", "Veo 3.1", "12", "a slow zoom-in camera movement", "audio"],
    "Fusing the two logical algorithmic minds voids the dangers of plastic hallucination, shielding the definitive vital frame right at the moment of continuous digital recording."
  ),
  textStep(
    "Scripting Scenes for Veo 3.1 with Nano Banana Pro's Reasoning",
    "Gemini with Nano Banana Pro activated can create highly detailed scene scripts to use as prompts in Veo 3.1 — maximizing the quality of each generated video."
  ),
  fillStep(
    "Script with reasoning before generating!",
    "Extract decoupled fragments from the overarching vision to algorithmically flesh out the fluid canvas without transitional friction.",
    "\"With Nano Banana Pro activated, create a [___]-scene script for a video about [___]. For each scene describe: what happens, the camera [___], the [___], and the suggested [___] — ready to use as a prompt in Veo 3.1. Explain the creative [___] behind each choice.\"",
    ["6", "the launch of a premium athletic sneaker", "movement", "lighting", "audio", "reasoning"],
    ["6", "the launch of a premium athletic sneaker", "movement", "lighting", "audio", "reasoning"],
    "The deductive block method cements the consistency of lighting, audio, and sequential rhythm of the entire artificial music video."
  ),
  textStep(
    "Best Practices with Nano Banana Pro and Veo 3.1",
    "Full adoption of synergistic tools guarantees governance over the imaginative underworlds of convolutional and spatial neural networks."
  ),
  textStep(
    "Conclusion",
    "With Nano Banana Pro and Veo 3.1 integrated into Gemini, you command a complete creative studio that actually reasons prior to executing. Images forged with intellect, videos boasting realistic physics and sound, unified pipelines, and progressive polishing — all under a single dashboard.\n\nCreators who grasp how to interlock these modules don't just yield content faster — they architect it with heightened precision, superior visual coherence, and severely reduced backtracking.\n\nThe genesis is yours. The cognitive heavy-lifting and pixel execution belong to Gemini.\n\nLesson complete ✓"
  )
] as const;
export const GEMINI_MODULE_6_STEPS_ES = [
  textStep(
    "Gemini para Creación de Videos y Fotos — con Nano Banana Pro y Veo 3.1",
    "¡Bienvenido de nuevo! En esta lección, aprenderás cómo Gemini se convierte en un estudio de creación visual completo con dos potentes integraciones: Nano Banana Pro para el razonamiento y la generación de imágenes, y Veo 3.1 para la creación de videos con calidad cinematográfica.\n\nGemini ha evolucionado mucho más allá de ser un asistente de texto. Con Nano Banana Pro y Veo 3.1 integrados, se ha convertido en una plataforma completa de creación visual: genera imágenes profesionales y videos realistas a partir de descripciones en lenguaje natural, sin necesidad de software externo."
  ),
  textStep(
    "Nano Banana Pro — Razonamiento y Generación Visual",
    "Nano Banana Pro es el modelo de razonamiento avanzado integrado en Gemini. Como puedes ver en la interfaz, aparece como \"Mostrar razonamiento (Nano Banana Pro)\", lo que significa que antes de generar cualquier imagen o respuesta compleja, piensa, analiza y planea el resultado. Esto es lo que hace que las imágenes generadas por Gemini sean más precisas, coherentes y contextualmente correctas."
  ),
  textStep(
    "Cómo el Razonamiento de Nano Banana Pro Mejora tus Imágenes",
    "Cuando activas el razonamiento de Nano Banana Pro, Gemini no va directo a la generación. Primero interpreta tu prompt, identifica las ambigüedades, decide sobre el estilo, la composición y la iluminación, y recién entonces genera la imagen. Esto reduce drásticamente el número de intentos para lograr el resultado ideal."
  ),
  fillStep(
    "¡Activa el razonamiento visual!",
    "Determina todas las pautas de composición forzando a la máquina a reflexionar sobre los detalles.",
    "\"Con Nano Banana Pro activado, genera una imagen de [___] en estilo [___], con iluminación [___], [___] al fondo y transmitiendo sensación de [___]. Antes de generar, [___] tus opciones de composición y estilo.\"",
    ["una joven científica en un laboratorio moderno", "fotorrealista editorial", "fría y azulada con reflejos de equipos", "pantallas con datos y equipos de investigación", "inteligencia y enfoque", "explica"],
    ["una joven científica en un laboratorio moderno", "fotorrealista editorial", "fría y azulada con reflejos de equipos", "pantallas con datos y equipos de investigación", "inteligencia y enfoque", "explica"],
    "Conocer la lógica de construcción visual de la máquina instruye al creador a mejorar continuamente sus futuras peticiones."
  ),
  textStep(
    "Estructura Completa de un Prompt Visual para Nano Banana Pro",
    "Para extraer al máximo a Nano Banana Pro, tu prompt necesita capas bien definidas: cuanto más contexto le brindes, más inteligente será el razonamiento que se aplique antes de la generación."
  ),
  fillStep(
    "¡Monta tu prompt en capas!",
    "Configura las piezas elementales para un disparo fotográfico preciso.",
    "\"[___] de [___], [___] en [___], iluminación [___], estilo [___], perspectiva [___], [___] profundidad de campo, colores [___] y calidad [___].\"",
    ["Fotografía realista", "un chef preparando un plato sofisticado", "en movimiento", "cocina profesional abierta", "dramática y cálida proviniendo de los fuegos", "editorial gastronómico", "cámara baja mirando hacia arriba", "escasa", "terrosos y vibrantes", "ultra detallada 8K"],
    ["Fotografía realista", "un chef preparando un plato sofisticado", "en movimiento", "cocina profesional abierta", "dramática y cálida proviniendo de los fuegos", "editorial gastronómico", "cámara baja mirando hacia arriba", "escasa", "terrosos y vibrantes", "ultra detallada 8K"],
    "Suministrar indicaciones físicas, de lente y de paleta aísla la libre (y a menudo errónea) interpretación que la inteligencia artificial asume por simple conveniencia."
  ),
  textStep(
    "Refinando Imágenes con Nano Banana Pro",
    "Después de la generación, puedes pedir ajustes específicos. Nano Banana Pro va a razonar sobre qué aspectos cambiar, resguardando todo lo que ya funcionaba bien."
  ),
  fillStep(
    "¡Refina con razonamiento!",
    "Solicita los cambios exactos y comprende cómo procederá el sistema visual.",
    "\"La imagen generada es buena, pero quiero ajustar: cambia la [___] a tonos más [___], adiciona [___] en la escena, modifica la [___] para que parezca [___] y explica cómo estos cambios [___] el impacto visual antes de generar.\"",
    ["paleta", "fríos y nocturnos", "reflejos de neón en el suelo mojado", "expresión del personaje", "más determinada e intensa", "mejorarán"],
    ["paleta", "fríos y nocturnos", "reflejos de neón en el suelo mojado", "expresión del personaje", "más determinada e intensa", "mejorarán"],
    "Aislar elementos a la hora de refinar asegura que se conserve la continuidad plástica del primer avance."
  ),
  textStep(
    "Veo 3.1 — Generación de Videos Integrada a Gemini",
    "Veo 3.1 es la más novedosa versión de los sistemas de generación fluida que ideó Google, y va engranada dentro del propio Gemini. Engendra movimientos físicos reales, armoniza sonido real con el espacio y rinde estampa de la gran pantalla... uniendo meramente un par de palabras bien descritas."
  ),
  textStep(
    "Creando Videos con la Plataforma Veo 3.1",
    "Generar algo digno de exposición demanda que estructures descripciones enjundiosas cubriendo movimientos, ruidos inmersivos, ambiente lumínico, entre otros encuadres fundamentales."
  ),
  fillStep(
    "¡Modela tu obra de Veo 3.1!",
    "Construye lo que la óptica artificial deberá enfocar minuciosamente.",
    "\"Apoyándote en Veo 3.1, quiero un video de [___] segundos en el que surja [___]. Traslación de cámara: [___]. Arte visual: [___]. Luz: [___]. Banda sonora: [___]. Y esta propuesta debe contagiar de inmediato mucha [___].\"",
    ["10", "una metrópoli futurista con autos de vuelo surcando rascacielos", "drone cayendo desde las alturas internándose al fondo de las calles", "fotorrealismo de cine intenso", "golden hour con trazos de neblina azul por los techos", "el rugir lejano de urbes del futuro junto a unas lentas pistas electrónicas", "esperanza tecnológica incansable"],
    ["10", "una metrópoli futurista con autos de vuelo surcando rascacielos", "drone cayendo desde las alturas internándose al fondo de las calles", "fotorrealismo de cine intenso", "golden hour con trazos de neblina azul por los techos", "el rugir lejano de urbes del futuro junto a unas lentas pistas electrónicas", "esperanza tecnológica incansable"],
    "Coordinar a fondo estos componentes extingue drásticamente todas aquellas fastuosas y limitantes rentas de la vieja y lejana época de Hollywood puro."
  ),
  textStep(
    "Utilizando Veo 3.1 en Marcos Extraordinarios",
    "Veo 3.1 se acondiciona a disímiles arquetipos visuales: de la documental inmersiva al clip de publicidad directa con impacto al producto."
  ),
  fillStep(
    "¡Selecciona tu ambiente!",
    "Manipula el timón artístico principal simplemente reeditando dos líneas breves de tu encargo.",
    "\"Requiero esto rodado a forma de un [___] exhibiendo a [___]. Aplica encuadres a manera de [___] originando así profunda [___]. Se debe colar un tono auditivo colmado de [___] bajo la mística de [___].\"",
    ["documental intimista", "un maestro orfebre tallando a ciegas una fina obra en barro", "primerísimos planos extremados bajo un régimen en cámara lenta a plena pulsada", "persistencia pasmosa pero dominada técnica al máximo", "roces y la naturalidad húmeda del propio yeso tocando el fondo sinfónico discreto", "los aclamados informes en canales de historia extranjeros avalados con premios"],
    ["documental intimista", "un maestro orfebre tallando a ciegas una fina obra en barro", "primerísimos planos extremados bajo un régimen en cámara lenta a plena pulsada", "persistencia pasmosa pero dominada técnica al máximo", "roces y la naturalidad húmeda del propio yeso tocando el fondo sinfónico discreto", "los aclamados informes en canales de historia extranjeros avalados con premios"],
    "Inyectar las filosofías más aplaudidas del plató dota hasta el más ínfimo esfuerzo publicitario de un aplomo inestimable para una retina humana que se impacta de veras."
  ),
  textStep(
    "Integración Conjunta: Nano Banana Pro y Veo 3.1",
    "El poderío más descomunal se consigue inmiscuyéndolo a Nano como proponente maestro inamovible de la visual, y luego activando al poderoso motor Veo para echar a andar dicha proeza fotográfica final generada de cero."
  ),
  fillStep(
    "¡Funde a estos colosos!",
    "Realiza incólume la transposición quirúrgica de un marco pictórico supremo para darle vida sinfónica estelar y sin costuras.",
    "\"Al principio, sírvete de [___] al fin de deliberar y gestarme un fotograma de [___] a purísimo y genuino aire [___]. Inmediatamente empalma a [___] para que a base puntual y fidedigna de ésto irradies una trama de [___] segundos introduciéndole [___] mientras detonas un sincronizado despliegue de [___].\"",
    ["Nano Banana Pro", "playa despoblada en pleno atardecer con sus aguas lamiendo el borde sereno", "cine y fotorrealismo apabullante", "Veo 3.1", "12", "movilidad inamovible penetrante casi reptante", "audio envolvente natural al ocaso desierto"],
    ["Nano Banana Pro", "playa despoblada en pleno atardecer con sus aguas lamiendo el borde sereno", "cine y fotorrealismo apabullante", "Veo 3.1", "12", "movilidad inamovible penetrante casi reptante", "audio envolvente natural al ocaso desierto"],
    "Alear en plena sinergia estos hemisferios algorítmicos borra toda amenaza de un final plástico amorfo y desconectado, encuadrando definitivamente el cuadro visual."
  ),
  textStep(
    "Ideando Escenarios Hacia Veo 3.1 Acompañado del Razonar del Modelo Nano",
    "Si tienes esta fusión plenamente operativa vas a disfrutar a un libretista metódico en tus manos para pautar tus peticiones formales con extrema precisión hacia Veo 3.1 multiplicando dramáticamente lo impecable del rollo en pantalla grande subsiguiente para ti."
  ),
  fillStep(
    "¡Traza una película guionada razonadamente!",
    "Destila por fin esos bocetos difusos obligándolos a cristalizar matemáticamente antes de dar la bendición o la marcha a una transición lisa en rodaje sin roces ni malinterpretaciones o sorpresas.",
    "\"Reuniendo plenos poderes con tu Nano activísimo por allí, invéntame una bitácora exhaustiva que contemple exactamente [___] cortes de película para filmar en el set de [___]. De modo aislado vas relatando minucias así: lo fáctico, qué hace estrictamente el [___] y qué arroja al fondo la magistral cuota de [___], junto a qué demonios propusiste de [___] base —para ser digerido por Veo 3.1 luego. A cada paso fundaméntalo bajo estricto [___] intelectual y creativo para entender las razones artísticas por detrás antes del sí final.\"",
    ["6", "gran lanzamiento del tenis ultra deportivo insignia de la temporada suprema", "juego del marco operando allí en la lente virtual giratoria o estática", "iluminación ambiental de acento en estudio encrespado al rodaje final o en locaciones cálidas a puro rayo natural", "ruido propuesto musical del corto final incisivo a todo el metraje", "razonamiento minucioso en prosa explicativa para nosotros acá fuera para la elección estética que has realizado justificadamente punto por punto a fondo y meticulosa de veras"],
    ["6", "gran lanzamiento del tenis ultra deportivo insignia de la temporada suprema", "juego del marco operando allí en la lente virtual giratoria o estática", "iluminación ambiental de acento en estudio encrespado al rodaje final o en locaciones cálidas a puro rayo natural", "ruido propuesto musical del corto final incisivo a todo el metraje", "razonamiento minucioso en prosa explicativa para nosotros acá fuera para la elección estética que has realizado justificadamente punto por punto a fondo y meticulosa de veras"],
    "Exigir desmembramientos en bloques forzosamente al algoritmo ancla indiscutiblemente la consistencia tonal a una banda de filmación secuencial totalmente inquebrantable a un nivel y estatus virtual de obra casi premiada internacional y consagrada para cualquier mortal frente a nosotros asistentemente."
  ),
  textStep(
    "Consolidando Formas Excelentes Operativas del Nano con el Motor Fílmico Veo",
    "Estabilizando su compenetración obtendrás poder incontestable sobre cualquier ramaje y senda imaginaria forjada a voluntad y antojo en todos los circuitos cibernéticos espaciales a disposición masiva de un operador sensato."
  ),
  fillStep(
    "¡Estrategina Férreamente la Táctica Sintética!",
    "Erígete dueño de la ejecución no declinando a la herramienta sino adiestrándola sin titubeos.",
    "\"Mientras manejes al afamado [___], asegúrate de inquirir siempre que él mismísimo te venga a [___] sin demora las decisiones que toma antes de renderizar pixel alguno por ti. Al turno de accionar sobre las entrañas plásticas del asombroso [___], traza la geometría exacta y natural de tu [___] visual e imperativamente cuelga una nota de tu [___] con nitidez allí. Ante desafíos enrevesados, mejor [___] primero íntegra y exhaustivamente para tu bienestar visual general el esqueleto referencial de ideas valiéndose a fondo de él; para que luego sí y con luz verde, [___] dócilmente allí con este aludido coloso fílmico de alta escuela que le rinde obediencia.\"",
    ["Nano Banana Pro", "esgrimir/explicar", "Veo 3.1", "deslizamiento dinámico cinético o recorrido visual", "sonido natural envolvente ambiental a oídos", "aprueba in situ reflexivamente para luego y validar la estética a fondo real", "inicies la faena vital impulsora dotadora de movimiento al esqueleto para que logres transicionarlo o dotarlo de espíritu animador virtual real para"],
    ["Nano Banana Pro", "esgrimir/explicar", "Veo 3.1", "deslizamiento dinámico cinético o recorrido visual", "sonido natural envolvente ambiental a oídos", "aprueba in situ reflexivamente para luego y validar la estética a fondo real", "inicies la faena vital impulsora dotadora de movimiento al esqueleto para que logres transicionarlo o dotarlo de espíritu animador virtual real para"],
    "Arrancar al bot el esquema lógico mental suyo como garantía pre dictamen, nos devuelve y restituye ese timón superior del cual somos históricamente poseedores frente a todas las fuerzas inconmensurables puestas por máquinas bajo el poder creador de avanzada intelectual imperativo acá hoy."
  ),
  textStep(
    "Desenlace Absoluto",
    "Teniendo integrados a pulso exacto a la dupla Nano Banana y Veo tres punto uno encima de la sombrilla del afamado Gemini hoy aquí en esta clase vital magistral, ya pasas de aprendiz a capitán supremo general orquestador al mando desde arriba. Retratos creados desde masa gris algorítmica brillante en su lugar; clips vibrantes presumiendo una dinámica viva incuestionable con física alucinantemente veraz en imagen como un sonido colado hasta encuadrado; cadenas de trabajo ensambladas hombro a hombro y en pulimientos finos orgánicos milimétricos, los tienes en la propia consola tuya acá lista para tu dedo en ella sobre cada click tuyo ahora aquí abajo… todo de una tirada y a golpe y ritmo de voz natural allí donde posas la vista.\n\nEl artista moderno sabio que exprime encadenar a los dos gigantes no saca su encargo raudamente más deprisa no más —adquiere y ejecuta maravillas estrambóticas dotadas de cirugías maestras finas superiores de pura contundencia plástica coherente despojada en simultáneo del eterno problema terrenal antiguo amargo cruel e insoportable del perverso rehacer manual del pasado para ir retocando atrás el fallo enorme originario tuyo ahí.\n\nLa esencia divina original de las cosas es únicamente tuya. Entenderla por entero, desgranarla en pedacitos crudos duros milimétricos y encenderle vida mágica e imprimirla, esas proezas le atañen y se las cobra su servidor Gemini sin excusas el día de hoy aquí.\n\nFormación impecablemente sellada para tu saber ✓"
  )
] as const;
export const GEMINI_MODULE_6_STEPS_FR = [
  textStep(
    "Gemini pour la Création de Vidéos et de Photos — avec Nano Banana Pro et Veo 3.1",
    "Bienvenue à nouveau ! Dans cette leçon, vous allez apprendre comment Gemini se transforme en un véritable studio de création visuelle avec deux intégrations puissantes : Nano Banana Pro pour le raisonnement et la génération d'images, et Veo 3.1 pour la création de vidéos de qualité cinématographique.\n\nGemini a évolué bien au-delà du simple assistant textuel. Avec Nano Banana Pro et Veo 3.1 intégrés, il devient une plateforme complète de création visuelle — générant des images professionnelles et des vidéos réalistes à partir de descriptions en langage naturel, sans avoir besoin d'aucun logiciel externe."
  ),
  textStep(
    "Nano Banana Pro — Raisonnement et Génération Visuelle",
    "Nano Banana Pro est le modèle de raisonnement avancé intégré à Gemini. Comme vous pouvez le voir sur l'interface, il apparaît sous l'intitulé \"Montrer le raisonnement (Nano Banana Pro)\" — ce qui signifie qu'avant de générer une image ou une réponse complexe, il réfléchit, analyse et planifie le résultat. C'est ce qui rend les images générées par Gemini plus précises, plus cohérentes et contextuellement beaucoup plus justes."
  ),
  textStep(
    "Comment le Raisonnement de Nano Banana Pro Améliore vos Images",
    "Lorsque vous activez le raisonnement de Nano Banana Pro, Gemini ne se précipite pas directement vers la génération. Il interprète d'abord votre requête, y détecte les ambiguïtés, décide du style, de la composition et de l'éclairage — et alors seulement il génère l'image. Cela réduit de manière spectaculaire le nombre de tentatives nécessaires pour arriver au résultat idéal."
  ),
  fillStep(
    "Activez le raisonnement visuel !",
    "Déterminez toutes les consignes de composition pour obliger la machine à réfléchir sur les moindres détails.",
    "\"Avec Nano Banana Pro activé, génère une image d'une [___] dans un style [___], avec un éclairage [___], des [___] en arrière-plan et transmettant une forte sensation d'[___]. Avant de générer, [___] minutieusement tes choix de composition et de style.\"",
    ["jeune scientifique dans un laboratoire moderne", "photoréaliste éditorial", "froid et bleuté avec des reflets d'équipement", "écrans avec des données et équipements de recherche", "intelligence et de concentration", "explique"],
    ["jeune scientifique dans un laboratoire moderne", "photoréaliste éditorial", "froid et bleuté avec des reflets d'équipement", "écrans avec des données et équipements de recherche", "intelligence et de concentration", "explique"],
    "Connaître la logique de construction visuelle de la machine aide le créateur à toujours améliorer ses instructions futures."
  ),
  textStep(
    "Structure Complète d'un Prompt Visuel pour Nano Banana Pro",
    "Afin de tirer le plein potentiel de Nano Banana Pro, votre indication nécessite des strates bien définies — plus vous donnez de contexte, plus le raisonnement appliqué avant la génération va s'illustrer de manière brillante."
  ),
  fillStep(
    "Créez un prompt en plusieurs strates !",
    "Configurez les pièces élémentaires pour obtenir un cliché photographique ultra pertinent.",
    "\"[___] d'un [___], [___] dans une [___], éclairage [___], style [___], perspective de [___], profondeur de champ [___], couleurs [___] et qualité [___].\"",
    ["Photographie réaliste", "chef préparant un plat sophistiqué", "en mouvement", "cuisine professionnelle ouverte", "dramatique et chaud provenant des fourneaux", "éditorial gastronomique", "caméra basse regardant vers le haut", "limitée", "terreuses et vibrantes", "ultra détaillée 8K"],
    ["Photographie réaliste", "chef préparant un plat sophistiqué", "en mouvement", "cuisine professionnelle ouverte", "dramatique et chaud provenant des fourneaux", "éditorial gastronomique", "caméra basse regardant vers le haut", "limitée", "terreuses et vibrantes", "ultra détaillée 8K"],
    "Apporter des directives physiques, géométriques et typiques isole l'interprétation arbitraire (et souvent ratée) que cette entité endosse sinon par confort d'exécution."
  ),
  textStep(
    "Améliorer ou Peaufiner une Image grâce à l'Architecture Nano Banana Pro",
    "Dès le rendu disponible, ajuster ponctuellement a du sens. Le Nano Banana Pro reconsidère logiquement ses points d'ancrage en ajustant doucement sans ruiner le fond qualitatif obtenu."
  ),
  fillStep(
    "Retouchez avec l'intellect !",
    "Pilotez les corrections parfaites en visualisant comment le processeur graphique encaisse ces retours sans heurt.",
    "\"Cette ébauche-ci s'avère correcte, cependant permettons cette variante : passe toute la [___] vers des nuances carrément [___], déploie fortement [___] au milieu de la scène, mue farouchement la [___] plus vers quelque chose [___] et décris distinctement comment de telles variations se doivent d'[___] le sens total par rapport au brouillon originel justifiant ce choix visuel là.\"",
    ["palette globale", "froides et nocturnes", "tout pleins de lumières frémissantes en reflet au sol détrempé bas", "physionomie faciale dudit bonhomme", "d'immensément déterminée puis vive de force", "enjoliver solidement"],
    ["palette globale", "froides et nocturnes", "tout pleins de lumières frémissantes en reflet au sol détrempé bas", "physionomie faciale dudit bonhomme", "d'immensément déterminée puis vive de force", "enjoliver solidement"],
    "Une correction parcellaire conforte de façon inébranlable la texture et plastique fondatrice du dessin primordial intact à côté."
  ),
  textStep(
    "Veo 3.1 — Production Vidéo S'immisçant dans l'Ame Gemini",
    "Veo 3.1 incarne l'archétype sublime des évolutions d'illustration vidéo par Google en date d'aujourd'hui, fermement imbriqué dans l'intranet même de Gemini ici présent. Il produit des actions motrices à fluidité réelle, réclame le loisir indéfectible d'une ambiance sonore qui a trait et calque et la trempe photographique de classe supérieure a toute liseuse d'information dactylographiée à l'écran."
  ),
  textStep(
    "Fonder Un Récit Via le Prisme Cinétique du Mode Veo 3.1",
    "Créer des courts-métrages vertigineux dignes du festival sollicite impérieusement une maitrise syntaxique descriptive riche conjuguant : actions, travelling virtuelles de perspective, style ambiant ainsi de l'orchestration musicale posée minutieusement a toute fin utile par avance avant d'appuyer pour de bon sur GO de façon explicite au moyen des bons mots."
  ),
  fillStep(
    "Orchestrez le flux pur du film Veo 3.1 a pleine vapeur formelle nette et exempte de failles !",
    "Assemblez de manière méticuleuse là l'objet exact qu'immortalisera sans défaut cette machinerie aveugle en arrière-cour.",
    "\"Exigeant de l'architecture sublime logée dans Veo 3.1 un métrage actif de [___] longues secondes de visu fixant impitoyablement à l'œil central une immense [___]. Dynamique du cadre à savoir [___]. Courant de sens design ici attendu: [___]. Aura solaire projetée là-bas au loin [___]. Sonification environnementale [___]. Toute la saynète devra vibrer au cœur du lecteur spectateur un pan de sentiment indéniable porteur résolument autour du feu d'une [___].\"",
    ["10", "mégapole d'une époque futuriste à la charnière de son tout petit matin constellée d'engins circulant haut perchés flottant au sein des édifices faramineux et pointus", "plongée radiale et de grand large via aéronef versant avec douce lenteur sa voilure tout au creux intime de la rue endormie", "photoréalisme saisissant digne des écrans larges géants ou panoramiques des grands festivals d'arts majeurs au cinéma pur", "golden hour crépusculaire habillée lâchement loupé de cette aura bleuâtre fumante typique entre de froids gratte-ciels alignés serrés", "bruissements caractéristiques d'ère du lointain futur adoucie merveilleusement bercée en musique de basse fréquence fine lancinante en arpèges oniriques électroniques à tempo moyen discret là-dedans ce clip sublime a part", "certitude infinie ou de promesse irréversible en vol en un bond perpétuel d'avenir réjoui permanent sans anicroche du tout de l'humanité a vivre heureux sans faillir ensemble un jour a tous"],
    ["10", "mégapole d'une époque futuriste à la charnière de son tout petit matin constellée d'engins circulant haut perchés flottant au sein des édifices faramineux et pointus", "plongée radiale et de grand large via aéronef versant avec douce lenteur sa voilure tout au creux intime de la rue endormie", "photoréalisme saisissant digne des écrans larges géants ou panoramiques des grands festivals d'arts majeurs au cinéma pur", "golden hour crépusculaire habillée lâchement loupé de cette aura bleuâtre fumante typique entre de froids gratte-ciels alignés serrés", "bruissements caractéristiques d'ère du lointain futur adoucie merveilleusement bercée en musique de basse fréquence fine lancinante en arpèges oniriques électroniques à tempo moyen discret là-dedans ce clip sublime a part", "certitude infinie ou de promesse irréversible en vol en un bond perpétuel d'avenir réjoui permanent sans anicroche du tout de l'humanité a vivre heureux sans faillir ensemble un jour a tous"],
    "Mettre au pas savamment de l'écrit seul un spectre si immense d'éléments tels que bruit de scène profond ainsi de position de réflecteur éradique froidement et de revers et avec une prestance redoutable quasi royale le fardeau colossale des plateaux coûteux pharaoniques archaïques."
  ),
  textStep(
    "Modeler l'Usine Veo Vers Tant de Prismes Narratifs Complètement Divergents et Opposés A Ce Propos-Là Alors Ensemble Du Même Endroit Unique",
    "Veo 3.1 va obéir à tous les grands patrons d'archétypes à diffuser ; documenteur, d'un encart fielleux de grand spot capitaliste du marketing aisé à des encarts arty mystérieux lents lourds poétiques aussi tout naturellement sans rechigner à aucun encart nouveau et à ce niveau qualitatif attendu formellement sans aucune excuse qui le vaille et aucune réserve de code par ailleurs ce qui libérera des charges monumentales à tout grand directeur par le fait de lui être aussi si facilement domptable ainsi au plus grand profit de sa maison mere en somme via seulement de belles requêtes affinées avant cela sans coup de plus financier."
  ),
  fillStep(
    "Embrassez le Prisme Stylistique Idéal !",
    "Subtilisez par une fraction succincte textuelle rédigée finement une volte face entière d'architrame filmique a réaliser la sans douleur ni délais ou de coût exponentiel pour ce set tourné par l'IA.",
    "\"Exécute fidèlement un plan filmé respectant grandement à la lettre une approche globale de type bien [___] étalant devant ainsi l'œil [___]. Assis la caméra en imposant scrupuleusement la vision de ces [___] ceci ayant pour vertu noble pure de fomenter la toute première impulsion vitale en mon tréfonds là même et qui se dit comme un parfum fort singulier et ineffable soit d'une [___]. Sur cette fine toile viendra tapisser ou napper le fond de tout l'événement en question purement via force et au travers magiquement la seule perception la d'[___], afin qu'à la livraison le tout sente avec un vrai bonheur de prestance et d'art subtil pour finir majestueux ceci : à l'image des [___] de renoms pour tout dire.\"",
    ["intime de par sa forme grand documentaire auteur", "vieux tailleur sur pierre façonnant presque sous un touché magique l'argile à même doigt nu à main", "très gros plans appuyés massifs ou lents pour ne pas du tout de rien dire et insistant amplement du lourd du très lent magnifiant chacun l'extrême grand doigté par moments ultra serrés pour voir de la poussière d'instant précieux se cristalliser au millimètre de rien", "imposante et belle patience majestueuse tout d'une de cette immense sagesse ancienne noble à la tache", "sonorité rocailleuse pure de la glaise caressée ainsi qu'arpèges instrumentaux légers onctueux doux discrets accompagnants la lente course de cela à l'oreille fine sans la brutalité pour de la grandeur", "ceux fameux grand film étranger lauréat des très hauts grands festival et raflant la mise à la critique exigeante snob là de ce monde des arts nobles pour être dit ici"],
    ["intime de par sa forme grand documentaire auteur", "vieux tailleur sur pierre façonnant presque sous un touché magique l'argile à même doigt nu à main", "très gros plans appuyés massifs ou lents pour ne pas du tout de rien dire et insistant amplement du lourd du très lent magnifiant chacun l'extrême grand doigté par moments ultra serrés pour voir de la poussière d'instant précieux se cristalliser au millimètre de rien", "imposante et belle patience majestueuse tout d'une de cette immense sagesse ancienne noble à la tache", "sonorité rocailleuse pure de la glaise caressée ainsi qu'arpèges instrumentaux légers onctueux doux discrets accompagnants la lente course de cela à l'oreille fine sans la brutalité pour de la grandeur", "ceux fameux grand film étranger lauréat des très hauts grands festival et raflant la mise à la critique exigeante snob là de ce monde des arts nobles pour être dit ici"],
    "Commander de manière martiale au prompt de géniales épopées nobles jadis coûteuses accorde la victoire aisé à quiconque créera ce bijou monumental virtuel d'image doté de toute éternité de prestance malgré les pauvres maigres petits sous alloués par son bureau chiche."
  ),
  textStep(
    "Accouplement Puissant Nano Pro Visuel Réflexif Pour Le Flux Veo Filmique Global Continu Unique",
    "Le summun pour la créativité est à coup sûr l'imbrication étroite. Figer l'excellence statique en raisonner amont pour son style (Nano), pour ensuite balancer le flux sans failles (Veo) donne le tempo impérial parfait pur et sublime sous Gemini en même bloc sans failles de bout sans rien perdre là pour tout ce travail uni en parfaite logique et suite au sein un seul espace créateur souverain absolu avec vous comme roi ou directeur pour ce tout. Allons-y alors sans crainte de rater ! Apprenons ensemble au mieux ce principe unique par ci. Allons voir ce qu'il peut faire mieux avec."
  ),
  fillStep(
    "Joignez La Maîtrise Outil-Double !",
    "La clef dorée de voute sublime revient à clouer fixement du dur le beau du fixe d'avant d'insuffler prodigieusement du génie ou fluide de temps continu avec, tel le miracle des temps animés virtuels contemporains via d'IA. Ainsi sans plus et hop sans peur en un clic, à toi les manettes ici du bon sans faux bond au but visé précis là ce soir pour toute de suite a votre maitrise claire à fond formel pur grand dieu ! Voyons ! Que faire avec et ou ? Ici :",
    "\"Je requiers de me concevoir initialement par du raisonné fort le bel écrin au sein pur grâce [___] de façon sublime via [___] dans ce très lourd jus visuel d'esprit [___]. Seulement dès aval au rendu ok, actionne avec force sans appel tout via majesté ce dit là, le féroce et tout dernier moteur puissant ici de [___] lui demandant instamment fort l'éclosion du clip film là via durée imposante et de pas moins de ces intenses très long [___] secondes appuyées fortes dessus la très noble de susdit vision fixée, incluant pour le chic et drame absolu mouvement visuel imposé à l'appareil de ce type à présent pour le beau final en force là; [___] et sans clore sans rajouter encore un gros très gros du bien senti en bande acoustique tel ce que l'on voudra bien être et paraître là [___].\"",
    ["Nano Banana Pro", "grève abandonnée crépusculaire au calme ressac d'océan évanoui de bord doux caressant tendrement aux brisants fins du large des flots bleus de nuit de feu", "totalement photo authentique sublime a frémir aux tripes pur jus de pur du lourd grand très cinéma pur grandiloquent noblement magistrale sans faillir l'âme au vent d'étoiles fines un peu", "Veo 3.1", "12", "avancée bien menée calme majestueuse et puissamment englobante doucereusement en approches douces des choses de pres sans aucune de viles précipitation gâchant toute vision magistrale noble un peu sereinement sans brutal", "de bruitage du lieu du songe en accord sonore d'ambiance raccord en pleine harmonie natifs d'un vrai souffle ambiante vrai très clair à la mer un peu doux discret un peu au crépuscule d'horizon de là pour lui"],
    ["Nano Banana Pro", "grève abandonnée crépusculaire au calme ressac d'océan évanoui de bord doux caressant tendrement aux brisants fins du large des flots bleus de nuit de feu", "totalement photo authentique sublime a frémir aux tripes pur jus de pur du lourd grand très cinéma pur grandiloquent noblement magistrale sans faillir l'âme au vent d'étoiles fines un peu", "Veo 3.1", "12", "avancée bien menée calme majestueuse et puissamment englobante doucereusement en approches douces des choses de pres sans aucune de viles précipitation gâchant toute vision magistrale noble un peu sereinement sans brutal", "de bruitage du lieu du songe en accord sonore d'ambiance raccord en pleine harmonie natifs d'un vrai souffle ambiante vrai très clair à la mer un peu doux discret un peu au crépuscule d'horizon de là pour lui"],
    "Cristalliser via la très sage instance pensée à l'image des erreurs prévisibles l'état du fixe va couper vif l'herbe des pieds froids a de grandes chimères hasardeuses ou autres délires monstrueux générés au moment d'aborder sans filet dur avec la très dure machine cinétique le Veo la grande scène fluide du très beau final ou de gros bugs couteux auraient frappés si ce pas n'eut point fait avant par raison. Du bon pour lui en vain de l'outil et sans lourd cout du faux bond total. Ce qu'on écarte ici de fait du chemin !"
  ),
  textStep(
    "Diriger De Manière Scriptée Vers L'Opérateur Veo Assisté Du Très Lourd Penser Structurel et Visuelle Prévisionnel Avec Du Pur Nano, Afin d'En Générer Qu'Excellence Et Que Pas De Déviance Filmique Formelle Ici-Bas Du Premier Choc Jusqu'Au Rendu Brillant Sans Rejet De Code Erreur Aucune Ainsi.",
    "Déployé sous son plein pouvoir de matière grise algorithmique, le bon Nano au prompt se voit très fort qualifié afin de broder ou ficeler d'entiers scripts séquenciers détaillant chaque plan filmique au cheveu prêt. Et que tu envoies d'un coup bien clair pour les cracher aux bons petits et énormes moteurs de ce grand Veo 3.1. Ce stratège écarte la bêtise pure des engins lâchés libres à la folle, il donne loi de composition pour la qualité pure et sure a votre bot aveugle bien que si costaud en la matière vidéo animée au premier regard à tous de nous et vous. Donc allons y gaiement en plan par script sur ce point !"
  ),
  fillStep(
    "Forger Ses Scénarios De Force Par Anticipation Réfléchie Visuelle Du Bon !",
    "Capter d'en haut ou fractionner ton dessein ultime a de justes micro blocs ou des directives prémâchées pour abreuver de fluidité et coulant le grand automate a clip virtuel sans choc abrupt. Avec ordre pur on y est, avec ça là devant pour vous au pur :",
    "\"Exécute je te prie avec tes beaux cerveaux Nano très bien ouvert à la tache ceci pour nous: conçois pour de vrai de vrai de tout pur avec raison : Un bien dense registre du plan en pleine et vraie écriture a hauteur des justes [___] cadres divers du beau récit là pour de vrai clip portant ce grand sujet a dire ici de par: [___]. Alors ici et en ces petits découpages tu mettras l'action vive détaillée; le sens physique à mouvoir la belle mécanique fine de l'optique par [___] imposé ou guidé; avec quoi on éclaire en belle lumière a ce beau jour bien précis ce de par un fond via ce cadre fin d'éblouis la bonne [___], de l'ambiant aussi au rendu audio parfait bien de son juste pour le décor via là un peu beau suggéré : [___] au rendu fort sans faille avec le beau rendu du clip au final, sans faillir le pourquoi le plus noble là au sein de cette tête bien pensante pour ton [___] pur et du meilleur gout pour valider avant a cette tache si vaste en avant Veo 3.1 !\"",
    ["6", "grande et monumentale présentation produit via un grand et noble soulier d’athlétisme premium rare en vue", "mouvement global a mener en vue avec", "lumineuse et sa forte disposition à irradier sans fausse lumière cruelle inepte sur sujet d'au cœur sans ombrer fort du beau avec ca sans faille", "du bruit sonore de pur acoustique ambiance a proposer avec du bel effet sur de ce fond au film final sans aucun couac un peu bien calé sans", "fort lourd beau et profond du pourquoi je prend telle mesure là pour y amener du bon raisonnement de création justifié sans faillir à propos de cette choix précis avant a l'usage un peu pour ce Veo bien guidé ainsi par le cerveau Nano"],
    ["6", "grande et monumentale présentation produit via un grand et noble soulier d’athlétisme premium rare en vue", "mouvement global a mener en vue avec", "lumineuse et sa forte disposition à irradier sans fausse lumière cruelle inepte sur sujet d'au cœur sans ombrer fort du beau avec ca sans faille", "du bruit sonore de pur acoustique ambiance a proposer avec du bel effet sur de ce fond au film final sans aucun couac un peu bien calé sans", "fort lourd beau et profond du pourquoi je prend telle mesure là pour y amener du bon raisonnement de création justifié sans faillir à propos de cette choix précis avant a l'usage un peu pour ce Veo bien guidé ainsi par le cerveau Nano"],
    "Convier l'arsenal et ses gros canons de logique deductive par strates de scripts fermement découpés grave fermement de cohésion ou du fil commun d'acoustique ou des rayons, et tout l'élan continu séquentiel ou du vide clip musical d'artificiel absolu se mue de chaos a tout chef œuvre du moment."
  ),
  textStep(
    "Démarche Du Maître, Règles Et Process Virtuose Total Via Notre Veo A L'Oeil Avec Nano !",
    "Capter de bout en bout ferme la bride de contrôle sans jamais baisser du rang les forces sombres des matrices mathématiques et spacieuses du grand Google sur l'art des toiles vierges pixelisés magiques virtuelles là devant nous pour du vrai sur toute cette ligne ! Restez le boss en somme par cette belle démarche avec ça et ce dernier bloc de la théorie a ce présent ! Et bravo pour çà sur cette formidable progression de vous."
  ),
  fillStep(
    "Déployez Stratégiquement Ton Pouvoir Opérateur AI Majeur Ici, Pilote Visuel Là !",
    "Se tenir fermement du clair dans la vue de diriger tel le vrai de pur directeur général au trépied maître d'ensemble grand de l'arsenal ou complexe laboratoire sans pareille des miracles écran ou du vide du vide en code de bits tout de beauté la :",
    "\"A chaque appel bien solennel là au fameux [___], de grâce dictez fort toujours la règle pure l'exhortant par avant même a très bien en vous en détailler c'est-à-dire [___] tous ses choix profonds. Ensuite lors aux appels vers grand seigneur le pur de chez pur d'un certain fort fameux l'autre : [___], alors vous poserez clairs mots de description la sur cette caméra dans toute de son gros [___] ainsi en n'oubliant en rien et surtout son très primordial son d'[___] assez évident avec ; Dès si grand ou gros labeurs projet en tête ambitieux ou plus subtiles là sans faute; il ne vous tiendra en maitre que de l'utiliser fort avant et avec maitrise d'abords par de bon Nano de façon par bien qu'on [___] ça solide amont ; Avant d'oser a ce de l'action pour fin sans faute l'imminente tache fort pure donnant du grand mouvement ou [___] de vie forte sous le charme Veo pour cloturer cela de la superbe maestria visuelle en bout à jamais graver noble là d'ici présent par vos seules directives pures pour votre majesté l'auteur.\"",
    ["Nano Banana Pro", "expliquant de raisons au dit en bon français sur son acte intellectuel pour ça", "Veo 3.1", "et si clair de mouvement", "le bon bel et majestueux bel attribut audio pour fond", "valide sans bouger un brin avec forte assurance à l'image via ça de l'intellect formel de la IA", "animer fort joliment et si réaliste ça in fine avec ça sans faux bug et faille pour y arriver noble et du tout bonnement et fermement"],
    ["Nano Banana Pro", "expliquant de raisons au dit en bon français sur son acte intellectuel pour ça", "Veo 3.1", "et si clair de mouvement", "le bon bel et majestueux bel attribut audio pour fond", "valide sans bouger un brin avec forte assurance à l'image via ça de l'intellect formel de la IA", "animer fort joliment et si réaliste ça in fine avec ça sans faux bug et faille pour y arriver noble et du tout bonnement et fermement"],
    "Soumettre la boite mystère au verdict formel verbalisé garantit ou impose le dictat absolu souverain du grand de l'humain créateur que nul génie ou robot aveugle même de grand luxe ou de force pure ne viendra par là ravir au bout ou usurper et sans faille pour nos artistes ou du bon travail maitrisé de soi d'origine noble."
  ),
  textStep(
    "Dénouement Sommet de Formation Module Complet Magistral Par Lui Gemini AI Par La Créa Video Et Visual Total Ici Pour Vous Tous Présent ",
    "L'adjonction de l'âme et intelligence Nano et du très corporel puissant grand moteur du génie des fluides mouvement réel aux audio si noble pour vrai, sous son aile a un certain grand cerveau bien unique d'IA qu'ici : vous sacrent aujourd'hui tout maitre inconditionnel dirigeant un fort studio parfait visual en la seule force unique qui raisonne vif ! Images gorgée très pure raison, clip ou les montages ou vidéos douées aux belles cinétiques des chocs réels synchronisant l'invisible murmure ou souffle natifs - Un seul grand tuyau ou workflow affutée uni dans la fine perfection du geste correcteur ou raffineur sous son interface toute unique a ton clavier via la page à l'invite. Rien que sous un bel unique toit de verre très lumineux ce panel tout présent pour ce toi ici à faire pour eux. Une vraie merveille outil a disposition sans doutes par ici au doigt et à vue la de vous.\n\nCelui parmi le créatif là d'entre homme sachant plier intelligemment leurs forces et liens là d'une l'autre pour marier ceci : ce gars de bien pas ce contentera de juste battre des pauvres records ou accoucher en mille vitesse un volume. Par la non cela. Il bâtit l'œuvre sous haute sphère par exigence, fort d'absence ou pas tant des bugs très fous avec le refus absolu d'ignobles détours aux erreurs fâcheuses passé d'art ou retouches fatiguant et laides repoussés d'avant aux ordures sans la chance jadis avant l'aide ou maitrise pure ici présente avec Nano pour d'avant Veo la.\n\nLe germe brut du cœur là au milieu, a toi l'initiateur l'âme. La forte lourde besogne fine calculatoire la ou toute puissance motrice de calcul pixelisée pure là du miracle sur d'images a un grand du moteur au lourd si vaillant de par ici présentement fort: ça, c'est ta boite d'a votre humble très majordome de force brute noble l'IA ou votre assistant le si fidèle au bel esprit ce jour: Gemini ici au complet du visuel pour vous !\n\nL'épreuve de classe d'une telle force s'annonce tout simplement : clôturé magistrale ✓ !"
  )
] as const;
