import { PickType } from '@nestjs/swagger';
import { ClientsData } from './clients.data';

export class ClientsInput extends PickType(
    ClientsData,
    [
        'company_name',
        'person_in_charge_name',
        'company_email',
        'pic_email',
        'contact_number',
        'additional_contact_number',
        'industry',
        'category',
        'package',
    ] as const
) { }
