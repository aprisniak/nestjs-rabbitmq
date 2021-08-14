import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
    private readonly logger = new Logger(AppService.name);

    createUser(body: unknown): string {
        this.logger.debug(body);

        return new Date().toISOString();
    }
}
