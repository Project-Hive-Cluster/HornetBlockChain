/*
  Warnings:

  - You are about to drop the column `signatue` on the `HiveSchema` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[signature]` on the table `HiveSchema` will be added. If there are existing duplicate values, this will fail.
  - The required column `signature` was added to the `HiveSchema` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "HiveSchema_signatue_key";

-- AlterTable
ALTER TABLE "HiveSchema" DROP COLUMN "signatue",
ADD COLUMN     "signature" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "HiveSchema_signature_key" ON "HiveSchema"("signature");
