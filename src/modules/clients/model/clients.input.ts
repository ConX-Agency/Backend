import { PickType } from '@nestjs/swagger';
import { ClientsData, ClientsLocationData } from './clients.data';

export class ClientsInput extends PickType(
    ClientsData,
    [
        'company_name',
        'person_in_charge_name',
        'person_in_charge_email',
        'company_email',
        'contact_number',
        'alt_contact_number',
        'industry',
        'cuisine_type',
        'tnc_consent',
        'status'
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
