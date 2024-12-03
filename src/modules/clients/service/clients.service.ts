import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CustomThrowError } from '../../common/controller/config';
import { CreateClientDto, GetClientDto, UpdateClientDto } from '../model/clients.dto';
import * as XLSX from 'xlsx';
import { MemoryStorageFile } from '@blazity/nest-file-fastify';

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
    public async bulkCreate(file: MemoryStorageFile | null): Promise<boolean> {
        try {
            if (!file) return false;

            // Parse the file buffer into a workbook
            const workbook = XLSX.read(file.buffer, { type: 'buffer' });
            const sheetName = "Client Data";
            const sheets = workbook.Sheets;
            const sheet = sheets[sheetName];

            // Convert sheet data to JSON
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            console.log(jsonData);
            return true;
            // Example: Save data to the database
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
