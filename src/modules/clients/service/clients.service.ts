import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common';
import { ClientsData, ClientsInput } from '../model';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CustomThrowError } from '../../common/controller/config';
import { UpdateClientDto } from '../model/clients.dto';

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
    public async getAll(): Promise<ClientsData[]> {
        try {
            const clients = await this.prismaService.clients.findMany({});
            return clients.map(client => new ClientsData(client));
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
                "An unexpected error has occurred!"
            );
        }
    }

    /**
     * Get client in the database by id
     * 
     * @returns Client data
     */
    public async getById(clientId: number): Promise<ClientsData | null> {
        try {
            const client = await this.prismaService.clients.findUnique({ where: { client_id: clientId } });
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
                "An unexpected error has occurred!"
            );
        }
    }

    /**
     * Create a new client record
     *
     * @param data Client details
     * @returns New client data created in the database
     */
    public async create(data: ClientsInput): Promise<ClientsData> {
        try {
            const newClient = await this.prismaService.clients.create({ data });
            return new ClientsData(newClient);
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
                "An unexpected error has occurred!"
            );
        }
    }

    /**
     * Ipdate client record
     *
     * @param clientId Client id
     * @param updateClientDto New client details
     * @returns New client data updated in the database
     */
    public async update(
        clientId: number,
        updateClientDto: UpdateClientDto,
    ): Promise<ClientsData | null> {
        try {
            const existingClient = await this.prismaService.clients.findUnique({ where: { client_id: clientId } });
            if (!existingClient) return null;
            const updatedClient = await this.prismaService.clients.update({ where: { client_id: clientId }, data: updateClientDto });
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
                "An unexpected error has occurred!"
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
}
