import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsBoolean, IsDateString, IsObject } from 'class-validator';
import { GetClientDto } from '../../clients/model/clients.dto';
import { GetInfluencerDto } from '../../influencers/model/influencers.dto';

export class GetInfluencersCampaignDto {
    @ApiProperty({ description: 'Influencer Campaign ID', example: 1 })
    @IsNumber()
    influencer_campaign_id: number;

    @ApiProperty({ description: 'Campaign ID', example: 1 })
    @IsNumber()
    campaign_id: number;

    @ApiProperty({ description: 'Influencer ID', example: 1 })
    @IsNumber()
    influencer_id: number;

    @ApiProperty({ description: 'Campaign Name', example: '[Campaign Name]' })
    @IsString()
    campaign_name: string;

    @ApiProperty({ description: 'Full Name', example: 'John' })
    @IsString()
    full_name: string;

    @ApiProperty({ description: 'Booking Datetime', example: '2025-01-01T05:41:43.975Z' })
    @IsDateString()
    booking_datetime: string;

    @ApiProperty({ description: 'Pax Number', example: 100 })
    @IsNumber()
    pax_no: number;

    @ApiProperty({ description: 'Type', example: "[Campaign Type]" })
    @IsString()
    type: number;

    @ApiProperty({ description: 'Social Media Handler', example: "[Social Media Handler]" })
    @IsString()
    social_media_handler: string;

    @ApiProperty({ description: 'Is Due', example: false })
    @IsBoolean()
    is_due: boolean;

    @ApiProperty({ description: 'Social Media Post', example: "[Social Media Post]" })
    @IsString()
    social_media_post: string;

    @ApiProperty({ description: 'Review Posted', example: false })
    @IsBoolean()
    review_posted: boolean;

    @ApiProperty({ description: 'Is Completed', example: false })
    @IsBoolean()
    is_completed: boolean;

    @ApiProperty({ description: 'Influencer Response Date', example: "2025-01-01T05:41:43.975Z" })
    @IsDateString()
    influencer_response_date: string;

    @ApiProperty({ description: "Influencer" })
    @IsObject()
    influencer: GetInfluencerDto;

    @ApiProperty({ description: "Campaign" })
    @IsObject()
    campaign: GetCampaignDto;
}

export class CreateInfluencersCampaignDto {
    @ApiProperty({ description: 'Campaign ID', example: 1 })
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    campaign_id: number;

    @ApiProperty({ description: 'Influencer ID', example: 1 })
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    influencer_id: number;

    @ApiProperty({ description: 'Campaign Name', example: '[Campaign Name]' })
    @IsString()
    campaign_name: string;

    @ApiProperty({ description: 'Full Name', example: 'John' })
    @IsString()
    full_name: string;

    @ApiProperty({ description: 'Booking Datetime', example: '2025-01-01T05:41:43.975Z' })
    @IsDateString()
    booking_datetime: string;

    @ApiProperty({ description: 'Pax Number', example: 100 })
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    pax_no: number;

    @ApiProperty({ description: 'Type', example: "[Campaign Type]" })
    @IsString()
    type: string;

    @ApiProperty({ description: 'Social Media Handler', example: "[Social Media Handler]" })
    @IsString()
    social_media_handler: string;

    @ApiProperty({ description: 'Is Due', example: false })
    @Transform(({ value }) => value === "true")
    @IsBoolean()
    is_due: boolean;

    @ApiProperty({ description: 'Social Media Post', example: "[Social Media Post]" })
    @IsString()
    social_media_post: string;

    @ApiProperty({ description: 'Review Posted', example: false })
    @Transform(({ value }) => value === "true")
    @IsBoolean()
    review_posted: boolean;

    @ApiProperty({ description: 'Is Completed', example: false })
    @Transform(({ value }) => value === "true")
    @IsBoolean()
    is_completed: boolean;

    @ApiProperty({ description: 'Influencer Response Date', example: "2025-01-01T05:41:43.975Z" })
    @IsDateString()
    influencer_response_date: string;
}

export class UpdateInfluencersCampaignDto {
    @ApiProperty({ description: 'Campaign ID', example: 1, required: false })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    campaign_id: number;

    @ApiProperty({ description: 'Influencer ID', example: 1, required: false })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    influencer_id: number;

