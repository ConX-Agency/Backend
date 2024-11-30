import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerService } from '../../common';
import { AdminService } from '../service';
import { AdminPipe } from '../flow';
import { CustomThrowError } from '../../common/controller/config';
import { ErrorData } from '../../common/model/config';
import { FileFieldsInterceptor, MemoryStorageFile } from '@blazity/nest-file-fastify';
import { CreateAdminDto, GetAdminDto, UpdateAdminDto } from '../model/admin.dto';

@Controller('admin')
@ApiTags('Admin')
@ApiBearerAuth()
export class AdminController {
    public constructor(
        private readonly logger: LoggerService,
        private readonly adminService: AdminService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all admins' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: Array<GetAdminDto>, description: "Get All Admins" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    public async getAll(): Promise<GetAdminDto[]> {
        try {
            return await this.adminService.getAll();
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Get(':adminId')
    @ApiOperation({ summary: 'Get admin by id' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: GetAdminDto, description: "Get Admin By ID" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    public async getById(
        @Param('adminId', ParseIntPipe) adminId: number,
    ): Promise<GetAdminDto | null> {
        try {
            const admin = await this.adminService.getById(adminId);
            if (!admin) throw new BadRequestException(`Admin with ID ${adminId} not found!`);
            return admin;
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
    @ApiOperation({ summary: 'Register new admin' })
    @ApiResponse({ status: HttpStatus.CREATED, type: CreateAdminDto, description: 'Register new admin' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    public async register(
        @Body(AdminPipe) registerAdminDto: CreateAdminDto,
        @UploadedFiles() files: { image?: MemoryStorageFile },
    ): Promise<GetAdminDto> {
        try {
            const newAdmin = await this.adminService.create(registerAdminDto);
            this.logger.info(`Registered new admin with ID ${newAdmin.admin_id}!`);
            return newAdmin;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Patch(':adminId')
    // @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Update admin by ID' })
    @ApiResponse({ status: HttpStatus.OK, type: UpdateAdminDto, description: 'Update admin by ID', })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData, })
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    public async update(
        @Param('adminId', ParseIntPipe) adminId: number,
        @Body() updateAdminDto: UpdateAdminDto,
        @UploadedFiles() files: { image?: MemoryStorageFile },
    ): Promise<GetAdminDto> {
        try {
            const updatedAdmin = await this.adminService.update(adminId, updateAdminDto);
            if (!updatedAdmin) throw new BadRequestException(`Admin with ID ${adminId} not found!`);
            return updatedAdmin;
        } catch (error: unknown) {
            if (error instanceof CustomThrowError) {
                const { message, meta } = error;
                throw new BadRequestException({ message, meta });
            }
            throw new BadRequestException(error);
        }
    }

    @Delete(':adminId')
    // @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Delete admin by ID' })
    @ApiResponse({ status: HttpStatus.OK, type: Boolean, description: 'Delete admin by ID' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ErrorData, })
    public async delete(
        @Param('adminId', ParseIntPipe) adminId: number
    ): Promise<void> {
        try {
            const success = await this.adminService.delete(adminId);
            if (!success) throw new BadRequestException(`Admin with ID ${adminId} not found`);
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
