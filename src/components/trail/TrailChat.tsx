import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Loader2, Bot, User, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface TrailChatProps {
  /** Whether the modal is visible */
  isOpen: boolean;
  /** Called when user wants to close/skip */
  onClose: () => void;
  /** Trail or tool name for AI context */
  toolContext: string;
  accentColor?: string;
  language?: string;
  /** Summary of the module/day that was just completed — used as AI context */
  moduleSummary?: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/iacademy-chat`;

/* ─── i18n strings ─── */
const UI = {
  pt: {
    greeting: `Agora é sua vez! ✍️\n\nEscreva um **prompt** com suas próprias palavras para praticar o que acabou de aprender. Pode ser uma pergunta, instrução ou comando que você usaria com uma IA.\n\nVou avaliar e te ajudar a melhorar!`,
    title: "Módulo Concluído!",
    subtitle: "Pratique o que você aprendeu com a IA",
    placeholder: "Escreva seu prompt aqui...",
    skip: "Pular",
    newChat: "Nova conversa",
  },
  en: {
    greeting: `Now it's your turn! ✍️\n\nWrite a **prompt** in your own words to practice what you just learned. It can be a question, instruction, or command you'd use with an AI.\n\nI'll evaluate and help you improve!`,
    title: "Module Complete!",
    subtitle: "Practice what you learned with AI",
    placeholder: "Write your prompt here...",
    skip: "Skip",
    newChat: "New chat",
  },
  es: {
    greeting: `¡Ahora es tu turno! ✍️\n\nEscribe un **prompt** con tus propias palabras para practicar lo que acabas de aprender. Puede ser una pregunta, instrucción o comando que usarías con una IA.\n\n¡Voy a evaluar y ayudarte a mejorar!`,
    title: "¡Módulo Completado!",
    subtitle: "Practica lo que aprendiste con IA",
    placeholder: "Escribe tu prompt aquí...",
    skip: "Saltar",
    newChat: "Nuevo chat",
  },
  fr: {
    greeting: `À ton tour ! ✍️\n\nÉcris un **prompt** avec tes propres mots pour pratiquer ce que tu viens d'apprendre. Ça peut être une question, une instruction ou une commande que tu utiliserais avec une IA.\n\nJe vais évaluer et t'aider à t'améliorer !`,
    title: "Module Terminé !",
    subtitle: "Pratique ce que tu as appris avec l'IA",
    placeholder: "Écris ton prompt ici...",
    skip: "Passer",
    newChat: "Nouveau chat",
  },
} as const;

type SupportedLang = keyof typeof UI;

const getUi = (language = "pt") => {
  const base = language.split("-")[0].toLowerCase() as SupportedLang;
  return UI[base] || UI.pt;
};

const buildSystemPrompt = (toolContext: string, language: string, moduleSummary: string, userMsgCount: number): string => {
  const lang = language.split("-")[0].toLowerCase();
  const langLabel = lang === "pt" ? "português" : lang === "es" ? "español" : lang === "fr" ? "français" : "english";

  const trimmed = moduleSummary.length > 400 ? moduleSummary.slice(0, 400) + "…" : moduleSummary;

  // IMPORTANT: The backend already injects a verbose system prompt with tables/criteria.
  // This override tells the AI to ignore that format and keep it SHORT + conversational.
  let instruction = "";
  if (userMsgCount === 0) {
    instruction = "The student wrote their FIRST prompt. Briefly praise the effort, suggest ONE concrete improvement, and show a better version. Encourage them to try again.";
  } else if (userMsgCount === 1) {
    instruction = "SECOND attempt. Praise their improvement enthusiastically. Highlight what got better. Congratulate them.";
  } else {
    instruction = "Continue coaching. Praise progress, offer minor polish if needed.";
  }

  return `OVERRIDE: Ignore any previous formatting instructions (tables, criteria grids, etc). Answer in ${langLabel} using PLAIN conversational text only. NO tables, NO markdown headers, NO bullet lists. Max 80 words. Be warm and encouraging.

Context: "${toolContext}" trail. Topics covered: ${trimmed}

${instruction}`;
};