    @ApiProperty({ description: 'Campaign Name', example: '[Campaign Name]', required: false })
    @IsOptional()
    @IsString()
    campaign_name: string;

    @ApiProperty({ description: 'Full Name', example: 'John', required: false })
    @IsOptional()
    @IsString()
    full_name: string;

    @ApiProperty({ description: 'Booking Datetime', example: '2025-01-01T05:41:43.975Z', required: false })
    @IsOptional()
    @IsDateString()
    booking_datetime: string;

    @ApiProperty({ description: 'Pax Number', example: 100, required: false })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    pax_no: number;

    @ApiProperty({ description: 'Type', example: "[Campaign Type]", required: false })
    @IsOptional()
    @IsString()
    type: string;

    @ApiProperty({ description: 'Social Media Handler', example: "[Social Media Handler]", required: false })
    @IsOptional()
    @IsString()
    social_media_handler: string;

    @ApiProperty({ description: 'Is Due', example: false, required: false })
    @IsOptional()
    @Transform(({ value }) => value === "true")
    @IsBoolean()
    is_due: boolean;

    @ApiProperty({ description: 'Social Media Post', example: "[Social Media Post]", required: false })
    @IsOptional()
    @IsString()
    social_media_post: string;

    @ApiProperty({ description: 'Review Posted', example: false, required: false })
    @IsOptional()
    @Transform(({ value }) => value === "true")
    @IsBoolean()
    review_posted: boolean;

    @ApiProperty({ description: 'Is Completed', example: false, required: false })
    @IsOptional()
    @Transform(({ value }) => value === "true")
    @IsBoolean()
    is_completed: boolean;

    @ApiProperty({ description: 'Influencer Response Date', example: "2025-01-01T05:41:43.975Z", required: false })
    @IsOptional()
    @IsDateString()
    influencer_response_date: string;
}

export class GetCampaignDto {
    @ApiProperty({ description: 'Campaign ID', example: 1 })
    @IsNumber()
    campaign_id: number;

    @ApiProperty({ description: 'Client ID', example: 1 })
    @IsNumber()
    client_id: number;

    @ApiProperty({ description: 'Campaign Name', example: '[Campaign Name]' })
    @IsString()
    campaign_name: string;

    @ApiProperty({ description: 'Food Offering', example: 'All' })
    @IsString()
    food_offering: string;

    @ApiProperty({ description: 'Campaign Address', example: '[Address]' })
    @IsString()
    campaign_address: string;

    @ApiProperty({ description: 'Package', example: '[Package]' })
    @IsString()
    package: string;

    @ApiProperty({ description: 'Feedback', example: '[Feedback]' })
    @IsString()
    feedback: string;

    @ApiProperty({ description: 'Max Pax', example: 100 })
    @IsNumber()
    max_pax: string;

    @ApiProperty({ description: 'Booking Availability', example: "3-5pm" })
    @IsString()
    booking_availability: string;

    @ApiProperty({ description: 'Availability Public Holiday', example: "3-5pm" })
    @IsString()
    availability_public_holiday: string;

    @ApiProperty({ description: 'Campaign Start Date', example: "2025-01-01T05:41:43.975Z" })
    @IsDateString()
    start_date: string;

    @ApiProperty({ description: 'Campaign End Date', example: "2025-01-10T05:41:43.975Z" })
    @IsDateString()
    end_date: string;

    @ApiProperty({ description: 'Is Halal', example: false })
    @IsBoolean()
    is_halal: boolean;

    @ApiProperty({ description: 'Slots', example: 20 })
    @IsNumber()
    slots: number;

    @ApiProperty({ description: 'Slot Status', example: "Available" })
    @IsString()
    slot_status: string;

    @ApiProperty({ description: 'Is Result', example: false })
    @IsBoolean()
    is_result: boolean;

    @ApiProperty({ description: 'Campaign Status', example: "Ongoing" })
    @IsString()
    campaign_status: string;

    @ApiProperty({ description: "Client" })
    @IsObject()
    client: GetClientDto;
}

export class CreateCampaignDto {
    @ApiProperty({ description: 'Client ID', example: 1 })
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    client_id: number;

    @ApiProperty({ description: 'Campaign Name', example: '[Campaign Name]' })
    @IsString()
    campaign_name: string;

