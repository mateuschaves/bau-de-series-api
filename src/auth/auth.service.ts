import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { SignUpDto } from './dto/signup.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) { }

    signUp(signUpDto: SignUpDto): Promise<User> {
        return this.userRepository.signUp(signUpDto);
    }
}
