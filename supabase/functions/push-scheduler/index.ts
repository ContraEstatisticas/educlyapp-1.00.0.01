import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simplified translations for the edge function
const TRANSLATIONS: Record<string, any> = {
  pt: {
    dailyReminderTitle: "Não perca nenhuma novidade!",
    dailyReminder: "Sua lição do dia está te esperando! Apenas 5 minutos é tudo que você precisa.",
    streakAtRiskTitle: "Fogo apagando! 🔥",
    streakAtRisk: "Sua sequência de {{days}} dias está em risco! Não perca seu progresso!",
    welcomeBackTitle: "Sentimos sua falta! 👋",
    welcomeBack: "Já faz um tempo que não te vemos! Volte agora e continue de onde parou.",
  },
  en: {
    dailyReminderTitle: "Don't miss any updates!",
    dailyReminder: "Your daily lesson is waiting for you! Just 5 minutes is all you need.",
    streakAtRiskTitle: "Fire going out! 🔥",
    streakAtRisk: "Your {{days}}-day streak is at risk! Don't lose your progress!",
    welcomeBackTitle: "We miss you! 👋",
    welcomeBack: "It's been a while! Come back and continue where you left off.",
  },
  es: {
    dailyReminderTitle: "¡No te pierdas ninguna novedad!",
    dailyReminder: "¡Tu clase del día te está esperando! Solo 5 minutos es todo lo que necesitas.",
    streakAtRiskTitle: "¡Fuego apagándose! 🔥",
    streakAtRisk: "¡Tu racha de {{days}} días está en riesgo! ¡No pierdas tu progreso!",
    welcomeBackTitle: "¡Te extrañamos! 👋",
    welcomeBack: "¡Hace tiempo que no te vemos! Vuelve y continúa donde lo dejaste.",
  },
  fr: {
    dailyReminderTitle: "Ne manquez aucune nouveauté !",
    dailyReminder: "Votre leçon du jour vous attend ! 5 minutes suffisent.",
    streakAtRiskTitle: "Le feu s'éteint ! 🔥",
    streakAtRisk: "Votre série de {{days}} jours est en danger ! Ne perdez pas votre progression !",
    welcomeBackTitle: "Vous nous manquez ! 👋",
    welcomeBack: "Cela fait longtemps ! Revenez et continuez où vous en étiez.",
  },
};

function getTranslation(lang: string, key: string, replace?: Record<string, string>) {
  const translations = TRANSLATIONS[lang] || TRANSLATIONS.pt;
  let text = translations[key] || TRANSLATIONS.pt[key] || key;
  if (replace) {
    Object.entries(replace).forEach(([k, v]) => {
      text = text.replace(`{{${k}}}`, v);
    });
  }
  return text;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json().catch(() => ({}));
    const { type } = body;

    if (type === "daily_reminder") {
      return await handleDailyReminder(supabase);
    } else if (type === "streak_at_risk") {
      return await handleStreakAtRisk(supabase);
    } else if (type === "welcome_back") {
      return await handleWelcomeBack(supabase);
    } else {
      return new Response(JSON.stringify({ error: "Invalid type" }), { status: 400 });
    }
  } catch (error: unknown) {
    console.error("Scheduler error:", error);
    const msg = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
});

async function handleDailyReminder(supabase: any) {
  // Get all unique users with active push subscriptions and join with profile to get language
  const { data: usersToNotify, error } = await supabase
    .from("push_subscriptions")
    .select(`
      user_id,
      profiles:user_id (preferred_language)
    `);

  if (error) throw error;
  if (!usersToNotify || usersToNotify.length === 0) return new Response(JSON.stringify({ success: true, sent: 0 }));

  // Filter unique users
  const uniqueUsers = Array.from(new Map(usersToNotify.map((u: any) => [u.user_id, u])).values());

  console.log(`Sending daily reminder to ${uniqueUsers.length} users`);

  for (const user of uniqueUsers) {
    const lang = (user as any).profiles?.preferred_language || "pt";
    
    await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-push`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
      },
      body: JSON.stringify({
        user_ids: [(user as any).user_id],
        title: getTranslation(lang, "dailyReminderTitle"),
        body: getTranslation(lang, "dailyReminder"),
        tag: "daily-reminder",
        url: "/dashboard",
      }),
    });
  }

  return new Response(JSON.stringify({ success: true, sent: uniqueUsers.length }));
}

async function handleStreakAtRisk(supabase: any) {
  // Logic: Users with current_streak > 0 who haven't studied today (utc time)
  // We'll use a RPC or direct query
  const todayAtMidnight = new Date();
  todayAtMidnight.setUTCHours(0, 0, 0, 0);

  const { data: riskyUsers, error } = await supabase
    .from("user_streaks")
    .select(`
      user_id,
      current_streak,
      profiles:user_id (preferred_language)
    `)
    .gt("current_streak", 0)
    .lt("last_activity_date", todayAtMidnight.toISOString());

  if (error) throw error;
  if (!riskyUsers || riskyUsers.length === 0) return new Response(JSON.stringify({ success: true, sent: 0 }));

  console.log(`Sending streak at risk warning to ${riskyUsers.length} users`);

  let count = 0;
  for (const user of riskyUsers) {
    // Check if user has push subscription
    const { data: sub } = await supabase
      .from("push_subscriptions")
      .select("id")
      .eq("user_id", user.user_id)
      .limit(1)
      .maybeSingle();

    if (!sub) continue;

    const lang = (user as any).profiles?.preferred_language || "pt";
    count++;

    await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-push`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
      },
      body: JSON.stringify({
        user_ids: [user.user_id],
        title: getTranslation(lang, "streakAtRiskTitle"),
        body: getTranslation(lang, "streakAtRisk", { days: user.current_streak.toString() }),
        tag: "streak-at-risk",
        url: "/dashboard",
      }),
    });
  }

  return new Response(JSON.stringify({ success: true, sent: count }));
}

async function handleWelcomeBack(supabase: any) {
  // Logic: Users who haven't studied in the last 3 days but were active before
  const threeDaysAgo = new Date();
  threeDaysAgo.setUTCDate(threeDaysAgo.getUTCDate() - 3);
  
  const { data: inactiveUsers, error } = await supabase
    .from("user_streaks")
    .select(`
      user_id,
      profiles:user_id (preferred_language)
    `)
    .lt("last_activity_date", threeDaysAgo.toISOString())
    // Additional check to avoid spamming: maybe they were active in the last 7 days but not the last 3
    .gt("last_activity_date", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

  if (error) throw error;
  if (!inactiveUsers || inactiveUsers.length === 0) return new Response(JSON.stringify({ success: true, sent: 0 }));

  let count = 0;
  for (const user of inactiveUsers) {
    const { data: sub } = await supabase
      .from("push_subscriptions")
      .select("id")
      .eq("user_id", user.user_id)
      .limit(1)
      .maybeSingle();

    if (!sub) continue;

    const lang = (user as any).profiles?.preferred_language || "pt";
    count++;

    await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-push`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
      },
      body: JSON.stringify({
        user_ids: [user.user_id],
        title: getTranslation(lang, "welcomeBackTitle"),
        body: getTranslation(lang, "welcomeBack"),
        tag: "welcome-back",
        url: "/dashboard",
      }),
    });
  }

  return new Response(JSON.stringify({ success: true, sent: count }));
}

