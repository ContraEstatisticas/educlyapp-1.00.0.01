import {
  MIDJOURNEY_MODULE_1_STEPS_EN,
  MIDJOURNEY_MODULE_1_STEPS_ES,
  MIDJOURNEY_MODULE_1_STEPS_FR,
  MIDJOURNEY_MODULE_1_STEPS_PT,
} from "@/lib/midjourneyModule1LessonSteps";
import {
  MIDJOURNEY_MODULE_2_STEPS_EN,
  MIDJOURNEY_MODULE_2_STEPS_ES,
  MIDJOURNEY_MODULE_2_STEPS_FR,
  MIDJOURNEY_MODULE_2_STEPS_PT,
} from "@/lib/midjourneyModule2LessonSteps";
import {
  MIDJOURNEY_MODULE_3_STEPS_EN,
  MIDJOURNEY_MODULE_3_STEPS_ES,
  MIDJOURNEY_MODULE_3_STEPS_FR,
  MIDJOURNEY_MODULE_3_STEPS_PT,
} from "@/lib/midjourneyModule3LessonSteps";
import {
  MIDJOURNEY_MODULE_4_STEPS_EN,
  MIDJOURNEY_MODULE_4_STEPS_ES,
  MIDJOURNEY_MODULE_4_STEPS_FR,
  MIDJOURNEY_MODULE_4_STEPS_PT,
} from "@/lib/midjourneyModule4LessonSteps";
import {
  MIDJOURNEY_MODULE_5_STEPS_EN,
  MIDJOURNEY_MODULE_5_STEPS_ES,
  MIDJOURNEY_MODULE_5_STEPS_FR,
  MIDJOURNEY_MODULE_5_STEPS_PT,
} from "@/lib/midjourneyModule5LessonSteps";
import {
  MIDJOURNEY_MODULE_6_STEPS_EN,
  MIDJOURNEY_MODULE_6_STEPS_ES,
  MIDJOURNEY_MODULE_6_STEPS_FR,
  MIDJOURNEY_MODULE_6_STEPS_PT,
} from "@/lib/midjourneyModule6LessonSteps";

export type AiTrailLocale = "pt" | "en" | "es" | "fr";
export type AiTrailStatus = "live" | "coming_soon";

export interface AiTrailTextLessonStep {
  type: "text";
  title: string;
  content: string;
  promptBox?: string;
}

