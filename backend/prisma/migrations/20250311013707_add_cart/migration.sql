/*
  Warnings:

  - A unique constraint covering the columns `[cartId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "cartId" TEXT;

-- CreateTable
CREATE TABLE "cart" (
    "id" SERIAL NOT NULL,
    "owner" TEXT NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cartItem" (
    "cartId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "cartItem_pkey" PRIMARY KEY ("cartId","productId")
);

-- CreateIndex
CREATE UNIQUE INDEX "cart_owner_key" ON "cart"("owner");

-- CreateIndex
CREATE UNIQUE INDEX "user_cartId_key" ON "user"("cartId");

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_owner_fkey" FOREIGN KEY ("owner") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cartItem" ADD CONSTRAINT "cartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cartItem" ADD CONSTRAINT "cartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
