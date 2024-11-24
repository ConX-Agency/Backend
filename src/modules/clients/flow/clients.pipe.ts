import * as Joi from 'joi';

import { JoiValidationPipe } from '../../common';
import { ClientsData } from '../model';
import { CreateClientDto } from '../model/clients.dto';

export class ClientsPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object<CreateClientDto>({
            company_name: Joi.string().required().max(ClientsData.MAX_LENGTH),
            person_in_charge_name: Joi.string().required().max(ClientsData.MAX_LENGTH),
            company_email: Joi.string().max(ClientsData.MAX_LENGTH),
            pic_email: Joi.string().required().max(ClientsData.MAX_LENGTH),
            contact_number: Joi.string().required().max(ClientsData.MAX_LENGTH),
            additional_contact_number: Joi.string().max(ClientsData.MAX_LENGTH),
            industry: Joi.string().max(ClientsData.MAX_LENGTH),
            category: Joi.string().max(ClientsData.MAX_LENGTH),
            package: Joi.string().required().max(ClientsData.MAX_LENGTH),
            country: Joi.string().required().max(ClientsData.MAX_LENGTH),
            city: Joi.string().max(ClientsData.MAX_LENGTH),
            state: Joi.string().required().max(ClientsData.MAX_LENGTH),
            postcode: Joi.string().max(ClientsData.MAX_LENGTH),
            address: Joi.string().max(ClientsData.MAX_LENGTH),
            is_halal: Joi.boolean().required(),
        });
    }
}
