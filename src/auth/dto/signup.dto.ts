import { IsNotEmpty, MinLength, MaxLength, IsString, Matches } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(16)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {
            message: 'your password is not strong enough'
        })
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    name: string;
}