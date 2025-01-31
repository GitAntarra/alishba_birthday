-- CreateEnum
CREATE TYPE "Attend" AS ENUM ('nothing', 'attend', 'ignore');

-- AlterTable
ALTER TABLE "Guests" ADD COLUMN     "attend" "Attend" NOT NULL DEFAULT 'nothing';
