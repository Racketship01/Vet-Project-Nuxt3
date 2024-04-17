/*
  Warnings:

  - You are about to drop the `UploadImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `uploadURL` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UploadImage" DROP CONSTRAINT "UploadImage_petId_fkey";

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "uploadURL" TEXT NOT NULL;

-- DropTable
DROP TABLE "UploadImage";
