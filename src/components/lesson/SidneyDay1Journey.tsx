import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Globe,
  ImageIcon,
  Layers3,
  Loader2,
  Monitor,
  Sparkles,
  Smartphone,
  Wand2,
} from "lucide-react";

import { FillBlanks } from "@/components/lesson/FillBlanks";
import { Button } from "@/components/ui/button";
import happyWomanFrame from "@/assets/lesson/sidney/frames/happy-woman.jpeg";
import sadWomanFrame from "@/assets/lesson/sidney/frames/sad-woman.jpeg";
import angryWomanFrame from "@/assets/lesson/sidney/frames/angry-woman.jpeg";
import happyWomanVideo from "@/assets/lesson/sidney/videos/happy-woman.mp4";
import sadWomanVideo from "@/assets/lesson/sidney/videos/sad-woman.mp4";
import angryWomanVideo from "@/assets/lesson/sidney/videos/angry-woman.mp4";
import {
  getSidneyDay1JourneyCopy,
  resolveSidneyJourneyLocale,
  type SidneyJourneyLocale,
  type SidneyJourneySectionKey,
} from "@/components/lesson/sidneyDay1JourneyCopy";
import {
  getSidneySitePreviewHtml,
  getSidneySitePreviewUrl,
} from "@/components/lesson/sidneySitePreviewHtml";
import { getSidneySlidesDeck } from "@/components/lesson/sidneySlidesDeckAssets";
import { cn } from "@/lib/utils";

type CreationSectionKey = "frames" | "video" | "flyer" | "slides" | "site";
type GeneratorPhase = "pick" | "loading" | "result";

