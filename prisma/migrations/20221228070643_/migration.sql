/*
  Warnings:

  - You are about to drop the column `amount` on the `VertixSchema` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VertixSchema" DROP COLUMN "amount",
ADD COLUMN     "credit" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "debit" DOUBLE PRECISION NOT NULL DEFAULT 0;
