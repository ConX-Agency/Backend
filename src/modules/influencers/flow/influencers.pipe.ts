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
            home_address: Joi.string().max(InfluencersData.MAX_LENGTH),
            country: Joi.string().required().max(InfluencersData.MAX_LENGTH),
            city: Joi.string().max(InfluencersData.MAX_LENGTH),
            state: Joi.string().required().max(InfluencersData.MAX_LENGTH),
            postcode: Joi.string().max(InfluencersData.MAX_LENGTH),
            diet_preference: Joi.string().max(InfluencersData.MAX_LENGTH),
            accounts: Joi.string()
        });
    }
}

export class AccountsPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object<CreateAccountDto>({
            platform_id: Joi.number().required(),
            social_media_url: Joi.string().required().max(AccountsData.MAX_LENGTH),
            media_country: Joi.string().required().max(AccountsData.MAX_LENGTH),
            followers: Joi.string().required().max(AccountsData.MAX_LENGTH),
            industry: Joi.string().required().max(AccountsData.MAX_LENGTH),
            active_status: Joi.string().required().max(AccountsData.MAX_LENGTH)
        });
    }
}
