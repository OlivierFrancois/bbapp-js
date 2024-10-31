import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './auth.constants';
import * as fs from 'fs';
import { join } from 'path';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { IS_ADMIN_KEY } from './decorators/admin.decorator';
import { UserService } from '../user/services/user.service';
import { JwtPayload } from './types/jwt.type';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
        private readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
        const isAdmin = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [context.getHandler(), context.getClass()]);

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
                secret: fs.readFileSync(join(process.cwd(), jwtConstants.secretPath)).toString(),
            });

            const user = await this.userService.findOne(payload.sub);

            if (isAdmin && user.role !== 'ADMIN') {
                throw new UnauthorizedException();
            }

            console.log(payload, user);
            request.userSession = payload;
        } catch (e) {
            if (e instanceof TokenExpiredError) {
                throw new HttpException('Token expired', 498);
            } else {
                throw new UnauthorizedException();
            }
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
