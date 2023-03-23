import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'categories';

  public async up(): Promise<void> {
    await this.schema.createTable(this.tableName, table => {
      table.increments('id');
      table.string('name', 15).unique().notNullable();
      table.timestamp('created_at', { useTz: true }).notNullable();
      table.timestamp('updated_at', { useTz: true }).notNullable();
    });
  }

  public async down(): Promise<void> {
    await this.schema.dropTable(this.tableName);
  }
}
