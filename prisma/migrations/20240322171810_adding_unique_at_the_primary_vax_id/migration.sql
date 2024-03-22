/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `PrimaryVax` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PrimaryVax_id_key" ON "PrimaryVax"("id");
