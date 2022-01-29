import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/entities';

@ObjectType()
export class FriendsResponse {
  @Field(() => Int)
  friendId: number;

  @Field(() => User)
  user: User;
}
