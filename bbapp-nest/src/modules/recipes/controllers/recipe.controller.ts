import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Query } from '@nestjs/common';
import { RecipeItem } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { RecipeService } from '../services/recipe.service';
import { CreateRecipeItemDto } from '../dtos/create-recipe-item.dto';
import { AbstractController } from '../../app.abstract.controller';

@ApiTags('Recipes')
@Controller('api/recipe')
export class RecipeController extends AbstractController {
    constructor(private readonly recipeService: RecipeService) {
        super();
        if (!this.home) throw new ForbiddenException();
    }

    @Get('search/by-dish')
    async getByDish(@Query('dishId') dishId: string): Promise<RecipeItem[]> {
        return this.recipeService.getByDish(this.home.id, Number(dishId));
    }

    @Get('search/by-article')
    async getByArticle(@Query('dishId') dishId: string): Promise<RecipeItem[]> {
        return this.recipeService.getByDish(this.home.id, Number(dishId));
    }

    @Get(':dishId/:articleId')
    async get(@Param('dishId') dishId: string, @Param('articleId') articleId: string): Promise<RecipeItem | null> {
        return this.recipeService.get(this.home.id, Number(dishId), Number(articleId));
    }

    @Post()
    async create(@Body() data: CreateRecipeItemDto): Promise<RecipeItem> {
        return this.recipeService.save(this.home.id, data);
    }

    @Delete(':dishId/:articleId')
    async delete(@Param('dishId') dishId: string, @Param('articleId') articleId: string): Promise<void> {
        return this.recipeService.delete(this.home.id, Number(dishId), Number(articleId));
    }
}
