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
      table.string('name', 45).notNullable();
      table.string('type', 45).notNullable();
      table.string('token', 64).notNullable().unique();
      table.timestamps();
    });
  }

  public async down(): Promise<any> {
    await this.schema.dropTable(this.tableName);
  }
}
