import type { LevelRewardRow } from "@/lib/levelRewards";
import {
  AI_HUB_BASE_DAILY_IMAGE_LIMIT,
  AI_HUB_BASE_DAILY_MESSAGE_LIMIT,
  AI_HUB_LEVEL_BONUS_EXTRA_IMAGES,
  AI_HUB_LEVEL_BONUS_EXTRA_MESSAGES,
} from "@/lib/aiHubConfig";

type PopupLocale = "pt" | "en" | "es";
type PopupIcon = "mail" | "briefcase" | "brain" | "file-text" | "sparkles";

export type LevelRewardPopupAction =
  | "dismiss"
  | "freelancer_offer"
  | "open_ai_hub"
  | "download_pdf"
  | "unlock_ai_hub";

export interface LevelRewardPopupContent {
  action: LevelRewardPopupAction;
  badge: string;
  benefits: string[];
  description: string;
  icon: PopupIcon;
  primaryLabel: string;
  secondaryLabel?: string;
  title: string;
}

interface LocaleCopy {
  levelBadgeTemplate: string;
  notNow: string;
  rewards: {
    newsletter_access: {
      active: Omit<LevelRewardPopupContent, "badge">;
      requires_freelancer: Omit<LevelRewardPopupContent, "badge">;
    };
    ai_hub_day_pass: {
      active: Omit<LevelRewardPopupContent, "badge">;
    };
    prompt_guide_pdf: {
      active: Omit<LevelRewardPopupContent, "badge">;
    };
    ai_hub_bonus_limits: {
      active: (values: {
        extraImages: number;
        extraMessages: number;
        totalImages: number;
        totalMessages: number;
      }) => Omit<LevelRewardPopupContent, "badge">;
      requires_ai_hub: (values: {
        extraImages: number;
        extraMessages: number;
        totalImages: number;
        totalMessages: number;
      }) => Omit<LevelRewardPopupContent, "badge">;
    };
  };
}

const interpolate = (template: string, values: Record<string, string | number>) =>
  Object.entries(values).reduce(
    (result, [key, value]) => result.replace(new RegExp(`{{${key}}}`, "g"), String(value)),
    template,
  );

