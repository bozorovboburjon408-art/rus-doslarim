import { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntroSplashProps {
  onComplete: () => void;
}

const IntroSplash = ({ onComplete }: IntroSplashProps) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 100),
      setTimeout(() => setStage(2), 600),
      setTimeout(() => setStage(3), 1200),
      setTimeout(() => setStage(4), 2000),
      setTimeout(() => onComplete(), 2800),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500",
      "bg-gradient-to-b from-[hsl(222,47%,10%)] to-[hsl(222,50%,6%)]",
      stage >= 4 ? "opacity-0 pointer-events-none" : "opacity-100"
    )}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient opacity-30" />
      
      {/* Blur orbs */}
      <div className="absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-primary/30 blur-[100px] animate-pulse" />
      <div className="absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-secondary/20 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
      
      {/* Floating letters */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {["А", "Б", "В", "Г", "Д", "Е", "Ж", "З"].map((letter, i) => (
          <div
            key={letter}
            className={cn(
              "absolute text-6xl font-bold text-primary/20 transition-all duration-1000",
              stage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              transitionDelay: `${i * 100}ms`,
              animation: stage >= 2 ? `float-up ${8 + i}s ease-in-out infinite` : "none",
            }}
          >
            {letter}
          </div>
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className={cn(
          "inline-flex items-center justify-center h-24 w-24 rounded-3xl gradient-button text-white mb-6 shadow-glow-lg transition-all duration-700",
          stage >= 1 ? "scale-100 opacity-100" : "scale-50 opacity-0"
        )}>
          <BookOpen className="h-12 w-12" />
        </div>

        {/* Title */}
        <h1 className={cn(
          "text-4xl md:text-5xl font-bold text-white mb-4 transition-all duration-700",
          stage >= 2 ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        )}>
          Русский язык
        </h1>

        {/* Subtitle with typing effect */}
        <p className={cn(
          "text-xl text-muted-foreground transition-all duration-700",
          stage >= 3 ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        )}>
          Изучайте русский язык — <span className="text-primary font-semibold">легко</span>
        </p>

        {/* Loading dots */}
        <div className={cn(
          "flex justify-center gap-2 mt-8 transition-opacity duration-500",
          stage >= 3 ? "opacity-100" : "opacity-0"
        )}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroSplash;