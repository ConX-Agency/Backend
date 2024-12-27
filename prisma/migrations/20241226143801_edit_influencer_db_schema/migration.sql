/*
  Warnings:

  - You are about to drop the `Influencer_Location` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `Influencer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Influencer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Influencer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postcode` to the `Influencer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Influencer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Influencer_Location" DROP CONSTRAINT "Influencer_Location_influencer_id_fkey";

-- AlterTable
ALTER TABLE "Influencer" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "postcode" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- DropTable
DROP TABLE "Influencer_Location";
