// ==========================================
// Données de génération aléatoire
// Noms de joueurs et clubs par pays
// ==========================================

import type { Country, Region } from "@/types/game";

// --- PRÉNOMS PAR PAYS ---

export const FIRST_NAMES: Record<Country, string[]> = {
  FR: [
    "Antoine", "Lucas", "Hugo", "Léo", "Nathan", "Théo", "Gabriel", "Raphaël",
    "Jules", "Arthur", "Louis", "Adam", "Maël", "Ethan", "Noah", "Mathis",
    "Tom", "Enzo", "Liam", "Sacha", "Paul", "Victor", "Maxime", "Clément",
    "Romain", "Julien", "Quentin", "Florian", "Baptiste", "Alexandre",
    "Thomas", "Nicolas", "Pierre", "Vincent", "Mathieu", "Sébastien",
    "Damien", "Cédric", "Olivier", "Fabien", "Yann", "Loïc", "Kévin",
  ],
  US: [
    "James", "John", "Robert", "Michael", "William", "David", "Richard",
    "Joseph", "Thomas", "Charles", "Christopher", "Daniel", "Matthew",
    "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua",
    "Kenneth", "Kevin", "Brian", "George", "Edward", "Ronald", "Timothy",
    "Jason", "Jeffrey", "Ryan", "Jacob", "Gary", "Nicholas", "Eric",
    "Jonathan", "Stephen", "Larry", "Justin", "Scott", "Brandon", "Frank",
    "Benjamin", "Gregory", "Samuel", "Raymond", "Patrick", "Alexander",
    "Tyler", "Jack", "Aaron", "Marcus", "Jamal", "Tyrone", "Darnell",
    "Malik", "Andre", "Jerome", "DeShawn", "Marquis", "Trevon", "Jaylen",
  ],
  JP: [
    "Hiroshi", "Takeshi", "Kenji", "Akira", "Daisuke", "Yuuki", "Ryouta",
    "Shouta", "Kaito", "Haruto", "Sora", "Yuto", "Souta", "Riku", "Ren",
    "Hayato", "Tsubasa", "Takumi", "Naoki", "Kazuki", "Yuuta", "Shun",
    "Tatsuya", "Kouhei", "Masato", "Takashi", "Hiroto", "Yamato", "Itsuki",
    "Kouki", "Asahi", "Aoi", "Hibiki", "Minato", "Tsubaki", "Ryou",
    "Satoshi", "Makoto", "Toshiki", "Yusuke",
  ],
};

// --- NOMS DE FAMILLE PAR PAYS ---

export const LAST_NAMES: Record<Country, string[]> = {
  FR: [
    "Martin", "Bernard", "Dubois", "Thomas", "Robert", "Richard", "Petit",
    "Durand", "Leroy", "Moreau", "Simon", "Laurent", "Lefebvre", "Michel",
    "Garcia", "David", "Bertrand", "Roux", "Vincent", "Fournier", "Morel",
    "Girard", "André", "Lefèvre", "Mercier", "Dupont", "Lambert", "Bonnet",
    "François", "Martinez", "Legrand", "Garnier", "Faure", "Rousseau",
    "Blanc", "Guérin", "Muller", "Henry", "Roussel", "Nicolas", "Perrin",
    "Morin", "Mathieu", "Clément", "Gauthier", "Dumont", "Lopez", "Fontaine",
  ],
  US: [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller",
    "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez",
    "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
    "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark",
    "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King",
    "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green",
    "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell",
    "Carter", "Roberts", "Washington", "Jefferson", "Jordan", "Brooks",
  ],
  JP: [
    "Sato", "Suzuki", "Takahashi", "Tanaka", "Watanabe", "Ito", "Yamamoto",
    "Nakamura", "Kobayashi", "Kato", "Yoshida", "Yamada", "Sasaki", "Yamaguchi",
    "Matsumoto", "Inoue", "Kimura", "Hayashi", "Shimizu", "Yamazaki", "Mori",
    "Abe", "Ikeda", "Hashimoto", "Yamashita", "Ishikawa", "Nakajima", "Maeda",
    "Fujita", "Ogawa", "Goto", "Okada", "Hasegawa", "Murakami", "Kondo",
    "Ishii", "Saito", "Sakamoto", "Endo", "Aoki", "Fujii", "Nishimura",
    "Fukuda", "Ota", "Miura", "Fujiwara", "Okamoto", "Nakagawa", "Nakano",
  ],
};

