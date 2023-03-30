import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import User from 'App/Models/User';

export default class extends BaseSeeder {
  public async run(): Promise<void> {
    await User.createMany([
      {
        email: 'admin@email.com',
        password: 'secret123',
      },
      {
        email: 'user@email.com',
        password: 'secret123',
      },
      {
        email: 'tester@email.com',
        password: 'secret123',
      },
    ]);
  }
}
