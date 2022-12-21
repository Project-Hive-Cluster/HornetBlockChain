-- CreateTable
CREATE TABLE "UserSchema" (
    "id" SERIAL NOT NULL,
    "reg_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "key" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT DEFAULT 'No Last Name',
    "email" TEXT NOT NULL,
    "contact" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ROOT',
    "status" TEXT NOT NULL,

    CONSTRAINT "UserSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductSchema" (
    "name" TEXT,
    "bank" INTEGER NOT NULL,
    "product" SERIAL NOT NULL,
    "type" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductSchema_pkey" PRIMARY KEY ("product")
);

-- CreateTable
CREATE TABLE "HiveSchema" (
    "uuid" TEXT NOT NULL,
    "walletid" TEXT NOT NULL,
    "walletkey" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "ref" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "body" TEXT,
    "signatue" TEXT
);

-- CreateTable
CREATE TABLE "VertixSchema" (
    "walletid" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "transaction_no" TEXT NOT NULL,
    "transaction_count" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ref" TEXT NOT NULL,
    "edge_in" TEXT,
    "edge_out" TEXT,
    "hash" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "body" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSchema_key_key" ON "UserSchema"("key");

-- CreateIndex
CREATE UNIQUE INDEX "HiveSchema_uuid_key" ON "HiveSchema"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "HiveSchema_walletid_key" ON "HiveSchema"("walletid");

-- CreateIndex
CREATE UNIQUE INDEX "VertixSchema_transaction_id_key" ON "VertixSchema"("transaction_id");
