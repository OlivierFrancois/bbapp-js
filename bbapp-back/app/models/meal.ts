import { DateTime } from "luxon";
import { BaseModel, column, manyToMany } from "@adonisjs/lucid/orm";
import * as relations from "@adonisjs/lucid/types/relations";
import MealPlan from "#models/meal_plan";
import Article from "#models/article";

export default class Meal extends BaseModel {
    static table = 'meal'

    @column({ isPrimary: true })
    declare id: number;

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime;

    @column()
    declare name: string;

    @column()
    declare url: string;

    @manyToMany(() => MealPlan)
    declare mealPlans: relations.ManyToMany<typeof MealPlan>

    @manyToMany(() => Article)
    declare articles: relations.ManyToMany<typeof Article>
}
