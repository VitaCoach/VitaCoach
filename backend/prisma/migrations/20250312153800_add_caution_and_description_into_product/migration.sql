/*
  Warnings:

  - Added the required column `caution` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "caution" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;
