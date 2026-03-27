import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, ContactShadows, Html, useAnimations, useGLTF } from "@react-three/drei";
import { driver, type DriveStep, type Driver, type PopoverDOM } from "driver.js";
import { Play, Volume2, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NameConfirmationDialog } from "@/components/dashboard/NameConfirmationDialog";
import Typed from "typed.js";
import { Button } from "@/components/ui/button";
import * as THREE from "three";

const spanishOnboardingAudioUrls = import.meta.glob("../../../assets/onboardingAudios/audiosES/*.mp3", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const findOnboardingAudioUrl = (fileName: string) =>
  Object.entries(spanishOnboardingAudioUrls).find(([path]) => path.endsWith(`/${fileName}`))?.[1] ?? null;

const dashboardAvatarModelUrl = new URL("../../../assets/3dAvatar/modeloFinal_lipsync.glb", import.meta.url).href;
const dashboardAvatarIntroAudioUrl = findOnboardingAudioUrl("frase1Espanhol.mp3") ?? "";
const dashboardTourStepAudioUrl = findOnboardingAudioUrl("frase2Espanhol.mp3");
const dashboardAvatarNarrationText =
  "Bienvenido a Educly. Aquí aprenderás IA con una jornada práctica y guiada. Antes de empezar, confirma tu nombre. Se utilizará en tu perfil, tu progreso y los certificados que se generen en la plataforma.";
const dashboardTourStepTitle = "Resumen del panel de control";
const dashboardTourStepDescription =
  "Aquí tienes un resumen clave de tu experiencia: saludo, progreso reciente y acceso rápido a lo que más importa.";
const dashboardWeeklyStreakStepTitle = "Tu constancia semanal";
const dashboardWeeklyStreakStepDescription =
  "Este registro muestra tu secuencia de estudio. Te ayuda a convertir la frecuencia en hábito.";
const dashboardWeeklyStreakStepAudioUrl = findOnboardingAudioUrl("frase3Espanhol.mp3");
const dashboardActiveChallengeStepTitle = "Desaf\u00edo activo";
const dashboardActiveChallengeStepDescription =
  "Tu desaf\u00edo principal est\u00e1 aqu\u00ed, con seguimiento del progreso, bot\u00f3n para continuar y acceso r\u00e1pido al contenido.";
const dashboardActiveChallengeStepAudioUrl = findOnboardingAudioUrl("frase4Espanhol.mp3");
const dashboardQuickActionsStepTitle = "Acciones r\u00e1pidas";
const dashboardQuickActionsStepDescription =
  "Estos atajos agilizan tu trabajo diario: misiones, medallas y rutas especializadas est\u00e1n a solo un clic de distancia.";
const dashboardQuickActionsStepAudioUrl = findOnboardingAudioUrl("frase5Espanhol.mp3");
const dashboardFeaturedProductsStepTitle = "Productos destacados";
const dashboardFeaturedProductsStepDescription =
  "Esta secci\u00f3n contiene tarjetas premium con acceso r\u00e1pido a las experiencias de aplicaciones m\u00e1s relevantes.";
const dashboardFeaturedProductsStepAudioUrl = findOnboardingAudioUrl("frase6Espanhol.mp3");

const avatarVisemeNames = [
  "viseme_sil",
  "viseme_PP",
  "viseme_FF",
  "viseme_TH",
  "viseme_DD",
  "viseme_kk",
  "viseme_CH",
  "viseme_SS",
  "viseme_nn",
  "viseme_RR",
  "viseme_aa",
  "viseme_E",
  "viseme_ih",
  "viseme_oh",
  "viseme_ou",
] as const;

type AvatarVisemeName = (typeof avatarVisemeNames)[number];

type SpeechAnalysisFrame = {
  active: boolean;
  energy: number;
  low: number;
  mid: number;
  high: number;
  articulation: number;
  roundness: number;
  sibilance: number;
  attack: number;
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const clampMorphInfluence = (value: number) => Math.min(1.85, Math.max(0, value));

const lerp = (from: number, to: number, alpha: number) => from + (to - from) * alpha;

const createIdleSpeechAnalysis = (): SpeechAnalysisFrame => ({
  active: false,
  energy: 0,
  low: 0,
  mid: 0,
  high: 0,
  articulation: 0,
  roundness: 0,
  sibilance: 0,
  attack: 0,
});

const averageRange = (samples: Uint8Array, start: number, end: number) => {
  const safeStart = Math.max(0, Math.min(samples.length, start));
  const safeEnd = Math.max(safeStart + 1, Math.min(samples.length, end));
  let total = 0;

  for (let index = safeStart; index < safeEnd; index += 1) {
    total += samples[index];
  }

  return total / (safeEnd - safeStart);
};

const buildVisemeTargets = (
  speech: SpeechAnalysisFrame,
  elapsedTime: number,
): Partial<Record<AvatarVisemeName, number>> => {
  if (!speech.active) {
    return {
      viseme_sil: 1,
    };
  }

  const syllablePulse = Math.sin(elapsedTime * (7.6 + speech.energy * 9.4)) * 0.5 + 0.5;
  const openAmount = clamp01(speech.energy * 3.45 + speech.low * 0.32);
  const roundedAmount = clamp01(speech.roundness * 0.8 + speech.low * 0.18);
  const smileAmount = clamp01(speech.articulation * 0.6 + speech.mid * 0.16);
  const fricativeAmount = clamp01(speech.sibilance * 1.24);
  const plosiveAmount = clamp01(speech.attack * 1.35 + speech.energy * 0.1);
  const silenceAmount = clamp01(0.32 - openAmount * 1.9);

  return {
    viseme_sil: silenceAmount,
    viseme_PP: plosiveAmount * (1 - openAmount * 0.3) * 0.7,
    viseme_FF: fricativeAmount * (1 - openAmount * 0.18) * 0.34,
    viseme_TH: fricativeAmount * 0.12,
    viseme_DD: plosiveAmount * 0.18,
    viseme_kk: speech.low * 0.12,
    viseme_CH: fricativeAmount * smileAmount * 0.12,
    viseme_SS: fricativeAmount * 0.22,
    viseme_nn: speech.mid * 0.14,
    viseme_RR: roundedAmount * smileAmount * 0.08,
    viseme_aa: openAmount * (1.18 + syllablePulse * 0.74) * (1 - roundedAmount * 0.08) * 1.54,
    viseme_E: smileAmount * 0.24,
    viseme_ih: speech.high * 0.14 + smileAmount * 0.1,
    viseme_oh: roundedAmount * openAmount * (0.4 + (1 - syllablePulse) * 0.38) * 0.88,
    viseme_ou: roundedAmount * (0.28 + (1 - openAmount) * 0.28) * 0.68,
  };
};

const resolveStepElement = (element: DriveStep["element"]) => {
  if (!element) return undefined;

  if (typeof element === "string") {
    return document.querySelector(element) ?? undefined;
  }

  if (typeof element === "function") {
    return element() ?? undefined;
  }

  return element;
};

const clampViewportPosition = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const pinPopoverBelowElement = (
  popover: PopoverDOM,
  element: Element | undefined,
  {
    offset = 36,
    align = "center",
    viewportPadding = 16,
  }: {
    offset?: number;
    align?: "start" | "center" | "end";
    viewportPadding?: number;
  } = {},
) => {
  if (!element) return;

  window.requestAnimationFrame(() => {
    const wrapperRect = popover.wrapper.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    const requestedLeft =
      align === "start"
        ? elementRect.left
        : align === "end"
          ? elementRect.right - wrapperRect.width
          : elementRect.left + elementRect.width / 2 - wrapperRect.width / 2;
    const maxLeft = Math.max(viewportPadding, window.innerWidth - wrapperRect.width - viewportPadding);
    const safeLeft = clampViewportPosition(requestedLeft, viewportPadding, maxLeft);
    const safeTop = Math.max(viewportPadding, elementRect.bottom + offset);

    popover.wrapper.style.left = `${safeLeft}px`;
    popover.wrapper.style.top = `${safeTop}px`;
    popover.wrapper.style.right = "auto";
    popover.wrapper.style.bottom = "auto";
    popover.wrapper.style.transform = "translateY(0)";
  });
};

type DashboardAvatarModelProps = {
  speechAnalysisRef: MutableRefObject<SpeechAnalysisFrame>;
};

type DashboardAvatarOnboardingProps = {
  nameConfirmation?: {
    savedName: string;
    userId: string;
    onCompleted: (nextName: string) => void;
  } | null;
  isNameConfirmationReady?: boolean;
};

const DashboardAvatarModel = ({ speechAnalysisRef }: DashboardAvatarModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const morphMeshesRef = useRef<THREE.Mesh[]>([]);
  const { scene, animations } = useGLTF(dashboardAvatarModelUrl);
  const avatarScene = useMemo(() => scene.clone(true), [scene]);
  const { actions, names } = useAnimations(animations, groupRef);

  useEffect(() => {
    const morphMeshes: THREE.Mesh[] = [];

    avatarScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.morphTargetDictionary && child.morphTargetInfluences) {
          morphMeshes.push(child);
        }
      }
    });

    morphMeshesRef.current = morphMeshes;

    return () => {
      morphMeshesRef.current = [];
    };
  }, [avatarScene]);

  useEffect(() => {
    const firstAnimation = names[0] ? actions[names[0]] : undefined;

    if (!firstAnimation) return;

    firstAnimation.reset().fadeIn(0.35).play();

    return () => {
      firstAnimation.fadeOut(0.25);
    };
  }, [actions, names]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const speech = speechAnalysisRef.current;
    const visemeTargets = buildVisemeTargets(speech, state.clock.elapsedTime);

    groupRef.current.rotation.y = 0;
    groupRef.current.position.y = 0;

    morphMeshesRef.current.forEach((mesh) => {
      const dictionary = mesh.morphTargetDictionary;
      const influences = mesh.morphTargetInfluences;

      if (!dictionary || !influences) return;

      avatarVisemeNames.forEach((visemeName) => {
        const targetIndex = dictionary[visemeName];

        if (targetIndex === undefined) return;

        const baseTarget = visemeTargets[visemeName] ?? 0;
        const morphBoost =
          visemeName === "viseme_aa"
            ? 1.8
            : visemeName === "viseme_oh"
              ? 1.45
              : visemeName === "viseme_ou"
                ? 1.32
                : visemeName === "viseme_PP"
                  ? 1.18
                  : 1;
        const nextValue = clampMorphInfluence(baseTarget * morphBoost);
        const currentValue = influences[targetIndex] ?? 0;

        influences[targetIndex] = THREE.MathUtils.damp(currentValue, nextValue, 18.5, delta);
      });
    });
  });

  return (
    <group ref={groupRef} rotation={[0, 0, 0]}>
      <primitive object={avatarScene} />
    </group>
  );
};

