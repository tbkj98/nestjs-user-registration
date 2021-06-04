import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [RegisterController],
    providers: [RegisterService],
})
export class RegisterModule { }
