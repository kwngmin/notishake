/*
  Warnings:

  - A unique constraint covering the columns `[naver_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_naver_id_key" ON "User"("naver_id");
