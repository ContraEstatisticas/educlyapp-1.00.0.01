import {
  GEMINI_MODULE_1_STEPS_EN,
  GEMINI_MODULE_1_STEPS_ES,
  GEMINI_MODULE_1_STEPS_FR,
  GEMINI_MODULE_1_STEPS_PT,
} from "@/lib/geminiModule1LessonSteps";
import {
  GEMINI_MODULE_2_STEPS_EN,
  GEMINI_MODULE_2_STEPS_ES,
  GEMINI_MODULE_2_STEPS_FR,
  GEMINI_MODULE_2_STEPS_PT,
} from "@/lib/geminiModule2LessonSteps";
import {
  GEMINI_MODULE_3_STEPS_EN,
  GEMINI_MODULE_3_STEPS_ES,
  GEMINI_MODULE_3_STEPS_FR,
  GEMINI_MODULE_3_STEPS_PT,
} from "@/lib/geminiModule3LessonSteps";
import {
  GEMINI_MODULE_4_STEPS_EN,
  GEMINI_MODULE_4_STEPS_ES,
  GEMINI_MODULE_4_STEPS_FR,
  GEMINI_MODULE_4_STEPS_PT,
} from "@/lib/geminiModule4LessonSteps";
import {
  GEMINI_MODULE_5_STEPS_EN,
  GEMINI_MODULE_5_STEPS_ES,
  GEMINI_MODULE_5_STEPS_FR,
  GEMINI_MODULE_5_STEPS_PT,
} from "@/lib/geminiModule5LessonSteps";
import {
  GEMINI_MODULE_6_STEPS_EN,
  GEMINI_MODULE_6_STEPS_ES,
  GEMINI_MODULE_6_STEPS_FR,
  GEMINI_MODULE_6_STEPS_PT,
} from "@/lib/geminiModule6LessonSteps";
import {
  GEMINI_MODULE_7_STEPS_EN,
  GEMINI_MODULE_7_STEPS_ES,
  GEMINI_MODULE_7_STEPS_FR,
  GEMINI_MODULE_7_STEPS_PT,
} from "@/lib/geminiModule7LessonSteps";
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
  options: readonly string[];
  correctIndex: number;
  explanation: string;
}

export interface AiTrailFillBlanksLessonStep {
  type: "fill_blanks";
  title: string;
  instruction: string;
  sentence: string;
  answers: readonly string[];
  options: readonly string[];
  explanation?: string;
}

export type AiTrailLessonStep =
  | AiTrailTextLessonStep
  | AiTrailQuizLessonStep
  | AiTrailFillBlanksLessonStep;

export interface AiTrailPractice {
  title: string;
  instruction: string;
  terms: readonly string[];
  solution: string;
}

export interface AiTrailQuiz {
  question: string;
  options: readonly string[];
  correctIndex: number;
  explanation: string;
}

export interface AiTrailModuleContent {
  number: number;
  title: string;
  intro: string;
  keyPoints: readonly string[];
  promptExample: string;
  practice: AiTrailPractice;
  quiz: AiTrailQuiz;
  takeaway: string;
  lessonSteps?: readonly AiTrailLessonStep[];
}

