import Application from '@ioc:Adonis/Core/Application';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';

export default class extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    if (Seeder.default.developmentOnly && !Application.inDev) {
      return;
    }
    await new Seeder.default(this.client).run();
  }
  public async run() {
    await this.runSeeder(await import('../User'));
    await this.runSeeder(await import('../Category'));
    await this.runSeeder(await import('../Product'));
    await this.runSeeder(await import('../Size'));
    await this.runSeeder(await import('../Image'));
  }
}
