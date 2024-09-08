import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { CreateDishTagDto } from '../dtos/create-dish-tag.dto';

@Injectable()
export class DishTagService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll() {
        return this.prisma.dishTag.findMany();
    }

    async getById(id: number) {
        return this.prisma.dishTag.findUnique({
            where: { id },
        });
    }

    async getByName(name: string) {
        return this.prisma.dishTag.findMany({ where: { name: { contains: name.toLowerCase() } } });
    }

    async create(data: CreateDishTagDto) {
        return this.prisma.dishTag.create({ data });
    }

    async update(id: number, data: CreateDishTagDto) {
        return this.prisma.dishTag.update({
            where: { id },
            data,
        });
    }

    async delete(id: number) {
        await this.prisma.dishTag.delete({
            where: { id },
        });
    }
}
