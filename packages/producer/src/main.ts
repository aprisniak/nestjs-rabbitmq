// Core
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

// Modules
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

const logger = new Logger('main.ts');

const bootstrap = async () => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        // eslint-disable-next-line no-nested-ternary
        logger: process.env.NODE_ENV === 'development'
            ? ['error', 'debug', 'log', 'verbose']
            : ['warn', 'error', 'verbose'],
    });

    app.disable('x-powered-by');

    const PORT = 3000;

    await app.listen(PORT);

    logger.verbose(`Producer is up on port ${PORT}`);
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
    try {
        await bootstrap();
    } catch (error) {
        logger.error(error);
    }
})();
