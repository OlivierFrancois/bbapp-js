import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { PrismaService } from '../../prisma.service';
import { Module } from '@nestjs/common';

@Module({
    controllers: [CategoryController],
    providers: [CategoryService, PrismaService],
})
export class CategoryModule {}
