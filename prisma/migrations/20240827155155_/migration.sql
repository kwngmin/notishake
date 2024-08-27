/*
  Warnings:

  - You are about to alter the column `kakao_id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "password" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "github_id" INTEGER,
    "kakao_id" BIGINT,
    "google_id" INTEGER,
    "naver_id" TEXT,
    "avatarUrl" TEXT
);
INSERT INTO "new_User" ("avatarUrl", "createdAt", "email", "github_id", "google_id", "id", "kakao_id", "naver_id", "password", "phone", "updatedAt", "username") SELECT "avatarUrl", "createdAt", "email", "github_id", "google_id", "id", "kakao_id", "naver_id", "password", "phone", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
CREATE UNIQUE INDEX "User_github_id_key" ON "User"("github_id");
CREATE UNIQUE INDEX "User_kakao_id_key" ON "User"("kakao_id");
CREATE UNIQUE INDEX "User_google_id_key" ON "User"("google_id");
CREATE UNIQUE INDEX "User_naver_id_key" ON "User"("naver_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
