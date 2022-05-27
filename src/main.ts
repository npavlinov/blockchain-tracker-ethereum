import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@nestjs/common';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

function setupExceptionLogging(logger: LoggerService) {
  process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
    logger.error(
      `Unhandled Rejection: ${promise} reason: ${reason}`,
      reason.stack,
      'UnhandledException',
    );
  });

  process.on('uncaughtException', (error: Error) => {
    logger.error(
      `Unhandled Exception: ${error.message}`,
      error.stack,
      'UnhandledException',
    );
    throw error;
  });
}

async function bootstrap() {
  // Logger can be abstracted to app.module and use config to set level
  const app = await NestFactory.create(AppModule);
  const winstonLogger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(winstonLogger);
  setupExceptionLogging(winstonLogger);
  const configService: ConfigService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
