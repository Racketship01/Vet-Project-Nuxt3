/*
  Warnings:

  - Added the required column `annualID` to the `AnnualVax` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medID` to the `MedicalHx` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryID` to the `PrimaryVax` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnnualVax" ADD COLUMN     "annualID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MedicalHx" ADD COLUMN     "medID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PrimaryVax" ADD COLUMN     "primaryID" INTEGER NOT NULL;
