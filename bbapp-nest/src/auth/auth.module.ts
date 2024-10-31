import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { jwtConstants } from './auth.constants';
import * as fs from 'fs';
import { join } from 'path';
import { PrismaService } from '../prisma.service';

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            privateKey: fs.readFileSync(join(process.cwd(), jwtConstants.secretPath)).toString(),
            publicKey: fs.readFileSync(join(process.cwd(), jwtConstants.secretPath)).toString(),
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [AuthService, PrismaService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
