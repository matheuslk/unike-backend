import Server from '@ioc:Adonis/Core/Server';

Server.middleware.register([() => import('@ioc:Adonis/Core/BodyParser')]);
Server.middleware.registerNamed({
  auth: async () => await import('../app/Middleware/Auth'),
  findProduct: async () => await import('App/Middleware/FindProduct'),
  findCategory: async () => await import('App/Middleware/FindCategory'),
});
