import { RegisterRequestDTO } from "src/model/dto/request/user.dto";

export class UserAlreadyExistsException implements Error {
    name: string;
    message: string;
    stack?: string;

    constructor(user: RegisterRequestDTO, error?: Error) {
        this.name = UserAlreadyExistsException.name;
        this.message = `User already exists with ${user.email} email.`;
        this.stack = error.stack;
    }
}