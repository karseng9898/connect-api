import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateFriendInput {
  @Field(() => Int)
  id: number;

  @Field()
  status: boolean;
}
