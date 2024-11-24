-- CreateTable
CREATE TABLE "Clients" (
    "client_id" SERIAL NOT NULL,
    "company_name" TEXT NOT NULL,
    "person_in_charge_name" TEXT NOT NULL,
    "company_email" TEXT,
    "pic_email" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "additional_contact_number" TEXT,
    "industry" TEXT,
    "category" TEXT,
    "package" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT NOT NULL,
    "postcode" TEXT,
    "address" TEXT NOT NULL,
    "is_halal" BOOLEAN NOT NULL,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("client_id")
);

-- CreateTable
CREATE TABLE "Influencer" (
    "influencer_id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "preferred_name" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "additional_contact_number" TEXT NOT NULL,
    "home_address" TEXT,
    "country" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT NOT NULL,
    "postcode" TEXT,
    "diet_preference" TEXT,
    "accounts_id" INTEGER NOT NULL,

    CONSTRAINT "Influencer_pkey" PRIMARY KEY ("influencer_id")
);

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
CREATE TABLE "Accounts" (
    "accounts_id" SERIAL NOT NULL,
    "platform_name" TEXT NOT NULL,
    "platform_type" TEXT NOT NULL,
    "social_media_url" TEXT NOT NULL,
    "media_country" TEXT NOT NULL,
    "followers" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "active_status" TEXT NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("accounts_id")
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

-- CreateIndex
CREATE UNIQUE INDEX "Clients_company_name_key" ON "Clients"("company_name");

-- CreateIndex
CREATE UNIQUE INDEX "Clients_company_email_key" ON "Clients"("company_email");

-- CreateIndex
CREATE UNIQUE INDEX "Clients_pic_email_key" ON "Clients"("pic_email");

-- CreateIndex
CREATE UNIQUE INDEX "Influencer_email_address_key" ON "Influencer"("email_address");

-- AddForeignKey
ALTER TABLE "Influencer" ADD CONSTRAINT "Influencer_accounts_id_fkey" FOREIGN KEY ("accounts_id") REFERENCES "Accounts"("accounts_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Clients"("client_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Influencers_Campaign" ADD CONSTRAINT "Influencers_Campaign_influencer_id_fkey" FOREIGN KEY ("influencer_id") REFERENCES "Influencer"("influencer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Influencers_Campaign" ADD CONSTRAINT "Influencers_Campaign_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "Campaign"("campaign_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offers_Card" ADD CONSTRAINT "Offers_Card_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "Campaign"("campaign_id") ON DELETE RESTRICT ON UPDATE CASCADE;
