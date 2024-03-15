/*
  Warnings:

  - Made the column `ownerAge` on table `Owner` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contact` on table `Owner` required. This step will fail if there are existing NULL values in that column.
  - Made the column `petAge` on table `Pet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Owner" ALTER COLUMN "ownerAge" SET NOT NULL,
ALTER COLUMN "ownerAge" SET DATA TYPE TEXT,
ALTER COLUMN "contact" SET NOT NULL,
ALTER COLUMN "contact" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Pet" ALTER COLUMN "petAge" SET NOT NULL,
ALTER COLUMN "petAge" SET DATA TYPE TEXT;
