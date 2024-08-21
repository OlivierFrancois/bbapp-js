import { ArticleController } from './controllers/article.controller';
import { ArticleService } from './services/article.service';
import { PrismaService } from '../../prisma.service';
import { Module } from '@nestjs/common';

@Module({
    controllers: [ArticleController],
    providers: [ArticleService, PrismaService],
})
export class ArticleModule {}
