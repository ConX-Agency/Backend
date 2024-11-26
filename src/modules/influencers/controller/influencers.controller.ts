import { BadRequestException, Body, Controller, HttpStatus, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerService } from '../../common';
import { InfluencersService } from '../service';
import { InfluencersPipe } from '../flow';
import { CustomThrowError } from '../../common/controller/config';
import { ErrorData } from '../../common/model/config';
import { FileFieldsInterceptor, MemoryStorageFile } from '@blazity/nest-file-fastify';
import { CreateInfluencerDto, GetInfluencerDto } from '../model/influencers.dto';

@Controller('influencers')
@ApiTags('Influencers')
@ApiBearerAuth()
export class InfluencersController {
    public constructor(
        private readonly logger: LoggerService,
        private readonly influencersService: InfluencersService
    ) { }

    // @Get()
    // @ApiOperation({ summary: 'Get all clients' })
    // @ApiResponse({ status: HttpStatus.OK, isArray: true, type: Array<GetInfluencerDto> })
    // @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    // public async getAll(): Promise<GetInfluencerDto[]> {
    //     try {
    //         return await this.clientsService.getAll();
    //     } catch (error: unknown) {
    //         if (error instanceof CustomThrowError) {
    //             const { message, meta } = error;
    //             throw new BadRequestException({ message, meta });
    //         }
    //         throw new BadRequestException(error);
    //     }
    // }

    // @Get(':id')
    // @ApiOperation({ summary: 'Get client by id' })
    // @ApiResponse({ status: HttpStatus.OK, isArray: true, type: GetInfluencerDto })
    // @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    // public async getById(
    //     @Param('id', ParseIntPipe) id: number,
    // ): Promise<GetInfluencerDto | null> {
    //     try {
    //         const client = await this.clientsService.getById(id);
    //         if (!client) throw new BadRequestException(`Client with ID ${id} not found!`);
    //         return client;
    //     } catch (error: unknown) {
    //         if (error instanceof CustomThrowError) {
    //             const { message, meta } = error;
    //             throw new BadRequestException({ message, meta });
    //         }
    //         throw new BadRequestException(error);
    //     }
    // }

    @Post()
    // @UseGuards(RestrictedGuard)
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Register new influencer' })
    @ApiResponse({ status: HttpStatus.CREATED, type: CreateInfluencerDto })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    public async register(
        @Body(InfluencersPipe) registerInfluencerDto: CreateInfluencerDto,
        @UploadedFiles() files: { image?: MemoryStorageFile },
    ): Promise<GetInfluencerDto> {
        try {
            const newInfluencer = await this.influencersService.create(registerInfluencerDto);
            this.logger.info(`Registered new influencer with ID ${newInfluencer.influencer_id}!`);
            return newInfluencer;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    // @Patch(':id')
    // // @UseGuards(RestrictedGuard)
    // @ApiOperation({ summary: 'Update client by ID' })
    // @ApiResponse({ status: HttpStatus.OK, type: UpdateInfluencerDto, description: 'Update client', })
    // @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData, })
    // @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    // public async update(
    //     @Param('id', ParseIntPipe) id: number,
    //     @Body() updateClientDto: UpdateInfluencerDto,
    //     @UploadedFiles() files: { image?: MemoryStorageFile },
    // ): Promise<GetInfluencerDto> {
    //     try {
    //         const updatedClient = await this.clientsService.update(id, updateClientDto);
    //         if (!updatedClient) throw new BadRequestException(`Client with ID ${id} not found!`);
    //         return updatedClient;
    //     } catch (error) {
    //         throw new BadRequestException(error);
    //     }
    // }

    // @Delete(':id')
    // // @UseGuards(RestrictedGuard)
    // @ApiOperation({ summary: 'Delete client by ID' })
    // @ApiResponse({ status: HttpStatus.OK, description: 'Delete client' })
    // @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData, })
    // public async delete(
    //     @Param('id', ParseIntPipe) id: number
    // ): Promise<void> {
    //     try {
    //         const success = await this.clientsService.delete(id);
    //         if (!success) throw new BadRequestException(`Client with ID ${id} not found`);
    //         return;
    //     } catch (error) {
    //         throw new BadRequestException(error);
    //     }
    // }
}
