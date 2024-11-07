import { RecipeItem } from './RecipeItem.tsx';
import { DishTag } from './DishTag.tsx';

export type Dish = {
    id: number;
    name: string;
    url?: string;
    dishTagIds?: number[];
    createdAt?: string;
    updatedAt?: string;

    recipeItems?: Partial<RecipeItem[]>;
    dishTags?: Partial<DishTag[]>;
};
