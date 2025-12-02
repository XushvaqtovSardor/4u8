import { Injectable, Inject } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from '../Sequalize/posts.model';
import { Users } from '../Sequalize/users.model';

@Injectable()
export class PostsService {
  constructor(
    @Inject('POSTS_REPOSITORY')
    private postsRepository: typeof Posts,

    @Inject('USERS_REPOSITORY') private usersRepo: typeof Users,
  ) {}
  async create(dto: CreatePostDto, userId: number) {
    return await this.postsRepository.create({ ...dto, userId });
  }

  async findAll() {
    return await this.postsRepository.findAll({
      include: [Users],
    });
  }

  async findOne(id: number) {
    return await this.postsRepository.findByPk(id, {
      include: [Users],
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.postsRepository.update(updatePostDto, {
      where: { id },
    });
    return await this.findOne(id);
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    await this.postsRepository.destroy({
      where: { id },
    });
    return post;
  }
}
