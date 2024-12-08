/*
  Warnings:

  - You are about to drop the column `accounts_id` on the `Influencer` table. All the data in the column will be lost.
  - Added the required column `influencer_id` to the `Accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Accounts" DROP CONSTRAINT "Accounts_platform_id_fkey";

-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_client_id_fkey";

-- DropForeignKey
ALTER TABLE "Clients_Location" DROP CONSTRAINT "Clients_Location_client_id_fkey";

-- DropForeignKey
ALTER TABLE "Influencers_Campaign" DROP CONSTRAINT "Influencers_Campaign_campaign_id_fkey";

-- DropForeignKey
ALTER TABLE "Influencers_Campaign" DROP CONSTRAINT "Influencers_Campaign_influencer_id_fkey";

-- DropForeignKey
ALTER TABLE "Offers_Card" DROP CONSTRAINT "Offers_Card_campaign_id_fkey";

-- AlterTable
ALTER TABLE "Accounts" ADD COLUMN     "influencer_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Influencer" DROP COLUMN "accounts_id";

-- AddForeignKey
ALTER TABLE "Clients_Location" ADD CONSTRAINT "Clients_Location_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Clients"("client_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "Platform"("platform_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_influencer_id_fkey" FOREIGN KEY ("influencer_id") REFERENCES "Influencer"("influencer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Clients"("client_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Influencers_Campaign" ADD CONSTRAINT "Influencers_Campaign_influencer_id_fkey" FOREIGN KEY ("influencer_id") REFERENCES "Influencer"("influencer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Influencers_Campaign" ADD CONSTRAINT "Influencers_Campaign_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "Campaign"("campaign_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offers_Card" ADD CONSTRAINT "Offers_Card_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "Campaign"("campaign_id") ON DELETE CASCADE ON UPDATE CASCADE;
