import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CustomThrowError } from '../../common/controller/config';
import { CreateAdminDto, GetAdminDto, UpdateAdminDto } from '../model/admin.dto';

@Injectable()
export class AdminService {
    public constructor(
        private readonly prismaService: PrismaService
    ) { }

    /**
     * Get all admin in the database
     *
     * @returns Admins list
     */
    public async getAll(): Promise<GetAdminDto[]> {
        try {
            const admins = await this.prismaService.admin.findMany({}) as GetAdminDto[];
            return admins;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                // known prisma client error
                throw new CustomThrowError(
                    error.code,
                    error.message,
                    error.meta
                );
            }
            // unknown error
            throw new CustomThrowError(
                "-1",
                error.message,
                error.meta
            );
        }
    }

    /**
     * Get admin in the database by id
     * 
     * @returns Admin data
     */
    public async getById(adminId: number): Promise<GetAdminDto | null> {
        try {
            const admin = await this.prismaService.admin.findUnique({ where: { admin_id: adminId } }) as GetAdminDto;
            return admin;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                // known prisma client error
                throw new CustomThrowError(
                    error.code,
                    error.message,
                    error.meta
                );
            }
            // unknown error
            throw new CustomThrowError(
                "-1",
                error.message,
                error.meta
            );
        }
    }

    /**
     * Create a new admin record
     *
     * @param createAdminDto Admin details
     * @returns New admin data created in the database
     */
    public async create(createAdminDto: CreateAdminDto): Promise<GetAdminDto> {
        try {
            const newAdmin = await this.prismaService.admin.create({ data: createAdminDto }) as GetAdminDto;
            return newAdmin;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                // known prisma client error
                throw new CustomThrowError(
                    error.code,
                    error.message,
                    error.meta
                );
            }
            // unknown error
            throw new CustomThrowError(
                "-1",
                error.message,
                error.meta
            );
        }
    }

    /**
     * Update admin record
     *
     * @param adminId Admin id
     * @param updateAdminDto New admin details
     * @returns New admin data updated in the database
     */
    public async update(
        adminId: number,
        updateAdminDto: UpdateAdminDto,
    ): Promise<GetAdminDto | null> {
        try {
            const existingAdmin = await this.prismaService.admin.findUnique({ where: { admin_id: adminId } }) as GetAdminDto;
            if (!existingAdmin) return null;
            const updatedClient = await this.prismaService.admin.update({ where: { admin_id: adminId }, data: updateAdminDto }) as GetAdminDto;
            return updatedClient;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                // known prisma client error
                throw new CustomThrowError(
                    error.code,
                    error.message,
                    error.meta
                );
            }
            // unknown error
            throw new CustomThrowError(
                "-1",
                error.message,
                error.meta
            );
        }
    }

    /**
     * Delete admin record
     *
     * @param adminId Admin id
     * @returns Status of admin deletion
     */
    public async delete(adminId: number): Promise<boolean> {
        const existingAdmin = await this.prismaService.admin.findUnique({ where: { admin_id: adminId } });
        if (!existingAdmin) return false;
        await this.prismaService.admin.delete({ where: { admin_id: adminId } });
        return true;
    }
}
