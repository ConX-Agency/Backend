import { BadRequestException, Body, Controller, Get, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerService } from '../../common';
import { ClientsData, ClientsInput } from '../model';
import { ClientsService } from '../service';
import {
    FileFieldsInterceptor,
    MemoryStorageFile,
    UploadedFiles,
} from '@blazity/nest-file-fastify';
import { ClientsPipe } from '../flow';
import { CustomThrowError } from '../../common/controller/config';
import { ErrorData } from '../../common/model/config';

@Controller('clients')
@ApiTags('clients')
@ApiBearerAuth()
export class ClientsController {
    public constructor(
        private readonly logger: LoggerService,
        private readonly clientsService: ClientsService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all clients' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: ClientsData })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    public async getAll(): Promise<ClientsData[]> {
        try {
            return this.clientsService.getAll();
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Post()
    @ApiConsumes('multipart/form-data')
    // @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Register new client' })
    @ApiResponse({ status: HttpStatus.CREATED, type: ClientsData })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    public async register(
        @Body(ClientsPipe) input: ClientsInput,
        @UploadedFiles() files: { image?: MemoryStorageFile },
    ): Promise<ClientsData> {
        try {
            const newClient = await this.clientsService.create(input);
            this.logger.info(`Registered new client with ID ${newClient.client_id}`);
            return newClient;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }
}
