import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { CreateArticleCategoryDto } from '../dtos/create-article-category.dto';

@Injectable()
export class ArticleCategoryService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll(homeId: number) {
        return this.prisma.articleCategory.findMany({ where: { homeId } });
    }

    async getById(homeId: number, id: number) {
        return this.prisma.articleCategory.findUnique({
            where: { id, homeId },
        });
    }

    async getByName(homeId: number, name: string) {
        return this.prisma.articleCategory.findMany({
            where: {
                name: { contains: name.toLowerCase() },
                homeId,
            },
        });
    }

    async create(homeId: number, data: CreateArticleCategoryDto) {
        return this.prisma.articleCategory.create({ data: { ...data, homeId } });
    }

    async update(homeId: number, id: number, data: CreateArticleCategoryDto) {
        return this.prisma.articleCategory.update({
            where: { id, homeId },
            data,
        });
    }

    async delete(homeId: number, id: number) {
        await this.prisma.articleCategory.delete({
            where: { id, homeId },
        });
    }
}
