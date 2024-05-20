import {BaseSchema} from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
    protected tableName = 'article'

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')

            table.timestamp('created_at')
            table.timestamp('updated_at')

            table.string('name', 100).notNullable();
            table.integer('order');
        })
    }

    async down() {
        this.schema.dropTable(this.tableName)
    }
}
