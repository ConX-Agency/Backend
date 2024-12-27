import { PickType } from '@nestjs/swagger';
import { AccountsData, InfluencersData } from './influencers.data';

export class InfluencersInput extends PickType(
    InfluencersData,
    [
        'full_name',
        'preferred_name',
        'contact_number',
        'email_address',
        'alt_contact_number',
        'country',
        'city',
        'state',
        'postcode',
        'address',
        'multiple_countries',
        'additional_country',
        'whatsapp_consent',
        'whatsapp_invited',
        'community_invited',
        'industry',
        'invite_count',
        'tnc_consent',
        'status'
    ] as const
) { }

export class AccountsInput extends PickType(
    AccountsData,
    [
        'social_media_url',
        'follower_count',
        'platform_name',
        'platform_focus',
        'influencer_id',
        'audience_focus_country'
    ] as const
) { }
