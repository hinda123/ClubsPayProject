/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `student` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "student_email_studentId_key";

-- CreateIndex
CREATE UNIQUE INDEX "student_studentId_key" ON "student"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "student_email_key" ON "student"("email");
