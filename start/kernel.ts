import Server from '@ioc:Adonis/Core/Server';

Server.middleware.register([
  async () => await import('@ioc:Adonis/Core/BodyParser'),
]);
Server.middleware.registerNamed({
  delay: async () => await import('App/Middleware/Delay'),
  auth: async () => await import('../app/Middleware/Auth'),
  findProduct: async () => await import('App/Middleware/FindProduct'),
  findCategory: async () => await import('App/Middleware/FindCategory'),
});
