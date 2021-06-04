export abstract class BaseResponseDto {
    private message: string;
    private isSuccess: Boolean;

    constructor(status?: boolean) {
        if (status)
            this.success("Operation successful.");
        else
            this.failure("Operation unsuccessful.")
    }

    success(message: string): void {
        this.message = message;
        this.isSuccess = true;
    }

    failure(message: string): void {
        this.message = message;
        this.isSuccess = false;
    }
}