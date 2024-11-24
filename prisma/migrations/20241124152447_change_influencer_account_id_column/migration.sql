/*
  Warnings:

  - The `accounts_id` column on the `Influencer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Influencer" DROP CONSTRAINT "Influencer_accounts_id_fkey";

-- AlterTable
ALTER TABLE "Influencer" DROP COLUMN "accounts_id",
ADD COLUMN     "accounts_id" INTEGER[];
