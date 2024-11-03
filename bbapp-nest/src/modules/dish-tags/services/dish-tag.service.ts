import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { CreateDishTagDto } from '../dtos/create-dish-tag.dto';

@Injectable()
export class DishTagService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll(homeId: number) {
        return this.prisma.dishTag.findMany({ where: { homeId } });
    }

    async getById(homeId: number, id: number) {
        return this.prisma.dishTag.findUnique({
            where: { id, homeId },
        });
    }

    async getByName(homeId: number, name: string) {
        return this.prisma.dishTag.findMany({ where: { name: { contains: name.toLowerCase() }, homeId } });
    }

    async create(homeId: number, data: CreateDishTagDto) {
        return this.prisma.dishTag.create({ data: { ...data, homeId } });
    }

    async update(homeId: number, id: number, data: CreateDishTagDto) {
        return this.prisma.dishTag.update({
            where: { id, homeId },
            data,
        });
    }

    async delete(homeId: number, id: number) {
        await this.prisma.dishTag.delete({
            where: { id, homeId },
        });
    }
}
