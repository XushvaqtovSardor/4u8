import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Users } from '../Sequalize/users.model';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof Users,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.usersRepository.create({
      user_name: registerDto.user_name,
      age: registerDto.age,
      password: hashedPassword,
    });
    const payload = { sub: user.id, username: user.user_name };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        user_name: user.user_name,
        age: user.age,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { user_name: loginDto.user_name },
    });
    if (!user) {
      throw new UnauthorizedException('Parol yoki username xato');
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Parol yoki username xato');
    }
    const payload = { sub: user.id, username: user.user_name };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        user_name: user.user_name,
        age: user.age,
      },
    };
  }

  async validateUser(userId: number) {
    return await this.usersRepository.findByPk(userId);
  }
}
