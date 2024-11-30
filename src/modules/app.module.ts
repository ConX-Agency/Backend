import { Module } from '@nestjs/common';

import { CommonModule } from './common';
import { ClientsModule } from './clients/clients.module';
import { InfluencersModule } from './influencers/influencers.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        CommonModule,
        ClientsModule,
        InfluencersModule,
        UsersModule
    ]
})
export class ApplicationModule { }
