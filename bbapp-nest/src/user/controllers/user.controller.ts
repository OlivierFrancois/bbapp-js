import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UserCreateDto } from '../create-user.dto';

@ApiTags('Users models')
@Controller('/api/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('check-username-availability')
    async checkUsernameAvailability(@Query('username') username: string) {
        return (await this.userService.findByUsername(username)) === null;
    }

    @Post()
    async create(@Body() userCreateDto: UserCreateDto) {
        return await this.userService.create(userCreateDto);
    }
}
