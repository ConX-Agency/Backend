import { PickType } from '@nestjs/swagger';
import { InfluencersData } from './influencers.data';

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
