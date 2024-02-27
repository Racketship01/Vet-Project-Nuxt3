/*
  Warnings:

  - You are about to drop the column `petID` on the `Category` table. All the data in the column will be lost.
  - Added the required column `petID` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "petID";

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "petID" TEXT NOT NULL;
