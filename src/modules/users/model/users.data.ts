import { Users } from '@prisma/client';

export class UsersData {
    public static readonly MAX_LENGTH = 500;
    public readonly user_id: number;
    public readonly full_name: string;
    public readonly preferred_name: string;
    public readonly contact_number: string;
    public readonly email_address: string;
    public readonly username: string;
    public readonly password: string;
    public readonly type: string;

    public constructor(entity: Users) {
        this.user_id = entity.user_id;
        this.full_name = entity.full_name;
        this.preferred_name = entity.preferred_name;
        this.contact_number = entity.contact_number;
        this.email_address = entity.email_address;
        this.username = entity.username;
        this.password = entity.password;
        this.type = entity.type;
    }
}
