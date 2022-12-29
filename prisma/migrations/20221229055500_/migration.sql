/*
  Warnings:

  - You are about to drop the column `walletid` on the `UserSchema` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[UserSchemakey]` on the table `UserSchema` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `UserSchemakey` to the `UserSchema` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HiveSchema" DROP CONSTRAINT "HiveSchema_walletid_fkey";

-- DropIndex
DROP INDEX "UserSchema_walletid_key";

-- AlterTable
ALTER TABLE "UserSchema" DROP COLUMN "walletid",
ADD COLUMN     "UserSchemakey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserSchema_UserSchemakey_key" ON "UserSchema"("UserSchemakey");

-- AddForeignKey
ALTER TABLE "HiveSchema" ADD CONSTRAINT "HiveSchema_walletid_fkey" FOREIGN KEY ("walletid") REFERENCES "UserSchema"("UserSchemakey") ON DELETE RESTRICT ON UPDATE CASCADE;
