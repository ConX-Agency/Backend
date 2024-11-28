import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CustomThrowError } from '../../common/controller/config';
import { CreateAccountDto, CreateInfluencerDto, GetAccountDto, GetInfluencerDto, UpdateInfluencerDto } from '../model/influencers.dto';
import { Accounts, Influencer, Platform } from '@prisma/client';
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
     * @param createInfluencerDto Influencer (and account) details
     * @returns New influencer (and account) data created in the database
     */
    public async create(createInfluencerDto: CreateInfluencerDto): Promise<GetInfluencerDto> {
        try {
            const influencerAccountIds: number[] = [];          // Stores all newly created accounts' ids
            const influencerAccounts: GetAccountDto[] = [];     // Stores all newly created accounts

            const { accounts, ...others } = createInfluencerDto;
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
     * Update influencer record
     *
     * @param influencerId Influencer id
     * @param updateInfluencerDto New influencer details
     * @returns New influencer data updated in the database
     */
    public async update(
        influencerId: number,
        updateClientDto: UpdateInfluencerDto,
    ): Promise<GetInfluencerDto | null> {
        try {
            const existingInfluencer = await this.prismaService.influencer.findUnique({ where: { influencer_id: influencerId } }) as Influencer;
            const accountsData: GetAccountDto[] = [];

            if (!existingInfluencer) return null;
            const updatedInfluencer = await this.prismaService.influencer.update({ where: { influencer_id: influencerId }, data: updateClientDto }) as Influencer;

            for (let accountId of updatedInfluencer.accounts_id) {
                const account = await this.prismaService.accounts.findUnique({ where: { account_id: accountId } }) as Accounts;
                const platform = await this.prismaService.platform.findUnique({ where: { platform_id: account?.platform_id } }) as Platform;
                accountsData.push({
                    ...account,
                    platform_name: platform?.platform_name,
                    platform_type: platform?.platform_type
                });
            }

            return {
                ...updatedInfluencer,
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
     * Delete influencer record
     *
     * @param influencerId Influencer id
     * @returns Status of influencer deletion
     */
    public async delete(influencerId: number): Promise<boolean> {
        const existingInfluencer = await this.prismaService.influencer.findUnique({ where: { influencer_id: influencerId } });
        if (!existingInfluencer) return false;
        await this.prismaService.influencer.delete({ where: { influencer_id: influencerId } });
        return true;
    }

    /**
     * Create a new account (for influencer) record
     *
     * @param createAccountDto Account details
     * @returns New account data created in the database
     */
    public async createAccount(influencerId: number, createAccountDto: CreateAccountDto): Promise<GetAccountDto | null> {
        try {
            const existingInfluencer = await this.prismaService.influencer.findUnique({ where: { influencer_id: influencerId } }) as Influencer;
            if (!existingInfluencer) return null;

            const newAccount = await this.prismaService.accounts.create({ data: createAccountDto }) as Accounts;
            const newInfluencerAccountIds = [...existingInfluencer.accounts_id, newAccount.account_id];
            await this.prismaService.influencer.update({ where: { influencer_id: influencerId }, data: { accounts_id: newInfluencerAccountIds } }) as Influencer;

            const platform = await this.prismaService.platform.findUnique({ where: { platform_id: newAccount.platform_id } }) as Platform;
            return {
                ...newAccount,
                platform_name: platform.platform_name,
                platform_type: platform.platform_type
            } as GetAccountDto;
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
}
