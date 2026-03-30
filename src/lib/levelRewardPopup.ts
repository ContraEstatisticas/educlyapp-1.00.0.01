import type { LevelRewardRow } from "@/lib/levelRewards";
import {
  AI_HUB_BASE_DAILY_IMAGE_LIMIT,
  AI_HUB_BASE_DAILY_MESSAGE_LIMIT,
  AI_HUB_LEVEL_BONUS_EXTRA_IMAGES,
  AI_HUB_LEVEL_BONUS_EXTRA_MESSAGES,
} from "@/lib/aiHubConfig";

type PopupLocale = "pt" | "en" | "es" | "fr";
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
            "Vagas de freelancer filtradas e enviadas toda semana no seu email",
            "Oportunidades reais de trabalho remoto com IA",
            "Sinais praticos de mercado para voce comecar a gerar renda extra",
          ],
          description:
            "Voce atingiu o Super Bonus do nivel 3! Como o modulo Freelancer ja esta ativo na sua conta, a partir de agora voce recebe no email uma curadoria semanal exclusiva com vagas freelance selecionadas, oportunidades remotas e atalhos para transformar o que voce esta aprendendo aqui em renda real.",
          icon: "mail",
          primaryLabel: "Demais!",
          title: "Super Bonus: Jornal semanal de vagas freelance ativado!",
        },
        requires_freelancer: {
          action: "freelancer_offer",
          benefits: [
            "Curadoria semanal com vagas reais de freelancer no seu email",
            "Direcionamento de mercado para monetizar suas skills de IA",
            "Ativa automaticamente quando o modulo Freelancer for desbloqueado",
          ],
          description:
            "Voce atingiu o Super Bonus do nivel 3! Com o modulo Freelancer ativo, voce comeca a receber semanalmente no email vagas filtradas, oportunidades remotas e orientacoes para transformar inteligencia artificial em renda. E como se voce tivesse um radar de oportunidades trabalhando pra voce toda semana.",
          icon: "briefcase",
          primaryLabel: "Desbloquear Freelancer",
          secondaryLabel: "Agora nao",
          title: "Super Bonus desbloqueado: Jornal semanal de vagas freelance!",
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
            "Hand-picked freelance jobs delivered to your inbox every week",
            "Real remote work opportunities powered by AI skills",
            "Practical market insights to start earning extra income",
          ],
          description:
            "You hit the Level 3 Super Bonus! Since the Freelancer module is already active on your account, you now start receiving an exclusive weekly email with curated freelance jobs, remote opportunities, and shortcuts to turn what you are learning here into real income.",
          icon: "mail",
          primaryLabel: "Amazing!",
          title: "Super Bonus: Weekly freelance jobs journal activated!",
        },
        requires_freelancer: {
          action: "freelancer_offer",
          benefits: [
            "Weekly curated email with real freelance job opportunities",
            "Market direction to monetize your AI skills",
            "Activates automatically once the Freelancer module is unlocked",
          ],
          description:
            "You hit the Level 3 Super Bonus! With the Freelancer module active, you will receive curated freelance jobs, remote opportunities, and guidance to turn AI into income — delivered weekly to your inbox. It is like having an opportunity radar working for you every single week.",
          icon: "briefcase",
          primaryLabel: "Unlock Freelancer",
          secondaryLabel: "Not now",
          title: "Super Bonus unlocked: Weekly freelance jobs journal!",
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
            "Vacantes freelance seleccionadas y enviadas a tu email cada semana",
            "Oportunidades reales de trabajo remoto con IA",
            "Senales practicas del mercado para generar ingresos extra",
          ],
          description:
            "Alcanzaste el Super Bonus del nivel 3! Como el modulo Freelancer ya esta activo en tu cuenta, a partir de ahora recibiras en tu email una curadoria semanal exclusiva con vacantes freelance seleccionadas, oportunidades remotas y atajos para convertir lo que estas aprendiendo aqui en ingresos reales.",
          icon: "mail",
          primaryLabel: "Genial!",
          title: "Super Bonus: Boletin semanal de vacantes freelance activado!",
        },
        requires_freelancer: {
          action: "freelancer_offer",
          benefits: [
            "Curadoria semanal con vacantes reales de freelance en tu email",
            "Direccion de mercado para monetizar tus habilidades con IA",
            "Se activa automaticamente al desbloquear el modulo Freelancer",
          ],
          description:
            "Alcanzaste el Super Bonus del nivel 3! Con el modulo Freelancer activo, empezaras a recibir semanalmente vacantes filtradas, oportunidades remotas y orientacion para convertir la inteligencia artificial en ingresos. Es como tener un radar de oportunidades trabajando para ti cada semana.",
          icon: "briefcase",
          primaryLabel: "Desbloquear Freelancer",
          secondaryLabel: "Ahora no",
          title: "Super Bonus desbloqueado: Boletin semanal de vacantes freelance!",
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
  fr: {
    levelBadgeTemplate: "Niveau {{level}} debloque",
    notNow: "Pas maintenant",
    rewards: {
      newsletter_access: {
        active: {
          action: "dismiss",
          benefits: [
            "Offres freelance selectionnees et envoyees a votre email chaque semaine",
            "Opportunites reelles de travail a distance avec l'IA",
            "Signaux pratiques du marche pour generer des revenus supplementaires",
          ],
          description:
            "Vous avez atteint le Super Bonus du niveau 3! Puisque le module Freelancer est deja actif sur votre compte, vous recevez desormais par email une selection hebdomadaire exclusive de missions freelance, d'opportunites a distance et de raccourcis pour transformer vos apprentissages en revenus reels.",
          icon: "mail",
          primaryLabel: "Genial!",
          title: "Super Bonus: Journal hebdomadaire des missions freelance active!",
        },
        requires_freelancer: {
          action: "freelancer_offer",
          benefits: [
            "Selection hebdomadaire de vraies missions freelance dans votre email",
            "Orientation marche pour monetiser vos competences en IA",
            "S'active automatiquement quand le module Freelancer est debloque",
          ],
          description:
            "Vous avez atteint le Super Bonus du niveau 3! Avec le module Freelancer actif, vous recevrez chaque semaine des missions filtrees, des opportunites a distance et une orientation pour transformer l'IA en revenus. C'est comme avoir un radar d'opportunites qui travaille pour vous chaque semaine.",
          icon: "briefcase",
          primaryLabel: "Debloquer Freelancer",
          secondaryLabel: "Pas maintenant",
          title: "Super Bonus debloque: Journal hebdomadaire des missions freelance!",
        },
      },
      ai_hub_day_pass: {
        active: {
          action: "open_ai_hub",
          benefits: [
            "24 heures d'acces au AI Hub",
            "Utilisez ChatGPT, Gemini, Claude, Grok, NanoBanana et EDI",
            "Testez les assistants et voyez lequel accelere le plus votre flux",
          ],
          description:
            "Votre pass d'une journee est deja actif et peut etre utilise tout de suite dans le AI Hub.",
          icon: "brain",
          primaryLabel: "Ouvrir AI Hub",
          title: "Vous avez gagne 1 jour de AI Hub",
        },
      },
      prompt_guide_pdf: {
        active: {
          action: "download_pdf",
          benefits: [
            "Des prompts recommandes pour chaque IA de la plateforme",
            "Des structures pretes a l'emploi pour creer plus vite",
            "Moins d'essais-erreurs pour obtenir de meilleurs resultats",
          ],
          description:
            "Comme AI Hub etait deja actif sur votre compte au niveau 5, nous avons debloque un PDF special rempli de prompts prets a utiliser.",
          icon: "file-text",
          primaryLabel: "Telecharger le PDF",
          title: "Vous avez debloque le PDF de prompts par IA",
        },
      },
      ai_hub_bonus_limits: {
        active: ({ extraImages, extraMessages, totalImages, totalMessages }) => ({
          action: "open_ai_hub",
          benefits: [
            `+${extraMessages} messages supplementaires par jour`,
            `+${extraImages} images supplementaires par jour`,
            `Votre limite quotidienne passe maintenant a ${totalMessages} messages et ${totalImages} images par jour`,
          ],
          description:
            "Comme AI Hub est deja actif pour vous, le boost du niveau 7 est maintenant en vigueur et vous donne beaucoup plus de marge chaque jour.",
          icon: "sparkles",
          primaryLabel: "Ouvrir AI Hub",
          title: "Vous avez debloque un boost quotidien du AI Hub",
        }),
        requires_ai_hub: ({ extraImages, extraMessages, totalImages, totalMessages }) => ({
          action: "unlock_ai_hub",
          benefits: [
            `+${extraMessages} messages supplementaires par jour`,
            `+${extraImages} images supplementaires par jour`,
            `Une fois AI Hub active, votre limite quotidienne passera a ${totalMessages} messages et ${totalImages} images`,
          ],
          description:
            "L'avantage du niveau 7 est deja reserve pour votre compte. Il s'activera des que AI Hub sera debloque pour vous.",
          icon: "sparkles",
          primaryLabel: "Debloquer AI Hub",
          secondaryLabel: "Pas maintenant",
          title: "Vous avez debloque le boost quotidien du AI Hub",
        }),
      },
    },
  },
};

const normalizeLocale = (language?: string): PopupLocale => {
  const baseLanguage = language?.split("-")[0];

  if (baseLanguage === "pt" || baseLanguage === "en" || baseLanguage === "es" || baseLanguage === "fr") {
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
