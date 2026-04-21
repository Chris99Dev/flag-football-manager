interface PlayerData {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  primaryPosition: string;
  country: string;
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
  injuryType: string;
}

interface RosterPreviewProps {
  players: PlayerData[];
}

const COUNTRY_FLAGS: Record<string, string> = {
  FR: "🇫🇷",
  US: "🇺🇸",
  JP: "🇯🇵",
};

const POSITION_COLORS: Record<string, string> = {
  QB: "bg-red-100 text-red-800",
  WR: "bg-blue-100 text-blue-800",
  C: "bg-yellow-100 text-yellow-800",
  CB: "bg-green-100 text-green-800",
  S: "bg-purple-100 text-purple-800",
  R: "bg-orange-100 text-orange-800",
};

function getOverall(player: PlayerData): number {
  return Math.round(
    (player.speed +
      player.agility +
      player.strength +
      player.intelligence +
      player.endurance +
      player.throwing +
      player.catching +
      player.mental) /
      8
  );
}

function getOverallColor(overall: number): string {
  if (overall >= 18) return "text-yellow-600 bg-yellow-50";
  if (overall >= 15) return "text-green-600 bg-green-50";
  if (overall >= 12) return "text-blue-600 bg-blue-50";
  return "text-gray-600 bg-gray-50";
}

export function RosterPreview({ players }: RosterPreviewProps) {
  // Séparer attaque et défense
  const offense = players.filter((p) =>
    ["QB", "WR", "C"].includes(p.primaryPosition)
  );
  const defense = players.filter((p) =>
    ["CB", "S", "R"].includes(p.primaryPosition)
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">
          Mon effectif ({players.length} joueurs)
        </h2>
      </div>

      {/* Attaque */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-red-700 mb-2 uppercase tracking-wider">
          Attaque ({offense.length})
        </h3>
        <div className="space-y-2">
          {offense.map((player) => (
            <PlayerRow key={player.id} player={player} />
          ))}
        </div>
      </div>

      {/* Défense */}
      <div>
        <h3 className="text-sm font-semibold text-blue-700 mb-2 uppercase tracking-wider">
          Défense ({defense.length})
        </h3>
        <div className="space-y-2">
          {defense.map((player) => (
            <PlayerRow key={player.id} player={player} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PlayerRow({ player }: { player: PlayerData }) {
  const overall = getOverall(player);
  const overallStyle = getOverallColor(overall);

  return (
    <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* Drapeau */}
      <span className="text-lg">{COUNTRY_FLAGS[player.country] || "🏳️"}</span>

      {/* Position */}
      <span
        className={`text-xs font-bold px-2 py-1 rounded ${
          POSITION_COLORS[player.primaryPosition] || "bg-gray-100 text-gray-800"
        }`}
      >
        {player.primaryPosition}
      </span>

      {/* Nom et infos */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-sm truncate">
          {player.firstName} {player.lastName}
        </p>
        <p className="text-gray-500 text-xs">
          {player.age} ans — Niv. {player.level}
        </p>
      </div>

      {/* Blessure */}
      {player.injuryType !== "NONE" && (
        <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
          {player.injuryType === "CRAMP" ? "Crampe" : "Blessé"}
        </span>
      )}

      {/* Moral */}
      <div className="hidden md:block w-16">
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              player.morale >= 70
                ? "bg-green-500"
                : player.morale >= 40
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{ width: `${player.morale}%` }}
          />
        </div>
        <p className="text-gray-400 text-xs text-center mt-0.5">Moral</p>
      </div>

      {/* Overall */}
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${overallStyle}`}
      >
        {overall}
      </div>
    </div>
  );
}
