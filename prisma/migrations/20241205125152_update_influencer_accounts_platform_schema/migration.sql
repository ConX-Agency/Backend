/*
  Warnings:

  - Made the column `city` on table `Influencer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postcode` on table `Influencer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Influencer" ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "postcode" SET NOT NULL;
