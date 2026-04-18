import { useEffect, useState } from "react";
import { Wind, Camera, Zap, Mountain, Utensils, Compass, Moon, Heart, ArrowRight, MapPin, Clock, Wallet } from "lucide-react";
import Icon from "@/components/ui/icon";

const vibes = [
  { id: "ветер_в_лицо", label: "ветер в лицо", emoji: "🏄", desc: "адреналин и скорость", icon: "Wind" },
  { id: "перезагрузка", label: "перезагрузка", emoji: "🌿", desc: "отдых и тишина", icon: "Moon" },
  { id: "кайфовый_ракурс", label: "кайфовый ракурс", emoji: "📸", desc: "фото на зависть", icon: "Camera" },
  { id: "место_силы", label: "место силы", emoji: "🙏", desc: "духовность и энергия", icon: "Zap" },
  { id: "дешево_и_кайф", label: "дёшево и кайф", emoji: "💸", desc: "бюджетно и классно", icon: "Wallet" },
  { id: "в_дикую", label: "в дикую", emoji: "🌲", desc: "природа без цивилизации", icon: "Mountain" },
  { id: "буузы_и_точка", label: "буузы и точка", emoji: "🥟", desc: "гастро-трип", icon: "Utensils" },
  { id: "приключение_началось", label: "приключение началось", emoji: "🧭", desc: "авантюра и открытия", icon: "Compass" },
  { id: "один_на_один", label: "один на один", emoji: "🤫", desc: "уединение и покой", icon: "Heart" },
];

