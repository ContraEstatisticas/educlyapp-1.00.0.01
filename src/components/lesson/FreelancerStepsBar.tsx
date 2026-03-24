import { useRef, useEffect, useState } from "react";
import { Check, Lock, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepProgress {
    stepNumber: number;
    status: "completed" | "current" | "locked" | "unlocked";
}

interface FreelancerStepsBarProps {
    steps: StepProgress[];
    currentStep: number;
    onStepClick: (step: number) => void;
}

export const FreelancerStepsBar = ({ steps, currentStep, onStepClick }: FreelancerStepsBarProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const currentStepRef = useRef<HTMLButtonElement>(null);
    const [showLeftFade, setShowLeftFade] = useState(false);
    const [showRightFade, setShowRightFade] = useState(false);
    const fadeWidth = 18;

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const updateFades = () => {
            const maxScrollLeft = Math.max(0, container.scrollWidth - container.clientWidth);
            const scrollLeft = container.scrollLeft;
            const threshold = 2;

            setShowLeftFade(scrollLeft > threshold);
            setShowRightFade(scrollLeft < maxScrollLeft - threshold);
        };

        updateFades();
        container.addEventListener("scroll", updateFades, { passive: true });
        window.addEventListener("resize", updateFades);

        return () => {
            container.removeEventListener("scroll", updateFades);
            window.removeEventListener("resize", updateFades);
        };
    }, [steps.length]);

    useEffect(() => {
        if (!scrollRef.current || !currentStepRef.current) return;

        const container = scrollRef.current;
        const button = currentStepRef.current;
        const visibleStart = container.scrollLeft;
        const visibleEnd = visibleStart + container.clientWidth;
        const buttonStart = button.offsetLeft;
        const buttonEnd = buttonStart + button.offsetWidth;
        const edgePadding = 24;

        // So move when the current node reaches visible edges.
        if (buttonStart < visibleStart + edgePadding || buttonEnd > visibleEnd - edgePadding) {
            const rawTarget = buttonStart - container.clientWidth / 2 + button.offsetWidth / 2;
            const maxScrollLeft = Math.max(0, container.scrollWidth - container.clientWidth);
            const target = Math.min(Math.max(0, rawTarget), maxScrollLeft);

            container.scrollTo({ left: target, behavior: "smooth" });
        }
    }, [currentStep, steps.length]);

    const maskImage =
        showLeftFade && showRightFade
            ? `linear-gradient(to right, transparent 0, black ${fadeWidth}px, black calc(100% - ${fadeWidth}px), transparent 100%)`
            : showLeftFade
                ? `linear-gradient(to right, transparent 0, black ${fadeWidth}px, black 100%)`
                : showRightFade
                    ? `linear-gradient(to right, black 0, black calc(100% - ${fadeWidth}px), transparent 100%)`
                    : "none";

    return (
        <div className="w-full relative py-2 overflow-visible">
            <div
                ref={scrollRef}
                className="w-full overflow-x-auto overflow-y-visible px-4 py-2 no-scrollbar snap-x"
                style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    maskImage,
                    WebkitMaskImage: maskImage,
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskSize: "100% 100%",
                    WebkitMaskSize: "100% 100%",
                }}
            >
                <div className="mx-auto flex w-max min-w-full items-center justify-between sm:justify-center gap-3 sm:gap-4">
                    {steps.map((step) => {
                        const isCurrent = step.stepNumber === currentStep;
                        const isCompleted = step.status === "completed";
                        const isLocked = step.status === "locked";

                        return (
                            <div
                                key={step.stepNumber}
                                className="flex flex-col items-center gap-1.5 flex-shrink-0 snap-center group"
                            >
                                <button
                                    ref={isCurrent ? currentStepRef : null}
                                    onClick={() => !isLocked && onStepClick(step.stepNumber)}
                                    disabled={isLocked}
                                    className={cn(
                                        "w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border transition-colors duration-200",
                                        isCurrent && "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30 ring-2 ring-primary/20",
                                        isCompleted && !isCurrent && "bg-success text-success-foreground border-success shadow-sm",
                                        isLocked && "bg-muted/50 text-muted-foreground/40 border-border cursor-not-allowed",
                                        !isCompleted && !isCurrent && !isLocked && "bg-card text-foreground border-border hover:border-primary/40",
                                    )}
                                >
                                    {isCurrent && <Play className="w-4 h-4 fill-current ml-0.5" />}
                                    {isCompleted && !isCurrent && <Check className="w-4 h-4 stroke-[3]" />}
                                    {isLocked && <Lock className="w-3.5 h-3.5" />}
                                </button>

                                <span
                                    className={cn(
                                        "text-[10px] font-semibold uppercase tracking-wide transition-colors",
                                        isCurrent ? "text-primary" : "text-muted-foreground",
                                    )}
                                >
                                    {step.stepNumber}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
