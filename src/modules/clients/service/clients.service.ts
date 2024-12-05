import { Injectable } from '@nestjs/common';
import { ExcelProvider, PrismaService } from '../../common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CustomThrowError } from '../../common/controller/config';
import { CreateClientDto, GetClientDto, UpdateClientDto } from '../model/clients.dto';
import { MemoryStorageFile } from '@blazity/nest-file-fastify';
import { ClientExcel } from '../../common/model/excel';
import * as XLSX from 'xlsx';

@Injectable()
export class ClientsService {
    public constructor(
        private readonly prismaService: PrismaService
    ) { }

    /**
     * Get all clients in the database
     *
     * @returns Clients list
     */
    public async getAll(): Promise<GetClientDto[]> {
        try {
            const clients = await this.prismaService.clients.findMany({}) as GetClientDto[];
            return clients;
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
     * Get client in the database by id
     * 
     * @returns Client data
     */
    public async getById(clientId: number): Promise<GetClientDto | null> {
        try {
            const client = await this.prismaService.clients.findUnique({ where: { client_id: clientId } }) as GetClientDto;
            return client;
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
     * Create a new client record
     *
     * @param data Client details
     * @returns New client data created in the database
     */
    public async create(data: CreateClientDto): Promise<GetClientDto> {
        try {
            const newClient = await this.prismaService.clients.create({ data }) as GetClientDto;
            return newClient;
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
    public async update(
        clientId: number,
        updateClientDto: UpdateClientDto,
    ): Promise<GetClientDto | null> {
        try {
            const existingClient = await this.prismaService.clients.findUnique({ where: { client_id: clientId } }) as GetClientDto;
            if (!existingClient) return null;
            const updatedClient = await this.prismaService.clients.update({ where: { client_id: clientId }, data: updateClientDto }) as GetClientDto;
            return updatedClient;
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
     * Delete client record
     *
     * @param clientId Client id
     * @returns Status of client deletion
     */
    public async delete(clientId: number): Promise<boolean> {
        const existingClient = await this.prismaService.clients.findUnique({ where: { client_id: clientId } });
        if (!existingClient) return false;
        await this.prismaService.clients.delete({ where: { client_id: clientId } });
        return true;
    }

    /**
     * Bulk create client records from excel
     * 
     * @param file Excel file that contains client data
     * @returns Status of operation
     */
    public async bulkCreate(file: MemoryStorageFile | null): Promise<GetClientDto[]> {
        try {
            if (!file) {
                throw new CustomThrowError(
                    "0",
                    "File is not found!"
                );
            }

            const workbook = XLSX.read(file.buffer, { type: 'buffer' });
            const sheet = workbook.Sheets[ExcelProvider.CLIENT_SHEET_NAME];
            const sheetData: ClientExcel[] = XLSX.utils.sheet_to_json(sheet);

            const allNewClients: GetClientDto[] = [];
            for (let data of sheetData) {
                const clientData: CreateClientDto = {
                    company_name: data[ExcelProvider.CLIENT_COMPANY_NAME],
                    person_in_charge_name: data[ExcelProvider.CLIENT_PIC_NAME],
                    company_email: data[ExcelProvider.CLIENT_COMPANY_EMAIL] ?? null,
                    pic_email: data[ExcelProvider.CLIENT_PIC_EMAIL],
                    contact_number: data[ExcelProvider.CLIENT_CONTACT].toString(),
                    additional_contact_number: data[ExcelProvider.CLIENT_ADDITIONAL_CONTACT] ?? null,
                    industry: data[ExcelProvider.CLIENT_INDUSTRY] ?? null,
                    category: data[ExcelProvider.CLIENT_CATEGORY] ?? null,
                    package: data[ExcelProvider.CLIENT_PACKAGE],
                    address: data[ExcelProvider.CLIENT_ADDRESS],
                    city: data[ExcelProvider.CLIENT_CITY] ?? null,
                    country: data[ExcelProvider.CLIENT_COUNTRY],
                    is_halal: data[ExcelProvider.CLIENT_IS_HALAL].toLowerCase() === "yes",
                    postcode: data[ExcelProvider.CLIENT_POSTCODE],
                    state: data[ExcelProvider.CLIENT_STATE],
                }
                const newClient = await this.prismaService.clients.create({ data: clientData }) as GetClientDto;
                allNewClients.push(newClient);
            }

            return allNewClients;
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
