
export class DatabaseException implements Error {
    name: string;
    message: string;
    stack?: string;

    constructor(error?: Error) {
        this.message = `Database error occurred.`;
        this.stack = error.stack;
    }
}