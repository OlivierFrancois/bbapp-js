import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
    protected tableName = "meal_plan";

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id");
            table.timestamp("created_at").notNullable();
            table.timestamp("updated_at").nullable();
            table.dateTime("date").notNullable();
            table.string('moment', 20).notNullable();
        });
    }

    async down() {
        this.schema.dropTable(this.tableName);
    }
}
