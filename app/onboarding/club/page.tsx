import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SelectClubButton } from "@/components/onboarding/SelectClubButton";

interface ClubPageProps {
  searchParams: Promise<{ country?: string; division?: string }>;
}

const COUNTRY_LABELS: Record<string, { flag: string; name: string }> = {
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

const CONFERENCE_LABELS: Record<string, string> = {
  NORTH: "Conférence Nord",
  SOUTH: "Conférence Sud",
};

export default async function ClubSelectionPage({
  searchParams,
}: ClubPageProps) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const params = await searchParams;
  const country = params.country;
  const division = params.division;

  if (!country || !division || !COUNTRY_LABELS[country]) {
    redirect("/onboarding/country");
  }

  if (division !== "D1" && division !== "D2") {
    redirect(`/onboarding/division?country=${country}`);
  }

  // Récupérer les 20 clubs du pays/division sélectionnés
  const clubs = await prisma.club.findMany({
    where: {
      country,
      division,
      isPlayerControlled: false,
    },
    include: {
      _count: {
        select: { players: true },
      },
    },
    orderBy: [
      { conference: "asc" },
      { region: "asc" },
      { name: "asc" },
    ],
  });

  const countryInfo = COUNTRY_LABELS[country];

  // Grouper par conférence pour l'affichage
  const clubsByConference: Record<string, typeof clubs> = {
    NORTH: clubs.filter((c) => c.conference === "NORTH"),
    SOUTH: clubs.filter((c) => c.conference === "SOUTH"),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-blue-200 text-sm uppercase tracking-wider mb-2">
            Étape 4 sur 4
          </p>
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-4xl">{countryInfo.flag}</span>
            <span
              className={`px-4 py-2 rounded-lg font-bold ${
                division === "D1"
                  ? "bg-yellow-500 text-yellow-900"
                  : "bg-green-500 text-green-900"
              }`}
            >
              {division === "D1" ? "🏆 Division 1" : "🌱 Division 2"}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choisissez votre club
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Sélectionnez le club que vous allez prendre en main. Tous démarrent
            avec les mêmes ressources : 10 000 Gold et 12 joueurs niveau 1.
          </p>
        </div>

        {/* Listes par conférence */}
        {Object.entries(clubsByConference).map(([conference, conferenceClubs]) => (
          <div key={conference} className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-blue-400 pb-2">
              {CONFERENCE_LABELS[conference]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {conferenceClubs.map((club) => (
                <div
                  key={club.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
                >
                  <div
                    className={`p-4 ${
                      division === "D1"
                        ? "bg-gradient-to-r from-blue-700 to-blue-900"
                        : "bg-gradient-to-r from-blue-600 to-blue-800"
                    }`}
                  >
                    <h3 className="text-white font-bold text-lg truncate">
                      {club.name}
                    </h3>
                    <p className="text-blue-200 text-xs">
                      {REGION_LABELS[club.region]}
                    </p>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div>
                        <p className="text-gray-500 text-xs">Joueurs</p>
                        <p className="font-bold text-blue-900">
                          {club._count.players}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Budget</p>
                        <p className="font-bold text-yellow-600">
                          {club.gold.toLocaleString()} G
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Notoriété</p>
                        <p className="font-bold text-blue-900">
                          {club.notoriety}/100
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Réputation</p>
                        <p className="font-bold text-blue-900">
                          {club.reputation}/100
                        </p>
                      </div>
                    </div>
                    <SelectClubButton clubId={club.id} clubName={club.name} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Bouton retour */}
        <div className="text-center mt-8">
          <Link
            href={`/onboarding/division?country=${country}`}
            className="text-blue-200 hover:text-white text-sm"
          >
            ← Retour au choix de la division
          </Link>
        </div>
      </div>
    </div>
  );
}