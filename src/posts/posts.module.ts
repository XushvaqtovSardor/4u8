import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Posts } from '../Sequalize/posts.model';

@Module({
  controllers: [PostsController],
  providers: [
    PostsService,
    {
      provide: 'POSTS_REPOSITORY',
      useValue: Posts,
    },
  ],
})
export class PostsModule {}
