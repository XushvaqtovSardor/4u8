import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Posts } from '../Sequalize/posts.model';
import { UsersModule } from 'src/users/users.module';
import { Users } from 'src/Sequalize/users.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [PostsController],
  providers: [
    PostsService,

    {
      provide: 'POSTS_REPOSITORY',
      useValue: Posts,
    },
    {
      provide: 'USERS_REPOSITORY',
      useValue: Users,
    },
  ],
})
export class PostsModule {}
