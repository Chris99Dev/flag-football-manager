"use client";

import { signOut } from "next-auth/react";

interface ClubHeaderProps {
  clubName: string;
  country: string;
  division: string;
  conference: string;
  region: string;
  gold: number;
  notoriety: number;
  reputation: number;
  currentDate: {
    year: number;
    month: number;
    week: number;
    day: number;
  };
  seasonPhase: string;
  userName: string;
  userImage: string | null;
}

const COUNTRY_FLAGS: Record<string, string> = {
  FR: "🇫🇷",
  US: "🇺🇸",
  JP: "🇯🇵",
};

const REGION_LABELS: Record<string, string> = {
  NE: "Nord-Est",
  NW: "Nord-Ouest",
  SE: "Sud-Est",
  SW: "Sud-Ouest",
};

const PHASE_LABELS: Record<string, string> = {
  PRE_SEASON: "Pré-saison",
  REGULAR: "Saison régulière",
  PLAYOFFS: "Playoffs",
  OFF_SEASON: "Inter-saison",
  CAMP: "Camp d'entraînement",
};

const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export function ClubHeader({
  clubName,
  country,
  division,
  conference,
  region,
  gold,
  notoriety,
  reputation,
  currentDate,
  seasonPhase,
  userName,
  userImage,
}: ClubHeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-xl">
      {/* Barre du haut */}
      <div className="border-b border-blue-700/50">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-blue-300">
              {PHASE_LABELS[seasonPhase] || seasonPhase}
            </span>
            <span className="text-blue-400">|</span>
            <span className="text-blue-200">
              Année {currentDate.year} — Mois {currentDate.month}, Semaine{" "}
              {currentDate.week}, {DAY_LABELS[(currentDate.day - 1) % 7] || "Jour " + currentDate.day}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {userImage && (
              <img
                src={userImage}
                alt={userName}
                className="w-7 h-7 rounded-full border border-blue-400"
              />
            )}
            <span className="text-blue-200 hidden sm:inline">{userName}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-blue-300 hover:text-white text-xs border border-blue-600 hover:border-blue-400 px-2 py-1 rounded transition-colors"
            >
              Déco.
            </button>
          </div>
        </div>
      </div>

      {/* Infos du club */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Nom du club */}
          <div className="flex items-center gap-4">
            <div className="text-4xl">{COUNTRY_FLAGS[country] || "🏳️"}</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{clubName}</h1>
              <p className="text-blue-300 text-sm">
                {division === "D1" ? "🏆 Division 1" : "🌱 Division 2"} —{" "}
                {REGION_LABELS[region] || region}
              </p>
            </div>
          </div>

          {/* Stats rapides */}
          <div className="flex items-center gap-3 md:gap-6">
            <div className="bg-blue-800/50 rounded-lg px-4 py-2 text-center">
              <p className="text-yellow-400 font-bold text-xl">
                {gold.toLocaleString()}
              </p>
              <p className="text-blue-300 text-xs">Gold</p>
            </div>
            <div className="bg-blue-800/50 rounded-lg px-4 py-2 text-center">
              <p className="text-white font-bold text-xl">{notoriety}</p>
              <p className="text-blue-300 text-xs">Notoriété</p>
            </div>
            <div className="bg-blue-800/50 rounded-lg px-4 py-2 text-center">
              <p className="text-white font-bold text-xl">{reputation}</p>
              <p className="text-blue-300 text-xs">Réputation</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
