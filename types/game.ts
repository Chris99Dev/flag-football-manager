// ==========================================
// FLAG FOOTBALL MANAGER — Types principaux
// Bible v2 — Toutes les entités du jeu
// ==========================================

// --- Enums ---

export type Country = "FR" | "US" | "JP";

export type Region = "NE" | "NW" | "SE" | "SW";

export type Conference = "NORTH" | "SOUTH";

export type Division = "D1" | "D2";

export type Position =
  | "QB"   // Quarterback
  | "WR"   // Wide Receiver
  | "C"    // Center
  | "CB"   // Cornerback
  | "S"    // Safety
  | "R";   // Rusher

export type OffensivePosition = "QB" | "WR" | "C";
export type DefensivePosition = "CB" | "S" | "R";

export type Rarity = "COMMON" | "RARE" | "EPIC" | "LEGENDARY";

export type Weather = "SUNNY" | "RAIN" | "WIND" | "HEAT" | "SNOW";

export type OffensivePlay = "SHORT_PASS" | "LONG_PASS" | "RUN" | "PLAY_ACTION";
export type DefensivePlay = "ZONE" | "MAN" | "BLITZ" | "PREVENT";

export type TrainingType =
  | "SPRINT_DRILLS"    // VIT + AGI
  | "FILM_STUDY"       // INT + MEN
  | "CATCH_PRACTICE"   // REC + AGI
  | "STRENGTH"         // FOR + END
  | "THROW_PRACTICE"   // LAN + MEN
  | "SCRIMMAGE";       // Toutes stats (léger)

export type TrainingIntensity = "LIGHT" | "NORMAL" | "INTENSIVE";

export type InjuryType = "CRAMP" | "SPRAIN" | "NONE";

export type PersonalityTrait =
  | "LEADER"
  | "LONER"
  | "COMPETITOR"
  | "PARTY_LOVER"
  | "HARD_WORKER"
  | "LIAR"
  | "LOYAL"
  | "CALM"
  | "HOT_HEADED";

export type StaffRole =
  | "PHYSIO"           // Préparateur physique
  | "OFF_COORDINATOR"  // Offensive Coordinator
  | "DEF_COORDINATOR"  // Defensive Coordinator
  | "SCOUT"            // Scout
  | "MEDIC";           // Médecin

export type SponsorType = "JERSEY" | "STADIUM" | "EQUIPMENT";

export type InfrastructureType =
  | "STADIUM"
  | "TRAINING_CENTER"
  | "FORMATION_CENTER"
  | "MEDICAL_CENTER"
  | "RECRUITMENT_OFFICE";

export type DayEventType =
  | "MATCH"
  | "TRAINING"
  | "REST"
  | "FREE"
  | "TRANSFER_WINDOW"
  | "PLAYOFF"
  | "CUP_MATCH"
  | "FRIENDLY";

// --- Stats des joueurs (8 stats) ---

export interface PlayerStats {
  speed: number;        // VIT — Vitesse
  agility: number;      // AGI — Agilité
  strength: number;     // FOR — Force
  intelligence: number; // INT — Intelligence tactique
  endurance: number;    // END — Endurance
  throwing: number;     // LAN — Technique de lancer
  catching: number;     // REC — Réception
  mental: number;       // MEN — Mental (stress, clutch)
}

// --- Joueur ---

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  country: Country;
  region: Region;

  // Poste
  primaryPosition: Position;
  secondaryPosition: Position | null;  // Appris via entraînement

  // Stats
  stats: PlayerStats;
  level: number;         // 1-99
  xp: number;
  xpToNextLevel: number;

  // Compétences
  skillSlots: number;    // 1-5 (+ 1 premium possible)
  skills: Skill[];
  hasPremiumSlot: boolean;

  // Équipement
  equipment: PlayerEquipment;

  // État
  fatigue: number;       // 0-100
  morale: number;        // 0-100
  injury: InjuryType;
  injuryWeeksLeft: number;

  // Personnalité
  traits: PersonalityTrait[];

  // Contrat
  contractWeeksLeft: number;
  weeklySalary: number;

  // Sponsor individuel
  personalSponsor: PersonalSponsor | null;

  // Historique carrière
  careerStats: CareerStats;
  clubHistory: ClubHistoryEntry[];
}

