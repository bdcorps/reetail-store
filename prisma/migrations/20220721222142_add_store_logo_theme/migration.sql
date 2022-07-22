-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "accountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "announcement" TEXT,
    "subdomain" TEXT NOT NULL,
    "theme" TEXT NOT NULL DEFAULT E'basic',

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "storeId" INTEGER NOT NULL,
    "rawStripeRes" JSONB,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_accountId_key" ON "Store"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Store_subdomain_key" ON "Store"("subdomain");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
