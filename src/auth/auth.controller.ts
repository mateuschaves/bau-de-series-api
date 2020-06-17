import { Controller, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { User } from './user.entity';

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
}
