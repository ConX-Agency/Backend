import * as Joi from 'joi';

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
            additional_contact_number: Joi.string().required().max(InfluencersData.MAX_LENGTH),
            country: Joi.string().required().max(InfluencersData.MAX_LENGTH),
            city: Joi.string().required().max(InfluencersData.MAX_LENGTH),
            state: Joi.string().required().max(InfluencersData.MAX_LENGTH),
            postcode: Joi.string().required().max(InfluencersData.MAX_LENGTH),
            multiple_countries: Joi.boolean(),
            additional_country: Joi.string().max(InfluencersData.MAX_LENGTH),
            industry: Joi.string().required().max(InfluencersData.MAX_LENGTH),
            consent_whatsapp_group: Joi.boolean().required(),
            whatsapp_invited: Joi.boolean().required(),
            community: Joi.boolean().required(),
            invite_count: Joi.number().required().max(InfluencersData.MAX_LENGTH),
            accounts: Joi.string()
        });
    }
}

export class AccountsPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object<CreateAccountDto>({
            platform_id: Joi.number().required(),
            influencer_id: Joi.number().required(),
            social_media_url: Joi.string().required().max(AccountsData.MAX_LENGTH),
            account_type: Joi.string().required().max(AccountsData.MAX_LENGTH),
            followers: Joi.string().required().max(AccountsData.MAX_LENGTH),
        });
    }
}
