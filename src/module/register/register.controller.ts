import { Body, Catch, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { DatabaseExceptionFilter } from 'src/exception/filter/database.exception.filter';

import { UserDTO } from 'src/model/user.dto';
import { RegisterService } from './register.service';

@Controller('register')
@UseFilters(new DatabaseExceptionFilter())
export class RegisterController {
    constructor(private readonly registerService: RegisterService) { }

    @Post()
    async register(@Body() userInfo: UserDTO) {
        return await this.registerService.register(userInfo);
    }
}
