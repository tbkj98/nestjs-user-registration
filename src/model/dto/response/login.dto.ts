import { Expose } from "class-transformer";
import { User } from "src/model/pojo/User";
import { BaseResponseDto } from "./base.dto";

export class LoginResponseDTO extends BaseResponseDto {

    @Expose({ name: "token" })
    private readonly token?: string;

    @Expose({ name: "user" })
    private readonly user?: User;

    constructor(status?: boolean, token?: string, user?: User) {
        super();
        if (status) super.success("Login successful");
        else super.failure("Credentials invalid.");
        this.token = token;
        this.user = user;
    }
}