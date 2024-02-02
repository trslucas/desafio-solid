/*
  Warnings:

  - You are about to drop the `Dog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Dog";

-- CreateTable
CREATE TABLE "dogs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "energy" TEXT NOT NULL,
    "independence" TEXT NOT NULL,
    "environment" TEXT NOT NULL,

    CONSTRAINT "dogs_pkey" PRIMARY KEY ("id")
);
