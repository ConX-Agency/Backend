import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerService } from '../../common';
import { ClientsService } from '../service';
import { ClientsPipe } from '../flow';
import { CustomThrowError } from '../../common/controller/config';
import { ErrorData } from '../../common/model/config';
import { FileFieldsInterceptor, MemoryStorageFile } from '@blazity/nest-file-fastify';
import { CreateInfluencerDto, GetInfluencerDto, UpdateInfluencerDto } from '../model/influencers.dto';

@Controller('influencers')
@ApiTags('Influencers')
@ApiBearerAuth()
export class InfluencersController {
    public constructor(
        private readonly logger: LoggerService,
        private readonly clientsService: ClientsService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all clients' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: Array<GetInfluencerDto> })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    public async getAll(): Promise<GetInfluencerDto[]> {
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

    @Get(':id')
    @ApiOperation({ summary: 'Get client by id' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: GetInfluencerDto })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    public async getById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<GetInfluencerDto | null> {
        try {
            const client = await this.clientsService.getById(id);
            if (!client) throw new BadRequestException(`Client with ID ${id} not found!`);
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
    // @UseGuards(RestrictedGuard)
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Register new client' })
    @ApiResponse({ status: HttpStatus.CREATED, type: CreateInfluencerDto })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    public async register(
        @Body(ClientsPipe) registerClientDto: CreateInfluencerDto,
        @UploadedFiles() files: { image?: MemoryStorageFile },
    ): Promise<GetInfluencerDto> {
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

    @Patch(':id')
    // @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Update client by ID' })
    @ApiResponse({ status: HttpStatus.OK, type: UpdateInfluencerDto, description: 'Update client', })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData, })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateClientDto: UpdateInfluencerDto,
        @UploadedFiles() files: { image?: MemoryStorageFile },
    ): Promise<GetInfluencerDto> {
        try {
            const updatedClient = await this.clientsService.update(id, updateClientDto);
            if (!updatedClient) throw new BadRequestException(`Client with ID ${id} not found!`);
            return updatedClient;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Delete(':id')
    // @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Delete client by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Delete client' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData, })
    public async delete(
        @Param('id', ParseIntPipe) id: number
    ): Promise<void> {
        try {
            const success = await this.clientsService.delete(id);
            if (!success) throw new BadRequestException(`Client with ID ${id} not found`);
            return;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
