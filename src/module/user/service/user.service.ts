import { Inject, Injectable, UseFilters } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as Bcrypt from "bcrypt";
import { Constant } from 'src/constant/constant';
import { PasswordResetEntity } from 'src/entity/reset.entity';
import { TokenEntity } from 'src/entity/token.entity';
import { UserEntity } from 'src/entity/user.entity';
import { DatabaseExceptionFilter } from 'src/exception/filter/database.exception.filter';
import { LoginRequestDTO } from 'src/model/dto/request/login.dto';
import { RegisterRequestDTO } from 'src/model/dto/request/user.dto';
import { getManager, Repository } from 'typeorm';

@Injectable()
export class UserService {
    @Inject()
    private readonly jwtService: JwtService;

    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    @InjectRepository(TokenEntity) private readonly tokenRepository: Repository<TokenEntity>
    @InjectRepository(PasswordResetEntity) private readonly passwordResetRepository: Repository<PasswordResetEntity>

    @UseFilters(new DatabaseExceptionFilter())
    async register(userDto: RegisterRequestDTO) {
        const user = userDto.toEntity();
        const userEntity = await this.userRepository.save(user);
        return { result: true, user: userEntity.toUser() };
    }

    @UseFilters(new DatabaseExceptionFilter())
    async login(loginInfo: LoginRequestDTO) {
        const userEntity = await this.userRepository.findOne({ where: { _email: loginInfo.email } });
        if (!userEntity || !await userEntity.match(loginInfo.password)) return { result: false };
        const tokenSaveResult = await this.tokenRepository.save(new TokenEntity(this.jwtService.sign({ userId: userEntity.id })));
        return { result: true, token: tokenSaveResult.token, user: userEntity.toUser() };
    }

    @UseFilters(new DatabaseExceptionFilter())
    async generateResetLink(email: string) {
        const userEntity = await this.userRepository.findOne({ where: { _email: email } });
        if (!userEntity) return { result: false };
        const resetLinkSaveResult = await this.passwordResetRepository.save(new PasswordResetEntity(this.jwtService.sign({ userId: userEntity.id }), userEntity));
        return { result: true, resetToken: resetLinkSaveResult.link };
    }

    @UseFilters(new DatabaseExceptionFilter())
    async resetPassword(resetToken: string, password: string) {
        const passwordResetEntity = await this.passwordResetRepository.findOne({ where: { _token: resetToken } });
        if (!passwordResetEntity) return { result: false };
        const updatedPassword = await Bcrypt.hash(password, Constant.BCRYPT_SALT);

        await getManager().transaction(async transactionalEntityManager => {
            await transactionalEntityManager.update(UserEntity, { _id: passwordResetEntity.user.id }, { _password: updatedPassword })
            await transactionalEntityManager.delete(PasswordResetEntity, { _user: passwordResetEntity.user });
        });

        return { result: true };
    }

    async logout() {
        return { result: true };
    }
}
