import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../common";
import { CreateCampaignDto, GetCampaignDto, UpdateCampaignDto } from "../model/campaigns.dto";
import { CampaignData } from "../model";
import { GetClientDto } from "../../clients/model/clients.dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CustomThrowError } from "../../common/controller/config";
import { Campaign } from "@prisma/client";
import { ClientsData } from "../../clients/model";

@Injectable()
export class CampaignsService {
    public constructor(
        private readonly prismaService: PrismaService
    ) { }

    /**
     * Get all campaigns in the database
     *
     * @returns Campaigns list
     */
    public async getAll(): Promise<GetCampaignDto[]> {
        try {
            const campaignsData: GetCampaignDto[] = [];
            const campaigns = await this.prismaService.campaign.findMany({}) as CampaignData[];

            for (let campaign of campaigns) {
                const client = await this.prismaService.clients.findUnique({
                    where: { client_id: campaign.client_id }
                }) as GetClientDto;
                campaignsData.push({
                    ...campaign,
                    start_date: campaign.start_date.toISOString(),
                    end_date: campaign.end_date.toISOString(),
                    client
                });
            }

            return campaignsData;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                // known prisma client error
                throw new CustomThrowError(
                    error.code,
                    error.message,
                    error.meta
                );
            }
            // unknown error
            throw new CustomThrowError(
                "-1",
                error.message,
                error.meta
            );
        }
    }

    /**
     * Get campaign in the database by id
     * 
     * @returns Campaign data
     */
    public async getById(campaignId: number): Promise<GetCampaignDto | null> {
        try {
            const campaign = await this.prismaService.campaign.findUnique({ where: { campaign_id: campaignId } }) as Campaign;
            if (!campaign) return null;

            const client = await this.prismaService.clients.findUnique({
                where: { client_id: campaign.client_id }
            }) as GetClientDto;

            return {
                ...campaign,
                start_date: campaign.start_date.toISOString(),
                end_date: campaign.end_date.toISOString(),
                client
            } as GetCampaignDto;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                // known prisma client error
                throw new CustomThrowError(
                    error.code,
                    error.message,
                    error.meta
                );
            }
            // unknown error
            throw new CustomThrowError(
                "-1",
                error.message,
                error.meta
            );
        }
    }

    /**
     * Create a new campaign record
     *
     * @param createCampaignData Campaign details
     * @returns New campaign data created in the database
     */
    public async create(createCampaignData: CreateCampaignDto): Promise<GetCampaignDto> {
        try {
            const newCampaign = await this.prismaService.campaign.create({ data: createCampaignData }) as CampaignData;
            const client = await this.prismaService.clients.findUnique({ where: { client_id: newCampaign.client_id } }) as ClientsData;
            return {
                ...newCampaign,
                start_date: newCampaign.start_date.toISOString(),
                end_date: newCampaign.end_date.toISOString(),
                client
            } as GetCampaignDto;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                // known prisma client error
                throw new CustomThrowError(
                    error.code,
                    error.message,
                    error.meta
                );
            }
            // unknown error
            throw new CustomThrowError(
                "-1",
                error.message,
                error.meta
            );
        }
    }

    /**
     * Update campaign record
     *
     * @param campaignId Campaign id
     * @param updateCampaignData New campaign details
     * @returns New campaign data updated in the database
     */
    public async update(
        campaignId: number,
        updateCampaignData: UpdateCampaignDto,
    ): Promise<GetCampaignDto | null> {
        try {
            const existingCampaign = await this.prismaService.campaign.findUnique({ where: { campaign_id: campaignId } }) as CampaignData;
            if (!existingCampaign) return null;

            const updatedCampaign = await this.prismaService.campaign.update({
                where: { campaign_id: campaignId },
                data: {
                    ...updateCampaignData,
                    client_id: updateCampaignData.client_id ?? existingCampaign.client_id
                }
            }) as CampaignData;
            const client = await this.prismaService.clients.findUnique({ where: { client_id: updatedCampaign.client_id } }) as ClientsData;
            return {
                ...updatedCampaign,
                start_date: updatedCampaign.start_date.toISOString(),
                end_date: updatedCampaign.end_date.toISOString(),
                client
            } as GetCampaignDto;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                // known prisma client error
                throw new CustomThrowError(
                    error.code,
                    error.message,
                    error.meta
                );
            }
            // unknown error
            throw new CustomThrowError(
                "-1",
                error.message,
                error.meta
            );
        }
    }

    /**
     * Delete campaign record
     *
     * @param campaignId Campaign id
     * @returns Status of campaign deletion
     */
    public async delete(campaignId: number): Promise<boolean> {
        const existingCampaign = await this.prismaService.campaign.findUnique({ where: { campaign_id: campaignId } }) as CampaignData;
        if (!existingCampaign) return false;

        await this.prismaService.campaign.delete({ where: { campaign_id: campaignId } });
        return true;
    }
}