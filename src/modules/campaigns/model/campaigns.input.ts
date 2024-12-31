import { PickType } from '@nestjs/swagger';
import { CampaignData, InfluencersCampaignData } from './campaigns.data';

export class CampaignsInput extends PickType(
    CampaignData,
    [
        'client_id',
        'campaign_name',
        'food_offering',
        'campaign_address',
        'package',
        'feedback',
        'max_pax',
        'booking_availability',
        'availability_public_holiday',
        'start_date',
        'end_date',
        'is_halal',
        'slots',
        'slot_status',
        'is_result',
        'campaign_status'
    ] as const
) { }

export class InfluencersCampaignInput extends PickType(
    InfluencersCampaignData,
    [
        'campaign_id',
        'influencer_id',
        'campaign_name',
        'full_name',
        'booking_datetime',
        'pax_no',
        'type',
        'social_media_handler',
        'is_due',
        'social_media_post',
        'review_posted',
        'is_completed',
        'influencer_response_date'
    ] as const
) { }
