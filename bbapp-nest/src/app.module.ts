import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DishModule } from './modules/dishes/dish.module';
import { DishScheduleModule } from './modules/dish-schedule/dish-schedule.module';

@Module({
    imports: [DishModule, DishScheduleModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
