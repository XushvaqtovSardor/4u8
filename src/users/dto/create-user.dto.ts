import { IsString, IsInt, Min, Max, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  user_name: string;

  @IsInt()
  @Min(1)
  @Max(150)
  age: number;
}
