import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const ChatInput = ({ onSend, isLoading, placeholder, value, onValueChange }: ChatInputProps) => {
  const { t } = useTranslation();
  const [internalInput, setInternalInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isControlled = value !== undefined;
  const input = isControlled ? value : internalInput;

  const setInput = (nextValue: string) => {
    if (!isControlled) {
      setInternalInput(nextValue);
    }
    onValueChange?.(nextValue);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || t('chat.input.placeholder')}
          disabled={isLoading}
          rows={1}
          className={cn(
            "w-full resize-none rounded-xl border border-input bg-background px-4 py-3 pr-12",
            "text-base sm:text-sm placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "min-h-[48px] max-h-[120px]"
          )}
          style={{
            height: 'auto',
            minHeight: '48px'
          }}
        />
      </div>
      
      <Button
        type="submit"
        size="icon"
        disabled={!input.trim() || isLoading}
        className={cn(
          "h-12 w-12 rounded-xl shrink-0",
          "bg-gradient-to-r from-violet-500 to-purple-600",
          "hover:from-violet-600 hover:to-purple-700",
          "disabled:opacity-50"
        )}
      >
        <Send className={cn(
          "w-5 h-5",
          isLoading && "animate-pulse"
        )} />
      </Button>
    </form>
  );
};
