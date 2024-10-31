import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcrypt';

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
            where: { username: { contains: username } },
        });
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
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

    async encodePassword(plainPassword: string): Promise<string> {
        return bcrypt.hash(plainPassword, this.saltOrRounds);
    }

    async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}
