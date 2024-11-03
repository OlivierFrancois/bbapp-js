import { Controller, Get, Param, Body, Post, Delete, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AbstractController } from '../app.abstract.controller';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dtos/create-dish.dto';
import { Admin } from '../../auth/decorators/admin.decorator';

@ApiTags('Homes')
@Controller('api/home')
export class HomeController extends AbstractController {
    constructor(private readonly homeService: HomeService) {
        super();
    }

    @Get('props')
    async getProps() {
        return await this.homeService.props(this.home.id);
    }

    @Admin()
    @Post()
    async create(@Body() dto: CreateHomeDto) {
        return this.homeService.create(dto);
    }

    @Put()
    async update(@Body() dto: CreateHomeDto) {
        return this.homeService.update(this.home.id, dto);
    }

    @Admin()
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.homeService.delete(Number(id));
    }
}
