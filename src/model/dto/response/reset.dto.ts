import { BaseResponseDto } from "./base.dto";

export class ResetPasswordResponseDTO extends BaseResponseDto {
    private readonly resetToken?: string;

    constructor(status?: boolean) {
        super();
        if (status) super.success("Password reset successful.");
        else super.failure("Password reset successful");
    }
}