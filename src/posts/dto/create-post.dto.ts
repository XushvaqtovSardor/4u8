import { IsString, IsInt, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(3)
  post_title: string;

  @IsString()
  @MinLength(10)
  context: string;

  @IsInt()
  userId: number;
}
