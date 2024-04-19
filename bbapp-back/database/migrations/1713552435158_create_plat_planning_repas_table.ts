import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
    protected tableName = "plat_planning_repas";

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id");
            table.integer('plat_id').unsigned().references('plat.id')
            table.integer('planning_repas_id').unsigned().references('planning_repas.id')
            table.unique(['plat_id', 'planning_repas_id'])
            table.timestamp("created_at").notNullable();
        });
    }

    async down() {
        this.schema.dropTable(this.tableName);
    }
}
