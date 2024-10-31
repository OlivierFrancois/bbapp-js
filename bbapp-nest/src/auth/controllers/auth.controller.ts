import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dtos/sign-in.dto';
import { Request } from 'express';
import { Public } from '../decorators/public.decorator';

@Controller('/api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    signIn(@Body() signInDto: SignInDto, @Req() request: Request) {
        return this.authService.signIn(signInDto, request.ip);
    }
}
