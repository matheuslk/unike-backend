import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class JwtTokens extends BaseSchema {
  protected tableName = 'jwt_tokens';

  public async up(): Promise<any> {
    await this.schema.createTable(this.tableName, table => {
      table.increments('id');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table.string('name').notNullable();
      table.string('type').notNullable();
      table.string('token', 64).notNullable().unique();
      table.dateTime('expires_at').notNullable();
      table.dateTime('created_at').notNullable();
    });
  }

  public async down(): Promise<any> {
    await this.schema.dropTable(this.tableName);
  }
}