/* ─── Message bubble ─── */
const ChatMessage = ({ role, content, isStreaming, accentColor }: { role: "user" | "assistant"; content: string; isStreaming?: boolean; accentColor: string }) => {
  const isUser = role === "user";
  return (
    <div className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}>
      <div
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
          isUser ? "bg-muted text-muted-foreground" : ""
        )}
        style={!isUser ? { backgroundColor: accentColor, color: "white" } : undefined}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-3 text-sm leading-relaxed",
          isUser ? "bg-muted text-foreground" : "bg-card border border-border text-foreground shadow-sm"
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words">{content}</p>
        ) : (
          <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-headings:my-1.5 prose-strong:text-foreground prose-p:text-foreground break-words overflow-hidden text-sm leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
            {isStreaming && <span className="inline-block w-1.5 h-4 ml-0.5 bg-current animate-pulse rounded-sm" />}
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Chat logic hook ─── */
const useChatLogic = (toolContext: string, language: string, moduleSummary?: string) => {
  const ui = getUi(language);
  const [messages, setMessages] = useState<Message[]>([
    { id: "greeting", role: "assistant", content: ui.greeting },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userMsgCount, setUserMsgCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const currentCount = userMsgCount;
    setUserMsgCount((c) => c + 1);

    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error("Sessão expirada");

      const systemPrompt = moduleSummary
        ? buildSystemPrompt(toolContext, language, moduleSummary, currentCount)
        : undefined;

      const chatMessages = messages
        .filter((m) => m.id !== "greeting")
        .concat(userMessage)
        .map((m) => ({ role: m.role, content: m.content }));

      if (systemPrompt) {
        chatMessages.unshift({ role: "user", content: `[SYSTEM]\n${systemPrompt}` });
      }

      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ messages: chatMessages, aiToolContext: `Treino de Prompt — ${toolContext}`, language }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Erro");
      }
      if (!response.body) throw new Error("No body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let content = "";
      let buf = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, idx);
          buf = buf.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "" || !line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") break;
          try {
            const delta = JSON.parse(json).choices?.[0]?.delta?.content;
            if (delta) {
              content += delta;
              setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, content } : m));
            }
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("chat_messages").insert([
          { user_id: user.id, role: "user", content: text.trim(), ai_tool_context: toolContext, ai_assistant_type: "edi" },
          { user_id: user.id, role: "assistant", content, ai_tool_context: toolContext, ai_assistant_type: "edi" },
        ]);
      }
    } catch (error) {
      console.error("TrailChat error:", error);
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages, toolContext, language, moduleSummary, userMsgCount]);

  const clearChat = () => {
    setUserMsgCount(0);
    setMessages([{ id: "greeting-" + Date.now(), role: "assistant", content: ui.greeting }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return { messages, input, setInput, isLoading, sendMessage, clearChat, handleKeyDown, messagesEndRef, textareaRef, userMsgCount };
};

/* ═══════════════════════════════════════════════════
   EXPORT — End-of-module practice modal
   ═══════════════════════════════════════════════════ */
export const TrailChat = ({ isOpen, onClose, toolContext, accentColor = "#8b5cf6", language = "pt", moduleSummary }: TrailChatProps) => {
  const chat = useChatLogic(toolContext, language, moduleSummary);
  const ui = getUi(language);

  useEffect(() => {
    if (isOpen) setTimeout(() => chat.textareaRef.current?.focus(), 300);
  }, [isOpen]);

  // Auto-close after 3 user messages (wait for AI to finish responding)
  useEffect(() => {
    if (chat.userMsgCount >= 3 && !chat.isLoading) {
      const timer = setTimeout(onClose, 1500);
      return () => clearTimeout(timer);
    }
  }, [chat.userMsgCount, chat.isLoading, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal card */}
      <div className="relative w-full max-w-lg h-[min(85vh,700px)] flex flex-col bg-background rounded-xl shadow-2xl overflow-hidden border border-border animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">

        {/* Hero header */}
        <div className="shrink-0 px-6 pt-6 pb-4" style={{ background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}08)` }}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">{ui.title}</h2>
                <p className="text-sm text-muted-foreground">{ui.subtitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {chat.messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content}
              accentColor={accentColor}
              isStreaming={chat.isLoading && message.role === "assistant" && message === chat.messages[chat.messages.length - 1]}
            />
          ))}
          <div ref={chat.messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="shrink-0 border-t border-border bg-muted/30 px-5 py-4">
          <div className="flex items-end gap-2">
            <textarea
              ref={chat.textareaRef}
              value={chat.input}
              onChange={(e) => chat.setInput(e.target.value)}
              onKeyDown={chat.handleKeyDown}
              placeholder={ui.placeholder}
              disabled={chat.isLoading}
              rows={1}
              className={cn(
                "flex-1 resize-none rounded-lg border border-input bg-background px-4 py-3",
                "text-sm placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:border-transparent",
                "disabled:opacity-50 min-h-[48px] max-h-[100px]"
              )}
              style={{ "--tw-ring-color": `${accentColor}40` } as React.CSSProperties}
              onInput={(e) => {
                const t = e.target as HTMLTextAreaElement;
                t.style.height = "auto";
                t.style.height = Math.min(t.scrollHeight, 100) + "px";
              }}
            />
            <Button
              size="icon"
              disabled={!chat.input.trim() || chat.isLoading}
              onClick={() => chat.sendMessage(chat.input)}
              className="h-[48px] w-[48px] rounded-lg shrink-0"
              style={{ backgroundColor: chat.input.trim() && !chat.isLoading ? accentColor : undefined }}
            >
              {chat.isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </Button>
          </div>

          {/* Skip action */}
          <div className="flex items-center justify-end mt-3">
            <button onClick={onClose} className="text-xs font-medium hover:text-foreground transition-colors flex items-center gap-1" style={{ color: accentColor }}>
              {ui.skip}
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
