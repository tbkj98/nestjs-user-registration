import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetEntity } from 'src/entity/reset.entity';
import { TokenEntity } from '../../entity/token.entity';
import { UserEntity } from '../../entity/user.entity';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const dbUrl = process.env.DATABASE_URL ? process.env.DATABASE_URL : "postgres://tbkj:Anand%40334@192.168.1.43:5432/storeman"
console.error("Database credentials", dbUrl);
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      url: dbUrl,
      entities: [UserEntity, TokenEntity, PasswordResetEntity],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
