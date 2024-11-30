import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { extractTokenPayload } from './security-utils';
import { UserRole } from '../../tokens';

@Injectable()
export class UserGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean {
        const payload = extractTokenPayload(context.switchToHttp().getRequest<FastifyRequest>());
        if (!payload) return false;
        return (payload.type === UserRole.ADMIN || payload.type === UserRole.CLIENT || payload.type === UserRole.INFLUENCER);
    }
}

@Injectable()
export class AdminGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean {
        const payload = extractTokenPayload(context.switchToHttp().getRequest<FastifyRequest>());
        if (!payload) return false;
        return (payload.type === UserRole.ADMIN);
    }
}

@Injectable()
export class ClientGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean {
        const payload = extractTokenPayload(context.switchToHttp().getRequest<FastifyRequest>());
        if (!payload) return false;
        return (payload.type === UserRole.CLIENT);
    }
}

@Injectable()
export class InfluencerGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean {
        const payload = extractTokenPayload(context.switchToHttp().getRequest<FastifyRequest>());
        if (!payload) return false;
        return (payload.type === UserRole.INFLUENCER);
    }
}

@Injectable()
export class AdminClientGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean {
        const payload = extractTokenPayload(context.switchToHttp().getRequest<FastifyRequest>());
        if (!payload) return false;
        return (payload.type === UserRole.ADMIN || payload.type === UserRole.CLIENT);
    }
}

@Injectable()
export class AdminInfluencerGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean {
        const payload = extractTokenPayload(context.switchToHttp().getRequest<FastifyRequest>());
        if (!payload) return false;
        return (payload.type === UserRole.ADMIN || payload.type === UserRole.INFLUENCER);
    }
}
