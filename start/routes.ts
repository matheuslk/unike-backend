import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.post('/login', 'Auth/AuthController.login');
  Route.get('/refresh', 'Auth/AuthController.refresh');
  Route.get('/products/filters', 'ProductsController.filters');
  Route.post('/products/filter', 'ProductsController.filter');
  Route.get('/products/:id', 'ProductsController.show');
  Route.group(() => {
    Route.get('/check', 'Auth/AuthController.check');
    Route.resource('/products', 'ProductsController')
      .only(['store', 'update', 'destroy'])
      .middleware({
        store: 'findCategory',
        update: 'findProduct,findCategory',
        destroy: 'findProduct',
      });
  }).middleware(['auth']);
})
  .prefix('api/v1')
  .middleware(['delay']);
