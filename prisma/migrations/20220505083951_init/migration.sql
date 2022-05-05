/*
  Warnings:

  - You are about to drop the `_clubInfoTostudent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_clubInfoTostudent" DROP CONSTRAINT "_clubInfoTostudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_clubInfoTostudent" DROP CONSTRAINT "_clubInfoTostudent_B_fkey";

-- AlterTable
ALTER TABLE "student" ADD COLUMN     "clubs" TEXT[];

-- DropTable
DROP TABLE "_clubInfoTostudent";
