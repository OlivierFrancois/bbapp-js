import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateDishDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    url?: string;

    @IsArray()
    dishTagIds?: number[];
}
