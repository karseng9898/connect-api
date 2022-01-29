import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/entities';
import { Message } from 'src/entities';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatResponse } from './dto/chats-response';
import { MessageService } from './messages.service';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation(() => Message, { name: 'sendMessage' })
  @UseGuards(JwtAuthGuard)
  sendMessage(
    @CurrentUser() user: User,
    @Args('receiverId', { type: () => Int }) receiverId: number,
    @Args('friendId', { type: () => Int }) friendId: number,
    @Args('content') content: string,
  ): Promise<Message> {
    return this.messageService.create(user.id, receiverId, friendId, content);
  }

  @Query(() => [ChatResponse], { name: 'chats', nullable: true })
  @UseGuards(JwtAuthGuard)
  findAllChats(@CurrentUser() user: User) {
    return this.messageService.findAllChat(user.id);
  }

  @Query(() => [Message], { name: 'messages' })
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: User, @Args('friendId') friendId: number) {
    return this.messageService.findAll(user.id, friendId);
  }
}
