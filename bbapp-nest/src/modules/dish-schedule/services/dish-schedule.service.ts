import { Injectable } from '@nestjs/common';
import { DishScheduleItem } from '@prisma/client';
import { PrismaService } from '../../../prisma.service';
import { AddDishDto } from '../dtos/add-dish.dto';
import { CreateDishScheduleDto } from '../dtos/create-dish-schedule.dto';

@Injectable()
export class DishScheduleService {
    constructor(private readonly prisma: PrismaService) {}

    async getById(id: number): Promise<DishScheduleItem | null> {
        return this.prisma.dishScheduleItem.findUnique({
            where: { id },
        });
    }

    async getPeriod(homeId: number, startDate: string, endDate: string): Promise<DishScheduleItem[]> {
        return this.prisma.dishScheduleItem.findMany({
            where: {
                date: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
                homeId,
            },
            include: {
                dishes: true, // Charge les relations avec les plats associés
            },
        });
    }

    async add(homeId: number, data: AddDishDto) {
        return this.prisma.dishScheduleItem.upsert({
            where: { date_moment: { date: data.date, moment: data.moment }, homeId },
            update: { dishes: { connect: [{ id: data.dishId }] } },
            create: { date: data.date, moment: data.moment, dishes: { connect: [{ id: data.dishId }] }, homeId },
        });
    }

    async remove(homeId: number, data: AddDishDto) {
        return this.prisma.dishScheduleItem.update({
            where: { date_moment: { date: data.date, moment: data.moment }, homeId },
            data: { dishes: { disconnect: [{ id: data.dishId }] } },
        });
    }

    async save(homeId: number, data: CreateDishScheduleDto): Promise<DishScheduleItem> {
        const { date, moment, dishIds } = data;

        const existingItem = await this.prisma.dishScheduleItem.findFirst({
            where: { date: data.date, moment: data.moment, homeId },
        });

        return existingItem
            ? this.prisma.dishScheduleItem.update({
                  where: { id: existingItem.id, homeId },
                  data: {
                      date,
                      moment,
                      dishes: { set: dishIds.map((id) => ({ id })) },
                  },
              })
            : this.prisma.dishScheduleItem.create({
                  data: {
                      homeId,
                      date,
                      moment,
                      dishes: { connect: dishIds.map((id) => ({ id })) },
                  },
              });
    }
}
