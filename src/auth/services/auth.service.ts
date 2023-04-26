import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { RegisterAuthDto } from '../dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const { password } = registerAuthDto;
    const plainToHash = await hash(password, 10);
    registerAuthDto = { ...registerAuthDto, password: plainToHash };
    return this.usersService.create(registerAuthDto);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { username, password } = loginAuthDto;

    const user = await this.usersService.findByUsername(username);

    if (!user.username) return JSON.parse('{"success":"false"}');

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      return JSON.parse('{"success":"false"}');
    }

    return JSON.parse('{"success":"true"}');
  }
}
