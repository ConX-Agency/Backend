import { PickType } from '@nestjs/swagger';
import { UsersData } from './users.data';

export class UsersInput extends PickType(
    UsersData,
    [
        'full_name',
        'preferred_name',
        'contact_number',
        'email_address',
        'username',
        'password'
    ] as const
) { }
