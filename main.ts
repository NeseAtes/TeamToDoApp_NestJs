import chalk from 'chalk';

import helmet from 'fastify-helmet';
import multipart from 'fastify-multipart';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationError } from 'class-validator';

import envConfig from 'shared/configs/env.config';
import serverLogger from 'shared/loggers/server.logger';

//import { ServerError, ServerErrorType } from 'src/shared/configs/errors.config';
//import { GlobalExceptionFilter } from 'src/shared/filters/exception.filter';

import { AppModule } from 'app.module';

(async () => {
    const fastify = new FastifyAdapter({
      logger: serverLogger,
    });
  
    fastify.register(helmet, {
      contentSecurityPolicy: false
    });
    fastify.register(multipart, { addToBody: true });
  
    fastify.enableCors({
      origin: '*',
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    });
  
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastify, {
      logger: envConfig.productionModeEnabled ? ['warn', 'error'] : ['debug', 'error', 'log', 'verbose', 'warn'],
    });

  
    await app.listen(envConfig.port, '127.0.0.1' );
    //await app.listen(envConfig.port, envConfig.productionModeEnabled ? '0.0.0.0' : '127.0.0.1');
    if (envConfig.productionModeEnabled) {
      console.log(
        `${chalk.blue.bold(`[PID: ${process.pid}]`)} ${chalk.green.bold(
          '✓',
        )} Server is running on port ${chalk.white.bold(envConfig.port)} in production mode`,
      );
    }
    
  })();