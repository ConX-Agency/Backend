import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerService } from '../../common';
import { InfluencersService } from '../service';
import { AccountsPipe, InfluencersPipe } from '../flow';
import { CustomThrowError } from '../../common/controller/config';
import { ErrorData } from '../../common/model/config';
import { FileFieldsInterceptor, MemoryStorageFile } from '@blazity/nest-file-fastify';
import { CreateAccountDto, CreateInfluencerDto, GetAccountDto, GetInfluencerDto, UpdateAccountDto, UpdateInfluencerDto } from '../model/influencers.dto';

@Controller('influencers')
@ApiTags('Influencers')
@ApiBearerAuth()
export class InfluencersController {
    public constructor(
        private readonly logger: LoggerService,
        private readonly influencersService: InfluencersService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all influencers' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: Array<GetInfluencerDto>, description: "Get all influencers" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    public async getAll(): Promise<GetInfluencerDto[]> {
        try {
            return await this.influencersService.getAll();
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get influencer by ID' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: GetInfluencerDto, description: "Get influencer by ID" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    public async getById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<GetInfluencerDto | null> {
        try {
            const influencer = await this.influencersService.getById(id);
            if (!influencer) throw new BadRequestException(`Influencer with ID ${id} not found!`);
            return influencer;
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
    @ApiOperation({ summary: 'Register new influencer' })
    @ApiResponse({ status: HttpStatus.CREATED, type: CreateInfluencerDto, description: "Register influencer" })
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

    @Patch(':id')
    // @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Update influencer by ID' })
    @ApiResponse({ status: HttpStatus.OK, type: UpdateInfluencerDto, description: 'Update influencer by ID', })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData, })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateInfluencerDto: UpdateInfluencerDto,
        @UploadedFiles() files: { image?: MemoryStorageFile },
    ): Promise<GetInfluencerDto> {
        try {
            const updatedInfluencer = await this.influencersService.update(id, updateInfluencerDto);
            if (!updatedInfluencer) throw new BadRequestException(`Influencer with ID ${id} not found!`);
            return updatedInfluencer;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Delete(':id')
    // @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Delete influencer by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Delete influencer' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData, })
    public async delete(
        @Param('id', ParseIntPipe) id: number
    ): Promise<void> {
        try {
            const success = await this.influencersService.delete(id);
            if (!success) throw new BadRequestException(`Influencer with ID ${id} not found`);
            return;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Post('/accounts/:influencerId')
    // @UseGuards(RestrictedGuard)
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Create new account (for influencer)' })
    @ApiResponse({ status: HttpStatus.CREATED, type: CreateAccountDto, description: "Create new account" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    public async createAccount(
        @Param('influencerId', ParseIntPipe) influencerId: number,
        @Body(AccountsPipe) createAccountsDto: CreateAccountDto,
    ): Promise<GetAccountDto> {
        try {
            const newAccount = await this.influencersService.createAccount(influencerId, createAccountsDto);
            if (!newAccount) throw new BadRequestException(`Influencer does not exist!`);
            this.logger.info(`Registered new account with ID ${newAccount?.account_id}!`);
            return newAccount;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Patch('/accounts/:accountId')
    // @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Update account by ID' })
    @ApiResponse({ status: HttpStatus.OK, type: UpdateAccountDto, description: 'Update account by ID', })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData, })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    public async updateAccount(
        @Param('accountId', ParseIntPipe) accountId: number,
        @Body() updateAccountDto: UpdateAccountDto
    ): Promise<GetAccountDto> {
        try {
            const updatedAccount = await this.influencersService.updateAccount(accountId, updateAccountDto);
            if (!updatedAccount) throw new BadRequestException(`Account with ID ${accountId} not found!`);
            return updatedAccount;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }
}

