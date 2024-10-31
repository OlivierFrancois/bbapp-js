import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { PrismaService } from '../prisma.service';
import { UserController } from './controllers/user.controller';

@Module({
    providers: [UserService, PrismaService],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule {}
