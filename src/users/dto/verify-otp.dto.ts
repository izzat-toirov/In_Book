import { IsPhoneNumber } from "class-validator";

export class VerifyUserDto{
    @IsPhoneNumber("UZ")
    phone: string;
    otp: string;
    verification_key: string;
}