import { Controller, Get, Param, Query, Body, Post } from '@nestjs/common';
import { DishScheduleService } from '../services/dish-schedule.service';
import { DishScheduleItem } from '@prisma/client';

@Controller('dish-schedule')
export class DishScheduleController {
    constructor(private readonly dishScheduleService: DishScheduleService) {}

    @Get(':id')
    async get(@Param('id') id: string): Promise<DishScheduleItem | null> {
        return this.dishScheduleService.getById(Number(id));
    }

    @Get('period')
    async getPeriod(@Query('startDate') startDate: string, @Query('endDate') endDate: string): Promise<DishScheduleItem[]> {
        return this.dishScheduleService.getPeriod(startDate, endDate);
    }

    @Post()
    async save(@Body('date') date: string, @Body('moment') moment: 'midi' | 'soir', @Body('dishIds') dishIds: number[]): Promise<DishScheduleItem> {
        return this.dishScheduleService.save({ date, moment }, dishIds);
    }
}
