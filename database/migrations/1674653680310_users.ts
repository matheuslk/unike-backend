import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'users';

  public async up(): Promise<any> {
    await this.schema.createTable(this.tableName, table => {
      table.increments('id');
      table.string('email', 255).notNullable().unique();
      table.string('password', 180).notNullable();
      table.string('remember_me_token').nullable();
      table.timestamps();
    });
  }

  public async down(): Promise<any> {
    await this.schema.dropTable(this.tableName);
  }
}
