import { useEffect, useMemo, useRef, useState } from "react";
import characterSpriteSheet from "../../../assets/character_images/pixel_character_pale_blue_original.png";
import { aiToolsConfig } from "@/components/lesson/AIToolSelector";
import { cn } from "@/lib/utils";

type ChallengeMapStatus = "completed" | "current" | "unlocked" | "locked";

export interface PhaserChallengeMapDay {
  id: string;
  dayNumber: number;
  title: string;
  toolSlug: string;
  toolName: string;
  status: ChallengeMapStatus;
}

interface PhaserChallengeMapCopy {
  loading: string;
  error: string;
  helper: string;
  legendCompleted: string;
  legendCurrent: string;
  legendUnlocked: string;
  legendLocked: string;
  approachPrompt: string;
  pressPrompt: string;
  viewLesson: string;
  reviewLesson: string;
  viewPrompt: string;
  reviewPrompt: string;
  dayLabel: string;
}

interface PhaserChallengeMapProps {
  days: PhaserChallengeMapDay[];
  weekLabels: string[];
  copy: PhaserChallengeMapCopy;
  onDaySelect: (dayId: string) => void;
  className?: string;
  fullScreen?: boolean;
}

const VERTICAL_BOARD_COLUMNS = 7;
const DESKTOP_HORIZONTAL_BREAKPOINT = 1280;
const SPRITE_FRAME_SIZE = 48;
const AVATAR_IDLE_FRAME = 0;
const AVATAR_WALK_FRAMES = { start: 0, end: 4 };
const AVATAR_SPEED = 260;
const NODE_INTERACTION_RADIUS = 62;
const HORIZONTAL_X_PATTERN = [0.05, 0.11, 0.18, 0.25, 0.33, 0.40, 0.48, 0.55, 0.63, 0.70, 0.78, 0.86, 0.93, 0.98];
const HORIZONTAL_Y_PATTERNS = [
  [0.64, 0.36, 0.70, 0.44, 0.78, 0.52, 0.60, 0.33, 0.68, 0.42, 0.75, 0.50, 0.61, 0.82],
  [0.24, 0.56, 0.31, 0.70, 0.43, 0.62, 0.28, 0.54, 0.37, 0.73, 0.48, 0.64, 0.34, 0.58],
];

const STATUS_BADGES: Record<ChallengeMapStatus, string> = {
  completed: "OK",
  current: "NOW",
  unlocked: "GO",
  locked: "LOCK",
};

const hexToNumber = (hex: string) => Number.parseInt(hex.replace("#", ""), 16);

const normalizeToolColor = (color?: string) => {
  if (!color) return "#0ea5e9";
  return color.toLowerCase() === "#ffffff" ? "#e2e8f0" : color;
};

type BiomeMotif =
  | "forest"
  | "crystal"
  | "canyon"
  | "desert"
  | "city"
  | "lunar"
  | "cloud"
  | "forge"
  | "ocean"
  | "tropical"
  | "atelier"
  | "dream"
  | "stage"
  | "sound"
  | "volcano";

interface BiomeTheme {
  glow: string;
  surface: string;
  accent: string;
  detail: string;
  motif: BiomeMotif;
}

const BIOME_THEMES: Record<string, BiomeTheme> = {
  chatgpt: { glow: "#14532d", surface: "#0f2f1f", accent: "#34d399", detail: "#bbf7d0", motif: "forest" },
  claude: { glow: "#6d28d9", surface: "#25153e", accent: "#a78bfa", detail: "#ede9fe", motif: "crystal" },
  deepseek: { glow: "#1d4ed8", surface: "#102746", accent: "#60a5fa", detail: "#dbeafe", motif: "canyon" },
  gemini: { glow: "#d97706", surface: "#3a2710", accent: "#fbbf24", detail: "#fde68a", motif: "desert" },
  copilot: { glow: "#0284c7", surface: "#0b2234", accent: "#38bdf8", detail: "#bae6fd", motif: "city" },
  grok: { glow: "#94a3b8", surface: "#1f2937", accent: "#e5e7eb", detail: "#f8fafc", motif: "lunar" },
  perplexity: { glow: "#cbd5e1", surface: "#202d3d", accent: "#f8fafc", detail: "#ffffff", motif: "cloud" },
  manus: { glow: "#ea580c", surface: "#341f15", accent: "#fb923c", detail: "#ffedd5", motif: "forge" },
  lovable: { glow: "#0891b2", surface: "#0b2742", accent: "#67e8f9", detail: "#cffafe", motif: "ocean" },
  nanobanana: { glow: "#ca8a04", surface: "#34270d", accent: "#facc15", detail: "#fef3c7", motif: "tropical" },
  leonardo: { glow: "#7c3aed", surface: "#261640", accent: "#c4b5fd", detail: "#ede9fe", motif: "atelier" },
  midjourney: { glow: "#94a3b8", surface: "#1f2a38", accent: "#e2e8f0", detail: "#f8fafc", motif: "dream" },
  captions: { glow: "#db2777", surface: "#3a1433", accent: "#f472b6", detail: "#fce7f3", motif: "stage" },
  elevenlabs: { glow: "#ea580c", surface: "#3a2114", accent: "#fdba74", detail: "#ffedd5", motif: "sound" },
  veo: { glow: "#dc2626", surface: "#3b1414", accent: "#f87171", detail: "#fee2e2", motif: "volcano" },
};

const getBiomeTheme = (toolSlug: string): BiomeTheme => {
  return BIOME_THEMES[toolSlug] || {
    glow: "#0ea5e9",
    surface: "#10233d",
    accent: "#7dd3fc",
    detail: "#e0f2fe",
    motif: "dream",
  };
};

const getToolSegments = (days: PhaserChallengeMapDay[]) => {
  if (days.length === 0) return [];

  const segments: Array<{ toolSlug: string; startIndex: number; endIndex: number }> = [];
  let startIndex = 0;

  for (let index = 1; index <= days.length; index += 1) {
    const current = days[index];
    const previous = days[index - 1];
    if (!current || current.toolSlug !== previous.toolSlug) {
      segments.push({
        toolSlug: previous.toolSlug,
        startIndex,
        endIndex: index - 1,
      });
      startIndex = index;
    }
  }

  return segments;
};

type BoardLayout = ReturnType<typeof createBoardLayout>;

