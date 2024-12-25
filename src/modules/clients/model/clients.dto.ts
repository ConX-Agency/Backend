import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsEmail, IsNumber, IsArray, IsBoolean, IsEnum } from 'class-validator';
import { EnumProvider } from '../../common';

export enum ClientStatus {
    ACTIVE = "Active",
    PENDING_APPROVAL = "Pending Approval",
    BLACKLISTED = "Blacklisted",
    CANCELLED = "Cancelled"
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
    @ApiProperty({ description: 'Client ID', example: 1 })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
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
    @Transform(({ value }) => parseInt(value))
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

    @ApiProperty({ description: 'Person in Charge Email', example: 'john@traversex.com' })
    @IsString()
    person_in_charge_email: string;

    @ApiProperty({ description: 'Company Email', example: 'traverseX@mail.com' })
    @IsEmail()
    company_email: string;

    @ApiProperty({ description: 'Contact Number', example: '+60112312312' })
    @IsString()
    contact_number: string;

    @ApiProperty({ description: 'Additional Contact Number', example: '+6011111111' })
    @IsString()
    alt_contact_number: string;

    @ApiProperty({ description: 'Industry', example: 'Food & Beverages' })
    @IsString()
    industry: string;

    @ApiProperty({ description: 'Cuisine Type', example: 'Malaysian' })
    @IsString()
    cuisine_type: string;

    @ApiProperty({ description: 'TnC Consent Status', example: true })
    @IsBoolean()
    tnc_consent: boolean;

    @ApiProperty({ description: 'Client Status', example: "Active" })
    @IsString()
    status: string;

    @ApiProperty({ description: 'Addresses', isArray: true, type: GetClientLocationDto })
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

    @ApiProperty({ description: 'Person in Charge Email', example: 'john@mail.com' })
    @IsString()
    person_in_charge_email: string;

    @ApiProperty({ description: 'Company Email', example: 'traverseX@mail.com' })
    @IsEmail()
    company_email: string;

    @ApiProperty({ description: 'Contact Number', example: '+60112312312' })
    @IsString()
    contact_number: string;

    @ApiProperty({ description: 'Additional Contact Number', example: '+6011111111' })
    @IsString()
    alt_contact_number: string;

    @ApiProperty({ description: 'Industry', example: 'Food & Beverages' })
    @IsString()
    industry: string;

    @ApiProperty({ description: 'Cuisine Type', example: 'Malaysian' })
    @IsString()
    cuisine_type: string;

    @ApiProperty({ description: 'TnC Consent', example: true })
    @Transform(({ value }) => value === "true")
    @IsBoolean()
    tnc_consent: boolean;

    @ApiProperty({ description: 'Client Status', example: 'Active' })
    @Transform(({ value }) => EnumProvider.toEnum(ClientStatus, value))
    @IsEnum(ClientStatus)
    status: ClientStatus;

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

    @ApiProperty({ description: 'Person in Charge Email', example: 'john@mail.com', required: false })
    @IsOptional()
    @IsString()
    person_in_charge_email?: string;

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
    alt_contact_number?: string;

    @ApiProperty({ description: 'Industry', example: 'Food & Beverages', required: false })
    @IsOptional()
    @IsString()
    industry?: string;

    @ApiProperty({ description: 'Cuisine Type', example: 'Malaysian', required: false })
    @IsOptional()
    @IsString()
    cuisine_type?: string;

    @ApiProperty({ description: 'TnC Consent', example: true, required: false })
    @IsOptional()
    @Transform(({ value }) => value === "true")
    @IsBoolean()
    tnc_consent?: boolean;

    @ApiProperty({ description: 'Client Status', example: 'Active', required: false })
    @IsOptional()
    @Transform(({ value }) => EnumProvider.toEnum(ClientStatus, value))
    @IsEnum(ClientStatus)
    status?: ClientStatus;
}