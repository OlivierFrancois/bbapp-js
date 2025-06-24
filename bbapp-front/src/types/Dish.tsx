import { RecipeItem } from './RecipeItem.tsx';
import { DishTag } from './DishTag.tsx';

export type Dish = {
    id: number;
    name: string;
    url?: string;
    comment?: string;
    dishTagIds?: number[];
    createdAt?: string;
    updatedAt?: string;

    countUses?: number;
    mostRecentUse?: string;
    nextUpcomingUse?: string;

    recipeItems?: Partial<RecipeItem[]>;
    dishTags?: Partial<DishTag[]>;
};
