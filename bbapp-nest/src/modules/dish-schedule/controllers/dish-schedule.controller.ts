import { Controller, Get, Param, Query, Body, Post, ForbiddenException } from '@nestjs/common';
import { DishScheduleService } from '../services/dish-schedule.service';
import { DishScheduleItem } from '@prisma/client';
import { CreateDishScheduleDto } from '../dtos/create-dish-schedule.dto';
import { ApiTags } from '@nestjs/swagger';
import { AddDishDto } from '../dtos/add-dish.dto';
import { AbstractController } from '../../app.abstract.controller';

@ApiTags('Dish schedule')
@Controller('api/dish-schedule')
export class DishScheduleController extends AbstractController {
    constructor(private readonly dishScheduleService: DishScheduleService) {
        super();
    }

    @Get('period')
    async getPeriod(@Query('startDate') startDate: string, @Query('endDate') endDate: string): Promise<DishScheduleItem[]> {
        return this.dishScheduleService.getPeriod(this.home.id, startDate, endDate);
    }

    @Get(':id')
    async get(@Param('id') id: string): Promise<DishScheduleItem | null> {
        return this.dishScheduleService.getById(Number(id));
    }

    @Post('/save')
    async save(@Body() createDishScheduleDto: CreateDishScheduleDto): Promise<DishScheduleItem> {
        return this.dishScheduleService.save(this.home.id, createDishScheduleDto);
    }

    @Post('/add')
    async add(@Body() addDishDto: AddDishDto): Promise<DishScheduleItem> {
        return this.dishScheduleService.add(this.home.id, addDishDto);
    }
    @Post('/remove')
    async remove(@Body() addDishDto: AddDishDto): Promise<DishScheduleItem> {
        return this.dishScheduleService.remove(this.home.id, addDishDto);
    }
}
