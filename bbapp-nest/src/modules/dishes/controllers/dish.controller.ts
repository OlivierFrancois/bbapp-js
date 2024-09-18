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
    async getByName(@Query('name') name: string): Promise<Dish[]> {
        return this.dishService.getByName(name);
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<Dish | null> {
        return this.dishService.getById(Number(id));
    }

    @Get()
    async getAll(): Promise<Dish[]> {
        return this.dishService.getAllWithDishTagIds();
    }

    @Post(':id/with-recipe')
    async updateWithRecipe(
        @Param('id') id: string,
        @Body() updateDishRecipeDto: UpdateDishWithRecipeDto
    ): Promise<{ dish: Dish; recipeItems: RecipeItem[] }> {
        return this.dishService.updateWithRecipe(Number(id), updateDishRecipeDto);
    }

    @Post()
    async create(@Body() createDishDto: CreateDishDto): Promise<Dish> {
        return this.dishService.create(createDishDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateDishDto: CreateDishDto): Promise<Dish> {
        return this.dishService.update(Number(id), updateDishDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.dishService.delete(Number(id));
    }
}
