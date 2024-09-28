import { Injectable } from '@nestjs/common';
import { Dish, DishTag, Prisma, RecipeItem } from '@prisma/client';
import { PrismaService } from '../../../prisma.service';
import { UpdateDishWithRecipeDto } from '../dtos/update-dish-with-recipe.dto';
import { CreateDishDto } from '../dtos/create-dish.dto';

@Injectable()
export class DishService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll(): Promise<Dish[]> {
        return this.prisma.dish.findMany();
    }

    async getAllWithDishTagIds() {
        const dishes = await this.prisma.dish.findMany({ include: { dishTags: true } });
        return dishes.map((dish) => ({
            ...dish,
            dishTags: undefined,
            dishTagIds: dish.dishTags.map((dt) => dt.id),
        }));
    }

    async parseWithDishTagIds(dish: Dish & { dishTags: DishTag[] }) {
        return {
            ...dish,
            dishTags: undefined,
            dishTagIds: dish.dishTags.map((dt) => dt.id),
        };
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

    async create(createDishDto: CreateDishDto) {
        const { dishTagIds, ...data } = createDishDto;

        const dish = await this.prisma.dish.create({
            data: {
                ...data,
                dishTags: {
                    connect: dishTagIds.map((id) => ({ id: id })),
                },
            },
            include: { dishTags: true },
        });

        return {
            ...dish,
            dishTags: undefined,
            dishTagIds: dish.dishTags.map((dt) => dt.id),
        };
    }

    async update(id: number, data: UpdateDishWithRecipeDto) {
        const { recipeItems, dishTagIds, ...dishData } = data;

        const dish = await this.prisma.dish.update({
            where: { id },
            data: {
                ...dishData,
                dishTags: {
                    set: dishTagIds?.map((dishTagId) => ({ id: dishTagId })),
                },
            },
            include: { dishTags: true, recipeItems: true },
        });

        // Vider les recipeItems
        await this.prisma.recipeItem.deleteMany({ where: { dishId: id } });

        // Créer les recipeItems
        if (recipeItems) {
            await this.prisma.recipeItem.createMany({ data: recipeItems.filter((r) => r.dishId === id) });
        }

        return { dish, recipeItems: dish.recipeItems };
    }

    async delete(id: number): Promise<void> {
        await this.prisma.dish.delete({
            where: { id },
        });
    }
}
