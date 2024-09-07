import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { CreateDishCategoryDto } from '../dtos/create-dish-category.dto';

@Injectable()
export class DishCategoryService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll() {
        return this.prisma.dishCategory.findMany();
    }

    async getById(id: number) {
        return this.prisma.dishCategory.findUnique({
            where: { id },
        });
    }

    async getByName(name: string) {
        return this.prisma.dishCategory.findMany({ where: { name: { contains: name.toLowerCase() } } });
    }

    async create(data: CreateDishCategoryDto) {
        return this.prisma.dishCategory.create({ data });
    }

    async update(id: number, data: CreateDishCategoryDto) {
        return this.prisma.dishCategory.update({
            where: { id },
            data,
        });
    }

    async delete(id: number) {
        await this.prisma.dishCategory.delete({
            where: { id },
        });
    }
}
