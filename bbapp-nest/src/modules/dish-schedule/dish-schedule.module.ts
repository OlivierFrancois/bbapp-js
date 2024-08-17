import { Module } from '@nestjs/common';
import { DishScheduleController } from './controllers/dish-schedule.controller';
import { DishScheduleService } from './services/dish-schedule.service';
import { PrismaService } from '../../prisma.service';

@Module({
    controllers: [DishScheduleController],
    providers: [DishScheduleService, PrismaService],
})
export class DishScheduleModule {}
