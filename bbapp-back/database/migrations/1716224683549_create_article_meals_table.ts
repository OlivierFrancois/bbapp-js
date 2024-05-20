import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'article_meal'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

        table.integer('article_id')
            .unsigned()
            .references('article.id')
            .onDelete('CASCADE')

        table.integer('meal_id')
            .unsigned()
            .references('meal.id')
            .onDelete('CASCADE')

        table.unique(['article_id', 'meal_id'])
        table.timestamp("created_at").notNullable();
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
