import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ArticleCategoryService } from '../services/article-category.service';
import { CreateArticleCategoryDto } from '../dtos/create-article-category.dto';
import { AbstractController } from '../../app.abstract.controller';

@ApiTags('Article categories')
@Controller('api/article-category')
export class ArticleCategoryController extends AbstractController {
    constructor(private readonly categoryService: ArticleCategoryService) {
        super();
    }

    @Get('search/by-name')
    async getByName(@Query('name') name: string) {
        return this.categoryService.getByName(this.home.id, name);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.categoryService.getById(this.home.id, Number(id));
    }

    @Get()
    async getAll() {
        return this.categoryService.getAll(this.home.id);
    }

    @Post()
    async create(@Body() data: CreateArticleCategoryDto) {
        return this.categoryService.create(this.home.id, data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: CreateArticleCategoryDto) {
        return this.categoryService.update(this.home.id, Number(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.categoryService.delete(this.home.id, Number(id));
    }
}
