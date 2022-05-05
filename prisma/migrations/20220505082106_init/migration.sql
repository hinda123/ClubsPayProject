/*
  Warnings:

  - You are about to drop the column `clubId` on the `student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_clubId_fkey";

-- AlterTable
ALTER TABLE "student" DROP COLUMN "clubId";

-- CreateTable
CREATE TABLE "_clubInfoTostudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_clubInfoTostudent_AB_unique" ON "_clubInfoTostudent"("A", "B");

-- CreateIndex
CREATE INDEX "_clubInfoTostudent_B_index" ON "_clubInfoTostudent"("B");

-- AddForeignKey
ALTER TABLE "_clubInfoTostudent" ADD FOREIGN KEY ("A") REFERENCES "clubInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_clubInfoTostudent" ADD FOREIGN KEY ("B") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
