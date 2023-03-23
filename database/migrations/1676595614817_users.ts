import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'users';

  public async up(): Promise<void> {
    await this.schema.createTable(this.tableName, table => {
      table.increments('id');
      table.string('email', 255).notNullable().unique();
      table.string('password', 180).notNullable();
      table.string('remember_me_token').nullable();
      table.timestamp('created_at', { useTz: true }).notNullable();
      table.timestamp('updated_at', { useTz: true }).notNullable();
    });
  }

  public async down(): Promise<void> {
    await this.schema.dropTable(this.tableName);
  }
}
