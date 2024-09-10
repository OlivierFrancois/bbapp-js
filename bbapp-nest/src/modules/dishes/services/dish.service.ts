import { Injectable } from '@nestjs/common';
import { Dish, Prisma, RecipeItem } from '@prisma/client';
import { PrismaService } from '../../../prisma.service';
import { UpdateDishWithRecipeDto } from '../dtos/update-dish-with-recipe.dto';
import { CreateDishDto } from '../dtos/create-dish.dto';

@Injectable()
export class DishService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll(): Promise<Dish[]> {
        return this.prisma.dish.findMany();
    }

    async getById(id: number): Promise<Dish | null> {
        return this.prisma.dish.findUnique({
            where: { id },
        });
    }

    async getByName(name: string): Promise<Dish[]> {
        return this.prisma.dish.findMany({
            where: {
                name: {
                    contains: name.toLowerCase(),
                },
            },
        });
    }

    async create(createDishDto: CreateDishDto): Promise<Dish> {
        return this.prisma.dish.create({ data: createDishDto });
    }

    async update(id: number, data: CreateDishDto): Promise<Dish> {
        const { dishTagIds, ...dishData } = data;

        return this.prisma.dish.update({
            where: { id },
            data: {
                ...dishData,
                dishTags: {
                    set: dishTagIds?.map((dishTagId) => ({ id: dishTagId })),
                },
            },
        });
    }

    async updateWithRecipe(id: number, data: UpdateDishWithRecipeDto) {
        const { recipeItems, ...dishData } = data;

        // Mettre à jour le dish
        const dish = await this.update(id, dishData);

        // Vider les recipeItems
        await this.prisma.recipeItem.deleteMany({ where: { dishId: id } });

        // Créer les recipeItems
        if (recipeItems) {
            await this.prisma.recipeItem.createMany({ data: recipeItems.filter((r) => r.dishId === id) });
        }

        return {
            dish: dish,
            recipeItems: await this.prisma.recipeItem.findMany({ where: { dishId: id } }),
            tags: await this.prisma.dishTag.findMany({ where: { dishes: { some: { id } } } }),
        };
    }

    async delete(id: number): Promise<void> {
        await this.prisma.dish.delete({
            where: { id },
        });
    }
}
