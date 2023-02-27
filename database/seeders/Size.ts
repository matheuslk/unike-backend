import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Size from 'App/Models/Size';

export default class extends BaseSeeder {
  public async run() {
    await Size.createMany([
      {
        size: '18',
        product_id: 1,
      },
      {
        size: '6.5cm',
        product_id: 3,
      },
      {
        size: '20cm',
        product_id: 4,
      },
      {
        size: '15cm',
        product_id: 5,
      },
      {
        size: '22cm',
        product_id: 6,
      },
    ]);
  }
}
