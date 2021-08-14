import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
    private readonly logger = new Logger(AppController.name);

    constructor(private readonly appService: AppService) {
        //
    }

    @EventPattern('create_user')
    handleMessagePrinted(data: Record<string, unknown>) {
        this.logger.debug(data);

        return this.appService.createUser(data.body);
    }
}
