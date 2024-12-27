import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsEmail, IsArray, IsNumber, IsBoolean, IsEnum } from 'class-validator';
import { EnumProvider } from '../../common';

export enum InfluencerStatus {
    ACTIVE = "Active",
    PENDING_APPROVAL = "Pending Approval",
    BLACKLISTED = "Blacklisted",
    CANCELLED = "Cancelled"
}

export class GetAccountDto {
    @ApiProperty({ description: 'Account ID', example: 1 })
    @IsNumber()
    account_id: number;

    @ApiProperty({ description: 'Social Media URL', example: '[Instagram URL]' })
    @IsString()
    social_media_url: string;

    @ApiProperty({ description: 'Followers', example: 160000 })
    @IsNumber()
    follower_count: number;

    @ApiProperty({ description: 'Platform Name', example: 'Instagram' })
    @IsString()
    platform_name: string;

    @ApiProperty({ description: 'Platform Focus', example: 'Food' })
    @IsString()
    platform_focus: string;

    @ApiProperty({ description: 'Influencer ID', example: 1 })
    @IsNumber()
    influencer_id: number;

    @ApiProperty({ description: 'Audience Focus Country', example: "Malaysia" })
    @IsString()
    audience_focus_country: string;
}

export class CreateAccountDto {
    @ApiProperty({ description: 'Social Media URL', example: '[Instagram URL]' })
    @IsString()
    social_media_url: string;

    @ApiProperty({ description: 'Followers', example: 16000 })
    @IsNumber()
    follower_count: number;

    @ApiProperty({ description: 'Platform Name', example: "Instagram" })
    @IsString()
    platform_name: string;

    @ApiProperty({ description: 'Platform Focus', example: "Food" })
    @IsString()
    platform_focus: string;

    @ApiProperty({ description: 'Influencer ID', example: 1 })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    influencer_id?: number;

    @ApiProperty({ description: 'Audience Focus Country', example: "Malaysia" })
    @IsString()
    audience_focus_country: string;
}

export class UpdateAccountDto {
    @ApiProperty({ description: 'Social Media URL', example: '[Instagram URL]', required: false })
    @IsOptional()
    @IsString()
    social_media_url?: string;

    @ApiProperty({ description: 'Followers', example: 16000, required: false })
    @IsOptional()
    @IsNumber()
    follower_count?: number;

    @ApiProperty({ description: 'Platform Name', example: "Instagram", required: false })
    @IsOptional()
    @IsString()
    platform_name?: string;

    @ApiProperty({ description: 'Platform Focus', example: "Food", required: false })
    @IsOptional()
    @IsString()
    platform_focus?: string;

    @ApiProperty({ description: 'Influencer ID', required: false })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    influencer_id?: number;

    @ApiProperty({ description: 'Audience Focus Country', example: "Malaysia", required: false })
    @IsOptional()
    @IsString()
    audience_focus_country?: string;
}

export class GetInfluencerDto {
    @ApiProperty({ description: 'Influencer ID', example: '1' })
    @IsNumber()
    influencer_id: number;

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
    alt_contact_number: string;

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

    @ApiProperty({ description: 'Address', example: '[Address]' })
    @IsString()
    address: string;

    @ApiProperty({ description: 'Is Multiple Countries?', example: true })
    @IsBoolean()
    multiple_countries: boolean;

    @ApiProperty({ description: 'Additional Country', example: "Australia" })
    @IsString()
    additional_country: string;

    @ApiProperty({ description: 'Is Consent WhatsApp Group?', example: true })
    @IsBoolean()
    whatsapp_consent: boolean;

    @ApiProperty({ description: 'Is Invited WhatsApp Group?', example: true })
    @IsBoolean()
    whatsapp_invited: boolean;

    @ApiProperty({ description: 'Is Invited Community?', example: true })
    @IsBoolean()
    community_invited: boolean;

    @ApiProperty({ description: 'Industry', example: "F&B" })
    @IsString()
    industry: string;

    @ApiProperty({ description: 'Invite Count', example: 0 })
    @IsNumber()
    invite_count: number;

