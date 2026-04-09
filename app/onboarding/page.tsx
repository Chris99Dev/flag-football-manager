import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function OnboardingIntroPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Vérifier si l'utilisateur a déjà un GameProfile
  const existingProfile = await prisma.gameProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (existingProfile) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-900 text-white p-6 text-center">
          <p className="text-blue-200 text-sm uppercase tracking-wider mb-2">
            Étape 1 sur 4
          </p>
          <h1 className="text-3xl font-bold">Bienvenue, Coach</h1>
        </div>

        {/* Contenu narratif */}
        <div className="p-8 md:p-12">
          <div className="flex items-start gap-6 mb-8">
            <div className="flex-shrink-0 w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl">
              👔
            </div>
            <div className="flex-1">
              <p className="font-bold text-blue-900 text-lg">
                Le Président
              </p>
              <p className="text-gray-500 text-sm">
                Propriétaire du club
              </p>
            </div>
          </div>

          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              <span className="text-blue-900 font-semibold">
                « Bonjour Coach, je vous attendais.
              </span>
            </p>
            <p>
              Notre club a besoin de quelqu&apos;un comme vous. Quelqu&apos;un avec
              de la vision, de la stratégie et le sens du leadership. Le Flag
              Football est un sport exigeant, mais aussi le plus passionnant qui
              soit.
            </p>
            <p>
              Je vous confie une enveloppe de{" "}
              <span className="font-bold text-yellow-600">10 000 Gold</span>{" "}
              pour démarrer votre aventure. Ce sera à vous de constituer votre
              équipe, de l&apos;entraîner, de la mener vers la victoire et,
              j&apos;espère, vers les sommets.
            </p>
            <p>
              Vous serez aussi mes yeux sur le terrain : je vous fixerai des
              objectifs chaque saison. Atteignez-les et le club grandira avec
              vous. Échouez plusieurs fois de suite, et nous devrons avoir une
              conversation difficile.
            </p>
            <p>
              Mais avant tout, dites-moi :{" "}
              <span className="font-bold text-blue-900">
                où voulez-vous écrire votre légende ?
              </span>
              {" »"}
            </p>
          </div>

          <div className="mt-10 flex justify-end">
            <Link
              href="/onboarding/country"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transition-all"
            >
              Continuer →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}