import { ArticleController } from './controllers/article.controller';
import { ArticleService } from './services/article.service';
import { PrismaService } from '../../prisma.service';
import { Module } from '@nestjs/common';
import { AppBaseModule } from '../app-base.module';

@Module({
    imports: [AppBaseModule],
    controllers: [ArticleController],
    providers: [ArticleService, PrismaService],
})
export class ArticleModule {}
