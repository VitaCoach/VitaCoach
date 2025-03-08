/*
  Warnings:

  - You are about to drop the `Counsel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Expert` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Function` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productFunction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Counsel" DROP CONSTRAINT "Counsel_client_fkey";

-- DropForeignKey
ALTER TABLE "Counsel" DROP CONSTRAINT "Counsel_counselor_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_buyer_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_pay_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_product_id_fkey";

-- DropForeignKey
ALTER TABLE "productFunction" DROP CONSTRAINT "productFunction_function_id_fkey";

-- DropForeignKey
ALTER TABLE "productFunction" DROP CONSTRAINT "productFunction_product_id_fkey";

-- DropTable
DROP TABLE "Counsel";

-- DropTable
DROP TABLE "Expert";

-- DropTable
DROP TABLE "Function";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderItem";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "productFunction";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birth" TIMESTAMP(3) NOT NULL,
    "subscription" "Subscription" NOT NULL DEFAULT 'FREE',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expert" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ExpertType" NOT NULL,
    "rate" INTEGER NOT NULL,
    "intro" TEXT NOT NULL,

    CONSTRAINT "expert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "counsel" (
    "id" SERIAL NOT NULL,
    "counselor" INTEGER NOT NULL,
    "client" TEXT NOT NULL,
    "reservation_date" TIMESTAMP(3) NOT NULL,
    "reservation_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "counsel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "maxLimit" INTEGER NOT NULL,
    "minLimit" INTEGER NOT NULL,
    "scale" TEXT NOT NULL,
    "type" "ProductType" NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productCategory" (
    "category_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "productCategory_pkey" PRIMARY KEY ("category_id","product_id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "buyer" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "total_price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderItem" (
    "pay_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "orderItem_pkey" PRIMARY KEY ("pay_id","product_id")
);

-- AddForeignKey
ALTER TABLE "counsel" ADD CONSTRAINT "counsel_client_fkey" FOREIGN KEY ("client") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "counsel" ADD CONSTRAINT "counsel_counselor_fkey" FOREIGN KEY ("counselor") REFERENCES "expert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productCategory" ADD CONSTRAINT "productCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productCategory" ADD CONSTRAINT "productCategory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_buyer_fkey" FOREIGN KEY ("buyer") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_pay_id_fkey" FOREIGN KEY ("pay_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
