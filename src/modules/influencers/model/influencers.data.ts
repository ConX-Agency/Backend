import { Influencer, Accounts } from '@prisma/client';

export class InfluencersData {
    public static readonly MAX_LENGTH = 500;
    public readonly influencer_id: number;
    public readonly full_name: string;
    public readonly preferred_name: string;
    public readonly contact_number: string;
    public readonly email_address: string;
    public readonly additional_contact_number: string;
    public readonly country: string;
    public readonly city: string;
    public readonly state: string;
    public readonly postcode: string;
    public readonly multiple_countries: boolean | null;
    public readonly additional_country: string | null;
    public readonly industry: string;
    public readonly consent_whatsapp_group: boolean;
    public readonly whatsapp_invited: boolean;
    public readonly community: boolean;
    public readonly invite_count: number;

    public constructor(entity: Influencer) {
        this.influencer_id = entity.influencer_id;
        this.full_name = entity.full_name;
        this.preferred_name = entity.preferred_name;
        this.contact_number = entity.contact_number;
        this.email_address = entity.email_address;
        this.additional_contact_number = entity.additional_contact_number;
        this.country = entity.country;
        this.city = entity.city;
        this.state = entity.state;
        this.postcode = entity.postcode;
        this.multiple_countries = entity.multiple_countries ?? null;
        this.additional_country = entity.additional_country ?? null;
        this.industry = entity.industry;
        this.consent_whatsapp_group = entity.consent_whatsapp_group;
        this.whatsapp_invited = entity.whatsapp_invited;
        this.community = entity.community;
        this.invite_count = entity.invite_count;
    }
}

export class AccountsData {
    public static readonly MAX_LENGTH = 500;
    public readonly account_id: number;
    public readonly platform_id: number;
    public readonly social_media_url: string;
    public readonly followers: string;
    public readonly account_type: string;
    public readonly influencer_id: number;

    public constructor(entity: Accounts) {
        this.account_id = entity.account_id;
        this.platform_id = entity.platform_id;
        this.social_media_url = entity.social_media_url;
        this.followers = entity.followers;
        this.account_type = entity.account_type;
        this.influencer_id = entity.influencer_id;
    }
}
