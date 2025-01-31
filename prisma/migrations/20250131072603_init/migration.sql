-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('girl', 'boy');

-- AlterTable
ALTER TABLE "Guests" ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'girl';
