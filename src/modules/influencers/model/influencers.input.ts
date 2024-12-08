import { PickType } from '@nestjs/swagger';
import { AccountsData, InfluencersData } from './influencers.data';

export class InfluencersInput extends PickType(
    InfluencersData,
    [
        'full_name',
        'preferred_name',
        'contact_number',
        'email_address',
        'additional_contact_number',
        'country',
        'city',
        'state',
        'postcode',
        'multiple_countries',
        'additional_country',
        'industry',
        'consent_whatsapp_group',
        'whatsapp_invited',
        'community',
        'invite_count'
    ] as const
) { }

export class AccountsInput extends PickType(
    AccountsData,
    [
        'platform_id',
        'social_media_url',
        'followers',
        'account_type',
        'influencer_id'
    ] as const
) { }
