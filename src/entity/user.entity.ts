import { IsEmail } from "class-validator";
import { Constant } from "src/Constant";
import { BeforeInsert, Column, Entity } from "typeorm";
import * as Bcrypt from "bcrypt";
import { BaseEntity } from "./base.entity";

@Entity({ name: "Users" })
export class UserEntity extends BaseEntity {

    @Column({ name: "Name", nullable: false, length: 50 })
    private _name: string;

    @IsEmail()
    @Column({ name: "Email", nullable: false, unique: true })
    private _email: string;

    @Column({ name: "Password", nullable: false })
    private _password: string;

    @Column({ name: "Mobile", nullable: false })
    private _mobile: string;

    constructor(name: string, email: string, mobile: string, password: string) {
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

    public get name(): string { return this._name; }
    public get email(): string { return this._email; }
    public get mobile(): string { return this._mobile; }
}