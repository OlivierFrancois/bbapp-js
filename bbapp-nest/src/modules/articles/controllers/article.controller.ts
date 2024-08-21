import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ArticleService } from '../services/article.service';
import { Article } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateArticleDto } from '../dtos/create-article.dto';

@ApiTags('Articles')
@Controller('api/article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get('search/by-name')
    async getByName(@Query('name') name: string): Promise<Article[]> {
        return this.articleService.getByName(name);
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<Article> {
        return this.articleService.getById(Number(id));
    }

    @Get()
    async getAll(): Promise<Article[]> {
        return this.articleService.getAll();
    }

    @Post()
    async create(@Body() data: CreateArticleDto): Promise<Article> {
        return this.articleService.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: CreateArticleDto): Promise<Article> {
        return this.articleService.update(Number(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.articleService.delete(Number(id));
    }
}
