-- CreateTable
CREATE TABLE "Campaign" (
    "campaign_id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "campaign_name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "max_influencers" INTEGER NOT NULL,
    "min_influencers" INTEGER NOT NULL,
    "kpi_status" TEXT NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("campaign_id")
);

-- CreateTable
CREATE TABLE "Influencers_Campaign" (
    "influencer_campaign_id" SERIAL NOT NULL,
    "campaign_id" INTEGER NOT NULL,
    "influencer_id" INTEGER NOT NULL,
    "completed_instapost" INTEGER NOT NULL,
    "completed_tiktokpost" INTEGER NOT NULL,
    "completed_googlereview" INTEGER NOT NULL,
    "completed_redpost" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "message_sent_date" TIMESTAMP(3) NOT NULL,
    "influencer_response_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Influencers_Campaign_pkey" PRIMARY KEY ("influencer_campaign_id")
);

-- CreateTable
CREATE TABLE "Offers_Card" (
    "offer_card_id" SERIAL NOT NULL,
    "campaign_id" INTEGER NOT NULL,
    "clients_location_id" INTEGER NOT NULL,
    "offer_type" TEXT NOT NULL,
    "offer_description" TEXT NOT NULL,
    "services_required" TEXT NOT NULL,
    "key_message" TEXT NOT NULL,
    "food_products_to_feature" TEXT NOT NULL,
    "max_booking_pax" INTEGER NOT NULL,

    CONSTRAINT "Offers_Card_pkey" PRIMARY KEY ("offer_card_id")
);

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Clients"("client_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Influencers_Campaign" ADD CONSTRAINT "Influencers_Campaign_influencer_id_fkey" FOREIGN KEY ("influencer_id") REFERENCES "Influencer"("influencer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Influencers_Campaign" ADD CONSTRAINT "Influencers_Campaign_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "Campaign"("campaign_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offers_Card" ADD CONSTRAINT "Offers_Card_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "Campaign"("campaign_id") ON DELETE RESTRICT ON UPDATE CASCADE;
