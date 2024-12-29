import { Module } from '@nestjs/common';

import { CommonModule } from './common';
import { ClientsModule } from './clients/clients.module';
import { InfluencersModule } from './influencers/influencers.module';
import { UsersModule } from './users/users.module';
import { CampaignsModule } from './campaigns/campaigns.module';

@Module({
    imports: [
        CommonModule,
        ClientsModule,
        InfluencersModule,
        UsersModule,
        CampaignsModule
    ]
})
export class ApplicationModule { }
