import { DateTime } from "luxon";
import { BaseModel, column, manyToMany } from "@adonisjs/lucid/orm";
import Dish from "#models/dish";
import * as relations from "@adonisjs/lucid/types/relations";

export default class DishScheduleItem extends BaseModel {
    static table = 'dish_schedule_item'

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

    @manyToMany(() => Dish, {
        pivotTimestamps: {
            createdAt: 'created_at',
            updatedAt: false,
        }
    })
    declare dishes: relations.ManyToMany<typeof Dish>
}
