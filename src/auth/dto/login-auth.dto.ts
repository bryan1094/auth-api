import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty()
  username: string;

  @MinLength(6)
  @MaxLength(12)
  password: string;
}
