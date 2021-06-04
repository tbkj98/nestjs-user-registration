import { Expose } from "class-transformer";
import { IsEmail } from "class-validator";

export class ForgotPasswordRequestDTO {
    @IsEmail(undefined, { message: "Email is invalid." })
    @Expose({ name: "email" })
    private _email: string;

    public get email(): string {
        return this._email;
    }
}