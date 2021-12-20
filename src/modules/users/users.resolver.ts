import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/entities';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() user: User): Promise<User> {
    console.log(user);
    return this.usersService.findOne(user.id);
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { nullable: true })
  @UseGuards(JwtAuthGuard)
  user(@Args('username') username: string): Promise<User> {
    return this.usersService.findbyUsername(username);
  }
}
