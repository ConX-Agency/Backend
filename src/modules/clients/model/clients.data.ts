import { ApiProperty } from '@nestjs/swagger';
import { Clients } from '@prisma/client';

export class ClientsData {
    public static readonly MAX_LENGTH = 100;

    @ApiProperty({ description: 'Client ID', example: '36635263' })
    public readonly client_id: number;

    @ApiProperty({ description: 'Client Company Name', example: 'TraverseX Sdn Bhd' })
    public readonly company_name: string;

    @ApiProperty({ description: 'Person in Charge Name', example: 'John' })
    public readonly person_in_charge_name: string;

    @ApiProperty({ description: 'Company Email', example: 'traverseX@mail.com' })
    public readonly company_email: string;

    @ApiProperty({ description: 'Person In Charge Email', example: 'john@traversex@mail.com' })
    public readonly pic_email: string;

    @ApiProperty({ description: 'Contact Number', example: '+60112312312' })
    public readonly contact_number: string;

    @ApiProperty({ description: 'Additional Contact Number', example: '+6011111111' })
    public readonly additional_contact_number: string;

    @ApiProperty({ description: 'Industry', example: 'Food & Beverages' })
    public readonly industry: string;

    @ApiProperty({ description: 'Category', example: 'Strategic' })
    public readonly category: string;

    @ApiProperty({ description: 'Package', example: 'Set' })
    public readonly package: string;

    public constructor(entity: Clients) {
        this.client_id = entity.client_id;
        this.company_name = entity.company_name;
        this.person_in_charge_name = entity.person_in_charge_name;
        this.company_email = entity.company_email;
        this.pic_email = entity.pic_email;
        this.contact_number = entity.contact_number;
        this.additional_contact_number = entity.additional_contact_number;
        this.industry = entity.industry;
        this.category = entity.category;
        this.package = entity.package;
    }

}
