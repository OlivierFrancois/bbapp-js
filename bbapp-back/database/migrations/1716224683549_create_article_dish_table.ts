import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'article_dish'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

        table.integer('article_id')
            .unsigned()
            .references('article.id')
            .onDelete('CASCADE')

        table.integer('dish_id')
            .unsigned()
            .references('dish.id')
            .onDelete('CASCADE')

        table.unique(['article_id', 'dish_id'])
        table.timestamp("created_at").notNullable();
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
