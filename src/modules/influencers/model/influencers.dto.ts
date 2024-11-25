import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsArray, IsNumber } from 'class-validator';

export class GetInfluencerDto {
    @ApiProperty({ description: 'Full Name', example: 'James Chong' })
    @IsString()
    full_name: string;

    @ApiProperty({ description: 'Preferred Name', example: 'James' })
    @IsString()
    preferred_name: string;

    @ApiProperty({ description: 'Contact Number', example: '+60112312312' })
    @IsString()
    contact_number: string;

    @ApiProperty({ description: 'Email Address', example: 'james@mail.com' })
    @IsOptional()
    @IsEmail()
    email_address: string;

    @ApiProperty({ description: 'Additional Contact Number', example: '+6011111111' })
    @IsString()
    additional_contact_number: string;

    @ApiProperty({ description: 'Address', example: '[Home address]' })
    @IsString()
    home_address: string;

    @ApiProperty({ description: 'Country', example: 'Malaysia' })
    @IsString()
    country: string;

    @ApiProperty({ description: 'City', example: 'Kuala Lumpur' })
    @IsString()
    city: string;

    @ApiProperty({ description: 'State', example: 'Selangor' })
    @IsString()
    state: string;

    @ApiProperty({ description: 'Postcode', example: '51000' })
    @IsString()
    postcode: string;

    @ApiProperty({ description: 'Diet Preference', example: 'Vegan' })
    @IsString()
    diet_preference: string;

    @ApiProperty({ description: 'Accounts' })
    @IsArray()
    accounts: GetAccountDto[]
}

export class CreateInfluencerDto {
    @ApiProperty({ description: 'Full Name', example: 'James Chong' })
    @IsString()
    full_name: string;

    @ApiProperty({ description: 'Preferred Name', example: 'James' })
    @IsString()
    preferred_name: string;

    @ApiProperty({ description: 'Contact Number', example: '+60112312312' })
    @IsString()
    contact_number: string;

    @ApiProperty({ description: 'Email Address', example: 'james@mail.com' })
    @IsOptional()
    @IsEmail()
    email_address: string;

    @ApiProperty({ description: 'Additional Contact Number', example: '+6011111111' })
    @IsString()
    additional_contact_number: string;

    @ApiProperty({ description: 'Address', example: '[Home address]', required: false })
    @IsString()
    home_address: string | null;

    @ApiProperty({ description: 'Country', example: 'Malaysia' })
    @IsString()
    country: string;

    @ApiProperty({ description: 'City', example: 'Kuala Lumpur', required: false })
    @IsString()
    city: string | null;

    @ApiProperty({ description: 'State', example: 'Selangor' })
    @IsString()
    state: string;

    @ApiProperty({ description: 'Postcode', example: '51000', required: false })
    @IsString()
    postcode: string | null;

    @ApiProperty({ description: 'Diet Preference', example: 'Vegan', required: false })
    @IsString()
    diet_preference: string | null;

    @ApiProperty({ description: 'Account Ids' })
    @IsArray()
    accounts_id: number[]
}

export class UpdateInfluencerDto {
    @ApiProperty({ description: 'Full Name', example: 'James Chong', required: false })
    @IsOptional()
    @IsString()
    full_name?: string;

    @ApiProperty({ description: 'Preferred Name', example: 'James', required: false })
    @IsOptional()
    @IsString()
    preferred_name?: string;

    @ApiProperty({ description: 'Contact Number', example: '+60112312312', required: false })
    @IsOptional()
    @IsString()
    contact_number?: string;

    @ApiProperty({ description: 'Email Address', example: 'james@mail.com', required: false })
    @IsOptional()
    @IsOptional()
    @IsEmail()
    email_address?: string;

    @ApiProperty({ description: 'Additional Contact Number', example: '+6011111111', required: false })
    @IsOptional()
    @IsString()
    additional_contact_number?: string;

    @ApiProperty({ description: 'Address', example: '[Home address]', required: false })
    @IsOptional()
    @IsString()
    home_address?: string;

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

    @ApiProperty({ description: 'Diet Preference', example: 'Vegan', required: false })
    @IsOptional()
    @IsString()
    diet_preference?: string;

    @ApiProperty({ description: 'Account Ids', required: false })
    @IsOptional()
    @IsArray()
    accounts_id?: number[]
}

export class GetAccountDto {
    @ApiProperty({ description: 'Platform Name', example: 'Instagram' })
    @IsString()
    platform_name: string;

    @ApiProperty({ description: 'Platform Type', example: 'Social Media' })
    @IsString()
    platform_type: string;

    @ApiProperty({ description: 'Social Media URL', example: '[Instagram URL]' })
    @IsString()
    social_media_url: string;

    @ApiProperty({ description: 'Media Country', example: 'Malaysia' })
    @IsString()
    media_country: string;

    @ApiProperty({ description: 'Followers', example: '16k' })
    @IsString()
    followers: string;

    @ApiProperty({ description: 'Industry', example: 'Food,Lifestyles' })
    @IsString()
    industry: string;

    @ApiProperty({ description: 'Active Status', example: 'Active' })
    @IsString()
    active_status: string;
}

export class CreateAccountDto {
    @ApiProperty({ description: 'Platform ID' })
    @IsNumber()
    platform_id: number;

    @ApiProperty({ description: 'Social Media URL', example: '[Instagram URL]' })
    @IsString()
    social_media_url: string;

    @ApiProperty({ description: 'Media Country', example: 'Malaysia' })
    @IsString()
    media_country: string;

    @ApiProperty({ description: 'Followers', example: '16k' })
    @IsString()
    followers: string;

    @ApiProperty({ description: 'Industry', example: 'Food,Lifestyles' })
    @IsString()
    industry: string;

    @ApiProperty({ description: 'Active Status', example: 'Active' })
    @IsString()
    active_status: string;
}

export class UpdateAccountDto {
    @ApiProperty({ description: 'Platform ID', required: false })
    @IsOptional()
    @IsNumber()
    platform_id: number;

    @ApiProperty({ description: 'Social Media URL', example: '[Instagram URL]', required: false })
    @IsOptional()
    @IsString()
    social_media_url: string;

    @ApiProperty({ description: 'Media Country', example: 'Malaysia', required: false })
    @IsOptional()
    @IsString()
    media_country: string;

    @ApiProperty({ description: 'Followers', example: '16k', required: false })
    @IsOptional()
    @IsString()
    followers: string;

    @ApiProperty({ description: 'Industry', example: 'Food,Lifestyles', required: false })
    @IsOptional()
    @IsString()
    industry: string;

    @ApiProperty({ description: 'Active Status', example: 'Active', required: false })
    @IsOptional()
    @IsString()
    active_status: string;
}