import { Injectable } from '@nestjs/common';
import { Dish, Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma.service';

@Injectable()
export class DishService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll(): Promise<Dish[]> {
        return this.prisma.dish.findMany();
    }

    async getById(id: number): Promise<Dish | null> {
        return this.prisma.dish.findUnique({
            where: { id },
        });
    }

    async getByName(name: string): Promise<Dish[]> {
        return this.prisma.dish.findMany({
            where: {
                name: {
                    contains: name.toLowerCase(),
                },
            },
        });
    }

    async create(data: Prisma.DishCreateInput): Promise<Dish> {
        return this.prisma.dish.create({
            data,
        });
    }

    async update(id: number, data: Prisma.DishUpdateInput): Promise<Dish> {
        return this.prisma.dish.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.dish.delete({
            where: { id },
        });
    }
}
