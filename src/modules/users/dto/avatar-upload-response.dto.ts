import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AvatarUploadResponse {
  @Field(() => String, { nullable: true })
  url: string;
}
