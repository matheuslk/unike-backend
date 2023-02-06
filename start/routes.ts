import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.post('/login', 'AuthController.login');
  Route.get('/refresh', 'AuthController.refresh');
  Route.group(() => {
    Route.get('/check', 'AuthController.check');
  }).middleware(['auth:jwt']);
})
  .middleware('delay')
  .prefix('api/v1');
