import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsNumber, IsArray } from 'class-validator';

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
    company_email: string;

    @ApiProperty({ description: 'Contact Number', example: '+60112312312' })
    @IsString()
    contact_number: string;

    @ApiProperty({ description: 'Additional Contact Number', example: '+6011111111' })
    @IsString()
    additional_contact_number: string;

    @ApiProperty({ description: 'Industry', example: 'Food & Beverages' })
    @IsString()
    industry: string;

    @ApiProperty({ description: 'Category', example: 'Strategic' })
    @IsString()
    category: string;

    @ApiProperty({ description: 'Addresses', example: "[Addresses]" })
    @IsArray()
    addresses: GetClientLocationDto[];
}

export class CreateClientDto {
    @ApiProperty({ description: 'Client Company Name', example: 'TraverseX Sdn Bhd' })
    @IsString()
    company_name: string;

    @ApiProperty({ description: 'Person in Charge Name', example: 'John' })
    @IsString()
    person_in_charge_name: string;

    @ApiProperty({ description: 'Company Email', example: 'traverseX@mail.com' })
    @IsEmail()
    company_email: string;

    @ApiProperty({ description: 'Contact Number', example: '+60112312312' })
    @IsString()
    contact_number: string;

    @ApiProperty({ description: 'Additional Contact Number', example: '+6011111111' })
    @IsString()
    additional_contact_number: string;

    @ApiProperty({ description: 'Industry', example: 'Food & Beverages' })
    @IsString()
    industry: string;

    @ApiProperty({ description: 'Category', example: 'Strategic' })
    @IsString()
    category: string;

    @ApiProperty({ description: 'Addresses Data Array (CreateClientLocationDto type) (Need to JSON Stringify)' })
    @IsString()
    addresses: string;
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
}

export class GetClientLocationDto {
    @ApiProperty({ description: 'Client Location ID', example: '1' })
    @IsNumber()
    client_location_id: number;

    @ApiProperty({ description: 'Client ID', example: '1' })
    @IsNumber()
    client_id: number;

    @ApiProperty({ description: 'Country', example: 'Australia' })
    @IsString()
    country: string;

    @ApiProperty({ description: 'City', example: 'Melbourne' })
    @IsString()
    city: string;

    @ApiProperty({ description: 'State', example: 'Venice' })
    @IsString()
    state: string;

    @ApiProperty({ description: 'Postcode', example: '68000' })
    @IsString()
    postcode: string;

    @ApiProperty({ description: 'Address', example: '[Address]' })
    @IsString()
    address: string;
}

export class CreateClientLocationDto {
    @ApiProperty({ description: 'Client ID', example: '1' })
    @IsOptional()
    @IsNumber()
    client_id?: number;

    @ApiProperty({ description: 'Country', example: 'Australia' })
    @IsString()
    country: string;

    @ApiProperty({ description: 'City', example: 'Melbourne' })
    @IsString()
    city: string;

    @ApiProperty({ description: 'State', example: 'Venice' })
    @IsString()
    state: string;

    @ApiProperty({ description: 'Postcode', example: '68000' })
    @IsString()
    postcode: string;

    @ApiProperty({ description: 'Address', example: '[Address]' })
    @IsString()
    address: string;
}

export class UpdateClientLocationDto {
    @ApiProperty({ description: 'Client ID', example: '1', required: false })
    @IsOptional()
    @IsNumber()
    client_id?: number;

    @ApiProperty({ description: 'Country', example: 'Australia', required: false })
    @IsOptional()
    @IsString()
    country?: string;

    @ApiProperty({ description: 'City', example: 'Melbourne', required: false })
    @IsOptional()
    @IsString()
    city?: string;

    @ApiProperty({ description: 'State', example: 'Venice', required: false })
    @IsOptional()
    @IsString()
    state?: string;

    @ApiProperty({ description: 'Postcode', example: '68000', required: false })
    @IsOptional()
    @IsString()
    postcode?: string;

    @ApiProperty({ description: 'Address', example: '[Address]', required: false })
    @IsOptional()
    @IsString()
    address?: string;
}