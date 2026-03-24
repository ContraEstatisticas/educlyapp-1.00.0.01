import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, RotateCcw, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatPremiumGate } from "@/components/chat/ChatPremiumGate";
import { AssistantsTutorial } from "@/components/onboarding";
import { ProductGuard } from "@/components/ProductGuard";
import { MobileNav } from "@/components/MobileNav";
import { AIModelSelector, AI_MODELS } from "@/components/assistentes/AIModelSelector";
import { AISidebar } from "@/components/assistentes/AISidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { Database } from "@/integrations/supabase/types";
import { tUi } from "@/lib/supplementalUiTranslations";
import {
  AI_HUB_BASE_DAILY_IMAGE_LIMIT,
  AI_HUB_BASE_DAILY_MESSAGE_LIMIT,
  getAiHubDailyLimits,
  hasWhitelistedAiHubAccess,
} from "@/lib/aiHubConfig";

import nanobananaLogo from "@/assets/ai-logos/nanobanana.png";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const MAX_CONTEXT_MESSAGES = 24;
const MAX_PERSISTED_HISTORY_MESSAGES = 100;
const GREETING_MESSAGE_ID = "greeting";
const AI_HUB_CHAT_CONTEXT = "assistentes_hub";
const ASSISTANTS_MODE_STORAGE_KEY = "educly-assistants-mode";
const ASSISTANTS_MODEL_STORAGE_KEY = "educly-assistants-model";

type PersistedChatMessage = Pick<
  Database["public"]["Tables"]["chat_messages"]["Row"],
  "id" | "role" | "content" | "created_at"
>;

const buildGreetingMessage = (
  aiType: string,
  t: (key: string) => string,
): Message => ({
  id: GREETING_MESSAGE_ID,
  role: "assistant",
  content: t(`assistants.${aiType}.greeting`),
});

const stripImagePayload = (content: string) =>
  content.replace(/\[IMAGE:(https?:\/\/[^\]]+|data:image\/[^;]+;base64,[^\]]+)\]/g, "").trim();

const sortPersistedMessages = (chatMessages: PersistedChatMessage[]) =>
  [...chatMessages].sort((first, second) => {
    const firstTime = first.created_at ? new Date(first.created_at).getTime() : 0;
    const secondTime = second.created_at ? new Date(second.created_at).getTime() : 0;

    if (firstTime !== secondTime) {
      return firstTime - secondTime;
    }

    if (first.role === second.role) {
      return 0;
    }

    return first.role === "user" ? -1 : 1;
  });

const getAssistantsHistoryStorageKey = (userId: string, aiType: string) =>
  `educly-assistants-history:v2:${userId}:${aiType}:${AI_HUB_CHAT_CONTEXT}`;

const readCachedAssistantMessages = (userId: string, aiType: string): Message[] => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(getAssistantsHistoryStorageKey(userId, aiType));
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (message): message is Message =>
          message &&
          typeof message.id === "string" &&
          (message.role === "user" || message.role === "assistant") &&
          typeof message.content === "string",
      )
      .slice(-100);
  } catch {
    return [];
  }
};

const getStoredAssistantsMode = (): "chat" | "creative" => {
  if (typeof window === "undefined") return "chat";

  const storedMode = window.localStorage.getItem(ASSISTANTS_MODE_STORAGE_KEY);
  return storedMode === "creative" ? "creative" : "chat";
};

const getStoredAssistantsModel = (): string => {
  if (typeof window === "undefined") return "chatgpt";

  const storedModel = window.localStorage.getItem(ASSISTANTS_MODEL_STORAGE_KEY);
  return AI_MODELS.some((model) => model.id === storedModel) ? String(storedModel) : "chatgpt";
};

