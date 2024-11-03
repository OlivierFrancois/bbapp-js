import { Controller, Get, Param, Query, Body, Post, Delete, Put, ForbiddenException } from '@nestjs/common';
import { DishService } from '../services/dish.service';
import { CreateDishDto } from '../dtos/create-dish.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateDishWithRecipeDto } from '../dtos/update-dish-with-recipe.dto';
import { AbstractController } from '../../app.abstract.controller';

@ApiTags('Dishes')
@Controller('api/dish')
export class DishController extends AbstractController {
    constructor(private readonly dishService: DishService) {
        super();
        if (!this.home) throw new ForbiddenException();
    }

    @Get('search/by-name')
    async getByName(@Query('name') name: string) {
        return this.dishService.getByName(this.home.id, name);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.dishService.getById(this.home.id, Number(id));
    }

    @Get()
    async getAll() {
        return this.dishService.getAllWithDishTagIds(this.home.id);
    }

    @Post()
    async create(@Body() createDishDto: CreateDishDto) {
        return this.dishService.create(this.home.id, createDishDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateDishRecipeDto: UpdateDishWithRecipeDto) {
        return this.dishService.update(this.home.id, Number(id), updateDishRecipeDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.dishService.delete(this.home.id, Number(id));
    }
}