export interface AiTrailLocalizedContent {
  statusBadge: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  overviewTitle: string;
  overviewItems: readonly string[];
  moduleLabel: string;
  keyPointsLabel: string;
  promptLabel: string;
  practiceLabel: string;
  termsLabel: string;
  solutionLabel: string;
  quizLabel: string;
  correctLabel: string;
  takeawayLabel: string;
  modules: readonly AiTrailModuleContent[];
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
  gemini: {
    status: "live",
    locales: {
      pt: {
        statusBadge: "Trilha ativa",
        heroEyebrow: "Gemini",
        heroTitle: "O Assistente de IA do Google, modulo por modulo.",
        heroDescription:
          "Essa trilha organiza como tirar o melhor do ecossistema Google usando o Gemini: pesquisa conectada a web, integracao nativa com Workspace (Docs, Drive, Gmail) e processamento multimodal (imagens, audios e videos).",
        overviewTitle: "O que voce vai dominar",
        overviewItems: [
          "Entender a forca e a versatilidade de cada modelo (1.5 Pro, Flash, etc.).",
          "Acrescentar velocidade nas pesquisas, acessando tendencias em tempo real.",
          "Navegar em documentos, caixas de e-mail e videos com auxilio imediato e pratico."
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
            title: "O Assistente de IA do Google",
            intro:
              "Conheca as forcas primordiais do Gemini, onde ele se sobressai perante as outras ferramentas de inteligencia e como interagir da forma mais estrategica possivel.",
            keyPoints: [
              "O ecossistema pre-conectado: Docs, Gmail e Google Search integrados.",
              "Multimodalidade: ele nao so converte texto como absorve informacoes estruturadas visuais e links (ex: YouTube).",
              "Buscando e filtrando informacoes on-line com checagem de fontes nativa.",
              "Como poupar os longos ciclos ao interagir no contexto certo de forma assistida."
            ],
            lessonSteps: GEMINI_MODULE_1_STEPS_PT,
            promptExample: "Pesquise as 5 noticias mais recentes sobre inteligencia artificial na medicina e resuma como isso mudara as profissoes futuras.",
            practice: {
              title: "O prompt contextual perfeito",
              instruction: "Estruture uma logica nativa de interrogacao web.",
              terms: ["pesquise tendências atuais", "resuma de forma objetiva", "5 principais pontos", "indique fontes consultadas"],
              solution: "Formule intencoes diretas as quais so uma maquina baseada no Google responderia prontamente e com refutacao nativa de atualizacao util."
            },
            quiz: {
              question: "Qual aspecto realca a excelencia do Gemini quando contraposto aos demais players?",
              options: [
                "Criar videos hollywoodianos de 10 minutos sem parar.",
                "Estar presente organicamente onde seus dados vivem, reduzindo malabarismos entre software distinto.",
                "Produzir e publicar aplicacoes no Github sozinho e anonimamente.",
                "Trancar-se nos textos do passado sem precisar se conectar as redes em vivo."
              ],
              correctIndex: 1,
              explanation: "O Gemini preenche as lacunas de atrito. Ao fluir nativamente nos emails e textos, ele vira um braço operacional."
            },
            takeaway: "Integrando o Gemini, voce converte a propria inteligencia da busca digital de um evento pontual para uma engrenagem na sua execucao rotineira."
          },
          {
            number: 2,
            title: "Entendendo as Entradas Multimodais",
            intro: "Mergulhe no processamento multimodal do Gemini. Descubra como imagens, links, videos e audios reagem na mesma interface.",
            keyPoints: [
              "Entendimento Nativo: O Gemini processa diferentes fontes simultaneamente.",
              "Documentos Visuais: Tabelas ou PDFs longos sao perfeitamente cruzados.",
              "Audios e Videos: Ele atua como um assistente ouvindo chamadas e YouTube links.",
              "Vantagem Competitiva: Mais contextos geram menos trabalho humano focado em transcrever a midia."
            ],
            lessonSteps: GEMINI_MODULE_2_STEPS_PT,
            promptExample: "O que o relatorio [PDF] abaixo alerta sobre vendas? Cruze com os resultados da foto de prateleira anexada.",
            practice: {
              title: "Multimodalidade na Pratica",
              instruction: "Agrupe 2 arquivos e gere um comando unico em vez de conversas separadas.",
              terms: ["Analise juntos", "foto e dados", "problema em comum", "respostas curtas"],
              solution: "Ao prover dados multimidia que formem um pacote, o raciocinio cruzado sera otimizado nativamente."
            },
            quiz: {
              question: "Como o Gemini lida com multiplos tipos de arquivo ao mesmo tempo?",
              options: [
                "Eles precisam ser processados em janelas exclusivas.",
                "E preciso um modelo premium e pago para enviar imagens.",
                "Eles sao absorvidos num grande bloco unitario de conhecimento relacional pelo modelo nativamente multimodal.",
                "O modelo traduz fotos e videos arduamente e apenas tenta simular os achados de modo deficiente."
              ],
              correctIndex: 2,
              explanation: "O segredo e um motor que nao enxerga os canais como barreiras mas sim como vias de confluencia simultanea."
            },
            takeaway: "Reduzir o esfacelamento das interfaces agrupando-as na mesma tela traciona significativamente o tempo de resposta da sua empresa."
          },
          {
            number: 3,
            title: "Pesquisando na Internet em Tempo Real",
            intro: "Diferente de modelos congelados, o Gemini le a web viva. Avalie as ultimas noticias ou escaneie tensoes de mercado em questoes de segundos.",
            keyPoints: [
              "Fatos Vivos: A vantagem de uma IA que pesquisa a internet no milissegundo.",
              "Auditoria Facilitada: Obrigando o modelo a retornar links de fontes consultaveis.",
              "Cruzando Tendencia X Concorrente: Mapeamento estrategico em uma busca unificada."
            ],
            lessonSteps: GEMINI_MODULE_3_STEPS_PT,
            promptExample: "O que dizem as 5 materias lideres lancadas na ultima semana sobre automacao? Retorne fontes.",
            practice: {
              title: "Scrape Contextual Corporativo",
              instruction: "Colete opinioes dispersas no mercado sobre uma marca",
              terms: ["Analise reviews online", "percepcoes neutras", "nome do seu concorrente", "top 3 fraquezas publicas"],
              solution: "Em vez do achismo humano que leva semanas, a pesquisa indexada agrupa milhares de citacoes fragmentadas."
            },
            quiz: {
              question: "Ao encomendar pesquisas aterradas pela realidade, o que garante estabilidade?",
              options: [
                "Assumir que a maquina erra logo nao utiliza-la.",
                "Estar atrelado estritamente a jornais europeus tradicionais ignorando todo o resto da web.",
                "Impor limites restritos como o periodo de tempo desejado a analisar somado a demanda impiedosa de links fontes verificaveis humanamente.",
                "Aceitar todos os desdobramentos entregues confiantemente."
              ],
              correctIndex: 2,
              explanation: "Fornecer regras estreitas que o isolem limitando divagacoes inventivas e enraizem na busca por links verificaveis da tranquilidade gerencial."
            },
            takeaway: "Usar uma IA desligada da internet para obter noticias de mercado e irmao de escutar os palpites financeiros de uma enciclopedia datada do passado."
          },
          {
            number: 4,
            title: "Planilhas com Inteligência Artificial",
            intro: "Aprenda como o Gemini transforma sua experiência analisando dados, criando fórmulas, gerando gráficos e automatizando tarefas no Google Sheets.",
            keyPoints: [
              "Criação de fórmulas em linguagem natural.",
              "Análise de dados diretos e descoberta de insights.",
              "Estruturação de tabelas e cruzamento de versões divergentes.",
              "Automatização de tarefas com Google Apps Script nativo."
            ],
            lessonSteps: GEMINI_MODULE_4_STEPS_PT,
            promptExample: "O que os dados mostram sobre as vendas do último mês? Qual a tendência dominante e o que sugere proativamente?",
            practice: {
              title: "O Analista Chefe de Dados",
              instruction: "Cole uma base embaralhada e deixe o modelo fazer a triagem e análise gerencial.",
              terms: ["Analise os indicadores vitais", "destaque duplicações", "revele o principal ponto de atrito", "proponha 3 medidas táticas"],
              solution: "Forçar que a IA proponha ações remove a carga abstrata, entregando diretrizes gerenciais imediatas para agir sobre as células brutas."
            },
            quiz: {
              question: "Ao lidar com duas bases gigantes com discrepâncias estruturais e de dados, qual vantagem primária o Gemini traz?",
              options: [
                "Criar gráficos bonitos de forma mágica, ocultando sumariamente a origem e o desalinhamento matemático.",
                "Isolar incansavelmente e contrastar as falhas ocultas, detectando discrepâncias e desalinhamentos invisíveis quase imediatamente.",
                "Efetuar exclusões massivas preventivas em ambos os arquivos para nivelar o jogo base.",
                "Congelar o documento do usuário até que um administrador aprove as fórmulas preteridas."
              ],
              correctIndex: 1,
              explanation: "O uso meticuloso do modelo poupa as habituais horas noturnas de cruzamento manual entre arquivos supostamente idênticos que não batem analiticamente."
            },
            takeaway: "Empregar o Gemini sobre suas planilhas evolui o papel do usuário: de elaborador frustrado de fórmulas para diretor executivo de tomadas de decisão."
          },
          {
            number: 5,
            title: "Auxílio na Escrita de Textos",
            intro: "Aprenda como o Gemini se torna um parceiro poderoso na escrita — redigindo, revisando, adaptando e aprimorando qualquer tipo de texto com velocidade e qualidade profissional.",
            keyPoints: [
              "Direcionamento Estruturado para obter resultados úteis no primeiro disparo.",
              "Variações Contextuais que adaptam o tom para mídias distintas.",
              "Redação de e-mails blindados emocionalmente.",
              "Identificação de erros e adequação fonética/gramatical pedagógica."
            ],
            lessonSteps: GEMINI_MODULE_5_STEPS_PT,
            promptExample: "Aqui está meu texto original: [texto]. Reescreva em 3 versões com tons diferentes: uma formal para um e-mail corporativo, uma envolvente para Instagram e uma precisa técnica. Mantenha as ideias principais.",
            practice: {
              title: "A Edição Fina e Iterativa",
              instruction: "Transforme o modelo num experiente editor-chefe que corrige sem encobrir sua verdadeira voz autoral.",
              terms: ["falta de clareza", "repetitivas ou longas demais", "erros de coesão e concordância", "palavras vagas"],
              solution: "Ao requisitar um laudo pedagógico detalhado de cada deslize, a máquina atua secretamente como o seu tutor gramatical evolutivo."
            },
            quiz: {
              question: "Por que testar diferentes estilos literários e tons comunicativos utilizando o Gemini ao invés de enviar a primeira versão redigida à exaustão por você?",
              options: [
                "Para rechear o documento visualmente e gastar as capacidades cômicas não exploradas da ferramenta.",
                "Pois possivelmente revelará nuances ortográficas escondidas e expandirá automaticamente as páginas em número bruto de palavras vazias.",
                "Para descobrir qual abordagem ressoa e impacta psiquicamente seu público real, blindando e enriquecendo seu leque comunicativo através de moldes difíceis de imaginar do nada.",
                "Para garantir que todos percam bastante tempo ajustando configurações supérfluas irrelevantes."
              ],
              correctIndex: 2,
              explanation: "Forçar polaridades redatoriais faz o algoritmo revelar alternativas tonais impactantes que seriam difíceis de imaginar começando do zero."
            },
            takeaway: "Delegar ao Gemini a experimentação polifônica do seu tom o converte de autor paralisado em regente executivo seguro e assertivo."
          },
          {
            number: 6,
            title: "Criação de Vídeos e Fotos com Veo 3.1",
            intro: "Aprenda como o Gemini se torna um estúdio completo de criação visual com duas integrações poderosas: o Nano Banana Pro para raciocínio e geração de imagens e o Veo 3.1 para criação de vídeos com qualidade cinematográfica.",
            keyPoints: [
              "Geração de imagens com raciocínio apurado via Nano Banana Pro.",
              "Construção de vídeos com framerate realista e movimento lógico.",
              "Áudio ambiente sincronizado nativamente pelo Veo 3.1.",
              "Direção de ponta a ponta sem software extra."
            ],
            lessonSteps: GEMINI_MODULE_6_STEPS_PT,
            promptExample: "Ative o raciocínio do Nano Banana Pro e gere uma imagem fotorrealista de uma cidade futurista sob o pôr do sol. Depois, use o Veo 3.1 para animar essa cena com drone descendo e sons de carros voadores.",
            practice: {
              title: "A Construção do Estúdio Sintético",
              instruction: "Funda os poderes do Nano e do Veo para esculpir uma tomada perfeita do começo ao fim.",
              terms: ["esquemas visuais estáticos", "movimentar e orquestrar", "física irretocável", "camadas acústicas nativas"],
              solution: "Ao obrigar a máquina a justificar sua arte antes de animar, blinda-se a obra contra saltos caóticos indesejados no vídeo."
            },
            quiz: {
              question: "Por que aliar o rigor do Nano Banana Pro à potência de movimento do Veo 3.1 é tão superior a meramente pedir imagens isoladas velozes?",
              options: [
                "Para obrigar o software a demorar mais processando os pacotes.",
                "Não é recomendado; as ferramentas não foram feitas para funcionarem integradas em hipótese alguma.",
                "Porque a validação de raciocínio prévia imobiliza ambiguidades gráficas, alimentando a fera da animação com roteiro inabalável.",
                "Porque apenas o Veo 3.1 consegue redigir textos criativos elaborados em linguagem Python de maneira fluída."
              ],
              correctIndex: 2,
              explanation: "Roteirizar de antemão evita deformações desastrosas custosas de se emendar na animação já pronta."
            },
            takeaway: "Ao acoplar o pensar frio do Nano ao fluxo do Veo, você aposenta horas em pranchetas de edição por uma cátedra absoluta de direção digital imediata."
          },
          {
            number: 7,
            title: "Marketing: Estratégia, Conteúdo e Resultados",
            intro: "Aprenda como o Gemini se torna um aliado estratégico completo para o marketing — criando conteúdo, desenvolvendo campanhas, analisando concorrentes, escrevendo copies e construindo estratégias que geram resultados reais.",
            keyPoints: [
              "Criação de estratégias de conteúdo personalizadas com pilares temáticos e métricas.",
              "Pesquisa de tendências de marketing em tempo real com acesso à internet.",
              "Redação de copies de alta conversão usando frameworks como PAS e AIDA.",
              "Análise de concorrentes e criação de calendários editoriais completos."
            ],
            lessonSteps: GEMINI_MODULE_7_STEPS_PT,
            promptExample: "Você é um estrategista de marketing digital. Crie uma estratégia de conteúdo para o Instagram de uma clínica de estética para o mês de agosto. Inclua: 4 pilares temáticos, mix de formatos por plataforma, frequência de postagem, 12 ideias de pauta e as 3 principais métricas para acompanhar o sucesso.",
            practice: {
              title: "Estratégia Completa de Marketing",
              instruction: "Construa uma estratégia integrada unindo conteúdo, copy e análise competitiva.",
              terms: ["pilares temáticos", "copy persuasivo", "calendário editorial", "análise de concorrentes"],
              solution: "Ao combinar pesquisa em tempo real com geração de conteúdo e frameworks de persuasão, o Gemini entrega um plano de marketing executável e data-driven."
            },
            quiz: {
              question: "Qual é a abordagem mais estratégica para usar o Gemini na fase de análise de resultados de marketing?",
              options: [
                "Usar os dados apenas para criar relatórios visuais bonitos.",
                "Cruzar dados de performance com o contexto da estratégia e pedir ao Gemini para identificar padrões, causas e ajustes concretos para o próximo ciclo.",
                "Pedir ao Gemini que garanta que os próximos resultados serão melhores.",
                "O Gemini não consegue interpretar dados de marketing."
              ],
              correctIndex: 1,
              explanation: "Uma planilha inerte se transforma em um consultor executivo quando você pede ao modelo planos de retificação para realinhar falhas expostas."
            },
            takeaway: "Com o Gemini, marketing deixa de ser uma corrida contra o tempo e se torna um processo estratégico, criativo e orientado por dados."
          }
        ]
      },
      en: {
        statusBadge: "Trail live",
        heroEyebrow: "Gemini",
        heroTitle: "Google's AI Assistant, step by step.",
        heroDescription:
          "This trail outlines how to extract maximum value across the Google ecosystem—spanning real-time web searches to Workspace immersion.",
        overviewTitle: "What you will master",
        overviewItems: [
          "Exploiting the core strengths of the Gemini multimodal array.",
          "Commanding live web intelligence straight off the internet backbone.",
          "Navigating deeply into extended YouTube content and documents with zero frictional transitions."
        ],
        moduleLabel: "Module",
        keyPointsLabel: "Key points",
        promptLabel: "Reference prompt",
        practiceLabel: "Guided practice",
        termsLabel: "Terms",
        solutionLabel: "Expected answer",
        quizLabel: "Checkpoint",
        correctLabel: "Correct answer",
        takeawayLabel: "Final takeaway",
        modules: [
          {
            number: 1,
            title: "Google's AI Assistant",
            intro:
              "Familiarize yourself with the main pillars of Gemini, unpacking its unique value angles when compared to existing options, and applying it strategically.",
            keyPoints: [
              "An ecosystem completely pre-woven: Docs, Gmail, Search, seamlessly collaborating.",
              "Multimodal power bridging raw texts, images, audio strings, and videos.",
              "Retrieving and vetting online context via intrinsic Google capabilities.",
              "Escaping typical time sinks by communicating gracefully within context."
            ],
            lessonSteps: GEMINI_MODULE_1_STEPS_EN,
            promptExample: "Search the 5 most recent articles concerning artificial intelligence in education and summarize.",
            practice: {
              title: "Contextual extraction prompt",
              instruction: "Draft an effective investigative sequence.",
              terms: ["investigate current trends", "summarize efficiently", "5 top highlights", "ensure references cited"],
              solution: "Pose direct and metric-driven queries focusing on dynamic knowledge extraction to properly gauge Gemini's actual up-to-date insight retrieval."
            },
            quiz: {
              question: "What underlines Gemini's excellence among competing language paradigms?",
              options: [
                "Publishing unbroken 10 minute sci-fi cinema effortlessly.",
                "Native embedding exactly where your primary data resides without disruptive context shifting.",
                "Unassisted lone-wolf production of full enterprise SaaS modules.",
                "Complete isolation from contemporary networked input channels."
              ],
              correctIndex: 1,
              explanation: "By nesting directly inside Gmail, Drive, and your mobile interfaces, Gemini sidesteps repetitive exporting and pasting setups entirely."
            },
            takeaway: "Adopting Gemini redefines digital investigation from a sporadic task into a constant, integrated operational muscle."
          },
          {
            number: 2,
            title: "Understanding Multimodal Inputs",
            intro: "Dive into Gemini's multimodal prowess. See how images, video links, audios, and dense charts coexist smoothly.",
            keyPoints: [
              "Native Engine: Gemini natively handles cross-pollinating formats.",
              "Visual Prowess: Lengthy PDFs and heavy table spreadsheets processed seamlessly.",
              "Audio and Video: Diggesting YouTube clips and voice memos accurately.",
              "Edge over limits: Pushing far beyond plain-text constraints delivers holisitic research."
            ],
            lessonSteps: GEMINI_MODULE_2_STEPS_EN,
            promptExample: "What does the [PDF] report below warn us regarding sales? Cross reference it with the strategic flowchart picture attached.",
            practice: {
              title: "Applying Multimodality",
              instruction: "Gather 2 distinct formats and frame one overarching prompt.",
              terms: ["Analyze strictly together", "image and spreadsheet", "the main disconnect", "concise action items"],
              solution: "Enforcing simultaneous multi-file analysis eliminates the 'tunnel vision' isolated chats suffer from."
            },
            quiz: {
              question: "How does Gemini react upon receiving widely different file formats simultaneously?",
              options: [
                "It crashes or requests them one by one across distinct queries.",
                "It filters everything into text rendering the visual cues null.",
                "It ingests them concurrently across a relational backbone born of native multimodal engineering.",
                "It demands manual translation metrics applied per file."
              ],
              correctIndex: 2,
              explanation: "Gemini interprets different feeds concurrently, drawing links between formats organically."
            },
            takeaway: "Merging fractured data structures directly onto one chat stream compresses analysis times profoundly."
          },
          {
            number: 3,
            title: "Researching the Live Internet in Real Time",
            intro: "Unlike isolated models, Gemini surveys the live global web. Harness this power to summarize massive daily shifts in your sector natively.",
            keyPoints: [
              "Live Scraping: Empowering an LLM utilizing the entire internet directly.",
              "Fact Tracking: Anchoring responses reliably through requested URL citing.",
              "Strategic Monitoring: Evaluating your competition practically instantaneously."
            ],
            lessonSteps: GEMINI_MODULE_3_STEPS_EN,
            promptExample: "Audit the top 5 articles released last month regarding robotic automation. Provide sources cleanly.",
            practice: {
              title: "Competitive Sweeping",
              instruction: "Acquire a comprehensive understanding of what users declare about an adversary brand online.",
              terms: ["Consolidate public reviews", "unfiltered opinions", "competitor brand name", "sum up top 3 common failures"],
              solution: "Applying LLM-powered live parsing removes the manual scrolling fatigue of reading endless forum threads."
            },
            quiz: {
              question: "When deploying web-reading abilities aimed toward concrete tactical facts, what ensures professional reliability?",
              options: [
                "Avoiding internet usage overall for risk mitigation against bad information streams.",
                "Submitting blindly to what it fetches completely confident in algorithmic perfection.",
                "Strictly locking down chronological boundaries inside your command while heavily demanding clickable source URLs protecting against AI hallucination models.",
                "Setting the reading limitations uniquely pointing towards Wikipedia domains entirely."
              ],
              correctIndex: 2,
              explanation: "Constructing stringent command brackets enclosing factual URLs protects the operator's integrity."
            },
            takeaway: "Relying on legacy search methods exclusively rather than live-AI sweeping sentences organizational knowledge-flow to crawl speeds."
          },
          {
            number: 4,
            title: "Spreadsheets infused with AI",
            intro: "Learn how Gemini flips your spreadsheet experience—analyzing data, forging formulas, producing charts, and automating processes without strict Excel mastery.",
            keyPoints: [
              "Natural language formula generation.",
              "Immediate data analysis leading to actionable insights.",
              "Structuring tables from scratch and tracking divergent version collisions.",
              "Pushing robust workflow automation via Google Apps Script."
            ],
            lessonSteps: GEMINI_MODULE_4_STEPS_EN,
            promptExample: "What do the numbers reflect about last quarter's revenue? What's the main trend, and what operational shift do you advise?",
            practice: {
              title: "The Chief Analyst Mode",
              instruction: "Paste a tangled data batch and force the model into an executive breakdown.",
              terms: ["Audit essential indicators", "highlight duplications", "reveal the primary friction point", "propose 3 tactical moves"],
              solution: "Demanding proactive tactical moves pulls the AI from an abstract observer into an immediate strategic planner over your raw numbers."
            },
            quiz: {
              question: "When facing identical massive spreadsheets suffering from internal data collisions, what is Gemini's primary utility?",
              options: [
                "Deploying shiny charts magically while turning a blind eye to mismatched underlying math.",
                "Tirelessly isolating and distinguishing the hidden flaws, instantly bringing invisible discrepancies forcefully to light.",
                "Executing preventative purges across both files merely to forcefully standardize the fields.",
                "Freezing the user's interface permanently until a legacy supervisor approves old metrics."
              ],
              correctIndex: 1,
              explanation: "Meticulously leveraging the model replaces the notorious all-nighters spent trying to manually match 'Version 1' against 'Version 2' with ruthless cross-examination."
            },
            takeaway: "Injecting Gemini onto your data sheets catapults the operator from a frustrated syntax-wrangler directly into the executive decision-maker role."
          },
          {
            number: 5,
            title: "Assistance in Creative and Professional Writing",
            intro: "Discover how Gemini acts as an elite writing collaborator—originating, reviewing, scaling, and elevating all text formats with unprecedented speed.",
            keyPoints: [
              "Structured Framing directing precise first-try drafts.",
              "Multi-vocal translations mutating style across audiences.",
              "Diplomatic email creation shielding executive emotions.",
              "Grammatical correction fused intimately with linguistic education."
            ],
            lessonSteps: GEMINI_MODULE_5_STEPS_EN,
            promptExample: "Rewrite the following initial copy in three divergent tones: one intimately narrative, one journalistically objective, and one strictly emotional. Retain core elements.",
            practice: {
              title: "The Editing Iteration",
              instruction: "Force the algorithm into an Editor-In-Chief stance without permitting it to overshadow your unique voice.",
              terms: ["clarity lacking", "repetitive passages", "cohesion failure", "vague phrasing"],
              solution: "Enforcing rigorous and annotated correction pushes the AI into a pedagogical role where you naturally absorb the grammatical improvements."
            },
            quiz: {
              question: "Why subject a straightforward text to multiple polarized stylistic variations created by Gemini before publishing it to your core audience?",
              options: [
                "There is strictly no gain, it just causes confusion and wastes server memory tokens actively.",
                "To automatically generate more word count and bloat the overall file weight visually without adding quality.",
                "To radically expose the deepest emotional resonance an idea can take, accelerating your storytelling agility through angles unachievable in a blank-page vacuum.",
                "Because the software requires standard testing benchmarks before releasing its best draft."
              ],
              correctIndex: 2,
              explanation: "Isolating alternative views hones your definitive marketing thrust by revealing unseen linguistic potential immediately."
            },
            takeaway: "Trusting your raw drafts to Gemini's multi-tonal intelligence propels you from a frustrated syntax mechanic into an impeccable communication director."
          },
          {
            number: 6,
            title: "Video & Photo Creation with Veo 3.1",
            intro: "Learn how Gemini becomes a complete visual creation studio with two powerful integrations: Nano Banana Pro for reasoning and image generation, and Veo 3.1 for cinematic quality video creation.",
            keyPoints: [
              "Image generation guided by sharpened reasoning via Nano Banana Pro.",
              "Video construction featuring realistic framerates and physics.",
              "Ambient audio natively synchronized via Veo 3.1.",
              "End-to-end directorial oversight without external software."
            ],
            lessonSteps: GEMINI_MODULE_6_STEPS_EN,
            promptExample: "Activate Nano Banana Pro reasoning and generate a photorealistic image of a futuristic city at sunset. Then, use Veo 3.1 to animate this scene with a descending drone shot and flying car sounds.",
            practice: {
              title: "Constructing the Synthetic Studio",
              instruction: "Merge the powers of Nano and Veo to sculpt an entire flawless take from start to finish.",
              terms: ["static visual blueprints", "orchestrate movement", "unblemished physics", "native acoustic layering"],
              solution: "By forcing the machine to justify its artwork prior to animating, you shield the piece from unwanted chaotic leaps in the video."
            },
            quiz: {
              question: "Why is combining the rigor of Nano Banana Pro with the motion power of Veo 3.1 far superior to merely requesting isolated, hasty images?",
              options: [
                "To force the software to take longer processing server packets.",
                "It is not recommended; the tools were absolutely not built to be integrated.",
                "Because prior reasoning validation cripples graphic ambiguities, feeding the animation beast an unshakeable script.",
                "Because only Veo 3.1 can draft elaborate creative texts in fluid Python syntax."
              ],
              correctIndex: 2,
              explanation: "Pre-scripting avoids costly, disastrous deformations that are brutal to patch up once the animation runs."
            },
            takeaway: "By mating Nano's cold calculation with Veo's flow, you trade away hours on editing boards for absolute, immediate digital directorial majesty."
          },
          {
            number: 7,
            title: "Marketing: Strategy, Content, and Results",
            intro: "Learn how Gemini becomes a complete strategic ally for marketing — creating content, developing campaigns, analyzing competitors, writing copy, and building strategies that generate real results.",
            keyPoints: [
              "Creating customized content strategies with thematic pillars and metrics.",
              "Researching marketing trends in real-time with internet access.",
              "Writing high-conversion copy using frameworks like PAS and AIDA.",
              "Analyzing competitors and building complete editorial calendars."
            ],
            lessonSteps: GEMINI_MODULE_7_STEPS_EN,
            promptExample: "You are a digital marketing strategist. Create a content strategy for the Instagram of a beauty clinic for the month of August. Include: 4 thematic pillars, a mix of formats per platform, posting frequency, 12 content ideas, and the top 3 metrics to track success.",
            practice: {
              title: "Complete Marketing Strategy",
              instruction: "Build an integrated strategy combining content, copy, and competitive analysis.",
              terms: ["thematic pillars", "persuasive copy", "editorial calendar", "competitor analysis"],
              solution: "By combining real-time research with content generation and persuasion frameworks, Gemini delivers an actionable, data-driven marketing plan."
            },
            quiz: {
              question: "What is the most strategic use of Gemini during the marketing results analysis phase?",
              options: [
                "Using the data just to make pretty reports.",
                "Crossing performance data with the context of your strategy and asking Gemini to identify patterns, causes, and concrete tweaks for the next cycle.",
                "Asking Gemini to guarantee that the next results will be better.",
                "Gemini cannot interpret marketing data."
              ],
              correctIndex: 1,
              explanation: "An inert spreadsheet becomes an executive consultant when you ask the model for rectification plans to realign exposed flaws."
            },
            takeaway: "With Gemini, marketing stops being a race against time and becomes a strategic, creative, data-driven process."
          }
        ]
      },
      es: {
        statusBadge: "Ruta activa",
        heroEyebrow: "Gemini",
        heroTitle: "El asistente IA de Google en profundidad.",
        heroDescription:
          "Esta ruta decodifica la potencia completa del ecosistema nativo de Google: investigaciones vivas en la web, inmersion con Workspace y un sistema multimodal para imagenes y contenido.",
        overviewTitle: "Lo que consolidaras",
        overviewItems: [
          "Sacarle partido a las distinciones concretas entre modelos de Gemini.",
          "Manejar rutinas eficientes y fluidas sin descargas paralelas ni cambios abruptos.",
          "Condensar rapida comprension de videos largos o de correos extensos usando al asistente nativamente integrados."
        ],
        moduleLabel: "Modulo",
        keyPointsLabel: "Puntos clave",
        promptLabel: "Prompt de referencia",
        practiceLabel: "Practica guiada",
        termsLabel: "Terminos",
        solutionLabel: "Respuesta esperada",
        quizLabel: "Checkpoint",
        correctLabel: "Respuesta correcta",
        takeawayLabel: "Conclusion clave",
        modules: [
          {
            number: 1,
            title: "El Asistente IA de Google",
            intro:
              "Entiende la naturaleza fundamental de Gemini desde adentro. Descubre en que situaciones vence a cualquier rival y como encajarlo efectivamente a diario.",
            keyPoints: [
              "El Workspace todo-en-uno donde Gmail e informacion colaboran.",
              "El procesamiento super multimodal; interpretar texto, fotos y links del ciberespacio velozmente.",
              "Rastreo en vivo y constatacion interna del motor de Google propio.",
              "Evitar la redaccion fragmentada o desgastante."
            ],
            lessonSteps: GEMINI_MODULE_1_STEPS_ES,
            promptExample: "Averigua las 5 tendencias emergentes respecto a la inteligencia artificial de recursos humanos y dame resumenes claros.",
            practice: {
              title: "El prompt investigativo agil",
              instruction: "Establece el diseno correcto para consultar conocimiento variable vivo.",
              terms: ["pesquisar novedades", "precisar un formato de resumen", "extraer 5 lecciones", "documentar base de conocimiento"],
              solution: "Usa directrices numericas concretas asegurando que este forzado a explorar, destilar el jugo noticioso y entregarlo organizado."
            },
            quiz: {
              question: "A la hora de destacar a Gemini sobre lo habitual, cual atributo resuena contundente?",
              options: [
                "Generar efectos de animacion tridimensional renderizados con un clic.",
                "La naturalidad con la cual interviene en donde elaboras directamente el contenido: drive, slides y gmail.",
                "Programar una plataforma sin ninguna guia humana.",
                "Estar atado forzosamente a bases de enciclopedias un poco vetustas."
              ],
              correctIndex: 1,
              explanation: "Reduciendo los rebotes a cada copia o pega de contenido de otra ventana, se consolida la rutina al cien por ciento."
            },
            takeaway: "Traer a Gemini hacia tu epicentro te regala la facultad de indagar instantaneamente sin quebrar jamas la inercia mental creativa."
          },
          {
            number: 2,
            title: "Entendiendo las Entradas Multimodales",
            intro: "Aprende el poder clave de cruzar variables radicalmente diferentes — video, audio, PDFs, text y visuales — sin salir del tablero.",
            keyPoints: [
              "Motor Nativo: La asimilacion integral sin depender de 'atajos' o traductores pesados.",
              "Archivos graficos: Leer tablas y PDFs que frenaban a la IA tradicional.",
              "Formatos de Sonido e Imagenes: Usalos como si fuesen lineas escritas simples.",
              "La Ventaja: Comprender panoramicas globales uniendo cada pista de datos."
            ],
            lessonSteps: GEMINI_MODULE_2_STEPS_ES,
            promptExample: "Dime, que advierte el informe [PDF] bajo nivel estructural? Cruzalo con mi croquis fotografiado por favor.",
            practice: {
              title: "Multimodalidad Aplicada",
              instruction: "Une formatos variables dentro de un ciclo narrativo conciso.",
              terms: ["Estudien esto a la par", "foto vs grafico", "discrepancia matriz", "punteado"],
              solution: "Disparar una evaluacion simultanea permite el enriquecimiento relacional que es inherente al modelo."
            },
            quiz: {
              question: "Como enfrenta Gemini un promting que acumula PDF, notas y audios concurrentes?",
              options: [
                "Decline su uso y te obliga a usar pestañas separadas.",
                "Obligatoriamente aplasta la informacion solo importandole las vocales.",
                "Procesa fluidamente esta red integrando lo visual al peso estadistico debido a su concepcion innata.",
                "Depende estrictamente del plan empresarial contratado."
              ],
              correctIndex: 2,
              explanation: "Su genetica multimodal no percibe los generos de archivo como fronteras sino como un panorama vivo."
            },
            takeaway: "Dejar de fragmentar la investigacion y unir el material bajo el capó de la resolucion compartida marca un hito de ahorro productivo total."
          },
          {
            number: 3,
            title: "Investigando en Internet en Vivo",
            intro: "A diferencia de las IA limitadas temporalmente historicas, Gemini escaria la telarana interactiva del hoy globalizado decantando el momento ideal y exacto.",
            keyPoints: [
              "Extraccion Caliente: Relevamiento del acontecer inmediato publico sin fronteras ni paradas en el tiempo historico irrelevante.",
              "Fijar Responsabilidad: Exigir compulsivamente las URL's consultadas neutraliza la fantasia alucinante maquinica.",
              "Cartografia del Enemigo: Compilar carencias operacionales directas de las marcas."
            ],
            lessonSteps: GEMINI_MODULE_3_STEPS_ES,
            promptExample: "¿Cuales son las 5 regulaciones emergentes que estallaron hoy en materia bursatil publicadas? Devuelve articulos.",
            practice: {
              title: "Monitoreo Abierto Constante",
              instruction: "Puntualiza el sentir general difuminado de foros y unificalo sobre una marca competidora comercial.",
              terms: ["Estudia los reviews virales", "busca sentimientos compartidos", "marca de tu competidor", "halla debilidades repulsivas"],
              solution: "Sintetizar individualmente y por partes mil lineas gasta muchisimo; ordenarlo todo de un golpe unifica."
            },
            quiz: {
              question: "Al comandar la telarana del internet a fin de sustraer directrices accionables y no mera literatura ¿que accion asume el experto?",
              options: [
                "Suprimir definitivamente toda navegacion en miras de una salud inmaculada sin interrupcion virósica o toxica.",
                "Hundirse voluntaria, obedientemente y mansamente amarrado a sus dictamenes alucinatorios.",
                "Ceñir ferreamente un angosto lapso de horas cronologicas para escudrinar, anexo a obligatoriedad castigadora implacable donde consigne url de procedencia garantizando tu re-observacion prudente posterior personal.",
                "Aminorar exigiendo revision puramente dirigida hacia fuentes gubernamentales y olvidando todo el ecosistema vivo del mercado ajeno."
              ],
              correctIndex: 2,
              explanation: "Anillar fuertemente los grados de libertad de esta asombrosa libertad de campo previene y elide extravios en informaciones desusadas del pasado."
            },
            takeaway: "Ignorar o subutilizar el filtro inmediato en vivo implica caminar dando tumbos analiticos a oscuras habiendo amanecido velozmente con las tecnologias."
          },
          {
            number: 4,
            title: "Hojas de Cálculo con Inteligencia Artificial",
            intro: "Conoce como Gemini metamorfosea tus plantillas: calculando estadisticas, articulando formulas maestras sin ser un ingeniero y diagramando dashboards directamente en Google Sheets.",
            keyPoints: [
              "Formulacion pura descrita desde lenguaje natural sin codigos de friccion.",
              "Analisis e insight desentranado velozmente de columnas aburridas.",
              "Formacion estructural de ceros e intercepcion letal de discrepancias entre plantillas similares.",
              "Estandarizar lo complejo por medio de programacion subyacente de Apps Script."
            ],
            lessonSteps: GEMINI_MODULE_4_STEPS_ES,
            promptExample: "¿Que arrojan estos numeros respecto al mes ultimo? Encuentra el punto mas bajo constante operativo e imputa 3 sugerencias.",
            practice: {
              title: "Director Estadístico",
              instruction: "Ingresa el caos de un crudo de datos dejando fluir tu peticion para una conclusion purificada y directiva.",
              terms: ["Revisa estas metricas", "separa duplicados perjudiciales", "halla la anomalia flagrante", "disena tres contramedidas tacticas"],
              solution: "Forzar a la IA para que te conceda soluciones en lugar de formulas vacias lo instaura rapidamente como un asistente financiero real y palpable sobre el libro matriz."
            },
            quiz: {
              question: "Cuando colisionan dos bases de datos monstruosas, repletas de variaciones minimas oscuras, ¿cuaá es la intervencion determinante de Gemini?",
              options: [
                "Crear dibujos embellecidos postergando irresponsablemente averiguar el por que subyacente matematico no concuerda.",
                "Rastrear, someter y fulminar exhaustiva y agresivamente los vacios relacionales separando paja y trigo en segundos casi indetectables visualmente.",
                "Elegir descartar al azar celdas desiguales para lograr un balance inestable artificial predeterminado algorítmicamente.",
                "Simplemente proponer congelar la arquitectura."
              ],
              correctIndex: 1,
              explanation: "Dejar en manos de este radar el desgaste monumental y mortifero de revisar infinitas tablas evita errores humanos desastrosos y te otorga seguridad incondicional a fin de mes corporativo."
            },
            takeaway: "Abrazar Gemini sobre un libro estatico y denso, eleva la perspectiva general eximiendo el horror al error y permitiendote orquestar analisis desde una optica puramente invulnerable y gerencial."
          },
          {
            number: 5,
            title: "Ayuda en Escritura y Redacción",
            intro: "Conoce cómo Gemini se transforma en un socio escritor potente: elaborando, revisando, amoldando y mejorando textos de toda clase con alta terminación.",
            keyPoints: [
              "Dirección arquitectónica de redacción eliminando resultados vacíos.",
              "Modulación a multi-voz según los canales elegidos (omnicanalidad).",
              "Escudo emocional ante correos de negocios tensos.",
              "Corrección pedagógica asimilada."
            ],
            lessonSteps: GEMINI_MODULE_5_STEPS_ES,
            promptExample: "Aquí tengo mi informe base: [texto]. Reescribe todo esto en 3 abordajes: formal ejecutivo para un newsletter, envolvente para red social, y uno sumamente técnico. Preserva la premisa.",
            practice: {
              title: "Edición Iterativa Precisa",
              instruction: "Muta la herramienta en tu corrector experimentado prohibiendo que usurpe la genuinidad de tu voz base.",
              terms: ["falta de fluidez", "segmentos excesivos", "cohesión quebrada", "vacíos conceptuales"],
              solution: "Presionar por un análisis explicado por cada tachadura cometida eleva al bot de simple filtro a tu profesor particular."
            },
            quiz: {
              question: "¿Por qué invertir segundos valiosos en inducir al modelo de IA a regenerar el mismo párrafo bajo estilos narrativos antagónicos en vez de lanzar tu intuición primaria?",
              options: [
                "Solo amplifica el uso de datos en el servidor haciéndolo perder el tiempo inútilmente.",
                "Agrega vocablos complicados aleatoriamente que alargarán y adornarán estúpidamente tu entrega final.",
                "Aumenta abrumadoramente tu versatilidad: observando tu propia materia prima mutar mágicamente en relatos poéticos o incisivos te permite cazar la vibra que mejor conectará con tu audiencia.",
                "Disminuye los errores de código en el texto inicial."
              ],
              correctIndex: 2,
              explanation: "Estirar hasta el límite tu borrador arroja combinaciones tonales hipnóticas que, concebidas en soledad, jamás habrías descubierto."
            },
            takeaway: "Abdicando el trabajo forzado de ensamblar palabras, te posas soberano sobre la orfebrería de afinar la persuasión pura."
          },
          {
            number: 6,
            title: "Creación de Videos y Fotos con Veo 3.1",
            intro: "Aprende cómo Gemini se convierte en un estudio de creación visual completo con dos potentes integraciones: Nano Banana Pro para el razonamiento y Veo 3.1 para la creación de videos con calidad cinematográfica.",
            keyPoints: [
              "Generación de imágenes con razonamiento afilado vía Nano Banana Pro.",
              "Desarrollo de videos con física y cuadros de fluidez realista.",
              "Audio ambiente nativo y sincronizado gracias a Veo 3.1.",
              "Dirección visual soberana exenta de editores externos."
            ],
            lessonSteps: GEMINI_MODULE_6_STEPS_ES,
            promptExample: "Activa el razonamiento de Nano Banana Pro y genera una imagen fotorrealista de una urbe futurista al atardecer. Luego, emplea Veo 3.1 para darle vida asumiendo un paneo en declive de drone con ecos de tránsito volante.",
            practice: {
              title: "El Montaje del Estudio Esténico",
              instruction: "Amalgama la brillantez de Nano y Veo para forjar una toma épica desprovista de cortes sucios.",
              terms: ["bocetos visuales estáticos", "orquestar dinámica motriz", "física incorruptible", "capas acústicas originales"],
              solution: "Exigirle a la herramienta su propia pericia antes de accionar la grabación salvaguarda metrajes perfectos librándose del caos aleatorio tradicional."
            },
            quiz: {
              question: "¿Por qué aliar la firmeza de Nano Banana Pro al estallido audiovisual de Veo 3.1 es supremamente superior a rogarle meras figuras veloces sueltas?",
              options: [
                "Exclusivamente para entorpecer la carga haciendo lento el resultado para aparente mayor mérito.",
                "Absurdo intentarlo, las consolas jamás cruzan datos ni puentes.",
                "La convalidación intelectual frena y ahoga de cuajo ambigüedades incomprensibles antes de pasarla al horno maestro de filmación animada intacta.",
                "Debido a que únicamente Veo 3.1 domina guiones estrictos en lenguajes algorítmicos crudos puros simultáneamente."
              ],
              correctIndex: 2,
              explanation: "Cimentar un libreto razonado previo extermina taras morfológicas gravísimas imposibles de disimular durante el rodaje ya finalizado."
            },
            takeaway: "Emparejando la fría exactitud Nano al vertiginoso Veo despides tus eternas vigilias editando a cambio de ascender y coronarte regente digital con peso ejecutivo puro."
          },
          {
            number: 7,
            title: "Marketing: Estrategia, Contenido y Resultados",
            intro: "Aprende cómo Gemini se convierte en un aliado estratégico completo para el marketing — creando contenido, desarrollando campañas, analizando competidores, escribiendo copies y construyendo estrategias que generan resultados reales.",
            keyPoints: [
              "Creación de estrategias de contenido personalizadas con pilares temáticos y métricas.",
              "Investigación de tendencias de marketing en tiempo real con acceso a internet.",
              "Redacción de copies de alta conversión usando frameworks como PAS y AIDA.",
              "Análisis de competidores y creación de calendarios editoriales completos."
            ],
            lessonSteps: GEMINI_MODULE_7_STEPS_ES,
            promptExample: "Eres un estratega de marketing digital. Crea una estrategia de contenido para el Instagram de una clínica de estética para el mes de agosto. Incluye: 4 pilares temáticos, mix de formatos por plataforma, frecuencia de publicación, 12 ideas de pauta y las 3 principales métricas para medir el éxito.",
            practice: {
              title: "Estrategia Completa de Marketing",
              instruction: "Construye una estrategia integrada uniendo contenido, copy y análisis competitivo.",
              terms: ["pilares temáticos", "copy persuasivo", "calendario editorial", "análisis de competidores"],
              solution: "Al combinar investigación en tiempo real con generación de contenido y frameworks de persuasión, Gemini entrega un plan de marketing ejecutable y orientado a datos."
            },
            quiz: {
              question: "¿Cuál es el uso más estratégico de Gemini durante la fase de análisis de resultados de marketing?",
              options: [
                "Usar los datos solo para crear reportes visualmente bonitos.",
                "Cruzar datos de performance con el contexto de tu estrategia y pedirle a Gemini que identifique patrones, causas y ajustes concretos para el próximo ciclo.",
                "Pedirle a Gemini que garantice que los próximos resultados serán mejores.",
                "Gemini no puede interpretar datos de marketing."
              ],
              correctIndex: 1,
              explanation: "Una planilla inerte se transforma en un consultor ejecutivo cuando le pides al modelo planes de rectificación para realinear fallas expuestas."
            },
            takeaway: "Con Gemini, el marketing deja de ser una carrera contra el tiempo y se convierte en un proceso estratégico, creativo y orientado por datos."
          }
        ]
      },
      fr: {
        statusBadge: "En ligne",
        heroEyebrow: "Gemini",
        heroTitle: "L'intelligence de Google a votre disposition.",
        heroDescription:
          "Ce parcours vous met au volant du modele phare de Google. Optimisez votre web en temps reel et decortiquez toute documentation Workspace.",
        overviewTitle: "Ce que vous saurez accomplir",
        overviewItems: [
          "Maneuvrer selon la dexterite caracteristique du systeme Gemini.",
          "Prendre en main un outil resolument tourne vers l'interaction au milieu de vos logiciels habituels.",
          "Simplifier instantanement vos interactions audios et videos."
        ],
        moduleLabel: "Module",
        keyPointsLabel: "Points cles",
        promptLabel: "Reference visuelle",
        practiceLabel: "Pratique dirigee",
        termsLabel: "Notions",
        solutionLabel: "Etape accomplie",
        quizLabel: "Evaluation",
        correctLabel: "Verification",
        takeawayLabel: "Moralite du chapitre",
        modules: [
          {
            number: 1,
            title: "Assistant Universel de Google",
            intro:
              "Decouvrez la logique en profondeur qui anime et confere une plus-value immediate face a la grande concurrence digitale logicielle.",
            keyPoints: [
              "Cohesions totales. Gmail, Google Recherche et Google Drive imbriques sans fioritures.",
              "Une architecture qui sait autant decoder vos paragraphes que lire avec precision vos supports.",
              "Etre presentable sans attendre des annees d'actualisations predefinies.",
              "Une dynamique gagne-pain inouie."
            ],
            lessonSteps: GEMINI_MODULE_1_STEPS_FR,
            promptExample: "Decryptez les 5 nouvelles parutions relatives aux avancees de l'intelligence et mettez-les en scene.",
            practice: {
              title: "La commande d'investigation rapide",
              instruction: "Preparez un elan reussi en vue d'etre eclaire rapidement.",
              terms: ["Chercher la verite en direct", "synthetiser habilement", "isoler 5 phenomenes forts", "identifier references"],
              solution: "Il suffit de guider le bot le long du schema temporel et de requiert une justification bibliographique afin d'attester l'eclairage nouveau."
            },
            quiz: {
              question: "Quelle particularite detache la prestation de l'Assistant Gemini dans sa zone d'impact reguliere ?",
              options: [
                "Fabriquer instantanement de grandes toiles d'arts plastiques.",
                "S'inviter directement a cote de votre plume au coeur meme des systemes du geant Google.",
                "Piloter une escadre robotique sur internet.",
                "Etudier le passe tres eloigne exclusive au moyen de dictionnaires du millenaire precedent."
              ],
              correctIndex: 1,
              explanation: "Rien n'est plus agreable que de resumer et relancer un courriel penible a travers un menu deroulant accessible organiquement."
            },
            takeaway: "Saisir au vol le rythme qu'offre ce moteur convertit directement la veille passive au rang d'aide productive tres aceree."
          },
          {
            number: 2,
            title: "Comprendre les Entrees Multimodales",
            intro: "Maitrisez le socle qui catapulte Gemini : decortiquer simultanement tous les horizons mediatiques allant du tableur aux extraits films.",
            keyPoints: [
              "Modele Organique : Aucune manipulation ou conversion boiteuse des formats n'est observee.",
              "Visuels Commerciaux: Les tableaux se lient naturellement a leur prose d'accompagnement.",
              "Sonore et Anime: Englober du son memo a la minute pres sans transcripteurs accessoires.",
              "Prerogative : Discerner une cohesion de projet bien au dela des mots ecrits."
            ],
            lessonSteps: GEMINI_MODULE_2_STEPS_FR,
            promptExample: "Discerne exactement les points faibles de ce rapport [PDF] d'audit apres l'avoir jauge a l'aune de ma capture visuelle ici bas.",
            practice: {
              title: "L'art Multimodal Exerce",
              instruction: "Conjuguer deux elements diametralement opposes dans la forme mais solidaires sur le fond.",
              terms: ["Sonder simultanement", "mon croquis au stylo", "des chiffres complexes", "le remede pragmatique"],
              solution: "Exiger une synthese qui marie activement tous vos documents rend la riposte d'une acuite surprenante."
            },
            quiz: {
              question: "Face a un amas de medias héteroclites devenes par paquets, comment se debrouille l'IA Gemini ?",
              options: [
                "Elle requiert un traitement eparpille au long court sur des seances specifiques.",
                "Elle est sourde face a une photo a moins d'etre un modele premium developper pour.",
                "Elle deploie ses neuronales natives, liant une donnee de la page graphique au contenu exact prononce en fond sonore.",
                "Il faut inexorablement adosser une explication crue tres volumineuse aux medias."
              ],
              correctIndex: 2,
              explanation: "Rien n'ecorche les rouages du bot lorsqu'on jette tout un dossier a son front. Son point cardinal est son essence native multi-sujets."
            },
            takeaway: "Oublier l'aspect morcele et reunir l'assortiment de pieces creatives sous une banniere analytique transforme votre bureau digital."
          },
          {
            number: 3,
            title: "Recherche Intégrée sur Internet",
            intro: "Mettez le web a genoux: au-dela d’encyclopedies figees, Gemini fouille le flux de donnees immediat et les news planetaire au dixieme de secondes de requete exactes.",
            keyPoints: [
              "Lecture Vive: Moissonnage in vivo depuis la scene du monde d'aujourd'hui en contournant sans efforts tout cut-off historique mort.",
              "Verrouillage Factuel: Obtenir de force un enchainement de liens URL valides a titre de precaution.",
              "Renseignement Economique: Devorer literallement en resume un mur infranchissable d'avis en l'espace d'une pignee d'instant."
            ],
            lessonSteps: GEMINI_MODULE_3_STEPS_FR,
            promptExample: "Ressors, decrypte puis restitue d'urgence sous ma vue le classement des 5 grands enjeux technologiques annonces formellement ce jour ouvrable. Ajoute la bibliographie.",
            practice: {
              title: "Sonde au Rayon X Digitalisée",
              instruction: "Ficelez la rumeur dispersée inaudible par la machine.",
              terms: ["Capter les echos numeriques ouverts", "trouver une faille repetee", "Nom adversaire au choix", "en sort un argument percutant anti-competitif"],
              solution: "Lire l'experience collective reelle atomise generalement a plate couture tous prospectifs imaginaires ou fictifs sur fond theorique du monde parallele du commerce."
            },
            quiz: {
              question: "En dechainant la machinerie contre le web en direct sans vouloir pecher de poison mortel abstrait fantaisiste au sein des analyses; quelle pre-requise de chef vaut d'etre observee scrupuleusement sous peine de naufrage fatalise ?",
              options: [
                "Depeindre des ideogrammes poetiques laissants une expression artistique inintelligible.",
                "Avaler sans regurgiter ou valider chaque ecrit retourne dans une credulite pure completement denuee de barriere.",
                "Assortir votre sommation au moteur d'entrainements a bornages calendaires insubmersibles draconiens couples d'un l'obligation sous la torture logicielle de restituer un annuaire source certifie au plus net.",
                "Denigrer tous systemes de sondage globaux mondiaux sans jamais se brancher du domaine general par peur des pollutions informatiques virales inqualifiables redoutables de longue periode."
              ],
              correctIndex: 2,
              explanation: "Ne laissez aucuns flottements spatiaux/chronologiques abstraits sous danger grave de generer des affirmations batardes farfelues completement inapplicables dans de reels projets viables."
            },
            takeaway: "Renoncer a scander intimement la donnee pure du monde aujourd'hui via l'IA revient purement a renier l'avancement majeur de decennie informatique courante entiere et definitive."
          },
          {
            number: 4,
            title: "Des Tableurs Associés à l'Intelligence Artificielle",
            intro: "Decouvrez l'evolution avec laquelle Gemini debride vos feuilles Google Sheets — en articulant des formules, en gerant des quantites immenses d'informations et l'automatisation de pointe sans programmation stricte.",
            keyPoints: [
              "Redaction de formules complexes en un francais du quotidien.",
              "Diagnostic net de volumes informatiques laches provoquant l'illumination strategique.",
              "Construction rapide de grilles et le choc salvateur corrigeant des documents quasi-doublons.",
              "Production de cycles perpetuels via Google Apps Script instruit intuitivement."
            ],
            lessonSteps: GEMINI_MODULE_4_STEPS_FR,
            promptExample: "Que nous disent ces cellules accolees a la semaine derniere ? Demasque la pire tendance actuelle et propose resolument 3 actions redemptrices.",
            practice: {
              title: "Poste d'Analyste Executif",
              instruction: "Lachez les donees brutes embrouillees puis reprenez violemment le cap managérial des calculs froids.",
              terms: ["Evalue ce magma de nombres", "trie les doublons dangereux", "diagnostique l'epicentre du probleme", "edite 3 ordonnances operationnelles tactiques"],
              solution: "Forcer la commande d'analyse au stade des recommandations actives vous hisse en commandant decisionnaire face au simple rapport informatique inerte d'origine."
            },
            quiz: {
              question: "Devant le casse-tete epuisant d'un double fichier comportant de subtils ecarts contradictoires, quel service imperial joue Gemini ?",
              options: [
                "Le developpement futile de beaux graphes colorises au mepris complet des fautes mathematiques reelles figees.",
                "Traquer et fendre impitoyablement les incoherences millimetrees avec precision chirurgicale, revelant les aberrations quasi invisibles a l'oeil mu de l'operateur fatigue.",
                "Proceder brutalement a des coupes massives asymetriques et fatales.",
                "Bloquer par defaut le fichier en question d'autrui au nom d'un faux pas d'edition minime inexistant."
              ],
              correctIndex: 1,
              explanation: "Rappatrier un scan aussi minutieusement acere ecrase et supprime le supplice intemporel de la relecture de validation lors des fins d'un cycle de mois chargees sans aucune erreur humaine de lassitude."
            },
            takeaway: "Integrer un esprit rationnel synthétique dans le bourbier infranchissable d'un tableur vous hisse depuis une penibilite operationnelle assommante aupres d'un controle tactique eclairé magistral."
          },
          {
            number: 5,
            title: "Assistance à la Rédaction Ciblée",
            intro: "Voyez par quel exploit Gemini vient s'installer comme votre second stylo infatigable — en rédigeant, scrutant, calquant et transfigurant la plus morne des proses en argumentaire élitiste.",
            keyPoints: [
              "Encadrement précis esquivant l'improvisation robotique sans âme.",
              "Le caméléon du ton: métamorphiser un message unique vers trois sphères de public à la seconde.",
              "Purger l'anxiété humaine dans la rédaction exécutive glaciale.",
              "Relecture pédagogique intime et structurée."
            ],
            lessonSteps: GEMINI_MODULE_5_STEPS_FR,
            promptExample: "Je donne cet avis brut: [texte]. Refais ce paragraphe sous trois lunettes opposées: version institutionnelle sèche, version Instagram enflammée et version strictement scientifique de laboratoire, sans perdre l'idée.",
            practice: {
              title: "L'Ajustement Froid et Chirurgical",
              instruction: "Invoquez le correcteur impitoyable sans céder l'autorité de votre marque vocale profonde.",
              terms: ["perte de limpidité", "lourdeur cyclique", "désaccords manifestes", "flou d'expression"],
              solution: "Rendre le modèle redevable de chaque rustine orthographique apposée vous éduque linguistiquement à un niveau prodigieux."
            },
            quiz: {
              question: "Quelle étincelle pousse l'écrivain de métier à soumettre son bloc d'originel aux intenses distorsions multi-styles émises par Gemini ?",
              options: [
                "L'unique volonté de combler par de l'encre les vides béants de la charte de l'entreprise d'une manière absurde.",
                "Il force la machine à justifier son statut d'IA onéreuse via le traitement infini.",
                "C'est la fouille absolue: faire s'entrechoquer les tonalités libère brusquement la fulgurance d'une tournure magnétique qui vous aurait totalement échappée de manière traditionnelle, touchant sa cible en plein cœur.",
                "Pour faire corriger subrepticement du codage Python défaillant au fil de l'eau littéraire."
              ],
              correctIndex: 2,
              explanation: "Exiger l'inimaginable à l'interface écarte le banal pour ne garder que la phrase dont la puissance d'impact frappe juste."
            },
            takeaway: "Se défaire du fardeau d'assembler scolairement les syllabes concède soudainement au stratège le rôle de metteur en scène impérial de la communication."
          },
          {
            number: 6,
            title: "Création de Vidéos et de Photos avec Veo 3.1",
            intro: "Découvrez comment Gemini se mue en véritable studio de création visuelle grâce à deux intégrations puissantes : Nano Banana Pro pour le raisonnement de l'image, et Veo 3.1 pour la création de vidéos purement cinématographiques.",
            keyPoints: [
              "Génération d'images validées par une fine logique via Nano Banana Pro.",
              "Vidéographie respectant cadence naturelle et stricte inertie physique.",
              "Spatialisation audio ambiante totalement native sous Veo 3.1.",
              "Pilotage magistral de toute chaîne visuelle sans l'ombre d'un outil périphérique."
            ],
            lessonSteps: GEMINI_MODULE_6_STEPS_FR,
            promptExample: "Engage le raisonnement de Nano Banana Pro et pond une fresque photoréaliste de colossale cité du futur au crépuscule. Dès validation, lance Veo 3.1 afin d'animer l'ensemble par un piqué de drone alangui croisant bourdonnements lointains d'hélitaxis.",
            practice: {
              title: "Édification du Plateau de Tournage Virtuel",
              instruction: "Fondez la dualité géniale de Nano et de Veo afin d'étalonner une grande œuvre pure de toute éraflure formelle initiale.",
              terms: ["ébauches statiques calibrées", "dynamiser ou chorégraphier", "logique gravitationnelle immaculée", "couches symphoniques intrinsèques"],
              solution: "Acculer impitoyablement cette suite logique à motiver son fond graphique avant le GO caméra éradique fermement du bug stroboscopique infâme très redouté."
            },
            quiz: {
              question: "Pourquoi entrelacer l'esprit de synthèse Nano Pro au muscle lourd rotatif Veo 3.1 domine sans attrait la pauvre frénésie de clichés décousus pris isolément par urgence ?",
              options: [
                "De le forcer délibérément à tirer des ressources longues justifiant très vainement ainsi pour certains l'orgueil de la patente algorithmique complexe à ses heures...",
                "Hérésie monumentale: leurs fondations restent hermétiquement isolées et le court-circuit frappe sec sans recul le prompt global.",
                "S'assurer sa réflexion verrouille de fond d'ambiguïté morphologique fatale pour ainsi rassasier la colossale usine cinétique des paramètres nets d'or fin au fil du rendu.",
                "Au seul et piètre constat que Veo se limite en maitrise de la sténographie béta brute issue Python basique par défaut de paramètre natif ici de plus de ces robots lâchés aveugles."
              ],
              correctIndex: 2,
              explanation: "Régimenter des scénarii murement pondérés au préalable efface du coup irrémédiablement d'infâmes bavures qu'aucun montage de post-traitement n'eut point réparé honnêtement plus tard de la bande livrée."
            },
            takeaway: "Sangler l'intellect froid Nano devant la fougue sublime du Veo affranchit l'artiste du terrible montage classique pour l'élever au siége absolu du seul souverain monteur metteur en scène contemporain ultime et majestueux de notre belle profession d'ici."
          },
          {
            number: 7,
            title: "Marketing : Stratégie, Contenu et Résultats",
            intro: "Découvrez comment Gemini se transforme en un allié stratégique complet pour le marketing — création de contenu, développement de campagnes, analyse de concurrents, rédaction de textes percutants et construction de stratégies génératrices de résultats concrets.",
            keyPoints: [
              "Création de stratégies de contenu personnalisées avec piliers thématiques et métriques.",
              "Recherche des tendances marketing en temps réel avec accès internet.",
              "Rédaction de copies à haute conversion avec les frameworks PAS et AIDA.",
              "Analyse de concurrents et construction de calendriers éditoriaux complets."
            ],
            lessonSteps: GEMINI_MODULE_7_STEPS_FR,
            promptExample: "Tu es un stratège en marketing digital. Crée une stratégie de contenu pour l'Instagram d'une clinique esthétique pour le mois d'août. Inclus : 4 piliers thématiques, un mix de formats par plateforme, la fréquence de publication, 12 idées de sujets et les 3 principales métriques pour suivre le succès.",
            practice: {
              title: "Stratégie Marketing Complète",
              instruction: "Construisez une stratégie intégrée alliant contenu, copywriting et analyse concurrentielle.",
              terms: ["piliers thématiques", "copy persuasif", "calendrier éditorial", "analyse concurrentielle"],
              solution: "En combinant la recherche en temps réel avec la génération de contenu et les frameworks de persuasion, Gemini livre un plan marketing actionnable et piloté par les données."
            },
            quiz: {
              question: "Quelle est l'utilisation la plus stratégique de Gemini lors de la phase d'analyse des résultats marketing ?",
              options: [
                "Utiliser les données uniquement pour faire de jolis rapports.",
                "Croiser les données de performance avec le contexte de votre stratégie et demander à Gemini d'identifier les schémas, causes et ajustements concrets pour le prochain cycle.",
                "Demander à Gemini de garantir que les prochains résultats seront meilleurs.",
                "Gemini ne peut pas interpréter les données marketing."
              ],
              correctIndex: 1,
              explanation: "Un tableur inerte se transforme en consultant exécutif lorsque vous demandez au modèle des plans de rectification pour réaligner les failles exposées."
            },
            takeaway: "Avec Gemini, le marketing cesse d'être une course contre la montre pour devenir un processus stratégique, créatif et piloté par les données."
          }
        ]
      }
    }
  }
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
