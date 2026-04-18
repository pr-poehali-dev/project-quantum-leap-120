export const vibes = [
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

export type Vibe = (typeof vibes)[number];
