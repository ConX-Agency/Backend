import { Injectable } from '@nestjs/common';
import { ExcelProvider, PrismaService, ValidatorProvider } from '../../common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CustomThrowError } from '../../common/controller/config';
import { CreateAccountDto, CreateInfluencerDto, GetAccountDto, GetInfluencerDto, UpdateAccountDto, UpdateInfluencerDto } from '../model/influencers.dto';
import { Accounts, Influencer } from '@prisma/client';
import { InfluencersData } from '../model';
import { MemoryStorageFile } from 'nest-file-fastify';
import * as XLSX from "xlsx";
import { InfluencerExcel } from '../../common/model/excel';

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
                let accountData: GetAccountDto[] = [];
                const accounts = await this.prismaService.accounts.findMany({
                    where: { influencer_id: influencer.influencer_id }
                });

                for (let account of accounts) {
                    accountData.push({
                        ...account,
                    })
                }

                influencersData.push({
                    ...influencer,
                    accounts: accountData
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
            let accountData: GetAccountDto[] = [];
            const accounts = await this.prismaService.accounts.findMany({
                where: { influencer_id: influencer.influencer_id }
            });

            for (let account of accounts) {
                accountData.push({
                    ...account
                })
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
     * @param createInfluencerData Influencer (and account) details
     * @returns New influencer (and account) data created in the database
     */
    public async create(createInfluencerData: CreateInfluencerDto): Promise<GetInfluencerDto> {
        try {
            const influencerAccounts: GetAccountDto[] = [];

            const { accounts, ...others } = createInfluencerData;
            const accountsData = JSON.parse(accounts) as CreateAccountDto[];

            for (let account of accountsData) await ValidatorProvider.validateData(account, CreateAccountDto);

            const newInfluencer = await this.prismaService.influencer.create({ data: others });
            for (let i = 0; i < accountsData.length; i++) {
                const newAccountData = accountsData[i];
                const newAccount = await this.prismaService.accounts.create({ data: { ...newAccountData, influencer_id: newInfluencer.influencer_id } }) as Accounts;
                influencerAccounts.push(newAccount);
            }

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
     * @param updateInfluencerData New influencer details
     * @returns New influencer data updated in the database
     */
    public async update(
        influencerId: number,
        updateInfluencerData: UpdateInfluencerDto,
    ): Promise<GetInfluencerDto | null> {
        try {
            const existingInfluencer = await this.prismaService.influencer.findUnique({ where: { influencer_id: influencerId } }) as Influencer;
            if (!existingInfluencer) return null;
            const updatedInfluencer = await this.prismaService.influencer.update({ where: { influencer_id: influencerId }, data: updateInfluencerData }) as Influencer;
            const influencerAccounts = await this.prismaService.accounts.findMany({ where: { influencer_id: influencerId } }) as GetAccountDto[];
            return {
                ...updatedInfluencer,
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
     * @param createAccountData Account details
     * @returns New account data created in the database
     */
    public async createAccount(createAccountData: CreateAccountDto): Promise<GetAccountDto | null> {
        try {
            const existingInfluencer = await this.prismaService.influencer.findUnique({ where: { influencer_id: createAccountData.influencer_id } }) as Influencer;
            if (!existingInfluencer) return null;

            const newAccount = await this.prismaService.accounts.create({ data: { ...createAccountData, influencer_id: existingInfluencer.influencer_id } }) as Accounts;
            return newAccount;
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
     * @param updateAccountData New account details
     * @returns New influencer data updated in the database
     */
    public async updateAccount(
        accountId: number,
        updateAccountData: UpdateAccountDto,
    ): Promise<GetAccountDto | null> {
        try {
            const existingAccount = await this.prismaService.accounts.findUnique({ where: { account_id: accountId } }) as Accounts;
            if (!existingAccount) return null;

            const updatedAccount = await this.prismaService.accounts.update({ where: { account_id: accountId }, data: updateAccountData }) as Accounts;
            return updatedAccount as GetAccountDto;
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
        await this.prismaService.accounts.delete({ where: { account_id: accountId } });
        return true;
    }

    /**
     * Bulk create influencer records from excel
     * 
     * @param file Excel file that contains influencer data
     * @returns Status of operation
     */
    public async bulkCreate(file: MemoryStorageFile | null): Promise<GetInfluencerDto[]> {
        try {
            if (!file) {
                throw new CustomThrowError(
                    "0",
                    "File is not found!"
                );
            }

            const workbook = XLSX.read(file.buffer, { type: 'buffer' });
            const sheet = workbook.Sheets[ExcelProvider.INFLUENCER_SHEET_NAME];
            const sheetData: InfluencerExcel[] = XLSX.utils.sheet_to_json(sheet);

            const allNewInfluencers: GetInfluencerDto[] = [];
            for (let data of sheetData) {
                const influencerData = {
                    full_name: data[ExcelProvider.INFLUENCER_FULL_NAME],
                    preferred_name: data[ExcelProvider.INFLUENCER_PREFERRED_NAME] ?? data[ExcelProvider.INFLUENCER_FULL_NAME],
                    contact_number: data[ExcelProvider.INFLUENCER_CONTACT].toString(),
                    alt_contact_number: data[ExcelProvider.INFLUENCER_ADDITIONAL_CONTACT] ? data[ExcelProvider.INFLUENCER_ADDITIONAL_CONTACT].toString() : data[ExcelProvider.INFLUENCER_CONTACT].toString(),
                    email_address: data[ExcelProvider.INFLUENCER_EMAIL],
                    country: data[ExcelProvider.INFLUENCER_COUNTRY],
                    city: data[ExcelProvider.INFLUENCER_CITY] ?? "-",
                    state: data[ExcelProvider.INFLUENCER_STATE],
                    postcode: data[ExcelProvider.INFLUENCER_POSTCODE] ? data[ExcelProvider.INFLUENCER_POSTCODE].toString() : "-",
                    address: data[ExcelProvider.INFLUENCER_ADDRESS] ? data[ExcelProvider.INFLUENCER_ADDRESS].toString() : "-",
                    multiple_countries: data[ExcelProvider.INFLUENCER_MULTIPLE_COUNTRIES] ? data[ExcelProvider.INFLUENCER_MULTIPLE_COUNTRIES].toLowerCase() === "true" : false,
                    additional_country: data[ExcelProvider.INFLUENCER_ADDITIONAL_COUNTRY] ?? "-",
                    industry: data[ExcelProvider.INFLUENCER_INDUSTRY],
                    whatsapp_consent: data[ExcelProvider.INFLUENCER_WHATSAPP_CONSENT].toString().toLowerCase() === "true",
                    whatsapp_invited: data[ExcelProvider.INFLUENCER_WHATSAPP_INVITED].toString().toLowerCase() === "true",
                    community_invited: data[ExcelProvider.INFLUENCER_COMMUNITY_INVITED].toString().toLowerCase() === "true",
                    invite_count: data[ExcelProvider.INFLUENCER_INVITE_COUNT],
                    tnc_consent: data[ExcelProvider.INFLUENCER_TNC_CONSENT].toString().toLowerCase() === "true",
                    status: data[ExcelProvider.INFLUENCER_STATUS],
                }
                const newInfluencer = await this.prismaService.influencer.create({ data: influencerData });
                let newAccounts: GetAccountDto[] = [];

                // Instagram
                if (data[ExcelProvider.INFLUENCER_INSTAGRAM_URL]) {
                    const newAccount = await this.prismaService.accounts.create({
                        data: {
                            platform_name: "Instagram",
                            platform_focus: data[ExcelProvider.INFLUENCER_INSTAGRAM_ACCOUNT_FOCUS],
                            social_media_url: data[ExcelProvider.INFLUENCER_INSTAGRAM_URL],
                            follower_count: ExcelProvider.convertNumberToInt(data[ExcelProvider.INFLUENCER_INSTAGRAM_FOLLOWER_COUNT].toString()),
                            audience_focus_country: data[ExcelProvider.INFLUENCER_INSTAGRAM_AUDIENCE_COUNTRY],
                            influencer_id: newInfluencer.influencer_id
                        }
                    });
                    newAccounts.push(newAccount);
                }

                // Twitter
                if (data[ExcelProvider.INFLUENCER_TIKTOK_URL]) {
                    const newAccount = await this.prismaService.accounts.create({
                        data: {
                            platform_name: "Tiktok",
                            platform_focus: data[ExcelProvider.INFLUENCER_TIKTOK_ACCOUNT_FOCUS],
                            social_media_url: data[ExcelProvider.INFLUENCER_TIKTOK_URL],
                            follower_count: ExcelProvider.convertNumberToInt(data[ExcelProvider.INFLUENCER_TIKTOK_FOLLOWER_COUNT].toString()),
                            audience_focus_country: data[ExcelProvider.INFLUENCER_TIKTOK_AUDIENCE_COUNTRY],
                            influencer_id: newInfluencer.influencer_id
                        }
                    });
                    newAccounts.push(newAccount);
                }

                // Redbook
                if (data[ExcelProvider.INFLUENCER_REDBOOK_URL]) {
                    const newAccount = await this.prismaService.accounts.create({
                        data: {
                            platform_name: "Redbook",
                            platform_focus: data[ExcelProvider.INFLUENCER_REDBOOK_ACCOUNT_FOCUS],
                            social_media_url: data[ExcelProvider.INFLUENCER_REDBOOK_URL],
                            follower_count: ExcelProvider.convertNumberToInt(data[ExcelProvider.INFLUENCER_REDBOOK_FOLLOWER_COUNT].toString()),
                            audience_focus_country: data[ExcelProvider.INFLUENCER_REDBOOK_AUDIENCE_COUNTRY],
                            influencer_id: newInfluencer.influencer_id
                        }
                    });
                    newAccounts.push(newAccount);
                }

                allNewInfluencers.push({
                    ...newInfluencer,
                    accounts: newAccounts
                } as GetInfluencerDto);
            }

            return allNewInfluencers;
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