const routes = [
  {
    id: 1,
    title: "Байкал — Священное море",
    location: "Северный Байкал",
    duration: "3 дня",
    budget: "от 8 000 ₽",
    vibes: ["перезагрузка", "кайфовый_ракурс", "место_силы"],
    description: "Нетронутые берега, рассвет над водой и тишина, которой не бывает в городе. Здесь время замедляется.",
    gradient: "from-blue-600/40 to-cyan-400/20",
    tag: "ТОП",
  },
  {
    id: 2,
    title: "Тункинская долина",
    location: "Тункинский район",
    duration: "2 дня",
    budget: "от 5 500 ₽",
    vibes: ["в_дикую", "место_силы", "один_на_один"],
    description: "Вулканы, горячие источники и запах трав. Долина, где воздух буквально вкусный.",
    gradient: "from-emerald-600/40 to-green-400/20",
    tag: "ПРИРОДА",
  },
  {
    id: 3,
    title: "Улан-Удэ — Гастро-маршрут",
    location: "Улан-Удэ",
    duration: "1 день",
    budget: "от 2 000 ₽",
    vibes: ["буузы_и_точка", "дешево_и_кайф"],
    description: "Буузные, рынки, бурятская кухня и самая большая голова Ленина в мире. Главное — буузы.",
    gradient: "from-orange-600/40 to-amber-400/20",
    tag: "ГАСТРО",
  },
  {
    id: 4,
    title: "Иволгинский дацан",
    location: "Иволгинский район",
    duration: "1 день",
    budget: "от 1 500 ₽",
    vibes: ["место_силы", "один_на_один", "кайфовый_ракурс"],
    description: "Главный буддийский монастырь России. Здесь можно найти ответы на вопросы, которые ты ещё не задал.",
    gradient: "from-yellow-600/40 to-orange-400/20",
    tag: "ДУХОВНОСТЬ",
  },
  {
    id: 5,
    title: "Мотокросс по горам Хамар-Дабан",
    location: "Хамар-Дабан",
    duration: "2 дня",
    budget: "от 12 000 ₽",
    vibes: ["ветер_в_лицо", "приключение_началось", "в_дикую"],
    description: "Грунтовые дороги, крутые спуски и виды, которые невозможно передать словами. Едешь — и всё.",
    gradient: "from-red-600/40 to-pink-400/20",
    tag: "АДРЕНАЛИН",
  },
  {
    id: 6,
    title: "Бюджетный Байкал",
    location: "Южный Байкал",
    duration: "2 дня",
    budget: "от 3 000 ₽",
    vibes: ["дешево_и_кайф", "кайфовый_ракурс", "в_дикую"],
    description: "Байкал для тех, кто считает деньги, но не хочет считать впечатления. Палатка, костёр и вода.",
    gradient: "from-violet-600/40 to-purple-400/20",
    tag: "БЮДЖЕТ",
  },
];

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

  const filteredRoutes = activeVibe
    ? routes.filter((r) => r.vibes.includes(activeVibe))
    : routes;

  return (
    <div className="min-h-screen bg-background">
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
            className={`text-center transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
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

      {/* Топ маршруты — горизонтальный скролл */}
      <section id="top-routes" className="py-24 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div
            className={`mb-12 transition-all duration-1000 ${visibleSections["top-routes"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Хиты сезона</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-3">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Топ маршруты
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {routes.slice(0, 3).map((route, i) => (
              <div
                key={route.id}
                className={`group relative rounded-2xl border border-white/10 hover:border-accent/40 bg-card/50 hover:bg-card/80 overflow-hidden transition-all duration-500 cursor-pointer ${
                  visibleSections["top-routes"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Градиентный фон карточки */}
                <div className={`absolute inset-0 bg-gradient-to-br ${route.gradient} opacity-60 group-hover:opacity-80 transition-opacity`} />
                <div className="relative p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold tracking-widest text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
                      {route.tag}
                    </span>
                    <div className="flex flex-wrap gap-1 justify-end">
                      {route.vibes.slice(0, 2).map((v) => {
                        const vibe = vibes.find((vb) => vb.id === v);
                        return vibe ? (
                          <span key={v} className="text-lg">{vibe.emoji}</span>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <h3 className="font-display font-black text-xl mb-2 text-white group-hover:text-accent transition-colors">
                    {route.title}
                  </h3>
                  <p className="text-sm text-white/60 mb-5 leading-relaxed">{route.description}</p>
                  <div className="flex items-center gap-4 text-xs text-white/50">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {route.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {route.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Wallet className="w-3 h-3" />
                      {route.budget}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Вайб-система */}
      <section id="vibes" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${visibleSections["vibes"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
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
                  onClick={() => handleVibeSelect(vibe.id)}
                  className={`group relative p-6 rounded-2xl border text-left transition-all duration-300 ${
                    visibleSections["vibes"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
                onClick={() => {
                  setActiveVibe(null);
                  localStorage.removeItem("vibe_travel_vibe");
                }}
                className="text-sm text-white/40 hover:text-white/70 transition-colors underline underline-offset-4"
              >
                Сбросить вайб
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Все маршруты с фильтром */}
      <section id="routes" className="py-24 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div
            className={`mb-12 transition-all duration-1000 ${visibleSections["routes"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Маршруты</span>
                <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-3">
                  <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                    {activeVibe ? (
                      <>
                        {vibes.find((v) => v.id === activeVibe)?.emoji}{" "}
                        #{vibes.find((v) => v.id === activeVibe)?.label}
                      </>
                    ) : (
                      "Все маршруты"
                    )}
                  </span>
                </h2>
              </div>
              <div className="text-sm text-white/40">
                {filteredRoutes.length} из {routes.length} маршрутов
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoutes.length > 0 ? (
              filteredRoutes.map((route, i) => (
                <div
                  key={route.id}
                  className={`group relative rounded-2xl border border-white/10 hover:border-accent/40 bg-card/50 hover:bg-card/80 overflow-hidden transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10 ${
                    visibleSections["routes"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${route.gradient} opacity-50 group-hover:opacity-70 transition-opacity`} />
                  <div className="relative p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-bold tracking-widest text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
                        {route.tag}
                      </span>
                      <div className="flex gap-1">
                        {route.vibes.map((v) => {
                          const vibe = vibes.find((vb) => vb.id === v);
                          return vibe ? (
                            <span key={v} title={`#${vibe.label}`} className="text-base">{vibe.emoji}</span>
                          ) : null;
                        })}
                      </div>
                    </div>

                    <h3 className="font-display font-black text-xl mb-2 text-white group-hover:text-accent transition-colors">
                      {route.title}
                    </h3>
                    <p className="text-sm text-white/60 mb-6 leading-relaxed">{route.description}</p>

                    <div className="grid grid-cols-3 gap-2 text-xs text-white/50 mb-5">
                      <div className="flex flex-col gap-1">
                        <MapPin className="w-3.5 h-3.5 text-accent/60" />
                        <span>{route.location}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Clock className="w-3.5 h-3.5 text-accent/60" />
                        <span>{route.duration}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Wallet className="w-3.5 h-3.5 text-accent/60" />
                        <span>{route.budget}</span>
                      </div>
                    </div>

                    <button className="w-full py-2.5 rounded-xl border border-accent/20 text-sm font-medium text-white/80 hover:border-accent/60 hover:bg-accent/10 hover:text-white transition-all group-hover:border-accent/40">
                      Открыть маршрут →
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-20">
                <div className="text-5xl mb-4">🌀</div>
                <p className="text-white/50 text-lg">Под этот вайб маршрутов пока нет</p>
                <button
                  onClick={() => setActiveVibe(null)}
                  className="mt-4 text-sm text-accent hover:text-accent/70 transition-colors"
                >
                  Посмотреть все маршруты
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Как это работает */}
      <section id="how" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["how"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Процесс</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Всё просто
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "01", emoji: "🎭", title: "Выбери вайб", desc: "Не думай — чувствуй. Кликни на эмоцию, которая откликается прямо сейчас" },
              { num: "02", emoji: "🗺️", title: "Получи маршрут", desc: "Мы подбираем маршруты под твоё состояние — с точками, описанием и советами" },
              { num: "03", emoji: "📍", title: "Изучи детали", desc: "Все точки на карте, сколько стоит, как добраться — ничего лишнего" },
              { num: "04", emoji: "🚀", title: "Вперёд!", desc: "Скачай маршрут в PDF и отправляйся. Бурятия ждёт" },
            ].map((step, i) => {
              const isVisible = visibleSections["how"];
              return (
                <div
                  key={i}
                  className={`relative transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-32 px-6 bg-accent/5">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${visibleSections["cta"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
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
                onClick={() => handleVibeSelect(v.id)}
                className="hover:text-white transition-colors text-xs"
              >
                {v.emoji} #{v.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-white/20">© 2026 VIBE TRAVEL — Путешествуй по настроению</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
