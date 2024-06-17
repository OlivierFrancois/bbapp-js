import {DateTime} from 'luxon'
import {BaseModel, belongsTo, column, manyToMany} from '@adonisjs/lucid/orm'
import * as relations from "@adonisjs/lucid/types/relations";
import Dish from "#models/dish";
import Category from "#models/category";

export default class Article extends BaseModel {
    static table = 'article'

    @column({isPrimary: true})
    declare id: number

    @column.dateTime({autoCreate: true})
    declare createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    declare updatedAt: DateTime

    @column()
    declare name: string;

    @column()
    declare sortOrder: number | null;

    @manyToMany(() => Dish)
    declare dishes: relations.ManyToMany<typeof Dish>

    @column()
    declare categoryId: number

    @belongsTo(() => Category)
    declare category: relations.BelongsTo<typeof Category>

}
