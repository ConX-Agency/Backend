/*
  Warnings:

  - You are about to drop the column `address` on the `Clients` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Clients` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Clients` table. All the data in the column will be lost.
  - You are about to drop the column `is_halal` on the `Clients` table. All the data in the column will be lost.
  - You are about to drop the column `package` on the `Clients` table. All the data in the column will be lost.
  - You are about to drop the column `pic_email` on the `Clients` table. All the data in the column will be lost.
  - You are about to drop the column `postcode` on the `Clients` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Clients` table. All the data in the column will be lost.
  - Made the column `company_email` on table `Clients` required. This step will fail if there are existing NULL values in that column.
  - Made the column `additional_contact_number` on table `Clients` required. This step will fail if there are existing NULL values in that column.
  - Made the column `industry` on table `Clients` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `Clients` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Clients_pic_email_key";

-- AlterTable
ALTER TABLE "Clients" DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "is_halal",
DROP COLUMN "package",
DROP COLUMN "pic_email",
DROP COLUMN "postcode",
DROP COLUMN "state",
ALTER COLUMN "company_email" SET NOT NULL,
ALTER COLUMN "additional_contact_number" SET NOT NULL,
ALTER COLUMN "industry" SET NOT NULL,
ALTER COLUMN "category" SET NOT NULL;
