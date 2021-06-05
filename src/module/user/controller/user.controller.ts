import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { DatabaseExceptionFilter } from 'src/exception/filter/database.exception.filter';
import { ForgotPasswordRequestDTO } from 'src/model/dto/request/forgot.dto';
import { LoginRequestDTO } from 'src/model/dto/request/login.dto';
import { ResetPasswordRequestDTO } from 'src/model/dto/request/reset.dto';
import { RegisterRequestDTO } from 'src/model/dto/request/user.dto';
import { ForgotPasswordResponseDTO } from 'src/model/dto/response/forgot.dto';
import { LoginResponseDTO } from 'src/model/dto/response/login.dto';
import { LogoutResponseDTO } from 'src/model/dto/response/logout.dto';
import { RegisterResponseDTO } from 'src/model/dto/response/register.dto';
import { ResetPasswordResponseDTO } from 'src/model/dto/response/reset.dto';
import { UserService } from '../service/user.service';


@Controller('user')
@UseFilters(new DatabaseExceptionFilter())
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    async register(@Body() registerInfo: RegisterRequestDTO) {
        const { result, user } = await this.userService.register(registerInfo);
        return new RegisterResponseDTO(result, user);
    }

    @Post('login')
    async login(@Body() loginInfo: LoginRequestDTO) {
        const { result, token, user } = await this.userService.login(loginInfo);
        return new LoginResponseDTO(result, token, user);
    }

    @Post('logout')
    async logout() {
        const { result } = await this.userService.logout();
        return new LogoutResponseDTO(result);
    }

    @Post('forgot')
    async forgotPassword(@Body() forgotPasswordInfo: ForgotPasswordRequestDTO) {
        const { result, resetToken } = await this.userService.generateResetLink(forgotPasswordInfo.email);
        return new ForgotPasswordResponseDTO(result, resetToken);
    }

    @Post('reset')
    async resetPassword(@Body() resetPasswordInfo: ResetPasswordRequestDTO) {
        const { result } = await this.userService.resetPassword(resetPasswordInfo.resetToken, resetPasswordInfo.password);
        return result;

    }
}
