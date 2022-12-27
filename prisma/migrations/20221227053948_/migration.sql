/*
  Warnings:

  - The `timestamp` column on the `HiveSchema` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `timedata` to the `HiveSchema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datetime` to the `VertixSchema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HiveSchema" ADD COLUMN     "timedata" TEXT NOT NULL,
DROP COLUMN "timestamp",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "VertixSchema" ADD COLUMN     "datetime" TEXT NOT NULL;
