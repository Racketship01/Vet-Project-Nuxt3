/*
  Warnings:

  - A unique constraint covering the columns `[clinicId,slugCategory]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[petId,id]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[categoryId,slugPet]` on the table `Pet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Category_clinicId_slugCategory_key" ON "Category"("clinicId", "slugCategory");

-- CreateIndex
CREATE UNIQUE INDEX "Owner_petId_id_key" ON "Owner"("petId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Pet_categoryId_slugPet_key" ON "Pet"("categoryId", "slugPet");
