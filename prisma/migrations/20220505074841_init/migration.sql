/*
  Warnings:

  - You are about to drop the column `joindedAt` on the `student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "student" DROP COLUMN "joindedAt",
ADD COLUMN     "joinedAt" TIMESTAMP(3);
