import { Campaign, Influencers_Campaign } from '@prisma/client';

export class CampaignData {
    public static readonly MAX_LENGTH = 500;
    public readonly campaign_id: number;
    public readonly client_id: number;
    public readonly campaign_name: string;
    public readonly food_offering: string;
    public readonly campaign_address: string;
    public readonly package: string;
    public readonly feedback: string;
    public readonly max_pax: number;
    public readonly booking_availability: string;
    public readonly availability_public_holiday: string;
    public readonly start_date: Date;
    public readonly end_date: Date;
    public readonly is_halal: boolean;
    public readonly slots: number;
    public readonly slot_status: string;
    public readonly is_result: boolean;
    public readonly campaign_status: string;

    public constructor(entity: Campaign) {
        this.campaign_id = entity.campaign_id;
        this.client_id = entity.client_id;
        this.campaign_name = entity.campaign_name;
        this.food_offering = entity.food_offering;
        this.campaign_address = entity.campaign_address;
        this.package = entity.package;
        this.feedback = entity.feedback;
        this.max_pax = entity.max_pax;
        this.booking_availability = entity.booking_availability;
        this.availability_public_holiday = entity.availability_public_holiday;
        this.start_date = entity.start_date;
        this.end_date = entity.end_date;
        this.is_halal = entity.is_halal;
        this.slots = entity.slots;
        this.slot_status = entity.slot_status;
        this.is_result = entity.is_result;
        this.campaign_status = entity.campaign_status;
    }
}

export class InfluencersCampaignData {
    public static readonly MAX_LENGTH = 500;
    public readonly influencer_campaign_id: number;
    public readonly campaign_id: number;
    public readonly influencer_id: number;
    public readonly campaign_name: string;
    public readonly full_name: string;
    public readonly booking_datetime: Date;
    public readonly pax_no: number;
    public readonly type: string;
    public readonly social_media_handler: string;
    public readonly is_due: boolean;
    public readonly social_media_post: string;
    public readonly review_posted: boolean;
    public readonly is_completed: boolean;
    public readonly influencer_response_date: Date;

    public constructor(entity: Influencers_Campaign) {
        this.influencer_campaign_id = entity.influencer_campaign_id;
        this.campaign_id = entity.campaign_id;
        this.influencer_id = entity.influencer_id;
        this.campaign_name = entity.campaign_name;
        this.full_name = entity.full_name;
        this.booking_datetime = entity.booking_datetime;
        this.pax_no = entity.pax_no;
        this.type = entity.type;
        this.social_media_handler = entity.social_media_handler;
        this.is_due = entity.is_due;
        this.social_media_post = entity.social_media_post;
        this.review_posted = entity.review_posted;
        this.is_completed = entity.is_completed;
        this.influencer_response_date = entity.influencer_response_date;
    }
}
