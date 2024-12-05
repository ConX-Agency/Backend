/*
  Warnings:

  - You are about to drop the column `active_status` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `media_country` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `diet_preference` on the `Influencer` table. All the data in the column will be lost.
  - You are about to drop the column `home_address` on the `Influencer` table. All the data in the column will be lost.
  - You are about to drop the column `platform_type` on the `Platform` table. All the data in the column will be lost.
  - Added the required column `account_type` to the `Accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `industry` to the `Influencer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accounts" DROP COLUMN "active_status",
DROP COLUMN "media_country",
ADD COLUMN     "account_type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Influencer" DROP COLUMN "diet_preference",
DROP COLUMN "home_address",
ADD COLUMN     "additional_country" TEXT,
ADD COLUMN     "community" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "consent_whatsapp_group" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "industry" TEXT NOT NULL,
ADD COLUMN     "invite_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "multiple_countries" BOOLEAN,
ADD COLUMN     "whatsapp_invited" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Platform" DROP COLUMN "platform_type";