const createBoardLayout = (orientation: "vertical" | "horizontal") => {
  if (orientation === "horizontal") {
    const worldWidth = 1960;
    const worldHeight = 812;
    const panelStartX = 54;
    const panelStartY = 96;
    const panelWidth = worldWidth - panelStartX * 2;
    const panelHeight = 224;
    const panelGap = 238;
    const panelPadding = 80;
    const panelHeaderHeight = 84;
    const footerX = 34;
    const footerHeight = 96;
    const footerY = worldHeight - footerHeight - 28;
    const footerWidth = worldWidth - footerX * 2;
    const footerActionWidth = 224;
    const footerActionHeight = 48;

    return {
      orientation,
      worldWidth,
      worldHeight,
      panelStartX,
      panelStartY,
      panelWidth,
      panelHeight,
      panelGap,
      panelPadding,
      panelHeaderHeight,
      columnsPerLane: 14,
      weekLabelsPerLane: 2,
      minimumLaneCount: 2,
      nodeRadius: 32,
      avatarOffsetY: 76,
      avatarScale: 2.02,
      footerX,
      footerY,
      footerWidth,
      footerHeight,
      footerActionWidth,
      footerActionHeight,
      footerTextWidth: footerWidth - footerActionWidth - 156,
      footerActionCenterX: footerX + footerWidth - footerActionWidth / 2 - 24,
      stageWidth: "min(1960px, calc(100vw - 2rem))",
    };
  }

  const worldWidth = 980;
  const worldHeight = 1320;
  const panelStartX = 52;
  const panelWidth = worldWidth - panelStartX * 2;
  const footerX = 22;
  const footerHeight = 98;
  const footerY = worldHeight - footerHeight - 38;
  const footerWidth = worldWidth - footerX * 2;
  const footerActionWidth = 194;
  const footerActionHeight = 44;

  return {
    orientation,
    worldWidth,
    worldHeight,
    panelStartX,
    panelStartY: 108,
    panelWidth,
    panelHeight: 122,
    panelGap: 226,
    panelPadding: 62,
    panelHeaderHeight: 0,
    columnsPerLane: VERTICAL_BOARD_COLUMNS,
    weekLabelsPerLane: 1,
    minimumLaneCount: 4,
    nodeRadius: 36,
    avatarOffsetY: 88,
    avatarScale: 1.9,
    footerX,
    footerY,
    footerWidth,
    footerHeight,
    footerActionWidth,
    footerActionHeight,
    footerTextWidth: footerWidth - footerActionWidth - 122,
    footerActionCenterX: footerX + footerWidth - footerActionWidth / 2 - 24,
    stageWidth: "min(980px, calc(100vw - 1rem))",
  };
};

const getBoardPosition = (index: number, layout: BoardLayout) => {
  const laneIndex = Math.floor(index / layout.columnsPerLane);
  const positionInLane = index % layout.columnsPerLane;
  const displayIndex = laneIndex % 2 === 0 ? positionInLane : layout.columnsPerLane - 1 - positionInLane;

  if (layout.orientation === "horizontal") {
    const contentTop = layout.panelStartY + laneIndex * layout.panelGap + layout.panelHeaderHeight;
    const contentHeight = layout.panelHeight - layout.panelHeaderHeight;
    const horizontalX = HORIZONTAL_X_PATTERN[displayIndex] ?? (displayIndex + 1) / layout.columnsPerLane;
    const lanePattern = HORIZONTAL_Y_PATTERNS[laneIndex % HORIZONTAL_Y_PATTERNS.length] || HORIZONTAL_Y_PATTERNS[0];
    const horizontalY = lanePattern[positionInLane] ?? 0.5;

    return {
      laneIndex,
      x:
        layout.panelStartX +
        layout.panelPadding +
        horizontalX * (layout.panelWidth - layout.panelPadding * 2),
      y: contentTop + horizontalY * contentHeight,
    };
  }

  return {
    laneIndex,
    x:
      layout.panelStartX +
      layout.panelPadding +
      displayIndex * ((layout.panelWidth - layout.panelPadding * 2) / (layout.columnsPerLane - 1)),
    y: layout.panelStartY + laneIndex * layout.panelGap + layout.panelHeight / 2 + 8,
  };
};

const getAvatarPosition = (point: { x: number; y: number }, layout: BoardLayout) => ({
  x: point.x,
  y: point.y - layout.avatarOffsetY,
});

