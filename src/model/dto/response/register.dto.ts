import { Expose } from "class-transformer";
import { User } from "src/model/pojo/User";
import { BaseResponseDto } from "./base.dto";

export class RegisterResponseDTO extends BaseResponseDto {

    @Expose({ name: "user" })
    private readonly user?: User;

    constructor(status?: boolean, user?: User) {
        super();
        if (status) super.success("Registration successful");
        else super.failure("Registration unsuccessful");
        this.user = user;
    }
}