export interface AiTrailQuizLessonStep {
  type: "quiz";
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AiTrailFillBlanksLessonStep {
  type: "fill_blanks";
  title: string;
  instruction: string;
  sentence: string;
  answers: string[];
  options: string[];
  explanation?: string;
}

export type AiTrailLessonStep =
  | AiTrailTextLessonStep
  | AiTrailQuizLessonStep
  | AiTrailFillBlanksLessonStep;

export interface AiTrailPractice {
  title: string;
  instruction: string;
  terms: string[];
  solution: string;
}

export interface AiTrailQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AiTrailModuleContent {
  number: number;
  title: string;
  intro: string;
  keyPoints: string[];
  promptExample: string;
  practice: AiTrailPractice;
  quiz: AiTrailQuiz;
  takeaway: string;
  lessonSteps?: AiTrailLessonStep[];
}

export interface AiTrailLocalizedContent {
  statusBadge: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  overviewTitle: string;
  overviewItems: string[];
  moduleLabel: string;
  keyPointsLabel: string;
  promptLabel: string;
  practiceLabel: string;
  termsLabel: string;
  solutionLabel: string;
  quizLabel: string;
  correctLabel: string;
  takeawayLabel: string;
  modules: AiTrailModuleContent[];
}

interface AiTrailContentEntry {
  status: AiTrailStatus;
  locales: Partial<Record<AiTrailLocale, AiTrailLocalizedContent>>;
}

const MIDJOURNEY_PROMPTS = {
  basics:
    "/imagine a mystical forest with glowing fireflies, fantasy digital art, soft ethereal lighting, cinematic composition, rich and vibrant colors --ar 16:9",
  lighting:
    "/imagine a female hacker in a futuristic city alley, neon lighting, cyberpunk digital art, nighttime urban environment, vivid purple and cyan, --ar 9:16",
  ratio:
    "/imagine a confident young woman walking in a fashion district, street style photography, natural urban lighting, vertical full body composition, bold and energetic mood, leaving space at top and bottom for text overlay, --ar 9:16",
  viewpoint:
    "/imagine a warrior queen standing on a castle wall in a storm, low angle shot, dramatic rim lighting, dark fantasy concept art, powerful and defiant mood, --ar 9:16",
  modes:
    "/imagine a lone samurai meditating in an ancient bamboo forest at dawn with morning mist, low angle shot, dark fantasy cinematic photography meets ukiyo-e art, volumetric golden lighting with rim light, muted green gold and black palette, deeply spiritual and powerful mood, timeless and epic atmosphere, --ar 9:16",
  marketing:
    "/imagine a premium skincare serum bottle with water droplets and botanical elements, clean white marble surface, soft box lighting, commercial product photography, ultra high 8K detail, luxury feel, --ar 1:1",
} as const;

const AI_TRAIL_CONTENT: Record<string, AiTrailContentEntry> = {
  midjourney: {
    status: "live",
    locales: {
      pt: {
        statusBadge: "Trilha ativa",
        heroEyebrow: "MidJourney",
        heroTitle: "Direcao visual com IA, modulo por modulo.",
        heroDescription:
          "Essa trilha organiza seus fundamentos de MidJourney em 6 modulos praticos: acesso, luz, proporcao, camera, combinacao de modos e aplicacao em marketing.",
        overviewTitle: "O que voce vai dominar",
        overviewItems: [
          "Entrar no MidJourney com clareza e iterar sem travar no primeiro prompt.",
          "Controlar luz, formato, camera e atmosfera com intencao visual.",
          "Criar imagens pensadas para feed, anuncios, stories, campanhas e assets de marca.",
        ],
        moduleLabel: "Modulo",
        keyPointsLabel: "Pontos-chave",
        promptLabel: "Prompt de referencia",
        practiceLabel: "Pratica guiada",
        termsLabel: "Termos",
        solutionLabel: "Resposta esperada",
        quizLabel: "Checkpoint",
        correctLabel: "Resposta correta",
        takeawayLabel: "Leitura final",
        modules: [
          {
            number: 1,
            title: "Sua primeira arte com IA",
            intro:
              "Voce aprende como entrar pelo Discord, usar o /imagine, ler as 4 variacoes e refinar com U, V e redo sem depender de tentativa cega.",
            keyPoints: [
              "MidJourney funciona no Discord e transforma texto em imagem com apelo artistico forte.",
              "O comando /imagine abre a geracao e devolve 4 variacoes para comparar.",
              "U amplia a imagem escolhida; V gera novas variacoes mantendo a mesma direcao criativa.",
              "Estilo, iluminacao e --ar ja mudam drasticamente o resultado mesmo em prompts simples.",
            ],
            lessonSteps: MIDJOURNEY_MODULE_1_STEPS_PT,
            promptExample: MIDJOURNEY_PROMPTS.basics,
            practice: {
              title: "Desafio de acesso",
              instruction: "Monte a sequencia basica para gerar sua primeira imagem no MidJourney.",
              terms: ["Discord", "MidJourney", "newbies", "/imagine", "1 minuto"],
              solution:
                "Criar conta no Discord, entrar no servidor oficial do MidJourney, ir ao canal newbies, usar /imagine e esperar cerca de 1 minuto.",
            },
            quiz: {
              question: "Por que comecar com prompts simples acelera o aprendizado no MidJourney?",
              options: [
                "Porque prompts curtos sempre geram imagens melhores.",
                "Porque o MidJourney nao aceita prompts com muitos termos.",
                "Porque prompts simples deixam claro o peso de cada palavra antes de adicionar complexidade.",
                "Porque prompts simples sao indicados apenas para iniciantes absolutos.",
              ],
              correctIndex: 2,
              explanation:
                "Quando o prompt e simples voce entende o que cada palavra realmente faz. Depois disso, adicionar camadas fica muito mais intencional.",
            },
            takeaway:
              "Seu primeiro ganho aqui nao e a imagem perfeita. E aprender a iterar com direcao.",
          },
          {
            number: 2,
            title: "Iluminacao que muda emocao",
            intro:
              "Aqui voce aprende a ler a luz como decisao emocional: calor, misterio, poder, limpeza, historia, neon e escala.",
            keyPoints: [
              "Golden Hour aquece a cena; Blue Hour traz sofisticacao e melancolia.",
              "Dramatic, Chiaroscuro e Rim controlam contraste, poder e presenca.",
              "Soft Box limpa produto; Neon urbaniza; Volumetric cria profundidade quase magica.",
              "A luz certa precisa combinar com a emocao do projeto, nao so com uma estetica bonita.",
            ],
            lessonSteps: MIDJOURNEY_MODULE_2_STEPS_PT,
            promptExample: MIDJOURNEY_PROMPTS.lighting,
            practice: {
              title: "Mapa de luz",
              instruction: "Associe cada objetivo ao tipo de luz mais coerente.",
              terms: ["Golden Hour", "Blue Hour", "Soft Box", "Chiaroscuro"],
              solution:
                "Golden Hour para calor e nostalgia, Blue Hour para misterio sofisticado, Soft Box para produto limpo e Chiaroscuro para drama artistico.",
            },
            quiz: {
              question: "Qual e o erro mais comum ao escolher iluminacao no MidJourney?",
              options: [
                "Usar o mesmo tipo de luz em projetos diferentes.",
                "Combinar duas iluminacoes no mesmo prompt.",
                "Escolher pela aparencia sem considerar a emocao que a luz transmite.",
                "Especificar iluminacao em prompts curtos.",
              ],
              correctIndex: 2,
              explanation:
                "Quando a luz contradiz a emocao do projeto, a imagem pode ficar bonita, mas perde coerencia e impacto.",
            },
            takeaway:
              "Luz nao e detalhe. Luz e a forma mais rapida de mudar o clima emocional da imagem.",
          },
          {
            number: 3,
            title: "Proporcao e composicao",
            intro:
              "Esse modulo mostra como o --ar muda enquadramento, aplicacao e narrativa visual em cada plataforma.",
            keyPoints: [
              "Sem --ar, o MidJourney tende ao formato 1:1 por padrao.",
              "9:16 domina mobile; 4:5 ocupa mais feed; 16:9 funciona para banners e YouTube.",
              "3:2 e 2:3 aproximam a imagem da linguagem fotografica classica.",
              "Mudar a proporcao muda a composicao inteira, nao apenas o corte final.",
            ],
            lessonSteps: MIDJOURNEY_MODULE_3_STEPS_PT,
            promptExample: MIDJOURNEY_PROMPTS.ratio,
            practice: {
              title: "Formato certo, canal certo",
              instruction: "Escolha a proporcao ideal para cada uso principal.",
              terms: ["--ar 16:9", "--ar 9:16", "--ar 4:5", "--ar 3:2"],
              solution:
                "16:9 para banners e YouTube, 9:16 para Reels e Stories, 4:5 para feed do Instagram e 3:2 para fotografia com cara de camera.",
            },
            quiz: {
              question: "Por que gerar tudo em 1:1 e cortar depois costuma ser uma estrategia fraca?",
              options: [
                "Porque o MidJourney cobra mais caro para recortar depois.",
                "Porque qualquer corte reduz automaticamente a resolucao.",
                "Porque a composicao foi pensada para um quadro quadrado, nao para o canal final.",
                "Porque o Instagram rejeita imagens originalmente quadradas.",
              ],
              correctIndex: 2,
              explanation:
                "A proporcao decide o enquadramento. Se voce muda o formato so no fim, perde a composicao ideal para aquele canal.",
            },
            takeaway:
              "Quem domina proporcao para de criar imagem generica e passa a criar imagem estrategica.",
          },
          {
            number: 4,
            title: "Ponto de vista e narrativa",
            intro:
              "Aqui voce controla como a camera conta a historia: poder, intimidade, contexto, escala, suspense e imersao.",
            keyPoints: [
              "Eye level aproxima e humaniza; low angle amplia poder e heroismo.",
              "High angle e bird's eye abrem contexto e composicao; close up revela emocao.",
              "Wide shot trabalha atmosfera e escala; dutch angle cria tensao.",
              "Se voce nao escolhe o ponto de vista, entrega a narrativa para uma composicao generica.",
            ],
            promptExample: MIDJOURNEY_PROMPTS.viewpoint,
            practice: {
              title: "Camera com intencao",
              instruction: "Ligue o objetivo narrativo ao angulo mais coerente.",
              terms: ["Low Angle", "Eye Level", "Close Up", "Dutch Angle"],
              solution:
                "Low Angle para poder, Eye Level para conexao humana, Close Up para intimidade e Dutch Angle para tensao psicologica.",
            },
            quiz: {
              question: "Qual e o custo de deixar o MidJourney escolher sozinho o angulo da cena?",
              options: [
                "A imagem fica com resolucao menor.",
                "O prompt demora mais para renderizar.",
                "Voce perde controle narrativo e tende a receber uma composicao generica.",
                "O MidJourney passa a ignorar estilo e iluminacao.",
              ],
              correctIndex: 2,
              explanation:
                "O angulo organiza a relacao emocional entre espectador e cena. Sem ele, a imagem pode funcionar, mas raramente conta a historia certa.",
            },
            takeaway:
              "Angulo nao e acabamento. Angulo e narrativa visual em estado puro.",
            lessonSteps: MIDJOURNEY_MODULE_4_STEPS_PT,
          },
          {
            number: 5,
            title: "Combinando modos com intencao",
            intro:
              "Agora voce sai do prompt solto e comeca a empilhar camadas: sujeito, ambiente, estilo, camera, luz, paleta, mood e parametros tecnicos.",
            keyPoints: [
              "Prompts avancados funcionam melhor quando seguem uma estrutura logica.",
              "Estilo, luz e ponto de vista precisam reforcar a mesma ideia, nao competir entre si.",
              "Referencias hibridas funcionam quando cada uma soma algo reconhecivel e coerente.",
              "O erro mais comum nao e exagerar. E acumular termos sem intencao criativa clara.",
            ],
            promptExample: MIDJOURNEY_PROMPTS.modes,
            practice: {
              title: "Estrutura do prompt avancado",
              instruction: "Organize as camadas de um prompt combinado do mais essencial ao mais refinado.",
              terms: [
                "sujeito e acao",
                "ambiente e contexto",
                "estilo artistico",
                "ponto de vista",
                "iluminacao",
                "paleta de cores",
                "parametros tecnicos",
              ],
              solution:
                "Comece por sujeito e acao, depois ambiente e contexto, estilo artistico, ponto de vista, iluminacao, paleta de cores e finalize com parametros tecnicos.",
            },
            quiz: {
              question: "Qual e o sinal mais claro de que um prompt combinado foi mal construido?",
              options: [
                "Ter mais de uma referencia artistica.",
                "Ter mais de seis elementos.",
                "Misturar termos fortes que nao se comunicam entre si.",
                "Usar parametros tecnicos no final.",
              ],
              correctIndex: 2,
              explanation:
                "Nao basta soar sofisticado. Cada camada precisa apontar para a mesma direcao criativa.",
            },
            takeaway:
              "Prompt avancado nao e prompt longo. E prompt coerente em varias camadas ao mesmo tempo.",
            lessonSteps: MIDJOURNEY_MODULE_5_STEPS_PT,
          },
          {
            number: 6,
            title: "Marketing visual que converte",
            intro:
              "O fechamento da trilha leva o MidJourney para o mundo real: produto, feed, anuncio, story, thumbnail, prova social e campanhas coesas.",
            keyPoints: [
              "Imagem e a primeira impressao da marca antes de qualquer linha de texto.",
              "Cada formato pede um layout diferente: feed, ads, vertical mobile, thumbnail e blog.",
              "Campanha boa nao depende de uma imagem isolada; depende de consistencia visual entre pecas.",
              "Marketing com IA melhora muito quando o visual reforca posicionamento, emocao e CTA.",
            ],
            promptExample: MIDJOURNEY_PROMPTS.marketing,
            practice: {
              title: "Serie visual coesa",
              instruction: "Defina o que deve permanecer fixo numa campanha para manter reconhecimento de marca.",
              terms: ["paleta", "tipo de iluminacao", "estilo fotografico", "regra de composicao", "sujeito e acao"],
              solution:
                "Mantenha fixos paleta, tipo de iluminacao, estilo fotografico e regra de composicao. Varie sujeito e acao conforme o objetivo de cada peca.",
            },
            quiz: {
              question: "Qual e o erro visual mais comum em campanhas pequenas feitas com IA?",
              options: [
                "Usar prompts muito longos.",
                "Criar imagens com qualidade alta demais.",
                "Falta de consistencia visual entre os posts.",
                "Repetir o mesmo estilo ao longo da campanha.",
              ],
              correctIndex: 2,
              explanation:
                "Quando cada peca parece vir de uma marca diferente, o publico nao constroi reconhecimento nem familiaridade com a comunicacao.",
            },
            takeaway:
              "No marketing, MidJourney nao serve so para fazer imagem bonita. Serve para construir percepcao de marca com consistencia.",
            lessonSteps: MIDJOURNEY_MODULE_6_STEPS_PT,
          },
        ],
      },
      en: {
        statusBadge: "Trail live",
        heroEyebrow: "MidJourney",
        heroTitle: "Visual direction with AI, module by module.",
        heroDescription:
          "This trail turns your MidJourney foundations into 6 practical modules: access, lighting, ratio, camera, mode stacking, and marketing execution.",
        overviewTitle: "What you will master",
        overviewItems: [
          "Use MidJourney with clarity instead of guessing through random prompts.",
          "Control light, format, camera, and atmosphere with visual intent.",
          "Build images for feeds, ads, stories, campaigns, and brand assets.",
        ],
        moduleLabel: "Module",
        keyPointsLabel: "Key points",
        promptLabel: "Reference prompt",
        practiceLabel: "Guided practice",
        termsLabel: "Terms",
        solutionLabel: "Expected answer",
        quizLabel: "Checkpoint",
        correctLabel: "Correct answer",
        takeawayLabel: "Final read",
        modules: [
          {
            number: 1,
            title: "Your first AI artwork",
            intro:
              "You learn how to enter through Discord, use /imagine, read the 4 variations, and refine with U, V, and redo instead of blind trial and error.",
            keyPoints: [
              "MidJourney runs inside Discord and turns text into highly aesthetic images.",
              "The /imagine command starts the generation and returns 4 variations at once.",
              "U upscales the chosen image; V creates new variations in the same direction.",
              "Style, lighting, and --ar already change the result dramatically even in simple prompts.",
            ],
            lessonSteps: MIDJOURNEY_MODULE_1_STEPS_EN,
            promptExample: MIDJOURNEY_PROMPTS.basics,
            practice: {
              title: "Access drill",
              instruction: "Build the basic flow required to generate your first image.",
              terms: ["Discord", "MidJourney", "newbies", "/imagine", "1 minute"],
              solution:
                "Create a Discord account, join the official MidJourney server, go to a newbies channel, use /imagine, and wait about 1 minute.",
            },
            quiz: {
              question: "Why do simple prompts speed up learning in MidJourney?",
              options: [
                "Because short prompts always generate better images.",
                "Because MidJourney rejects prompts with many terms.",
                "Because simple prompts reveal the role of each word before you add complexity.",
                "Because simple prompts are only for absolute beginners.",
              ],
              correctIndex: 2,
              explanation:
                "When the prompt is simple, you can actually see what each word changes. That makes later refinement intentional instead of random.",
            },
            takeaway:
              "Your first win is not perfection. It is learning how to iterate with direction.",
          },
          {
            number: 2,
            title: "Lighting that changes emotion",
            intro:
              "This module teaches you to read light as an emotional decision: warmth, mystery, power, cleanliness, history, neon energy, and epic scale.",
            keyPoints: [
              "Golden Hour warms the scene; Blue Hour brings sophistication and melancholy.",
              "Dramatic, Chiaroscuro, and Rim control contrast, power, and presence.",
              "Soft Box cleans product shots; Neon urbanizes; Volumetric adds near-magical depth.",
              "The right light must match the emotion of the project, not just look pretty.",
            ],
            lessonSteps: MIDJOURNEY_MODULE_2_STEPS_EN,
            promptExample: MIDJOURNEY_PROMPTS.lighting,
            practice: {
              title: "Light map",
              instruction: "Match each objective to the lighting choice that makes the most sense.",
              terms: ["Golden Hour", "Blue Hour", "Soft Box", "Chiaroscuro"],
              solution:
                "Golden Hour for warmth and nostalgia, Blue Hour for sophisticated mystery, Soft Box for clean products, and Chiaroscuro for artistic drama.",
            },
            quiz: {
              question: "What is the most common mistake when choosing lighting in MidJourney?",
              options: [
                "Using the same type of light in different projects.",
                "Combining two lighting styles in one prompt.",
                "Choosing light by looks instead of by the emotion it communicates.",
                "Specifying lighting in short prompts.",
              ],
              correctIndex: 2,
              explanation:
                "When lighting contradicts the emotional goal, the image may still look good, but it loses coherence and impact.",
            },
            takeaway:
              "Light is not decoration. It is the fastest lever for emotional tone.",
          },
          {
            number: 3,
            title: "Aspect ratio and composition",
            intro:
              "Here you learn how --ar changes framing, platform fit, and visual storytelling across channels.",
            keyPoints: [
              "Without --ar, MidJourney defaults to a 1:1 square.",
              "9:16 dominates mobile; 4:5 owns the feed; 16:9 works for banners and YouTube.",
              "3:2 and 2:3 move the image closer to classic photography language.",
              "Changing the ratio changes the whole composition, not just the final crop.",
            ],
            lessonSteps: MIDJOURNEY_MODULE_3_STEPS_EN,
            promptExample: MIDJOURNEY_PROMPTS.ratio,
            practice: {
              title: "Right format, right channel",
              instruction: "Choose the best ratio for each main use case.",
              terms: ["--ar 16:9", "--ar 9:16", "--ar 4:5", "--ar 3:2"],
              solution:
                "16:9 for banners and YouTube, 9:16 for Reels and Stories, 4:5 for the Instagram feed, and 3:2 for camera-like photography.",
            },
            quiz: {
              question: "Why is generating everything in 1:1 and cropping later usually a weak strategy?",
              options: [
                "Because MidJourney charges more when you crop later.",
                "Because any crop automatically lowers resolution.",
                "Because the composition was built for a square, not for the final channel.",
                "Because Instagram rejects images that started as square.",
              ],
              correctIndex: 2,
              explanation:
                "Aspect ratio decides the framing. If you change the format only at the end, you lose the composition designed for that channel.",
            },
            takeaway:
              "When you master ratio, you stop making generic images and start making strategic ones.",
          },
          {
            number: 4,
            title: "Point of view and narrative",
            intro:
              "This module lets you control how the camera tells the story: power, intimacy, context, scale, suspense, and immersion.",
            keyPoints: [
              "Eye level feels human; low angle expands power and heroism.",
              "High angle and bird's eye open context; close up reveals emotion.",
              "Wide shot handles atmosphere and scale; dutch angle creates tension.",
              "If you do not pick the viewpoint, you hand the narrative to a generic composition.",
            ],
            promptExample: MIDJOURNEY_PROMPTS.viewpoint,
            practice: {
              title: "Camera with intent",
              instruction: "Match the narrative objective to the most coherent camera angle.",
              terms: ["Low Angle", "Eye Level", "Close Up", "Dutch Angle"],
              solution:
                "Low Angle for power, Eye Level for human connection, Close Up for intimacy, and Dutch Angle for psychological tension.",
            },
            quiz: {
              question: "What is the cost of letting MidJourney choose the camera angle for you?",
              options: [
                "The image comes out in lower resolution.",
                "The prompt takes longer to render.",
                "You lose narrative control and drift toward a generic composition.",
                "MidJourney starts ignoring style and lighting.",
              ],
              correctIndex: 2,
              explanation:
                "The angle defines the emotional relationship between viewer and scene. Without it, the image often works, but rarely tells the right story.",
            },
            takeaway:
              "Angle is not polish. Angle is visual storytelling.",
            lessonSteps: MIDJOURNEY_MODULE_4_STEPS_EN,
          },
          {
            number: 5,
            title: "Stacking modes with intent",
            intro:
              "Now you stop writing loose prompts and start stacking layers: subject, environment, style, camera, light, palette, mood, and technical parameters.",
            keyPoints: [
              "Advanced prompts work best when they follow a logical structure.",
              "Style, light, and viewpoint should reinforce the same idea, not compete.",
              "Hybrid references work when each one contributes something recognizable and coherent.",
              "The usual mistake is not complexity. It is adding impressive words with no creative purpose.",
            ],
            promptExample: MIDJOURNEY_PROMPTS.modes,
            practice: {
              title: "Advanced prompt structure",
              instruction: "Arrange the layers of a combined prompt from the most essential to the most refined.",
              terms: [
                "subject and action",
                "environment and context",
                "artistic style",
                "point of view",
                "lighting",
                "color palette",
                "technical parameters",
              ],
              solution:
                "Start with subject and action, then environment and context, artistic style, point of view, lighting, color palette, and finish with technical parameters.",
            },
            quiz: {
              question: "What is the clearest sign that a combined prompt was poorly built?",
              options: [
                "It uses more than one artistic reference.",
                "It has more than six elements.",
                "It mixes strong terms that do not support one another.",
                "It leaves technical parameters for the end.",
              ],
              correctIndex: 2,
              explanation:
                "Sounding sophisticated is not enough. Every layer must push in the same creative direction.",
            },
            takeaway:
              "Advanced prompting is not about length. It is about coherence across layers.",
            lessonSteps: MIDJOURNEY_MODULE_5_STEPS_EN,
          },
          {
            number: 6,
            title: "Marketing visuals that convert",
            intro:
              "The final module takes MidJourney into real-world execution: products, feeds, ads, stories, thumbnails, social proof, and cohesive campaigns.",
            keyPoints: [
              "The image is the brand's first impression before any line of copy.",
              "Each format needs a different layout: feed, ads, vertical mobile, thumbnails, and editorial assets.",
              "Strong campaigns do not depend on one beautiful image. They depend on visual consistency across pieces.",
              "AI visuals work better when they reinforce positioning, emotion, and CTA together.",
            ],
            promptExample: MIDJOURNEY_PROMPTS.marketing,
            practice: {
              title: "Cohesive visual series",
              instruction: "Define what must stay fixed in a campaign to preserve brand recognition.",
              terms: ["palette", "lighting type", "photographic style", "composition rule", "subject and action"],
              solution:
                "Keep palette, lighting type, photographic style, and composition rule fixed. Vary subject and action according to each asset's objective.",
            },
            quiz: {
              question: "What is the most common visual mistake in small AI-made campaigns?",
              options: [
                "Using prompts that are too long.",
                "Creating images with too much quality.",
                "Lack of visual consistency between posts.",
                "Repeating the same style across the whole campaign.",
              ],
              correctIndex: 2,
              explanation:
                "If each piece looks like it came from a different brand, recognition and trust never compound.",
            },
            takeaway:
              "In marketing, MidJourney is not just for pretty images. It is for building brand perception with consistency.",
            lessonSteps: MIDJOURNEY_MODULE_6_STEPS_EN,
          },
        ],
      },
      es: {
        statusBadge: "Ruta activa",
        heroEyebrow: "MidJourney",
        heroTitle: "Direccion visual con IA, modulo por modulo.",
        heroDescription:
          "Esta ruta organiza tus fundamentos de MidJourney en 6 modulos practicos: acceso, luz, proporcion, camara, combinacion de modos y aplicacion en marketing.",
        overviewTitle: "Lo que vas a dominar",
        overviewItems: [
          "Usar MidJourney con claridad en lugar de adivinar con prompts aleatorios.",
          "Controlar luz, formato, camara y atmosfera con intencion visual.",
          "Crear imagenes pensadas para feed, anuncios, stories, campanas y assets de marca.",
        ],
        moduleLabel: "Modulo",
        keyPointsLabel: "Puntos clave",
        promptLabel: "Prompt de referencia",
        practiceLabel: "Practica guiada",
        termsLabel: "Terminos",
        solutionLabel: "Respuesta esperada",
        quizLabel: "Checkpoint",
        correctLabel: "Respuesta correcta",
        takeawayLabel: "Lectura final",
        modules: [
          {
            number: 1,
            title: "Tu primera obra con IA",
            intro:
              "Aprendes a entrar por Discord, usar /imagine, leer las 4 variaciones y refinar con U, V y redo sin depender del ensayo ciego.",
            keyPoints: [
              "MidJourney funciona dentro de Discord y convierte texto en imagen con una estetica muy fuerte.",
              "El comando /imagine inicia la generacion y devuelve 4 variaciones al mismo tiempo.",
              "U amplia la imagen elegida; V crea nuevas variaciones en la misma direccion.",
              "Estilo, iluminacion y --ar ya cambian mucho el resultado incluso en prompts simples.",
            ],
            lessonSteps: MIDJOURNEY_MODULE_1_STEPS_ES,
            promptExample: MIDJOURNEY_PROMPTS.basics,
            practice: {
              title: "Desafio de acceso",
              instruction: "Arma la secuencia basica para generar tu primera imagen en MidJourney.",
              terms: ["Discord", "MidJourney", "newbies", "/imagine", "1 minuto"],
              solution:
                "Crear una cuenta en Discord, entrar al servidor oficial de MidJourney, ir a un canal newbies, usar /imagine y esperar cerca de 1 minuto.",
            },
            quiz: {
              question: "Por que los prompts simples aceleran el aprendizaje en MidJourney?",
              options: [
                "Porque los prompts cortos siempre generan mejores imagenes.",
                "Porque MidJourney rechaza prompts con muchos terminos.",
                "Porque los prompts simples muestran el papel de cada palabra antes de agregar complejidad.",
                "Porque los prompts simples son solo para principiantes absolutos.",
              ],
              correctIndex: 2,
              explanation:
                "Cuando el prompt es simple, puedes ver que cambia cada palabra. Eso vuelve la iteracion mucho mas intencional.",
            },
            takeaway:
              "Tu primera victoria no es la perfeccion. Es aprender a iterar con direccion.",
          },
          {
            number: 2,
            title: "Iluminacion que cambia emocion",
            intro:
              "Aqui aprendes a leer la luz como una decision emocional: calor, misterio, poder, limpieza, historia, neon y escala epica.",
            keyPoints: [
              "Golden Hour calienta la escena; Blue Hour aporta sofisticacion y melancolia.",
              "Dramatic, Chiaroscuro y Rim controlan contraste, poder y presencia.",
              "Soft Box limpia producto; Neon urbaniza; Volumetric agrega profundidad casi magica.",
              "La luz correcta debe coincidir con la emocion del proyecto, no solo verse bonita.",
            ],
            lessonSteps: MIDJOURNEY_MODULE_2_STEPS_ES,
            promptExample: MIDJOURNEY_PROMPTS.lighting,
            practice: {
              title: "Mapa de luz",
              instruction: "Relaciona cada objetivo con el tipo de luz mas coherente.",
              terms: ["Golden Hour", "Blue Hour", "Soft Box", "Chiaroscuro"],
              solution:
                "Golden Hour para calor y nostalgia, Blue Hour para misterio sofisticado, Soft Box para producto limpio y Chiaroscuro para drama artistico.",
            },
            quiz: {
              question: "Cual es el error mas comun al elegir iluminacion en MidJourney?",
              options: [
                "Usar el mismo tipo de luz en proyectos distintos.",
                "Combinar dos iluminaciones en un mismo prompt.",
                "Elegir por apariencia sin considerar la emocion que transmite la luz.",
                "Especificar iluminacion en prompts cortos.",
              ],
              correctIndex: 2,
              explanation:
                "Cuando la luz contradice la emocion del proyecto, la imagen puede verse bien, pero pierde coherencia e impacto.",
            },
            takeaway:
              "La luz no es decoracion. Es la forma mas rapida de cambiar el tono emocional.",
          },
          {
            number: 3,
            title: "Proporcion y composicion",
            intro:
              "Este modulo muestra como --ar cambia encuadre, uso por plataforma y narrativa visual en cada canal.",
            keyPoints: [
              "Sin --ar, MidJourney usa 1:1 como formato por defecto.",
              "9:16 domina mobile; 4:5 ocupa mas feed; 16:9 funciona para banners y YouTube.",
              "3:2 y 2:3 acercan la imagen al lenguaje fotografico clasico.",
              "Cambiar la proporcion cambia toda la composicion, no solo el recorte final.",
            ],
            lessonSteps: MIDJOURNEY_MODULE_3_STEPS_ES,
            promptExample: MIDJOURNEY_PROMPTS.ratio,
            practice: {
              title: "Formato correcto, canal correcto",
              instruction: "Elige la proporcion ideal para cada uso principal.",
              terms: ["--ar 16:9", "--ar 9:16", "--ar 4:5", "--ar 3:2"],
              solution:
                "16:9 para banners y YouTube, 9:16 para Reels y Stories, 4:5 para el feed de Instagram y 3:2 para fotografia con apariencia de camara.",
            },
            quiz: {
              question: "Por que generar todo en 1:1 y recortar despues suele ser una estrategia debil?",
              options: [
                "Porque MidJourney cobra mas cuando recortas despues.",
                "Porque cualquier recorte baja automaticamente la resolucion.",
                "Porque la composicion fue pensada para un cuadro cuadrado, no para el canal final.",
                "Porque Instagram rechaza imagenes que nacieron cuadradas.",
              ],
              correctIndex: 2,
              explanation:
                "La proporcion decide el encuadre. Si cambias el formato solo al final, pierdes la composicion ideal para ese canal.",
            },
            takeaway:
              "Quien domina la proporcion deja de crear imagenes genericas y empieza a crear imagenes estrategicas.",
          },
          {
            number: 4,
            title: "Punto de vista y narrativa",
            intro:
              "Aqui controlas como la camara cuenta la historia: poder, intimidad, contexto, escala, suspenso e inmersion.",
            keyPoints: [
              "Eye level humaniza; low angle amplifica poder y heroismo.",
              "High angle y bird's eye abren contexto; close up revela emocion.",
              "Wide shot trabaja atmosfera y escala; dutch angle crea tension.",
              "Si no eliges el punto de vista, entregas la narrativa a una composicion generica.",
            ],
            promptExample: MIDJOURNEY_PROMPTS.viewpoint,
            practice: {
              title: "Camara con intencion",
              instruction: "Relaciona el objetivo narrativo con el angulo mas coherente.",
              terms: ["Low Angle", "Eye Level", "Close Up", "Dutch Angle"],
              solution:
                "Low Angle para poder, Eye Level para conexion humana, Close Up para intimidad y Dutch Angle para tension psicologica.",
            },
            quiz: {
              question: "Cual es el costo de dejar que MidJourney elija el angulo por ti?",
              options: [
                "La imagen sale con menor resolucion.",
                "El prompt tarda mas en renderizar.",
                "Pierdes control narrativo y te acercas a una composicion generica.",
                "MidJourney empieza a ignorar estilo e iluminacion.",
              ],
              correctIndex: 2,
              explanation:
                "El angulo define la relacion emocional entre espectador y escena. Sin el, la imagen rara vez cuenta la historia correcta.",
            },
            takeaway:
              "El angulo no es un acabado. Es narrativa visual.",
            lessonSteps: MIDJOURNEY_MODULE_4_STEPS_ES,
          },
          {
            number: 5,
            title: "Combinar modos con intencion",
            intro:
              "Ahora dejas el prompt suelto y empiezas a apilar capas: sujeto, ambiente, estilo, camara, luz, paleta, mood y parametros tecnicos.",
            keyPoints: [
              "Los prompts avanzados funcionan mejor cuando siguen una estructura logica.",
              "Estilo, luz y punto de vista deben reforzar la misma idea, no competir.",
              "Las referencias hibridas funcionan cuando cada una aporta algo reconocible y coherente.",
              "El error comun no es la complejidad. Es sumar palabras fuertes sin proposito creativo.",
            ],
            promptExample: MIDJOURNEY_PROMPTS.modes,
            practice: {
              title: "Estructura del prompt avanzado",
              instruction: "Ordena las capas de un prompt combinado desde lo esencial hasta lo mas refinado.",
              terms: [
                "sujeto y accion",
                "ambiente y contexto",
                "estilo artistico",
                "punto de vista",
                "iluminacion",
                "paleta de color",
                "parametros tecnicos",
              ],
              solution:
                "Empieza por sujeto y accion, luego ambiente y contexto, estilo artistico, punto de vista, iluminacion, paleta de color y termina con parametros tecnicos.",
            },
            quiz: {
              question: "Cual es la senal mas clara de que un prompt combinado fue mal construido?",
              options: [
                "Usa mas de una referencia artistica.",
                "Tiene mas de seis elementos.",
                "Mezcla terminos fuertes que no se apoyan entre si.",
                "Deja los parametros tecnicos para el final.",
              ],
              correctIndex: 2,
              explanation:
                "No basta sonar sofisticado. Cada capa tiene que empujar en la misma direccion creativa.",
            },
            takeaway:
              "Un prompt avanzado no es un prompt largo. Es un prompt coherente en varias capas.",
            lessonSteps: MIDJOURNEY_MODULE_5_STEPS_ES,
          },
          {
            number: 6,
            title: "Marketing visual que convierte",
            intro:
              "El cierre de la ruta lleva MidJourney al mundo real: producto, feed, anuncio, story, thumbnail, prueba social y campanas coherentes.",
            keyPoints: [
              "La imagen es la primera impresion de la marca antes de cualquier linea de texto.",
              "Cada formato pide un layout distinto: feed, ads, vertical mobile, thumbnail y contenido editorial.",
              "Una campana fuerte no depende de una sola imagen bonita, sino de consistencia visual entre piezas.",
              "Los visuales con IA funcionan mejor cuando refuerzan posicionamiento, emocion y CTA al mismo tiempo.",
            ],
            promptExample: MIDJOURNEY_PROMPTS.marketing,
            practice: {
              title: "Serie visual coherente",
              instruction: "Define que debe mantenerse fijo en una campana para preservar reconocimiento de marca.",
              terms: ["paleta", "tipo de iluminacion", "estilo fotografico", "regla de composicion", "sujeto y accion"],
              solution:
                "Mantener fijos paleta, tipo de iluminacion, estilo fotografico y regla de composicion. Variar sujeto y accion segun el objetivo de cada pieza.",
            },
            quiz: {
              question: "Cual es el error visual mas comun en campanas pequenas hechas con IA?",
              options: [
                "Usar prompts demasiado largos.",
                "Crear imagenes con demasiada calidad.",
                "Falta de consistencia visual entre publicaciones.",
                "Repetir el mismo estilo durante toda la campana.",
              ],
              correctIndex: 2,
              explanation:
                "Si cada pieza parece venir de una marca distinta, el publico nunca acumula reconocimiento ni confianza.",
            },
            takeaway:
              "En marketing, MidJourney no sirve solo para imagenes bonitas. Sirve para construir percepcion de marca con consistencia.",
            lessonSteps: MIDJOURNEY_MODULE_6_STEPS_ES,
          },
        ],
      },
      fr: {
        statusBadge: "Parcours actif",
        heroEyebrow: "MidJourney",
        heroTitle: "Direction visuelle avec IA, module par module.",
        heroDescription:
          "Ce parcours organise tes bases MidJourney en 6 modules pratiques : acces, lumiere, format, camera, combinaison de modes et execution marketing.",
        overviewTitle: "Ce que tu vas maitriser",
        overviewItems: [
          "Utiliser MidJourney avec clarte au lieu d'improviser avec des prompts aleatoires.",
          "Controler lumiere, format, camera et atmosphere avec intention visuelle.",
          "Creer des images pensees pour le feed, les ads, les stories, les campagnes et les assets de marque.",
        ],
        moduleLabel: "Module",
        keyPointsLabel: "Points cles",
        promptLabel: "Prompt de reference",
        practiceLabel: "Pratique guidee",
        termsLabel: "Termes",
        solutionLabel: "Reponse attendue",
        quizLabel: "Checkpoint",
        correctLabel: "Bonne reponse",
        takeawayLabel: "Lecture finale",
        modules: [
          {
            number: 1,
            title: "Ta premiere image IA",
            intro:
              "Tu apprends a entrer via Discord, utiliser /imagine, lire les 4 variations et affiner avec U, V et redo sans avancer a l'aveugle.",
            keyPoints: [
              "MidJourney fonctionne dans Discord et transforme le texte en image a forte signature visuelle.",
              "La commande /imagine lance la generation et renvoie 4 variations en meme temps.",
              "U agrandit l'image choisie ; V cree de nouvelles variations dans la meme direction.",
              "Style, lumiere et --ar changent deja fortement le resultat, meme avec des prompts simples.",
            ],
            lessonSteps: MIDJOURNEY_MODULE_1_STEPS_FR,
            promptExample: MIDJOURNEY_PROMPTS.basics,
            practice: {
              title: "Sequence d'acces",
              instruction: "Reconstruis le flux de base pour generer ta premiere image.",
              terms: ["Discord", "MidJourney", "newbies", "/imagine", "1 minute"],
              solution:
                "Creer un compte Discord, rejoindre le serveur officiel MidJourney, aller dans un canal newbies, utiliser /imagine et attendre environ 1 minute.",
            },
            quiz: {
              question: "Pourquoi les prompts simples accelerent-ils l'apprentissage sur MidJourney ?",
              options: [
                "Parce que les prompts courts donnent toujours de meilleures images.",
                "Parce que MidJourney refuse les prompts trop riches.",
                "Parce qu'un prompt simple montre le role de chaque mot avant d'ajouter de la complexite.",
                "Parce que les prompts simples sont reserves aux debutants absolus.",
              ],
              correctIndex: 2,
              explanation:
                "Quand le prompt est simple, tu vois ce que chaque mot change vraiment. L'iteration devient ensuite beaucoup plus intentionnelle.",
            },
            takeaway:
              "Ton premier gain n'est pas la perfection. C'est apprendre a iterer avec direction.",
          },
          {
            number: 2,
            title: "La lumiere qui change l'emotion",
            intro:
              "Ici, tu lis la lumiere comme une decision emotionnelle : chaleur, mystere, puissance, proprete, histoire, neon et ampleur epique.",
            keyPoints: [
              "Golden Hour rechauffe la scene ; Blue Hour apporte sophistication et melancolie.",
              "Dramatic, Chiaroscuro et Rim pilotent contraste, puissance et presence.",
              "Soft Box nettoie le produit ; Neon urbanise ; Volumetric ajoute une profondeur presque magique.",
              "La bonne lumiere doit soutenir l'emotion du projet, pas seulement une belle esthetique.",
            ],
            lessonSteps: MIDJOURNEY_MODULE_2_STEPS_FR,
            promptExample: MIDJOURNEY_PROMPTS.lighting,
            practice: {
              title: "Carte de lumiere",
              instruction: "Associe chaque objectif au type de lumiere le plus coherent.",
              terms: ["Golden Hour", "Blue Hour", "Soft Box", "Chiaroscuro"],
              solution:
                "Golden Hour pour chaleur et nostalgie, Blue Hour pour mystere sophistique, Soft Box pour produit propre et Chiaroscuro pour drame artistique.",
            },
            quiz: {
              question: "Quelle est l'erreur la plus courante quand on choisit la lumiere sur MidJourney ?",
              options: [
                "Utiliser la meme lumiere sur des projets differents.",
                "Combiner deux lumieres dans un meme prompt.",
                "Choisir selon l'apparence sans penser a l'emotion transmise.",
                "Specifier la lumiere dans des prompts courts.",
              ],
              correctIndex: 2,
              explanation:
                "Quand la lumiere contredit l'emotion du projet, l'image peut rester jolie, mais elle perd en coherence et en impact.",
            },
            takeaway:
              "La lumiere n'est pas un decor. C'est le levier le plus rapide pour changer le ton emotionnel.",
          },
          {
            number: 3,
            title: "Format et composition",
            intro:
              "Ce module montre comment --ar change le cadrage, l'usage par plateforme et la narration visuelle selon le canal.",
            keyPoints: [
              "Sans --ar, MidJourney revient au 1:1 par defaut.",
              "9:16 domine le mobile ; 4:5 prend plus de place dans le feed ; 16:9 marche pour banniere et YouTube.",
              "3:2 et 2:3 rapprochent l'image du langage photographique classique.",
              "Changer le ratio change toute la composition, pas seulement le recadrage final.",
            ],
            lessonSteps: MIDJOURNEY_MODULE_3_STEPS_FR,
            promptExample: MIDJOURNEY_PROMPTS.ratio,
            practice: {
              title: "Bon format, bon canal",
              instruction: "Choisis le ratio ideal pour chaque usage principal.",
              terms: ["--ar 16:9", "--ar 9:16", "--ar 4:5", "--ar 3:2"],
              solution:
                "16:9 pour banniere et YouTube, 9:16 pour Reels et Stories, 4:5 pour le feed Instagram et 3:2 pour une photo avec rendu camera.",
            },
            quiz: {
              question: "Pourquoi tout generer en 1:1 puis recadrer ensuite est-il souvent une mauvaise strategie ?",
              options: [
                "Parce que MidJourney facture davantage apres recadrage.",
                "Parce que tout recadrage reduit automatiquement la resolution.",
                "Parce que la composition a ete pensee pour un carre, pas pour le canal final.",
                "Parce qu'Instagram refuse les images initialement carrees.",
              ],
              correctIndex: 2,
              explanation:
                "Le ratio decide le cadrage. Si tu changes le format a la fin, tu perds la composition concue pour ce canal.",
            },
            takeaway:
              "Maitriser le ratio, c'est passer d'une image generique a une image strategique.",
          },
          {
            number: 4,
            title: "Point de vue et narration",
            intro:
              "Ici, tu controles comment la camera raconte l'histoire : puissance, intimite, contexte, echelle, suspense et immersion.",
            keyPoints: [
              "Eye level humanise ; low angle amplifie puissance et heroisme.",
              "High angle et bird's eye ouvrent le contexte ; close up revele l'emotion.",
              "Wide shot travaille atmosphere et echelle ; dutch angle cree la tension.",
              "Si tu ne choisis pas le point de vue, tu laisses la narration a une composition generique.",
            ],
            promptExample: MIDJOURNEY_PROMPTS.viewpoint,
            practice: {
              title: "Camera avec intention",
              instruction: "Associe l'objectif narratif a l'angle le plus coherent.",
              terms: ["Low Angle", "Eye Level", "Close Up", "Dutch Angle"],
              solution:
                "Low Angle pour la puissance, Eye Level pour la connexion humaine, Close Up pour l'intimite et Dutch Angle pour la tension psychologique.",
            },
            quiz: {
              question: "Quel est le cout de laisser MidJourney choisir seul l'angle de la scene ?",
              options: [
                "L'image sort avec une resolution plus faible.",
                "Le prompt met plus de temps a se generer.",
                "Tu perds le controle narratif et tu glisses vers une composition generique.",
                "MidJourney commence a ignorer style et lumiere.",
              ],
              correctIndex: 2,
              explanation:
                "L'angle definit la relation emotionnelle entre le spectateur et la scene. Sans lui, l'image raconte rarement la bonne histoire.",
            },
            takeaway:
              "L'angle n'est pas une finition. C'est la narration visuelle.",
            lessonSteps: MIDJOURNEY_MODULE_4_STEPS_FR,
          },
          {
            number: 5,
            title: "Combiner les modes avec intention",
            intro:
              "Tu quittes maintenant le prompt isole pour empiler des couches : sujet, environnement, style, camera, lumiere, palette, mood et parametres techniques.",
            keyPoints: [
              "Les prompts avances marchent mieux quand ils suivent une structure logique.",
              "Style, lumiere et point de vue doivent renforcer la meme idee, pas se concurrencer.",
              "Les references hybrides fonctionnent quand chacune apporte quelque chose de reconnaissable et coherent.",
              "L'erreur classique n'est pas la complexite. C'est d'ajouter des mots forts sans intention creative.",
            ],
            promptExample: MIDJOURNEY_PROMPTS.modes,
            practice: {
              title: "Structure du prompt avance",
              instruction: "Range les couches d'un prompt combine du plus essentiel au plus raffine.",
              terms: [
                "sujet et action",
                "environnement et contexte",
                "style artistique",
                "point de vue",
                "lumiere",
                "palette de couleurs",
                "parametres techniques",
              ],
              solution:
                "Commence par sujet et action, puis environnement et contexte, style artistique, point de vue, lumiere, palette de couleurs et termine par les parametres techniques.",
            },
            quiz: {
              question: "Quel est le signe le plus clair qu'un prompt combine a ete mal construit ?",
              options: [
                "Il utilise plus d'une reference artistique.",
                "Il contient plus de six elements.",
                "Il melange des termes forts qui ne se soutiennent pas entre eux.",
                "Il place les parametres techniques a la fin.",
              ],
              correctIndex: 2,
              explanation:
                "Avoir l'air sophistique ne suffit pas. Chaque couche doit pousser dans la meme direction creative.",
            },
            takeaway:
              "Un prompt avance n'est pas un prompt long. C'est un prompt coherent sur plusieurs couches.",
            lessonSteps: MIDJOURNEY_MODULE_5_STEPS_FR,
          },
          {
            number: 6,
            title: "Des visuels marketing qui convertissent",
            intro:
              "Le dernier module amene MidJourney dans l'execution reelle : produit, feed, ads, stories, thumbnails, preuve sociale et campagnes coherentes.",
            keyPoints: [
              "L'image est la premiere impression de la marque avant toute ligne de texte.",
              "Chaque format demande un layout different : feed, ads, mobile vertical, thumbnail et contenu editorial.",
              "Une campagne forte ne depend pas d'une seule belle image, mais d'une coherence visuelle entre les pieces.",
              "Les visuels IA gagnent en puissance quand ils soutiennent en meme temps positionnement, emotion et CTA.",
            ],
            promptExample: MIDJOURNEY_PROMPTS.marketing,
            practice: {
              title: "Serie visuelle coherente",
              instruction: "Definis ce qui doit rester fixe dans une campagne pour proteger la reconnaissance de marque.",
              terms: ["palette", "type de lumiere", "style photographique", "regle de composition", "sujet et action"],
              solution:
                "Garder fixes la palette, le type de lumiere, le style photographique et la regle de composition. Faire varier sujet et action selon l'objectif de chaque piece.",
            },
            quiz: {
              question: "Quelle est l'erreur visuelle la plus courante dans les petites campagnes faites avec l'IA ?",
              options: [
                "Utiliser des prompts trop longs.",
                "Creer des images avec trop de qualite.",
                "Manquer de coherence visuelle entre les posts.",
                "Repeter le meme style sur toute la campagne.",
              ],
              correctIndex: 2,
              explanation:
                "Si chaque visuel semble venir d'une marque differente, la reconnaissance et la confiance ne s'accumulent jamais.",
            },
            takeaway:
              "En marketing, MidJourney ne sert pas seulement a faire de belles images. Il sert a construire une perception de marque coherente.",
            lessonSteps: MIDJOURNEY_MODULE_6_STEPS_FR,
          },
        ],
      },
    },
  },
};

const normalizeAiTrailLocale = (language?: string): AiTrailLocale => {
  const base = language?.split("-")[0]?.toLowerCase();
  if (base === "pt" || base === "en" || base === "es" || base === "fr") return base;
  return "en";
};

export const getAiTrailStatus = (slug: string): AiTrailStatus =>
  AI_TRAIL_CONTENT[slug]?.status || "coming_soon";

export const isAiTrailLive = (slug: string) => getAiTrailStatus(slug) === "live";

export const getAiTrailContent = (
  slug: string,
  language?: string,
): AiTrailLocalizedContent | null => {
  const entry = AI_TRAIL_CONTENT[slug];
  if (!entry) return null;

  const locale = normalizeAiTrailLocale(language);
  return entry.locales[locale] || entry.locales.en || entry.locales.pt || null;
};
