import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { SignUpDto } from './dto/signup.dto';
import { User } from './user.entity';
import { SignInDto } from './dto/signin.dto';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    signUp(signUpDto: SignUpDto): Promise<User> {
        return this.userRepository.signUp(signUpDto);
    }

    async singIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
        const email = await this.userRepository.validateUserPassword(signInDto);

        if (!email) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { email };

        const accessToken = this.jwtService.sign(payload);

        return { accessToken }
    }
}
