/*
  Warnings:

  - Added the required column `publicKey` to the `UserSchema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSchema" ADD COLUMN     "publicKey" TEXT NOT NULL;
