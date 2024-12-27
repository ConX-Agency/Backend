-- AlterTable
ALTER TABLE "Accounts" ALTER COLUMN "audience_focus_country" SET DEFAULT '',
ALTER COLUMN "follower_count" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Influencer" ALTER COLUMN "invite_count" SET DEFAULT 0,
ALTER COLUMN "tnc_consent" SET DEFAULT false;
