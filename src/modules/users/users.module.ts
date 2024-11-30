import { Module } from '@nestjs/common';

import { CommonModule } from '../common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';

@Module({
    imports: [
        CommonModule,
    ],
    providers: [
        UsersService
    ],
    controllers: [
        UsersController
    ],
    exports: []
})
export class UsersModule { }
