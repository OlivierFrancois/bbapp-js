export class UpdateDishDto {
    name: string;
    url?: string;
    recipeItems?: RecipeItemDto[];
}

type RecipeItemDto = {
    dishId: number;
    articleId: number;
    quantity: number;
    unit: string;
};
