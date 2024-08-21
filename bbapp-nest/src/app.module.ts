import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DishModule } from './modules/dishes/dish.module';
import { DishScheduleModule } from './modules/dish-schedule/dish-schedule.module';
import { ArticleModule } from './modules/articles/article.module';
import { CategoryModule } from './modules/categories/category.module';
import { RecipeModule } from './modules/recipes/recipe.module';

@Module({
    imports: [DishModule, DishScheduleModule, ArticleModule, CategoryModule, RecipeModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
