import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { Article, Prisma } from '@prisma/client';
import { CreateArticleDto } from '../dtos/create-article.dto';

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

    async create(createArticleDto: CreateArticleDto): Promise<Article> {
        const { name, categoryId, sortOrder } = createArticleDto;

        let categoryConnect = undefined;
        if (categoryId) {
            const categoryExists = await this.prisma.articleCategory.findUnique({
                where: { id: categoryId },
            });

            if (categoryExists) {
                categoryConnect = { connect: { id: categoryId } };
            }
        }

        const data: Prisma.ArticleCreateInput = {
            name,
            category: categoryConnect,
            sortOrder,
        };

        return this.prisma.article.create({
            data,
        });
    }

    async update(id: number, updateArticleDto: CreateArticleDto): Promise<Article> {
        const { name, categoryId, sortOrder } = updateArticleDto;

        let categoryConnect = undefined;
        if (categoryId) {
            const categoryExists = await this.prisma.articleCategory.findUnique({
                where: { id: categoryId },
            });

            if (categoryExists) {
                categoryConnect = { connect: { id: categoryId } };
            }
        }

        const data: Prisma.ArticleCreateInput = {
            name,
            category: categoryConnect,
            sortOrder,
        };

        return this.prisma.article.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.article.delete({
            where: { id },
        });
    }
}
