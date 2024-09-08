import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { DishTagService } from '../services/dish-tag.service';
import { CreateDishTagDto } from '../dtos/create-dish-tag.dto';

@ApiTags('Dish tags')
@Controller('api/dish-tag')
export class DishTagController {
    constructor(private readonly categoryService: DishTagService) {}

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
    async create(@Body() data: CreateDishTagDto) {
        return this.categoryService.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: CreateDishTagDto) {
        return this.categoryService.update(Number(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.categoryService.delete(Number(id));
    }
}
