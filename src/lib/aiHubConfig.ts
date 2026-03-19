export const AI_HUB_EMAIL_WHITELIST = [
  "ferramentasdigitais1000@gmail.com",
  "felip@gmailcom",
  "acess@nuvei.com",
] as const;

export const AI_HUB_BASE_DAILY_MESSAGE_LIMIT = 50;
export const AI_HUB_BASE_DAILY_IMAGE_LIMIT = 10;
export const AI_HUB_LEVEL_BONUS_MIN_LEVEL = 7;
export const AI_HUB_LEVEL_BONUS_EXTRA_MESSAGES = 20;
export const AI_HUB_LEVEL_BONUS_EXTRA_IMAGES = 5;

export const hasWhitelistedAiHubAccess = (email?: string | null) => {
  const normalizedEmail = email?.trim().toLowerCase() || "";
  if (!normalizedEmail) return false;

  return AI_HUB_EMAIL_WHITELIST.some((allowedEmail) => allowedEmail === normalizedEmail);
};

export const getAiHubDailyLimits = ({
  currentLevel = 1,
  hasAiHubAccess = false,
}: {
  currentLevel?: number;
  hasAiHubAccess?: boolean;
}) => {
  const hasLevelBonus = hasAiHubAccess && currentLevel >= AI_HUB_LEVEL_BONUS_MIN_LEVEL;

  return {
    hasLevelBonus,
    imageLimit:
      AI_HUB_BASE_DAILY_IMAGE_LIMIT +
      (hasLevelBonus ? AI_HUB_LEVEL_BONUS_EXTRA_IMAGES : 0),
    messageLimit:
      AI_HUB_BASE_DAILY_MESSAGE_LIMIT +
      (hasLevelBonus ? AI_HUB_LEVEL_BONUS_EXTRA_MESSAGES : 0),
  };
};
