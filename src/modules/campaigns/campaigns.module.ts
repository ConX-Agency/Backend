import { Module } from '@nestjs/common';

import { CommonModule } from '../common';

@Module({
    imports: [
        CommonModule,
    ],
    providers: [
        // ClientsService
    ],
    controllers: [
        // ClientsController
    ],
    exports: []
})
export class CampaignsModule { }