// --- Compétence (Technique) ---

export interface Skill {
  id: string;
  name: string;
  type: "OFFENSE" | "DEFENSE" | "PASSIVE";
  description: string;
  effect: SkillEffect;
}

export interface SkillEffect {
  statBoost?: Partial<PlayerStats>;
  specialEffect?: string;  // Ex: "+20% précision passe courte"
  value: number;           // Pourcentage ou valeur du boost
}

// --- Équipement ---

export interface Equipment {
  id: string;
  name: string;
  slot: "SHOES" | "GLOVES" | "HEADBAND" | "ARM_ACCESSORY";
  rarity: Rarity;
  statBoost: Partial<PlayerStats>;
}

export interface PlayerEquipment {
  shoes: Equipment | null;
  gloves: Equipment | null;
  headband: Equipment | null;
  armAccessory: Equipment | null;
}

// --- Stats de carrière ---

export interface CareerStats {
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
  completionRate: number;  // Pour les QB
}

export interface ClubHistoryEntry {
  clubId: string;
  clubName: string;
  seasonsPlayed: number;
  fromYear: number;
  toYear: number | null;  // null = encore dans le club
}

// --- Club ---

export interface Club {
  id: string;
  name: string;
  country: Country;
  region: Region;
  conference: Conference;
  division: Division;

  // Roster
  players: Player[];
  maxRosterSize: number;       // 20 par défaut
  matchDaySquadSize: number;   // 14

  // Staff
  staff: StaffMember[];

  // Économie
  gold: number;
  weeklyIncome: number;
  weeklyExpenses: number;

  // Club stats
  notoriety: number;    // 0-100 — Combien le club est CONNU
  reputation: number;   // 0-100 — Combien le club est RESPECTÉ

  // Infrastructures
  infrastructure: Infrastructure[];

  // Sponsors
  sponsors: ClubSponsor[];
  maxSponsors: number;  // 1 au départ, max 3

  // Historique
  history: ClubSeasonHistory[];
  trophies: Trophy[];
  retiredJerseys: RetiredJersey[];
}

// --- Staff ---

export interface StaffMember {
  id: string;
  name: string;
  role: StaffRole;
  stars: number;         // 1-5 étoiles
  weeklySalary: number;
  contractWeeksLeft: number;
}

// --- Infrastructure ---

export interface Infrastructure {
  type: InfrastructureType;
  level: number;           // 1-10
  upgradeCost: number;     // Coût pour passer au niveau suivant
}

// --- Sponsors ---

export interface ClubSponsor {
  id: string;
  name: string;
  type: SponsorType;
  weeklyIncome: number;
  objective: SponsorObjective;
  contractWeeksLeft: number;
}

export interface PersonalSponsor {
  id: string;
  name: string;
  objective: SponsorObjective;
  reward: Equipment;         // Équipement fourni si objectif rempli
  contractWeeksLeft: number;
}

export interface SponsorObjective {
  description: string;
  target: number;            // Ex: 5 (TD à marquer)
  current: number;           // Progression actuelle
  type: "WINS" | "TOUCHDOWNS" | "CLEAN_SHEETS" | "LEAGUE_POSITION";
}

// --- Match ---

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  weather: Weather;
  score: { home: number; away: number };
  quarter: number;           // 1-4 (2 mi-temps × 2)
  timeRemaining: number;     // En secondes
  currentDown: number;       // 1-4
  yardsToFirst: number;
  ballPosition: number;      // Position sur le terrain (0-70 yards)
  possession: "HOME" | "AWAY";
  momentum: number;          // -100 à +100 (négatif = away, positif = home)
  timeouts: { home: number; away: number };
  plays: PlayResult[];
}

