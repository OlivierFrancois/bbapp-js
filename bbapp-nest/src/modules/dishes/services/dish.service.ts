import { Injectable } from '@nestjs/common';
import { Dish } from '@prisma/client';
import { PrismaService } from '../../../prisma.service';
import { UpdateDishWithRecipeDto } from '../dtos/update-dish-with-recipe.dto';
import { CreateDishDto } from '../dtos/create-dish.dto';
import { UpdateDishDto } from '../dtos/update-dish.dto';

@Injectable()
export class DishService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll(homeId: number): Promise<Dish[]> {
        return this.prisma.dish.findMany({ where: { homeId } });
    }

    async getAllWithDishTagIds(homeId: number) {
        const dishes = await this.prisma.dish.findMany({ where: { homeId }, include: { dishTags: true } });
        return dishes.map((dish) => ({
            ...dish,
            dishTags: undefined,
            dishTagIds: dish.dishTags.map((dt) => dt.id),
        }));
    }

    async getById(homeId: number, id: number) {
        return this.prisma.dish.findUnique({
            where: { id, homeId },
            include: { recipeItems: true },
        });
    }

    async getByName(homeId: number, name: string): Promise<Dish[]> {
        return this.prisma.dish.findMany({
            where: { name: { contains: name.toLowerCase() }, homeId },
        });
    }

    async getStats(homeId: number, dishId: number) {
        const relatedScheduleItems = await this.prisma.dishScheduleItem.findMany({
            where: { homeId, dishes: { some: { id: dishId } } },
        });

        return { countUses: relatedScheduleItems.length };
    }

    async create(homeId: number, createDishDto: CreateDishDto) {
        const { dishTagIds, ...data } = createDishDto;

        const dish = await this.prisma.dish.create({
            data: {
                ...data,
                dishTags: {
                    connect: dishTagIds?.map((id) => ({ id: id })) ?? [],
                },
                homeId,
            },
            include: { dishTags: true },
        });

        return {
            ...dish,
            dishTags: undefined,
            dishTagIds: dish.dishTags.map((dt) => dt.id),
        };
    }

    async update(homeId: number, id: number, data: UpdateDishDto) {
        const { recipeItems, ...dishData } = data;

        const dish = await this.prisma.dish.update({
            where: { id, homeId },
            data: { ...dishData },
            include: { recipeItems: true },
        });

        // Vider les recipeItems
        if (recipeItems) {
            await this.prisma.recipeItem.deleteMany({ where: { dishId: id, homeId } });

            // Créer les recipeItems
            if (recipeItems) {
                await this.prisma.recipeItem.createMany({
                    data: recipeItems.filter((r) => r.dishId === id).map((r) => ({ ...r, homeId })),
                });
            }
            return { ...dish, recipeItems };
        }
        return dish;
    }

    async delete(homeId: number, id: number): Promise<void> {
        await this.prisma.dish.delete({
            where: { id, homeId },
        });
    }
}
