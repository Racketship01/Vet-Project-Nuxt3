-- CreateTable
CREATE TABLE "UploadImage" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "UploadImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UploadImage" ADD CONSTRAINT "UploadImage_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
