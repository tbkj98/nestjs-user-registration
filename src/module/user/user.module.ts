import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Constant } from 'src/constant/constant';
import { PasswordResetEntity } from 'src/entity/reset.entity';
import { TokenEntity } from 'src/entity/token.entity';
import { UserEntity } from 'src/entity/user.entity';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Module({
    imports: [
        JwtModule.register({
            secret: Constant.JWT_SECRET
        }),
        TypeOrmModule.forFeature([UserEntity, TokenEntity, PasswordResetEntity])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports:[JwtModule]
})
export class UserModule { }
