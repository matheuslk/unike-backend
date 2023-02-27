import Product from 'App/Models/Product';

declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    product: Product;
  }
}
