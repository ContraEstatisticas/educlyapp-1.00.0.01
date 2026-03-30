import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const OPENROUTER_BASE_URL =
  Deno.env.get("OPENROUTER_BASE_URL")?.trim() || "https://openrouter.ai/api/v1";
const OPENROUTER_APP_NAME =
  Deno.env.get("OPENROUTER_APP_NAME")?.trim() || "Educly Big Action";
const OPENROUTER_HTTP_REFERER =
  Deno.env.get("OPENROUTER_HTTP_REFERER")?.trim() || "https://educly.app";
const OPENROUTER_MODEL_CLAUDE =
  Deno.env.get("OPENROUTER_MODEL_CLAUDE")?.trim() || "anthropic/claude-3-haiku";

type BigActionRow = {
  completed_at: string | null;
  completed_trail_count_snapshot: number;
  created_at: string;
  error_message: string | null;
  generated_at: string | null;
  generation_language: string | null;
  id: string;
  metadata: Record<string, unknown> | null;
  progress_source: string;
  professional_area: string | null;
  ready_prompt: string | null;
  status: string;
  steps: unknown;
  title: string | null;
  unlock_at_trail_count: number;
  updated_at: string;
  user_id: string;
  what_to_create: string | null;
};

type BigActionHistoryRow = {
  generated_at: string | null;
  id: string;
  metadata: Record<string, unknown> | null;
  professional_area: string | null;
  title: string | null;
  what_to_create: string | null;
};

type GenerateRequestBody = {
  force?: boolean;
  language?: string | null;
};

type GeneratedBigActionPayload = {
  ready_prompt: string;
  steps: string[];
  title: string;
  what_to_create: string;
};

const buildOpenRouterHeaders = (apiKey: string): Record<string, string> => {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  if (OPENROUTER_HTTP_REFERER) {
    headers["HTTP-Referer"] = OPENROUTER_HTTP_REFERER;
  }

  if (OPENROUTER_APP_NAME) {
    headers["X-Title"] = OPENROUTER_APP_NAME;
  }

  return headers;
};

const normalizeOpenRouterText = (content: unknown): string => {
  if (typeof content === "string") return content.trim();
  if (!Array.isArray(content)) return "";

  return content
    .map((part) => {
      if (typeof part === "string") return part;
      if (!part || typeof part !== "object") return "";

      const typedPart = part as Record<string, unknown>;
      return typedPart.type === "text" && typeof typedPart.text === "string"
        ? typedPart.text
        : "";
    })
    .filter(Boolean)
    .join("\n")
    .trim();
};

const normalizeLanguage = (value?: string | null) => {
  const normalizedValue = value?.trim() || "";
  return normalizedValue.length ? normalizedValue : "pt-BR";
};

const getProgressSourceInstruction = (value?: string | null) => {
  if (value === "challenge_day") {
    return "The activity was unlocked after 4 completed days in the 28-day challenge.";
  }

  return "The activity was unlocked after 4 completed modules in the specialized AI trails.";
};

const getLanguageInstruction = (language: string) => {
  const baseLanguage = language.split("-")[0].toLowerCase();

  switch (baseLanguage) {
    case "pt":
      return "Return the full activity in Brazilian Portuguese.";
    case "en":
      return "Return the full activity in English.";
    case "es":
      return "Return the full activity in Spanish.";
    case "fr":
      return "Return the full activity in French.";
    default:
      return `Return the full activity in the requested language (${language}).`;
  }
};

const extractJsonObject = (content: string) => {
  const cleanedContent = content
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleanedContent) as Record<string, unknown>;
  } catch {
    const startIndex = cleanedContent.indexOf("{");
    const endIndex = cleanedContent.lastIndexOf("}");

    if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
      return null;
    }

    try {
      return JSON.parse(cleanedContent.slice(startIndex, endIndex + 1)) as Record<string, unknown>;
    } catch {
      return null;
    }
  }
};

const sanitizeTextValue = (value: unknown, maxLength: number) => {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
};

const sanitizePromptValue = (value: unknown, maxLength: number) => {
  if (typeof value !== "string") return "";

  return value
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, maxLength);
};

const sanitizeSteps = (value: unknown) => {
  if (!Array.isArray(value)) return [];

  return value
    .map((step) => sanitizeTextValue(step, 260))
    .filter(Boolean)
    .slice(0, 5);
};

