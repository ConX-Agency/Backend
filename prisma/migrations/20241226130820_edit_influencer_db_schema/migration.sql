/*
  Warnings:

  - You are about to drop the column `account_type` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `followers` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `platform_id` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `additional_contact_number` on the `Influencer` table. All the data in the column will be lost.
  - You are about to drop the column `additional_country` on the `Influencer` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Influencer` table. All the data in the column will be lost.
  - You are about to drop the column `community` on the `Influencer` table. All the data in the column will be lost.
  - You are about to drop the column `consent_whatsapp_group` on the `Influencer` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Influencer` table. All the data in the column will be lost.
  - You are about to drop the column `industry` on the `Influencer` table. All the data in the column will be lost.
  - You are about to drop the column `multiple_countries` on the `Influencer` table. All the data in the column will be lost.
  - You are about to drop the column `postcode` on the `Influencer` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Influencer` table. All the data in the column will be lost.
  - You are about to drop the `Platform` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `audience_focus_country` to the `Accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `follower_count` to the `Accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platform_focus` to the `Accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platform_name` to the `Accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alt_contact_number` to the `Influencer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `community_invited` to the `Influencer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Influencer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tnc_consent` to the `Influencer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_follower_count` to the `Influencer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsapp_consent` to the `Influencer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Accounts" DROP CONSTRAINT "Accounts_platform_id_fkey";

-- AlterTable
ALTER TABLE "Accounts" DROP COLUMN "account_type",
DROP COLUMN "followers",
DROP COLUMN "platform_id",
ADD COLUMN     "audience_focus_country" TEXT NOT NULL,
ADD COLUMN     "follower_count" INTEGER NOT NULL,
ADD COLUMN     "platform_focus" TEXT NOT NULL,
ADD COLUMN     "platform_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Influencer" DROP COLUMN "additional_contact_number",
DROP COLUMN "additional_country",
DROP COLUMN "city",
DROP COLUMN "community",
DROP COLUMN "consent_whatsapp_group",
DROP COLUMN "country",
DROP COLUMN "industry",
DROP COLUMN "multiple_countries",
DROP COLUMN "postcode",
DROP COLUMN "state",
ADD COLUMN     "alt_contact_number" TEXT NOT NULL,
ADD COLUMN     "community_invited" BOOLEAN NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "tnc_consent" BOOLEAN NOT NULL,
ADD COLUMN     "total_follower_count" INTEGER NOT NULL,
ADD COLUMN     "whatsapp_consent" BOOLEAN NOT NULL,
ALTER COLUMN "invite_count" DROP DEFAULT,
ALTER COLUMN "whatsapp_invited" DROP DEFAULT;

-- DropTable
DROP TABLE "Platform";

-- CreateTable
CREATE TABLE "Influencer_Location" (
    "influencer_location_id" SERIAL NOT NULL,
    "influencer_id" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Influencer_Location_pkey" PRIMARY KEY ("influencer_location_id")
);

-- AddForeignKey
ALTER TABLE "Influencer_Location" ADD CONSTRAINT "Influencer_Location_influencer_id_fkey" FOREIGN KEY ("influencer_id") REFERENCES "Influencer"("influencer_id") ON DELETE CASCADE ON UPDATE CASCADE;
