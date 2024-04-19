import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
    protected tableName = "planning_repas_plat";

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id");

            table.integer('planning_repas_id')
                .unsigned()
                .references('planning_repas.id')
                .onDelete('CASCADE')
            table.integer('plat_id')
                .unsigned()
                .references('plat.id')
                .onDelete('CASCADE')

            table.unique(['plat_id', 'planning_repas_id'])
            table.timestamp("created_at").notNullable();
        });
    }

    async down() {
        this.schema.dropTable(this.tableName);
    }
}
