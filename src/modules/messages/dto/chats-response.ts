import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatResponse {
  @Field()
  friendId: number;

  @Field()
  receiverId: number;

  @Field()
  username: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field()
  createdAt: Date;

  @Field()
  lastMessage: string;
}
