import * as Joi from 'joi';

import { JoiValidationPipe } from '../../common';
import { ClientsData } from '../model';
import { CreateClientDto, CreateClientLocationDto } from '../model/clients.dto';
import { ClientsLocationData } from '../model/clients.data';

export class ClientsPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object<CreateClientDto>({
            company_name: Joi.string().required().max(ClientsData.MAX_LENGTH),
            person_in_charge_name: Joi.string().required().max(ClientsData.MAX_LENGTH),
            company_email: Joi.string().required().max(ClientsData.MAX_LENGTH),
            contact_number: Joi.string().required().max(ClientsData.MAX_LENGTH),
            additional_contact_number: Joi.string().required().max(ClientsData.MAX_LENGTH),
            industry: Joi.string().required().max(ClientsData.MAX_LENGTH),
            category: Joi.string().required().max(ClientsData.MAX_LENGTH),
            addresses: Joi.string()
        });
    }
}

export class ClientsLocationPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object<CreateClientLocationDto>({
            client_id: Joi.number().max(ClientsLocationData.MAX_LENGTH),
            country: Joi.string().required().max(ClientsData.MAX_LENGTH),
            city: Joi.string().required().max(ClientsData.MAX_LENGTH),
            state: Joi.string().required().max(ClientsData.MAX_LENGTH),
            postcode: Joi.string().required().max(ClientsData.MAX_LENGTH),
            address: Joi.string().required().max(ClientsData.MAX_LENGTH)
        });
    }
}
