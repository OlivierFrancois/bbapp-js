import { PrismaService } from '../../prisma.service';
import { Module } from '@nestjs/common';
import { DishCategoryController } from './controllers/dish-category.controller';
import { DishCategoryService } from './services/dish-category.service';

@Module({
    controllers: [DishCategoryController],
    providers: [DishCategoryService, PrismaService],
})
export class DishCategoryModule {}
