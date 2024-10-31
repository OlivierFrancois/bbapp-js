import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import { SignInDto } from '../dtos/sign-in.dto';
import { JwtPayload } from '../types/jwt.type';
import * as fs from 'fs';
import { join } from 'path';
import { jwtConstants } from '../auth.constants';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService
    ) {}

    async signIn(signInDto: SignInDto, ip: string) {
        const { username, password } = signInDto;
        const user = await this.userService.findByUsername(username);
        const isPasswordValid = user !== null && (await this.userService.comparePassword(password, user.password));

        if (!isPasswordValid) {
            throw new UnauthorizedException();
        }

        await this.logUserAuth({ userId: user.id, ip });

        const jwtPayload: JwtPayload = {
            sub: user.id,
            username: user.username,
            userType: null,
        };

        return this.generateJwtToken(jwtPayload);
    }

    async logUserAuth({ userId, ip }: { userId: number; ip: string }): Promise<void> {
        await this.prismaService.userAuthLog.create({
            data: {
                at: new Date(),
                user: { connect: { id: userId } },
                ip,
            },
        });
    }

    async generateJwtToken(payload: JwtPayload): Promise<string> {
        return await this.jwtService.signAsync(payload, {
            privateKey: fs.readFileSync(join(process.cwd(), jwtConstants.secretPath)).toString(),
            expiresIn: '12h',
            algorithm: 'RS256',
        });
    }
}
