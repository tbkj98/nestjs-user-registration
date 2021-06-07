import { IsEmail } from "class-validator";

import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as Bcrypt from "bcrypt";
import { BaseEntity } from "./base.entity";
import { Constant } from "src/constant/constant";
import { User } from "src/model/pojo/User";

@Entity({ name: "Users" })
export class UserEntity extends BaseEntity {

    @Column({ name: "Name", nullable: false, length: 50 })
    readonly _name: string;

    @IsEmail()
    @Column({ name: "Email", nullable: false, unique: true })
    readonly _email: string;

    @Column({ name: "Password", nullable: false })
    _password: string;

    @Column({ name: "Mobile", nullable: false })
    readonly _mobile: string;

    constructor(name?: string, email?: string, mobile?: string, password?: string) {
        super();
        this._name = name;
        this._email = email;
        this._mobile = mobile;
        this._password = password;
    }

    @BeforeInsert()
    private async transformBeforeInsert() {
        this._password = await Bcrypt.hash(this._password, Constant.BCRYPT_SALT);
    }

    async match(password: string) {
        return await Bcrypt.compare(password, this._password);
    }

    public toUser(): User {
        return new User(this.id, this._name, this._email, this._mobile);
    }
}