// Core
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

// Modules
import { AppModule } from './app.module';

const logger = new Logger('main.ts');

const bootstrap = async () => {
    const app = await NestFactory.createMicroservice(AppModule, {
        // eslint-disable-next-line no-nested-ternary
        logger: process.env.NODE_ENV === 'development'
            ? ['error', 'debug', 'log', 'verbose']
            : ['warn', 'error', 'verbose'],
        transport: Transport.RMQ,
        options:   {
            urls:         ['amqp://consumer:consumer@localhost:5672/hello'],
            queue:        'users',
            queueOptions: {
                durable: false,
            },
        },
    });

    await app.listen();

    logger.verbose('Microservice consumer is listening');
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
    try {
        await bootstrap();
    } catch (error) {
        logger.error(error);
    }
})();
