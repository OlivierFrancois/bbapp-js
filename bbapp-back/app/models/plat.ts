import { DateTime } from "luxon";
import { BaseModel, column, manyToMany } from "@adonisjs/lucid/orm";
import * as relations from "@adonisjs/lucid/types/relations";
import PlanningRepas from "#models/planning_repas";

export default class Plat extends BaseModel {
    static table = 'plat'

    @column({ isPrimary: true })
    declare id: number;

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime;

    @column()
    declare nom: string;

    @column()
    declare url: string;

    @manyToMany(() => PlanningRepas)
    declare plannings: relations.ManyToMany<typeof PlanningRepas>
}
