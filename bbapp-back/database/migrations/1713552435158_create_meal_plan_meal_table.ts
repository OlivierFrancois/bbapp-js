import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
    protected tableName = "meal_meal_plan";

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id");

            table.integer('meal_id')
                .unsigned()
                .references('meal.id')
                .onDelete('CASCADE')

            table.integer('meal_plan_id')
                .unsigned()
                .references('meal_plan.id')
                .onDelete('CASCADE')

            table.unique(['meal_id', 'meal_plan_id'])
            table.timestamp("created_at").notNullable();
        });
    }

    async down() {
        this.schema.dropTable(this.tableName);
    }
}
