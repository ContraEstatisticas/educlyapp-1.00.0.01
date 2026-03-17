import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// === GLOBAL RATE LIMITER (In-Memory IP/User Flood Protection) ===
const rateLimitCache = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60000;
const MAX_REQUESTS_PER_WINDOW = 15;
const API_TIMEOUT_MS = 60000; // 60s hard timeout to prevent connection hanging

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const entry = rateLimitCache.get(identifier);

  // Clean old entries randomly
  if (Math.random() < 0.05) {
    for (const [key, value] of rateLimitCache.entries()) {
      if (now - value.timestamp > RATE_LIMIT_WINDOW_MS) {
        rateLimitCache.delete(key);
      }
    }
  }

  if (entry && now - entry.timestamp < RATE_LIMIT_WINDOW_MS) {
    entry.count++;
    return entry.count <= MAX_REQUESTS_PER_WINDOW;
  } else {
    rateLimitCache.set(identifier, { count: 1, timestamp: now });
    return true;
  }
}

// Emails with free access for testing
const WHITELIST_EMAILS = ["ferramentasdigitais1000@gmail.com", "felip@gmailcom", "perfildivulgacao001@gmail.com"];

// Language names for instruction
const languageNames: Record<string, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  ru: "Русский",
};


const QUICK_REPLY_SUPPORTED_LANGS = [
  "pt",
  "en",
  "es",
  "fr",
  "de",
  "it",
  "ru",
  "zh",
  "ja",
  "ko",
  "ar",
  "hi",
  "tr",
  "pl",
  "nl",
] as const;

type QuickReplyLang = (typeof QUICK_REPLY_SUPPORTED_LANGS)[number];

type QuickReplyRule = {
  id: string;
  keywords: string[];
  responses: Record<QuickReplyLang, string>;
};

const buildQuickReplyResponses = (
  partial: Partial<Record<QuickReplyLang, string>> & Pick<Record<QuickReplyLang, string>, "pt" | "en" | "es">
): Record<QuickReplyLang, string> => {
  const output = {} as Record<QuickReplyLang, string>;
  for (const lang of QUICK_REPLY_SUPPORTED_LANGS) {
    output[lang] = partial[lang] || partial.en;
  }
  return output;
};

