import { IsNotEmpty, IsDateString, IsEnum, IsArray, IsNumber } from 'class-validator';

export class AddDishDto {
    @IsNotEmpty()
    @IsDateString()
    date: string;

    @IsNotEmpty()
    @IsEnum(['midi', 'soir'])
    moment: 'midi' | 'soir';

    @IsNotEmpty()
    @IsNumber()
    dishId: number;
}
