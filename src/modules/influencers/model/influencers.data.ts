import { Influencer, Accounts } from '@prisma/client';

export class InfluencersData {
    public static readonly MAX_LENGTH = 500;
    public readonly influencer_id: number;
    public readonly full_name: string;
    public readonly preferred_name: string;
    public readonly contact_number: string;
    public readonly email_address: string;
    public readonly alt_contact_number: string;
    public readonly country: string;
    public readonly city: string;
    public readonly state: string;
    public readonly postcode: string;
    public readonly address: string;
    public readonly multiple_countries: boolean;
    public readonly additional_country: string;
    public readonly whatsapp_consent: boolean;
    public readonly whatsapp_invited: boolean;
    public readonly community_invited: boolean;
    public readonly industry: string;
    public readonly invite_count: number;
    public readonly tnc_consent: boolean;
    public readonly status: string;

    public constructor(entity: Influencer) {
        this.influencer_id = entity.influencer_id;
        this.full_name = entity.full_name;
        this.preferred_name = entity.preferred_name;
        this.contact_number = entity.contact_number;
        this.email_address = entity.email_address;
        this.alt_contact_number = entity.alt_contact_number;
        this.country = entity.country;
        this.city = entity.city;
        this.state = entity.state;
        this.postcode = entity.postcode;
        this.address = entity.address;
        if (entity.multiple_countries) this.multiple_countries = entity.multiple_countries;
        if (entity.additional_country) this.additional_country = entity.additional_country;
        this.whatsapp_consent = entity.whatsapp_consent;
        this.whatsapp_invited = entity.whatsapp_invited;
        this.community_invited = entity.community_invited;
        this.industry = entity.industry;
        this.invite_count = entity.invite_count;
        this.tnc_consent = entity.tnc_consent;
        this.status = entity.status;
    }
}

export class AccountsData {
    public static readonly MAX_LENGTH = 500;
    public readonly account_id: number;
    public readonly social_media_url: string;
    public readonly follower_count: number;
    public readonly platform_name: string;
    public readonly platform_focus: string;
    public readonly audience_focus_country: string;
    public readonly influencer_id: number;

    public constructor(entity: Accounts) {
        this.account_id = entity.account_id;
        this.social_media_url = entity.social_media_url;
        this.follower_count = entity.follower_count;
        this.platform_name = entity.platform_name;
        this.platform_focus = entity.platform_focus;
        this.audience_focus_country = entity.audience_focus_country;
        this.influencer_id = entity.influencer_id;
    }
}
