import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/entities';
import { BcryptService } from 'src/bcrypt.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersService, UsersResolver, BcryptService],
  exports: [UsersService, BcryptService],
})
export class UsersModule {}