const COPY_BY_LOCALE: Record<PopupLocale, LocaleCopy> = {
  pt: {
    levelBadgeTemplate: "Nivel {{level}} desbloqueado",
    notNow: "Agora nao",
    rewards: {
      newsletter_access: {
        active: {
          action: "dismiss",
          benefits: [
            "Vagas freelance filtradas toda semana",
            "Oportunidades remotas e sinais praticos de mercado",
            "Mais clareza para transformar habilidade em renda",
          ],
          description:
            "Como o modulo Freelancer ja esta ativo na sua conta, voce passa a receber esse jornal semanal no seu email.",
          icon: "mail",
          primaryLabel: "Perfeito",
          title: "Voce liberou o jornal semanal de vagas freelance",
        },
        requires_freelancer: {
          action: "freelancer_offer",
          benefits: [
            "Curadoria semanal com vagas e oportunidades remotas",
            "Direcionamento de mercado para quem quer monetizar IA",
            "Esse beneficio ativa quando o modulo Freelancer estiver liberado",
          ],
          description:
            "O beneficio ja e seu. Agora falta desbloquear o modulo Freelancer para comecar a receber essas atualizacoes no email.",
          icon: "briefcase",
          primaryLabel: "Desbloquear Freelancer",
          secondaryLabel: "Agora nao",
          title: "Voce desbloqueou o jornal semanal de vagas freelance",
        },
      },
      ai_hub_day_pass: {
        active: {
          action: "open_ai_hub",
          benefits: [
            "24 horas de acesso ao Hub de IA",
            "Use ChatGPT, Gemini, Claude, Grok, NanoBanana e EDI",
            "Teste os assistentes e descubra qual acelera mais seu fluxo",
          ],
          description:
            "Seu passe de 1 dia foi ativado agora e ja pode ser usado dentro do Hub de IA.",
          icon: "brain",
          primaryLabel: "Abrir AI Hub",
          title: "Voce ganhou 1 dia de AI Hub",
        },
      },
      prompt_guide_pdf: {
        active: {
          action: "download_pdf",
          benefits: [
            "Prompts recomendados para cada IA da plataforma",
            "Estruturas prontas para criar mais rapido",
            "Menos tentativa e erro para chegar em resultados melhores",
          ],
          description:
            "Como voce ja tinha AI Hub ativo no nivel 5, liberamos um PDF especial com prompts prontos para acelerar seu uso das IAs.",
          icon: "file-text",
          primaryLabel: "Baixar PDF",
          title: "Voce liberou o PDF de prompts por IA",
        },
      },
      ai_hub_bonus_limits: {
        active: ({ extraImages, extraMessages, totalImages, totalMessages }) => ({
          action: "open_ai_hub",
          benefits: [
            `+${extraMessages} mensagens extras por dia`,
            `+${extraImages} imagens extras por dia`,
            `Seu limite agora ficou em ${totalMessages} mensagens e ${totalImages} imagens por dia`,
          ],
          description:
            "Como voce ja tem AI Hub, o boost do nivel 7 entrou em vigor e deixa seu uso diario bem mais folgado.",
          icon: "sparkles",
          primaryLabel: "Abrir AI Hub",
          title: "Voce liberou um boost diario no AI Hub",
        }),
        requires_ai_hub: ({ extraImages, extraMessages, totalImages, totalMessages }) => ({
          action: "unlock_ai_hub",
          benefits: [
            `+${extraMessages} mensagens extras por dia`,
            `+${extraImages} imagens extras por dia`,
            `Ao ativar o AI Hub, seu teto diario vira ${totalMessages} mensagens e ${totalImages} imagens`,
          ],
          description:
            "O beneficio do nivel 7 ja foi reservado para a sua conta. Ele ativa assim que o AI Hub estiver liberado para voce.",
          icon: "sparkles",
          primaryLabel: "Desbloquear AI Hub",
          secondaryLabel: "Agora nao",
          title: "Voce desbloqueou o boost diario do AI Hub",
        }),
      },
    },
  },
  en: {
    levelBadgeTemplate: "Level {{level}} unlocked",
    notNow: "Not now",
    rewards: {
      newsletter_access: {
        active: {
          action: "dismiss",
          benefits: [
            "Fresh freelance roles every week",
            "Remote opportunities and practical market signals",
            "More clarity to turn skill into income",
          ],
          description:
            "Because the Freelancer module is already active on your account, you will now receive this weekly journal by email.",
          icon: "mail",
          primaryLabel: "Awesome",
          title: "You unlocked the weekly freelance jobs journal",
        },
        requires_freelancer: {
          action: "freelancer_offer",
          benefits: [
            "A weekly curation of freelance roles and remote opportunities",
            "Market guidance for people monetizing AI skills",
            "This perk activates as soon as Freelancer is unlocked",
          ],
          description:
            "The perk is already yours. Now you need to unlock the Freelancer module to start receiving these updates by email.",
          icon: "briefcase",
          primaryLabel: "Unlock Freelancer",
          secondaryLabel: "Not now",
          title: "You unlocked the weekly freelance jobs journal",
        },
      },
      ai_hub_day_pass: {
        active: {
          action: "open_ai_hub",
          benefits: [
            "24 hours of access to the AI Hub",
            "Use ChatGPT, Gemini, Claude, Grok, NanoBanana, and EDI",
            "Test the assistants and find which one speeds up your workflow",
          ],
          description:
            "Your 1-day pass is active right now and can already be used inside the AI Hub.",
          icon: "brain",
          primaryLabel: "Open AI Hub",
          title: "You earned 1 day of AI Hub access",
        },
      },
      prompt_guide_pdf: {
        active: {
          action: "download_pdf",
          benefits: [
            "Recommended prompts for each AI on the platform",
            "Ready-made structures to create faster",
            "Less trial and error to reach better outputs",
          ],
          description:
            "Because AI Hub was already active on your account at level 5, we unlocked a special PDF packed with ready-to-use prompts.",
          icon: "file-text",
          primaryLabel: "Download PDF",
          title: "You unlocked the AI prompts PDF",
        },
      },
      ai_hub_bonus_limits: {
        active: ({ extraImages, extraMessages, totalImages, totalMessages }) => ({
          action: "open_ai_hub",
          benefits: [
            `+${extraMessages} extra messages per day`,
            `+${extraImages} extra images per day`,
            `Your daily cap is now ${totalMessages} messages and ${totalImages} images`,
          ],
          description:
            "Because AI Hub is already active for you, the level 7 boost is now live and gives you a lot more room every day.",
          icon: "sparkles",
          primaryLabel: "Open AI Hub",
          title: "You unlocked a daily AI Hub boost",
        }),
        requires_ai_hub: ({ extraImages, extraMessages, totalImages, totalMessages }) => ({
          action: "unlock_ai_hub",
          benefits: [
            `+${extraMessages} extra messages per day`,
            `+${extraImages} extra images per day`,
            `Once AI Hub is active, your daily cap becomes ${totalMessages} messages and ${totalImages} images`,
          ],
          description:
            "The level 7 perk is already reserved for your account. It activates as soon as AI Hub is unlocked for you.",
          icon: "sparkles",
          primaryLabel: "Unlock AI Hub",
          secondaryLabel: "Not now",
          title: "You unlocked the AI Hub daily boost",
        }),
      },
    },
  },
  es: {
    levelBadgeTemplate: "Nivel {{level}} desbloqueado",
    notNow: "Ahora no",
    rewards: {
      newsletter_access: {
        active: {
          action: "dismiss",
          benefits: [
            "Vacantes freelance filtradas cada semana",
            "Oportunidades remotas y senales practicas de mercado",
            "Mas claridad para convertir habilidad en ingresos",
          ],
          description:
            "Como el modulo Freelancer ya esta activo en tu cuenta, ahora empezaras a recibir este boletin semanal por email.",
          icon: "mail",
          primaryLabel: "Perfecto",
          title: "Has desbloqueado el boletin semanal de vacantes freelance",
        },
        requires_freelancer: {
          action: "freelancer_offer",
          benefits: [
            "Curadoria semanal con vacantes y oportunidades remotas",
            "Direccion de mercado para quien quiere monetizar habilidades con IA",
            "Este beneficio se activa cuando desbloquees Freelancer",
          ],
          description:
            "El beneficio ya es tuyo. Ahora necesitas desbloquear el modulo Freelancer para empezar a recibir estas actualizaciones por email.",
          icon: "briefcase",
          primaryLabel: "Desbloquear Freelancer",
          secondaryLabel: "Ahora no",
          title: "Has desbloqueado el boletin semanal de vacantes freelance",
        },
      },
      ai_hub_day_pass: {
        active: {
          action: "open_ai_hub",
          benefits: [
            "24 horas de acceso al AI Hub",
            "Usa ChatGPT, Gemini, Claude, Grok, NanoBanana y EDI",
            "Prueba los asistentes y descubre cual acelera mas tu flujo",
          ],
          description:
            "Tu pase de 1 dia ya esta activo y ya puedes usarlo dentro del AI Hub.",
          icon: "brain",
          primaryLabel: "Abrir AI Hub",
          title: "Has ganado 1 dia de AI Hub",
        },
      },
      prompt_guide_pdf: {
        active: {
          action: "download_pdf",
          benefits: [
            "Prompts recomendados para cada IA de la plataforma",
            "Estructuras listas para crear mas rapido",
            "Menos prueba y error para llegar a mejores resultados",
          ],
          description:
            "Como ya tenias AI Hub activo en el nivel 5, liberamos un PDF especial con prompts listos para usar.",
          icon: "file-text",
          primaryLabel: "Descargar PDF",
          title: "Has desbloqueado el PDF de prompts por IA",
        },
      },
      ai_hub_bonus_limits: {
        active: ({ extraImages, extraMessages, totalImages, totalMessages }) => ({
          action: "open_ai_hub",
          benefits: [
            `+${extraMessages} mensajes extra por dia`,
            `+${extraImages} imagenes extra por dia`,
            `Tu limite diario ahora es ${totalMessages} mensajes y ${totalImages} imagenes`,
          ],
          description:
            "Como ya tienes AI Hub, el impulso del nivel 7 ya esta activo y te da mucho mas margen cada dia.",
          icon: "sparkles",
          primaryLabel: "Abrir AI Hub",
          title: "Has desbloqueado un impulso diario en el AI Hub",
        }),
        requires_ai_hub: ({ extraImages, extraMessages, totalImages, totalMessages }) => ({
          action: "unlock_ai_hub",
          benefits: [
            `+${extraMessages} mensajes extra por dia`,
            `+${extraImages} imagenes extra por dia`,
            `Cuando actives AI Hub, tu limite diario pasara a ${totalMessages} mensajes y ${totalImages} imagenes`,
          ],
          description:
            "El beneficio del nivel 7 ya quedo reservado para tu cuenta. Se activa en cuanto desbloquees AI Hub.",
          icon: "sparkles",
          primaryLabel: "Desbloquear AI Hub",
          secondaryLabel: "Ahora no",
          title: "Has desbloqueado el impulso diario del AI Hub",
        }),
      },
    },
  },
};

