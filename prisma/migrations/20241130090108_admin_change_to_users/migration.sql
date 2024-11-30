/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Admin";

-- CreateTable
CREATE TABLE "Users" (
    "user_id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "preferred_name" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_address_key" ON "Users"("email_address");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
