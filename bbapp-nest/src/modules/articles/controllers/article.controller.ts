import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ArticleService } from '../services/article.service';
import { Article } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { AbstractController } from '../../app.abstract.controller';

@ApiTags('Articles')
@Controller('api/article')
export class ArticleController extends AbstractController {
    constructor(private readonly articleService: ArticleService) {
        super();
        if (!this.home) throw new ForbiddenException();
    }

    @Get('search/by-name')
    async getByName(@Query('name') name: string): Promise<Article[]> {
        return this.articleService.getByName(this.home.id, name);
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<Article> {
        return this.articleService.getById(this.home.id, Number(id));
    }

    @Get()
    async getAll(): Promise<Article[]> {
        return this.articleService.getAll(this.home.id);
    }

    @Post()
    async create(@Body() data: CreateArticleDto): Promise<Article> {
        return this.articleService.create(this.home.id, data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: CreateArticleDto): Promise<Article> {
        return this.articleService.update(this.home.id, Number(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.articleService.delete(this.home.id, Number(id));
    }
}
