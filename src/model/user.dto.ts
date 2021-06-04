import { Expose } from "class-transformer";
import { IsAlpha, IsEmail, IsNumberString, Length } from "class-validator";
import { Constant } from "src/Constant";
import { UserEntity } from "src/entity/user.entity";

export class UserDTO {

    @IsAlpha(undefined, { message: "Name must only contain characters." })
    @Length(Constant.ALLOWED_NAME_MIN_LENGTH, Constant.ALLOWED_NAME_MAX_LENGTH, {
        message: `Name length must be in range (${Constant.ALLOWED_NAME_MIN_LENGTH},${Constant.ALLOWED_NAME_MAX_LENGTH}).`
    })
    @Expose({ name: "name" })
    private _name: string;

    @IsEmail(undefined, { message: "Email is invalid." })
    @Expose({ name: "email" })
    private _email: string;

    @IsNumberString(undefined, { message: "Mobile should only contain numbers." })
    @Length(Constant.ALLOWED_MOBILE_LENGTH, Constant.ALLOWED_MOBILE_LENGTH, {
        message: `Mobile number must be of ${Constant.ALLOWED_MOBILE_LENGTH} digits.`
    })
    @Expose({ name: "mobile" })
    private _mobile: string;

    @Length(Constant.ALLOWED_PASSWORD_MIN_LENGTH, Constant.ALLOWED_PASSWORD_MAX_LENGTH, {
        message: `Password length must be in range (${Constant.ALLOWED_PASSWORD_MIN_LENGTH}, ${Constant.ALLOWED_PASSWORD_MAX_LENGTH})`
    })
    @Expose({ name: "password" })
    private _password: string;

    public get name(): string {
        return this._name;
    }

    public get email(): string {
        return this._email;
    }

    public get mobile(): string {
        return this._mobile;
    }

    public get password(): string {
        return this._password;
    }

    public toEntity(): UserEntity {
        return new UserEntity(this._name, this._email, this._mobile, this._password);
    }
}