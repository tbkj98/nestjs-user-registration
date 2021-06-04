import { Expose } from "class-transformer";
import { UserEntity } from "src/entity/user.entity";

export class User {
    @Expose({ name: "id" })
    private readonly id?: string

    @Expose({ name: "name" })
    private readonly name?: string;

    @Expose({ name: "email" })
    private readonly email?: string;

    @Expose({ name: "mobile" })
    private readonly mobile?: string;

    constructor(id?: string, name?: string, email?: string, mobile?: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
    }
}