/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `HiveSchema` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "HiveSchema" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "HiveSchema_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "HiveSchema_id_key" ON "HiveSchema"("id");
