import { ArticleCategoryController } from './controllers/article-category.controller';
import { ArticleCategoryService } from './services/article-category.service';
import { PrismaService } from '../../prisma.service';
import { Module } from '@nestjs/common';
import { AppBaseModule } from '../app-base.module';

@Module({
    imports: [AppBaseModule],
    controllers: [ArticleCategoryController],
    providers: [ArticleCategoryService, PrismaService],
})
export class ArticleCategoryModule {}
