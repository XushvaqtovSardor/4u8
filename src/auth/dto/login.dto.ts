import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(3)
  user_name: string;

  @IsString()
  @MinLength(6)
  password: string;
}
