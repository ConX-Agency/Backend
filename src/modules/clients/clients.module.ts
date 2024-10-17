import { Module } from '@nestjs/common';

import { CommonModule } from '../common';
import { ClientsController } from './controller';
import { ClientsService } from './service';

@Module({
    imports: [
        CommonModule,
    ],
    providers: [
        ClientsService
    ],
    controllers: [
        ClientsController
    ],
    exports: []
})
export class ClientsModule { }
