import {
  AiTrailFillBlanksLessonStep,
  AiTrailQuizLessonStep,
  AiTrailTextLessonStep,
} from "./aiTrailContent";

const textStep = (
  title: string,
  content: string,
  promptBox?: string,
): AiTrailTextLessonStep => ({
  type: "text",
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
): AiTrailQuizLessonStep => ({
  type: "quiz",
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
): AiTrailFillBlanksLessonStep => ({
  type: "fill_blanks",
  title,
  instruction,
  sentence,
  answers,
  options,
  explanation,
});

export const CHATGPT_MODULE_3_STEPS_PT = [
  textStep(
    "Geração de Imagens com IA",
    "Bem-vindo a um dos módulos mais visuais do curso! Nesta lição, você vai aprender como a geração de imagens com IA funciona e, principalmente, como escrever prompts visuais que produzem resultados profissionais e precisos.\n\nVamos lá!"
  ),
  textStep(
    "Como a Geração de Imagens Funciona",
    "Modelos como Midjourney, DALL-E e Stable Diffusion foram treinados em milhões de pares de imagem e texto. Ao receber seu prompt, o modelo identifica os padrões visuais associados às suas palavras e gera uma imagem que maximiza a correspondência com a descrição.\n\nDiferente do ChatGPT — que processa texto em sequência — os modelos de imagem leem o prompt inteiro de uma vez. Por isso, cada palavra tem peso. E a ordem importa: os elementos descritos no início do prompt têm mais influência no resultado final."
  ),
  quizStep(
    "A Ordem do Prompt",
    "Por que a ordem das palavras importa em um prompt de imagem?",
    [
      "Porque o modelo lê apenas as últimas palavras do prompt",
      "A ordem não faz diferença alguma",
      "Porque palavras no final definem o estilo da imagem com mais força",
      "Porque os elementos descritos no início têm mais peso na geração da imagem"
    ],
    3,
    "No treinamento desses modelos, os tokens iniciais guiam de forma mais robusta a estruturação principal do quadro gerado."
  ),
  textStep(
    "Estrutura Completa de um Prompt Visual",
    "Um prompt de imagem profissional costuma ser construído em 6 camadas essenciais:\n\n1. Sujeito — o que ou quem está na imagem\n2. Ação ou pose — o que está acontecendo\n3. Ambiente — onde e quando a cena acontece\n4. Estilo artístico — fotografia, pintura, ilustração, 3D\n5. Iluminação — natural, dramática, suave, neon\n6. Parâmetros técnicos — lente, resolução, profundidade de campo"
  ),
  fillStep(
    "Complete o Prompt Visual - Exercício 1",
    "Você quer gerar uma imagem de uma criança lendo um livro em um parque. Complete o prompt visual com termos em português.",
    '"Uma ___ sentada em ___, lendo um livro com expressão concentrada, iluminação ___, estilo de ___, tirada com lente de 50mm, cores ___ e aconchegantes."',
    ["jovem garota", "um banco de madeira em um parque arborizado", "natural e suave", "fotografia realista", "quentes"],
    ["jovem garota", "um banco de madeira em um parque arborizado", "natural e suave", "fotografia realista", "quentes", "desenho animado", "luz de neon"],
    "Você aplicou bem a lógica de Sujeito, Ambiente, Luz e Estilo."
  ),
  textStep(
    "Vocabulário Essencial",
    "Conheça os termos mais usados em prompts visuais da indústria:\n\n• Estilos: fotografia realista, visão cinemática, arte digital, aquarela, pintura a óleo, renderização 3D, arte conceitual\n• Iluminação: golden hour (luz quente do entardecer), iluminação dramática (contraste alto), estúdio suave (soft box), luzes de neon, claro-escuro\n• Lentes: 24mm (grande angular, paisagem), 50mm (neutro, cotidiano), 85mm (retrato, suave), 200mm (telefoto, isolamento do sujeito)\n• Qualidade: resolução 8K, altamente detalhado, foco nítido, HDR, formato RAW"
  ),
  fillStep(
    "Complete o Prompt de Retrato - Exercício 2",
    "Gere o retrato profissional de um homem de negócios em um escritório moderno.",
    '"Retrato ___ de um ___, vestindo um terno escuro, sentado em um ___, iluminação ___, lente de ___, profundidade de campo rasa, fotografia editorial profissional, resolução ___."',
    ["cinemático ultra realista", "homem de negócios de meia idade", "escritório moderno e elegante", "dramática de estúdio", "85mm f/1.4", "8K"],
    ["cinemático ultra realista", "homem de negócios de meia idade", "escritório moderno e elegante", "dramática de estúdio", "85mm f/1.4", "8K", "anime", "16-bit"],
    "Excepcional. Essa fórmula de camadas cria retratos perfeitos."
  ),
  quizStep(
    "Como a Iluminação Muda Tudo",
    "A iluminação é responsável por até 60% do impacto emocional de uma imagem. Qual tipo de iluminação você usaria para gerar uma imagem com sensação de nostalgia e calor emocional?",
    [
      "Iluminação dramática fria",
      "Golden hour (luz do entardecer)",
      "Flash de estúdio muito forte",
      "Luzes de neon brilhantes"
    ],
    1,
    "Golden hour traz os tons alaranjados do sol no fim do dia, perfeitamente atrelados com vibrações de nostalgia e memórias quentes."
  ),
  fillStep(
    "Complete o Prompt de Paisagem - Exercício 3",
    "Você quer gerar uma paisagem de montanha ao amanhecer com névoa.",
    '"Uma paisagem épica de ___ no ___, névoa densa cobrindo os vales pela manhã, luz ___ iluminando os picos, estilo de ___, lente grande angular de 24mm, resolução ___, altamente detalhada, composição cinemática."',
    ["montanha", "amanhecer", "dourada", "arte digital", "8K"],
    ["montanha", "amanhecer", "dourada", "arte digital", "8K", "noite escura", "deserto de areia"],
    "Perfeito. As diretrizes visuais criam um clima cinematográfico impressionante na imagem."
  ),
  fillStep(
    "Monte o Seu Prompt do Zero - Exercício 4",
    "Você quer gerar a imagem vista de dentro do café aconchegante em um dia de chuva.",
    '"Uma ___ de dentro de um café aconchegante em um dia ___, ___ brilhando na janela, luz aconchegante de ___ no ambiente interno, pessoas trabalhando e lendo, fotografia em estilo ___, lente de 35mm, tons ___, altamente detalhada."',
    ["imagem fotorealista", "chuvoso", "gotas de chuva", "velas suaves", "cinemático", "quentes e terrosos"],
    ["imagem fotorealista", "chuvoso", "gotas de chuva", "velas suaves", "cinemático", "quentes e terrosos", "dia ensolarado", "brilho de neon"],
    "Sua sintaxe garante um impacto estético consistente."
  ),
  textStep(
    "Técnica Avançada — Prompt Negativo (Negative Prompt)",
    "Na maioria dos geradores de imagem, você pode especificar explicitamente o que NÃO quer na imagem. Isso elimina artefatos comuns e limpa o resultado de poluição indesejada.\n\nExemplo de prompt negativo: \"baixa qualidade, borrado, marca d'água, dedos extras, rosto distorcido, superexposto, desenho animado\"."
  ),
  quizStep(
    "Para que serve o Prompt Negativo?",
    "Na geração visual por IA, qual o principal objetivo dos prompts negativos?",
    [
      "Para descrever incisivamente o que você quer ver na imagem",
      "Para definir com contornos o estilo artístico",
      "Para acelerar o processamento dos pixels",
      "Para eliminar elementos indesejados e artefatos comuns do resultado"
    ],
    3,
    "É a borracha da IA: retira características indesejadas que poderiam contaminar a qualidade e a estrutura da cena final."
  ),
  textStep(
    "Resumo da Lição",
    "Nesta lição você aprendeu que prompts visuais eficazes são construídos em 6 camadas — sujeito, ação, ambiente, estilo, iluminação e parâmetros técnicos. Cada elemento contribui para o resultado final, e a combinação certa entre eles é o que separa uma imagem genérica de uma imagem profissional.\n\nContinue praticando com os templates e experimente variações. É testando que você desenvolve o olhar!\n\nLição concluída ✓"
  )
];

export const CHATGPT_MODULE_3_STEPS_EN = [
  textStep(
    "AI Image Generation",
    "Welcome to one of the most highly visual modules of the course! In this lesson, you will learn how AI image generation models function, and more importantly, how to write visual prompts that yield precise and professional results.\n\nLet's get going!"
  ),
  textStep(
    "How Image Generation Works",
    "Models like Midjourney, DALL-E, and Stable Diffusion were trained on millions of image-text pairs. Upon receiving your prompt, the model identifies the visual patterns associated with your words and generates an image that maximizes the correlation with the description.\n\nUnlike ChatGPT—which processes sequential text—image models read the entire prompt at once. Because of this, every word carries weight. And order matters significantly: elements described at the beginning of the prompt bear far more influence on the final result."
  ),
  quizStep(
    "Prompt Order",
    "Why does word placement matter inside an image prompt?",
    [
      "Because the model only reads the trailing words of your prompt",
      "Word placement makes absolutely no difference",
      "Because words at the end define the style stronger",
      "Because the elements listed early on carry more weight when building the image"
    ],
    3,
    "During the training of these visual models, initial tokens strongly guide the main layout of the generated output frame."
  ),
  textStep(
    "The 6 Layers of a Visual Prompt",
    "A professional image generation prompt is usually crafted into 6 essential layers:\n\n1. Subject — what or who the image is about\n2. Action or pose — what is actually happening\n3. Environment — where and when the scene takes place\n4. Artistic Style — photography, painting, illustration, 3D\n5. Lighting — natural, dramatic, soft, neon outglow\n6. Technical Parameters — lens choice, resolution, depth of field"
  ),
  fillStep(
    "Fill the visual prompt - Exercise 1",
    "You want to render an image of a young child reading a book at a park. Fill the spaces:",
    '"A ___ sitting on ___, reading a book with a focused expression, ___ lighting, ___ style, shot on 50mm lens, ___ and cozy colors."',
    ["young girl", "a wooden bench in a tree-lined park", "soft natural", "realistic photography", "warm"],
    ["young girl", "a wooden bench in a tree-lined park", "soft natural", "realistic photography", "warm", "cyberpunk", "pitch black"],
    "You perfectly placed Subject, Environment, Light, and Aesthetic."
  ),
  textStep(
    "Essential Core Vocabulary",
    "Meet the most standard terms used within industry image prompts:\n\n• Styles: photorealistic, cinematic, digital art, watercolor, oil painting, 3D render, concept art\n• Lighting: golden hour (warm sunset), dramatic lighting (high-contrast), soft box (gentle studio), neon lights, chiaroscuro\n• Lenses: 24mm (wide-angle, landscapes), 50mm (neutral, everyday vision), 85mm (portraiture, smooth), 200mm (telephoto, subject isolation)\n• Quality Tags: 8K resolution, highly detailed, sharp focus, HDR, RAW photo"
  ),
  fillStep(
    "Complete the Portrait Prompt - Exercise 2",
    "Generate a professional portrait of a businessman inside a modern sleek office.",
    '"___ portrait of a ___, wearing a dark suit, sitting in a ___ office, ___ lighting, shot on ___ lens, shallow depth of field, professional editorial photography, ___ resolution."',
    ["Ultra realistic cinematic", "middle-aged businessman", "sleek modern", "dramatic studio", "85mm f/1.4", "8K"],
    ["Ultra realistic cinematic", "middle-aged businessman", "sleek modern", "dramatic studio", "85mm f/1.4", "8K", "anime", "low res"],
    "Outstanding. Building layers this way forces a realistic and clean portrait."
  ),
  quizStep(
    "How Lighting Shapes Everything",
    "Lighting is responsible for up to 60% of an image's emotional strike. What form of lighting would you pick to generate an image radiating pure emotional warmth and nostalgia?",
    [
      "Golden hour lighting",
      "Neon lights",
      "Harsh flash lighting",
      "Dramatic cold lighting"
    ],
    0,
    "Golden hour bestows the orange and warm hues of a sunset, naturally tying the image to deep nostalgia and heartfelt memories."
  ),
  fillStep(
    "Complete the Landscape Prompt - Exercise 3",
    "Your objective is a mountain landscape at dawn, smothered in dense fog.",
    '"Epic ___ landscape at ___, dense morning fog covering the valleys, ___ light breaking through the peaks, ___ style, wide angle 24mm lens, ___, highly detailed, cinematic composition."',
    ["mountain", "dawn", "golden", "digital art", "8K resolution"],
    ["mountain", "dawn", "golden", "digital art", "8K resolution", "nightfall", "polaroid"],
    "Spot on. Using directional sunlight over landscapes elevates digital mastery."
  ),
  fillStep(
    "Build a Prompt from Scratch - Exercise 4",
    "Generate the exact view from the inside of a cozy coffee shop looking out onto a rainy day.",
    '"___ of a cozy coffee shop interior on a ___ day, ___ outside the window, warm ___ lighting inside, people reading and working, ___ style, shot on 35mm lens, ___ tones, highly detailed."',
    ["Photorealistic interior shot", "rainy", "rain drops on the glass", "soft candlelight", "cinematic photography", "warm and earthy"],
    ["Photorealistic interior shot", "rainy", "rain drops on the glass", "soft candlelight", "cinematic photography", "warm and earthy", "pencil sketch", "cold"],
    "Mastery achieved. Connecting context to mood breeds great AI art."
  ),
  textStep(
    "Pro Tactic — The Negative Prompt",
    "On majority of high-end image generators (like Midjourney or Stable Diffusion), you can specify precisely what you DO NOT want. This eradicates artifacts, messy blobs, and visual pollution.\n\nExample of a negative prompt: \"low quality, blurry, watermark, extra fingers, distorted face, overexposed, cartoonish\"."
  ),
  quizStep(
    "Why use Negative Prompts?",
    "When generating AI art, what is the prime objective of inputting a negative prompt?",
    [
      "To eliminate undesirable elements and clean common rendering artifacts",
      "To massively speed up pixel generation time",
      "To describe with heavy focus what must be shown",
      "To perfectly trace the bounds of the artistic style"
    ],
    0,
    "They act as the AI's eraser: carving out traits that could otherwise contaminate the visual sanctity of the final scene."
  ),
  textStep(
    "Lesson Summary",
    "Through this lesson, you grasped that winning visual prompts pack together 6 tiers — subject, action, ambient context, style, lights, and specs. Their synergy is what effectively draws the line between dull clip-art and striking professional imagery.\n\nKeep iterating through variations. Testing and breaking things is how your inner creative eye awakens!\n\nLesson complete ✓"
  )
];

export const CHATGPT_MODULE_3_STEPS_ES = [
  textStep(
    "Generación de Imágenes con IA",
    "¡Te damos la bienvenida al módulo más visual del trayecto! A lo largo de esta lección instruiremos cómo opera la mente visual algorítmica y a dominar los llamados \"prompts visuales\" con autoridad profesional.\n\n¡Comencemos!"
  ),
  textStep(
    "Cómo Funciona Realmente",
    "Plataformas como Midjourney, DALL-E y Stable Diffusion se nutren estudiando millones de uniones foto-texto. Al dictarles algo, la mente matemática descifra los patrones de tus palabras y genera la imagen más apropiada resultante.\n\nA diferencia de ChatGPT, el cerebro de la imagen absorbe tus peticiones de manera global. Cada adjetivo es una pincelada; su peso es colosal. Además, lo narrado en el inicio del texto goza de un privilegio visual superior."
  ),
  quizStep(
    "Distribución del Mensaje",
    "¿Por qué el orden sintáctico se torna un asunto elemental en prompts destinados a generar cuadros o fotografías?",
    [
      "Debido a que los términos ubicados al principio irradian más autoridad al definir los elementos de la imagen",
      "Porque las palabras del final dominan siempre el estilo artístico",
      "El orden de ingreso no repercute en lo absoluto",
      "Porque la máquina asimila sólo las oraciones del final"
    ],
    0,
    "En la concepción de las redes difusivas, la jerarquía incide; los términos principales al inicio fijan fuertemente el destino de la composición entera."
  ),
  textStep(
    "Anatomía de 6 Capas para Prompts",
    "Una imagen de clase sublime nace de la unión de 6 pilares de dirección visual:\n\n1. Sujeto — qué o quién protagoniza la escena\n2. Acción e intervención — qué está sucediendo\n3. Entorno — ambiente, lugar y momento horario\n4. Estética de la Obra — acuarelas, hiperrealismo, arte digital, 3D\n5. Iluminación Total — cálida, suave, neón, luz dramática frontal\n6. Rigor Técnico — foco profundo, lente, resolución 8K, HDR"
  ),
  fillStep(
    "Estructura el Prompt Visual - Ejercicio 1",
    "Se busca generar la imagen de una niña repasando un escrito dentro de un parque. Completa el prompt visual.",
    '"Una ___ apoyada serenamente en ___, leyendo un libro con concentración, iluminación ___, en estilo de ___, tomada con lente de 50mm, usando tonos ___ y confortables."',
    ["niña joven", "un banco de madera sobre el parque verde", "natural y suave", "fotografía realista", "cálidos"],
    ["niña joven", "un banco de madera sobre el parque verde", "natural y suave", "fotografía realista", "cálidos", "monocromático", "noche oscura"],
    "Implementaste la arquitectura de luz y espacio debidamente."
  ),
  textStep(
    "El Alfabeto del Renderista",
    "Estudia ciertos términos clave repetidos hasta el cansancio al momento de exprimir las plataformas:\n\n• Formatos: fotorealismo puro, arte cinemático, arte digital, pintura al óleo, arte conceptual, 3D\n• Soles y sombras: golden hour (hora dorada o destello del ocaso), luz dramática de estudio, luz difusa (soft box), resplandor de neón, claroscuro\n• Lentes: 24mm (Gran encuadre, paisajes), 50mm (Neutralidad estricta), 85mm (Retratos cercanos y suaves), 200mm (Distanciamiento, sujeto aislado)\n• Estampa técnica: Render en 8K, altamente detallado, enfoque nítido, formato RAW"
  ),
  fillStep(
    "Estructura el Prompt Ejecutivo - Ejercicio 2",
    "Forja aquí un imponente retrato corporativo para un jefe.",
    '"Retrato ___ de un ___, vestido con un traje oscuro, acomodado en una ___, iluminado por ___, capturado con lente ___, fondo desenfocado, fotografía editorial profesional, en resolución ___."',
    ["cinemático ultra realista", "hombre de negocios de mediana edad", "moderna oficina elegante", "luz dramática de estudio", "85mm f/1.4", "8K"],
    ["cinemático ultra realista", "hombre de negocios de mediana edad", "moderna oficina elegante", "luz dramática de estudio", "85mm f/1.4", "8K", "caricatura", "oscuro total"],
    "Esta combinación de lente y luz genera los mejores retratos posibles."
  ),
  quizStep(
    "Luces que Comunican",
    "La iluminación controla hasta un 60% del impacto emocional. ¿Qué tipo de luz usarías para pintar una fotografía de honda nostalgia y cobijo de memoria cálida?",
    [
      "Iluminación dramática y fría",
      "Luces de neón rojas",
      "Hora dorada (golden hour)",
      "Un flash quemante frontal"
    ],
    2,
    "La 'hora dorada' baña la imagen de tonos cálidos y anaranjados; invocando vibraciones retrospectivas y melancolía reconfortante."
  ),
  fillStep(
    "Sintetiza la Montaña Viva - Ejercicio 3",
    "Diseña un majestuoso paisaje de montañas con niebla mañanera.",
    '"Épico paisaje de ___ durante ___, con pesadas sábanas de niebla cubriendo los valles, luz ___ rompiendo sobre las cumbres, estilo de ___, gran angular de 24mm, resolución ___, altamente detallada, composición cinemática."',
    ["montañas", "el amanecer", "dorada", "arte digital", "8K"],
    ["montañas", "el amanecer", "dorada", "arte digital", "8K", "noche negra", "boceto a lápiz gris"],
    "Excelente, la luz del amanecer rompiendo las cumbres brinda pura vida visual."
  ),
  fillStep(
    "El Arquitecto Independiente - Ejercicio 4",
    "Escribe enteramente el resplandor de una pequeña cafetería desde su interior en un día de tormenta.",
    '"Captura ___ de una pequeña cafetería por dentro en un día ___, ___ al otro lado del cristal, cálida iluminación de ___ adentro, personas leyendo libros, estilo de fotografía ___, tomada con lente de 35mm, esquema de tonos ___, altamente detallada."',
    ["fotorealista", "lluvioso", "gotas de lluvia", "velas suaves", "cinemática", "tierras y ocres cálidos"],
    ["fotorealista", "lluvioso", "gotas de lluvia", "velas suaves", "cinemática", "tierras y ocres cálidos", "sol ardiente de verano", "mar totalmente liso"],
    "Formulaste la arquitectura emocional idónea."
  ),
  textStep(
    "El Contrapeso — Prompt Negativo",
    "En paneles consolidados de generación de IA, puedes establecer lo que NO quieres ver en la imagen a través del 'Prompt Negativo'. Esto soluciona problemas visuales repulsivos antes de que aparezcan.\n\nEjemplo básico: \"baja calidad, borroso, marca de agua, dedos extra, rostro deformado, sobreexpuesto, estilo caricatura\"."
  ),
  quizStep(
    "Ancla Analítica de Repulsión",
    "¿Qué necesidad soluciona emplear la herramienta del 'Prompt Negativo'?",
    [
      "Evitar tiempos de carga reduciendo drásticamente el uso del GPU",
      "Consolidar firmemente las emociones y filtros del encuadre central",
      "Purificar la maqueta eliminando elementos repulsivos, defectos y marcas de agua de los resultados",
      "Imprimir exigencias inamovibles sobre el estilo del protagonista principal"
    ],
    2,
    "Funciona como un filtro de imperfecciones; la IA repudia estas directrices impidiendo que contaminen la imagen con defectos comunes."
  ),
  textStep(
    "Fin del Módulo",
    "En resumen estricto: la alquimia de grandes resultados visuales descansa en el sujeto, su dinámica, el entorno geográfico, movimiento del arte, matriz de luces y óptica precisa.\n\nPerseverar experimentando el baile de variantes es lo que gradualmente educará tu ojo algorítmico.\n\nLección superada ✓"
  )
];

export const CHATGPT_MODULE_3_STEPS_FR = [
  textStep(
    "Génération d'Images par IA",
    "Bienvenue dans l'un des volets les plus graphiques de notre cursus ! Au long de cette leçon, nous allons lever le voile sur les prouesses de la génération visuelle et affûter vos requêtes (prompts) pour un résultat professionnel.\n\nAllons-y !"
  ),
  textStep(
    "Comment la Génération Fonctionne",
    "Des moteurs comme Midjourney, DALL-E, ou Stable Diffusion ont absorbé des millions de paires image-texte. Quand l'instruction vient frapper la base logistique, l'algorithme génère la vision correspondante à vos mots.\n\nÀ l'opposé frontal du classique ChatGPT de texte où la succession des phrases progresse de façon consécutive, la création d'image lit intégralement votre consigne en un seul bloc. Par conséquent, les mots du début de la phrase posent le moule entier du rendu final."
  ),
  quizStep(
    "Ordonnancement Fondamental",
    "Pourquoi l'ordre des mots est-il crucial dans la création d'un prompt d'image ?",
    [
      "Car le style visuel s'établit mieux avec les verbes d'action",
      "L'ordre des phrases est un mythe",
      "Car l'IA occulte le début et ne lit que la fin du texte",
      "Parce que les termes situés au tout début définissent avec plus de force et d'autorité les éléments principaux du tableau"
    ],
    3,
    "Les pondérations s'activent intensément lors de la saisie primitive des mots au début du prompt : tout est conditionné par la première ligne de texte."
  ),
  textStep(
    "Architecture du Prompt en 6 Stades",
    "L'architecture d'un cliché professionnel inattaquable campe systématiquement sur 6 strates :\n\n1. Entité centrale — qui ou quoi est au centre\n2. Mouvement corporel — l'action dramatique\n3. Environnement — où se trouve-t-on et par quelle météo\n4. Style Artistique — réalisme brut, aquarelles, peinture numérique, 3D\n5. Éclairage — néon cybernétique nocturne, lumière chaude, douce et feutrée\n6. Prise de Vue Paramétrique — résolution 8K, format de la caméra"
  ),
  fillStep(
    "Le Calibrage Scénique - Exercice 1",
    "Vous souhaitez générer l'image d'une petite fille lisant un livre dans un parc sans faille. Complétez la phrase :",
    '"Une ___ assise calmement sur ___, parcourant un livre avec concentration, un éclairage ___, en style ___, capturée avec un objectif de 50mm, aux couleurs ___ et douillettes."',
    ["jeune fille", "un banc en bois dans un parc boisé", "naturel et velouté", "photographie réaliste", "chaudes"],
    ["jeune fille", "un banc en bois dans un parc boisé", "naturel et velouté", "photographie réaliste", "chaudes", "sombre dessin", "cyberpunk sombre"],
    "Les fondamentaux organiques (sujet, lumière et style artistique) ont forgé l'image harmonieusement."
  ),
  textStep(
    "Le Lexique de Base",
    "Mémorisez bien ces éléments de vocabulaire avant de créer avec l'IA :\n\n• Styles : vue photoréaliste, regard cinématographique, art numérique, peinture à l'huile, rendu 3D\n• Éclairage : golden hour (feu doré de fin de journée), éclairage dramatique, lumière de studio (soft box), lumières de néon, clair-obscur\n• Lentilles : 24mm (grand angle, extérieurs), 50mm (neutre standard), 85mm (portraits rapprochés séduisants), 200mm (téléobjectif long, fond compressé)\n• Qualité : Ultra HD, résolution 8K faramineuse, définition extrêmement détaillée, HDR net"
  ),
  fillStep(
    "Profil Editorial Cadré - Exercice 2",
    "Construirez l'image de votre cadre d'entreprise travaillant dans des tours de bureaux haut de gamme.",
    '"Portrait ___ d\'un ___, vêtu d\'un élégant costume sombre, situé dans un ___, sublimé par un éclairage ___, capturé avec un objectif ___, très faible profondeur de champ, format de photographie éditoriale supérieure avec résolution de type ___."',
    ["cinématique ultra réaliste", "homme d'affaires distingué d'âge moyen", "bureau vitré au raffinement moderne", "dramatique et frappant de studio", "85mm ouvert à f/1.4", "8K"],
    ["cinématique ultra réaliste", "homme d'affaires distingué d'âge moyen", "bureau vitré au raffinement moderne", "dramatique et frappant de studio", "85mm ouvert à f/1.4", "8K", "dessin de manga animé", "rendu pixelisé"],
    "Une composition infaillible. Le portrait éditorial naît toujours de ces balises directrices de l'objectif de 85mm et de l'éclairage de studio."
  ),
  quizStep(
    "Onde Thermique de l'IA",
    "Quel type d'éclairage évoquerait une vibration de mélancolie forte avec des souvenirs de chaleureuse nostalgie parmi vos rendus ?",
    [
      "Lumières néons rouges aveuglantes",
      "Golden hour (l'heure dorée du crépuscule)",
      "Lumière crue projetée depuis un flash de téléphone",
      "Éclairage rigoureux et hivernal"
    ],
    1,
    "La Golden Hour, majesté ardente et orangée de la journée tombante, invoque invariablement le calme chaleureux et réconfortant du passé lointain."
  ),
  fillStep(
    "Symphonie du Paysage Naturel - Exercice 3",
    "Orchestrez de hautes montagnes dans une brume matinale enveloppante.",
    '"Paysage spectaculaire et épique de ___ au cœur de ___, linceul dense de brouillard du matin couvrant les vallées profondes, lumière ___ inondant les sommets, illustration de direction artistique ___, objectif grand angle imposant de 24mm, ultra-détaillé, niveau de finition ___."',
    ["montagne", "l'aube majestueuse", "dorée et foudroyante", "d'art numérique", "rendu 8K impressionnant"],
    ["montagne", "l'aube majestueuse", "dorée et foudroyante", "d'art numérique", "rendu 8K impressionnant", "minuit opaque sans lune", "esquisse non texturée"],
    "Merveilleux : Le grand angle instille précisément cette sensation d'échelle démesurée recherchée dans vos rendus extérieurs."
  ),
  fillStep(
    "Réalisation Indépendante - Exercice 4",
    "Façonnez l'atmosphère exacte d'un petit cybercafé calme baigné par un orage.",
    '"Image ___ de l\'intérieur d\'un discret petit commerce de café lors d\'une journée ___, ruissellement de ___ au dehors sur le vitrage épais, réchauffement de ___ tamisées partout en face de lecteurs sérieux, rendu qualitatif en mode ___, optique de 35mm concentrée en teintes de ___ bien chaleureuses et extrêmement précises et détaillées."',
    ["photoréaliste de grande ampleur", "excessivement pluvieuse", "lourdes gouttes de pluie aquatiques", "douces lueurs de bougies", "cinématique pour long métrage", "terres, bruns doux et ocres"],
    ["photoréaliste de grande ampleur", "excessivement pluvieuse", "lourdes gouttes de pluie aquatiques", "douces lueurs de bougies", "cinématique pour long métrage", "terres, bruns doux et ocres", "blatant ciel azur et vide", "noir et blanc sans relief"],
    "Un tableau brillamment imbriqué : le contraste entre la pluie et le feu nourrit une identité visuelle digne d'une image poignante."
  ),
  textStep(
    "Rejeter le Bruit Parasite — Le Prompt Négatif",
    "Une immense fonctionnalité des moteurs créatifs modernes consiste en la formulation du \"Prompt Négatif\" ou invite négative, bloquant fermement l'émergence d'immondices inattendues sur votre toile numérique finale.\n\nLexique courant de rejet préventif : \"basse qualité, flou malheureux, marque en filigrane distrayante d'auteur inconnu, doigts surnuméraires aberrants, visages sévèrement déformés irréalistes, couleurs surexposées\"."
  ),
  quizStep(
    "Fonction du Prompt Négatif",
    "Quel est l'intérêt fondamental de rédiger avec précaution une injonction d'exclusion dite 'Prompt Négatif' au cœur de son tableau logistique d'invite ?",
    [
      "Écraser formellement les couleurs du spectre RGB indésirables des images synthétisées des studios de Hollywood",
      "Obtenir une création photographique deux fois plus vite sur le serveur informatique central",
      "Nettoyer purement le calcul graphique du programme, en annihilant de fait les défauts notoires grossiers ou les marques en filigrane récurrentes des données synthétiques",
      "Exiger un degré insensé de perfection lumineuse sur un arrière-plan vide transparent et cristallin"
    ],
    2,
    "C'est la gomme de protection du système : il évince avec aplomb toute la déformation inesthétique et malheureuse commune issue du réseau de neurones en temps normal."
  ),
  textStep(
    "Conclusion du Module 3",
    "En substance limpide, la photographie algorithmique obéit à six strates directionnelles fondamentales allant du cœur sujet vers son esthétique lumineuse sans la moindre équivoque hasardeuse en cours de frappe ou d'envoi.\n\nPrenez un soin rigoureux à lisser les variables qui forgeront infailliblement votre grand œil créatif à force d'entraînement et d'essais à grand volume.\n\nLeçon visualisée brillamment ✓"
  )
];
