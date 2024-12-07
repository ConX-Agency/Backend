import { PickType } from '@nestjs/swagger';
import { ClientsData, ClientsLocationData } from './clients.data';

export class ClientsInput extends PickType(
    ClientsData,
    [
        'company_name',
        'person_in_charge_name',
        'company_email',
        'contact_number',
        'additional_contact_number',
        'industry',
        'category'
    ] as const
) { }

export class ClientsLocationInput extends PickType(
    ClientsLocationData,
    [
        'client_id',
        'country',
        'city',
        'state',
        'postcode',
        'address'
    ] as const
) { }
