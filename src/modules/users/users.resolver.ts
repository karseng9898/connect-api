import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/entities';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AvatarUploadResponse } from './dto/avatar-upload-response.dto';
import { TotalUserResponse } from './dto/total-user-response';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() user: User): Promise<User> {
    return this.usersService.findOne(user.id);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  getUserById(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Query(() => [User])
  // @UseGuards(JwtAuthGuard)
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { nullable: true })
  @UseGuards(JwtAuthGuard)
  user(@Args('username') username: string): Promise<User> {
    return this.usersService.findbyUsername(username);
  }

  @Mutation(() => AvatarUploadResponse)
  @UseGuards(JwtAuthGuard)
  async updateMe(
    @CurrentUser() user: User,
    @Args({ name: 'name' })
    name: string,
    @Args({ name: 'thumbnail', type: () => GraphQLUpload, nullable: true })
    thumbnail: FileUpload | null,
  ): Promise<AvatarUploadResponse> {
    return this.usersService.updateMe(user, name, thumbnail);
  }

  @Query(() => TotalUserResponse, { name: 'totalUser', nullable: true })
  totalUser(): Promise<TotalUserResponse> {
    return this.usersService.getTotalUserCount();
  }
}
