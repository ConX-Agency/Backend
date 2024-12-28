import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerProvider } from '../../common';
import { UsersService } from '../service';
import { UsersPipe } from '../flow';
import { CustomThrowError } from '../../common/controller/config';
import { ErrorData } from '../../common/model/config';
import { FileFieldsInterceptor, MemoryStorageFile } from 'nest-file-fastify';
import { CreateUserDto, GetUserDto, LoginDto, LoginUserDataDto, UpdateUserDto } from '../model/users.dto';
import { AdminGuard, UserGuard } from '../../common/security/user.guard';
import { UploadedFiles } from 'nest-file-fastify';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
    public constructor(
        private readonly logger: LoggerProvider,
        private readonly usersService: UsersService
    ) { }

    @Get()
    @UseGuards(UserGuard)
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: GetUserDto, description: "Get All Users" })
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
    @UseGuards(UserGuard)
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
    @UseGuards(AdminGuard)
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
    @UseGuards(UserGuard)
    @ApiConsumes('multipart/form-data')
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
    @UseGuards(UserGuard)
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

    @Post('/client/login')
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Login client user' })
    @ApiResponse({ status: HttpStatus.CREATED, type: LoginUserDataDto, description: 'Login client user' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    public async loginClient(
        @Body() loginDto: LoginDto,
        @UploadedFiles() files: { image?: MemoryStorageFile },
    ): Promise<LoginUserDataDto> {
        try {
            const newUser = await this.usersService.login(loginDto, UsersService.USER_TYPES.CLIENT);
            this.logger.info(`Login into client user with user ID ${newUser.userData.user_id}!`);
            return newUser;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Post('/admin/login')
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Login admin user' })
    @ApiResponse({ status: HttpStatus.CREATED, type: LoginUserDataDto, description: 'Login admin user' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    public async loginAdmin(
        @Body() loginDto: LoginDto,
        @UploadedFiles() files: { image?: MemoryStorageFile },
    ): Promise<LoginUserDataDto> {
        try {
            const newUser = await this.usersService.login(loginDto, UsersService.USER_TYPES.ADMIN);
            this.logger.info(`Login into admin user with user ID ${newUser.userData.user_id}!`);
            return newUser;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Post('/influencer/login')
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Login influencer user' })
    @ApiResponse({ status: HttpStatus.CREATED, type: LoginUserDataDto, description: 'Login influencer user' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    public async loginInfluencer(
        @Body() loginDto: LoginDto,
        @UploadedFiles() files: { image?: MemoryStorageFile },
    ): Promise<LoginUserDataDto> {
        try {
            const newUser = await this.usersService.login(loginDto, UsersService.USER_TYPES.INFLUENCER);
            this.logger.info(`Login into influencer user with user ID ${newUser.userData.user_id}!`);
            return newUser;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }
}
