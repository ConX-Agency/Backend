import * as Joi from 'joi';

import { JoiValidationPipe } from '../../common';
import { ClientsData, ClientsInput } from '../model';

export class ClientsPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object<ClientsInput>({
            company_name: Joi.string().required().max(ClientsData.MAX_LENGTH),
            person_in_charge_name: Joi.string().required().max(ClientsData.MAX_LENGTH),
            company_email: Joi.string().required().max(ClientsData.MAX_LENGTH),
            pic_email: Joi.string().required().max(ClientsData.MAX_LENGTH),
            contact_number: Joi.string().required().max(ClientsData.MAX_LENGTH),
            additional_contact_number: Joi.string().required().max(ClientsData.MAX_LENGTH),
            industry: Joi.string().required().max(ClientsData.MAX_LENGTH),
            category: Joi.string().required().max(ClientsData.MAX_LENGTH),
            package: Joi.string().required().max(ClientsData.MAX_LENGTH),
        });
    }
}
