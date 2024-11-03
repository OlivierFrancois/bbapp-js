import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from '../dtos/create-user.dto';
import { UpdateUserPasswordDto } from '../dtos/update-user-password.dto';

@Injectable()
export class UserService {
    saltOrRounds = 10;
    constructor(private readonly prismaService: PrismaService) {}

    async findOne(id: number): Promise<User | undefined> {
        return this.prismaService.user.findFirst({
            where: { id },
        });
    }

    async findByUsername(username: string): Promise<User | undefined> {
        return this.prismaService.user.findFirst({
            where: { username },
        });
    }

    async create(data: UserCreateDto): Promise<User> {
        const plainPassword = data.password;
        data.password = await this.encodePassword(plainPassword);

        return this.prismaService.user.create({ data });
    }

    async update(username: string, data: Prisma.UserUpdateInput): Promise<User> {
        return this.prismaService.user.update({
            where: { username },
            data,
        });
    }

    async updatePassword(userId: number, data: UpdateUserPasswordDto): Promise<User> {
        const user = await this.findOne(userId);
        if (!user) {
            throw ForbiddenException;
        }
        const isOldPasswordValid = await this.comparePassword(data.oldPassword, user.password);
        if (!isOldPasswordValid) {
            throw ForbiddenException;
        }

        const newPassword = await this.encodePassword(data.newPassword);
        return this.prismaService.user.update({
            where: { id: userId },
            data: { password: newPassword },
        });
    }

    async encodePassword(plainPassword: string): Promise<string> {
        return bcrypt.hash(plainPassword, this.saltOrRounds);
    }

    async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}
