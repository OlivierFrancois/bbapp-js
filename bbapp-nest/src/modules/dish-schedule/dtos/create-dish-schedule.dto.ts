import { IsNotEmpty, IsDateString, IsEnum, IsArray } from 'class-validator';

export class CreateDishScheduleDto {
    @IsNotEmpty()
    @IsDateString()
    date: string;

    @IsNotEmpty()
    @IsEnum(['midi', 'soir'])
    moment: 'midi' | 'soir';

    @IsArray()
    @IsNotEmpty({ each: true })
    dishIds: number[];
}
