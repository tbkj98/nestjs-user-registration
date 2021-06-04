import { Expose } from "class-transformer";
import { Length } from "class-validator";
import { Constant } from "src/constant/constant";

export class ResetPasswordRequestDTO {
    @Expose({ name: "token" })
    private _resetToken: string;

    @Length(Constant.ALLOWED_PASSWORD_MIN_LENGTH, Constant.ALLOWED_PASSWORD_MAX_LENGTH, {
        message: `Password length must be in range (${Constant.ALLOWED_PASSWORD_MIN_LENGTH}, ${Constant.ALLOWED_PASSWORD_MAX_LENGTH})`
    })
    @Expose({ name: "password" })
    private _password: string;

    public get resetToken(): string {
        return this._resetToken;
    }

    public get password(): string {
        return this._password;
    }
}