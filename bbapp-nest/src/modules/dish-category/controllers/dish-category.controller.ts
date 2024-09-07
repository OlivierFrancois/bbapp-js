import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { DishCategoryService } from '../services/dish-category.service';
import { CreateDishCategoryDto } from '../dtos/create-dish-category.dto';

@ApiTags('Dish Categories')
@Controller('api/dish-category')
export class DishCategoryController {
    constructor(private readonly categoryService: DishCategoryService) {}

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
    async create(@Body() data: CreateDishCategoryDto) {
        return this.categoryService.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: CreateDishCategoryDto) {
        return this.categoryService.update(Number(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.categoryService.delete(Number(id));
    }
}