const AssistentesContent = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const { isPremium, isLoading: premiumLoading, checkoutUrl } = usePremiumAccess();
  const isMobile = useIsMobile();

  const [mode, setMode] = useState<"chat" | "creative">(() => getStoredAssistantsMode());
  const [activeModel, setActiveModel] = useState(() => getStoredAssistantsModel());
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesAssistantType, setMessagesAssistantType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [usageToday, setUsageToday] = useState(0);
  const [imagesUsed, setImagesUsed] = useState(0);
  const [messageLimit, setMessageLimit] = useState(AI_HUB_BASE_DAILY_MESSAGE_LIMIT);
  const [imageLimit, setImageLimit] = useState(AI_HUB_BASE_DAILY_IMAGE_LIMIT);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentAiType = mode === "creative" ? "nanobanana" : activeModel;

  // Get logo for current AI
  const getCurrentLogo = () => {
    if (mode === "creative") return nanobananaLogo;
    const model = AI_MODELS.find((m) => m.id === activeModel);
    return model?.logoSrc || AI_MODELS[0].logoSrc;
  };

  // Auth check + usage fetch
  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/auth"); return; }
      setCurrentUserId(user.id);
      const today = new Date().toISOString().split("T")[0];
      const [{ data: usageData, error: usageError }, { data: products, error: productsError }, { data: levelData, error: levelError }] = await Promise.all([
        supabase
          .from("ai_hub_usage")
          .select("messages_today, images_today")
          .eq("user_id", user.id)
          .eq("date", today)
          .maybeSingle(),
        supabase.rpc("get_user_products"),
        supabase
          .from("user_levels")
          .select("current_level")
          .eq("user_id", user.id)
          .maybeSingle(),
      ]);

      if (usageError) {
        console.error("Error loading AI Hub usage:", usageError);
      }

      if (productsError) {
        console.error("Error loading AI Hub products:", productsError);
      }

      if (levelError) {
        console.error("Error loading user level for AI Hub limits:", levelError);
      }

      setUsageToday(usageData?.messages_today || 0);
      setImagesUsed(usageData?.images_today || 0);

      const hasAiHubAccess =
        hasWhitelistedAiHubAccess(user.email) ||
        (products || []).some((product) => product.product_type === "ai_hub");
      const currentLevel = levelData?.current_level || 1;
      const limits = getAiHubDailyLimits({ currentLevel, hasAiHubAccess });

      setMessageLimit(limits.messageLimit);
      setImageLimit(limits.imageLimit);
    };
    init();
  }, [navigate]);

  // Load persisted history for the active assistant
  useEffect(() => {
    if (!isPremium) return;

    let cancelled = false;

    const loadPersistedHistory = async () => {
      setIsHistoryLoading(true);
      setMessagesAssistantType(null);
      setMessages([]);

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || cancelled) return;
        setCurrentUserId(user.id);

        const cachedMessages = readCachedAssistantMessages(user.id, currentAiType);
        if (cachedMessages.length > 0) {
          setMessagesAssistantType(currentAiType);
          setMessages(cachedMessages);
        }

        let query = supabase
          .from("chat_messages")
          .select("id, role, content, created_at")
          .eq("user_id", user.id)
          .eq("ai_assistant_type", currentAiType)
          .order("created_at", { ascending: false })
          .limit(MAX_PERSISTED_HISTORY_MESSAGES);

        query = currentAiType === "edi"
          ? query.eq("ai_tool_context", AI_HUB_CHAT_CONTEXT)
          : query.or(`ai_tool_context.eq.${AI_HUB_CHAT_CONTEXT},ai_tool_context.is.null`);

        const { data, error } = await query;

        if (cancelled) return;

        if (error) {
          console.error("Error loading assistant history:", error);
          toast({ title: t("chat.error.sendError"), variant: "destructive" });
          setMessagesAssistantType(currentAiType);
          setMessages(
            cachedMessages.length > 0
              ? cachedMessages
              : [buildGreetingMessage(currentAiType, t)],
          );
          return;
        }

        const persistedMessages = sortPersistedMessages(data ?? []).map((message): Message => ({
          id: message.id,
          role: message.role === "user" ? "user" : "assistant",
          content: message.content,
        }));

        setMessages(
          persistedMessages.length > 0
            ? persistedMessages
            : cachedMessages.length > 0
              ? cachedMessages
              : [buildGreetingMessage(currentAiType, t)],
        );
        setMessagesAssistantType(currentAiType);
      } finally {
        if (!cancelled) {
          setIsHistoryLoading(false);
        }
      }
    };

    void loadPersistedHistory();

    return () => {
      cancelled = true;
    };
  }, [currentAiType, isPremium, t, toast]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleModelChange = (modelId: string) => {
    setActiveModel(modelId);
  };

  const handleModeChange = (newMode: "chat" | "creative") => {
    setMode(newMode);
    setSidebarOpen(false);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(ASSISTANTS_MODE_STORAGE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(ASSISTANTS_MODEL_STORAGE_KEY, activeModel);
  }, [activeModel]);

  useEffect(() => {
    if (typeof window === "undefined" || !currentUserId || isHistoryLoading) return;
    if (messagesAssistantType !== currentAiType) return;

    const storageKey = getAssistantsHistoryStorageKey(currentUserId, currentAiType);
    const messagesToCache = messages.filter((message) => message.id !== GREETING_MESSAGE_ID).slice(-100);

    try {
      if (messagesToCache.length === 0) {
        window.localStorage.removeItem(storageKey);
        return;
      }

      window.localStorage.setItem(storageKey, JSON.stringify(messagesToCache));
    } catch (error) {
      console.error("Error caching assistant history locally:", error);
    }
  }, [currentAiType, currentUserId, isHistoryLoading, messages, messagesAssistantType]);

  const sendMessage = async (input: string) => {
    if (!input.trim() || isLoading || isHistoryLoading) return;
    const userMessage: Message = { id: `user-${Date.now()}`, role: "user", content: input.trim() };
    setMessagesAssistantType(currentAiType);
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({ title: t("chat.error.notLoggedIn"), variant: "destructive" });
        return;
      }

      const apiMessages = messages
        .filter((m) => m.id !== GREETING_MESSAGE_ID)
        .concat(userMessage)
        .map((m) => ({ role: m.role, content: stripImagePayload(m.content) }))
        .filter((m) => m.content.length > 0)
        .slice(-MAX_CONTEXT_MESSAGES);

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/assistentes-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            messages: apiMessages,
            aiType: currentAiType,
            language: i18n.language,
            chatContext: AI_HUB_CHAT_CONTEXT,
          }),
        }
      );

      if (!response.ok) {
        let errorMsg = t("chat.error.sendError");
        try {
          const err = await response.json();
          if (err?.error) errorMsg = err.error;
        } catch {
          errorMsg = t("chat.error.sendError");
        }
        if (response.status === 429) errorMsg = t("assistants.rateLimit.message");
        toast({ title: errorMsg, variant: "destructive" });
        setIsLoading(false);
        return;
      }

      // Image response (nanobanana)
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const data = await response.json();
        if (data.type === "creative") {
          const content = data.imageUrl ? `${data.text}\n\n[IMAGE:${data.imageUrl}]` : data.text;
          setMessages((prev) => [...prev, { id: `assistant-${Date.now()}`, role: "assistant", content }]);
          setImagesUsed((p) => p + 1);
          setIsLoading(false);
          return;
        }
      }

      // Stream text
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages((prev) => [...prev, { id: `assistant-${Date.now()}`, role: "assistant", content: "" }]);

      if (reader) {
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let newlineIndex: number;
          while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
            let line = buffer.slice(0, newlineIndex);
            buffer = buffer.slice(newlineIndex + 1);
            if (line.endsWith("\r")) line = line.slice(0, -1);
            if (line.startsWith(":") || line.trim() === "") continue;
            if (!line.startsWith("data: ")) continue;
            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") break;
            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content as string | undefined;
              if (content) {
                assistantContent += content;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const last = newMessages[newMessages.length - 1];
                  if (last?.role === "assistant") last.content = assistantContent;
                  return newMessages;
                });
              }
            } catch {
              buffer = line + "\n" + buffer;
              break;
            }
          }
        }
      }

      setUsageToday((p) => p + 1);

      // Save to DB
      const { data: { user } } = await supabase.auth.getUser();
      if (user && assistantContent) {
        const baseTimestamp = Date.now();
        const { error: persistError } = await supabase.from("chat_messages").insert([
          {
            user_id: user.id,
            role: "user",
            content: userMessage.content,
            ai_assistant_type: currentAiType,
            ai_tool_context: AI_HUB_CHAT_CONTEXT,
            created_at: new Date(baseTimestamp).toISOString(),
          },
          {
            user_id: user.id,
            role: "assistant",
            content: assistantContent,
            ai_assistant_type: currentAiType,
            ai_tool_context: AI_HUB_CHAT_CONTEXT,
            created_at: new Date(baseTimestamp + 1).toISOString(),
          },
        ]);
        if (persistError) {
          console.error("Error saving assistant history:", persistError);
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast({ title: t("chat.error.sendError"), variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = async () => {
    if (isLoading || isHistoryLoading) return;

    setIsHistoryLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      let deleteQuery = supabase
        .from("chat_messages")
        .delete()
        .eq("user_id", user.id)
        .eq("ai_assistant_type", currentAiType);

      deleteQuery = currentAiType === "edi"
        ? deleteQuery.eq("ai_tool_context", AI_HUB_CHAT_CONTEXT)
        : deleteQuery.or(`ai_tool_context.eq.${AI_HUB_CHAT_CONTEXT},ai_tool_context.is.null`);

      const { error } = await deleteQuery;

      if (error) {
        throw error;
      }

      if (typeof window !== "undefined") {
        window.localStorage.removeItem(getAssistantsHistoryStorageKey(user.id, currentAiType));
      }

      setMessagesAssistantType(currentAiType);
      setMessages([buildGreetingMessage(currentAiType, t)]);
    } catch (error) {
      console.error("Error clearing assistant history:", error);
      toast({ title: t("chat.error.sendError"), variant: "destructive" });
    } finally {
      setIsHistoryLoading(false);
    }
  };

  if (premiumLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isPremium) {
    return (
      <div className="min-h-screen bg-background safe-area-inset">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("common.back")}
          </Button>
          <ChatPremiumGate />
        </div>
      </div>
    );
  }

  const sidebarContent = (
    <AISidebar
      mode={mode}
      onModeChange={handleModeChange}
      usageToday={usageToday}
      imagesUsed={imagesUsed}
      messageLimit={messageLimit}
      imageLimit={imageLimit}
    />
  );

  const visibleMessages = messagesAssistantType === currentAiType ? messages : [];

  const currentName = mode === "creative"
    ? t("assistants.nanobanana.name")
    : t(AI_MODELS.find((m) => m.id === activeModel)?.nameKey || "assistants.chatgpt.name");

  return (
    <div className="h-[100dvh] bg-background flex overflow-hidden">
      <AssistantsTutorial />

      {/* Desktop sidebar */}
      {!isMobile && sidebarContent}

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="sticky top-0 z-10 px-3 py-2.5 border-b border-border bg-card/80 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {/* Mobile hamburger */}
              {isMobile && (
                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Menu className="w-4 h-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="p-0 w-[220px]">
                    {sidebarContent}
                  </SheetContent>
                </Sheet>
              )}

              {/* Model selector or creative label */}
              {mode === "chat" ? (
                <AIModelSelector activeModel={activeModel} onSelect={handleModelChange} />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl overflow-hidden p-1 bg-amber-500/10">
                    <img src={nanobananaLogo} alt="NanoBanana" className="w-full h-full object-contain rounded-lg" />
                  </div>
                  <span className="font-semibold text-sm text-foreground">{t("assistants.nanobanana.name")}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1">
              {/* Usage pill */}
              <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full hidden sm:block">
                {mode === "creative"
                  ? `🎨 ${Math.round((imagesUsed / Math.max(imageLimit, 1)) * 100)}%`
                  : `💬 ${Math.round((usageToday / Math.max(messageLimit, 1)) * 100)}%`}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-2 rounded-full px-3 text-xs sm:text-sm"
                onClick={() => void clearChat()}
                disabled={isHistoryLoading || isLoading}
                aria-label={tUi(t, i18n.language, "chat.newConversationHint")}
                title={tUi(t, i18n.language, "chat.newConversationHint")}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{tUi(t, i18n.language, "chat.newConversation")}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {isHistoryLoading && visibleMessages.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : (
              visibleMessages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  avatarUrl={message.role === "assistant" ? getCurrentLogo() : undefined}
                />
              ))
            )}
            {isLoading && visibleMessages[visibleMessages.length - 1]?.role !== "assistant" && !isHistoryLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden bg-muted p-1">
                  <img src={getCurrentLogo()} alt="" className="w-full h-full object-contain" />
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="sticky bottom-0 border-t border-border bg-background px-3 py-3 pb-safe">
          <div className="max-w-3xl mx-auto">
            <ChatInput
              onSend={sendMessage}
              isLoading={isLoading || isHistoryLoading}
              placeholder={
                mode === "creative"
                  ? t("assistants.nanobanana.greeting").slice(0, 50) + "..."
                  : t("assistants.inputPlaceholder")
              }
            />
          </div>
        </div>
      </div>

      {!isMobile && <div className="pb-0" />}
      {isMobile && <MobileNav />}
    </div>
  );
};

const Assistentes = () => {
  return (
    <ProductGuard productType="ai_hub" mode="overlay">
      <AssistentesContent />
    </ProductGuard>
  );
};

export default Assistentes;
