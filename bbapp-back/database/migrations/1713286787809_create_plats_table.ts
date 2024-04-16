import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
    protected tableName = "plats";

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id");
            table.timestamp("created_at").notNullable();
            table.timestamp("updated_at").nullable();
            table.string("nom", 100).notNullable();
        });
    }

    async down() {
        this.schema.dropTable(this.tableName);
    }
}