export const PhaserChallengeMap = ({
  days,
  weekLabels,
  copy,
  onDaySelect,
  className,
  fullScreen = false,
}: PhaserChallengeMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBooting, setIsBooting] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [nearbyDay, setNearbyDay] = useState<PhaserChallengeMapDay | null>(null);
  const [viewportWidth, setViewportWidth] = useState(() => (typeof window === "undefined" ? 1440 : window.innerWidth));
  const isDesktopHorizontal = fullScreen && viewportWidth >= DESKTOP_HORIZONTAL_BREAKPOINT;
  const layout = useMemo(
    () => createBoardLayout(isDesktopHorizontal ? "horizontal" : "vertical"),
    [isDesktopHorizontal],
  );
  const stageRatio = layout.worldWidth / layout.worldHeight;
  const fullScreenStageStyle = fullScreen
    ? {
        width: `min(${layout.worldWidth}px, calc(100vw - 2rem), calc((100vh - 16rem) * ${stageRatio}))`,
        aspectRatio: `${layout.worldWidth} / ${layout.worldHeight}`,
      }
    : undefined;

  const activeDay = useMemo(() => {
    return (
      days.find((day) => day.status === "current") ||
      [...days].reverse().find((day) => day.status === "completed") ||
      days[0]
    );
  }, [days]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || days.length === 0) {
      setIsBooting(false);
      return;
    }

        let cancelled = false;
        let game: import("phaser").Game | null = null;
        let lastNearbyDayId: string | null = null;

    const mountGame = async () => {
      try {
        setIsBooting(true);
        setHasError(false);

        const Phaser = await import("phaser");

        if (cancelled || !containerRef.current) {
          return;
        }

        const laneCount = Math.max(layout.minimumLaneCount, Math.ceil(days.length / layout.columnsPerLane));
        const positions = days.map((_, index) => getBoardPosition(index, layout));
        const currentIndex = days.findIndex((day) => day.status === "current");
        const lastCompletedIndex = [...days]
          .map((day, index) => ({ day, index }))
          .filter(({ day }) => day.status === "completed")
          .map(({ index }) => index)
          .at(-1) ?? -1;
        const focusIndex = currentIndex >= 0 ? currentIndex : Math.max(lastCompletedIndex, 0);
        const avatarStartIndex = 0;
        const unlockedDays = days.filter((day) => day.status !== "locked");

        let avatar: import("phaser").GameObjects.Sprite | null = null;
        let avatarHalo: import("phaser").GameObjects.Arc | null = null;
        let avatarShadow: import("phaser").GameObjects.Ellipse | null = null;
        let avatarTravelTween: import("phaser").Tweens.Tween | null = null;
        let idleFloatTween: import("phaser").Tweens.Tween | null = null;
        let movementKeys: {
          up: import("phaser").Input.Keyboard.Key;
          down: import("phaser").Input.Keyboard.Key;
          left: import("phaser").Input.Keyboard.Key;
          right: import("phaser").Input.Keyboard.Key;
          interact: import("phaser").Input.Keyboard.Key;
          altInteract: import("phaser").Input.Keyboard.Key;
        } | null = null;
        let cursors: import("phaser").Types.Input.Keyboard.CursorKeys | null = null;
        let avatarIndex = avatarStartIndex;
        let isAvatarMoving = false;
        let nearestUnlockedDay: PhaserChallengeMapDay | null = null;
        let footerDayText: import("phaser").GameObjects.Text | null = null;
        let footerTitleText: import("phaser").GameObjects.Text | null = null;
        let footerHintText: import("phaser").GameObjects.Text | null = null;
        let footerActionText: import("phaser").GameObjects.Text | null = null;
        let footerActionBackground: import("phaser").GameObjects.Rectangle | null = null;
        let footerActionContainer: import("phaser").GameObjects.Container | null = null;
        let footerInteractiveDay: PhaserChallengeMapDay | null = null;

        const movementBounds = {
          minX: layout.panelStartX + 22,
          maxX: layout.panelStartX + layout.panelWidth - 22,
          minY: layout.panelStartY + 22,
          maxY: layout.panelStartY + (laneCount - 1) * layout.panelGap + layout.panelHeight - 14,
        };

        const updateAvatarDecor = () => {
          if (!avatar || !avatarHalo || !avatarShadow) return;
          avatarHalo.x = avatar.x;
          avatarHalo.y = avatar.y + 10;
          avatarShadow.x = avatar.x;
          avatarShadow.y = avatar.y + 36;
        };

        const stopIdleFloat = () => {
          if (idleFloatTween) {
            idleFloatTween.remove();
            idleFloatTween = null;
          }
        };

        const startIdleFloat = (scene: import("phaser").Scene) => {
          if (!avatar || idleFloatTween || isAvatarMoving) return;
          idleFloatTween = scene.tweens.add({
            targets: avatar,
            y: {
              from: avatar.y,
              to: avatar.y - 6,
            },
            duration: 900,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
            onUpdate: updateAvatarDecor,
          });
        };

        const setFooterActiveDay = (day: PhaserChallengeMapDay | null) => {
          const targetDay = day || activeDay || unlockedDays[0] || days[0];
          if (!targetDay) return;

          const isNearbyDay = Boolean(day);
          const actionLabel = targetDay.status === "completed" ? copy.reviewLesson : copy.viewLesson;

          footerDayText?.setText(`DAY ${targetDay.dayNumber}  ${targetDay.toolName}`.trim());
          footerTitleText?.setText(targetDay.title);
          footerHintText?.setText(isNearbyDay ? copy.pressPrompt : copy.approachPrompt);
          footerActionText?.setText(actionLabel);

          if (footerActionBackground) {
            footerActionBackground.setFillStyle(targetDay.status === "completed" ? 0xf97316 : 0x06b6d4, isNearbyDay ? 0.94 : 0.32);
          }

          if (footerActionContainer) {
            footerActionContainer.setVisible(isNearbyDay && !fullScreen);
            footerActionContainer.setAlpha(isNearbyDay && !fullScreen ? 1 : 0);
            footerActionContainer.setScale(1);
          }

          footerInteractiveDay = isNearbyDay ? targetDay : null;
        };

        const syncNearbyDay = (day: PhaserChallengeMapDay | null) => {
          const nextId = day?.id || null;
          if (nextId === lastNearbyDayId) return;
          lastNearbyDayId = nextId;
          setNearbyDay(day);
        };

        const config: import("phaser").Types.Core.GameConfig = {
          type: Phaser.AUTO,
          parent: containerRef.current,
          width: layout.worldWidth,
          height: layout.worldHeight,
          backgroundColor: "#050c16",
          scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: layout.worldWidth,
            height: layout.worldHeight,
          },
          scene: {
            preload() {
              this.load.spritesheet("challenge-avatar", characterSpriteSheet, {
                frameWidth: SPRITE_FRAME_SIZE,
                frameHeight: SPRITE_FRAME_SIZE,
              });
            },
            create() {
              try {
                if (!this.anims.exists("challenge-avatar-walk")) {
                  this.anims.create({
                    key: "challenge-avatar-walk",
                    frames: this.anims.generateFrameNumbers("challenge-avatar", AVATAR_WALK_FRAMES),
                    frameRate: 10,
                    repeat: -1,
                  });
                }

                if (this.input.keyboard) {
                  movementKeys = this.input.keyboard.addKeys({
                    up: Phaser.Input.Keyboard.KeyCodes.W,
                    down: Phaser.Input.Keyboard.KeyCodes.S,
                    left: Phaser.Input.Keyboard.KeyCodes.A,
                    right: Phaser.Input.Keyboard.KeyCodes.D,
                    interact: Phaser.Input.Keyboard.KeyCodes.E,
                    altInteract: Phaser.Input.Keyboard.KeyCodes.ENTER,
                  }) as typeof movementKeys;
                  cursors = this.input.keyboard.createCursorKeys();
                }

                const background = this.add.graphics();
                background.fillStyle(0x050c16, 1);
                background.fillRect(0, 0, layout.worldWidth, layout.worldHeight);

              const atmosphere = this.add.graphics();
              if (layout.orientation === "horizontal") {
                atmosphere.fillStyle(0x0c1f38, 0.62);
                atmosphere.fillCircle(184, 162, 156);
                atmosphere.fillStyle(0x112846, 0.5);
                atmosphere.fillCircle(744, 174, 214);
                atmosphere.fillStyle(0x123154, 0.32);
                atmosphere.fillCircle(1388, 166, 206);
                atmosphere.fillStyle(0x0c2744, 0.2);
                atmosphere.fillCircle(1742, 248, 184);
                atmosphere.fillStyle(0x10233d, 0.2);
                atmosphere.fillCircle(356, 658, 244);
                atmosphere.fillStyle(0x123154, 0.2);
                atmosphere.fillCircle(1124, 694, 252);
              } else {
                atmosphere.fillStyle(0x0c1f38, 0.72);
                atmosphere.fillCircle(118, 144, 124);
                atmosphere.fillStyle(0x112846, 0.62);
                atmosphere.fillCircle(612, 146, 166);
                atmosphere.fillStyle(0x123154, 0.34);
                atmosphere.fillCircle(176, 826, 262);
                atmosphere.fillStyle(0x10233d, 0.3);
                atmosphere.fillCircle(594, 922, 224);
              }

              for (let index = 0; index < (layout.orientation === "horizontal" ? 48 : 32); index += 1) {
                const star = this.add.circle(
                  24 + ((index * 53) % (layout.worldWidth - 48)),
                  28 + ((index * 79) % (layout.worldHeight - 56)),
                  index % 4 === 0 ? 2.4 : 1.4,
                  0xf8fafc,
                  index % 3 === 0 ? 0.55 : 0.28,
                );
                star.setBlendMode(Phaser.BlendModes.SCREEN);
              }

              const laneBackground = this.add.graphics();
              const laneShadow = this.add.graphics();
              const laneColors = [0x0f223d, 0x112744, 0x10213b, 0x0d2036];

              for (let lane = 0; lane < laneCount; lane += 1) {
                const laneColor = laneColors[lane % laneColors.length];

                if (layout.orientation === "horizontal") {
                  const top = layout.panelStartY + lane * layout.panelGap;
                  const laneLabels = weekLabels.slice(
                    lane * layout.weekLabelsPerLane,
                    lane * layout.weekLabelsPerLane + layout.weekLabelsPerLane,
                  );
                  const secondLabel = laneLabels[1];
                  const rangeStart = lane * layout.columnsPerLane + 1;
                  const rangeEnd = Math.min((lane + 1) * layout.columnsPerLane, days.length);
                  const middleDividerX =
                    layout.panelStartX +
                    layout.panelPadding +
                    ((layout.panelWidth - layout.panelPadding * 2) / (layout.columnsPerLane - 1)) * (VERTICAL_BOARD_COLUMNS - 0.5);

                  laneShadow.fillStyle(0x020617, 0.5);
                  laneShadow.fillRoundedRect(layout.panelStartX + 10, top + 10, layout.panelWidth, layout.panelHeight, 34);
                  laneBackground.fillStyle(laneColor, 0.72);
                  laneBackground.fillRoundedRect(layout.panelStartX, top, layout.panelWidth, layout.panelHeight, 34);
                  laneBackground.fillStyle(0xffffff, 0.045);
                  laneBackground.fillRoundedRect(layout.panelStartX, top, layout.panelWidth, layout.panelHeaderHeight, 34);
                  laneBackground.lineStyle(1, 0xffffff, 0.08);
                  laneBackground.strokeRoundedRect(layout.panelStartX, top, layout.panelWidth, layout.panelHeight, 34);
                  laneBackground.lineStyle(1, 0x7dd3fc, 0.05);
                  laneBackground.strokeRoundedRect(layout.panelStartX + 12, top + 12, layout.panelWidth - 24, layout.panelHeight - 24, 26);
                  laneBackground.lineStyle(2, 0xffffff, 0.06);
                  laneBackground.lineBetween(middleDividerX, top + layout.panelHeaderHeight - 10, middleDividerX, top + layout.panelHeight - 24);

                  this.add
                    .text(layout.panelStartX + 24, top + 16, laneLabels[0] || `Week ${lane + 1}`, {
                      fontFamily: "Trebuchet MS, Verdana, sans-serif",
                      fontSize: "18px",
                      color: "#f8fafc",
                      fontStyle: "bold",
                      wordWrap: { width: layout.panelWidth - 48, useAdvancedWrap: true },
                    })
                    .setAlpha(0.95);

                  if (secondLabel) {
                    this.add
                      .text(layout.panelStartX + 24, top + 40, secondLabel, {
                        fontFamily: "Trebuchet MS, Verdana, sans-serif",
                        fontSize: "13px",
                        color: "#cbd5e1",
                        fontStyle: "bold",
                        wordWrap: { width: layout.panelWidth - 48, useAdvancedWrap: true },
                      })
                      .setAlpha(0.88);
                  }

                  this.add
                    .text(layout.panelStartX + 24, top + 60, `${rangeStart}-${rangeEnd}`, {
                      fontFamily: "Trebuchet MS, Verdana, sans-serif",
                      fontSize: "12px",
                      color: "#94a3b8",
                    })
                    .setAlpha(0.9);
                } else {
                  const top = layout.panelStartY + lane * layout.panelGap;
                  laneShadow.fillStyle(0x020617, 0.5);
                  laneShadow.fillRoundedRect(layout.panelStartX + 8, top + 10, layout.panelWidth, layout.panelHeight, 30);
                  laneBackground.fillStyle(laneColor, 0.82);
                  laneBackground.fillRoundedRect(layout.panelStartX, top, layout.panelWidth, layout.panelHeight, 30);
                  laneBackground.fillStyle(0xffffff, 0.045);
                  laneBackground.fillRoundedRect(layout.panelStartX, top, layout.panelWidth, 26, 30);
                  laneBackground.lineStyle(1, 0xffffff, 0.08);
                  laneBackground.strokeRoundedRect(layout.panelStartX, top, layout.panelWidth, layout.panelHeight, 30);
                  laneBackground.lineStyle(1, 0x7dd3fc, 0.05);
                  laneBackground.strokeRoundedRect(layout.panelStartX + 10, top + 10, layout.panelWidth - 20, layout.panelHeight - 20, 22);

                  this.add
                    .text(layout.panelStartX + 18, top + 16, weekLabels[lane] || `Week ${lane + 1}`, {
                      fontFamily: "Trebuchet MS, Verdana, sans-serif",
                      fontSize: "17px",
                      color: "#f8fafc",
                      fontStyle: "bold",
                    })
                    .setAlpha(0.95);

                  this.add
                    .text(layout.panelStartX + 18, top + 42, `${lane * layout.columnsPerLane + 1}-${Math.min((lane + 1) * layout.columnsPerLane, days.length)}`, {
                      fontFamily: "Trebuchet MS, Verdana, sans-serif",
                      fontSize: "11px",
                      color: "#94a3b8",
                    })
                    .setAlpha(0.9);
                }
              }

              const biomeBackdrop = this.add.graphics();
              const biomeDecor = this.add.graphics();
              const toolSegments = getToolSegments(days);

              const drawBiomeDecorations = (
                theme: BiomeTheme,
                left: number,
                top: number,
                width: number,
                height: number,
              ) => {
                const glowColor = hexToNumber(theme.glow);
                const accentColor = hexToNumber(theme.accent);
                const detailColor = hexToNumber(theme.detail);
                const centerX = left + width / 2;
                const centerY = top + height / 2;

                switch (theme.motif) {
                  case "forest":
                  case "tropical":
                    for (let index = 0; index < 4; index += 1) {
                      const treeX = left + width * (0.16 + index * 0.22);
                      const treeY = top + height * (index % 2 === 0 ? 0.34 : 0.64);
                      biomeDecor.fillStyle(detailColor, 0.12);
                      biomeDecor.fillCircle(treeX, treeY, 20 + (index % 2) * 8);
                      biomeDecor.fillCircle(treeX - 14, treeY + 8, 14);
                      biomeDecor.fillCircle(treeX + 14, treeY + 6, 12);
                    }
                    break;
                  case "desert":
                    biomeDecor.fillStyle(detailColor, 0.1);
                    biomeDecor.fillEllipse(centerX - width * 0.18, top + height * 0.68, width * 0.34, height * 0.28);
                    biomeDecor.fillEllipse(centerX + width * 0.18, top + height * 0.56, width * 0.42, height * 0.24);
                    biomeDecor.fillStyle(accentColor, 0.12);
                    biomeDecor.fillCircle(left + width * 0.84, top + height * 0.24, 16);
                    break;
                  case "ocean":
                    biomeDecor.lineStyle(4, accentColor, 0.16);
                    for (let index = 0; index < 3; index += 1) {
                      const waveY = top + height * (0.34 + index * 0.18);
                      biomeDecor.strokePoints(
                        [
                          new Phaser.Geom.Point(left + width * 0.12, waveY),
                          new Phaser.Geom.Point(left + width * 0.34, waveY - 14),
                          new Phaser.Geom.Point(centerX, waveY + 6),
                          new Phaser.Geom.Point(left + width * 0.66, waveY - 10),
                          new Phaser.Geom.Point(left + width * 0.88, waveY + 2),
                        ],
                        false,
                        false,
                      );
                    }
                    break;
                  case "city":
                    biomeDecor.fillStyle(detailColor, 0.12);
                    for (let index = 0; index < 5; index += 1) {
                      const blockX = left + width * (0.12 + index * 0.14);
                      const blockHeight = height * (0.18 + (index % 3) * 0.08);
                      biomeDecor.fillRoundedRect(blockX, top + height * 0.62 - blockHeight, 22, blockHeight, 6);
                    }
                    break;
                  case "cloud":
                  case "dream":
                    for (let index = 0; index < 3; index += 1) {
                      const puffX = left + width * (0.22 + index * 0.28);
                      const puffY = top + height * (index % 2 === 0 ? 0.34 : 0.62);
                      biomeDecor.fillStyle(detailColor, 0.12);
                      biomeDecor.fillCircle(puffX, puffY, 18);
                      biomeDecor.fillCircle(puffX + 18, puffY + 6, 14);
                      biomeDecor.fillCircle(puffX - 18, puffY + 8, 12);
                    }
                    break;
                  case "crystal":
                  case "atelier":
                    biomeDecor.fillStyle(detailColor, 0.12);
                    for (let index = 0; index < 4; index += 1) {
                      const shardX = left + width * (0.18 + index * 0.2);
                      const shardY = top + height * (index % 2 === 0 ? 0.38 : 0.66);
                      biomeDecor.fillTriangle(shardX, shardY - 18, shardX + 16, shardY + 10, shardX - 12, shardY + 16);
                    }
                    break;
                  case "lunar":
                    biomeDecor.fillStyle(detailColor, 0.1);
                    biomeDecor.fillCircle(centerX - width * 0.18, centerY - 6, 34);
                    biomeDecor.fillStyle(hexToNumber(theme.surface), 0.2);
                    biomeDecor.fillCircle(centerX - width * 0.1, centerY - 2, 10);
                    biomeDecor.fillCircle(centerX - width * 0.24, centerY + 12, 8);
                    break;
                  case "forge":
                  case "volcano":
                    biomeDecor.fillStyle(accentColor, 0.12);
                    biomeDecor.fillTriangle(centerX - 32, top + height * 0.72, centerX, top + height * 0.28, centerX + 38, top + height * 0.72);
                    biomeDecor.fillStyle(detailColor, 0.1);
                    biomeDecor.fillCircle(centerX + 56, top + height * 0.3, 12);
                    biomeDecor.fillCircle(centerX + 74, top + height * 0.22, 8);
                    break;
                  case "stage":
                    biomeDecor.fillStyle(detailColor, 0.08);
                    biomeDecor.fillTriangle(left + width * 0.18, top + 10, left + width * 0.36, top + height * 0.68, left + width * 0.02, top + height * 0.68);
                    biomeDecor.fillTriangle(left + width * 0.82, top + 10, left + width * 0.98, top + height * 0.68, left + width * 0.64, top + height * 0.68);
                    break;
                  case "sound":
                    biomeDecor.fillStyle(detailColor, 0.12);
                    for (let index = 0; index < 6; index += 1) {
                      const barX = left + width * (0.16 + index * 0.1);
                      const barHeight = height * (0.14 + ((index + 1) % 3) * 0.1);
                      biomeDecor.fillRoundedRect(barX, centerY - barHeight / 2, 12, barHeight, 5);
                    }
                    break;
                  case "canyon":
                  default:
                    biomeDecor.fillStyle(detailColor, 0.1);
                    biomeDecor.fillTriangle(left + width * 0.12, top + height * 0.74, left + width * 0.28, top + height * 0.36, left + width * 0.42, top + height * 0.74);
                    biomeDecor.fillTriangle(left + width * 0.44, top + height * 0.78, left + width * 0.62, top + height * 0.28, left + width * 0.78, top + height * 0.78);
                    break;
                }
              };

              toolSegments.forEach((segment) => {
                const theme = getBiomeTheme(segment.toolSlug);
                const segmentPoints = positions.slice(segment.startIndex, segment.endIndex + 1);
                const xs = segmentPoints.map((point) => point.x);
                const ys = segmentPoints.map((point) => point.y);
                const minX = Math.min(...xs);
                const maxX = Math.max(...xs);
                const minY = Math.min(...ys);
                const maxY = Math.max(...ys);
                const padX = layout.orientation === "horizontal" ? 48 : 32;
                const padY = layout.orientation === "horizontal" ? 40 : 28;
                const left = minX - padX;
                const top = minY - padY;
                const width = Math.max(maxX - minX + padX * 2, 120);
                const height = Math.max(maxY - minY + padY * 2, 88);

                biomeBackdrop.fillStyle(hexToNumber(theme.glow), 0.12);
                biomeBackdrop.fillRoundedRect(left, top, width, height, layout.orientation === "horizontal" ? 38 : 30);
                biomeBackdrop.fillStyle(hexToNumber(theme.surface), 0.18);
                biomeBackdrop.fillRoundedRect(left + 8, top + 8, width - 16, height - 16, layout.orientation === "horizontal" ? 30 : 24);
                biomeBackdrop.lineStyle(1, hexToNumber(theme.accent), 0.22);
                biomeBackdrop.strokeRoundedRect(left + 8, top + 8, width - 16, height - 16, layout.orientation === "horizontal" ? 30 : 24);

                drawBiomeDecorations(theme, left + 8, top + 8, width - 16, height - 16);
              });

              const drawPath = (graphics: import("phaser").GameObjects.Graphics, pointList: { x: number; y: number }[]) => {
                if (pointList.length < 2) return;

                const spline = new Phaser.Curves.Spline(
                  pointList.map((point) => new Phaser.Math.Vector2(point.x, point.y)),
                );
                const smoothPoints = spline.getPoints(Math.max(pointList.length * 14, 36));

                graphics.beginPath();
                graphics.moveTo(smoothPoints[0].x, smoothPoints[0].y);
                for (let index = 1; index < smoothPoints.length; index += 1) {
                  graphics.lineTo(smoothPoints[index].x, smoothPoints[index].y);
                }
                graphics.strokePath();
              };

              const basePath = this.add.graphics();
              basePath.lineStyle(18, 0x12253c, 0.94);
              drawPath(basePath, positions);

              const glowPath = this.add.graphics();
              glowPath.lineStyle(24, 0x34d399, 0.18);
              drawPath(glowPath, positions.slice(0, focusIndex + 1));

              const activePath = this.add.graphics();
              activePath.lineStyle(8, 0x22c55e, 0.98);
              drawPath(activePath, positions.slice(0, focusIndex + 1));

              const activePulsePath = this.add.graphics();
              activePulsePath.lineStyle(4, 0x86efac, 0.88);
              drawPath(activePulsePath, positions.slice(0, focusIndex + 1));
              this.tweens.add({
                targets: activePulsePath,
                alpha: { from: 1, to: 0.45 },
                duration: 880,
                yoyo: true,
                repeat: -1,
                ease: "Sine.easeInOut",
              });

              const avatarAnchor = getAvatarPosition(positions[avatarStartIndex] || positions[0], layout);
              avatarShadow = this.add.ellipse(avatarAnchor.x, avatarAnchor.y + 36, layout.avatarScale * 28, layout.avatarScale * 9, 0x020617, 0.38);
              avatarShadow.setDepth(20);
              avatarHalo = this.add.circle(avatarAnchor.x, avatarAnchor.y + 10, layout.avatarScale * 18, 0x22d3ee, 0.12);
              avatarHalo.setDepth(21);
              avatar = this.add.sprite(avatarAnchor.x, avatarAnchor.y, "challenge-avatar", AVATAR_IDLE_FRAME);
              avatar.setScale(layout.avatarScale);
              avatar.setDepth(22);
              avatar.setOrigin(0.5, 0.72);
              startIdleFloat(this);

              const travelAvatarTo = (targetIndex: number, onArrive: () => void) => {
                if (!avatar) {
                  onArrive();
                  return;
                }

                const nextPoint = getAvatarPosition(positions[targetIndex], layout);
                const distance = Phaser.Math.Distance.Between(avatar.x, avatar.y, nextPoint.x, nextPoint.y);

                if (distance < 6) {
                  avatarIndex = targetIndex;
                  onArrive();
                  return;
                }

                isAvatarMoving = true;
                stopIdleFloat();

                if (avatarTravelTween) {
                  avatarTravelTween.stop();
                  avatarTravelTween = null;
                }

                avatar.setFlipX(nextPoint.x < avatar.x);
                avatar.play("challenge-avatar-walk", true);

                avatarTravelTween = this.tweens.add({
                  targets: avatar,
                  x: nextPoint.x,
                  y: nextPoint.y,
                  duration: Phaser.Math.Clamp(distance * 4.2, 240, 900),
                  ease: "Sine.easeInOut",
                  onUpdate: updateAvatarDecor,
                  onComplete: () => {
                    avatarIndex = targetIndex;
                    isAvatarMoving = false;
                    avatarTravelTween = null;
                    avatar.anims.stop();
                    avatar.setFrame(AVATAR_IDLE_FRAME);
                    updateAvatarDecor();
                    startIdleFloat(this);
                    onArrive();
                  },
                });
              };

              days.forEach((day, index) => {
                const position = positions[index];
                const toolColorHex = normalizeToolColor(aiToolsConfig[day.toolSlug]?.color);
                const toolColor = hexToNumber(toolColorHex);
                const node = this.add.container(position.x, position.y);
                const nodeRadius = layout.nodeRadius;
                const isLocked = day.status === "locked";
                const isCurrent = day.status === "current";
                const isCompleted = day.status === "completed";
                const statusBadge = STATUS_BADGES[day.status];

                const shadow = this.add.ellipse(0, 10, nodeRadius * 2.44, nodeRadius * 0.78, 0x020617, 0.42);
                const halo = this.add.circle(0, 0, nodeRadius + 16, toolColor, isCurrent ? 0.28 : isCompleted ? 0.14 : 0.1);
                const outerShell = this.add.circle(0, 0, nodeRadius + 8, 0x0d2036, 1);
                outerShell.setStrokeStyle(2, 0xffffff, 0.08);

                const fill = this.add.circle(0, 0, nodeRadius, toolColor, isLocked ? 0.28 : 0.94);
                fill.setStrokeStyle(4, 0xffffff, isCurrent ? 0.52 : isCompleted ? 0.38 : 0.24);
                const innerRing = this.add.circle(0, 0, nodeRadius - 7, 0xffffff, isLocked ? 0.05 : 0.08);
                innerRing.setStrokeStyle(1, 0xffffff, 0.16);
                const shine = this.add.ellipse(-11, -15, 24, 13, 0xffffff, isLocked ? 0.08 : 0.18);
                const dayLabel = this.add
                  .text(0, 1, `${day.dayNumber}`, {
                    fontFamily: "Trebuchet MS, Verdana, sans-serif",
                    fontSize: layout.orientation === "horizontal" ? (isCurrent ? "28px" : "26px") : isCurrent ? "25px" : "23px",
                    color: isLocked ? "#cbd5e1" : "#f8fafc",
                    fontStyle: "bold",
                  })
                  .setOrigin(0.5)
                  .setAlpha(isLocked ? 0.5 : 1);

                const badgeBack = this.add.rectangle(0, -(nodeRadius + 8), 44, 16, 0x020617, 0.94);
                badgeBack.setStrokeStyle(1, 0xffffff, 0.08);
                const badgeText = this.add
                  .text(0, -(nodeRadius + 8), statusBadge, {
                    fontFamily: "Trebuchet MS, Verdana, sans-serif",
                    fontSize: "8px",
                    color: "#e2e8f0",
                    fontStyle: "bold",
                  })
                  .setOrigin(0.5);

                const toolDotX = nodeRadius - 8;
                const toolDotY = nodeRadius - 9;
                const toolDot = this.add.circle(toolDotX, toolDotY, 7, 0x08111f, 0.98);
                toolDot.setStrokeStyle(1, 0xffffff, 0.08);
                const toolDotInner = this.add.circle(toolDotX, toolDotY, 4, toolColor, 1);

                const hitArea = this.add.circle(0, 0, nodeRadius + 10, 0xffffff, 0.001);
                hitArea.setInteractive(new Phaser.Geom.Circle(0, 0, nodeRadius + 10), Phaser.Geom.Circle.Contains);

                node.add([
                  shadow,
                  halo,
                  outerShell,
                  fill,
                  innerRing,
                  shine,
                  badgeBack,
                  badgeText,
                  toolDot,
                  toolDotInner,
                  dayLabel,
                  hitArea,
                ]);

                if (isLocked) {
                  node.setAlpha(0.7);
                }

                if (isCurrent) {
                  this.tweens.add({
                    targets: halo,
                    alpha: { from: 0.28, to: 0.08 },
                    scaleX: { from: 1, to: 1.2 },
                    scaleY: { from: 1, to: 1.2 },
                    duration: 950,
                    yoyo: true,
                    repeat: -1,
                    ease: "Sine.easeInOut",
                  });
                }

                if (!isLocked) {
                  hitArea.on("pointerover", () => {
                    this.input.setDefaultCursor("pointer");
                    this.tweens.add({
                      targets: node,
                      scaleX: 1.07,
                      scaleY: 1.07,
                      duration: 120,
                      ease: "Quad.out",
                    });
                  });

                  hitArea.on("pointerout", () => {
                    this.input.setDefaultCursor("default");
                    this.tweens.add({
                      targets: node,
                      scaleX: 1,
                      scaleY: 1,
                      duration: 140,
                      ease: "Quad.out",
                    });
                  });

                  hitArea.on("pointerdown", () => {
                    if (isAvatarMoving) return;
                    travelAvatarTo(index, () => {
                      onDaySelect(day.id);
                    });
                  });
                }
              });

              const footer = this.add.graphics();
              footer.fillStyle(0x040b19, 0.92);
              footer.fillRoundedRect(layout.footerX, layout.footerY, layout.footerWidth, layout.footerHeight, 24);
              footer.lineStyle(1, 0xffffff, 0.08);
              footer.strokeRoundedRect(layout.footerX, layout.footerY, layout.footerWidth, layout.footerHeight, 24);

              const footerDay = activeDay?.dayNumber || 1;
              const footerTool = activeDay?.toolName || "";
              const footerTitle = activeDay?.title || "";

              footerDayText = this.add
                .text(layout.footerX + 20, layout.footerY + 16, `DAY ${footerDay}  ${footerTool}`.trim(), {
                  fontFamily: "Trebuchet MS, Verdana, sans-serif",
                  fontSize: "12px",
                  color: "#38bdf8",
                  fontStyle: "bold",
                })
                .setAlpha(0.95);

              footerTitleText = this.add
                .text(layout.footerX + 20, layout.footerY + 42, footerTitle, {
                  fontFamily: "Trebuchet MS, Verdana, sans-serif",
                  fontSize: layout.orientation === "horizontal" ? "22px" : "18px",
                  color: "#f8fafc",
                  fontStyle: "bold",
                  wordWrap: { width: layout.footerTextWidth, useAdvancedWrap: true },
                })
                .setAlpha(0.98);

              footerHintText = this.add
                .text(layout.footerX + 20, layout.footerY + 72, copy.approachPrompt, {
                  fontFamily: "Trebuchet MS, Verdana, sans-serif",
                  fontSize: layout.orientation === "horizontal" ? "13px" : "12px",
                  color: "#94a3b8",
                  wordWrap: { width: layout.footerTextWidth, useAdvancedWrap: true },
                })
                .setAlpha(0.94);

              footerActionBackground = this.add.rectangle(0, 0, layout.footerActionWidth, layout.footerActionHeight, 0x06b6d4, 0.32);
              footerActionBackground.setStrokeStyle(1, 0xffffff, 0.18);

              footerActionText = this.add
                .text(0, 0, copy.viewLesson, {
                  fontFamily: "Trebuchet MS, Verdana, sans-serif",
                  fontSize: layout.orientation === "horizontal" ? "16px" : "15px",
                  color: "#f8fafc",
                  fontStyle: "bold",
                })
                .setOrigin(0.5);

              footerActionContainer = this.add.container(
                layout.footerActionCenterX,
                layout.footerY + layout.footerHeight / 2,
                [footerActionBackground, footerActionText],
              );
              footerActionContainer.setSize(layout.footerActionWidth, layout.footerActionHeight);
              footerActionContainer.setDepth(30);
              footerActionContainer.setAlpha(0);
              footerActionContainer.setVisible(false);
              footerActionContainer.setInteractive(
                new Phaser.Geom.Rectangle(
                  -layout.footerActionWidth / 2,
                  -layout.footerActionHeight / 2,
                  layout.footerActionWidth,
                  layout.footerActionHeight,
                ),
                Phaser.Geom.Rectangle.Contains,
              );
              footerActionContainer.on("pointerover", () => {
                if (!footerInteractiveDay) return;
                this.input.setDefaultCursor("pointer");
                footerActionContainer?.setScale(1.03);
              });
              footerActionContainer.on("pointerout", () => {
                this.input.setDefaultCursor("default");
                footerActionContainer?.setScale(1);
              });
              footerActionContainer.on("pointerdown", () => {
                if (!footerInteractiveDay) return;
                onDaySelect(footerInteractiveDay.id);
              });

                setFooterActiveDay(null);

                if (!cancelled) {
                  setIsBooting(false);
                }
              } catch (error) {
                console.error("Failed inside Phaser scene.create:", error);
                if (!cancelled) {
                  setHasError(true);
                  setIsBooting(false);
                }
              }
            },
            update(_time, delta) {
              if (!avatar || !movementKeys || !cursors) {
                return;
              }

              const deltaSeconds = delta / 1000;
              const horizontal = (movementKeys.right.isDown || cursors.right?.isDown ? 1 : 0) - (movementKeys.left.isDown || cursors.left?.isDown ? 1 : 0);
              const vertical = (movementKeys.down.isDown || cursors.down?.isDown ? 1 : 0) - (movementKeys.up.isDown || cursors.up?.isDown ? 1 : 0);
              const isManualInput = horizontal !== 0 || vertical !== 0;

              if (isManualInput) {
                if (avatarTravelTween) {
                  avatarTravelTween.stop();
                  avatarTravelTween = null;
                  isAvatarMoving = false;
                }

                stopIdleFloat();

                const vector = new Phaser.Math.Vector2(horizontal, vertical).normalize().scale(AVATAR_SPEED * deltaSeconds);
                avatar.x = Phaser.Math.Clamp(avatar.x + vector.x, movementBounds.minX, movementBounds.maxX);
                avatar.y = Phaser.Math.Clamp(
                  avatar.y + vector.y,
                  movementBounds.minY - layout.avatarOffsetY,
                  movementBounds.maxY - layout.avatarOffsetY,
                );

                if (vector.x !== 0) {
                  avatar.setFlipX(vector.x < 0);
                }

                if (!avatar.anims.isPlaying) {
                  avatar.play("challenge-avatar-walk", true);
                }

                updateAvatarDecor();
              } else if (!isAvatarMoving) {
                if (avatar.anims.isPlaying) {
                  avatar.anims.stop();
                  avatar.setFrame(AVATAR_IDLE_FRAME);
                }

                updateAvatarDecor();
                startIdleFloat(this);
              }

              nearestUnlockedDay = null;
              let nearestDistance = Number.POSITIVE_INFINITY;

              unlockedDays.forEach((day) => {
                const dayIndex = days.findIndex((candidate) => candidate.id === day.id);
                const point = getAvatarPosition(positions[dayIndex], layout);
                const distanceToDay = Phaser.Math.Distance.Between(avatar.x, avatar.y, point.x, point.y);
                if (distanceToDay < nearestDistance && distanceToDay <= NODE_INTERACTION_RADIUS) {
                  nearestDistance = distanceToDay;
                  nearestUnlockedDay = day;
                  avatarIndex = dayIndex;
                }
              });

              setFooterActiveDay(nearestUnlockedDay);
              syncNearbyDay(nearestUnlockedDay);

              const wantsToInteract =
                Phaser.Input.Keyboard.JustDown(movementKeys.interact) ||
                Phaser.Input.Keyboard.JustDown(movementKeys.altInteract) ||
                Boolean(cursors.space && Phaser.Input.Keyboard.JustDown(cursors.space));

              if (nearestUnlockedDay && wantsToInteract) {
                onDaySelect(nearestUnlockedDay.id);
              }
            },
          },
        };

        game = new Phaser.Game(config);
      } catch (error) {
        console.error("Failed to mount Phaser challenge map:", error);
        if (!cancelled) {
          setHasError(true);
          setIsBooting(false);
        }
      }
    };

    void mountGame();

    return () => {
      cancelled = true;
      setNearbyDay(null);
      if (game) {
        game.destroy(true);
      }
    };
  }, [activeDay, copy, days, fullScreen, layout, onDaySelect, weekLabels]);

  return (
    <div
      className={cn(
        "overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_32%),linear-gradient(180deg,#091321_0%,#050c16_100%)]",
        fullScreen
          ? "flex h-full flex-col rounded-none border-0 shadow-none"
          : "rounded-[28px] border border-slate-800 shadow-[0_28px_60px_-28px_rgba(2,6,23,0.92)]",
        className,
      )}
    >
      <div className={cn("relative", fullScreen ? "min-h-0 flex-1 overflow-hidden px-4 py-5 sm:px-6" : "")}>
        <div className={cn(fullScreen ? "mx-auto flex h-full w-full items-center justify-center" : "")}>
          <div
            className={cn(
              "relative overflow-hidden",
              fullScreen
                ? "flex-none rounded-[32px] border border-white/10 shadow-[0_36px_80px_-38px_rgba(2,6,23,0.96)]"
                : "w-full",
            )}
            style={fullScreenStageStyle}
          >
            <div
              ref={containerRef}
              className={cn(
                "w-full",
                fullScreen ? "h-full min-h-0" : "aspect-[7/10] min-h-[420px]",
              )}
            />

            {isBooting ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-950/70 text-slate-100 backdrop-blur-sm">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-cyan-300" />
                <p className="text-sm font-medium">{copy.loading}</p>
              </div>
            ) : null}

            {hasError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/78 px-6 text-center text-sm font-medium text-slate-100 backdrop-blur-sm">
                {copy.error}
              </div>
            ) : null}

            {fullScreen && nearbyDay && !isBooting && !hasError ? (
              <div className="pointer-events-none absolute inset-x-4 bottom-5 flex justify-center">
                <div className="pointer-events-auto w-full max-w-md rounded-[28px] border border-white/12 bg-slate-950/92 p-5 text-slate-100 shadow-[0_28px_60px_-28px_rgba(2,6,23,0.98)] backdrop-blur-md">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                    {copy.dayLabel} {nearbyDay.dayNumber} {nearbyDay.toolName}
                  </p>
                  <h4 className="mt-3 text-xl font-bold text-white">
                    {nearbyDay.status === "completed" ? copy.reviewPrompt : copy.viewPrompt}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{nearbyDay.title}</p>
                  <p className="mt-2 text-xs text-slate-400">{copy.pressPrompt}</p>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
                      onClick={() => onDaySelect(nearbyDay.id)}
                    >
                      {nearbyDay.status === "completed" ? copy.reviewLesson : copy.viewLesson}
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className={cn("border-t border-white/10 px-4 py-4 text-slate-100", fullScreen ? "shrink-0 bg-slate-950/70 backdrop-blur-sm" : "")}>
        <p className="text-sm leading-6 text-slate-300">{copy.helper}</p>

        <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span>{copy.legendCompleted}</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
            <span>{copy.legendCurrent}</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-violet-300" />
            <span>{copy.legendUnlocked}</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-500" />
            <span>{copy.legendLocked}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
