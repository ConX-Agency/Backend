import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from './controller';
import { LogInterceptor } from './flow';
import { configProvider, LoggerService, PasswordService, PrismaService } from './provider';

@Module({
    imports: [
        TerminusModule
    ],
    providers: [
        configProvider,
        LoggerService,
        LogInterceptor,
        PrismaService,
        PasswordService
    ],
    exports: [
        configProvider,
        LoggerService,
        LogInterceptor,
        PrismaService,
        PasswordService
    ],
    controllers: [
        HealthController
    ],
})
export class CommonModule { }
