/*
  Warnings:

  - You are about to drop the column `clubs` on the `student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "student" DROP COLUMN "clubs";

-- CreateTable
CREATE TABLE "joinedClub" (
    "id" TEXT NOT NULL,
    "paymentType" TEXT NOT NULL,
    "expireDateOnCash" TIMESTAMP(3),
    "club" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "joinedClub_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "joinedClub" ADD CONSTRAINT "joinedClub_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
