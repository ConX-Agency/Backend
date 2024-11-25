import { Influencer, Accounts } from '@prisma/client';

export class InfluencersData {
    public static readonly MAX_LENGTH = 500;
    public readonly influencer_id: number;
    public readonly full_name: string;
    public readonly preferred_name: string;
    public readonly contact_number: string;
    public readonly email_address: string;
    public readonly additional_contact_number: string;
    public readonly home_address: string | null;
    public readonly country: string;
    public readonly city: string | null;
    public readonly state: string;
    public readonly postcode: string | null;
    public readonly diet_preference: string | null;
    public readonly accounts_id: number[];

    public constructor(entity: Influencer) {
        this.influencer_id = entity.influencer_id;
        this.full_name = entity.full_name;
        this.preferred_name = entity.preferred_name;
        this.contact_number = entity.contact_number;
        this.email_address = entity.email_address;
        this.additional_contact_number = entity.additional_contact_number;
        this.home_address = entity.home_address ?? null;
        this.country = entity.country;
        this.city = entity.city ?? null;
        this.state = entity.state;
        this.postcode = entity.postcode ?? null;
        this.diet_preference = entity.diet_preference ?? null;
        this.accounts_id = entity.accounts_id;
    }
}

export class AccountsData {
    public static readonly MAX_LENGTH = 500;
    public readonly account_id: number;
    public readonly platform_id: number;
    public readonly social_media_url: string;
    public readonly media_country: string;
    public readonly followers: string;
    public readonly industry: string;
    public readonly active_status: string;

    public constructor(entity: Accounts) {
        this.account_id = entity.account_id;
        this.platform_id = entity.platform_id;
        this.social_media_url = entity.social_media_url;
        this.media_country = entity.media_country;
        this.followers = entity.followers;
        this.industry = entity.industry;
        this.active_status = entity.active_status;
    }
}
