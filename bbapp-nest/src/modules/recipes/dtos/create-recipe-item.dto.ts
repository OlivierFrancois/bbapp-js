import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRecipeItemDto {
    @IsNotEmpty()
    @IsNumber()
    dishId: number;

    @IsNotEmpty()
    @IsNumber()
    articleId: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsString()
    unit: string;
}
