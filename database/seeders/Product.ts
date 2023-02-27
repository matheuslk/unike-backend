import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Product from 'App/Models/Product';

export default class extends BaseSeeder {
  public async run() {
    await Product.createMany([
      {
        name: 'anel de prata',
        price: 99.9,
        amount: 3,
        description: 'Lorem ipsum dolor sit amet',
        category_id: 1,
      },
      {
        name: 'berloque',
        price: 39.9,
        amount: 3,
        description: 'Lorem ipsum dolor sit amet',
        category_id: 2,
      },
      {
        name: 'brinco',
        price: 59.9,
        amount: 3,
        description: 'Lorem ipsum dolor sit amet',
        category_id: 3,
      },
      {
        name: 'corrente',
        price: 159.9,
        amount: 3,
        description: 'Lorem ipsum dolor sit amet',
        category_id: 4,
      },
      {
        name: 'pulseira',
        price: 199.9,
        amount: 3,
        description: 'Lorem ipsum dolor sit amet',
        category_id: 5,
      },
      {
        name: 'tornozeleira',
        price: 179.9,
        amount: 3,
        description: 'Lorem ipsum dolor sit amet',
        category_id: 6,
      },
    ]);
  }
}
