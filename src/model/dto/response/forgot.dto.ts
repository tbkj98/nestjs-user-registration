import { BaseResponseDto } from "./base.dto";

export class ForgotPasswordResponseDTO extends BaseResponseDto {

    private readonly resetToken?: string;

    constructor(status?: boolean, resetToken?: string) {
        super();
        if (status) super.success("Password reset email successfully sent.");
        else super.failure("Failed to send password reset email")
        this.resetToken = resetToken;
    }
}