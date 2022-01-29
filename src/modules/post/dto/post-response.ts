import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostResponse {
  @Field()
  id: number;

  @Field()
  authorId: number;

  @Field()
  username: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field()
  createdAt: Date;

  @Field()
  content: string;

  @Field(() => Boolean, { nullable: true })
  reported?: boolean;
}
