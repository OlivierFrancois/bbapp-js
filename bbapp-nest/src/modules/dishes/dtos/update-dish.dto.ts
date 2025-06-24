export class UpdateDishDto {
    name: string;
    url?: string;
    comment?: string;
    recipeItems?: RecipeItemDto[];
}

type RecipeItemDto = {
    dishId: number;
    articleId: number;
    quantity: number;
    unit: string;
};
