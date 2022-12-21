/*
  Warnings:

  - Added the required column `userSchemaKey` to the `HiveSchema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HiveSchema" ADD COLUMN     "userSchemaKey" TEXT NOT NULL,
ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "HiveSchema" ADD CONSTRAINT "HiveSchema_userSchemaKey_fkey" FOREIGN KEY ("userSchemaKey") REFERENCES "UserSchema"("key") ON DELETE RESTRICT ON UPDATE CASCADE;
