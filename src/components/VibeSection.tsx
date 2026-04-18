import { vibes } from "@/data/vibes";

interface VibeSectionProps {
  isVisible: boolean;
  activeVibe: string | null;
  onVibeSelect: (vibeId: string) => void;
}

const VibeSection = ({ isVisible, activeVibe, onVibeSelect }: VibeSectionProps) => {
  return (
    <section id="vibes" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Вайб-система</span>
          <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4 mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Какое у тебя
            </span>
            <br />
            <span className="text-accent">настроение?</span>
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto">
            Выбери вайб — и мы покажем маршруты, созданные именно для этого состояния
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {vibes.map((vibe, i) => {
            const isActive = activeVibe === vibe.id;
            return (
              <button
                key={vibe.id}
                onClick={() => onVibeSelect(vibe.id)}
                className={`group relative p-6 rounded-2xl border text-left transition-all duration-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${
                  isActive
                    ? "border-accent bg-accent/15 shadow-lg shadow-accent/20"
                    : "border-white/10 bg-card/40 hover:border-accent/40 hover:bg-card/70"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-accent/5 rounded-2xl blur-sm" />
                )}
                <div className="relative">
                  <div className="text-3xl mb-3">{vibe.emoji}</div>
                  <div className={`font-bold text-sm mb-1 transition-colors ${isActive ? "text-accent" : "text-white group-hover:text-accent"}`}>
                    #{vibe.label}
                  </div>
                  <div className="text-xs text-white/50">{vibe.desc}</div>
                </div>
                {isActive && (
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-accent animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {activeVibe && (
          <div className="text-center mt-10">
            <button
              onClick={() => onVibeSelect(activeVibe)}
              className="text-sm text-white/40 hover:text-white/70 transition-colors underline underline-offset-4"
            >
              Сбросить вайб
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default VibeSection;