    @ApiProperty({ description: 'Food Offering', example: 'All' })
    @IsString()
    food_offering: string;

    @ApiProperty({ description: 'Campaign Address', example: '[Campaign Address]' })
    @IsString()
    campaign_address: string;

    @ApiProperty({ description: 'Package', example: '[Package]' })
    @IsString()
    package: string;

    @ApiProperty({ description: 'Feedback', example: '[Feedback]' })
    @IsString()
    feedback: string;

    @ApiProperty({ description: 'Max Pax', example: 100 })
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    max_pax: number;

    @ApiProperty({ description: 'Booking Availability', example: "3-5pm" })
    @IsString()
    booking_availability: string;

    @ApiProperty({ description: 'Availability Public Holiday', example: "3-5pm" })
    @IsString()
    availability_public_holiday: string;

    @ApiProperty({ description: 'Campaign Start Date', example: "2025-01-01T05:41:43.975Z" })
    @IsDateString()
    start_date: string;

    @ApiProperty({ description: 'Campaign End Date', example: "2025-01-10T05:41:43.975Z" })
    @IsDateString()
    end_date: string;

    @ApiProperty({ description: 'Is Halal', example: false })
    @Transform(({ value }) => value === "true")
    @IsBoolean()
    is_halal: boolean;

    @ApiProperty({ description: 'Slots', example: 20 })
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    slots: number;

    @ApiProperty({ description: 'Slot Status', example: "Available" })
    @IsString()
    slot_status: string;

    @ApiProperty({ description: 'Is Result', example: false })
    @Transform(({ value }) => value === "true")
    @IsBoolean()
    is_result: boolean;

    @ApiProperty({ description: 'Campaign Status', example: "Ongoing" })
    @IsString()
    campaign_status: string;
}

export class UpdateCampaignDto {
    @ApiProperty({ description: 'Client ID', example: 1, required: false })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    client_id?: number;

    @ApiProperty({ description: 'Campaign Name', example: '[Campaign Name]', required: false })
    @IsOptional()
    @IsString()
    campaign_name?: string;

    @ApiProperty({ description: 'Food Offering', example: 'All', required: false })
    @IsOptional()
    @IsString()
    food_offering?: string;

    @ApiProperty({ description: 'Campaign Address', example: '[Campaign Address]', required: false })
    @IsOptional()
    @IsString()
    campaign_address?: string;

    @ApiProperty({ description: 'Package', example: '[Package]', required: false })
    @IsOptional()
    @IsString()
    package?: string;

    @ApiProperty({ description: 'Feedback', example: '[Feedback]', required: false })
    @IsOptional()
    @IsString()
    feedback?: string;

    @ApiProperty({ description: 'Max Pax', example: 100, required: false })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    max_pax?: string;

    @ApiProperty({ description: 'Booking Availability', example: "3-5pm", required: false })
    @IsOptional()
    @IsString()
    booking_availability?: string;

    @ApiProperty({ description: 'Availability Public Holiday', example: "3-5pm", required: false })
    @IsOptional()
    @IsString()
    availability_public_holiday?: string;

    @ApiProperty({ description: 'Campaign Start Date', example: "2025-01-01T05:41:43.975Z", required: false })
    @IsOptional()
    @IsDateString()
    start_date?: string;

    @ApiProperty({ description: 'Campaign End Date', example: "2025-01-10T05:41:43.975Z", required: false })
    @IsOptional()
    @IsDateString()
    end_date?: string;

    @ApiProperty({ description: 'Is Halal', example: false, required: false })
    @IsOptional()
    @Transform(({ value }) => value === "true")
    @IsBoolean()
    is_halal?: boolean;

    @ApiProperty({ description: 'Slots', example: 20, required: false })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    slots?: number;

    @ApiProperty({ description: 'Slot Status', example: "Available", required: false })
    @IsOptional()
    @IsString()
    slot_status?: string;

    @ApiProperty({ description: 'Is Result', example: false, required: false })
    @IsOptional()
    @Transform(({ value }) => value === "true")
    @IsBoolean()
    is_result?: boolean;

    @ApiProperty({ description: 'Campaign Status', example: "Ongoing", required: false })
    @IsOptional()
    @IsString()
    campaign_status?: string;
}