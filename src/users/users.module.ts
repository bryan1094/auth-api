import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Module({
  providers: [UsersService, CreateUserDto],
  exports: [UsersService],
})
export class UsersModule {}
