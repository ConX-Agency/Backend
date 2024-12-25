import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from './controller';
import { LogInterceptor } from './flow';
import { configProvider, ExcelProvider, LoggerProvider, PasswordService, PrismaService } from './provider';

@Module({
    imports: [
        TerminusModule
    ],
    providers: [
        configProvider,
        ExcelProvider,
        LoggerProvider,
        LogInterceptor,
        PrismaService,
        PasswordService
    ],
    exports: [
        configProvider,
        ExcelProvider,
        LoggerProvider,
        LogInterceptor,
        PrismaService,
        PasswordService
    ],
    controllers: [
        HealthController
    ],
})
export class CommonModule { }
