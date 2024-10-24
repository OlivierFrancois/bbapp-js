import { Controller, Get, Param, Query, Body, Post } from '@nestjs/common';
import { DishScheduleService } from '../services/dish-schedule.service';
import { DishScheduleItem } from '@prisma/client';
import { CreateDishScheduleDto } from '../dtos/create-dish-schedule.dto';
import { ApiTags } from '@nestjs/swagger';
import { AddDishDto } from '../dtos/add-dish.dto';

@ApiTags('Dish schedule')
@Controller('api/dish-schedule')
export class DishScheduleController {
    constructor(private readonly dishScheduleService: DishScheduleService) {}

    @Get('period')
    async getPeriod(@Query('startDate') startDate: string, @Query('endDate') endDate: string): Promise<DishScheduleItem[]> {
        return this.dishScheduleService.getPeriod(startDate, endDate);
    }

    @Get(':id')
    async get(@Param('id') id: string): Promise<DishScheduleItem | null> {
        return this.dishScheduleService.getById(Number(id));
    }

    @Post('/save')
    async save(@Body() createDishScheduleDto: CreateDishScheduleDto): Promise<DishScheduleItem> {
        const { date, moment, dishIds } = createDishScheduleDto;
        return this.dishScheduleService.save({ date, moment }, dishIds);
    }

    @Post('/add')
    async add(@Body() addDishDto: AddDishDto): Promise<DishScheduleItem> {
        return this.dishScheduleService.add(addDishDto);
    }
    @Post('/remove')
    async remove(@Body() addDishDto: AddDishDto): Promise<DishScheduleItem> {
        return this.dishScheduleService.remove(addDishDto);
    }
}
