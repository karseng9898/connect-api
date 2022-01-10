import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FriendStatusResponse {
  @Field()
  status: 'success' | 'pending';
}
