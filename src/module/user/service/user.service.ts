import { Inject, Injectable, Logger } from '@nestjs/common';
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
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UserService {

    private readonly logger = new Logger(UserService.name);

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
            this.logger.error(err);
            if (err.code === DatabaseErrorCode.DUPLICATE_ENTRY) throw new UserAlreadyExistsException(userDto, err);
        }
    }

    async login(loginInfo: LoginRequestDTO) {
        try {
            const userEntity = await this.userRepository.createQueryBuilder("Users").where("Users.Email = :email", { email: loginInfo.email }).getOne();
            if (!userEntity || !await userEntity.match(loginInfo.password)) return { result: false };
            const tokenSaveResult = await this.tokenRepository.save(new TokenEntity(this.jwtService.sign({ userId: userEntity.id })));
            return { result: true, token: tokenSaveResult.token, user: userEntity.toUser() };
        } catch (err) {
            this.logger.error(err);
            throw new DatabaseException(err);
        }
    }

    async generateResetLink(email: string) {
        try {
            const userEntity = await this.userRepository.createQueryBuilder("Users").where("Users.Email = :email", { email: email }).getOne();
            if (!userEntity) return { result: false };
            const resetLinkSaveResult = await this.passwordResetRepository.save(new PasswordResetEntity(this.jwtService.sign({ userId: userEntity.id }), userEntity.id));
            return { result: true, resetToken: resetLinkSaveResult.link };
        } catch (err) {
            this.logger.error(err);
            throw new DatabaseException(err);
        }
    }

    async resetPassword(resetToken: string, password: string) {
        try {
            const passwordResetEntity = await this.passwordResetRepository.createQueryBuilder("PasswordResetInfo").where("PasswordResetInfo.Token = :token", { token: resetToken }).getOne();
            if (!passwordResetEntity) return { result: false };
            const updatedPassword = await Bcrypt.hash(password, Constant.BCRYPT_SALT)
            await this.userRepository.manager.query(`UPDATE "Users" SET "Password" = '${updatedPassword}' WHERE "Id" = ${passwordResetEntity.userId}`);
            await this.passwordResetRepository.delete(passwordResetEntity.id);
            return { result: true };
        } catch (err) {
            this.logger.error(err);
            throw new DatabaseException(err);
        }
    }

    async logout() {
        return { result: true };
    }
}
