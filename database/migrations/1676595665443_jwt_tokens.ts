import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class JwtTokens extends BaseSchema {
  protected tableName = 'jwt_tokens';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table.string('name').notNullable();
      table.string('type').notNullable();
      table.string('token', 64).notNullable().unique();
      table.timestamp('expires_at', { useTz: true }).notNullable();
      table.timestamp('created_at', { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
