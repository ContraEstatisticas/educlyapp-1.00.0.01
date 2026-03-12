import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const ease = [0.165, 0.84, 0.44, 1] as const;

export const AppDemoSection = () => {
  const { t } = useTranslation();

  return (
    <section className="ld-section ld-cream relative overflow-hidden">
      <div className="max-w-[87.5rem] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <span className="ld-eyebrow text-[hsl(25,90%,55%)]">
            {t("landing.globalReach.sectionLabel", "ALCANCE GLOBAL")}
          </span>
          <h2 className="font-display ld-h2 text-3xl md:text-4xl lg:text-[3.5rem] text-[#111827] dark:text-white mt-4 mb-5">
            {t("landing.appDemo.title", "Veja a plataforma em ação")}
          </h2>
          <p className="text-[#111827]/50 dark:text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
            {t("landing.appDemo.subtitle", "Explore nossa interface intuitiva e descubra como a IA pode transformar sua carreira")}
          </p>
        </div>

        {/* Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="flex justify-center"
        >
          <div className="relative">
            {/* Glow behind phone */}
            <div className="absolute inset-0 -m-8 rounded-[3rem] pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, hsl(25 90% 55% / 0.15) 0%, transparent 60%)',
                filter: 'blur(30px)',
              }}
            />

            {/* Phone frame */}
            <div className="relative w-[280px] sm:w-[320px] md:w-[360px] rounded-[2.5rem] border-[6px] border-[#1a1a2e] bg-[#1a1a2e] shadow-2xl overflow-hidden">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-[#1a1a2e] rounded-b-2xl z-20" />

              {/* Screen content — video */}
              <div className="relative w-full aspect-[9/19.5] bg-black rounded-[2rem] overflow-hidden">
                <video
                  src="/videos/app-demo.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-white/30 rounded-full z-20" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
