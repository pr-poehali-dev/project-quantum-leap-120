import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import VibeSection from "@/components/VibeSection";
import RoutesSection from "@/components/RoutesSection";
import HowSection from "@/components/HowSection";

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const [activeVibe, setActiveVibe] = useState<string | null>(null);

  useEffect(() => {
    // Восстановить вайб из localStorage
    const saved = localStorage.getItem("vibe_travel_vibe");
    if (saved) setActiveVibe(saved);

    const observers: Record<string, IntersectionObserver> = {};
    const sectionIds = ["hero", "top-routes", "vibes", "routes", "how", "cta"];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;
      observers[id] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
            observers[id].unobserve(element);
          }
        },
        { threshold: 0.1 }
      );
      observers[id].observe(element);
    });

    return () => {
      Object.values(observers).forEach((obs) => obs.disconnect());
    };
  }, []);

  const handleVibeSelect = (vibeId: string) => {
    const next = activeVibe === vibeId ? null : vibeId;
    setActiveVibe(next);
    if (next) {
      localStorage.setItem("vibe_travel_vibe", next);
    } else {
      localStorage.removeItem("vibe_travel_vibe");
    }
    // Скролл к маршрутам
    setTimeout(() => {
      document.getElementById("routes")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const handleVibeReset = () => {
    setActiveVibe(null);
    localStorage.removeItem("vibe_travel_vibe");
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection isVisible={visibleSections["hero"]} />

      <RoutesSection
        isTopVisible={visibleSections["top-routes"]}
        isAllVisible={visibleSections["routes"]}
        activeVibe={activeVibe}
        onVibeReset={handleVibeReset}
      />

      <VibeSection
        isVisible={visibleSections["vibes"]}
        activeVibe={activeVibe}
        onVibeSelect={handleVibeSelect}
      />

      <HowSection
        isHowVisible={visibleSections["how"]}
        isCtaVisible={visibleSections["cta"]}
        onVibeSelect={handleVibeSelect}
      />
    </div>
  );
};

export default Index;
