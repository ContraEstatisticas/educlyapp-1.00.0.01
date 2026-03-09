import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { MessageSquare, Palette, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import nanobananaLogo from "@/assets/ai-logos/nanobanana.png";

interface AISidebarProps {
    mode: "chat" | "creative";
    onModeChange: (mode: "chat" | "creative") => void;
    usageToday: number;
    imagesUsed: number;
    messageLimit: number;
    imageLimit: number;
}

export const AISidebar = ({
    mode,
    onModeChange,
    usageToday,
    imagesUsed,
    messageLimit,
    imageLimit,
}: AISidebarProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="w-[220px] h-full flex flex-col border-r border-border bg-card/50">
            {/* Header */}
            <div className="p-4 border-b border-border">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => navigate("/dashboard")}
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <h2 className="font-bold text-foreground text-sm">
                        {t("assistants.title")}
                    </h2>
                </div>
            </div>

            {/* Nav */}
            <div className="flex-1 p-3 space-y-1">
                <button
                    onClick={() => onModeChange("chat")}
                    className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        mode === "chat"
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                >
                    <MessageSquare className="w-4 h-4" />
                    Chat
                </button>
                <button
                    onClick={() => onModeChange("creative")}
                    className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        mode === "creative"
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                >
                    <div className="w-4 h-4 rounded overflow-hidden">
                        <img src={nanobananaLogo} alt="NanoBanana" className="w-full h-full object-contain" />
                    </div>
                    {t("assistants.nanobanana.name")}
                </button>
            </div>

            {/* Usage */}
            <div className="p-4 border-t border-border space-y-2">
                <div className="text-xs text-muted-foreground">
                    <div className="flex justify-between mb-1">
                        <span>💬 {t("assistants.rateLimit.counter")}</span>
                        <span className="font-medium text-foreground">{usageToday}/{messageLimit}</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${Math.min((usageToday / messageLimit) * 100, 100)}%` }}
                        />
                    </div>
                </div>
                <div className="text-xs text-muted-foreground">
                    <div className="flex justify-between mb-1">
                        <span>🎨 imgs</span>
                        <span className="font-medium text-foreground">{imagesUsed}/{imageLimit}</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-amber-500 rounded-full transition-all"
                            style={{ width: `${Math.min((imagesUsed / imageLimit) * 100, 100)}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
