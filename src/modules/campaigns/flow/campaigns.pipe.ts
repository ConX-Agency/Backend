import * as Joi from 'joi';

import { JoiValidationPipe } from '../../common';
import { CampaignData, InfluencersCampaignData } from '../model';
import { CreateCampaignDto, CreateInfluencersCampaignDto } from '../model/campaigns.dto';

export class CampaignPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object<CreateCampaignDto>({
            client_id: Joi.number().required(),
            campaign_name: Joi.string().required().max(CampaignData.MAX_LENGTH),
            food_offering: Joi.string().required().max(CampaignData.MAX_LENGTH),
            campaign_address: Joi.string().required().max(CampaignData.MAX_LENGTH),
            package: Joi.string().required().max(CampaignData.MAX_LENGTH),
            feedback: Joi.string().required().max(CampaignData.MAX_LENGTH),
            max_pax: Joi.number().required(),
            booking_availability: Joi.string().required().max(CampaignData.MAX_LENGTH),
            availability_public_holiday: Joi.string().required().max(CampaignData.MAX_LENGTH),
            start_date: Joi.string().required().max(CampaignData.MAX_LENGTH),
            end_date: Joi.string().required().max(CampaignData.MAX_LENGTH),
            is_halal: Joi.boolean().required(),
            slots: Joi.number().required(),
            slot_status: Joi.string().required().max(CampaignData.MAX_LENGTH),
            is_result: Joi.boolean().required(),
            campaign_status: Joi.string().required().max(CampaignData.MAX_LENGTH),
        });
    }
}

export class InfluencerCampaignPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object<CreateInfluencersCampaignDto>({
            campaign_id: Joi.number().required(),
            influencer_id: Joi.number().required(),
            campaign_name: Joi.string().required().max(InfluencersCampaignData.MAX_LENGTH),
            full_name: Joi.string().required().max(CampaignData.MAX_LENGTH),
            booking_datetime: Joi.string().required().max(InfluencersCampaignData.MAX_LENGTH),
            pax_no: Joi.number().required(),
            type: Joi.string().required().max(InfluencersCampaignData.MAX_LENGTH),
            social_media_handler: Joi.string().required().max(InfluencersCampaignData.MAX_LENGTH),
            is_due: Joi.boolean().required(),
            social_media_post: Joi.string().required().max(InfluencersCampaignData.MAX_LENGTH),
            review_posted: Joi.boolean().required(),
            is_completed: Joi.boolean().required(),
            influencer_response_date: Joi.string().required().max(InfluencersCampaignData.MAX_LENGTH),
        });
    }
}
