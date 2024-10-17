import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../common';
import { ClientsData, ClientsInput } from '../model';

@Injectable()
export class ClientsService {

    public constructor(
        private readonly prismaService: PrismaService
    ) { }

    /**
     * Find all passengers in the database
     *
     * @returns A client list
     */
    public async find(): Promise<ClientsData[]> {

        const clients = await this.prismaService.clients.findMany({});

        return clients.map(client => new ClientsData(client));
    }

    /**
     * Create a new passenger record
     *
     * @param data Clients details
     * @returns A passenger created in the database
     */
    public async create(data: ClientsInput): Promise<ClientsData> {

        const passenger = await this.prismaService.clients.create({
            data
        });

        return new ClientsData(passenger);
    }

}
