import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { Article, Prisma } from '@prisma/client';

@Injectable()
export class ArticleService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll(): Promise<Article[]> {
        return this.prisma.article.findMany();
    }

    async getById(id: number): Promise<Article | null> {
        return this.prisma.article.findUnique({
            where: { id },
        });
    }

    async getByName(name: string): Promise<Article[]> {
        return this.prisma.article.findMany({
            where: {
                name: {
                    contains: name.toLowerCase(),
                },
            },
        });
    }

    async create(data: Prisma.ArticleCreateInput, categoryId: number): Promise<Article> {
        return this.prisma.article.create({
            data: {
                ...data,
                category: {
                    connect: {
                        id: categoryId,
                    },
                },
            },
        });
    }

    async update(id: number, data: Prisma.ArticleUpdateInput, categoryId: number): Promise<Article> {
        return this.prisma.article.update({
            where: { id },
            data: {
                ...data,
                category: {
                    connect: {
                        id: categoryId,
                    },
                },
            },
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.article.delete({
            where: { id },
        });
    }
}
