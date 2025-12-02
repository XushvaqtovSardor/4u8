import { Module, UnsupportedMediaTypeException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './db/database.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    PostsModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileName =
            new Date().getTime() + '.' + file.mimetype.split('/')[1];
          cb(null, fileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        const accessImages = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!accessImages.includes(file.mimetype)) {
          return cb(new UnsupportedMediaTypeException(), true);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 1024 * 1024 * 3,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
