"use client";

interface PlayerDetailModalProps {
  player: {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    country: string;
    region: string;
    primaryPosition: string;
    secondaryPosition: string | null;
    speed: number;
    agility: number;
    strength: number;
    intelligence: number;
    endurance: number;
    throwing: number;
    catching: number;
    mental: number;
    level: number;
    xp: number;
    xpToNextLevel: number;
    fatigue: number;
    morale: number;
    injuryType: string;
    injuryWeeksLeft: number;
    traits: string[];
    contractWeeksLeft: number;
    weeklySalary: number;
    careerStats: {
      matchesPlayed: number;
      wins: number;
      losses: number;
      touchdowns: number;
      passingTDs: number;
      yardsRushing: number;
      yardsReceiving: number;
      interceptionsMade: number;
      interceptionsSuffered: number;
      flagPulls: number;
      completionAttempts: number;
      completionSuccesses: number;
    } | null;
  };
  onClose: () => void;
}

const COUNTRY_INFO: Record<string, { flag: string; name: string }> = {
  FR: { flag: "🇫🇷", name: "France" },
  US: { flag: "🇺🇸", name: "USA" },
  JP: { flag: "🇯🇵", name: "Japon" },
};

const REGION_LABELS: Record<string, string> = {
  NE: "Nord-Est",
  NW: "Nord-Ouest",
  SE: "Sud-Est",
  SW: "Sud-Ouest",
};

