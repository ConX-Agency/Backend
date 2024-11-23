import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateClientDto {
    @IsOptional()
    @IsString()
    company_name?: string;

    @IsOptional()
    @IsString()
    person_in_charge_name?: string;

    @IsOptional()
    @IsEmail()
    company_email?: string;

    @IsOptional()
    @IsString()
    pic_email?: string;

    @IsOptional()
    @IsString()
    contact_number?: string;

    @IsOptional()
    @IsString()
    additional_contact_number?: string;

    @IsOptional()
    @IsString()
    industry?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    package?: string;
}