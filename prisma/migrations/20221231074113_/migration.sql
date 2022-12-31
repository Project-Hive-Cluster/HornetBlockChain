-- CreateTable
CREATE TABLE "ProductSchema" (
    "name" TEXT,
    "bank" TEXT NOT NULL,
    "product" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductSchema_pkey" PRIMARY KEY ("product")
);

-- CreateTable
CREATE TABLE "HiveSchema" (
    "id" SERIAL NOT NULL,
    "walletid" TEXT NOT NULL,
    "walletkey" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL DEFAULT 'Null',
    "ref" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "body" TEXT,
    "signatue" TEXT NOT NULL,
    "userSchemaKey" TEXT NOT NULL,
    "updateat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HiveSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSchema" (
    "reg_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "key" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT DEFAULT 'No Last Name',
    "email" TEXT NOT NULL,
    "contact" TEXT,
    "password" TEXT NOT NULL,
    "plane_passwd" TEXT,
    "role" TEXT NOT NULL DEFAULT 'ROOT',
    "status" TEXT NOT NULL,
    "wallets" TEXT
);

-- CreateTable
CREATE TABLE "VertixSchema" (
    "walletid" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "transaction_no" TEXT NOT NULL,
    "transaction_count" INTEGER NOT NULL,
    "timestamp" TEXT NOT NULL DEFAULT 'Null',
    "ref" TEXT NOT NULL,
    "edge_in" TEXT,
    "edge_out" TEXT,
    "hash" TEXT NOT NULL,
    "debit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "credit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "body" TEXT
);

-- CreateTable
CREATE TABLE "AuthStatusSchema" (
    "reg_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "key" TEXT NOT NULL,
    "wallets" TEXT NOT NULL,
    "token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "HiveSchema_id_key" ON "HiveSchema"("id");

-- CreateIndex
CREATE UNIQUE INDEX "HiveSchema_walletid_key" ON "HiveSchema"("walletid");

-- CreateIndex
CREATE UNIQUE INDEX "HiveSchema_signatue_key" ON "HiveSchema"("signatue");

-- CreateIndex
CREATE UNIQUE INDEX "UserSchema_key_key" ON "UserSchema"("key");

-- CreateIndex
CREATE UNIQUE INDEX "UserSchema_email_key" ON "UserSchema"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VertixSchema_transaction_id_key" ON "VertixSchema"("transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "AuthStatusSchema_key_key" ON "AuthStatusSchema"("key");

-- CreateIndex
CREATE UNIQUE INDEX "AuthStatusSchema_wallets_key" ON "AuthStatusSchema"("wallets");

-- AddForeignKey
ALTER TABLE "HiveSchema" ADD CONSTRAINT "HiveSchema_userSchemaKey_fkey" FOREIGN KEY ("userSchemaKey") REFERENCES "UserSchema"("key") ON DELETE RESTRICT ON UPDATE CASCADE;
