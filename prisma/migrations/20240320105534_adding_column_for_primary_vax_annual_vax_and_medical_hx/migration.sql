-- DropIndex
DROP INDEX "Category_clinicId_id_key";

-- DropIndex
DROP INDEX "Owner_petId_id_key";

-- DropIndex
DROP INDEX "Pet_categoryId_id_key";

-- CreateTable
CREATE TABLE "PrimaryVax" (
    "id" SERIAL NOT NULL,
    "age" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "followUp" TEXT NOT NULL,
    "veterinarian" TEXT NOT NULL,
    "remarks" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "PrimaryVax_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnnualVax" (
    "id" SERIAL NOT NULL,
    "age" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "followUp" TEXT NOT NULL,
    "veterinarian" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "AnnualVax_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalHx" (
    "id" SERIAL NOT NULL,
    "age" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "followUp" TEXT NOT NULL,
    "veterinarian" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "MedicalHx_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PrimaryVax_petId_id_key" ON "PrimaryVax"("petId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "AnnualVax_petId_id_key" ON "AnnualVax"("petId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalHx_petId_id_key" ON "MedicalHx"("petId", "id");

-- AddForeignKey
ALTER TABLE "PrimaryVax" ADD CONSTRAINT "PrimaryVax_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnualVax" ADD CONSTRAINT "AnnualVax_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalHx" ADD CONSTRAINT "MedicalHx_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
