import User from 'App/Models/User';
import { JWTGuardConfig, JWTGuardContract } from '@ioc:Adonis/Addons/Jwt';

declare module '@ioc:Adonis/Addons/Auth' {
  interface ProvidersList {
    user: {
      implementation: LucidProviderContract<typeof User>;
      config: LucidProviderConfig<typeof User>;
    };
  }
  interface GuardsList {
    api: {
      implementation: OATGuardContract<'user', 'api'>;
      config: OATGuardConfig<'user'>;
      client: OATClientContract<'user'>;
    };
    jwt: {
      implementation: JWTGuardContract<'user', 'api'>;
      config: JWTGuardConfig<'user'>;
    };
  }
}
