/*
  Warnings:

  - You are about to drop the column `joinedAt` on the `student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "student" DROP COLUMN "joinedAt",
ADD COLUMN     "joindedAt" TIMESTAMP(3);
