import { cn } from "@/lib/utils";

// Import AI tool logos
import chatgptLogo from "@/assets/ai-logos/chatgpt.png";
import claudeLogo from "@/assets/ai-logos/claude.png";
import deepseekLogo from "@/assets/ai-logos/deepseek.png";
import geminiLogo from "@/assets/ai-logos/gemini.png";
import nanobananaLogo from "@/assets/ai-logos/nanobanana.png";
import lovableLogo from "@/assets/ai-logos/lovable.png";
import captionsLogo from "@/assets/ai-logos/captions.png";
import elevenlabsLogo from "@/assets/ai-logos/elevenlabs.png";
import grokLogo from "@/assets/ai-logos/grok.png";

// Ordered by day range: dias 1-4, 5-6, 7-8, 9-10, 11-12, 13-14, 15-16, 17-18, 19-20, 21, 22, 23, 24, 25, 26, 27-28
export const aiToolsConfig: Record<string, { logo?: string; color: string; name: string }> = {
  'chatgpt':    { logo: chatgptLogo,    color: '#10a37f', name: 'ChatGPT' },
  'claude':     { logo: claudeLogo,     color: '#8b5cf6', name: 'Claude' },
  'deepseek':   { logo: deepseekLogo,   color: '#1e3a8a', name: 'DeepSeek' },
  'gemini':     { logo: geminiLogo,     color: '#4285f4', name: 'Gemini' },
  'copilot':    {                        color: '#0078d4', name: 'Copilot' },
  'grok':       { logo: grokLogo,       color: '#e5e7eb', name: 'Grok' },
  'perplexity': {                        color: '#20b2aa', name: 'Perplexity' },
  'manus':      {                        color: '#ff6b35', name: 'Manus' },
  'lovable':    { logo: lovableLogo,    color: '#6366f1', name: 'Lovable' },
  'nanobanana': { logo: nanobananaLogo, color: '#f59e0b', name: 'NanoBanana' },
  'leonardo':   {                        color: '#7c3aed', name: 'LeonardoAI' },
  'midjourney': {                        color: '#9ca3af', name: 'MidJourney' },
  'captions':   { logo: captionsLogo,   color: '#ec4899', name: 'Captions' },
  'elevenlabs': { logo: elevenlabsLogo, color: '#f97316', name: 'ElevenLabs' },
  'veo':        {                        color: '#ea4335', name: 'VEO' },
};

// Ordered slug list matching day sequence
export const aiToolsOrder = [
  'chatgpt', 'claude', 'deepseek', 'gemini', 'copilot', 'grok',
  'perplexity', 'manus', 'lovable', 'nanobanana', 'leonardo',
  'midjourney', 'captions', 'elevenlabs', 'veo',
];

interface AITool {
  slug: string;
  name: string;
  progress: number;
}

interface AIToolSelectorProps {
  tools: AITool[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
}

export const AIToolSelector = ({ tools, selectedSlug, onSelect }: AIToolSelectorProps) => {
  return (
    <div className="relative">
      {/* Gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      {/* Scrollable container */}
      <div className="flex gap-3 overflow-x-auto pb-2 px-2 scrollbar-hide">
        {tools.map((tool) => {
          const config = aiToolsConfig[tool.slug] || aiToolsConfig['chatgpt'];
          const isSelected = selectedSlug === tool.slug;
          
          return (
            <button
              key={tool.slug}
              onClick={() => onSelect(tool.slug)}
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-xl min-w-[80px] transition-all",
                isSelected 
                  ? "bg-primary/10 border-2 border-primary" 
                  : "bg-card border-2 border-transparent hover:border-primary/30"
              )}
            >
              {/* Logo */}
              <div 
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center",
                  isSelected ? "ring-2 ring-primary ring-offset-2" : ""
                )}
                style={{ backgroundColor: `${config.color}20` }}
              >
                {config.logo ? (
                  <img 
                    src={config.logo} 
                    alt={tool.name}
                    className="w-8 h-8 object-contain"
                  />
                ) : (
                  <span className="text-sm font-bold" style={{ color: config.color }}>
                    {config.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              
              {/* Name */}
              <span className={cn(
                "text-xs font-medium truncate max-w-[70px]",
                isSelected ? "text-primary" : "text-foreground"
              )}>
                {tool.name}
              </span>
              
              {/* Progress */}
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all"
                  style={{ 
                    width: `${tool.progress}%`,
                    backgroundColor: config.color
                  }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground">{tool.progress}%</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
