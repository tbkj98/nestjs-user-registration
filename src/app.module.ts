import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './entity/user.entity';
import { RegisterModule } from './module/register/register.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: '192.168.1.43',
    port: 5432,
    username: 'tbkj',
    password: 'Anand@334',
    database: 'storeman',
    entities: [UserEntity],
    synchronize: true,
  }),
    RegisterModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
