/*
  Warnings:

  - You are about to drop the column `additional_contact_number` on the `Clients` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Clients` table. All the data in the column will be lost.
  - Added the required column `alt_contact_number` to the `Clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cuisine_type` to the `Clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `person_in_charge_email` to the `Clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Clients` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CLIENT_STATUS" AS ENUM ('Active', 'Pending_Approval', 'Blacklisted', 'Cancelled');

-- AlterTable
ALTER TABLE "Clients" DROP COLUMN "additional_contact_number",
DROP COLUMN "category",
ADD COLUMN     "alt_contact_number" TEXT NOT NULL,
ADD COLUMN     "cuisine_type" TEXT NOT NULL,
ADD COLUMN     "person_in_charge_email" TEXT NOT NULL,
ADD COLUMN     "status" "CLIENT_STATUS" NOT NULL,
ADD COLUMN     "tnc_consent" BOOLEAN NOT NULL DEFAULT false;
