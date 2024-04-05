/*
  Warnings:

  - You are about to drop the column `annualID` on the `AnnualVax` table. All the data in the column will be lost.
  - You are about to drop the column `medID` on the `MedicalHx` table. All the data in the column will be lost.
  - You are about to drop the column `primaryID` on the `PrimaryVax` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AnnualVax" DROP COLUMN "annualID";

-- AlterTable
ALTER TABLE "MedicalHx" DROP COLUMN "medID";

-- AlterTable
ALTER TABLE "PrimaryVax" DROP COLUMN "primaryID";
