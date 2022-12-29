/*
  Warnings:

  - You are about to drop the column `UserSchemakey` on the `UserSchema` table. All the data in the column will be lost.
  - You are about to drop the column `plane_passwd` on the `UserSchema` table. All the data in the column will be lost.
  - You are about to drop the `AuthStatusSchema` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userSchemaKey` to the `HiveSchema` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HiveSchema" DROP CONSTRAINT "HiveSchema_walletid_fkey";

-- DropIndex
DROP INDEX "UserSchema_UserSchemakey_key";

-- DropIndex
DROP INDEX "UserSchema_email_key";

-- AlterTable
ALTER TABLE "HiveSchema" ADD COLUMN     "userSchemaKey" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserSchema" DROP COLUMN "UserSchemakey",
DROP COLUMN "plane_passwd",
ADD COLUMN     "wallets" TEXT;

-- DropTable
DROP TABLE "AuthStatusSchema";

-- AddForeignKey
ALTER TABLE "HiveSchema" ADD CONSTRAINT "HiveSchema_userSchemaKey_fkey" FOREIGN KEY ("userSchemaKey") REFERENCES "UserSchema"("key") ON DELETE RESTRICT ON UPDATE CASCADE;
