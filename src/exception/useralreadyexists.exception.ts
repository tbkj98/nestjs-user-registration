import { UserDTO } from "src/model/user.dto";

export class UserAlreadyExistsException implements Error {
    name: string;
    message: string;
    stack?: string;

    constructor(user: UserDTO, error?: Error) {
        this.name = UserAlreadyExistsException.name;
        this.message = `User already exists with ${user.email} email.`;
        this.stack = error.stack;
    }
}