const DashboardAvatarFallback = () => (
  <Html center>
    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-white/90 shadow-lg">
      <div className="h-5 w-5 animate-pulse rounded-full bg-primary/70" />
    </div>
  </Html>
);

export const DashboardAvatarOnboarding = ({
  nameConfirmation = null,
  isNameConfirmationReady = true,
}: DashboardAvatarOnboardingProps) => {
  const { t, i18n } = useTranslation();
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const [audioUiState, setAudioUiState] = useState<"loading" | "ready" | "playing" | "blocked">("loading");
  const [hasNarrationEnded, setHasNarrationEnded] = useState(false);
  const [isNameConfirmationOpen, setIsNameConfirmationOpen] = useState(false);
  const [hasCompletedNameConfirmation, setHasCompletedNameConfirmation] = useState(false);
  const [hasSkippedNameConfirmation, setHasSkippedNameConfirmation] = useState(false);
  const driverRef = useRef<Driver | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioAnalyserRef = useRef<AnalyserNode | null>(null);
  const audioSourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const frequencyDataRef = useRef<Uint8Array | null>(null);
  const timeDomainDataRef = useRef<Uint8Array | null>(null);
  const audioFrameRef = useRef<number | null>(null);
  const speechAnalysisRef = useRef<SpeechAnalysisFrame>(createIdleSpeechAnalysis());
  const typedTargetRef = useRef<HTMLSpanElement | null>(null);
  const typedInstanceRef = useRef<Typed | null>(null);
  const driverPopoverTitleTypedRef = useRef<Typed | null>(null);
  const driverPopoverDescriptionTypedRef = useRef<Typed | null>(null);
  const driverStepAudioRef = useRef<HTMLAudioElement | null>(null);
  const driverStepAudioDurationRef = useRef<Record<string, number>>({});
  const driverStepAudioCacheRef = useRef<Record<string, HTMLAudioElement>>({});
  const audioDurationSecondsRef = useRef(0);
  const needsNameConfirmation = Boolean(nameConfirmation);
  const isNameConfirmationResolved = !needsNameConfirmation || hasCompletedNameConfirmation || hasSkippedNameConfirmation;
  const shouldShowIntroActions = hasNarrationEnded && isNameConfirmationReady && isNameConfirmationResolved;

  const stopDriverPopoverNarration = useCallback(() => {
    if (driverPopoverTitleTypedRef.current) {
      driverPopoverTitleTypedRef.current.destroy();
      driverPopoverTitleTypedRef.current = null;
    }

    if (driverPopoverDescriptionTypedRef.current) {
      driverPopoverDescriptionTypedRef.current.destroy();
      driverPopoverDescriptionTypedRef.current = null;
    }

    if (driverStepAudioRef.current) {
      driverStepAudioRef.current.pause();
      driverStepAudioRef.current.currentTime = 0;
    }
  }, []);

  const startDriverPopoverNarration = useCallback(
    (popover: PopoverDOM, title: string, description: string, audioUrl?: string | null) => {
      stopDriverPopoverNarration();

      const titleTarget = document.createElement("span");
      const descriptionTarget = document.createElement("span");
      titleTarget.className = "driver-typed-title";
      descriptionTarget.className = "driver-typed-description";
      popover.title.replaceChildren(titleTarget);
      popover.description.replaceChildren(descriptionTarget);

      const totalDurationMs =
        audioUrl && driverStepAudioDurationRef.current[audioUrl] > 0
          ? driverStepAudioDurationRef.current[audioUrl] * 1000
          : 6200;
      const titleDurationMs = Math.max(900, totalDurationMs * 0.26);
      const descriptionDurationMs = Math.max(1800, totalDurationMs - titleDurationMs - 220);
      const titleTypeSpeed = Math.max(18, Math.min(44, Math.round(titleDurationMs / title.length)));
      const descriptionTypeSpeed = Math.max(
        12,
        Math.min(34, Math.round(descriptionDurationMs / description.length)),
      );

      driverPopoverTitleTypedRef.current = new Typed(titleTarget, {
        strings: [title],
        typeSpeed: titleTypeSpeed,
        startDelay: 120,
        backSpeed: 0,
        backDelay: 0,
        loop: false,
        smartBackspace: false,
        showCursor: false,
        contentType: "null",
        onComplete: () => {
          driverPopoverDescriptionTypedRef.current = new Typed(descriptionTarget, {
            strings: [description],
            typeSpeed: descriptionTypeSpeed,
            startDelay: 120,
            backSpeed: 0,
            backDelay: 0,
            loop: false,
            smartBackspace: false,
            showCursor: false,
            contentType: "null",
          });
        },
      });

      if (audioUrl) {
        const audioElement = driverStepAudioCacheRef.current[audioUrl];

        if (audioElement) {
          audioElement.currentTime = 0;
          driverStepAudioRef.current = audioElement;
          void audioElement.play().catch(() => {
            // Text animation still runs even if audio is not available yet.
          });
        }
      }
    },
    [stopDriverPopoverNarration],
  );

  const buildSteps = useCallback((): DriveStep[] => {
    if (typeof window === "undefined") return [];

    const isDesktop = window.innerWidth >= 768;
    const commonPopoverClass = "dashboard-driver-popover";

    const steps: DriveStep[] = [
      {
        element: "#dashboard-welcome-banner",
        onDeselected: () => {
          stopDriverPopoverNarration();
        },
        popover: {
          title: dashboardTourStepTitle,
          description: dashboardTourStepDescription,
          side: "bottom",
          align: "start",
          popoverClass: commonPopoverClass,
          onPopoverRender: (popover) => {
            startDriverPopoverNarration(popover, dashboardTourStepTitle, dashboardTourStepDescription, dashboardTourStepAudioUrl);
          },
        },
      },
      {
        element: "#weekly-streak-highlight",
        onDeselected: () => {
          stopDriverPopoverNarration();
        },
        popover: {
          title: dashboardWeeklyStreakStepTitle,
          description: dashboardWeeklyStreakStepDescription,
          side: "bottom",
          align: "center",
          popoverClass: commonPopoverClass,
          onPopoverRender: (popover, opts) => {
            startDriverPopoverNarration(
              popover,
              dashboardWeeklyStreakStepTitle,
              dashboardWeeklyStreakStepDescription,
              dashboardWeeklyStreakStepAudioUrl,
            );
            pinPopoverBelowElement(popover, opts.state.activeElement, {
              align: "center",
              offset: 44,
            });
          },
        },
      },
      {
        element: "#active-challenge",
        onDeselected: () => {
          stopDriverPopoverNarration();
        },
        popover: {
          title: dashboardActiveChallengeStepTitle,
          description: dashboardActiveChallengeStepDescription,
          side: "top",
          align: "center",
          popoverClass: commonPopoverClass,
          onPopoverRender: (popover) => {
            startDriverPopoverNarration(
              popover,
              dashboardActiveChallengeStepTitle,
              dashboardActiveChallengeStepDescription,
              dashboardActiveChallengeStepAudioUrl,
            );
          },
        },
      },
      {
        element: "#dashboard-quick-cards",
        onDeselected: () => {
          stopDriverPopoverNarration();
        },
        popover: {
          title: dashboardQuickActionsStepTitle,
          description: dashboardQuickActionsStepDescription,
          side: "top",
          align: "center",
          popoverClass: commonPopoverClass,
          onPopoverRender: (popover) => {
            startDriverPopoverNarration(
              popover,
              dashboardQuickActionsStepTitle,
              dashboardQuickActionsStepDescription,
              dashboardQuickActionsStepAudioUrl,
            );
          },
        },
      },
    ];

    if (isDesktop) {
      steps.push({
        element: "#dashboard-featured-products",
        onDeselected: () => {
          stopDriverPopoverNarration();
        },
        popover: {
          title: dashboardFeaturedProductsStepTitle,
          description: dashboardFeaturedProductsStepDescription,
          side: "top",
          align: "center",
          popoverClass: commonPopoverClass,
          onPopoverRender: (popover) => {
            startDriverPopoverNarration(
              popover,
              dashboardFeaturedProductsStepTitle,
              dashboardFeaturedProductsStepDescription,
              dashboardFeaturedProductsStepAudioUrl,
            );
          },
        },
      });
    }

    return steps.filter((step) => resolveStepElement(step.element));
  }, [startDriverPopoverNarration, stopDriverPopoverNarration, t]);

  const startTour = useCallback(
    (initialStep = 0) => {
      if (typeof window === "undefined") return;

      const steps = buildSteps();

      if (steps.length === 0) return;

      driverRef.current?.destroy();
      driverRef.current = driver({
        animate: true,
        allowClose: true,
        overlayColor: "#0f172a",
        overlayOpacity: 0.72,
        smoothScroll: true,
        stagePadding: 14,
        stageRadius: 24,
        showButtons: ["previous", "next", "close"],
        showProgress: true,
        progressText: t("dashboard.avatarOnboarding.progressText", {
          defaultValue: "{{current}} de {{total}}",
        }),
        nextBtnText: t("tutorial.next", { defaultValue: "Proximo" }),
        prevBtnText: t("common.back", { defaultValue: "Voltar" }),
        doneBtnText: t("tutorial.finish", { defaultValue: "Concluir" }),
        popoverClass: "dashboard-driver-popover",
        steps,
        onDestroyed: () => {
          stopDriverPopoverNarration();
          driverRef.current = null;
        },
      });

      driverRef.current.drive(initialStep);
    },
    [buildSteps, stopDriverPopoverNarration, t],
  );

  const stopAudioMonitoring = useCallback(() => {
    if (audioFrameRef.current !== null) {
      window.cancelAnimationFrame(audioFrameRef.current);
      audioFrameRef.current = null;
    }

    speechAnalysisRef.current = createIdleSpeechAnalysis();
  }, []);

  const resetNarrationTyping = useCallback((nextText = "") => {
    if (typedInstanceRef.current) {
      typedInstanceRef.current.destroy();
      typedInstanceRef.current = null;
    }

    if (typedTargetRef.current) {
      typedTargetRef.current.textContent = nextText;
    }
  }, []);

  const startNarrationTyping = useCallback(
    (narrationText: string, durationSeconds?: number) => {
      const typedTarget = typedTargetRef.current;

      if (!typedTarget) return;

      resetNarrationTyping();

      if (!narrationText.trim()) {
        setHasNarrationEnded(true);
        return;
      }

      const safeDurationSeconds =
        typeof durationSeconds === "number" && Number.isFinite(durationSeconds) && durationSeconds > 0
          ? durationSeconds
          : audioDurationSecondsRef.current;
      const approximateIntroLeadMs = 260;
      const typingWindowMs =
        safeDurationSeconds > 0
          ? Math.max(2600, safeDurationSeconds * 1000 - approximateIntroLeadMs)
          : 7600;
      const calculatedTypeSpeed = Math.max(
        14,
        Math.min(42, Math.round(typingWindowMs / narrationText.length)),
      );

      typedInstanceRef.current = new Typed(typedTarget, {
        strings: [narrationText],
        typeSpeed: calculatedTypeSpeed,
        startDelay: approximateIntroLeadMs,
        backSpeed: 0,
        backDelay: 0,
        loop: false,
        smartBackspace: false,
        showCursor: false,
        contentType: "null",
        onComplete: () => {
          setHasNarrationEnded(true);
        },
      });
    },
    [resetNarrationTyping],
  );

  const startAudioMonitoring = useCallback(() => {
    const analyser = audioAnalyserRef.current;
    const frequencyData = frequencyDataRef.current;
    const timeDomainData = timeDomainDataRef.current;
    const audioElement = audioElementRef.current;

    if (!analyser || !frequencyData || !timeDomainData || !audioElement) return;

    if (audioFrameRef.current !== null) {
      window.cancelAnimationFrame(audioFrameRef.current);
    }

    const updateSpeechFrame = () => {
      analyser.getByteFrequencyData(frequencyData);
      analyser.getByteTimeDomainData(timeDomainData);

      let squaredSum = 0;

      for (let index = 0; index < timeDomainData.length; index += 1) {
        const centeredSample = (timeDomainData[index] - 128) / 128;
        squaredSum += centeredSample * centeredSample;
      }

      const rmsLevel = Math.sqrt(squaredSum / timeDomainData.length);
      const nextEnergy = clamp01(rmsLevel * 6.4);
      const nextLow = clamp01((averageRange(frequencyData, 1, 18) / 255) * 1.85);
      const nextMid = clamp01((averageRange(frequencyData, 18, 74) / 255) * 1.62);
      const nextHigh = clamp01((averageRange(frequencyData, 74, 180) / 255) * 1.72);
      const previousFrame = speechAnalysisRef.current;
      const smoothedEnergy = lerp(previousFrame.energy, nextEnergy, 0.5);
      const smoothedLow = lerp(previousFrame.low, nextLow, 0.34);
      const smoothedMid = lerp(previousFrame.mid, nextMid, 0.32);
      const smoothedHigh = lerp(previousFrame.high, nextHigh, 0.34);
      const isAudioActive = !audioElement.paused && !audioElement.ended;

      speechAnalysisRef.current = {
        active: isAudioActive,
        energy: smoothedEnergy,
        low: smoothedLow,
        mid: smoothedMid,
        high: smoothedHigh,
        articulation: clamp01(smoothedMid * 0.74 + smoothedHigh * 0.42),
        roundness: clamp01(smoothedLow * 0.9 + smoothedEnergy * 0.18 - smoothedHigh * 0.15),
        sibilance: clamp01(smoothedHigh * 1.05),
        attack: clamp01(Math.max(0, smoothedEnergy - previousFrame.energy) * 6.4),
      };

      audioFrameRef.current = window.requestAnimationFrame(updateSpeechFrame);
    };

    updateSpeechFrame();
  }, []);

  const ensureAudioGraph = useCallback(async () => {
    if (typeof window === "undefined") return false;

    const audioElement = audioElementRef.current;

    if (!audioElement) return false;

    const AudioContextCtor =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextCtor) return false;

    if (!audioContextRef.current) {
      const nextAudioContext = new AudioContextCtor();
      const nextAnalyser = nextAudioContext.createAnalyser();

      nextAnalyser.fftSize = 1024;
      nextAnalyser.smoothingTimeConstant = 0.78;

      const nextSourceNode = nextAudioContext.createMediaElementSource(audioElement);

      nextSourceNode.connect(nextAnalyser);
      nextAnalyser.connect(nextAudioContext.destination);

      audioContextRef.current = nextAudioContext;
      audioAnalyserRef.current = nextAnalyser;
      audioSourceNodeRef.current = nextSourceNode;
      frequencyDataRef.current = new Uint8Array(nextAnalyser.frequencyBinCount);
      timeDomainDataRef.current = new Uint8Array(nextAnalyser.fftSize);
    }

    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }

    startAudioMonitoring();

    return true;
  }, [startAudioMonitoring]);

  const stopIntroAudio = useCallback(
    (resetPlayback = false) => {
      const audioElement = audioElementRef.current;

      if (audioElement) {
        audioElement.pause();

        if (resetPlayback) {
          audioElement.currentTime = 0;
        }
      }

      stopAudioMonitoring();
      resetNarrationTyping(resetPlayback ? "" : dashboardAvatarNarrationText);
    },
    [resetNarrationTyping, stopAudioMonitoring],
  );

  const playIntroAudio = useCallback(async (restartTyping = true) => {
    const audioElement = audioElementRef.current;

    if (!audioElement) return;

    try {
      const isAudioGraphReady = await ensureAudioGraph();

      if (!isAudioGraphReady) {
        setAudioUiState("blocked");
        return;
      }

      if (!audioElement.paused) {
        audioElement.pause();
      }

      audioElement.currentTime = 0;
      setHasNarrationEnded(false);
      if (restartTyping) {
        startNarrationTyping(dashboardAvatarNarrationText, audioElement.duration);
      }
      await audioElement.play();
    } catch (error) {
      setAudioUiState("blocked");
      stopAudioMonitoring();
    }
  }, [ensureAudioGraph, startNarrationTyping, stopAudioMonitoring]);

  useEffect(() => {
    if (!isIntroVisible) return;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document
      .querySelector("main.dashboard-texture")
      ?.setAttribute("data-dashboard-avatar-intro", "true");

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document
        .querySelector("main.dashboard-texture")
        ?.removeAttribute("data-dashboard-avatar-intro");
    };
  }, [isIntroVisible]);

  useEffect(() => {
    return () => {
      driverRef.current?.destroy();
      resetNarrationTyping();
      stopDriverPopoverNarration();
    };
  }, [resetNarrationTyping, stopDriverPopoverNarration]);

  useEffect(() => {
    if (!nameConfirmation) {
      setHasCompletedNameConfirmation(false);
      setHasSkippedNameConfirmation(false);
      setIsNameConfirmationOpen(false);
    }
  }, [nameConfirmation]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const narratedAudioUrls = [
      dashboardTourStepAudioUrl,
      dashboardWeeklyStreakStepAudioUrl,
      dashboardActiveChallengeStepAudioUrl,
      dashboardQuickActionsStepAudioUrl,
      dashboardFeaturedProductsStepAudioUrl,
    ].filter((audioUrl): audioUrl is string => Boolean(audioUrl));

    if (narratedAudioUrls.length === 0) return;

    const listeners = narratedAudioUrls.map((audioUrl) => {
      const audioElement = new Audio(audioUrl);
      audioElement.preload = "auto";
      driverStepAudioCacheRef.current[audioUrl] = audioElement;

      const handleCanPlay = () => {
        driverStepAudioDurationRef.current[audioUrl] = Number.isFinite(audioElement.duration) ? audioElement.duration : 0;
      };

      const handleError = () => {
        driverStepAudioDurationRef.current[audioUrl] = 0;
      };

      audioElement.addEventListener("canplaythrough", handleCanPlay);
      audioElement.addEventListener("error", handleError);

      return {
        audioUrl,
        audioElement,
        handleCanPlay,
        handleError,
      };
    });

    return () => {
      listeners.forEach(({ audioUrl, audioElement, handleCanPlay, handleError }) => {
        audioElement.removeEventListener("canplaythrough", handleCanPlay);
        audioElement.removeEventListener("error", handleError);
        audioElement.pause();
        audioElement.src = "";
        delete driverStepAudioCacheRef.current[audioUrl];
        delete driverStepAudioDurationRef.current[audioUrl];
      });
      driverStepAudioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const audioElement = new Audio(dashboardAvatarIntroAudioUrl);
    audioElement.preload = "auto";
    audioElementRef.current = audioElement;

    const handleCanPlay = () => {
      audioDurationSecondsRef.current = Number.isFinite(audioElement.duration) ? audioElement.duration : 0;
      setAudioUiState((currentState) => (currentState === "playing" ? currentState : "ready"));
    };

    const handlePlay = () => {
      setAudioUiState("playing");
      setHasNarrationEnded(false);
    };

    const handlePause = () => {
      if (!audioElement.ended) {
        setAudioUiState((currentState) => (currentState === "blocked" ? currentState : "ready"));
      }
    };

    const handleEnded = () => {
      setAudioUiState("ready");
      setHasNarrationEnded(true);
      stopAudioMonitoring();
      resetNarrationTyping(dashboardAvatarNarrationText);
    };

    const handleError = () => {
      setAudioUiState("blocked");
      stopAudioMonitoring();
    };

    audioElement.addEventListener("canplaythrough", handleCanPlay);
    audioElement.addEventListener("play", handlePlay);
    audioElement.addEventListener("pause", handlePause);
    audioElement.addEventListener("ended", handleEnded);
    audioElement.addEventListener("error", handleError);

    return () => {
      audioElement.removeEventListener("canplaythrough", handleCanPlay);
      audioElement.removeEventListener("play", handlePlay);
      audioElement.removeEventListener("pause", handlePause);
      audioElement.removeEventListener("ended", handleEnded);
      audioElement.removeEventListener("error", handleError);
      audioElement.pause();
      audioElement.src = "";
      audioElementRef.current = null;
      audioAnalyserRef.current = null;
      audioSourceNodeRef.current = null;
      frequencyDataRef.current = null;
      timeDomainDataRef.current = null;
      stopAudioMonitoring();
      resetNarrationTyping();

      const currentAudioContext = audioContextRef.current;
      audioContextRef.current = null;

      if (currentAudioContext) {
        void currentAudioContext.close();
      }
    };
  }, [resetNarrationTyping, stopAudioMonitoring]);

  useEffect(() => {
    if (!isIntroVisible) return;

    const autoplayTimeout = window.setTimeout(() => {
      setHasNarrationEnded(false);
      startNarrationTyping(dashboardAvatarNarrationText, audioDurationSecondsRef.current);
      void playIntroAudio(false);
    }, 380);

    return () => {
      window.clearTimeout(autoplayTimeout);
    };
  }, [isIntroVisible, playIntroAudio, startNarrationTyping]);

  useEffect(() => {
    if (
      !isIntroVisible ||
      !hasNarrationEnded ||
      !isNameConfirmationReady ||
      !needsNameConfirmation ||
      isNameConfirmationResolved ||
      isNameConfirmationOpen
    ) {
      return;
    }

    setIsNameConfirmationOpen(true);
  }, [
    hasNarrationEnded,
    isIntroVisible,
    isNameConfirmationOpen,
    isNameConfirmationReady,
    isNameConfirmationResolved,
    needsNameConfirmation,
  ]);

  useEffect(() => {
    if (!driverRef.current?.isActive()) return;

    const activeIndex = driverRef.current.getActiveIndex() ?? 0;
    driverRef.current.destroy();
    startTour(activeIndex);
  }, [i18n.resolvedLanguage, i18n.language, startTour]);

  const handleStartTour = () => {
    if (!isNameConfirmationResolved) {
      setIsNameConfirmationOpen(true);
      return;
    }

    stopIntroAudio(true);
    setIsIntroVisible(false);
    window.setTimeout(() => {
      startTour(0);
    }, 180);
  };

  const handleDismissIntro = () => {
    if (!isNameConfirmationResolved) {
      setIsNameConfirmationOpen(true);
      return;
    }

    stopIntroAudio(true);
    setIsIntroVisible(false);
  };

  return (
    <>
      {isIntroVisible ? (
        <div className="dashboard-avatar-overlay-root fixed inset-0 z-[340] flex items-center justify-center px-4 py-4 md:px-8">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/6" />

          <div className="relative flex w-full max-w-5xl flex-col items-center justify-center">
            <div id="dashboard-avatar-widget" className="w-full max-w-[min(90vw,680px)]">
              <div className="pointer-events-none relative mx-auto h-[min(52vh,520px)] min-h-[300px] w-full">
                <div className="absolute inset-x-14 top-8 h-24 rounded-full bg-orange-400/16 blur-3xl" />
                <div className="absolute inset-x-20 bottom-8 h-16 rounded-full bg-slate-950/12 blur-3xl dark:bg-slate-950/26" />
                <Canvas
                  shadows
                  dpr={[1, 2]}
                  camera={{ position: [0.06, 0.48, 2.72], fov: 28 }}
                  gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
                  onCreated={({ gl }) => {
                    gl.toneMapping = THREE.ACESFilmicToneMapping;
                    gl.toneMappingExposure = 1.08;
                  }}
                >
                  <hemisphereLight args={["#ffffff", "#0f172a", 0.7]} />
                  <ambientLight intensity={0.38} />
                  <directionalLight
                    castShadow
                    position={[3.6, 4.8, 4.2]}
                    intensity={2.2}
                    color="#fff3e8"
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-bias={-0.00008}
                    shadow-normalBias={0.02}
                  />
                  <directionalLight position={[-3.8, 2.7, 3.2]} intensity={0.8} color="#c8e6ff" />
                  <spotLight
                    castShadow
                    position={[-1.8, 3.9, 5.4]}
                    intensity={1.3}
                    angle={0.42}
                    penumbra={0.95}
                    color="#ffd1a8"
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-bias={-0.0001}
                  />
                  <pointLight position={[0.35, 1.2, -2.4]} intensity={0.62} color="#7dd3fc" />
                  <Suspense fallback={<DashboardAvatarFallback />}>
                    <Bounds fit clip observe margin={1.22}>
                      <DashboardAvatarModel speechAnalysisRef={speechAnalysisRef} />
                    </Bounds>
                    <ContactShadows
                      position={[0, -1.28, 0]}
                      opacity={0.42}
                      scale={3.2}
                      blur={2.8}
                      far={2.9}
                      resolution={1024}
                      color="#0f172a"
                    />
                  </Suspense>
                </Canvas>
              </div>
            </div>

            <div className="relative mt-2 w-full max-w-3xl text-center">
              <p className="mx-auto min-h-[164px] max-w-2xl text-base font-medium leading-relaxed text-foreground sm:min-h-[146px] sm:text-lg md:min-h-[136px] md:text-[1.45rem]">
                <span ref={typedTargetRef} aria-live="polite" />
              </p>

              {shouldShowIntroActions ? (
                <div className="mt-4 flex justify-center">
                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-full px-4 text-sm font-medium text-foreground/80 hover:text-foreground"
                    onClick={() => {
                      void playIntroAudio();
                    }}
                  >
                    <Volume2 className="mr-2 h-4 w-4" />
                    {audioUiState === "playing"
                      ? t("dashboard.avatarOnboarding.audioPlaying", {
                          defaultValue: "Reproduzindo apresentacao",
                        })
                      : hasNarrationEnded
                        ? t("dashboard.avatarOnboarding.audioReplay", {
                            defaultValue: "Ouvir novamente",
                          })
                        : t("dashboard.avatarOnboarding.audioCta", {
                            defaultValue: "Ouvir apresentacao",
                          })}
                  </Button>
                </div>
              ) : null}

              {audioUiState === "blocked" && shouldShowIntroActions ? (
                <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-foreground/60 sm:text-sm">
                  {t("dashboard.avatarOnboarding.audioHint", {
                    defaultValue:
                      "Seu navegador bloqueou a reproducao automatica. Toque em \"Ouvir apresentacao\" para ativar o audio.",
                  })}
                </p>
              ) : null}

              {shouldShowIntroActions ? (
                <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
                  <Button
                    type="button"
                    size="lg"
                    className="rounded-full px-7 text-base font-semibold"
                    onClick={handleStartTour}
                  >
                    <Play className="mr-2 h-5 w-5" />
                    {t("dashboard.avatarOnboarding.startNow", {
                      defaultValue: "Comecar tutorial",
                    })}
                  </Button>

                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    className="rounded-full border-border/80 bg-background/50 px-7 text-base font-semibold backdrop-blur-sm"
                    onClick={handleDismissIntro}
                  >
                    <X className="mr-2 h-5 w-5" />
                    {t("dashboard.avatarOnboarding.notNow", {
                      defaultValue: "Agora nao",
                    })}
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {nameConfirmation ? (
        <NameConfirmationDialog
          open={isNameConfirmationOpen}
          savedName={nameConfirmation.savedName}
          userId={nameConfirmation.userId}
          languageOverride="es"
          skipButtonLabel="Omitir por ahora"
          onCompleted={(nextName) => {
            setHasCompletedNameConfirmation(true);
            setIsNameConfirmationOpen(false);
            nameConfirmation.onCompleted(nextName);
          }}
          onSkipped={() => {
            setHasSkippedNameConfirmation(true);
            setIsNameConfirmationOpen(false);
          }}
        />
      ) : null}
    </>
  );
};

useGLTF.preload(dashboardAvatarModelUrl);
