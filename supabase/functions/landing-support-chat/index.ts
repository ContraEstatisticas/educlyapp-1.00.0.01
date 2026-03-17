import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 3600000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 15; // Max requests per IP per hour

// Language names for instruction
const languageNames: Record<string, string> = {
  pt: 'PortuguÃªs',
  en: 'English',
  es: 'EspaÃ±ol',
  fr: 'FranÃ§ais',
  de: 'Deutsch',
  it: 'Italiano',
  ru: 'Ð ÑƒÑÑÐºÐ¸Ð¹',
  zh: 'ä¸­æ–‡',
  ja: 'æ—¥æœ¬èªž',
  ko: 'í•œêµ­ì–´',
  ar: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©',
  hi: 'à¤¹à¤¿à¤¨à¥à¤¦à¥€',
  tr: 'TÃ¼rkÃ§e',
  pl: 'Polski',
  nl: 'Nederlands'
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

const LANDING_QUICK_REPLY_RULES: QuickReplyRule[] = [
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
      pt: "Os valores e planos ficam em https://educly.app/plan . Se quiser, eu te explico qual plano combina melhor com seu objetivo.",
      en: "You can check pricing and plans at https://educly.app/plan . If you want, I can help you choose the best plan for your goal.",
      es: "Puedes ver precios y planes en https://educly.app/plan . Si quieres, tambien puedo ayudarte a elegir el mejor plan para tu objetivo.",
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
      pt: "Voce pode falar com nosso suporte em https://educly.app/contato ou por email em contact@educly.app.",
      en: "You can reach our support team at https://educly.app/contato or by email at contact@educly.app.",
      es: "Puedes hablar con soporte en https://educly.app/contato o por email en contact@educly.app.",
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
      pt: "Oi! Eu sou o EDI. Posso te ajudar com planos, suporte e duvidas sobre a plataforma. Me diz o que voce precisa.",
      en: "Hi! I am EDI. I can help with plans, support, and platform questions. Tell me what you need.",
      es: "Hola! Soy EDI. Puedo ayudarte con planes, soporte y dudas de la plataforma. Dime que necesitas.",
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

const getQuickReplyLanguage = (locale: string): QuickReplyLang => {
  const normalized = locale.toLowerCase().split("-")[0].split("_")[0];
  if ((QUICK_REPLY_SUPPORTED_LANGS as readonly string[]).includes(normalized)) return normalized as QuickReplyLang;
  return "en";
};

const getLandingKeywordQuickReply = (
  userMessagesText: string,
  locale: string
): { ruleId: string; response: string } | null => {
  if (!userMessagesText) return null;

  const normalizedMessage = normalizeKeywordText(userMessagesText);
  if (!normalizedMessage) return null;

  const quickReplyLanguage = getQuickReplyLanguage(locale);

  for (const rule of LANDING_QUICK_REPLY_RULES) {
    const matched = rule.keywords.some((keyword) => {
      const normalizedKeyword = normalizeKeywordText(keyword);
      if (!normalizedKeyword) return false;

      const keywordPattern = normalizedKeyword
        .split(" ")
        .filter(Boolean)
        .map((token) => escapeRegExp(token))
        .join("\\s+");
      const boundaryRegex = new RegExp(`(^|\\s)${keywordPattern}(?=\\s|$)`);

      return boundaryRegex.test(normalizedMessage) || normalizedMessage.includes(normalizedKeyword);
    });

    if (matched) {
      return {
        ruleId: rule.id,
        response: rule.responses[quickReplyLanguage] || rule.responses.en,
      };
    }
  }

  return null;
};

const getSystemPrompt = (language: string): string => {
  const langName = languageNames[language] || 'English';
  
  return `You are EDI, the support assistant for Educly, a practical AI tools learning platform.

## YOUR MISSION
Help visitors understand Educly and guide them to become students.

## WHAT IS EDUCLY
- Practical teaching platform for 8 AI tools
- 28-day challenge with 10-15 minute daily lessons
- Tools: ChatGPT, Claude, DeepSeek, Gemini, NanoBanana, Lovable, Captions, ElevenLabs
- Over 50,000 students in 150+ countries
- 4.9/5 star rating
- We teach how to use AI and also show where to find AI jobs

## SPECIAL INFO
- We're a gamified platform, instead of teaching languages, we teach AI
- Besides learning AI, we teach how to work with AI to earn money
- We always prioritize student development and encourage evolution

## RULES
âœ… Be friendly, helpful and human-like
âœ… Answer clearly and concisely
âœ… Highlight Educly benefits
âœ… If asked about pricing, tell them to check the bottom of the landing page for plans
âœ… Encourage starting the challenge
âœ… CRITICAL: Always detect the user's language from their message OR from the browser detection
âœ… CRITICAL: Always respond in the SAME LANGUAGE the user writes to you - if they write in English, respond in English; if they write in Spanish, respond in Spanish; etc.
âœ… Avoid being pushy - make it clear you're support for questions. Sell as a last resort!
âœ… Talk about our AI hub and premium area with AI jobs

## HUMAN CONTACT
âš ï¸ If the user wants to talk to a human, personalized service, or more detailed support, direct them to email: contact@educly.app
- Say something like: "To speak with our human support team, send an email to contact@educly.app and we'll respond within 24-48 hours."

âŒ NEVER make up information
âŒ NEVER talk about tools outside Educly
âŒ NEVER be aggressive in selling
âŒ NEVER mention competitors or similar apps

**CRITICAL LANGUAGE RULE: The user's browser language is ${langName}, but MORE IMPORTANTLY, you MUST respond in whatever language the user actually writes their message in. If they write in Portuguese, respond in Portuguese. If they write in French, respond in French. Always match the user's message language.**`;
};

function buildSseFallbackResponse(message: string): Response {
  const sseChunk = JSON.stringify({
    choices: [{ delta: { content: message } }],
  });
  const ssePayload = `data: ${sseChunk}\n\ndata: [DONE]\n\n`;

  return new Response(ssePayload, {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client with service role for rate limiting
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Extract client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    // Check rate limit
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
    
    const { data: rateLimitData, error: rateLimitError } = await supabase
      .from('landing_chat_rate_limits')
      .select('request_count, window_start')
      .eq('ip_address', clientIP)
      .gte('window_start', windowStart)
      .maybeSingle();

    if (rateLimitError) {
      console.error("Rate limit check error:", rateLimitError);
      // Continue without rate limiting if there's an error checking
    } else if (rateLimitData && rateLimitData.request_count >= MAX_REQUESTS_PER_WINDOW) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(JSON.stringify({ 
        error: "Too many requests. Please try again later." 
      }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse and validate request body
    const body = await req.json();

    // Input validation for messages
    if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > 30) {
      return new Response(JSON.stringify({ error: "Invalid messages: must be array with 1-30 items" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate each message
    for (const msg of body.messages) {
      if (!msg || typeof msg.content !== 'string' || msg.content.length === 0 || msg.content.length > 5000) {
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

    // Validate locale
    if (body.locale && (typeof body.locale !== 'string' || !/^[a-z]{2}(-[A-Z]{2})?$/.test(body.locale))) {
      return new Response(JSON.stringify({ error: "Invalid locale format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const messages = body.messages;
    const locale = body.locale || 'en';
    
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

    // Update rate limit counter (upsert)
    if (rateLimitData) {
      // Update existing record
      await supabase
        .from('landing_chat_rate_limits')
        .update({ 
          request_count: rateLimitData.request_count + 1 
        })
        .eq('ip_address', clientIP);
    } else {
      // Insert new record or update if exists (handles race conditions)
      await supabase
        .from('landing_chat_rate_limits')
        .upsert({ 
          ip_address: clientIP,
          request_count: 1,
          window_start: new Date().toISOString()
        }, {
          onConflict: 'ip_address'
        });
    }

    const lastUserMessage =
      [...messages].reverse().find((m: { role: string; content: string }) => m.role === "user")?.content || "";

    const quickReplyMatch = getLandingKeywordQuickReply(lastUserMessage, locale);
    if (quickReplyMatch) {
      console.log(`Returning landing quick reply rule=${quickReplyMatch.ruleId} locale=${locale} ip=${clientIP}`);
      return buildSseFallbackResponse(quickReplyMatch.response);
    }

    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY not configured");
      return buildSseFallbackResponse("Servico de IA temporariamente indisponivel. Tente novamente mais tarde.");
    }

    console.log("Processing support chat request with locale:", locale, "from IP:", clientIP);
    console.log("Number of messages:", messages.length);

    const systemPrompt = getSystemPrompt(locale);

    const endpoint = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
    const headers = {
      Authorization: `Bearer ${GEMINI_API_KEY}`,
      "Content-Type": "application/json",
    };
    const basePayload = {
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      stream: true,
      max_tokens: 400,
    };

    const modelCandidates = ["gemini-2.5-flash"];
    let selectedModel = modelCandidates[0];
    let response: Response | null = null;
    let lastErrorText = "";
    let lastStatus = 0;

    for (const model of modelCandidates) {
      selectedModel = model;
      response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: selectedModel,
          ...basePayload,
        }),
      });

      if (response.ok) break;

      lastStatus = response.status;
      lastErrorText = await response.text();
      console.warn(`Gemini model failed [${response.status}] model=${selectedModel}:`, lastErrorText);

      // Do not retry with another model on hard rate-limit.
      if (response.status === 429) break;
    }

    if (!response || !response.ok) {
      console.error(`Gemini API error [${lastStatus}] model=${selectedModel}:`, lastErrorText);
      
      if (lastStatus === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Fallback to a synthetic SSE response to avoid frontend runtime failures/blank screens.
      const fallbackText = "NÃ£o foi possÃ­vel processar sua mensagem no momento. Tente novamente em instantes.";
      return buildSseFallbackResponse(fallbackText);
    }

    console.log("Streaming response from AI gateway");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Support chat error:", error);
    return buildSseFallbackResponse("Ocorreu um erro inesperado. Por favor, tente novamente.");
  }
});

