/**
 * Config source: https://git.io/JfefC
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import type { CorsConfig } from '@ioc:Adonis/Core/Cors';

const corsConfig: CorsConfig = {
  enabled: true,
  /*
  |--------------------------------------------------------------------------
  | Origin
  |--------------------------------------------------------------------------
  |
  | Set a list of origins to be allowed for `Access-Control-Allow-Origin`.
  | The value can be one of the following:
  |
  | https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
  |
  | Boolean (true)    - Allow current request origin.
  | Boolean (false)   - Disallow all.
  | String            - Comma separated list of allowed origins.
  | Array             - An array of allowed origins.
  | String (*)        - A wildcard (*) to allow all request origins.
  | Function          - Receives the current origin string and should return
  |                     one of the above values.
  |
  */
  origin: ['http://localhost:4200'],
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  headers: true,
  exposeHeaders: [
    'cache-control',
    'content-language',
    'content-type',
    'expires',
    'last-modified',
    'pragma',
  ],
  credentials: true,
  maxAge: 90,
};

export default corsConfig;
