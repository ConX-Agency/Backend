import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CustomThrowError } from '../../common/controller/config';
import { CreateAccountDto, CreateInfluencerDto, GetAccountDto, GetInfluencerDto, UpdateAccountDto, UpdateInfluencerDto } from '../model/influencers.dto';
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
        updateInfluencerDto: UpdateInfluencerDto,
    ): Promise<GetInfluencerDto | null> {
        try {
            const existingInfluencer = await this.prismaService.influencer.findUnique({ where: { influencer_id: influencerId } }) as Influencer;
            const accountsData: GetAccountDto[] = [];

            if (!existingInfluencer) return null;
            const updatedInfluencer = await this.prismaService.influencer.update({ where: { influencer_id: influencerId }, data: updateInfluencerDto }) as Influencer;

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

    /**
     * Update account (for influencer) record
     *
     * @param accountId Account id
     * @param updateAccountDto New account details
     * @returns New influencer data updated in the database
     */
    public async updateAccount(
        accountId: number,
        updateAccountDto: UpdateAccountDto,
    ): Promise<GetAccountDto | null> {
        try {
            const existingAccount = await this.prismaService.accounts.findUnique({ where: { account_id: accountId } }) as Accounts;
            if (!existingAccount) return null;
            const newAccount = await this.prismaService.accounts.update({ where: { account_id: accountId }, data: updateAccountDto }) as Accounts;

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

    /**
     * Delete account (for influencer) record
     *
     * @param accountId Account id
     * @returns Status of account deletion
     */
    public async deleteAccount(accountId: number): Promise<boolean> {
        const existingAccount = await this.prismaService.accounts.findUnique({ where: { account_id: accountId } }) as Accounts;
        if (!existingAccount) return false;

        const allInfluencers = await this.prismaService.influencer.findMany({}) as Influencer[];
        for (let influencer of allInfluencers) {
            const indexOfAccountId = influencer.accounts_id.indexOf(existingAccount.account_id);
            if (indexOfAccountId >= 0) {
                influencer.accounts_id.splice(indexOfAccountId, 1);
                await this.prismaService.influencer.update({ where: { influencer_id: influencer.influencer_id }, data: { accounts_id: influencer.accounts_id } })
            }
        }

        await this.prismaService.accounts.delete({ where: { account_id: accountId } });
        return true;
    }

    /**
     * Bulk create influencer records from excel
     * 
     * @param file Excel file that contains influencer data
     * @returns Status of operation
     */
    // public async bulkCreate(file: MemoryStorageFile | null): Promise<GetInfluencerDto[]> {
    //     try {
    //         if (!file) {
    //             throw new CustomThrowError(
    //                 "0",
    //                 "File is not found!"
    //             );
    //         }

    //         const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    //         const sheet = workbook.Sheets[ExcelProvider.INFLUENCER_SHEET_NAME];
    //         const sheetData: InfluencerExcel[] = XLSX.utils.sheet_to_json(sheet);

    //         const allNewInfluencers: GetInfluencerDto[] = [];
    //         for (let data of sheetData) {
    //             const influencerData: CreateInfluencerDto = {
    //                 company_name: data[ExcelProvider.CLIENT_COMPANY_NAME],
    //                 person_in_charge_name: data[ExcelProvider.CLIENT_PIC_NAME],
    //                 company_email: data[ExcelProvider.CLIENT_COMPANY_EMAIL] ?? null,
    //                 pic_email: data[ExcelProvider.CLIENT_PIC_EMAIL],
    //                 contact_number: data[ExcelProvider.CLIENT_CONTACT].toString(),
    //                 additional_contact_number: data[ExcelProvider.CLIENT_ADDITIONAL_CONTACT] ?? null,
    //                 industry: data[ExcelProvider.CLIENT_INDUSTRY] ?? null,
    //                 category: data[ExcelProvider.CLIENT_CATEGORY] ?? null,
    //                 package: data[ExcelProvider.CLIENT_PACKAGE],
    //                 address: data[ExcelProvider.CLIENT_ADDRESS],
    //                 city: data[ExcelProvider.CLIENT_CITY] ?? null,
    //                 country: data[ExcelProvider.CLIENT_COUNTRY],
    //                 is_halal: data[ExcelProvider.CLIENT_IS_HALAL].toLowerCase() === "yes",
    //                 postcode: data[ExcelProvider.CLIENT_POSTCODE],
    //                 state: data[ExcelProvider.CLIENT_STATE],
    //             }
    //             const newInfluencer = await this.prismaService.influencer.create({ data: influencerData }) as GetClientDto;
    //             allNewInfluencers.push(newInfluencer);
    //         }

    //         return allNewInfluencers;
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
}
