/*
  Warnings:

  - The primary key for the `dogs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `org_id` to the `dogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dogs" DROP CONSTRAINT "dogs_pkey",
ADD COLUMN     "org_id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "dogs_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "dogs_id_seq";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "responsable_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- AddForeignKey
ALTER TABLE "dogs" ADD CONSTRAINT "dogs_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
