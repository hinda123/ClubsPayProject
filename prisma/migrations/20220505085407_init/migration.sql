/*
  Warnings:

  - You are about to drop the column `club` on the `joinedClub` table. All the data in the column will be lost.
  - Added the required column `clubId` to the `joinedClub` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "joinedClub" DROP COLUMN "club",
ADD COLUMN     "clubId" TEXT NOT NULL;
