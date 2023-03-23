import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'sizes';

  public async up(): Promise<void> {
    await this.schema.createTable(this.tableName, table => {
      table.increments('id');
      table.string('size', 10).notNullable();
      table
        .integer('product_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE');
      table.timestamp('created_at', { useTz: true }).notNullable();
      table.timestamp('updated_at', { useTz: true }).notNullable();
    });
  }

  public async down(): Promise<void> {
    await this.schema.dropTable(this.tableName);
  }
}
