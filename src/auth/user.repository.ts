import { Repository, EntityRepository } from "typeorm";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(signUpDto: SignUpDto): Promise<User> {
        const { name, email, password } = signUpDto;

        const salt = await bcrypt.genSalt();

        const user = this.create();
        user.name = name;
        user.email = email;
        user.salt = salt;
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
            delete user.salt;
            delete user.password;
            return user;
        } catch (error) {
            if (error.code === '23505')
                throw new ConflictException('Email already exists');
            else
                throw new InternalServerErrorException();
        }
    }

    async validateUserPassword(signinDto: SignInDto): Promise<string> {
        const { email, password } = signinDto;
        const user = await this.findOne({ email });

        if (user && await user.validatePassword(password)) {
            return user.email;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string) {
        return bcrypt.hash(password, salt);
    }
}