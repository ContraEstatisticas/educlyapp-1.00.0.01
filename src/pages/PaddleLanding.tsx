import { useEffect, useRef } from "react";
import { useTheme } from "@/components/theme-provider";
import { LandingHero } from "@/components/LandingHero";

const PaddleLanding = () => {
  const { theme, setTheme } = useTheme();
  const previousThemeRef = useRef(theme);

  useEffect(() => {
    previousThemeRef.current = theme;
    if (theme !== "light") {
      setTheme("light");
    }
    return () => {
      if (previousThemeRef.current !== "light") {
        setTheme(previousThemeRef.current);
      }
    };
  }, []);

  // Inject Paddle.js
  useEffect(() => {
    if (document.querySelector('script[src*="paddle.com"]')) return;

    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;
    script.onload = () => {
      if (typeof (window as any).Paddle !== "undefined") {
        (window as any).Paddle.Initialize({
          token: "live_7d525879d9abfb6c4a7b0055777",
        });
        console.log("[Paddle] Initialized");
      }
    };
    document.head.appendChild(script);

    return () => {
      // Keep script loaded once injected
    };
  }, []);

  return (
    <div className="min-h-screen">
      <LandingHero />
    </div>
  );
};

export default PaddleLanding;