const QUICK_REPLY_RULES: QuickReplyRule[] = [
  {
    id: "cancel_refund_billing",
    keywords: [
      "cancelamento",
      "cancelar",
      "reembolso",
      "refund",
      "chargeback",
      "cobranca",
      "assinatura",
      "unsubscribe",
      "billing",
      "pagamento",
    ],
    responses: buildQuickReplyResponses({
      pt: "Para cancelamento, reembolso ou cobranca, fale com nosso suporte humano: https://educly.app/contato . Se preferir, envie email para contact@educly.app.",
      en: "For cancellation, refunds, or billing, please contact our human support: https://educly.app/contato . You can also email contact@educly.app.",
      es: "Para cancelacion, reembolso o cobros, contacta con soporte humano: https://educly.app/contato . Tambien puedes escribir a contact@educly.app.",
      fr: "Pour annulation, remboursement ou facturation, contactez notre support humain: https://educly.app/contato . Vous pouvez aussi ecrire a contact@educly.app.",
      de: "Fur Kundigung, Erstattung oder Abrechnung kontaktieren Sie bitte unseren Support: https://educly.app/contato . Sie konnen auch an contact@educly.app schreiben.",
      it: "Per cancellazione, rimborso o fatturazione, contatta il nostro supporto: https://educly.app/contato . Puoi anche scrivere a contact@educly.app.",
      ru: "Po voprosam otmeny, vozvrata ili oplaty obratites v podderzhku: https://educly.app/contato . Takzhe mozhno napisat na contact@educly.app.",
      tr: "Iptal, iade veya faturalama icin lutfen destek ekibimizle iletisime gecin: https://educly.app/contato . Ayrica contact@educly.app adresine yazabilirsiniz.",
      pl: "W sprawie anulowania, zwrotu lub platnosci skontaktuj sie z naszym wsparciem: https://educly.app/contato . Mozesz tez napisac na contact@educly.app.",
      nl: "Voor annulering, terugbetaling of facturatie neem contact op met support: https://educly.app/contato . Je kunt ook mailen naar contact@educly.app.",
    }),
  },
  {
    id: "pricing_plan",
    keywords: [
      "preco",
      "precos",
      "valor",
      "plano",
      "planos",
      "price",
      "pricing",
      "cost",
      "cuanto cuesta",
    ],
    responses: buildQuickReplyResponses({
      pt: "Os valores e planos ficam em https://educly.app/plan . Se quiser, eu tambem posso te explicar qual plano combina melhor com seu objetivo.",
      en: "You can check pricing and plans at https://educly.app/plan . If you want, I can also help you choose the best plan for your goal.",
      es: "Puedes ver precios y planes en https://educly.app/plan . Si quieres, tambien puedo ayudarte a elegir el mejor plan para tu objetivo.",
      fr: "Vous pouvez voir les prix et plans sur https://educly.app/plan . Je peux aussi vous aider a choisir le meilleur plan selon votre objectif.",
      de: "Preise und Plane finden Sie unter https://educly.app/plan . Ich kann Ihnen auch helfen, den passenden Plan zu wahlen.",
      it: "Puoi vedere prezzi e piani su https://educly.app/plan . Posso anche aiutarti a scegliere il piano migliore per il tuo obiettivo.",
      ru: "Ceny i plany dostupny na https://educly.app/plan . Ya takzhe mogu pomoch vybrat luchshiy plan pod vashu cel.",
      tr: "Fiyatlari ve planlari https://educly.app/plan adresinde gorebilirsiniz. Hedefinize uygun en iyi plani secmenize de yardim edebilirim.",
      pl: "Cennik i plany znajdziesz na https://educly.app/plan . Mogę tez pomóc wybrac najlepszy plan do Twojego celu.",
      nl: "Prijzen en plannen vind je op https://educly.app/plan . Ik kan je ook helpen het beste plan te kiezen voor je doel.",
    }),
  },
  {
    id: "support_contact",
    keywords: [
      "suporte",
      "support",
      "atendente",
      "humano",
      "email",
      "contato",
      "contact",
      "ajuda humana",
    ],
    responses: buildQuickReplyResponses({
      pt: "Voce pode falar com nosso suporte em https://educly.app/contato ou por email em contact@educly.app. Se quiser, eu te ajudo a montar a mensagem.",
      en: "You can reach our support team at https://educly.app/contato or by email at contact@educly.app. If you want, I can help you draft the message.",
      es: "Puedes hablar con soporte en https://educly.app/contato o por email en contact@educly.app. Si quieres, te ayudo a redactar el mensaje.",
      fr: "Vous pouvez parler avec notre support sur https://educly.app/contato ou par email a contact@educly.app. Si vous voulez, je peux vous aider a rediger le message.",
      de: "Sie konnen unser Support-Team unter https://educly.app/contato oder per E-Mail an contact@educly.app erreichen. Ich kann Ihnen auch beim Formulieren helfen.",
      it: "Puoi contattare il nostro supporto su https://educly.app/contato o via email a contact@educly.app. Se vuoi, ti aiuto a scrivere il messaggio.",
      ru: "Vy mozhete svyazatsya s podderzhkoy na https://educly.app/contato ili po email contact@educly.app. Esli nuzhno, ya pomogu sostavit soobshchenie.",
      tr: "Destek ekibimize https://educly.app/contato uzerinden veya contact@educly.app adresinden ulasabilirsiniz. Isterseniz mesaji yazmaniza yardim ederim.",
      pl: "Mozesz skontaktowac sie ze wsparciem przez https://educly.app/contato lub email: contact@educly.app. Jesli chcesz, pomoge napisac wiadomosc.",
      nl: "Je kunt ons supportteam bereiken via https://educly.app/contato of via e-mail op contact@educly.app. Als je wilt, help ik met het opstellen van je bericht.",
    }),
  },
  {
    id: "start_path",
    keywords: [
      "como comeco",
      "por onde comeco",
      "primeira aula",
      "iniciar",
      "iniciar trilha",
      "start",
      "how to start",
      "comenzar",
    ],
    responses: buildQuickReplyResponses({
      pt: "Para comecar rapido: 1) Abra seu Dashboard, 2) Escolha uma trilha, 3) Conclua o Dia 1, 4) Volte aqui e eu te ajudo no proximo passo.",
      en: "To get started fast: 1) Open your Dashboard, 2) Pick a learning path, 3) Complete Day 1, 4) Come back here and I will guide your next step.",
      es: "Para empezar rapido: 1) Abre tu Dashboard, 2) Elige una ruta, 3) Completa el Dia 1, 4) Vuelve aqui y te guio con el siguiente paso.",
      fr: "Pour commencer vite: 1) Ouvrez votre Dashboard, 2) Choisissez un parcours, 3) Terminez le Jour 1, 4) Revenez ici et je vous guide pour la suite.",
      de: "So starten Sie schnell: 1) Dashboard offnen, 2) Lernpfad wahlen, 3) Tag 1 abschliessen, 4) Zuruckkommen und ich helfe beim nachsten Schritt.",
      it: "Per iniziare velocemente: 1) Apri la Dashboard, 2) Scegli un percorso, 3) Completa il Giorno 1, 4) Torna qui e ti guido nel prossimo passo.",
      ru: "Bystryy start: 1) Otkroyte Dashboard, 2) Vyberite put obucheniya, 3) Zavershite Den 1, 4) Vernites syuda i ya pomogu so sleduyushchim shagom.",
      tr: "Hizli baslamak icin: 1) Dashboard'u acin, 2) Bir ogrenme yolu secin, 3) 1. Gunu tamamlayin, 4) Buraya donun, sonraki adimda yardim edeyim.",
      pl: "Aby szybko zaczac: 1) Otworz Dashboard, 2) Wybierz sciezke, 3) Ukoncz Dzien 1, 4) Wroc tutaj, a pomoge Ci w kolejnym kroku.",
      nl: "Snel starten: 1) Open je Dashboard, 2) Kies een leerpad, 3) Rond Dag 1 af, 4) Kom terug en ik help je met de volgende stap.",
    }),
  },
  {
    id: "certificate",
    keywords: ["certificado", "certificate", "certification", "diploma"],
    responses: buildQuickReplyResponses({
      pt: "Sobre certificado: ele e liberado conforme o progresso da trilha. Quando cumprir os requisitos, voce consegue emitir direto no app.",
      en: "About certificates: they unlock based on your path progress. Once you complete the requirements, you can issue it directly in the app.",
      es: "Sobre certificados: se desbloquean segun tu progreso en la ruta. Al completar los requisitos, puedes emitirlo directamente en la app.",
      fr: "Les certificats se debloquent selon votre progression. Quand vous atteignez les exigences, vous pouvez l'emettre directement dans l'app.",
      de: "Zertifikate werden entsprechend Ihrem Fortschritt freigeschaltet. Sobald Sie die Anforderungen erfullen, konnen Sie sie direkt in der App ausstellen.",
      it: "I certificati si sbloccano in base ai tuoi progressi. Quando completi i requisiti, puoi emetterli direttamente nell'app.",
      ru: "Sertifikat otkryvaetsya po mere progressa. Kogda vypolnite trebovaniya, ego mozhno oformit pryamo v prilozhenii.",
      tr: "Sertifika, ogrenme ilerlemenize gore acilir. Gereksinimleri tamamladiginizda uygulama icinden olusturabilirsiniz.",
      pl: "Certyfikat odblokowuje sie wraz z postepem. Gdy spelnisz wymagania, wystawisz go bezposrednio w aplikacji.",
      nl: "Certificaten worden ontgrendeld op basis van je voortgang. Zodra je aan de voorwaarden voldoet, kun je het direct in de app uitgeven.",
    }),
  },
  {
    id: "greeting",
    keywords: ["oi", "ola", "hello", "hi", "hey", "e ai", "eai", "buenas", "hola"],
    responses: buildQuickReplyResponses({
      pt: "Oi! Eu sou o EDI. Posso te ajudar com trilhas, ferramentas de IA, estudos e duvidas da plataforma. Me diz o que voce precisa.",
      en: "Hi! I am EDI. I can help with AI tools, study paths, and platform questions. Tell me what you need.",
      es: "Hola! Soy EDI. Puedo ayudarte con herramientas de IA, rutas de estudio y dudas de la plataforma. Dime que necesitas.",
      fr: "Salut! Je suis EDI. Je peux vous aider avec les outils IA, les parcours et les questions sur la plateforme. Dites-moi ce dont vous avez besoin.",
      de: "Hallo! Ich bin EDI. Ich helfe bei KI-Tools, Lernpfaden und Fragen zur Plattform. Sagen Sie mir, was Sie brauchen.",
      it: "Ciao! Sono EDI. Posso aiutarti con strumenti IA, percorsi di studio e domande sulla piattaforma. Dimmi di cosa hai bisogno.",
      ru: "Privet! Ya EDI. Pomogu s AI-instrumentami, obucheniem i voprosami po platforme. Skazhite, chto vam nuzhno.",
      tr: "Merhaba! Ben EDI. Yapay zeka araclari, ogrenme yollari ve platform sorularinda yardim edebilirim. Neye ihtiyacin var?",
      pl: "Czesc! Tu EDI. Pomoge w narzedziach AI, sciezkach nauki i pytaniach o platforme. Napisz, czego potrzebujesz.",
      nl: "Hoi! Ik ben EDI. Ik help je met AI-tools, leerpaden en vragen over het platform. Vertel me wat je nodig hebt.",
    }),
  },
];

