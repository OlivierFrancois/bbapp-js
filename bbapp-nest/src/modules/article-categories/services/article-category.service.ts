import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { CreateArticleCategoryDto } from '../dtos/create-article-category.dto';

@Injectable()
export class ArticleCategoryService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll() {
        return this.prisma.articleCategory.findMany();
    }

    async getById(id: number) {
        return this.prisma.articleCategory.findUnique({
            where: { id },
        });
    }

    async getByName(name: string) {
        return this.prisma.articleCategory.findMany({
            where: {
                name: {
                    contains: name.toLowerCase(),
                },
            },
        });
    }

    async create(data: CreateArticleCategoryDto) {
        return this.prisma.articleCategory.create({ data });
    }

    async update(id: number, data: CreateArticleCategoryDto) {
        return this.prisma.articleCategory.update({
            where: { id },
            data,
        });
    }

    async delete(id: number) {
        await this.prisma.articleCategory.delete({
            where: { id },
        });
    }
}
