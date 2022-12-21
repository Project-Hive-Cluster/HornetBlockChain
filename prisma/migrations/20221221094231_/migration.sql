/*
  Warnings:

  - You are about to drop the column `uuid` on the `HiveSchema` table. All the data in the column will be lost.
  - The primary key for the `UserSchema` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserSchema` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[signatue]` on the table `HiveSchema` will be added. If there are existing duplicate values, this will fail.
  - Made the column `signatue` on table `HiveSchema` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "HiveSchema_uuid_key";

-- AlterTable
ALTER TABLE "HiveSchema" DROP COLUMN "uuid",
ALTER COLUMN "signatue" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserSchema" DROP CONSTRAINT "UserSchema_pkey",
DROP COLUMN "id",
ADD COLUMN     "wallets" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "HiveSchema_signatue_key" ON "HiveSchema"("signatue");
