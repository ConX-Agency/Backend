import { Module } from '@nestjs/common';

import { CommonModule } from '../common';
import { AdminService } from './service/admin.service';
import { AdminController } from './controller/admin.controller';

@Module({
    imports: [
        CommonModule,
    ],
    providers: [
        AdminService
    ],
    controllers: [
        AdminController
    ],
    exports: []
})
export class AdminModule { }
