-- AddForeignKey
ALTER TABLE "HiveSchema" ADD CONSTRAINT "HiveSchema_userSchemaKey_fkey" FOREIGN KEY ("userSchemaKey") REFERENCES "UserSchema"("key") ON DELETE RESTRICT ON UPDATE CASCADE;
