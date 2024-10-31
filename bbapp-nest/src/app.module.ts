import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DishModule } from './modules/dishes/dish.module';
import { DishScheduleModule } from './modules/dish-schedule/dish-schedule.module';
import { ArticleModule } from './modules/articles/article.module';
import { RecipeModule } from './modules/recipes/recipe.module';
import { ArticleCategoryModule } from './modules/article-categories/article-category.module';
import { DishTagModule } from './modules/dish-tags/dish-tag.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [DishModule, DishTagModule, DishScheduleModule, ArticleModule, ArticleCategoryModule, RecipeModule, AuthModule, UserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
