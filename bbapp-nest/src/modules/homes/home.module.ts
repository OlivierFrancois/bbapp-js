import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { AppBaseModule } from '../app-base.module';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';

@Module({
    imports: [AppBaseModule],
    controllers: [HomeController],
    providers: [HomeService, PrismaService],
})
export class HomeModule {}
