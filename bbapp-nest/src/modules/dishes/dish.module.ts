import { Module } from '@nestjs/common';
import { DishController } from './controllers/dish.controller';
import { DishService } from './services/dish.service';
import { PrismaService } from '../../prisma.service';

@Module({
    controllers: [DishController],
    providers: [DishService, PrismaService],
})
export class DishModule {}
