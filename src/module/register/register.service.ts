import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseErrorCode } from 'src/constant/database.error';
import { UserEntity } from 'src/entity/user.entity';
import { UserAlreadyExistsException } from 'src/exception/useralreadyexists.exception';
import { UserDTO } from 'src/model/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class RegisterService {
    private readonly logger = new Logger(RegisterService.name);

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

    async register(userDto: UserDTO) {
        const user = new UserEntity(userDto.name, userDto.email, userDto.mobile, userDto.password);

        try {
            return await this.userRepository.save(user);
        } catch (err) {
            if (err.code === DatabaseErrorCode.DUPLICATE_ENTRY) throw new UserAlreadyExistsException(userDto, err);
            console.log(err);
        }
    }
}
