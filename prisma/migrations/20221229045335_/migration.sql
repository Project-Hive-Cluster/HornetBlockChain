/*
  Warnings:

  - You are about to drop the column `loginStatukey` on the `UserSchema` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserSchema" DROP CONSTRAINT "UserSchema_loginStatukey_fkey";

-- AlterTable
ALTER TABLE "UserSchema" DROP COLUMN "loginStatukey";
