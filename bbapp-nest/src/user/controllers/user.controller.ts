import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UserCreateDto } from '../dtos/create-user.dto';
import { UpdateUserPasswordDto } from '../dtos/update-user-password.dto';
import { UserSession } from '../../auth/decorators/session.decorator';
import { Session } from '../../auth/types/session.type';
import { Public } from '../../auth/decorators/public.decorator';

@ApiTags('Users models')
@Controller('/api/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Public()
    @Get('check-username-availability')
    async checkUsernameAvailability(@Query('username') username: string) {
        return (await this.userService.findByUsername(username)) === null;
    }

    @Public()
    @Post('sign-up')
    async signUp(@Body() userCreateDto: UserCreateDto) {
        return await this.userService.create(userCreateDto);
    }

    @Put('password')
    async update(@Body() updateUserPasswordDto: UpdateUserPasswordDto, @UserSession() userSession: Session) {
        return await this.userService.updatePassword(userSession.user.id, updateUserPasswordDto);
    }
}
