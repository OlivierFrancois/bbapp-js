import { PrismaService } from '../../prisma.service';
import { Module } from '@nestjs/common';
import { DishTagController } from './controllers/dish-tag.controller';
import { DishTagService } from './services/dish-tag.service';

@Module({
    controllers: [DishTagController],
    providers: [DishTagService, PrismaService],
})
export class DishTagModule {}
