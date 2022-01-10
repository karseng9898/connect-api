import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Friend, User } from 'src/entities';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FriendsService } from './friends.service';

@Resolver(() => Friend)
export class FriendsResolver {
  constructor(private readonly friendsService: FriendsService) {}

  @Mutation(() => Friend, { name: 'addFriend' })
  @UseGuards(JwtAuthGuard)
  createFriend(
    @CurrentUser() user: User,
    @Args('receiverId', { type: () => Int }) receiverId: number,
  ): Promise<Friend> {
    return this.friendsService.create(user.id, receiverId);
  }

  @Query(() => Friend, {
    name: 'checkFriendStatus',
    nullable: true,
  })
  @UseGuards(JwtAuthGuard)
  checkStatus(
    @CurrentUser() user: User,
    @Args('friendId', { type: () => Int }) friendId: number,
  ): Promise<Friend> {
    return this.friendsService.checkStatus(user.id, friendId);
  }

  @Query(() => [User], { name: 'friends' })
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: User) {
    return this.friendsService.findAll(user.id);
  }

  @Query(() => [Friend], { name: 'friendRequests' })
  @UseGuards(JwtAuthGuard)
  findAllRequest(@CurrentUser() user: User): Promise<Friend[]> {
    return this.friendsService.findAllRequest(user.id);
  }

  @Query(() => Friend, { name: 'friend' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.friendsService.findOne(id);
  }

  @Mutation(() => Boolean, { name: 'acceptFriend' })
  @UseGuards(JwtAuthGuard)
  updateFriend(
    @CurrentUser() user: User,
    @Args('friendId', { type: () => Int }) friendId: number,
  ): Promise<boolean> {
    return this.friendsService.update(user.id, friendId);
  }

  @Mutation(() => Boolean, { name: 'unfriend' })
  @UseGuards(JwtAuthGuard)
  removeFriend(
    @CurrentUser() user: User,
    @Args('friendId', { type: () => Int }) friendId: number,
  ): Promise<boolean> {
    return this.friendsService.remove(user.id, friendId);
  }
}
