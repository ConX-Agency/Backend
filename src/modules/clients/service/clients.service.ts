import { Injectable } from '@nestjs/common';
import { ExcelProvider, PrismaService } from '../../common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CustomThrowError } from '../../common/controller/config';
import { CreateClientDto, CreateClientLocationDto, GetClientDto, GetClientLocationDto, UpdateClientDto } from '../model/clients.dto';
import { MemoryStorageFile } from '@blazity/nest-file-fastify';
import { ClientExcel } from '../../common/model/excel';
import * as XLSX from 'xlsx';
import { ClientsData } from '../model';
import { Clients, Clients_Location } from '@prisma/client';

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
            const clientsData: GetClientDto[] = [];
            const clients = await this.prismaService.clients.findMany({}) as ClientsData[];

            for (let client of clients) {
                const addressData: GetClientLocationDto[] = await this.prismaService.clients_Location.findMany({ where: { client_id: client.client_id } });
                clientsData.push({
                    ...client,
                    addresses: addressData
                });
            }

            return clientsData;
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
            const client = await this.prismaService.clients.findUnique({ where: { client_id: clientId } }) as ClientsData;
            if (!client) return null;
            const addresses: GetClientLocationDto[] = await this.prismaService.clients_Location.findMany({ where: { client_id: client.client_id } });
            return {
                ...client,
                addresses
            } as GetClientDto;
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
    public async create(createClientData: CreateClientDto): Promise<GetClientDto> {
        try {
            const clientAddresses: GetClientLocationDto[] = [];

            const { addresses, ...others } = createClientData;
            const addressesData = JSON.parse(addresses) as CreateClientLocationDto[];
            const newClient = await this.prismaService.clients.create({ data: others });
            for (let i = 0; i < addressesData.length; i++) {
                const newAddressData = addressesData[i];
                const newAddress = await this.prismaService.clients_Location.create({ data: { ...newAddressData, client_id: newClient.client_id } }) as Clients_Location;
                clientAddresses.push(newAddress);
            }

            return {
                ...newClient,
                addresses: clientAddresses
            } as GetClientDto;
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
            const existingClient = await this.prismaService.clients.findUnique({ where: { client_id: clientId } }) as Clients;
            if (!existingClient) return null;
            const updatedClient = await this.prismaService.clients.update({ where: { client_id: clientId }, data: updateClientDto }) as Clients;
            const clientAddresses = await this.prismaService.clients_Location.findMany({ where: { client_id: clientId } }) as GetClientLocationDto[];
            return {
                ...updatedClient,
                addresses: clientAddresses
            } as GetClientDto;
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
                const clientData = {
                    company_name: data[ExcelProvider.CLIENT_COMPANY_NAME],
                    person_in_charge_name: data[ExcelProvider.CLIENT_PIC_NAME],
                    company_email: data[ExcelProvider.CLIENT_COMPANY_EMAIL],
                    contact_number: data[ExcelProvider.CLIENT_CONTACT].toString(),
                    additional_contact_number: data[ExcelProvider.CLIENT_ADDITIONAL_CONTACT] ?? "-",
                    industry: data[ExcelProvider.CLIENT_INDUSTRY] ?? "-",
                    category: data[ExcelProvider.CLIENT_CATEGORY] ?? "-"
                }
                const newClient = await this.prismaService.clients.create({ data: clientData }) as GetClientDto;

                // Assume the Excel file only has 1 address for client
                const address = data[ExcelProvider.CLIENT_ADDRESS];
                const city = data[ExcelProvider.CLIENT_CITY] ?? "-";
                const country = data[ExcelProvider.CLIENT_COUNTRY];
                const postcode = data[ExcelProvider.CLIENT_POSTCODE] ?? "-";
                const state = data[ExcelProvider.CLIENT_STATE];
                const newAddress = await this.prismaService.clients_Location.create({
                    data: {
                        client_id: newClient.client_id,
                        address,
                        city,
                        country,
                        postcode,
                        state
                    }
                }) as GetClientLocationDto;
                allNewClients.push({ ...newClient, addresses: [newAddress] });
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
