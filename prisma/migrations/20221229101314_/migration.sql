/*
  Warnings:

  - You are about to drop the column `loginStatukey` on the `UserSchema` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserSchema" DROP CONSTRAINT "UserSchema_loginStatukey_fkey";

-- DropIndex
DROP INDEX "HiveSchema_signatue_key";

-- AlterTable
ALTER TABLE "UserSchema" DROP COLUMN "loginStatukey",
ALTER COLUMN "UserSchemakey" DROP NOT NULL;
