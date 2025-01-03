import { Module } from '@nestjs/common';

import { CommonModule } from '../common';
import { CampaignsService } from './service';
import { CampaignsController } from './controller';

@Module({
    imports: [
        CommonModule,
    ],
    providers: [
        CampaignsService
    ],
    controllers: [
        CampaignsController
    ],
    exports: []
})
export class CampaignsModule { }
