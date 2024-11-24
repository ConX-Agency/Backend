import { Module } from '@nestjs/common';

import { CommonModule } from './common';
import { ClientsModule } from './clients/clients.module';
import { InfluencersModule } from './influencers/influencers.module';

@Module({
    imports: [
        CommonModule,
        ClientsModule,
        InfluencersModule
    ]
})
export class ApplicationModule { }
