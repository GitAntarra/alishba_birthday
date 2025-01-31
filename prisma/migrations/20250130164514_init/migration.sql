-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "guestId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
