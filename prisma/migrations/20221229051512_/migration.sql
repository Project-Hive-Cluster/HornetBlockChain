/*
  Warnings:

  - You are about to drop the column `wallets` on the `AuthStatusSchema` table. All the data in the column will be lost.
  - You are about to drop the column `wallet` on the `UserSchema` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[walletid]` on the table `AuthStatusSchema` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[walletid]` on the table `UserSchema` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `walletid` to the `AuthStatusSchema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletid` to the `UserSchema` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HiveSchema" DROP CONSTRAINT "HiveSchema_walletid_fkey";

-- DropIndex
DROP INDEX "AuthStatusSchema_wallets_key";

-- DropIndex
DROP INDEX "UserSchema_wallet_key";

-- AlterTable
ALTER TABLE "AuthStatusSchema" DROP COLUMN "wallets",
ADD COLUMN     "walletid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserSchema" DROP COLUMN "wallet",
ADD COLUMN     "walletid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AuthStatusSchema_walletid_key" ON "AuthStatusSchema"("walletid");

-- CreateIndex
CREATE UNIQUE INDEX "UserSchema_walletid_key" ON "UserSchema"("walletid");

-- AddForeignKey
ALTER TABLE "HiveSchema" ADD CONSTRAINT "HiveSchema_walletid_fkey" FOREIGN KEY ("walletid") REFERENCES "UserSchema"("walletid") ON DELETE RESTRICT ON UPDATE CASCADE;
