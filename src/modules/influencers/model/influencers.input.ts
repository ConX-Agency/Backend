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
        'home_address',
        'country',
        'city',
        'state',
        'postcode',
        'diet_preference',
        'accounts_id'
    ] as const
) { }

export class AccountsInput extends PickType(
    AccountsData,
    [
        'platform_id',
        'social_media_url',
        'media_country',
        'followers',
        'industry',
        'active_status'
    ] as const
) { }
