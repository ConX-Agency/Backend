import { Injectable } from '@nestjs/common';
import { PasswordService, PrismaService } from '../../common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CustomThrowError } from '../../common/controller/config';
import { CreateUserDto, GetUserDto, LoginDto, LoginUserDataDto, UpdateUserDto } from '../model/users.dto';
import { Users } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

enum USER_TYPES {
    ADMIN = "Admin",
    CLIENT = "Client",
    INFLUENCER = "Influencer",
}

@Injectable()
export class UsersService {
    private static DB_GET_SELECTIONS: object = {
        user_id: true,
        full_name: true,
        preferred_name: true,
        contact_number: true,
        email_address: true,
        type: true,
        username: true,
        password: false
    }
    public static USER_TYPES = USER_TYPES;

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
                select: UsersService.DB_GET_SELECTIONS
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
                select: UsersService.DB_GET_SELECTIONS
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
    public async create(createUserDto: CreateUserDto, userType: USER_TYPES): Promise<GetUserDto> {
        try {
            const { password, ...others } = createUserDto;
            const hashedPassword = await this.passwordService.hashPassword(password);
            const newUser = await this.prismaService.users.create({
                data: { ...others, password: hashedPassword, type: userType },
                select: UsersService.DB_GET_SELECTIONS
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
                    select: UsersService.DB_GET_SELECTIONS
                }) as GetUserDto;
            }
            else
                updatedUser = await this.prismaService.users.update({
                    where: { user_id: userId },
                    data: updateUserDto,
                    select: UsersService.DB_GET_SELECTIONS
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
     * Update user record (only for admin)
     *
     * @param userId User id
     * @param updateUserDto New user details
     * @param userType New user type
     * @returns New user data updated in the database
     */
    public async adminUpdate(
        userId: number,
        updateUserDto: UpdateUserDto,
        userType: USER_TYPES | null = null,
    ): Promise<GetUserDto | null> {
        try {
            const existingUser = await this.prismaService.users.findUnique({ where: { user_id: userId } }) as GetUserDto;
            if (!existingUser) return null;

            const { password, ...others } = updateUserDto;
            let updatedUser: GetUserDto;
            if (password) {
                const hashedPassword = await this.passwordService.hashPassword(password);
                if (userType)
                    updatedUser = await this.prismaService.users.update({
                        where: { user_id: userId },
                        data: { ...others, password: hashedPassword, type: userType },
                        select: UsersService.DB_GET_SELECTIONS
                    }) as GetUserDto;
                else
                    updatedUser = await this.prismaService.users.update({
                        where: { user_id: userId },
                        data: { ...others, password: hashedPassword },
                        select: UsersService.DB_GET_SELECTIONS
                    }) as GetUserDto;
            }
            else
                if (userType)
                    updatedUser = await this.prismaService.users.update({
                        where: { user_id: userId },
                        data: { ...updateUserDto, type: userType },
                        select: UsersService.DB_GET_SELECTIONS
                    }) as GetUserDto;
                else
                    updatedUser = await this.prismaService.users.update({
                        where: { user_id: userId },
                        data: updateUserDto,
                        select: UsersService.DB_GET_SELECTIONS
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

    /**
     * Handle user's login
     * 
     * @param loginDto User login details
     * @param userType User type
     * @returns User details (in signed JWT)
     */
    public async login(loginDto: LoginDto, userType: USER_TYPES | null = null): Promise<LoginUserDataDto> {
        try {
            const user = await this.prismaService.users.findFirst({ where: { username: loginDto.username } }) as Users;
            if (!user || user.type !== userType) throw new CustomThrowError(
                "0",
                "User not found with the username!",
            );
            const isValidatePassword = await this.passwordService.validatePassword(loginDto.password, user.password);
            if (isValidatePassword) {
                const userData = {
                    user_id: user.user_id,
                    full_name: user.full_name,
                    preferred_name: user.preferred_name,
                    contact_number: user.contact_number,
                    email_address: user.email_address,
                    username: user.username,
                    type: user.type
                } as GetUserDto;
                const token = jwt.sign({ userData }, `${process.env.JWT_SECRET}`, {
                    algorithm: 'HS256',
                    issuer: `${process.env.JWT_ISSUER}`,
                    expiresIn: 3600
                });
                return {
                    token,
                    userData
                };
            } else {
                throw new CustomThrowError(
                    "0",
                    "Invalid password for the user!",
                );
            }
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
}
