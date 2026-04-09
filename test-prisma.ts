import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log("Modèles disponibles dans Prisma :");
console.log(Object.keys(prisma).filter(k => !k.startsWith("$") && !k.startsWith("_")));

prisma.$disconnect();