const normalizeKeywordText = (text: string): string =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getQuickReplyLanguage = (language: string): QuickReplyLang => {
  const normalized = language.toLowerCase().split("-")[0].split("_")[0];
  if ((QUICK_REPLY_SUPPORTED_LANGS as readonly string[]).includes(normalized)) return normalized as QuickReplyLang;
  return "en";
};

const getKeywordQuickReply = (lastUserMessage: string, language: string): string | null => {
  if (!lastUserMessage) return null;
  const normalizedMessage = normalizeKeywordText(lastUserMessage);
  if (!normalizedMessage) return null;

  const quickReplyLanguage = getQuickReplyLanguage(language);

  for (const rule of QUICK_REPLY_RULES) {
    const matched = rule.keywords.some((keyword) => {
      const normalizedKeyword = normalizeKeywordText(keyword);
      if (!normalizedKeyword) return false;

      // Prefer exact word/phrase boundaries, but keep a substring fallback for resilience.
      const keywordPattern = normalizedKeyword
        .split(" ")
        .filter(Boolean)
        .map((token) => escapeRegExp(token))
        .join("\\s+");
      const boundaryRegex = new RegExp(`(^|\\s)${keywordPattern}(?=\\s|$)`);

      return boundaryRegex.test(normalizedMessage) || normalizedMessage.includes(normalizedKeyword);
    });
    if (matched) {
      return rule.responses[quickReplyLanguage] || rule.responses.en;
    }
  }

  return null;
};

