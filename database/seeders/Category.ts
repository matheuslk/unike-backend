import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Category from 'App/Models/Category';

export default class extends BaseSeeder {
  public async run(): Promise<void> {
    await Category.createMany([
      {
        name: 'Anel',
      },
      {
        name: 'Berloque',
      },
      {
        name: 'Brinco',
      },
      {
        name: 'Corrente',
      },
      {
        name: 'Pulseira',
      },
      {
        name: 'Tornozeleira',
      },
    ]);
  }
}
