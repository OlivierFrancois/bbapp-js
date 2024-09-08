import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDishTagDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    sortOrder?: number;

    @IsOptional()
    @IsNumber()
    color?: string;
}
