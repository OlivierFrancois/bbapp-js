import { Controller, UseInterceptors } from '@nestjs/common';
import { User } from '@prisma/client';
import { AppSessionInterceptor } from './app-session.interceptor';

@Controller()
@UseInterceptors(AppSessionInterceptor)
export abstract class MainController {
    public user: User;
}
