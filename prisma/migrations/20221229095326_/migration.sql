/*
  Warnings:

  - You are about to drop the column `userSchemaKey` on the `HiveSchema` table. All the data in the column will be lost.
  - You are about to drop the column `wallets` on the `UserSchema` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `UserSchema` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[UserSchemakey]` on the table `UserSchema` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `UserSchemakey` to the `UserSchema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loginStatukey` to the `UserSchema` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HiveSchema" DROP CONSTRAINT "HiveSchema_userSchemaKey_fkey";

-- AlterTable
ALTER TABLE "HiveSchema" DROP COLUMN "userSchemaKey";

-- AlterTable
ALTER TABLE "UserSchema" DROP COLUMN "wallets",
ADD COLUMN     "UserSchemakey" TEXT NOT NULL,
ADD COLUMN     "loginStatukey" TEXT NOT NULL;

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

-- CreateIndex
CREATE UNIQUE INDEX "UserSchema_UserSchemakey_key" ON "UserSchema"("UserSchemakey");

-- AddForeignKey
ALTER TABLE "HiveSchema" ADD CONSTRAINT "HiveSchema_walletid_fkey" FOREIGN KEY ("walletid") REFERENCES "UserSchema"("UserSchemakey") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSchema" ADD CONSTRAINT "UserSchema_loginStatukey_fkey" FOREIGN KEY ("loginStatukey") REFERENCES "AuthStatusSchema"("key") ON DELETE RESTRICT ON UPDATE CASCADE;
