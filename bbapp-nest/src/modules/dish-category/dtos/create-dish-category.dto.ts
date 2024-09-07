import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDishCategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    sortOrder?: number;
}
