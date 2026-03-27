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
import { Bounds, Html, useAnimations, useGLTF } from "@react-three/drei";
import { driver, type DriveStep, type Driver } from "driver.js";
import { Play, Volume2, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import * as THREE from "three";

const dashboardAvatarModelUrl = new URL("../../../assets/3dAvatar/robotWoman_v1.glb", import.meta.url).href;
const dashboardAvatarIntroAudioUrl = new URL(
  "../../../assets/onboardingAudios/audiosES/frase1Espanhol.mp3",
  import.meta.url,
).href;

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

type DashboardAvatarModelProps = {
  speechAnalysisRef: MutableRefObject<SpeechAnalysisFrame>;
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

    groupRef.current.rotation.y = Math.PI;
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
    <group ref={groupRef} rotation={[0, Math.PI, 0]}>
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

export const DashboardAvatarOnboarding = () => {
  const { t, i18n } = useTranslation();
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const [audioUiState, setAudioUiState] = useState<"loading" | "ready" | "playing" | "blocked">("loading");
  const [hasNarrationEnded, setHasNarrationEnded] = useState(false);
  const driverRef = useRef<Driver | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioAnalyserRef = useRef<AnalyserNode | null>(null);
  const audioSourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const frequencyDataRef = useRef<Uint8Array | null>(null);
  const timeDomainDataRef = useRef<Uint8Array | null>(null);
  const audioFrameRef = useRef<number | null>(null);
  const speechAnalysisRef = useRef<SpeechAnalysisFrame>(createIdleSpeechAnalysis());

  const buildSteps = useCallback((): DriveStep[] => {
    if (typeof window === "undefined") return [];

    const isDesktop = window.innerWidth >= 768;
    const commonPopoverClass = "dashboard-driver-popover";

    const steps: DriveStep[] = [
      {
        element: "#dashboard-welcome-banner",
        popover: {
          title: t("dashboard.avatarOnboarding.steps.hero.title", {
            defaultValue: "Visao geral da dashboard",
          }),
          description: t("dashboard.avatarOnboarding.steps.hero.description", {
            defaultValue:
              "Aqui fica o resumo principal da sua jornada: saudacao, progresso recente e acesso rapido ao que importa primeiro.",
          }),
          side: "bottom",
          align: "start",
          popoverClass: commonPopoverClass,
        },
      },
      {
        element: "#weekly-streak",
        popover: {
          title: t("dashboard.avatarOnboarding.steps.streak.title", {
            defaultValue: "Sua consistencia semanal",
          }),
          description: t("dashboard.avatarOnboarding.steps.streak.description", {
            defaultValue:
              "Essa faixa mostra sua sequencia de estudo. Ela ajuda a transformar frequencia em habito.",
          }),
          side: isDesktop ? "bottom" : "top",
          align: "center",
          popoverClass: commonPopoverClass,
        },
      },
      {
        element: "#active-challenge",
        popover: {
          title: t("dashboard.avatarOnboarding.steps.challenge.title", {
            defaultValue: "Desafio ativo",
          }),
          description: t("dashboard.avatarOnboarding.steps.challenge.description", {
            defaultValue:
              "Seu desafio principal fica aqui, com progresso, botao de continuar e acesso rapido ao conteudo.",
          }),
          side: "top",
          align: "center",
          popoverClass: commonPopoverClass,
        },
      },
      {
        element: "#dashboard-quick-cards",
        popover: {
          title: t("dashboard.avatarOnboarding.steps.quickActions.title", {
            defaultValue: "Acoes rapidas",
          }),
          description: t("dashboard.avatarOnboarding.steps.quickActions.description", {
            defaultValue:
              "Esses atalhos aceleram o dia a dia: missoes, medalhas e trilhas especializadas ficam a um clique.",
          }),
          side: "top",
          align: "center",
          popoverClass: commonPopoverClass,
        },
      },
    ];

    if (isDesktop) {
      steps.push({
        element: "#dashboard-featured-products",
        popover: {
          title: t("dashboard.avatarOnboarding.steps.products.title", {
            defaultValue: "Produtos em destaque",
          }),
          description: t("dashboard.avatarOnboarding.steps.products.description", {
            defaultValue:
              "Nesta area ficam os cards premium com acesso rapido as experiencias mais relevantes do app.",
          }),
          side: "top",
          align: "center",
          popoverClass: commonPopoverClass,
        },
      });
    }

    return steps.filter((step) => resolveStepElement(step.element));
  }, [t]);

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
          driverRef.current = null;
        },
      });

      driverRef.current.drive(initialStep);
    },
    [buildSteps, t],
  );

  const stopAudioMonitoring = useCallback(() => {
    if (audioFrameRef.current !== null) {
      window.cancelAnimationFrame(audioFrameRef.current);
      audioFrameRef.current = null;
    }

    speechAnalysisRef.current = createIdleSpeechAnalysis();
  }, []);

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
    },
    [stopAudioMonitoring],
  );

  const playIntroAudio = useCallback(async () => {
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
      await audioElement.play();
    } catch (error) {
      setAudioUiState("blocked");
      stopAudioMonitoring();
    }
  }, [ensureAudioGraph, stopAudioMonitoring]);

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
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const audioElement = new Audio(dashboardAvatarIntroAudioUrl);
    audioElement.preload = "auto";
    audioElementRef.current = audioElement;

    const handleCanPlay = () => {
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

      const currentAudioContext = audioContextRef.current;
      audioContextRef.current = null;

      if (currentAudioContext) {
        void currentAudioContext.close();
      }
    };
  }, [stopAudioMonitoring]);

  useEffect(() => {
    if (!isIntroVisible) return;

    const autoplayTimeout = window.setTimeout(() => {
      void playIntroAudio();
    }, 380);

    return () => {
      window.clearTimeout(autoplayTimeout);
    };
  }, [isIntroVisible, playIntroAudio]);

  useEffect(() => {
    if (!driverRef.current?.isActive()) return;

    const activeIndex = driverRef.current.getActiveIndex() ?? 0;
    driverRef.current.destroy();
    startTour(activeIndex);
  }, [i18n.resolvedLanguage, i18n.language, startTour]);

  const handleStartTour = () => {
    stopIntroAudio(true);
    setIsIntroVisible(false);
    window.setTimeout(() => {
      startTour(0);
    }, 180);
  };

  const handleDismissIntro = () => {
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
                  dpr={[1, 2]}
                  camera={{ position: [0, 0.4, 2.9], fov: 23 }}
                  gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
                >
                  <ambientLight intensity={1.9} />
                  <directionalLight position={[4, 5, 5]} intensity={2.35} />
                  <directionalLight position={[-4, 2, 4]} intensity={1.25} />
                  <spotLight position={[0, 6, 4]} intensity={1.35} angle={0.45} penumbra={0.85} />
                  <Suspense fallback={<DashboardAvatarFallback />}>
                    <Bounds fit clip observe margin={1.32}>
                      <DashboardAvatarModel speechAnalysisRef={speechAnalysisRef} />
                    </Bounds>
                  </Suspense>
                </Canvas>
              </div>
            </div>

            <div className="relative mt-2 w-full max-w-2xl text-center">
              <h2 className="text-2xl font-black leading-tight text-foreground sm:text-3xl md:text-4xl">
                {t("dashboard.avatarOnboarding.modalTitle", {
                  defaultValue: "Posso comecar seu tutorial da dashboard?",
                })}
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-foreground/80 sm:text-base md:text-lg">
                {t("dashboard.avatarOnboarding.modalDescription", {
                  defaultValue:
                    "Eu sou a EDI. Vou te guiar pelos pontos principais desta tela enquanto a dashboard fica suavemente desfocada ao fundo.",
                })}
              </p>

              <p className="mx-auto mt-3 max-w-xl text-base font-medium leading-relaxed text-foreground sm:text-lg">
                {t("dashboard.avatarOnboarding.modalQuestion", {
                  defaultValue: "Quer que eu comece o tutorial agora?",
                })}
              </p>

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

              {audioUiState === "blocked" ? (
                <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-foreground/60 sm:text-sm">
                  {t("dashboard.avatarOnboarding.audioHint", {
                    defaultValue:
                      "Seu navegador bloqueou a reproducao automatica. Toque em \"Ouvir apresentacao\" para ativar o audio.",
                  })}
                </p>
              ) : null}

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
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

useGLTF.preload(dashboardAvatarModelUrl);
