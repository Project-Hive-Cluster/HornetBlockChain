/*
  Warnings:

  - You are about to drop the column `timedata` on the `HiveSchema` table. All the data in the column will be lost.
  - You are about to drop the column `timedata` on the `VertixSchema` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HiveSchema" DROP COLUMN "timedata",
ADD COLUMN     "updateat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "timestamp" SET DEFAULT 'Null',
ALTER COLUMN "timestamp" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "VertixSchema" DROP COLUMN "timedata",
ADD COLUMN     "timestamp" TEXT NOT NULL DEFAULT 'Null';
