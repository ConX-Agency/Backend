/*
  Warnings:

  - You are about to drop the column `kpi_status` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `max_influencers` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `min_influencers` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `completed_googlereview` on the `Influencers_Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `completed_instapost` on the `Influencers_Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `completed_redpost` on the `Influencers_Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `completed_tiktokpost` on the `Influencers_Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `message_sent_date` on the `Influencers_Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Influencers_Campaign` table. All the data in the column will be lost.
  - You are about to drop the `Offers_Card` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `availability_public_holiday` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `booking_availability` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `campaign_address` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `campaign_status` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feedback` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `food_offering` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_halal` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_result` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mx_pax` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `package` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slot_status` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slots` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `booking_datetime` to the `Influencers_Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `campaign_name` to the `Influencers_Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `Influencers_Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_completed` to the `Influencers_Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_due` to the `Influencers_Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pax_no` to the `Influencers_Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review_posted` to the `Influencers_Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `social_media_handler` to the `Influencers_Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `social_media_post` to the `Influencers_Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Influencers_Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Offers_Card" DROP CONSTRAINT "Offers_Card_campaign_id_fkey";

-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "kpi_status",
DROP COLUMN "max_influencers",
DROP COLUMN "min_influencers",
DROP COLUMN "status",
ADD COLUMN     "availability_public_holiday" TEXT NOT NULL,
ADD COLUMN     "booking_availability" TEXT NOT NULL,
ADD COLUMN     "campaign_address" TEXT NOT NULL,
ADD COLUMN     "campaign_status" TEXT NOT NULL,
ADD COLUMN     "feedback" TEXT NOT NULL,
ADD COLUMN     "food_offering" TEXT NOT NULL,
ADD COLUMN     "is_halal" BOOLEAN NOT NULL,
ADD COLUMN     "is_result" BOOLEAN NOT NULL,
ADD COLUMN     "mx_pax" INTEGER NOT NULL,
ADD COLUMN     "package" TEXT NOT NULL,
ADD COLUMN     "slot_status" TEXT NOT NULL,
ADD COLUMN     "slots" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Influencers_Campaign" DROP COLUMN "completed_googlereview",
DROP COLUMN "completed_instapost",
DROP COLUMN "completed_redpost",
DROP COLUMN "completed_tiktokpost",
DROP COLUMN "message_sent_date",
DROP COLUMN "status",
ADD COLUMN     "booking_datetime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "campaign_name" TEXT NOT NULL,
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "is_completed" BOOLEAN NOT NULL,
ADD COLUMN     "is_due" BOOLEAN NOT NULL,
ADD COLUMN     "pax_no" INTEGER NOT NULL,
ADD COLUMN     "review_posted" BOOLEAN NOT NULL,
ADD COLUMN     "social_media_handler" TEXT NOT NULL,
ADD COLUMN     "social_media_post" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "Offers_Card";
