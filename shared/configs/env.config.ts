import * as dotenv from 'dotenv';
import * as envLoader from 'load-env-var';

import { join } from 'path';

const basePath = process.env.RUN_IN_SNAPSHOT === 'true' ? '/snapshot/ephesus-backend-server' : process.cwd();

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? join(basePath, '.env') : join(basePath, '.dev.env'),
});

export default {
  basePath,

  productionModeEnabled: process.env.NODE_ENV === 'production',

  socketActionsEnabled: envLoader.loadBoolean('ENABLE_SOCKET_ACTIONS', { defaultValue: false }),

  port: envLoader.loadNumber('PORT', { defaultValue: 5000 }),
};