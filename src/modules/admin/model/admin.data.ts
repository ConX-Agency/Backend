import { Admin } from '@prisma/client';

export class AdminData {
    public static readonly MAX_LENGTH = 500;
    public readonly admin_id: number;
    public readonly full_name: string;
    public readonly preferred_name: string;
    public readonly email_address: string;

    public constructor(entity: Admin) {
        this.admin_id = entity.admin_id;
        this.full_name = entity.full_name;
        this.preferred_name = entity.preferred_name;
        this.email_address = entity.email_address;
    }
}
