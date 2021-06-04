import { Expose } from "class-transformer";
import { User } from "src/model/pojo/User";
import { BaseResponseDto } from "./base.dto";

export class LogoutResponseDTO extends BaseResponseDto {
    constructor(status?: boolean, token?: string, user?: User) {
        super();
        if (status) super.success("Logout successful.");
        else super.failure("Logout unsuccessful.");
    }
}