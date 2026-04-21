import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ClubHeader } from "@/components/dashboard/ClubHeader";
import { QuickNav } from "@/components/dashboard/QuickNav";
import { RosterPreview } from "@/components/dashboard/RosterPreview";
import { NewsFeed } from "@/components/dashboard/NewsFeed";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Récupérer le GameProfile avec le club, les joueurs et les news
  const gameProfile = await prisma.gameProfile.findUnique({
    where: { userId: session.user.id },
    include: {
      club: {
        include: {
          players: {
            orderBy: [
              { primaryPosition: "asc" },
              { level: "desc" },
            ],
          },
        },
      },
      news: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  // Si pas de GameProfile → onboarding
  if (!gameProfile || !gameProfile.club) {
    redirect("/onboarding");
  }

  const club = gameProfile.club;
  const currentDate = gameProfile.currentDate as {
    year: number;
    month: number;
    week: number;
    day: number;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header du club */}
      <ClubHeader
        clubName={club.name}
        country={club.country}
        division={club.division}
        conference={club.conference}
        region={club.region}
        gold={gameProfile.gold}
        notoriety={club.notoriety}
        reputation={club.reputation}
        currentDate={currentDate}
        seasonPhase={gameProfile.seasonPhase}
        userName={session.user.name || "Coach"}
        userImage={session.user.image || null}
      />

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne gauche : Navigation + News */}
          <div className="lg:col-span-1 space-y-6">
            <QuickNav />
            <NewsFeed news={gameProfile.news} />
          </div>

          {/* Colonne droite : Roster */}
          <div className="lg:col-span-2">
            <RosterPreview players={club.players} />
          </div>
        </div>
      </main>
    </div>
  );
}