const normalizeLocale = (language?: string): PopupLocale => {
  const baseLanguage = language?.split("-")[0];

  if (baseLanguage === "pt" || baseLanguage === "en" || baseLanguage === "es") {
    return baseLanguage;
  }

  return "en";
};

export const getLevelRewardPopupContent = (
  reward: LevelRewardRow,
  language?: string,
): LevelRewardPopupContent | null => {
  const localeCopy = COPY_BY_LOCALE[normalizeLocale(language)];
  const status =
    reward.metadata && typeof reward.metadata.status === "string"
      ? reward.metadata.status
      : "active";

  const badge = interpolate(localeCopy.levelBadgeTemplate, {
    level: reward.source_level,
  });

  if (reward.reward_key === "newsletter_access") {
    const content =
      status === "requires_freelancer"
        ? localeCopy.rewards.newsletter_access.requires_freelancer
        : localeCopy.rewards.newsletter_access.active;

    return {
      ...content,
      badge,
      secondaryLabel: content.secondaryLabel || undefined,
    };
  }

  if (reward.reward_key === "ai_hub_day_pass") {
    return {
      ...localeCopy.rewards.ai_hub_day_pass.active,
      badge,
    };
  }

  if (reward.reward_key === "prompt_guide_pdf") {
    return {
      ...localeCopy.rewards.prompt_guide_pdf.active,
      badge,
    };
  }

  if (reward.reward_key === "ai_hub_bonus_limits") {
    const extraMessages =
      typeof reward.metadata?.extra_messages === "number"
        ? reward.metadata.extra_messages
        : AI_HUB_LEVEL_BONUS_EXTRA_MESSAGES;
    const extraImages =
      typeof reward.metadata?.extra_images === "number"
        ? reward.metadata.extra_images
        : AI_HUB_LEVEL_BONUS_EXTRA_IMAGES;
    const totalMessages =
      typeof reward.metadata?.total_messages === "number"
        ? reward.metadata.total_messages
        : AI_HUB_BASE_DAILY_MESSAGE_LIMIT + extraMessages;
    const totalImages =
      typeof reward.metadata?.total_images === "number"
        ? reward.metadata.total_images
        : AI_HUB_BASE_DAILY_IMAGE_LIMIT + extraImages;

    const content =
      status === "requires_ai_hub"
        ? localeCopy.rewards.ai_hub_bonus_limits.requires_ai_hub({
            extraImages,
            extraMessages,
            totalImages,
            totalMessages,
          })
        : localeCopy.rewards.ai_hub_bonus_limits.active({
            extraImages,
            extraMessages,
            totalImages,
            totalMessages,
          });

    return {
      ...content,
      badge,
      secondaryLabel: content.secondaryLabel || undefined,
    };
  }

  return null;
};
