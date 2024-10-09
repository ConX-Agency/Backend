-- CreateTable
CREATE TABLE "Influencer" (
    "influencer_id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "preferred_name" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "additional_contact_number" TEXT NOT NULL,
    "home_address" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "accounts_id" INTEGER NOT NULL,

    CONSTRAINT "Influencer_pkey" PRIMARY KEY ("influencer_id")
);

-- CreateTable
CREATE TABLE "Platforms" (
    "platform_id" SERIAL NOT NULL,
    "platform_name" TEXT NOT NULL,
    "platform_type" TEXT NOT NULL,

    CONSTRAINT "Platforms_pkey" PRIMARY KEY ("platform_id")
);

-- CreateTable
CREATE TABLE "Accounts" (
    "accounts_id" SERIAL NOT NULL,
    "platform_id" INTEGER NOT NULL,
    "social_media_url" TEXT NOT NULL,
    "media_country" TEXT NOT NULL,
    "follower_range" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "active_status" TEXT NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("accounts_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Influencer_email_address_key" ON "Influencer"("email_address");

-- AddForeignKey
ALTER TABLE "Influencer" ADD CONSTRAINT "Influencer_accounts_id_fkey" FOREIGN KEY ("accounts_id") REFERENCES "Accounts"("accounts_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "Platforms"("platform_id") ON DELETE RESTRICT ON UPDATE CASCADE;
