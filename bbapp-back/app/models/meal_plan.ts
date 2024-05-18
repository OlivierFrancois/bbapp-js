import { DateTime } from "luxon";
import { BaseModel, column, manyToMany } from "@adonisjs/lucid/orm";
import Meal from "#models/meal";
import * as relations from "@adonisjs/lucid/types/relations";

export default class MealPlan extends BaseModel {
    static table = 'meal_plan'

    @column({ isPrimary: true })
    declare id: number;

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime;

    @column.dateTime()
    declare date: DateTime;

    @column()
    declare moment: "midi" | "soir";

    @manyToMany(() => Meal, {
        pivotTimestamps: {
            createdAt: 'created_at',
            updatedAt: false,
        }
    })
    declare meals: relations.ManyToMany<typeof Meal>
}
