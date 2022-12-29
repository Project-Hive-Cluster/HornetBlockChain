/*
  Warnings:

  - You are about to drop the column `signature` on the `HiveSchema` table. All the data in the column will be lost.
  - You are about to drop the column `UserSchemakey` on the `UserSchema` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[signatue]` on the table `HiveSchema` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[walletid]` on the table `UserSchema` will be added. If there are existing duplicate values, this will fail.
  - The required column `signatue` was added to the `HiveSchema` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `walletid` to the `UserSchema` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HiveSchema" DROP CONSTRAINT "HiveSchema_walletid_fkey";

-- DropIndex
DROP INDEX "HiveSchema_signature_key";

-- DropIndex
DROP INDEX "UserSchema_UserSchemakey_key";

-- AlterTable
ALTER TABLE "HiveSchema" DROP COLUMN "signature",
ADD COLUMN     "signatue" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserSchema" DROP COLUMN "UserSchemakey",
ADD COLUMN     "walletid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "HiveSchema_signatue_key" ON "HiveSchema"("signatue");

-- CreateIndex
CREATE UNIQUE INDEX "UserSchema_walletid_key" ON "UserSchema"("walletid");

-- AddForeignKey
ALTER TABLE "HiveSchema" ADD CONSTRAINT "HiveSchema_walletid_fkey" FOREIGN KEY ("walletid") REFERENCES "UserSchema"("walletid") ON DELETE RESTRICT ON UPDATE CASCADE;
