import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common';
import { ClientsData, ClientsInput } from '../model';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CustomThrowError } from '../../common/controller/config';

@Injectable()
export class ClientsService {
    public constructor(
        private readonly prismaService: PrismaService
    ) { }

    /**
     * get all clients in the database
     *
     * @returns client list
     */
    public async getAll(): Promise<ClientsData[]> {
        const clients = await this.prismaService.clients.findMany({});
        return clients.map(client => new ClientsData(client));
    }

    /**
     * create a new client record
     *
     * @param data client details
     * @returns new client data created in the database
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

}
