import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/entity/user.entity";
import { Repository } from "./base.repository";

@Injectable()
export class UserRepository implements Repository<UserEntity> {

    create(entity: UserEntity) {

    }
    select(entity: number) {
        throw new Error("Method not implemented.");
    }
    update(entity: UserEntity) {
        throw new Error("Method not implemented.");
    }
    delete(id: number) {
        throw new Error("Method not implemented.");
    }
}