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
        const user = await this.prismaService.user.findFirst({
            where: { id: payload.sub },
            include: { home: true },
        });
        const { home } = user;

        delete user.password;
        delete user.createdAt;
        delete user.updatedAt;
        delete user.home;

        return {
            user: { ...user, role: user.role as Role },
            userType: payload.userType,
            home,
        };
    }

    retrieveSessionFromRequest(request: any) {
        return request.userSession as Session;
    }
}
