import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDishDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    url: string;

    @IsNumber()
    dishCategoryId?: number;
}
