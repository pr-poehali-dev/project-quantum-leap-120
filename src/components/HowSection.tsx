import { ArrowRight } from "lucide-react";
import { vibes } from "@/data/vibes";

interface HowSectionProps {
  isHowVisible: boolean;
  isCtaVisible: boolean;
  onVibeSelect: (vibeId: string) => void;
}

const steps = [
  { num: "01", emoji: "🎭", title: "Выбери вайб", desc: "Не думай — чувствуй. Кликни на эмоцию, которая откликается прямо сейчас" },
  { num: "02", emoji: "🗺️", title: "Получи маршрут", desc: "Мы подбираем маршруты под твоё состояние — с точками, описанием и советами" },
  { num: "03", emoji: "📍", title: "Изучи детали", desc: "Все точки на карте, сколько стоит, как добраться — ничего лишнего" },
  { num: "04", emoji: "🚀", title: "Вперёд!", desc: "Скачай маршрут в PDF и отправляйся. Бурятия ждёт" },
];

const HowSection = ({ isHowVisible, isCtaVisible, onVibeSelect }: HowSectionProps) => {
  return (
    <>
      {/* Как это работает */}
      <section id="how" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${isHowVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Процесс</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Всё просто
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`relative transition-all duration-700 ${
                  isHowVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="group bg-accent/5 hover:bg-accent/10 border border-accent/15 hover:border-accent/40 rounded-2xl p-8 h-full flex flex-col justify-between transition-all cursor-pointer">
                  <div>
                    <div className="text-3xl mb-4">{step.emoji}</div>
                    <div className="text-4xl font-display font-black text-accent/30 mb-3 group-hover:text-accent/60 transition-colors">
                      {step.num}
                    </div>
                    <h3 className="font-display font-bold text-lg mb-2 text-white">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-accent/40 to-transparent z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-32 px-6 bg-accent/5">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isCtaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-6xl mb-6">🏔️</div>
          <h2 className="text-5xl lg:text-7xl font-display font-black tracking-tighter mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Бурятия ждёт.
            </span>
            <br />
            <span className="text-accent">Ты готов?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 font-light max-w-2xl mx-auto">
            Каждый маршрут — это история. Какую напишешь ты?
          </p>
          <button
            onClick={() => document.getElementById("vibes")?.scrollIntoView({ behavior: "smooth" })}
            className="group px-10 py-5 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/40 transition-all font-bold text-lg flex items-center gap-3 mx-auto"
          >
            Выбрать свой вайб
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-accent/10 py-12 px-6 bg-background/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <div>
            <div className="font-display font-black text-xl tracking-tighter mb-1">
              <span className="text-accent">VIBE</span>
              <span className="text-white/30 font-light ml-1">TRAVEL</span>
            </div>
            <p className="text-xs text-white/30">Цифровой гид по Республике Бурятия</p>
          </div>
          <div className="flex gap-8">
            {vibes.slice(0, 4).map((v) => (
              <button
                key={v.id}
                onClick={() => onVibeSelect(v.id)}
                className="hover:text-white transition-colors text-xs"
              >
                {v.emoji} #{v.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-white/20">© 2026 VIBE TRAVEL — Путешествуй по настроению</p>
        </div>
      </footer>
    </>
  );
};

export default HowSection;
