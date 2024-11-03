import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { RecipeItem } from '@prisma/client';
import { CreateRecipeItemDto } from '../dtos/create-recipe-item.dto';

@Injectable()
export class RecipeService {
    constructor(private readonly prisma: PrismaService) {}

    async get(homeId: number, dishId: number, articleId: number) {
        return this.prisma.recipeItem.findUnique({
            where: {
                dishId_articleId: { dishId: dishId, articleId: articleId },
                homeId,
            },
        });
    }

    async getByDish(homeId: number, dishId: number) {
        return this.prisma.recipeItem.findMany({
            where: { dishId, homeId },
        });
    }

    async getByArticle(homeId: number, articleId: number): Promise<RecipeItem[]> {
        return this.prisma.recipeItem.findMany({ where: { articleId, homeId } });
    }

    async save(homeId: number, data: CreateRecipeItemDto): Promise<RecipeItem> {
        return this.prisma.recipeItem.upsert({
            where: { dishId_articleId: { dishId: data.dishId, articleId: data.articleId }, homeId },
            create: { ...data, homeId },
            update: data,
        });
    }

    async deleteByDish(homeId: number, dishId: number): Promise<void> {
        await this.prisma.recipeItem.deleteMany({ where: { dishId: dishId, homeId } });
    }

    async delete(homeId: number, dishId: number, articleId: number): Promise<void> {
        await this.prisma.recipeItem.delete({
            where: {
                dishId_articleId: { dishId: dishId, articleId: articleId },
                homeId,
            },
        });
    }
}
