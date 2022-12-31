/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `UserSchema` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserSchema" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UserSchema_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSchema_id_key" ON "UserSchema"("id");
