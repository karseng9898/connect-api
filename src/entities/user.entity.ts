import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users' })
@ObjectType()
export class User extends Model {
  @Column({ primaryKey: true })
  @Field()
  id: string;

  @Column({ unique: true })
  @Field()
  username: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column
  @Field()
  name: string;

  @Column
  password: string;

  @Column
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Column
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Column({ allowNull: true })
  refreshToken?: string;

  @Column({ allowNull: true })
  @Field(() => String, { nullable: true })
  avatar?: string;
}