    @ApiProperty({ description: 'TnC Consent?', example: true })
    @IsBoolean()
    tnc_consent: boolean;

    @ApiProperty({ description: 'Influencer Status', example: "Active" })
    @IsString()
    status: string;

    @ApiProperty({ description: 'Accounts', isArray: true, type: GetAccountDto })
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
    @IsEmail()
    email_address: string;

    @ApiProperty({ description: 'Additional Contact Number', example: '+6011111111' })
    @IsString()
    alt_contact_number: string;

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

    @ApiProperty({ description: 'Address', example: '[Address]' })
    @IsString()
    address: string;

    @ApiProperty({ description: 'Is Multiple Countries?', example: true, required: false })
    @IsOptional()
    @Transform(({ value }) => value ? value === "true" : false)
    @IsBoolean()
    multiple_countries?: boolean;

    @ApiProperty({ description: 'Additional Country', example: "Australia", required: false })
    @IsOptional()
    @IsString()
    additional_country?: string;

    @ApiProperty({ description: 'Is Consent WhatsApp Group?', example: true })
    @Transform(({ value }) => value === "true")
    @IsBoolean()
    whatsapp_consent: boolean;

    @ApiProperty({ description: 'Is Invited WhatsApp Group?', example: true })
    @Transform(({ value }) => value === "true")
    @IsBoolean()
    whatsapp_invited: boolean;

    @ApiProperty({ description: 'Is Invited Community?', example: true })
    @Transform(({ value }) => value === "true")
    @IsBoolean()
    community_invited: boolean;

    @ApiProperty({ description: 'Industry', example: "F&B" })
    @IsString()
    industry: string;

    @ApiProperty({ description: 'Invite Count', example: 0 })
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    invite_count: number;

    @ApiProperty({ description: 'TnC Consent?', example: true })
    @Transform(({ value }) => value === "true")
    @IsBoolean()
    tnc_consent: boolean;

    @ApiProperty({ description: 'Influencer Status', example: 'Active' })
    @Transform(({ value }) => EnumProvider.toEnum(InfluencerStatus, value))
    @IsEnum(InfluencerStatus)
    status: InfluencerStatus;

    @ApiProperty({ description: 'Account Data Array (CreateAccountDto type) (Need to JSON Stringify)' })
    @IsString()
    accounts: string;
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
    alt_contact_number?: string;

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

    @ApiProperty({ description: 'Address', example: '[Address]', required: false })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({ description: 'Is Multiple Countries?', example: true, required: false })
    @IsOptional()
    @Transform(({ value }) => value ? value === "true" : false)
    @IsBoolean()
    multiple_countries?: boolean;

    @ApiProperty({ description: 'Additional Country', example: "Australia", required: false })
    @IsOptional()
    @IsString()
    additional_country?: string;

    @ApiProperty({ description: 'Is Consent WhatsApp Group?', example: true, required: false })
    @IsOptional()
    @Transform(({ value }) => value === "true")
    @IsBoolean()
    whatsapp_consent?: boolean;

    @ApiProperty({ description: 'Is Invited WhatsApp Group?', example: true, required: false })
    @IsOptional()
    @Transform(({ value }) => value === "true")
    @IsBoolean()
    whatsapp_invited?: boolean;

    @ApiProperty({ description: 'Is Invited Community?', example: true, required: false })
    @IsOptional()
    @Transform(({ value }) => value === "true")
    @IsBoolean()
    community_invited?: boolean;

    @ApiProperty({ description: 'Industry', example: "F&B", required: false })
    @IsOptional()
    @IsString()
    industry?: string;

    @ApiProperty({ description: 'Invite Count', example: 0, required: false })
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    invite_count?: number;

    @ApiProperty({ description: 'TnC Consent?', example: true, required: false })
    @IsOptional()
    @Transform(({ value }) => value === "true")
    @IsBoolean()
    tnc_consent?: boolean;

    @ApiProperty({ description: 'Influencer Status', example: 'Active' })
    @IsOptional()
    @Transform(({ value }) => EnumProvider.toEnum(InfluencerStatus, value))
    @IsEnum(InfluencerStatus)
    status?: InfluencerStatus;
}