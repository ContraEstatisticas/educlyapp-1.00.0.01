import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { normalizeAppLanguage, setStoredLanguageOverride } from "@/lib/languagePreference";

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

  const currentLanguageCode = normalizeAppLanguage(i18n.resolvedLanguage || i18n.language);
  const currentLanguage =
    languages.find((language) => language.code === currentLanguageCode) || languages[0];

  const handleLanguageChange = async (languageCode: string) => {
    const normalizedLanguage = normalizeAppLanguage(languageCode);

    setStoredLanguageOverride(normalizedLanguage);
    await i18n.changeLanguage(normalizedLanguage);
  };

  return (
    <Select value={currentLanguage.code} onValueChange={handleLanguageChange}>
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
