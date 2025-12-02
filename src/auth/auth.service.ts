import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Users } from '../Sequalize/users.model';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: typeof Users,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.usersRepository.create({
      user_name: dto.user_name,
      age: dto.age,
      password: hashedPassword,
    });

    const payload = { userId: user.id };
    const access_token = this.jwtService.sign(payload, { expiresIn: '1h' });

    return { access_token, user: { user_name: user.user_name, age: user.age } };
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { user_name: dto.user_name },
    });
    if (!user) throw new UnauthorizedException('Username yoki parol xato');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Username yoki parol xato');

    const payload = { userId: user.id };
    const access_token = this.jwtService.sign(payload, { expiresIn: '1h' });

    return { access_token, user: { user_name: user.user_name, age: user.age } };
  }

  async validateUser(userId: number) {
    const user = await this.usersRepository.findByPk(userId);
    if (!user) throw new UnauthorizedException();
    return user;
  }

  async verifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token) as { userId: number };
      return await this.validateUser(payload.userId as number);
    } catch {
      throw new UnauthorizedException('Token invalid');
    }
  }
}
