import { Controller, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { User } from './user.entity';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('/signup')
    @UsePipes(ValidationPipe)
    signUp(@Body() signupDto: SignUpDto): Promise<User> {
        return this.authService.signUp(signupDto);
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    signIn(@Body() signIn: SignInDto): Promise<{ accessToken: string }> {
        return this.authService.singIn(signIn);
    }
}
