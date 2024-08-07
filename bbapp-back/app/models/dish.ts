import { DateTime } from "luxon";
import {BaseModel, column, hasMany, manyToMany} from "@adonisjs/lucid/orm";
import * as relations from "@adonisjs/lucid/types/relations";
import DishScheduleItem from "#models/dish_schedule_item";
import RecipeItem from "#models/recipe_item";

export default class Dish extends BaseModel {
    static table = 'dish'

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

    @manyToMany(() => DishScheduleItem)
    declare dishScheduleItems: relations.ManyToMany<typeof DishScheduleItem>

    @hasMany(() => RecipeItem)
    declare recipeItems: relations.HasMany<typeof RecipeItem>
}
