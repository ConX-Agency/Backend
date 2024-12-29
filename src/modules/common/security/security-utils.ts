import { FastifyRequest } from 'fastify';
import * as jwt from 'jsonwebtoken';
import { GetUserDto } from '../../users/model/users.dto';

export function extractTokenPayload(request: FastifyRequest): GetUserDto | null {
    try {
        const header = request.headers.authorization;
        if (!header || !header.startsWith('Bearer ')) return null;

        const [, tokenChunk] = header.split(' ');
        if (!tokenChunk) return null;

        const env = process.env;
        const payload = jwt.verify(tokenChunk, `${env.JWT_SECRET}`, {
            algorithms: ['HS256'],
            issuer: env.JWT_ISSUER
        });
        if (typeof payload === 'string') return null;
        return payload.userData as GetUserDto;
    }
    catch (err) {
        return null;
    }
}
