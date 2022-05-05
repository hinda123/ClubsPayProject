/*
  Warnings:

  - A unique constraint covering the columns `[clubId]` on the table `joinedClub` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "joinedClub_clubId_key" ON "joinedClub"("clubId");
