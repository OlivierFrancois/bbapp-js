import { Controller, Get, Param, Query, Body, Post, Delete, Put } from '@nestjs/common';
import { DishService } from '../services/dish.service';
import { Dish, RecipeItem } from '@prisma/client';
import { CreateDishDto } from '../dtos/create-dish.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateDishWithRecipeDto } from '../dtos/update-dish-with-recipe.dto';

@ApiTags('Dishes')
@Controller('api/dish')
export class DishController {
    constructor(private readonly dishService: DishService) {}

    @Get('search/by-name')
    async getByName(@Query('name') name: string) {
        return this.dishService.getByName(name);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.dishService.getById(Number(id));
    }

    @Get()
    async getAll() {
        return this.dishService.getAllWithDishTagIds();
    }

    @Post()
    async create(@Body() createDishDto: CreateDishDto) {
        console.log('create');
        return this.dishService.create(createDishDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateDishRecipeDto: UpdateDishWithRecipeDto) {
        return this.dishService.update(Number(id), updateDishRecipeDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.dishService.delete(Number(id));
    }
}