interface SidneyDay1JourneyProps {
  section: SidneyJourneySectionKey;
  onComplete: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const overviewIcons = {
  frames: ImageIcon,
  video: Clapperboard,
  flyer: ImageIcon,
  slides: Layers3,
  site: Globe,
} as const;

const SIDNEY_FRAME_RESULT_ASSETS = {
  A: happyWomanFrame,
  B: sadWomanFrame,
  C: angryWomanFrame,
} as const;

const SIDNEY_VIDEO_RESULT_ASSETS = {
  A: happyWomanVideo,
  B: sadWomanVideo,
  C: angryWomanVideo,
} as const;

const sectionThemes: Record<
  SidneyJourneySectionKey,
  {
    accent: string;
    accentSoft: string;
    surfaceBorder: string;
    surfaceGlow: string;
    darkPanel: string;
    darkBorder: string;
    buttonClass: string;
  }
> = {
  intro: {
    accent: "text-[#f97316]",
    accentSoft: "bg-[#fff0e4] text-[#d35f12]",
    surfaceBorder: "border-[#f5d8c0]",
    surfaceGlow: "from-[#ffcfaa]/40 via-white to-[#ffe8d5]",
    darkPanel: "bg-[#15120f]",
    darkBorder: "border-[#3b2a1e]",
    buttonClass: "bg-[#1f2434] hover:bg-[#111726]",
  },
  frames: {
    accent: "text-[#b88700]",
    accentSoft: "bg-[#fff1c2] text-[#9b6d00]",
    surfaceBorder: "border-[#f3dfaa]",
    surfaceGlow: "from-[#ffe9a3]/45 via-white to-[#fff4d2]",
    darkPanel: "bg-[#1d1608]",
    darkBorder: "border-[#6b5314]",
    buttonClass: "bg-[#b88700] hover:bg-[#9f7600]",
  },
  video: {
    accent: "text-[#1d8cf8]",
    accentSoft: "bg-[#e9f6ff] text-[#0f6fc7]",
    surfaceBorder: "border-[#cae7ff]",
    surfaceGlow: "from-[#c4ebff]/45 via-white to-[#dff5ff]",
    darkPanel: "bg-[#081726]",
    darkBorder: "border-[#173756]",
    buttonClass: "bg-[#0f6fc7] hover:bg-[#0b5da7]",
  },
  flyer: {
    accent: "text-[#0f9f84]",
    accentSoft: "bg-[#e6fbf5] text-[#0b7f69]",
    surfaceBorder: "border-[#c6efe3]",
    surfaceGlow: "from-[#d8faef]/45 via-white to-[#eafdf6]",
    darkPanel: "bg-[#081915]",
    darkBorder: "border-[#174639]",
    buttonClass: "bg-[#0b7f69] hover:bg-[#096a58]",
  },
  slides: {
    accent: "text-[#8b5cf6]",
    accentSoft: "bg-[#f1eaff] text-[#6f3ff1]",
    surfaceBorder: "border-[#decfff]",
    surfaceGlow: "from-[#eadfff]/45 via-white to-[#f4eefe]",
    darkPanel: "bg-[#120b24]",
    darkBorder: "border-[#3a2567]",
    buttonClass: "bg-[#6f3ff1] hover:bg-[#5e35ca]",
  },
  site: {
    accent: "text-[#ea8a11]",
    accentSoft: "bg-[#fff3df] text-[#c46d06]",
    surfaceBorder: "border-[#f4dfbf]",
    surfaceGlow: "from-[#ffebc8]/45 via-white to-[#fff5e5]",
    darkPanel: "bg-[#1b1308]",
    darkBorder: "border-[#5a3c14]",
    buttonClass: "bg-[#c46d06] hover:bg-[#a85d05]",
  },
  summary: {
    accent: "text-[#2563eb]",
    accentSoft: "bg-[#eaf2ff] text-[#1d4ed8]",
    surfaceBorder: "border-[#d4e1ff]",
    surfaceGlow: "from-[#d8e6ff]/45 via-white to-[#eef4ff]",
    darkPanel: "bg-[#0d1528]",
    darkBorder: "border-[#243963]",
    buttonClass: "bg-[#1f2434] hover:bg-[#111726]",
  },
};

const SectionContainer = ({
  children,
  theme,
}: {
  children: ReactNode;
  theme: (typeof sectionThemes)[SidneyJourneySectionKey];
}) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={fadeUp}
    className={cn(
      "relative overflow-hidden rounded-[28px] border bg-[linear-gradient(135deg,#fffdf9_0%,#ffffff_46%,#fff9f0_100%)] p-4 shadow-[0_30px_90px_rgba(15,23,42,0.08)] sm:rounded-[36px] sm:p-7 xl:p-8",
      theme.surfaceBorder,
    )}
  >
    <div
      className={cn(
        "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))]",
        theme.surfaceGlow,
      )}
    />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

const ContinueFooter = ({
  label,
  helper,
  onClick,
  className,
}: {
  label: string;
  helper: string;
  onClick: () => void;
  className: string;
}) => (
  <div className="mt-6 rounded-[24px] border border-black/5 bg-white/85 p-4 shadow-sm sm:rounded-[28px]">
    <p className="text-sm leading-7 text-[#586174]">{helper}</p>
    <Button
      className={cn(
        "mt-4 h-12 w-full justify-center rounded-2xl px-6 text-base font-semibold text-white sm:w-auto",
        className,
      )}
      onClick={onClick}
    >
      {label}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </div>
);

const LoadingStage = ({
  title,
  lines,
  progress,
  theme,
  progressLabel,
  pipelineLabel,
}: {
  title: string;
  lines: string[];
  progress: number;
  theme: (typeof sectionThemes)[SidneyJourneySectionKey];
  progressLabel: string;
  pipelineLabel: string;
}) => (
  <div className={cn("rounded-[26px] border p-4 text-white shadow-2xl sm:rounded-[30px] sm:p-5", theme.darkPanel, theme.darkBorder)}>
    <div className="flex items-start gap-3 sm:items-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-white/55">{pipelineLabel}</p>
        <h3 className="mt-1 text-lg font-semibold sm:text-xl">{title}</h3>
      </div>
    </div>

    <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
      <motion.div
        className="h-full rounded-full bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.7)_100%)]"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />
    </div>
    <p className="mt-2 text-sm text-white/70">{progressLabel}</p>

    <div className="mt-5 space-y-3">
      {lines.map((line, index) => (
        <motion.div
          key={line}
          initial={{ opacity: 0.2, x: -8 }}
          animate={{ opacity: progress > index * 25 ? 1 : 0.45, x: 0 }}
          className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 sm:px-4"
        >
          <Sparkles className="mt-0.5 h-4 w-4 text-white/70" />
          <p className="text-sm leading-7 text-white/86">{line}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const VideoPreview = ({ option, commonCopy }: { option: any; commonCopy: any }) => {
  const videos = (option.resultVideos ?? [{ alt: option.previewTitle }]).map(
    (video: any) => ({
      ...video,
      label: commonCopy.generatedVideoLabel,
      src:
        video.src ??
        SIDNEY_VIDEO_RESULT_ASSETS[
          option.id as keyof typeof SIDNEY_VIDEO_RESULT_ASSETS
        ],
    }),
  );

  return (
    <div className="rounded-[26px] border border-white/10 bg-[#08131d] p-3 shadow-2xl sm:rounded-[30px] sm:p-4">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-white/75">
          {commonCopy.generatedResultBadge}
        </div>
        <p className="text-sm text-white/70">{option.previewTitle}</p>
      </div>

      <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-[24px] border border-white/10 bg-[#071019]">
        <div className="relative aspect-[9/16] overflow-hidden bg-black">
          {videos[0]?.src ? (
            <video
              src={videos[0].src}
              className="h-full w-full object-cover"
              controls
              playsInline
              preload="metadata"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center text-white">
              <Clapperboard className="h-10 w-10 text-white/80" />
              <p className="mt-4 text-xs font-black uppercase tracking-[0.24em] text-white/55">
                {commonCopy.finalAssetLabel}
              </p>
              <p className="mt-3 text-sm leading-7 text-white/78">
                {commonCopy.videoAssetPending}
              </p>
            </div>
          )}
        </div>
        <div className="border-t border-white/10 bg-black/20 px-3 py-3 text-center text-[11px] font-black uppercase tracking-[0.18em] text-white">
          {videos[0]?.label ?? commonCopy.generatedVideoLabel}
        </div>
      </div>

      <div className="mt-4 rounded-[22px] border border-white/10 bg-white/5 p-4 text-white sm:rounded-[24px]">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-white/55">{option.label}</p>
        <h3 className="mt-2 text-lg font-semibold sm:text-xl">{option.previewTitle}</h3>
        <p className="mt-2 text-sm leading-7 text-white/80">{option.previewDescription}</p>
      </div>
    </div>
  );
};

const VideoPendingPreview = ({ option, commonCopy }: { option: any; commonCopy: any }) => (
  <div className="rounded-[26px] border border-white/10 bg-[#08131d] p-4 shadow-2xl sm:rounded-[30px] sm:p-5">
    <div className="rounded-[24px] border border-dashed border-white/15 bg-white/[0.03] p-5 text-center text-white sm:rounded-[26px] sm:p-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] bg-white/8">
        <Clapperboard className="h-8 w-8 text-white/75" />
      </div>
      <p className="mt-5 text-xs font-black uppercase tracking-[0.24em] text-white/55">
        {commonCopy.protectedResultLabel}
      </p>
      <h3 className="mt-3 text-xl font-semibold sm:text-2xl">{option.previewTitle}</h3>
      <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/78">
        {commonCopy.hiddenVideoHint}
      </p>
    </div>

    <div className="mx-auto mt-5 w-full max-w-[280px] rounded-[22px] border border-white/10 bg-white/[0.04] p-4 sm:max-w-[320px]">
      <div className="aspect-[9/16] rounded-[18px] border border-dashed border-white/10 bg-white/[0.03]" />
      <div className="mt-3 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-center text-[11px] font-black uppercase tracking-[0.18em] text-white/68">
        {commonCopy.hiddenVideoLabel}
      </div>
    </div>
  </div>
);

const FramesPreview = ({ option, commonCopy }: { option: any; commonCopy: any }) => {
  const mood =
    option.id === "A"
      ? "from-[#facc15] via-[#f59e0b] to-[#f97316]"
      : option.id === "B"
        ? "from-[#64748b] via-[#475569] to-[#1e293b]"
        : "from-[#c084fc] via-[#8b5cf6] to-[#4338ca]";
  const frames = (option.resultFrames ?? [{ alt: option.previewTitle }]).map(
    (frame: any) => ({
      ...frame,
      label: commonCopy.generatedFrameLabel,
      src: frame.src ?? SIDNEY_FRAME_RESULT_ASSETS[option.id as keyof typeof SIDNEY_FRAME_RESULT_ASSETS],
    }),
  );
  const isSingleFrame = frames.length === 1;

  return (
    <div className="rounded-[26px] border border-white/10 bg-[#1d1608] p-3 shadow-2xl sm:rounded-[30px] sm:p-4">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-white/75">
          {commonCopy.generatedResultBadge}
        </div>
        <p className="text-sm text-white/70">{option.previewTitle}</p>
      </div>

      <div className={cn("grid gap-3", isSingleFrame ? "grid-cols-1" : "sm:grid-cols-3")}>
        {frames.map((frame: any) => (
          <div
            key={frame.label}
            className={cn(
              "overflow-hidden rounded-[24px] border border-white/10 bg-[#251c0e]",
              isSingleFrame ? "mx-auto w-full max-w-[360px]" : "",
            )}
          >
            <div className={cn("relative overflow-hidden bg-[#1a1309]", isSingleFrame ? "aspect-[3/4]" : "aspect-[3/4]")}>
              {frame.src ? (
                <img
                  src={frame.src}
                  alt={frame.alt}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className={cn(
                    "flex h-full flex-col items-center justify-center bg-gradient-to-b",
                    mood,
                  )}
                >
                  <div className="rounded-full bg-white/14 p-3">
                    <ImageIcon className="h-7 w-7 text-white/85" />
                  </div>
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-white/70">
                    {commonCopy.finalAssetLabel}
                  </p>
                  <p className="mt-2 px-6 text-center text-sm text-white/80">
                    {commonCopy.frameAssetPending}
                  </p>
                </div>
              )}
            </div>
            <div className="border-t border-white/10 bg-black/20 px-3 py-3 text-center text-[11px] font-black uppercase tracking-[0.18em] text-white">
              {frame.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-[22px] border border-white/10 bg-white/5 p-4 text-white sm:rounded-[24px]">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-white/55">{option.label}</p>
        <h3 className="mt-2 text-lg font-semibold sm:text-xl">{option.previewTitle}</h3>
        <p className="mt-2 text-sm leading-7 text-white/80">{option.previewDescription}</p>
      </div>
    </div>
  );
};

const FramesPendingPreview = ({ option, commonCopy }: { option: any; commonCopy: any }) => (
  <div className="rounded-[26px] border border-white/10 bg-[#1d1608] p-4 shadow-2xl sm:rounded-[30px] sm:p-5">
    <div className="rounded-[24px] border border-dashed border-white/15 bg-white/[0.03] p-5 text-center text-white sm:rounded-[26px] sm:p-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] bg-white/8">
        <ImageIcon className="h-8 w-8 text-white/75" />
      </div>
      <p className="mt-5 text-xs font-black uppercase tracking-[0.24em] text-white/55">
        {commonCopy.protectedResultLabel}
      </p>
      <h3 className="mt-3 text-xl font-semibold sm:text-2xl">{option.previewTitle}</h3>
      <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/78">
        {commonCopy.hiddenFramesHint}
      </p>
    </div>

    <div className="mt-5 grid gap-3 sm:grid-cols-3">
      {[1, 2, 3].map((slot) => (
        <div
          key={slot}
          className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4"
        >
          <div className="aspect-[4/5] rounded-[18px] border border-dashed border-white/10 bg-white/[0.03]" />
          <div className="mt-3 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-center text-[11px] font-black uppercase tracking-[0.18em] text-white/68">
            {commonCopy.hiddenFrameLabel}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const FlyerPreview = ({ option, commonCopy }: { option: any; commonCopy: any }) => {
  const posterClasses =
    option.id === "A"
      ? "from-[#c9efff] via-[#7dd3fc] to-[#ffffff] text-[#0f3b63]"
      : option.id === "B"
        ? "from-[#00d4ff] via-[#2dd4bf] to-[#fef08a] text-[#083344]"
        : "from-[#1f172a] via-[#3b1d49] to-[#7c2d12] text-[#fff7ed]";

  return (
    <div className="rounded-[26px] border border-[#eef2f7] bg-white p-3 shadow-xl sm:rounded-[30px] sm:p-4">
      <div className="rounded-[22px] border border-[#eef2f7] bg-[#fafcff] p-3 sm:rounded-[26px]">
        <div className={cn("relative aspect-[4/5] overflow-hidden rounded-[20px] bg-gradient-to-br p-4 sm:rounded-[24px] sm:p-5", posterClasses)}>
          <div className="absolute right-6 top-6 h-16 w-16 rounded-full bg-white/25" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/25 to-transparent" />
          <div className="absolute -left-8 bottom-10 h-32 w-[130%] rotate-[-7deg] rounded-[60%] bg-white/18" />
          <p className="relative text-xs font-black uppercase tracking-[0.24em]">{option.label}</p>
          <h3 className="relative mt-5 max-w-[12rem] text-[1.55rem] font-black leading-tight sm:mt-6 sm:max-w-[14rem] sm:text-[2rem]">{option.previewTitle}</h3>
          <p className="relative mt-3 max-w-[13rem] text-sm leading-6 opacity-90 sm:max-w-[15rem]">{option.previewDescription}</p>
          <div className="absolute left-4 bottom-4 rounded-full bg-white/85 px-3 py-2 text-xs font-bold text-[#083344] sm:left-5 sm:bottom-5 sm:px-4 sm:text-sm">
            {commonCopy.flyerCtaLabel}
          </div>
        </div>
      </div>
    </div>
  );
};

const SlidesPreviewFallback = ({ option }: { option: any }) => {
  const cardTone =
    option.id === "A"
      ? "from-[#312e81] to-[#8b5cf6]"
      : option.id === "B"
        ? "from-[#0f172a] to-[#2563eb]"
        : "from-[#4c1d95] to-[#7c3aed]";

  return (
    <div className="rounded-[26px] border border-white/10 bg-[#120b24] p-3 shadow-2xl sm:rounded-[30px] sm:p-4">
      <div className="grid gap-4 lg:grid-cols-[180px_1fr]">
        <div className="space-y-3">
          {[1, 2, 3].map((slide) => (
            <div key={slide} className="rounded-[18px] border border-white/10 bg-white/6 p-3">
              <div className={cn("h-16 rounded-[14px] bg-gradient-to-br", cardTone)} />
              <div className="mt-3 h-2 rounded-full bg-white/14" />
              <div className="mt-2 h-2 w-3/4 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
        <div className="rounded-[22px] border border-white/10 bg-white/6 p-4 text-white sm:rounded-[24px] sm:p-5">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-white/55">{option.label}</p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight sm:text-[1.9rem]">{option.previewTitle}</h3>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/80">{option.previewDescription}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {option.previewTags.map((tag: string) => (
              <div key={tag} className="rounded-[18px] border border-white/10 bg-white/7 px-4 py-3 text-sm text-white/85">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SitePreview = ({
  option,
  locale,
}: {
  option: any;
  locale: SidneyJourneyLocale;
}) => {
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const chromeTone =
    option.id === "A"
      ? "bg-[#111114]"
      : option.id === "B"
        ? "bg-[#f7f7f5]"
        : "bg-[#f6f1e8]";
  const siteHtml = useMemo(
    () => getSidneySitePreviewHtml(option.id, locale),
    [locale, option.id],
  );
  const siteUrl = getSidneySitePreviewUrl(option.id);

  return (
    <div className="rounded-[26px] border border-white/10 bg-[#15110b] p-3 shadow-2xl sm:rounded-[30px] sm:p-4">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-white/50">
            Live Site Preview
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">{option.previewTitle}</h3>
        </div>
        <div className="flex w-full items-center justify-between gap-2 rounded-full border border-white/10 bg-white/5 p-1 sm:w-auto sm:justify-start">
          <button
            type="button"
            onClick={() => setViewport("desktop")}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
              viewport === "desktop" ? "bg-white text-[#111827]" : "text-white/68 hover:bg-white/10",
            )}
            aria-label="Desktop preview"
          >
            <Monitor className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewport("mobile")}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
              viewport === "mobile" ? "bg-white text-[#111827]" : "text-white/68 hover:bg-white/10",
            )}
            aria-label="Mobile preview"
          >
            <Smartphone className="h-4 w-4" />
          </button>
          <div className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-white/78">
            {locale.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white">
        <div className={cn("flex flex-wrap items-center gap-2 border-b border-black/5 px-3 py-3 sm:px-4", chromeTone)}>
          <span className="h-3 w-3 rounded-full bg-[#f87171]" />
          <span className="h-3 w-3 rounded-full bg-[#facc15]" />
          <span className="h-3 w-3 rounded-full bg-[#34d399]" />
          <div className="mt-2 max-w-full flex-1 truncate rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-[#475569] sm:ml-4 sm:mt-0 sm:max-w-[70%] sm:px-4">
            {siteUrl}
          </div>
        </div>

        <div className="bg-[#ece8df] p-2 sm:p-4">
          <div
            className={cn(
              "mx-auto overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition-all",
              viewport === "mobile" ? "max-w-[360px] sm:max-w-[390px]" : "w-full",
            )}
          >
            <iframe
              key={`${option.id}-${locale}-${viewport}`}
              title={option.name}
              srcDoc={siteHtml}
              sandbox="allow-forms allow-modals allow-scripts"
              className="h-[560px] w-full bg-white sm:h-[720px]"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {option.previewTags.map((tag: string) => (
          <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-white/76">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const SlidesPreview = ({
  option,
  locale,
}: {
  option: any;
  locale: SidneyJourneyLocale;
}) => {
  const slides = useMemo(
    () => getSidneySlidesDeck(option.id, locale),
    [locale, option.id],
  );
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    setActiveSlideIndex(0);
  }, [locale, option.id, slides.length]);

  if (!slides.length) {
    return <SlidesPreviewFallback option={option} />;
  }

  const currentSlide = slides[activeSlideIndex];
  const isFirstSlide = activeSlideIndex === 0;
  const isLastSlide = activeSlideIndex === slides.length - 1;

  return (
    <div className="rounded-[26px] border border-white/10 bg-[#120b24] p-3 shadow-2xl sm:rounded-[30px] sm:p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">
            {option.label}
          </p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-[1.9rem]">
            {option.previewTitle}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/78">
            {option.previewDescription}
          </p>
        </div>

        <div className="self-start rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-black tracking-[0.18em] text-white/80">
          {String(activeSlideIndex + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </div>
      </div>

      <div className="mt-5 rounded-[22px] border border-white/10 bg-white/6 p-3 sm:rounded-[24px] sm:p-4">
        <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#1a1133] shadow-[0_18px_50px_rgba(15,23,42,0.3)]">
          <img
            src={currentSlide.src}
            alt={`${option.name} - ${currentSlide.title}`}
            className="h-auto w-full bg-[#1a1133] object-contain"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-white/45">
              Slide {String(currentSlide.order).padStart(2, "0")}
            </p>
            <p className="mt-2 text-sm text-white/82">{currentSlide.title}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setActiveSlideIndex((currentIndex) =>
                  Math.max(0, currentIndex - 1),
                )
              }
              disabled={isFirstSlide}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white transition-colors hover:bg-white/12 disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveSlideIndex((currentIndex) =>
                  Math.min(slides.length - 1, currentIndex + 1),
                )
              }
              disabled={isLastSlide}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white text-[#120b24] transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 xl:grid-cols-5">
        {slides.map((slide, index) => {
          const isActive = index === activeSlideIndex;

          return (
            <button
              key={slide.fileName}
              type="button"
              onClick={() => setActiveSlideIndex(index)}
              className={cn(
                "min-w-[156px] flex-none rounded-[20px] border p-2 text-left transition-all sm:min-w-0",
                isActive
                  ? "border-white/60 bg-white/14 shadow-[0_12px_30px_rgba(139,92,246,0.24)]"
                  : "border-white/10 bg-white/5 hover:bg-white/10",
              )}
            >
              <div className="overflow-hidden rounded-[14px] border border-white/10 bg-[#1a1133]">
                <img
                  src={slide.src}
                  alt={`${option.name} thumbnail ${slide.order}`}
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2 py-1 text-[10px] font-black tracking-[0.18em]",
                    isActive
                      ? "bg-white text-[#120b24]"
                      : "bg-white/8 text-white/78",
                  )}
                >
                  {String(slide.order).padStart(2, "0")}
                </span>
                <span className="min-w-0 truncate text-[11px] text-white/74">
                  {slide.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const CreationWorkspace = ({
  sectionKey,
  sectionCopy,
  commonCopy,
  locale,
  theme,
  onComplete,
}: {
  sectionKey: CreationSectionKey;
  sectionCopy: any;
  commonCopy: any;
  locale: SidneyJourneyLocale;
  theme: (typeof sectionThemes)[SidneyJourneySectionKey];
  onComplete: () => void;
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState(sectionCopy.options[0]?.id ?? "A");
  const [phase, setPhase] = useState<GeneratorPhase>("pick");
  const [progress, setProgress] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});
  const outputPanelRef = useRef<HTMLDivElement | null>(null);
  const promptPanelRef = useRef<HTMLDivElement | null>(null);
  const stackOutputBelow = true;
  const extendedLoadingDuration = sectionKey === "frames" || sectionKey === "video";

  const selectedOption = sectionCopy.options.find((option: any) => option.id === selectedOptionId);
  const selectedExercise = selectedOption?.exercise;
  const requiresExercise = Boolean(selectedExercise);
  const isSelectedExerciseComplete = !requiresExercise || Boolean(completedExercises[selectedOptionId]);

  useEffect(() => {
    if (phase !== "loading") return undefined;

    setProgress(0);
    const totalMs = extendedLoadingDuration ? 10000 : 3200;
    const start = Date.now();
    const interval = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const nextValue = Math.min(100, Math.round((elapsed / totalMs) * 100));
      setProgress(nextValue);

      if (elapsed >= totalMs) {
        window.clearInterval(interval);
        setPhase("result");
      }
    }, 120);

    return () => window.clearInterval(interval);
  }, [phase, extendedLoadingDuration]);

  useEffect(() => {
    if (phase === "pick") return;

    const timeout = window.setTimeout(() => {
      outputPanelRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);

    return () => window.clearTimeout(timeout);
  }, [phase]);

  const handleSelectOption = (optionId: string) => {
    setSelectedOptionId(optionId);
    setPhase("pick");
    setProgress(0);
  };

  const handleGenerate = () => {
    if (!isSelectedExerciseComplete) return;
    setPhase("loading");
  };

  const handleExerciseComplete = () => {
    setCompletedExercises((current) => ({
      ...current,
      [selectedOptionId]: true,
    }));

    window.setTimeout(() => {
      promptPanelRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  };

  const handleRedoExercise = () => {
    setCompletedExercises((current) => ({
      ...current,
      [selectedOptionId]: false,
    }));
    setPhase("pick");
    setProgress(0);
  };

  const renderPreview = () => {
    if (sectionKey === "frames" && phase !== "result") {
      return <FramesPendingPreview option={selectedOption} commonCopy={commonCopy} />;
    }
    if (sectionKey === "video" && phase !== "result") {
      return <VideoPendingPreview option={selectedOption} commonCopy={commonCopy} />;
    }
    if (sectionKey === "frames") return <FramesPreview option={selectedOption} commonCopy={commonCopy} />;
    if (sectionKey === "video") return <VideoPreview option={selectedOption} commonCopy={commonCopy} />;
    if (sectionKey === "flyer") return <FlyerPreview option={selectedOption} commonCopy={commonCopy} />;
    if (sectionKey === "slides") {
      return <SlidesPreview option={selectedOption} locale={locale} />;
    }
    return <SitePreview option={selectedOption} locale={locale} />;
  };

  const outputPanel = (
    <div ref={outputPanelRef} className="space-y-6">
      <AnimatePresence mode="wait">
        {phase === "loading" ? (
          <motion.div key="loading" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
            <LoadingStage
              title={sectionCopy.loadingTitle}
              lines={sectionCopy.loadingLines}
              progress={progress}
              theme={theme}
              progressLabel={commonCopy.loadingProgress(progress)}
              pipelineLabel={commonCopy.pipelineLabel}
            />
          </motion.div>
        ) : (
          <motion.div
            key={`${phase}-${selectedOptionId}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-4"
          >
            {renderPreview()}
            <div className="rounded-[24px] border border-black/5 bg-white/85 p-5 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                <div className={cn("rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.22em]", theme.accentSoft)}>
                  {commonCopy.resultLabel}
                </div>
                <p className="text-sm text-[#627084]">{selectedOption.previewTitle}</p>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-[#1f2434]">{sectionCopy.resultTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-[#586174]">{sectionCopy.resultDescription}</p>
              <p className="mt-4 text-sm leading-7 text-[#7b8796]">{commonCopy.readyToContinue}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {phase === "result" ? (
        <ContinueFooter
          label={sectionCopy.continueLabel}
          helper={sectionCopy.continueHelper}
          onClick={onComplete}
          className={theme.buttonClass}
        />
      ) : null}
    </div>
  );

  return (
    <div className="grid gap-6 grid-cols-1">
      <div className="space-y-6">
        <div className="rounded-[24px] border border-black/5 bg-white/85 p-4 shadow-sm sm:rounded-[28px] sm:p-5">
          <div className="flex items-center gap-3">
            <div className={cn("rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.22em]", theme.accentSoft)}>
              {commonCopy.simulatorBadge}
            </div>
            <p className="text-sm text-[#6b7280]">{sectionCopy.tool}</p>
          </div>

          <h2 className="mt-4 font-serif text-[1.95rem] leading-tight text-[#1f2434] sm:text-[2.3rem]">{sectionCopy.title}</h2>
          <p className="mt-3 text-base leading-7 text-[#495466] sm:text-[1.02rem] sm:leading-8">{sectionCopy.description}</p>

          <div className="mt-6 grid gap-3">
            {sectionCopy.steps.map((step: string, index: number) => (
              <div key={step} className="flex items-start gap-3 rounded-[20px] border border-[#edf1f5] bg-[#fbfcfe] p-3.5 sm:gap-4 sm:rounded-[22px] sm:p-4">
                <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black text-white", theme.buttonClass)}>
                  {index + 1}
                </div>
                <p className="text-sm leading-7 text-[#364152]">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-black/5 bg-white/85 p-4 shadow-sm sm:rounded-[28px] sm:p-5">
          <div className="flex items-center gap-2">
            <Wand2 className={cn("h-5 w-5", theme.accent)} />
            <h3 className="text-lg font-semibold text-[#1f2434]">{commonCopy.choosePrompt}</h3>
          </div>
          <p className="mt-2 text-sm leading-7 text-[#627084]">{sectionCopy.promptHint}</p>

          <div className="mt-5 space-y-3">
            {sectionCopy.options.map((option: any) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelectOption(option.id)}
                className={cn(
                  "w-full rounded-[24px] border p-4 text-left transition-all",
                  selectedOptionId === option.id
                    ? "border-[#111827] bg-[#fffaf4] shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
                    : "border-[#e9eef4] bg-[#fbfcfe] hover:border-[#cbd5e1]",
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9a5b14]">{option.label}</p>
                    <h4 className="mt-2 text-lg font-semibold text-[#1f2434]">{option.name}</h4>
                  </div>
                  <div className={cn("rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.18em]", selectedOptionId === option.id ? theme.accentSoft : "bg-[#f3f4f6] text-[#64748b]")}>
                    {selectedOptionId === option.id ? commonCopy.promptSelected : option.id}
                  </div>
                </div>
                <p className="mt-3 break-words text-sm leading-7 text-[#586174]">{option.previewDescription}</p>
              </button>
            ))}
          </div>
        </div>

        {selectedExercise ? (
          <div className="rounded-[24px] border border-black/5 bg-white/85 p-4 shadow-sm sm:rounded-[28px] sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className={cn("text-xs font-black uppercase tracking-[0.22em]", theme.accent)}>
                  {commonCopy.exerciseBadge}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-[#1f2434]">
                  {selectedExercise.title}
                </h3>
              </div>
              <div className={cn("rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.18em]", theme.accentSoft)}>
                {selectedOption.label}
              </div>
            </div>

            <p className="mt-3 text-sm leading-7 text-[#627084]">
              {commonCopy.exerciseLockedHint}
            </p>

            <div className="mt-5">
              {isSelectedExerciseComplete ? (
                <div className="rounded-[22px] border border-[#d8efe5] bg-[#f3fbf7] p-4 sm:rounded-[24px] sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">
                        {commonCopy.exerciseCompleted}
                      </p>
                      <h4 className="mt-2 text-lg font-semibold text-[#134e4a]">
                        {commonCopy.promptReadyTitle}
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={handleRedoExercise}
                      className="rounded-full border border-[#b6ddd2] bg-white px-4 py-2 text-sm font-semibold text-[#115e59] transition-colors hover:bg-[#ecfdf5]"
                    >
                      {commonCopy.redoExercise}
                    </button>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[#285e61]">
                    {commonCopy.promptReadyBody}
                  </p>
                </div>
              ) : (
                <FillBlanks
                  key={`${sectionKey}-${selectedOptionId}`}
                  title={selectedExercise.title}
                  sentence={selectedExercise.sentence}
                  answers={selectedExercise.answers}
                  options={selectedExercise.options}
                  explanation={selectedExercise.explanation}
                  onComplete={handleExerciseComplete}
                  showCorrectSentenceOnError
                />
              )}
            </div>
          </div>
        ) : null}

        <div ref={promptPanelRef} className="rounded-[24px] border border-black/5 bg-white/85 p-4 shadow-sm sm:rounded-[28px] sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-[#1f2434]">
              {isSelectedExerciseComplete ? commonCopy.promptReadyTitle : commonCopy.promptLockedTitle}
            </h3>
            <div className={cn("rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.18em]", theme.accentSoft)}>
              {selectedOption.label}
            </div>
          </div>
            <div className="mt-4 overflow-hidden rounded-[22px] border border-[#e8edf3] bg-[#0f172a] sm:rounded-[24px]">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-xs font-black uppercase tracking-[0.22em] text-white/55">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]" />
                {commonCopy.promptPanelLabel}
              </div>
              <pre className="whitespace-pre-wrap break-words px-4 py-4 text-[13px] leading-6 text-[#dbeafe] sm:text-sm sm:leading-7">
                {isSelectedExerciseComplete ? selectedOption.prompt : commonCopy.promptLockedBody}
            </pre>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {selectedOption.previewTags.map((tag: string) => (
              <span key={tag} className="rounded-full border border-[#e8edf3] bg-[#fbfcfe] px-3 py-1 text-xs font-bold text-[#586174]">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              className={cn("h-12 rounded-2xl px-6 text-base font-semibold text-white", theme.buttonClass)}
              onClick={handleGenerate}
              disabled={phase === "loading" || !isSelectedExerciseComplete}
            >
              {phase === "result" ? commonCopy.regenerate : commonCopy.generate}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          {!isSelectedExerciseComplete ? (
            <p className="mt-3 text-sm leading-7 text-[#8a5a1f]">{commonCopy.exerciseLockedHint}</p>
          ) : null}
        </div>

        {stackOutputBelow && phase !== "pick" ? outputPanel : null}
      </div>
    </div>
  );
};

const SidneyDay1Journey = ({
  section,
  onComplete,
}: SidneyDay1JourneyProps) => {
  const { i18n } = useTranslation();
  const locale = useMemo(
    () => resolveSidneyJourneyLocale(i18n.resolvedLanguage || i18n.language),
    [i18n.language, i18n.resolvedLanguage],
  );
  const copy = useMemo(
    () => getSidneyDay1JourneyCopy(i18n.resolvedLanguage || i18n.language),
    [i18n.language, i18n.resolvedLanguage],
  );

  const resolvedSection = (["intro", "frames", "video", "flyer", "slides", "site", "summary"] as const).includes(
    section,
  )
    ? section
    : "intro";
  const theme = sectionThemes[resolvedSection];

  if (resolvedSection === "intro") {
    return (
      <SectionContainer theme={theme}>
        <div className="flex items-center gap-3">
          <div className={cn("rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.22em]", theme.accentSoft)}>
            {copy.intro.eyebrow}
          </div>
        </div>

        <div className="mt-5 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <div>
            <h1 className="font-serif text-[2.35rem] leading-[1.05] text-[#1f2434] sm:text-[3.4rem]">
              {copy.intro.title}
            </h1>
            <p className="mt-5 text-base leading-7 text-[#475569] sm:text-[1.08rem] sm:leading-8">{copy.intro.description}</p>
            <p className="mt-4 text-base leading-7 text-[#64748b] sm:text-[1.02rem] sm:leading-8">{copy.intro.supporting}</p>
          </div>

          <div className={cn("rounded-[26px] border p-4 text-white shadow-2xl sm:rounded-[30px] sm:p-5", theme.darkPanel, theme.darkBorder)}>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-white/55">{copy.common.simulatorBadge}</p>
            <h2 className="mt-3 text-xl font-semibold sm:text-2xl">{copy.intro.kickoffTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-white/78">{copy.intro.kickoffBody}</p>
            <div className="mt-5 space-y-3">
              {copy.intro.cards.map((card: any) => {
                const Icon = overviewIcons[card.icon as keyof typeof overviewIcons];
                return (
                  <div key={card.title} className="flex flex-col gap-3 rounded-[20px] border border-white/10 bg-white/6 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:rounded-[22px]">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold">{card.title}</p>
                        <p className="text-sm text-white/65">{card.tool}</p>
                      </div>
                    </div>
                    <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-white/80">
                      {card.time}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.intro.cards.map((card: any) => {
            const Icon = overviewIcons[card.icon as keyof typeof overviewIcons];
            return (
              <div key={card.title} className="rounded-[26px] border border-black/5 bg-white/85 p-5 shadow-sm">
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", theme.accentSoft)}>
                  <Icon className={cn("h-5 w-5", theme.accent)} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#1f2434]">{card.title}</h3>
                <p className="mt-2 text-sm text-[#64748b]">{card.tool}</p>
              </div>
            );
          })}
        </div>

        <ContinueFooter
          label={copy.intro.continueLabel}
          helper={copy.intro.continueHelper}
          onClick={onComplete}
          className={theme.buttonClass}
        />
      </SectionContainer>
    );
  }

  if (resolvedSection === "summary") {
    return (
      <SectionContainer theme={theme}>
        <div className="flex items-center gap-3">
          <div className={cn("rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.22em]", theme.accentSoft)}>
            {copy.summary.eyebrow}
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.95fr]">
          <div>
            <h2 className="font-serif text-[2.1rem] leading-tight text-[#1f2434] sm:text-[2.8rem]">{copy.summary.title}</h2>
            <p className="mt-4 text-base leading-7 text-[#475569] sm:text-[1.04rem] sm:leading-8">{copy.summary.description}</p>
            <div className="mt-6 space-y-3">
              {copy.summary.items.map((item: string) => (
                <div key={item} className="flex items-start gap-3 rounded-[20px] border border-[#eaf0f7] bg-white/85 p-4 shadow-sm sm:items-center sm:rounded-[22px]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eaf2ff]">
                    <CheckCircle2 className="h-5 w-5 text-[#2563eb]" />
                  </div>
                  <p className="text-[1rem] font-semibold text-[#1f2434]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={cn("rounded-[26px] border p-4 text-white shadow-2xl sm:rounded-[30px] sm:p-5", theme.darkPanel, theme.darkBorder)}>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-white/55">{copy.common.dayLabel}</p>
            <h3 className="mt-3 text-[1.6rem] font-semibold leading-tight sm:text-[2rem]">{copy.summary.finalLine}</h3>
            <p className="mt-4 text-sm leading-7 text-white/75">{copy.summary.nextDay}</p>
          </div>
        </div>

        <div className="mt-7 rounded-[24px] border border-black/5 bg-white/85 p-4 shadow-sm sm:rounded-[28px] sm:p-6">
          <div className="max-w-3xl">
            <div className={cn("inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.22em]", theme.accentSoft)}>
              {copy.summary.toolsEyebrow}
            </div>
            <h3 className="mt-4 text-[1.5rem] font-semibold leading-tight text-[#1f2434] sm:text-[1.9rem]">
              {copy.summary.toolsTitle}
            </h3>
            <p className="mt-3 text-base leading-7 text-[#586174] sm:text-[1.02rem] sm:leading-8">
              {copy.summary.toolsDescription}
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {copy.summary.tools.map((tool: any) => {
              const Icon = overviewIcons[tool.icon as keyof typeof overviewIcons] ?? Sparkles;

              return (
                <div key={`${tool.name}-${tool.focus}`} className="rounded-[22px] border border-[#e8edf3] bg-[#fbfcfe] p-4 shadow-sm">
                  <div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl", theme.accentSoft)}>
                    <Icon className={cn("h-5 w-5", theme.accent)} />
                  </div>
                  <p className="mt-4 text-lg font-semibold text-[#1f2434]">{tool.name}</p>
                  <p className="mt-2 text-sm leading-7 text-[#64748b]">{tool.focus}</p>
                </div>
              );
            })}
          </div>
        </div>

        <ContinueFooter
          label={copy.summary.continueLabel}
          helper={copy.summary.continueHelper}
          onClick={onComplete}
          className={theme.buttonClass}
        />
      </SectionContainer>
    );
  }

  const creationSection = resolvedSection as CreationSectionKey;

  return (
    <SectionContainer theme={theme}>
      <CreationWorkspace
        sectionKey={creationSection}
        sectionCopy={copy.sections[creationSection]}
        commonCopy={copy.common}
        locale={locale}
        theme={theme}
        onComplete={onComplete}
      />
    </SectionContainer>
  );
};

export default SidneyDay1Journey;
