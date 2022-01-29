import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TotalUserResponse {
  @Field()
  totalCount: number;
}
