import { Injectable, Inject, NotFoundException } from '@nestjs/common';
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

  async create(dto: CreateUserDto) {
    return await this.usersRepository.create(dto as any);
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
  async removeUserPosts(id: number, force: boolean) {
    const userData = await this.usersRepository.findByPk(+id, {
      include: [Posts],
    });
    if (!userData) throw new NotFoundException('User not found');
    if (force) {
      await Posts.destroy({
        where: { userId: id },
      });
    }
    await this.usersRepository.destroy({
      where: { id },
    });
    return { message: 'Sucussfully' };
  }
}