// --- NOMS DE CLUBS PAR PAYS ---
// Format : { villes/régions, surnoms d'équipe, suffixes }

interface ClubNameData {
  cities: string[];
  mascots: string[];
  suffixes: string[];
}

export const CLUB_NAMES: Record<Country, ClubNameData> = {
  FR: {
    cities: [
      "Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes", "Strasbourg",
      "Montpellier", "Bordeaux", "Lille", "Rennes", "Reims", "Le Havre", "Saint-Étienne",
      "Toulon", "Grenoble", "Dijon", "Angers", "Brest", "Le Mans", "Amiens",
      "Limoges", "Tours", "Clermont", "Besançon", "Orléans", "Metz", "Rouen",
      "Mulhouse", "Caen", "Nancy", "Argenteuil", "Roubaix", "Tourcoing", "Nanterre",
      "Avignon", "Vitry", "Créteil", "Poitiers", "Versailles",
    ],
    mascots: [
      "Lions", "Aigles", "Loups", "Tigres", "Panthères", "Faucons", "Corbeaux",
      "Dragons", "Vikings", "Gladiateurs", "Titans", "Spartiates", "Rebelles",
      "Conquérants", "Légionnaires", "Sangliers", "Ours", "Pirates", "Cosmos",
      "Mistral",
    ],
    suffixes: ["FC", "Club", "Athletic", "Olympique", "Sporting"],
  },
  US: {
    cities: [
      "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
      "San Antonio", "San Diego", "Dallas", "Austin", "Jacksonville", "Fort Worth",
      "Columbus", "Charlotte", "Indianapolis", "Seattle", "Denver", "Washington",
      "Boston", "Nashville", "Baltimore", "Oklahoma City", "Portland", "Las Vegas",
      "Memphis", "Louisville", "Milwaukee", "Albuquerque", "Tucson", "Sacramento",
      "Atlanta", "Miami", "Cleveland", "New Orleans", "Tampa", "Cincinnati",
      "Pittsburgh", "Saint Louis", "Buffalo", "Salt Lake City",
    ],
    mascots: [
      "Eagles", "Hawks", "Wolves", "Tigers", "Panthers", "Bears", "Lions",
      "Sharks", "Raiders", "Patriots", "Rebels", "Warriors", "Knights",
      "Pirates", "Cowboys", "Rangers", "Mustangs", "Stallions", "Bulls",
      "Generals",
    ],
    suffixes: ["FC", "Athletic", "United", "Sporting", "Express"],
  },
  JP: {
    cities: [
      "Tokyo", "Yokohama", "Osaka", "Nagoya", "Sapporo", "Kobe", "Kyoto",
      "Fukuoka", "Kawasaki", "Saitama", "Hiroshima", "Sendai", "Kitakyushu",
      "Chiba", "Sakai", "Niigata", "Hamamatsu", "Kumamoto", "Sagamihara",
      "Shizuoka", "Okayama", "Kanazawa", "Utsunomiya", "Matsuyama", "Matsudo",
      "Kawaguchi", "Kagoshima", "Funabashi", "Hachioji", "Ichikawa",
      "Nara", "Toyama", "Nagasaki", "Gifu", "Miyazaki", "Otsu", "Wakayama",
      "Akita", "Naha", "Aomori",
    ],
    mascots: [
      "Dragons", "Samurai", "Ninjas", "Tigers", "Wolves", "Eagles", "Phoenix",
      "Thunders", "Storms", "Spirits", "Warriors", "Shoguns", "Ronins",
      "Falcons", "Hawks", "Bears", "Cobras", "Vipers", "Stars", "Suns",
    ],
    suffixes: ["FC", "Stars", "United", "Athletic", "Sporting"],
  },
};

// --- RÉGIONS PAR PAYS ---
// Pour assigner les clubs aux régions Nord-Est, Nord-Ouest, Sud-Est, Sud-Ouest

export const REGION_LABELS: Record<Region, string> = {
  NE: "Nord-Est",
  NW: "Nord-Ouest",
  SE: "Sud-Est",
  SW: "Sud-Ouest",
};

// --- TRAITS DE PERSONNALITÉ ---

export const PERSONALITY_TRAITS = [
  "LEADER",
  "LONER",
  "COMPETITOR",
  "PARTY_LOVER",
  "HARD_WORKER",
  "LIAR",
  "LOYAL",
  "CALM",
  "HOT_HEADED",
] as const;

export const TRAIT_LABELS: Record<string, string> = {
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