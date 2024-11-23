import { Body, Controller, Get, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerService, RestrictedGuard } from '../../common';
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
        private readonly logger: LoggerService,
        private readonly clientsService: ClientsService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all clients' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: ClientsData })
    public async getAll(): Promise<ClientsData[]> {
        return this.clientsService.getAll();
    }

    @Post()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Register new client' })
    @ApiResponse({ status: HttpStatus.CREATED, type: ClientsData })
    public async register(@Body(ClientsPipe) input: ClientsInput): Promise<ClientsData> {
        const clients = await this.clientsService.create(input);
        this.logger.info(`Registered new client with ID ${clients.client_id}`);
        return clients;
    }
}
