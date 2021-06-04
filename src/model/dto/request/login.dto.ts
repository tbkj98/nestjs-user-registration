import { Expose } from "class-transformer";
import { IsEmail, Length } from "class-validator";
import { Constant } from "src/constant/constant";

export class LoginRequestDTO {

    @IsEmail(undefined, { message: "Email is invalid." })
    @Expose({ name: "email" })
    private _email: string;

    @Length(Constant.ALLOWED_PASSWORD_MIN_LENGTH, Constant.ALLOWED_PASSWORD_MAX_LENGTH, {
        message: `Password length must be in range (${Constant.ALLOWED_PASSWORD_MIN_LENGTH}, ${Constant.ALLOWED_PASSWORD_MAX_LENGTH})`
    })
    @Expose({ name: "password" })
    private _password: string;

    public get email(): string {
        return this._email;
    }

    public get password(): string {
        return this._password;
    }
}