import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { Article, Prisma } from '@prisma/client';
import { CreateArticleDto } from '../dtos/create-article.dto';

@Injectable()
export class ArticleService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll(homeId: number): Promise<Article[]> {
        return this.prisma.article.findMany({ where: { homeId } });
    }

    async getById(homeId: number, id: number): Promise<Article | null> {
        return this.prisma.article.findUnique({
            where: { id, homeId },
        });
    }

    async getByName(homeId: number, name: string): Promise<Article[]> {
        return this.prisma.article.findMany({
            where: {
                name: { contains: name.toLowerCase() },
                homeId,
            },
        });
    }

    async create(homeId: number, createArticleDto: CreateArticleDto): Promise<Article> {
        const { name, sortOrder } = createArticleDto;
        let { categoryId } = createArticleDto;

        if (categoryId) {
            const categoryExists = await this.prisma.articleCategory.findUnique({
                where: { id: categoryId, homeId },
            });
            if (!categoryExists) categoryId = undefined;
        }

        return this.prisma.article.create({
            data: { homeId, name, categoryId, sortOrder },
        });
    }

    async update(homeId: number, id: number, updateArticleDto: CreateArticleDto): Promise<Article> {
        const { name, sortOrder } = updateArticleDto;
        let { categoryId } = updateArticleDto;

        if (categoryId) {
            const categoryExists = await this.prisma.articleCategory.findUnique({
                where: { id: categoryId, homeId },
            });
            if (!categoryExists) categoryId = undefined;
        }
        return this.prisma.article.update({
            where: { id, homeId },
            data: { name, categoryId, sortOrder },
        });
    }

    async delete(homeId: number, id: number): Promise<void> {
        await this.prisma.article.delete({ where: { id, homeId } });
    }
}
