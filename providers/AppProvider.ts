import type { ApplicationContract } from '@ioc:Adonis/Core/Application';

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public static needsAplication = true;

  public register() {}

  public async boot() {
    const { DBRelationsSnakeCase } = await import(
      'App/Utils/NamingStrategies/DBRelationsSnakeCase'
    );
    const { BaseModel } = await import('@ioc:Adonis/Lucid/Orm');
    BaseModel.namingStrategy = new DBRelationsSnakeCase();
  }

  public async ready() {}

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
