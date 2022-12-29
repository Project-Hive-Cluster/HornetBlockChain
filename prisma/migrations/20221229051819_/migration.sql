/*
  Warnings:

  - You are about to drop the column `walletid` on the `AuthStatusSchema` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[wallets]` on the table `AuthStatusSchema` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `UserSchema` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `wallets` to the `AuthStatusSchema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userSchemaKey` to the `HiveSchema` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HiveSchema" DROP CONSTRAINT "HiveSchema_walletid_fkey";

-- DropIndex
DROP INDEX "AuthStatusSchema_walletid_key";

-- AlterTable
ALTER TABLE "AuthStatusSchema" DROP COLUMN "walletid",
ADD COLUMN     "wallets" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HiveSchema" ADD COLUMN     "userSchemaKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AuthStatusSchema_wallets_key" ON "AuthStatusSchema"("wallets");

-- CreateIndex
CREATE UNIQUE INDEX "UserSchema_key_key" ON "UserSchema"("key");

-- AddForeignKey
ALTER TABLE "HiveSchema" ADD CONSTRAINT "HiveSchema_userSchemaKey_fkey" FOREIGN KEY ("userSchemaKey") REFERENCES "UserSchema"("key") ON DELETE RESTRICT ON UPDATE CASCADE;
