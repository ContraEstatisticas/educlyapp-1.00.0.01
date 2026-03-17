import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// === GLOBAL RATE LIMITER (In-Memory IP/User Flood Protection) ===
// Limits to 15 requests per minute per IP to avoid abuse
const rateLimitCache = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60000;
const MAX_REQUESTS_PER_WINDOW = 15;

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const entry = rateLimitCache.get(identifier);

  // Clean old entries randomly to avoid memory leak
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

const DAILY_MESSAGE_LIMIT = 50;
const DAILY_IMAGE_LIMIT = 10;
const API_TIMEOUT_MS = 60000; // 60s hard timeout to prevent connection hanging

// System prompts per AI persona (multilingual)
const AI_PERSONAS: Record<string, { pt: string; en: string; isImage?: boolean }> = {
  chatgpt: {
    pt: `VocÃª Ã© o ChatGPT, assistente de IA da OpenAI. VocÃª Ã© prestativo, criativo e claro nas respostas.
Responda de forma natural como o ChatGPT faria. Seja completo mas conciso. Use markdown quando Ãºtil.
Responda no idioma do usuÃ¡rio. Se a pergunta for em portuguÃªs, responda em portuguÃªs.`,
    en: `You are ChatGPT, OpenAI's AI assistant. You are helpful, creative and clear in your responses.
Respond naturally as ChatGPT would. Be complete but concise. Use markdown when useful.
Respond in the user's language.`,
  },
  gemini: {
    pt: `VocÃª Ã© o Gemini, assistente de IA do Google. VocÃª Ã© inteligente, analÃ­tico e multimodal.
Responda de forma natural como o Gemini faria. Seja preciso, use dados quando relevante. Use markdown.
Responda no idioma do usuÃ¡rio. Se a pergunta for em portuguÃªs, responda em portuguÃªs.`,
    en: `You are Gemini, Google's AI assistant. You are intelligent, analytical and multimodal.
Respond naturally as Gemini would. Be precise, use data when relevant. Use markdown.
Respond in the user's language.`,
  },
  claude: {
    pt: `VocÃª Ã© o Claude, assistente de IA da Anthropic. VocÃª Ã© cuidadoso, honesto e extremamente Ãºtil.
Responda de forma natural como o Claude faria. Seja detalhista, estruturado e Ã©tico. Use markdown.
Responda no idioma do usuÃ¡rio. Se a pergunta for em portuguÃªs, responda em portuguÃªs.`,
    en: `You are Claude, Anthropic's AI assistant. You are careful, honest and extremely helpful.
Respond naturally as Claude would. Be detailed, structured and ethical. Use markdown.
Respond in the user's language.`,
  },
  grok: {
    pt: `VocÃª Ã© o Grok, assistente de IA da xAI (empresa de Elon Musk). VocÃª Ã© irreverente, inteligente e direto.
Responda de forma natural como o Grok faria. Tenha um toque de humor seco e seja honesto sobre incertezas. Use markdown.
Responda no idioma do usuÃ¡rio. Se a pergunta for em portuguÃªs, responda em portuguÃªs.`,
    en: `You are Grok, xAI's AI assistant (Elon Musk's company). You are irreverent, intelligent and direct.
Respond naturally as Grok would. Have a touch of dry humor and be honest about uncertainties. Use markdown.
Respond in the user's language.`,
  },
  nanobanana: {
    pt: `VocÃª Ã© o NanoBanana, um assistente criativo especializado em geraÃ§Ã£o de imagens com IA.
IMPORTANTE: VocÃª irÃ¡ GERAR imagens diretamente, nÃ£o criar prompts para outras ferramentas.
Responda APENAS com uma breve descriÃ§Ã£o do que vocÃª vai criar (1-2 frases).
Exemplo: "Vou criar uma imagem de um dragÃ£o dourado voando sobre um castelo ao pÃ´r do sol! ðŸŽ¨"
NÃƒO inclua instruÃ§Ãµes tÃ©cnicas, parÃ¢metros ou prompts extensos. Responda no idioma do usuÃ¡rio.`,
    en: `You are NanoBanana, a creative assistant specialized in AI image generation.
IMPORTANT: You will GENERATE images directly, not create prompts for other tools.
Respond ONLY with a brief description of what you will create (1-2 sentences).
Example: "I'll create an image of a golden dragon flying over a castle at sunset! ðŸŽ¨"
Do NOT include technical instructions, parameters, or extensive prompts. Respond in the user's language.`,
    isImage: true,
  },
  edi: {
    pt: `VocÃª Ã© o EDI, o assistente oficial da Educly - uma plataforma de educaÃ§Ã£o em inteligÃªncia artificial.
VocÃª Ã© amigÃ¡vel, didÃ¡tico e motivador. Ajude os usuÃ¡rios a aprender sobre IA de forma simples e prÃ¡tica.
Use emojis moderadamente. Seja encorajador. Responda no idioma do usuÃ¡rio.

REGRAS SOBRE CANCELAMENTO E COBRANCA:
- VocÃª NÃƒO tem acesso a dados de pagamento, assinaturas ou cobranÃ§as.
- Para qualquer questÃ£o sobre cancelamento, cobranÃ§a ou assinatura, SEMPRE direcione o usuÃ¡rio para: https://educly.app/contato
- NUNCA tente processar cancelamentos ou dar instruÃ§Ãµes manuais de como cancelar.
- Responda: "Para questÃµes sobre cancelamento ou cobranÃ§as, entre em contato com nosso suporte em https://educly.app/contato ðŸ˜Š"`,
    en: `You are EDI, the official Educly assistant - an AI education platform.
You are friendly, didactic and motivating. Help users learn about AI in a simple and practical way.
Use emojis moderately. Be encouraging. Respond in the user's language.

RULES ABOUT CANCELLATION AND BILLING:
- You do NOT have access to payment, subscription or billing data.
- For any question about cancellation, billing or subscription, ALWAYS direct the user to: https://educly.app/contato
- NEVER try to process cancellations or give manual instructions on how to cancel.
- Respond: "For questions about cancellation or billing, please contact our support at https://educly.app/contato ðŸ˜Š"`,
  },
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

const EDI_QUICK_REPLY_RULES: QuickReplyRule[] = [
  {
    id: "cancel_billing",
    keywords: [
      "cancelamento",
      "cancelar",
      "cobranca",
      "assinatura",
      "pagamento",
      "cancellation",
      "cancel",
      "chargeback",
      "unsubscribe",
      "billing",
      "subscription",
      "payment",
      "cancelacion",
      "cobro",
      "cobros",
      "suscripcion",
      "pago",
      "annulation",
      "annuler",
      "facturation",
      "abonnement",
      "paiement",
      "kundigung",
      "stornierung",
      "abrechnung",
      "abonnement",
      "zahlung",
      "cancellazione",
      "annullare",
      "fatturazione",
      "abbonamento",
      "oplata",
      "otmena",
      "podpiska",
      "bill",
      "отмена",
      "отменить",
      "оплата",
      "подписка",
      "取消",
      "账单",
      "訂閱",
      "订阅",
      "支付",
      "キャンセル",
      "請求",
      "支払い",
      "解約",
      "취소",
      "결제",
      "구독",
      "청구",
      "الغاء",
      "إلغاء",
      "فاتورة",
      "اشتراك",
      "دفع",
      "रद्द",
      "रद्दीकरण",
      "सदस्यता",
      "भुगतान",
      "बिलिंग",
      "iptal",
      "fatura",
      "abonelik",
      "odeme",
      "anulowanie",
      "anuluj",
      "platnosc",
      "subskrypcja",
      "rozliczenie",
      "annuleren",
      "annulering",
      "facturatie",
      "abonnement",
      "betaling",
    ],
    responses: buildQuickReplyResponses({
      pt: "Para cancelamento ou cobranca, fale com nosso suporte humano: https://educly.app/contato . Se preferir, envie email para contact@educly.app.",
      en: "For cancellation or billing, please contact our human support: https://educly.app/contato . You can also email contact@educly.app.",
      es: "Para cancelacion o cobros, contacta con soporte humano: https://educly.app/contato . Tambien puedes escribir a contact@educly.app.",
      fr: "Pour annulation ou facturation, contactez notre support humain: https://educly.app/contato . Vous pouvez aussi ecrire a contact@educly.app.",
      de: "Fur Kundigung oder Abrechnung kontaktieren Sie bitte unseren Support: https://educly.app/contato . Sie konnen auch an contact@educly.app schreiben.",
      it: "Per cancellazione o fatturazione, contatta il nostro supporto: https://educly.app/contato . Puoi anche scrivere a contact@educly.app.",
      ru: "Po voprosam otmeny ili oplaty obratites v podderzhku: https://educly.app/contato . Takzhe mozhno napisat na contact@educly.app.",
      tr: "Iptal veya faturalama icin lutfen destek ekibimizle iletisime gecin: https://educly.app/contato . Ayrica contact@educly.app adresine yazabilirsiniz.",
      pl: "W sprawie anulowania lub platnosci skontaktuj sie z naszym wsparciem: https://educly.app/contato . Mozesz tez napisac na contact@educly.app.",
      nl: "Voor annulering of facturatie neem contact op met support: https://educly.app/contato . Je kunt ook mailen naar contact@educly.app.",
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
      "prices",
      "pricing",
      "cost",
      "cuanto cuesta",
      "precio",
      "precios",
      "costo",
      "coste",
      "planes",
      "prix",
      "tarif",
      "tarifs",
      "cout",
      "forfait",
      "preis",
      "preise",
      "kosten",
      "tarif",
      "preisplan",
      "prezzo",
      "prezzi",
      "costo",
      "costi",
      "piano",
      "piani",
      "цена",
      "цены",
      "стоимость",
      "тариф",
      "план",
      "价格",
      "费用",
      "套餐",
      "方案",
      "価格",
      "料金",
      "プラン",
      "費用",
      "가격",
      "요금",
      "플랜",
      "비용",
      "السعر",
      "الاسعار",
      "الأسعار",
      "تكلفة",
      "خطة",
      "خطط",
      "कीमत",
      "कीमतें",
      "लागत",
      "प्लान",
      "योजनाएं",
      "योजनाएँ",
      "fiyat",
      "fiyatlar",
      "ucret",
      "maliyet",
      "plan",
      "cena",
      "ceny",
      "koszt",
      "koszty",
      "plany",
      "prijs",
      "prijzen",
      "kosten",
      "plan",
      "plannen",
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
      pl: "Cennik i plany znajdziesz na https://educly.app/plan . Moge tez pomoc wybrac najlepszy plan do Twojego celu.",
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
      "e-mail",
      "contato",
      "contact",
      "ajuda humana",
      "agent",
      "soporte",
      "contacto",
      "correo",
      "humain",
      "courriel",
      "kontakt",
      "mensch",
      "mitarbeiter",
      "supporto",
      "contatto",
      "operatore",
      "поддержка",
      "контакт",
      "оператор",
      "почта",
      "支持",
      "联系",
      "人工",
      "客服",
      "邮箱",
      "电子邮件",
      "サポート",
      "連絡",
      "問い合わせ",
      "人間",
      "担当者",
      "メール",
      "지원",
      "문의",
      "연락",
      "사람",
      "상담원",
      "이메일",
      "دعم",
      "تواصل",
      "اتصال",
      "بشري",
      "موظف",
      "ايميل",
      "بريد",
      "सहायता",
      "सपोर्ट",
      "संपर्क",
      "इंसान",
      "एजेंट",
      "ईमेल",
      "destek",
      "iletisim",
      "temsilci",
      "eposta",
      "wsparcie",
      "czlowiek",
      "konsultant",
      "mail",
      "mens",
      "medewerker",
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
      "getting started",
      "first lesson",
      "begin",
      "como empiezo",
      "por donde empiezo",
      "primera leccion",
      "commencer",
      "comment commencer",
      "premiere lecon",
      "debuter",
      "starten",
      "wie anfangen",
      "erste lektion",
      "beginnen",
      "iniziare",
      "come iniziare",
      "prima lezione",
      "cominciare",
      "начать",
      "как начать",
      "первый урок",
      "старт",
      "开始",
      "如何开始",
      "第一课",
      "入门",
      "始める",
      "どう始める",
      "最初のレッスン",
      "スタート",
      "시작",
      "어떻게 시작",
      "첫 수업",
      "첫 강의",
      "ابدأ",
      "ابدا",
      "كيف أبدأ",
      "كيف ابدا",
      "الدرس الأول",
      "الدرس الاول",
      "शुरू",
      "कैसे शुरू",
      "पहली कक्षा",
      "पहला पाठ",
      "basla",
      "nasil baslanir",
      "ilk ders",
      "nasil baslarim",
      "zaczac",
      "jak zaczac",
      "pierwsza lekcja",
      "starten",
      "hoe begin ik",
      "eerste les",
      "beginnen",
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
    keywords: [
      "certificado",
      "certificate",
      "certification",
      "diploma",
      "certificacion",
      "certificat",
      "certification",
      "diplome",
      "zertifikat",
      "zertifizierung",
      "diplom",
      "certificato",
      "certificazione",
      "сертификат",
      "диплом",
      "сертификация",
      "证书",
      "认证",
      "文凭",
      "証明書",
      "認定",
      "修了証",
      "자격증",
      "인증서",
      "수료증",
      "شهادة",
      "اعتماد",
      "प्रमाणपत्र",
      "सर्टिफिकेट",
      "डिप्लोما",
      "sertifika",
      "belge",
      "certyfikat",
      "dyplom",
      "certificaat",
      "certificering",
    ],
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
    keywords: [
      "oi",
      "ola",
      "hello",
      "hi",
      "hey",
      "e ai",
      "eai",
      "bom dia",
      "boa tarde",
      "boa noite",
      "hola",
      "buenas",
      "buenos dias",
      "buenas tardes",
      "buenas noches",
      "salut",
      "bonjour",
      "bonsoir",
      "coucou",
      "hallo",
      "guten tag",
      "guten morgen",
      "guten abend",
      "ciao",
      "salve",
      "buongiorno",
      "buonasera",
      "привет",
      "здравствуйте",
      "добрый день",
      "добрый вечер",
      "你好",
      "您好",
      "嗨",
      "こんにちは",
      "やあ",
      "こんばんは",
      "おはよう",
      "안녕",
      "안녕하세요",
      "반가워요",
      "مرحبا",
      "اهلا",
      "أهلا",
      "سلام",
      "नमस्ते",
      "हेलो",
      "हाय",
      "merhaba",
      "selam",
      "iyi gunler",
      "iyi aksamlar",
      "czesc",
      "dzien dobry",
      "hej",
      "hallo",
      "hoi",
      "goedemorgen",
      "goedenavond",
    ],
    responses: buildQuickReplyResponses({
      pt: "Oi! Eu sou o EDI. Posso te ajudar com trilhas, ferramentas de IA, estudos e duvidas da plataforma. Me diz o que voce precisa.",
      en: "Hi! I am EDI. I can help with AI tools, study paths, and platform questions. Tell me what you need.",
      es: "Hola! Soy EDI. Puedo ayudarte con herramientas de IA, rutas de estudio y dudas de la plataforma. Dime que necesitas.",
      fr: "Salut! Je suis EDI. Je peux vous aider avec les outils IA, les parcours et les questions sur la plateforme. Dites-moi ce dont vous avez besoin.",
      de: "Hallo! Ich bin EDI. Ich helfe bei KI-Tools, Lernpfaden und Fragen zur Plattform. Sagen Sie mir, was Sie brauchen.",
      it: "Ciao! Sono EDI. Posso aiutarti con strumenti IA, percorsi di studio e domande sulla piattaforma. Dimmi di cosa hai bisogno.",
      ru: "Privet! Ya EDI. Pomogu s AI-instrumentami, obucheniem i voprosami po platforme. Skazhite, chto vam nuzhno.",
      tr: "Merhaba! Ben EDI. Yapay zeka araclari, ogrenme yollari ve platform sorularinda yardim edebilirim. Neye ihtiyacin var?",
      pl: "Czesc! Tu EDI. Pomoge w narzedziach AI, sciezkach nauki i pytaniach o platformie. Napisz, czego potrzebujesz.",
      nl: "Hoi! Ik ben EDI. Ik help je met AI-tools, leerpaden en vragen over het platform. Vertel me wat je nodig hebt.",
    }),
  },
];
const normalizeKeywordText = (text: string): string =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getQuickReplyLanguage = (language: string): QuickReplyLang => {
  const normalized = language.toLowerCase().split("-")[0].split("_")[0];
  if ((QUICK_REPLY_SUPPORTED_LANGS as readonly string[]).includes(normalized)) return normalized as QuickReplyLang;
  return "en";
};

const getEdiKeywordQuickReply = (lastUserMessage: string, language: string): string | null => {
  if (!lastUserMessage) return null;
  const normalizedMessage = normalizeKeywordText(lastUserMessage);
  if (!normalizedMessage) return null;

  const quickReplyLanguage = getQuickReplyLanguage(language);

  for (const rule of EDI_QUICK_REPLY_RULES) {
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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 1) Get Client IP for global protection mapping
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown_ip';

    // Anti-Abuse IP Rate Check early exit.
    if (!checkRateLimit(clientIp)) {
      console.warn(`[assistentes-chat] Rate limit exceeded for IP: ${clientIp}`);
      return new Response(JSON.stringify({ error: "Too many requests from this IP. Please try again later." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "60" },
      });
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    // 2) User-level global limit checking (extra layer to IP, protecting user tokens)
    if (!checkRateLimit(`usr_${user.id}`)) {
       console.warn(`[assistentes-chat] User Rate limit exceeded for ID: ${user.id}`);
       return new Response(JSON.stringify({ error: "Too many requests from this account. Please wait a minute." }), {
         status: 429,
         headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "60" },
       });
    }

    // Parse request
    const body = await req.json();
    if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > 50) {
      return new Response(JSON.stringify({ error: "Invalid messages: must be array with 1-50 items" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    for (const msg of body.messages) {
      if (!msg || typeof msg.content !== 'string' || msg.content.length === 0 || msg.content.length > 10000) {
        return new Response(JSON.stringify({ error: "Invalid message content" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (!['user', 'assistant'].includes(msg.role)) {
        return new Response(JSON.stringify({ error: "Invalid message role" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const messages = body.messages;
    const aiType = String(body.aiType || "chatgpt").toLowerCase();
    const language = body.language || "pt";
    const recentUserMessagesText = messages
      .filter((m) => m.role === "user")
      .slice(-3)
      .map((m) => m.content)
      .join(" ");

    if (aiType === "edi") {
      const quickReply = getEdiKeywordQuickReply(recentUserMessagesText, language);
      if (quickReply) {
        console.log("Returning quick EDI reply without AI token usage");
        return createStreamingQuickReplyResponse(quickReply);
      }
    }

    if (!AI_PERSONAS[aiType]) {
      return new Response(JSON.stringify({ error: "Invalid AI type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // --- Rate limiting ---
    const today = new Date().toISOString().split("T")[0];
    const persona = AI_PERSONAS[aiType];
    const isImageType = persona.isImage === true;

    // Get or create today's usage
    const { data: usageData } = await supabase
      .from("ai_hub_usage")
      .select("*")
      .eq("user_id", user.id)
      .eq("date", today)
      .maybeSingle();

    const currentMessages = usageData?.messages_today || 0;
    const currentImages = usageData?.images_today || 0;

    if (isImageType && currentImages >= DAILY_IMAGE_LIMIT) {
      return new Response(JSON.stringify({ error: `Daily image limit reached (${DAILY_IMAGE_LIMIT}/day). Try again tomorrow.` }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!isImageType && currentMessages >= DAILY_MESSAGE_LIMIT) {
      return new Response(JSON.stringify({ error: `Daily message limit reached (${DAILY_MESSAGE_LIMIT}/day). Try again tomorrow.` }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get system prompt
    const lang = language.startsWith("pt") ? "pt" : "en";
    const systemPrompt = persona[lang];

    // Get API key
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const AI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
    const TEXT_MODEL = "gemini-2.5-flash";
    const IMAGE_GEN_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${GEMINI_API_KEY}`;

    // --- Handle image generation (nanobanana) ---
    if (isImageType) {
      const lastUserMessage = messages[messages.length - 1]?.content || "";

      const abortController = new AbortController();
      const timeoutId = setTimeout(() => abortController.abort(), API_TIMEOUT_MS);

      let textResponse;
      try {
        textResponse = await fetch(AI_BASE_URL, {
          method: "POST",
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${GEMINI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: TEXT_MODEL,
            messages: [
              { role: "system", content: systemPrompt },
              ...messages,
            ],
          }),
        });
      } finally {
        clearTimeout(timeoutId);
      }

      if (!textResponse.ok) {
        console.error("Text response error:", await textResponse.text());
        return new Response(JSON.stringify({ error: "Failed to generate response" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const textData = await textResponse.json();
      const briefResponse = textData.choices?.[0]?.message?.content || "";

      const imagePrompt = `${lastUserMessage}. Ultra high resolution, professional quality, highly detailed.`;
      const imageResponse = await fetch(IMAGE_GEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: imagePrompt }] }],
          generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
        }),
      });

      // Increment image usage
      if (usageData) {
        await supabase.from("ai_hub_usage").update({
          images_today: currentImages + 1,
          last_message_at: new Date().toISOString(),
        }).eq("user_id", user.id).eq("date", today);
      } else {
        await supabase.from("ai_hub_usage").insert({
          user_id: user.id,
          date: today,
          messages_today: 0,
          images_today: 1,
        });
      }

      if (!imageResponse.ok) {
        const errText = await imageResponse.text();
        console.error("Image generation error:", errText);
        return new Response(JSON.stringify({
          type: "creative",
          text: briefResponse,
          error: "Image generation failed",
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const imageData = await imageResponse.json();
      console.log("Gemini image response:", JSON.stringify(imageData).slice(0, 500));

      // Gemini 2.0 Flash image generation returns inlineData in content parts
      const parts: Array<{ text?: string; inlineData?: { data: string; mimeType: string } }> =
        imageData.candidates?.[0]?.content?.parts || [];
      const imagePart = parts.find((p) => p.inlineData);
      let imageUrl: string | null = null;

      if (imagePart?.inlineData) {
        const b64 = imagePart.inlineData.data;
        const mimeType = imagePart.inlineData.mimeType || "image/png";
        const ext = mimeType === "image/jpeg" ? "jpg" : "png";
        const fileName = `nanobanana/${user.id}/${Date.now()}.${ext}`;
        const imageBytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

        const { error: uploadError } = await supabase.storage
          .from("generated-images")
          .upload(fileName, imageBytes, { contentType: mimeType, upsert: false });

        if (!uploadError) {
          const { data: publicData } = supabase.storage
            .from("generated-images")
            .getPublicUrl(fileName);
          imageUrl = publicData?.publicUrl || null;
        }

        // Fallback: use data URL so image always displays even without storage bucket
        if (!imageUrl) {
          imageUrl = `data:${mimeType};base64,${b64}`;
        }
      }

      // Save to DB
      const responseContent = imageUrl ? `${briefResponse}\n\n[IMAGE:${imageUrl}]` : briefResponse;
      await supabase.from("chat_messages").insert([
        { user_id: user.id, role: "user", content: lastUserMessage, ai_assistant_type: aiType },
        { user_id: user.id, role: "assistant", content: responseContent, ai_assistant_type: aiType },
      ]);

      return new Response(JSON.stringify({
        type: "creative",
        text: briefResponse,
        imageUrl: imageUrl || null,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // --- Stream text response for all other AI types ---
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
          model: TEXT_MODEL,
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
          ],
          stream: true,
        }),
      });
    } finally {
      clearTimeout(streamTimeoutId);
    }

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Insufficient credits. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Increment message usage
    if (usageData) {
      await supabase.from("ai_hub_usage").update({
        messages_today: currentMessages + 1,
        last_message_at: new Date().toISOString(),
      }).eq("user_id", user.id).eq("date", today);
    } else {
      await supabase.from("ai_hub_usage").insert({
        user_id: user.id,
        date: today,
        messages_today: 1,
        images_today: 0,
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });

  } catch (error) {
    console.error("assistentes-chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

