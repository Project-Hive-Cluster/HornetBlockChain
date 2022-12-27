/*
  Warnings:

  - You are about to drop the column `datetime` on the `VertixSchema` table. All the data in the column will be lost.
  - Added the required column `timedata` to the `VertixSchema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VertixSchema" DROP COLUMN "datetime",
ADD COLUMN     "timedata" TEXT NOT NULL;
