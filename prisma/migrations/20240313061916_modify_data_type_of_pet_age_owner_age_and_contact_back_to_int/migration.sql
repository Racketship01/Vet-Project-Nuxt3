/*
  Warnings:

  - A unique constraint covering the columns `[clinicId,id]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[petId,id]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[categoryId,id]` on the table `Pet` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `ownerAge` on the `Owner` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `contact` on the `Owner` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `petAge` on the `Pet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Owner" DROP COLUMN "ownerAge",
ADD COLUMN     "ownerAge" INTEGER NOT NULL,
DROP COLUMN "contact",
ADD COLUMN     "contact" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "petAge",
ADD COLUMN     "petAge" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_clinicId_id_key" ON "Category"("clinicId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_petId_id_key" ON "Owner"("petId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Pet_categoryId_id_key" ON "Pet"("categoryId", "id");
