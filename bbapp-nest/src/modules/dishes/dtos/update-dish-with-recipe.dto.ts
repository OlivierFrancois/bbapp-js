import { CreateDishDto } from './create-dish.dto';

type RecipeItemDto = {
    dishId: number;
    articleId: number;
    quantity: number;
    unit: string;
};

export class UpdateDishWithRecipeDto extends CreateDishDto {
    recipeItems: RecipeItemDto[];
}
