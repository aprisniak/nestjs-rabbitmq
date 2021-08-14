// Core
import {
    Controller, Post, Body, Inject, HttpStatus, HttpCode,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

// Other
import { Message } from './message.event';

@Controller()
export class AppController {
    constructor(
        @Inject('USER_SERVICE') private readonly client: ClientProxy,
        // eslint-disable-next-line no-empty-function
    ) {}

    async onApplicationBootstrap() {
        // await this.client.connect();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() body: unknown) {
        this.client.emit<unknown>('create_user', new Message(body));
    }
}
