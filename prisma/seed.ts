// ==========================================
// SEED — Génération initiale de la base de données
// 120 clubs × 12 joueurs = 1440 joueurs au total
// ==========================================

import { PrismaClient } from "@prisma/client";
import { generateAllClubs, generateTeamRoster } from "../lib/data/generators";

const prisma = new PrismaClient();

async function main() {
  console.log("🏈 Démarrage du seed Flag Football Manager...");

  // --- Étape 1 : Nettoyer les données existantes ---
  console.log("🧹 Nettoyage des données existantes...");
  await prisma.careerStat.deleteMany();
  await prisma.playerClubHistory.deleteMany();
  await prisma.playerSkill.deleteMany();
  await prisma.playerEquipment.deleteMany();
  await prisma.personalSponsor.deleteMany();
  await prisma.player.deleteMany();
  await prisma.staffMember.deleteMany();
  await prisma.infrastructure.deleteMany();
  await prisma.clubSponsor.deleteMany();
  await prisma.trophy.deleteMany();
  await prisma.retiredJersey.deleteMany();
  await prisma.clubSeasonHistory.deleteMany();
  await prisma.standing.deleteMany();
  await prisma.match.deleteMany();
  await prisma.club.deleteMany();
  console.log("✅ Données nettoyées");

  // --- Étape 2 : Générer les 120 clubs ---
  console.log("🏟️  Génération des 120 clubs...");
  const allClubs = generateAllClubs();

  let totalPlayers = 0;
  let clubCount = 0;

  for (const clubData of allClubs) {
    const players = generateTeamRoster();

    await prisma.club.create({
      data: {
        name: clubData.name,
        country: clubData.country,
        region: clubData.region,
        conference: clubData.conference,
        division: clubData.division,
        gold: 10000,
        notoriety: 10,
        reputation: 50,
        maxRosterSize: 20,
        maxSponsors: 1,
        isPlayerControlled: false,
        players: {
          create: players.map((p) => {
            const traits: string[] = [];
            if (p.trait1) traits.push(p.trait1);
            if (p.trait2) traits.push(p.trait2);

            return {
              firstName: p.firstName,
              lastName: p.lastName,
              age: p.age,
              country: p.country,
              region: p.region,
              primaryPosition: p.primaryPosition,
              speed: p.speed,
              agility: p.agility,
              strength: p.strength,
              intelligence: p.intelligence,
              endurance: p.endurance,
              throwing: p.throwing,
              catching: p.catching,
              mental: p.mental,
              level: 1,
              xp: 0,
              xpToNextLevel: 150,
              skillSlots: 1,
              hasPremiumSlot: false,
              fatigue: 0,
              morale: 70,
              injuryType: "NONE",
              injuryWeeksLeft: 0,
              traits: traits,
              contractWeeksLeft: 52,
              weeklySalary: p.weeklySalary,
              isInMatchSquad: false,
              isStarter: false,
              careerStats: {
                create: {
                  matchesPlayed: 0,
                  wins: 0,
                  losses: 0,
                  touchdowns: 0,
                  passingTDs: 0,
                  yardsRushing: 0,
                  yardsReceiving: 0,
                  interceptionsMade: 0,
                  interceptionsSuffered: 0,
                  flagPulls: 0,
                  completionAttempts: 0,
                  completionSuccesses: 0,
                },
              },
            };
          }),
        },
        infrastructure: {
          create: [
            { type: "STADIUM", level: 1, upgradeCost: 5000 },
            { type: "TRAINING_CENTER", level: 1, upgradeCost: 3000 },
            { type: "FORMATION_CENTER", level: 1, upgradeCost: 4000 },
            { type: "MEDICAL_CENTER", level: 1, upgradeCost: 3500 },
            { type: "RECRUITMENT_OFFICE", level: 1, upgradeCost: 2500 },
          ],
        },
      },
    });

    clubCount++;
    totalPlayers += players.length;

    if (clubCount % 10 === 0) {
      console.log(`   ✓ ${clubCount}/120 clubs créés (${totalPlayers} joueurs)`);
    }
  }

  console.log(`✅ ${clubCount} clubs créés avec ${totalPlayers} joueurs au total`);

  // --- Étape 3 : Récap par pays et division ---
  const stats = await prisma.club.groupBy({
    by: ["country", "division"],
    _count: true,
  });

  console.log("\n📊 Récapitulatif :");
  stats.forEach((s) => {
    const countryLabel: Record<string, string> = {
      FR: "🇫🇷 France",
      US: "🇺🇸 USA",
      JP: "🇯🇵 Japon",
    };
    const label = countryLabel[s.country] || s.country;
    console.log(`   ${label} ${s.division} : ${s._count} clubs`);
  });

  console.log("\n🎉 Seed terminé avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur durant le seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });