import { PrismaService } from '../../prisma.service';
import { Module } from '@nestjs/common';
import { DishTagController } from './controllers/dish-tag.controller';
import { DishTagService } from './services/dish-tag.service';
import { AppBaseModule } from '../app-base.module';

@Module({
    imports: [AppBaseModule],
    controllers: [DishTagController],
    providers: [DishTagService, PrismaService],
})
export class DishTagModule {}
