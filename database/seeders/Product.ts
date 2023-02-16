import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Product from 'App/Models/Product';

export default class extends BaseSeeder {
  public async run(): Promise<void> {
    await Product.createMany([
      {
        name: 'anel de prata',
        price: 79.9,
        description: 'Lorem ipsum sit dolor amet',
        category_id: 1,
      },
      {
        name: 'berloque de dinheiro',
        price: 29.9,
        description: 'Lorem ipsum sit dolor amet',
        category_id: 2,
      },
      {
        name: 'brinco de prata',
        price: 19.9,
        description: 'Lorem ipsum sit dolor amet',
        category_id: 3,
      },
      {
        name: 'corrente de prata',
        price: 159.9,
        description: 'Lorem ipsum sit dolor amet',
        category_id: 4,
      },
      {
        name: 'pulseira de prata de bali',
        price: 279.9,
        description: 'Lorem ipsum sit dolor amet',
        category_id: 5,
      },
      {
        name: 'tornozeleira de prata',
        price: 119.9,
        description: 'Lorem ipsum sit dolor amet',
        category_id: 6,
      },
    ]);
  }
}
