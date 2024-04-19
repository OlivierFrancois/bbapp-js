import { DateTime } from "luxon";
import { BaseModel, column, manyToMany } from "@adonisjs/lucid/orm";
import Plat from "#models/plat";
import * as relations from "@adonisjs/lucid/types/relations";

export default class PlanningRepas extends BaseModel {
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

    @manyToMany(() => Plat, {
        pivotTimestamps: {
            createdAt: 'creation_date',
            updatedAt: false,
        }
    })
    declare plats: relations.ManyToMany<typeof Plat>
}
