import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    categoryId?: number;

    @IsOptional()
    @IsNumber()
    sortOrder?: number;
}
