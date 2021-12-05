import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/entities';
import { UsersService } from 'src/modules/users/users.service';
import { CreateUserInput } from '../dto/create-user-input.dto';
import { LoginResponse } from '../dto/login-response.dto';
import { LoginUserInput } from '../dto/login-user-input.dto';
import { UserAuthGuard } from '../guards/user-auth.guard';
import { UserAuthService } from './user-auth.service';

@Resolver()
export class UserAuthResolver {
  constructor(
    private userAuthService: UserAuthService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => LoginResponse)
  @UseGuards(UserAuthGuard)
  login(@Args('loginUserInput') _: LoginUserInput, @Context() context) {
    return this.userAuthService.login(context.user);
  }

  @Mutation(() => User)
  register(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.register(createUserInput);
  }
}
