import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Image from 'App/Models/Image';

export default class extends BaseSeeder {
  public async run(): Promise<void> {
    await Image.createMany([
      {
        file_name: 'default.jpg',
        product_id: 1,
      },
      {
        file_name: 'default.jpg',
        product_id: 2,
      },
      {
        file_name: 'default.jpg',
        product_id: 3,
      },
      {
        file_name: 'default.jpg',
        product_id: 4,
      },
      {
        file_name: 'default.jpg',
        product_id: 5,
      },
      {
        file_name: 'default.jpg',
        product_id: 6,
      },
    ]);
  }
}
