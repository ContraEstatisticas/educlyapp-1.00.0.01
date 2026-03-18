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
      "Como o modulo Freelancer ja esta ativo na sua conta, voce vai passar a receber as atualizacoes semanais de vagas freelance no seu email.",
    activeButton: "Perfeito",
    lockedTitle: "Voce desbloqueou o jornal semanal de vagas freelance",
    lockedDescription:
      "Agora falta desbloquear o modulo Freelancer para receber essas atualizacoes semanalmente no seu email.",
    lockedPrimaryButton: "Desbloquear Freelancer",
    lockedSecondaryButton: "Agora nao",
  },
  en: {
    badge: "Level 3 unlocked",
    activeTitle: "You unlocked the weekly freelance jobs journal",
    activeDescription:
      "Because the Freelancer module is already active on your account, you will now start receiving weekly freelance job updates by email.",
    activeButton: "Awesome",
    lockedTitle: "You unlocked the weekly freelance jobs journal",
    lockedDescription:
      "Now you need to unlock the Freelancer module to receive these weekly updates in your email.",
    lockedPrimaryButton: "Unlock Freelancer",
    lockedSecondaryButton: "Not now",
  },
  es: {
    badge: "Nivel 3 desbloqueado",
    activeTitle: "Has desbloqueado el boletin semanal de vacantes freelance",
    activeDescription:
      "Como el modulo Freelancer ya esta activo en tu cuenta, ahora empezaras a recibir por email las actualizaciones semanales de vacantes freelance.",
    activeButton: "Perfecto",
    lockedTitle: "Has desbloqueado el boletin semanal de vacantes freelance",
    lockedDescription:
      "Ahora necesitas desbloquear el modulo Freelancer para recibir estas actualizaciones semanalmente en tu email.",
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
