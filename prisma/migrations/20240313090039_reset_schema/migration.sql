/*
  Warnings:

  - You are about to drop the column `petID` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `petID` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `ownerAge` on the `Owner` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `contact` on the `Owner` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `petAge` on the `Pet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "petID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Owner" DROP COLUMN "ownerAge",
ADD COLUMN     "ownerAge" INTEGER NOT NULL,
DROP COLUMN "contact",
ADD COLUMN     "contact" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "petID",
DROP COLUMN "petAge",
ADD COLUMN     "petAge" INTEGER NOT NULL;
