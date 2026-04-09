"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SelectClubButtonProps {
  clubId: string;
  clubName: string;
}

export function SelectClubButton({ clubId, clubName }: SelectClubButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleSelect() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/onboarding/select-club", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clubId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la sélection du club");
      }

      // Redirection vers le dashboard
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setIsLoading(false);
    }
  }

  if (showConfirm) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-gray-700 font-semibold">
          Confirmer le choix de {clubName} ?
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleSelect}
            disabled={isLoading}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-3 rounded text-sm transition-colors"
          >
            {isLoading ? "Création..." : "Oui, c'est mon club"}
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            disabled={isLoading}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-3 rounded text-sm transition-colors"
          >
            Annuler
          </button>
        </div>
        {error && (
          <p className="text-red-600 text-xs mt-2">{error}</p>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded text-sm transition-colors"
    >
      Choisir ce club
    </button>
  );
}