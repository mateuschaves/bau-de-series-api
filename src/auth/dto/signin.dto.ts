import { IsNotEmpty, MinLength, MaxLength, IsString } from "class-validator";

export class SignInDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(16)
    password: string;
}