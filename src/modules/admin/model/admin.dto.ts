import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsNumber } from 'class-validator';

export class GetAdminDto {
    @ApiProperty({ description: 'Admin ID', example: '1' })
    @IsNumber()
    admin_id: number;

    @ApiProperty({ description: 'Full Name', example: 'Jason Chong' })
    @IsString()
    full_name: string;

    @ApiProperty({ description: 'Preferred Name', example: 'Jason' })
    @IsString()
    preferred_name: string;

    @ApiProperty({ description: 'Contact Number', example: '+60123212321' })
    @IsString()
    contact_number: string;

    @ApiProperty({ description: 'Email Address', example: 'jason@mail.com' })
    @IsEmail()
    email_address: string;
}

export class CreateAdminDto {
    @ApiProperty({ description: 'Full Name', example: 'Jason Chong' })
    @IsString()
    full_name: string;

    @ApiProperty({ description: 'Preferred Name', example: 'Jason' })
    @IsString()
    preferred_name: string;

    @ApiProperty({ description: 'Contact Number', example: '+60123212321' })
    @IsString()
    contact_number: string;

    @ApiProperty({ description: 'Email Address', example: 'jason@mail.com' })
    @IsEmail()
    email_address: string;
}

export class UpdateAdminDto {
    @ApiProperty({ description: 'Full Name', example: 'Jason Chong' })
    @IsOptional()
    @IsString()
    full_name?: string;

    @ApiProperty({ description: 'Preferred Name', example: 'Jason' })
    @IsOptional()
    @IsString()
    preferred_name?: string;

    @ApiProperty({ description: 'Contact Number', example: '+60123212321' })
    @IsOptional()
    @IsString()
    contact_number?: string;

    @ApiProperty({ description: 'Email Address', example: 'jason@mail.com' })
    @IsOptional()
    @IsEmail()
    email_address?: string;
}