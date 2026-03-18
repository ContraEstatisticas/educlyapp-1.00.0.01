type PopupLocale = "pt" | "en" | "es";

interface NewsletterPopupCopy {
  badge: string;
  activeTitle: string;
  activeDescription: string;
  activeButton: string;
  lockedTitle: string;
  lockedDescription: string;
  lockedPrimaryButton: string;
  lockedSecondaryButton: string;
}

const COPY_BY_LOCALE: Record<PopupLocale, NewsletterPopupCopy> = {
  pt: {
    badge: "Nivel 3 desbloqueado",
    activeTitle: "Voce liberou o jornal semanal de vagas freelance",
    activeDescription:
      "Esse beneficio e uma curadoria semanal enviada por email com vagas freelance, oportunidades remotas e sinais praticos de mercado. Como o modulo Freelancer ja esta ativo na sua conta, voce vai comecar a receber essas atualizacoes no seu email.",
    activeButton: "Perfeito",
    lockedTitle: "Voce desbloqueou o jornal semanal de vagas freelance",
    lockedDescription:
      "Esse beneficio e uma curadoria semanal enviada por email com vagas freelance, oportunidades remotas e sinais de mercado para quem quer transformar habilidade em renda. Agora falta desbloquear o modulo Freelancer para receber essas atualizacoes no seu email.",
    lockedPrimaryButton: "Desbloquear Freelancer",
    lockedSecondaryButton: "Agora nao",
  },
  en: {
    badge: "Level 3 unlocked",
    activeTitle: "You unlocked the weekly freelance jobs journal",
    activeDescription:
      "This perk is a weekly curated email with freelance roles, remote opportunities, and practical market signals. Because the Freelancer module is already active on your account, you will now start receiving these updates by email.",
    activeButton: "Awesome",
    lockedTitle: "You unlocked the weekly freelance jobs journal",
    lockedDescription:
      "This perk is a weekly curated email with freelance roles, remote opportunities, and market signals for people who want to turn skill into income. Now you need to unlock the Freelancer module to receive these updates in your email.",
    lockedPrimaryButton: "Unlock Freelancer",
    lockedSecondaryButton: "Not now",
  },
  es: {
    badge: "Nivel 3 desbloqueado",
    activeTitle: "Has desbloqueado el boletin semanal de vacantes freelance",
    activeDescription:
      "Este beneficio es una curadoria semanal enviada por email con vacantes freelance, oportunidades remotas y señales practicas de mercado. Como el modulo Freelancer ya esta activo en tu cuenta, ahora empezaras a recibir estas actualizaciones por email.",
    activeButton: "Perfecto",
    lockedTitle: "Has desbloqueado el boletin semanal de vacantes freelance",
    lockedDescription:
      "Este beneficio es una curadoria semanal enviada por email con vacantes freelance, oportunidades remotas y señales de mercado para quien quiere convertir habilidad en ingresos. Ahora necesitas desbloquear el modulo Freelancer para recibir estas actualizaciones en tu email.",
    lockedPrimaryButton: "Desbloquear Freelancer",
    lockedSecondaryButton: "Ahora no",
  },
};

const normalizeLocale = (language?: string): PopupLocale => {
  const baseLanguage = language?.split("-")[0];

  if (baseLanguage === "pt" || baseLanguage === "en" || baseLanguage === "es") {
    return baseLanguage;
  }

  return "en";
};

export const getNewsletterLevelPopupCopy = (language?: string) => {
  return COPY_BY_LOCALE[normalizeLocale(language)];
};
