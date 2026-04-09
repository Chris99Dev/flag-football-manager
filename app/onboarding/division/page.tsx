import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface DivisionPageProps {
  searchParams: Promise<{ country?: string }>;
}

const COUNTRY_LABELS: Record<string, { flag: string; name: string }> = {
  FR: { flag: "🇫🇷", name: "France" },
  US: { flag: "🇺🇸", name: "USA" },
  JP: { flag: "🇯🇵", name: "Japon" },
};

export default async function DivisionSelectionPage({
  searchParams,
}: DivisionPageProps) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const params = await searchParams;
  const country = params.country;

  if (!country || !COUNTRY_LABELS[country]) {
    redirect("/onboarding/country");
  }

  const countryInfo = COUNTRY_LABELS[country];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-blue-200 text-sm uppercase tracking-wider mb-2">
            Étape 3 sur 4
          </p>
          <div className="text-5xl mb-3">{countryInfo.flag}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {countryInfo.name} — Choisissez votre division
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Démarrer en élite avec plus de pression, ou en deuxième division
            pour bâtir progressivement ?
          </p>
        </div>

        {/* Cartes division */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* D1 */}
          <Link
            href={`/onboarding/club?country=${country}&division=D1`}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-all"
          >
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 p-8 text-center">
              <div className="text-6xl mb-3">🏆</div>
              <h2 className="text-3xl font-bold text-white">Division 1</h2>
              <p className="text-yellow-100 text-sm mt-2">L&apos;élite</p>
            </div>
            <div className="p-6">
              <div className="mb-4 flex gap-2">
                <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Difficile
                </span>
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Plus de revenus
                </span>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>✓ 20 clubs au plus haut niveau</li>
                <li>✓ Accès direct aux compétitions continentales</li>
                <li>✓ Sponsors plus généreux</li>
                <li>⚠ Adversaires plus forts dès le début</li>
                <li>⚠ Risque de relégation</li>
              </ul>
              <div className="mt-6 text-yellow-700 font-semibold text-sm">
                Démarrer en D1 →
              </div>
            </div>
          </Link>

          {/* D2 */}
          <Link
            href={`/onboarding/club?country=${country}&division=D2`}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-all"
          >
            <div className="bg-gradient-to-br from-green-600 to-green-800 p-8 text-center">
              <div className="text-6xl mb-3">🌱</div>
              <h2 className="text-3xl font-bold text-white">Division 2</h2>
              <p className="text-green-100 text-sm mt-2">La progression</p>
            </div>
            <div className="p-6">
              <div className="mb-4 flex gap-2">
                <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Accessible
                </span>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Idéal débutant
                </span>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>✓ 20 clubs avec adversaires plus accessibles</li>
                <li>✓ Idéal pour apprendre le jeu</li>
                <li>✓ Possibilité de monter en D1</li>
                <li>✓ Construction progressive du club</li>
                <li>⚠ Sponsors et revenus plus modestes</li>
              </ul>
              <div className="mt-6 text-green-700 font-semibold text-sm">
                Démarrer en D2 →
              </div>
            </div>
          </Link>
        </div>

        {/* Bouton retour */}
        <div className="text-center">
          <Link
            href="/onboarding/country"
            className="text-blue-200 hover:text-white text-sm"
          >
            ← Retour au choix du pays
          </Link>
        </div>
      </div>
    </div>
  );
}