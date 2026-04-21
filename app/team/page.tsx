import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { TeamRoster } from "@/components/team/TeamRoster";

export default async function TeamPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

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
            include: {
              careerStats: true,
            },
          },
        },
      },
    },
  });

  if (!gameProfile?.club) redirect("/onboarding");

  const club = gameProfile.club;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header simplifié */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-blue-300 hover:text-white transition-colors"
            >
              ← Dashboard
            </Link>
            <h1 className="text-2xl font-bold">Mon équipe</h1>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-blue-200">
              {club.players.length}/{club.maxRosterSize} joueurs
            </span>
            <span className="bg-blue-700 px-3 py-1 rounded-lg">
              {club.name}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <TeamRoster players={club.players} />
      </main>
    </div>
  );
}
