import { Injectable } from '@nestjs/common';
import { CreateHomeDto } from './dtos/create-dish.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class HomeService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreateHomeDto) {
        console.log(dto);
    }

    async update(homeId: number, dto: CreateHomeDto) {
        console.log(homeId, dto);
    }

    async delete(id: number): Promise<void> {
        await this.prisma.home.delete({ where: { id } });
    }

    async props(homeId: number) {
        const members = await this.prisma.user.findMany({
            where: { homeId },
            select: { id: true, username: true },
        });

        const mealCount = (await this.prisma.dishScheduleItem.findMany({ where: { homeId } })).length;
        const dishCount = (await this.prisma.dish.findMany({ where: { homeId } })).length;

        return { members, mealCount, dishCount };
    }
}
