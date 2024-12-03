import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerService } from '../../common';
import { ClientsService } from '../service';
import { ClientsPipe } from '../flow';
import { CustomThrowError } from '../../common/controller/config';
import { ErrorData } from '../../common/model/config';
import { FileFieldsInterceptor, MemoryStorageFile, UploadedFiles } from '@blazity/nest-file-fastify';
import { CreateClientDto, GetClientDto, UpdateClientDto } from '../model/clients.dto';
import { AdminClientGuard, UserGuard } from '../../common/security/user.guard';

@Controller('clients')
@ApiTags('Clients')
@ApiBearerAuth()
export class ClientsController {
    public constructor(
        private readonly logger: LoggerService,
        private readonly clientsService: ClientsService
    ) { }

    @Get()
    @UseGuards(UserGuard)
    @ApiOperation({ summary: 'Get all clients' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: Array<GetClientDto> })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    public async getAll(): Promise<GetClientDto[]> {
        try {
            return await this.clientsService.getAll();
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Get(':clientId')
    @UseGuards(UserGuard)
    @ApiOperation({ summary: 'Get client by id' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: GetClientDto })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    public async getById(
        @Param('clientId', ParseIntPipe) clientId: number,
    ): Promise<GetClientDto | null> {
        try {
            const client = await this.clientsService.getById(clientId);
            if (!client) throw new BadRequestException(`Client with ID ${clientId} not found!`);
            return client;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Post()
    @UseGuards(AdminClientGuard)
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Register new client' })
    @ApiResponse({ status: HttpStatus.CREATED, type: CreateClientDto })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    public async register(
        @Body(ClientsPipe) registerClientDto: CreateClientDto,
        @UploadedFiles() files: { image?: MemoryStorageFile },
    ): Promise<GetClientDto> {
        try {
            const newClient = await this.clientsService.create(registerClientDto);
            this.logger.info(`Registered new client with ID ${newClient.client_id}!`);
            return newClient;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Post('/import')
    // @UseGuards(AdminClientGuard)
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Import new clients into database from Excel files' })
    @ApiResponse({ status: HttpStatus.CREATED, type: Boolean })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 }]))
    public async import(
        @UploadedFiles() files: { file?: MemoryStorageFile[] },
    ): Promise<void> {
        try {
            await this.clientsService.bulkCreate(files.file ? files.file[0] : null);
            return;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Patch(':clientId')
    @UseGuards(AdminClientGuard)
    @ApiOperation({ summary: 'Update client by ID' })
    @ApiResponse({ status: HttpStatus.OK, type: UpdateClientDto, description: 'Update client', })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData, })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    public async update(
        @Param('clientId', ParseIntPipe) clientId: number,
        @Body() updateClientDto: UpdateClientDto,
        @UploadedFiles() files: { image?: MemoryStorageFile },
    ): Promise<GetClientDto> {
        try {
            const updatedClient = await this.clientsService.update(clientId, updateClientDto);
            if (!updatedClient) throw new BadRequestException(`Client with ID ${clientId} not found!`);
            return updatedClient;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Delete(':clientId')
    @UseGuards(AdminClientGuard)
    @ApiOperation({ summary: 'Delete client by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Delete client' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData, })
    public async delete(
        @Param('clientId', ParseIntPipe) clientId: number
    ): Promise<void> {
        try {
            const success = await this.clientsService.delete(clientId);
            if (!success) throw new BadRequestException(`Client with ID ${clientId} not found`);
            return;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }
}
