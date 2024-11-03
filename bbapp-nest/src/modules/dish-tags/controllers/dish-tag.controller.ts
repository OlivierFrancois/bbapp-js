import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, Query } from '@nestjs/common';
import { DishTagService } from '../services/dish-tag.service';
import { CreateDishTagDto } from '../dtos/create-dish-tag.dto';
import { AbstractController } from '../../app.abstract.controller';

@ApiTags('Dish tags')
@Controller('api/dish-tag')
export class DishTagController extends AbstractController {
    constructor(private readonly categoryService: DishTagService) {
        super();
    }

    @Get('search/by-name')
    async getByName(@Query('name') name: string) {
        return this.categoryService.getByName(this.home.id, name);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.categoryService.getById(this.home.id, Number(id));
    }

    @Get()
    async getAll() {
        return this.categoryService.getAll(this.home.id);
    }

    @Post()
    async create(@Body() data: CreateDishTagDto) {
        return this.categoryService.create(this.home.id, data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: CreateDishTagDto) {
        return this.categoryService.update(this.home.id, Number(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.categoryService.delete(this.home.id, Number(id));
    }
}
