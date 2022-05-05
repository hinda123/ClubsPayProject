import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const { events, clubInfo, mainClub, student, joinedClub, ...prisma } =
  new PrismaClient();

export { events, clubInfo, mainClub, student, joinedClub, prisma };
