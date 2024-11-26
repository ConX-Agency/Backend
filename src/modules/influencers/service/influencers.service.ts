import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CustomThrowError } from '../../common/controller/config';
import { CreateAccountDto, CreateInfluencerDto, GetAccountDto, GetInfluencerDto } from '../model/influencers.dto';
import { Accounts, Platform } from '@prisma/client';
import { InfluencersData } from '../model';

@Injectable()
export class InfluencersService {
    public constructor(
        private readonly prismaService: PrismaService
    ) { }

    /**
     * Get all influencers (and their accounts) in the database
     *
     * @returns Influencers list
     */
    public async getAll(): Promise<GetInfluencerDto[]> {
        try {
            const influencersData: GetInfluencerDto[] = [];
            const influencers = await this.prismaService.influencer.findMany({}) as InfluencersData[];

            for (let influencer of influencers) {
                const accountsData: GetAccountDto[] = [];
                for (let accountId of influencer.accounts_id) {
                    const account = await this.prismaService.accounts.findUnique({ where: { account_id: accountId } }) as Accounts;
                    const platform = await this.prismaService.platform.findUnique({ where: { platform_id: account?.platform_id } }) as Platform;
                    accountsData.push({
                        ...account,
                        platform_name: platform?.platform_name,
                        platform_type: platform?.platform_type
                    })
                }
                influencersData.push({
                    ...influencer,
                    accounts: accountsData
                });
            }

            return influencersData;
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
     * Get influencer (and his / her accounts) in the database by id
     * 
     * @returns Influencer data
     */
    public async getById(influencerId: number): Promise<GetInfluencerDto | null> {
        try {
            const influencer = await this.prismaService.influencer.findUnique({ where: { influencer_id: influencerId } }) as InfluencersData;
            const accountsData: GetAccountDto[] = [];

            if (!influencer) return null;
            for (let accountId of influencer.accounts_id) {
                const account = await this.prismaService.accounts.findUnique({ where: { account_id: accountId } }) as Accounts;
                const platform = await this.prismaService.platform.findUnique({ where: { platform_id: account?.platform_id } }) as Platform;
                accountsData.push({
                    ...account,
                    platform_name: platform?.platform_name,
                    platform_type: platform?.platform_type
                });
            }

            return {
                ...influencer,
                accounts: accountsData
            } as GetInfluencerDto;
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
     * Create a new influencer (with account) record
     *
     * @param data Influencer (and account) details
     * @returns New influencer (and account) data created in the database
     */
    public async create(data: CreateInfluencerDto): Promise<GetInfluencerDto> {
        try {
            const influencerAccountIds: number[] = [];          // Stores all newly created accounts' ids
            const influencerAccounts: GetAccountDto[] = [];     // Stores all newly created accounts

            const { accounts, ...others } = data;
            const accountsData = JSON.parse(accounts);
            for (let i = 0; i < accountsData.length; i++) {
                const newAccountData = accountsData[i] as CreateAccountDto;
                const newAccount = await this.prismaService.accounts.create({ data: newAccountData }) as Accounts;
                influencerAccountIds.push(newAccount.account_id);

                const platform = await this.prismaService.platform.findUnique({ where: { platform_id: newAccount.platform_id } }) as Platform;
                influencerAccounts.push({
                    ...newAccount,
                    platform_name: platform?.platform_name,
                    platform_type: platform?.platform_type
                });
            }

            const newInfluencer = await this.prismaService.influencer.create({
                data: {
                    ...others,
                    accounts_id: influencerAccountIds
                }
            });
            return {
                ...newInfluencer,
                accounts: influencerAccounts
            } as GetInfluencerDto;
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
     * Update client record
     *
     * @param clientId Client id
     * @param updateClientDto New client details
     * @returns New client data updated in the database
     */
    // public async update(
    //     clientId: number,
    //     updateClientDto: UpdateInfluencerDto,
    // ): Promise<InfluencersData | null> {
    //     try {
    //         const existingClient = await this.prismaService.clients.findUnique({ where: { client_id: clientId } });
    //         if (!existingClient) return null;
    //         const updatedClient = await this.prismaService.clients.update({ where: { client_id: clientId }, data: updateClientDto });
    //         return updatedClient;
    //     } catch (error) {
    //         if (error instanceof PrismaClientKnownRequestError) {
    //             // known prisma client error
    //             throw new CustomThrowError(
    //                 error.code,
    //                 error.message,
    //                 error.meta
    //             );
    //         }
    //         // unknown error
    //         throw new CustomThrowError(
    //             "-1",
    //             error.message,
    //             error.meta
    //         );
    //     }
    // }

    /**
     * Delete client record
     *
     * @param clientId Client id
     * @returns Status of client deletion
     */
    // public async delete(clientId: number): Promise<boolean> {
    //     const existingClient = await this.prismaService.clients.findUnique({ where: { client_id: clientId } });
    //     if (!existingClient) return false;
    //     await this.prismaService.clients.delete({ where: { client_id: clientId } });
    //     return true;
    // }
}
