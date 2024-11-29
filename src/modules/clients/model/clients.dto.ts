import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsEmail, IsBoolean, IsNumber } from 'class-validator';

export class GetClientDto {
    @ApiProperty({ description: 'Client ID', example: '1' })
    @IsNumber()
    client_id: number;

    @ApiProperty({ description: 'Client Company Name', example: 'TraverseX Sdn Bhd' })
    @IsString()
    company_name: string;

    @ApiProperty({ description: 'Person in Charge Name', example: 'John' })
    @IsString()
    person_in_charge_name: string;

    @ApiProperty({ description: 'Company Email', example: 'traverseX@mail.com' })
    @IsEmail()
    company_email: string | null;

    @ApiProperty({ description: 'Person In Charge Email', example: 'john@traversex@mail.com' })
    @IsString()
    pic_email: string;

    @ApiProperty({ description: 'Contact Number', example: '+60112312312' })
    @IsString()
    contact_number: string;

    @ApiProperty({ description: 'Additional Contact Number', example: '+6011111111' })
    @IsString()
    additional_contact_number: string | null;

    @ApiProperty({ description: 'Industry', example: 'Food & Beverages' })
    @IsString()
    industry: string | null;

    @ApiProperty({ description: 'Category', example: 'Strategic' })
    @IsString()
    category: string | null;

    @ApiProperty({ description: 'Package', example: 'Gold ($188)' })
    @IsString()
    package: string;

    @ApiProperty({ description: 'Country', example: 'Malaysia' })
    @IsString()
    country: string;

    @ApiProperty({ description: 'City', example: 'Kuala Lumpur' })
    @IsString()
    city: string | null;

    @ApiProperty({ description: 'State', example: 'Selangor' })
    @IsString()
    state: string;

    @ApiProperty({ description: 'Postcode', example: '51000' })
    @IsString()
    postcode: string | null;

    @ApiProperty({ description: 'Address', example: '[Company address]' })
    @IsString()
    address: string;

    @ApiProperty({ description: 'Is Halal', example: true })
    @IsBoolean()
    is_halal: boolean;
}

export class CreateClientDto {
    @ApiProperty({ description: 'Client Company Name', example: 'TraverseX Sdn Bhd' })
    @IsString()
    company_name: string;

    @ApiProperty({ description: 'Person in Charge Name', example: 'John' })
    @IsString()
    person_in_charge_name: string;

    @ApiProperty({ description: 'Company Email', example: 'traverseX@mail.com', required: false })
    @IsOptional()
    @IsEmail()
    company_email: string | null;

    @ApiProperty({ description: 'Person In Charge Email', example: 'john@traversex@mail.com' })
    @IsString()
    pic_email: string;

    @ApiProperty({ description: 'Contact Number', example: '+60112312312' })
    @IsString()
    contact_number: string;

    @ApiProperty({ description: 'Additional Contact Number', example: '+6011111111' })
    @IsOptional()
    @IsString()
    additional_contact_number: string | null;

    @ApiProperty({ description: 'Industry', example: 'Food & Beverages', required: false })
    @IsOptional()
    @IsString()
    industry: string | null;

    @ApiProperty({ description: 'Category', example: 'Strategic', required: false })
    @IsOptional()
    @IsString()
    category: string | null;

    @ApiProperty({ description: 'Package', example: 'Gold ($188)' })
    @IsString()
    package: string;

    @ApiProperty({ description: 'Country', example: 'Malaysia' })
    @IsString()
    country: string;

    @ApiProperty({ description: 'City', example: 'Kuala Lumpur', required: false })
    @IsOptional()
    @IsString()
    city: string | null;

    @ApiProperty({ description: 'State', example: 'Selangor' })
    @IsString()
    state: string;

    @ApiProperty({ description: 'Postcode', example: '51000', required: false })
    @IsOptional()
    @IsString()
    postcode: string | null;

    @ApiProperty({ description: 'Address', example: '[Company address]' })
    @IsString()
    address: string;

    @ApiProperty({ description: 'Is Halal', example: true })
    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    is_halal: boolean;
}

export class UpdateClientDto {
    @ApiProperty({ description: 'Client Company Name', example: 'TraverseX Sdn Bhd', required: false })
    @IsOptional()
    @IsString()
    company_name?: string;

    @ApiProperty({ description: 'Person in Charge Name', example: 'John', required: false })
    @IsOptional()
    @IsString()
    person_in_charge_name?: string;

    @ApiProperty({ description: 'Company Email', example: 'traverseX@mail.com', required: false })
    @IsOptional()
    @IsEmail()
    company_email?: string;

    @ApiProperty({ description: 'Person In Charge Email', example: 'john@traversex@mail.com', required: false })
    @IsOptional()
    @IsString()
    pic_email?: string;

    @ApiProperty({ description: 'Contact Number', example: '+60112312312', required: false })
    @IsOptional()
    @IsString()
    contact_number?: string;

    @ApiProperty({ description: 'Additional Contact Number', example: '+6011111111', required: false })
    @IsOptional()
    @IsString()
    additional_contact_number?: string;

    @ApiProperty({ description: 'Industry', example: 'Food & Beverages', required: false })
    @IsOptional()
    @IsString()
    industry?: string;

    @ApiProperty({ description: 'Category', example: 'Strategic', required: false })
    @IsOptional()
    @IsString()
    category?: string;

    @ApiProperty({ description: 'Package', example: 'Gold ($188)', required: false })
    @IsOptional()
    @IsString()
    package?: string;

    @ApiProperty({ description: 'Country', example: 'Malaysia', required: false })
    @IsOptional()
    @IsString()
    country?: string;

    @ApiProperty({ description: 'City', example: 'Kuala Lumpur', required: false })
    @IsOptional()
    @IsString()
    city?: string;

    @ApiProperty({ description: 'State', example: 'Selangor', required: false })
    @IsOptional()
    @IsString()
    state?: string;

    @ApiProperty({ description: 'Postcode', example: '51000', required: false })
    @IsOptional()
    @IsString()
    postcode?: string;

    @ApiProperty({ description: 'Address', example: '[Company address]', required: false })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({ description: 'Is Halal', example: true, required: false })
    @IsOptional()
    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    is_halal?: boolean;
}