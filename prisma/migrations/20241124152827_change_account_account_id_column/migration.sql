/*
  Warnings:

  - The primary key for the `Accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accounts_id` on the `Accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Accounts" DROP CONSTRAINT "Accounts_pkey",
DROP COLUMN "accounts_id",
ADD COLUMN     "account_id" SERIAL NOT NULL,
ADD CONSTRAINT "Accounts_pkey" PRIMARY KEY ("account_id");
