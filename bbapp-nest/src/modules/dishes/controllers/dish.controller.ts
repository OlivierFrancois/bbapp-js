import { Controller, Get, Param, Query, Body, Post, Delete, Put } from '@nestjs/common';
import { DishService } from '../services/dish.service';
import { CreateDishDto } from '../dtos/create-dish.dto';
import { ApiTags } from '@nestjs/swagger';
import { AbstractController } from '../../app.abstract.controller';
import { UpdateDishDto } from '../dtos/update-dish.dto';

@ApiTags('Dishes')
@Controller('api/dish')
export class DishController extends AbstractController {
    constructor(private readonly dishService: DishService) {
        super();
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
    async update(@Param('id') id: string, @Body() dto: UpdateDishDto) {
        return this.dishService.update(this.home.id, Number(id), dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.dishService.delete(this.home.id, Number(id));
    }
}
