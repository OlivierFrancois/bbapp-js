import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { Category, Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll(): Promise<Category[]> {
        return this.prisma.category.findMany();
    }

    async getById(id: number): Promise<Category | null> {
        return this.prisma.category.findUnique({
            where: { id },
        });
    }

    async getByName(name: string): Promise<Category[]> {
        return this.prisma.category.findMany({
            where: {
                name: {
                    contains: name.toLowerCase(),
                },
            },
        });
    }

    async create(data: Prisma.CategoryCreateInput): Promise<Category> {
        return this.prisma.category.create({ data });
    }

    async update(id: number, data: Prisma.CategoryCreateInput): Promise<Category> {
        return this.prisma.category.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.category.delete({
            where: { id },
        });
    }
}
