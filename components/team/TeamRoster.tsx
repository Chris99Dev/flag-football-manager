"use client";

import { useState } from "react";
import { PlayerCard } from "./PlayerCard";
import { PlayerDetailModal } from "./PlayerDetailModal";

interface PlayerData {
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
  isInMatchSquad: boolean;
  isStarter: boolean;
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
}

interface TeamRosterProps {
  players: PlayerData[];
}

const POSITION_FILTERS = [
  { value: "ALL", label: "Tous" },
  { value: "OFFENSE", label: "Attaque" },
  { value: "DEFENSE", label: "Défense" },
  { value: "QB", label: "QB" },
  { value: "WR", label: "WR" },
  { value: "C", label: "C" },
  { value: "CB", label: "CB" },
  { value: "S", label: "S" },
  { value: "R", label: "R" },
];

const OFFENSE_POSITIONS = ["QB", "WR", "C"];
const DEFENSE_POSITIONS = ["CB", "S", "R"];

export function TeamRoster({ players }: TeamRosterProps) {
  const [filter, setFilter] = useState("ALL");
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerData | null>(null);
  const [sortBy, setSortBy] = useState<"position" | "level" | "overall" | "name">("position");

  // Filtrer
  const filteredPlayers = players.filter((p) => {
    if (filter === "ALL") return true;
    if (filter === "OFFENSE") return OFFENSE_POSITIONS.includes(p.primaryPosition);
    if (filter === "DEFENSE") return DEFENSE_POSITIONS.includes(p.primaryPosition);
    return p.primaryPosition === filter;
  });

  // Trier
  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    switch (sortBy) {
      case "level":
        return b.level - a.level;
      case "overall":
        return getOverall(b) - getOverall(a);
      case "name":
        return a.lastName.localeCompare(b.lastName);
      case "position":
      default:
        return a.primaryPosition.localeCompare(b.primaryPosition);
    }
  });

  // Stats résumé
  const totalSalary = players.reduce((sum, p) => sum + p.weeklySalary, 0);
  const avgLevel = Math.round(players.reduce((sum, p) => sum + p.level, 0) / players.length);
  const avgOverall = Math.round(players.reduce((sum, p) => sum + getOverall(p), 0) / players.length);
  const injuredCount = players.filter((p) => p.injuryType !== "NONE").length;

  return (
    <div>
      {/* Stats résumé de l'équipe */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <p className="text-gray-500 text-xs">Masse salariale / semaine</p>
          <p className="text-xl font-bold text-yellow-600">{totalSalary} G</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <p className="text-gray-500 text-xs">Niveau moyen</p>
          <p className="text-xl font-bold text-blue-900">{avgLevel}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <p className="text-gray-500 text-xs">Overall moyen</p>
          <p className="text-xl font-bold text-blue-900">{avgOverall}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <p className="text-gray-500 text-xs">Blessés</p>
          <p className={`text-xl font-bold ${injuredCount > 0 ? "text-red-600" : "text-green-600"}`}>
            {injuredCount}
          </p>
        </div>
      </div>

      {/* Filtres et tri */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="flex flex-wrap gap-1">
          {POSITION_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === f.value
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-blue-50 border border-gray-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-gray-500">Trier :</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="text-xs bg-white border border-gray-200 rounded-lg px-2 py-1.5"
          >
            <option value="position">Par poste</option>
            <option value="level">Par niveau</option>
            <option value="overall">Par overall</option>
            <option value="name">Par nom</option>
          </select>
        </div>
      </div>

      {/* Nombre de résultats */}
      <p className="text-xs text-gray-500 mb-3">
        {sortedPlayers.length} joueur{sortedPlayers.length > 1 ? "s" : ""} affiché{sortedPlayers.length > 1 ? "s" : ""}
      </p>

      {/* Liste des joueurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sortedPlayers.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onClick={() => setSelectedPlayer(player)}
          />
        ))}
      </div>

      {/* Modal détail joueur */}
      {selectedPlayer && (
        <PlayerDetailModal
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  );
}

function getOverall(player: { speed: number; agility: number; strength: number; intelligence: number; endurance: number; throwing: number; catching: number; mental: number }): number {
  return Math.round(
    (player.speed + player.agility + player.strength + player.intelligence +
      player.endurance + player.throwing + player.catching + player.mental) / 8
  );
}
