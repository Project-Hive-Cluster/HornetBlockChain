/*
  Warnings:

  - You are about to drop the column `userSchemaKey` on the `HiveSchema` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HiveSchema" DROP COLUMN "userSchemaKey";
