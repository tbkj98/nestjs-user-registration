import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as Bcrypt from "bcrypt";
import { Constant } from 'src/constant/constant';
import { DatabaseErrorCode } from 'src/constant/database.error';
import { PasswordResetEntity } from 'src/entity/reset.entity';
import { TokenEntity } from 'src/entity/token.entity';
import { UserEntity } from 'src/entity/user.entity';
import { DatabaseException } from 'src/exception/database.exception';
import { UserAlreadyExistsException } from 'src/exception/useralreadyexists.exception';
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

    async register(userDto: RegisterRequestDTO) {
        const user = userDto.toEntity();
        try {
            const userEntity = await this.userRepository.save(user);
            return { result: true, user: userEntity.toUser() };
        } catch (err) {
            console.log(err);
            if (err.code === DatabaseErrorCode.DUPLICATE_ENTRY) throw new UserAlreadyExistsException(userDto, err);
        }
    }

    async login(loginInfo: LoginRequestDTO) {
        try {
            const userEntity = await this.userRepository.findOne({ where: { _email: loginInfo.email } });
            if (!userEntity || !await userEntity.match(loginInfo.password)) return { result: false };
            const tokenSaveResult = await this.tokenRepository.save(new TokenEntity(this.jwtService.sign({ userId: userEntity.id })));
            return { result: true, token: tokenSaveResult.token, user: userEntity.toUser() };
        } catch (err) {
            console.log(err);
            throw new DatabaseException(err);
        }
    }

    async generateResetLink(email: string) {
        try {
            const userEntity = await this.userRepository.findOne({ where: { _email: email } });
            if (!userEntity) return { result: false };
            const resetLinkSaveResult = await this.passwordResetRepository.save(new PasswordResetEntity(this.jwtService.sign({ userId: userEntity.id }), userEntity.id));
            return { result: true, resetToken: resetLinkSaveResult.link };
        } catch (err) {
            console.log(err);
            throw new DatabaseException(err);
        }
    }

    async resetPassword(resetToken: string, password: string) {
        try {
            const passwordResetEntity = await this.passwordResetRepository.findOne({ where: { _token: resetToken } });
            if (!passwordResetEntity) return { result: false };
            const updatedPassword = await Bcrypt.hash(password, Constant.BCRYPT_SALT);

            await getManager().transaction(async transactionalEntityManager => {
                await transactionalEntityManager.update(UserEntity, { id: passwordResetEntity.userId }, { _password: updatedPassword });
                await transactionalEntityManager.delete(PasswordResetEntity, {"UserId": passwordResetEntity.userId});
            });

            return { result: true };
        } catch (err) {
            console.log(err);
            throw new DatabaseException(err);
        }
    }

    async logout() {
        return { result: true };
    }
}
