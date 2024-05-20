import {DateTime} from 'luxon'
import {BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import * as relations from "@adonisjs/lucid/types/relations";
import Article from "#models/article";

export default class Category extends BaseModel {
    static table = 'category'

    @column({isPrimary: true})
    declare id: number

    @column.dateTime({autoCreate: true})
    declare createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    declare updatedAt: DateTime

    @column()
    declare name: string;

    @column()
    declare order: number|null;

    @hasMany(() => Article)
    declare articles: relations.HasMany<typeof Article>
}
