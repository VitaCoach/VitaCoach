-- DropForeignKey
ALTER TABLE "counsel" DROP CONSTRAINT "counsel_client_fkey";

-- DropForeignKey
ALTER TABLE "counsel" DROP CONSTRAINT "counsel_counselor_fkey";

-- AddForeignKey
ALTER TABLE "counsel" ADD CONSTRAINT "counsel_client_fkey" FOREIGN KEY ("client") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "counsel" ADD CONSTRAINT "counsel_counselor_fkey" FOREIGN KEY ("counselor") REFERENCES "expert"("id") ON DELETE CASCADE ON UPDATE CASCADE;
