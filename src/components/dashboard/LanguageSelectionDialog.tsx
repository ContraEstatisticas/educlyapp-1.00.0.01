import { useEffect, useState } from "react";
import { Globe, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SUPPORTED_LANGUAGES = [
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

interface LanguageSelectionDialogProps {
  open: boolean;
  userId: string;
  defaultLanguage?: string | null;
  onCompleted: (selectedLanguage: string) => void;
}

export const LanguageSelectionDialog = ({
  open,
  userId,
  defaultLanguage,
  onCompleted,
}: LanguageSelectionDialogProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(defaultLanguage || null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setSelectedLanguage(defaultLanguage || null);
    }
  }, [open, defaultLanguage]);

  const handleSave = async () => {
    if (!selectedLanguage) return;
    
    setIsSaving(true);
    const lang = selectedLanguage;

    try {
      // 1. Atualizar idioma no i18n
      i18n.changeLanguage(lang);
      localStorage.setItem("i18nextLng", lang);

      // 2. Salvar no Supabase
      const { error } = await supabase
        .from("profiles")
        .update({
          preferred_language: lang,
          language_confirmation_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (error) throw error;

      toast({
        title: "Idioma atualizado",
        description: "Seu idioma de preferência foi salvo com sucesso.",
      });

      // Dar um tempo para o usuário ver a animação
      setTimeout(() => {
        onCompleted(lang);
      }, 500);
    } catch (error) {
      console.error("[LanguageSelectionDialog] Falha ao salvar idioma:", error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar o idioma. Tente novamente.",
        variant: "destructive",
      });
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="max-w-md overflow-hidden rounded-3xl border-border bg-card p-0 shadow-2xl [&>button]:hidden"
        onEscapeKeyDown={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/12 via-background to-blue-500/10 p-6">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-blue-500 to-primary" />

          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
            <Globe className="h-6 w-6" />
          </div>

          <DialogHeader className="space-y-3 text-left">
            <DialogTitle className="text-2xl font-bold text-foreground">
              Qual seu idioma?
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
              Selecione o idioma da sua preferência para continuar usando a plataforma Educly da melhor forma possível.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                disabled={isSaving}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`
                  group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border p-5 text-left transition-all duration-200 ease-out
                  ${
                    selectedLanguage === lang.code
                      ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(249,115,22,0.2)]"
                      : "border-border/50 bg-background/60 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md"
                  }
                `}
              >
                <div className={`
                  text-4xl transition-transform duration-300
                  ${selectedLanguage === lang.code ? "scale-110" : "group-hover:scale-110"}
                `}>
                  {lang.flag}
                </div>
                <div className="text-sm font-semibold text-foreground">
                  {lang.name}
                </div>
                {selectedLanguage === lang.code && (
                  <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                )}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <Button
              onClick={handleSave}
              disabled={isSaving || !selectedLanguage}
              className="w-full font-bold shadow-md shadow-primary/20 transition-all hover:shadow-primary/40 text-background bg-primary hover:bg-primary/90 h-12 text-base rounded-xl"
            >
              {isSaving ? "Salvando..." : "Confirmar Idioma"}
              {!isSaving && <ArrowRight className="w-5 h-5 ml-2" />}
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};
