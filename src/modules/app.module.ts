import { Module } from '@nestjs/common';

import { CommonModule } from './common';
// import { PassengerModule } from './passenger/passenger.module';
import { ClientsModule } from './clients/clients.module';

@Module({
    imports: [
        CommonModule,
        // PassengerModule
        ClientsModule
    ]
})
export class ApplicationModule {}
