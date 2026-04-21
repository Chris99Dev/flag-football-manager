import Link from "next/link";

interface NavItem {
  href: string;
  label: string;
  icon: string;
  description: string;
  color: string;
  available: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: "/team",
    label: "Mon équipe",
    icon: "👥",
    description: "Gérer le roster et les postes",
    color: "from-blue-500 to-blue-700",
    available: true,
  },
  {
    href: "/training",
    label: "Entraînement",
    icon: "🏋️",
    description: "Entraîner et améliorer les joueurs",
    color: "from-green-500 to-green-700",
    available: false,
  },
  {
    href: "/match",
    label: "Match",
    icon: "🏈",
    description: "Jouer un match au tour par tour",
    color: "from-red-500 to-red-700",
    available: false,
  },
  {
    href: "/market",
    label: "Marché",
    icon: "🛒",
    description: "Recruter et transférer des joueurs",
    color: "from-yellow-500 to-yellow-700",
    available: false,
  },
  {
    href: "/club",
    label: "Mon club",
    icon: "🏟️",
    description: "Infrastructures, staff et sponsors",
    color: "from-purple-500 to-purple-700",
    available: false,
  },
  {
    href: "/standings",
    label: "Classement",
    icon: "📊",
    description: "Classement et calendrier de la ligue",
    color: "from-cyan-500 to-cyan-700",
    available: false,
  },
];

export function QuickNav() {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-4">Navigation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {NAV_ITEMS.map((item) => {
          if (item.available) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`bg-gradient-to-br ${item.color} text-white rounded-xl p-4 hover:scale-105 transition-all shadow-lg`}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-sm">{item.label}</h3>
                <p className="text-white/70 text-xs mt-1">
                  {item.description}
                </p>
              </Link>
            );
          }

          return (
            <div
              key={item.href}
              className="bg-gray-200 text-gray-500 rounded-xl p-4 opacity-60 cursor-not-allowed relative"
            >
              <div className="text-3xl mb-2 grayscale">{item.icon}</div>
              <h3 className="font-bold text-sm">{item.label}</h3>
              <p className="text-gray-400 text-xs mt-1">{item.description}</p>
              <span className="absolute top-2 right-2 bg-gray-400 text-white text-xs px-2 py-0.5 rounded-full">
                Bientôt
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
