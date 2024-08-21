import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDishDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    url: string;
}
