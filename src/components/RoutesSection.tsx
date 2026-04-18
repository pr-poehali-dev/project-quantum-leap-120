import { MapPin, Clock, Wallet } from "lucide-react";
import { vibes } from "@/data/vibes";
import { routes } from "@/data/routes";
import type { Route } from "@/data/routes";

interface RoutesSectionProps {
  isTopVisible: boolean;
  isAllVisible: boolean;
  activeVibe: string | null;
  onVibeReset: () => void;
}

const RouteCard = ({
  route,
  isVisible,
  delay,
}: {
  route: Route;
  isVisible: boolean;
  delay: number;
}) => (
  <div
    className={`group relative rounded-2xl border border-white/10 hover:border-accent/40 bg-card/50 hover:bg-card/80 overflow-hidden transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`}
    style={{ transitionDelay: `${delay}ms` }}
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
);

const RoutesSection = ({ isTopVisible, isAllVisible, activeVibe, onVibeReset }: RoutesSectionProps) => {
  const filteredRoutes = activeVibe
    ? routes.filter((r) => r.vibes.includes(activeVibe))
    : routes;

  return (
    <>
      {/* Топ маршруты */}
      <section id="top-routes" className="py-24 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div
            className={`mb-12 transition-all duration-1000 ${isTopVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
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
                  isTopVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
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

      {/* Все маршруты с фильтром */}
      <section id="routes" className="py-24 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div
            className={`mb-12 transition-all duration-1000 ${isAllVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
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
                <RouteCard
                  key={route.id}
                  route={route}
                  isVisible={isAllVisible}
                  delay={i * 100}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-20">
                <div className="text-5xl mb-4">🌀</div>
                <p className="text-white/50 text-lg">Под этот вайб маршрутов пока нет</p>
                <button
                  onClick={onVibeReset}
                  className="mt-4 text-sm text-accent hover:text-accent/70 transition-colors"
                >
                  Посмотреть все маршруты
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default RoutesSection;
