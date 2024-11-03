import { Module } from '@nestjs/common';
import { RecipeController } from './controllers/recipe.controller';
import { RecipeService } from './services/recipe.service';
import { PrismaService } from '../../prisma.service';
import { AppBaseModule } from '../app-base.module';

@Module({
    imports: [AppBaseModule],
    controllers: [RecipeController],
    providers: [RecipeService, PrismaService],
})
export class RecipeModule {}
