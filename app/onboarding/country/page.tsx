import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface CountryOption {
  code: string;
  flag: string;
  name: string;
  description: string;
  difficulty: string;
}

const COUNTRIES: CountryOption[] = [
  {
    code: "FR",
    flag: "🇫🇷",
    name: "France",
    description: "Le championnat français vous tend les bras. Une compétition équilibrée et une fanbase passionnée.",
    difficulty: "Équilibré",
  },
  {
    code: "US",
    flag: "🇺🇸",
    name: "USA",
    description: "Le berceau du Flag Football. Compétition féroce, joueurs talentueux, gloire à la clé.",
    difficulty: "Difficile",
  },
  {
    code: "JP",
    flag: "🇯🇵",
    name: "Japon",
    description: "Discipline et rigueur. Un championnat où la stratégie prime sur la force brute.",
    difficulty: "Stratégique",
  },
];

export default async function CountrySelectionPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-blue-200 text-sm uppercase tracking-wider mb-2">
            Étape 2 sur 4
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choisissez votre pays
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Dans quel championnat souhaitez-vous démarrer votre carrière de
            Head Coach ?
          </p>
        </div>

        {/* Cartes pays */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {COUNTRIES.map((country) => (
            <Link
              key={country.code}
              href={`/onboarding/division?country=${country.code}`}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-all"
            >
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-center">
                <div className="text-7xl mb-3">{country.flag}</div>
                <h2 className="text-3xl font-bold text-white">
                  {country.name}
                </h2>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {country.difficulty}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {country.description}
                </p>
                <div className="mt-6 text-blue-600 font-semibold text-sm">
                  Choisir ce pays →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bouton retour */}
        <div className="text-center">
          <Link
            href="/onboarding"
            className="text-blue-200 hover:text-white text-sm"
          >
            ← Retour
          </Link>
        </div>
      </div>
    </div>
  );
}