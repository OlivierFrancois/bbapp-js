import { Controller, Get, Param, Query, Body, Post, Delete, Patch, Put } from '@nestjs/common';
import { DishService } from '../services/dish.service';
import { Dish } from '@prisma/client';

@Controller('api/dish')
export class DishController {
    constructor(private readonly dishService: DishService) {}

    @Get()
    async getAll(): Promise<Dish[]> {
        return this.dishService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<Dish | null> {
        return this.dishService.getById(Number(id));
    }

    @Get('search/by-name')
    async getByName(@Query('name') name: string): Promise<Dish[]> {
        return this.dishService.getByName(name);
    }

    @Post()
    async create(@Body('name') name: string, @Body('url') url: string, @Body('recipeItems') recipeItemIds: number[]): Promise<Dish> {
        const data = {
            name,
            url,
            recipeItemIds,
        };

        return this.dishService.create(data);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body('name') name: string,
        @Body('url') url: string,
        @Body('recipeItems') recipeItemIds: number[]
    ): Promise<Dish> {
        const data = {
            name,
            url,
            recipeItemIds,
        };

        return this.dishService.update(Number(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.dishService.delete(Number(id));
    }
}
