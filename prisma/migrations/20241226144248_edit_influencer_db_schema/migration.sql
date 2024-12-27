/*
  Warnings:

  - You are about to drop the column `total_follower_count` on the `Influencer` table. All the data in the column will be lost.
  - Added the required column `industry` to the `Influencer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Influencer" DROP COLUMN "total_follower_count",
ADD COLUMN     "additional_country" TEXT DEFAULT '',
ADD COLUMN     "industry" TEXT NOT NULL,
ADD COLUMN     "multiple_countries" BOOLEAN DEFAULT false;
