import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ArticleCategoryService } from '../services/article-category.service';
import { CreateArticleCategoryDto } from '../dtos/create-article-category.dto';

@ApiTags('Categories')
@Controller('api/category')
export class ArticleCategoryController {
    constructor(private readonly categoryService: ArticleCategoryService) {}

    @Get('search/by-name')
    async getByName(@Query('name') name: string) {
        return this.categoryService.getByName(name);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.categoryService.getById(Number(id));
    }

    @Get()
    async getAll() {
        return this.categoryService.getAll();
    }

    @Post()
    async create(@Body() data: CreateArticleCategoryDto) {
        return this.categoryService.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: CreateArticleCategoryDto) {
        return this.categoryService.update(Number(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.categoryService.delete(Number(id));
    }
}
