import type { LevelRewardRow } from "@/lib/levelRewards";

export const LEVEL_UP_EVENT = "educly:level-up";
export const LEVEL_UP_POPUP_OPEN_EVENT = "educly:level-up-popup-open";
export const LEVEL_UP_POPUP_CLOSE_EVENT = "educly:level-up-popup-close";
export const LEVEL_REWARDS_GRANTED_EVENT = "educly:level-rewards-granted";

export interface LevelUpEventDetail {
  level: number;
  previousLevel?: number;
  source?: "local" | "realtime";
}

export interface LevelRewardsGrantedEventDetail {
  rewards: LevelRewardRow[];
  source: "local" | "realtime" | "sync";
}

const dispatchWindowEvent = <TDetail>(eventName: string, detail?: TDetail) => {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent(eventName, {
      detail,
    }),
  );
};

export const dispatchLevelUpEvent = (detail: LevelUpEventDetail) => {
  dispatchWindowEvent(LEVEL_UP_EVENT, detail);
};

export const dispatchLevelUpPopupOpenEvent = (detail: { level: number }) => {
  dispatchWindowEvent(LEVEL_UP_POPUP_OPEN_EVENT, detail);
};

export const dispatchLevelUpPopupCloseEvent = () => {
  dispatchWindowEvent(LEVEL_UP_POPUP_CLOSE_EVENT);
};

export const dispatchLevelRewardsGrantedEvent = (detail: LevelRewardsGrantedEventDetail) => {
  dispatchWindowEvent(LEVEL_REWARDS_GRANTED_EVENT, detail);
};
