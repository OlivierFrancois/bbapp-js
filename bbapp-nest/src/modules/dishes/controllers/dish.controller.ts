import { Controller, Get, Param, Query, Body, Post, Delete, Put } from '@nestjs/common';
import { DishService } from '../services/dish.service';
import { Dish } from '@prisma/client';
import { CreateDishDto } from '../dtos/create-dish.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dishes')
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
