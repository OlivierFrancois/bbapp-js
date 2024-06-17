import {BaseSchema} from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'category'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')

            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').nullable();

            table.string('name', 100).notNullable();
            table.integer('sort_order');
        })

        this.schema.table('article', (table) => {
            table.integer('category_id')
                .unsigned()
                .references('category.id')
                .onDelete('CASCADE')
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
