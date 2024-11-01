import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../types/jwt.type';
import { UserService } from '../../user/services/user.service';
import { PrismaService } from '../../prisma.service';
import { Session } from '../types/session.type';
import { Role } from '@prisma/client';

@Injectable()
export class SessionService {
    constructor(
        private userService: UserService,
        private prismaService: PrismaService
    ) {}

    async createSessionFromPayload(payload: JwtPayload): Promise<Session> {
        const user = await this.userService.findOne(payload.sub);

        delete user.password;
        delete user.createdAt;
        delete user.updatedAt;

        return {
            user: { ...user, role: user.role as Role },
            userType: payload.userType,
        };
    }
}
