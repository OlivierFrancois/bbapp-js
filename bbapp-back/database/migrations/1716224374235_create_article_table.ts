import {BaseSchema} from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'article'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').nullable();
            table.string('name', 100).notNullable();
            table.integer('sort_order');
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
