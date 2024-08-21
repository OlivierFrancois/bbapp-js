import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { RecipeItem } from '@prisma/client';
import { CreateRecipeItemDto } from '../dtos/create-recipe-item.dto';

@Injectable()
export class RecipeService {
    constructor(private readonly prisma: PrismaService) {}

    async get(dishId: number, articleId: number): Promise<RecipeItem | null> {
        return this.prisma.recipeItem.findUnique({
            where: {
                dishId_articleId: {
                    dishId: dishId,
                    articleId: articleId,
                },
            },
        });
    }

    async getByDish(dishId: number): Promise<RecipeItem[]> {
        return this.prisma.recipeItem.findMany({
            where: {
                dishId: { equals: dishId },
            },
        });
    }

    async getByArticle(articleId: number): Promise<RecipeItem[]> {
        return this.prisma.recipeItem.findMany({
            where: {
                articleId: { equals: articleId },
            },
        });
    }

    async save(data: CreateRecipeItemDto): Promise<RecipeItem> {
        return this.prisma.recipeItem.upsert({
            where: { dishId_articleId: { dishId: data.dishId, articleId: data.articleId } },
            create: data,
            update: data,
        });
    }

    async delete(dishId: number, articleId: number): Promise<void> {
        await this.prisma.recipeItem.delete({
            where: {
                dishId_articleId: {
                    dishId: dishId,
                    articleId: articleId,
                },
            },
        });
    }
}
