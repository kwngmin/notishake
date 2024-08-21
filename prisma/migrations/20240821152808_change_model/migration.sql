/*
  Warnings:

  - You are about to drop the column `githubId` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `google_id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `kakaotalk_id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

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
    "kakaotalk_id" INTEGER,
    "google_id" INTEGER,
    "naver_id" TEXT,
    "avatarUrl" TEXT
);
INSERT INTO "new_User" ("avatarUrl", "createdAt", "email", "google_id", "id", "kakaotalk_id", "naver_id", "password", "phone", "updatedAt", "username") SELECT "avatarUrl", "createdAt", "email", "google_id", "id", "kakaotalk_id", "naver_id", "password", "phone", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
CREATE UNIQUE INDEX "User_github_id_key" ON "User"("github_id");
CREATE UNIQUE INDEX "User_kakaotalk_id_key" ON "User"("kakaotalk_id");
CREATE UNIQUE INDEX "User_google_id_key" ON "User"("google_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
