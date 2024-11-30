import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerService } from '../../common';
import { UsersService } from '../service';
import { UsersPipe } from '../flow';
import { CustomThrowError } from '../../common/controller/config';
import { ErrorData } from '../../common/model/config';
import { FileFieldsInterceptor, MemoryStorageFile } from '@blazity/nest-file-fastify';
import { CreateUserDto, GetUserDto, UpdateUserDto } from '../model/users.dto';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
    public constructor(
        private readonly logger: LoggerService,
        private readonly usersService: UsersService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: Array<GetUserDto>, description: "Get All Users" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    public async getAll(): Promise<GetUserDto[]> {
        try {
            return await this.usersService.getAll();
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Get(':userId')
    @ApiOperation({ summary: 'Get user by id' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: GetUserDto, description: "Get User By ID" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    public async getById(
        @Param('userId', ParseIntPipe) userId: number,
    ): Promise<GetUserDto | null> {
        try {
            const user = await this.usersService.getById(userId);
            if (!user) throw new BadRequestException(`User with ID ${userId} not found!`);
            return user;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Post('/client')
    // @UseGuards(RestrictedGuard)
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Register new client user' })
    @ApiResponse({ status: HttpStatus.CREATED, type: CreateUserDto, description: 'Register new client user' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    public async registerClient(
        @Body(UsersPipe) registerUserDto: CreateUserDto,
        @UploadedFiles() files: { image?: MemoryStorageFile },
    ): Promise<GetUserDto> {
        try {
            const newUser = await this.usersService.create(registerUserDto, UsersService.USER_TYPES.CLIENT);
            this.logger.info(`Registered new client user with ID ${newUser.user_id}!`);
            return newUser;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Post('/admin')
    // @UseGuards(RestrictedGuard)
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Register new admin user' })
    @ApiResponse({ status: HttpStatus.CREATED, type: CreateUserDto, description: 'Register new admin user' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    public async registerAdmin(
        @Body(UsersPipe) registerUserDto: CreateUserDto,
        @UploadedFiles() files: { image?: MemoryStorageFile },
    ): Promise<GetUserDto> {
        try {
            const newUser = await this.usersService.create(registerUserDto, UsersService.USER_TYPES.ADMIN);
            this.logger.info(`Registered new admin user with ID ${newUser.user_id}!`);
            return newUser;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Post('/influencer')
    // @UseGuards(RestrictedGuard)
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Register new influencer user' })
    @ApiResponse({ status: HttpStatus.CREATED, type: CreateUserDto, description: 'Register new influencer user' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    public async registerInfluencer(
        @Body(UsersPipe) registerUserDto: CreateUserDto,
        @UploadedFiles() files: { image?: MemoryStorageFile },
    ): Promise<GetUserDto> {
        try {
            const newUser = await this.usersService.create(registerUserDto, UsersService.USER_TYPES.INFLUENCER);
            this.logger.info(`Registered new influencer user with ID ${newUser.user_id}!`);
            return newUser;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Patch(':userId')
    // @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Update user by ID' })
    @ApiResponse({ status: HttpStatus.OK, type: UpdateUserDto, description: 'Update user by ID', })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData, })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    public async update(
        @Param('userId', ParseIntPipe) userId: number,
        @Body() updateUserDto: UpdateUserDto,
        @UploadedFiles() files: { image?: MemoryStorageFile },
    ): Promise<GetUserDto> {
        try {
            const updatedUser = await this.usersService.update(userId, updateUserDto);
            if (!updatedUser) throw new BadRequestException(`User with ID ${userId} not found!`);
            return updatedUser;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Delete(':userId')
    // @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Delete user by ID' })
    @ApiResponse({ status: HttpStatus.OK, type: Boolean, description: 'Delete user by ID' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData, })
    public async delete(
        @Param('userId', ParseIntPipe) userId: number
    ): Promise<void> {
        try {
            const success = await this.usersService.delete(userId);
            if (!success) throw new BadRequestException(`User with ID ${userId} not found`);
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