const POSITION_LABELS: Record<string, string> = {
  QB: "Quarterback",
  WR: "Wide Receiver",
  C: "Center",
  CB: "Cornerback",
  S: "Safety",
  R: "Rusher",
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

function StatRow({ label, abbr, value, max = 25 }: { label: string; abbr: string; value: number; max?: number }) {
  const percentage = Math.min((value / max) * 100, 100);
  const color =
    value >= 18 ? "bg-yellow-500" :
    value >= 15 ? "bg-green-500" :
    value >= 12 ? "bg-blue-500" :
    value >= 9 ? "bg-gray-400" :
    "bg-red-400";

  return (
    <div className="flex items-center gap-3 py-1">
      <span className="text-xs text-gray-500 w-24 truncate">{label}</span>
      <span className="text-xs font-bold text-gray-400 w-8">{abbr}</span>
      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${percentage}%` }} />
      </div>
      <span className="text-sm font-bold text-gray-800 w-8 text-right">{value}</span>
    </div>
  );
}

export function PlayerDetailModal({ player, onClose }: PlayerDetailModalProps) {
  const overall = Math.round(
    (player.speed + player.agility + player.strength + player.intelligence +
      player.endurance + player.throwing + player.catching + player.mental) / 8
  );

  const countryInfo = COUNTRY_INFO[player.country] || { flag: "🏳️", name: "Inconnu" };
  const xpPercentage = player.xpToNextLevel > 0 ? Math.round((player.xp / player.xpToNextLevel) * 100) : 0;
  const stats = player.careerStats;
  const completionRate = stats && stats.completionAttempts > 0
    ? Math.round((stats.completionSuccesses / stats.completionAttempts) * 100)
    : 0;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header joueur */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{countryInfo.flag}</span>
              <div>
                <h2 className="text-2xl font-bold">
                  {player.firstName} {player.lastName}
                </h2>
                <p className="text-blue-200">
                  {POSITION_LABELS[player.primaryPosition] || player.primaryPosition}
                  {player.secondaryPosition && ` / ${POSITION_LABELS[player.secondaryPosition]}`}
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center font-bold text-2xl ${
                overall >= 18 ? "bg-yellow-400 text-yellow-900" :
                overall >= 15 ? "bg-green-400 text-green-900" :
                overall >= 12 ? "bg-blue-400 text-blue-900" :
                "bg-gray-300 text-gray-700"
              }`}>
                {overall}
              </div>
              <p className="text-blue-200 text-xs mt-1">OVR</p>
            </div>
          </div>

          {/* Infos rapides */}
          <div className="grid grid-cols-4 gap-3 text-center text-sm">
            <div>
              <p className="text-blue-200 text-xs">Âge</p>
              <p className="font-bold">{player.age} ans</p>
            </div>
            <div>
              <p className="text-blue-200 text-xs">Origine</p>
              <p className="font-bold">{REGION_LABELS[player.region]}</p>
            </div>
            <div>
              <p className="text-blue-200 text-xs">Niveau</p>
              <p className="font-bold">{player.level}</p>
            </div>
            <div>
              <p className="text-blue-200 text-xs">Salaire</p>
              <p className="font-bold text-yellow-300">{player.weeklySalary} G</p>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-6 space-y-6">
          {/* Barre XP */}
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600">Expérience</span>
              <span className="text-gray-500">{player.xp} / {player.xpToNextLevel} XP</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${xpPercentage}%` }} />
            </div>
          </div>

          {/* État */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500">Moral</p>
              <p className={`font-bold text-lg ${
                player.morale >= 70 ? "text-green-600" :
                player.morale >= 40 ? "text-yellow-600" :
                "text-red-600"
              }`}>{player.morale}%</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500">Fatigue</p>
              <p className={`font-bold text-lg ${
                player.fatigue <= 30 ? "text-green-600" :
                player.fatigue <= 60 ? "text-yellow-600" :
                "text-red-600"
              }`}>{player.fatigue}%</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500">Contrat</p>
              <p className="font-bold text-lg text-blue-600">{player.contractWeeksLeft} sem.</p>
            </div>
          </div>

          {/* Blessure */}
          {player.injuryType !== "NONE" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
              <p className="text-red-700 font-semibold">
                {player.injuryType === "CRAMP" ? "Crampe" : "Blessure"} — {player.injuryWeeksLeft} semaine(s) restante(s)
              </p>
            </div>
          )}

          {/* 8 Stats */}
          <div>
            <h3 className="font-bold text-gray-800 mb-2">Statistiques</h3>
            <div className="space-y-1">
              <StatRow label="Vitesse" abbr="VIT" value={player.speed} />
              <StatRow label="Agilité" abbr="AGI" value={player.agility} />
              <StatRow label="Force" abbr="FOR" value={player.strength} />
              <StatRow label="Intelligence" abbr="INT" value={player.intelligence} />
              <StatRow label="Endurance" abbr="END" value={player.endurance} />
              <StatRow label="Technique lancer" abbr="LAN" value={player.throwing} />
              <StatRow label="Réception" abbr="REC" value={player.catching} />
              <StatRow label="Mental" abbr="MEN" value={player.mental} />
            </div>
          </div>

          {/* Traits de personnalité */}
          {player.traits.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Personnalité</h3>
              <div className="flex gap-2 flex-wrap">
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
            </div>
          )}

          {/* Stats de carrière */}
          {stats && (
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Carrière</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs text-gray-500">Matchs</p>
                  <p className="font-bold">{stats.matchesPlayed}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs text-gray-500">V / D</p>
                  <p className="font-bold">{stats.wins} / {stats.losses}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs text-gray-500">Touchdowns</p>
                  <p className="font-bold">{stats.touchdowns}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs text-gray-500">Passes TD</p>
                  <p className="font-bold">{stats.passingTDs}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs text-gray-500">Yards course</p>
                  <p className="font-bold">{stats.yardsRushing}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs text-gray-500">Yards réception</p>
                  <p className="font-bold">{stats.yardsReceiving}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs text-gray-500">Interceptions</p>
                  <p className="font-bold">{stats.interceptionsMade}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs text-gray-500">Flag pulls</p>
                  <p className="font-bold">{stats.flagPulls}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs text-gray-500">Complétion</p>
                  <p className="font-bold">{completionRate}%</p>
                </div>
              </div>
            </div>
          )}

          {/* Bouton fermer */}
          <button
            onClick={onClose}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
