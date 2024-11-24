import { Module } from '@nestjs/common';

import { CommonModule } from '../common';
import { InfluencersController } from './controller';
import { InfluencersService } from './service';

@Module({
    imports: [
        CommonModule,
    ],
    providers: [
        InfluencersService
    ],
    controllers: [
        InfluencersController
    ],
    exports: []
})
export class InfluencersModule { }
