import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SessionService } from '../auth/services/session.service';

@Injectable()
export class AppSessionInterceptor implements NestInterceptor {
    constructor(private readonly sessionService: SessionService) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const controller = context.getClass().prototype;
        const request = context.switchToHttp().getRequest();
        const { user, home } = this.sessionService.retrieveSessionFromRequest(request);
        controller.user = user;
        controller.home = home;

        return next.handle();
    }
}
