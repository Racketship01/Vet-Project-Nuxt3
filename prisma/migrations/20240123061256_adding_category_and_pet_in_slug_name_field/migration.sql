/*
  Warnings:

  - You are about to drop the column `slug` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `slugCategory` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slugPet` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "slug",
ADD COLUMN     "slugCategory" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "slug",
ADD COLUMN     "slugPet" TEXT NOT NULL;
