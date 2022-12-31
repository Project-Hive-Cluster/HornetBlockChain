/*
  Warnings:

  - You are about to drop the column `wallets` on the `UserSchema` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[wallet]` on the table `UserSchema` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `wallet` to the `UserSchema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSchema" DROP COLUMN "wallets",
ADD COLUMN     "otp" INTEGER,
ADD COLUMN     "wallet" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserSchema_wallet_key" ON "UserSchema"("wallet");
