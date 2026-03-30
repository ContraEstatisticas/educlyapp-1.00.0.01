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
    badge: "🎉 Super Bonus — Nivel 3",
    activeTitle: "Super Bonus: Jornal semanal de vagas freelance ativado!",
    activeDescription:
      "Voce atingiu o Super Bonus do nivel 3! A partir de agora, voce recebe no email uma curadoria semanal exclusiva com vagas freelance selecionadas, oportunidades remotas e atalhos para transformar o que voce esta aprendendo em renda real. Como o modulo Freelancer ja esta ativo, tudo ja esta funcionando.",
    activeButton: "Demais!",
    lockedTitle: "Super Bonus desbloqueado: Jornal semanal de vagas freelance!",
    lockedDescription:
      "Voce atingiu o Super Bonus do nivel 3! Com o modulo Freelancer ativo, voce comeca a receber semanalmente no email vagas filtradas, oportunidades remotas e orientacoes para transformar inteligencia artificial em renda. E como ter um radar de oportunidades trabalhando pra voce toda semana.",
    lockedPrimaryButton: "Desbloquear Freelancer",
    lockedSecondaryButton: "Agora nao",
  },
  en: {
    badge: "🎉 Super Bonus — Level 3",
    activeTitle: "Super Bonus: Weekly freelance jobs journal activated!",
    activeDescription:
      "You hit the Level 3 Super Bonus! From now on, you will receive an exclusive weekly email with curated freelance jobs, remote opportunities, and shortcuts to turn what you are learning into real income. Since the Freelancer module is already active, everything is already running.",
    activeButton: "Amazing!",
    lockedTitle: "Super Bonus unlocked: Weekly freelance jobs journal!",
    lockedDescription:
      "You hit the Level 3 Super Bonus! With the Freelancer module active, you will receive curated freelance jobs, remote opportunities, and guidance to turn AI into income — delivered weekly to your inbox. It is like having an opportunity radar working for you every single week.",
    lockedPrimaryButton: "Unlock Freelancer",
    lockedSecondaryButton: "Not now",
  },
  es: {
    badge: "🎉 Super Bonus — Nivel 3",
    activeTitle: "Super Bonus: Boletin semanal de vacantes freelance activado!",
    activeDescription:
      "Alcanzaste el Super Bonus del nivel 3! A partir de ahora recibiras en tu email una curadoria semanal exclusiva con vacantes freelance seleccionadas, oportunidades remotas y atajos para convertir lo que estas aprendiendo en ingresos reales. Como el modulo Freelancer ya esta activo, todo ya esta funcionando.",
    activeButton: "Genial!",
    lockedTitle: "Super Bonus desbloqueado: Boletin semanal de vacantes freelance!",
    lockedDescription:
      "Alcanzaste el Super Bonus del nivel 3! Con el modulo Freelancer activo, empezaras a recibir semanalmente vacantes filtradas, oportunidades remotas y orientacion para convertir la IA en ingresos. Es como tener un radar de oportunidades trabajando para ti cada semana.",
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
