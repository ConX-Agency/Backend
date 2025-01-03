import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerProvider } from '../../common';
import { CampaignsService } from '../service';
import { AdminClientGuard, UserGuard } from '../../common/security/user.guard';
import { CreateCampaignDto, GetCampaignDto, UpdateCampaignDto } from '../model/campaigns.dto';
import { ErrorData } from '../../common/model/config';
import { CustomThrowError } from '../../common/controller/config';
import { FileFieldsInterceptor, MemoryStorageFile, UploadedFiles } from 'nest-file-fastify';
import { CampaignPipe } from '../flow';

@Controller('campaigns')
@ApiTags('Campaigns')
@ApiBearerAuth()
export class CampaignsController {
    public constructor(
        private readonly logger: LoggerProvider,
        private readonly campaignsService: CampaignsService
    ) { }

    @Get()
    @UseGuards(UserGuard)
    @ApiOperation({ summary: 'Get all campaigns' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: GetCampaignDto, description: "Get all campaigns" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    public async getAll(): Promise<GetCampaignDto[]> {
        try {
            return await this.campaignsService.getAll();
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Get(':campaignId')
    @UseGuards(UserGuard)
    @ApiOperation({ summary: 'Get campaign by ID' })
    @ApiResponse({ status: HttpStatus.OK, type: GetCampaignDto, description: "Get campaign by ID" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    public async getById(
        @Param('campaignId', ParseIntPipe) campaignId: number,
    ): Promise<GetCampaignDto | null> {
        try {
            const campaign = await this.campaignsService.getById(campaignId);
            if (!campaign) throw new BadRequestException(`Campaign with ID ${campaignId} not found!`);
            return campaign;
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
    @ApiOperation({ summary: 'Create new campaign' })
    @ApiResponse({ status: HttpStatus.CREATED, type: CreateCampaignDto, description: "Create campaign" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    public async register(
        @Body(CampaignPipe) createCampaignDto: CreateCampaignDto,
        @UploadedFiles() files: { image?: MemoryStorageFile },
    ): Promise<GetCampaignDto> {
        try {
            const newCampaign = await this.campaignsService.create(createCampaignDto);
            this.logger.info(`Created new campaign with ID ${newCampaign.campaign_id}!`);
            return newCampaign;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Patch(':campaignId')
    @UseGuards(AdminClientGuard)
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Update campaign by ID' })
    @ApiResponse({ status: HttpStatus.OK, type: UpdateCampaignDto, description: 'Update campaign by ID', })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData, })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    public async update(
        @Param('campaignId', ParseIntPipe) campaignId: number,
        @Body() updateCampaignDto: UpdateCampaignDto,
        @UploadedFiles() files: { image?: MemoryStorageFile },
    ): Promise<GetCampaignDto> {
        try {
            const updatedCampaign = await this.campaignsService.update(campaignId, updateCampaignDto);
            if (!updatedCampaign) throw new BadRequestException(`Campaign with ID ${campaignId} not found!`);
            return updatedCampaign;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Delete(':campaignId')
    @UseGuards(AdminClientGuard)
    @ApiOperation({ summary: 'Delete campaign by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Delete campaign by ID' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData, })
    public async delete(
        @Param('campaignId', ParseIntPipe) campaignId: number
    ): Promise<void> {
        try {
            const success = await this.campaignsService.delete(campaignId);
            if (!success) throw new BadRequestException(`Campaign with ID ${campaignId} not found`);
            return;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    // @Post('/import')
    // @UseGuards(AdminClientGuard)
    // @ApiConsumes('multipart/form-data')
    // @ApiOperation({ summary: 'Import new clients into database from Excel files' })
    // @ApiBody({
    //     description: 'Excel file to upload',
    //     required: true,
    //     schema: {
    //         type: 'object',
    //         properties: {
    //             file: {
    //                 type: 'string',
    //                 format: 'binary',
    //             },
    //         },
    //     },
    // })
    // @ApiResponse({ status: HttpStatus.CREATED, type: GetInfluencerDto, isArray: true })
    // @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    // @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 }]))
    // public async import(
    //     @UploadedFiles() files: { file?: MemoryStorageFile[] },
    // ): Promise<GetInfluencerDto[]> {
    //     try {
    //         const newInfluencers = await this.influencersService.bulkCreate(files.file ? files.file[0] : null);
    //         return newInfluencers;
    //     } catch (error: unknown) {
    //         if (error instanceof CustomThrowError) {
    //             const { message, meta } = error;
    //             throw new BadRequestException({ message, meta });
    //         }
    //         throw new BadRequestException(error);
    //     }
    // }
}
