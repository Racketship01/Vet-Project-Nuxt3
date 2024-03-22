/*
  Warnings:

  - Changed the type of `age` on the `AnnualVax` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `weight` on the `AnnualVax` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `age` on the `MedicalHx` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `weight` on the `MedicalHx` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `age` on the `PrimaryVax` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `weight` on the `PrimaryVax` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "AnnualVax" DROP COLUMN "age",
ADD COLUMN     "age" INTEGER NOT NULL,
DROP COLUMN "weight",
ADD COLUMN     "weight" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MedicalHx" DROP COLUMN "age",
ADD COLUMN     "age" INTEGER NOT NULL,
DROP COLUMN "weight",
ADD COLUMN     "weight" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PrimaryVax" DROP COLUMN "age",
ADD COLUMN     "age" INTEGER NOT NULL,
DROP COLUMN "weight",
ADD COLUMN     "weight" INTEGER NOT NULL;
