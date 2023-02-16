import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Size from 'App/Models/Size';

export default class extends BaseSeeder {
  public async run(): Promise<void> {
    await Size.createMany([
      {
        size: '18',
        product_id: 1,
      },
      {
        size: 'berloque de dinheiro',
        price: 29.9,
        description: 'Lorem ipsum sit dolor amet',
        product_id: 2,
      },
      {
        size: '6.5cm',
        product_id: 3,
      },
      {
        size: 'corrente de prata',
        price: 159.9,
        description: 'Lorem ipsum sit dolor amet',
        product_id: 4,
      },
      {
        size: 'pulseira de prata de bali',
        price: 279.9,
        description: 'Lorem ipsum sit dolor amet',
        product_id: 5,
      },
      {
        size: 'tornozeleira de prata',
        price: 119.9,
        description: 'Lorem ipsum sit dolor amet',
        product_id: 6,
      },
    ]);
  }
}
