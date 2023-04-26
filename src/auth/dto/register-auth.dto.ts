import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @IsNotEmpty()
  username: string;

  @MinLength(6)
  @MaxLength(12)
  password: string;
}