const sanitizeGeneratedPayload = (value: Record<string, unknown> | null): GeneratedBigActionPayload | null => {
  if (!value) return null;

  const title = sanitizeTextValue(value.title, 120);
  const whatToCreate = sanitizeTextValue(value.what_to_create, 220);
  const steps = sanitizeSteps(value.steps);
  const readyPrompt = sanitizePromptValue(value.ready_prompt, 6000);

  if (!title || !whatToCreate || steps.length < 3 || !readyPrompt) {
    return null;
  }

  return {
    ready_prompt: readyPrompt,
    steps,
    title,
    what_to_create: whatToCreate,
  };
};

const buildHistorySummary = (history: BigActionHistoryRow[]) => {
  if (!history.length) {
    return "No previous Big Actions were generated yet.";
  }

  return history
    .map((item, index) => {
      const title = item.title?.trim() || "Untitled activity";
      const output = item.what_to_create?.trim() || "Unspecified output";
      const area = item.professional_area?.trim() || "Unknown area";
      return `${index + 1}. Area: ${area}. Title: ${title}. Output: ${output}.`;
    })
    .join("\n");
};

const createErrorResponse = (status: number, message: string, extra?: Record<string, unknown>) =>
  new Response(JSON.stringify({ error: message, ...(extra || {}) }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  let supabase:
    | ReturnType<typeof createClient>
    | null = null;
  let activeBigAction: BigActionRow | null = null;

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return createErrorResponse(401, "Missing authorization header.");
    }

    const token = authHeader.replace("Bearer ", "");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const openRouterApiKey = Deno.env.get("OPENROUTER_API_KEY")?.trim();

    if (!openRouterApiKey) {
      return createErrorResponse(500, "OPENROUTER_API_KEY is not configured.");
    }

    supabase = createClient(supabaseUrl, supabaseServiceKey);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return createErrorResponse(401, "Unauthorized.");
    }

    const requestBody = (await req.json().catch(() => ({}))) as GenerateRequestBody;
    const forceRegeneration = requestBody.force === true;

    const [{ data: profile, error: profileError }, { data: currentAction, error: actionError }] =
      await Promise.all([
        supabase
          .from("profiles")
          .select("professional_area, preferred_language")
          .eq("id", user.id)
          .maybeSingle(),
        supabase
          .from("user_big_actions")
          .select("*")
          .eq("user_id", user.id)
          .is("completed_at", null)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
      ]);

    if (profileError) {
      throw profileError;
    }

    if (actionError) {
      throw actionError;
    }

    activeBigAction = (currentAction as BigActionRow | null) || null;

    if (!activeBigAction) {
      return createErrorResponse(404, "No active Big Action was found.");
    }

    const professionalArea =
      activeBigAction.professional_area?.trim() ||
      profile?.professional_area?.trim() ||
      "";

    if (!professionalArea) {
      const { data: updatedAction, error: updateError } = await supabase
        .from("user_big_actions")
        .update({
          professional_area: null,
          status: "needs_area",
        })
        .eq("id", activeBigAction.id)
        .eq("user_id", user.id)
        .select("*")
        .single();

      if (updateError) {
        throw updateError;
      }

      activeBigAction = updatedAction as BigActionRow;

      return createErrorResponse(400, "Professional area is required before generating the activity.", {
        action: activeBigAction,
        success: false,
      });
    }

    if (
      !forceRegeneration &&
      activeBigAction.status === "ready" &&
      activeBigAction.title &&
      activeBigAction.what_to_create &&
      activeBigAction.ready_prompt
    ) {
      return new Response(
        JSON.stringify({
          action: activeBigAction,
          alreadyReady: true,
          success: true,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const generationLanguage = normalizeLanguage(
      requestBody.language || activeBigAction.generation_language || profile?.preferred_language,
    );

    const { error: pendingError } = await supabase
      .from("user_big_actions")
      .update({
        error_message: null,
        generation_language: generationLanguage,
        professional_area: professionalArea,
        status: "pending_generation",
      })
      .eq("id", activeBigAction.id)
      .eq("user_id", user.id);

    if (pendingError) {
      throw pendingError;
    }

    const { data: previousActionsRaw, error: previousActionsError } = await supabase
      .from("user_big_actions")
      .select("id, title, what_to_create, professional_area, generated_at, metadata")
      .eq("user_id", user.id)
      .order("generated_at", { ascending: false })
      .limit(6);

    if (previousActionsError) {
      throw previousActionsError;
    }

    const previousActions = ((previousActionsRaw || []) as BigActionHistoryRow[])
      .filter((item) => item.id !== activeBigAction.id && item.generated_at)
      .slice(0, 3);

    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: buildOpenRouterHeaders(openRouterApiKey),
      body: JSON.stringify({
        model: OPENROUTER_MODEL_CLAUDE,
        temperature: 0.9,
        user: user.id,
        messages: [
          {
            role: "system",
            content: [
              "You create short, high-impact practical activities for adult learners using AI at work.",
              "Every activity must feel concrete, useful, and directly applicable to the user's current job.",
              "The final output must be tangible and easy to produce in a single focused session.",
              "Always avoid generic school-like homework.",
              "Return valid JSON only with this exact shape:",
              '{"title":"string","what_to_create":"string","steps":["step 1","step 2","step 3"],"ready_prompt":"string"}',
              getLanguageInstruction(generationLanguage),
            ].join("\n"),
          },
          {
            role: "user",
            content: [
              `Professional area: ${professionalArea}`,
              getProgressSourceInstruction(activeBigAction.progress_source),
              `Current cycle unlock target: ${activeBigAction.unlock_at_trail_count} completed progress items in this journey.`,
              "Goal: create a guided Big Action where the learner uses AI to produce something real for work and experiences an immediate wow effect.",
              "Requirements:",
              "- Return a title for the activity.",
              "- Explain what the learner will create today.",
              "- Provide 3 to 5 practical steps.",
              "- Provide one ready-to-use prompt for GPT or Claude.",
              "- The output must be specific to the professional area.",
              "- The result must be visibly useful in the user's work routine.",
              "- The activity must be different from the previous Big Actions below.",
              "- Avoid repeating the same artifact type, angle, or workflow.",
              "Previous Big Actions to avoid repeating:",
              buildHistorySummary(previousActions),
            ].join("\n"),
          },
        ],
      }),
    });

    if (!response.ok) {
      const responseText = await response.text();
      throw new Error(`AI generation failed (${response.status}): ${responseText}`);
    }

    const responseData = await response.json();
    const generatedContent = normalizeOpenRouterText(responseData.choices?.[0]?.message?.content);
    const parsedPayload = sanitizeGeneratedPayload(extractJsonObject(generatedContent));

    if (!parsedPayload) {
      throw new Error("The AI response did not contain a valid Big Action payload.");
    }

    const nextMetadata = {
      ...(activeBigAction.metadata || {}),
      generation_language: generationLanguage,
      generation_source: "openrouter",
      generated_with_model: OPENROUTER_MODEL_CLAUDE,
      history_titles: previousActions
        .map((item) => item.title || item.what_to_create)
        .filter(Boolean),
      prompt_version: "big_action_v1",
    };

    const { data: readyAction, error: readyError } = await supabase
      .from("user_big_actions")
      .update({
        error_message: null,
        generated_at: new Date().toISOString(),
        generation_language: generationLanguage,
        metadata: nextMetadata,
        professional_area: professionalArea,
        ready_prompt: parsedPayload.ready_prompt,
        status: "ready",
        steps: parsedPayload.steps,
        title: parsedPayload.title,
        what_to_create: parsedPayload.what_to_create,
      })
      .eq("id", activeBigAction.id)
      .eq("user_id", user.id)
      .select("*")
      .single();

    if (readyError) {
      throw readyError;
    }

    return new Response(
      JSON.stringify({
        action: readyAction,
        success: true,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("generate-big-action error:", error);

    if (supabase && activeBigAction?.id) {
      const message = error instanceof Error ? error.message.slice(0, 500) : "Unknown generation error";

      await supabase
        .from("user_big_actions")
        .update({
          error_message: message,
          status: "generation_error",
        })
        .eq("id", activeBigAction.id)
        .eq("user_id", activeBigAction.user_id);
    }

    return createErrorResponse(
      500,
      error instanceof Error ? error.message : "Unknown error",
      { success: false },
    );
  }
});
