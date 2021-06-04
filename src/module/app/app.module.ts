import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenEntity } from '../../entity/token.entity';
import { UserEntity } from '../../entity/user.entity';
import { UserModule } from '../user/user.module';
import { PasswordResetEntity } from 'src/entity/reset.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.1.43',
      port: 5432,
      username: 'tbkj',
      password: 'Anand@334',
      database: 'storeman',
      entities: [UserEntity, TokenEntity, PasswordResetEntity],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
