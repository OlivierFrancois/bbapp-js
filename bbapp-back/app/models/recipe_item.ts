import { DateTime } from "luxon";
import {BaseModel, belongsTo, column} from "@adonisjs/lucid/orm";
import * as relations from "@adonisjs/lucid/types/relations";
import Dish from "#models/dish";
import Article from "#models/article";

export default class RecipeItem extends BaseModel {
    static table = 'recipe_item'

    @column({ isPrimary: true })
    declare id: number;

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime;

    @column.dateTime()
    declare date: DateTime;

    @belongsTo(() => Dish)
    declare dish: relations.BelongsTo<typeof Dish>

    @belongsTo(() => Article)
    declare article: relations.BelongsTo<typeof Article>

    @column()
    declare quantity: number;

    @column()
    declare unit: 'L' | 'kg' | 'g';
}
