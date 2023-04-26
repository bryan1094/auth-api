import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { ErrorException } from '../../utils/exception-filters/error-response.exception';
import * as exceptions from '../../utils/exceptions/user-exceptions.json';
import { User } from '../models/users.model';

@Injectable()
export class UsersService {
  //Variable donde se guardara la informacion de los usuarios registrados
  private users: User[] = [];

  //Funcion que almacena los usuarios recibidos desde el endpoint de register
  async create(createUserDto: CreateUserDto) {
    try {
      const { username, password } = createUserDto;
      const newUser: User = { username, password };
      this.users.push(newUser);
      return JSON.parse('{"success":"true"}');
    } catch (err) {
      const exceptionCode = err?.response?.statusCode || '500';
      const exceptionMessage = err?.response?.statusCode ? [] : [err?.message];
      const { code, error } = exceptions[exceptionCode];
      throw new ErrorException(code, error, exceptionMessage);
    }
  }

  /*Funcion que busca a un usuario por username, recibe el parametro username,
  este lo recibe desde el endpoint de login*/
  async findByUsername(username: string) {
    try {
      const user = this.users.find((user) => user.username === username);
      if (!user) {
        return JSON.parse('{"success":"false"}');
      }
      return user;
    } catch (err) {
      const exceptionCode = err?.response?.statusCode || '404';
      const exceptionMessage = err?.response?.statusCode ? [] : [err?.message];
      const { code, error } = exceptions[exceptionCode];
      throw new ErrorException(code, error, exceptionMessage);
    }
  }
}
