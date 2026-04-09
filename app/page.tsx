import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();

  // Si déjà connecté, on redirige vers le dashboard
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center max-w-3xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 tracking-tight">
            Flag Football
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-blue-200">
            Manager
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-blue-100">
            Devenez le meilleur Head Coach. Recrutez, entraînez et menez votre
            équipe au sommet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="bg-white text-blue-900 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-lg"
            >
              Commencer l&apos;aventure
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-bold text-xl mb-2">Gérez votre équipe</h3>
              <p className="text-blue-100">
                Recrutez, entraînez et faites évoluer vos joueurs
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-bold text-xl mb-2">Tactiques au tour</h3>
              <p className="text-blue-100">
                Affrontez les meilleures équipes au tour par tour
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-bold text-xl mb-2">Coupe du Monde</h3>
              <p className="text-blue-100">
                Gravissez les ligues et remportez les titres
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}