import {BaseSchema} from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'recipe_item'

    async up() {

        this.schema.dropTable('article_dish')
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')

            table.timestamp('created_at')
            table.timestamp('updated_at')
            table.integer('quantity');
            table.string('unit', 100);

            table.integer('dish_id')
                .unsigned()
                .references('dish.id')
                .onDelete('CASCADE')

            table.integer('article_id')
                .unsigned()
                .references('article.id')
                .onDelete('CASCADE')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
