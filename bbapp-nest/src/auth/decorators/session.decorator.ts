import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Session } from '../types/session.type';

export const UserSession = createParamDecorator<Session>((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.userSession;
});
