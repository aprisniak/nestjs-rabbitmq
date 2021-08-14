// Core
import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';

// Modules, Services
import { AppController } from './app.controller';

@Module({
    imports: [
        ClientsModule.register([
            {
                name:      'USER_SERVICE',
                transport: Transport.RMQ,
                options:   {
                    urls:         ['amqp://producer:producer@localhost:5672/hello'],
                    queue:        'users',
                    queueOptions: {
                        durable: false,
                    },
                },
            },
        ]),
    ],
    controllers: [AppController],
    providers:   [],
})
export class AppModule {}
