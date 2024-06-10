import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
    protected tableName = "dish_dish_schedule_item";

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id");

            table.integer('dish_id')
                .unsigned()
                .references('dish.id')
                .onDelete('CASCADE')

            table.integer('dish_schedule_item_id')
                .unsigned()
                .references('dish_schedule_item.id')
                .onDelete('CASCADE')

            table.unique(['dish_id', 'dish_schedule_item_id'])
            table.timestamp("created_at").notNullable();
        });
    }

    async down() {
        this.schema.dropTable(this.tableName);
    }
}
