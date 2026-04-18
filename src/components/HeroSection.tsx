import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  isVisible: boolean;
}

const HeroSection = ({ isVisible }: HeroSectionProps) => {
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-display font-black text-2xl tracking-tighter">
            <span className="bg-gradient-to-r from-white via-accent to-accent/70 bg-clip-text text-transparent">
              VIBE
            </span>
            <span className="text-white/40 font-light ml-1">TRAVEL</span>
          </div>
          <nav className="hidden md:flex gap-10 text-sm font-medium">
            <a href="#vibes" className="text-muted-foreground hover:text-white transition-colors">
              Вайбы
            </a>
            <a href="#routes" className="text-muted-foreground hover:text-white transition-colors">
              Маршруты
            </a>
            <a href="#how" className="text-muted-foreground hover:text-white transition-colors">
              Как это работает
            </a>
          </nav>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 text-sm font-medium border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all text-white">
              Карта
            </button>
            <button className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-accent to-accent/80 text-black rounded-full hover:shadow-lg hover:shadow-accent/40 transition-all">
              Найти вайб
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative pt-32 pb-32 px-6 min-h-screen flex items-center overflow-hidden"
      >
        {/* Фоновый градиент */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-vibe-adventure/10 rounded-full blur-[100px]" />
          {/* Плавающие иконки как частицы */}
          <div className="absolute top-32 left-[10%] text-4xl opacity-10 animate-float" style={{ animationDelay: "0s" }}>🏔️</div>
          <div className="absolute top-48 right-[15%] text-3xl opacity-10 animate-float" style={{ animationDelay: "1s" }}>🌊</div>
          <div className="absolute bottom-40 left-[20%] text-3xl opacity-10 animate-float" style={{ animationDelay: "2s" }}>🧭</div>
          <div className="absolute bottom-32 right-[25%] text-4xl opacity-10 animate-float" style={{ animationDelay: "0.5s" }}>🌿</div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div
            className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-medium tracking-widest text-accent/80 uppercase">
                Республика Бурятия · Цифровой гид
              </span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-display font-black leading-none mb-8 tracking-tighter">
              <span className="bg-gradient-to-br from-white via-white to-accent/50 bg-clip-text text-transparent">
                Путешествуй
              </span>
              <br />
              <span className="text-accent">по вайбу.</span>
            </h1>

            <p className="text-xl lg:text-2xl text-white/70 leading-relaxed mb-12 max-w-2xl mx-auto font-light">
              Не выбирай экскурсии — выбирай эмоцию.
              Расскажи нам своё настроение, и мы найдём маршрут, который попадёт точно в сердце.
            </p>

            <div className="flex gap-4 mb-20 flex-col sm:flex-row justify-center">
              <button
                onClick={() => document.getElementById("vibes")?.scrollIntoView({ behavior: "smooth" })}
                className="group px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/50 transition-all font-bold text-lg flex items-center gap-3 justify-center"
              >
                Выбрать свой вайб
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
              <button
                onClick={() => document.getElementById("top-routes")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 border border-white/20 rounded-full hover:border-accent/50 hover:bg-accent/10 transition-all font-medium text-lg text-white"
              >
                Топ маршруты
              </button>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-black text-accent mb-1">24+</div>
                <p className="text-sm text-white/50">Маршрута</p>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-1">9</div>
                <p className="text-sm text-white/50">Вайбов</p>
              </div>
              <div>
                <div className="text-3xl font-black text-accent mb-1">∞</div>
                <p className="text-sm text-white/50">Эмоций</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
