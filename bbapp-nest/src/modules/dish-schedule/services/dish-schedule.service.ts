import { Injectable } from '@nestjs/common';
import { DishScheduleItem, Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma.service';
import { AddDishDto } from '../dtos/add-dish.dto';

@Injectable()
export class DishScheduleService {
    constructor(private readonly prisma: PrismaService) {}

    async getById(id: number): Promise<DishScheduleItem | null> {
        return this.prisma.dishScheduleItem.findUnique({
            where: { id },
        });
    }

    async getPeriod(startDate: string, endDate: string): Promise<DishScheduleItem[]> {
        return this.prisma.dishScheduleItem.findMany({
            where: {
                date: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
            },
            include: {
                dishes: true, // Charge les relations avec les plats associés
            },
        });
    }

    async add(data: AddDishDto) {
        return this.prisma.dishScheduleItem.upsert({
            where: { date_moment: { date: data.date, moment: data.moment } },
            update: { dishes: { connect: [{ id: data.dishId }] } },
            create: { date: data.date, moment: data.moment, dishes: { connect: [{ id: data.dishId }] } },
        });
    }

    async remove(data: AddDishDto) {
        return this.prisma.dishScheduleItem.update({
            where: { date_moment: { date: data.date, moment: data.moment } },
            data: { dishes: { disconnect: [{ id: data.dishId }] } },
        });
    }

    async save(data: Prisma.DishScheduleItemCreateInput, dishIds: number[]): Promise<DishScheduleItem> {
        const existingItem = await this.prisma.dishScheduleItem.findFirst({
            where: { date: data.date, moment: data.moment },
        });

        const dishScheduleItem = existingItem
            ? await this.prisma.dishScheduleItem.update({
                  where: { id: existingItem.id },
                  data,
              })
            : await this.prisma.dishScheduleItem.create({
                  data,
              });

        await this.prisma.dishScheduleItem.update({
            where: { id: dishScheduleItem.id },
            data: {
                dishes: {
                    set: dishIds.map((id) => ({ id })),
                },
            },
        });

        return dishScheduleItem;
    }
}
