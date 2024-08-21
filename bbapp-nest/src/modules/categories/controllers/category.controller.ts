import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { Category } from '@prisma/client';
import { CreateCategoryDto } from '../dtos/create-category.dto';

@ApiTags('Categories')
@Controller('api/category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get(':id')
    async get(@Param('id') id: string): Promise<Category> {
        return this.categoryService.getById(Number(id));
    }

    @Post()
    async create(@Body() data: CreateCategoryDto): Promise<Category> {
        return this.categoryService.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: CreateCategoryDto): Promise<Category> {
        return this.categoryService.update(Number(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.categoryService.delete(Number(id));
    }
}
