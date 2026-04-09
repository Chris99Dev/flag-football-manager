import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Vérifier l'authentification
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    // Récupérer le clubId depuis le body
    const body = await request.json();
    const { clubId } = body;

    if (!clubId || typeof clubId !== "string") {
      return NextResponse.json(
        { error: "clubId manquant ou invalide" },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur a déjà un GameProfile
    const existingProfile = await prisma.gameProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (existingProfile) {
      return NextResponse.json(
        { error: "Vous avez déjà un profil de jeu" },
        { status: 400 }
      );
    }

    // Vérifier que le club existe et n'est pas déjà pris
    const club = await prisma.club.findUnique({
      where: { id: clubId },
    });

    if (!club) {
      return NextResponse.json(
        { error: "Club introuvable" },
        { status: 404 }
      );
    }

    if (club.isPlayerControlled) {
      return NextResponse.json(
        { error: "Ce club est déjà pris par un autre joueur" },
        { status: 400 }
      );
    }

    // Date de départ du jeu
    const startDate = {
      year: 1,
      month: 1,
      week: 1,
      day: 1,
    };

    // Étape 1 : Créer le GameProfile
    const profile = await prisma.gameProfile.create({
      data: {
        userId: session.user.id,
        clubId: club.id,
        gold: 10000,
        gems: 0,
        currentDate: startDate,
        seasonPhase: "PRE_SEASON",
      },
    });

    // Étape 2 : Marquer le club comme contrôlé par le joueur
    await prisma.club.update({
      where: { id: club.id },
      data: { isPlayerControlled: true },
    });

    // Étape 3 : Créer le premier message du journal
    await prisma.newsEntry.create({
      data: {
        gameProfileId: profile.id,
        gameDate: startDate,
        title: `Bienvenue à ${club.name} !`,
        content: `Le président vous accueille officiellement comme nouveau Head Coach de ${club.name}. Une enveloppe de 10 000 Gold vous est confiée pour démarrer votre aventure. Bonne chance, Coach !`,
        type: "WELCOME",
      },
    });

    return NextResponse.json({
      success: true,
      clubId: club.id,
      clubName: club.name,
    });
  } catch (error) {
    console.error("Erreur lors de la création du GameProfile :", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur serveur lors de la création du profil",
      },
      { status: 500 }
    );
  }
}