// ==========================================
// Générateurs aléatoires pour clubs et joueurs
// ==========================================

import type { Country, Region, Position } from "@/types/game";
import { FIRST_NAMES, LAST_NAMES, CLUB_NAMES, PERSONALITY_TRAITS } from "./names";

// --- Helpers ---

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// --- Génération de joueurs ---

export interface GeneratedPlayer {
  firstName: string;
  lastName: string;
  age: number;
  country: Country;
  region: Region;
  primaryPosition: Position;
  speed: number;
  agility: number;
  strength: number;
  intelligence: number;
  endurance: number;
  throwing: number;
  catching: number;
  mental: number;
  trait1: string | null;
  trait2: string | null;
  weeklySalary: number;
}

const POSITIONS: Position[] = ["QB", "WR", "C", "CB", "S", "R"];
const REGIONS: Region[] = ["NE", "NW", "SE", "SW"];

/**
 * Génère un joueur aléatoire de niveau 1
 * Les stats sont entre 8 et 14 (faibles, c'est niveau 1)
 * Le pays d'origine peut être différent du pays du club (mélange culturel)
 */
export function generatePlayer(forcedPosition?: Position): GeneratedPlayer {
  // Pays d'origine aléatoire (mélange international)
  const countries: Country[] = ["FR", "US", "JP"];
  const country = randomElement(countries);

  const firstName = randomElement(FIRST_NAMES[country]);
  const lastName = randomElement(LAST_NAMES[country]);

  // Âge : profil débutant entre 17 et 22 ans
  const age = randomInt(17, 22);

  // Région d'origine aléatoire
  const region = randomElement(REGIONS);

  // Poste principal
  const primaryPosition = forcedPosition || randomElement(POSITIONS);

  // Stats de base entre 8 et 14 (niveau 1)
  // On boostera les stats pertinentes selon le poste
  const baseStats = {
    speed: randomInt(8, 14),
    agility: randomInt(8, 14),
    strength: randomInt(8, 14),
    intelligence: randomInt(8, 14),
    endurance: randomInt(8, 14),
    throwing: randomInt(8, 14),
    catching: randomInt(8, 14),
    mental: randomInt(8, 14),
  };

  // Boost selon le poste (+2 à +4 sur les stats clés)
  switch (primaryPosition) {
    case "QB":
      baseStats.throwing += randomInt(3, 5);
      baseStats.intelligence += randomInt(2, 4);
      baseStats.mental += randomInt(2, 4);
      break;
    case "WR":
      baseStats.catching += randomInt(3, 5);
      baseStats.speed += randomInt(2, 4);
      baseStats.agility += randomInt(2, 4);
      break;
    case "C":
      baseStats.strength += randomInt(3, 5);
      baseStats.endurance += randomInt(2, 4);
      break;
    case "CB":
      baseStats.speed += randomInt(2, 4);
      baseStats.agility += randomInt(3, 5);
      baseStats.intelligence += randomInt(2, 3);
      break;
    case "S":
      baseStats.intelligence += randomInt(3, 5);
      baseStats.mental += randomInt(2, 4);
      baseStats.endurance += randomInt(2, 3);
      break;
    case "R":
      baseStats.speed += randomInt(3, 5);
      baseStats.strength += randomInt(2, 4);
      break;
  }

  // Cap à 20 max pour des stats de base niveau 1
  Object.keys(baseStats).forEach((key) => {
    const k = key as keyof typeof baseStats;
    baseStats[k] = Math.min(20, baseStats[k]);
  });

  // 1 ou 2 traits de personnalité
  const numTraits = Math.random() > 0.5 ? 2 : 1;
  const traits = randomElements([...PERSONALITY_TRAITS], numTraits);

  // Salaire de base : entre 30 et 80 Gold/semaine pour un débutant
  const weeklySalary = randomInt(30, 80);

  return {
    firstName,
    lastName,
    age,
    country,
    region,
    primaryPosition,
    ...baseStats,
    trait1: traits[0] || null,
    trait2: traits[1] || null,
    weeklySalary,
  };
}

/**
 * Génère 12 joueurs pour une équipe de départ
 * Composition équilibrée : 2 QB, 4 WR, 1 C, 2 CB, 2 S, 1 R
 */
export function generateTeamRoster(): GeneratedPlayer[] {
  const composition: Position[] = [
    "QB", "QB",
    "WR", "WR", "WR", "WR",
    "C",
    "CB", "CB",
    "S", "S",
    "R",
  ];

  return composition.map((pos) => generatePlayer(pos));
}

// --- Génération de clubs ---

export interface GeneratedClub {
  name: string;
  country: Country;
  region: Region;
  conference: "NORTH" | "SOUTH";
  division: "D1" | "D2";
}

/**
 * Génère un nom de club aléatoire pour un pays donné
 * Format : "[Ville] [Mascotte] [Suffixe]" ou "[Suffixe] [Ville]"
 */
export function generateClubName(country: Country, usedNames: Set<string>): string {
  const data = CLUB_NAMES[country];
  let name = "";
  let attempts = 0;

  do {
    const city = randomElement(data.cities);
    const mascot = randomElement(data.mascots);
    const suffix = randomElement(data.suffixes);

    // 3 formats possibles
    const format = randomInt(1, 3);
    switch (format) {
      case 1:
        name = `${city} ${mascot}`;
        break;
      case 2:
        name = `${suffix} ${city}`;
        break;
      case 3:
        name = `${city} ${suffix}`;
        break;
    }

    attempts++;
    if (attempts > 50) {
      // Fallback : ajouter un numéro
      name = `${name} ${randomInt(1, 99)}`;
      break;
    }
  } while (usedNames.has(name));

  usedNames.add(name);
  return name;
}

/**
 * Génère les 40 clubs d'un pays
 * 20 clubs en D1 + 20 clubs en D2
 * Chaque division a 2 conférences (Nord/Sud), chaque conférence a 2 régions (Est/Ouest)
 * Soit 5 clubs par région régionale
 */
export function generateCountryClubs(country: Country): GeneratedClub[] {
  const clubs: GeneratedClub[] = [];
  const usedNames = new Set<string>();

  const divisions: ("D1" | "D2")[] = ["D1", "D2"];
  const conferences: ("NORTH" | "SOUTH")[] = ["NORTH", "SOUTH"];
  const regionsByConf: Record<"NORTH" | "SOUTH", Region[]> = {
    NORTH: ["NE", "NW"],
    SOUTH: ["SE", "SW"],
  };

  for (const division of divisions) {
    for (const conference of conferences) {
      for (const region of regionsByConf[conference]) {
        // 5 clubs par région régionale
        for (let i = 0; i < 5; i++) {
          clubs.push({
            name: generateClubName(country, usedNames),
            country,
            region,
            conference,
            division,
          });
        }
      }
    }
  }

  return clubs;
}

/**
 * Génère tous les clubs des 3 pays
 * 40 clubs × 3 pays = 120 clubs
 */
export function generateAllClubs(): GeneratedClub[] {
  const allClubs: GeneratedClub[] = [];
  const countries: Country[] = ["FR", "US", "JP"];

  for (const country of countries) {
    allClubs.push(...generateCountryClubs(country));
  }

  return allClubs;
}