import { ApiProperty } from '@nestjs/swagger';

export interface Config {
    readonly API_PORT: number;
    readonly API_PREFIX: string;
    readonly SWAGGER_ENABLE: number;
    readonly JWT_SECRET: string;
    readonly JWT_ISSUER: string;
    readonly HEALTH_TOKEN: string;
}

export class ErrorData {
    @ApiProperty({ description: 'message' })
    public readonly message: string;

    @ApiProperty({ description: 'meta' })
    public readonly meta: unknown;
}