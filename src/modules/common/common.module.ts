import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from './controller';
import { LogInterceptor } from './flow';
import { configProvider, ExcelProvider, LoggerService, PasswordService, PrismaService } from './provider';

@Module({
    imports: [
        TerminusModule
    ],
    providers: [
        configProvider,
        ExcelProvider,
        LoggerService,
        LogInterceptor,
        PrismaService,
        PasswordService
    ],
    exports: [
        configProvider,
        ExcelProvider,
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
