import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from '../Sequalize/users.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'USERS_REPOSITORY',
      useValue: Users,
    },
  ],
})
export class UsersModule {}
