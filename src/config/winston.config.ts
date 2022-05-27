import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

const config = {
  level: 'debug',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('nexo-blockchain-task', {
          prettyPrint: true,
        }),
      ),
    }),
  ],
};

export default config;