export interface PlayResult {
  offensivePlay: OffensivePlay;
  defensivePlay: DefensivePlay;
  yardsGained: number;
  result: "COMPLETE" | "INCOMPLETE" | "TOUCHDOWN" | "INTERCEPTION" | "FLAG_PULL" | "FUMBLE" | "PENALTY";
  involvedPlayers: string[];  // IDs des joueurs impliqués
  xpGained: { playerId: string; xp: number }[];
  timeElapsed: number;        // Secondes consommées par ce play
}

// --- Playbook ---

export interface Playbook {
  offensivePlays: OffensivePlay[];  // 4 sélectionnées pour le match
  defensivePlays: DefensivePlay[];  // 4 sélectionnées pour le match
}

// --- Calendrier ---

export interface GameDay {
  date: GameDate;
  event: DayEventType;
  matchId?: string;
  trainingAvailable: boolean;
}

export interface GameDate {
  year: number;
  month: number;   // 1-12
  week: number;    // 1-4
  day: number;     // 1-7
}

export interface Season {
  year: number;
  league: Division;
  conference: Conference;
  region: Region;
  matches: Match[];
  standings: Standing[];
  currentWeek: number;
  phase: "PRE_SEASON" | "REGULAR" | "PLAYOFFS" | "OFF_SEASON" | "CAMP";
}

export interface Standing {
  clubId: string;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  streak: number;  // Positif = victoires consécutives, négatif = défaites
}

// --- Historique & Records ---

export interface ClubSeasonHistory {
  year: number;
  division: Division;
  position: number;
  wins: number;
  losses: number;
  trophiesWon: string[];
}

export interface Trophy {
  name: string;
  year: number;
  type: "CHAMPIONSHIP" | "NATIONAL_CUP" | "CONFERENCE_CUP" | "WORLD_CUP" | "CONTINENTAL";
}

export interface RetiredJersey {
  number: number;
  playerName: string;
  years: string;        // Ex: "2026-2035"
  careerStats: CareerStats;
}

export interface Record {
  category: string;      // Ex: "Most TDs in a season"
  value: number;
  playerName: string;
  clubName: string;
  year: number;
  scope: "REGIONAL" | "NATIONAL" | "WORLD";
}

export interface HallOfFameEntry {
  playerId: string;
  playerName: string;
  inductionYear: number;
  careerStats: CareerStats;
  clubs: string[];
  trophies: Trophy[];
}

// --- Journal ---

export interface NewsEntry {
  id: string;
  date: GameDate;
  title: string;
  content: string;
  type: "RECORD" | "TRANSFER" | "RETIRED_JERSEY" | "TROPHY" | "INJURY" | "RETIREMENT" | "HOF" | "SPONSOR" | "NATIONAL_TEAM" | "PROMOTION" | "RELEGATION";
}

// --- Entraînement ---

export interface TrainingSession {
  type: TrainingType;
  intensity: TrainingIntensity;
  targetPlayerId?: string;   // null = collectif
  cost: number;              // 0 si collectif gratuit
  xpGain: number;
  statBoosts: Partial<PlayerStats>;
  injuryRisk: number;        // 0-100 pourcentage
}

// --- Président ---

export interface President {
  name: string;
  seasonObjective: SeasonObjective;
  patience: number;          // Nombre de saisons ratées avant renvoi
}

export interface SeasonObjective {
  description: string;       // Ex: "Finir dans le top 4"
  type: "TOP_FINISH" | "PLAYOFFS" | "NO_RELEGATION" | "CHAMPIONSHIP";
  target: number;            // Ex: 4 pour top 4
}

// --- State global du jeu ---

export interface GameState {
  currentClub: Club;
  currentSeason: Season;
  currentDate: GameDate;
  president: President;
  news: NewsEntry[];
  records: Record[];
  hallOfFame: HallOfFameEntry[];
  allClubs: Club[];          // Les 120 clubs
  freeAgents: Player[];
  gold: number;
  gems: number;              // Monnaie premium
}