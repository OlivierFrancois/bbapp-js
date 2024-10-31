import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dtos/sign-in.dto';
import { Request } from 'express';

@Controller('/api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    signIn(@Body() signInDto: SignInDto, @Req() request: Request) {
        return this.authService.signIn(signInDto, request.ip);
    }
}
