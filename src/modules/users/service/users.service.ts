import { Injectable } from '@nestjs/common';
import { PasswordService, PrismaService } from '../../common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CustomThrowError } from '../../common/controller/config';
import { CreateUserDto, GetUserDto, UpdateUserDto } from '../model/users.dto';

@Injectable()
export class UsersService {
    private dbSelectionsWithoutPassword: object = {
        user_id: true,
        full_name: true,
        preferred_name: true,
        contact_number: true,
        email_address: true,
        username: true,
        password: false
    }

    public constructor(
        private readonly prismaService: PrismaService,
        private readonly passwordService: PasswordService,
    ) { }

    /**
     * Get all users in the database
     *
     * @returns Users list
     */
    public async getAll(): Promise<GetUserDto[]> {
        try {
            const users = await this.prismaService.users.findMany({
                select: this.dbSelectionsWithoutPassword
            }) as GetUserDto[];
            return users;
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
     * Get user in the database by id
     * 
     * @returns User data
     */
    public async getById(userId: number): Promise<GetUserDto | null> {
        try {
            const user = await this.prismaService.users.findUnique({
                where: { user_id: userId },
                select: this.dbSelectionsWithoutPassword
            }) as GetUserDto;
            return user;
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
     * Create a new user record
     *
     * @param createUserDto User details
     * @returns New user data created in the database
     */
    public async create(createUserDto: CreateUserDto): Promise<GetUserDto> {
        try {
            const { password, ...others } = createUserDto;
            const hashedPassword = await this.passwordService.hashPassword(password);
            const newUser = await this.prismaService.users.create({
                data: { ...others, password: hashedPassword },
                select: this.dbSelectionsWithoutPassword
            }) as GetUserDto;
            return newUser;
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
     * Update user record
     *
     * @param userId User id
     * @param updateUserDto New user details
     * @returns New user data updated in the database
     */
    public async update(
        userId: number,
        updateUserDto: UpdateUserDto,
    ): Promise<GetUserDto | null> {
        try {
            const existingUser = await this.prismaService.users.findUnique({ where: { user_id: userId } }) as GetUserDto;
            if (!existingUser) return null;

            const { password, ...others } = updateUserDto;
            let updatedUser: GetUserDto;
            if (password) {
                const hashedPassword = await this.passwordService.hashPassword(password);
                updatedUser = await this.prismaService.users.update({
                    where: { user_id: userId },
                    data: { ...others, password: hashedPassword },
                    select: this.dbSelectionsWithoutPassword
                }) as GetUserDto;
            }
            else
                updatedUser = await this.prismaService.users.update({
                    where: { user_id: userId },
                    data: updateUserDto,
                    select: this.dbSelectionsWithoutPassword
                }) as GetUserDto;
            return updatedUser;
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
     * Delete user record
     *
     * @param userId User id
     * @returns Status of user deletion
     */
    public async delete(userId: number): Promise<boolean> {
        const existingUser = await this.prismaService.users.findUnique({ where: { user_id: userId } });
        if (!existingUser) return false;
        await this.prismaService.users.delete({ where: { user_id: userId } });
        return true;
    }
}
