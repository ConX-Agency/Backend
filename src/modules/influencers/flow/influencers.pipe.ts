import Joi from 'joi';

import { JoiValidationPipe } from '../../common';
import { InfluencersData, AccountsData } from '../model';
import { CreateAccountDto, CreateInfluencerDto } from '../model/influencers.dto';

export class InfluencersPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object<CreateInfluencerDto>({
            full_name: Joi.string().required().max(InfluencersData.MAX_LENGTH),
            preferred_name: Joi.string().required().max(InfluencersData.MAX_LENGTH),
            contact_number: Joi.string().required().max(InfluencersData.MAX_LENGTH),
            email_address: Joi.string().required().max(InfluencersData.MAX_LENGTH),
            alt_contact_number: Joi.string().required().max(InfluencersData.MAX_LENGTH),
            country: Joi.string().required().max(InfluencersData.MAX_LENGTH),
            city: Joi.string().required().max(InfluencersData.MAX_LENGTH),
            state: Joi.string().required().max(InfluencersData.MAX_LENGTH),
            postcode: Joi.string().required().max(InfluencersData.MAX_LENGTH),
            address: Joi.string().required().max(InfluencersData.MAX_LENGTH),
            multiple_countries: Joi.boolean(),
            additional_country: Joi.string().max(InfluencersData.MAX_LENGTH),
            whatsapp_consent: Joi.boolean().required(),
            whatsapp_invited: Joi.boolean().required(),
            community_invited: Joi.boolean().required(),
            industry: Joi.string().required().max(InfluencersData.MAX_LENGTH),
            invite_count: Joi.number().required().max(InfluencersData.MAX_LENGTH),
            tnc_consent: Joi.boolean().required(),
            status: Joi.string().required().max(InfluencersData.MAX_LENGTH),
            accounts: Joi.string()
        });
    }
}

export class AccountsPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object<CreateAccountDto>({
            social_media_url: Joi.string().required().max(AccountsData.MAX_LENGTH),
            follower_count: Joi.string().required().max(AccountsData.MAX_LENGTH),
            platform_name: Joi.string().required().max(AccountsData.MAX_LENGTH),
            platform_focus: Joi.string().required().max(AccountsData.MAX_LENGTH),
            influencer_id: Joi.number().required(),
        });
    }
}
