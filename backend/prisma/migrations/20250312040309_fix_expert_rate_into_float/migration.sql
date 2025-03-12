/*
  Warnings:

  - Added the required column `categoryId` to the `expert` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expert" ADD COLUMN     "categoryId" INTEGER NOT NULL,
ALTER COLUMN "rate" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "expert" ADD CONSTRAINT "expert_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
