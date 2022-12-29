/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `UserSchema` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `loginStatukey` to the `UserSchema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSchema" ADD COLUMN     "loginStatukey" TEXT NOT NULL,
ADD COLUMN     "plane_passwd" TEXT;

-- CreateTable
CREATE TABLE "AuthStatusSchema" (
    "reg_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "key" TEXT NOT NULL,
    "wallets" TEXT NOT NULL,
    "token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthStatusSchema_key_key" ON "AuthStatusSchema"("key");

-- CreateIndex
CREATE UNIQUE INDEX "AuthStatusSchema_wallets_key" ON "AuthStatusSchema"("wallets");

-- CreateIndex
CREATE UNIQUE INDEX "UserSchema_email_key" ON "UserSchema"("email");

-- AddForeignKey
ALTER TABLE "UserSchema" ADD CONSTRAINT "UserSchema_loginStatukey_fkey" FOREIGN KEY ("loginStatukey") REFERENCES "AuthStatusSchema"("key") ON DELETE RESTRICT ON UPDATE CASCADE;
