/*
  Warnings:

  - You are about to drop the column `HiveSchemaKey` on the `UserSchema` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[walletid]` on the table `UserSchema` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `walletid` to the `UserSchema` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HiveSchema" DROP CONSTRAINT "HiveSchema_walletid_fkey";

-- DropIndex
DROP INDEX "UserSchema_HiveSchemaKey_key";

-- AlterTable
ALTER TABLE "UserSchema" DROP COLUMN "HiveSchemaKey",
ADD COLUMN     "walletid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserSchema_walletid_key" ON "UserSchema"("walletid");

-- AddForeignKey
ALTER TABLE "HiveSchema" ADD CONSTRAINT "HiveSchema_walletid_fkey" FOREIGN KEY ("walletid") REFERENCES "UserSchema"("walletid") ON DELETE RESTRICT ON UPDATE CASCADE;
