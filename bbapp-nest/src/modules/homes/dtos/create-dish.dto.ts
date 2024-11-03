import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHomeDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}
