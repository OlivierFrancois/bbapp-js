import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from '../user/user.module';
import { PrismaService } from '../prisma.service';
import { SessionService } from '../auth/services/session.service';

@Module({
    imports: [AuthModule, UserModule],
    exports: [AuthModule, UserModule, PrismaService],
    providers: [PrismaService, SessionService],
})
export class AppBaseModule {}