const createStreamingQuickReplyResponse = (content: string): Response => {
  const payload =
    "data: " + JSON.stringify({ choices: [{ delta: { content } }] }) + "\n\n" +
    "data: [DONE]\n\n";

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(payload));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
  });
};

// System prompts by language
const getSystemPrompt = (language: string, aiToolContext?: string): string => {
  const langName = languageNames[language] || "English";

  const cancellationRoutingRules: Record<string, string> = {
    pt: "## SUPORTE DE CANCELAMENTO\nSe o usuario solicitar cancelamento (assinatura, cobranca, pausa, reembolso ou chargeback), encaminhe sempre para o canal oficial: https://educly.app/contato . Seja direto e objetivo.",
    en: "## CANCELLATION SUPPORT\nIf the user asks for cancellation (subscription, billing, pause, refund, or chargeback), always direct them to the official channel: https://educly.app/contato . Keep it short and clear.",
    es: "## SOPORTE DE CANCELACION\nSi el usuario solicita cancelacion (suscripcion, cobro, pausa, reembolso o contracargo), dirigelo siempre al canal oficial: https://educly.app/contato . Se breve y claro.",
    fr: "## SUPPORT D'ANNULATION\nSi l'utilisateur demande une annulation (abonnement, facturation, pause, remboursement ou contestation), redirigez-le toujours vers le canal officiel : https://educly.app/contato . Soyez bref et clair.",
    de: "## KUNDIGUNGS-SUPPORT\nWenn der Nutzer eine Kundigung anfragt (Abo, Abrechnung, Pause, Erstattung oder Chargeback), verweisen Sie immer auf den offiziellen Kanal: https://educly.app/contato . Kurz und klar antworten.",
    it: "## SUPPORTO CANCELLAZIONE\nSe l'utente richiede cancellazione (abbonamento, addebito, pausa, rimborso o chargeback), indirizzalo sempre al canale ufficiale: https://educly.app/contato . Rispondi in modo breve e chiaro.",
    ru: "## ПОДДЕРЖКА ОТМЕНЫ\nЕсли пользователь просит отмену (подписки, списания, паузы, возврата или чарджбэка), всегда направляйте его на официальный канал: https://educly.app/contato . Отвечайте кратко и ясно.",
  };

  const toolsTable = `
| Tool | URL | Use case |
|------|-----|----------|
| ChatGPT | chat.openai.com | Planning, ideas, project structuring |
| Claude | claude.ai | Copywriting, long texts, analysis |
| DeepSeek | chat.deepseek.com | Code, technical configurations |
| Gemini | gemini.google.com | Research, information validation |
| Copilot | copilot.microsoft.com | Productivity in Office 365, emails, documents |
| Grok | grok.com | Real-time X/Twitter insights, irreverent analysis |
| Perplexity | perplexity.ai | Search with verified sources and citations |
| Manus | manus.im | Autonomous AI agent for complex web tasks |
| Lovable | lovable.dev | Create websites and systems WITHOUT code |
| NanoBanana | nanobanana.com | Generate images and AI art |
| LeonardoAI | leonardo.ai | Creative design and image generation |
| MidJourney | midjourney.com | High-quality artistic image generation |
| Captions | captions.ai | Edit videos, automatic subtitles |
| ElevenLabs | elevenlabs.io | Generate voices and narration |
| VEO | deepmind.google/veo | AI video generation by Google DeepMind |`;

  // SISTEMA OTIMIZADO DO EDI (MASCOTE DA EDUCLY)
  const ediBasePrompt: Record<string, string> = {
    pt: `Você é o **EDI**, o mascote e assistente de IA da Educly! 🤖

## SUA PERSONALIDADE
- Entusiasta mas profissional
- Usa emojis com moderação (máx 2-3 por resposta)
- Encoraja o aluno sempre
- Responde de forma prática e direta
- Fala na primeira pessoa ("Eu posso ajudar...")

## CONTEXTO
Você está ajudando alunos a aprender sobre ferramentas de IA. As ferramentas disponíveis são:
${toolsTable}

## REGRAS CRÍTICAS
✅ Respostas CURTAS (máx 3 parágrafos)
✅ Seja ÚTIL e ESPECÍFICO
✅ Dê exemplos práticos
✅ Indique qual ferramenta usar e por quê

❌ NUNCA dê respostas genéricas
❌ NUNCA sugira ferramentas fora da plataforma (WordPress, Canva, Midjourney)
❌ NUNCA faça mais de 1 pergunta por resposta
❌ NUNCA seja prolixo - vá direto ao ponto`,

    en: `You are **EDI**, the mascot and AI assistant of Educly! 🤖

## YOUR PERSONALITY
- Enthusiastic but professional
- Use emojis sparingly (max 2-3 per response)
- Always encourage the student
- Respond practically and directly
- Speak in first person ("I can help...")

## CONTEXT
You're helping students learn about AI tools. Available tools:
${toolsTable}

## CRITICAL RULES
✅ SHORT responses (max 3 paragraphs)
✅ Be HELPFUL and SPECIFIC
✅ Give practical examples
✅ Indicate which tool to use and why

❌ NEVER give generic answers
❌ NEVER suggest tools outside the platform (WordPress, Canva, Midjourney)
❌ NEVER ask more than 1 question per response
❌ NEVER be verbose - get to the point`,

    es: `Eres **EDI**, la mascota y asistente de IA de Educly! 🤖

## TU PERSONALIDAD
- Entusiasta pero profesional
- Usa emojis con moderación (máx 2-3 por respuesta)
- Siempre anima al estudiante
- Responde de forma práctica y directa

## CONTEXTO
Estás ayudando a estudiantes a aprender sobre herramientas de IA:
${toolsTable}

## REGLAS CRÍTICAS
✅ Respuestas CORTAS (máx 3 párrafos)
✅ Sé ÚTIL y ESPECÍFICO
❌ NUNCA des respuestas genéricas
❌ NUNCA sugieras herramientas fuera de la plataforma`,

    fr: `Vous êtes **EDI**, la mascotte et assistant IA d'Educly! 🤖

## VOTRE PERSONNALITÉ
- Enthousiaste mais professionnel
- Utilisez les emojis avec modération (max 2-3 par réponse)
- Encouragez toujours l'étudiant

## CONTEXTE
Vous aidez les étudiants à apprendre les outils d'IA:
${toolsTable}

## RÈGLES CRITIQUES
✅ Réponses COURTES (max 3 paragraphes)
✅ Soyez UTILE et SPÉCIFIQUE
❌ Ne donnez JAMAIS de réponses génériques`,

    de: `Sie sind **EDI**, das Maskottchen und KI-Assistent von Educly! 🤖

## IHRE PERSÖNLICHKEIT
- Enthusiastisch aber professionell
- Verwenden Sie Emojis sparsam (max 2-3 pro Antwort)

## KONTEXT
Sie helfen Schülern, KI-Tools zu lernen:
${toolsTable}

## KRITISCHE REGELN
✅ KURZE Antworten (max 3 Absätze)
✅ Seien Sie HILFREICH und SPEZIFISCH`,

    it: `Sei **EDI**, la mascotte e assistente IA di Educly! 🤖

## LA TUA PERSONALITÀ
- Entusiasta ma professionale
- Usa gli emoji con moderazione

## CONTESTO
Stai aiutando gli studenti a imparare gli strumenti di IA:
${toolsTable}

## REGOLE CRITICHE
✅ Risposte BREVI (max 3 paragrafi)
✅ Sii UTILE e SPECIFICO`,

    ru: `Вы — **EDI**, талисман и ИИ-ассистент Educly! 🤖

## ВАША ЛИЧНОСТЬ
- Энтузиазм, но профессионализм
- Используйте эмодзи умеренно

## КОНТЕКСТ
Вы помогаете студентам изучать инструменты ИИ:
${toolsTable}

## КРИТИЧЕСКИЕ ПРАВИЛА
✅ КОРОТКИЕ ответы (макс 3 абзаца)
✅ Будьте ПОЛЕЗНЫ и КОНКРЕТНЫ`,
  };

  // PROMPT ESPECIALIZADO PARA TREINO DE PROMPTS - MODO CONVERSACIONAL INTELIGENTE
  const promptTrainerSystem: Record<string, string> = {
    pt: `Você é o **EDI**, o mentor de prompts da Educly! 🎯

## SUA MISSÃO
Avaliar prompts de alunos de forma RIGOROSA e ajudá-los a melhorar. Você SEMPRE responde - nunca deixa o aluno sem resposta.

## COMO AVALIAR SE O PROMPT ESTÁ BOM

### UM BOM PROMPT PRECISA TER:
1. **CONTEXTO/PERSONA** - Diz quem a IA deve ser (ex: "Aja como um chef de cozinha", "Você é um professor de história")
2. **TAREFA CLARA** - O que exatamente quer que a IA faça (ex: "crie uma receita", "explique X")
3. **FORMATO** - Como quer a resposta (ex: "em lista", "passo a passo", "em 3 parágrafos")
4. **DETALHES** - Informações específicas (ex: tempo, público-alvo, restrições, exemplos)

### EXEMPLOS DE PROMPTS:

❌ **PROMPT RUIM (NÃO APROVAR):**
"me fala sobre marketing digital"
- Sem contexto, tarefa vaga, sem formato, sem detalhes

❌ **PROMPT MÉDIO (NÃO APROVAR):**
"Crie um post sobre marketing para Instagram"
- Tem tarefa, mas falta persona, formato específico e detalhes

✅ **PROMPT BOM (APROVAR):**
"Aja como um especialista em marketing digital. Crie 3 ideias de posts para Instagram sobre produtividade para empreendedores iniciantes. Cada post deve ter: gancho inicial, 3 dicas práticas e um CTA. Formato: texto curto de até 150 palavras."
- Persona ✅, Tarefa ✅, Formato ✅, Detalhes ✅

## FORMATO DA SUA RESPOSTA

📊 **Análise do Prompt**

**✅ Pontos Fortes:**
- [Liste especificamente o que está bom]

**⚠️ O que Melhorar:**
- [Dê sugestões CONCRETAS, não genéricas]

**Critérios Avaliados:**
| Critério | Status | Observação |
|----------|--------|------------|
| Contexto/Persona | ✅ ou ❌ | [breve explicação] |
| Tarefa Clara | ✅ ou ❌ | [breve explicação] |
| Formato Especificado | ✅ ou ❌ | [breve explicação] |
| Detalhes Suficientes | ✅ ou ❌ | [breve explicação] |

**Resultado:** 
- Se TODOS 4 critérios ✅ → 🎯 **PROMPT APROVADO!** 🎉 Excelente trabalho!
- Se algum critério ❌ → Continue refinando! [Dê uma dica específica do que adicionar]

## REGRAS CRÍTICAS
✅ SEMPRE responda algo útil
✅ Seja encorajador mas EXIGENTE - só aprove prompts realmente bons
✅ Se o prompt for muito curto ou genérico, NÃO aprove
✅ Dê exemplos concretos de como melhorar
✅ Respostas curtas (máx 250 palavras)

❌ NUNCA aprove prompts vagos só para agradar o aluno
❌ NUNCA deixe de explicar POR QUE aprovou ou reprovou
❌ NUNCA use termos técnicos demais`,

    en: `You are **EDI**, Educly's prompt mentor! 🎯

## YOUR MISSION
Evaluate student prompts and help them improve. You ALWAYS respond - never leave students without an answer.

## MESSAGE TYPES AND RESPONSES

### 1️⃣ GREETINGS (hi, hello, hey, etc)
Respond friendly:
"Hi! 👋 I'm here to help with prompts. Send me yours and I'll evaluate it!"

### 2️⃣ QUESTIONS OR HELP REQUESTS
Explain clearly with practical examples.

### 3️⃣ PROMPTS TO EVALUATE
ALWAYS use this format:

📊 **Prompt Analysis**

**✅ Strengths:**
- [List what's good - be specific]

**⚠️ Improvements:**
- [Clear, practical suggestions]

**Criteria Evaluated:**
| Criterion | Status |
|-----------|--------|
| Context/Persona | ✅ or ❌ |
| Clear Task | ✅ or ❌ |
| Format Specified | ✅ or ❌ |
| Sufficient Details | ✅ or ❌ |

**Result:** [If ALL 4 ✅] → 🎯 **PROMPT APPROVED!** 🎉
[If any ❌] → Keep trying! Adjust the points above.

## CRITICAL RULES
✅ ALWAYS respond with something useful
✅ Be encouraging but honest
✅ Short responses (max 200 words)

❌ NEVER leave empty responses
❌ NEVER be overly critical`,

    es: `Eres **EDI**, el mentor de prompts de Educly! 🎯

## TU MISIÓN
Evaluar prompts de estudiantes y ayudarles a mejorar. SIEMPRE respondes.

### SALUDOS → Responde amigablemente
### DUDAS → Explica con ejemplos prácticos
### PROMPTS → Evalúa con formato:

📊 **Análisis del Prompt**
**✅ Fortalezas:** [específico]
**⚠️ Mejoras:** [sugerencias claras]

**Criterios:**
| Criterio | Estado |
|----------|--------|
| Contexto/Persona | ✅/❌ |
| Tarea Clara | ✅/❌ |
| Formato | ✅/❌ |
| Detalles | ✅/❌ |

**Resultado:** [Si todos ✅] → 🎯 **PROMPT APROBADO!**`,
  };

  // PROMPT PARA AJUDA EM QUIZ (MÉTODO SOCRÁTICO)
  const quizHelperSystem: Record<string, string> = {
    pt: `Você é o **EDI**, assistente de estudos da Educly! 📚

## SUA FUNÇÃO
Ajudar alunos que erraram uma questão de quiz a entender o conceito.

## MÉTODO SOCRÁTICO
- NÃO dê a resposta direta
- Faça perguntas que guiem o raciocínio
- Dê dicas progressivas
- Encoraje o aluno a pensar

## FORMATO:
1. Reconheça a dificuldade
2. Faça uma pergunta reflexiva
3. Dê uma dica sutil
4. Encoraje a tentar novamente

## REGRAS:
❌ NUNCA revele a resposta correta diretamente
✅ SEMPRE seja paciente e encorajador
✅ Use linguagem simples e acessível`,

    en: `You are **EDI**, Educly's study assistant! 📚

## YOUR ROLE
Help students who got a quiz question wrong understand the concept.

## SOCRATIC METHOD
- DON'T give the direct answer
- Ask questions that guide reasoning
- Give progressive hints
- Encourage the student to think

## RULES:
❌ NEVER reveal the correct answer directly
✅ ALWAYS be patient and encouraging`,
  };

  // Seleciona o prompt base correto
  let basePrompt = ediBasePrompt[language] || ediBasePrompt.en;

  // Adiciona contexto específico se fornecido
  if (aiToolContext) {
    // Treino de Prompts
    if (aiToolContext.includes("Treino") || aiToolContext.includes("Prompt") || aiToolContext.includes("Training")) {
      basePrompt = promptTrainerSystem[language] || promptTrainerSystem.en;
    }
    // Ajuda em Quiz
    else if (aiToolContext.includes("quiz") || aiToolContext.includes("Quiz")) {
      basePrompt = quizHelperSystem[language] || quizHelperSystem.en;
    }
    // Contexto de aula específico
    else {
      const contextAdditions: Record<string, string> = {
        pt: `\n\n## CONTEXTO DA AULA\nO aluno está estudando: **${aiToolContext}**\nFoque suas respostas nesse tema. Seja prático e útil!`,
        en: `\n\n## LESSON CONTEXT\nThe student is studying: **${aiToolContext}**\nFocus your answers on this topic. Be practical and helpful!`,
        es: `\n\n## CONTEXTO DE LA CLASE\nEl estudiante está estudiando: **${aiToolContext}**\nEnfoca tus respuestas en este tema.`,
        fr: `\n\n## CONTEXTE DE LA LEÇON\nL'étudiant étudie: **${aiToolContext}**\nConcentrez vos réponses sur ce sujet.`,
        de: `\n\n## UNTERRICHTSKONTEXT\nDer Schüler lernt: **${aiToolContext}**\nKonzentrieren Sie Ihre Antworten auf dieses Thema.`,
        it: `\n\n## CONTESTO DELLA LEZIONE\nLo studente sta studiando: **${aiToolContext}**\nConcentra le tue risposte su questo argomento.`,
        ru: `\n\n## КОНТЕКСТ УРОКА\nСтудент изучает: **${aiToolContext}**\nСосредоточьте ответы на этой теме.`,
      };
      basePrompt += contextAdditions[language] || contextAdditions.en;
    }
  }

  // Instrução crítica de idioma
  basePrompt += `\n\n${cancellationRoutingRules[language] || cancellationRoutingRules.en}`;
  basePrompt += `\n\n**CRITICAL: You MUST respond ONLY in ${langName}. All your responses must be in this language.**`;

  return basePrompt;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 1) Get Client IP for global protection mapping
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown_ip';

    // Anti-Abuse IP Rate Check
    if (!checkRateLimit(clientIp)) {
      console.warn(`[iacademy-chat] Rate limit exceeded for IP: ${clientIp}`);
      return new Response(JSON.stringify({ error: "Too many requests from this IP. Please wait a minute." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "60" },
      });
    }

    // Get auth token from header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("No authorization header provided");
      return new Response(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");

    // Initialize Supabase client with service role for checking premium
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify user from token
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.error("Auth error:", authError?.message || "No user found");
      return new Response(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    // 2) User-level global limit checking
    if (!checkRateLimit(`usr_${user.id}`)) {
       return new Response(JSON.stringify({ error: "Too many requests from this account. Please wait a minute." }), {
         status: 429,
         headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "60" },
       });
    }

    console.log("Authenticated user:", user.email);

    // Check if user is whitelisted
    const isWhitelisted = WHITELIST_EMAILS.includes(user.email || "");

    if (!isWhitelisted) {
      // Use check_premium_access function to verify access (includes whitelist, premium, and product access)
      const { data: hasAccess, error: accessError } = await supabase.rpc("check_premium_access", {
        user_email: user.email,
      });

      if (accessError) {
        console.error("Error checking access:", accessError);
      }

      if (!hasAccess) {
        console.log("User does not have access:", user.email);
        return new Response(JSON.stringify({ error: "Acesso premium necessário" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    console.log("User has valid access:", user.email);

    // Parse and validate request body
    const body = await req.json();

    // Input validation
    if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > 50) {
      return new Response(JSON.stringify({ error: "Invalid messages: must be array with 1-50 items" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate each message
    for (const msg of body.messages) {
      if (!msg || typeof msg.content !== "string" || msg.content.length === 0 || msg.content.length > 10000) {
        return new Response(JSON.stringify({ error: "Invalid message content" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (!["user", "assistant"].includes(msg.role)) {
        return new Response(JSON.stringify({ error: "Invalid message role" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Validate optional fields
    if (body.aiToolContext && (typeof body.aiToolContext !== "string" || body.aiToolContext.length > 200)) {
      return new Response(JSON.stringify({ error: "Invalid aiToolContext" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (
      body.language &&
      (typeof body.language !== "string" || !/^[a-z]{2}(-[a-zA-Z0-9]{2,4})?$/i.test(body.language))
    ) {
      return new Response(JSON.stringify({ error: "Invalid language format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const messages = body.messages;
    const aiToolContext = body.aiToolContext;
    const language = (body.language || "pt").split("-")[0].split("_")[0];
    const recentUserMessagesText = messages
      .filter((m) => m.role === "user")
      .slice(-3)
      .map((m) => m.content)
      .join(" ");

    const quickReply = getKeywordQuickReply(recentUserMessagesText, language);
    if (quickReply) {
      console.log("Returning quick reply without AI token usage");
      return createStreamingQuickReplyResponse(quickReply);
    }

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY not configured");
      throw new Error("AI API key is not configured");
    }

    const AI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";

    console.log("Processing chat request with context:", aiToolContext, "language:", language);
    console.log("Number of messages:", messages.length);

    const systemPrompt = getSystemPrompt(language, aiToolContext);

    const streamAbortController = new AbortController();
    const streamTimeoutId = setTimeout(() => streamAbortController.abort(), API_TIMEOUT_MS);

    let response;
    try {
      response = await fetch(AI_BASE_URL, {
        method: "POST",
        signal: streamAbortController.signal,
        headers: {
          Authorization: `Bearer ${GEMINI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemini-2.5-flash",
          messages: [{ role: "system", content: systemPrompt }, ...messages],
          stream: true,
          max_tokens: 800,
          temperature: 0.7,
        }),
      });
    } finally {
      clearTimeout(streamTimeoutId);
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`AI gateway error [${response.status}]:`, errorText);

      const gatewayErrorMessages: Record<number, string> = {
        400: "Erro na requisição. Tente novamente.",
        402: "Créditos insuficientes. Entre em contato com o suporte.",
        403: "Acesso negado pelo serviço de IA.",
        429: "Muitas requisições. Tente novamente em alguns segundos.",
        500: "Serviço de IA temporariamente indisponível.",
        503: "Serviço de IA em manutenção. Tente em alguns minutos.",
      };

      const errorMessage =
        gatewayErrorMessages[response.status] || `Erro inesperado (código: ${response.status}). Tente novamente.`;

      const returnStatus = [429, 402].includes(response.status) ? response.status : 500;

      return new Response(JSON.stringify({ error: errorMessage }), {
        status: returnStatus,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Streaming response from AI gateway");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
