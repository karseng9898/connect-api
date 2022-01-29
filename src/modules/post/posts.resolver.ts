import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Post, User } from 'src/entities';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TotalUserResponse } from '../users/dto/total-user-response';
import { PostResponse } from './dto/post-response';
import { PostService } from './posts.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [PostResponse], { name: 'posts', nullable: true })
  @UseGuards(JwtAuthGuard)
  findAllPosts(@CurrentUser() user: User): Promise<PostResponse[]> {
    return this.postService.findAllPosts(user);
  }

  @Query(() => [Post], { name: 'allPosts', nullable: true })
  allPosts(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @Mutation(() => Post, { name: 'deletePost', nullable: true })
  deletePost(@Args('id', { type: () => Int }) id: number) {
    this.postService.deletePost(id);
  }

  @Mutation(() => Post, { name: 'reportPost', nullable: true })
  reportPost(@Args('id', { type: () => Int }) id: number) {
    this.postService.reportPost(id);
  }

  @Mutation(() => Post, { name: 'createPost' })
  @UseGuards(JwtAuthGuard)
  createPost(
    @CurrentUser() user: User,
    @Args('content') content: string,
  ): Promise<Post> {
    return this.postService.create(user.id, content);
  }

  @Query(() => [Post], { name: 'reportedPosts', nullable: true })
  reportedPosts(): Promise<Post[]> {
    return this.postService.findAllReportedPost();
  }

  // @Mutation(() => Message, { name: 'sendMessage' })
  // @UseGuards(JwtAuthGuard)
  // sendMessage(
  //   @CurrentUser() user: User,
  //   @Args('receiverId', { type: () => Int }) receiverId: number,
  //   @Args('content') content: string,
  // ): Promise<Message> {
  //   return this.messageService.create(user.id, receiverId, content);
  // }

  // @Query(() => [ChatResponse], { name: 'chats', nullable: true })
  // @UseGuards(JwtAuthGuard)
  // findAllChats(@CurrentUser() user: User) {
  //   return this.messageService.findAllChat(user.id);
  // }

  // @Query(() => [Message], { name: 'messages' })
  // @UseGuards(JwtAuthGuard)
  // findAll(@CurrentUser() user: User, @Args('friendId') friendId: number) {
  //   return this.messageService.findAll(user.id, friendId);
  // }
}
