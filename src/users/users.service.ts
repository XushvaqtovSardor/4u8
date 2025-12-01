import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from '../Sequalize/users.model';
import { Posts } from '../Sequalize/posts.model';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof Users,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.create(createUserDto as any);
  }

  async findAll() {
    return await this.usersRepository.findAll({
      include: [Posts],
    });
  }

  async findOne(id: number) {
    return await this.usersRepository.findByPk(id, {
      include: [Posts],
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.usersRepository.update(dto, {
      where: { id },
    });
    return await this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.usersRepository.destroy({
      where: { id },
    });
    return user;
  }
}
