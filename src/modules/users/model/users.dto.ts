import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsNumber, IsStrongPassword, IsNotEmpty, IsObject } from 'class-validator';

export class GetUserDto {
    @ApiProperty({ description: 'User ID', example: '1' })
    @IsNumber()
    user_id: number;

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

    @ApiProperty({ description: 'Username', example: 'jason123' })
    @IsString()
    username: string;

    @ApiProperty({ description: 'User Type', example: 'Admin' })
    @IsString()
    type: string;
}

export class CreateUserDto {
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

    @ApiProperty({ description: 'Username', example: 'jason123' })
    @IsString()
    username: string;

    @ApiProperty({ description: 'Password', example: 'xxxxxxxxxxxxxx' })
    @IsStrongPassword()
    password: string;
}

export class UpdateUserDto {
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

    @ApiProperty({ description: 'Username', example: 'jason123' })
    @IsOptional()
    @IsString()
    username?: string;

    @ApiProperty({ description: 'Password', example: 'xxxxxxxxxxxxxx' })
    @IsOptional()
    @IsStrongPassword()
    password?: string;
}

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class LoginUserDataDto {
    @IsString()
    token: string;

    @IsObject()
    userData: GetUserDto;
}