import { PickType } from '@nestjs/swagger';
import { AdminData } from './admin.data';

export class AdminInput extends PickType(
    AdminData,
    [
        'full_name',
        'preferred_name',
        'email_address'
    ] as const
) { }
