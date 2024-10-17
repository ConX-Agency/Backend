import { Body, Controller, Get, HttpStatus, Inject, Post, PreconditionFailedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Config, LoggerService, RestrictedGuard } from '../../common';
import { Service } from '../../tokens';

import { ClientsPipe } from '../flow';
import { ClientsData, ClientsInput } from '../model';
import { ClientsService } from '../service';

@Controller('clients')
@ApiTags('clients')
@ApiBearerAuth()
export class ClientsController {

    public constructor(
        @Inject(Service.CONFIG)
        private readonly config: Config,
        private readonly logger: LoggerService,
        private readonly clientService: ClientsService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Find clients' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: ClientsData })
    public async find(): Promise<ClientsData[]> {

        return this.clientService.find();
    }

    @Post()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Create clients' })
    @ApiResponse({ status: HttpStatus.CREATED, type: ClientsData })
    public async create(@Body(ClientsPipe) input: ClientsInput): Promise<ClientsData> {

        if (this.config.PASSENGERS_ALLOWED === 'no') {
            throw new PreconditionFailedException('Not allowed to onboard clients');
        }

        const clients = await this.clientService.create(input);
        this.logger.info(`Created new client with ID ${clients.client_id}`);

        return clients;
    }

}
