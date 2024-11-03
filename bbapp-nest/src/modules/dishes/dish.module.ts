import { Module } from '@nestjs/common';
import { DishController } from './controllers/dish.controller';
import { DishService } from './services/dish.service';
import { PrismaService } from '../../prisma.service';
import { AppBaseModule } from '../app-base.module';

@Module({
    imports: [AppBaseModule],
    controllers: [DishController],
    providers: [DishService, PrismaService],
})
export class DishModule {}
