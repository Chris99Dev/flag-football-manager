import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Flag Football Manager</h1>
          <div className="flex items-center gap-4">
            {session.user.image && (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            )}
            <div className="text-right">
              <p className="font-semibold">{session.user.name}</p>
              <p className="text-sm text-blue-200">{session.user.email}</p>
            </div>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Bienvenue, {session.user.name} !
          </h2>
          <p className="text-gray-600 mb-6">
            Authentification réussie. Tu es connecté avec ton compte Google.
          </p>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-green-800 font-semibold">
              ✓ NextAuth fonctionne correctement
            </p>
            <p className="text-green-700 text-sm mt-1">
              Prochaine étape : créer ton club et choisir ton pays
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-2">User ID</h3>
              <p className="text-sm text-gray-600 font-mono break-all">
                {session.user.id}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-2">Email</h3>
              <p className="text-sm text-gray-600">{session.user.email}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}