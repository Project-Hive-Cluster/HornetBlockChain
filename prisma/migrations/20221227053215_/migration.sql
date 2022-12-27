/*
  Warnings:

  - You are about to drop the column `timestamp` on the `UserSchema` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `VertixSchema` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSchema" DROP COLUMN "timestamp";

-- AlterTable
ALTER TABLE "VertixSchema" DROP COLUMN "timestamp";
