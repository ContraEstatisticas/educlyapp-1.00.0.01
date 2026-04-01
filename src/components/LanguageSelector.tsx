import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";
import { Globe } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  clearStoredLanguageOverride,
  normalizeAppLanguage,
  setStoredLanguageOverride,
} from "@/lib/languagePreference";
import { supabase } from "@/integrations/supabase/client";

const languages = [
  { code: "pt", name: "Português", shortName: "PT", flag: "🇧🇷" },
  { code: "en", name: "English", shortName: "EN", flag: "🇺🇸" },
  { code: "es", name: "Español", shortName: "ES", flag: "🇪🇸" },
  { code: "fr", name: "Français", shortName: "FR", flag: "🇫🇷" },
  { code: "it", name: "Italiano", shortName: "IT", flag: "🇮🇹" },
  { code: "de", name: "Deutsch", shortName: "DE", flag: "🇩🇪" },
  { code: "ru", name: "Русский", shortName: "RU", flag: "🇷🇺" },
] as const;

interface LanguageSelectorProps {
  className?: string;
}

export const LanguageSelector = ({ className }: LanguageSelectorProps) => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const currentLanguageCode = normalizeAppLanguage(i18n.resolvedLanguage || i18n.language);
  const [selectedLanguageCode, setSelectedLanguageCode] = useState(currentLanguageCode);
  const currentLanguage =
    languages.find((language) => language.code === selectedLanguageCode) || languages[0];

  useEffect(() => {
    setSelectedLanguageCode(currentLanguageCode);
  }, [currentLanguageCode]);

  const handleLanguageChange = async (languageCode: string) => {
    const normalizedLanguage = normalizeAppLanguage(languageCode);
    const previousLanguage = selectedLanguageCode;

    if (normalizedLanguage === previousLanguage) return;

    setSelectedLanguageCode(normalizedLanguage);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { error } = await supabase
          .from("profiles")
          .update({
            preferred_language: normalizedLanguage,
            language_confirmation_completed: true,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id);

        if (error) throw error;

        clearStoredLanguageOverride();
        localStorage.setItem("i18nextLng", normalizedLanguage);

        queryClient.setQueryData(
          ["dashboard-language-confirmation"],
          (current:
            | {
                userId: string;
                preferredLanguage: string | null;
                needsConfirmation: boolean;
              }
            | null
            | undefined) =>
            current
              ? {
                  ...current,
                  preferredLanguage: normalizedLanguage,
                  needsConfirmation: false,
                }
              : current,
        );
        queryClient.invalidateQueries({ queryKey: ["dashboard-language-confirmation"] });
        queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      } else {
        setStoredLanguageOverride(normalizedLanguage);
      }

      if (typeof document !== "undefined") {
        document.documentElement.lang = normalizedLanguage;
      }

      await i18n.changeLanguage(normalizedLanguage);
    } catch (error) {
      console.error("[LanguageSelector] Failed to change language:", error);
      setSelectedLanguageCode(previousLanguage);
    }
  };

  return (
    <Select value={selectedLanguageCode} onValueChange={handleLanguageChange}>
      <SelectTrigger
        className={cn(
          "w-[60px] bg-background/50 backdrop-blur-sm transition-all hover:bg-background/70 sm:w-[140px] border-border",
          className,
        )}
      >
        <div className="flex items-center gap-1 sm:gap-2">
          <Globe className="hidden h-4 w-4 text-primary sm:block" />
          <span className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-sm leading-none">{currentLanguage.flag}</span>
            <span className="text-sm font-medium sm:hidden">{currentLanguage.shortName}</span>
            <span className="hidden text-sm font-medium sm:inline">{currentLanguage.name}</span>
          </span>
        </div>
      </SelectTrigger>

      <SelectContent
        className="max-h-[300px] max-w-[90vw] border-border bg-background/95 backdrop-blur-lg"
        position="popper"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        {languages.map((language) => (
          <SelectItem
            key={language.code}
            value={language.code}
            className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
