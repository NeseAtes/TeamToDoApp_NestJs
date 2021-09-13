import moment from 'moment';
import pino from 'pino';

import envConfig from 'shared/configs/env.config';

export default pino(
  {
    level: envConfig.productionModeEnabled ? 'error' : 'trace',
    formatters: {
      level: (label: string) => ({ level: label }),
    },
    prettyPrint: envConfig.productionModeEnabled ? null : { translateTime: true, levelFirst: true },
  },
  envConfig.productionModeEnabled ? pino.destination(`logs/${moment().format('YYYY-MM-DD')}_${process.pid}.log`) : null,
);