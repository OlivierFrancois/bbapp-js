import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDishDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    url?: string;

    @IsNumber()
    dishCategoryId?: number;
}
