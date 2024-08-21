import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ArticleService } from '../services/article.service';
import { Article } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateArticleDto } from '../dtos/create-article.dto';

@ApiTags('Articles')
@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get(':id')
    async get(@Param('id') id: number): Promise<Article> {
        return this.articleService.getById(id);
    }

    @Post()
    async create(@Body() data: CreateArticleDto): Promise<Article> {
        return this.articleService.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() data: CreateArticleDto): Promise<Article> {
        return this.articleService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.articleService.delete(id);
    }
}
