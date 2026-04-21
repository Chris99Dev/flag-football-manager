"use client";

interface PlayerCardProps {
  player: {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    country: string;
    primaryPosition: string;
    level: number;
    speed: number;
    agility: number;
    strength: number;
    intelligence: number;
    endurance: number;
    throwing: number;
    catching: number;
    mental: number;
    morale: number;
    fatigue: number;
    injuryType: string;
    weeklySalary: number;
    traits: string[];
  };
  onClick: () => void;
}

const COUNTRY_FLAGS: Record<string, string> = {
  FR: "🇫🇷",
  US: "🇺🇸",
  JP: "🇯🇵",
};

const POSITION_COLORS: Record<string, string> = {
  QB: "bg-red-500 text-white",
  WR: "bg-blue-500 text-white",
  C: "bg-yellow-500 text-white",
  CB: "bg-green-500 text-white",
  S: "bg-purple-500 text-white",
  R: "bg-orange-500 text-white",
};

const TRAIT_LABELS: Record<string, string> = {
  LEADER: "Leader",
  LONER: "Solitaire",
  COMPETITOR: "Compétiteur",
  PARTY_LOVER: "Fêtard",
  HARD_WORKER: "Travailleur",
  LIAR: "Menteur",
  LOYAL: "Loyal",
  CALM: "Calme",
  HOT_HEADED: "Tête brûlée",
};

const TRAIT_EFFECTS: Record<string, string> = {
                      LEADER: "+5% moral de toute l'équipe. Boost chimie d'équipe.",
                      LONER: "-3% chimie d'équipe. +5% stats en entraînement individuel.",
                      COMPETITOR: "+10% stats quand le score est serré. Risque de conflit avec les autres compétiteurs.",
                      PARTY_LOVER: "+5% moral après une victoire. -5% moral après une défaite. Mauvaise entente avec Travailleur.",
                      HARD_WORKER: "+10% XP en entraînement. Bonne entente avec Leader et Loyal.",
                      LIAR: "-5% chimie d'équipe. Peut baisser le moral des coéquipiers aléatoirement.",
                      LOYAL: "+10% moral quand il reste longtemps dans le club. Moins cher à renouveler.",
                      CALM: "+5% Mental en situation de stress (4th down, dernières minutes). Bonne entente avec tous.",
                      HOT_HEADED: "+10% stats après une pénalité adverse. -5% Mental, risque de faux départ accru.",
                    };

function getOverall(player: PlayerCardProps["player"]): number {
  return Math.round(
    (player.speed + player.agility + player.strength + player.intelligence +
      player.endurance + player.throwing + player.catching + player.mental) / 8
  );
}

function StatBar({ label, value, max = 20 }: { label: string; value: number; max?: number }) {
  const percentage = Math.min((value / max) * 100, 100);
  const color =
    value >= 18 ? "bg-yellow-500" :
    value >= 15 ? "bg-green-500" :
    value >= 12 ? "bg-blue-500" :
    "bg-gray-400";

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 w-8 text-right">{label}</span>
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
      <span className="text-xs font-bold text-gray-700 w-6">{value}</span>
    </div>
  );
}

export function PlayerCard({ player, onClick }: PlayerCardProps) {
  const overall = getOverall(player);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer"
    >
      {/* Header du joueur */}
      <div className="flex items-center gap-3 p-4 pb-2">
        <span className="text-xl">{COUNTRY_FLAGS[player.country] || "🏳️"}</span>
        <span className={`text-xs font-bold px-2 py-1 rounded ${POSITION_COLORS[player.primaryPosition] || "bg-gray-500 text-white"}`}>
          {player.primaryPosition}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 truncate">
            {player.firstName} {player.lastName}
          </p>
          <p className="text-gray-500 text-xs">
            {player.age} ans — Niv. {player.level} — {player.weeklySalary} G/sem
          </p>
        </div>
        <div className={`w-11 h-11 rounded-lg flex items-center justify-center font-bold text-lg ${
          overall >= 18 ? "bg-yellow-100 text-yellow-700" :
          overall >= 15 ? "bg-green-100 text-green-700" :
          overall >= 12 ? "bg-blue-100 text-blue-700" :
          "bg-gray-100 text-gray-700"
        }`}>
          {overall}
        </div>
      </div>

      {/* Stats compactes */}
      <div className="px-4 pb-2 grid grid-cols-2 gap-x-4 gap-y-1">
        <StatBar label="VIT" value={player.speed} />
        <StatBar label="LAN" value={player.throwing} />
        <StatBar label="AGI" value={player.agility} />
        <StatBar label="REC" value={player.catching} />
        <StatBar label="FOR" value={player.strength} />
        <StatBar label="MEN" value={player.mental} />
        <StatBar label="INT" value={player.intelligence} />
        <StatBar label="END" value={player.endurance} />
      </div>

      {/* Footer : traits + état */}
      <div className="px-4 pb-3 flex items-center justify-between">
        <div className="flex gap-1 flex-wrap">
          {player.traits.map((trait) => (
            <span
              key={trait}
              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-lg font-medium relative group cursor-help"
            >
              {TRAIT_LABELS[trait] || trait}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-gray-900 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-center">
                {TRAIT_EFFECTS[trait] || "Effet inconnu"}
              </span>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {player.injuryType !== "NONE" && (
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
              {player.injuryType === "CRAMP" ? "Crampe" : "Blessé"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
