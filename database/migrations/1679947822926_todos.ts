import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Todos extends BaseSchema {
  protected tableName = 'todos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string("email",255).notNullable();
      table.string("title",255).notNullable()
      table.string("description").notNullable()
      table.date("due_date")
      table.integer("priority")
      table.boolean('completed')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
